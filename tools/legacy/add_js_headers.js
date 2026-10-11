const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "deob");
const DATE = "2026-07-21";
const MARK = "Deobfuscated (beautified) JS";

let added = 0, skipped = 0;
for (const f of fs.readdirSync(OUT).filter(x => x.endsWith("-deob.js")).sort()) {
  const p = path.join(OUT, f);
  let code = fs.readFileSync(p, "utf8");
  if (code.includes(MARK)) { skipped++; continue; }
  const srcName = f.replace(/-deob\.js$/, ".js");
  const header = `/*!
 * Deobfuscated (beautified) JS
 * Source : assets/${srcName}
 * Origin : https://xmyzstudent.com/
 * Date   : ${DATE}
 * Note   : Original was minified; expanded via esbuild transform (format=esm).
 *          Variable names are preserved as-is (no renaming).
 */

`;
  fs.writeFileSync(p, header + code);
  added++;
}
console.log(`JS header comments: added=${added} skipped=${skipped}`);
