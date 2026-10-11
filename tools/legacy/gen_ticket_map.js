const fs = require("fs");
const babel = require("@babel/core");

const code = fs.readFileSync("restored/ticket-SMxxVFG1-restored.js", "utf8");
const ast = babel.parseSync(code, { sourceType: "module" });

// collect function local -> {method, path}
const fnInfo = {};
babel.traverse(ast, {
  FunctionDeclaration(p) {
    const name = p.node.id && p.node.id.name;
    if (!name) return;
    let info = null;
    p.traverse({
      CallExpression(c) {
        const callee = c.node.callee;
        if (callee.type === "MemberExpression" && callee.object.type === "Identifier" &&
            (callee.object.name === "e" || callee.object.name === "axios")) {
          const meth = callee.property && callee.property.name;
          const arg = c.node.arguments[0];
          let path = null;
          if (arg && arg.type === "StringLiteral") path = arg.value;
          else if (arg && arg.type === "TemplateLiteral" && arg.quasis[0]) path = arg.quasis[0].value.raw;
          if (meth && path && !info) info = { meth: meth.toLowerCase(), path };
        }
      }
    });
    if (info) fnInfo[name] = info;
  }
});

// build name from method+path
function nameFor(meth, path) {
  if (!path) return null;
  const verb = { get: "get", post: "create", put: "update", delete: "delete", patch: "update" }[meth] || meth;
  let p = path.replace(/^\//, "");
  const hasId = /\$\{[^}]+\}/.test(p) || /:\w+/.test(p);
  p = p.replace(/\$\{[^}]+\}/g, "").replace(/[:?].*$/g, "").replace(/\/$/, "");
  let segs = p.split("/").map(s => s.replace(/[^a-zA-Z0-9]/g, "")).filter(Boolean);
  if (!segs.length) return null;
  const last = segs[segs.length - 1].toLowerCase();
  let resource = segs.slice(0, hasId ? -1 : undefined); // drop trailing id segment
  let v = verb, noun = resource;
  if (["grab", "verify", "use", "review", "export", "batch", "stats", "status"].includes(last)) {
    if (last === "grab") { v = "grab"; noun = segs.slice(0, -1); }
    else if (last === "verify") {
      // /admin/ticket/verify (GET) or /admin/ticket/verify/use (POST)
      const sub = segs[segs.length - 2];
      if (sub === "use") { v = "use"; noun = segs.slice(0, -2); }
      else { v = "verify"; noun = segs.slice(0, -1); }
    }
    else if (last === "use") { v = "use"; noun = segs.slice(0, -1); }
    else if (last === "review") { v = "review"; noun = segs.slice(0, -1); }
    else if (last === "export") { v = "export"; noun = segs.slice(0, -1); }
    else if (last === "batch") { v = "batchReview"; noun = segs.slice(0, -2); }
    else if (last === "stats") { v = "get"; noun = segs.slice(0, -1).concat(["stats"]); }
    else if (last === "status") { v = "set"; noun = segs.slice(0, -1).concat(["status"]); }
  }
  const camel = noun.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  const name = v + camel.charAt(0).toUpperCase() + camel.slice(1);
  return name;
}

// parse export string to map exportedLetter -> local
const exportLine = code.match(/export \{([^}]*)\}/);
const expMap = {};
if (exportLine) exportLine[1].split(",").forEach(pair => {
  const m = pair.trim().match(/^(\w+)\s+as\s+(\w+)$/);
  if (m) expMap[m[2]] = m[1]; // exported -> local
});

// build exported -> name, detect collisions
const result = {};
const seen = {};
const collisions = [];
for (const [exp, local] of Object.entries(expMap)) {
  const info = fnInfo[local];
  let nm = info ? nameFor(info.meth, info.path) : null;
  if (!nm) { nm = "api_" + exp; }
  if (seen[nm]) { collisions.push(`${exp}=${local} -> ${nm} (dup of ${seen[nm]})`); nm = nm + "_" + exp; }
  seen[nm] = exp;
  result[exp] = nm;
}
console.log("// exportedLetter: name");
for (const [k, v] of Object.entries(result)) console.log(`  ${k}: "${v}",`);
if (collisions.length) { console.log("// COLLISIONS:"); collisions.forEach(c => console.log("//   " + c)); }
