/**
 * verify_v4.js  —— 修正版核对
 * verify_v3 的缺陷：用 enter(p){ if(p.scope) 对每个 (节点,scope) 统计绑定，
 * 同一绑定被其 scope 内每个节点重复计数，导致虚高（3217）。
 * 本脚本改为：把每个 binding 对象本身塞进 Set 去重，统计【不同单字母绑定】的真实数量。
 * 同时保留 三位数字自动名 / PATTERN 常量 的核对。
 */
const fs = require("fs");
const babel = require("@babel/core");
const files = fs.readdirSync("final").filter((x) => x.endsWith(".js")).sort();
const vRe = /^[A-Za-z]+[0-9]{3,}$/;
const sRe = /^.$/;
const PATTERN = /^PATTERN/;
let vRemain = 0, singleRemain = 0, parseFail = 0;
const singleSamples = [];
const vSamples = [];
for (const f of files) {
  const code = fs.readFileSync("final/" + f, "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); }
  catch (e) { parseFail++; console.error("PARSEFAIL", f, e.message); continue; }
  // 不同绑定去重集合（用 binding 对象引用）
  const bindingSet = new Set();
  babel.traverse(ast, {
    enter(p) {
      if (!p.scope) return;
      for (const nm of Object.keys(p.scope.bindings)) {
        const b = p.scope.bindings[nm];
        if (!bindingSet.has(b)) {
          bindingSet.add(b);
          if (PATTERN.test(nm)) continue;            // 保留 PATTERN 常量
          if (vRe.test(nm)) { vRemain++; if (vSamples.length < 20) vSamples.push(f + " :: " + nm); }
          else if (sRe.test(nm)) { singleRemain++; if (singleSamples.length < 30) singleSamples.push(f + " :: " + nm); }
        }
      }
    },
  });
}
console.log("文件:", files.length, " 解析失败:", parseFail);
console.log("剩余 不同 单字母绑定:", singleRemain);
console.log("剩余 不同 三位数字自动名绑定:", vRemain);
if (singleSamples.length) { console.log("单字母样本:"); singleSamples.forEach((s) => console.log("  ", s)); }
if (vSamples.length) { console.log("数字名样本:"); vSamples.forEach((s) => console.log("  ", s)); }
