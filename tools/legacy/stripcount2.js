const fs=require("fs");
function strip(c){return c.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"");}
const files=fs.readdirSync("final").filter(x=>x.endsWith(".js"));
const aliases=["zb5q","zb5r","zb5o","zb5p","zb4u","zb4v","zb4w","zb4x","zb4y","zb4r","zb4d","zbr","zbp","zb1s","zb4t","zb4s","zb4z"];
for(const f of files){
  const c=strip(fs.readFileSync("final/"+f,"utf8"));
  for(const a of aliases){ const m=c.match(new RegExp("\b"+a+"\b","g")); if(m) console.log(f+": "+a+" x"+m.length); }
}
console.log("done");
