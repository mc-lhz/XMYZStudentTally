// Detect a deobfuscation collapse bug: in `for (const K in OBJ)` loops the
// loop variable K is a STRING key, so it can never be used as an object base
// (`K.foo` / `K[expr]`). Any such usage is a collapsed reference that would
// throw at runtime. (The `K[K]` self-ref form is a subset already fixed.)
const fs = require("fs");
const cp = require("child_process");
const { loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

const files = cp.execSync("ls assets/*.js").toString().trim().split("\n").filter(Boolean);
let total = 0;
const hits = [];
for (const f of files) {
  let code;
  try { code = fs.readFileSync(f, "utf8"); } catch { continue; }
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] }); }
  catch (e) { console.log(f, "PARSE_ERROR", e.message); continue; }
  babel.traverse(ast, {
    ForInStatement(p) {
      const left = p.node.left;
      let varName = null;
      if (left.type === "VariableDeclaration") {
        const d = left.declarations[0];
        if (d && d.id.type === "Identifier") varName = d.id.name;
      } else if (left.type === "Identifier") varName = left.name;
      if (!varName) return;
      p.get("body").traverse({
        MemberExpression(m) {
          if (m.node.object.type === "Identifier" && m.node.object.name === varName) {
            const loc = m.node.loc ? `${m.node.loc.start.line}:${m.node.loc.start.column}` : "?";
            const snippet = code.slice(m.node.start, m.node.end);
            hits.push(`${f}:${loc}: for-in var '${varName}' as object base: ${snippet}`);
            total++;
          }
        }
      });
    }
  });
}
for (const h of hits) console.log(h);
console.log("TOTAL for-in base-misuse:", total);
