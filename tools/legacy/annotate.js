const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const ROOT = __dirname;
const RESTORED = path.join(ROOT, "restored");

// ---------- JS: enrich header + AST-safe inline structural comments ----------
function detectSummary(code) {
  const sum = [];
  if (/createRouter|routes:\s*\[/.test(code)) sum.push("Vue Router 路由表");
  if (/createApp/.test(code)) sum.push("应用入口 (createApp)");
  if (/defineStore|createPinia|Pinia/.test(code)) sum.push("Pinia 状态管理");
  if (/axios/.test(code)) sum.push("Axios HTTP 客户端");
  const api = code.match(/baseURL:\s*["'`]([^"'`]+)["'`]/);
  if (api) sum.push("API base: " + api[1]);
  const rc = (code.match(/path:\s*["']/g) || []).length;
  if (rc) sum.push("含 " + rc + " 个路由路径");
  return sum;
}

function jsHeader(srcName, summary) {
  const lines = [
    "/*!",
    " * Smart-restored (renamed + UTF-8 decoded) JS — annotated",
    " * Source : assets/" + srcName,
    " * Origin : https://xmyzstudent.com/",
    " * Date   : 2026-07-21",
    " * Note   : Local/minified variables renamed by usage heuristic;",
    " *          \\uXXXX decoded to UTF-8; structural comments added.",
  ];
  if (summary.length) lines.push(" * Detect : " + summary.join("; "));
  lines.push(" */");
  return lines.join("\n") + "\n";
}

function annotateJS(file) {
  let code = fs.readFileSync(file, "utf8");
  // strip any existing leading /*! ... */ block to avoid duplication
  code = code.replace(/^\s*\/\*![\s\S]*?\*\/\s*/, "");

  const srcName = path.basename(file).replace(/-restored\.js$/, ".js");
  const summary = detectSummary(code);

  const plugin = function () {
    return {
      visitor: {
        Program(p) {
          const body = p.get("body");
          body.forEach((stmt) => {
            const node = stmt.node;
            if (stmt.node.leadingComments && stmt.node.leadingComments.length) return;
            let comment = null;
            if (stmt.isImportDeclaration()) {
              comment = "导入依赖 / 模块";
            } else if (stmt.isExportDefaultDeclaration()) {
              comment = "默认导出（入口 / 组件）";
            } else if (stmt.isExportNamedDeclaration()) {
              comment = "命名导出";
            } else if (stmt.isVariableDeclaration()) {
              const d = node.declarations[0];
              const init = d && d.init;
              if (init && init.type === "CallExpression") {
                const callee = init.callee;
                const name = callee && (callee.name || (callee.property && callee.property.name) || (callee.callee && callee.callee.name));
                if (/createRouter/.test(name || "")) comment = "创建路由实例 (Vue Router)";
                else if (/createApp/.test(name || "")) comment = "创建应用实例 (createApp)";
                else if (/createPinia|Pinia/.test(name || "")) comment = "创建状态库 (Pinia)";
                else if (/axios/.test(name || "")) comment = "HTTP 客户端 (Axios 实例)";
                else if (/defineStore/.test(name || "")) comment = "定义状态存储 (Pinia store)";
                else if (/reactive|ref/.test(name || "")) comment = "声明响应式状态";
              }
              // detect routes array
              if (!comment && d && d.init && d.init.type === "ArrayExpression") {
                const txt = JSON.stringify(node).slice(0, 400);
                if (/path:/.test(txt)) comment = "路由表定义 (Vue Router routes)";
              }
              // top-level arrow/function method
              if (!comment && d && d.init && (d.init.type === "ArrowFunctionExpression" || d.init.type === "FunctionExpression")) {
                comment = "函数 / 方法定义: " + (d.id ? d.id.name : d.name || "anonymous");
              }
            } else if (stmt.isFunctionDeclaration()) {
              comment = "函数定义: " + (node.id ? node.id.name : "anonymous");
            }
            if (comment) stmt.addComment("leading", " " + comment + " ", false);
          });
        },
      },
    };
  };

  const res = babel.transformSync(code, {
    plugins: [plugin],
    sourceType: "module",
    retainLines: false,
    compact: false,
  });
  const out = jsHeader(srcName, summary) + res.code;
  fs.writeFileSync(file, out);
}

// ---------- CSS: section comments at structural anchors ----------
function annotateCSS(file) {
  let code = fs.readFileSync(file, "utf8");
  code = code.replace(/^\s*\/\*![\s\S]*?\*\/\s*/, "");
  const srcName = path.basename(file).replace(/-restored\.css$/, ".css");

  const sec = (re, label) =>
    (code = code.replace(re, (m, ws, head) => ws + "/* ── " + label + " ── */\n" + ws + head));

  sec(/^(\s*)(:root\s*\{)/gm, "根变量 / 主题色板");
  sec(/^(\s*)(@media[^{]*)\{/gm, "媒体查询 @media");
  sec(/^(\s*)(@keyframes[^{]*)\{/gm, "动画关键帧 @keyframes");
  sec(/^(\s*)(@font-face\s*)\{/gm, "字体声明 @font-face");
  sec(/^(\s*)(@supports[^{]*)\{/gm, "特性查询 @supports");

  const header = [
    "/*!",
    " * Smart-restored (UTF-8 decoded) CSS — annotated",
    " * Source : assets/" + srcName,
    " * Origin : https://xmyzstudent.com/",
    " * Date   : 2026-07-21",
    " * Note   : Beautified by esbuild; \\uXXXX decoded to UTF-8; section comments added.",
    " */",
    "",
  ].join("\n");
  fs.writeFileSync(file, header + code);
}

let jsN = 0, cssN = 0;
for (const f of fs.readdirSync(RESTORED).sort()) {
  const p = path.join(RESTORED, f);
  if (f.endsWith("-restored.js")) { annotateJS(p); jsN++; }
  else if (f.endsWith("-restored.css")) { annotateCSS(p); cssN++; }
}
console.log("annotated JS:", jsN, " CSS:", cssN);
