// 无头运行 SPA，捕获真实运行时错误并检查 #app 是否渲染。
//
// 前置：先打包成 IIFE（jsdom 不执行 <script type="module">）
//   node tools/headless_build.cjs
// 用法：
//   node tools/headless_check.cjs /            单个路由（也可直接传 /ticket/:id，会自动填参）
//   node tools/headless_check.cjs --full       全部 72 条路由（静态 + 动态参数 + 404 通配）★推荐
//   node tools/headless_check.cjs --all        仅 45 条静态路由
//   node tools/headless_check.cjs --dynamic    仅 27 条动态/通配路由
//   node tools/headless_check.cjs --admin      仅管理员路由
//
// 环境变量：
//   MOCK=pending|empty|deep|deeparr|devauth   接口 mock 档位（devauth 复刻 tools/dev-auth.js）
//   WAIT=2500        每条路由等待渲染的毫秒数
//   DEBUG=1          打印单条路由的详细诊断
//   JSON_OUT=path    把逐条明细写成 JSON
//
// 判定标准（三要素缺一不可）：
//   1) #app 渲染出非注释内容
//   2) 无 window error / unhandledrejection
//   3) 未被守卫重定向——落地 fullPath 必须等于请求路径。
//      只看 1) 会误判：被踢回首页时首页本身也有上万字符内容。
const fs = require("fs");
const path = require("path");
const { ROOT } = require("./_resolve.cjs");

const WS = "C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules";
let JSDOM;
try {
  ({ JSDOM } = require(path.join(WS, "jsdom")));
} catch (e) {
  console.error("jsdom 不可用，请先: cd " + path.dirname(WS) + " && npm i jsdom");
  process.exit(2);
}

const BUNDLE = path.join(ROOT, ".headless", "bundle.js");
if (!fs.existsSync(BUNDLE)) {
  console.error("缺少 .headless/bundle.js，请先运行: node tools/headless_build.cjs");
  process.exit(2);
}
const bundleCode = fs.readFileSync(BUNDLE, "utf8");

// 与 tools/dev-auth.js 保持一致：这些是主包 zz700(hasPermission) 实际校验的字符串。
// 注意是单数形式（ticket.manage 而非 tickets.manage），写错会被守卫重定向回首页。
const PERMS = [
  "ticket.manage", "campaign.manage", "rating.manage", "message.manage",
  "user.manage", "banner.manage", "museum.manage", "debate.manage",
  "tally.manage", "voices.manage",
];

// 按设计会跳走的路由——属正常业务逻辑而非缺陷，不计入失败。
const EXPECTED_REDIRECTS = {
  // OAuth 回调页：缺 code/state 查询参数时跳走。
  // QQCallbackPage: `if (!code || !state) { alert("授权参数缺失"); router.push("/") }`
  "/auth/qq/callback": "/",
  "/auth/qq/bindOrRegister": "/",
  "/user/bindqq/callback": "/profile",
  // 活动阶段守卫：mock 的 data 为空数组 → currentStage 为 undefined →
  // `currentStage?.stageType !== "submission"` 成立 → toast「当前不在投稿阶段」并跳回列表页。
  // 线上活动处于对应阶段时会正常渲染，这里跳转说明防御逻辑本身是通的。
  "/ringtone/:id/submit": "/ringtone",
  "/ringtone/:id/vote": "/ringtone",
};

function mockRecord(i) {
  return {
    id: i, name: "样例" + i, title: "样例标题" + i, label: "样例" + i,
    content: "内容" + i, description: "描述" + i, status: 1, type: "normal",
    count: 0, score: 0, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z",
    // 页面常会对这些字段直接做 toFixed/算术，且可能经对象展开丢掉代理兜底，故显式给出
    averageScore: 8, avgScore: 8, ratingCount: 3, totalCount: 3, reviewCount: 3,
    likeCount: 0, commentCount: 0, viewCount: 0, sort: i, sortOrder: i,
    // 评分模块的层级面包屑（rating-DOU6YvDA.js 会做 "ancestors" in val 判定）
    school: { id: 1, name: "厦门一中" },
    ancestors: [{ id: 1, name: "上级" + i }],
    current: { id: i, name: "当前" + i },
    majorSection: { id: 1, name: "大类" },
    minorSection: { id: 2, name: "小类" },
    category: { id: 1, name: "食堂" },
    breadcrumb: {
      school: { id: 1, name: "厦门一中" },
      ancestors: [{ id: 1, name: "上级" + i }],
      current: { id: i, name: "当前" + i },
    },
  };
}

function mockPayload() {
  // MOCK=devauth：完全复刻 tools/dev-auth.js 注入到浏览器里的那份响应
  // （空列表 + 缺失字段哨兵兜底），用来验证用户实际看到的效果。
  if (process.env.MOCK === "devauth") {
    // data 用空数组：数组场景直接可用（.filter/.map/v-for），
    // 对象场景 (.list/.total/...) 由哨兵兜底，两种形状同时兼容。
    return { code: 200, message: "ok (dev mock)", data: [] };
  }
  // MOCK=deeparr：data 直接是数组（很多列表接口是这种形状）
  if (process.env.MOCK === "deeparr") {
    return { code: 200, success: true, message: "mock", data: [1, 2, 3].map(mockRecord) };
  }
  return {
    code: 200, success: true, message: "mock",
    data: {
      list: [1, 2, 3].map(mockRecord), items: [1, 2, 3].map(mockRecord),
      records: [1, 2, 3].map(mockRecord), rows: [1, 2, 3].map(mockRecord),
      total: 3, page: 1, pageSize: 20,
    },
  };
}

// MOCK=deep 用：把响应体包成"缺失字段一律返回空数组"的宽容对象。
// 目的：页面拿到数据后走真实渲染分支（v-for / computed / 过滤器），
// 从而暴露真正的反混淆缺陷，而不是被我们 mock 的字段名不全干扰。
function makePermissive(window) {
  const EMPTY = Object.freeze([]); // 共享同一实例，避免 Vue 响应式因身份不稳定而反复重渲
  const cache = new WeakMap();
  const SKIP = new Set([
    "then", "toJSON", "constructor", "$$typeof", "nodeType", "tagName",
    "__v_skip", "__v_isRef", "__v_raw", "__v_isReactive", "__v_isReadonly",
  ]);
  // 缺失字段的哨兵：既能当空数组用（.length/.forEach/for..of），
  // 也能被当成方法调用（x.filter(fn) → []），还能安全参与字符串拼接。
  const SENTINEL = (() => {
    const base = function () { return EMPTY; };
    const p = new Proxy(base, {
      get(t, k) {
        if (typeof k === "symbol") return k === Symbol.iterator ? EMPTY[Symbol.iterator].bind(EMPTY) : undefined;
        if (SKIP.has(k)) return undefined;
        if (k === "length") return 0;
        if (k === "toString" || k === "valueOf") return () => "";
        return p;
      },
      apply() { return EMPTY; },
    });
    return p;
  })();
  function wrap(v) {
    if (v === null || typeof v !== "object") return v;
    if (cache.has(v)) return cache.get(v);
    const p = new Proxy(v, {
      get(t, k, r) {
        if (typeof k === "symbol" || SKIP.has(k)) return Reflect.get(t, k, r);
        if (k in t) {
          const out = Reflect.get(t, k, r);
          return typeof out === "function" ? out.bind(t) : wrap(out);
        }
        return SENTINEL;
      },
    });
    cache.set(v, p);
    return p;
  }
  return wrap;
}

function installMocks(window) {
  const exp = Date.now() + 7 * 24 * 3600 * 1000;
  try {
    window.localStorage.setItem("token", "dev-headless-token");
    window.localStorage.setItem("expiresAt", String(exp));
    window.localStorage.setItem("permissions", JSON.stringify(PERMS));
    window.localStorage.setItem("user", JSON.stringify({
      id: 1, username: "devadmin", nickname: "本地走查",
      realName: "本地走查", role: "admin", permissions: PERMS,
    }));
  } catch (_) {}

  if (/^(deep|devauth)/.test(process.env.MOCK || "")) {
    const wrap = makePermissive(window);
    const origParse = window.JSON.parse;
    window.JSON.parse = function (...a) { return wrap(origParse.apply(this, a)); };
  }

  function MockXHR() { this._h = {}; this.readyState = 0; this.status = 0; this.responseText = ""; this.response = ""; }
  MockXHR.prototype.open = function (m, u) { this._url = u; this.readyState = 1; };
  MockXHR.prototype.setRequestHeader = function () {};
  MockXHR.prototype.getAllResponseHeaders = function () { return "content-type: application/json\r\n"; };
  MockXHR.prototype.getResponseHeader = function () { return "application/json"; };
  MockXHR.prototype.abort = function () {};
  MockXHR.prototype.addEventListener = function (t, f) { (this._h[t] = this._h[t] || []).push(f); };
  MockXHR.prototype.removeEventListener = function () {};
  MockXHR.prototype.send = function () {
    const self = this;
    // MOCK=pending(默认): 请求永不返回 → 页面保持初始/骨架状态，
    // 只暴露真正的运行时缺陷，不受 mock 数据形状与页面期望不符的干扰。
    // MOCK=empty: 返回统一空数据结构。
    if ((process.env.MOCK || "pending") === "pending") return;
    const MODE = process.env.MOCK;
    setTimeout(() => {
      self.readyState = 4; self.status = 200;
      self.responseText = JSON.stringify(mockPayload());
      self.response = self.responseText;
      if (self.onreadystatechange) self.onreadystatechange();
      if (self.onload) self.onload();
      (self._h.load || []).forEach((f) => { try { f.call(self); } catch (_) {} });
      (self._h.loadend || []).forEach((f) => { try { f.call(self); } catch (_) {} });
    }, 0);
  };
  window.XMLHttpRequest = MockXHR;

  window.fetch = function (u) {
    return Promise.resolve({
      ok: true, status: 200,
      json: () => Promise.resolve(mockPayload()),
      text: () => Promise.resolve(JSON.stringify(mockPayload())),
      headers: { get: () => "application/json" },
    });
  };

  // jsdom 不会真正加载外部资源，<link rel=stylesheet|modulepreload> 的 load 事件
  // 永远不会触发，导致 Vite 的 __vitePreload 永久挂起 → 懒加载路由的
  // beforeRouteEnter 阶段卡死、router-view 一直渲染空注释。
  // 这里在下一 tick 手动派发 load，模拟浏览器行为。
  const origCreate = window.document.createElement.bind(window.document);
  window.document.createElement = function (tag, opts) {
    const el = origCreate(tag, opts);
    if (String(tag).toLowerCase() === "link") {
      setTimeout(() => {
        try { el.dispatchEvent(new window.Event("load")); } catch (_) {}
      }, 0);
    }
    return el;
  };

  window.matchMedia = window.matchMedia || function () {
    return { matches: false, media: "", onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } };
  };
  window.scrollTo = window.scrollTo || function () {};
  window.scrollBy = window.scrollBy || function () {};
  if (!window.IntersectionObserver) window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
  if (!window.ResizeObserver) window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  if (!window.WebSocket) {
    window.WebSocket = class {
      constructor() { this.readyState = 0; setTimeout(() => { this.readyState = 1; this.onopen && this.onopen({}); }, 0); }
      send() {} close() {} addEventListener() {} removeEventListener() {}
    };
  }
  if (!window.HTMLCanvasElement.prototype.getContext) {
    window.HTMLCanvasElement.prototype.getContext = () => null;
  }
}

async function checkRoute(route, waitMs) {
  const errors = [];
  const consoleErrors = [];

  const dom = new JSDOM(
    `<!doctype html><html><head><title>t</title></head><body><div id="app"></div></body></html>`,
    {
      url: "http://localhost:8080" + route,
      runScripts: "outside-only",
      pretendToBeVisual: true,
    }
  );
  const window = dom.window;

  window.addEventListener("error", (e) => {
    errors.push((e.error && (e.error.stack || e.error.message)) || e.message || String(e));
  });
  window.addEventListener("unhandledrejection", (e) => {
    const r = e.reason;
    errors.push("[rejection] " + ((r && (r.stack || r.message)) || String(r)));
  });
  const origErr = window.console.error;
  window.console.error = function (...args) {
    consoleErrors.push(args.map((a) => (a && a.stack) || String(a)).join(" "));
    return origErr.apply(this, args);
  };
  process.on("unhandledRejection", (r) => {
    errors.push("[node-rejection] " + ((r && (r.stack || r.message)) || String(r)));
  });

  installMocks(window);

  try {
    window.eval(bundleCode);
  } catch (e) {
    errors.push("[sync-throw] " + (e.stack || e.message));
  }

  await new Promise((r) => setTimeout(r, waitMs));

  const app = window.document.querySelector("#app");
  const html = app ? app.innerHTML.trim() : "";
  const text = app ? (app.textContent || "").replace(/\s+/g, " ").trim() : "";
  if (process.env.DEBUG) {
    console.log("---- DEBUG " + route + " ----");
    console.log("location:", window.location.pathname + window.location.search + window.location.hash);
    if (window.__initNavErr) console.log("初始导航被吞掉的错误:", window.__initNavErr);
    if (window.__navTrace) console.log("navTrace:", window.__navTrace);
    console.log("#app innerHTML:", html.slice(0, 2000));
    // 审问 Vue app / router 实际状态
    try {
      const el = window.document.querySelector("#app");
      const vapp = el && el.__vue_app__;
      console.log("vue app present:", !!vapp);
      if (vapp) {
        const gp = vapp.config.globalProperties;
        const router = gp && gp.$router;
        console.log("router present:", !!router);
        if (router) {
          const routes = router.getRoutes ? router.getRoutes() : [];
          console.log("registered routes:", routes.length);
          console.log("sample paths:", routes.slice(0, 12).map((r) => r.path).join(" | "));
          const cur = router.currentRoute && router.currentRoute.value;
          if (cur) {
            console.log("currentRoute.fullPath:", cur.fullPath);
            console.log("currentRoute.name:", String(cur.name));
            console.log("currentRoute.matched:", cur.matched.length);
          }
          try {
            const res = router.resolve(route);
            console.log("resolve(" + route + ").matched:", res.matched.length, "name:", String(res.name));
          } catch (re) {
            console.log("resolve threw:", re.message);
          }
          // 导航未完成时，主动触发并捕获真实失败原因
          if (cur && cur.matched.length === 0) {
            console.log("-- navigation diagnostic --");
            await router
              .push(route)
              .then(
                (fail) => console.log("push resolved, failure:", fail ? (fail.message || String(fail)) : "none"),
                (err) => console.log("push REJECTED:", (err && (err.stack || err.message)) || String(err))
              );
            await new Promise((r) => setTimeout(r, 1500));
            const c2 = router.currentRoute.value;
            console.log("after push -> name:", String(c2.name), "matched:", c2.matched.length);
            const el2 = window.document.querySelector("#app");
            console.log("after push #app len:", el2 ? el2.innerHTML.trim().length : -1);
          }
        }
      }
    } catch (de) {
      console.log("debug introspection failed:", de.message);
    }
    console.log("console.error entries:", consoleErrors.slice(0, 10));
    console.log("-------------------------");
  }
  // 落地路由指纹：光看"渲染了内容"会误判——被守卫重定向回首页时首页也有上万字符。
  // 必须确认最终停在请求的那条路由上。
  let landed = null, landedName = null, matchedCount = -1, redirected = false;
  try {
    const el = window.document.querySelector("#app");
    const vapp = el && el.__vue_app__;
    const router = vapp && vapp.config.globalProperties && vapp.config.globalProperties.$router;
    const cur = router && router.currentRoute && router.currentRoute.value;
    if (cur) {
      landed = cur.fullPath;
      landedName = cur.name == null ? null : String(cur.name);
      matchedCount = cur.matched ? cur.matched.length : -1;
      const norm = (s) => String(s || "").replace(/\/+$/, "") || "/";
      redirected = norm(landed) !== norm(route);
    }
  } catch (_) {}

  // 只有注释占位/空白不算真正渲染
  const meaningful = html.replace(/<!--[\s\S]*?-->/g, "").trim();
  const res = {
    route, mounted: meaningful.length > 0, htmlLen: html.length, meaningfulLen: meaningful.length,
    textPreview: text.slice(0, 120), errors, consoleErrors,
    landed, landedName, matchedCount, redirected,
  };
  try { window.close(); } catch (_) {}
  return res;
}

// 动态参数示例值：绝大多数是数值 id，个别命名参数也按数值给（后端 mock 不校验）
function fillParams(p) {
  return p
    .replace(/\/:pathMatch\(\.\*\)\*?/g, "/__not_found_probe__")
    .replace(/:([A-Za-z0-9_]+)\(([^)]*)\)\*?\??/g, "1")
    .replace(/:([A-Za-z0-9_]+)\??/g, "1");
}

function collectRoutes(kind) {
  // 从主包中提取真实路由 path
  const main = fs.readFileSync(path.join(ROOT, "assets", "index-DJrtCu9i.js"), "utf8");
  const set = new Set();
  const re = /path:\s*"(\/[^"]*)"/g;
  let m;
  while ((m = re.exec(main))) set.add(m[1]);
  let arr = [...set];
  const isDyn = (p) => p.includes(":") || p.includes("*");
  if (kind === "static") arr = arr.filter((p) => !isDyn(p));
  else if (kind === "dynamic") arr = arr.filter(isDyn);
  else if (kind === "admin") arr = arr.filter((p) => p.startsWith("/admin"));
  // full / all 保留全部
  return arr.sort().map((p) => ({ pattern: p, url: isDyn(p) ? fillParams(p) : p, dynamic: isDyn(p) }));
}

(async () => {
  const args = process.argv.slice(2);
  const waitMs = Number(process.env.WAIT || 3000);
  const PER_ROUTE_TIMEOUT = Number(process.env.ROUTE_TIMEOUT || Math.max(30000, waitMs * 6));
  const JSON_OUT = process.env.JSON_OUT || "";
  let routes;
  if (args.includes("--admin")) routes = collectRoutes("admin");
  else if (args.includes("--full")) routes = collectRoutes("full");
  else if (args.includes("--dynamic")) routes = collectRoutes("dynamic");
  else if (args.includes("--all")) routes = collectRoutes("static");
  else {
    const plain = args.filter((a) => !a.startsWith("--"));
    routes = (plain.length ? plain : ["/"]).map((p) => ({ pattern: p, url: fillParams(p), dynamic: p.includes(":") || p.includes("*") }));
  }

  if (routes.length === 0) {
    console.log("未提取到路由（主包中 path: \"...\" 未命中）");
    process.exit(2);
  }

  let fail = 0;
  const problems = [];
  const records = [];
  for (const item of routes) {
    const { pattern, url, dynamic } = item;
    let out;
    try {
      // 单条超时保护：个别页面（大屏/WebSocket 轮询/定时器）会让 jsdom 迟迟不退出，
      // 不设上限会拖死整轮扫描。
      out = await Promise.race([
        checkRoute(url, waitMs),
        new Promise((_, rej) => setTimeout(() => rej(new Error("超时 " + PER_ROUTE_TIMEOUT + "ms")), PER_ROUTE_TIMEOUT)),
      ]);
    } catch (e) {
      console.log(`### ${pattern}  LOAD-FAILED: ${e.message}`);
      fail++; problems.push(pattern + "  (加载失败: " + e.message + ")");
      records.push({ pattern, url, dynamic, status: "LOAD-FAILED", error: e.message });
      continue;
    }

    // 判定三要素：渲染出内容 / 无运行时错误 / 没被守卫重定向走
    const rendered = out.mounted;
    const clean = out.errors.length === 0;
    // 404 探针路由本就该落在通配路由上，fullPath 与请求一致即可
    const expectTo = EXPECTED_REDIRECTS[pattern];
    const norm = (s) => String(s || "").replace(/\/+$/, "") || "/";
    const expectedRedirect = expectTo != null && norm(out.landed) === norm(expectTo);
    const stayed = !out.redirected || expectedRedirect;
    const ok = rendered && clean && stayed;
    if (!ok) {
      fail++;
      const why = [];
      if (!rendered) why.push("未渲染");
      if (!clean) why.push(out.errors.length + " 个运行时错误");
      if (!stayed) why.push("被重定向到 " + out.landed);
      problems.push(pattern + "  (" + why.join(" / ") + ")");
    }
    const tag = dynamic ? " [动态]" : (expectedRedirect ? " [预期跳转→" + expectTo + "]" : "");
    const nameStr = out.landedName ? " name=" + out.landedName : "";
    console.log(
      `${ok ? "OK  " : "FAIL"}  ${pattern}${tag}` +
      (dynamic ? `  -> ${url}` : "") +
      `   (#app ${out.htmlLen} chars, matched ${out.matchedCount}${nameStr}${out.errors.length ? ", " + out.errors.length + " errors" : ""})`
    );
    if (!ok) {
      if (out.redirected) console.log(`        ↳ 落地: ${out.landed}`);
      if (out.textPreview) console.log(`        text: ${out.textPreview}`);
      out.errors.slice(0, 3).forEach((e) => console.log("        ! " + e.split("\n").slice(0, 3).join("\n          ")));
      out.consoleErrors.slice(0, 2).forEach((e) => console.log("        ~ " + e.split("\n")[0].slice(0, 220)));
    }
    records.push({
      pattern, url, dynamic, status: ok ? "OK" : "FAIL",
      htmlLen: out.htmlLen, matched: out.matchedCount, name: out.landedName,
      landed: out.landed, redirected: out.redirected,
      errors: out.errors.slice(0, 3), textPreview: out.textPreview,
    });
  }
  console.log(`\n==== ${routes.length - fail}/${routes.length} OK ====`);
  if (problems.length) console.log("有问题的路由:\n  " + problems.join("\n  "));
  if (JSON_OUT) {
    fs.writeFileSync(path.join(ROOT, JSON_OUT), JSON.stringify({ mock: process.env.MOCK || "pending", total: routes.length, ok: routes.length - fail, records }, null, 2));
    console.log("明细已写入 " + JSON_OUT);
  }
  process.exit(fail ? 1 : 0);
})();
