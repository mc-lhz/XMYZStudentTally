// 零依赖静态服务器 —— 在本地把还原后的站点跑起来。
// 用法: node tools/serve.js [端口]     默认 8080
//
// 说明: 这是一个 SPA，前端路由(如 /rating/123)在服务端并不存在对应文件，
//       所以未命中的非资源请求一律回退到 index.html，交给 vue-router 处理。
//       页面能完整渲染骨架，但业务数据请求会指向线上后端，未登录时多半失败——
//       本服务器的用途是走查结构与样式，不是复现完整业务。
const http = require("http");
const fs = require("fs");
const path = require("path");
const { ROOT } = require("./_resolve.cjs");

const PORT = Number(process.argv[2] || process.env.PORT || 8080);

// 走查管理员页面时需要登录态。开启后服务器会在返回 index.html 时**动态**插入
// 一段注入脚本(tools/dev-auth.js)，磁盘上的 index.html 与 assets/*.js 不作任何改动。
//   开启: DEV_AUTH=1 node tools/serve.js 8080   或   node tools/serve.js 8080 --dev-auth
const DEV_AUTH =
  process.env.DEV_AUTH === "1" || process.argv.includes("--dev-auth");
const DEV_AUTH_URL = "/__dev-auth.js";
const DEV_AUTH_FILE = path.join(__dirname, "dev-auth.js");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

function send(res, status, body, type) {
  res.writeHead(status, {
    "Content-Type": type || "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return send(res, 400, "Bad Request");
  }

  // 注入脚本本身不在 ROOT 下(它属于 tools/)，单独走一条路由
  if (DEV_AUTH && urlPath === DEV_AUTH_URL) {
    return fs.readFile(DEV_AUTH_FILE, (err, buf) =>
      err
        ? send(res, 500, String(err))
        : send(res, 200, buf, MIME[".js"])
    );
  }

  // 防目录穿越：解析后必须仍在 ROOT 之内
  const target = path.resolve(ROOT, "." + urlPath);
  if (!target.startsWith(ROOT)) return send(res, 403, "Forbidden");

  let file = target;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  if (!fs.existsSync(file)) {
    // 带扩展名却找不到 = 真的缺资源，不该回退成 HTML(否则报 MIME 错更难查)
    if (path.extname(urlPath)) return send(res, 404, "Not Found: " + urlPath);
    file = path.join(ROOT, "index.html"); // SPA 路由回退
  }

  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 500, String(err));

    if (DEV_AUTH && ext === ".html") {
      // 插到 module 脚本之前。普通 script 同步执行，而 type="module" 带 defer 语义，
      // 因此注入脚本必定先于主 bundle 运行，能在 Pinia 恢复会话前写好 localStorage。
      const tag = `<script src="${DEV_AUTH_URL}"></script>\n    `;
      let html = buf.toString("utf8");
      html = html.includes("<script type=\"module\"")
        ? html.replace("<script type=\"module\"", tag + "<script type=\"module\"")
        : html.replace("</head>", tag + "</head>");
      return send(res, 200, html, MIME[".html"]);
    }

    send(res, 200, buf, MIME[ext] || "application/octet-stream");
  });
});

server.listen(PORT, () => {
  console.log(`站点已启动: http://localhost:${PORT}`);
  console.log(`根目录: ${ROOT}`);
  if (DEV_AUTH) {
    console.log("登录态注入: 已开启(运行时注入，未改动磁盘文件)");
    console.log("  关闭注入: 浏览器控制台执行 __devAuth.off()  或访问 ?devauth=0");
    console.log("  关闭接口 mock: __devAuth.mock(false)  或访问 ?mock=0");
  } else {
    console.log("登录态注入: 未开启(管理员页会被路由守卫拦截)");
    console.log(`  开启方式: DEV_AUTH=1 node tools/serve.js ${PORT}`);
  }
  console.log("按 Ctrl+C 停止");
});
