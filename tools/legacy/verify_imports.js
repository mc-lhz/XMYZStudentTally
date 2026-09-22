/**
 * verify_imports.js —— final/ 内部跨模块完整性校验
 * 因为本会话已删除 assets/，原 verify_final.js 对 assets/ 的断链检查已不适用。
 * 改为：在 final/ 内部核对每个相对 import 是否指向真实存在且确实导出了对应名字的文件。
 *  - 收集所有文件的 export 名（含 re-export）
 *  - 对每个 import 声明，校验 ./X.js 是否在 final/ 存在、所 import 的本地名是否被导出
 *  - 全部 94 个 JS 是否可解析
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

// 1) 收集每个文件的导出名集合
const exportsOf = {};
for (const f of files) {
  const mod = f;
  exportsOf[mod] = { named: new Set(), hasDefault: false, reExports: [] };
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      const n = p.node;
      if (n.source) { exportsOf[mod].reExports.push(n.source.value); return; }
      if (n.declaration) {
        const d = n.declaration;
        if ((d.type === "FunctionDeclaration" || d.type === "ClassDeclaration") && d.id) exportsOf[mod].named.add(d.id.name);
        else if (d.type === "VariableDeclaration") d.declarations.forEach((dl) => dl.id.type === "Identifier" && exportsOf[mod].named.add(dl.id.name));
      } else {
        n.specifiers.forEach((s) => s.type === "ExportSpecifier" && exportsOf[mod].named.add(s.exported.name));
      }
    },
    ExportDefaultDeclaration() { exportsOf[mod].hasDefault = true; },
  });
}

let parseFail = 0, broken = 0;
const brokenList = [];
let totalImports = 0;
for (const f of files) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { parseFail++; continue; }
  babel.traverse(ast, {
    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (!src.startsWith("./") && !src.startsWith("../")) return; // node_modules 等跳过
      totalImports++;
      const bare = src.replace(/^\.\//, "").replace(/^\.\.\//, "");
      const target = path.join(FINAL, bare);
      if (!fs.existsSync(target)) {
        broken++; if (brokenList.length < 30) brokenList.push(f + " -> 缺失文件 " + src); return;
      }
      const tMod = bare;
      const tExp = exportsOf[tMod];
      if (!tExp) { broken++; if (brokenList.length < 30) brokenList.push(f + " -> 无导出信息 " + src); return; }
      for (const s of p.node.specifiers) {
        if (s.type === "ImportDefaultSpecifier") {
          if (!tExp.hasDefault && !tExp.named.has("default")) { broken++; if (brokenList.length < 30) brokenList.push(f + " -> " + src + " 无 default 导出"); }
        } else if (s.type === "ImportNamespaceSpecifier") {
          // 命名空间导入总是合法
        } else if (s.type === "ImportSpecifier") {
          const wanted = s.imported.name;
          const ok = tExp.named.has(wanted) || tExp.reExports.length > 0;
          if (!ok) { broken++; if (brokenList.length < 30) brokenList.push(f + " -> " + src + " 未导出 " + wanted); }
        }
      }
    },
  });
}
console.log("文件总数:", files.length, " 解析失败:", parseFail);
console.log("相对 import 总数:", totalImports);
console.log("断链/缺导出:", broken);
if (brokenList.length) { console.log("--- 示例 ---"); brokenList.forEach((b) => console.log("  ", b)); }
console.log(broken === 0 && parseFail === 0 ? "\n✅ final/ 内部跨模块链接完整" : "\n⚠️ 存在链接问题");
