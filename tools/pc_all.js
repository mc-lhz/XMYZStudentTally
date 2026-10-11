// 全量解析校验：确认 assets/ 下每个 JS 都能被 Babel 解析。
// 用法: node tools/pc_all.js   (从任意 cwd 均可运行)
const fs=require("fs"),path=require("path");
const {ASSETS,loadBabel}=require("./_resolve.cjs");
const babel=loadBabel();
let ok=0,bad=0;
for(const f of fs.readdirSync(ASSETS).filter(x=>x.endsWith(".js"))){
  try{babel.parseSync(fs.readFileSync(path.join(ASSETS,f),"utf8"),{sourceType:"unambiguous",presets:[]});ok++;}catch(e){bad++;console.log("FAIL",f,e.message.slice(0,60));}
}
console.log("可解析:",ok," 不可解析:",bad);
