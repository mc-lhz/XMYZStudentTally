"""
Tally 选票业务 Flask 后端服务器
================================
完整复刻 xmyzstudent.com 的「tally 选票（实时唱票）」业务。

功能模块：
  1. 活动管理页 - 活动的增删改查、状态切换、列表展示
  2. 唱票控制台 - 现场录票、撤销、操作日志
  3. 大屏 - 实时展示唱票结果（WebSocket 推送）

启动方式：
  python app.py
  服务监听 0.0.0.0:5002

接口契约（与源站逐字对应）：
  GET    /api/v2/admin/tally/activities          获取活动列表
  GET    /api/v2/admin/tally/activities/:id      获取单个活动
  POST   /api/v2/admin/tally/activities          创建活动
  PUT    /api/v2/admin/tally/activities/:id      更新活动
  DELETE /api/v2/admin/tally/activities/:id      删除活动
  POST   /api/v2/admin/tally/activities/:id/candidates   添加候选人
  PUT    /api/v2/admin/tally/candidates/:id      更新候选人
  DELETE /api/v2/admin/tally/candidates/:id      删除候选人
  POST   /api/v2/admin/tally/candidates/:id/vote 投票（+delta）
  POST   /api/v2/admin/tally/activities/:id/undo 撤销上一步
  GET    /api/v2/admin/tally/activities/:id/records 获取操作记录
  WS     /ws/tally/activity/:id                 大屏实时推送
"""

import json
import os
from datetime import datetime, timezone
from threading import Lock

from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_sock import Sock

# ---------------------------------------------------------------------------
# 配置
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TALLY_DATA_FILE = os.path.join(BASE_DIR, "tally.json")
PORT = 5003

app = Flask(__name__)
sock = Sock(app)

# 数据锁：保证并发写入时的线程安全
_data_lock = Lock()

# WebSocket 连接池：activity_id -> set of WebSocket 实例
_ws_connections: dict[int, set] = {}


# ---------------------------------------------------------------------------
# 数据持久化
# ---------------------------------------------------------------------------
def _load_data() -> dict:
    """从 tally.json 读取全部数据"""
    if os.path.exists(TALLY_DATA_FILE):
        with open(TALLY_DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"activities": [], "candidates": [], "records": [], "_next_activity_id": 1,
            "_next_candidate_id": 1, "_next_record_id": 1}


def _save_data(data: dict) -> None:
    """将全部数据写入 tally.json"""
    with open(TALLY_DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _now_iso() -> str:
    """返回当前 UTC 时间的 ISO-8601 字符串"""
    return datetime.now(timezone.utc).isoformat()


# ---------------------------------------------------------------------------
# WebSocket 广播
# ---------------------------------------------------------------------------
def _broadcast(activity_id: int) -> None:
    """向该活动的所有 WebSocket 客户端广播当前快照"""
    snapshot = _build_snapshot(activity_id)
    payload = json.dumps(snapshot, ensure_ascii=False)
    dead: list = []
    for ws in _ws_connections.get(activity_id, set()):
        try:
            ws.send(payload)
        except Exception:
            dead.append(ws)
    for ws in dead:
        _ws_connections.get(activity_id, set()).discard(ws)


def _build_snapshot(activity_id: int) -> dict:
    """构建活动的实时快照（供大屏消费）"""
    data = _load_data()
    activity = None
    for a in data["activities"]:
        if a["id"] == activity_id:
            activity = a
            break
    if activity is None:
        return {}
    candidates = [
        c for c in data["candidates"] if c["activityId"] == activity_id
    ]
    candidates.sort(key=lambda c: c["displayOrder"])
    return {
        "id": activity["id"],
        "title": activity["title"],
        "status": activity["status"],
        "createdAt": activity["createdAt"],
        "candidates": [
            {
                "id": c["id"],
                "activityId": c["activityId"],
                "number": c["number"],
                "name": c["name"],
                "displayOrder": c["displayOrder"],
                "voteCount": c["voteCount"],
            }
            for c in candidates
        ],
    }


# ---------------------------------------------------------------------------
# REST API — 活动管理
# ---------------------------------------------------------------------------
@app.route("/api/v2/admin/tally/activities", methods=["GET"])
def api_list_activities():
    """获取活动列表"""
    data = _load_data()
    activities = data["activities"]
    # 附加每个活动的候选人数量和总票数
    result = []
    for a in activities:
        candidates = [c for c in data["candidates"] if c["activityId"] == a["id"]]
        total_votes = sum(c["voteCount"] for c in candidates)
        result.append({
            **a,
            "candidateCount": len(candidates),
            "totalVotes": total_votes,
        })
    return jsonify({"code": 200, "data": result, "message": "ok"})


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["GET"])
def api_get_activity(activity_id: int):
    """获取单个活动详情（含候选人列表）"""
    data = _load_data()
    for a in data["activities"]:
        if a["id"] == activity_id:
            candidates = [
                c for c in data["candidates"] if c["activityId"] == activity_id
            ]
            candidates.sort(key=lambda c: c["displayOrder"])
            return jsonify({
                "code": 200,
                "data": {**a, "candidates": candidates},
                "message": "ok",
            })
    return jsonify({"code": 404, "data": None, "message": "活动不存在"})


@app.route("/api/v2/admin/tally/activities", methods=["POST"])
def api_create_activity():
    """创建新活动"""
    body = request.get_json(silent=True) or {}
    title = (body.get("title") or "").strip()
    if not title:
        return jsonify({"code": 400, "data": None, "message": "标题不能为空"})
    data = _load_data()
    activity_id = data["_next_activity_id"]
    data["_next_activity_id"] = activity_id + 1
    now = _now_iso()
    activity = {
        "id": activity_id,
        "title": title,
        "status": 0,  # 0=待开始
        "createdAt": now,
        "updatedAt": now,
    }
    data["activities"].append(activity)
    _save_data(data)
    return jsonify({"code": 200, "data": activity, "message": "ok"})


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["PUT"])
def api_update_activity(activity_id: int):
    """更新活动（标题/状态）"""
    body = request.get_json(silent=True) or {}
    data = _load_data()
    for a in data["activities"]:
        if a["id"] == activity_id:
            if "title" in body:
                a["title"] = body["title"]
            if "status" in body:
                a["status"] = body["status"]
            a["updatedAt"] = _now_iso()
            _save_data(data)
            # 通知大屏状态变更
            _broadcast(activity_id)
            return jsonify({"code": 200, "data": a, "message": "ok"})
    return jsonify({"code": 404, "data": None, "message": "活动不存在"})


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["DELETE"])
def api_delete_activity(activity_id: int):
    """删除活动及其候选人和记录"""
    data = _load_data()
    found = False
    for i, a in enumerate(data["activities"]):
        if a["id"] == activity_id:
            data["activities"].pop(i)
            found = True
            break
    if not found:
        return jsonify({"code": 404, "data": None, "message": "活动不存在"})
    data["candidates"] = [
        c for c in data["candidates"] if c["activityId"] != activity_id
    ]
    data["records"] = [
        r for r in data["records"] if r["activityId"] != activity_id
    ]
    _save_data(data)
    return jsonify({"code": 200, "data": True, "message": "ok"})


# ---------------------------------------------------------------------------
# REST API — 候选人管理
# ---------------------------------------------------------------------------
@app.route("/api/v2/admin/tally/activities/<int:activity_id>/candidates",
           methods=["POST"])
def api_create_candidate(activity_id: int):
    """为活动添加候选人"""
    body = request.get_json(silent=True) or {}
    number = (body.get("number") or "").strip()
    name = (body.get("name") or "").strip()
    display_order = body.get("displayOrder", 0)
    if not number:
        return jsonify({"code": 400, "data": None, "message": "编号不能为空"})
    if not name:
        return jsonify({"code": 400, "data": None, "message": "姓名不能为空"})
    data = _load_data()
    # 检查活动是否存在
    activity_exists = any(a["id"] == activity_id for a in data["activities"])
    if not activity_exists:
        return jsonify({"code": 404, "data": None, "message": "活动不存在"})
    candidate_id = data["_next_candidate_id"]
    data["_next_candidate_id"] = candidate_id + 1
    candidate = {
        "id": candidate_id,
        "activityId": activity_id,
        "number": number,
        "name": name,
        "displayOrder": int(display_order),
        "voteCount": 0,
    }
    data["candidates"].append(candidate)
    _save_data(data)
    _broadcast(activity_id)
    return jsonify({"code": 200, "data": candidate, "message": "ok"})


@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>", methods=["PUT"])
def api_update_candidate(candidate_id: int):
    """更新候选人信息"""
    body = request.get_json(silent=True) or {}
    data = _load_data()
    for c in data["candidates"]:
        if c["id"] == candidate_id:
            if "number" in body:
                c["number"] = body["number"]
            if "name" in body:
                c["name"] = body["name"]
            if "displayOrder" in body:
                c["displayOrder"] = int(body["displayOrder"])
            _save_data(data)
            _broadcast(c["activityId"])
            return jsonify({"code": 200, "data": c, "message": "ok"})
    return jsonify({"code": 404, "data": None, "message": "候选人不存在"})


@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>",
           methods=["DELETE"])
def api_delete_candidate(candidate_id: int):
    """删除候选人"""
    data = _load_data()
    activity_id = None
    for i, c in enumerate(data["candidates"]):
        if c["id"] == candidate_id:
            activity_id = c["activityId"]
            data["candidates"].pop(i)
            break
    if activity_id is None:
        return jsonify({"code": 404, "data": None, "message": "候选人不存在"})
    data["records"] = [
        r for r in data["records"] if r["candidateId"] != candidate_id
    ]
    _save_data(data)
    _broadcast(activity_id)
    return jsonify({"code": 200, "data": True, "message": "ok"})


# ---------------------------------------------------------------------------
# REST API — 录票与撤销
# ---------------------------------------------------------------------------
@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>/vote",
           methods=["POST"])
def api_vote(candidate_id: int):
    """为候选人投票（delta 可为正或负）"""
    body = request.get_json(silent=True) or {}
    delta = body.get("delta", 0)
    try:
        delta = int(delta)
    except (TypeError, ValueError):
        return jsonify({"code": 400, "data": None, "message": "delta 必须是整数"})
    if delta == 0:
        return jsonify({"code": 400, "data": None, "message": "delta 不能为 0"})
    data = _load_data()
    candidate = None
    for c in data["candidates"]:
        if c["id"] == candidate_id:
            candidate = c
            break
    if candidate is None:
        return jsonify({"code": 404, "data": None, "message": "候选人不存在"})
    candidate["voteCount"] = max(0, candidate["voteCount"] + delta)
    # 记录操作
    record_id = data["_next_record_id"]
    data["_next_record_id"] = record_id + 1
    record = {
        "id": record_id,
        "activityId": candidate["activityId"],
        "candidateId": candidate_id,
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,
        "type": 0,  # 0=普通操作
        "createdAt": _now_iso(),
    }
    data["records"].append(record)
    _save_data(data)
    _broadcast(candidate["activityId"])
    return jsonify({"code": 200, "data": record, "message": "ok"})


@app.route("/api/v2/admin/tally/activities/<int:activity_id>/undo",
           methods=["POST"])
def api_undo(activity_id: int):
    """撤销活动的最近一次操作"""
    data = _load_data()
    # 找到该活动最近一条非撤销记录
    activity_records = [
        r for r in data["records"]
        if r["activityId"] == activity_id and r["type"] == 0
    ]
    if not activity_records:
        return jsonify({"code": 200, "data": False, "message": "无可撤销操作"})
    last_record = activity_records[-1]
    # 反向恢复票数
    candidate = None
    for c in data["candidates"]:
        if c["id"] == last_record["candidateId"]:
            candidate = c
            break
    if candidate:
        candidate["voteCount"] = max(0, candidate["voteCount"] - last_record["delta"])
    # 标记原记录为撤销
    last_record["type"] = 1
    # 新增一条撤销记录
    record_id = data["_next_record_id"]
    data["_next_record_id"] = record_id + 1
    undo_record = {
        "id": record_id,
        "activityId": activity_id,
        "candidateId": last_record["candidateId"],
        "candidateNumber": last_record["candidateNumber"],
        "candidateName": last_record["candidateName"],
        "delta": -last_record["delta"],
        "type": 1,  # 1=撤销
        "createdAt": _now_iso(),
    }
    data["records"].append(undo_record)
    _save_data(data)
    _broadcast(activity_id)
    return jsonify({"code": 200, "data": True, "message": "ok"})


@app.route("/api/v2/admin/tally/activities/<int:activity_id>/records",
           methods=["GET"])
def api_get_records(activity_id: int):
    """获取活动的操作记录列表"""
    data = _load_data()
    records = [
        r for r in data["records"] if r["activityId"] == activity_id
    ]
    # 按时间倒序排列（最新在前）
    records.sort(key=lambda r: r["createdAt"], reverse=True)
    return jsonify({"code": 200, "data": records, "message": "ok"})


# ---------------------------------------------------------------------------
# WebSocket — 大屏实时推送
# ---------------------------------------------------------------------------
@sock.route("/ws/tally/activity/<int:activity_id>")
def ws_tally_activity(ws, activity_id: int):
    """
    大屏 WebSocket 端点。

    握手完成后：
      1. 立即发送当前活动的完整快照（含所有候选人与票数）
      2. 后续每当有录票/撤销操作，自动推送更新后的快照

    前端重连策略（useTallySocket）：
      - 断线后指数退避重连（1s → 2s → 4s → ... → 30s 上限）
      - 重连成功后退避重置为 1s
    """
    # 加入连接池
    if activity_id not in _ws_connections:
        _ws_connections[activity_id] = set()
    _ws_connections[activity_id].add(ws)
    try:
        # 立即发送当前快照
        snapshot = _build_snapshot(activity_id)
        ws.send(json.dumps(snapshot, ensure_ascii=False))
        # 保持连接，等待客户端消息或断开
        while True:
            # 保持连接活性（客户端发心跳或服务端等待关闭）
            msg = ws.receive(timeout=60)
            if msg is None:
                break
    except Exception:
        pass
    finally:
        # 离开连接池
        _ws_connections.get(activity_id, set()).discard(ws)


# ---------------------------------------------------------------------------
# SPA 路由回退 — 非 API / 非 WebSocket 请求一律返回 index.html
# ---------------------------------------------------------------------------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa_fallback(path):
    """
    SPA 路由回退：
      - 如果请求的路径对应 static/ 下的文件，直接返回
      - 否则返回 index.html，交给前端路由处理
    """
    if path:
        file_path = os.path.join(STATIC_DIR, path)
        if os.path.isfile(file_path):
            return send_from_directory(STATIC_DIR, path)
    return send_file(os.path.join(STATIC_DIR, "index.html"))


# ---------------------------------------------------------------------------
# 入口
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print(f"========================================")
    print(f"  Tally 选票业务后端服务")
    print(f"  http://localhost:{PORT}")
    print(f"  API: /api/v2/admin/tally/...")
    print(f"  WS:  ws://localhost:{PORT}/ws/tally/activity/:id")
    print(f"========================================")
    app.run(host="0.0.0.0", port=PORT, debug=True)
