# -*- coding: utf-8 -*-
"""
============================================================================
 唱票（Tally）业务 · 独立 Flask 服务
============================================================================

 目标
 ----
 把源站 https://xmyzstudent.com 的「实时唱票」业务完整搬到本地跑：
   · 前端  —— 直接复用镜像里的 html / css / js（未重写任何页面代码）
   · 后端  —— 依据镜像 JS 反推出的接口契约，用 Flask 完整实现
   · 存储  —— 单个 tally.json
   · 实时  —— WebSocket，路径与源站一致：/ws/tally/activity/<id>

 接口契约（全部由 assets/tally-*.js 反推，baseURL 为 /api/v2）
 ------------------------------------------------------------------
   GET    /admin/tally/activities                 活动列表
   GET    /admin/tally/activities/<id>            活动详情（含 candidates）
   POST   /admin/tally/activities                 新建活动            {title}
   PUT    /admin/tally/activities/<id>            改标题 / 改状态      {title? , status?}
   DELETE /admin/tally/activities/<id>            删除活动（连带候选人 + 记录）
   POST   /admin/tally/activities/<id>/candidates 新增候选人          {number, name, displayOrder}
   PUT    /admin/tally/candidates/<cid>           改候选人            {number, name, displayOrder}
   DELETE /admin/tally/candidates/<cid>           删候选人（连带其记录）
   POST   /admin/tally/candidates/<cid>/vote      录票                {delta}
   POST   /admin/tally/activities/<id>/undo       撤销最近一次录票
   GET    /admin/tally/activities/<id>/records    操作日志（前端只取前 20 条）

   WebSocket /ws/tally/activity/<id>
     连接即下发全量快照；此后每次数据变更向同房间所有连接广播同一份快照。
     快照结构与源站逐字一致：
     {"activityId", "title", "status", "updatedAt",
      "candidates": [{"id", "number", "name", "displayOrder", "voteCount"}]}

 统一响应包装：{"code": 200, "message": "ok", "data": <...>}
   前端只判 code === 200，其余一律 toast 提示 message。

 运行
 ----
   pip install flask flask-sock
   python app.py                 # http://127.0.0.1:5055
   python app.py --port 8080 --host 0.0.0.0

 页面入口
 --------
   /admin/tally                        活动管理页（需登录态，本地由 __dev-auth.js 注入）
   /admin/tally/activities/1/edit      活动配置页
   /admin/tally/activities/1/control   唱票控制台
   /tally/screen/1                     公开大屏（免登录，可直接投屏）
============================================================================
"""

from __future__ import annotations

import argparse
import json
import os
import threading
import time
from datetime import datetime, timedelta
from queue import Empty, Queue

from flask import Flask, jsonify, request, send_from_directory
from flask_sock import Sock

# ---------------------------------------------------------------------------
# 常量与配置
# ---------------------------------------------------------------------------

# 状态枚举：与前端 select 的 0/1/2 一一对应
statusPending = 0   # 待开始
statusLive = 1      # 进行中（只有该状态允许录票）
statusEnded = 2     # 已结束

validStatus = (statusPending, statusLive, statusEnded)

# 操作日志类型
recordNormal = 0    # 普通录票
recordUndo = 1      # 撤销

# 单条 WS 连接读取其广播队列的超时（秒）。超时只是空转一次，用于及时感知断连。
queuePollTimeout = 1.0

# 目录布局：app.py 与 tally.json 同级，静态资源在 ./static 下
baseDir = os.path.dirname(os.path.abspath(__file__))
staticDir = os.path.join(baseDir, "static")
assetsDir = os.path.join(staticDir, "assets")
dataFile = os.path.join(baseDir, "tally.json")

# 鉴权开关：默认 None 表示本地放行一切 Bearer token（含前端注入的 dev-local-token）。
# 若需要严格校验，设环境变量 TALLY_AUTH_TOKEN=xxx，或在启动时传入 --token。
authToken = os.environ.get("TALLY_AUTH_TOKEN") or None

app = Flask(__name__)
sock = Sock(app)


# ---------------------------------------------------------------------------
# 工具：时间 / 响应包装
# ---------------------------------------------------------------------------

def nowString():
    """生成与源站同构的时间字符串。

    源站 updatedAt 形如 "2026-09-06 09:54:51.376214481"：
    Go 时间默认序列化格式，纳秒 9 位、空格分隔、不带时区。
    这里用「微秒 6 位 + 补 3 个 0」凑出同样的 9 位小数，保证前端
    new Date(str) 与日志排序的行为和线上完全一致。
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S.") + "%06d000" % datetime.now().microsecond


def ok(data=None, message="ok"):
    """成功响应包装。"""
    return jsonify({"code": 200, "message": message, "data": data})


def fail(message, code=400, httpStatus=200):
    """业务失败响应包装。

    注意：源站对业务错误也返回 HTTP 200，靠 body 里的 code 区分，
    前端 axios 拦截器只读 data.code。这里保持同样口径，避免前端
    把业务错误当成网络异常去弹「网络错误」。
    """
    return jsonify({"code": code, "message": message, "data": None}), httpStatus


def unauthorized():
    """401 未授权。与源站返回的 body 结构保持一致。"""
    return jsonify({"code": 401, "message": "未授权", "data": None}), 401


def parseDelta(value):
    """把请求体里的 delta 解析成非 0 整数，失败返回 None。"""
    try:
        delta = int(value)
    except (TypeError, ValueError):
        return None
    if delta == 0:
        return None
    return delta


# ---------------------------------------------------------------------------
# 数据存储：单个 tally.json + 进程内缓存 + 写锁
# ---------------------------------------------------------------------------

class tallyStore:
    """唱票数据的读写门面。

    设计要点：
      · 读多写少、数据量小 —— 直接在内存里维护一颗 dict，写操作立即整体落盘；
      · 所有对外方法都在 self.lock 内完成，保证「改数据 → 广播」是原子的，
        不会出现两个控制台同时录票导致票数错乱；
      · 落盘失败不回滚内存（本地场景优先保证可用），但会打印告警。
    """

    def __init__(self, path):
        self.path = path
        self.lock = threading.RLock()
        self.data = self._load()

    # ---------- 持久化 ----------

    def _load(self):
        """从磁盘加载；文件缺失时退化为空库，避免服务起不来。"""
        if os.path.exists(self.path):
            with open(self.path, "r", encoding="utf-8") as fp:
                return json.load(fp)
        return {"meta": {"nextActivityId": 1, "nextCandidateId": 1, "nextRecordId": 1},
                "activities": []}

    def _flush(self):
        """整体写回（先写临时文件再原子替换，避免写一半断电把库写坏）。"""
        tmp = self.path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fp:
            json.dump(self.data, fp, ensure_ascii=False, indent=2)
        os.replace(tmp, self.path)

    def _commit(self, activity=None, broadcast=True):
        """统一的提交入口：更新时间戳 → 落盘 →（可选）广播快照。"""
        if activity is not None:
            activity["updatedAt"] = nowString()
        try:
            self._flush()
        except OSError as exc:                       # 落盘失败不阻断内存态
            print("[tally] 写盘失败：%s" % exc)
        if broadcast and activity is not None:
            hub.publish(activity["id"], self.buildSnapshot(activity))

    # ---------- ID 分配 ----------

    def _nextId(self, key):
        value = int(self.data.setdefault("meta", {}).get(key, 1))
        self.data["meta"][key] = value + 1
        return value

    # ---------- 查询 ----------

    def activities(self):
        return self.data.setdefault("activities", [])

    def findActivity(self, activityId):
        for activity in self.activities():
            if activity["id"] == activityId:
                return activity
        return None

    def findCandidate(self, candidateId):
        """跨活动查找候选人，返回 (activity, candidate)。"""
        for activity in self.activities():
            for candidate in activity.get("candidates", []):
                if candidate["id"] == candidateId:
                    return activity, candidate
        return None, None

    def summary(self):
        """活动列表用：只给前端需要的字段，外加两个便于排查的统计值。"""
        result = []
        for activity in self.activities():
            candidates = activity.get("candidates", [])
            result.append({
                "id": activity["id"],
                "title": activity["title"],
                "status": activity["status"],
                "createdAt": activity.get("createdAt"),
                "updatedAt": activity.get("updatedAt"),
                "candidateCount": len(candidates),
                "totalVotes": sum(c["voteCount"] for c in candidates),
            })
        # 列表页按 id 倒序更符合「刚建的排最前」的直觉
        result.sort(key=lambda x: x["id"], reverse=True)
        return result

    def detail(self, activity):
        """活动详情：前端 TallyActivityEditPage 直接读 data.candidates。"""
        return {
            "id": activity["id"],
            "title": activity["title"],
            "status": activity["status"],
            "createdAt": activity.get("createdAt"),
            "updatedAt": activity.get("updatedAt"),
            "candidates": sorted(activity.get("candidates", []),
                                 key=lambda c: c.get("displayOrder", 0)),
        }

    def records(self, activity, limit=None):
        """操作日志：按时间倒序（最新在前），前端只 slice(0, 20)。"""
        rows = sorted(activity.get("records", []),
                      key=lambda r: r.get("createdAt", ""), reverse=True)
        return rows if limit is None else rows[:limit]

    # ---------- 快照（WS 推送体） ----------

    def buildSnapshot(self, activity):
        """构造与大屏 / 控制台约定好的全量快照，字段与源站逐字一致。"""
        return {
            "activityId": activity["id"],
            "title": activity["title"],
            "status": activity["status"],
            "updatedAt": activity.get("updatedAt", nowString()),
            "candidates": [
                {
                    "id": c["id"],
                    "number": c["number"],
                    "name": c["name"],
                    "displayOrder": c["displayOrder"],
                    "voteCount": c["voteCount"],
                }
                for c in sorted(activity.get("candidates", []),
                                key=lambda c: c.get("displayOrder", 0))
            ],
        }

    def snapshotOf(self, activityId):
        activity = self.findActivity(activityId)
        return self.buildSnapshot(activity) if activity else None

    # ---------- 写操作 ----------

    def createActivity(self, title):
        with self.lock:
            activity = {
                "id": self._nextId("nextActivityId"),
                "title": title,
                "status": statusPending,                 # 新建默认「待开始」
                "createdAt": nowString(),
                "updatedAt": nowString(),
                "candidates": [],
                "records": [],
            }
            self.activities().append(activity)
            self._commit(activity)
            return activity

    def updateActivity(self, activity, title=None, status=None):
        with self.lock:
            if title is not None:
                activity["title"] = title
            if status is not None:
                activity["status"] = status
            self._commit(activity)
            return activity

    def deleteActivity(self, activity):
        with self.lock:
            activityId = activity["id"]
            self.activities().remove(activity)
            self._flush()
            # 活动已删除，向房间推一条空快照，让仍开着的大屏优雅显示「暂无候选人」
            hub.publish(activityId, {"activityId": activityId, "title": "",
                                     "status": statusEnded, "updatedAt": nowString(),
                                     "candidates": []})
            return True

    def createCandidate(self, activity, number, name, displayOrder):
        with self.lock:
            candidate = {
                "id": self._nextId("nextCandidateId"),
                "number": number,
                "name": name,
                "displayOrder": displayOrder,
                "voteCount": 0,
            }
            activity.setdefault("candidates", []).append(candidate)
            self._commit(activity)
            return candidate

    def updateCandidate(self, activity, candidate, number, name, displayOrder):
        with self.lock:
            if number is not None:
                candidate["number"] = number
            if name is not None:
                candidate["name"] = name
            if displayOrder is not None:
                candidate["displayOrder"] = displayOrder
            self._commit(activity)
            return candidate

    def deleteCandidate(self, activity, candidate):
        """删候选人：连带清理它的历史唱票记录（与页面 confirm 文案一致）。"""
        with self.lock:
            candidateId = candidate["id"]
            activity["candidates"] = [c for c in activity.get("candidates", [])
                                      if c["id"] != candidateId]
            activity["records"] = [r for r in activity.get("records", [])
                                   if r.get("candidateId") != candidateId]
            self._commit(activity)
            return True

    def vote(self, activity, candidate, delta):
        """录票：票数增减 + 写一条 type=0 的操作日志。

        票数下限夹在 0：选票语义下不该出现负票；若源站允许负数，
        把下面的 max(0, ...) 去掉即可（已在报告里标注为本地设计选择）。
        """
        with self.lock:
            candidate["voteCount"] = max(0, candidate["voteCount"] + delta)
            activity.setdefault("records", []).append({
                "id": self._nextId("nextRecordId"),
                "candidateId": candidate["id"],
                "candidateNumber": candidate["number"],
                "candidateName": candidate["name"],
                "delta": delta,
                "type": recordNormal,
                "undone": False,
                "createdAt": nowString(),
            })
            self._commit(activity)
            return candidate["voteCount"]

    def undo(self, activity):
        """撤销最近一次「尚未被撤销」的录票。

        做法：从后往前找第一条 type=0 且 undone=False 的记录，标记它，
        反向增减票数，再追加一条 type=1 的撤销记录。
        返回 True 表示确实撤销了一条；False 表示无可撤销操作（前端会 toast「无可撤销操作」）。
        """
        with self.lock:
            for record in reversed(activity.get("records", [])):
                if record.get("type") == recordNormal and not record.get("undone"):
                    record["undone"] = True
                    candidate = next((c for c in activity.get("candidates", [])
                                      if c["id"] == record["candidateId"]), None)
                    if candidate is not None:
                        # 撤销时允许把票减回去，同样夹在 0
                        candidate["voteCount"] = max(0, candidate["voteCount"] - record["delta"])
                    activity["records"].append({
                        "id": self._nextId("nextRecordId"),
                        "candidateId": record["candidateId"],
                        "candidateNumber": record["candidateNumber"],
                        "candidateName": record["candidateName"],
                        "delta": -record["delta"],
                        "type": recordUndo,
                        "undone": True,
                        "createdAt": nowString(),
                    })
                    self._commit(activity)
                    return True
            return False


# ---------------------------------------------------------------------------
# WebSocket 广播中心：一个活动一个「房间」
# ---------------------------------------------------------------------------

class tallyHub:
    """按活动 ID 划分房间的广播中心。

    为什么每个连接要带一个 Queue？
      · 录票请求跑在 Flask 的工作线程里，而 WS 的 send 只允许持有该连接
        的线程调用（simple-websocket 的收发状态机不是线程安全的）；
      · 所以写线程只往队列里塞消息，连接线程负责真正 send，职责单一；
      · 连接断开时把队列移出房间，写线程自然不再往里塞，不会泄漏。
    """

    def __init__(self):
        self.lock = threading.Lock()
        self.rooms = {}          # activityId -> set(Queue)

    def subscribe(self, activityId):
        queue = Queue()
        with self.lock:
            self.rooms.setdefault(activityId, set()).add(queue)
        print("[ws] + 连接 activity=%s（当前房间连接数 %d）"
              % (activityId, len(self.rooms[activityId])))
        return queue

    def unsubscribe(self, activityId, queue):
        with self.lock:
            room = self.rooms.get(activityId)
            if room is None:
                return
            room.discard(queue)
            if not room:
                self.rooms.pop(activityId, None)
                print("[ws] - 断开 activity=%s（房间已空，销毁）" % activityId)
            else:
                print("[ws] - 断开 activity=%s（剩余 %d）" % (activityId, len(room)))

    def publish(self, activityId, snapshot):
        """向该活动房间内的所有连接广播快照（JSON 字符串）。"""
        payload = json.dumps(snapshot, ensure_ascii=False)
        with self.lock:
            queues = list(self.rooms.get(activityId, ()))
        for queue in queues:
            queue.put(payload)
        if queues:
            print("[ws] → 广播 activity=%s，%d 个连接" % (activityId, len(queues)))

    def size(self, activityId):
        with self.lock:
            return len(self.rooms.get(activityId, ()))


hub = tallyHub()
store = tallyStore(dataFile)


# ---------------------------------------------------------------------------
# 鉴权
# ---------------------------------------------------------------------------

def checkAuth():
    """校验 Bearer token。

    源站用 axios 请求拦截器从 localStorage 取 token 塞进 Authorization 头。
    本地镜像的登录态由 __dev-auth.js 注入的固定字符串提供，
    因此这里默认只做「头部存在性」级别的放行；
    一旦设置了 authToken，就严格比对，比对不过返回 401。
    """
    if authToken is None:
        return None
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return unauthorized()
    if header[len("Bearer "):].strip() != authToken:
        return unauthorized()
    return None


# ---------------------------------------------------------------------------
# REST：活动
# ---------------------------------------------------------------------------

@app.get("/api/v2/admin/tally/activities")
def listActivities():
    """活动列表。"""
    denied = checkAuth()
    if denied:
        return denied
    return ok(store.summary())


@app.get("/api/v2/admin/tally/activities/<int:activityId>")
def getActivity(activityId):
    """活动详情（含候选人）。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)
    return ok(store.detail(activity))


@app.post("/api/v2/admin/tally/activities")
def createActivity():
    """新建活动，只收 title，状态默认「待开始」。"""
    denied = checkAuth()
    if denied:
        return denied
    body = request.get_json(silent=True) or {}
    title = (body.get("title") or "").strip()
    if not title:
        return fail("标题不能为空")
    activity = store.createActivity(title)
    return ok({"id": activity["id"], "title": activity["title"],
               "status": activity["status"]})


@app.put("/api/v2/admin/tally/activities/<int:activityId>")
def updateActivity(activityId):
    """改标题和/或状态。两个字段都可选，传什么改什么。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)

    body = request.get_json(silent=True) or {}
    title = body.get("title")
    status = body.get("status")

    if title is not None:
        title = str(title).strip()
        if not title:
            return fail("标题不能为空")
    if status is not None:
        try:
            status = int(status)
        except (TypeError, ValueError):
            return fail("状态值非法")
        if status not in validStatus:
            return fail("状态值非法")

    store.updateActivity(activity, title=title, status=status)
    # 状态切换也要让大屏/控制台立刻感知（例如从「待开始」切到「进行中」解锁录票）
    return ok(store.detail(activity))


@app.delete("/api/v2/admin/tally/activities/<int:activityId>")
def deleteActivity(activityId):
    """删除活动，连带候选人与唱票记录。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)
    store.deleteActivity(activity)
    return ok(True)


# ---------------------------------------------------------------------------
# REST：候选人
# ---------------------------------------------------------------------------

@app.post("/api/v2/admin/tally/activities/<int:activityId>/candidates")
def createCandidate(activityId):
    """新增候选人。displayOrder 缺省时自动排在最后。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)

    body = request.get_json(silent=True) or {}
    number = str(body.get("number") or "").strip()
    name = str(body.get("name") or "").strip()
    if not number:
        return fail("请输入编号")
    if not name:
        return fail("请输入姓名")

    displayOrder = body.get("displayOrder")
    if displayOrder is None:
        displayOrder = max([c.get("displayOrder", 0)
                            for c in activity.get("candidates", [])] or [0]) + 1
    try:
        displayOrder = int(displayOrder)
    except (TypeError, ValueError):
        displayOrder = 0

    candidate = store.createCandidate(activity, number, name, displayOrder)
    return ok(candidate)


@app.put("/api/v2/admin/tally/candidates/<int:candidateId>")
def updateCandidate(candidateId):
    """改候选人的编号 / 姓名 / 显示顺序（不动票数）。"""
    denied = checkAuth()
    if denied:
        return denied
    activity, candidate = store.findCandidate(candidateId)
    if candidate is None:
        return fail("候选人不存在", code=404)

    body = request.get_json(silent=True) or {}
    number = body.get("number")
    name = body.get("name")
    displayOrder = body.get("displayOrder")

    if number is not None:
        number = str(number).strip()
        if not number:
            return fail("请输入编号")
    if name is not None:
        name = str(name).strip()
        if not name:
            return fail("请输入姓名")
    if displayOrder is not None:
        try:
            displayOrder = int(displayOrder)
        except (TypeError, ValueError):
            return fail("显示顺序必须是整数")

    store.updateCandidate(activity, candidate, number, name, displayOrder)
    return ok(candidate)


@app.delete("/api/v2/admin/tally/candidates/<int:candidateId>")
def deleteCandidate(candidateId):
    """删除候选人，连带其历史唱票记录。"""
    denied = checkAuth()
    if denied:
        return denied
    activity, candidate = store.findCandidate(candidateId)
    if candidate is None:
        return fail("候选人不存在", code=404)
    store.deleteCandidate(activity, candidate)
    return ok(True)


# ---------------------------------------------------------------------------
# REST：录票 / 撤销 / 日志
# ---------------------------------------------------------------------------

@app.post("/api/v2/admin/tally/candidates/<int:candidateId>/vote")
def voteCandidate(candidateId):
    """录票：body 为 {"delta": 整数}，可正可负但不能为 0。"""
    denied = checkAuth()
    if denied:
        return denied
    activity, candidate = store.findCandidate(candidateId)
    if candidate is None:
        return fail("候选人不存在", code=404)
    if activity["status"] != statusLive:
        return fail("活动未在进行中，无法录票")

    delta = parseDelta((request.get_json(silent=True) or {}).get("delta"))
    if delta is None:
        return fail("票数变化必须是非 0 整数")

    voteCount = store.vote(activity, candidate, delta)
    return ok({"candidateId": candidateId, "delta": delta, "voteCount": voteCount})


@app.post("/api/v2/admin/tally/activities/<int:activityId>/undo")
def undoActivity(activityId):
    """撤销最近一次录票。data 为 True/False，False 时前端 toast「无可撤销操作」。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)
    return ok(store.undo(activity))


@app.get("/api/v2/admin/tally/activities/<int:activityId>/records")
def listRecords(activityId):
    """操作日志（倒序）。前端只取前 20 条，这里顺手也只回 20 条。"""
    denied = checkAuth()
    if denied:
        return denied
    activity = store.findActivity(activityId)
    if activity is None:
        return fail("活动不存在", code=404)
    return ok(store.records(activity, limit=20))


# ---------------------------------------------------------------------------
# 健康检查 / 调试用
# ---------------------------------------------------------------------------

@app.get("/api/v2/tally/_debug")
def debugInfo():
    """本地排障用：看一眼数据规模与 WS 在线连接数。"""
    return ok({
        "dataFile": dataFile,
        "activities": len(store.activities()),
        "liveConnections": {str(k): hub.size(k) for k in list(hub.rooms.keys())},
        "serverTime": nowString(),
    })


# ---------------------------------------------------------------------------
# WebSocket：/ws/tally/activity/<id>
# ---------------------------------------------------------------------------

@sock.route("/ws/tally/activity/<int:activityId>")
def tallyActivityWs(ws, activityId):
    """唱票实时通道。

    协议极简（与源站一致）：
      · 服务端 → 客户端：只有一种消息 —— 全量快照 JSON。连上先发一帧，
        之后每次数据变更发一帧。客户端不做增量合并，直接整体替换。
      · 客户端 → 服务端：不发任何业务消息；前端的 useTallySocket 只负责接收。
        这里仍做一次非阻塞读取，用来及时感知浏览器关闭/刷新。
    """
    activity = store.findActivity(activityId)
    if activity is None:
        # 活动不存在：也接受连接并推一份空快照，避免前端一直停在「加载中」
        ws.send(json.dumps({"activityId": activityId, "title": "",
                            "status": statusEnded, "updatedAt": nowString(),
                            "candidates": []}, ensure_ascii=False))
        return

    queue = hub.subscribe(activityId)
    try:
        # 首帧：把当前全量状态交给刚进来的大屏 / 控制台
        ws.send(json.dumps(store.snapshotOf(activityId), ensure_ascii=False))

        while True:
            try:
                payload = queue.get(timeout=queuePollTimeout)
            except Empty:
                payload = None
            if payload is not None:
                ws.send(payload)

            if not ws.connected:
                break

            # 非阻塞读一帧；前端不发消息，能读到就说明对端关了
            try:
                incoming = ws.receive(timeout=0)
            except Exception:
                break
            if incoming is None and not ws.connected:
                break
    except Exception as exc:                          # send 失败 = 对端已断开
        print("[ws] activity=%s 连接异常结束：%s" % (activityId, exc))
    finally:
        hub.unsubscribe(activityId, queue)


# ---------------------------------------------------------------------------
# 静态资源 + SPA 回退
# ---------------------------------------------------------------------------

@app.get("/assets/<path:filename>")
def serveAssets(filename):
    """Vite 构建产物（入口 bundle、页面 chunk、CSS）。"""
    return send_from_directory(assetsDir, filename)


@app.get("/vite.svg")
@app.get("/__dev-auth.js")
def serveRootFiles():
    """站点根下的两个零散文件：favicon 与本地登录态注入脚本。"""
    name = request.path.lstrip("/")
    return send_from_directory(staticDir, name)


@app.get("/")
@app.get("/<path:path>")
def serveSpa(path=""):
    """SPA 兜底。

    前端用的是 history 模式路由，/admin/tally/activities/1/control 这类
    地址在服务端并不存在对应文件，必须回落到 index.html 交给前端路由解析。
    已在上面显式注册过的 /api/**、/ws/**、/assets/** 会优先命中，不受影响。
    """
    return send_from_directory(staticDir, "index.html")


# ---------------------------------------------------------------------------
# 启动
# ---------------------------------------------------------------------------

def main():
    global authToken       # 允许 --token 覆盖模块级鉴权开关

    parser = argparse.ArgumentParser(description="唱票(Tally)本地 Flask 服务")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址，默认 127.0.0.1")
    parser.add_argument("--port", type=int, default=5055, help="监听端口，默认 5055")
    parser.add_argument("--token", default=authToken,
                        help="开启严格鉴权时指定的 Bearer token（默认放行）")
    parser.add_argument("--debug", action="store_true", help="开启 Flask debug（会关闭多进程复用）")
    args = parser.parse_args()

    authToken = args.token

    print("=" * 66)
    print(" 唱票(Tally) 本地服务")
    print(" 数据文件：%s" % dataFile)
    print(" 活动数量：%d" % len(store.activities()))
    print(" 鉴权模式：%s" % ("严格校验 token" if authToken else "本地放行"))
    print(" 访问入口：http://%s:%d/admin/tally" % (args.host, args.port))
    print(" 公开大屏：http://%s:%d/tally/screen/1" % (args.host, args.port))
    print("=" * 66)

    # threaded=True：WS 连接会长期占用线程，单线程服务器会直接堵死
    app.run(host=args.host, port=args.port, debug=args.debug, threaded=True)


if __name__ == "__main__":
    main()
