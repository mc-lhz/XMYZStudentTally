// 检查 assets/ 真实代码(剔除注释)中是否还有 zb 家族混淆名残留。
// 用法: node tools/stripcount3.js   (从任意 cwd 均可运行)
const fs = require("fs"), path = require("path");
const { ASSETS } = require("./_resolve.cjs");

const strip = c => c.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const all = new Set();

for (const f of fs.readdirSync(ASSETS).filter(x => x.endsWith(".js"))) {
  const code = strip(fs.readFileSync(path.join(ASSETS, f), "utf8"));
  (code.match(/\bzb[A-Za-z0-9_$]+\b/g) || []).forEach(x => all.add(x));
}

console.log("真实代码 zb 唯一名:", all.size, all.size === 0 ? "✓" : "✗");
if (all.size) console.log([...all].sort().join(", "));
