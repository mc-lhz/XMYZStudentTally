const fs=require("fs"),path=require("path");
function strip(c){return c.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"");}
const files=fs.readdirSync("final").filter(x=>x.endsWith(".js"));
const aliases=["zb5q","zb5r","zb5o","zb5p","zb4u","zb4v","zb4w","zb4x","zb4y","zb4r","zb4d","zbr","zbp","zb1s","zb4t","zb4s","zb4z"];
let total=0; const byFile={};
for(const f of files){
  const c=strip(fs.readFileSync("final/"+f,"utf8"));
  for(const a of aliases){ const m=c.match(new RegExp("\b"+a+"\b","g")); if(m){total+=m.length; byFile[f]=(byFile[f]||0)+m.length;} }
}
console.log("剥离注释后残留别名总数:", total);
console.log(JSON.stringify(byFile,null,0));
