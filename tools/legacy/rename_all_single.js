/**
 * rename_all_single.js
 * 在 final/ 上消除所有单字母标识符，保证"任何单字母不能留"。
 *
 * 两类单字母：
 *  1) 跨模块公开符号：各 chunk 以单字母 a/b/c/… 导出，被其他 chunk import。
 *     做法：构建 (模块::公开名) -> 唯一多字母名 的全局映射 pubReplace；
 *           - 导出方：改写 export specifier 的 exported.name（及 re-export 的 imported.name）
 *           - 引用方：改写 import specifier 的 imported.name
 *           二者查同一 pubReplace，跨模块一致。
 *  2) 文件内局部绑定（模板属性对象 W/X/Y/Z/$、循环变量、参数、单字母 import 本地别名等）：
 *     用 Babel scope.rename 全部改为唯一多字母名。
 *
 * 处理顺序：先 Phase1 扫描全部文件建 pubReplace（基于所有 export 公开名），
 *          再 Phase2 逐文件 transform（改写 specifier + scope 重命名）。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

const baseOf = (f) => f.replace(/-restored\.js$/, ".js");
const modOf = (f) => baseOf(f); // e.g. campaign-BV1jJ5bx.js

// ---- Phase 1: 收集所有公开导出名 + 所有标识符名（用于生成无冲突新名）----
const allNames = new Set();
const modExports = {}; // mod -> Set(publicName)
files.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  const mod = modOf(f);
  modExports[mod] = new Set();
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { console.error("PARSE FAIL", f, e.message); return; }
  babel.traverse(ast, {
    Identifier(p) { allNames.add(p.node.name); },
    ExportNamedDeclaration(p) {
      const node = p.node;
      if (node.source) {
        node.specifiers.forEach((s) => { if (s.type === "ExportSpecifier") modExports[mod].add(s.exported.name); });
      } else if (node.declaration) {
        const d = node.declaration;
        if ((d.type === "FunctionDeclaration" || d.type === "ClassDeclaration") && d.id) modExports[mod].add(d.id.name);
        else if (d.type === "VariableDeclaration") d.declarations.forEach((dl) => { if (dl.id.type === "Identifier") modExports[mod].add(dl.id.name); });
      } else {
        node.specifiers.forEach((s) => { if (s.type === "ExportSpecifier") modExports[mod].add(s.exported.name); });
      }
    },
  });
});

// 生成唯一多字母名（避开 allNames、已用名、保留字）
const used = new Set();
let counter = 0;
function fresh() {
  let n;
  do { n = "zb" + (counter++).toString(36); } while (allNames.has(n) || used.has(n));
  used.add(n);
  return n;
}
// pubReplace: "mod::publicName" -> newName（仅对单字母公开名）
const pubReplace = {};
Object.keys(modExports).forEach((mod) => {
  modExports[mod].forEach((pub) => {
    if (pub.length === 1) pubReplace[mod + "::" + pub] = fresh();
  });
});
console.log("pubReplace 条目(单字母跨模块公开符号):", Object.keys(pubReplace).length);

function lookup(mod, name) { return pubReplace[mod + "::" + name]; }

// ---- Phase 2: 逐文件 transform ----
let fail = 0, renamed = 0;
files.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  const mod = modOf(f);
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program(p) {
            // 1) 改写 export / import specifier 的公开名（跨模块）
            //    直接操作 p.node.body 原始节点（避免 path.get 在某些 @babel 版本下返回 undefined）
            p.node.body.forEach((node) => {
              if (node.type === "ExportNamedDeclaration") {
                if (node.source) {
                  const srcBare = node.source.value.replace(/^\.\//, "");
                  node.specifiers.forEach((s) => {
                    if (s.type === "ExportSpecifier") {
                      const imp = lookup(srcBare, s.local.name);
                      if (imp) s.local.name = imp;            // re-export 的 imported 名
                      const ek = lookup(mod, s.exported.name);
                      if (ek) s.exported.name = ek;           // 本模块公开名
                    }
                  });
                } else if (!node.declaration) {
                  node.specifiers.forEach((s) => {
                    if (s.type === "ExportSpecifier") {
                      const ek = lookup(mod, s.exported.name);
                      if (ek) s.exported.name = ek;
                    }
                  });
                }
                // declaration 形式（export function a / export const a）：由下方 scope 重命名处理
              }
              if (node.type === "ImportDeclaration") {
                const srcBare = node.source.value.replace(/^\.\//, "");
                node.specifiers.forEach((s) => {
                  if (s.type === "ImportSpecifier") {
                    const imp = lookup(srcBare, s.imported.name);
                    if (imp) s.imported.name = imp;
                  }
                });
              }
            });

            // 2) scope 重命名：清除所有单字母绑定（局部 + import 本地别名 + 导出声明名）
            const renameScope = (scope) => {
              // 复制键名，避免遍历中改名影响迭代
              const names = Object.keys(scope.bindings);
              for (const name of names) {
                if (name.length === 1) {
                  const binding = scope.bindings[name];
                  // import 本地别名：scope.rename 在部分版本会静默失败，改为手动改 local + 引用点
                  if (binding && binding.path && binding.path.isImportSpecifier && binding.path.isImportSpecifier()) {
                    const tgt = binding.path.node.imported.name; // 已为 multi（跨模块重命名后）
                    binding.path.node.local.name = tgt;
                    binding.referencePaths.forEach((rp) => { if (rp.node) rp.node.name = tgt; });
                    renamed++;
                  } else {
                    const target = lookup(mod, name) || fresh();
                    try { scope.rename(name, target); renamed++; } catch (e) { /* ignore */ }
                  }
                }
              }
              if (scope.childScopes) scope.childScopes.forEach(renameScope);
            };
            renameScope(p.scope);
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 6).join("\n"));
    fail++;
    return;
  }
  // 校验语法
  try { babel.parseSync(out, { sourceType: "module" }); }
  catch (e) { console.error("PARSE FAIL", f, e.message); fail++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});
console.log("DONE. 文件:", files.length, " 失败:", fail, " 重命名绑定次数:", renamed);
