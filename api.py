"""tally 选票业务 REST 接口层。

接口清单（与源站前端 tally-BvCEJ8Iv.js 反推结果逐字对应，共 12 个 REST + 1 个 WS）：

    方法    路径                                             前端调用点
    GET    /api/v2/admin/tally/activities                    listActivities()      活动列表
    POST   /api/v2/admin/tally/activities                    createActivity(title) 新建活动
    GET    /api/v2/admin/tally/activities/<id>               getActivity(id)       活动详情
    PUT    /api/v2/admin/tally/activities/<id>               updateActivity(id,b)  改名/切状态
    DELETE /api/v2/admin/tally/activities/<id>               deleteActivity(id)    删除活动
    POST   /api/v2/admin/tally/activities/<id>/candidates    addCandidate(id,b)    新增候选人
    PUT    /api/v2/admin/tally/candidates/<cid>              updateCandidate(c,b)  编辑候选人
    DELETE /api/v2/admin/tally/candidates/<cid>              deleteCandidate(cid)  删除候选人
    POST   /api/v2/admin/tally/candidates/<cid>/vote         vote(cid,delta)       现场录票
    POST   /api/v2/admin/tally/activities/<id>/undo          undo(id)              撤销上一步
    GET    /api/v2/admin/tally/activities/<id>/records       records(id)           操作日志
    GET    /api/v2/tally/activities/<id>/snapshot            大屏初值（公开）       快照
    WS     /ws/tally/activity/<id>                           大屏实时推送          实时快照

响应信封：{"code": 200, "message": "success", "data": ...}
  * code=200 表示业务成功；鉴权失败按源站习惯直接回 HTTP 401，body 仍是同一信封。
"""
from __future__ import annotations

import hmac
import os
import time

from flask import Blueprint, current_app, jsonify, request

bp = Blueprint("tally_api", __name__)

ADMIN_PREFIX = "/api/v2/admin/tally"


# --------------------------------------------------------------------- 工具函数


def ok(data=None, message: str = "success", code: int = 200, http: int = 200):
    return jsonify({"code": code, "message": message, "data": data}), http


def err(message: str, code: int = 400, http: int = 200):
    return jsonify({"code": code, "message": message, "data": None}), http


def store():
    return current_app.config["TALLY_STORE"]


def hub():
    return current_app.config["TALLY_HUB"]


def bearer_token() -> str:
    header = request.headers.get("Authorization", "")
    if header.startswith("Bearer "):
        return header[7:].strip()
    return ""


def require_admin():
    """返回 None 表示通过，否则返回 401 响应。"""
    expected = current_app.config.get("TALLY_TOKEN")
    supplied = bearer_token()
    if supplied and expected and hmac.compare_digest(supplied, expected):
        return None
    return err("未授权", code=401, http=401)


def broadcast(activity_id: int) -> None:
    """任何写操作之后把最新快照推给该活动的全部大屏/控制台连接。"""
    snap = store().snapshot(activity_id)
    if snap is not None:
        hub().broadcast(activity_id, snap)


def _int_arg(payload: dict, key: str, default=None):
    raw = payload.get(key, default)
    if raw is None or raw == "":
        return None
    return int(raw)


# --------------------------------------------------------------------- 鉴权（本地解锁）

# 源站管理接口默认要求登录。本地实现保留同一契约，并提供
# 一个明确的开发口令入口（见 tools/dev-auth.js 与 README）。
LOCAL_ADMIN_USERS = {
    "admin": ("admin", "本地开发管理员"),
}


def _auth_config():
    return current_app.config["TALLY_AUTH"]


@bp.post("/api/v2/auth/login")
def login():
    payload = request.get_json(silent=True) or {}
    login_type = payload.get("loginType", "normal")
    username = (payload.get("username") or "").strip()
    password = payload.get("password") or ""
    if login_type != "normal":
        return ok(None, "本地实现仅支持账号密码登录", code=400)
    entry = _auth_config()["users"].get(username)
    if entry is None or entry["password"] != password:
        return err("用户名或密码错误", code=401)
    token = _auth_config()["token"]
    # 前端以 expiresAt(秒) 判断登录态有效期（见入口 bundle 的 expiresAt 校验）
    expires_at = int(time.time()) + 365 * 24 * 3600
    return ok(
        {
            "token": token,
            "expiresAt": expires_at,
            "user": {
                "id": entry["id"],
                "username": username,
                "nickname": entry["nickname"],
                "permissions": ["tally.manage"],
            },
            "permissions": ["tally.manage"],
        }
    )


@bp.get("/api/v2/auth/me")
def me():
    guard = require_admin()
    if guard is not None:
        return guard
    return ok({"username": "admin", "nickname": "本地开发管理员", "permissions": ["tally"]})


# --------------------------------------------------------------------- 活动管理


@bp.get(f"{ADMIN_PREFIX}/activities")
def list_activities():
    guard = require_admin()
    if guard is not None:
        return guard
    return ok(store().activities())


@bp.post(f"{ADMIN_PREFIX}/activities")
def create_activity():
    guard = require_admin()
    if guard is not None:
        return guard
    payload = request.get_json(silent=True) or {}
    title = (payload.get("title") or "").strip()
    if not title:
        return err("活动标题不能为空")
    return ok(store().create_activity(title))


@bp.get(f"{ADMIN_PREFIX}/activities/<int:activity_id>")
def get_activity(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    activity = store().activity(activity_id)
    if activity is None:
        return err("活动不存在", code=404)
    activity["candidates"] = store().candidates_of(activity_id)
    return ok(activity)


@bp.put(f"{ADMIN_PREFIX}/activities/<int:activity_id>")
def update_activity(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    payload = request.get_json(silent=True) or {}
    patch = {}
    if "title" in payload:
        title = (payload.get("title") or "").strip()
        if not title:
            return err("活动标题不能为空")
        patch["title"] = title
    if "status" in payload:
        status = _int_arg(payload, "status")
        if status not in (0, 1, 2):
            return err("状态只能是 0/1/2")
        patch["status"] = status
    activity = store().update_activity(activity_id, patch)
    if activity is None:
        return err("活动不存在", code=404)
    broadcast(activity_id)
    return ok(activity)


@bp.delete(f"{ADMIN_PREFIX}/activities/<int:activity_id>")
def delete_activity(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    if not store().delete_activity(activity_id):
        return err("活动不存在", code=404)
    return ok(True)


@bp.get(f"{ADMIN_PREFIX}/activities/<int:activity_id>/records")
def activity_records(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    if store().activity(activity_id) is None:
        return err("活动不存在", code=404)
    limit = request.args.get("limit", type=int)
    return ok(store().records_of(activity_id, limit=limit))


# --------------------------------------------------------------------- 候选人


@bp.post(f"{ADMIN_PREFIX}/activities/<int:activity_id>/candidates")
def add_candidate(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    payload = request.get_json(silent=True) or {}
    number = (payload.get("number") or "").strip()
    name = (payload.get("name") or "").strip()
    order = _int_arg(payload, "displayOrder")
    if not number:
        return err("请填写候选人编号")
    if not name:
        return err("请填写候选人姓名")
    if order is None:
        order = len(store().candidates_of(activity_id)) + 1
    candidate = store().add_candidate(activity_id, number, name, order)
    if candidate is None:
        return err("活动不存在", code=404)
    broadcast(activity_id)
    return ok(candidate)


@bp.put(f"{ADMIN_PREFIX}/candidates/<int:candidate_id>")
def update_candidate(candidate_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    payload = request.get_json(silent=True) or {}
    patch = {}
    for key in ("number", "name"):
        if key in payload:
            value = (payload.get(key) or "").strip()
            if not value:
                return err("编号与姓名都不能为空")
            patch[key] = value
    if "displayOrder" in payload:
        patch["displayOrder"] = _int_arg(payload, "displayOrder") or 0
    candidate = store().update_candidate(candidate_id, patch)
    if candidate is None:
        return err("候选人不存在", code=404)
    broadcast(candidate["activityId"])
    return ok(candidate)


@bp.delete(f"{ADMIN_PREFIX}/candidates/<int:candidate_id>")
def delete_candidate(candidate_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    candidate = store().candidate(candidate_id)
    if candidate is None:
        return err("候选人不存在", code=404)
    store().delete_candidate(candidate_id)
    broadcast(candidate["activityId"])
    return ok(True)


# --------------------------------------------------------------------- 唱票与控制台


@bp.post(f"{ADMIN_PREFIX}/candidates/<int:candidate_id>/vote")
def vote(candidate_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    payload = request.get_json(silent=True) or {}
    delta = _int_arg(payload, "delta")
    if delta is None or delta == 0:
        return err("票数变化不能为 0")
    result = store().vote(candidate_id, delta)
    if result is None:
        return err("候选人不存在", code=404)
    broadcast(result["activityId"])
    return ok(result)


@bp.post(f"{ADMIN_PREFIX}/activities/<int:activity_id>/undo")
def undo(activity_id: int):
    guard = require_admin()
    if guard is not None:
        return guard
    result = store().undo_last(activity_id)
    if result is None:
        # 前端以 data 为空判断「无可撤销操作」
        return ok(None, "无可撤销操作")
    broadcast(activity_id)
    return ok(result)


# --------------------------------------------------------------------- 大屏公开快照


@bp.get("/api/v2/tally/activities/<int:activity_id>/snapshot")
def public_snapshot(activity_id: int):
    snap = store().snapshot(activity_id)
    if snap is None:
        return err("活动不存在", code=404)
    return ok(snap)


# --------------------------------------------------------------------- 健康检查


@bp.get("/api/v2/tally/health")
def health():
    return ok(
        {
            "service": "tally",
            "readonly": store().is_readonly(),
            "wsClients": hub().client_count(),
            "dataFile": os.path.basename(current_app.config["TALLY_DATA_FILE"]),
        }
    )
