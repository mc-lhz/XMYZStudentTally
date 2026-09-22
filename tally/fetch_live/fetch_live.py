"""连接源站 tally WS，抓取 id=1..4 活动快照（无需认证）。"""
import asyncio, json, sys
import websockets

URL = "wss://api.xmyzstudent.com/ws/tally/activity/{}"

async def grab(activity_id: int):
    url = URL.format(activity_id)
    try:
        async with websockets.connect(url, open_timeout=15, close_timeout=5) as ws:
            # 源站应在连接建立后立即推送一次全量快照
            raw = await asyncio.wait_for(ws.recv(), timeout=15)
            return {"id": activity_id, "ok": True, "raw": raw}
    except Exception as exc:  # noqa: BLE001
        return {"id": activity_id, "ok": False, "error": f"{type(exc).__name__}: {exc}"}

async def main():
    results = await asyncio.gather(*(grab(i) for i in (1, 2, 3, 4)))
    out = []
    for r in results:
        print(f"--- activity {r['id']} ---")
        if r["ok"]:
            print(r["raw"][:2000])
            try:
                out.append({"id": r["id"], "snapshot": json.loads(r["raw"])})
            except json.JSONDecodeError:
                out.append({"id": r["id"], "snapshot_raw": r["raw"]})
        else:
            print("ERROR:", r["error"])
            out.append({"id": r["id"], "error": r["error"]})
    with open("live_snapshots.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("\nsaved -> live_snapshots.json")

asyncio.run(main())
