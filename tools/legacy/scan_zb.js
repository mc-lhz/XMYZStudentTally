// scan_zb.js —— 统计 final/ 中遗留的不透明编号名（zbXX / aNN 等）。
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const re = /^[a-z]+[0-9a-z]*[0-9]+$/; // zb47, zbde, a0, zb1a ...

// A) 作为 scope 绑定
let totalBinds = 0; const byFile = {};
// B) 作为 export 公开名
let totalExp = 0; const expByFile = {};
// C) 作为任意标识符出现（全量，看规模）
let totalId = 0; const idByFile = {};

for (const f of fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort()) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast; try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }

  const binds = new Set();
  const safeWalk = (s) => {
    if (!s || !s.bindings) return;
    for (const nm of Object.keys(s.bindings)) if (re.test(nm)) binds.add(nm);
    if (s.childScopes) s.childScopes.forEach(safeWalk);
  };
  safeWalk(ast.program.scope);

  const expPub = new Set();
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (p.node.source || p.node.declaration) return;
      p.node.specifiers.forEach((s) => { if (s.type === "ExportSpecifier" && re.test(s.exported.name)) expPub.add(s.exported.name); });
    },
  });

  const ids = new Set();
  babel.traverse(ast, { Identifier(p) { if (re.test(p.node.name)) ids.add(p.node.name); } });

  if (binds.size) { byFile[f] = binds.size; totalBinds += binds.size; }
  if (expPub.size) { expByFile[f] = expPub.size; totalExp += expPub.size; }
  if (ids.size) { idByFile[f] = ids.size; totalId += ids.size; }
}

console.log("=== A) scope 绑定中的不透明编号名 ===");
console.log("文件:", Object.keys(byFile).length, " 绑定数:", totalBinds);
for (const f of Object.keys(byFile).sort()) console.log("  " + f + ": " + byFile[f]);
console.log("\n=== B) export 公开名中的不透明编号名 ===");
console.log("文件:", Object.keys(expByFile).length, " 公开名数:", totalExp);
for (const f of Object.keys(expByFile).sort()) console.log("  " + f + ": " + expByFile[f]);
console.log("\n=== C) 任意标识符出现(含 import/引用) ===");
console.log("文件:", Object.keys(idByFile).length, " 标识符数:", totalId);
for (const f of Object.keys(idByFile).sort()) console.log("  " + f + ": " + idByFile[f]);
