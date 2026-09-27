"""抓取入口 bundle，提取 chunk 文件名与样式文件，并写入清单。"""
import json
import os
import re
import urllib.request

SITE = "https://xmyzstudent.com"
OUT = os.path.dirname(os.path.abspath(__file__))
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}


def get(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=60).read()


entry = "index-D2vbWxba.js"
src = open(os.path.join(OUT, "live", entry), "rb").read().decode("utf-8", "replace")

# 1) 路由懒加载的 chunk 名
chunks = sorted(set(re.findall(r'import\("\./([A-Za-z0-9_\-\.]+\.js)"\)', src)))
print("chunk count:", len(chunks))

# 2) 入口引用的 css
css = sorted(set(re.findall(r'["\'](/assets/[A-Za-z0-9_\-\.]+\.css)["\']', src)))
print("css:", css)

manifest = {"entry": entry, "chunks": chunks, "css": css}
with open(os.path.join(OUT, "chunk_manifest.json"), "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=2)
print(json.dumps(manifest, ensure_ascii=False, indent=2)[:2000])

os.makedirs(os.path.join(OUT, "live"), exist_ok=True)
ok, fail = 0, []
for name in chunks:
    dest = os.path.join(OUT, "live", name)
    if os.path.exists(dest):
        ok += 1
        continue
    try:
        data = get(f"{SITE}/assets/{name}")
        open(dest, "wb").write(data)
        ok += 1
    except Exception as exc:  # noqa: BLE001
        fail.append((name, str(exc)))
print("downloaded:", ok, "failed:", len(fail))
for name, err in fail:
    print("  FAIL", name, err)
