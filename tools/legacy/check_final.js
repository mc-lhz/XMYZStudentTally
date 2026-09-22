const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const D = path.join(__dirname, "final");
let ok = 0, fail = 0;
const fails = [];
for (const f of fs.readdirSync(D).filter(x => x.endsWith(".js")).sort()) {
  try { babel.parseSync(fs.readFileSync(path.join(D, f), "utf8"), { sourceType: "module" }); ok++; }
  catch (e) { fail++; fails.push(f + " :: " + e.message.split("\n")[0]); }
}
console.log("final/ JS parse OK:", ok, " FAIL:", fail);
fails.slice(0, 10).forEach(x => console.log("  ", x));
// count files with semantic imports
let sem = 0;
for (const f of fs.readdirSync(D).filter(x=>x.endsWith(".js"))) {
  const s = fs.readFileSync(path.join(D,f),"utf8");
  if (/createElementVNode|useRouter|useUserStore|onMounted|createTextVNode/.test(s)) sem++;
}
console.log("files with semantic imports:", sem, "/", ok);
// check shared_X pattern in entry
const entry = fs.readFileSync(path.join(D,"index-DJrtCu9i-restored.js"),"utf8");
const sharedCount = (entry.match(/shared_/g)||[]).length;
console.log("shared_* entries in entry file:", sharedCount);
