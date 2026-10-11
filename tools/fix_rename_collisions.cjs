#!/usr/bin/env node
/**
 * fix_rename_collisions.cjs  (v4 — scope.rename 驱动的「消除同名遮蔽」通用修复)
 *
 * 背景：反混淆把不同作用域里的不同变量塌缩成了同名（val/fn/refVal/obj），
 * 于是出现「内层变量遮蔽外层同名变量」的阴影（shadow）。
 *
 * 关键事实：反混淆器是基于【原版 minified】做 scope.rename 的，所以每个 binding
 * 的引用集合已经【正确归属】到它原本对应的变量。问题仅仅是「两个 binding 同名」。
 * 因此修复 = 把【内层(遮蔽方)】binding 及其引用改名到唯一新名，外层不变。
 * Babel 的 binding.scope.rename 是权威做法，能正确处理 FunctionDeclaration 提升、
 * AssignmentPattern / ObjectPattern / ArrayPattern 解构、catch 参数等所有绑定形态。
 *
 * 实现：
 *   1. 解析 AST；
 *   2. 收集现有所有 binding 名（用于生成不冲突新名）；
 *   3. 找出所有「遮蔽外层同名」的 binding；
 *   4. 对每个遮蔽 binding 调 binding.scope.rename(old, 唯一新名 zzN)
 *      —— 这一步会把它自身 id + 全部引用节点都改成新名（AST 内，位置不变）；
 *   5. 遍历 AST，收集所有 name 匹配 /^zz\d+$/ 的 Identifier，按原 node.start/end
 *      做文本切片替换（从而保留原排版与反混淆注释）；
 *   6. 多趟循环直到文件内不再有任何同名遮蔽（处理多层嵌套遮蔽链）。
 *
 * 前缀 "zz" 绝不出现在 val/fn/refVal/obj/rx/val_tdz/val_pcKey/__vite__ 中，
 * 不会与 Vite 注入的 u0/u1 或 deobfuscator 其它命名撞车。
 *
 * 用法：
 *   node tools/fix_rename_collisions.cjs assets/xxx.js
 *   node tools/fix_rename_collisions.cjs --all
 *   DRY=1 仅预览
 */
const fs = require("fs");
const path = require("path");
const { ROOT, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

function parseCode(code) {
  return babel.parseSync(code, { sourceType: "unambiguous", presets: [] });
}

function collectExistingNames(ast) {
  const names = new Set();
  babel.traverse(ast, {
    Identifier(p) {
      if (p.isBindingIdentifier()) {
        const b = p.scope.getBinding(p.node.name);
        if (b && b.identifier === p.node) names.add(p.node.name);
      }
    },
  });
  return names;
}

function findShadowBindings(ast) {
  const shadows = [];
  babel.traverse(ast, {
    Identifier(p) {
      if (!p.isBindingIdentifier()) return;
      const b = p.scope.getBinding(p.node.name);
      if (!b || b.identifier !== p.node) return;
      let scope = p.scope.parent;
      while (scope) {
        if (scope.getBinding(p.node.name)) { shadows.push(b); break; }
        scope = scope.parent;
      }
    },
  });
  const seen = new Set();
  return shadows.filter(b => { if (seen.has(b)) return false; seen.add(b); return true; });
}

function nextUniqueName(existing) {
  let ctr = 0;
  let nm;
  do { nm = "zz" + ctr++; } while (existing.has(nm));
  existing.add(nm);
  return nm;
}

function fixFile(deobfPath) {
  let code = fs.readFileSync(deobfPath, "utf8");
  let totalFixed = 0, totalEdits = 0, passes = 0;
  // 单趟：一次性找出并改名当前所有「同名遮蔽」绑定。改名后每个被改 binding 都得到
  // 全局唯一的 zzN（nextUniqueName 已排除现有名），因此不存在残留真实遮蔽，无需多趟循环。
  // （历史：曾用 getBinding 沿作用域链走查校验，但 Babel 8 重建后的 scope 链存在自环，
  //   会误报「幽灵阴影」导致空转，故仅以「能否重新解析」作为正确性校验。）
  while (passes < 1) {
    let ast;
    try { ast = parseCode(code); }
    catch (e) { return { error: "parse: " + e.message }; }

    const existing = collectExistingNames(ast);
    const shadows = findShadowBindings(ast);
    if (shadows.length === 0) break;

    // 用 Babel 权威的 scope.rename 改名（处理所有绑定形态：函数声明提升、
    // AssignmentPattern 默认参数、ObjectPattern/ArrayPattern 解构、catch 参数等）
    for (const b of shadows) {
      const oldName = b.identifier.name;
      const nm = nextUniqueName(existing);
      try { b.scope.rename(oldName, nm); } catch (e) { /* 忽略个别无法 rename 的边界 */ }
    }

    // 从改名后的 AST 正规重生成代码（避免手工文本切片对节点跨度的错位）。
    // 注意：不要传第二个 code 参数（Babel 8 下原始 code 与已改写 AST 不匹配会产出无法再解析的坏代码）。
    let regen;
    try {
      regen = babel.transformFromAstSync(ast, { presets: [], comments: true, compact: false });
    } catch (e) { return { error: "regen: " + e.message }; }
    code = regen.code;

    totalFixed += shadows.length;
    totalEdits += (code.match(/zz\d+/g) || []).length;
    passes++;
  }
  try { parseCode(code); } catch (e) { return { error: "post-parse: " + e.message }; }
  return { fixed: totalFixed, edits: totalEdits, passes, out: code };
}

function main() {
  const arg = process.argv[2];
  const files = arg === "--all"
    ? fs.readdirSync(path.join(ROOT, "assets")).filter(f => f.endsWith(".js")).map(f => path.join(ROOT, "assets", f))
    : arg ? [arg] : [];
  const DRY = process.env.DRY === "1";
  let totalFixed = 0, totalEdits = 0, filesTouched = 0;
  for (const f of files) {
    const r = fixFile(f);
    if (r.error) { console.log(`ERR   ${path.basename(f)}  ${r.error}`); continue; }
    if (!r.fixed) continue;
    if (DRY) {
      console.log(`DRY   ${path.basename(f)}  消除遮蔽 ${r.fixed} (编辑 ${r.edits}, ${r.passes} 趟)`);
      totalFixed += r.fixed; totalEdits += r.edits; filesTouched++;
      continue;
    }
    fs.writeFileSync(f, r.out);
    console.log(`FIXED ${path.basename(f)}  消除遮蔽 ${r.fixed} (编辑 ${r.edits}, ${r.passes} 趟)`);
    totalFixed += r.fixed; totalEdits += r.edits; filesTouched++;
  }
  console.log(`\n=== ${DRY ? "DRY " : ""}总结：消除遮蔽 ${totalFixed} 处，编辑 ${totalEdits} 个标识符，涉及文件 ${filesTouched} 个 ===`);
}

main();
