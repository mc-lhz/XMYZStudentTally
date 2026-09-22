// 统计 assets/ 中剩余的通用编号名(val1/fn2/obj3...)，衡量反混淆进度。
// 用法: node tools/gencount.js   (从任意 cwd 均可运行)
const fs = require("fs"), path = require("path");
const { ASSETS } = require("./_resolve.cjs");

const strip = c => c.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const GEN = /\b(?:val|fn|from|obj|list|arr|x|y|el|item|data|tmp|res|ret|ctx|param|arg|idx|key)[0-9]{1,3}\b/g;

const files = fs.readdirSync(ASSETS).filter(x => x.endsWith(".js"));
const cnt = new Map();
let total = 0;

for (const f of files) {
  const code = strip(fs.readFileSync(path.join(ASSETS, f), "utf8"));
  for (const name of code.match(GEN) || []) {
    cnt.set(name, (cnt.get(name) || 0) + 1);
    total++;
  }
}

console.log("剩余通用编号名  唯一名:", cnt.size, " 总出现:", total);
const top = [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)
  .map(([n, c]) => `${n}:${c}`).join("  ");
console.log("Top15:", top);
