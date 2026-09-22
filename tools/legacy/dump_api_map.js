/**
 * dump_api_map.js —— 只读：为每个 API 客户端 chunk 推导 公开导出名 -> 语义名。
 * 追踪：export { <local> as <public> } → 找到 <local> 函数体里的 shared_X.<method>("<path>") → 生成语义名。
 * 输出 api_map.json 供审阅（不改任何源文件）。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const CHUNKS = ["campaign", "rating", "voices", "museum", "dorm", "debate", "tally", "grade", "file", "ticket"];
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js"));

// 路径+方法 -> 语义名
function deriveName(method, p) {
  // 去掉查询、模板参数标记
  let hasId = /\$\{/.test(p);
  const segsRaw = p.split("?")[0].split("/").filter(Boolean);
  // 过滤模板段 ${...}
  const segs = segsRaw.filter((s) => !s.startsWith("${"));
  // 末段是否是动作动词
  const ACTIONS = ["activate", "close", "verify", "search", "upload", "batch", "broadcast",
    "bind", "unbind", "rebind", "callback", "authorize-url", "read-all", "unread-count",
    "stage-operation", "results", "submissions", "captcha", "send", "status", "detail",
    "url", "qrcode", "qualities", "history", "my", "me", "active", "vote", "display", "screen",
    "download", "report", "identity", "hot-items", "random-items", "time-periods", "rounds"];
  const camel = (s) => s.replace(/[-_]+([a-z0-9])/g, (m, c) => c.toUpperCase()).replace(/[-_]/g, "");
  const Cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;

  // admin 前缀
  let adminPrefix = "";
  let rest = segs.slice();
  if (rest[0] === "admin") { adminPrefix = "Admin"; rest = rest.slice(1); }

  // 找动作段（末段命中 ACTIONS）
  let action = "";
  if (rest.length && ACTIONS.includes(rest[rest.length - 1])) { action = rest[rest.length - 1]; rest = rest.slice(0, -1); }

  // 资源名 = 剩余段拼接（驼峰）
  const resource = rest.map((s) => Cap(camel(s))).join("") || "Resource";

  const verbByMethod = { get: hasId ? "get" : "get", post: "create", put: "update", delete: "delete", patch: "update" };
  let verb = verbByMethod[method] || "call";

  // 有明确动作段时，动作即动词
  if (action) {
    const a = camel(action);
    // 一些动作本身是名词(results/submissions/detail/url/status/qualities/binding) → get 之
    const nounActions = ["results", "submissions", "detail", "url", "status", "qualities", "history",
      "identity", "hotItems", "randomItems", "timePeriods", "rounds", "captcha", "qrcode", "unreadCount", "me", "my", "active", "binding"];
    if (nounActions.includes(a)) return camel((method === "get" ? "get" : verb)) + adminPrefix + resource + Cap(a);
    return camel(a) + adminPrefix + resource; // 动词动作：activateCampaign / verifyTicket
  }

  // 无动作段：集合 vs 单条
  if (method === "get") verb = hasId ? "get" : "get";
  let name = verb + adminPrefix + resource;
  if (method === "get" && !hasId) name = "get" + adminPrefix + resource; // 复数列表
  if (method === "get" && hasId) name = "get" + adminPrefix + resource + "ById";
  return name;
}

const result = {}; // chunkName -> { file, exports: [ {public, local, method, path, semantic} ] }

for (const c of CHUNKS) {
  const fs2 = files.filter((f) => new RegExp("^" + c + "-").test(f));
  for (const f of fs2) {
    const code = fs.readFileSync(path.join(FINAL, f), "utf8");
    let ast;
    try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { continue; }
    // 收集 local 函数 -> endpoint
    const fnEndpoint = {}; // localName -> {method, path}
    babel.traverse(ast, {
      Function(p) {
        let localName = null;
        if (p.node.id) localName = p.node.id.name;
        else if (p.parentPath.isVariableDeclarator() && p.parentPath.node.id.type === "Identifier") localName = p.parentPath.node.id.name;
        if (!localName) return;
        // 找函数体里的 shared_X.method(path)
        p.traverse({
          CallExpression(cp) {
            const callee = cp.node.callee;
            if (callee.type === "MemberExpression" && callee.object && /^shared_/.test(callee.object.name || "") &&
                callee.property && ["get", "post", "put", "delete", "patch"].includes(callee.property.name)) {
              if (fnEndpoint[localName]) return; // 取第一个
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
    // 解析 export specifiers
    const exps = [];
    babel.traverse(ast, {
      ExportNamedDeclaration(p) {
        if (p.node.declaration) return;
        if (p.node.source) return; // re-export from other module，跳过
        p.node.specifiers.forEach((s) => {
          if (s.type !== "ExportSpecifier") return;
          const local = s.local.name, pub = s.exported.name;
          const ep = fnEndpoint[local];
          exps.push({ public: pub, local, method: ep ? ep.method : null, path: ep ? ep.path : null, semantic: ep ? deriveName(ep.method, ep.path) : null });
        });
      },
    });
    result[f] = { chunk: c, exports: exps };
  }
}

// 处理同名碰撞（同 chunk 内 semantic 重名 → 加序号）
for (const f of Object.keys(result)) {
  const seen = {};
  for (const e of result[f].exports) {
    if (!e.semantic) continue;
    if (seen[e.semantic]) { seen[e.semantic]++; e.semantic = e.semantic + seen[e.semantic]; }
    else seen[e.semantic] = 1;
  }
}

fs.writeFileSync(path.join(__dirname, "api_map.json"), JSON.stringify(result, null, 2));
// 打印摘要
let mapped = 0, unmapped = 0;
for (const f of Object.keys(result)) {
  console.log("\n# " + f.replace(/-[A-Za-z0-9_]+\.js$/, "") + " (" + result[f].exports.length + " 导出)");
  for (const e of result[f].exports) {
    if (e.semantic) { mapped++; console.log("   " + e.public + " -> " + e.semantic + "   [" + e.method + " " + e.path + "]"); }
    else { unmapped++; console.log("   " + e.public + " -> (未映射: 非直接 http 或 re-export)"); }
  }
}
console.log("\n可映射:", mapped, " 未映射:", unmapped);
