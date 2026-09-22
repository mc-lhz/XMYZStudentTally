// 检测反混淆「变量塌陷」缺陷：把 A 的引用错误地写成了 B。
//
// 模式 A: for-in 循环变量（字符串键）被当作对象 base   →  key[key] / key.prop
// 模式 B: 被赋值为 X.length 的变量（数字）被当作对象 base → len[i]
// 模式 C: for-of 的可迭代源在循环体内被索引/取 length（可疑，需人工复核）
//
// 用法: node tools/detect_collapse_bugs.cjs [文件...]      默认扫描 assets/*.js
const fs = require("fs");
const path = require("path");
const { ROOT, ASSETS, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

// 字符串上的合法方法/属性（for-in 的 key 是字符串，调用这些是正常的）
const STRING_MEMBERS = new Set([
  "length", "slice", "substring", "substr", "indexOf", "lastIndexOf", "charAt",
  "charCodeAt", "codePointAt", "toUpperCase", "toLowerCase", "trim", "trimStart",
  "trimEnd", "split", "replace", "replaceAll", "startsWith", "endsWith",
  "includes", "match", "matchAll", "padStart", "padEnd", "repeat", "concat",
  "toString", "valueOf", "normalize", "at", "search",
]);
// 数字上的合法方法
const NUMBER_MEMBERS = new Set([
  "toFixed", "toString", "valueOf", "toPrecision", "toExponential", "toLocaleString",
]);
// 接受函数回调的常见方法：循环变量出现在这些方法的实参位置 = 被当函数用
const CALLBACK_TAKERS = new Set([
  "map", "filter", "forEach", "find", "findIndex", "findLast", "findLastIndex",
  "some", "every", "reduce", "reduceRight", "flatMap", "sort",
  "then", "catch", "finally",
]);

function analyze(file) {
  const code = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] });
  } catch (e) {
    return { file, parseError: e.message, hits: [] };
  }
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const hits = [];
  const src = (n) => code.slice(n.start, n.end);

  babel.traverse(ast, {
    // ---- 模式 A: for-in 循环变量当对象 base ----
    ForInStatement(p) {
      const left = p.node.left;
      let name = null;
      if (left.type === "VariableDeclaration" && left.declarations[0].id.type === "Identifier")
        name = left.declarations[0].id.name;
      else if (left.type === "Identifier") name = left.name;
      if (!name) return;

      p.get("body").traverse({
        MemberExpression(mp) {
          const o = mp.node.object;
          if (o.type !== "Identifier" || o.name !== name) return;
          if (!mp.node.computed && STRING_MEMBERS.has(mp.node.property.name)) return; // 合法字符串方法
          hits.push({
            kind: "A/for-in-key-as-object",
            line: mp.node.loc.start.line,
            varName: name,
            expr: src(mp.node).slice(0, 70),
          });
        },

        // ---- 模式 D: for-in 的 key 被当函数用 ----
        // for-in 的循环变量必然是字符串 key，调用它 / 把它当回调传出去一定是塌陷。
        // （对比 for-of：元素本身可以是函数，`for (const f of fns) f()` 完全合法，故只查 for-in。）
        // 由来：vue-router applyToParams 里 `fn(value)` / `value.map(fn)` 的 fn 被塌陷成 key，
        // 运行时报 "xxx is not a function"，导致全部动态参数路由崩溃。
        CallExpression(cp) {
          const callee = cp.node.callee;
          if (callee.type === "Identifier" && callee.name === name) {
            hits.push({
              kind: "D/for-in-key-called-as-function",
              line: cp.node.loc.start.line,
              varName: name,
              expr: src(cp.node).slice(0, 70),
            });
            return;
          }
          if (
            callee.type === "MemberExpression" &&
            !callee.computed &&
            callee.property &&
            CALLBACK_TAKERS.has(callee.property.name)
          ) {
            for (const arg of cp.node.arguments) {
              if (arg.type === "Identifier" && arg.name === name) {
                hits.push({
                  kind: "D/for-in-key-passed-as-callback",
                  line: cp.node.loc.start.line,
                  varName: name,
                  expr: src(cp.node).slice(0, 70),
                });
              }
            }
          }
        },
        NewExpression(np2) {
          if (np2.node.callee.type === "Identifier" && np2.node.callee.name === name) {
            hits.push({
              kind: "D/for-in-key-used-as-constructor",
              line: np2.node.loc.start.line,
              varName: name,
              expr: src(np2.node).slice(0, 70),
            });
          }
        },
      });
    },

    // ---- 模式 B: length 变量当对象 base ----
    VariableDeclarator(p) {
      const id = p.node.id;
      const init = p.node.init;
      if (!id || id.type !== "Identifier" || !init) return;
      // 形如  X = something.length
      if (
        init.type !== "MemberExpression" ||
        init.computed ||
        !init.property ||
        init.property.name !== "length"
      )
        return;
      const name = id.name;
      const binding = p.scope.getBinding(name);
      if (!binding) return;
      for (const ref of binding.referencePaths) {
        const parent = ref.parentPath;
        if (!parent || !parent.isMemberExpression()) continue;
        if (parent.node.object !== ref.node) continue; // 只关心作为 base
        if (!parent.node.computed && NUMBER_MEMBERS.has(parent.node.property.name)) continue;
        hits.push({
          kind: "B/length-var-as-object",
          line: parent.node.loc.start.line,
          varName: name,
          expr: src(parent.node).slice(0, 70),
        });
      }
    },

    // ---- 模式 C: for-of 可迭代源在循环体内被索引（可疑） ----
    ForOfStatement(p) {
      const right = p.node.right;
      if (right.type !== "Identifier") return;
      const srcName = right.name;
      const left = p.node.left;
      let loopVar = null;
      if (left.type === "VariableDeclaration" && left.declarations[0].id.type === "Identifier")
        loopVar = left.declarations[0].id.name;
      if (!loopVar) return;

      p.get("body").traverse({
        MemberExpression(mp) {
          const o = mp.node.object;
          if (o.type !== "Identifier" || o.name !== srcName) return;
          // 对源数组取 .length 或索引，在嵌套循环里通常是塌陷
          hits.push({
            kind: "C/for-of-source-indexed(suspect)",
            line: mp.node.loc.start.line,
            varName: srcName,
            loopVar,
            expr: src(mp.node).slice(0, 70),
          });
        },
      });
    },
  });

  return { file: rel, hits };
}

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const showC = process.argv.includes("--all-kinds");
let files;
if (args.length) files = args.map((a) => path.resolve(ROOT, a));
else
  files = fs
    .readdirSync(ASSETS)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(ASSETS, f));

let totalA = 0, totalB = 0, totalC = 0, totalD = 0;
for (const f of files) {
  const r = analyze(f);
  if (r.parseError) {
    console.log(`${r.file}: PARSE ERROR ${r.parseError}`);
    continue;
  }
  for (const h of r.hits) {
    if (h.kind.startsWith("A")) totalA++;
    else if (h.kind.startsWith("B")) totalB++;
    else if (h.kind.startsWith("D")) totalD++;
    else { totalC++; if (!showC) continue; }
    console.log(
      `${r.file}:${h.line}  [${h.kind}]  ${h.varName}  ->  ${h.expr}` +
        (h.loopVar ? `   (loopVar=${h.loopVar})` : "")
    );
  }
}
console.log(`\nA(for-in key as object): ${totalA}`);
console.log(`B(length var as object): ${totalB}`);
console.log(`C(for-of source indexed, suspect): ${totalC}${showC ? "" : "   [用 --all-kinds 显示]"}`);
console.log(`D(loop var used as function): ${totalD}`);
console.log(`确定性缺陷合计 A+B+D = ${totalA + totalB + totalD}`);
