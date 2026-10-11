const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const OUT = path.join(__dirname, "restored");
// Only decode "safe" visible Unicode (CJK / Kana / Hangul / CJK punct / fullwidth / emoji).
// Leave low-range control/format escapes (\uFEFF, \xA0, \xAC, etc.) escaped so regex/syntax stays valid.
function isSafe(cp) {
  if (cp < 0x3000) return false;
  if (cp === 0xFEFF) return false;
  if (cp >= 0xFFF0 && cp <= 0xFFFB) return false;
  if (cp >= 0xE0000) return false;
  return true;
}
function decodeEscapes(s) {
  s = s.replace(/\u\{([0-9a-fA-F]+)\}/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafe(cp) ? String.fromCodePoint(cp) : m;
  });
  s = s.replace(/\u([0-9a-fA-F]{4})/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafe(cp) ? String.fromCharCode(cp) : m;
  });
  s = s.replace(/\x([0-9a-fA-F]{2})/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafe(cp) ? String.fromCharCode(cp) : m;
  });
  return s;
}
let ok = 0, skipped = 0, bad = 0;
for (const f of fs.readdirSync(OUT).filter((x) => x.endsWith(".js")).sort()) {
  const p = path.join(OUT, f);
  let s = fs.readFileSync(p, "utf8");
  const beforeU = (s.match(/\u[0-9a-fA-F]{4}/g) || []).length;
  const beforeX = (s.match(/\x[0-9a-fA-F]{2}/g) || []).length;
  if (beforeU === 0 && beforeX === 0) { skipped++; continue; }
  const d = decodeEscapes(s);
  if (d === s) { skipped++; continue; }
  try {
    babel.parseSync(d, { sourceType: "module" });
    fs.writeFileSync(p, d);
    ok++;
  } catch (e) {
    console.log("PARSE-FAIL keep original:", f, e.message.split("\n")[0]);
    bad++;
  }
}
console.log(`clean_escapes(safe): decoded=${ok} skipped=${skipped} parseFail=${bad}`);
