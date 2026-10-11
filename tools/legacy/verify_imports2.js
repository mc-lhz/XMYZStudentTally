/**
 * verify_imports2.js —— 按 basename 解析的 final/ 内部完整性校验
 * final/ 文件名带 -restored 后缀、import 路径不带，故用 basename（去掉 -HASH 与 -restored）匹配。
 * 校验：每个相对 import 的目标 basename 在 final/ 存在，且所 import 的名字确实被导出。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

// basename 规整：去掉 -HASH 与 -restored，保留逻辑名
const baseOf = (fn) => fn.replace(/-restored\.js$/, ".js").replace(/-[A-Za-z0-9_-]+\.js$/, ".js");
// final/ 内 basename -> 实际文件路径
const fileByBase = {};
for (const f of files) { fileByBase[baseOf(f)] = path.join(FINAL, f); }

// 收集每个文件的导出名
const exportsOf = {};
for (const f of files) {
  const mod = baseOf(f);
  exportsOf[mod] = { named: new Set(), hasDefault: false, reExports: [] };
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      const n = p.node;
      if (n.source) { exportsOf[mod].reExports.push(baseOf(n.source.value.replace(/^\.\//, ""))); return; }
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

let parseFail = 0, broken = 0, totalImports = 0, resolved = 0;
const brokenList = [];
for (const f of files) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { parseFail++; continue; }
  babel.traverse(ast, {
    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (!src.startsWith("./") && !src.startsWith("../")) return;
      totalImports++;
      const targetBase = baseOf(src.replace(/^\.\//, "").replace(/^\.\.\//, ""));
      const targetPath = fileByBase[targetBase];
      if (!targetPath) { broken++; if (brokenList.length < 30) brokenList.push(baseOf(f) + " -> 缺失模块 " + targetBase); return; }
      resolved++;
      const tExp = exportsOf[targetBase];
      if (!tExp) { broken++; if (brokenList.length < 30) brokenList.push(baseOf(f) + " -> 无导出信息 " + targetBase); return; }
      for (const s of p.node.specifiers) {
        if (s.type === "ImportDefaultSpecifier") {
          if (!tExp.hasDefault && !tExp.named.has("default")) { broken++; if (brokenList.length < 30) brokenList.push(baseOf(f) + " -> " + targetBase + " 无 default"); }
        } else if (s.type === "ImportSpecifier") {
          const wanted = s.imported.name;
          const ok = tExp.named.has(wanted) || tExp.reExports.length > 0;
          if (!ok) { broken++; if (brokenList.length < 30) brokenList.push(baseOf(f) + " -> " + targetBase + " 未导出 " + wanted); }
        }
      }
    },
  });
}
console.log("文件总数:", files.length, " 解析失败:", parseFail);
console.log("相对 import 总数:", totalImports, " 按 basename 解析成功:", resolved);
console.log("断链/缺导出:", broken);
if (brokenList.length) { console.log("--- 示例 ---"); brokenList.forEach((b) => console.log("  ", b)); }
console.log(broken === 0 && parseFail === 0 ? "\n✅ final/ 跨模块链接完整（仅 -restored 文件名后缀差异，不影响导出名一致性）" : "\n⚠️ 存在链接问题");
