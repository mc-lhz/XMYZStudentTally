#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tally 选票（实时唱票）本地后端 —— 任务一交付物。

根据镜像前端 assets/tally-DC36h0vE.js / useTallySocket-*.js 反推出的接口契约实现：

  REST（base 与源站同构为 <origin>/api/v2，源站为 https://api.xmyzstudent.com/api/v2）
    GET    /api/v2/admin/tally/activities                 活动列表
    GET    /api/v2/admin/tally/activities/<id>            活动详情（含候选人）
    POST   /api/v2/admin/tally/activities                 新建活动 {title}
    PUT    /api/v2/admin/tally/activities/<id>            更新活动 {title?, status?}
    DELETE /api/v2/admin/tally/activities/<id>            删除活动（级联候选人与记录）
    POST   /api/v2/admin/tally/activities/<id>/candidates 添加候选人 {number,name,displayOrder}
    PUT    /api/v2/admin/tally/candidates/<id>            更新候选人
    DELETE /api/v2/admin/tally/candidates/<id>            删除候选人（级联记录）
    POST   /api/v2/admin/tally/candidates/<id>/vote       录票 {delta}
    POST   /api/v2/admin/tally/activities/<id>/undo       撤销最近一次有效录票
    GET    /api/v2/admin/tally/activities/<id>/records    操作日志（新→旧）

  WebSocket（路径与源站逐字一致）
    ws://<host>/ws/tally/activity/<id>
    源站：wss://api.xmyzstudent.com/ws/tally/activity/<id>

存储：单文件 tally.json（活动、候选人、票数、操作记录、自增 ID）。

响应信封与源站一致：HTTP 200 + {"code":200|4xx|5xx, "message":..., "data":...}，
前端页面统一以 `res.data.code === 200` 分支、`res.data.message` 提示错误。

静态资源：static/ 下为「tally 业务专用最小前端子集」（镜像复制，非自研），
返回 index.html 时运行时注入 static/dev-auth.js 解锁本地登录态
（磁盘上的 index.html / assets 均不改动）。
"""
import argparse
import json
import os
import socket
import sys
import threading
import time
from datetime import datetime

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sock import Sock

# ---------------------------------------------------------------------------
# 路径与常量
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "static")
DATA_FILE = os.path.join(BASE_DIR, "tally.json")

# 登录态注入脚本：扁平结构放在 static/dev-auth.js
DEV_AUTH_URL = "/__dev-auth.js"
DEV_AUTH_CANDIDATES = [
    os.path.join(PUBLIC_DIR, "dev-auth.js"),
    os.path.join(BASE_DIR, "tools", "dev-auth.js"),
]

API_PREFIX = "/api/v2"
DEFAULT_PORT = 5005

MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".map": "application/json; charset=utf-8",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}

app = Flask(__name__, static_folder=None)
CORS(app)  # 便于用 IP/局域网地址访问
sock = Sock(app)

DATA_LOCK = threading.RLock()  # 保护 db（读-改-写 tally.json）
WS_LOCK = threading.Lock()     # 保护 WS 客户端注册表
WS_CLIENTS = {}                # activity_id -> set(connection)

db = {"nextIds": {"activity": 1, "candidate": 1, "record": 1}, "activities": []}


# ---------------------------------------------------------------------------
# 通用工具
# ---------------------------------------------------------------------------
def load_db() -> None:
    """启动时把 tally.json 载入内存。"""
    global db
    with open(DATA_FILE, encoding="utf-8") as f:
        db = json.load(f)
    db.setdefault("nextIds", {"activity": 1, "candidate": 1, "record": 1})


def save_db() -> None:
    """原子落盘（先写临时文件再替换，避免中途崩溃损坏数据）。"""
    tmp = DATA_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
    os.replace(tmp, DATA_FILE)


def now_iso() -> str:
    """ISO-8601 本地时间（REST 字段 createdAt/updatedAt/记录时间用，JS `new Date()` 可解析）。"""
    return datetime.now().isoformat(timespec="microseconds")


def now_java_nanos() -> str:
    """Java LocalDateTime 纳秒串，如 2026-09-23 00:32:12.424017873 —— 与源站 WS 快照逐字同构。"""
    ns = time.time_ns()
    dt = datetime.fromtimestamp(ns // 1_000_000_000)
    return dt.strftime("%Y-%m-%d %H:%M:%S.") + f"{ns % 1_000_000_000:09d}"


def envelope(code: int, message: str, data=None) -> Response:
    """源站统一响应信封。业务错误也走 HTTP 200，前端才能读到 data.message 弹 Toast。"""
    return jsonify({"code": code, "message": message, "data": data})


def find_activity(activity_id: int):
    for act in db["activities"]:
        if act["id"] == activity_id:
            return act
    return None


def find_candidate(activity, candidate_id: int):
    if not activity:
        return None
    for cand in activity["candidates"]:
        if cand["id"] == candidate_id:
            return cand
    return None


def sorted_candidates(activity):
    return sorted(activity.get("candidates", []), key=lambda c: c.get("displayOrder", 0))


def next_id(kind: str) -> int:
    value = db["nextIds"].get(kind, 1)
    db["nextIds"][kind] = value + 1
    return value


def activity_summary(activity: dict) -> dict:
    """列表页所需字段：id / title / status / createdAt（TallyActivitiesPage 仅用这四项）。"""
    return {
        "id": activity["id"],
        "title": activity["title"],
        "status": activity["status"],
        "createdAt": activity["createdAt"],
        "updatedAt": activity.get("updatedAt"),
        "candidateCount": len(activity.get("candidates", [])),
    }


def activity_detail(activity: dict) -> dict:
    """配置页（TallyActivityEditPage）所需：附加候选人数组（按 displayOrder 排序）。"""
    out = activity_summary(activity)
    out["candidates"] = [dict(c) for c in sorted_candidates(activity)]
    return out


def build_snapshot(activity: dict) -> dict:
    """WS 快照 —— 字段、键序与源站实测报文一致（见 tools/_source_snapshots/）。"""
    return {
        "activityId": activity["id"],
        "candidates": [
            {
                "displayOrder": c.get("displayOrder", 0),
                "id": c["id"],
                "name": c["name"],
                "number": c["number"],
                "voteCount": c.get("voteCount", 0),
            }
            for c in sorted_candidates(activity)
        ],
        "status": activity["status"],
        "title": activity["title"],
        "updatedAt": activity.get("updatedAt") or now_java_nanos(),
    }


def touch(activity: dict) -> None:
    """数据变更后刷新 updatedAt 并向该活动的所有大屏/控制台 WS 客户端广播新快照。"""
    activity["updatedAt"] = now_java_nanos()
    save_db()
    broadcast_snapshot(activity["id"])


def broadcast_snapshot(activity_id: int) -> None:
    activity = find_activity(activity_id)
    if activity is None:
        return
    payload = json.dumps(build_snapshot(activity), ensure_ascii=False)
    with WS_LOCK:
        clients = list(WS_CLIENTS.get(activity_id, ()))
    for conn in clients:
        try:
            conn.send(payload)
        except Exception:
            with WS_LOCK:
                WS_CLIENTS.get(activity_id, set()).discard(conn)


def append_record(activity: dict, candidate: dict, delta: int, record_type: int) -> dict:
    """追加一条操作日志。type: 0=普通录票 1=撤销（与前端渲染分支一致）。"""
    record = {
        "id": next_id("record"),
        "activityId": activity["id"],
        "candidateId": candidate["id"],
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,
        "type": record_type,
        "createdAt": now_iso(),
        "undone": False,
    }
    activity.setdefault("records", []).append(record)
    return record


# ---------------------------------------------------------------------------
# REST：活动管理
# ---------------------------------------------------------------------------
@app.get(API_PREFIX + "/admin/tally/activities")
def list_activities():
    with DATA_LOCK:
        return envelope(200, "ok", [activity_summary(a) for a in db["activities"]])


@app.get(API_PREFIX + "/admin/tally/activities/<int:activity_id>")
def get_activity(activity_id: int):
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        return envelope(200, "ok", activity_detail(activity))


@app.post(API_PREFIX + "/admin/tally/activities")
def create_activity():
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    if not title:
        return envelope(400, "标题不能为空")
    with DATA_LOCK:
        activity = {
            "id": next_id("activity"),
            "title": title,
            "status": 0,  # 0 待开始 / 1 进行中 / 2 已结束
            "createdAt": now_iso(),
            "updatedAt": now_java_nanos(),
            "candidates": [],
            "records": [],
        }
        db["activities"].append(activity)
        save_db()
        return envelope(200, "已创建", activity_detail(activity))


@app.put(API_PREFIX + "/admin/tally/activities/<int:activity_id>")
def update_activity(activity_id: int):
    payload = request.get_json(silent=True) or {}
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        if "title" in payload:
            title = str(payload.get("title", "")).strip()
            if not title:
                return envelope(400, "标题不能为空")
            activity["title"] = title
        if "status" in payload:
            try:
                status = int(payload.get("status"))
            except (TypeError, ValueError):
                return envelope(400, "状态取值非法")
            if status not in (0, 1, 2):
                return envelope(400, "状态取值非法")
            activity["status"] = status
        touch(activity)
        return envelope(200, "状态已更新" if "status" in payload and "title" not in payload else "已更新",
                        activity_detail(activity))


@app.delete(API_PREFIX + "/admin/tally/activities/<int:activity_id>")
def delete_activity(activity_id: int):
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        db["activities"] = [a for a in db["activities"] if a["id"] != activity_id]
        save_db()
    # 通知该活动的 WS 订阅者（快照已不存在，直接关闭连接，前端会走重连逻辑）
    with WS_LOCK:
        clients = list(WS_CLIENTS.pop(activity_id, ()))
    for conn in clients:
        try:
            conn.close()
        except Exception:
            pass
    return envelope(200, "已删除", True)


# ---------------------------------------------------------------------------
# REST：候选人
# ---------------------------------------------------------------------------
@app.post(API_PREFIX + "/admin/tally/activities/<int:activity_id>/candidates")
def create_candidate(activity_id: int):
    payload = request.get_json(silent=True) or {}
    number = str(payload.get("number", "")).strip()
    name = str(payload.get("name", "")).strip()
    if not number:
        return envelope(400, "请输入编号")
    if not name:
        return envelope(400, "请输入姓名")
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        try:
            display_order = int(payload.get("displayOrder") or 0)
        except (TypeError, ValueError):
            display_order = 0
        candidate = {
            "id": next_id("candidate"),
            "activityId": activity_id,
            "number": number,
            "name": name,
            "displayOrder": display_order,
            "voteCount": 0,
        }
        activity.setdefault("candidates", []).append(candidate)
        touch(activity)
        return envelope(200, "已添加", candidate)


@app.put(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>")
def update_candidate(candidate_id: int):
    payload = request.get_json(silent=True) or {}
    with DATA_LOCK:
        for activity in db["activities"]:
            candidate = find_candidate(activity, candidate_id)
            if candidate is None:
                continue
            if "number" in payload:
                number = str(payload.get("number", "")).strip()
                if not number:
                    return envelope(400, "请输入编号")
                candidate["number"] = number
            if "name" in payload:
                name = str(payload.get("name", "")).strip()
                if not name:
                    return envelope(400, "请输入姓名")
                candidate["name"] = name
            if "displayOrder" in payload:
                try:
                    candidate["displayOrder"] = int(payload.get("displayOrder") or 0)
                except (TypeError, ValueError):
                    return envelope(400, "显示顺序必须是整数")
            # 日志中的候选人快照字段同步更新，保持控制台展示一致
            for record in activity.get("records", []):
                if record.get("candidateId") == candidate_id:
                    record["candidateNumber"] = candidate["number"]
                    record["candidateName"] = candidate["name"]
            touch(activity)
            return envelope(200, "已更新", candidate)
    return envelope(404, "候选人不存在")


@app.delete(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>")
def delete_candidate(candidate_id: int):
    with DATA_LOCK:
        for activity in db["activities"]:
            candidate = find_candidate(activity, candidate_id)
            if candidate is None:
                continue
            activity["candidates"] = [c for c in activity["candidates"] if c["id"] != candidate_id]
            # 与页面确认文案一致：历史唱票记录一并删除
            activity["records"] = [r for r in activity.get("records", [])
                                   if r.get("candidateId") != candidate_id]
            touch(activity)
            return envelope(200, "已删除", True)
    return envelope(404, "候选人不存在")


# ---------------------------------------------------------------------------
# REST：录票 / 撤销 / 操作日志
# ---------------------------------------------------------------------------
@app.post(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>/vote")
def vote_candidate(candidate_id: int):
    payload = request.get_json(silent=True) or {}
    try:
        delta = int(payload.get("delta"))
    except (TypeError, ValueError):
        return envelope(400, "票数变化必须是整数")
    if delta == 0:
        return envelope(400, "票数变化不能为 0")
    with DATA_LOCK:
        for activity in db["activities"]:
            candidate = find_candidate(activity, candidate_id)
            if candidate is None:
                continue
            # 负数录票最多减到 0（源站行为未公开，本地取不出现负票的保守策略）
            new_count = candidate.get("voteCount", 0) + delta
            if new_count < 0:
                delta = -candidate.get("voteCount", 0)
                new_count = 0
                if delta == 0:
                    return envelope(400, "票数不能为负")
            candidate["voteCount"] = new_count
            append_record(activity, candidate, delta, 0)
            touch(activity)
            return envelope(200, "ok", {"candidateId": candidate_id, "voteCount": candidate["voteCount"]})
    return envelope(404, "候选人不存在")


@app.post(API_PREFIX + "/admin/tally/activities/<int:activity_id>/undo")
def undo_activity(activity_id: int):
    """撤销最近一次尚未被撤销的录票。

    返回 data=撤销结果（真值）→ 前端 Toast「已撤销最近一次操作」；
    无可撤销时 data=None → 前端 Toast「无可撤销操作」。
    """
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        records = activity.get("records", [])
        target = None
        for record in reversed(records):
            if record.get("type") == 0 and not record.get("undone"):
                target = record
                break
        if target is None:
            return envelope(200, "无可撤销操作", None)
        candidate = find_candidate(activity, target.get("candidateId"))
        if candidate is not None:
            candidate["voteCount"] = max(0, candidate.get("voteCount", 0) - target["delta"])
        target["undone"] = True
        undo_record = append_record(activity, {
            "id": target.get("candidateId"),
            "number": target.get("candidateNumber", ""),
            "name": target.get("candidateName", ""),
        }, -target["delta"], 1)
        undo_record["undone"] = True  # 撤销记录本身不可再被撤销
        touch(activity)
        return envelope(200, "已撤销最近一次操作", undo_record)


@app.get(API_PREFIX + "/admin/tally/activities/<int:activity_id>/records")
def activity_records(activity_id: int):
    """操作日志，新→旧（前端 slice(0, 20) 取最近 20 条）。"""
    with DATA_LOCK:
        activity = find_activity(activity_id)
        if activity is None:
            return envelope(404, "活动不存在")
        records = list(reversed(activity.get("records", [])))
        return envelope(200, "ok", records)


# 未知 /api/v2/* 兜底：返回信封式 404，便于排查漏实现的端点
@app.route(API_PREFIX + "/<path:_rest>", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
def unknown_api(_rest: str):
    return envelope(404, f"接口不存在: {request.method} {API_PREFIX}/{_rest}")


# ---------------------------------------------------------------------------
# WebSocket：/ws/tally/activity/<id>（路径与源站逐字一致）
# ---------------------------------------------------------------------------
@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_websocket(ws, activity_id: int):
    """连接建立即推送当前快照；此后任一数据变更由 broadcast_snapshot 推送。

    与源站一致：客户端只收不发业务帧（useTallySocket 仅注册 onmessage），
    服务端循环 receive() 用于感知对端关闭。
    """
    with WS_LOCK:
        WS_CLIENTS.setdefault(activity_id, set()).add(ws)

    def _cleanup():
        with WS_LOCK:
            WS_CLIENTS.get(activity_id, set()).discard(ws)

    try:
        with DATA_LOCK:
            activity = find_activity(activity_id)
            snapshot = build_snapshot(activity) if activity else {
                "activityId": activity_id,
                "candidates": [],
                "status": 2,
                "title": "活动不存在",
                "updatedAt": now_java_nanos(),
            }
        ws.send(json.dumps(snapshot, ensure_ascii=False))
        if activity is None:
            return
        while True:
            message = ws.receive()  # None = 对端关闭
            if message is None:
                break
    except Exception:
        pass
    finally:
        _cleanup()


# ---------------------------------------------------------------------------
# 静态资源 + SPA 回退 + 登录态注入
# ---------------------------------------------------------------------------
def _dev_auth_path():
    for path in DEV_AUTH_CANDIDATES:
        if os.path.isfile(path):
            return path
    return None


def _inject_dev_auth(html: str) -> str:
    """在主 bundle 的 module 脚本之前插入登录态注入脚本（磁盘文件保持原样）。"""
    tag = '<script src="%s"></script>\n    ' % DEV_AUTH_URL
    if '<script type="module"' in html:
        return html.replace('<script type="module"', tag + '<script type="module"', 1)
    return html.replace("</head>", tag + "</head>", 1)


def _serve_html(full_path: str) -> Response:
    with open(full_path, encoding="utf-8", errors="replace") as f:
        html = f.read()
    html = _inject_dev_auth(html)
    return Response(html, mimetype="text/html; charset=utf-8")


def _safe_public(subpath: str):
    full = os.path.normpath(os.path.join(PUBLIC_DIR, subpath))
    if not full.startswith(PUBLIC_DIR):
        return None
    return full


@app.route("/")
def index_route():
    return _serve_html(os.path.join(PUBLIC_DIR, "index.html"))


@app.route(DEV_AUTH_URL)
def dev_auth_route():
    path = _dev_auth_path()
    if path is None:
        return "Not Found", 404
    with open(path, encoding="utf-8") as f:
        return Response(f.read(), mimetype="text/javascript; charset=utf-8")


@app.route("/<path:subpath>")
def spa_route(subpath: str):
    full = _safe_public(subpath)
    if full is None:
        return "Forbidden", 403
    if os.path.isfile(full):
        ext = os.path.splitext(full)[1].lower()
        if ext == ".html":
            return _serve_html(full)
        return Response(open(full, "rb").read(),
                        mimetype=MIME.get(ext, "application/octet-stream"))
    # 带扩展名却不存在 → 真缺资源（最小静态子集中非 tally 页面的 chunk 会走到这里）
    if os.path.splitext(subpath)[1]:
        return "Not Found: " + subpath, 404
    # SPA 前端路由回退（/admin/tally、/tally/screen/:id 等）
    return _serve_html(os.path.join(PUBLIC_DIR, "index.html"))


@app.after_request
def _no_cache(resp):
    resp.headers["Cache-Control"] = "no-store"
    return resp


# ---------------------------------------------------------------------------
# 启动
# ---------------------------------------------------------------------------
def pick_port(preferred: int) -> int:
    """端口被占用时顺延寻找可用端口（避免与其他实例冲突）。"""
    for port in range(preferred, preferred + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("0.0.0.0", port))
                return port
            except OSError:
                continue
    raise SystemExit(f"端口 {preferred}~{preferred + 19} 均被占用")


def main() -> None:
    parser = argparse.ArgumentParser(description="tally 选票本地 Flask 服务")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", DEFAULT_PORT)))
    parser.add_argument("--host", default="0.0.0.0")
    args = parser.parse_args()

    load_db()
    port = pick_port(args.port)
    if port != args.port:
        print(f"[提示] 端口 {args.port} 被占用，已切换到 {port}")

    dev_auth = _dev_auth_path()
    print(f"tally 服务已启动: http://localhost:{port}")
    print(f"  活动管理页:   http://localhost:{port}/admin/tally")
    print(f"  大屏示例:     http://localhost:{port}/tally/screen/1")
    print(f"  REST base:    http://localhost:{port}{API_PREFIX}")
    print(f"  WS 地址:      ws://localhost:{port}/ws/tally/activity/<id>")
    print(f"  数据文件:     {DATA_FILE}")
    print(f"  登录态注入:   {dev_auth or '未找到 tools/dev-auth.js'}")
    app.run(host=args.host, port=port, debug=False, threaded=True)


if __name__ == "__main__":
    main()
