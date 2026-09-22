const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const FINAL = path.join(__dirname, "final");

function strip(c){ return c.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,""); }
const files = fs.readdirSync(FINAL).filter(x=>x.endsWith(".js")).sort();

// 1) 真实代码中残留 shared_ 计数
const sharedLeft = new Set();
for (const f of files){
  const m = strip(fs.readFileSync(path.join(FINAL,f),"utf8")).match(/shared_[A-Za-z0-9_$]+/g) || [];
  m.forEach(x=>sharedLeft.add(x));
}
console.log("[1] 剥离注释后真实代码残留 shared_ 唯一名:", sharedLeft.size, sharedLeft.size? [...sharedLeft].join(", ") : "(无 ✅)");

// 2) 全部可解析
let bad=0, badf=[];
for (const f of files){
  try { babel.parseSync(fs.readFileSync(path.join(FINAL,f),"utf8"), {sourceType:"module"}); }
  catch(e){ bad++; badf.push(f+": "+e.message.slice(0,50)); }
}
console.log("[2] 可解析文件:", files.length-bad, "/", files.length, bad? "失败:"+badf.join("; ") : "(全通过 ✅)");

// 3) index 导出名检查
const idx = fs.readFileSync(path.join(FINAL,"index-DJrtCu9i.js"),"utf8");
const exMatch = idx.match(/export\s*\{([^}]*)\}/);
const expSet = new Set((exMatch?exMatch[1]:"".split(",")).split(",").map(s=>s.trim().split(/\s+as\s+/).pop().trim()).filter(Boolean));
console.log("[3] index 是否仍导出 shared_d/shared_e:", expSet.has("shared_d")||expSet.has("shared_e") ? "是 ❌" : "否 ✅");
console.log("    index 是否导出 defineComponent/unref:", expSet.has("defineComponent")&&expSet.has("unref") ? "是 ✅" : "否 ❌ (defineComponent="+expSet.has("defineComponent")+", unref="+expSet.has("unref")+")");

// 4) 跨模块链接完整性：每个 import 自 index 的名，index 必须导出
let linkFail=0, linkErr=[];
for (const f of files){
  if (f==="index-DJrtCu9i.js") continue;
  const c = fs.readFileSync(path.join(FINAL,f),"utf8");
  const re = /import\s*\{([^}]*)\}\s*from\s*"([^"]*index[^"]*)"/g; let m;
  while((m=re.exec(c))){
    const names = m[1].split(",").map(s=>s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
    for (const n of names){ if(!expSet.has(n)){ linkFail++; linkErr.push(f+" 缺导出:"+n); } }
  }
}
console.log("[4] 跨模块链接缺失:", linkFail, linkFail? "❌ "+linkErr.slice(0,8).join("; ") : "(完整 ✅)");
