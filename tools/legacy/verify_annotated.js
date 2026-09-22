const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const D = path.join(__dirname, "restored");
let ok = 0, fail = 0;
const fails = [];
for (const f of fs.readdirSync(D).filter(x => x.endsWith(".js")).sort()) {
  try { babel.parseSync(fs.readFileSync(path.join(D, f), "utf8"), { sourceType: "module" }); ok++; }
  catch (e) { fail++; fails.push(f + " :: " + e.message.split("\n")[0]); }
}
console.log("JS parse OK:", ok, " FAIL:", fail);
fails.slice(0, 10).forEach(x => console.log("  ", x));
// sample inline comments present?
const idx = fs.readFileSync(path.join(D, "index-DJrtCu9i-restored.js"), "utf8");
const cm = (idx.match(/^\/\/ /gm) || []).length;
console.log("inline // comments in index:", cm);
const comm = fs.readFileSync(path.join(D, "CommunityPage-AcOc2hqy-restored.js"), "utf8");
console.log("inline // comments in CommunityPage:", (comm.match(/^\/\/ /gm) || []).length);
