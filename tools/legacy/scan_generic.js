const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");

const D = "final";
// broad: any identifier that looks auto-generated: lowercase alpha run + trailing digits
const RE = /^[a-z][a-z]*[0-9a-z]*[0-9]+$/;

const perFile = {};
const prefixCount = {};
const total = { files: 0, bindings: 0 };

for (const f of fs.readdirSync(D).filter(x => x.endsWith(".js")).sort()) {
  const code = fs.readFileSync(path.join(D, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); }
  catch (e) { continue; }
  // link scopes
  babel.traverse(ast, {});

  const declNames = new Set();
  const collectScope = (scope) => {
    if (!scope || !scope.bindings) return;
    for (const nm of Object.keys(scope.bindings)) {
      if (RE.test(nm)) declNames.add(nm);
    }
    if (scope.childScopes) scope.childScopes.forEach(collectScope);
  };
  collectScope(ast.program.scope);

  if (declNames.size) {
    perFile[f] = declNames.size;
    total.files++;
    total.bindings += declNames.size;
    for (const nm of declNames) {
      const m = nm.match(/^([a-z]+?)[0-9a-z]*[0-9]+$/);
      const pre = m ? m[1] : nm;
      prefixCount[pre] = (prefixCount[pre] || 0) + 1;
    }
  }
}
console.log("TOTAL files with auto-style bindings:", total.files);
console.log("TOTAL auto-style bindings:", total.bindings);
console.log("\n--- prefix distribution ---");
const sorted = Object.entries(prefixCount).sort((a,b)=>b[1]-a[1]);
for (const [p,c] of sorted) console.log("  "+p+": "+c);
