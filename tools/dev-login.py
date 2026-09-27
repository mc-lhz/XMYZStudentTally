"""命令行登录解锁工具（对应任务书「注意使用仓库内部脚本解锁登录」）。

作用与前端 tally/static/dev-auth.js 一致，但面向命令行 / 自动化：
    1. 调 POST /api/v2/auth/login 换取 token；
    2. 打印出需要写入浏览器 localStorage 的四项登录态；
    3. 可选地直接把该活动的管理接口跑通（--verify），证明解锁有效。

用法：
    python tools/dev-login.py                      # 默认 http://127.0.0.1:5000
    python tools/dev-login.py http://127.0.0.1:5000
    python tools/dev-login.py http://127.0.0.1:5000 --verify
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request

DEFAULT_BASE = "http://127.0.0.1:5000"
ACCOUNT = {"username": "admin", "password": "admin"}


def post(base: str, path: str, payload: dict, token: str | None = None):
    data = json.dumps(payload).encode()
    req = urllib.request.Request(base + path, data=data, headers={"Content-Type": "application/json"}, method="POST")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        resp = urllib.request.urlopen(req, timeout=20)
        return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        return exc.code, json.loads(exc.read().decode("utf-8") or "{}")


def main() -> int:
    base = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1].startswith("http") else DEFAULT_BASE
    verify = "--verify" in sys.argv

    status, body = post(base, "/api/v2/auth/login", {"loginType": "normal", **ACCOUNT})
    if body.get("code") != 200 or not body.get("data"):
        print(f"[dev-login] 登录失败：HTTP {status} {body.get('message')}")
        return 1

    payload = body["data"]
    expires_at = int(payload.get("expiresAt") or 0)
    session = {
        "token": payload["token"],
        "user": json.dumps(payload.get("user") or {}, ensure_ascii=False),
        "expiresAt": str(expires_at),
        "permissions": json.dumps(payload.get("permissions") or []),
    }

    print("=" * 70)
    print(" tally 管理后台 · 登录解锁")
    print("=" * 70)
    print(f" 接口地址 : {base}/api/v2")
    print(f" 账号     : {ACCOUNT['username']} / {ACCOUNT['password']}")
    print(f" Token    : {session['token']}")
    print(f" 有效期至 : {expires_at}")
    print("-" * 70)
    print(" 在浏览器控制台执行下面这行即可写入登录态（或直接访问页面，dev-auth.js 会自动完成）：")
    print(
        " localStorage.setItem('token',%s);localStorage.setItem('user',%s);"
        "localStorage.setItem('expiresAt',%s);localStorage.setItem('permissions',%s);location.reload();"
        % (
            json.dumps(session["token"], ensure_ascii=False),
            json.dumps(session["user"], ensure_ascii=False),
            json.dumps(session["expiresAt"]),
            json.dumps(session["permissions"], ensure_ascii=False),
        )
    )
    print("-" * 70)
    print(" 管理入口：")
    print(f"   活动管理   {base}/admin/tally")
    print(f"   唱票控制台 {base}/admin/tally/activities/1/control")
    print(f"   实时大屏   {base}/tally/screen/1")

    if verify:
        req = urllib.request.Request(
            base + "/api/v2/admin/tally/activities",
            headers={"Authorization": f"Bearer {session['token']}"},
        )
        try:
            resp = urllib.request.urlopen(req, timeout=20)
            data = json.loads(resp.read().decode("utf-8"))
            activities = data.get("data") or []
            print("-" * 70)
            print(f" 校验：管理接口可访问，活动 {len(activities)} 场 -> {[a['title'] for a in activities]}")
        except Exception as exc:  # noqa: BLE001
            print(f"[dev-login] 校验失败：{type(exc).__name__} {exc}")
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
