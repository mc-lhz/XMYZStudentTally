"""
Tally 选票业务 —— 本地 Flask 服务器
====================================
在仓库内复刻线上 xmyzstudent.com 的「tally 选票（实时唱票）」业务，前端复用镜像文件，
后端用 Flask 自建，数据单文件存储于 tally.json。

三大业务模块（路由与源站同构，不带 XMYZStudent 前缀）：
- 活动管理页  /admin/tally                             —— 活动增删改查、状态切换、列表展示
- 唱票控制台  /admin/tally/activities/:id/control       —— 现场录票(+1/+5/+10/−1/自定义)、撤销、操作日志
- 大屏        /tally/screen/:id                         —— 实时展示唱票结果（原生 WebSocket 推送）

接口契约（反推自镜像 tally-DC36h0vE.js，与源站逐字对应）：
前端统一经过 index-DJrtCu9i.js 的 axios 实例 `http`，其 baseURL 为 /api/v2，
因此用户侧真实请求形式为 http://localhost:5001/api/v2/...。
本实现同时注册「/api/v2」与「无前缀」两套路径，便于直接访问与测试。

REST（由 tally-DC36h0vE.js 的导出函数反推）：
  GET    /admin/tally/activities                # 活动列表        → zz0
  GET    /admin/tally/activities/:id            # 活动详情(含候选人) → zz1
  POST   /admin/tally/activities                # 创建活动  {title}  → zz2
  PUT    /admin/tally/activities/:id            # 更新活动  {title|status} → zz3
  DELETE /admin/tally/activities/:id            # 删除活动(级联)   → zz4
  POST   /admin/tally/activities/:id/candidates # 添加候选人 {number,name,displayOrder} → zz5
  PUT    /admin/tally/candidates/:id            # 更新候选人       → zz6
  DELETE /admin/tally/candidates/:id            # 删除候选人       → zz7
  POST   /admin/tally/candidates/:id/vote       # 录票     {delta}  → zz8
  POST   /admin/tally/activities/:id/undo       # 撤销最近一次录票   → zz9
  GET    /admin/tally/activities/:id/records    # 操作日志(倒序)    → zz10
WS（1 个，与源站同构路径 /ws/tally/activity/:id）：
  ws://host:port/ws/tally/activity/:id          （源站为 wss://api.xmyzstudent.com/ws/tally/activity/:id，即 zz11）

响应统一包裹 {code, message, data}，code=200 表示成功。
数据存储：单个 tally.json 文件（activities / candidates / records 三个集合）。
"""

import json
import os
import sys
import threading
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_sock import Sock
from simple_websocket import ConnectionClosed

# ---------------------------------------------------------------------------
# 初始化
# ---------------------------------------------------------------------------

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)
# flask_sock：在 Flask 路由上提供“原生”WebSocket（升级握手由 werkzeug 处理）。
# 必须用 Werkzeug threaded 开发服务器承载；waitress 等纯 WSGI 不支持 WS 升级。
sock = Sock(app)

DATA_FILE = Path(__file__).parent / "tally.json"

# WS 客户端注册表：activity_id -> list[Client]，Client = {"ws", "send_lock"}
_clients: dict[int, list[dict]] = {}
_clients_lock = threading.Lock()

# REST 路径前缀：同一套处理函数注册两份，前端 /api/v2 与直接访问同时可用
REST_PREFIXES = ("/api/v2", "")


# ---------------------------------------------------------------------------
# 数据层：读写单文件 tally.json
# ---------------------------------------------------------------------------

def _load_data() -> dict:
    """读取 tally.json 全部数据。文件不存在时返回空结构。"""
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"activities": [], "candidates": [], "records": []}


def _save_data(data: dict) -> None:
    """把数据整体写回 tally.json（单文件存储）。"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _now_iso() -> str:
    """生成标准 ISO 时间字符串（UTC）作为 createdAt 字段。"""
    return datetime.now(timezone.utc).isoformat()


def _next_id(items: list, id_key: str = "id") -> int:
    """返回集合中下一个自增 id（当前最大值 + 1）。"""
    return max((item[id_key] for item in items), default=0) + 1


# ---------------------------------------------------------------------------
# 响应封装：与源站一致的 {code, message, data}
# ---------------------------------------------------------------------------

def _ok(data=None, message="ok"):
    """成功响应：code=200。"""
    return jsonify({"code": 200, "message": message, "data": data})


def _err(message="error", code=400):
    """失败响应：自定义 code 与 HTTP 状态码。"""
    return jsonify({"code": code, "message": message, "data": None}), code


# ---------------------------------------------------------------------------
# 领域查询：候选人与活动快照
# ---------------------------------------------------------------------------

def _candidates_of(data: dict, activity_id: int) -> list:
    """取某活动的候选人，按 displayOrder 升序排列。"""
    return sorted(
        [c for c in data["candidates"] if c["activityId"] == activity_id],
        key=lambda c: c["displayOrder"],
    )


def _find_activity(data: dict, activity_id: int):
    """按 id 查找活动，找不到返回 None。"""
    return next((a for a in data["activities"] if a["id"] == activity_id), None)


def _find_candidate(data: dict, candidate_id: int):
    """按 id 查找候选人，找不到返回 None。"""
    return next((c for c in data["candidates"] if c["id"] == candidate_id), None)


def _build_snapshot(data: dict, activity_id: int) -> dict:
    """构造大屏/控制台所需的“活动快照”。

    前端 useTallySocket-Bnuwbx53.js 把收到的 JSON 直接作为 ref.snapshot，
    ScreenPage（大屏）从 snapshot.title / snapshot.status / snapshot.candidates
    渲染，形状必须与此一致。
    """
    activity = _find_activity(data, activity_id)
    if not activity:
        return None
    return {
        "title": activity["title"],
        "status": activity["status"],
        "candidates": [
            {
                "id": c["id"],
                "number": c["number"],
                "name": c["name"],
                "displayOrder": c["displayOrder"],
                "voteCount": c["voteCount"],
            }
            for c in _candidates_of(data, activity_id)
        ],
    }


# ---------------------------------------------------------------------------
# WebSocket 广播：任一 REST 变更后推送最新快照到该活动的所有客户端
# ---------------------------------------------------------------------------

def _register_ws(activity_id: int, ws) -> None:
    """把新连接登记到该活动的客户端桶中。"""
    with _clients_lock:
        _clients.setdefault(activity_id, []).append(
            {"ws": ws, "send_lock": threading.Lock()}
        )


def _unregister_ws(activity_id: int, ws) -> None:
    """连接关闭或发送失败时从桶中移除；桶空则删除键。"""
    with _clients_lock:
        bucket = _clients.get(activity_id)
        if not bucket:
            return
        _clients[activity_id] = [c for c in bucket if c["ws"] is not ws]
        if not _clients[activity_id]:
            del _clients[activity_id]


def _broadcast_snapshot(activity_id: int) -> None:
    """把某活动最新快照推送给所有订阅该活动的 WS 客户端。

    写入原始文本 JSON —— 前端 onmessage 直接 JSON.parse(data)。
    单个客户端发送失败即摘除，避免坏连接阻塞广播。
    """
    snapshot = _build_snapshot(_load_data(), activity_id)
    if snapshot is None:
        return
    with _clients_lock:
        bucket = list(_clients.get(activity_id, []))
    payload = json.dumps(snapshot, ensure_ascii=False)
    for client in bucket:
        try:
            with client["send_lock"]:
                client["ws"].send(payload)
        except Exception:  # noqa: BLE001
            _unregister_ws(activity_id, client["ws"])


# ===================================================================
# REST 接口（11 个端点）—— 同一处理函数注册到两套前缀
# ===================================================================

def _route(rule, methods):
    """装饰器：把端点同时注册到 /api/v2 与无前缀两种路径。"""
    def decorator(fn):
        for prefix in REST_PREFIXES:
            app.add_url_rule(
                prefix + rule,
                view_func=fn,
                methods=methods,
                endpoint=f"{fn.__name__}{prefix.replace('/', '_')}",
            )
        return fn
    return decorator


# --- 1. 活动列表 ----------------------------------------------------------

@_route("/admin/tally/activities", ["GET"])
def list_activities():
    """GET /admin/tally/activities —— 活动列表，data: [{id,title,status,createdAt}]"""
    return _ok(_load_data()["activities"])


# --- 2. 活动详情（含候选人）-----------------------------------------------

@_route("/admin/tally/activities/<int:aid>", ["GET"])
def get_activity(aid):
    """GET /admin/tally/activities/:id —— data: {id,title,status,createdAt,candidates:[...]}"""
    data = _load_data()
    activity = _find_activity(data, aid)
    if not activity:
        return _err("活动不存在", 404)
    return _ok({**activity, "candidates": _candidates_of(data, aid)})


# --- 3. 创建活动 ----------------------------------------------------------

@_route("/admin/tally/activities", ["POST"])
def create_activity():
    """POST /admin/tally/activities  body: {title}，新活动默认 status=0（待开始）。"""
    body = request.get_json(force=True) or {}
    title = (body.get("title") or "").strip()
    if not title:
        return _err("标题不能为空")
    data = _load_data()
    activity = {
        "id": _next_id(data["activities"]),
        "title": title,
        "status": 0,
        "createdAt": _now_iso(),
    }
    data["activities"].append(activity)
    _save_data(data)
    return _ok(activity)


# --- 4. 更新活动（标题 / 状态）---------------------------------------------

@_route("/admin/tally/activities/<int:aid>", ["PUT"])
def update_activity(aid):
    """PUT /admin/tally/activities/:id  body: {title 或 status}"""
    body = request.get_json(force=True) or {}
    data = _load_data()
    activity = _find_activity(data, aid)
    if not activity:
        return _err("活动不存在", 404)
    if "title" in body and isinstance(body["title"], str):
        activity["title"] = body["title"]
    if "status" in body:
        try:
            activity["status"] = int(body["status"])
        except (TypeError, ValueError):
            return _err("状态值不合法")
    _save_data(data)
    _broadcast_snapshot(aid)
    return _ok(activity)


# --- 5. 删除活动 ----------------------------------------------------------

@_route("/admin/tally/activities/<int:aid>", ["DELETE"])
def delete_activity(aid):
    """DELETE /admin/tally/activities/:id —— 级联删除候选人与操作记录。"""
    data = _load_data()
    before = len(data["activities"])
    data["activities"] = [a for a in data["activities"] if a["id"] != aid]
    data["candidates"] = [c for c in data["candidates"] if c["activityId"] != aid]
    data["records"] = [r for r in data["records"] if r["activityId"] != aid]
    if len(data["activities"]) == before:
        return _err("活动不存在", 404)
    _save_data(data)
    _broadcast_snapshot(aid)
    return _ok()


# --- 6. 添加候选人 --------------------------------------------------------

@_route("/admin/tally/activities/<int:aid>/candidates", ["POST"])
def create_candidate(aid):
    """POST /admin/tally/activities/:id/candidates  body:{number,name,displayOrder}"""
    body = request.get_json(force=True) or {}
    number = (body.get("number") or "").strip()
    name = (body.get("name") or "").strip()
    try:
        display_order = int(body.get("displayOrder", 0))
    except (TypeError, ValueError):
        return _err("排序值不合法")
    if not number:
        return _err("编号不能为空")
    if not name:
        return _err("姓名不能为空")
    data = _load_data()
    if not _find_activity(data, aid):
        return _err("活动不存在", 404)
    candidate = {
        "id": _next_id(data["candidates"]),
        "activityId": aid,
        "number": number,
        "name": name,
        "displayOrder": display_order,
        "voteCount": 0,
    }
    data["candidates"].append(candidate)
    _save_data(data)
    _broadcast_snapshot(aid)
    return _ok(candidate)


# --- 7. 更新候选人 --------------------------------------------------------

@_route("/admin/tally/candidates/<int:cid>", ["PUT"])
def update_candidate(cid):
    """PUT /admin/tally/candidates/:id  body:{number|name|displayOrder}"""
    body = request.get_json(force=True) or {}
    data = _load_data()
    candidate = _find_candidate(data, cid)
    if not candidate:
        return _err("候选人不存在", 404)
    if "number" in body and isinstance(body["number"], str):
        candidate["number"] = body["number"]
    if "name" in body and isinstance(body["name"], str):
        candidate["name"] = body["name"]
    if "displayOrder" in body:
        try:
            candidate["displayOrder"] = int(body["displayOrder"])
        except (TypeError, ValueError):
            return _err("排序值不合法")
    _save_data(data)
    _broadcast_snapshot(candidate["activityId"])
    return _ok(candidate)


# --- 8. 删除候选人 --------------------------------------------------------

@_route("/admin/tally/candidates/<int:cid>", ["DELETE"])
def delete_candidate(cid):
    """DELETE /admin/tally/candidates/:id —— 级联删除该候选人的操作记录。"""
    data = _load_data()
    candidate = _find_candidate(data, cid)
    if not candidate:
        return _err("候选人不存在", 404)
    data["candidates"] = [c for c in data["candidates"] if c["id"] != cid]
    data["records"] = [r for r in data["records"] if r["candidateId"] != cid]
    _save_data(data)
    _broadcast_snapshot(candidate["activityId"])
    return _ok()


# --- 9. 录票（delta 可正可负）---------------------------------------------

@_route("/admin/tally/candidates/<int:cid>/vote", ["POST"])
def vote_candidate(cid):
    """POST /admin/tally/candidates/:id/vote  body:{delta}

    前端快捷键 +1/+5/+10/−1 或自定义输入；每笔写操作日志供撤销。
    票数下限裁剪为 0（不允许减成负值）。
    """
    body = request.get_json(force=True) or {}
    try:
        delta = int(body.get("delta", 0))
    except (TypeError, ValueError):
        return _err("票数变化不合法")
    if delta == 0:
        return _err("票数变化不能为 0")
    data = _load_data()
    candidate = _find_candidate(data, cid)
    if not candidate:
        return _err("候选人不存在", 404)
    candidate["voteCount"] = max(0, candidate["voteCount"] + delta)
    record = {
        "id": _next_id(data["records"]),
        "activityId": candidate["activityId"],
        "candidateId": cid,
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,
        "type": 0,  # 0=普通录票 1=撤销
        "createdAt": _now_iso(),
    }
    data["records"].append(record)
    _save_data(data)
    _broadcast_snapshot(candidate["activityId"])
    return _ok(record)


# --- 10. 撤销最近一次操作 -------------------------------------------------

@_route("/admin/tally/activities/<int:aid>/undo", ["POST"])
def undo_activity(aid):
    """POST /admin/tally/activities/:id/undo

    回滚最近一条“未撤销”的普通录票记录：把原记录标记 type=1，并追加一条
    delta=-原delta 的撤销记录。data 返回 boolean：是否存在可撤销操作
    （前端据此提示「已撤销」或「无可撤销操作」）。
    """
    data = _load_data()
    undoable = [r for r in data["records"] if r["activityId"] == aid and r["type"] == 0]
    if not undoable:
        return _ok(False)
    last = undoable[-1]
    candidate = _find_candidate(data, last["candidateId"])
    if candidate:
        candidate["voteCount"] = max(0, candidate["voteCount"] - last["delta"])
    last["type"] = 1
    data["records"].append({
        "id": _next_id(data["records"]),
        "activityId": aid,
        "candidateId": last["candidateId"],
        "candidateNumber": last["candidateNumber"],
        "candidateName": last["candidateName"],
        "delta": -last["delta"],
        "type": 1,
        "createdAt": _now_iso(),
    })
    _save_data(data)
    _broadcast_snapshot(aid)
    return _ok(True)


# --- 11. 操作日志 ----------------------------------------------------------

@_route("/admin/tally/activities/<int:aid>/records", ["GET"])
def list_records(aid):
    """GET /admin/tally/activities/:id/records —— createdAt 倒序（最新在前）。"""
    data = _load_data()
    return _ok(sorted(
        [r for r in data["records"] if r["activityId"] == aid],
        key=lambda r: r["createdAt"],
        reverse=True,
    ))


# ===================================================================
# WebSocket（1 个）：实时唱票推送，与源站同构
# ===================================================================

@sock.route("/ws/tally/activity/<int:aid>")
def tally_ws(ws, aid):
    """GET /ws/tally/activity/:id —— 原生 WebSocket 端点。

    源站对应地址为 wss://api.xmyzstudent.com/ws/tally/activity/:id（zz11）。
    本地以同构路径 /ws/tally/activity/:id 提供。
    前端 useTallySocket createTallySocket(activityId) 用原生 new WebSocket 连接。
    行为：
      1) 连接后立即推送当前快照（onmessage JSON.parse 得到 snapshot）；
      2) 后续任一 REST 变更经 _broadcast_snapshot 实时推送最新快照；
      3) 阻塞在 receive() 感知连接生命周期，断开后清理登记。
    """
    _register_ws(aid, ws)
    try:
        snapshot = _build_snapshot(_load_data(), aid)
        if snapshot is not None:
            try:
                ws.send(json.dumps(snapshot, ensure_ascii=False))
            except ConnectionClosed:
                return
        while True:
            if ws.receive() is None:  # 客户端不发业务消息，仅感知连接是否存活
                break
    except ConnectionClosed:
        pass
    finally:
        _unregister_ws(aid, ws)


# ===================================================================
# 静态资源 & SPA 回退
# ===================================================================

# 本地走查需登录态：注入仓库 tools/dev-auth.js（已复制到 static/）。
# 与 tools/serve.js 的 DEV_AUTH 行为一致 —— 仅在返回 index.html 时动态插入脚本标签，
# 不改动磁盘上的任何 JS。
DEV_AUTH_TAG = '<script src="/dev-auth.js"></script>\n    '
MODULE_TAG = '<script type="module"'


def _inject_dev_auth(html: str) -> str:
    """在 module 脚本之前插入 dev-auth 注入脚本（同步脚本先于 bundle 执行）。"""
    if MODULE_TAG in html:
        return html.replace(MODULE_TAG, DEV_AUTH_TAG + MODULE_TAG, 1)
    return html.replace("</head>", DEV_AUTH_TAG + "</head>", 1)


def _index_html() -> str:
    """读取 static/index.html 并注入登录态脚本后返回。"""
    return _inject_dev_auth(
        open(os.path.join(app.static_folder, "index.html"), encoding="utf-8").read()
    )


@app.route("/")
def index():
    return _index_html()


# SPA 前端路由：这些是 tally 业务相关的真实路由，命中即回退 index.html
@app.route("/admin/tally")
def spa_admin_tally():
    return _index_html()


@app.route("/tally/screen/<int:aid>")
def spa_tally_screen(aid):
    return _index_html()


@app.route("/admin/tally/activities/<int:aid>/control")
def spa_tally_control(aid):
    return _index_html()


@app.route("/admin/tally/activities/<int:aid>/edit")
def spa_tally_edit(aid):
    return _index_html()


@app.route("/<path:path>")
def catch_all(path):
    """静态文件优先；SPA 前端路由回退 index.html。"""
    full = os.path.join(app.static_folder, path)
    if os.path.isfile(full):
        if path == "index.html":
            return _inject_dev_auth(open(full, encoding="utf-8").read())
        return send_from_directory(app.static_folder, path)
    return _index_html()


# ===================================================================
# 启动入口
# ===================================================================

if __name__ == "__main__":
    port = 5001
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])

    print(f"[tally] 服务启动：http://localhost:{port}")
    print(f"[tally] 数据文件：{DATA_FILE}")
    print("[tally] 大屏示例：/tally/screen/3")
    print("[tally] WS 示例：ws://localhost:5001/ws/tally/activity/3")
    print("[tally] 活动管理：/admin/tally")
    # 必须用 Werkzeug threaded 开发服务器：flask_sock 的原生 WebSocket 只在它上面可用；
    # use_reloader=False 避免 Windows 上 reloader 复用 socket 句柄导致崩溃。
    app.run(host="0.0.0.0", port=port, threaded=True, debug=False, use_reloader=False)