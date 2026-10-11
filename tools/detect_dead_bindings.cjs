// 检测「变量塌陷」留下的死绑定（E 类缺陷）。
//
// 原理：反混淆把两个不同变量塌陷成同一个名字时，被顶替的那个变量会留在声明处，
// 但再也没有人读它 —— 形成「声明了却零引用」的死绑定。正常的压缩产物不会有这种东西
// （压缩器会直接删掉无用变量），所以它是变量塌陷的高置信度指纹。
//
// 两级信号：
//   A 级（几乎必然是缺陷）：for 循环的计数器变量，在循环体内零引用。
//       例：for (let num=0; num<n; num++) for (let j=0;j<m;j++) a[j+j] ^= f(p[j],q[j]);
//           → num 只出现在 test/update，body 里被 j 顶替了。
//   B 级（强可疑）：函数内 let/var 声明且带初始值，但全作用域零引用。
//       例：let num = 1; for (let i=0;i<255;i++) { EXP[i]=i; i<<=1; }
//           → num(原 x) 被循环变量顶替，整张 GF 表算错。
//
// 已知真实案例（均由本检测器的特征命中）：
//   assets/browser-COI8Ulb7.js  GF 表初始化 / Polynomial.mul / applyMask / setupData
//   —— 其中 setupData 的塌陷直接导致内层 for 无限震荡，整页卡死。
//
// 用法: node tools/detect_dead_bindings.cjs [文件名过滤]
const fs = require("fs");
const path = require("path");
const { ROOT, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

const ASSETS = path.join(ROOT, "assets");
const filter = process.argv[2] || "";
const files = fs.readdirSync(ASSETS).filter((f) => f.endsWith(".js") && f.includes(filter));

// 这些名字常见于「有意留空」的场景，不算可疑
const IGNORE = new Set(["_", "__"]);

let totalA = 0, totalB = 0, totalC = 0, totalD = 0, totalE = 0, totalF = 0, parsed = 0;
const report = [];

function lineOf(code, pos) {
  return code.slice(0, pos).split("\n").length;
}
function snippet(code, node, max = 190) {
  const s = code.slice(node.start, Math.min(node.end, node.start + max)).replace(/\s+/g, " ");
  return s.length >= max ? s + " …" : s;
}

for (const f of files) {
  const file = path.join(ASSETS, f);
  const code = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [], filename: file });
  } catch (e) {
    report.push(`!! ${f} 解析失败: ${e.message}`);
    continue;
  }
  parsed++;
  const hitsA = [], hitsB = [], hitsC = [], hitsD = [], hitsE = [], hitsF = [];

  babel.traverse(ast, {
    // A 级：for 计数器在循环体内零引用
    ForStatement(p) {
      const init = p.node.init;
      if (!init || init.type !== "VariableDeclaration") return;
      const body = p.node.body;
      if (!body) return;
      for (const d of init.declarations) {
        if (!d.id || d.id.type !== "Identifier") continue;
        const name = d.id.name;
        if (IGNORE.has(name)) continue;
        const binding = p.scope.getBinding(name);
        if (!binding) continue;
        // 排除 `for (let i=0, len=a.length; i<len; i++)` 里的 len：
        // 它不被 update 修改，只在 test 里当上界用，体内零引用完全正常。
        const upd = p.node.update;
        const touchedByUpdate =
          upd &&
          binding.constantViolations.some(
            (cv) => cv.node.start >= upd.start && cv.node.end <= upd.end
          );
        if (!touchedByUpdate) continue;
        // 统计落在循环体内的引用
        const inBody = binding.referencePaths.filter(
          (rp) => rp.node.start >= body.start && rp.node.end <= body.end
        ).length;
        // 也统计体内的写入（i++ / i=... 出现在 body 里同样算「被用到」）
        const writesInBody = binding.constantViolations.filter(
          (cv) => cv.node.start >= body.start && cv.node.end <= body.end
        ).length;
        if (inBody === 0 && writesInBody === 0) {
          hitsA.push({ name, line: lineOf(code, p.node.start), code: snippet(code, p.node) });
        }
      }
    },
    // B 级：带初始值的 let/var，整个作用域零引用
    VariableDeclarator(p) {
      const parent = p.parentPath.node;
      if (parent.type !== "VariableDeclaration") return;
      if (parent.kind === "const") return;                 // const 多为常量表/导出，噪音大
      if (p.parentPath.parentPath.isForStatement()) return; // 已由 A 级覆盖
      if (!p.node.id || p.node.id.type !== "Identifier") return;
      if (!p.node.init) return;                             // 纯声明 let x; 属正常
      const name = p.node.id.name;
      if (IGNORE.has(name)) return;
      const binding = p.scope.getBinding(name);
      if (!binding) return;
      if (binding.references !== 0) return;
      if (binding.constantViolations.length === 0) return;  // 从没被读也没被写 = 真无用，噪音
      // `x += n` / `x++` 本身隐含一次读取，Babel 不把它算进 referencePaths。
      // 只有「被简单赋值 = 写入、却从没被读」才是塌陷指纹。
      const hasPlainAssign = binding.constantViolations.some(
        (cv) => cv.isAssignmentExpression() && cv.node.operator === "="
      );
      if (!hasPlainAssign) return;
      // 被写过却从没被读过 —— 典型的「它的读取位置被别的变量顶替了」
      hitsB.push({
        name,
        line: lineOf(code, p.node.start),
        code: snippet(code, p.parentPath.parentPath.node || p.node),
      });
    },
  });

  // C 级：累加器被读却从未被写。
  //   let points = 0; for (...) { col++ }        return points * N
  // 累加语句被塌陷写到了循环变量上，累加器永远停在初始值。
  // 真实案例：qrcode getPenaltyN4 的 `zz19 += data[zz19]`（本该是 darkCount += data[i]）。
  babel.traverse(ast, {
    VariableDeclarator(p) {
      const parent = p.parentPath.node;
      if (parent.type !== "VariableDeclaration" || parent.kind === "const") return;
      if (p.parentPath.parentPath.isForStatement()) return;
      if (!p.node.id || p.node.id.type !== "Identifier") return;
      const init = p.node.init;
      // 只看 `let x = 0` / `let x = 1` 这类数值累加器起点
      if (!init || init.type !== "NumericLiteral") return;
      const name = p.node.id.name;
      if (IGNORE.has(name)) return;
      const binding = p.scope.getBinding(name);
      if (!binding) return;
      if (binding.references === 0) return;             // 完全没用，已由 B 级/无用变量覆盖
      if (binding.constantViolations.length > 0) return; // 正常累加
      // 被读、但一次都没被重新赋值 —— 累加器失联
      const fn = p.getFunctionParent();
      hitsC.push({
        name,
        line: lineOf(code, p.node.start),
        code: snippet(code, fn ? fn.node : p.node, 220),
      });
    },
  });

  // D 级：逻辑表达式里出现【源码完全相同】的重复操作数（`A || A`、`A && A`）。
  // 正常代码不会这么写；这是「两个变量塌陷成一个」后留下的最强指纹，
  // 且能抓到 A 级漏掉的情况——外层变量在循环体别处仍被引用时 A 级不报，但重复子式一定露馅。
  // 真实案例：qrcode setupFinderPattern
  //   `c>=0&&c<=6&&(c===0||c===6) || c>=0&&c<=6&&(c===0||c===6) || c>=2&&c<=4&&c>=2&&c<=4`
  //   本该是 r>=0&&r<=6&&(c===0||c===6) || c>=0&&c<=6&&(r===0||r===6) || r>=2&&r<=4&&c>=2&&c<=4
  babel.traverse(ast, {
    LogicalExpression(p) {
      // 只在最外层逻辑表达式处理一次，避免同一条链重复报告
      if (p.parentPath.isLogicalExpression()) return;
      const op = p.node.operator;
      if (op !== "||" && op !== "&&") return;
      // 摊平同种运算符的操作数
      const parts = [];
      (function flat(n) {
        if (n.type === "LogicalExpression" && n.operator === op) { flat(n.left); flat(n.right); }
        else parts.push(n);
      })(p.node);
      if (parts.length < 2) return;
      const seen = new Map();
      for (const n of parts) {
        const txt = code.slice(n.start, n.end).replace(/\s+/g, "");
        if (txt.length < 8) continue;          // 太短的（如 `!a`）容易巧合
        if (seen.has(txt)) {
          hitsD.push({
            expr: txt.slice(0, 70),
            line: lineOf(code, p.node.start),
            code: snippet(code, p.node, 200),
          });
          break;                                // 每条表达式只报一次
        }
        seen.set(txt, true);
      }
    },
  });

  // E 级：嵌套循环里，外层计数器在【内层循环整段】零引用。
  // 二维索引/二维组合的代码，外层下标几乎必然要在内层用到；一处都不用 = 它被内层变量顶替了。
  // A 级只能抓「外层计数器在整个 body 零引用」，当外层变量在 body 的别处仍被使用时 A 级失效，
  // 但 E 级仍能命中。真实案例：qrcode buildGraph 的 `key = "" + j + j`（本该是 "" + i + j），
  // 导致不同分组节点共用 key 互相覆盖，多段文本只编码最后一段。
  babel.traverse(ast, {
    ForStatement(p) {
      const init = p.node.init, upd = p.node.update, body = p.node.body;
      if (!init || init.type !== "VariableDeclaration" || !upd || !body) return;
      for (const d of init.declarations) {
        if (!d.id || d.id.type !== "Identifier") continue;
        const name = d.id.name;
        if (IGNORE.has(name)) continue;
        const binding = p.scope.getBinding(name);
        if (!binding) continue;
        if (!binding.constantViolations.some((cv) => cv.node.start >= upd.start && cv.node.end <= upd.end)) continue;
        // 外层计数器在 body 里完全没出现 → 已由 A 级报告，不重复
        const inBody = binding.referencePaths.filter((rp) => rp.node.start >= body.start && rp.node.end <= body.end).length +
          binding.constantViolations.filter((cv) => cv.node.start >= body.start && cv.node.end <= body.end).length;
        if (inBody === 0) continue;
        // 收集 body 内「最外一层」的嵌套循环
        const inners = [];
        p.get("body").traverse({
          "ForStatement|ForOfStatement|ForInStatement"(ip) {
            let anc = ip.parentPath, nested = false;
            while (anc && anc.node !== p.node) {
              if (anc.isForStatement() || anc.isForOfStatement() || anc.isForInStatement()) { nested = true; break; }
              anc = anc.parentPath;
            }
            if (!nested) inners.push(ip.node);
          },
        });
        for (const inode of inners) {
          const refs = binding.referencePaths.filter((rp) => rp.node.start >= inode.start && rp.node.end <= inode.end).length +
            binding.constantViolations.filter((cv) => cv.node.start >= inode.start && cv.node.end <= inode.end).length;
          if (refs === 0) hitsE.push({ name, line: lineOf(code, inode.start), code: snippet(code, inode, 200) });
        }
      }
    },
  });

  // F 级：带初始值的 let/var，全作用域 0 读 0 写。
  // 压缩产物里不该存在完全无用的变量（压缩器会删掉），出现 = 它的读写位置被别的变量顶替了。
  // 真实案例：qrcode createCodewords 的 `let offset = 0`，slice/累加全被循环变量 zz92 顶替，
  // 导致循环计数器被跳跃改写，纠错块 ≥2 的版本（v4 起）直接崩溃。
  babel.traverse(ast, {
    VariableDeclarator(p) {
      const parent = p.parentPath.node;
      if (parent.type !== "VariableDeclaration" || parent.kind === "const") return;
      if (p.parentPath.parentPath.isForStatement()) return;
      if (!p.node.id || p.node.id.type !== "Identifier" || !p.node.init) return;
      const name = p.node.id.name;
      if (IGNORE.has(name)) return;
      const binding = p.scope.getBinding(name);
      if (!binding || binding.references !== 0 || binding.constantViolations.length !== 0) return;
      const fn = p.getFunctionParent();
      hitsF.push({ name, line: lineOf(code, p.node.start), code: snippet(code, fn ? fn.node : p.node, 220) });
    },
  });

  if (hitsA.length || hitsB.length || hitsC.length || hitsD.length || hitsE.length || hitsF.length) {
    report.push(`\n=== ${f} ===`);
    for (const h of hitsA) {
      totalA++;
      report.push(`  [A] L${h.line} 循环计数器 \`${h.name}\` 在循环体内零引用`);
      report.push(`      ${h.code}`);
    }
    for (const h of hitsB) {
      totalB++;
      report.push(`  [B] L${h.line} 变量 \`${h.name}\` 被写过但从未被读`);
      report.push(`      ${h.code}`);
    }
    for (const h of hitsC) {
      totalC++;
      report.push(`  [C] L${h.line} 累加器 \`${h.name}\` 被读却从未被写（累加语句可能写到了别的变量上）`);
      report.push(`      ${h.code}`);
    }
    for (const h of hitsD) {
      totalD++;
      report.push(`  [D] L${h.line} 逻辑表达式含完全相同的重复子式: ${h.expr}`);
      report.push(`      ${h.code}`);
    }
    for (const h of hitsE) {
      totalE++;
      report.push(`  [E] L${h.line} 外层计数器 \`${h.name}\` 在内层循环整段零引用`);
      report.push(`      ${h.code}`);
    }
    for (const h of hitsF) {
      totalF++;
      report.push(`  [F] L${h.line} 变量 \`${h.name}\` 声明后 0 读 0 写（压缩产物不该保留无用变量）`);
      report.push(`      ${h.code}`);
    }
  }
}

console.log(report.join("\n"));
console.log(`\n================ 汇总 ================`);
console.log(`扫描文件: ${parsed}/${files.length}`);
console.log(`A 级（for 计数器体内零引用）: ${totalA}`);
console.log(`B 级（被写从未被读）        : ${totalB}`);
console.log(`C 级（累加器从未被写）      : ${totalC}`);
console.log(`D 级（重复子式 A||A）      : ${totalD}`);
console.log(`E 级（外层计数器内层零引用）: ${totalE}`);
console.log(`F 级（声明后 0 读 0 写）    : ${totalF}`);
console.log(`合计可疑: ${totalA + totalB + totalC + totalD + totalE + totalF}`);
