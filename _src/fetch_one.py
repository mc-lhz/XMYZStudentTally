"""补抓指定资源（含未列在 manifest 里的辅助 chunk 与 css）。"""
import os
import sys
import urllib.request

SITE = "https://xmyzstudent.com"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "live")
os.makedirs(OUT, exist_ok=True)

for name in sys.argv[1:]:
    url = f"{SITE}/assets/{name}"
    dest = os.path.join(OUT, name)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        print("skip", name)
        continue
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=60).read()
        open(dest, "wb").write(data)
        print("ok", name, len(data))
    except Exception as exc:  # noqa: BLE001
        print("FAIL", name, exc)
