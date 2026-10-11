const fs = require("fs");
const babel = require("@babel/core");
const files = fs.readdirSync("final").filter((x) => x.endsWith(".js")).sort();
const vRe = /^[A-Za-z]+[0-9]{3,}$/;
const sRe = /^.$/;
let vRemain = 0, singleRemain = 0, parseFail = 0;
for (const f of files) {
  const code = fs.readFileSync("final/" + f, "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); }
  catch (e) { parseFail++; console.error("PARSEFAIL", f, e.message); continue; }
  babel.traverse(ast, {
    Identifier(p) {
      const n = p.node.name;
      if (!vRe.test(n)) return;
      const par = p.parent;
      if (par.type === "MemberExpression" && par.property === n && !par.computed) return;
      if ((par.type === "ObjectProperty" || par.type === "ObjectMethod") && par.key === n && !par.computed) return;
      vRemain++;
    },
    "Program|FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ObjectMethod|BlockStatement"(p) {
      if (!p.scope) return;
      for (const nm of Object.keys(p.scope.bindings)) { if (sRe.test(nm)) singleRemain++; }
    },
  });
}
console.log("文件:", files.length, " 解析失败:", parseFail);
console.log("剩余 v<digits> 标识符:", vRemain);
console.log("剩余单字母绑定:", singleRemain);
