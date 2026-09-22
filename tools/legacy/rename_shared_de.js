/**
 * rename_shared_de.js —— 仅把真实代码中残留的两个 shared_ 名语义化：
 *   shared_d -> defineComponent   (组件定义包装器)
 *   shared_e -> unref             (解包 ref)
 * 同步更新 index 的导出名 + 所有消费者的 import.imported 与本地用法。
 * 复用 rename_api.js 写法：babel.transformSync(compact:false, comments:true)，无条件写回，写后解析校验。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const MAP = [["shared_d", "defineComponent"], ["shared_e", "unref"]];
const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

let changed = 0, fail = 0;
allFiles.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program: {
            exit(p) {
              p.node.body.forEach((node) => {
                // 消费者 import 的 imported 名（模块侧导出名）需对齐 index 新名
                if (node.type === "ImportDeclaration") {
                  node.specifiers.forEach((s) => {
                    if (s.type === "ImportSpecifier") {
                      const hit = MAP.find(([o]) => o === s.imported.name);
                      if (hit) s.imported.name = hit[1];
                    }
                  });
                }
                // index 的 export {} 名（local/exported 同步）
                if (node.type === "ExportNamedDeclaration" && !node.source && !node.declaration) {
                  node.specifiers.forEach((s) => {
                    if (s.type === "ExportSpecifier") {
                      const hit = MAP.find(([o]) => o === s.local.name);
                      if (hit) {
                        s.local.name = hit[1];
                        if (s.exported.name === hit[0]) s.exported.name = hit[1];
                      }
                    }
                  });
                }
              });
              // 重命名本地绑定 + 所有用法引用
              for (const [o, n] of MAP) {
                if (p.scope.hasBinding(o)) {
                  try { p.scope.rename(o, n); } catch (e) {}
                }
              }
            },
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 4).join("\n"));
    fail++; return;
  }
  // 清理过时的中文文档注释（里面列了一堆旧 shared_ 名）
  out = out.replace(/\/\*\s*导出：[\s\S]*?\*\//, "/* index 运行时导出（已语义化） */");
  try { babel.parseSync(out, { sourceType: "module" }); }
  catch (e) { console.error("PARSE FAIL(after)", f, e.message); fail++; return; }
  if (out !== code) changed++;
  fs.writeFileSync(path.join(FINAL, f), out);
});

console.log("变更文件数:", changed, " 失败:", fail);
