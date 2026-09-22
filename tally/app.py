# -*- coding: utf-8 -*-
"""
tally 实时唱票 — 本地 Flask 服务器
====================================

完整复刻线上 xmyzstudent.com 的「tally 选票（实时唱票）」业务后端：

- REST 接口走 axial 前端契约（源自 assets/tally-DC36h0vE.js 的 http 客户端）：
  baseURL = /api/v2，统一响应 {code, message, data}。
- 大屏/控制台实时推送走 WebSocket，路径与源站同构：/ws/tally/activity/<id>
  （源站为 wss://api.xmyzstudent.com/ws/tally/activity/<id>）。
- 所有数据持久化到本目录单个 tally.json。

默认端口 5004（可用环境变量 PORT 覆盖）。
"""
import copy
import json
import os
import threading
from datetime import datetime

from flask import Flask, jsonify, request, send_from_directory
from flask_sock import Sock

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DATA_FILE = os.path.join(BASE_DIR, "tally.json")

PORT = int(os.environ.get("PORT", "5004"))

# 不用 Flask 自带 static 路由：它的 /<path> 处理会抢在 SPA 回退之前直接 404。
app = Flask(__name__, static_folder=None)
sock = Sock(app)

_data_lock = threading.RLock()

# activityId -> set(ws)。记录每个活动当前订阅的 WS 连接，用于广播快照。
_subscribers = {}
_subscribers_lock = threading.Lock()


# --------------------------------------------------------------------------- #
# 数据层：tally.json
# --------------------------------------------------------------------------- #
def load_store():
    """读取整个数据文件。缺文件时返回空骨架。"""
    with _data_lock:
        if not os.path.exists(DATA_FILE):
            return {"activities": [], "records": [],
                    "nextActivityId": 1, "nextCandidateId": 1, "nextRecordId": 1}
        with open(DATA_FILE, encoding="utf-8") as f:
            return json.load(f)


def save_store(store):
    """原子写回数据文件（先写临时文件再替换，避免中途损坏）。"""
    with _data_lock:
        tmp = DATA_FILE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(store, f, ensure_ascii=False, indent=2)
        os.replace(tmp, DATA_FILE)


def now_str():
    """与源站 WS 快照一致的 updatedAt 字符串格式。"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")


def find_activity(store, activity_id):
    for activity in store["activities"]:
        if activity["id"] == activity_id:
            return activity
    return None


def find_candidate(store, candidate_id):
    for activity in store["activities"]:
        for candidate in activity.get("candidates", []):
            if candidate["id"] == candidate_id:
                return activity, candidate
    return None, None


def make_snapshot(activity):
    """WS 推送的快报结构，字段与源站一致：
    {activityId, candidates:[{displayOrder,id,name,number,voteCount}], status, title, updatedAt}
    candidates 按 displayOrder 升序、字段按键序对齐源站。
    """
    candidates = sorted(activity.get("candidates", []),
                        key=lambda c: c.get("displayOrder", 0))
    return {
        "activityId": activity["id"],
        "candidates": [
            {
                "displayOrder": c["displayOrder"],
                "id": c["id"],
                "name": c["name"],
                "number": c["number"],
                "voteCount": c["voteCount"],
            }
            for c in candidates
        ],
        "status": activity["status"],
        "title": activity["title"],
        "updatedAt": activity.get("updatedAt", now_str()),
    }


def touch(activity):
    activity["updatedAt"] = now_str()


def broadcast(activity):
    """把该活动最新快照推给所有订阅的 WS 连接；失败连接顺手清理。"""
    payload = json.dumps(make_snapshot(activity), ensure_ascii=False)
    with _subscribers_lock:
        targets = list(_subscribers.get(activity["id"], set()))
    dead = []
    for ws in targets:
        try:
            ws.send(payload)
        except Exception:
            dead.append(ws)
    if dead:
        with _subscribers_lock:
            subs = _subscribers.get(activity["id"], set())
            for ws in dead:
                subs.discard(ws)


# --------------------------------------------------------------------------- #
# 统一响应封装：{code, message, data}，与源站 axios 封装保持一致
# --------------------------------------------------------------------------- #
def ok(data=None, message="ok"):
    return jsonify({"code": 200, "message": message, "data": data})


def fail(message, code=400, http_status=200):
    return jsonify({"code": code, "message": message, "data": None}), http_status


def not_found_activity():
    return fail("活动不存在", code=404, http_status=404)


# --------------------------------------------------------------------------- #
# REST 接口（baseURL = /api/v2，路径与源站逐字对应）
# --------------------------------------------------------------------------- #
# —— 活动管理页：列表 / 新建 —— #
@app.get("/api/v2/admin/tally/activities")
def list_activities():
    """GET /admin/tally/activities — 活动列表（不含候选人明细）。"""
    store = load_store()
    items = [
        {
            "id": a["id"],
            "title": a["title"],
            "status": a["status"],
            "createdAt": a.get("createdAt", ""),
            "updatedAt": a.get("updatedAt", ""),
        }
        for a in sorted(store["activities"], key=lambda x: x["id"])
    ]
    return ok(items)


@app.post("/api/v2/admin/tally/activities")
def create_activity():
    """POST /admin/tally/activities  body: {title}"""
    body = request.get_json(silent=True) or {}
    title = (body.get("title") or "").strip()
    if not title:
        return fail("标题不能为空")
    store = load_store()
    activity = {
        "id": store["nextActivityId"],
        "title": title,
        "status": 0,                      # 0 待开始 / 1 进行中 / 2 已结束
        "createdAt": now_str(),
        "updatedAt": now_str(),
        "candidates": [],
    }
    store["nextActivityId"] += 1
    store["activities"].append(activity)
    save_store(store)
    return ok(activity)


@app.get("/api/v2/admin/tally/activities/<int:aid>")
def get_activity(aid):
    """GET /admin/tally/activities/:id — 活动详情（含候选人）。"""
    store = load_store()
    activity = find_activity(store, aid)
    if not activity:
        return not_found_activity()
    return ok(make_snapshot(activity) | \
              {"createdAt": activity.get("createdAt", ""),
               "candidates": sorted(activity.get("candidates", []),
                                    key=lambda c: c.get("displayOrder", 0))})


@app.put("/api/v2/admin/tally/activities/<int:aid>")
def update_activity(aid):
    """PUT /admin/tally/activities/:id  body: {title? | status?}"""
    store = load_store()
    activity = find_activity(store, aid)
    if not activity:
        return not_found_activity()
    body = request.get_json(silent=True) or {}
    if "title" in body:
        title = (body.get("title") or "").strip()
        if not title:
            return fail("标题不能为空")
        activity["title"] = title
    if "status" in body:
        try:
            status = int(body["status"])
        except (TypeError, ValueError):
            return fail("状态值非法")
        if status not in (0, 1, 2):
            return fail("状态值非法")
        activity["status"] = status
    touch(activity)
    save_store(store)
    broadcast(activity)
    return ok(make_snapshot(activity) | {"createdAt": activity.get("createdAt", "")})


@app.delete("/api/v2/admin/tally/activities/<int:aid>")
def delete_activity(aid):
    """DELETE /admin/tally/activities/:id — 删除活动及其候选人/记录。"""
    store = load_store()
    activity = find_activity(store, aid)
    if not activity:
        return not_found_activity()
    store["activities"] = [a for a in store["activities"] if a["id"] != aid]
    store["records"] = [r for r in store["records"] if r.get("activityId") != aid]
    save_store(store)
    return ok(True)


# —— 候选人配置 —— #
@app.post("/api/v2/admin/tally/activities/<int:aid>/candidates")
def create_candidate(aid):
    """POST /admin/tally/activities/:id/candidates  body: {number, name, displayOrder}"""
    store = load_store()
    activity = find_activity(store, aid)
    if not activity:
        return not_found_activity()
    body = request.get_json(silent=True) or {}
    number = str(body.get("number") or "").strip()
    name = (body.get("name") or "").strip()
    if not number:
        return fail("编号不能为空")
    if not name:
        return fail("姓名不能为空")
    try:
        display_order = int(body.get("displayOrder") or 0)
    except (TypeError, ValueError):
        display_order = 0
    candidate = {
        "id": store["nextCandidateId"],
        "activityId": aid,
        "number": number,
        "name": name,
        "displayOrder": display_order,
        "voteCount": 0,
        "createdAt": now_str(),
    }
    store["nextCandidateId"] += 1
    activity.setdefault("candidates", []).append(candidate)
    touch(activity)
    save_store(store)
    broadcast(activity)
    return ok(candidate)


@app.put("/api/v2/admin/tally/candidates/<int:cid>")
def update_candidate(cid):
    """PUT /admin/tally/candidates/:id  body: {number?, name?, displayOrder?}"""
    store = load_store()
    activity, candidate = find_candidate(store, cid)
    if not candidate:
        return fail("候选人不存在", code=404, http_status=404)
    body = request.get_json(silent=True) or {}
    if "number" in body:
        number = str(body.get("number") or "").strip()
        if not number:
            return fail("编号不能为空")
        candidate["number"] = number
    if "name" in body:
        name = (body.get("name") or "").strip()
        if not name:
            return fail("姓名不能为空")
        candidate["name"] = name
    if "displayOrder" in body:
        try:
            candidate["displayOrder"] = int(body["displayOrder"] or 0)
        except (TypeError, ValueError):
            pass
    touch(activity)
    save_store(store)
    broadcast(activity)
    return ok(candidate)


@app.delete("/api/v2/admin/tally/candidates/<int:cid>")
def delete_candidate(cid):
    """DELETE /admin/tally/candidates/:id — 删除候选人及其唱票记录。"""
    store = load_store()
    activity, candidate = find_candidate(store, cid)
    if not candidate:
        return fail("候选人不存在", code=404, http_status=404)
    activity["candidates"] = [c for c in activity["candidates"] if c["id"] != cid]
    store["records"] = [r for r in store["records"] if r.get("candidateId") != cid]
    touch(activity)
    save_store(store)
    broadcast(activity)
    return ok(True)


# —— 唱票控制台：录票 / 撤销 / 日志 —— #
@app.post("/api/v2/admin/tally/candidates/<int:cid>/vote")
def vote_candidate(cid):
    """POST /admin/tally/candidates/:id/vote  body: {delta}
    正数加票、负数减票（最多减到 0），并写入操作记录（type=0 普通）。
    """
    body = request.get_json(silent=True) or {}
    try:
        delta = int(body.get("delta"))
    except (TypeError, ValueError):
        return fail("delta 必须为非 0 整数")
    if delta == 0:
        return fail("delta 必须为非 0 整数")

    store = load_store()
    activity, candidate = find_candidate(store, cid)
    if not candidate:
        return fail("候选人不存在", code=404, http_status=404)
    if activity["status"] != 1:
        return fail("活动不在进行中，无法录票")
    new_count = candidate["voteCount"] + delta
    if new_count < 0:
        return fail("票数不能为负数")
    candidate["voteCount"] = new_count
    record = {
        "id": store["nextRecordId"],
        "activityId": activity["id"],
        "candidateId": candidate["id"],
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,
        "type": 0,  # 0 普通录票 / 1 撤销
        "createdAt": datetime.now().isoformat(sep=" ", timespec="seconds"),
    }
    store["nextRecordId"] += 1
    store["records"].insert(0, record)  # 最新在前
    touch(activity)
    save_store(store)
    broadcast(activity)
    return ok(record)


@app.post("/api/v2/admin/tally/activities/<int:aid>/undo")
def undo_activity(aid):
    """POST /admin/tally/activities/:id/undo
    撤销最近一次的「普通」录票：回滚票数，并写入一条 type=1 的撤销记录。
    无可撤销记录时返回 data=null（前端据此提示“无可撤销操作”）。
    """
    store = load_store()
    activity = find_activity(store, aid)
    if not activity:
        return not_found_activity()
    last = next((r for r in store["records"]
                 if r.get("activityId") == aid and r.get("type") == 0), None)
    if last is None:
        return ok(None)
    if not undo_candidate_by_delta(store, records=store["records"],
                                   activity_id=aid, candidate_id=last["candidateId"],
                                   delta=-last["delta"],
                                   undo_reason=f"撤销 {last['candidateName']} 的 {last['delta']}"):
        return fail("撤销失败：候选人已不存在")
    activity = find_activity(store, aid)
    touch(activity)
    save_store(store)
    broadcast(activity)
    # data 返回刚写入的撤销记录（前端只需 truthy）
    return ok(find_latest_undo_record(store, aid))


def undo_candidate_by_delta(store, records, activity_id, candidate_id, delta, undo_reason):
    activity, candidate = find_candidate(store, candidate_id)
    if not candidate or candidate.get("activityId") != activity_id:
        return False
    candidate["voteCount"] = max(0, candidate["voteCount"] + delta)
    record = {
        "id": store["nextRecordId"],
        "activityId": activity_id,
        "candidateId": candidate["id"],
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,               # 与撤销的 delta 反向
        "type": 1,                    # 1 撤销
        "createdAt": datetime.now().isoformat(sep=" ", timespec="seconds"),
    }
    store["nextRecordId"] += 1
    records.insert(0, record)
    return True


def find_latest_undo_record(store, aid):
    for r in store["records"]:
        if r.get("activityId") == aid and r.get("type") == 1:
            return r
    return None


@app.get("/api/v2/admin/tally/activities/<int:aid>/records")
def list_records(aid):
    """GET /admin/tally/activities/:id/records — 操作日志（最新在前）。"""
    store = load_store()
    records = [r for r in store["records"] if r.get("activityId") == aid]
    return ok(records)


# --------------------------------------------------------------------------- #
# WebSocket：大屏 / 控制台实时推送（路径与源站同构）
# --------------------------------------------------------------------------- #
@sock.route("/ws/tally/activity/<int:aid>")
def tally_ws(ws, aid):
    """/ws/tally/activity/<id>
    连接即推送当前快照；此后该活动任何变动都会向订阅者广播同构快照。
    socket 无入站消息协议，收到客户端消息直接忽略（仅用于保活）。
    """
    store = load_store()
    activity = find_activity(store, aid)
    try:
        if activity:
            ws.send(json.dumps(make_snapshot(activity), ensure_ascii=False))
    except Exception:
        return
    if activity:
        with _subscribers_lock:
            _subscribers.setdefault(aid, set()).add(ws)
    try:
        while True:
            try:
                msg = ws.receive(timeout=30)
            except Exception:
                break
            if msg is None:  # 对端关闭
                break
            # 本业务无客户端上行消息；收到内容无视。
    finally:
        with _subscribers_lock:
            subs = _subscribers.get(aid)
            if subs:
                subs.discard(ws)


# --------------------------------------------------------------------------- #
# 前端静态托管 + SPA 回退
# --------------------------------------------------------------------------- #
@app.get("/")
def index_page():
    return send_from_directory(STATIC_DIR, "index.html")


@app.get("/<path:path>")
def spa_fallback(path):
    full = os.path.join(STATIC_DIR, path)
    if os.path.isfile(full):
        return send_from_directory(STATIC_DIR, path)
    # Vue Router history 模式：未知路径一律回退到 index.html
    return send_from_directory(STATIC_DIR, "index.html")


if __name__ == "__main__":
    print(f"tally 服务器启动 : http://127.0.0.1:{PORT}")
    print(f"  活动管理页      /admin/tally")
    print(f"  大屏（示例）    /tally/screen/1")
    print(f"  WS 地址（同构） ws://127.0.0.1:{PORT}/ws/tally/activity/<id>")
    # threaded=True 让每个 WS 连接独立线程，不被其他请求阻塞
    app.run(host="0.0.0.0", port=PORT, threaded=True)
