# -*- coding: utf-8 -*-
"""
tally 选票业务 · 本地 Flask 服务器
=================================

把线上 xmyzstudent.com 的「tally 选票（实时唱票）」业务在本地完整复刻：
前端复用仓库镜像的静态子集（tally/static/），后端在本文件实现。

一、接口契约（与源站逐字对应，均位于 /api/v2 前缀下）
-----------------------------------------------------
  REST（12 个）：
   1  GET    /admin/tally/activities                  活动列表
   2  GET    /admin/tally/activities/<id>             活动详情（含候选人）
   3  POST   /admin/tally/activities                  新建活动   {title}
   4  PUT    /admin/tally/activities/<id>             更新活动   {title? | status?}
   5  DELETE /admin/tally/activities/<id>             删除活动
   6  POST   /admin/tally/activities/<id>/candidates  添加候选人 {number,name,displayOrder}
   7  PUT    /admin/tally/candidates/<id>             更新候选人 {number,name,displayOrder}
   8  DELETE /admin/tally/candidates/<id>             删除候选人
   9  POST   /admin/tally/candidates/<id>/vote        录票       {delta}
  10  POST   /admin/tally/activities/<id>/undo        撤销最近一次录票
  11  GET    /admin/tally/activities/<id>/records     操作日志列表
  WebSocket（1 个）：
  12  WS     /ws/tally/activity/<id>                  大屏实时快照推送（与源站同构）

二、响应信封
------------
  所有 JSON 接口统一返回 { "code": ..., "data": ..., "message": ... }。
  业务成败看 code（前端只认 code）：code=200 成功；code!=200 业务失败（HTTP 200）。
  鉴权失败返回真正的 HTTP 401；无权限返回 HTTP 403（与源站一致）。

三、鉴权
--------
  前端 axios 请求拦截器会把 localStorage 中的 token 放进
  Authorization: Bearer <token> 头。本服务不实现登录注册：
  - 携带任意非空 Bearer token 视为已登录；
  - 仓库内部脚本 tools/dev-auth.js（已复制为 tally/dev-auth.js）会注入
    localStorage 会话（token=dev-local-token，permissions 含 tally.manage），
    本服务据此放行全部 tally 管理接口；
  - token 缺失 / 为空 → HTTP 401 {code:401, message:"未授权", data:null}。

四、存储与并发
--------------
  全部数据保存在单文件 tally.json（活动、候选人、票数、操作记录）。
  写操作统一经过全局锁 _file_lock，采用「读内存 → 改内存 → 写临时文件 →
  os.replace 原子替换」的方式落盘，避免并发写导致文件损坏或丢数据。
  录票 / 撤销 / 候选人变更后，会向该活动所有已连接的 WebSocket 订阅者
  广播最新快照，大屏与控制台据此实时刷新。

五、静态文件与登录态注入
------------------------
  tally/static/ 存放 tally 业务最小前端子集（非整站）。
  返回 index.html 时动态注入 <script src="/__dev-auth.js">，
  磁盘文件不做任何改动（与仓库 tools/serve.py 的走查方案一致）。

六、启动
--------
  python app.py [端口]
  未指定端口时随机选取可用端口，并自动检测占用后切换。
"""

import json
import os
import random
import socket
import threading
import time
from datetime import datetime

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_sock import Sock

# ---------------------------------------------------------------------------
# 基础路径与常量
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DATA_FILE = os.path.join(BASE_DIR, "tally.json")
DEV_AUTH_FILE = os.path.join(BASE_DIR, "dev-auth.js")
DEV_AUTH_URL = "/__dev-auth.js"

# 活动状态机：0=待开始(pending) 1=进行中(live) 2=已结束(ended)
STATUS_PENDING, STATUS_LIVE, STATUS_ENDED = 0, 1, 2

# 操作记录类型：0=普通录票 1=撤销
TYPE_VOTE, TYPE_UNDO = 0, 1

# 全局锁：串行化一切对内存数据 / tally.json 的读写
_file_lock = threading.Lock()

# 内存数据（由 _load() 从 tally.json 载入，写操作后由 _save() 落盘）
_data = None

# WebSocket 订阅者表：{ activity_id: set(ws) }，广播时遍历发送
_ws_clients = {}
_ws_lock = threading.Lock()


# ---------------------------------------------------------------------------
# 存储层：单文件 tally.json 的载入 / 原子保存
# ---------------------------------------------------------------------------
def _load():
    """从 tally.json 载入全部数据；文件缺失时初始化为空结构。"""
    global _data
    if os.path.isfile(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            _data = json.load(f)
    else:
        _data = {"nextActivityId": 1, "nextCandidateId": 1, "activities": []}
    # 兜底初始化自增游标
    _data.setdefault("nextActivityId", 1)
    _data.setdefault("nextCandidateId", 1)
    _data.setdefault("activities", [])


def _save():
    """原子落盘：先写临时文件，再 os.replace 覆盖，防止写一半损坏。"""
    tmp = DATA_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(_data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, DATA_FILE)


def _normalize_dt(value):
    """
    把任意时间字符串规范化为无微秒的 ISO 格式（可被 new Date() 稳定解析）。
    源站快照的 updatedAt 形如 "2026-10-07 11:12:48.854942751"（Go 风格），
    直接丢给浏览器 new Date() 在部分内核上解析不稳，这里统一转成
    "2026-10-07T11:12:48"。
    """
    if not value:
        return ""
    text = str(value).strip()
    if not text:
        return ""
    # 兼容 "2026-10-07 11:12:48.854942751" / "2026-10-07T11:12:48Z" 等
    text = text.replace(" ", "T")
    text = text.split(".")[0]
    text = text.rstrip("Z")
    return text


# ---------------------------------------------------------------------------
# 响应信封
# ---------------------------------------------------------------------------
def ok(data=None, message="success"):
    """业务成功：HTTP 200 + code 200。"""
    return jsonify({"code": 200, "data": data, "message": message})


def biz_error(code, message, http_status=200):
    """业务失败：默认 HTTP 200 + code!=200（前端只认 code，与源站一致）。"""
    return jsonify({"code": code, "data": None, "message": message}), http_status


def unauthorized():
    """鉴权失败：必须返回真正的 HTTP 401，前端靠 401 状态触发登出事件。"""
    return jsonify({"code": 401, "data": None, "message": "未授权"}), 401


def forbidden():
    """无权限：HTTP 403 + code 403（与源站「权限不足」行为一致）。"""
    return jsonify({"code": 403, "data": None, "message": "权限不足"}), 403


# ---------------------------------------------------------------------------
# 鉴权辅助
# ---------------------------------------------------------------------------
def _bearer_token():
    """从 Authorization 头解析 Bearer token；缺失返回 None。"""
    header = request.headers.get("Authorization", "")
    if header.startswith("Bearer "):
        token = header[len("Bearer "):].strip()
        return token or None
    return None


def require_auth():
    """
    管理接口统一鉴权入口：
    - 本地不实现真实登录，携带任意非空 Bearer token 即视为已登录
      （dev-auth.js 注入的 dev-local-token 符合该规则）；
    - token 缺失 / 为空 → HTTP 401。
    """
    if not _bearer_token():
        return unauthorized()
    return None


# ---------------------------------------------------------------------------
# 数据访问辅助（仅在持锁后调用）
# ---------------------------------------------------------------------------
def _find_activity(activity_id):
    """按 id 在内存中查找活动，返回 (活动对象) 或 None。"""
    for act in _data["activities"]:
        if act["id"] == activity_id:
            return act
    return None


def _find_candidate(activity, candidate_id):
    """在指定活动内按 id 查找候选人，返回候选人对象或 None。"""
    for cand in activity.get("candidates", []):
        if cand["id"] == candidate_id:
            return cand
    return None


def _activity_snapshot(activity):
    """构造与源站 WS 快照逐字同构的 JSON：连接 / 每次变更后推送。"""
    return {
        "activityId": activity["id"],
        "title": activity["title"],
        "status": activity["status"],
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f"),
        "candidates": [
            {
                "id": c["id"],
                "number": c["number"],
                "name": c["name"],
                "displayOrder": c["displayOrder"],
                "voteCount": c["voteCount"],
            }
            for c in sorted(
                activity.get("candidates", []),
                key=lambda x: x.get("displayOrder", 0),
            )
        ],
    }


def _activity_summary(activity):
    """活动列表项：仅含前端列表页消费的字段。"""
    return {
        "id": activity["id"],
        "title": activity["title"],
        "status": activity["status"],
        "createdAt": _normalize_dt(activity.get("createdAt", "")),
    }


def _activity_detail(activity):
    """活动详情：含候选人数组（前端配置页 / 控制台消费）。"""
    return {
        "id": activity["id"],
        "title": activity["title"],
        "status": activity["status"],
        "createdAt": _normalize_dt(activity.get("createdAt", "")),
        "candidates": [
            {
                "id": c["id"],
                "number": c["number"],
                "name": c["name"],
                "displayOrder": c["displayOrder"],
                "voteCount": c["voteCount"],
            }
            for c in sorted(
                activity.get("candidates", []),
                key=lambda x: x.get("displayOrder", 0),
            )
        ],
    }


def _record_out(record):
    """操作日志输出格式（前端日志列表消费）。"""
    return {
        "id": record["id"],
        "createdAt": _normalize_dt(record.get("createdAt", "")),
        "candidateNumber": record.get("candidateNumber", ""),
        "candidateName": record.get("candidateName", ""),
        "delta": record.get("delta", 0),
        "type": record.get("type", TYPE_VOTE),
    }


# ---------------------------------------------------------------------------
# WebSocket 广播
# ---------------------------------------------------------------------------
def _broadcast(activity_id):
    """向某活动的全部 WS 订阅者推送最新快照（活动不存在则推空快照）。"""
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            payload = {
                "activityId": activity_id,
                "title": "",
                "status": STATUS_PENDING,
                "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f"),
                "candidates": [],
            }
        else:
            payload = _activity_snapshot(activity)
    text = json.dumps(payload, ensure_ascii=False)

    with _ws_lock:
        clients = list(_ws_clients.get(activity_id, set()))
    dead = []
    for ws in clients:
        try:
            ws.send(text)
        except Exception:
            dead.append(ws)
    if dead:
        with _ws_lock:
            bucket = _ws_clients.get(activity_id)
            if bucket:
                for ws in dead:
                    bucket.discard(ws)


# ---------------------------------------------------------------------------
# Flask 应用
# ---------------------------------------------------------------------------
app = Flask(
    __name__,
    static_folder=None,  # 静态文件由下方显式路由托管，便于注入 dev-auth
)
app.config["JSON_AS_ASCII"] = False
sock = Sock(app)


# ---------- WebSocket：大屏实时快照 ----------
@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id):
    """大屏 / 唱票控制台共用的实时通道（与源站 /ws/tally/activity/:id 同构）。
    连接建立后立即推送当前快照；此后每次写操作由 _broadcast 推送新快照。
    注意锁顺序：与 _broadcast 保持一致，先 _file_lock 后 _ws_lock，
    避免与 HTTP 写路径形成锁顺序反转死锁。"""
    # 1) 先取快照（持数据锁），再注册订阅者（持订阅锁）
    with _file_lock:
        activity = _find_activity(activity_id)
        payload = (
            json.dumps(_activity_snapshot(activity), ensure_ascii=False)
            if activity is not None
            else None
        )
    with _ws_lock:
        _ws_clients.setdefault(activity_id, set()).add(ws)
    try:
        # 首次连接立即推送一次当前快照（与源站行为一致）
        if payload is not None:
            try:
                ws.send(payload)
            except Exception:
                pass
        # 长连接保持：持续接收（客户端断线时 recv 会抛异常）
        while True:
            ws.receive()
    except Exception:
        pass
    finally:
        with _ws_lock:
            bucket = _ws_clients.get(activity_id)
            if bucket:
                bucket.discard(ws)


# ---------- REST：活动管理 ----------
@app.route("/api/v2/admin/tally/activities", methods=["GET"])
def list_activities():
    """GET /admin/tally/activities —— 活动列表（状态徽章、创建时间）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    with _file_lock:
        activities = [_activity_summary(a) for a in _data["activities"]]
    return ok(activities)


@app.route("/api/v2/admin/tally/activities", methods=["POST"])
def create_activity():
    """POST /admin/tally/activities —— 新建活动，请求体 {title}。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    body = request.get_json(silent=True) or {}
    title = (body.get("title") or "").strip()
    if not title:
        return biz_error(400, "活动标题不能为空")
    with _file_lock:
        activity = {
            "id": _data["nextActivityId"],
            "title": title,
            "status": STATUS_PENDING,
            "createdAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
            "candidates": [],
            "records": [],
        }
        _data["nextActivityId"] += 1
        _data["activities"].append(activity)
        _save()
    return ok(_activity_detail(activity))


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["GET"])
def get_activity(activity_id):
    """GET /admin/tally/activities/<id> —— 活动详情（含候选人列表）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        detail = _activity_detail(activity)
    return ok(detail)


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    """PUT /admin/tally/activities/<id> —— 更新活动。
    请求体可为 {title}（改名）或 {status: 0|1|2}（状态切换）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    body = request.get_json(silent=True) or {}
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        if "title" in body:
            title = (body.get("title") or "").strip()
            if not title:
                return biz_error(400, "活动标题不能为空")
            activity["title"] = title
        if "status" in body:
            status = body.get("status")
            try:
                status = int(status)
            except (TypeError, ValueError):
                return biz_error(400, "状态值无效")
            if status not in (STATUS_PENDING, STATUS_LIVE, STATUS_ENDED):
                return biz_error(400, "状态值无效")
            activity["status"] = status
        _save()
        detail = _activity_detail(activity)
    _broadcast(activity_id)
    return ok(detail)


@app.route("/api/v2/admin/tally/activities/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    """DELETE /admin/tally/activities/<id> —— 删除活动（候选人、记录一并删除）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        _data["activities"] = [
            a for a in _data["activities"] if a["id"] != activity_id
        ]
        _save()
    _broadcast(activity_id)
    return ok(None)


# ---------- REST：候选人管理 ----------
@app.route(
    "/api/v2/admin/tally/activities/<int:activity_id>/candidates",
    methods=["POST"],
)
def create_candidate(activity_id):
    """POST /admin/tally/activities/<id>/candidates —— 添加候选人。
    请求体 {number, name, displayOrder}。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    body = request.get_json(silent=True) or {}
    number = (body.get("number") or "").strip()
    name = (body.get("name") or "").strip()
    display_order = body.get("displayOrder")
    if not number:
        return biz_error(400, "请输入编号")
    if not name:
        return biz_error(400, "请输入姓名")
    try:
        display_order = int(display_order) if display_order is not None else 0
    except (TypeError, ValueError):
        return biz_error(400, "显示顺序无效")
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        candidate = {
            "id": _data["nextCandidateId"],
            "number": number,
            "name": name,
            "displayOrder": display_order,
            "voteCount": 0,
        }
        _data["nextCandidateId"] += 1
        activity.setdefault("candidates", []).append(candidate)
        _save()
    _broadcast(activity_id)
    return ok(candidate)


@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>", methods=["PUT"])
def update_candidate(candidate_id):
    """PUT /admin/tally/candidates/<id> —— 更新候选人（编号/姓名/显示顺序）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    body = request.get_json(silent=True) or {}
    number = (body.get("number") or "").strip()
    name = (body.get("name") or "").strip()
    display_order = body.get("displayOrder")
    if not number:
        return biz_error(400, "请输入编号")
    if not name:
        return biz_error(400, "请输入姓名")
    try:
        display_order = int(display_order) if display_order is not None else 0
    except (TypeError, ValueError):
        return biz_error(400, "显示顺序无效")
    broadcast_id = None
    with _file_lock:
        for activity in _data["activities"]:
            candidate = _find_candidate(activity, candidate_id)
            if candidate is not None:
                candidate["number"] = number
                candidate["name"] = name
                candidate["displayOrder"] = display_order
                _save()
                broadcast_id = activity["id"]
                break
        else:
            return biz_error(404, "候选人不存在")
    # 广播放在锁外：避免持 _file_lock 时再次获取该锁（Lock 不可重入）
    _broadcast(broadcast_id)
    return ok(candidate)


@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>", methods=["DELETE"])
def delete_candidate(candidate_id):
    """DELETE /admin/tally/candidates/<id> —— 删除候选人（历史唱票记录一并删除）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    broadcast_id = None
    with _file_lock:
        for activity in _data["activities"]:
            candidate = _find_candidate(activity, candidate_id)
            if candidate is not None:
                activity["candidates"] = [
                    c for c in activity["candidates"] if c["id"] != candidate_id
                ]
                activity["records"] = [
                    r
                    for r in activity.get("records", [])
                    if r.get("candidateId") != candidate_id
                ]
                _save()
                broadcast_id = activity["id"]
                break
        else:
            return biz_error(404, "候选人不存在")
    # 广播放在锁外（Lock 不可重入，避免持锁自锁）
    _broadcast(broadcast_id)
    return ok(None)


# ---------- REST：唱票控制台 ----------
@app.route("/api/v2/admin/tally/candidates/<int:candidate_id>/vote", methods=["POST"])
def vote_candidate(candidate_id):
    """POST /admin/tally/candidates/<id>/vote —— 录票。
    请求体 {delta}，delta 为非 0 整数（正为加票、负为减票）。
    仅活动状态为「进行中(1)」时允许；成功后写操作日志并广播大屏。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    body = request.get_json(silent=True) or {}
    try:
        delta = int(body.get("delta"))
    except (TypeError, ValueError):
        return biz_error(400, "票数变化必须为整数")
    if delta == 0:
        return biz_error(400, "票数变化不能为 0")
    broadcast_id = None
    with _file_lock:
        for activity in _data["activities"]:
            candidate = _find_candidate(activity, candidate_id)
            if candidate is not None:
                if activity["status"] != STATUS_LIVE:
                    return biz_error(
                        409, "活动当前状态不可录票，请切换为「进行中」"
                    )
                candidate["voteCount"] = candidate.get("voteCount", 0) + delta
                record = {
                    "id": len(activity.get("records", [])) + 1,
                    "activityId": activity["id"],
                    "candidateId": candidate_id,
                    "candidateNumber": candidate["number"],
                    "candidateName": candidate["name"],
                    "delta": delta,
                    "type": TYPE_VOTE,
                    "createdAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
                }
                activity.setdefault("records", []).append(record)
                _save()
                broadcast_id = activity["id"]
                break
        else:
            return biz_error(404, "候选人不存在")
    # 广播放在锁外（Lock 不可重入，避免持锁自锁）；大屏据此实时刷新票数
    _broadcast(broadcast_id)
    return ok(record)


@app.route("/api/v2/admin/tally/activities/<int:activity_id>/undo", methods=["POST"])
def undo_vote(activity_id):
    """POST /admin/tally/activities/<id>/undo —— 撤销最近一次普通录票。
    弹出该活动最后一条 type=0 的录票记录，反向修正候选人票数，
    并在日志中追加一条 type=1 的「撤销」记录。
    data=true 表示已撤销；data=false 表示无可撤销操作。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        records = activity.get("records", [])
        # 从后往前找最后一条「普通录票」记录（撤销记录不可再撤销）
        target_index = None
        for idx in range(len(records) - 1, -1, -1):
            if records[idx].get("type") == TYPE_VOTE:
                target_index = idx
                break
        if target_index is None:
            return ok(False, "无可撤销操作")
        target = records.pop(target_index)
        candidate = _find_candidate(activity, target["candidateId"])
        if candidate is not None:
            # 反向修正：原来 +N 则减 N，原来 -N 则加 N
            candidate["voteCount"] = candidate.get("voteCount", 0) - target["delta"]
        # 追加一条撤销日志（前端据此展示「撤销」徽标）
        undo_record = {
            "id": len(records) + 1,
            "activityId": activity_id,
            "candidateId": target["candidateId"],
            "candidateNumber": target.get("candidateNumber", ""),
            "candidateName": target.get("candidateName", ""),
            "delta": -target["delta"],
            "type": TYPE_UNDO,
            "createdAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        }
        activity["records"] = records + [undo_record]
        _save()
    _broadcast(activity_id)
    return ok(True)


@app.route(
    "/api/v2/admin/tally/activities/<int:activity_id>/records", methods=["GET"]
)
def list_records(activity_id):
    """GET /admin/tally/activities/<id>/records —— 操作日志（最新在前）。"""
    auth_err = require_auth()
    if auth_err:
        return auth_err
    with _file_lock:
        activity = _find_activity(activity_id)
        if activity is None:
            return biz_error(404, "活动不存在")
        records = [
            _record_out(r)
            for r in sorted(
                activity.get("records", []),
                key=lambda x: x.get("createdAt", ""),
                reverse=True,
            )
        ]
    return ok(records)


# ---------- 静态文件与 SPA 回退 ----------
def _inject_dev_auth(html):
    """在 index.html 的模块脚本前插入 dev-auth 注入脚本（不改磁盘文件）。"""
    tag = '<script src="%s"></script>\n    ' % DEV_AUTH_URL
    if '<script type="module"' in html:
        return html.replace(
            '<script type="module"', tag + '<script type="module"', 1
        )
    return html.replace("</head>", tag + "</head>", 1)


def _serve_html(subpath):
    full = os.path.normpath(os.path.join(STATIC_DIR, subpath))
    if not full.startswith(STATIC_DIR) or not os.path.isfile(full):
        return "Not Found", 404
    with open(full, "r", encoding="utf-8") as f:
        html = f.read()
    return Response(_inject_dev_auth(html), mimetype="text/html; charset=utf-8")


@app.route("/")
def index():
    return _serve_html("index.html")


@app.route(DEV_AUTH_URL)
def dev_auth_script():
    """提供登录态注入脚本（来自仓库 tools/dev-auth.js 的副本）。"""
    if not os.path.isfile(DEV_AUTH_FILE):
        return "Not Found", 404
    with open(DEV_AUTH_FILE, "r", encoding="utf-8") as f:
        return Response(f.read(), mimetype="text/javascript; charset=utf-8")


@app.route("/vite.svg")
def favicon_svg():
    return send_from_directory(STATIC_DIR, "vite.svg")


@app.route("/assets/<path:filename>")
def assets(filename):
    """静态资源（仅 tally 业务子集）。"""
    full = os.path.normpath(os.path.join(STATIC_DIR, "assets", filename))
    if not full.startswith(os.path.join(STATIC_DIR, "assets")) or not os.path.isfile(full):
        return "Not Found: " + filename, 404
    return send_from_directory(
        os.path.join(STATIC_DIR, "assets"), filename
    )


@app.route("/<path:subpath>")
def spa_fallback(subpath):
    """SPA 深路由回退：非静态资源、非 API 的路径一律返回 index.html，
    交给 vue-router 处理（刷新 /admin/tally、/tally/screen/1 等不 404）。"""
    # 带扩展名的未命中资源不应回退成 HTML，直接 404 便于排查
    if os.path.splitext(subpath)[1]:
        return "Not Found: " + subpath, 404
    return _serve_html("index.html")


# ---------------------------------------------------------------------------
# 启动：随机端口 + 可用性检测
# ---------------------------------------------------------------------------
def pick_port(preferred=None):
    """优先使用用户指定端口；否则随机选端口并检测占用，被占则换一个。"""
    if preferred:
        return preferred
    for _ in range(50):
        port = random.randint(20000, 60000)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.5)
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    # 兜底：交给内核分配
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


if __name__ == "__main__":
    import sys

    port_arg = None
    for a in sys.argv[1:]:
        if a.isdigit():
            port_arg = int(a)
            break
    port = pick_port(port_arg)
    _load()
    print("=" * 56)
    print("tally 选票业务 · 本地服务已启动")
    print(f"  地址:      http://localhost:{port}")
    print(f"  数据文件:  {DATA_FILE}")
    print(f"  大屏示例:  http://localhost:{port}/tally/screen/1")
    print(f"  管理页:    http://localhost:{port}/admin/tally")
    print("  (管理页需登录态：本服务已在 index.html 注入 dev-auth 脚本)")
    print("=" * 56)
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
