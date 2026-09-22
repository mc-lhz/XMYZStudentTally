// 检测反混淆产物里的 TDZ 自引用碰撞：
//   for (const X of X.split(","))  ← 可迭代表达式里引用了正在声明的循环变量 X 本身
// Babel 解析每个文件，遍历 ForOf/ForIn/For 语句，若循环变量名出现在它自己的
// 可迭代/初始化表达式里，就报出来（几乎必然是重命名把不同原变量合并成了同名）。
const fs = require("fs");
const path = require("path");
const { ASSETS, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();

function boundNamesOf(left) {
  const names = new Set();
  function walk(node) {
    if (!node) return;
    if (node.type === "Identifier") names.add(node.name);
    else if (node.type === "VariableDeclaration") node.declarations.forEach(d => walk(d.id));
    else if (node.type === "VariableDeclarator") walk(node.id);
    else if (node.type === "ObjectPattern" || node.type === "ArrayPattern") {
      for (const el of node.elements || node.properties) walk(el);
    } else if (node.type === "RestElement" || node.type === "AssignmentPattern") {
      walk(node.argument || node.left);
    }
  }
  walk(left);
  return names;
}

function idRefsIn(node, names) {
  if (!node || typeof node !== "object") return false;
  if (node.type === "Identifier" && names.has(node.name)) return true;
  // 跳过函数/箭头/类作用域边界：这些会重新声明同名，不应算作外部引用
  if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression" || node.type === "ObjectMethod" ||
      node.type === "ClassMethod" || node.type === "ClassPrivateMethod") {
    return false;
  }
  for (const key of Object.keys(node)) {
    if (key === "loc" || key === "start" || key === "end" || key === "range" || key === "leadingComments" || key === "trailingComments" || key === "innerComments") continue;
    const child = node[key];
    if (Array.isArray(child)) {
      for (const c of child) if (idRefsIn(c, names)) return true;
    } else if (child && typeof child === "object") {
      if (idRefsIn(child, names)) return true;
    }
  }
  return false;
}

let total = 0;
const files = fs.readdirSync(ASSETS).filter(f => f.endsWith(".js"));
for (const f of files) {
  const fp = path.join(ASSETS, f);
  const code = fs.readFileSync(fp, "utf8");
  let ast;
  try {
    ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] });
  } catch (e) {
    continue;
  }
  babel.traverse(ast, {
    ForOfStatement(p) {
      const names = boundNamesOf(p.node.left);
      if (idRefsIn(p.node.right, names)) {
        console.log(`${f}:${p.node.loc.start.line}  ForOf  loopVar=${[...names].join(",")}  (迭代器自引用)`);
        total++;
      }
    },
    ForInStatement(p) {
      const names = boundNamesOf(p.node.left);
      if (idRefsIn(p.node.right, names)) {
        console.log(`${f}:${p.node.loc.start.line}  ForIn  loopVar=${[...names].join(",")}  (迭代器自引用)`);
        total++;
      }
    },
    ForStatement(p) {
      if (p.node.init && p.node.init.type === "VariableDeclaration") {
        const names = boundNamesOf(p.node.init);
        let hit = false;
        for (const decl of p.node.init.declarations) {
          // 只检查初始化器的值（test/update 在 init 之后执行，引用 loopVar 是合法的）
          if (decl.init && idRefsIn(decl.init, names)) hit = true;
        }
        if (hit) {
          console.log(`${f}:${p.node.loc.start.line}  For    loopVar=${[...names].join(",")}  (init 自引用)`);
          total++;
        }
      }
    },
  });
}
console.log(`\n碰撞总数: ${total}`);
