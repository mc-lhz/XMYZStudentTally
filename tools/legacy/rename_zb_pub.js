/**
 * rename_zb_pub.js（修正版）—— 把 final/ 中残留的 zbXX 公开名彻底反掉（含本地已是语义名的组件 helper）。
 *
 * 构建全局映射：凡某文件 export 的公开名是 opaque(zbXX)，其目标名 = 本地声明名（若已语义）
 *   否则按函数体行为推断；记录 pubToSem[opaquePub] = target。
 * 然后逐文件改写：
 *   ① 普通 import 的 imported 名（若它是某 opaquePub 的目标来源）-> target
 *   ② 本文件 direct export 的 exported 名 -> target
 *   ③ re-export(from) 的 local 名（= opaquePub）-> target
 * 本地别名保持不变 -> 链接零风险。babel.transformSync 保注释/美化。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const OPAQUE = /^[a-z]+[0-9a-z]*[0-9]+$/;
const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

function inferName(code) {
  if (/label:\s*["'][一-龥]/.test(code) && /class:\s*["']status-/.test(code)) return "statusLabel";
  if (/\.join\(\s*["'][\s\S]*?\/\s*["']\s*\)/.test(code) || /list\.push\([^)]*\)[^;]*list\.join/.test(code)) return "joinPath";
  if (/switch\s*\(val\)\s*\{[^}]*case\s+\d+:\s*return/.test(code)) return "statusType";
  if (/\bMath\.(floor|round|random)\b/.test(code)) return "mathHelper";
  if (/withScopeId|_scopeId|data-v-/.test(code)) return "scopedStyle";
  if (/\.filter\(|\.map\(|\.find\(/.test(code)) return "arrayHelper";
  if (/document\.|\.style\.|addEventListener|classList/.test(code)) return "domHelper";
  return "helper";
}

const pubToSem = {};
for (const f of allFiles) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast; try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  const declSrc = {};
  babel.traverse(ast, {
    FunctionDeclaration(p) { if (p.node.id) declSrc[p.node.id.name] = code.slice(p.node.start, p.node.end); },
    VariableDeclarator(p) { if (p.node.id.type === "Identifier") declSrc[p.node.id.name] = code.slice(p.node.start, p.node.end); },
  });
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (exportedOpaque(p)) {
        p.node.specifiers.forEach((s) => {
          if (s.type !== "ExportSpecifier") return;
          const pub = s.exported.name, local = s.local.name;
          if (!OPAQUE.test(pub)) return;
          let target = OPAQUE.test(local) ? inferName(declSrc[local] || "") : local;
          // 同 target 去重
          if (!pubToSem[pub]) pubToSem[pub] = target;
        });
      }
    },
  });
}
function exportedOpaque(p) { return !p.node.source && !p.node.declaration; }

const lookup = (name) => pubToSem[name];

let fails = 0, imp = 0, exp = 0, reexp = 0;
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
                  if (s.type === "ImportSpecifier") {
                    const ik = lookup(s.imported.name);
                    if (ik && ik !== s.imported.name) { s.imported.name = ik; imp++; }
                  }
                });
              }
              if (node.type === "ExportNamedDeclaration" && !node.source && !node.declaration) {
                node.specifiers.forEach((s) => {
                  if (s.type === "ExportSpecifier") {
                    const ek = lookup(s.exported.name);
                    if (ek && ek !== s.exported.name) { s.exported.name = ek; exp++; }
                  }
                });
              }
              if (node.type === "ExportNamedDeclaration" && node.source) {
                node.specifiers.forEach((s) => {
                  if (s.type === "ExportSpecifier") {
                    const ik = lookup(s.local.name);
                    if (ik && ik !== s.local.name) { s.local.name = ik; reexp++; }
                  }
                });
              }
            });
          },
        },
      })],
    }).code;
  } catch (e) { console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 4).join("\n")); fails++; return; }
  try { babel.parseSync(out, { sourceType: "module" }); } catch (e) { console.error("PARSE FAIL", f, e.message); fails++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});
console.log("pubToSem size:", Object.keys(pubToSem).length);
console.log("import.imported 改写:", imp, " direct export 改写:", exp, " re-export local 改写:", reexp, " 失败:", fails);
console.log("sample map:", JSON.stringify(Object.entries(pubToSem).slice(0, 20)));
