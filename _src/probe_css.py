"""探测 tally 页面 chunk 对应的样式文件是否存在，并下载。"""
import os
import urllib.error
import urllib.request

SITE = "https://xmyzstudent.com/assets/"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "live")

CANDIDATES = [
    "ScreenPage-hBqdUFAz.css",
    "ScreenPage-BLh1rRtO.css",
    "TallyActivitiesPage-tccNm29V.css",
    "TallyActivityEditPage-zSPhMPUE.css",
    "TallyControlPage-Dtvs_iR1.css",
    "tally-BvCEJ8Iv.css",
    "useTallySocket-BrS_O9ye.css",
    "index-CZZQpGPl.css",
]

for name in CANDIDATES:
    url = SITE + name
    try:
        req = urllib.request.Request(url, headers=UA)
        resp = urllib.request.urlopen(req, timeout=30)
        body = resp.read()
        ctype = resp.headers.get("Content-Type", "")
        if "css" not in ctype and len(body) < 2000:
            print(f"MISS {name} ctype={ctype} len={len(body)}")
            continue
        open(os.path.join(OUT, name), "wb").write(body)
        print(f"OK   {name} ctype={ctype} len={len(body)}")
    except urllib.error.HTTPError as exc:
        print(f"MISS {name} HTTP {exc.code}")
    except Exception as exc:  # noqa: BLE001
        print(f"ERR  {name} {exc}")
