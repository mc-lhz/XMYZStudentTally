"""探测源站 REST 接口的公开性与响应形态（只做 GET，不写入）。"""
import json
import urllib.error
import urllib.request

BASES = ["https://api.xmyzstudent.com/api/v2", "https://xmyzstudent.com/api/v2"]
PATHS = [
    "/tally/activities",
    "/tally/activities/1",
    "/tally/screen/1",
    "/admin/tally/activities",
    "/admin/tally/activities/1",
    "/admin/tally/activities/1/records",
    "/banners?position=home",
]
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Origin": "https://xmyzstudent.com",
    "Referer": "https://xmyzstudent.com/",
}

for base in BASES:
    for path in PATHS:
        url = base + path
        try:
            req = urllib.request.Request(url, headers=UA)
            resp = urllib.request.urlopen(req, timeout=30)
            body = resp.read().decode("utf-8", "replace")
            print(f"{resp.status} {url}")
            print("   ", body[:400].replace("\n", " "))
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", "replace")[:300].replace("\n", " ")
            print(f"{exc.code} {url}")
            print("   ", body)
        except Exception as exc:  # noqa: BLE001
            print(f"ERR {url} {type(exc).__name__} {exc}")
