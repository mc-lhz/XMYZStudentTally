const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");

function genName(method, pathStr) {
  if (!pathStr) return null;
  const m = (method || "get").toLowerCase();
  let verb = { get: "get", post: "create", put: "update", delete: "delete", patch: "update", head: "get", options: "get" }[m] || m;
  // clean path into camel words
  let p = pathStr.replace(/^\//, "").replace(/\$\{[^}]+\}/g, "").replace(/[:?].*$/g, "");
  const segs = p.split("/").map(s => s.replace(/[^a-zA-Z0-9]/g, "")).filter(Boolean);
  if (!segs.length) return null;
  // special verb overrides based on last segment
  const last = segs[segs.length - 1].toLowerCase();
  const special = { grab: "grab", verify: "verify", use: "use", review: "review", stats: "getStats", export: "export", batch: "batch", status: "setStatus", sessions: null, activities: null };
  let words;
  if (special[last] === null) { words = segs; }
  else if (special[last]) {
    // replace last seg's verb
    if (["grab","verify","use","review","export","batch"].includes(last)) {
      // noun = all but last, verb = last
      const noun = segs.slice(0, -1);
      verb = last;
      words = noun.concat([last]);
      // produce e.g. grabTicket(s)
    } else if (last === "stats") { words = segs.slice(0,-1); /* verb stays get, append Stats via last? */ }
    else if (last === "status") { words = segs.slice(0,-1); verb = "set"; }
  } else words = segs;
  // build camelCase
  const camel = words.map((w,i) => i===0 ? w.toLowerCase() : w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join("");
  // plural handling: if last seg already plural-ish keep
  return verb + camel.charAt(0).toUpperCase() + camel.slice(1);
}

function analyze(file) {
  const code = fs.readFileSync(file, "utf8");
  const ast = babel.parseSync(code, { sourceType: "module" });
  const out = [];
  babel.traverse(ast, {
    FunctionDeclaration(p) {
      const calls = [];
      p.traverse({
        CallExpression(c) {
          const callee = c.node.callee;
          if (callee.type === "MemberExpression" && callee.object.type === "Identifier" &&
              (callee.object.name === "e" || callee.object.name === "axios") &&
              callee.property && callee.property.name) {
            const meth = callee.property.name.toLowerCase();
            const arg = c.node.arguments[0];
            let pathStr = null;
            if (arg && arg.type === "StringLiteral") pathStr = arg.value;
            else if (arg && arg.type === "TemplateLiteral" && arg.quasis[0]) pathStr = arg.quasis[0].value.raw + "...";
            calls.push({ meth, pathStr });
          }
        }
      });
      if (calls.length) out.push({ name: p.node.id && p.node.id.name, calls });
    }
  });
  return out;
}

const data = analyze("restored/ticket-SMxxVFG1-restored.js");
for (const f of data) {
  for (const c of f.calls) {
    const nm = genName(c.meth, c.pathStr);
    console.log(`${f.name}\t${c.meth}\t${c.pathStr}\t=> ${nm}`);
  }
}
