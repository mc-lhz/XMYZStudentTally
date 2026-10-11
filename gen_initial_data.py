#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
由源站 WS 快照生成 tally.json 初始数据
========================================

为什么要"生成"而不是直接抄？
---------------------------
源站四次历史活动（id=1/2/3/4）的 **活动标题、状态、候选人（编号/姓名/显示顺序/
当前票数）** 可以通过**无需鉴权**的公开 WebSocket 快照接口直接抓到——这是本任务能
拿到的全部真实数据。REST 侧的 `/admin/tally/*` 需要 `tally.manage` 权限位，而出题方
发放的公共测试账号 AITest 的 `/permissions/my` 返回 `{"permissions":[]}`，
因此 `GET /admin/tally/activities` 返回的是 HTTP 403「权限不足」，抓不到。
（任务书里"若 401，请自行分析原因"就是指这件事：401 是缺 token，补上 token 后
变成 403 缺权限位；真正的无鉴权出口是 WS 快照。）

于是：
  · 活动 / 候选人的字段值 = 源站快照原样搬运，零杜撰；
  · `createdAt`、`updatedAt`、**操作记录（records）** = 本脚本按确定算法合成。
    源站记录表无公开出口，但本实现要求「票数 == Σ该候选人全部记录 delta」
    这条账本不变量成立（撤销靠追加反向记录实现），所以必须把历史票数摊成一串
    加减操作，才能让撤销、日志、大屏三处自洽。

用法：
    python gen_initial_data.py                 # 读 ws_snapshot.json，写 ../tally.json
    python gen_initial_data.py --force         # 覆盖已有 tally.json
"""

from __future__ import annotations

import json
import os
import random
import sys
from datetime import datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
SNAPSHOT_FILE = os.path.join(HERE, "ws_snapshot.json")
OUT_FILE = os.path.join(HERE, "tally.json")     # 与 app.py 的 DATA_FILE 保持一致

# 源站快照抓取时间（写在 ws_snapshot.json 的 meta 里，这里只作为兜底）
FALLBACK_FETCHED_AT = "2026-10-07T19:08:10"

# 每个活动的"开票时间"。源站不返回 createdAt，这里按标题语义取合理值，
# 仅为让活动列表页的"创建时间"列不空着；与票数、候选人等真实字段无关。
ACTIVITY_CREATED_AT = {
    1: "2026-06-18T14:30:00",
    2: "2026-06-18T15:05:00",
    3: "2026-09-25T10:12:00",
    4: "2026-09-28T09:40:00",
}

# 让 id=3 的最后一条记录是一次"撤销"，从而覆盖 undo 的两种分支：
#   · id=1/2/4 末尾是普通录票 → 点"撤销上一步"会真的撤销
#   · id=3  末尾是撤销记录   → 点"撤销上一步"返回 data=false，前端弹"无可撤销操作"
UNDO_TAIL_ACTIVITY = 3

# 常见的现场录票粒度：+1 点一个、+5 一组、+10 一大片
STEP_WEIGHTS = [1, 1, 1, 1, 1, 1, 5, 5, 10, 10]


def fmt(dt: datetime) -> str:
    """RFC3339（无时区），与 app.py / 源站 Go 的时间格式一致。"""
    return dt.strftime("%Y-%m-%dT%H:%M:%S")


def build_deltas(total: int, rng: random.Random) -> list[int]:
    """把一个候选人的总票数 total 摊成一串有涨有跌的 delta 序列，净和**恰为** total。

    规则：
      · 步长从现场常见粒度里随机取，且不超过「还差的票数」；
      · 约 6% 概率插一次 -1（现场改票/复核纠错）；
      · 用**累计值 acc** 而不是「剩余量」推进：插入 -1 会让 acc 回落，
        循环条件 acc < total 自然会多补一步补回来，因此净和恒等于 total；
      · 只在 acc > 0 时才插 -1，保证中途票数不出现负数。
    """
    deltas: list[int] = []
    acc = 0
    while acc < total:
        step = min(rng.choice(STEP_WEIGHTS), total - acc)
        if step <= 0:
            break
        deltas.append(step)
        acc += step
        if acc < total and acc > 0 and rng.random() < 0.06:
            deltas.append(-1)
            acc -= 1
    return deltas


def gen_records(activities: list[dict], next_record_id: int) -> tuple[list[dict], int]:
    """按候选人票数生成 records（全局 id 递增，最后按活动 + id 排序）。"""
    rng = random.Random(20261007)      # 固定种子 → 结果可复现
    rows: list[dict] = []
    seq = next_record_id

    for act in activities:
        base = datetime.strptime(
            ACTIVITY_CREATED_AT.get(act["id"], FALLBACK_FETCHED_AT), "%Y-%m-%dT%H:%M:%S"
        )
        # 先按候选人摊出各自的 delta 序列
        by_cand: dict[int, list] = {}
        for cand in act["candidates"]:
            deltas = build_deltas(cand["voteCount"], rng)
            if deltas:
                by_cand[cand["id"]] = [(cand, d) for d in deltas]
        if not by_cand:
            continue

        # 交错轮转：每个候选人每轮最多出 2 条，模拟"评委逐位打分"，
        # 避免日志退化成"某一个人一��气刷完全场"
        interleaved: list = []
        cursors = {cid: 0 for cid in by_cand}
        remaining = sum(len(b) for b in by_cand.values())
        while remaining > 0:
            for cid, bucket in by_cand.items():
                if cursors[cid] >= len(bucket):
                    continue
                for _ in range(2):
                    if cursors[cid] >= len(bucket):
                        break
                    interleaved.append(bucket[cursors[cid]])
                    cursors[cid] += 1
                    remaining -= 1

        # 时间：活动创建后 5 分钟开票，每条间隔 20~90 秒
        cursor_time = base + timedelta(minutes=5)
        for cand, delta in interleaved:
            cursor_time += timedelta(seconds=rng.randint(20, 90))
            rows.append({
                "id": seq,
                "activityId": act["id"],
                "candidateId": cand["id"],
                "candidateNumber": cand["number"],
                "candidateName": cand["name"],
                "delta": delta,
                "type": 0,
                "createdAt": fmt(cursor_time),
            })
            seq += 1

    # 给 id=3 补一对「+10 / -10（撤销）」记录，覆盖 undo 的"无可撤销"分支。
    # 这一对净和为 0，所以候选人的 voteCount 与源站快照仍然严格一致；
    # 而因为最后一条是 type=1，点「撤销上一步」会返回 data=false，前端弹"无可撤销操作"。
    if UNDO_TAIL_ACTIVITY:
        tail = [r for r in rows if r["activityId"] == UNDO_TAIL_ACTIVITY]
        if tail:
            last = max(tail, key=lambda r: r["createdAt"])
            ts = datetime.strptime(last["createdAt"], "%Y-%m-%dT%H:%M:%S")
            for offset, delta, rtype in ((30, 10, 0), (75, -10, 1)):
                rows.append({
                    "id": seq,
                    "activityId": last["activityId"],
                    "candidateId": last["candidateId"],
                    "candidateNumber": last["candidateNumber"],
                    "candidateName": last["candidateName"],
                    "delta": delta,
                    "type": rtype,
                    "createdAt": fmt(ts + timedelta(seconds=offset)),
                })
                seq += 1

    rows.sort(key=lambda r: (r["activityId"], r["id"]))
    return rows, seq


def main() -> None:
    if os.path.exists(OUT_FILE) and "--force" not in sys.argv:
        print(f"{OUT_FILE} 已存在，加 --force 覆盖")
        return
    with open(SNAPSHOT_FILE, "r", encoding="utf-8") as fp:
        snap = json.load(fp)

    activities = []
    max_candidate_id = 0
    for act_id in sorted(snap["snapshots"], key=int):
        snap_item = snap["snapshots"][act_id]
        created = ACTIVITY_CREATED_AT.get(int(act_id), FALLBACK_FETCHED_AT)
        candidates = []
        for cand in snap_item["candidates"]:
            max_candidate_id = max(max_candidate_id, cand["id"])
            candidates.append({
                "id": cand["id"],                 # 源站候选人 id 原样保留（含被删过的空洞）
                "number": cand["number"],
                "name": cand["name"],
                "displayOrder": cand["displayOrder"],
                "voteCount": cand["voteCount"],   # 真实票数，一条不改
            })
        activities.append({
            "id": int(act_id),
            "title": snap_item["title"],         # 真实标题
            "status": snap_item["status"],       # 真实状态（4 个均为 1=进行中）
            "createdAt": created,                # 合成：源站无公开出口
            "updatedAt": created,                # 合成：源站 REST 才返回，WS 里的 updatedAt 是广播时刻
            "candidates": candidates,
        })

    records, next_record_id = gen_records(activities, 1)

    # 自检：票数必须严格等于该候选人记录之和（撤销的反向记录也算在内）
    for act in activities:
        for cand in act["candidates"]:
            ledger = sum(r["delta"] for r in records
                         if r["candidateId"] == cand["id"] and r["type"] == 0)
            undo = sum(r["delta"] for r in records
                       if r["candidateId"] == cand["id"] and r["type"] == 1)
            assert ledger + undo == cand["voteCount"], (
                f"账本不平：候选人 {cand['id']} 票数={cand['voteCount']} "
                f"Σ普通={ledger} Σ撤销={undo}"
            )

    payload = {
        "meta": {
            "description": "tally 业务初始数据：活动/候选人/票数为源站 WS 快照真实值，"
                           "createdAt 与操作记录为本地合成（源站 REST 需 tally.manage 权限，公开出口只有 WS）",
            "sourceWs": snap.get("source", "wss://api.xmyzstudent.com/ws/tally/activity/{id}"),
            "fetchedAt": snap.get("fetchedAt", FALLBACK_FETCHED_AT),
            "generatedBy": "tally/gen_initial_data.py",
        },
        "nextIds": {
            "activity": max(a["id"] for a in activities) + 1,
            "candidate": max_candidate_id + 1,
            "record": next_record_id,
        },
        "activities": activities,
        "records": records,
    }
    with open(OUT_FILE, "w", encoding="utf-8") as fp:
        json.dump(payload, fp, ensure_ascii=False, indent=2)
    print(f"已生成 {OUT_FILE}")
    print(f"  活动 {len(activities)} 个，候选人 {sum(len(a['candidates']) for a in activities)} 位，"
          f"操作记录 {len(records)} 条")
    print(f"  下一个 id：activity={payload['nextIds']['activity']} "
          f"candidate={payload['nextIds']['candidate']} record={payload['nextIds']['record']}")


if __name__ == "__main__":
    main()