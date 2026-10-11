const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");

const D = "final";

// classification of a binding name
function classify(nm) {
  if (/^zb[a-z0-9]*$/i.test(nm)) return "zb-family";          // zbk, zbl, zbXX
  if (/^shared_[A-Za-z0-9_]+$/.test(nm)) return "shared-family"; // shared_d, shared_m
  if (/^[a-z]+[0-9]+$/.test(nm)) return "generic-numbered";   // val2, fn2, list1, obj2, x1, y1
  if (/^_?[a-z]{1,2}$/.test(nm)) return "vue-short";           // ts, as, _s, fs, cs (Vue compiler output)
  if (/^[a-z]$/.test(nm)) return "single-letter";
  return "other";
}

const cats = { "zb-family":0, "shared-family":0, "generic-numbered":0, "vue-short":0, "single-letter":0, "other":0 };
const examples = { "zb-family":new Set(), "shared-family":new Set(), "generic-numbered":new Set(), "vue-short":new Set(), "single-letter":new Set() };
const perFile = {};

for (const f of fs.readdirSync(D).filter(x => x.endsWith(".js")).sort()) {
  const code = fs.readFileSync(path.join(D, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); }
  catch (e) { continue; }

  const fileCats = {};
  babel.traverse(ast, {
    Program(path) {
      const walk = (s) => {
        if (!s || !s.bindings) return;
        for (const nm of Object.keys(s.bindings)) {
          const c = classify(nm);
          cats[c] = (cats[c] || 0) + 1;
          fileCats[c] = (fileCats[c] || 0) + 1;
          if (examples[c] && examples[c].size < 25) examples[c].add(nm);
        }
        if (s.childScopes) s.childScopes.forEach(walk);
      };
      walk(path.scope);
    }
  });
  if (Object.keys(fileCats).length) perFile[f] = fileCats;
}

console.log("=== OPAQUE NAME INVENTORY (by category) ===");
for (const c of ["zb-family","shared-family","generic-numbered","single-letter"]) {
  console.log(c+": "+cats[c]);
  console.log("    eg: "+[...examples[c]].join(", "));
}
console.log("vue-short (KEPT - framework): "+cats["vue-short"]+"  eg: "+[...examples["vue-short"]].join(", "));
console.log("other: "+cats["other"]);
console.log("\nfiles affected:", Object.keys(perFile).length);
