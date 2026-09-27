"""tally 本地服务端到端自测。

覆盖：
  1. 登录 / 鉴权（带 token、无 token、错误口令）
  2. 活动增删改查 + 状态切换
  3. 候选人增改删
  4. 现场录票（+1/+5/+10/-1/自定义）
  5. 撤销最近一次操作
  6. 操作日志
  7. 公开快照接口
  8. WebSocket 实时推送（收到初值 + 录票后收到新快照）
  9. 静态子集与 SPA 回退
 10. 用后即删：测试产生的活动在结束时删除，tally.json 恢复原状
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:5000"
WS_BASE = BASE.replace("http://", "ws://")

PASS, FAIL = [], []


def check(name, cond, detail=""):
    (PASS if cond else FAIL).append(name)
    print(f"[{'PASS' if cond else 'FAIL'}] {name}" + (f"  {detail}" if detail and not cond else ""))


def call(method, path, payload=None, token=None):
    url = BASE + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, headers={"Content-Type": "application/json"}, method=method, data=data)
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8")
        try:
            return exc.code, json.loads(body)
        except Exception:  # noqa: BLE001
            return exc.code, {"raw": body[:200]}
    except Exception as exc:  # noqa: BLE001
        return "ERR", {"raw": f"{type(exc).__name__} {exc}"}


def raw_get(path):
    try:
        resp = urllib.request.urlopen(BASE + path, timeout=30)
        return resp.status, resp.read()
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read()


def main():
    print("=" * 72)
    print(" tally 本地服务自测 ·", BASE)
    print("=" * 72)

    # ---------------------------------------------------------------- 静态资源
    status, body = raw_get("/")
    check("GET / 返回 SPA 外壳", status == 200 and b"/assets/index-D2vbWxba.js" in body, f"status={status}")
    status, body = raw_get("/assets/index-CZZQpGPl.css")
    check("镜像 CSS 可取", status == 200 and len(body) > 10000, f"status={status}")
    status, body = raw_get("/assets/tally-BvCEJ8Iv.js")
    text = body.decode("utf-8", "replace")
    code_only = "\n".join(line for line in text.splitlines() if not line.strip().startswith("*"))
    low = code_only.lower()
    check(
        "tally 接口封装可取且 WS 路径与源站同构",
        status == 200
        and "/ws/tally/activity/" in code_only
        and "window.__TALLY_WS_ORIGIN__" in code_only
        and "api.xmyzstudent.com/ws" not in low
        and ("ws://" in low or "wss://" in low),
        f"status={status}",
    )
    status, body = raw_get("/dev-auth.js")
    check("登录解锁脚本可取", status == 200 and b"tallyAuth" in body, f"status={status}")
    status, body = raw_get("/tally/screen/1")
    check("SPA 深链回退到 index.html", status == 200 and b'id="app"' in body, f"status={status}")

    # ---------------------------------------------------------------- 鉴权
    status, body = call("GET", "/api/v2/admin/tally/activities")
    check("无 token 访问管理接口 -> 401", status == 401 and body.get("code") == 401, f"{status} {body}")
    status, body = call("POST", "/api/v2/auth/login", {"loginType": "normal", "username": "admin", "password": "wrong"})
    check("错误口令 -> code 401", body.get("code") == 401, str(body))
    status, body = call("POST", "/api/v2/auth/login", {"loginType": "normal", "username": "admin", "password": "admin"})
    token = (body.get("data") or {}).get("token")
    check("登录成功并拿到 token", body.get("code") == 200 and bool(token), str(body)[:200])

    # ---------------------------------------------------------------- 初始数据
    status, body = call("GET", "/api/v2/admin/tally/activities", token=token)
    acts = body.get("data") or []
    check("活动列表含源站四场活动", len(acts) >= 4, f"len={len(acts)}")
    source_ids = sorted(a.get("sourceId") for a in acts if a.get("sourceId"))
    check("源站 id=1/2/3/4 均已落库", source_ids[:4] == [1, 2, 3, 4], str(source_ids))
    status, body = call("GET", "/api/v2/tally/activities/4/snapshot")
    snap = body.get("data") or {}
    check(
        "公开快照：活动4 九名候选人",
        snap.get("activityId") == 4 and len(snap.get("candidates", [])) == 9,
        str(snap)[:200],
    )
    check("公开快照无需登录", status == 200 and body.get("code") == 200, f"{status}")

    # ---------------------------------------------------------------- 活动管理 CRUD
    status, body = call("POST", "/api/v2/admin/tally/activities", {"title": "自测活动"}, token=token)
    act = body.get("data") or {}
    act_id = act.get("id")
    check("新建活动", body.get("code") == 200 and act.get("status") == 0, str(body)[:200])
    status, body = call("PUT", f"/api/v2/admin/tally/activities/{act_id}", {"status": 1}, token=token)
    check("状态切换 0 -> 1", (body.get("data") or {}).get("status") == 1, str(body)[:200])
    status, body = call("PUT", f"/api/v2/admin/tally/activities/{act_id}", {"title": "自测活动（改名）"}, token=token)
    check("活动改名", (body.get("data") or {}).get("title") == "自测活动（改名）", str(body)[:200])

    # ---------------------------------------------------------------- 候选人
    cand_ids = []
    for idx, (number, name) in enumerate([("01", "张三"), ("02", "李四")], start=1):
        status, body = call(
            "POST",
            f"/api/v2/admin/tally/activities/{act_id}/candidates",
            {"number": number, "name": name, "displayOrder": idx},
            token=token,
        )
        cand = body.get("data") or {}
        cand_ids.append(cand.get("id"))
        check(f"新增候选人 {name}", body.get("code") == 200, str(body)[:200])
    status, body = call("PUT", f"/api/v2/admin/tally/candidates/{cand_ids[0]}", {"name": "张三丰"}, token=token)
    check("编辑候选人姓名", (body.get("data") or {}).get("name") == "张三丰", str(body)[:200])
    status, body = call("POST", f"/api/v2/admin/tally/activities/{act_id}/candidates", {"number": "", "name": ""}, token=token)
    check("空编号/空姓名被拒", body.get("code") == 400, str(body)[:200])

    # ---------------------------------------------------------------- WebSocket 实时
    ws_ok, ws_detail = ws_probe(f"{WS_BASE}/ws/tally/activity/{act_id}", cand_ids[0])
    check("WS 连上即收到当前快照", ws_ok, ws_detail)

    # ---------------------------------------------------------------- 录票 / 撤销 / 日志
    status, body = call("POST", f"/api/v2/admin/tally/candidates/{cand_ids[0]}/vote", {"delta": 1}, token=token)
    check("+1 录票", (body.get("data", {}).get("candidate", {}) or {}).get("voteCount") == 1, str(body)[:200])
    call("POST", f"/api/v2/admin/tally/candidates/{cand_ids[0]}/vote", {"delta": 5}, token=token)
    status, body = call("POST", f"/api/v2/admin/tally/candidates/{cand_ids[0]}/vote", {"delta": -1}, token=token)
    check("-1 录票", (body.get("data", {}).get("candidate", {}) or {}).get("voteCount") == 5, str(body)[:200])
    status, body = call("POST", f"/api/v2/admin/tally/candidates/{cand_ids[0]}/vote", {"delta": 0}, token=token)
    check("delta=0 被拒", body.get("code") == 400, str(body)[:200])

    status, body = call("GET", f"/api/v2/admin/tally/activities/{act_id}/records", token=token)
    records = body.get("data") or []
    check("操作日志有记录且倒序", len(records) == 3 and records[0]["id"] > records[-1]["id"], f"len={len(records)}")

    status, body = call("POST", f"/api/v2/admin/tally/activities/{act_id}/undo", token=token)
    check("撤销最近一次操作", body.get("code") == 200 and body.get("data"), str(body)[:200])
    status, body = call("GET", f"/api/v2/tally/activities/{act_id}/snapshot")
    after_first_undo = (body.get("data", {}).get("candidates", [{}])[0] or {}).get("voteCount")
    # 录票序列 +1(+1) +5(=6) -1(=5)，最近一次是 -1，撤销后应回到 6
    check("撤销抵消最近一次录票（-1 被撤销：5 -> 6）", after_first_undo == 6, f"voteCount={after_first_undo}")
    status, body = call("POST", f"/api/v2/admin/tally/activities/{act_id}/undo", token=token)
    status, body = call("GET", f"/api/v2/tally/activities/{act_id}/snapshot")
    after_second_undo = (body.get("data", {}).get("candidates", [{}])[0] or {}).get("voteCount")
    check("连续撤销（+5 被撤销：6 -> 1）", after_second_undo == 1, f"voteCount={after_second_undo}")

    status, body = call("GET", f"/api/v2/admin/tally/activities/{act_id}/records", token=token)
    types = [r["type"] for r in (body.get("data") or [])]
    check("撤销写入一条 type=1 记录", 1 in types, str(types))

    # ---------------------------------------------------------------- 大屏 WS 广播
    ws_ok, ws_detail = ws_broadcast_probe(f"{WS_BASE}/ws/tally/activity/{act_id}", cand_ids[1])
    check("录票后大屏收到实时推送", ws_ok, ws_detail)

    # ---------------------------------------------------------------- 清理
    status, body = call("DELETE", f"/api/v2/admin/tally/candidates/{cand_ids[1]}", token=token)
    check("删除候选人", body.get("code") == 200, str(body)[:200])
    status, body = call("DELETE", f"/api/v2/admin/tally/activities/{act_id}", token=token)
    check("删除活动（联动清候选人/记录）", body.get("code") == 200, str(body)[:200])
    status, body = call("GET", f"/api/v2/admin/tally/activities/{act_id}", token=token)
    check("删除后详情不可见", body.get("code") == 404, str(body)[:200])
    status, body = call("POST", f"/api/v2/admin/tally/activities/{act_id}/undo", token=token)
    check("已删活动撤销 -> 无数据", body.get("code") == 200 and body.get("data") is None, str(body)[:200])

    # ---------------------------------------------------------------- 健康检查
    status, body = call("GET", "/api/v2/tally/health")
    check("健康检查可用", body.get("code") == 200, str(body)[:200])

    print("-" * 72)
    print(f"通过 {len(PASS)} 项，失败 {len(FAIL)} 项")
    if FAIL:
        print("失败列表：")
        for name in FAIL:
            print("  -", name)
    return 0 if not FAIL else 1


def close_ws(sock):
    """显式发一帧 Close（opcode 0x8），让服务端 receive() 立刻返回 None 并回收连接。"""
    try:
        sock.sendall(b"\x88\x80\x00\x00\x00\x00")
    except Exception:  # noqa: BLE001
        pass


def ws_probe(url, candidate_id):
    """连上后应立刻收到一份快照。"""
    try:
        import socket
        import base64
        import os as _os

        key = base64.b64encode(_os.urandom(16)).decode()
        host, port, path = parse_ws_url(url)
        with socket.create_connection((host, port), timeout=10) as sock:
            handshake = (
                f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\n"
                f"Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
            )
            sock.sendall(handshake.encode())
            resp = sock.recv(4096)
            if b"101" not in resp.split(b"\r\n")[0]:
                return False, f"握手失败：{resp[:120]!r}"
            frame = read_frame(sock)
            close_ws(sock)
            if frame is None:
                return False, "未收到初值帧"
            data = json.loads(frame)
            return data.get("activityId") is not None, f"snapshot keys={list(data)[:6]}"
    except Exception as exc:  # noqa: BLE001
        return False, f"{type(exc).__name__} {exc}"


def ws_broadcast_probe(url, candidate_id):
    """连上后触发一次录票，应在同一连接收到新快照。"""
    try:
        import socket
        import base64
        import os as _os
        import threading

        key = base64.b64encode(_os.urandom(16)).decode()
        host, port, path = parse_ws_url(url)
        with socket.create_connection((host, port), timeout=10) as sock:
            handshake = (
                f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\n"
                f"Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
            )
            sock.sendall(handshake.encode())
            resp = sock.recv(4096)
            if b"101" not in resp.split(b"\r\n")[0]:
                return False, f"握手失败：{resp[:120]!r}"
            read_frame(sock)  # 丢弃初值
            # 触发一次录票（另起线程避免阻塞）
            def fire():
                call("POST", f"/api/v2/admin/tally/candidates/{candidate_id}/vote", {"delta": 3}, token=login_token())

            worker = threading.Thread(target=fire)
            worker.start()
            frame = read_frame(sock, timeout=10)
            close_ws(sock)
            worker.join(timeout=10)
            if frame is None:
                return False, "未收到广播帧"
            data = json.loads(frame)
            votes = {c["id"]: c["voteCount"] for c in data.get("candidates", [])}
            return votes.get(candidate_id) == 3, f"votes={votes}"
    except Exception as exc:  # noqa: BLE001
        return False, f"{type(exc).__name__} {exc}"


_TOKEN_CACHE = {}


def login_token():
    if "t" not in _TOKEN_CACHE:
        _status, body = call("POST", "/api/v2/auth/login", {"loginType": "normal", "username": "admin", "password": "admin"})
        _TOKEN_CACHE["t"] = (body.get("data") or {}).get("token")
    return _TOKEN_CACHE["t"]


def parse_ws_url(url):
    rest = url[len("ws://"):]
    hostport, _, path = rest.partition("/")
    host, _, port = hostport.partition(":")
    return host, int(port or 80), "/" + path


def read_frame(sock, timeout=8):
    """读一帧文本（只处理 ≤65535 字节的 unfragmented 帧，足够本项目用）。"""
    sock.settimeout(timeout)
    header = recv_exact(sock, 2)
    if not header:
        return None
    length = header[1] & 0x7F
    if length == 126:
        length = int.from_bytes(recv_exact(sock, 2), "big")
    elif length == 127:
        length = int.from_bytes(recv_exact(sock, 8), "big")
    payload = recv_exact(sock, length) if length else b""
    return payload.decode("utf-8", "replace")


def recv_exact(sock, n):
    buf = b""
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            return None
        buf += chunk
    return buf


if __name__ == "__main__":
    sys.exit(main())
