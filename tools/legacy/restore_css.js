const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const SRC = path.join(__dirname, "assets");
const OUT = path.join(__dirname, "restored");
const DEOP = path.join(__dirname, "deob");
fs.mkdirSync(OUT, { recursive: true });

const DATE = "2026-07-21";

function isSafeCp(cp) {
  if (cp < 0x3000) return false;
  if (cp === 0xFEFF) return false;
  if (cp >= 0xFFF0 && cp <= 0xFFFB) return false;
  if (cp >= 0xE0000) return false;
  return true;
}
// CSS escape: \ + 1-6 hex, optional single whitespace terminator
function decodeCssEscapes(s) {
  return s.replace(/\\([0-9a-fA-F]{1,6})\s?/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafeCp(cp) ? String.fromCodePoint(cp) : m;
  });
}

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".css")).sort();
  let ok = 0,
    fallback = 0,
    fail = 0;
  for (const f of files) {
    const outName = f.replace(/\.css$/, "") + "-restored.css";
    const outPath = path.join(OUT, outName);
    try {
      const code = fs.readFileSync(path.join(SRC, f), "utf8");
      const res = await esbuild.transform(code, { loader: "css", minify: false });
      let out = decodeCssEscapes(res.code);
      const header = `/*!
 * Smart-restored (UTF-8 decoded) CSS
 * Source : assets/${f}
 * Origin : https://xmyzstudent.com/
 * Date   : ${DATE}
 * Note   : Beautified by esbuild; \\uXXXX / \\XXXXXX decoded to UTF-8 where safe.
 *          CSS custom-property names were already readable; left as-is.
 */
`;
      out = header + "\n" + out;
      if (!out.endsWith("\n")) out += "\n";
      fs.writeFileSync(outPath, out);
      ok++;
    } catch (e) {
      const deob = path.join(DEOP, f.replace(/\.css$/, "") + "-deob.css");
      if (fs.existsSync(deob)) {
        fs.copyFileSync(deob, outPath);
        fallback++;
      } else {
        fail++;
      }
      console.log(`FAIL ${f}: ${e.message.split("\n")[0]}`);
    }
  }
  console.log(`\n=== CSS restore: ok=${ok} fallback=${fallback} fail=${fail} ===`);
})();
