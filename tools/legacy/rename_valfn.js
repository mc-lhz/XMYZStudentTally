const fs = require("fs"), path = require("path");
const babel = require("C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules/@babel/core");
const dir = "final";

const GEN = /^(val|fn|from|obj|list|arr|x|y|el|item|data|tmp|res|ret|ctx|param|arg|idx|key|val2|fn2)[0-9]*$/;

const RESERVED = new Set(["delete","return","if","else","for","while","do","switch","case","break","continue","new","typeof","instanceof","in","of","void","this","class","extends","super","import","export","default","try","catch","finally","throw","yield","await","async","function","var","let","const","with","debugger","enum","public","private","protected","static","interface","type","namespace","implements","package","null","true","false","undefined","NaN","Infinity"]);

// 去掉动词前缀，取资源名词 (getAdminTicketActivity -> adminTicketActivity)
function stripVerb(name) {
  const m = name.match(/^(get|create|update|delete|del|put|post|fetch|send|load|save|search|upload|download|query|submit|add|remove|check|validate|format|parse|convert|use|toggle|set|open|close|build|calc|compute|render)([A-Z].*)$/);
  if (m) return m[2].charAt(0).toLowerCase() + m[2].slice(1);
  return name;
}
function uniqueName(scope, base) {
  let n = base, i = 2;
  while (scope.getOwnBinding(n)) n = base + (i++);
  return n;
}
function safeTarget(name) {
  if (!name) return null;
  if (RESERVED.has(name)) return null;
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)) return null;
  return name;
}
// 从声明 init 推断目标名；无法推断返回 null
function infer(p) {
  const id = p.node.id;
  if (!id || id.type !== "Identifier" || !GEN.test(id.name)) return null;
  const init = p.node.init;
  if (!init) return null;
  let callee = init.type === "AwaitExpression" ? init.argument : init;
  // 直接调用语义函数: val1 = await getX() / val1 = getX()
  if (callee.type === "CallExpression") {
    let name = null;
    if (callee.callee.type === "Identifier") name = callee.callee.name;
    else if (callee.callee.type === "MemberExpression" && callee.callee.property && callee.callee.property.type === "Identifier") name = callee.callee.property.name;
    if (name && /^[a-z]/.test(name)) {
      // 仅当函数名本身看起来是语义化(含驼峰或已知动词前缀)才采用
      if (/[A-Z]/.test(name) || /^(get|create|update|put|post|fetch|send|load|save|search|upload|use|toggle|set|add|remove|query|submit|handle|on|build|del|delete|calc|compute|render|check|validate|format|parse|convert)/i.test(name)) {
        const t = stripVerb(name);
        // 必须有实际变化、合法、非保留字才采用 (避免 delete->delete 这类)
        if (t && t !== name && safeTarget(t)) return uniqueName(p.scope, t);
      }
    }
  }
  // obj.value -> objValue  (如 refVal8.value -> refVal8Value, form.value -> formValue)
  if (init.type === "MemberExpression" && init.property && init.property.name === "value"
      && init.object && init.object.type === "Identifier" && !GEN.test(init.object.name)) {
    const t = init.object.name + "Value";
    if (safeTarget(t)) return uniqueName(p.scope, t);
  }
  // obj.prop -> objProp  (如 props.id -> propsId, route.params -> routeParams)
  if (init.type === "MemberExpression" && init.object && init.object.type === "Identifier"
      && init.property && init.property.type === "Identifier" && init.property.name !== "value"
      && !GEN.test(init.object.name) && !GEN.test(init.property.name)) {
    const t = init.object.name + init.property.name.charAt(0).toUpperCase() + init.property.name.slice(1);
    if (safeTarget(t)) return uniqueName(p.scope, t);
  }
  // ref(INIT) / computed(...) 中 INIT 为简单标识符或成员 -> 用其命名 + Ref
  if (callee.type === "CallExpression" && callee.callee.type === "Identifier"
      && /^(ref|computed|shallowRef|reactive)$/.test(callee.callee.name) && callee.arguments.length) {
    const a0 = callee.arguments[0];
    let base = null;
    if (a0.type === "Identifier" && !GEN.test(a0.name)) base = a0.name;
    else if (a0.type === "MemberExpression" && a0.object.type === "Identifier" && a0.property && a0.property.type === "Identifier" && !GEN.test(a0.object.name)) {
      base = a0.object.name + a0.property.name.charAt(0).toUpperCase() + a0.property.name.slice(1);
    }
    if (base) { const t = base + "Ref"; if (safeTarget(t)) return uniqueName(p.scope, t); }
  }
  return null;
}

const plugin = ({ types: t }) => ({
  visitor: {
    Program: {
      exit(progPath) {
        // 按作用域收集，避免同作用域内多个 valN 被推断成同名导致重复声明
        const byScope = new Map();
        progPath.traverse({
          VariableDeclarator(p) {
            const target = infer(p);
            if (target && target !== p.node.id.name) {
              if (!byScope.has(p.scope)) byScope.set(p.scope, []);
              byScope.get(p.scope).push({ name: p.node.id.name, target });
            }
          }
        });
        for (const [scope, items] of byScope) {
          const used = new Set();
          for (const it of items) {
            let n = it.target, i = 2;
            // 该作用域已有同名绑定(含本轮已分配)则追加序号
            while (scope.getOwnBinding(n) || used.has(n)) n = it.target + (i++);
            used.add(n);
            try { scope.rename(it.name, n); } catch (e) {}
          }
        }
      }
    }
  }
});

const TEST = process.env.TEST;
let files = fs.readdirSync(dir).filter(x => x.endsWith(".js")).sort();
if (TEST) {
  const set = new Set(TEST.split(","));
  files = files.filter(f => set.has(f));
}
let changed = 0, failed = 0, renamed = 0;
for (const f of files) {
  const file = path.join(dir, f);
  const code = fs.readFileSync(file, "utf8");
  try {
    const out = babel.transformSync(code, { sourceType: "unambiguous", babelrc: false, configFile: false, compact: false, comments: true, plugins: [plugin] });
    if (out.code !== code) { fs.writeFileSync(file, out.code); changed++; }
  } catch (e) { failed++; console.log("FAIL", f, e.message.slice(0,60)); }
}
console.log("val/fn 处理: 变更文件", changed, "失败", failed);
