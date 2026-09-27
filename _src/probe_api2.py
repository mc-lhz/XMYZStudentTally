"""探测接口命名空间与认证方式，寻找无需认证即可读取 tally 快照的入口。"""
import json
import urllib.error
import urllib.request

ORIGIN = "https://xmyzstudent.com"
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Origin": ORIGIN,
    "Referer": ORIGIN + "/",
}

TRIES = [
    ("GET", "/api/v2", None),
    ("GET", "/api/v2/tally/activity/1", None),
    ("GET", "/api/v2/tally/1", None),
    ("GET", "/api/v2/tally/1/snapshot", None),
    ("GET", "/api/v2/tally/activities/1/snapshot", None),
    ("GET", "/api/v2/tally/activities/1/screen", None),
    ("GET", "/api/v2/auth/login", None),
    ("GET", "/api/v2/user/login", None),
    ("GET", "/api/v1/tally/activities", None),
    ("GET", "/api/tally/activities", None),
    ("GET", "/api/v2/tally/activities?page=1&size=10", None),
    ("GET", "/v3/api-docs", None),
    ("GET", "/swagger-ui/index.html", None),
    ("GET", "/api/v2/swagger-ui/index.html", None),
]


def call(method, path, payload):
    url = ORIGIN + path
    data = json.dumps(payload).encode() if payload else None
    req = urllib.request.Request(url, headers=UA, method=method, data=data)
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        body = resp.read().decode("utf-8", "replace")
        return resp.status, body[:500].replace("\n", " ")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", "replace")[:300].replace("\n", " ")
    except Exception as exc:  # noqa: BLE001
        return "ERR", f"{type(exc).__name__} {exc}"


for method, path, payload in TRIES:
    status, body = call(method, path, payload)
    print(f"{status} {method} {path}")
    print("   ", body)
