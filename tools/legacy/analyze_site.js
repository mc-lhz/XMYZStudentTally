/**
 * analyze_site.js —— 从已反混淆+注释的 final/ 抽取结构化信息，供生成架构/接口分析文档。
 * 输出 analyze_site_output.json：
 *  - modules: 每个 JS 文件 -> { domain, exportedSemantic[], apiEndpoints[], role }
 *  - endpoints: 去重后的接口路径 -> 出现文件
 *  - domains: 功能域 -> 文件列表
 */
const fs = require("fs");
const babel = require("@babel/core");
const path = require("path");

const FINAL = path.join(__dirname, "final");
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

// 功能域分组（按文件名/路由关键词）
const DOMAIN_RULES = [
  ["票务/抢票", /Ticket|ticket|Verify|verify|Activity/i],
  ["评分社区", /Rating|rating|Collection|Category|Community|Moment/i],
  ["活动/投票", /Campaign|campaign|Vote|vote|Screen|Debate|debate|Tally|tally/i],
  ["声音/问答", /Voices|voices|Ask|Answer|Question/i],
  ["博物馆", /Museum|museum|Event/i],
  ["宿舍/铃声", /Dorm|dorm|Ringtone|ringtone/i],
  ["个人/资料", /Profile|profile|MyTickets|MyContributions|QQ|Bind|bind|Login|login|Auth|auth/i],
  ["布局/通用", /PageHeader|PageFooter|PageBreadcrumb|Vx|Footer|Loading|Wall|NotFound|index|browser/i],
  ["其它", /./],
];

function domainOf(fname) {
  for (const [d, re] of DOMAIN_RULES) if (re.test(fname)) return d;
  return "其它";
}

const isApiPath = (s) => typeof s === "string" && /^\/[a-zA-Z][\w\-/]*$/.test(s) && s.length >= 4 && !/\s|\{|\}|;/.test(s);

const modules = {};
const endpoints = {}; // path -> Set(file)
const domains = {};

for (const f of files) {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  const mod = { file: f, domain: domainOf(f), exportedSemantic: [], apiEndpoints: [], role: "" };
  let ast;
  try { ast = babel.parseSync(code, { sourceType: "module" }); } catch (e) { modules[f] = mod; continue; }

  const localEndpoints = new Set();
  babel.traverse(ast, {
    // 导出语义名
    ExportNamedDeclaration(p) {
      const n = p.node;
      if (n.declaration) {
        const d = n.declaration;
        if ((d.type === "FunctionDeclaration" || d.type === "ClassDeclaration") && d.id && /^[a-z]/.test(d.id.name) && d.id.name.length > 2) mod.exportedSemantic.push(d.id.name);
        else if (d.type === "VariableDeclaration") d.declarations.forEach((dl) => dl.id.type === "Identifier" && /^[a-z]/.test(dl.id.name) && dl.id.name.length > 2 && mod.exportedSemantic.push(dl.id.name));
      } else {
        n.specifiers.forEach((s) => s.type === "ExportSpecifier" && s.exported.name.length > 2 && /^[a-z]/.test(s.exported.name) && mod.exportedSemantic.push(s.exported.name));
      }
    },
    ExportDefaultDeclaration(p) { mod.role = "默认导出(可能是页面组件/SFC渲染函数)"; },
    // axios / http 调用路径
    CallExpression(p) {
      const c = p.node.callee;
      const prop = c.type === "MemberExpression" ? c.property && c.property.name : null;
      const objName = c.object && c.object.name;
      const isHttp = (prop && ["get", "post", "put", "delete", "patch"].includes(prop)) && (objName && /axios|http|request|api/i.test(objName));
      if (isHttp) {
        const a0 = p.node.arguments[0];
        if (a0 && a0.type === "StringLiteral" && isApiPath(a0.value)) { localEndpoints.add(a0.value); }
      }
      // 任意字符串字面量中像接口路径的
      p.node.arguments.forEach((arg) => {
        if (arg && arg.type === "StringLiteral" && isApiPath(arg.value)) localEndpoints.add(arg.value);
      });
    },
    // 模板/拼接里的接口字符串
    StringLiteral(p) {
      if (isApiPath(p.node.value)) localEndpoints.add(p.node.value);
    },
  });

  mod.apiEndpoints = [...localEndpoints].sort();
  mod.apiEndpoints.forEach((e) => { (endpoints[e] = endpoints[e] || new Set()).add(f); });
  modules[f] = mod;
  const d = mod.domain;
  (domains[d] = domains[d] || []).push(f);
}

// 汇总
const allEndpoints = Object.keys(endpoints).sort().map((e) => ({ path: e, files: [...endpoints[e]] }));
const out = {
  totalJs: files.length,
  domains: Object.fromEntries(Object.entries(domains).map(([k, v]) => [k, v.length])),
  modules: modules,
  endpoints: allEndpoints,
  endpointCount: allEndpoints.length,
};
fs.writeFileSync(path.join(__dirname, "analyze_site_output.json"), JSON.stringify(out, null, 2));
console.log("模块:", files.length, " 功能域:", Object.keys(domains).length, " 抽取接口路径:", allEndpoints.length);
console.log("各域文件数:", JSON.stringify(out.domains, null, 0));
