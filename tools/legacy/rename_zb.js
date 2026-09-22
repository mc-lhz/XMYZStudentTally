/**
 * rename_zb.js —— 反掉 final/ 中剩余 14 个以 zbXX 作“公开导出名”的本地 helper 声明。
 *
 * 这些本地函数（状态标签格式化/路径拼接/组件内部等）不发 HTTP、无法按端点命名，
 * 其导出公开名保持 zbXX 不变（消费方仍按 zbXX 导入 → 链接零风险），
 * 只把本地声明改名为 local_<公开名>（如 statusLabel 声明 → local_zb47，可读且指明归属）。
 *
 * 纯改本地绑定，不动 import.imported / export.exported，链接零风险。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const OPAQUE = /^[a-z]+[0-9a-z]*[0-9]+$/;
const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

// 收集每个文件里“以 zbXX 公开名导出”的本地声明名 -> 公开名
const opaquePublic = {}; // "file::local" -> publicOpaque
for (const f of allFiles) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast; try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (p.node.source || p.node.declaration) return;
      p.node.specifiers.forEach((s) => {
        if (s.type === "ExportSpecifier" && OPAQUE.test(s.exported.name)) {
          opaquePublic[f + "::" + s.local.name] = s.exported.name;
        }
      });
    },
  });
}

const usedGlobal = new Set();
let fails = 0, renamed = 0, skipped = 0;
allFiles.forEach((f) => {
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
              if (!OPAQUE.test(name)) continue;
              const bd = p.scope.bindings[name];
              if (!bd || !bd.path || (bd.path.isImportSpecifier && bd.path.isImportSpecifier())) continue;
              const pub = opaquePublic[f + "::" + name];
              if (!pub) continue;
              let tgt = "local_" + pub, counter = 1;
              while ((p.scope.hasBinding(tgt) && tgt !== name) || usedGlobal.has(tgt)) tgt = "local_" + pub + (counter++);
              usedGlobal.add(tgt);
              try { p.scope.rename(name, tgt); renamed++; } catch (e) { skipped++; }
            }
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 4).join("\n"));
    fails++; return;
  }
  try { babel.parseSync(out, { sourceType: "module" }); } catch (e) { console.error("PARSE FAIL", f, e.message); fails++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});
console.log("本地 helper 声明重命名(local_<pub>):", renamed, " 跳过:", skipped, " 失败:", fails);
