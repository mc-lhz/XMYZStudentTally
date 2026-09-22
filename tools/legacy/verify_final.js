/**
 * verify_final.js — 严格校验 final/ 交付物质量
 *  1) 剩余单字母【绑定/引用】计数（排除对象属性键、成员访问键、非计算的 import/export 名以外场景）
 *  2) 跨模块 import 路径完整性：./X.js 是否在 assets/ 中存在
 *  3) 全部 94 个 JS 是否可解析
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const ASSETS = path.join(__dirname, "assets");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

let totalSingle = 0;
const offenders = []; // {file, name, kind, line}
let brokenImports = 0;
const brokenList = [];
let parseFail = 0;

for (const f of files) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); }
  catch (e) { parseFail++; console.error("PARSE FAIL:", f, e.message); continue; }

  // --- 1) 绑定名（scope 全部层级） ---
  const singleBindings = new Set();
  let programScope = null;
  babel.traverse(ast, {
    Program(p) { programScope = p.scope; },
  });
  if (!programScope) { console.error("NO SCOPE:", f); parseFail++; continue; }
  const collect = (scope) => {
    for (const name of Object.keys(scope.bindings)) {
      if (name.length === 1) singleBindings.add(name);
    }
    scope.childScopes && scope.childScopes.forEach(collect);
  };
  collect(programScope);

  // --- 2) import/export specifier 中的单字母公开名 ---
  const singleSpec = new Set();
  babel.traverse(ast, {
    ImportSpecifier(p) {
      if (p.node.imported.name.length === 1) singleSpec.add(p.node.imported.name);
      if (p.node.local.name.length === 1) singleSpec.add(p.node.local.name);
    },
    ExportSpecifier(p) {
      if (p.node.exported.name.length === 1) singleSpec.add(p.node.exported.name);
      if (p.node.local && p.node.local.name && p.node.local.name.length === 1) singleSpec.add(p.node.local.name);
    },
  });

  // --- 3) 游离（未绑定）单字母引用（排除属性键） ---
  const freeSingle = new Set();
  babel.traverse(ast, {
    Identifier(p) {
      const n = p.node;
      if (n.name.length !== 1) return;
      // 排除：非计算的成员访问属性键 / 对象字面量属性键
      const par = p.parent;
      if (par.type === "MemberExpression" && par.property === n && !par.computed) return;
      if ((par.type === "ObjectProperty" || par.type === "ObjectMethod") && par.key === n && !par.computed) return;
      if (par.type === "ImportSpecifier" || par.type === "ExportSpecifier" || par.type === "ImportDefaultSpecifier" || par.type === "ImportNamespaceSpecifier") return;
      // 已绑定（是本地/参数/声明）的由 singleBindings 统计
      const binding = p.scope.getBinding(n.name);
      if (binding) return;
      // 未绑定 -> 视为游离单字母引用
      freeSingle.add(n.name);
    },
  });

  const allSingle = new Set([...singleBindings, ...singleSpec, ...freeSingle]);
  if (allSingle.size) {
    totalSingle += allSingle.size;
    offenders.push({ file: f, single: [...allSingle].join(",") });
  }

  // --- 4) import 路径完整性 ---
  babel.traverse(ast, {
    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (!src.startsWith("./") && !src.startsWith("../")) return;
      const bare = src.replace(/^\.\//, "").replace(/^\.\.\//, "");
      const target = path.join(ASSETS, bare);
      if (!fs.existsSync(target)) {
        brokenImports++;
        if (brokenList.length < 20) brokenList.push(f + " -> " + src);
      }
    },
  });
}

console.log("文件总数:", files.length);
console.log("解析失败:", parseFail);
console.log("剩余单字母(绑定/引用/公开名):", totalSingle);
console.log("跨模块断链 import:", brokenImports);
if (offenders.length) {
  console.log("--- 含单字母的文件 ---");
  for (const o of offenders.slice(0, 40)) console.log("  ", o.file, "->", o.single);
}
if (brokenList.length) {
  console.log("--- 断链示例 ---");
  for (const b of brokenList) console.log("  ", b);
}
console.log(totalSingle === 0 && brokenImports === 0 && parseFail === 0 ? "\n✅ 校验通过：无单字母、无断链、全部可解析" : "\n⚠️ 存在需处理项");
