#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tally —— 「实时唱票（tally）」业务的本地 Flask 后端
=========================================================

本文件是 src站 xmyzstudent.com tally 业务的**本地复刻**实现。接口契约完全由
镜像前端（assets/tally-DC36h0vE.js 等）反推得到，路径、方法、字段名、响应信封
均与源站逐字对应，前端代码零改动即可跑通。

一、契约速查（全部来自镜像前端，未做任何"美化"）
------------------------------------------------
统一响应信封（源站风格）：
    成功 → HTTP 200  {"code":200,"data":<payload>,"message":"success"}
    业务失败 → HTTP 200 {"code":400/404/...,"data":null,"message":"<中文原因>"}
    未登录 → HTTP 401 {"code":401,"data":null,"message":"未登录或登录已过期"}
    无权限 → HTTP 403 {"code":403,"data":null,"message":"权限不足"}
注意：**HTTP 状态码与业务成败是两回事**，前端只认 `code`；但 401/403 会被 axios
响应拦截器用来触发 `auth:token-expired` 事件，必须给真正的 HTTP 状态码。

REST（12 个，均挂在源站同一前缀 /api/v2 之下）
----------------------------------------------
  #1  GET    /api/v2/permissions/my                        权限位下发（非 tally 专属但必需）
  #2  GET    /api/v2/admin/tally/activities                 活动列表
  #3  POST   /api/v2/admin/tally/activities                 新建活动   {title}
  #4  GET    /api/v2/admin/tally/activities/{id}            活动详情（含候选人）
  #5  PUT    /api/v2/admin/tally/activities/{id}            改标题/改状态 {title?|status?}
  #6  DELETE /api/v2/admin/tally/activities/{id}            删除活动（级联候选人 + 唱票记录）
  #7  POST   /api/v2/admin/tally/activities/{id}/candidates 新增候选人 {number,name,displayOrder}
  #8  PUT    /api/v2/admin/tally/candidates/{id}            改候选人 {number,name,displayOrder}
  #9  DELETE /api/v2/admin/tally/candidates/{id}            删候选人（级联其唱票记录）
  #10 POST   /api/v2/admin/tally/candidates/{id}/vote       录票 {delta}
  #11 POST   /api/v2/admin/tally/activities/{id}/undo       撤销上一次录票
  #12 GET    /api/v2/admin/tally/activities/{id}/records    操作日志（倒序，前端取前 20 条）

WebSocket（1 个，与源站同构）
----------------------------
  wss://<host>/ws/tally/activity/{activityId}
  · 连接建立后**立刻**推一帧全量快照，前端无需先 REST 拉取；
  · 之后每次录票 / 撤销 / 候选人增删改 / 活动改名改状态，服务端向该活动的
    **所有**订阅者广播同一份快照（广播模型，无 diff、无 ack）；
  · 帧格式与源站逐字一致（注意键名是字典序，这正是 Go map 序列化出来的形状）：
        {"activityId":1,"candidates":[{"displayOrder":1,"id":1,"name":"测试1",
         "number":"1","voteCount":25}],"status":1,
         "title":"2026厦门一中思明校区双代会","updatedAt":"2026-10-07 11:08:09.769155470"}
  · **不得**往这条通道塞心跳/心跳包之外的应用层消息：前端 onmessage 无条件
    `JSON.parse(e.data)` 并整体覆盖 snapshot，任何非快照帧都会让大屏闪成
    "暂无候选人"。心跳走协议层的 WebSocket Ping（见 PING_INTERVAL）。

数据存储：单个 tally.json
----------------------
活动、候选人、票数、操作记录、ID 自增游标全部落在 tally.json 一个文件里。
写入策略：进程内 RLock 串行化 + "写临时文件 → os.replace 原子替换"，
保证任何时刻磁盘上的 tally.json 都是完整合法的 JSON（不会出现半截文件）。

用法
----
    python app.py            # 随机可用端口
    python app.py 8080       # 指定端口（被占用则自动换端口）
    PORT=8080 python app.py
环境变量：
    TALLY_PORT        指定端口（等价于位置参数）
    TALLY_DEV_AUTH    1/0 是否注入仓库自带的 tools/dev-auth.js 解锁登录态，默认 1
    TALLY_FILE        指定 tally.json 路径，默认与本文件同级
"""

from __future__ import annotations

import json
import os
import socket
import sys
import threading
from datetime import datetime

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_sock import Sock
from simple_websocket import ConnectionClosed

# --------------------------------------------------------------------------- #
# 基础配置
# --------------------------------------------------------------------------- #

HERE = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(HERE, "static")
DATA_FILE = os.environ.get("TALLY_FILE") or os.path.join(HERE, "tally.json")
DEV_AUTH = os.environ.get("TALLY_DEV_AUTH", "1") != "0"

API_PREFIX = "/api/v2"

# WebSocket 协议层心跳间隔（秒）。simple_websocket 会在后台线程里发 Ping 帧，
# 浏览器 JS API 无法主动发 Ping，但会自动回 Pong——这是对前端完全透明的心跳。
PING_INTERVAL = 25

# 本地放行用的开发令牌：仓库 tools/dev-auth.js 注入 localStorage.token 的值。
# 除此之外任何 token 都视为无效 → 返回真正的 HTTP 401。
DEV_TOKEN = "dev-local-token"

# 令牌 → 权限位。本地镜像没有真实账号体系，用一张固定映射表表达"谁能管唱票"。
TOKEN_PERMISSIONS = {
    DEV_TOKEN: [
        "ticket.manage", "campaign.manage", "rating.manage", "message.manage",
        "user.manage", "banner.manage", "museum.manage", "debate.manage",
        "tally.manage", "voices.manage",
    ],
}

STATUS_PENDING, STATUS_LIVE, STATUS_ENDED = 0, 1, 2

MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".map": "application/json; charset=utf-8",
}


# --------------------------------------------------------------------------- #
# 工具函数：时间格式 / 响应信封
# --------------------------------------------------------------------------- #

def now_rfc3339() -> str:
    """RFC3339（无时区），与源站 Go `time.Time` 的默认 JSON 输出同形。

    形如 2026-10-01T23:51:17，可被 `new Date(x)` 直接解析
    —— 活动列表页正是用 toLocaleString('zh-CN') 渲染它。
    """
    return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")


def now_ws_stamp() -> str:
    """WebSocket 快照里的 updatedAt 形如 2026-10-07 11:08:09.769155470。

    实测源站该字段每次连接都会刷新（是**广播时刻**而不是最后写库时刻），
    所以本实现同样在每次生成快照时取当前时间，微秒补齐 6 位。
    """
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S.") + "%06d" % now.microsecond


def ok(data=None, message: str = "success"):
    """源站风格的成功信封。"""
    return jsonify({"code": 200, "data": data, "message": message}), 200


def fail(code: int, message: str, http_status: int = 200):
    """源站风格的业务失败信封。

    默认 HTTP 仍为 200 —— 前端只判断 `resp.data.code === 200`，
    用非 2xx 反而会让 axios 走 reject 分支，前端 catch 里只会弹"网络错误"。
    只有 401 / 403 需要真正的 HTTP 状态码（见 fail(..., http_status=401/403)）。
    """
    return jsonify({"code": code, "data": None, "message": message}), http_status


def body_json() -> dict:
    """宽容地取 JSON body：容错空体与非法 JSON，返回 {} 而不是抛异常。"""
    data = request.get_json(silent=True, force=True)
    return data if isinstance(data, dict) else {}


# --------------------------------------------------------------------------- #
# 单文件存储：tally.json
# --------------------------------------------------------------------------- #

class TallyStore:
    """tally.json 的进程内存储。

    线程安全靠一把全局 RLock（读改写必须整体在一个临界区里完成，否则
    "读票数 → 加 delta → 写回" 这种复合操作会丢更新）。
    持久化靠 tmpfile + os.replace：POSIX/Windows 都保证替换是原子的，
    读者永远看到完整的旧版本或完整的新版本。
    """

    def __init__(self, path: str):
        self.path = path
        self.lock = threading.RLock()
        self.data = self._load()

    # ---------- 读写 ----------

    def _load(self) -> dict:
        if not os.path.isfile(self.path):
            return {
                "meta": {},
                "nextIds": {"activity": 1, "candidate": 1, "record": 1},
                "activities": [],
                "records": [],
            }
        with open(self.path, "r", encoding="utf-8") as fp:
            data = json.load(fp)
        data.setdefault("meta", {})
        data.setdefault("nextIds", {"activity": 1, "candidate": 1, "record": 1})
        data.setdefault("activities", [])
        data.setdefault("records", [])
        return data

    def reload(self) -> None:
        with self.lock:
            self.data = self._load()

    def save(self) -> None:
        """原子落盘。调用方必须已持有 self.lock。"""
        tmp = self.path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fp:
            json.dump(self.data, fp, ensure_ascii=False, indent=2)
            fp.flush()
            os.fsync(fp.fileno())
        os.replace(tmp, self.path)

    def next_id(self, kind: str) -> int:
        """取号并自增。调用方必须已持有 self.lock。"""
        cur = self.data["nextIds"].get(kind, 1)
        self.data["nextIds"][kind] = cur + 1
        return cur

    # ---------- 查询 ----------

    def activity(self, activity_id: int):
        for act in self.data["activities"]:
            if act["id"] == activity_id:
                return act
        return None

    def candidate(self, candidate_id: int):
        for act in self.data["activities"]:
            for cand in act["candidates"]:
                if cand["id"] == candidate_id:
                    return cand, act
        return None, None

    def activity_records(self, activity_id: int) -> list:
        """某活动的操作日志，按 id 倒序（最新在前，与前端"取前 20 条"匹配）。"""
        rows = [r for r in self.data["records"] if r["activityId"] == activity_id]
        rows.sort(key=lambda r: r["id"], reverse=True)
        return rows

    # ---------- 视图（对外 JSON 形状） ----------

    @staticmethod
    def activity_list_item(act: dict) -> dict:
        """GET /admin/tally/activities 的元素形状：活动列表页只消费这 4 个字段。"""
        return {
            "id": act["id"],
            "title": act["title"],
            "status": act["status"],
            "createdAt": act["createdAt"],
        }

    @staticmethod
    def candidate_view(cand: dict) -> dict:
        """候选人形状。REST 详情与大屏 WS 共用同一组字段（源站就是这样共用的）。

        键名按字典序输出，与源站 WS 帧保持一致，便于肉眼 diff。
        """
        return {
            "displayOrder": cand["displayOrder"],
            "id": cand["id"],
            "name": cand["name"],
            "number": cand["number"],
            "voteCount": cand["voteCount"],
        }

    @staticmethod
    def activity_detail(act: dict) -> dict:
        """GET /admin/tally/activities/{id} 的形状：详情页要 title/status/candidates。"""
        return {
            "id": act["id"],
            "title": act["title"],
            "status": act["status"],
            "createdAt": act["createdAt"],
            "updatedAt": act["updatedAt"],
            "candidates": [TallyStore.candidate_view(c) for c in act["candidates"]],
        }

    @staticmethod
    def record_view(rec: dict) -> dict:
        """操作日志形状：控制台渲染 id/createdAt/candidateNumber/candidateName/delta/type。

        type：0 = 普通录票，1 = 撤销（前端按 type===1 显示"撤销"标签）。
        撤销不物理删除原记录，而是**追加一条 type=1、delta 取反**的记录，
        因此"票数 == 该候选人全部记录 delta 之和"这条账本不变量恒成立。
        """
        return {
            "id": rec["id"],
            "activityId": rec["activityId"],
            "candidateId": rec["candidateId"],
            "candidateNumber": rec["candidateNumber"],
            "candidateName": rec["candidateName"],
            "delta": rec["delta"],
            "type": rec["type"],
            "createdAt": rec["createdAt"],
        }

    @staticmethod
    def ws_snapshot(act: dict) -> dict:
        """大屏 WS 推送的全量快照。键名为字典序 —— 与源站 Go map 序列化一致。"""
        return {
            "activityId": act["id"],
            "candidates": [TallyStore.candidate_view(c) for c in act["candidates"]],
            "status": act["status"],
            "title": act["title"],
            "updatedAt": now_ws_stamp(),
        }


store = TallyStore(DATA_FILE)


# --------------------------------------------------------------------------- #
# WebSocket 广播中心
# --------------------------------------------------------------------------- #

class TallyHub:
    """activityId → 该活动当前在线的连接集合。

    前端（大屏 / 控制台）只做两件事：
      * 收到任何一帧 → 整体替换本地 snapshot；
      * 连接断开 → 指数退避重连（1s → 2s → 4s … 上限 30s）。
    所以服务端**不需要**记录"谁订阅了什么增量"，一个活动一帧全量就够，
    广播成本 O(订阅者数)，消息体也只有几百字节 —— 这是本业务选全量广播的合理性。
    """

    def __init__(self):
        self.lock = threading.RLock()
        self.subscribers: dict[int, set] = {}   # activity_id -> {conn}
        self.count = 0                          # 自增连接句柄，避免对象重复入 set

    def add(self, activity_id: int, conn) -> None:
        with self.lock:
            self.subscribers.setdefault(activity_id, set()).add(conn)

    def remove(self, activity_id: int, conn) -> None:
        with self.lock:
            group = self.subscribers.get(activity_id)
            if not group:
                return
            group.discard(conn)
            if not group:
                self.subscribers.pop(activity_id, None)

    def online(self, activity_id: int) -> int:
        with self.lock:
            return len(self.subscribers.get(activity_id, ()))

    def broadcast(self, activity_id: int, payload: dict) -> int:
        """向某活动的全部订阅者推同一帧，返回成功推送的连接数。"""
        text = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        with self.lock:
            targets = list(self.subscribers.get(activity_id, ()))
        sent = 0
        for conn in targets:
            if conn.send(text):
                sent += 1
        return sent

    def broadcast_activity(self, activity_id: int) -> int:
        """重新生成快照并广播。写入方在 store 临界区外调用即可（快照只读）。"""
        with store.lock:
            act = store.activity(activity_id)
            if act is None:
                # 活动已被删除：广播一个空快照，前端大屏会退化成"暂无候选人"
                return self.broadcast(activity_id, {
                    "activityId": activity_id, "candidates": [], "status": None,
                    "title": None, "updatedAt": now_ws_stamp(),
                })
            payload = store.ws_snapshot(act)
        return self.broadcast(activity_id, payload)


class _Conn:
    """一个 WS 连接的封装：自带写锁，避免广播线程与心跳/发送线程交错写帧。"""

    __slots__ = ("ws", "wlock")

    def __init__(self, ws):
        self.ws = ws
        self.wlock = threading.Lock()

    def send(self, text: str) -> bool:
        with self.wlock:
            try:
                self.ws.send(text)
                return True
            except Exception:
                return False


hub = TallyHub()


# --------------------------------------------------------------------------- #
# 鉴权
# --------------------------------------------------------------------------- #

def current_token() -> str | None:
    """从 Authorization: Bearer <token> 里取令牌，取不到返回 None。"""
    header = request.headers.get("Authorization") or ""
    if not header.startswith("Bearer "):
        return None
    token = header[7:].strip()
    return token or None


def require_tally_manage(fn):
    """后台接口守卫：先 401 再 403，与源站顺序一致。

    - 无 Authorization / 格式不对 / 令牌不认识 → 真正的 HTTP 401
      （axios 响应拦截器据此 dispatchEvent('auth:token-expired')，弹出登录框）
    - 令牌有效但没有 tally.manage → HTTP 403 + {"code":403,"message":"权限不足"}
    """

    def wrapper(*args, **kwargs):
        token = current_token()
        if not token or token not in TOKEN_PERMISSIONS:
            return fail(401, "未登录或登录已过期", 401)
        if "tally.manage" not in TOKEN_PERMISSIONS[token]:
            return fail(403, "权限不足", 403)
        return fn(*args, **kwargs)

    wrapper.__name__ = fn.__name__
    return wrapper


# --------------------------------------------------------------------------- #
# Flask 应用
# --------------------------------------------------------------------------- #

app = Flask(__name__, static_folder=None)
sock = Sock(app)
# 心跳交给 simple_websocket 的后台线程（协议层 Ping/Pong），对前端 JS 完全透明。
app.config["SOCK_SERVER_OPTIONS"] = {"ping_interval": PING_INTERVAL}


# --------------------------------------------------------------------------- #
# REST #1  权限位下发
# --------------------------------------------------------------------------- #

@app.route(API_PREFIX + "/permissions/my")
def permissions_my():
    token = current_token()
    if not token or token not in TOKEN_PERMISSIONS:
        return fail(401, "未登录或登录已过期", 401)
    # 前端 store.restoreSession()：只要 localStorage.permissions 已存在就不再远程拉，
    # 因此本接口主要服务于"登录后首次进入"以及本项目的自测。
    return ok({"permissions": TOKEN_PERMISSIONS[token]})


# --------------------------------------------------------------------------- #
# REST #2~#6  活动 CRUD
# --------------------------------------------------------------------------- #

@app.route(API_PREFIX + "/admin/tally/activities", methods=["GET"])
@require_tally_manage
def activities_list():
    with store.lock:
        items = [store.activity_list_item(a) for a in store.data["activities"]]
    items.sort(key=lambda x: x["id"], reverse=True)   # 新的在前
    return ok(items)


@app.route(API_PREFIX + "/admin/tally/activities", methods=["POST"])
@require_tally_manage
def activities_create():
    title = str(body_json().get("title") or "").strip()
    if not title:
        return fail(400, "请输入活动标题")
    with store.lock:
        new_id = store.next_id("activity")
        stamp = now_rfc3339()
        store.data["activities"].append({
            "id": new_id,
            "title": title,
            "status": STATUS_PENDING,       # 新建默认「待开始」，需人工切到「进行中」才能录票
            "createdAt": stamp,
            "updatedAt": stamp,
            "candidates": [],
        })
        store.save()
    return ok(store.activity_list_item(store.activity(new_id)))


@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>", methods=["GET"])
@require_tally_manage
def activities_detail(activity_id: int):
    with store.lock:
        act = store.activity(activity_id)
        if act is None:
            return fail(404, "活动不存在")
        return ok(store.activity_detail(act))


@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>", methods=["PUT"])
@require_tally_manage
def activities_update(activity_id: int):
    payload = body_json()
    title = payload.get("title")
    status = payload.get("status")
    with store.lock:
        act = store.activity(activity_id)
        if act is None:
            return fail(404, "活动不存在")
        changed = False
        if title is not None:
            title = str(title).strip()
            if not title:
                return fail(400, "标题不能为空")
            act["title"] = title
            changed = True
        if status is not None:
            # 活动管理页与配置页都用 <select value="0|1|2">，这里是数字状态码
            try:
                status = int(status)
            except (TypeError, ValueError):
                return fail(400, "状态值非法")
            if status not in (STATUS_PENDING, STATUS_LIVE, STATUS_ENDED):
                return fail(400, "状态值非法")
            act["status"] = status
            changed = True
        if not changed:
            return fail(400, "没有需要更新的字段")
        act["updatedAt"] = now_rfc3339()
        store.save()
        detail = store.activity_detail(act)
    hub.broadcast_activity(activity_id)      # 改名/改状态同样要推大屏
    return ok(detail)


@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>", methods=["DELETE"])
@require_tally_manage
def activities_delete(activity_id: int):
    with store.lock:
        if store.activity(activity_id) is None:
            return fail(404, "活动不存在")
        store.data["activities"] = [a for a in store.data["activities"] if a["id"] != activity_id]
        store.data["records"] = [r for r in store.data["records"] if r["activityId"] != activity_id]
        store.save()
    # 活动没了，给还连着的订阅者推最后一帧空快照，前端自然退化为"暂无候选人"
    hub.broadcast_activity(activity_id)
    return ok(None)


# --------------------------------------------------------------------------- #
# REST #7~#9  候选人 CRUD
# --------------------------------------------------------------------------- #

def _read_candidate_payload(payload: dict) -> tuple:
    """抽出并校验候选人三字段，返回 (number, name, displayOrder, err)。"""
    number = str(payload.get("number") or "").strip()
    name = str(payload.get("name") or "").strip()
    if not number:
        return None, None, None, fail(400, "请输入编号")
    if not name:
        return None, None, None, fail(400, "请输入姓名")
    try:
        display_order = int(payload.get("displayOrder") or 0)
    except (TypeError, ValueError):
        return None, None, None, fail(400, "显示顺序必须为整数")
    return number, name, display_order, None


@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>/candidates", methods=["POST"])
@require_tally_manage
def candidates_create(activity_id: int):
    number, name, display_order, err = _read_candidate_payload(body_json())
    if err:
        return err
    with store.lock:
        act = store.activity(activity_id)
        if act is None:
            return fail(404, "活动不存在")
        # 同一活动内编号唯一：编号是大屏 x 轴标签与日志的展示键，重复会让撤销失焦
        if any(c["number"] == number for c in act["candidates"]):
            return fail(400, f"编号「{number}」已存在")
        new_id = store.next_id("candidate")
        act["candidates"].append({
            "id": new_id,
            "number": number,
            "name": name,
            "displayOrder": display_order,
            "voteCount": 0,
        })
        act["updatedAt"] = now_rfc3339()
        store.save()
        detail = store.activity_detail(act)
    hub.broadcast_activity(activity_id)
    return ok(detail)


@app.route(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>", methods=["PUT"])
@require_tally_manage
def candidates_update(candidate_id: int):
    number, name, display_order, err = _read_candidate_payload(body_json())
    if err:
        return err
    with store.lock:
        cand, act = store.candidate(candidate_id)
        if cand is None:
            return fail(404, "候选人不存在")
        if any(c["number"] == number and c["id"] != candidate_id for c in act["candidates"]):
            return fail(400, f"编号「{number}」已存在")
        cand.update(number=number, name=name, displayOrder=display_order)
        act["updatedAt"] = now_rfc3339()
        store.save()
        detail = store.activity_detail(act)
    hub.broadcast_activity(act["id"])
    return ok(detail)


@app.route(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>", methods=["DELETE"])
@require_tally_manage
def candidates_delete(candidate_id: int):
    with store.lock:
        cand, act = store.candidate(candidate_id)
        if cand is None:
            return fail(404, "候选人不存在")
        activity_id = act["id"]
        act["candidates"] = [c for c in act["candidates"] if c["id"] != candidate_id]
        store.data["records"] = [r for r in store.data["records"] if r["candidateId"] != candidate_id]
        act["updatedAt"] = now_rfc3339()
        store.save()
    hub.broadcast_activity(activity_id)
    return ok(None)


# --------------------------------------------------------------------------- #
# REST #10  录票（delta 可正可负）
# --------------------------------------------------------------------------- #

@app.route(API_PREFIX + "/admin/tally/candidates/<int:candidate_id>/vote", methods=["POST"])
@require_tally_manage
def candidates_vote(candidate_id: int):
    raw = body_json().get("delta")
    if isinstance(raw, bool) or raw is None:
        return fail(400, "票数变化不能为空")
    try:
        delta = int(raw)
    except (TypeError, ValueError):
        return fail(400, "票数变化必须为整数")
    if delta == 0:
        # 前端已拦一道，这里是后端兜底：0 票记录没有任何业务含义
        return fail(400, "票数变化不能为 0")

    with store.lock:
        cand, act = store.candidate(candidate_id)
        if cand is None:
            return fail(404, "候选人不存在")
        activity_id = act["id"]
        # 只有「进行中」允许录票——控制台在 status!==1 时会禁用按钮，这里是兜底。
        # 源站前端同样只做前置禁用，双端校验避免被绕过。
        if act["status"] != STATUS_LIVE:
            return fail(400, '活动当前状态为非「进行中」，无法录票')
        after = cand["voteCount"] + delta
        if after < 0:
            # 不允许把票数扣成负数：账本不变量 voteCount = Σdelta 依赖票数非负
            return fail(400, "扣减后票数不能为负数")
        cand["voteCount"] = after
        rec_id = store.next_id("record")
        store.data["records"].append({
            "id": rec_id,
            "activityId": activity_id,
            "candidateId": cand["id"],
            "candidateNumber": cand["number"],   # 冗余快照：候选人改名后日志仍可读
            "candidateName": cand["name"],
            "delta": delta,
            "type": 0,                            # 0 = 普通录票
            "createdAt": now_rfc3339(),
        })
        act["updatedAt"] = now_rfc3339()
        store.save()
        view = store.candidate_view(cand)
    hub.broadcast_activity(activity_id)
    return ok({"candidate": view, "recordId": rec_id})


# --------------------------------------------------------------------------- #
# REST #11  撤销上一次录票
# --------------------------------------------------------------------------- #

@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>/undo", methods=["POST"])
@require_tally_manage
def activities_undo(activity_id: int):
    with store.lock:
        act = store.activity(activity_id)
        if act is None:
            return fail(404, "活动不存在")
        rows = store.activity_records(activity_id)      # 倒序，第 0 条即"最近一次"
        if not rows or rows[0]["type"] != 0:
            # 无记录，或最近一次操作本身就是"撤销" → 无可撤销。
            # 刻意**不做"重做"**：撤销会追加一条 type=1 的反向记录，
            # 若允许对它再撤销就会把票数加回去，等于在唱票现场做二次确认，
            # 极易误触。前端据此弹 info 提示"无可撤销操作"。
            return ok(False)
        last = rows[0]
        cand = next((c for c in act["candidates"] if c["id"] == last["candidateId"]), None)
        if cand is None:
            # 候选人已被删除，其历史记录也已被级联清理，这里只是兜底
            return ok(False)
        cand["voteCount"] += -last["delta"]
        store.data["records"].append({
            "id": store.next_id("record"),
            "activityId": activity_id,
            "candidateId": cand["id"],
            "candidateNumber": cand["number"],
            "candidateName": cand["name"],
            "delta": -last["delta"],
            "type": 1,                                 # 1 = 撤销
            "createdAt": now_rfc3339(),
        })
        act["updatedAt"] = now_rfc3339()
        store.save()
    hub.broadcast_activity(activity_id)
    return ok(True)


# --------------------------------------------------------------------------- #
# REST #12  操作日志
# --------------------------------------------------------------------------- #

@app.route(API_PREFIX + "/admin/tally/activities/<int:activity_id>/records", methods=["GET"])
@require_tally_manage
def activities_records(activity_id: int):
    with store.lock:
        if store.activity(activity_id) is None:
            return fail(404, "活动不存在")
        rows = [store.record_view(r) for r in store.activity_records(activity_id)]
    return ok(rows)      # 控制台自己 slice(0, 20)，后端不截断，便于排查


# --------------------------------------------------------------------------- #
# WebSocket  大屏 / 控制台的实时推送通道
# --------------------------------------------------------------------------- #

@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id: int):
    """连接建立 → 立刻推全量快照；随后阻塞在 receive 上直到对端关闭。

    注意这里**没有**鉴权：源站 /tally/screen/:id 是 requiresAuth=false 的公开页，
    大屏常常挂在会场的大屏电脑上，运营方不会在上面登录。安全边界落在
    "只有 admin 路由才能改数据"，读快照本身是公开的。
    """
    conn = _Conn(ws)
    hub.add(activity_id, conn)
    try:
        # 首帧：让大屏"打开即有数据"，不必先 REST 拉一次
        with store.lock:
            act = store.activity(activity_id)
            first = store.ws_snapshot(act) if act else {
                "activityId": activity_id, "candidates": [], "status": None,
                "title": None, "updatedAt": now_ws_stamp(),
            }
        conn.send(json.dumps(first, ensure_ascii=False, separators=(",", ":")))

        # 前端从不发消息，但必须循环 receive：
        #   1) 只有 receive 才让底层读线程有机会感知 FIN/close；
        #   2) 断线在这里抛 ConnectionClosed，由 flask_sock 收尾。
        while True:
            try:
                ws.receive(timeout=1)
            except TimeoutError:
                continue
    except ConnectionClosed:
        pass
    finally:
        hub.remove(activity_id, conn)


# --------------------------------------------------------------------------- #
# 静态资源 + SPA 回退 + 登录态注入
# --------------------------------------------------------------------------- #

def _inject_dev_auth(html: str) -> str:
    """在入口 chunk 之前插入 <script src="/__dev-auth.js">。

    复用仓库自带的 tools/dev-auth.js（已复制到 static/dev-auth.js），
    磁盘上的 index.html 与 assets/*.js 不做任何改动：
    登录态靠**运行时**往 localStorage 写 token/user/expiresAt/permissions 实现。
    这是"仓库内部脚本解锁登录"的落地方式。
    """
    tag = '<script src="/__dev-auth.js"></script>\n    '
    if '<script type="module"' in html:
        return html.replace('<script type="module"', tag + '<script type="module"', 1)
    return html.replace("</head>", tag + "</head>", 1)


def _serve_index() -> Response:
    with open(os.path.join(STATIC_DIR, "index.html"), "rb") as fp:
        html = fp.read().decode("utf-8")
    if DEV_AUTH:
        html = _inject_dev_auth(html)
    return Response(html, mimetype="text/html; charset=utf-8")


@app.route("/__dev-auth.js")
def dev_auth_script():
    fp = os.path.join(STATIC_DIR, "dev-auth.js")
    if not os.path.isfile(fp):
        return "Not Found", 404
    with open(fp, "rb") as f:
        return Response(f.read(), mimetype="text/javascript; charset=utf-8")


@app.route("/")
def root():
    return _serve_index()


@app.route("/<path:subpath>")
def catch_all(subpath: str):
    """静态文件优先；未命中的**无扩展名**路径回落 index.html 交给 vue-router。

    缺了这段，刷新 /admin/tally、/admin/tally/activities/1/control、
    /tally/screen/1 这类深路由会直接 404 —— SPA 必须在服务端做 history 回退。
    """
    full = os.path.normpath(os.path.join(STATIC_DIR, subpath))
    if not full.startswith(STATIC_DIR):
        return "Forbidden", 403
    if os.path.isdir(full):
        full = os.path.join(full, "index.html")
    if os.path.isfile(full):
        ext = os.path.splitext(full)[1].lower()
        if ext == ".html":
            return _serve_index()
        return send_from_directory(STATIC_DIR, subpath, mimetype=MIME.get(ext))
    if os.path.splitext(subpath)[1]:
        # 带扩展名却找不到 = 真缺资源，不该回落成 HTML（MIME 错了更难查）
        return "Not Found: " + subpath, 404
    return _serve_index()


@app.after_request
def no_cache(resp):
    resp.headers["Cache-Control"] = "no-store"
    return resp


# --------------------------------------------------------------------------- #
# 端口选择：给定端口优先，否则随机可用端口（并做占用检测）
# --------------------------------------------------------------------------- #

def is_port_free(port: int, host: str = "0.0.0.0") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock_:
        sock_.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock_.bind((host, port))
            return True
        except OSError:
            return False


def pick_port(preferred: int | None) -> tuple[int, bool]:
    """返回 (port, 是否为自动改端口)。

    用户给了端口就用他的（被占用则顺延到下一个可用端口，绝不静默换掉用户端口）；
    没给就向内核要一个空闲端口（bind(0) 让操作系统分配），天然避开了占用问题。
    """
    if preferred:
        if is_port_free(preferred):
            return preferred, False
        for probe in range(preferred + 1, preferred + 50):
            if is_port_free(probe):
                return probe, True
        raise SystemExit(f"{preferred}~{preferred + 49} 端口均被占用，无法启动")
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock_:
            sock_.bind(("0.0.0.0", 0))
            port = sock_.getsockname()[1]
        if is_port_free(port):
            return port, True


def main() -> None:
    argv_port = next((int(a) for a in sys.argv[1:] if a.isdigit()), None)
    env_port = os.environ.get("TALLY_PORT")
    preferred = argv_port or (int(env_port) if env_port and env_port.isdigit() else None)

    port, auto = pick_port(preferred)
    if auto and preferred:
        print(f"[端口] {preferred} 已被占用，自动切换到 {port}")
    print("=" * 68)
    print("  tally（实时唱票）本地服务")
    print("=" * 68)
    print(f"  活动管理页   http://localhost:{port}/admin/tally")
    print(f"  唱票控制台   http://localhost:{port}/admin/tally/activities/1/control")
    print(f"  大屏         http://localhost:{port}/tally/screen/1")
    print(f"  WS 快照      ws://localhost:{port}/ws/tally/activity/1   (Ping 心跳 {PING_INTERVAL}s)")
    print(f"  数据文件     {DATA_FILE}")
    print(f"  登录态注入   {'已开启（复用 tools/dev-auth.js，接口 mock 已关）' if DEV_AUTH else '未开启'}")
    print("  Ctrl+C 停止")
    print("=" * 68)

    # Werkzeug 的 run_simple() 会先问 is_running_from_reloader()（实现是读
    # WERKZEUG_RUN_MAIN）：一旦为真，它就认为"我是 reloader 拉起的子进程"，
    # 于是改走 socket.fromfd(WERKZEUG_SERVER_FD) 分支去复用一个进程退出后
    # 早已失效的 fd，直接 OSError: [WinError 10038]。
    # 本进程以 use_reloader=False 启动，把这两个变量清掉即可，避免被误判。
    for var in ("WERKZEUG_RUN_MAIN", "WERKZEUG_SERVER_FD"):
        os.environ.pop(var, None)

    # threaded=True：WS 每条连接占用一个线程，必须并发；use_reloader=False 避免起两份进程抢同一个 tally.json
    app.run(host="0.0.0.0", port=port, threaded=True, debug=False, use_reloader=False)


if __name__ == "__main__":
    main()