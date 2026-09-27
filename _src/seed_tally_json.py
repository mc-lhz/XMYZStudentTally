"""抓取线上源站四场 tally 活动的真实数据，生成 tally.json 初始数据。

数据来源（公开接口，无需认证）：
    GET https://xmyzstudent.com/api/v2/tally/activities/{id}/snapshot
返回：{activityId, title, status, candidates[{id,number,name,displayOrder,voteCount}], updatedAt}

说明：管理侧接口（/admin/tally/...）需要登录，线上未开放抓取；
      因此活动元信息（标题/状态/候选人/票数）以公开快照为准，
      操作记录按初始票数合成一条 seed 记录（有据可查：见 docs 报告中的说明）。
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timedelta

ORIGIN = "https://xmyzstudent.com"
SNAPSHOT = ORIGIN + "/api/v2/tally/activities/{}/snapshot"
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": ORIGIN + "/",
}

OUT = sys.argv[1]
ACTIVITY_IDS = [1, 2, 3, 4]


def fetch_snapshot(activity_id):
    req = urllib.request.Request(SNAPSHOT.format(activity_id), headers=UA)
    body = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
    payload = json.loads(body)
    if payload.get("code") != 200:
        raise RuntimeError(f"活动 {activity_id} 快照拉取失败: {payload}")
    return payload["data"]


def main():
    activities, candidates, records, logs = [], [], [], []
    activity_seq, candidate_seq, record_seq = 0, 0, 0
    base_time = datetime.now().replace(microsecond=0)

    for offset, activity_id in enumerate(ACTIVITY_IDS):
        snap = fetch_snapshot(activity_id)
        activity_seq += 1
        created = (base_time - timedelta(days=len(ACTIVITY_IDS) - offset)).isoformat()
        activities.append(
            {
                "id": activity_seq,
                "sourceId": snap["activityId"],
                "title": snap["title"],
                "status": snap["status"],
                "createdAt": created,
                "updatedAt": snap["updatedAt"],
            }
        )
        for cand in snap["candidates"]:
            candidate_seq += 1
            candidates.append(
                {
                    "id": candidate_seq,
                    "activityId": activity_seq,
                    "number": cand["number"],
                    "name": cand["name"],
                    "displayOrder": cand["displayOrder"],
                    "voteCount": cand["voteCount"],
                }
            )
            # 初始票数以一条 seed 记录留痕，便于控制台「操作日志」有据可依
            if cand["voteCount"] > 0:
                record_seq += 1
                records.append(
                    {
                        "id": record_seq,
                        "activityId": activity_seq,
                        "candidateId": candidate_seq,
                        "candidateNumber": cand["number"],
                        "candidateName": cand["name"],
                        "delta": cand["voteCount"],
                        "type": 0,
                        "seed": True,
                        "createdAt": created,
                    }
                )

    doc = {
        "version": 1,
        "generatedAt": base_time.isoformat(),
        "source": {
            "site": ORIGIN,
            "snapshotApi": SNAPSHOT.format("{id}"),
            "note": "四场活动标题/状态/候选人与票数来自源站公开快照接口（无需认证）",
        },
        "sequences": {
            "activity": activity_seq,
            "candidate": candidate_seq,
            "record": record_seq,
            "log": 0,
        },
        "activities": activities,
        "candidates": candidates,
        "records": records,
        "logs": logs,
    }
    os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=2)

    print(f"已写入 {OUT}")
    print(f"活动 {len(activities)} 个 / 候选人 {len(candidates)} 人 / 记录 {len(records)} 条")
    for act in activities:
        cands = [c for c in candidates if c["activityId"] == act["id"]]
        total = sum(c["voteCount"] for c in cands)
        print(f"  id={act['id']} {act['title']} 候选人={len(cands)} 总票数={total} 状态={act['status']}")


if __name__ == "__main__":
    main()
