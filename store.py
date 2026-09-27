"""tally 选票业务的单文件存储层。

设计要点：
  * 全部活动信息（活动 / 候选人 / 票数 / 操作记录）只落在同一个 tally.json 里；
  * 读取与写入都在进程内串行化（单进程 Flask + 一把可重入锁），避免并发写坏文件；
  * 写盘走「临时文件 + os.replace」原子替换，任何时刻磁盘上都是一份完整 JSON；
  * 载入失败一律 fail-closed：**锁写**并把坏文件另存为 .corrupt-<时间戳>，绝不用空数据覆盖。
"""
from __future__ import annotations

import json
import os
import shutil
import threading
from datetime import datetime
from typing import Any, Dict, List, Optional


class TallyStoreError(RuntimeError):
    """存储层错误（对外统一转成 500 业务响应）。"""


def _now_iso() -> str:
    return datetime.now().replace(microsecond=0).isoformat()


class TallyStore:
    """tally.json 的读写门面。"""

    def __init__(self, path: str):
        self.path = os.path.abspath(path)
        self._lock = threading.RLock()
        self._doc: Dict[str, Any] = {}
        self._readonly = False          # 载入失败后置位，拒绝一切写入
        self.load_error: Optional[str] = None
        self._load()

    # ------------------------------------------------------------------ 载入与落盘

    def _empty_doc(self) -> Dict[str, Any]:
        return {
            "version": 1,
            "generatedAt": _now_iso(),
            "source": {"note": "本地初始数据"},
            "sequences": {"activity": 0, "candidate": 0, "record": 0, "log": 0},
            "activities": [],
            "candidates": [],
            "records": [],
            "logs": [],
        }

    def _load(self) -> None:
        """载入数据；失败时进入 fail-closed 的只读状态，但不打断进程启动。

        阅读侧（列表/快照）在只读态下仍可服务（返回空集合），
        写入侧一律抛 TallyStoreError —— 绝不静默用空数据覆盖磁盘上的坏文件。
        """
        if not os.path.exists(self.path):
            self._doc = self._empty_doc()
            self._flush()
            return
        try:
            with open(self.path, "r", encoding="utf-8") as fh:
                doc = json.load(fh)
            self._validate(doc)
            self._doc = doc
        except Exception as exc:  # noqa: BLE001
            bad = f"{self.path}.corrupt-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
            try:
                shutil.copyfile(self.path, bad)
            except OSError:
                bad = "（坏文件备份失败）"
            self._readonly = True
            self._doc = self._empty_doc()
            self.load_error = f"tally.json 载入失败（已锁写，坏文件另存于 {bad}）：{exc}"
            print(f"[tally] {self.load_error}")

    @staticmethod
    def _validate(doc: Any) -> None:
        if not isinstance(doc, dict):
            raise ValueError("根节点必须是对象")
        for key in ("activities", "candidates", "records"):
            if not isinstance(doc.get(key), list):
                raise ValueError(f"字段 {key} 必须是数组")
        doc.setdefault("logs", [])
        seq = doc.setdefault("sequences", {})
        for key in ("activity", "candidate", "record", "log"):
            seq.setdefault(key, 0)
        # 序号自洽性：至少不小于现存条目数
        seq["activity"] = max(seq["activity"], max((a["id"] for a in doc["activities"]), default=0))
        seq["candidate"] = max(seq["candidate"], max((c["id"] for c in doc["candidates"]), default=0))
        seq["record"] = max(seq["record"], max((r["id"] for r in doc["records"]), default=0))

    def _flush(self) -> None:
        if self._readonly:
            raise TallyStoreError("存储处于只读保护状态（tally.json 载入失败），拒绝写入")
        tmp = f"{self.path}.tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(self._doc, fh, ensure_ascii=False, indent=2)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, self.path)

    # ------------------------------------------------------------------ 基础访问

    def _next(self, key: str) -> int:
        self._doc["sequences"][key] += 1
        return self._doc["sequences"][key]

    def activities(self) -> List[Dict[str, Any]]:
        with self._lock:
            return [dict(a) for a in self._doc["activities"]]

    def activity(self, activity_id: int) -> Optional[Dict[str, Any]]:
        with self._lock:
            for act in self._doc["activities"]:
                if act["id"] == activity_id:
                    return dict(act)
            return None

    def candidates_of(self, activity_id: int) -> List[Dict[str, Any]]:
        with self._lock:
            rows = [c for c in self._doc["candidates"] if c["activityId"] == activity_id]
        rows.sort(key=lambda c: (c.get("displayOrder", 0), c["id"]))
        return [dict(c) for c in rows]

    def candidate(self, candidate_id: int) -> Optional[Dict[str, Any]]:
        with self._lock:
            for cand in self._doc["candidates"]:
                if cand["id"] == candidate_id:
                    return dict(cand)
            return None

    def records_of(self, activity_id: int, limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """按时间倒序返回操作记录（前端展示最近 N 条）。"""
        with self._lock:
            rows = [dict(r) for r in self._doc["records"] if r["activityId"] == activity_id]
        rows.sort(key=lambda r: r["id"], reverse=True)
        return rows[:limit] if limit else rows

    def snapshot(self, activity_id: int) -> Optional[Dict[str, Any]]:
        """对外快照：大屏与控制台依赖的字段集合（与源站 /snapshot 结构一致）。"""
        with self._lock:
            act = next((a for a in self._doc["activities"] if a["id"] == activity_id), None)
            if act is None:
                return None
            cands = [
                {
                    "id": c["id"],
                    "number": c["number"],
                    "name": c["name"],
                    "displayOrder": c.get("displayOrder", 0),
                    "voteCount": c["voteCount"],
                }
                for c in self._doc["candidates"]
                if c["activityId"] == activity_id
            ]
        cands.sort(key=lambda c: (c["displayOrder"], c["id"]))
        return {
            "activityId": act["id"],
            "title": act["title"],
            "status": act["status"],
            "candidates": cands,
            "updatedAt": act.get("updatedAt") or _now_iso(),
        }

    # ------------------------------------------------------------------ 变更操作

    def create_activity(self, title: str) -> Dict[str, Any]:
        with self._lock:
            now = _now_iso()
            act = {
                "id": self._next("activity"),
                "title": title,
                "status": 0,
                "createdAt": now,
                "updatedAt": now,
            }
            self._doc["activities"].append(act)
            self._flush()
            return dict(act)

    def update_activity(self, activity_id: int, patch: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        with self._lock:
            act = next((a for a in self._doc["activities"] if a["id"] == activity_id), None)
            if act is None:
                return None
            if "title" in patch and patch["title"] is not None:
                act["title"] = str(patch["title"])
            if "status" in patch and patch["status"] is not None:
                act["status"] = int(patch["status"])
            act["updatedAt"] = _now_iso()
            self._flush()
            return dict(act)

    def delete_activity(self, activity_id: int) -> bool:
        with self._lock:
            before = len(self._doc["activities"])
            self._doc["activities"] = [a for a in self._doc["activities"] if a["id"] != activity_id]
            if len(self._doc["activities"]) == before:
                return False
            cand_ids = {c["id"] for c in self._doc["candidates"] if c["activityId"] == activity_id}
            self._doc["candidates"] = [c for c in self._doc["candidates"] if c["activityId"] != activity_id]
            self._doc["records"] = [r for r in self._doc["records"] if r["activityId"] != activity_id]
            self._doc["logs"] = [g for g in self._doc["logs"] if g.get("activityId") != activity_id]
            self._log(activity_id, "delete-activity", {"removedCandidates": sorted(cand_ids)})
            self._flush()
            return True

    def add_candidate(self, activity_id: int, number: str, name: str, display_order: int) -> Optional[Dict[str, Any]]:
        with self._lock:
            act = next((a for a in self._doc["activities"] if a["id"] == activity_id), None)
            if act is None:
                return None
            cand = {
                "id": self._next("candidate"),
                "activityId": activity_id,
                "number": str(number),
                "name": str(name),
                "displayOrder": int(display_order),
                "voteCount": 0,
            }
            self._doc["candidates"].append(cand)
            act["updatedAt"] = _now_iso()
            self._log(activity_id, "add-candidate", {"candidateId": cand["id"]})
            self._flush()
            return dict(cand)

    def update_candidate(self, candidate_id: int, patch: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        with self._lock:
            cand = next((c for c in self._doc["candidates"] if c["id"] == candidate_id), None)
            if cand is None:
                return None
            if patch.get("number") is not None:
                cand["number"] = str(patch["number"])
            if patch.get("name") is not None:
                cand["name"] = str(patch["name"])
            if patch.get("displayOrder") is not None:
                cand["displayOrder"] = int(patch["displayOrder"])
            act = next((a for a in self._doc["activities"] if a["id"] == cand["activityId"]), None)
            if act is not None:
                act["updatedAt"] = _now_iso()
            self._log(cand["activityId"], "update-candidate", {"candidateId": candidate_id})
            self._flush()
            return dict(cand)

    def delete_candidate(self, candidate_id: int) -> bool:
        with self._lock:
            cand = next((c for c in self._doc["candidates"] if c["id"] == candidate_id), None)
            if cand is None:
                return False
            self._doc["candidates"] = [c for c in self._doc["candidates"] if c["id"] != candidate_id]
            act = next((a for a in self._doc["activities"] if a["id"] == cand["activityId"]), None)
            if act is not None:
                act["updatedAt"] = _now_iso()
            self._log(cand["activityId"], "delete-candidate", {"candidateId": candidate_id})
            self._flush()
            return True

    def vote(self, candidate_id: int, delta: int) -> Optional[Dict[str, Any]]:
        """现场录票：累加票数并写一条 type=0（普通）记录。"""
        with self._lock:
            cand = next((c for c in self._doc["candidates"] if c["id"] == candidate_id), None)
            if cand is None:
                return None
            cand["voteCount"] = max(0, int(cand["voteCount"]) + int(delta))
            record = {
                "id": self._next("record"),
                "activityId": cand["activityId"],
                "candidateId": cand["id"],
                "candidateNumber": cand["number"],
                "candidateName": cand["name"],
                "delta": int(delta),
                "type": 0,
                "createdAt": _now_iso(),
            }
            self._doc["records"].append(record)
            act = next((a for a in self._doc["activities"] if a["id"] == cand["activityId"]), None)
            if act is not None:
                act["updatedAt"] = _now_iso()
            self._flush()
            return {"candidate": dict(cand), "record": dict(record), "activityId": cand["activityId"]}

    def undo_last(self, activity_id: int) -> Optional[Dict[str, Any]]:
        """撤销最近一次可撤销的录票：票数回滚，并写入一条 type=1（撤销）记录。

        返回 None 表示没有可撤销操作。
        """
        with self._lock:
            rows = [r for r in self._doc["records"] if r["activityId"] == activity_id]
            if not rows:
                return None
            # 撤销语义：取最近一条「未被撤销抵消」的录票
            undone_ids = set()
            for rec in rows:
                if rec.get("type") == 1 and rec.get("undoOf") is not None:
                    undone_ids.add(rec["undoOf"])
            target = None
            for rec in sorted(rows, key=lambda r: r["id"], reverse=True):
                if rec["type"] == 0 and rec["id"] not in undone_ids:
                    target = rec
                    break
            if target is None:
                return None
            cand = next((c for c in self._doc["candidates"] if c["id"] == target["candidateId"]), None)
            if cand is None:
                return None
            cand["voteCount"] = max(0, int(cand["voteCount"]) - int(target["delta"]))
            undo_record = {
                "id": self._next("record"),
                "activityId": activity_id,
                "candidateId": cand["id"],
                "candidateNumber": cand["number"],
                "candidateName": cand["name"],
                "delta": -int(target["delta"]),
                "type": 1,
                "undoOf": target["id"],
                "createdAt": _now_iso(),
            }
            self._doc["records"].append(undo_record)
            act = next((a for a in self._doc["activities"] if a["id"] == activity_id), None)
            if act is not None:
                act["updatedAt"] = _now_iso()
            self._flush()
            return {"candidate": dict(cand), "record": dict(undo_record), "activityId": activity_id}

    # ------------------------------------------------------------------ 审计日志

    def _log(self, activity_id: Optional[int], action: str, detail: Dict[str, Any]) -> None:
        self._doc["logs"].append(
            {
                "id": self._next("log"),
                "activityId": activity_id,
                "action": action,
                "detail": detail,
                "createdAt": _now_iso(),
            }
        )
        if len(self._doc["logs"]) > 2000:
            self._doc["logs"] = self._doc["logs"][-2000:]

    def is_readonly(self) -> bool:
        return self._readonly
