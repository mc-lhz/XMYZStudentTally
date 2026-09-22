/**
 * comment_detail.js
 * 为 final/ 下所有 94 个 JS 文件注入“详细中文注释”。
 *  - 模块头：路由 + 中文功能说明（来源于 routes.json）
 *  - import/export 注释：按来源模块分组说明
 *  - 函数注释：按函数体调用识别 API 接口 / 生命周期 / 渲染函数 / 格式化
 *  - 模板属性配置对象（const X = { class: ... }）注释：揭示编译后 DOM 结构
 * 每条注释均通过 babel.parseSync 重新校验，保证语法有效。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

// 严格自有属性判断，避免 apiDesc["toString"] 命中 Object.prototype.toString
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

const FINAL = path.join(__dirname, "final");
// 读取源 = final/ 本身（运行前已由 finalize2.js 重建为干净、未注释版本）
const SRC = FINAL;
console.log("读取源目录:", SRC);
const ROUTES = JSON.parse(fs.readFileSync(path.join(__dirname, "routes.json"), "utf8"));

// ---- 路由表：chunk 文件名 -> 路由信息 ----
const routeByChunk = {};
for (const r of ROUTES) {
  if (r.chunk && !routeByChunk[r.chunk]) routeByChunk[r.chunk] = r;
}

// ---- 票务接口语义描述（来自 finalize2.js 的 ticketMap，补充中文释义） ----
const apiDesc = {
  getMyTickets: "获取我的票据列表",
  getTicketActivity: "获取活动详情（票务）",
  getMyActivityTickets: "获取我参与的某活动票据",
  grabTicket: "抢票（锁定/下单名额）",
  getAdminTicketActivities: "管理员获取活动列表",
  deleteAdminTicketActivity: "删除活动",
  getTicketActivities: "获取活动列表（公开）",
  getAdminTicketActivity: "获取单个活动管理详情",
  getAdminTicketActivityStats: "获取活动统计数据",
  createAdminTicketActivity: "创建票务活动",
  setAdminTicketActivityStatus: "设置活动状态（上/下线）",
  updateAdminTicketSession: "更新活动场次",
  createAdminTicketSession: "创建活动场次",
  deleteAdminTicketSession: "删除活动场次",
  exportAdminTicketActivity: "导出活动数据",
  useTicket: "核销票据",
  getAdminTicketActivityReviews: "获取活动审核列表",
  reviewTicket: "审核单张票据",
  batchReviewTicket: "批量审核票据",
  updateAdminTicketActivity: "更新票务活动",
  verifyTicket: "验票查询（校验票码）"
};

// ---- 入口（index）对外导出的 Vue 运行时 API / 组合式函数 语义描述 ----
const entryDesc = {
  createVNode: "创建虚拟节点（h）",
  createElementVNode: "创建元素虚拟节点",
  createElementBlock: "在 openBlock 内创建元素块（带补丁标志，用于 v-if/v-for 等）",
  renderList: "v-for 列表渲染",
  createTextVNode: "创建文本虚拟节点",
  useToast: "轻提示（Toast）组合式函数",
  useRouter: "获取路由实例（跳转/取参）",
  createCommentVNode: "创建注释虚拟节点（条件占位）",
  openBlock: "开启渲染块（配合 createElementBlock）",
  normalizeClass: "类名绑定归一化（:class）",
  onMounted: "组件挂载后生命周期钩子",
  ref: "创建响应式引用",
  toDisplayString: "值转显示字符串（文本插值 {{ }}）",
  useUserStore: "用户状态仓库（登录态/权限）",
  vModelText: "v-model 文本双向绑定指令",
  Fragment: "Vue 片段容器（多根节点）",
  nextTick: "下次 DOM 更新循环后执行回调",
  withScopeId: "组件 scoped 样式作用域标记"
};

// ---- 已知布局/通用组件 中文描述（finalize2 已还原 X as P -> 文件名组件） ----
const componentDesc = {
  PageHeader: "页面公共头部组件",
  PageFooter: "页面公共底部组件",
  PageBreadcrumb: "面包屑导航组件",
  rating: "评分控件组件（星级/评分）"
};

function baseOf(f) { return f.replace(/-restored\.js$/, ".js"); }
function chunkName(f) {
  const n = f.replace(/-restored\.js$/, "");
  const parts = n.split("-");
  if (parts.length > 1 && /^[A-Za-z0-9_]{5,}$/.test(parts[parts.length - 1])) parts.pop();
  return parts.join("-");
}

// 收集一个函数体内所有被调用的标识符名（需传入该函数的 path 以供给 scope/parentPath）
function collectCalls(node, scope, path) {
  const calls = new Set();
  babel.traverse(node, {
    CallExpression(p) {
      const c = p.node.callee;
      let n = null;
      if (c.type === "Identifier") n = c.name;
      else if (c.type === "MemberExpression" && c.property.type === "Identifier") n = c.property.name;
      if (n) calls.add(n);
    }
  }, scope, undefined, path);
  return calls;
}

// 依据函数体生成详细注释
function describeFn(node, name, scope, path) {
  const calls = collectCalls(node, scope, path);
  const apis = [...calls].filter((c) => has(apiDesc, c));
  const apiText = apis.length ? "调用接口：" + apis.map((a) => apiDesc[a]).join("、") : "";
  if (calls.has("onMounted")) return "组件挂载后生命周期钩子" + (apiText ? "；" + apiText : "");
  if (calls.has("openBlock") || calls.has("createElementBlock"))
    return "渲染函数：构建组件模板 DOM 结构" + (apiText ? "（含：" + apis.map((a) => apiDesc[a]).join("、") + "）" : "");
  if (apiText) return apiText + "（异步请求）";
  if (/format|date|time|Date|moment/i.test(name || "")) return "格式化函数（日期/时间）";
  if (/^(on|handle|click|submit|change|input)/i.test(name || "")) return "事件处理函数：" + (name || "交互回调");
  return "内部工具函数" + (apiText ? "；" + apiText : "");
}

function stripGeneric(code) {
  // 删除上一阶段（annotate/finalize）留下的泛化结构注释，以及本脚本自己上一轮写入的注释，保证幂等
  return code.replace(/\/\*\s*(导入依赖[^]*?模块|模块|函数定义:[^]*?|函数 \/ 方法定义:[^]*?|默认导出|命名导出|Detect:[^]*?|导入：|导出：|默认导出：|模板属性配置：|调用接口：|渲染函数：|组件挂载后|内部工具函数|格式化函数|事件处理函数)[^*]*?\*\/\s*\n?/g, "");
}

let fail = 0, commented = 0;
const files = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

for (const f of files) {
  const srcPath = path.join(SRC, f);
  let code = fs.readFileSync(srcPath, "utf8");
  const outPath = path.join(FINAL, f);
  const base = baseOf(f);
  const route = routeByChunk[base];
  const cname = chunkName(f);
  const isEntry = base === "index-DJrtCu9i.js";
  const isTicket = base === "ticket-SMxxVFG1.js";

  // 模块头
  let header;
  if (isEntry) {
    header =
      "/*!\n" +
      " * 应用入口模块（index-DJrtCu9i.js）\n" +
      " * 角色：Vue 3 运行时 + 应用启动 + 全局状态仓库（useUserStore）+ 路由/Toast 组合式函数\n" +
      " *       + 编译后 SFC 渲染辅助（createElementBlock 等）+ 通用工具\n" +
      " * 说明：本文件主要为框架级运行时（第三方打包产物），按已还原的语义名对其导出 API 作注释。\n" +
      " * 来源：assets/index-DJrtCu9i.js    站点：https://xmyzstudent.com/    日期：2026-07-21\n" +
      " */\n";
  } else if (isTicket) {
    header =
      "/*!\n" +
      " * 票务后端接口封装模块（ticket-SMxxVFG1.js）\n" +
      " * 角色：基于 axios 的票务 API 集合——活动查询/抢票/核销/验票/管理审核等 21 个接口\n" +
      " * 使用：页面组件 import 对应语义函数（如 verifyTicket / useTicket / grabTicket）后调用\n" +
      " * 来源：assets/ticket-SMxxVFG1.js    站点：https://xmyzstudent.com/    日期：2026-07-21\n" +
      " */\n";
  } else if (route) {
    header =
      "/*!\n" +
      " * 页面模块：" + route.title + "（" + cname + "）\n" +
      " * 路由：" + route.path + "   name=" + route.name +
      "   层级=" + route.level + "   需登录=" + (route.requiresAuth ? "是" : "否") + "\n" +
      " * 功能：" + (route.requiresAuth ? "登录后" : "公开") + "的「" + route.title +
      "」页面，承载该业务模块的视图与交互逻辑。\n" +
      " * 来源：assets/" + base + "    站点：https://xmyzstudent.com/    日期：2026-07-21\n" +
      " */\n";
  } else if (componentDesc[cname]) {
    header =
      "/*!\n" +
      " * 通用组件：" + cname + "\n" +
      " * 角色：" + componentDesc[cname] + "，被多个页面复用（通过 X as P 导出）。\n" +
      " * 来源：assets/" + base + "    站点：https://xmyzstudent.com/    日期：2026-07-21\n" +
      " */\n";
  } else {
    header =
      "/*!\n" +
      " * 模块：" + cname + "（" + base + "）\n" +
      " * 角色：站点内的" + (f.includes("Page") ? "页面" : "功能") + "模块，参与前端业务组装。\n" +
      " * 来源：assets/" + base + "    站点：https://xmyzstudent.com/    日期：2026-07-21\n" +
      " */\n";
  }

  const clean = stripGeneric(code);

  let outCode = null;
  try {
    const res = babel.transformSync(clean, {
      sourceType: "module",
      compact: false,
      comments: true,
      plugins: [() => ({
        visitor: {
          Program(p) {
            // 1) import 注释：按来源模块分组说明
            p.get("body").forEach((stmt) => {
              if (!stmt.isImportDeclaration()) return;
              const src = stmt.node.source.value.replace(/^\.\//, "");
              let desc;
              if (src === "index-DJrtCu9i.js")
                desc = "导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等";
              else if (src === "ticket-SMxxVFG1.js")
                desc = "导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API";
              else {
                const cn = chunkName(src.replace(/\.js$/, ""));
                if (has(componentDesc, cn)) desc = "导入：通用组件 —— " + componentDesc[cn];
                else desc = "导入：本地模块 " + cn + "（站点内功能模块）";
              }
              stmt.node.leadingComments = stmt.node.leadingComments || [];
              stmt.node.leadingComments.push({ type: "CommentBlock", value: " " + desc + " " });
            });

            // 2) export 注释
            p.get("body").forEach((stmt) => {
              if (!stmt.isExportNamedDeclaration()) return;
              const specs = stmt.node.specifiers || [];
              if (specs.length) {
                const names = specs.map((s) =>
                  has(entryDesc, s.exported.name) ? s.exported.name + "（" + entryDesc[s.exported.name] + "）"
                    : has(apiDesc, s.exported.name) ? s.exported.name + "（" + apiDesc[s.exported.name] + "）"
                    : s.exported.name
                );
                stmt.node.leadingComments = stmt.node.leadingComments || [];
                stmt.node.leadingComments.push({ type: "CommentBlock", value: " 导出：" + names.join("、") + " " });
              }
            });

            // 3) 默认导出组件注释
            p.get("body").forEach((stmt) => {
              if (stmt.isExportDefaultDeclaration()) {
                const t = route ? route.title : (componentDesc[cname] ? cname : cname);
                stmt.node.leadingComments = stmt.node.leadingComments || [];
                stmt.node.leadingComments.push({ type: "CommentBlock", value: " 默认导出：" + t + " 组件（页面根组件） " });
              }
            });
          },

          // 4) 函数注释（声明 / 表达式 / 箭头）
          //    跳过作为调用参数/回调的箭头（nextTick/onMounted/forEach 等），避免噪音
          "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression"(p) {
            // 跳过作为调用/构造参数或回调的箭头（nextTick/onMounted/forEach/new MutationObserver 等），避免噪音
            if (p.parent.type === "CallExpression" || p.parent.type === "NewExpression") return;
            const node = p.node;
            let name = node.id ? node.id.name : null;
            if (!name) {
              const parent = p.parent;
              if (parent.type === "VariableDeclarator" && parent.id.type === "Identifier") name = parent.id.name;
            }
            const txt = describeFn(node, name, p.scope, p);
            node.leadingComments = node.leadingComments || [];
            // 避免重复追加
            if (!node.leadingComments.some((c) => c.value.includes("渲染函数") || c.value.includes("生命周期") || c.value.includes("调用接口")))
              node.leadingComments.push({ type: "CommentBlock", value: " " + txt + " " });
          },

          // 5) 模板属性配置对象：const X = { class: "page-container" }
          VariableDeclarator(p) {
            const node = p.node;
            if (node.id.type === "Identifier" && /^[A-Z]$/.test(node.id.name) && node.init && node.init.type === "ObjectExpression") {
              const cls = node.init.properties.find((pr) =>
                pr.type === "ObjectProperty" && pr.key.type === "Identifier" && pr.key.name === "class" &&
                pr.value.type === "StringLiteral"
              );
              if (cls) {
                const pNode = p.parent; // VariableDeclaration
                pNode.leadingComments = pNode.leadingComments || [];
                pNode.leadingComments.push({ type: "CommentBlock", value: " 模板属性配置：" + cls.value.value + " " });
              }
            }
          }
        }
      })],
    });
    outCode = res.code;
  } catch (e) {
    console.error("TRANSFORM FAIL:", f, e.message);
    fail++;
    continue;
  }

  // 校验语法
  try {
    babel.parseSync(outCode, { sourceType: "module" });
  } catch (e) {
    console.error("PARSE FAIL:", f, e.message);
    fail++;
    continue;
  }

  // 去掉旧头部（若有），写入新头部
  outCode = outCode.replace(/^\s*\/\*![\s\S]*?\*\/\s*/, "");
  fs.writeFileSync(outPath, header + outCode);
  commented++;
}

console.log("DONE. 注释写入文件数:", commented, " 失败:", fail);
