// 修复 index-DJrtCu9i.js 里「循环变量 = val 且可迭代/初始化式里也引用 val」的 TDZ 碰撞。
// 关键：right/初始化式里的 val 本应引用【外层参数 val】，不能一起改；
//       只改「循环变量绑定 + 循环体里的 val 引用」，可迭代表达式原样保留。
// 采用【按源码偏移做最小字符替换】而非整体 regenerate，以保住反混淆注释与排版。
const fs = require("fs");
const path = require("path");
const { ASSETS, loadBabel } = require("./_resolve.cjs");
const babel = loadBabel();
const DRY = process.env.DRY === "1";

const FILE = "index-DJrtCu9i.js";
const fp = path.join(ASSETS, FILE);
const code = fs.readFileSync(fp, "utf8");
const ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] });

function boundOf(node) {
  const names = new Set();
  (function walk(n) {
    if (!n) return;
    if (n.type === "Identifier") names.add(n.name);
    else if (n.type === "VariableDeclaration") n.declarations.forEach(d => walk(d.id));
    else if (n.type === "VariableDeclarator") walk(n.id);
    else if (n.type === "ObjectPattern" || n.type === "ArrayPattern") (n.elements || n.properties).forEach(walk);
    else if (n.type === "RestElement" || n.type === "AssignmentPattern") walk(n.argument || n.left);
  })(node);
  return names;
}
function refsName(node, names) {
  if (!node || typeof node !== "object") return false;
  if (node.type === "Identifier" && names.has(node.name)) return true;
  if (node.type === "MemberExpression") {
    if (refsName(node.object, names)) return true;
    return node.computed && refsName(node.property, names);
  }
  if (/Function/.test(node.type) || /Method/.test(node.type) || node.type === "ClassProperty" || node.type === "ClassPrivateProperty") return false;
  for (const k of Object.keys(node)) {
    if (["loc", "start", "end", "range", "leadingComments", "trailingComments", "innerComments"].includes(k)) continue;
    const c = node[k];
    if (Array.isArray(c)) { if (c.some(x => refsName(x, names))) return true; }
    else if (c && typeof c === "object") { if (refsName(c, names)) return true; }
  }
  return false;
}

const edits = []; // {start, end, text}
let counter = 0;
function freshName() { return `val_tdz${counter++}`; }

// 在循环体(及 For 的 test/update)里收集 oldName 引用并登记改名；遇到嵌套函数作用域则跳过
function collectBodyRefs(node, oldName, fresh) {
  (function walk(n) {
    if (!n || typeof n !== "object") return;
    if (n.type === "Identifier" && n.name === oldName) {
      edits.push({ start: n.start, end: n.end, text: fresh });
      return;
    }
    if (/Function/.test(n.type) || /Method/.test(n.type) || n.type === "ClassProperty" || n.type === "ClassPrivateProperty") return;
    // 不进入嵌套循环：内层循环由它自己的 visitor 单独处理，避免把内层循环变量/可迭代式一起改名导致二次碰撞
    if (n.type === "ForOfStatement" || n.type === "ForInStatement" || n.type === "ForStatement") return;
    if (n.type === "MemberExpression") {
      walk(n.object);
      if (n.computed) walk(n.property);
      return;
    }
    for (const k of Object.keys(n)) {
      if (["loc", "start", "end", "range", "leadingComments", "trailingComments", "innerComments"].includes(k)) continue;
      const c = n[k];
      if (Array.isArray(c)) c.forEach(walk);
      else if (c && typeof c === "object") walk(c);
    }
  })(node);
}

babel.traverse(ast, {
  ForOfStatement(p) {
    const names = boundOf(p.node.left);
    if (refsName(p.node.right, names)) {
      const oldName = p.node.left.declarations[0].id.name;
      const fresh = freshName();
      edits.push({ start: p.node.left.declarations[0].id.start, end: p.node.left.declarations[0].id.end, text: fresh });
      collectBodyRefs(p.node.body, oldName, fresh);
    }
  },
  ForInStatement(p) {
    const names = boundOf(p.node.left);
    if (refsName(p.node.right, names)) {
      const oldName = p.node.left.declarations[0].id.name;
      const fresh = freshName();
      edits.push({ start: p.node.left.declarations[0].id.start, end: p.node.left.declarations[0].id.end, text: fresh });
      collectBodyRefs(p.node.body, oldName, fresh);
    }
  },
  ForStatement(p) {
    if (p.node.init && p.node.init.type === "VariableDeclaration") {
      const names = boundOf(p.node.init);
      for (const d of p.node.init.declarations) {
        if (d.init && refsName(d.init, names)) {
          const oldName = d.id.name;
          const fresh = freshName();
          edits.push({ start: d.id.start, end: d.id.end, text: fresh });
          collectBodyRefs(p.node.body, oldName, fresh);
          collectBodyRefs(p.node.test, oldName, fresh);
          collectBodyRefs(p.node.update, oldName, fresh);
        }
      }
    }
  },
});

// 同一起始偏移去重（避免重复登记）
const uniq = [];
const seen = new Set();
for (const e of edits) { const k = e.start + ":" + e.end; if (!seen.has(k)) { seen.add(k); uniq.push(e); } }

if (DRY) {
  console.log(`将修改 ${uniq.length} 处标识符（DRY，不写盘）`);
  for (const e of uniq.slice(0, 12)) {
    console.log(`  @${e.start}-${e.end}: ${code.slice(e.start, e.end)} -> ${e.text}`);
  }
  if (uniq.length > 12) console.log(`  ... 其余 ${uniq.length - 12} 处`);
  process.exit(0);
}

// 按起始偏移倒序回写，保证偏移有效
uniq.sort((a, b) => b.start - a.start);
let out = code;
for (const e of uniq) out = out.slice(0, e.start) + e.text + out.slice(e.end);
fs.writeFileSync(fp, out, "utf8");
console.log(`已写回 ${FILE}，共 ${uniq.length} 处标识符改名`);
