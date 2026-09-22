#!/usr/bin/env python3
# Flask 版静态服务器 —— 与 tools/serve.js 等价复刻。
#
# 用法:
#   python tools/serve.py [端口]           默认 8080
#   DEV_AUTH=1 python tools/serve.py 8080  开启登录态注入
#   python tools/serve.py 8080 --dev-auth  同上
#
# 说明:
#   这是 SPA，前端路由(如 /rating/123)在服务端不存在对应文件，
#   所以未命中的非资源请求一律回退到 index.html，交给 vue-router 处理。
#   页面能完整渲染骨架，但业务数据请求会指向线上后端，未登录时多半失败——
#   本服务器的用途是走查结构与样式，不是复现完整业务。
#
#   DEV_AUTH 开启后，返回 index.html 时**动态**插入一段注入脚本(tools/dev-auth.js)，
#   磁盘上的 index.html 与 assets/*.js 不作任何改动。
import os
import sys

from flask import Flask, send_from_directory, Response

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)  # 项目根(index.html 所在目录)
DEV_AUTH_FILE = os.path.join(HERE, "dev-auth.js")
DEV_AUTH_URL = "/__dev-auth.js"

DEV_AUTH = os.environ.get("DEV_AUTH") == "1" or "--dev-auth" in sys.argv

_port_arg = None
for a in sys.argv[1:]:
    if a.isdigit():
        _port_arg = int(a)
        break
PORT = int(_port_arg or os.environ.get("PORT") or 8080)

MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
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
}

app = Flask(__name__, static_folder=None)


def _safe_path(subpath: str):
    """防目录穿越：解析后必须仍在 ROOT 之内。"""
    full = os.path.normpath(os.path.join(ROOT, subpath))
    if not full.startswith(ROOT):
        return None
    return full


def _inject_dev_auth(html: str) -> str:
    tag = '<script src="%s"></script>\n    ' % DEV_AUTH_URL
    if '<script type="module"' in html:
        return html.replace('<script type="module"', tag + '<script type="module"', 1)
    return html.replace("</head>", tag + "</head>", 1)


def _serve_html(subpath: str):
    full = _safe_path(subpath)
    if full is None or not os.path.isfile(full):
        return "Forbidden", 403
    with open(full, "rb") as f:
        data = f.read().decode("utf-8", "replace")
    if DEV_AUTH:
        data = _inject_dev_auth(data)
    return Response(data, mimetype="text/html; charset=utf-8")


@app.route(DEV_AUTH_URL)
def dev_auth():
    if not os.path.isfile(DEV_AUTH_FILE):
        return "Not Found", 404
    with open(DEV_AUTH_FILE, "rb") as f:
        return Response(f.read(), mimetype="text/javascript; charset=utf-8")


@app.route("/")
def root():
    return _serve_html("index.html")


@app.route("/<path:subpath>")
def catch_all(subpath: str):
    full = _safe_path(subpath)
    if full is None:
        return "Forbidden", 403
    if os.path.isdir(full):
        full = os.path.join(full, "index.html")
    if os.path.isfile(full):
        ext = os.path.splitext(full)[1].lower()
        if ext == ".html":
            return _serve_html(subpath)
        return send_from_directory(ROOT, subpath, mimetype=MIME.get(ext))
    # 带扩展名却找不到 = 真缺资源，不该回退成 HTML(否则 MIME 错更难查)
    if os.path.splitext(subpath)[1]:
        return "Not Found: " + subpath, 404
    # SPA 路由回退
    return _serve_html("index.html")


@app.after_request
def _no_cache(resp):
    resp.headers["Cache-Control"] = "no-store"
    return resp


if __name__ == "__main__":
    print(f"站点已启动: http://localhost:{PORT}")
    print(f"根目录: {ROOT}")
    if DEV_AUTH:
        print("登录态注入: 已开启(运行时注入，未改动磁盘文件)")
        print("  关闭注入: 浏览器控制台执行 __devAuth.off()  或访问 ?devauth=0")
        print("  关闭接口 mock: __devAuth.mock(false)  或访问 ?mock=0")
    else:
        print("登录态注入: 未开启(管理员页会被路由守卫拦截)")
        print(f"  开启方式: DEV_AUTH=1 python tools/serve.py {PORT}")
    print("按 Ctrl+C 停止")
    app.run(host="0.0.0.0", port=PORT, debug=False)
