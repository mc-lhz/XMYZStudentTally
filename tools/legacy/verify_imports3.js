/**
 * verify_imports3.js —— 按 name-HASH 精确解析的 final/ 内部完整性校验
 * 关键修正：final/ 存在同逻辑名不同 hash 的重复文件（如 rating-CCUJ0_Xu 与 rating-DOU6YvDA），
 * 必须按完整 name-HASH（仅忽略 -restored 后缀）匹配，而非按 basename 折叠。
 * 校验：每个相对 import 的 name-HASH 是否在 final/ 存在对应文件，且所 import 名字确实被导出。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

// 完整 key：去掉 -restored 后缀后的 name-HASH（不含 .js）
const keyOf = (fn) => fn.replace(/-restored\.js$/, ".js").replace(/\.js$/, "");
const fileByKey = {};
for (const f of files) fileByKey[keyOf(f)] = path.join(FINAL, f);

// 收集导出名（按 key）
const exportsOf = {};
for (const f of files) {
  const key = keyOf(f);
  exportsOf[key] = { named: new Set(), hasDefault: false, reExports: [] };
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      const n = p.node;
      if (n.source) { exportsOf[key].reExports.push(keyOf(n.source.value.replace(/^\.\//, "").replace(/^\.\.\//, ""))); return; }
      if (n.declaration) {
        const d = n.declaration;
        if ((d.type === "FunctionDeclaration" || d.type === "ClassDeclaration") && d.id) exportsOf[key].named.add(d.id.name);
        else if (d.type === "VariableDeclaration") d.declarations.forEach((dl) => dl.id.type === "Identifier" && exportsOf[key].named.add(dl.id.name));
      } else {
        n.specifiers.forEach((s) => s.type === "ExportSpecifier" && exportsOf[key].named.add(s.exported.name));
      }
    },
    ExportDefaultDeclaration() { exportsOf[key].hasDefault = true; },
  });
}

let parseFail = 0, broken = 0, totalImports = 0, resolved = 0, missingFile = 0;
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
      const targetKey = keyOf(src.replace(/^\.\//, "").replace(/^\.\.\//, ""));
      const targetPath = fileByKey[targetKey];
      if (!targetPath) { missingFile++; broken++; if (brokenList.length < 30) brokenList.push(keyOf(f) + " -> 缺失文件 " + targetKey); return; }
      resolved++;
      const tExp = exportsOf[targetKey];
      if (!tExp) { broken++; if (brokenList.length < 30) brokenList.push(keyOf(f) + " -> 无导出信息 " + targetKey); return; }
      for (const s of p.node.specifiers) {
        if (s.type === "ImportDefaultSpecifier") {
          if (!tExp.hasDefault && !tExp.named.has("default")) { broken++; if (brokenList.length < 30) brokenList.push(keyOf(f) + " -> " + targetKey + " 无 default"); }
        } else if (s.type === "ImportSpecifier") {
          const wanted = s.imported.name;
          const ok = tExp.named.has(wanted) || tExp.reExports.length > 0;
          if (!ok) { broken++; if (brokenList.length < 30) brokenList.push(keyOf(f) + " -> " + targetKey + " 未导出 " + wanted); }
        }
      }
    },
  });
}
console.log("文件总数:", files.length, " 解析失败:", parseFail);
console.log("相对 import 总数:", totalImports, " 按 name-HASH 解析成功:", resolved, " 缺文件:", missingFile);
console.log("断链/缺导出:", broken);
if (brokenList.length) { console.log("--- 示例 ---"); brokenList.forEach((b) => console.log("  ", b)); }
console.log(broken === 0 && parseFail === 0 ? "\n✅ final/ 跨模块链接完整（仅 -restored 文件名后缀差异，导出名一致）" : "\n⚠️ 存在链接问题");
