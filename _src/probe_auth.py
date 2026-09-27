"""探测登录/解锁相关接口，寻找任务说明中提到的「仓库内部脚本解锁登录」入口。"""
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
    ("GET", "/api/v2/auth/me"),
    ("GET", "/api/v2/auth/config"),
    ("GET", "/api/v2/auth/options"),
    ("GET", "/api/v2/auth/dev-login"),
    ("GET", "/api/v2/dev/login"),
    ("GET", "/api/v2/dev/token"),
    ("GET", "/api/v2/dev/unlock"),
    ("GET", "/api/v2/auth/unlock"),
    ("GET", "/api/v2/test/login"),
    ("POST", "/api/v2/auth/login", {"username": "admin", "password": "admin"}),
    ("POST", "/api/v2/auth/login", {"account": "admin", "password": "123456"}),
    ("POST", "/api/v2/auth/dev-login", {}),
    ("POST", "/api/v2/auth/unlock", {}),
    ("POST", "/api/v2/auth/verify", {"code": "000000"}),
]


def call(method, path, payload=None):
    url = ORIGIN + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, headers=UA, method=method, data=data)
    if data:
        req.add_header("Content-Type", "application/json")
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        return resp.status, resp.read().decode("utf-8", "replace")[:400].replace("\n", " ")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", "replace")[:300].replace("\n", " ")
    except Exception as exc:  # noqa: BLE001
        return "ERR", f"{type(exc).__name__} {exc}"


for method, path, *rest in TRIES:
    payload = rest[0] if rest else None
    status, body = call(method, path, payload)
    print(f"{status} {method} {path} {('payload=' + json.dumps(payload, ensure_ascii=False)) if payload else ''}")
    print("   ", body)
