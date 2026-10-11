const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const dir = "final";

const MAP = {
  zb5q:"useVxToast", zb5r:"showToast", zb5o:"VxNoticeHostScoped", zb5p:"VxBackButton",
  zb4u:"IdentityBindModalScoped", zb4v:"VxPenScoped", zb4w:"IdentityIcon", zb4x:"VxSealLine",
  zb4y:"syncVoiceUserId", zb4r:"createDebateSocket", zb4d:"getRatingSectionName",
  zbr:"getDebateActive", zbp:"getDebateRound", zb1s:"getGradeTypeName",
  zb4t:"createTallySocket", zb4s:"usePageScrollLock", zb4z:"voiceIdentityTypeLabels",
};

const aliases = Object.keys(MAP);
const files = fs.readdirSync(dir).filter(x => x.endsWith(".js"));

// [1] 别名残留
let residual = {};
for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), "utf8");
  for (const a of aliases) {
    if (new RegExp("\\b" + a + "\\b").test(code)) residual[a] = (residual[a]||0)+1;
  }
}
const aliasesLeft = Object.keys(residual);
console.log("[1] 别名残留:", aliasesLeft.length === 0 ? "0 ✓" : "仍有: " + JSON.stringify(residual));

// [2] 新名出现
let newOk = {};
for (const [a,n] of Object.entries(MAP)) {
  let c = 0;
  for (const f of files) {
    const code = fs.readFileSync(path.join(dir, f), "utf8");
    if (new RegExp("\\b" + n + "\\b").test(code)) c++;
  }
  newOk[n] = c;
}
console.log("[2] 新名落地文件数:", JSON.stringify(newOk));

// [3] 解析
let ok=0, bad=0, badf=[];
for (const f of files) {
  try { babel.parseSync(fs.readFileSync(path.join(dir,f),"utf8"),{sourceType:"unambiguous",presets:[]}); ok++; }
  catch(e){ bad++; badf.push(f); }
}
console.log(`[3] 可解析: ${ok}/${files.length}`, bad? "失败:"+badf.join(","):"✓");

// [4] 链接完整性：收集所有 export 名, 检查每个 import 的 specifier 是否能在某处被 export
// 简化：对每个新名，确认至少有一个文件 export 它，且每个 import 它的文件里它作为绑定存在
let linkIssues = [];
const exportedNames = new Set();
for (const f of files) {
  const code = fs.readFileSync(path.join(dir,f),"utf8");
  let ast; try{ast=babel.parseSync(code,{sourceType:"unambiguous",presets:[]});}catch(e){continue;}
  babel.traverse(ast,{
    ExportNamedDeclaration(p){
      if(p.node.specifiers) p.node.specifiers.forEach(s=>{ if(s.exported) exportedNames.add(s.exported.name); });
    },
    ExportDefaultDeclaration(){},
  });
}
for (const [a,n] of Object.entries(MAP)) {
  if (!exportedNames.has(n)) linkIssues.push(`新名 ${n} 未被任何文件 export`);
}
console.log("[4] 链接问题:", linkIssues.length===0 ? "无 ✓" : linkIssues.join("; "));
