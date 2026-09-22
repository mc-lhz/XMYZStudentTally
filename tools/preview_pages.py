"""
本地预览 GitHub Pages 构建产物（dist-pages/）。

dist-pages 是【子路径构建】：所有资源 URL 与 <base href> 都带 /XMYZStudent/。
因此必须把它挂在 /XMYZStudent/ 前缀下服务，否则浏览器会去根路径找
/XMYZStudent/assets/... 而 404（表现为"网络抓不到脚本"）。

用法:
  python tools/preview_pages.py [端口]        # 默认 4173
  PORT=8080 python tools/preview_pages.py

然后浏览器打开 http://localhost:<端口>/XMYZStudent/
（访问根 / 会自动 302 跳转到 /XMYZStudent/）

等价于 GitHub Pages 的访问方式，用于推送前在本地验证构建产物。
"""
import http.server
import socketserver
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist-pages")
PREFIX = "/XMYZStudent"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", "4173"))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def translate_path(self, path):
        # 把 /XMYZStudent/foo 映射到 dist-pages/foo
        if path.startswith(PREFIX):
            path = path[len(PREFIX):]
        return super().translate_path(path)

    def do_GET(self):
        # 根路径重定向到 /XMYZStudent/
        if self.path == "/" or self.path == "":
            self.send_response(302)
            self.send_header("Location", PREFIX + "/")
            self.end_headers()
            return
        # SPA 深链回退：/XMYZStudent/xxx 找不到真实文件时返回 index.html
        fs_path = self.translate_path(self.path)
        if not os.path.isfile(fs_path) and not self.path.endswith("/"):
            # 可能是目录，尝试加 /index.html
            if os.path.isfile(os.path.join(fs_path, "index.html")):
                self.path = self.path.rstrip("/") + "/"
                return super().do_GET()
            self.path = PREFIX + "/"
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    if not os.path.isdir(ROOT):
        sys.stderr.write("未找到 dist-pages/，请先运行: node tools/build_pages.cjs\n")
        sys.exit(1)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"预览站: http://localhost:{PORT}{PREFIX}/  (Ctrl+C 退出)")
        httpd.serve_forever()
