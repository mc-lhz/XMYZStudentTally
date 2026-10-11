const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const dir = "final";

// 已处理的 17 跨文件底层 local
const DONE = new Set(["zbeo","zbey","zbew","zbes","ut","local_zbe1","zbdy","vt","ct","zbds","local_zb47","zbx","zbr","zbcy","zbdw","zbdv","zb5j"]);

function moduleName(file) {
  // 去掉 hash 后缀与 .js，再把所有非法标识符字符(点/连字符)清洗成下划线
  return path.basename(file)
    .replace(/-[A-Za-z0-9_-]+\.js$/, "")
    .replace(/\.js$/, "")
    .replace(/[^A-Za-z0-9_]/g, "_");
}
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
function apiName(method, p) {
  const segs = p.split("/").filter(s => s && !s.includes("${"));
  const cam = segs.map((s,i) => i===0 ? s : s.charAt(0).toUpperCase()+s.slice(1)).join("");
  return method.toLowerCase() + (cam.charAt(0).toUpperCase()+cam.slice(1));
}

function inferName(declNode, code, M, idx) {
  const txt = code.slice(declNode.start, Math.min((declNode.end||declNode.start)+900, declNode.start+900));
  const isFn = declNode.type === "FunctionDeclaration" ||
    (declNode.type === "VariableDeclarator" && declNode.init &&
      (declNode.init.type === "ArrowFunctionExpression" || declNode.init.type === "FunctionExpression"));
  if (isFn) {
    const nm = txt.match(/__name:\s*["']([^"']+)["']/);
    if (nm) return nm[1];
    if (/withScopeId\(/.test(txt)) return M + "Scoped";
    if (/axiosLib\.create|axios\.create/.test(txt)) return capitalize(M) + "HttpClient";
    const api = txt.match(/\.(get|post|put|delete|patch)\(\s*[`"']([^"'`]+)/);
    if (api) return apiName(api[1], api[2]);
    if (/createElementBlock|defineComponent|createVNode|openBlock/.test(txt)) return M + "Render";
    return M + "Fn" + idx;
  }
  // 值类型
  if (/axiosLib\.create|axios\.create/.test(txt)) return capitalize(M) + "HttpClient";
  if (/\bis(Array|String|Number|Boolean|Buffer|FormData|ArrayBuffer|Undefined|Object|Function|Date|Map|Set)\b/.test(txt) && txt.includes(":")) return "typePredicates";
  // 对象字面量：按 init 节点类型判断
  if (declNode.type === "VariableDeclarator" && declNode.init) {
    if (declNode.init.type === "ArrayExpression") return M + "List";
    if (declNode.init.type === "ObjectExpression") {
      // 数字键 + 字符串值 -> 标签映射；否则配置
      let numericStr = false;
      for (const p of (declNode.init.properties || [])) {
        if (p.key && (p.key.type === "NumericLiteral" || (p.key.type === "StringLiteral" && /^\d+$/.test(p.key.value)))
            && p.value && p.value.type === "StringLiteral") { numericStr = true; break; }
      }
      return numericStr ? M + "Labels" : M + "Config";
    }
  }
  const t2 = txt.replace(/\s+/g, " ");
  if (/^\s*["']/.test(t2)) return M + "Text";
  if (/^\s*\d/.test(t2) || /^\s*(true|false|null)/.test(t2)) return M + "Const";
  return M + "Const" + idx;
}

function transformFile(file) {
  const code = fs.readFileSync(path.join(dir, file), "utf8");
  const M = moduleName(file);
  // 预收集已有标识符，避免碰撞
  let existing = new Set();
  let ast0; try { ast0 = babel.parseSync(code, { sourceType: "unambiguous", presets: [] }); } catch(e){ return null; }
  babel.traverse(ast0, { Identifier(p){ if(p.parent.type!=="StringLiteral") existing.add(p.node.name); } });

  const renames = []; // {path, old, new}
  const usedNew = new Set(existing);
  let idx = 0;
  const plugin = ({ types: t }) => ({
    visitor: {
      "FunctionDeclaration|VariableDeclarator"(p) {
        const id = p.node.id;
        if (!id || id.type !== "Identifier") return;
        if (!/^zb[A-Za-z0-9_$]+$/.test(id.name)) return;
        if (DONE.has(id.name)) return;
        let cand = inferName(p.node, code, M, idx++);
        // 碰撞规避
        let final = cand, k = 2;
        while (usedNew.has(final)) { final = cand + "_" + k; k++; }
        usedNew.add(final);
        renames.push({ path: p, old: id.name, new: final });
      }
    }
  });
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "unambiguous", presets: [],
      plugins: [plugin], compact: false, comments: true,
    });
  } catch(e){ return null; }
  // 应用重命名
  const ast = babel.parseSync(out.code, { sourceType: "unambiguous", presets: [] });
  // 重新遍历应用（用已解析的 ast 上的 path 不可用，改用重新 transform 时收集 path）
  // 简化：在 transform 时直接 rename
  return { out: out.code, renames };
}

// 由于 transform 后 path 失效，改为在 plugin 内直接 rename
function transformFile2(file) {
  const code = fs.readFileSync(path.join(dir, file), "utf8");
  const M = moduleName(file);
  let existing = new Set();
  let ast0; try { ast0 = babel.parseSync(code, { sourceType: "unambiguous", presets: [] }); } catch(e){ return null; }
  babel.traverse(ast0, { Identifier(p){ if(p.parent.type!=="StringLiteral") existing.add(p.node.name); } });

  const done = [];
  const plugin = ({ types: t }) => ({
    visitor: {
      Program: { exit(progPath) {
        const usedNew = new Set(existing);
        let idx = 0;
        const ops = [];
        progPath.traverse({
          "FunctionDeclaration|VariableDeclarator"(p) {
            const id = p.node.id;
            if (!id || id.type !== "Identifier") return;
            if (!/^zb[A-Za-z0-9_$]+$/.test(id.name)) return;
            if (DONE.has(id.name)) return;
            let cand = inferName(p.node, code, M, idx++);
            let final = cand, k = 2;
            while (usedNew.has(final)) { final = cand + "_" + k; k++; }
            usedNew.add(final);
            ops.push({ path: p, old: id.name, new: final });
          }
        });
        for (const o of ops) {
          try { o.path.scope.rename(o.old, o.new); } catch(e){}
        }
        done.push(...ops.map(o=>o.new));
      }}
    }
  });
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "unambiguous", presets: [],
      plugins: [plugin], compact: false, comments: true,
    });
  } catch(e){ return null; }
  return { code: out.code, renamed: done };
}

// 主流程
const TEST = process.env.TEST ? process.env.TEST.split(",") : null;
let files = fs.readdirSync(dir).filter(x => x.endsWith(".js"));
if (TEST) files = files.filter(f => TEST.includes(f));
let changed = 0, failed = 0, totalRenamed = 0, fails = [];
for (const f of files) {
  try {
    const r = transformFile2(f);
    if (!r) { failed++; fails.push(f+": parse/transform error"); continue; }
    const orig = fs.readFileSync(path.join(dir, f), "utf8");
    if (r.code !== orig) { fs.writeFileSync(path.join(dir, f), r.code); changed++; totalRenamed += r.renamed.length; }
  } catch(e){ failed++; fails.push(f+": "+e.message.slice(0,80)); }
}
console.error(`页面本地 zb 处理: 变更文件 ${changed}, 失败 ${failed}, 重命名 ${totalRenamed} 个`);
if (failed) console.error(fails.slice(0,15).join("\n"));
