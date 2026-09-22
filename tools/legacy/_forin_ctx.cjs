// 输出每个 for-in base-misuse 处的：所在函数签名 + for-in 语句源码
const fs = require("fs");
const path = require("path");
const { ROOT, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

const file = process.argv[2] || "assets/index-DJrtCu9i.js";
const abs = path.resolve(ROOT, file);
const code = fs.readFileSync(abs, "utf8");
const ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] });

function src(node) {
  return code.slice(node.start, node.end);
}

const hits = [];

babel.traverse(ast, {
  ForInStatement(p) {
    const left = p.node.left;
    let name = null;
    if (left.type === "VariableDeclaration" && left.declarations[0].id.type === "Identifier") {
      name = left.declarations[0].id.name;
    } else if (left.type === "Identifier") {
      name = left.name;
    }
    if (!name) return;

    // 检查循环体内是否把循环变量当对象 base
    let misuse = [];
    p.get("body").traverse({
      MemberExpression(mp) {
        const obj = mp.node.object;
        if (obj.type === "Identifier" && obj.name === name) {
          misuse.push(src(mp.node).slice(0, 60));
        }
      },
    });
    if (misuse.length === 0) return;

    // 找最近的函数
    const fn = p.getFunctionParent();
    let sig = "(top-level)";
    let fnName = "";
    if (fn) {
      const params = fn.node.params.map((x) => src(x)).join(", ");
      fnName = fn.node.id ? fn.node.id.name : "";
      // 尝试从父级变量声明取名字
      if (!fnName && fn.parentPath.isVariableDeclarator()) fnName = fn.parentPath.node.id.name || "";
      if (!fnName && fn.parentPath.isAssignmentExpression()) fnName = src(fn.parentPath.node.left);
      if (!fnName && fn.parentPath.isObjectProperty()) fnName = src(fn.parentPath.node.key);
      sig = `${fnName}(${params})`;
    }

    hits.push({
      line: p.node.loc.start.line,
      loopVar: name,
      sig,
      stmt: src(p.node),
      misuse,
    });
  },
});

hits.sort((a, b) => a.line - b.line);
for (const h of hits) {
  console.log("=".repeat(78));
  console.log(`LINE ${h.line}  loopVar=${h.loopVar}`);
  console.log(`FN   ${h.sig}`);
  console.log(`STMT ${h.stmt.length > 700 ? h.stmt.slice(0, 700) + " …[truncated]" : h.stmt}`);
}
console.log("=".repeat(78));
console.log("TOTAL:", hits.length);
