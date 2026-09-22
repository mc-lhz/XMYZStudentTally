"""端到端 WS 测试：连接本地大屏 WS，REST 录票/撤销，验证广播快照。"""
import asyncio
import json
import urllib.request

BASE = "http://127.0.0.1:18923"
WS = "ws://127.0.0.1:18923/ws/tally/activity/4"

import websockets


def api(method: str, path: str, body: dict | None = None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        BASE + path, data=data, method=method,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read().decode())


async def main():
    async with websockets.connect(WS, open_timeout=10) as ws:
        first = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("初始快照: title=%s status=%s candidates=%d top=%s(%d票)" % (
            first["title"], first["status"], len(first["candidates"]),
            first["candidates"][-1]["name"], first["candidates"][-1]["voteCount"]))

        # 录票 +10
        r = api("POST", "/api/v2/admin/tally/candidates/19/vote", {"delta": 10})
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("录票+10 推送: 肖以晨=%d (期望 799+10=809)" % msg["candidates"][-1]["voteCount"])

        # 撤销
        r = api("POST", "/api/v2/admin/tally/activities/4/undo")
        print("撤销响应 data:", r["data"]["delta"] if r["data"] else None, r["message"])
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("撤销推送: 肖以晨=%d (期望回 799)" % msg["candidates"][-1]["voteCount"])

        # 再次撤销（最后一条已是撤销记录 → 无可撤销）
        r = api("POST", "/api/v2/admin/tally/activities/4/undo")
        print("二次撤销:", r["code"], r["message"], "data=", r["data"])

        # 改状态 → 广播
        api("PUT", "/api/v2/admin/tally/activities/4", {"status": 2})
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("改状态推送: status=%d (期望 2)" % msg["status"])

        # 状态改回 1
        api("PUT", "/api/v2/admin/tally/activities/4", {"status": 1})
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("状态改回推送: status=%d (期望 1)" % msg["status"])

        # 新增候选人 → 广播
        r = api("POST", "/api/v2/admin/tally/activities/4/candidates",
                {"number": "10", "name": "测试候选人", "displayOrder": 10})
        new_id = r["data"]["id"]
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("新增候选人推送: candidates=%d (期望 10)" % len(msg["candidates"]))

        # 清理：删除测试候选人
        api("DELETE", f"/api/v2/admin/tally/candidates/{new_id}")
        msg = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        print("删除候选人推送: candidates=%d (期望 9)" % len(msg["candidates"]))

        # 非进行中活动录票 → 400
        api("PUT", "/api/v2/admin/tally/activities/4", {"status": 0})
        try:
            api("POST", "/api/v2/admin/tally/candidates/19/vote", {"delta": 5})
            print("错误：待开始活动居然能录票")
        except urllib.error.HTTPError as e:
            print("待开始活动录票被拒:", e.code, json.loads(e.read().decode())["message"])
        api("PUT", "/api/v2/admin/tally/activities/4", {"status": 1})

        # 不存在的活动 WS → 兜底快照
        async with websockets.connect("ws://127.0.0.1:18923/ws/tally/activity/999", open_timeout=10) as ws2:
            msg = json.loads(await asyncio.wait_for(ws2.recv(), timeout=10))
            print("不存在活动 WS 兜底快照: title=%s status=%s" % (msg["title"], msg["status"]))

    # 新建 + 删除活动
    r = api("POST", "/api/v2/admin/tally/activities", {"title": "临时测试活动"})
    print("新建活动 id=%s" % r["data"]["id"])
    api("DELETE", f"/api/v2/admin/tally/activities/{r['data']['id']}")
    print("删除临时活动 OK")

    r = api("GET", "/api/v2/admin/tally/activities")
    print("最终活动列表 ids:", [a["id"] for a in r["data"]])

asyncio.run(main())
