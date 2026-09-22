/* eslint-disable */
/**
 * 本地走查用的登录态注入脚本 —— 不修改 assets/ 下任何原始 JS。
 *
 * 站点原本的拦截逻辑(index-DJrtCu9i.js:11063)：
 *   router.beforeEach(to => to.meta.requiresAuth && !store.isLoggedIn ? (弹登录框, false) : true)
 * 而 isLoggedIn 的判定(7662)是：
 *   !!token && !!expiresAt && Date.now() < expiresAt
 * 会话由 restoreSession(7676) 从 localStorage 恢复：token / user / expiresAt / campusInfo / permissions
 * 若 permissions 已存在则不会再远程拉取 —— 所以本地写齐这几项即可让 49 条 admin 路由放行。
 *
 * 本脚本做四件事：
 *   1. 在主 bundle 执行前写入一份本地会话，使 isLoggedIn 为真、各 canManageXxx 为真；
 *   2. 拦截 auth:token-expired 事件(7507 由 401 派发)，避免真实接口 401 后弹出"登录已过期"遮挡走查；
 *   3. 可选拦截 api.xmyzstudent.com 的 XHR/fetch，返回统一的空成功响应，让页面渲染出骨架而不是满屏网络错误；
 *   4. 给 mock 响应加"缺失字段兜底"代理——页面取到不存在的字段时返回空数组哨兵而不是 undefined，
 *      避免因 mock 字段名对不上真实接口而在渲染期抛异常白屏。真实后端数据不受影响。
 *
 * 使用方式二选一：
 *   A. 服务器注入(推荐)  DEV_AUTH=1 node tools/serve.js 8080
 *   B. 浏览器控制台粘贴本文件内容，回车后会自动刷新生效
 *
 * 运行时开关(控制台)：
 *   __devAuth.status()   查看当前状态
 *   __devAuth.off()      清除注入的会话并刷新，恢复未登录
 *   __devAuth.mock(false) 关闭接口 mock 并刷新(改为打真实线上后端)
 *
 * URL 参数：?devauth=0 本次不注入   ?mock=0 本次不 mock 接口
 */
(function () {
  "use strict";

  if (window.__devAuth && window.__devAuth.__installed) return;

  var KEYS = {
    token: "token",
    user: "user",
    expiresAt: "expiresAt",
    campusInfo: "campusInfo",
    permissions: "permissions",
  };
  var FLAG = "__devAuthEnabled";
  var MOCK_FLAG = "__devAuthMock";
  var API_HOST = "api.xmyzstudent.com";

  // 与 store 中 canManageXxx 的判定一一对应(7666-7675)
  var PERMISSIONS = [
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

  var FAKE_USER = {
    id: 100000,
    username: "devadmin",
    nickname: "mc_lhz",
    studentId: "20260000",
    grade: "高零",
    className: "22班",
    role: "admin",
    signature: "Mirrored by Github mc-lhz",
  };

  // 消息中心(MessagesPage, route /messages)示例数据。
  // 接口期望分页结构 { data: { records: [...], total } }，每条消息字段：
  //   id, type(ticket|rating|contribution|system), title, content,
  //   createdAt(可被 new Date() 解析), isRead, originalComment?(引用原文)
  // 仅用于本地走查展示，真实后端数据不受影响。
  function isoDaysAgo(days, h, m) {
    var d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  }
  var SAMPLE_MESSAGES = [
    {
      id: 1,
      type: "system",
      title: "欢迎使用校园助手",
      content: "你的账号已开通管理权限，可在此查看系统通知与待办。",
      createdAt: isoDaysAgo(0, 9, 12),
      isRead: false,
    },
    {
      id: 2,
      type: "ticket",
      title: "抢票即将开始",
      content: "你预约的「迎新晚会」门票将于今晚 20:00 开抢，请提前准备。",
      createdAt: isoDaysAgo(0, 8, 30),
      isRead: false,
      originalComment: "迎新晚会 · 8 区 12 排",
    },
    {
      id: 3,
      type: "rating",
      title: "社区收到新评分",
      content: "「图书馆自习环境」收到一条新评分：4.5 分，来自同学投稿。",
      createdAt: isoDaysAgo(1, 21, 5),
      isRead: true,
    },
    {
      id: 4,
      type: "contribution",
      title: "反馈已处理",
      content: "你提交的「食堂午间排队较长」反馈已被采纳，感谢参与。",
      createdAt: isoDaysAgo(2, 14, 40),
      isRead: true,
    },
    {
      id: 5,
      type: "system",
      title: "账号安全提醒",
      content: "检测到你的账号在新设备登录，如非本人操作请及时修改密码。",
      createdAt: isoDaysAgo(3, 11, 3),
      isRead: false,
    },
  ];

  var qs = new URLSearchParams(location.search);

  // ---------- 开关判定 ----------
  if (qs.get("devauth") === "0") {
    localStorage.setItem(FLAG, "0");
  } else if (qs.get("devauth") === "1") {
    localStorage.setItem(FLAG, "1");
  }
  if (qs.get("mock") === "0") localStorage.setItem(MOCK_FLAG, "0");
  if (qs.get("mock") === "1") localStorage.setItem(MOCK_FLAG, "1");

  var enabled = localStorage.getItem(FLAG) !== "0";
  var mockEnabled = localStorage.getItem(MOCK_FLAG) !== "0";

  // ---------- 1. 写入本地会话 ----------
  function writeSession() {
    // 有效期给 7 天，避免走查期间过期
    var expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(KEYS.token, "dev-local-token");
    localStorage.setItem(KEYS.user, JSON.stringify(FAKE_USER));
    localStorage.setItem(KEYS.expiresAt, String(expiresAt));
    localStorage.setItem(KEYS.permissions, JSON.stringify(PERMISSIONS));
    localStorage.setItem(FLAG, "1");
  }

  function clearSession() {
    Object.keys(KEYS).forEach(function (k) {
      localStorage.removeItem(KEYS[k]);
    });
    localStorage.removeItem("vx-identity");
    localStorage.setItem(FLAG, "0");
  }

  // ---------- 2. 屏蔽 401 引发的"登录已过期"弹窗 ----------
  // 主 bundle 在 App onMounted 时才注册该监听(8701)，本脚本先于 bundle 执行，
  // 因此我们的监听器注册更早、先被调用，stopImmediatePropagation 可阻断后续监听。
  function blockTokenExpired() {
    window.addEventListener(
      "auth:token-expired",
      function (e) {
        e.stopImmediatePropagation();
        console.debug("[dev-auth] 已拦截 auth:token-expired(接口 401)，不弹登录框");
      },
      true
    );
  }

  // ---------- 3. 接口 mock ----------
  function shouldMock(url) {
    if (!mockEnabled || !url) return false;
    try {
      var u = new URL(url, location.href);
      return u.hostname === API_HOST;
    } catch (err) {
      return false;
    }
  }

  // 统一空响应。data 用**空数组**而不是对象：
  //   - 有些接口的 data 本身就是列表，页面直接 data.filter(...) / v-for="x in data"；
  //   - 有些接口的 data 是分页对象，页面取 data.list / data.total。
  // 空数组配合下面的"缺失字段兜底"哨兵，两种形状都能走通：
  // data.filter 用真实数组方法，data.list / data.total 落到哨兵（空数组 / 空串）。
  // 若给成对象，前一种页面会把 total、page 这些数字当成列表项遍历，取 item.name 就崩了。
  function emptyPayload(url) {
    var lower = String(url || "").toLowerCase();

    if (lower.indexOf("permission") !== -1) {
      return { code: 200, message: "ok (dev mock)", __devAuthMockPayload: 1, data: PERMISSIONS };
    }
    if (/\/(me|profile|userinfo|current)\b/.test(lower)) {
      return { code: 200, message: "ok (dev mock)", __devAuthMockPayload: 1, data: FAKE_USER };
    }
    // 消息中心：分页结构 { records, total } + 各分类未读数
    if (/\/messages\/unread-count/.test(lower)) {
      var unread = SAMPLE_MESSAGES.filter(function (m) { return !m.isRead; });
      var counts = {
        total: unread.length,
        ticket: unread.filter(function (m) { return m.type === "ticket"; }).length,
        rating: unread.filter(function (m) { return m.type === "rating"; }).length,
        contribution: unread.filter(function (m) { return m.type === "contribution"; }).length,
        system: unread.filter(function (m) { return m.type === "system"; }).length,
      };
      return { code: 200, message: "ok (dev mock)", __devAuthMockPayload: 1, data: counts };
    }
    if (/\/messages\b/.test(lower)) {
      return {
        code: 200,
        message: "ok (dev mock)",
        __devAuthMockPayload: 1,
        data: { records: SAMPLE_MESSAGES, total: SAMPLE_MESSAGES.length },
      };
    }
    return {
      code: 200,
      message: "ok (dev mock)",
      __devAuthMockPayload: 1,
      data: [],
    };
  }

  // ---------- 3.5 缺失字段兜底 ----------
  // mock 无法预知每个接口的真实字段名：页面常直接取 data.dailyStats.length、
  // data.filter(...)、item.breadcrumb 之类。字段一缺就抛异常，整页白屏。
  // 这里给"本脚本 mock 出来的响应"套一层代理：访问不存在的字段时返回一个哨兵，
  // 它既能当空数组（.length / for..of / .forEach），也能被当方法调用（.filter(fn) → []）。
  // 只作用于带 MOCK_MARK 标记的 mock 响应，真实后端返回的数据原样透传、不受影响。
  var MOCK_MARK = "__devAuthMockPayload";
  var EMPTY = Object.freeze([]);
  var SKIP = {
    then: 1, toJSON: 1, constructor: 1, nodeType: 1, tagName: 1,
    __v_skip: 1, __v_isRef: 1, __v_raw: 1, __v_isReactive: 1, __v_isReadonly: 1,
  };
  var SENTINEL = (function () {
    var base = function () {
      return EMPTY;
    };
    var p = new Proxy(base, {
      get: function (t, k) {
        // 关键：缺失字段被强制为字符串/数字时（如 `val > 0`、`String(val)`、
        // 模板 `{{ val }}`），返回原始值而不是代理自身，否则抛
        // "Cannot convert object to primitive value"。
        if (k === Symbol.toPrimitive) return function (hint) {
          return hint === "number" ? 0 : "";
        };
        if (typeof k === "symbol") {
          return k === Symbol.iterator ? EMPTY[Symbol.iterator].bind(EMPTY) : undefined;
        }
        if (SKIP[k]) return undefined;
        if (k === "length") return 0;
        if (k === "toString" || k === "valueOf") return function () { return ""; };
        return p;
      },
      apply: function () {
        return EMPTY;
      },
    });
    return p;
  })();

  function permissive(value, cache) {
    if (value === null || typeof value !== "object") return value;
    cache = cache || new WeakMap();
    if (cache.has(value)) return cache.get(value);
    var proxy = new Proxy(value, {
      get: function (t, k, r) {
        // 同 SENTINEL：整对象被强转时返回原始值，避免 "Cannot convert object to primitive value"
        if (k === Symbol.toPrimitive) return function (hint) {
          return hint === "number" ? 0 : "";
        };
        if (typeof k === "symbol" || SKIP[k]) return Reflect.get(t, k, r);
        if (k in t) {
          var out = Reflect.get(t, k, r);
          return typeof out === "function" ? out.bind(t) : permissive(out, cache);
        }
        return SENTINEL;
      },
    });
    cache.set(value, proxy);
    return proxy;
  }

  function patchJSONParse() {
    var orig = JSON.parse;
    if (orig.__devAuthPatched) return;
    var patched = function (text, reviver) {
      var out = orig.call(JSON, text, reviver);
      if (out && typeof out === "object" && out[MOCK_MARK]) return permissive(out);
      return out;
    };
    patched.__devAuthPatched = true;
    JSON.parse = patched;
  }

  function define(obj, prop, value) {
    try {
      Object.defineProperty(obj, prop, {
        configurable: true,
        get: function () {
          return value;
        },
      });
    } catch (err) {
      /* 某些属性不可覆盖时忽略 */
    }
  }

  function patchXHR() {
    var OrigOpen = XMLHttpRequest.prototype.open;
    var OrigSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
      this.__devAuthUrl = url;
      return OrigOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
      var self = this;
      if (!shouldMock(self.__devAuthUrl)) return OrigSend.apply(self, arguments);

      setTimeout(function () {
        var text = JSON.stringify(emptyPayload(self.__devAuthUrl));
        define(self, "readyState", 4);
        define(self, "status", 200);
        define(self, "statusText", "OK");
        define(self, "responseURL", String(self.__devAuthUrl));
        define(self, "responseText", text);
        define(
          self,
          "response",
          self.responseType === "json" ? JSON.parse(text) : text
        );
        self.getAllResponseHeaders = function () {
          return "content-type: application/json\r\n";
        };
        self.getResponseHeader = function (name) {
          return /content-type/i.test(name) ? "application/json" : null;
        };

        // axios 各版本分别依赖 onreadystatechange / onload / onloadend / 事件监听
        if (typeof self.onreadystatechange === "function") self.onreadystatechange();
        try {
          self.dispatchEvent(new Event("readystatechange"));
          self.dispatchEvent(new Event("load"));
          self.dispatchEvent(new Event("loadend"));
        } catch (err) {
          /* 忽略 */
        }
        if (typeof self.onload === "function") self.onload();
        if (typeof self.onloadend === "function") self.onloadend();
      }, 15);
    };
  }

  function patchFetch() {
    if (typeof window.fetch !== "function") return;
    var origFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : input && input.url;
      if (!shouldMock(url)) return origFetch(input, init);
      var body = JSON.stringify(emptyPayload(url));
      var resp = new Response(body, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      // Response.json() 走的是浏览器内部解析，不经过我们打过补丁的 JSON.parse，
      // 所以这里单独补上同样的兜底。
      var origJson = resp.json.bind(resp);
      resp.json = function () {
        return origJson().then(function (o) {
          return o && typeof o === "object" && o[MOCK_MARK] ? permissive(o) : o;
        });
      };
      return Promise.resolve(resp);
    };
  }

  // ---------- 安装 ----------
  if (enabled) {
    writeSession();
    blockTokenExpired();
    if (mockEnabled) {
      patchJSONParse();
      patchXHR();
      patchFetch();
    }
  }

  window.__devAuth = {
    __installed: true,
    enabled: enabled,
    mockEnabled: mockEnabled,
    permissions: PERMISSIONS,
    user: FAKE_USER,
    status: function () {
      console.log("[dev-auth] 会话注入:", enabled ? "开启" : "关闭");
      console.log("[dev-auth] 接口 mock:", mockEnabled ? "开启(返回空成功)" : "关闭(打线上后端)");
      console.log("[dev-auth] token:", localStorage.getItem(KEYS.token));
      console.log("[dev-auth] permissions:", localStorage.getItem(KEYS.permissions));
      return { enabled: enabled, mockEnabled: mockEnabled };
    },
    on: function () {
      writeSession();
      location.reload();
    },
    off: function () {
      clearSession();
      location.reload();
    },
    mock: function (flag) {
      localStorage.setItem(MOCK_FLAG, flag === false ? "0" : "1");
      location.reload();
    },
  };

  if (enabled) {
    console.log(
      "%c[dev-auth]%c 已注入本地登录态（仅本地走查，非真实账号）。" +
        (mockEnabled ? "接口 mock 已开启。" : "接口 mock 已关闭。") +
        " 输入 __devAuth.off() 可恢复未登录。",
      "color:#fff;background:#2563eb;padding:2px 6px;border-radius:3px",
      ""
    );
  }

  // 控制台粘贴场景：此时主 bundle 早已执行完，需要刷新才能让 Pinia 读到新会话
  if (enabled && document.readyState === "complete" && !window.__devAuthBootstrapped) {
    console.log("[dev-auth] 检测到页面已加载完成，1 秒后自动刷新以应用登录态…");
    setTimeout(function () {
      location.reload();
    }, 1000);
  }
  window.__devAuthBootstrapped = true;
})();
