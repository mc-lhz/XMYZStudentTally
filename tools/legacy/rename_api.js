/**
 * rename_api.js —— 语义化 10 个 API 客户端 chunk 的导出/内部函数名（选项 A）。
 *
 * 目标：把各 API chunk 里 zbN 之类的不透明名，按 axios 端点(method+path) 推导为语义名，
 *      例如 campaign::zb6 -> getCampaignsById。既改内部函数声明，也改公开导出名，
 *      并同步所有消费方 import 的 imported 名（保留消费方本地别名，消费方函数体零改动）。
 *
 * 只处理"直接调用 shared_*.<method>(path) 的端点函数"；纯本地工具函数（method=null）保持不变。
 *
 * 复用 rename_all_single.js 的做法：babel.transformSync(compact:false, comments:true) 保留注释与美化格式。
 *
 * Phase1: 扫描 10 个 chunk，构建 pubReplace(mod::public->semantic) 与 localReplace(mod::local->semantic)。
 * Phase2: 逐文件 transform —— 改写 export.exported / import.imported（跨模块查 pubReplace）+ chunk 内 scope.rename 本地函数。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const CHUNKS = ["campaign", "rating", "voices", "museum", "dorm", "debate", "tally", "grade", "file", "ticket"];
const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();
const chunkFiles = allFiles.filter((f) => CHUNKS.some((c) => new RegExp("^" + c + "-").test(f)));
const chunkSet = new Set(chunkFiles);

// ---- 路径+方法 -> 语义名（修复：清理段内 ${...} 模板；剥离纯模板段）----
function deriveName(method, p) {
  const hasId = /\$\{/.test(p);
  const segsRaw = p.split("?")[0].split("/").filter(Boolean);
  const segs = segsRaw.map((s) => s.replace(/\$\{[^}]*\}/g, "")).filter(Boolean); // 清理段内模板 + 丢弃纯模板段
  const ACTIONS = ["activate", "close", "verify", "search", "upload", "batch", "broadcast",
    "bind", "unbind", "rebind", "callback", "authorize-url", "read-all", "unread-count",
    "stage-operation", "results", "submissions", "captcha", "send", "status", "detail",
    "url", "qrcode", "qualities", "history", "my", "me", "active", "vote", "display", "screen",
    "download", "report", "identity", "hot-items", "random-items", "time-periods", "rounds",
    "approve", "reject", "takedown", "restore", "publish", "unpublish", "feature", "unfeature",
    "toggle-status", "regenerate-password", "reset", "lock", "unlock", "undo", "favorite",
    "like", "sort", "review", "handle", "blocks", "candidates", "records", "stats", "reports",
    "answers", "questions", "config", "options", "my-votes", "image", "grab", "use", "sessions",
    "batch-review", "upload-image", "batch-rating-items", "pending-count", "daily-ratings", "overview"];
  const camel = (s) => s.replace(/[-_]+([a-z0-9])/g, (m, c) => c.toUpperCase()).replace(/[-_]/g, "");
  const Cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  let adminPrefix = "";
  let rest = segs.slice();
  if (rest[0] === "admin") { adminPrefix = "Admin"; rest = rest.slice(1); }

  let action = "";
  if (rest.length && ACTIONS.includes(rest[rest.length - 1])) { action = rest[rest.length - 1]; rest = rest.slice(0, -1); }

  const resource = rest.map((s) => Cap(camel(s))).join("") || "Resource";
  const verbByMethod = { get: "get", post: "create", put: "update", delete: "delete", patch: "update" };
  let verb = verbByMethod[method] || "call";

  if (action) {
    const a = camel(action);
    const nounActions = ["results", "submissions", "detail", "url", "status", "qualities", "history",
      "identity", "hotItems", "randomItems", "timePeriods", "rounds", "captcha", "qrcode", "unreadCount",
      "me", "my", "active", "config", "options", "myVotes", "blocks", "candidates", "records", "stats",
      "reports", "answers", "questions", "image", "sessions", "pendingCount", "dailyRatings", "overview"];
    if (nounActions.includes(a)) return (method === "get" ? "get" : verb) + adminPrefix + resource + Cap(a);
    return camel(a) + adminPrefix + resource; // 动词动作：activateCampaigns / voteVoting
  }

  let name = "get" + adminPrefix + resource;
  if (method === "get") name = hasId ? "get" + adminPrefix + resource + "ById" : "get" + adminPrefix + resource;
  else name = verb + adminPrefix + resource;
  return name;
}

// ---- Phase 1: 构建映射 ----
const pubReplace = {};   // mod::public -> semantic
const localReplace = {}; // mod::local  -> semantic
const report = {};       // mod -> [{public, local, method, path, semantic}]

for (const f of chunkFiles) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { console.error("PARSE FAIL", f, e.message); continue; }

  // 该文件所有标识符名（用于碰撞检测）
  const fileNames = new Set();
  babel.traverse(ast, { Identifier(p) { fileNames.add(p.node.name); } });

  // local 函数 -> {method, path}
  const fnEndpoint = {};
  babel.traverse(ast, {
    Function(p) {
      let localName = null;
      if (p.node.id) localName = p.node.id.name;
      else if (p.parentPath.isVariableDeclarator() && p.parentPath.node.id.type === "Identifier") localName = p.parentPath.node.id.name;
      if (!localName) return;
      p.traverse({
        CallExpression(cp) {
          const callee = cp.node.callee;
          if (callee.type === "MemberExpression" && callee.object && /^shared_/.test(callee.object.name || "") &&
              callee.property && ["get", "post", "put", "delete", "patch"].includes(callee.property.name)) {
            if (fnEndpoint[localName]) return;
            const a0 = cp.node.arguments[0];
            let pathStr = null;
            if (a0) {
              if (a0.type === "StringLiteral") pathStr = a0.value;
              else if (a0.type === "TemplateLiteral") pathStr = a0.quasis.map((q, i) => q.value.cooked + (i < a0.expressions.length ? "${x}" : "")).join("");
            }
            if (pathStr) fnEndpoint[localName] = { method: callee.property.name, path: pathStr };
          }
        },
      });
    },
  });

  // export specifiers -> 生成映射
  const seen = {};
  const entries = [];
  babel.traverse(ast, {
    ExportNamedDeclaration(p) {
      if (p.node.declaration || p.node.source) return;
      p.node.specifiers.forEach((s) => {
        if (s.type !== "ExportSpecifier") return;
        const local = s.local.name, pub = s.exported.name;
        const ep = fnEndpoint[local];
        if (!ep) return; // 非端点函数（本地工具/格式化器）—— 保持原样
        let sem = deriveName(ep.method, ep.path);
        // 同文件语义重名 -> 加序号
        if (seen[sem]) { seen[sem]++; sem = sem + seen[sem]; } else seen[sem] = 1;
        // 与该文件既有(非本次改名)标识符碰撞 -> 继续加序号
        while (fileNames.has(sem) && sem !== local) { sem = sem + "_"; }
        pubReplace[f + "::" + pub] = sem;
        localReplace[f + "::" + local] = sem;
        entries.push({ public: pub, local, method: ep.method, path: ep.path, semantic: sem });
      });
    },
  });
  report[f] = entries;
}

const totalPub = Object.keys(pubReplace).length;
console.log("Phase1: 端点导出映射条目:", totalPub);

// ---- Phase 2: 逐文件 transform ----
function lookupPub(mod, name) { return pubReplace[mod + "::" + name]; }
function lookupLocal(mod, name) { return localReplace[mod + "::" + name]; }

let fail = 0, importsRewritten = 0, exportsRewritten = 0, localsRenamed = 0;
allFiles.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  const isChunk = chunkSet.has(f);
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program(p) {
            p.node.body.forEach((node) => {
              // 改写本模块 export 的公开名
              if (node.type === "ExportNamedDeclaration" && !node.source && !node.declaration) {
                node.specifiers.forEach((s) => {
                  if (s.type === "ExportSpecifier") {
                    const ek = lookupPub(f, s.exported.name);
                    if (ek) { s.exported.name = ek; exportsRewritten++; }
                  }
                });
              }
              // 改写 import 的 imported 名（保留 local 别名）
              if (node.type === "ImportDeclaration") {
                const srcBare = node.source.value.replace(/^\.\//, "");
                node.specifiers.forEach((s) => {
                  if (s.type === "ImportSpecifier") {
                    const imp = lookupPub(srcBare, s.imported.name);
                    if (imp) { s.imported.name = imp; importsRewritten++; }
                  }
                });
              }
            });
            // chunk 文件内：scope 重命名本地端点函数
            if (isChunk) {
              const names = Object.keys(p.scope.bindings);
              for (const name of names) {
                const tgt = lookupLocal(f, name);
                if (tgt && tgt !== name) {
                  try { p.scope.rename(name, tgt); localsRenamed++; } catch (e) { /* ignore */ }
                }
              }
            }
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 5).join("\n"));
    fail++; return;
  }
  try { babel.parseSync(out, { sourceType: "module" }); }
  catch (e) { console.error("PARSE FAIL(after)", f, e.message); fail++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});

console.log("Phase2: exports改写:", exportsRewritten, " imports改写:", importsRewritten, " 本地函数重命名:", localsRenamed, " 失败:", fail);

// 输出最终映射报告
fs.writeFileSync(path.join(__dirname, "api_rename_report.json"), JSON.stringify(report, null, 2));
console.log("报告已写 api_rename_report.json");
