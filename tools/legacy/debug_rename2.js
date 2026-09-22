const fs = require("fs"), b = require("@babel/core"), p = require("path");
const FINAL = p.join(process.cwd(), "final");
const MAP = { shared_d: "http" };
const f = "CampaignManagePage-CIstESeP.js";
const code = fs.readFileSync(p.join(FINAL, f), "utf8");
const info = {};
const out = b.transformSync(code, {
  sourceType: "module", compact: false, comments: true,
  plugins: [() => ({
    visitor: {
      Program: {
        exit(pg) {
          pg.node.body.forEach(n => {
            if (n.type === "ImportDeclaration") n.specifiers.forEach(s => {
              if (s.type === "ImportSpecifier" && MAP[s.imported.name]) {
                s.imported.name = MAP[s.imported.name];
                info.importedSet = s.local.name;
              }
            });
          });
          info.hasBinding = pg.scope.hasBinding("shared_d");
          info.sharedBindings = Object.keys(pg.scope.bindings).filter(x => /shared/.test(x)).slice(0, 10);
          try { pg.scope.rename("shared_d", "http"); info.renameOk = true; }
          catch (e) { info.renameErr = e.message; }
        }
      }
    }
  })]
}).code;
console.log(JSON.stringify(info, null, 2));
console.log("out has http:", out.includes("http"), " out has shared_d:", out.includes("shared_d"));
const impLine = out.split("\n").find(l => l.includes('from "./index'));
console.log("IMP:", impLine.slice(0, 120));
