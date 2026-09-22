/**
 * rename_zb_all.js —— 彻底反掉 final/ 中残留的 zbXX（唯一目标名，避免重复导出冲突）。
 *
 * 1) 全局收集每个“以 zbXX 作公开名导出”的映射：opaquePub -> 唯一语义目标。
 *    目标名 = 行为推断基名 + 去重后缀（如 helper_zb48 / statusLabel_zb47），保证全站唯一、可链接。
 * 2) PASS-LOCAL：逐文件把该本地声明(=opaquePub 的 local)改名成目标；同时把本文件 direct export 的
 *    exported 名改成目标（export { statusLabel_zb47 }）。
 * 3) PASS-GLOBAL：逐文件改写 ①普通 import 的 imported ②re-export(from) 的 local，查全局 map。
 *    本地别名保持不变 -> 链接零风险。babel.transformSync 保注释/美化。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const OPAQUE = /^[a-z]+[0-9a-z]*[0-9]+$/;
const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

function inferBase(code) {
  if (/label:\s*["'][一-龥]/.test(code) && /class:\s*["']status-/.test(code)) return "statusLabel";
  if (/\.join\(\s*["'][\s\S]*?\/\s*["']\s*\)/.test(code) || /list\.push\([^)]*\)[^;]*list\.join/.test(code)) return "joinPath";
  if (/switch\s*\(val\)\s*\{[^}]*case\s+\d+:\s*return/.test(code)) return "statusType";
  if (/\bMath\.(floor|round|random)\b/.test(code)) return "mathHelper";
  if (/withScopeId|_scopeId|data-v-/.test(code)) return "scopedStyle";
  if (/\.filter\(|\.map\(|\.find\(/.test(code)) return "arrayHelper";
  if (/document\.|\.style\.|addEventListener|classList/.test(code)) return "domHelper";
  return "helper";
}

// 收集每个文件 export 里 opaque 公开名 -> 其 local 声明名
const fileOpaqueLocal = {}; // file -> { localName: pubName }
for (const f of allFiles) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast; try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  const m = {};
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (p.node.source || p.node.declaration) return;
      p.node.specifiers.forEach((s) => {
        if (s.type === "ExportSpecifier" && OPAQUE.test(s.exported.name)) m[s.local.name] = s.exported.name;
      });
    },
  });
  if (Object.keys(m).length) fileOpaqueLocal[f] = m;
}

// 全局唯一目标映射
const pubToTarget = {};
const seenTarget = new Set();
for (const f of Object.keys(fileOpaqueLocal)) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  for (const localName of Object.keys(fileOpaqueLocal[f])) {
    const pub = fileOpaqueLocal[f][localName];
    if (pubToTarget[pub]) continue;
    const base = inferBase(code.slice(code.indexOf("function " + localName + "(") >= 0 ? code.indexOf("function " + localName + "(") : 0));
    let tgt = base + "_" + pub, c = 1;
    while (seenTarget.has(tgt)) tgt = base + "_" + pub + (c++);
    seenTarget.add(tgt); pubToTarget[pub] = tgt;
  }
}

const lookup = (n) => pubToTarget[n];

// PASS-LOCAL：改名本地声明 + 本文件 direct export
let p1 = 0, fails = 0;
allFiles.forEach((f) => {
  const m = fileOpaqueLocal[f]; if (!m) return;
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program(p) {
            const names = Object.keys(p.scope.bindings);
            for (const name of names) {
              if (!m[name]) continue;
              const bd = p.scope.bindings[name];
              if (!bd || !bd.path || (bd.path.isImportSpecifier && bd.path.isImportSpecifier())) continue;
              const tgt = lookup(m[name]);
              let t = tgt, c = 1; while (p.scope.hasBinding(t) && t !== name) t = tgt + (c++);
              try { p.scope.rename(name, t); p1++; } catch (e) { /* ignore */ }
            }
            // 本文件 direct export 的 exported 名也改
            p.node.body.forEach((node) => {
              if (node.type === "ExportNamedDeclaration" && !node.source && !node.declaration) {
                node.specifiers.forEach((s) => {
                  if (s.type === "ExportSpecifier") { const ek = lookup(s.exported.name); if (ek) s.exported.name = ek; }
                });
              }
            });
          },
        },
      })],
    }).code;
  } catch (e) { console.error("P1 FAIL", f, e.message); fails++; return; }
  try { babel.parseSync(out, { sourceType: "module" }); } catch (e) { console.error("P1 PARSE FAIL", f, e.message); fails++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});

// PASS-GLOBAL：import.imported + re-export local
let imp = 0, reexp = 0;
allFiles.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program(p) {
            p.node.body.forEach((node) => {
              if (node.type === "ImportDeclaration") {
                node.specifiers.forEach((s) => {
                  if (s.type === "ImportSpecifier") { const ik = lookup(s.imported.name); if (ik && ik !== s.imported.name) { s.imported.name = ik; imp++; } }
                });
              }
              if (node.type === "ExportNamedDeclaration" && node.source) {
                node.specifiers.forEach((s) => {
                  if (s.type === "ExportSpecifier") { const ik = lookup(s.local.name); if (ik && ik !== s.local.name) { s.local.name = ik; reexp++; } }
                });
              }
            });
          },
        },
      })],
    }).code;
  } catch (e) { console.error("P2 FAIL", f, e.message); fails++; return; }
  try { babel.parseSync(out, { sourceType: "module" }); } catch (e) { console.error("P2 PARSE FAIL", f, e.message); fails++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});
console.log("pubToTarget:", JSON.stringify(pubToTarget));
console.log("PASS-LOCAL 本地声明改名:", p1, " PASS-GLOBAL import:", imp, " re-export:", reexp, " 失败:", fails);
