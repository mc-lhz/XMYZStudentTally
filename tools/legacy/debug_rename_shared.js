const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const FINAL = path.join(__dirname, "final");
const MAP = { shared_d: "http", shared_w: "watch", shared_h: "createVNodeWrapper", shared_T: "withSlots", shared_v: "toDisplayValue", shared_x: "withModifiers", shared_Z: "deepDirectiveOptions", shared_O: "deepWatchOptions", shared_m: "applyDirectives" };
const f = "CampaignManagePage-CIstESeP.js";
const code = fs.readFileSync(path.join(FINAL, f), "utf8");
const out = babel.transformSync(code, {
  sourceType: "module", compact: false, comments: true,
  plugins: [() => ({
    visitor: {
      Program(p) {
        let imp = 0;
        p.node.body.forEach((node) => {
          if (node.type === "ImportDeclaration") {
            node.specifiers.forEach((s) => {
              if (s.type === "ImportSpecifier" && MAP[s.imported.name]) {
                const o = s.imported.name, n = MAP[o];
                s.imported.name = n;
                if (s.local.name === o) s.local.name = n;
                imp++;
              }
            });
          }
        });
        console.log("rewrote", imp, "import specifiers in", f);
      },
    },
  })],
}).code;
console.log("out !== code ?", out !== code);
const line = out.split("\n").find(l => l.includes('from "./index'));
console.log("OUT IMPORT:", line.slice(0, 140));
console.log("code has shared_d in import?", code.includes("shared_d"));
