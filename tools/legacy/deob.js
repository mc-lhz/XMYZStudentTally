const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const SRC = path.join(__dirname, "assets");
const OUT = path.join(__dirname, "deob");
fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter(f => f.endsWith(".js")).sort();
let ok = 0, fail = 0;
const fails = [];

(async () => {
  for (const f of files) {
    const srcPath = path.join(SRC, f);
    const code = fs.readFileSync(srcPath, "utf8");
    const outName = f.replace(/\.js$/, "") + "-deob.js";
    const outPath = path.join(OUT, outName);
    try {
      const res = await esbuild.transform(code, {
        loader: "js",
        format: "esm",
        platform: "browser",
        target: "es2020",
        sourcefile: f,
        legalComments: "none",
      });
      let out = res.code;
      // esbuild may emit a trailing newline; ensure file ends with newline
      if (!out.endsWith("\n")) out += "\n";
      fs.writeFileSync(outPath, out);
      const inLines = code.split("\n").length;
      const outLines = out.split("\n").length;
      console.log(`OK  ${f.padEnd(40)} in=${inLines}L out=${outLines}L`);
      ok++;
    } catch (e) {
      console.log(`FAIL ${f}: ${e.message.split("\n")[0]}`);
      fails.push(f);
      fail++;
    }
  }
  console.log(`\n=== done: ok=${ok} fail=${fail} ===`);
  if (fails.length) console.log("failed:", fails.join(", "));
})();
