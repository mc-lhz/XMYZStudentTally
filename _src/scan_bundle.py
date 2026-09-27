"""在已下载的线上 SPA bundle 中搜索关键端点字符串。"""
import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\hecx\AppData\Local\Temp\xmyz-index.js"
src = open(path, "rb").read().decode("utf-8", "replace")
print("bundle length:", len(src))

pats = {
    "api-path": r'["\'`](/(?:api|tally)[^"\'`\s]{0,120})["\'`]',
    "ws-url": r'wss?://[^"\'`\s]{0,160}',
    "ws-ctor": r'.{80}new WebSocket\(.{160}',
    "http-uri": r'https?://[^"\'`\s]{0,160}',
}
for name, pat in pats.items():
    hits = re.findall(pat, src)
    uniq = sorted(set(hits))
    print(f"\n===== {name}: {len(uniq)} unique =====")
    for h in uniq[:120]:
        print("  ", h if isinstance(h, str) else h)
