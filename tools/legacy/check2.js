const fs=require("fs"),path=require("path"),babel=require("@babel/core");
const D=path.join(__dirname,"final");let ok=0,fail=0;const f=[];
for(const x of fs.readdirSync(D).filter(y=>y.endsWith(".js")).sort()){
  try{babel.parseSync(fs.readFileSync(path.join(D,x),"utf8"),{sourceType:"module"});ok++;}catch(e){fail++;f.push(x+" :: "+e.message.split("\n")[0]);}
}
console.log("OK:",ok,"FAIL:",fail);f.slice(0,8).forEach(z=>console.log("  ",z));
