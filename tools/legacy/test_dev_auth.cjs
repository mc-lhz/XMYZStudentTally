// 一次性验证：在无浏览器环境下模拟执行 tools/dev-auth.js，
// 然后套用站点真实的 isLoggedIn / canManageXxx 判定逻辑，确认注入确实能通过路由守卫。
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const script = fs.readFileSync(path.join(__dirname, "dev-auth.js"), "utf8");

// ---- 最小浏览器环境 ----
function makeStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    _dump: () => Object.fromEntries(m),
  };
}

const localStorage = makeStorage();
const listeners = {};
const win = {
  localStorage,
  sessionStorage: makeStorage(),
  location: { search: "", href: "http://localhost:8080/", reload() {} },
  addEventListener: (t, fn, opt) => {
    (listeners[t] = listeners[t] || []).push({ fn, opt });
  },
  URL,
  URLSearchParams,
  Promise,
  console,
  setTimeout,
  XMLHttpRequest: function () {},
  fetch: function () {},
  Response: function () {},
  Event: function (t) {
    this.type = t;
  },
  document: { readyState: "loading" },
};
win.window = win;
win.XMLHttpRequest.prototype = { open() {}, send() {} };

vm.createContext(win);
vm.runInContext(script, win);

// ---- 断言 ----
let pass = 0;
let fail = 0;
function check(name, cond, detail) {
  if (cond) {
    pass++;
    console.log("  PASS  " + name);
  } else {
    fail++;
    console.log("  FAIL  " + name + (detail ? "  -> " + detail : ""));
  }
}

console.log("=== 注入后 localStorage ===");
const dump = localStorage._dump();
for (const [k, v] of Object.entries(dump)) {
  console.log("  " + k + " = " + (v.length > 90 ? v.slice(0, 90) + "…" : v));
}

console.log("\n=== 套用站点真实判定逻辑 ===");

// isLoggedIn(index-DJrtCu9i.js:7662):
//   !token || !expiresAt ? false : Date.now() < expiresAt
const token = localStorage.getItem("token");
const expiresAt = Number(localStorage.getItem("expiresAt"));
const isLoggedIn = !token || !expiresAt ? false : Date.now() < expiresAt;
check("isLoggedIn === true (路由守卫放行)", isLoggedIn === true);

// restoreSession(7676) 要求 token && user && expiresAt 三者齐备才恢复会话
const userRaw = localStorage.getItem("user");
check("restoreSession 三要素齐备 (token/user/expiresAt)", !!(token && userRaw && expiresAt));

let userOk = false;
try {
  const u = JSON.parse(userRaw);
  userOk = u && typeof u === "object" && "id" in u;
} catch (e) {}
check("user 为合法 JSON 对象", userOk);

// permissions 存在则不会触发远程拉取(7684)，避免线上 401 把权限清空
const permRaw = localStorage.getItem("permissions");
let perms = [];
try {
  perms = JSON.parse(permRaw);
} catch (e) {}
check("permissions 为数组且非空(跳过远程拉取)", Array.isArray(perms) && perms.length > 0);

// canManageXxx(7666-7675) = permissions.includes("xxx.manage")
const REQUIRED = [
  "ticket.manage",
  "campaign.manage",
  "rating.manage",
  "message.manage",
  "user.manage",
  "banner.manage",
  "museum.manage",
  "debate.manage",
  "tally.manage",
  "voices.manage",
];
const missing = REQUIRED.filter((p) => !perms.includes(p));
check("全部 10 项 canManageXxx 为真", missing.length === 0, "缺少: " + missing.join(", "));

// 401 拦截器必须已注册监听
check(
  "已注册 auth:token-expired 拦截(阻止过期弹窗)",
  Array.isArray(listeners["auth:token-expired"]) &&
    listeners["auth:token-expired"].length > 0
);

// 控制台开关
check("暴露 __devAuth.off / mock 开关", typeof win.__devAuth?.off === "function" && typeof win.__devAuth?.mock === "function");

console.log("\n=== 结果: " + pass + " 通过, " + fail + " 失败 ===");
process.exit(fail === 0 ? 0 : 1);
