"""大屏实时推送：WebSocket 连接登记与广播。

前端（源站同构）行为：
  * 连接 wss://<origin>/ws/tally/activity/<id>
  * 收到任意文本帧即 JSON.parse，直接当作快照渲染
  * 断线后按 1s 起、指数退避至 30s 自动重连（见 useTallySocket-BrS_O9ye.js）

因此服务端契约就是：连上先推一份当前快照，之后每次票数/候选人变化再推一份。
"""
from __future__ import annotations

import json
import threading
import time
from typing import Any, Dict, List, Set


class TallySocketHub:
    """按活动 id 分组的连接集合，广播时逐连接独立容错。"""

    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._rooms: Dict[int, Set[Any]] = {}
        self._meta: Dict[Any, Dict[str, Any]] = {}

    # ---------------------------------------------------------------- 连接生命周期

    def register(self, activity_id: int, ws, remote: str) -> None:
        with self._lock:
            self._rooms.setdefault(activity_id, set()).add(ws)
            self._meta[ws] = {
                "activityId": activity_id,
                "remote": remote,
                "connectedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
                "sent": 0,
            }

    def unregister(self, ws) -> None:
        with self._lock:
            meta = self._meta.pop(ws, None)
            if meta is None:
                return
            room = self._rooms.get(meta["activityId"])
            if room is not None:
                room.discard(ws)
                if not room:
                    self._rooms.pop(meta["activityId"], None)

    # ---------------------------------------------------------------- 推送

    def send(self, ws, snapshot: Dict[str, Any]) -> bool:
        """给单个连接推一帧；失败返回 False（连接会被上层回收）。"""
        try:
            ws.send(json.dumps(snapshot, ensure_ascii=False))
            with self._lock:
                if ws in self._meta:
                    self._meta[ws]["sent"] += 1
            return True
        except Exception:  # noqa: BLE001
            return False

    def broadcast(self, activity_id: int, snapshot: Dict[str, Any]) -> int:
        with self._lock:
            targets = list(self._rooms.get(activity_id, ()))
        dead: List[Any] = []
        for ws in targets:
            if not self.send(ws, snapshot):
                dead.append(ws)
        for ws in dead:
            self.unregister(ws)
        return len(targets) - len(dead)

    # ---------------------------------------------------------------- 观测

    def client_count(self, activity_id: int = None) -> int:
        with self._lock:
            if activity_id is None:
                return sum(len(room) for room in self._rooms.values())
            return len(self._rooms.get(activity_id, ()))

    def describe(self) -> List[Dict[str, Any]]:
        with self._lock:
            return [dict(meta) for meta in self._meta.values()]
