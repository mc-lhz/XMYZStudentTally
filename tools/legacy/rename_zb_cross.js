const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const dir = "final";

// publicAlias -> { local, defFile, name }
const MAP = {
  zb5q: { local: "zbeo", defFile: "voices-theme-B9KdZorS.js", name: "useVxToast" },
  zb5r: { local: "zbey", defFile: "voices-theme-B9KdZorS.js", name: "showToast" },
  zb5o: { local: "zbew", defFile: "voices-theme-B9KdZorS.js", name: "VxNoticeHostScoped" },
  zb5p: { local: "zbes", defFile: "voices-theme-B9KdZorS.js", name: "VxBackButton" },
  zb4u: { local: "ut", defFile: "useVoiceIdentity-CU57DzMk.js", name: "IdentityBindModalScoped" },
  zb4v: { local: "local_zbe1", defFile: "useVoiceIdentity-CU57DzMk.js", name: "VxPenScoped" },
  zb4w: { local: "zbdy", defFile: "useVoiceIdentity-CU57DzMk.js", name: "IdentityIcon" },
  zb4x: { local: "vt", defFile: "useVoiceIdentity-CU57DzMk.js", name: "VxSealLine" },
  zb4y: { local: "ct", defFile: "useVoiceIdentity-CU57DzMk.js", name: "syncVoiceUserId" },
  zb4r: { local: "zbds", defFile: "useDebateSocket-8JmRCem2.js", name: "createDebateSocket" },
  zb4d: { local: "local_zb47", defFile: "rating-DOU6YvDA.js", name: "getRatingSectionName" },
  zbr:  { local: "zbx", defFile: "debate-B8dkqKam.js", name: "getDebateActive" },
  zbp:  { local: "zbr", defFile: "debate-B8dkqKam.js", name: "getDebateRound" },
  zb1s: { local: "zbcy", defFile: "grade-BOUREyqU.js", name: "getGradeTypeName" },
  zb4t: { local: "zbdw", defFile: "useTallySocket-Bnuwbx53.js", name: "createTallySocket" },
  zb4s: { local: "zbdv", defFile: "usePageScrollLock-C1lt3cX0.js", name: "usePageScrollLock" },
  zb4z: { local: "zb5j", defFile: "voices-DF_9WYD3.js", name: "voiceIdentityTypeLabels" },
};

// 碰撞检查：newName 不应作为标识符已存在于任何 final 文件
function collisionCheck() {
  const names = new Set(Object.values(MAP).map(m => m.name));
  // 每个新名对应的定义文件（该文件含新名是预期的，不算碰撞）
  const defOf = {};
  for (const m of Object.values(MAP)) defOf[m.name] = m.defFile;
  let bad = [];
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith(".js"))) {
    const code = fs.readFileSync(path.join(dir, f), "utf8");
    const ast = babel.parseSync(code, { sourceType: "unambiguous", presets: [] });
    babel.traverse(ast, {
      Identifier(p) {
        if (names.has(p.node.name)) {
          if (p.parent.type === "StringLiteral") return;
          if (defOf[p.node.name] === f) return; // 定义文件本就含此名
          bad.push(`${f}: 已存在标识符 '${p.node.name}' @ line ${p.node.loc && p.node.loc.start.line}`);
        }
      }
    });
  }
  return bad;
}

function transformFile(file) {
  const code = fs.readFileSync(path.join(dir, file), "utf8");
  // 本文件相关的别名
  const ops = []; // {kind:'local'|'import', name, newName, defFile}
  for (const [alias, m] of Object.entries(MAP)) {
    if (m.defFile === file) {
      ops.push({ kind: "local", name: m.local, newName: m.name, alias });
    }
  }
  // 消费者：文件里 import 了某个 alias
  const importedAliases = new Set();
  for (const [alias, m] of Object.entries(MAP)) {
    if (new RegExp("\\b" + alias + "\\b").test(code)) {
      // 仅当确实作为 import/使用出现；defFile 也会含 alias（在 export specifier），但 defFile 里 alias 不出现在 import
      importedAliases.add(alias);
    }
  }

  const plugin = ({ types: t }) => ({
    visitor: {
      Program: {
        exit(progPath) {
          const pending = []; // 非别名导入的连带重命名 {name,newName,path}
          // 1) 本地声明重命名 (defining file)
          progPath.traverse({
            "FunctionDeclaration|VariableDeclarator|FunctionExpression|ArrowFunctionExpression"(p) {
              const id = p.node.id;
              if (!id || id.type !== "Identifier") return;
              const op = ops.find(o => o.kind === "local" && o.name === id.name);
              if (op) {
                p.scope.rename(op.name, op.newName);
              }
            }
          });
          // 2) import 绑定修正 (consumer file)
          progPath.traverse({
            ImportDeclaration(p) {
              p.get("specifiers").forEach(sp => {
                const node = sp.node;
                if (node.type !== "ImportSpecifier" || !node.imported) return;
                const imp = node.imported.name;
                if (!MAP[imp]) return;
                if (node.local.name !== imp) {
                  // 别名导入 `alias as local`：只改源名匹配导出，用法已用 local
                  node.imported.name = MAP[imp].name;
                } else {
                  // 非别名导入 `name`：须连同所有用法一起改 -> 收集待 exit 处理
                  pending.push({ name: imp, newName: MAP[imp].name, path: sp });
                }
              });
            }
          });
          // 2b) 非别名导入的连带重命名（binding + 所有用法 + import 节点）
          for (const r of pending) {
            try { r.path.scope.rename(r.name, r.newName); } catch (e) {}
            // scope.rename 不会改 imported(源)名，手动补齐以匹配导出
            if (r.path.node.imported) r.path.node.imported.name = r.newName;
          }
          // 3) 导出 specifier 修正: `local as alias` -> 把 exported(alias) 改成 newName
          progPath.traverse({
            ExportNamedDeclaration(p) {
              if (!p.node.specifiers) return;
              p.node.specifiers.forEach(spec => {
                if (spec.type === "ExportSpecifier" && spec.local && spec.exported) {
                  const e = spec.exported.name;
                  if (MAP[e]) {
                    spec.exported.name = MAP[e].name;
                    if (spec.local.name === e) spec.local.name = MAP[e].name;
                  }
                }
              });
            }
          });
        }
      }
    }
  });

  const out = babel.transformSync(code, {
    sourceType: "unambiguous",
    presets: [],
    plugins: [plugin],
    compact: false,
    comments: true,
  });
  return out.code;
}

// 主流程
const TEST = process.env.TEST ? process.env.TEST.split(",") : null;
let files = fs.readdirSync(dir).filter(x => x.endsWith(".js"));
if (TEST) files = files.filter(f => TEST.includes(f));

console.error("碰撞检查...");
const bad = collisionCheck();
if (bad.length) { console.error("发现碰撞:\n" + bad.join("\n")); process.exit(1); }
console.error("无碰撞 ✓");

let changed = 0, failed = 0, fails = [];
for (const f of files) {
  try {
    const out = transformFile(f);
    const orig = fs.readFileSync(path.join(dir, f), "utf8");
    if (out !== orig) {
      fs.writeFileSync(path.join(dir, f), out);
      changed++;
    }
  } catch (e) {
    failed++; fails.push(`${f}: ${e.message.slice(0,100)}`);
  }
}
console.error(`处理完成: 变更 ${changed}, 失败 ${failed}`);
if (failed) console.error(fails.join("\n"));
