/**
 * rename_single_final.js
 * 消除 final/ 中剩余的 单字母 绑定（rename_all_single.js 因 childScopes 递归在
 * 本 @babel 版本下取不到 For/Catch/Arrow 嵌套 scope，漏掉了约 3217 个局部单字母）。
 *
 * 做法（沿用 restore.js 验证过的"先收集全部 scope 再逐 scope 重命名"）：
 *  - 用通用 enter(p){ if(p.scope) scopes.add(p.scope) } 收集【所有】scope，
 *    含 ForStatement / CatchClause / ArrowFunction 等，避免遗漏。
 *  - 仅处理 scope.bindings 中的绑定；对以下情形跳过：
 *      * kind === "module"（import/export 跨模块符号，已由 rename_all_single 处理为 zbN，不可动）
 *      * 以 PATTERN 开头（browser chunk 的 8 态 3-bit 查表常量，是对象键非绑定，保留）
 *      * 长度>1 且非 /^[A-Za-z]+[0-9]{3,}$/（即只动 单字母 与 三位以上数字自动名）
 *  - 按用法语境生成可读名：ref-val / 数组-list / 对象-obj / 串-text / 数-num /
 *    布尔-flag / new X-<ctor> / 函数-fn / catch 参数-err / for-of 项-item / 经典for计数器-idx / 其它-val
 *  - 同一 scope 内用 used 集合 + ownHas 防重名；逐 scope scope.rename 同步引用。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();
const vRe = /^[A-Za-z]+[0-9]{3,}$/;     // 三位以上数字的自动名（v1000/fn1000/...）
const sRe = /^.$/;                       // 单字母
const PATTERN = /^PATTERN/;              // 保留：8 态查表常量（对象键，理论上不会出现在 bindings）

function nameFor(binding) {
  const p = binding.path;
  if (!p) return "val";
  // catch 参数
  if (binding.scope && binding.scope.block && binding.scope.block.type === "CatchClause") return "err";
  // for-of / for-in 循环项
  if (p.parentPath && (p.parentPath.isForOfStatement() || p.parentPath.isForInStatement()) &&
      p.parentPath.node.left === p.node) return "item";
  // 经典 for(let i=0;...) 计数器
  if (p.parentPath && p.parentPath.isForStatement() && p.parentPath.node.left === p.node) return "idx";

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
        return nm ? nm.toLowerCase() : "inst";
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
            // 1) 收集全部 scope（通用 enter，含 For/Catch/Arrow）
            const scopes = new Set();
            programPath.traverse({
              enter(p) { if (p.scope) scopes.add(p.scope); },
            });

            // 2) 逐 scope 重命名
            for (const scope of scopes) {
              const counters = {};
              const used = new Set();
              const ownHas = (n) => Object.prototype.hasOwnProperty.call(scope.bindings, n);
              const gen = (prefix) => {
                let n, c = counters[prefix] || 0;
                do { c++; n = prefix + c; } while (ownHas(n) || used.has(n));
                counters[prefix] = c; used.add(n); return n;
              };
              const safe = (prefix) => (ownHas(prefix) || used.has(prefix)) ? gen(prefix) : (used.add(prefix), prefix);

              const names = Object.keys(scope.bindings);
              for (const name of names) {
                if (PATTERN.test(name)) continue;                 // 保留 PATTERN 常量
                const isTarget = sRe.test(name) || vRe.test(name);
                if (!isTarget) continue;
                const binding = scope.bindings[name];
                if (!binding) continue;
                if (binding.kind === "module") continue;          // 跨模块符号不动
                const target = safe(nameFor(binding));
                try { scope.rename(name, target); renamed++; }
                catch (e) { /* ignore */ }
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
console.log("DONE. 失败:", fail, " 重命名绑定:", renamed);
