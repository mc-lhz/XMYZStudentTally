// 跨模块链接校验：每条 import 的名字必须在目标模块的 export 中存在。
// 用法: node tools/verify_links.js   (从任意 cwd 均可运行)
const fs = require("fs");
const path = require("path");
const { ASSETS, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();
const dir = ASSETS;

const files = fs.readdirSync(dir).filter(x => x.endsWith(".js"));
const basenameToFull = {};
for (const f of files) basenameToFull[f.replace(/\.js$/, "")] = f;

// 收集每个文件的导出名 + 导入
const exportsMap = {}; // file -> Set(exported names)
const importsList = []; // {file, imported, local, from}
const parseErr = [];

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] }); }
  catch (e) { parseErr.push(f + ": " + e.message.slice(0, 60)); continue; }
  const exp = new Set();
  const imp = [];
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (p.node.specifiers) p.node.specifiers.forEach(s => { if (s.exported) exp.add(s.exported.name); });
      // export const/function
      if (p.node.declaration) {
        const d = p.node.declaration;
        if (d.id) exp.add(d.id.name);
        if (d.declarations) d.declarations.forEach(dd => dd.id && exp.add(dd.id.name));
      }
    },
    ExportDefaultDeclaration(p) { exp.add("default"); },
    ImportDeclaration(p) {
      const from = p.node.source.value.replace(/^\.\//, "").replace(/\.js$/, "");
      p.node.specifiers.forEach(s => {
        if (s.type === "ImportSpecifier") imp.push({ file: f, imported: s.imported.name, local: s.local.name, from });
        else if (s.type === "ImportDefaultSpecifier") imp.push({ file: f, imported: "default", local: s.local.name, from });
      });
    }
  });
  exportsMap[f] = exp;
  importsList.push(...imp);
}

// 链接校验
let broken = [];
for (const it of importsList) {
  const target = basenameToFull[it.from];
  if (!target) { broken.push(`${it.file}: 找不到模块 ./${it.from}.js`); continue; }
  if (!exportsMap[target].has(it.imported)) {
    broken.push(`${it.file}: import { ${it.imported} } 但 ${target} 未导出该名`);
  }
}

console.log("=== 严格链接校验 ===");
console.log("解析错误:", parseErr.length ? parseErr.join("; ") : "无 ✓");
console.log("断链数:", broken.length);
if (broken.length) console.log(broken.slice(0, 30).join("\n"));

// 别名残留
const aliases = ["zb5q","zb5r","zb5o","zb5p","zb4u","zb4v","zb4w","zb4x","zb4y","zb4r","zb4d","zbr","zbp","zb1s","zb4t","zb4s","zb4z"];
let res = 0;
for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), "utf8");
  for (const a of aliases) if (new RegExp("\\b" + a + "\\b").test(code)) res++;
}
console.log("别名残留(标识符)数:", res, res === 0 ? "✓" : "✗");
