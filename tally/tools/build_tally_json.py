"""把线上 WS 抓取到的四次活动快照转换为 tally/ 的初始数据 tally.json。

数据来源：live_snapshots.json（由 fetch_live.py 直连源站
wss://api.xmyzstudent.com/ws/tally/activity/{1,2,3,4} 抓取，无需认证）。

说明：
- title / status / candidates(number,name,displayOrder,voteCount) 均为源站真实数据；
- createdAt 在源站仅管理接口（需 Bearer token）可见，公开 WS 快照不含该字段，
  故以抓取时刻填充，并在链路分析报告中注明；
- records（操作日志）同样仅管理接口可见，初始为空，本地录票后自然增长。
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
SNAPSHOTS = HERE.parent.parent / "live_snapshots.json"
OUT = HERE.parent / "tally.json"
FETCHED_AT = "2026-09-20 23:00:30"  # 抓取时刻（GMT+8）

def main() -> None:
    raw = json.loads(SNAPSHOTS.read_text(encoding="utf-8"))
    activities, max_candidate_id = [], 0
    for item in raw:
        snap = item["snapshot"]
        candidates = sorted(snap["candidates"], key=lambda c: c["displayOrder"])
        for cand in candidates:
            max_candidate_id = max(max_candidate_id, cand["id"])
        activities.append({
            "id": snap["activityId"],
            "title": snap["title"],
            "status": snap["status"],
            "createdAt": FETCHED_AT,
            "updatedAt": FETCHED_AT,
            "candidates": [
                {
                    "id": c["id"],
                    "number": c["number"],
                    "name": c["name"],
                    "displayOrder": c["displayOrder"],
                    "voteCount": c["voteCount"],
                }
                for c in candidates
            ],
        })
    activities.sort(key=lambda a: a["id"])
    data = {
        "meta": {
            "description": "tally 选票业务单文件存储；初始数据抓取自 xmyzstudent.com 公开 WS 通道（id=1/2/3/4 四次活动）",
            "source": "wss://api.xmyzstudent.com/ws/tally/activity/{id}",
            "fetchedAt": FETCHED_AT,
            "schema": "activities[].candidates[] + records[] + sequences",
        },
        "activities": activities,
        "records": [],
        "sequences": {
            "activity": max(a["id"] for a in activities) + 1,
            "candidate": max_candidate_id + 1,
            "record": 1,
        },
    }
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    total_votes = sum(c["voteCount"] for a in activities for c in a["candidates"])
    print(f"wrote {OUT}")
    print(f"activities={len(activities)} candidates={sum(len(a['candidates']) for a in activities)} totalVotes={total_votes}")

if __name__ == "__main__":
    main()
