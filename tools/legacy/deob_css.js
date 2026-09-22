const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const SRC = path.join(__dirname, "assets");
const OUT = path.join(__dirname, "deob");
fs.mkdirSync(OUT, { recursive: true });

const DATE = "2026-07-21";

function header(kind, srcName) {
  return `/*!
 * Deobfuscated (beautified) ${kind}
 * Source : assets/${srcName}
 * Origin : https://xmyzstudent.com/
 * Date   : ${DATE}
 * Note   : Original was minified by Vite; this is the expanded, readable version.
 *          Variable/selector names are preserved as-is (no renaming).
 */
`;
}

(async () => {
  const cssFiles = fs.readdirSync(SRC).filter(f => f.endsWith(".css")).sort();
  let ok = 0, fail = 0;
  for (const f of cssFiles) {
    const code = fs.readFileSync(path.join(SRC, f), "utf8");
    const outName = f.replace(/\.css$/, "") + "-deob.css";
    try {
      const res = await esbuild.transform(code, { loader: "css", minify: false });
      let out = header("CSS", f) + "\n" + res.code;
      if (!out.endsWith("\n")) out += "\n";
      fs.writeFileSync(path.join(OUT, outName), out);
      console.log(`OK  ${f.padEnd(40)} -> ${outName} (${res.code.split("\n").length} lines)`);
      ok++;
    } catch (e) {
      console.log(`FAIL ${f}: ${e.message.split("\n")[0]}`);
      fail++;
    }
  }
  console.log(`\n=== CSS deob: ok=${ok} fail=${fail} ===`);
})();
