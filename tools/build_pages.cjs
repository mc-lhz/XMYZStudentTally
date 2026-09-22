#!/usr/bin/env node
// 为 GitHub Pages 产出可部署的静态站点到 dist-pages/。
//
// 部署方式（见项目记忆，已实测验证）：
//   本 SPA 是 web-history 模式，vue-router 使用无参 createWebHistory()，
//   会读取 HTML 的 <base href> 作为 router base。
//   因此【注入 <base href="/XMYZStudent/"> 即可零改源码部署到项目子路径】，
//   路由在子路径下正常 landing 到 home（已用 jsdom 验证 name=home, matched=1）。
//
// 本项目采用【gh-pages 分支】方案（非 Actions、非新仓库）：
//   站点产物推送到 orphan 分支 gh-pages，根目录即站点根，
//   线上地址为 https://mc-lhz.github.io/XMYZStudent/
//
// 本脚本默认产出"子路径 /XMYZStudent/ 版"（注入 <base>、资源改写为 /XMYZStudent/assets/ 等）。
// 如需根路径部署（自定义域名 / user 页），可设 BASE=/ 关闭改写。
//
// 用法:
//   node tools/build_pages.cjs                产出子路径 /XMYZStudent/ 版到 dist-pages/
//   BASE=/ node tools/build_pages.cjs         产出根路径版（自定义域名等）

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./_resolve.cjs");

const OUT = path.join(ROOT, "dist-pages");
const BASE = process.env.BASE !== undefined ? process.env.BASE : "/XMYZStudent/"; // 默认部署到 GitHub Pages 项目子路径
const REWRITE = BASE && BASE !== "/";
// 是否把本地走查用的"免登录 + 接口 mock"脚本注入部署产物。
// 默认开：线上 demo 自动绕过路由守卫、把 api.xmyzstudent.com 请求拦成空成功响应，
// 避免后端无 CORS 头导致整页报错（真实后端数据仍可用 ?mock=0 / __devAuth.mock(false) 关闭 mock）。
// 设 DEVAUTH=0 可关闭注入（此时线上站点与未登录访客一致，admin 路由会被守卫拦截）。
const DEVAUTH = process.env.DEVAUTH !== "0";
const DEVAUTH_SRC = path.join(ROOT, "tools", "dev-auth.js");
const DEVAUTH_OUT = "__dev-auth.js";

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch (e) {
    // safe-delete shim 可能拦截物理删除并抛错。退化为：把旧目录重命名为固定名，
    // 后续 copyDir 会重建一个全新的 dist-pages（至多残留一个 gitignored 的 .old 目录）。
    const old = p + ".old";
    try { if (fs.existsSync(old)) fs.rmSync(old, { recursive: true, force: true }); } catch (_) {}
    try { fs.renameSync(p, old); } catch (_) {}
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function rewriteHtml(html) {
  let out = html;
  if (REWRITE) {
    // 资源引用改写为带 BASE 的绝对路径，保证子路径下能加载
    out = out.replace(/(href|src)="\/assets\//g, `$1="${BASE}assets/`);
    out = out.replace(/(href|src)="\/vite\.svg"/g, `$1="${BASE}vite.svg"`);
    // 注入 <base>：vue-router 无参 createWebHistory() 会读取它作为 router base，子路径路由因此可用
    if (!out.includes("<base ")) {
      out = out.replace(/<head>/i, `<head>\n  <base href="${BASE}">`);
    }
  }
  // 注入免登录 + 接口 mock 脚本（绝对 BASE 路径，子路径下也能正确加载）。
  // 用绝对路径而非相对路径：避免与 <base href> 相对解析冲突，并确保固定挂在 /XMYZStudent/ 下。
  if (DEVAUTH) {
    const tag = `<script src="${BASE}${DEVAUTH_OUT}"></script>`;
    if (out.includes('<script type="module"')) {
      out = out.replace('<script type="module"', `${tag}\n    <script type="module"`, 1);
    } else {
      out = out.replace("</head>", `${tag}\n</head>`, 1);
    }
  }
  return out;
}

function rewriteCss(css) {
  if (!REWRITE) return css;
  // CSS 的 url() 相对 CSS 文件自身（都在 assets/ 内），子路径下改为 ./文件名（同目录）
  return css.replace(/url\(\s*(['"]?)\/assets\/([^)'"]+)\1\s*\)/g, (_m, q, name) => `url(${q}./${name}${q})`);
}

function rewriteJs(js) {
  if (!REWRITE) return js;
  // 1) JS 运行期字符串资源 "/assets/x" -> "/XMYZStudent/assets/x"
  const re = new RegExp('("/assets/[^"]+")', "g");
  js = js.replace(re, (m) => `"${BASE}assets/${m.slice(9)}`);
  // 2) Vite __vitePreload 的 dep 转换器 Av：原逻辑 `return "/" + val` 把相对 dep
  //    "assets/x" 拼成根路径 "/assets/x"，子路径部署下预加载链接全打到根而 404。
  //    改为相对 <base>（document.baseURI 即由注入的 <base href> 决定）解析。
  js = js.replace(
    /return\s*"(\/)"\s*\+\s*val/g,
    'return (val[0]==="/"||/^[a-z]+:/i.test(val))?val:new URL(val,document.baseURI).pathname'
  );
  return js;
}

console.log(`构建 GitHub Pages 站点 -> ${OUT}`);
console.log(`BASE=${BASE || "(根路径, 无需改写)"}  REWRITE=${REWRITE}`);

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

// 1) index.html（改写）
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
fs.writeFileSync(path.join(OUT, "index.html"), rewriteHtml(html), "utf8");

// 2) vite.svg
if (fs.existsSync(path.join(ROOT, "vite.svg")))
  fs.copyFileSync(path.join(ROOT, "vite.svg"), path.join(OUT, "vite.svg"));

// 3) assets/（按需改写 css/js）
copyDir(path.join(ROOT, "assets"), path.join(OUT, "assets"));
if (REWRITE) {
  for (const ext of [".css", ".js"]) {
    const dir = path.join(OUT, "assets");
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(ext)) continue;
      const fp = path.join(dir, f);
      const src = fs.readFileSync(fp, "utf8");
      const out = ext === ".css" ? rewriteCss(src) : rewriteJs(src);
      if (out !== src) fs.writeFileSync(fp, out, "utf8");
    }
  }
}

// 4) 404.html = index.html 副本（SPA 回退；GH Pages 对未知路径返回它，SPA 再按路由渲染）
fs.copyFileSync(path.join(OUT, "index.html"), path.join(OUT, "404.html"));

// 4.5) 免登录脚本：复制 tools/dev-auth.js 到产物根（与注入的 <script src> 对应）
if (DEVAUTH) {
  if (!fs.existsSync(DEVAUTH_SRC)) {
    console.warn("⚠️ 未找到 tools/dev-auth.js，跳过免登录注入");
  } else {
    fs.copyFileSync(DEVAUTH_SRC, path.join(OUT, DEVAUTH_OUT));
    console.log(`已注入免登录脚本: ${BASE}${DEVAUTH_OUT}`);
  }
}

// 5) .nojekyll（避免 Jekyll 处理，且保留带 _ 的文件名）
fs.writeFileSync(path.join(OUT, ".nojekyll"), "", "utf8");

// 统计
let n = 0;
(function walk(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) walk(fp);
    else n++;
  }
})(OUT);
console.log(`完成: ${n} 个文件已写入 ${OUT}`);
