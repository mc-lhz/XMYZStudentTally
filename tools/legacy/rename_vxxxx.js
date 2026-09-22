/**
 * rename_vxxxx.js  (修正版)
 * 把 final/ 里 restore.js 回退生成的 vNNNN 标识符（v1000/v1001/...）按用法语境重命名为可读名。
 *  - 用 restore.js 验证过的"先收集全部 scope 再逐 scope 重命名"模式（手动递归 childScopes 在部分 @babel 版本下取不到）。
 *  - ref/computed/reactive/... 调用结果 -> refVal / computedVal ...
 *  - useXxx() -> 保留语义名 useXxx（重名加序号）
 *  - 数组/对象/字符串/数字/布尔/ new X() -> list/obj/text/num/flag/<ctor>
 *  - 函数声明/表达式 -> fn
 *  - 其他 -> val
 *  - 特例：__vite__mapDeps 助手参数 -> depIndexes/mapDepsSelf/depMeta/depKey
 *  - import/export 绑定（kind==="module"）不动，保跨模块链接。
 *  - 逐作用域 scope.rename，引用自动同步；注释保留。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();
// 匹配 restore.js 回退生成的所有"前缀+三位以上数字"自动名：v1000 / fn1000 / ref1000 / obj1000 / list1000 / text1000 ...
// 已重命名的 val/refVal/obj 等无尾随数字，不会被二次匹配（幂等）。
const vRe = /^[A-Za-z]+[0-9]{3,}$/;

function nameFor(binding) {
  const p = binding.path;
  if (!p) return "val";
  if (p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression()) return "fn";
  if (p.isVariableDeclarator()) {
    const init = p.node.init;
    if (init) {
      if (init.type === "CallExpression") {
        const c = init.callee;
        const nm = (c.name) || (c.property && c.property.name) || "";
        if (/^use[A-Z]/.test(nm)) return nm;
        if (["ref", "computed", "reactive", "shallowRef", "toRef", "toRefs", "customRef", "unref", "isRef", "triggerRef"].includes(nm)) return nm + "Val";
        if (["watch", "watchEffect", "watchPostEffect", "watchSyncEffect"].includes(nm)) return "watch";
        if (["nextTick", "markRaw", "toRaw", "shallowReactive", "defineAsyncComponent", "defineComponent", "defineProps", "defineEmits", "defineExpose", "inject", "provide"].includes(nm)) return nm;
        if (nm === "axios" || nm === "http" || /request/i.test(nm)) return "req";
        if (["Promise", "Map", "Set", "Array", "Object", "Date", "RegExp", "Error", "URL", "URLSearchParams", "WeakMap", "WeakSet"].includes(nm)) return nm.toLowerCase();
      }
      if (init.type === "NewExpression") {
        const c = init.callee;
        const nm = (c.name) || (c.property && c.property.name) || "";
        if (nm) return nm.toLowerCase();
        return "inst";
      }
      if (init.type === "ArrayExpression") return "list";
      if (init.type === "ObjectExpression") return "obj";
      if (init.type === "StringLiteral" || init.type === "TemplateLiteral") return "text";
      if (init.type === "NumericLiteral") return "num";
      if (init.type === "BooleanLiteral") return "flag";
      if (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression") return "fn";
      if (["ConditionalExpression", "BinaryExpression", "LogicalExpression", "MemberExpression", "CallExpression", "Identifier", "UnaryExpression"].includes(init.type)) return "val";
    }
  }
  if (p.isAssignmentExpression()) return "val";
  return "val";
}

let fail = 0, renamed = 0;
for (const f of files) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program(programPath) {
            // 1) 收集全部 scope + 定位 __vite__mapDeps 参数
            const scopes = new Set();
            const mapDepsNames = new Map(); // param node -> canonical
            programPath.traverse({
              "Program|FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ObjectMethod|BlockStatement"(p) {
                if (p.scope) scopes.add(p.scope);
              },
              VariableDeclarator(dp) {
                const id = dp.node.id;
                if (id && id.type === "Identifier" && id.name === "__vite__mapDeps" &&
                    dp.node.init && (dp.node.init.type === "ArrowFunctionExpression" || dp.node.init.type === "FunctionExpression")) {
                  const params = dp.node.init.params;
                  const canon = ["depIndexes", "mapDepsSelf", "depMeta", "depKey", "depArg4", "depArg5"];
                  params.forEach((pr, i) => {
                    let node = pr;
                    if (pr.type === "AssignmentPattern") node = pr.left;
                    if (node && node.type === "Identifier" && vRe.test(node.name)) mapDepsNames.set(node, canon[i] || ("depArg" + i));
                  });
                }
              },
            });

            // 2) 逐 scope 重命名
            for (const scope of scopes) {
              const counters = {};
              const used = new Set();
              const gen = (prefix) => {
                if ((counters[prefix] || 0) === 0 && !scope.hasBinding(prefix) && !used.has(prefix)) {
                  counters[prefix] = 1; used.add(prefix); return prefix;
                }
                let n;
                do { const c = (counters[prefix] = (counters[prefix] || 0) + 1); n = prefix + c; }
                while (scope.hasBinding(n) || used.has(n));
                used.add(n); return n;
              };
              const safe = (prefix) => (scope.hasBinding(prefix) || used.has(prefix)) ? gen(prefix) : (used.add(prefix), prefix);

              const names = Object.keys(scope.bindings);
              for (const name of names) {
                if (!vRe.test(name)) continue;
                const binding = scope.bindings[name];
                if (!binding) continue;
                if (binding.kind === "module") continue; // 跨模块名不动
                let target;
                if (binding.path && mapDepsNames.has(binding.path.node)) target = safe(mapDepsNames.get(binding.path.node));
                else target = gen(nameFor(binding));
                try { scope.rename(name, target); renamed++; } catch (e) { /* ignore */ }
              }
            }
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("FAIL", f, (e.message || "").split("\n")[0]);
    fail++; continue;
  }
  try { babel.parseSync(out, { sourceType: "module" }); }
  catch (e) { console.error("PARSEFAIL", f, e.message); fail++; continue; }
  fs.writeFileSync(path.join(FINAL, f), out);
}
console.log("DONE. 失败:", fail, " 重命名:", renamed);
