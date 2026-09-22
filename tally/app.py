"""tally 选票（实时唱票）业务 —— 本地 Flask 完整复刻。

复刻对象：xmyzstudent.com 的「实时唱票」业务（源站 API 基址 https://api.xmyzstudent.com/api/v2，
WS 地址 wss://api.xmyzstudent.com/ws/tally/activity/:id）。

本服务提供：
  1. 12 个 REST 接口，路径/方法/出入参与源站逐字对应（本地以 /api/v2 为前缀，即源站 baseURL 去掉域名）；
  2. 1 个 WebSocket 地址 /ws/tally/activity/:id，与源站路径同构，连接后立即推送全量快照，
     之后每次录票/撤销/增删改候选人或活动都会向该活动的全部连接广播新快照（大屏实时刷新靠此推送）；
  3. 静态前端子集（static/）：原样复用站点镜像的 html/css/js（仅 tally 相关最小集），
     由本服务托管并按 SPA 路由回退提供 index.html。

存储：单个 tally.json 文件（活动、候选人、票数、操作记录、自增序列），进程内加锁读写。

运行：python app.py [--port N]    未指定端口时自动挑选随机可用端口（占用则重试）。
"""
from __future__ import annotations

import argparse
import json
import random
import socket
import threading
import time
from datetime import datetime
from pathlib import Path

from flask import Flask, Blueprint, jsonify, request, send_from_directory
from flask_sock import Sock

# ---------------------------------------------------------------------------
# 路径与常量
# ---------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DATA_FILE = BASE_DIR / "tally.json"

#: 源站业务状态机：0=待开始 1=进行中 2=已结束（与前端 select 选项逐一对应）
STATUS_PENDING, STATUS_LIVE, STATUS_ENDED = 0, 1, 2
STATUS_VALUES = (STATUS_PENDING, STATUS_LIVE, STATUS_ENDED)

#: 操作记录类型：0=普通录票 1=撤销（与前端日志「撤销/普通」标签对应）
RECORD_NORMAL, RECORD_UNDO = 0, 1

#: 源站 WS 路径同构：/ws/tally/activity/:id
WS_PATH_PREFIX = "/ws/tally/activity"

app = Flask(__name__)
sock = Sock(app)

# ---------------------------------------------------------------------------
# 存储层：tally.json 单文件 + 进程内锁
# ---------------------------------------------------------------------------

_data_lock = threading.RLock()


def _now() -> str:
    """与源站快照 updatedAt 一致的时间格式（Python 微秒精度）。"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")


def load_data() -> dict:
    with _data_lock:
        return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def save_data(data: dict) -> None:
    """持久化到 tally.json。

    Windows 上 os.replace 可能因临时文件被杀毒/索引进程短暂锁住而 WinError 5，
    因此退避重试若干次，仍失败则退化为直接写目标文件（非原子，但保证不丢数据）。
    """
    with _data_lock:
        payload = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        tmp = DATA_FILE.with_suffix(".json.tmp")
        last_error: OSError | None = None
        for attempt in range(6):
            try:
                tmp.write_text(payload, encoding="utf-8")
                tmp.replace(DATA_FILE)
                return
            except PermissionError as err:  # Windows 文件锁竞争
                last_error = err
                time.sleep(0.05 * (attempt + 1))
        try:
            DATA_FILE.write_text(payload, encoding="utf-8")
        except OSError:
            raise last_error  # type: ignore[misc]


def _find_activity(data: dict, activity_id: int) -> dict | None:
    for activity in data["activities"]:
        if activity["id"] == activity_id:
            return activity
    return None


def _find_candidate(data: dict, candidate_id: int) -> tuple[dict, dict] | None:
    """返回 (所在活动, 候选人)；找不到返回 None。"""
    for activity in data["activities"]:
        for candidate in activity["candidates"]:
            if candidate["id"] == candidate_id:
                return activity, candidate
    return None


def _activity_records(data: dict, activity_id: int) -> list[dict]:
    """某活动的操作记录，按发生顺序（id 升序）返回。"""
    return [r for r in data["records"] if r["activityId"] == activity_id]


# ---------------------------------------------------------------------------
# WebSocket 连接注册表与广播
# ---------------------------------------------------------------------------

_registry_lock = threading.Lock()
_connections: dict[int, set] = {}  # activity_id -> {ws 连接}


def _register(activity_id: int, ws) -> None:
    with _registry_lock:
        _connections.setdefault(activity_id, set()).add(ws)


def _unregister(activity_id: int, ws) -> None:
    with _registry_lock:
        conns = _connections.get(activity_id)
        if conns:
            conns.discard(ws)
            if not conns:
                _connections.pop(activity_id, None)


def build_snapshot(activity_id: int) -> dict:
    """构造 WS 推送的全量快照，字段与源站逐字对应：
    {activityId, candidates[{displayOrder,id,name,number,voteCount}], status, title, updatedAt}
    活动不存在时返回一个「兜底快照」（status=2、空候选人），让前端大屏优雅渲染而不是无限重连。
    """
    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return {
            "activityId": activity_id,
            "candidates": [],
            "status": STATUS_ENDED,
            "title": "活动不存在或已删除",
            "updatedAt": _now(),
        }
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
            for c in sorted(activity["candidates"], key=lambda c: c["displayOrder"])
        ],
        "status": activity["status"],
        "title": activity["title"],
        "updatedAt": activity["updatedAt"],
    }


def broadcast(activity_id: int) -> None:
    """向某活动的全部 WS 连接广播最新快照（录票/撤销/CRUD 后调用）。"""
    snapshot = build_snapshot(activity_id)
    payload = json.dumps(snapshot, ensure_ascii=False)
    with _registry_lock:
        conns = list(_connections.get(activity_id, ()))
    for ws in conns:
        try:
            ws.send(payload)
        except Exception:
            _unregister(activity_id, ws)


def close_activity_connections(activity_id: int) -> None:
    """活动删除后关闭其全部 WS 连接（前端会自动重连，重连后拿到「不存在」兜底快照）。"""
    with _registry_lock:
        conns = list(_connections.pop(activity_id, ()))
    for ws in conns:
        try:
            ws.close()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# REST 接口（Blueprint 挂到 /api/v2，对应源站 baseURL）
# ---------------------------------------------------------------------------

api = Blueprint("tally_api", __name__)


def ok(data, message: str = "ok"):
    return jsonify({"code": 200, "message": message, "data": data})


def fail(http_status: int, code: int, message: str):
    return jsonify({"code": code, "message": message, "data": None}), http_status


def _json_body() -> dict:
    return request.get_json(silent=True) or {}


def _validate_status(value) -> int | None:
    try:
        status = int(value)
    except (TypeError, ValueError):
        return None
    return status if status in STATUS_VALUES else None


# ---- 活动管理 ----

@api.get("/admin/tally/activities")
def list_activities():
    """活动列表（管理页表格）。返回不含 candidates 的摘要，附带候选人数与总票数。"""
    data = load_data()
    items = [
        {
            "id": a["id"],
            "title": a["title"],
            "status": a["status"],
            "createdAt": a["createdAt"],
            "updatedAt": a["updatedAt"],
            "candidateCount": len(a["candidates"]),
            "totalVotes": sum(c["voteCount"] for c in a["candidates"]),
        }
        for a in sorted(data["activities"], key=lambda a: a["id"])
    ]
    return ok(items)


@api.post("/admin/tally/activities")
def create_activity():
    """新建活动。请求体 { title }；新活动状态为 0（待开始）。"""
    body = _json_body()
    title = str(body.get("title") or "").strip()
    if not title:
        return fail(400, 400, "请输入活动标题")
    data = load_data()
    now = _now()
    activity = {
        "id": data["sequences"]["activity"],
        "title": title,
        "status": STATUS_PENDING,
        "createdAt": now,
        "updatedAt": now,
        "candidates": [],
    }
    data["sequences"]["activity"] += 1
    data["activities"].append(activity)
    save_data(data)
    return ok(activity, "已创建")


@api.get("/admin/tally/activities/<int:activity_id>")
def get_activity(activity_id: int):
    """活动详情（含候选人，配置页数据源）。"""
    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return fail(404, 404, "活动不存在")
    return ok(activity)


@api.put("/admin/tally/activities/<int:activity_id>")
def update_activity(activity_id: int):
    """更新活动。请求体支持部分字段 { title } / { status }。"""
    body = _json_body()
    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return fail(404, 404, "活动不存在")

    if "title" in body:
        title = str(body.get("title") or "").strip()
        if not title:
            return fail(400, 400, "标题不能为空")
        activity["title"] = title
    if "status" in body:
        status = _validate_status(body.get("status"))
        if status is None:
            return fail(400, 400, "非法状态值")
        activity["status"] = status

    activity["updatedAt"] = _now()
    save_data(data)
    broadcast(activity_id)
    return ok(activity, "已更新")


@api.delete("/admin/tally/activities/<int:activity_id>")
def delete_activity(activity_id: int):
    """删除活动：候选人与唱票记录级联删除（与前端确认文案一致）。"""
    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return fail(404, 404, "活动不存在")
    data["activities"] = [a for a in data["activities"] if a["id"] != activity_id]
    data["records"] = [r for r in data["records"] if r["activityId"] != activity_id]
    save_data(data)
    close_activity_connections(activity_id)
    return ok(None, "已删除")


# ---- 候选人管理 ----

@api.post("/admin/tally/activities/<int:activity_id>/candidates")
def create_candidate(activity_id: int):
    """新增候选人。请求体 { number, name, displayOrder }，票数从 0 开始。"""
    body = _json_body()
    number = str(body.get("number") or "").strip()
    name = str(body.get("name") or "").strip()
    if not number:
        return fail(400, 400, "请输入编号")
    if not name:
        return fail(400, 400, "请输入姓名")
    try:
        display_order = int(body.get("displayOrder") or 0)
    except (TypeError, ValueError):
        display_order = 0

    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return fail(404, 404, "活动不存在")
    candidate = {
        "id": data["sequences"]["candidate"],
        "number": number,
        "name": name,
        "displayOrder": display_order,
        "voteCount": 0,
    }
    data["sequences"]["candidate"] += 1
    activity["candidates"].append(candidate)
    activity["updatedAt"] = _now()
    save_data(data)
    broadcast(activity_id)
    return ok(candidate, "已添加")


@api.put("/admin/tally/candidates/<int:candidate_id>")
def update_candidate(candidate_id: int):
    """更新候选人。请求体 { number, name, displayOrder }（票数不可直接改，只能录票/撤销）。"""
    body = _json_body()
    data = load_data()
    found = _find_candidate(data, candidate_id)
    if found is None:
        return fail(404, 404, "候选人不存在")
    activity, candidate = found

    if "number" in body:
        number = str(body.get("number") or "").strip()
        if not number:
            return fail(400, 400, "请输入编号")
        candidate["number"] = number
    if "name" in body:
        name = str(body.get("name") or "").strip()
        if not name:
            return fail(400, 400, "请输入姓名")
        candidate["name"] = name
    if "displayOrder" in body:
        try:
            candidate["displayOrder"] = int(body.get("displayOrder") or 0)
        except (TypeError, ValueError):
            candidate["displayOrder"] = 0

    activity["updatedAt"] = _now()
    save_data(data)
    broadcast(activity["id"])
    return ok(candidate, "已更新")


@api.delete("/admin/tally/candidates/<int:candidate_id>")
def delete_candidate(candidate_id: int):
    """删除候选人：其历史唱票记录级联删除（与前端确认文案一致）。"""
    data = load_data()
    found = _find_candidate(data, candidate_id)
    if found is None:
        return fail(404, 404, "候选人不存在")
    activity, candidate = found
    activity["candidates"] = [c for c in activity["candidates"] if c["id"] != candidate_id]
    data["records"] = [r for r in data["records"] if r["candidateId"] != candidate_id]
    activity["updatedAt"] = _now()
    save_data(data)
    broadcast(activity["id"])
    return ok(None, "已删除")


# ---- 唱票 / 撤销 / 日志 ----

@api.post("/admin/tally/candidates/<int:candidate_id>/vote")
def vote_candidate(candidate_id: int):
    """录票。请求体 { delta }（非 0 整数，可为负）；仅当活动「进行中」可录票。
    写票数、追加操作记录，并向该活动全部 WS 连接广播新快照。
    """
    body = _json_body()
    raw_delta = body.get("delta")
    try:
        delta = int(raw_delta)
    except (TypeError, ValueError):
        return fail(400, 400, "票数变化必须为整数")
    if delta == 0:
        return fail(400, 400, "票数变化不能为 0")

    data = load_data()
    found = _find_candidate(data, candidate_id)
    if found is None:
        return fail(404, 404, "候选人不存在")
    activity, candidate = found
    if activity["status"] != STATUS_LIVE:
        return fail(400, 400, "活动未在进行中，无法录票")

    candidate["voteCount"] += delta
    now = _now()
    activity["updatedAt"] = now
    record = {
        "id": data["sequences"]["record"],
        "activityId": activity["id"],
        "candidateId": candidate["id"],
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": delta,
        "type": RECORD_NORMAL,
        "createdAt": now,
    }
    data["sequences"]["record"] += 1
    data["records"].append(record)
    save_data(data)
    broadcast(activity["id"])
    return ok(candidate, "录票成功")


@api.post("/admin/tally/activities/<int:activity_id>/undo")
def undo_last(activity_id: int):
    """撤销最近一次录票。
    语义（栈式）：只看最后一条记录 —— 是普通录票则冲销票数并追加一条 type=1 的撤销记录；
    最后一条已是撤销记录（或没有记录）则无可撤销，data 返回 null。
    响应 data 非空即「已撤销」，为空即「无可撤销操作」（与前端 toast 分支对应）。
    """
    data = load_data()
    activity = _find_activity(data, activity_id)
    if activity is None:
        return fail(404, 404, "活动不存在")

    records = _activity_records(data, activity_id)
    if not records or records[-1]["type"] != RECORD_NORMAL:
        return ok(None, "无可撤销操作")

    last = records[-1]
    candidate = next((c for c in activity["candidates"] if c["id"] == last["candidateId"]), None)
    if candidate is None:  # 候选人已被删除，记录失去依附：无可撤销
        return ok(None, "无可撤销操作")

    candidate["voteCount"] -= last["delta"]
    now = _now()
    activity["updatedAt"] = now
    record = {
        "id": data["sequences"]["record"],
        "activityId": activity["id"],
        "candidateId": candidate["id"],
        "candidateNumber": candidate["number"],
        "candidateName": candidate["name"],
        "delta": -last["delta"],
        "type": RECORD_UNDO,
        "createdAt": now,
    }
    data["sequences"]["record"] += 1
    data["records"].append(record)
    save_data(data)
    broadcast(activity["id"])
    return ok(record, "已撤销最近一次操作")


@api.get("/admin/tally/activities/<int:activity_id>/records")
def list_records(activity_id: int):
    """操作日志（控制台展示用，最新在前）。"""
    data = load_data()
    if _find_activity(data, activity_id) is None:
        return fail(404, 404, "活动不存在")
    records = sorted(_activity_records(data, activity_id), key=lambda r: r["id"], reverse=True)
    return ok(records)


@api.route("/<path:_unmatched>", methods=["GET", "POST", "PUT", "DELETE"])
def api_unmatched(_unmatched: str):
    """/api/v2 下未命中的路径：返回 404 JSON（不要回退成 HTML，避免误导调用方）。"""
    return fail(404, 404, "接口不存在")


@api.errorhandler(500)
def _api_internal_error(_err):
    """未预期异常统一返回 JSON（与前端 code/message 约定一致）。"""
    return jsonify({"code": 500, "message": "服务器内部错误", "data": None}), 500


app.register_blueprint(api, url_prefix="/api/v2")


# ---------------------------------------------------------------------------
# WebSocket：/ws/tally/activity/:id（与源站同构）
# ---------------------------------------------------------------------------

@sock.route(f"{WS_PATH_PREFIX}/<int:activity_id>")
def tally_socket(ws, activity_id: int):
    """实时唱票通道。

    源站行为（由 useTallySocket 反推）：连接建立后服务端立即推送一次全量快照；
    之后仅在数据变化时推送新快照；无应用层心跳，前端靠 onclose + 指数退避重连保活。
    本地复刻同样语义：连接即推快照，任何变更广播快照。
    """
    _register(activity_id, ws)
    try:
        ws.send(json.dumps(build_snapshot(activity_id), ensure_ascii=False))
        while True:
            ws.receive()  # 阻塞至连接关闭；客户端无需上行消息，收到即忽略
    except Exception:
        pass
    finally:
        _unregister(activity_id, ws)


# ---------------------------------------------------------------------------
# 静态前端子集 + SPA 路由回退
# ---------------------------------------------------------------------------

#: 需要回退到 index.html 的前端路由（与源站 Vue Router 中 tally 相关的 4 条同构）
SPA_ROUTES = (
    "/",
    "/admin/tally",
    "/admin/tally/activities/<int:activity_id>/edit",
    "/admin/tally/activities/<int:activity_id>/control",
    "/tally/screen/<int:activity_id>",
)


def render_index() -> str:
    """返回 SPA 外壳 index.html，并在主 bundle 前注入仓库自带的登录态解锁脚本
    （tools/dev-auth.js 原样复制到 static/）：源站 49 条 admin 路由有 requiresAuth 守卫，
    本地无真实账号体系，用该脚本写入本地会话放行守卫；加 ?devauth=0 可关闭。"""
    html = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    inject = '<script src="/dev-auth.js"></script>\n    '
    marker = '<script type="module"'
    if inject not in html:
        html = html.replace(marker, inject + marker, 1)
    return html


def _register_spa_routes() -> None:
    for rule in SPA_ROUTES:
        if rule == "/":
            continue  # 根路由由下方专用视图 index() 提供
        def handler(**kwargs):
            return render_index()
        app.add_url_rule(rule, endpoint=f"spa:{rule}", view_func=handler)


_register_spa_routes()


@app.get("/<path:path>")
def static_or_fallback(path: str):
    """静态文件优先；找不到则回退 index.html（SPA 通配，行为与源站 nginx try_files 一致）。
    /api 与 /ws 前缀绝不回退成 HTML（REST 未命中应得 404 JSON，由 api_unmatched 处理）。"""
    if path.startswith(("api/", "api", "ws/", "ws")):
        return jsonify({"code": 404, "message": "接口不存在", "data": None}), 404
    candidate = STATIC_DIR / path
    if candidate.is_file():
        return send_from_directory(STATIC_DIR, path)
    return render_index()


@app.get("/")
def index():
    return render_index()


# ---------------------------------------------------------------------------
# 启动：随机可用端口（用户未提供时）
# ---------------------------------------------------------------------------

def pick_free_port() -> int:
    """随机挑选一个可用端口；被占用则重试（README 要求：未提供端口时用随机端口并检测可用性）。"""
    for _ in range(50):
        port = random.randint(20000, 40000)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(("0.0.0.0", port))
                return port
            except OSError:
                continue
    raise SystemExit("未能找到可用端口")


def main() -> None:
    parser = argparse.ArgumentParser(description="tally 选票业务本地 Flask 服务")
    parser.add_argument("--port", type=int, default=None, help="监听端口（默认随机可用端口）")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址（默认 127.0.0.1）")
    args = parser.parse_args()

    port = args.port or pick_free_port()
    print(f"tally 服务启动: http://{args.host}:{port}")
    print(f"  活动管理   : http://{args.host}:{port}/admin/tally")
    print(f"  大屏示例   : http://{args.host}:{port}/tally/screen/1")
    print(f"  WS 地址    : ws://{args.host}:{port}{WS_PATH_PREFIX}/<id>")
    app.run(host=args.host, port=port, threaded=True)


if __name__ == "__main__":
    main()
