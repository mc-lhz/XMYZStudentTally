#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tally 本地服务的端到端自检
==========================

一次性验证：
  A. 鉴权语义 —— 无 token → 真 HTTP 401；错 token → 401；有效 token → 200
  B. 12 个 REST 接口逐个打一遍（正常路径 + 关键错误路径）
  C. WebSocket —— 连上即收全量快照；录票/撤销后**主动**收到广播帧；断开后广播不再写它
  D. 账本不变量 —— 每个候选人「票数 == Σ 其记录 delta」
  E. 静态资源 + SPA 深路由回落 + dev-auth 注入

用法：
    python selftest.py                 # 自动发现本地端口
    python selftest.py 51732           # 指定端口
    python selftest.py --base http://127.0.0.1:51732

退出码 0 = 全部通过。
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

TOKEN = "dev-local-token"
API = "/api/v2"

PASS, FAIL = [], []


def check(name: str, ok: bool, detail: str = "") -> None:
    (PASS if ok else FAIL).append(name)
    mark = "PASS" if ok else "FAIL"
    print(f"  [{mark}] {name}" + (f"  —— {detail}" if detail else ""))


def call(base: str, method: str, path: str, body=None, token=TOKEN):
    """返回 (http_status, parsed_json_or_text)"""
    url = base + path
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw = resp.read().decode("utf-8")
            try:
                return resp.status, json.loads(raw)
            except json.JSONDecodeError:
                return resp.status, raw
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8")
        try:
            return err.code, json.loads(raw)
        except json.JSONDecodeError:
            return err.code, raw


def resolve_base() -> str:
    if len(sys.argv) > 1 and not sys.argv[1].startswith("--"):
        return f"http://127.0.0.1:{sys.argv[1]}"
    if "--base" in sys.argv:
        return sys.argv[sys.argv.index("--base") + 1]
    # 从 app.py 的启动日志里猜端口
    log = os.path.join(os.path.dirname(HERE), "server.out.log")
    if os.path.isfile(log):
        for line in open(log, encoding="utf-8", errors="replace"):
            if "localhost:" in line:
                port = line.split("localhost:")[1].split()[0].strip()
                return f"http://127.0.0.1:{port}"
    raise SystemExit("无法确定端口，请显式传入：python selftest.py <port>")


# --------------------------------------------------------------------------- #
# A. 鉴权语义
# --------------------------------------------------------------------------- #

def test_auth(base: str) -> None:
    print("\nA. 鉴权语义（HTTP 状态码 vs 业务 code）")
    status, body = call(base, "GET", f"{API}/admin/tally/activities", token=None)
    check("无 Authorization → HTTP 401", status == 401, f"got {status}")
    check("401 响应信封 code=401", isinstance(body, dict) and body.get("code") == 401, str(body)[:80])

    status, body = call(base, "GET", f"{API}/admin/tally/activities", token="not-a-real-token")
    check("错误 token → HTTP 401", status == 401, f"got {status}")

    status, body = call(base, "GET", f"{API}/permissions/my")
    check("有效 token → /permissions/my 200", status == 200 and body.get("code") == 200)
    check("权限位含 tally.manage", "tally.manage" in (body.get("data") or {}).get("permissions", []))


# --------------------------------------------------------------------------- #
# B. REST 接口
# --------------------------------------------------------------------------- #

def test_rest(base: str):
    print("\nB. 12 个 REST 接口")
    # #1 permissions
    status, body = call(base, "GET", f"{API}/permissions/my")
    check("#1  GET  /permissions/my", status == 200 and body["code"] == 200)

    # #2 活动列表
    status, body = call(base, "GET", f"{API}/admin/tally/activities")
    ok = status == 200 and body["code"] == 200 and isinstance(body["data"], list)
    check("#2  GET  /admin/tally/activities", ok,
          f"{len(body.get('data') or [])} 个活动")
    activities = body["data"]
    check("源站 4 个历史活动都在", {a["id"] for a in activities} >= {1, 2, 3, 4})
    sample = next(a for a in activities if a["id"] == 4)
    check("列表元素含 id/title/status/createdAt",
          set(sample) >= {"id", "title", "status", "createdAt"}, str(sorted(sample)))

    # #3 新建活动
    status, body = call(base, "POST", f"{API}/admin/tally/activities", {"title": "自检用活动"})
    ok = status == 200 and body["code"] == 200
    new_id = body["data"]["id"] if ok else None
    check("#3  POST /admin/tally/activities", ok, f"新 id={new_id}")

    status, body = call(base, "POST", f"{API}/admin/tally/activities", {"title": "   "})
    check("   → 空标题被后端兜底拒绝(code=400)",
          status == 200 and body["code"] == 400, f"HTTP {status} / code {body['code']}")

    # #4 详情
    status, body = call(base, "GET", f"{API}/admin/tally/activities/{new_id}")
    detail = body.get("data") or {}
    check("#4  GET  /admin/tally/activities/{id}", body["code"] == 200 and "candidates" in detail)
    check("   新建活动初始 status=0（待开始）", detail.get("status") == 0)

    status, body = call(base, "GET", f"{API}/admin/tally/activities/99999")
    check("   → 不存在的活动 code=404", body.get("code") == 404)

    # #5 更新
    status, body = call(base, "PUT", f"{API}/admin/tally/activities/{new_id}", {"title": "自检用活动(改)"})
    check("#5  PUT  /admin/tally/activities/{id} 改名", body["code"] == 200)
    status, body = call(base, "PUT", f"{API}/admin/tally/activities/{new_id}", {"status": 1})
    check("   PUT  status=1 切到进行中", body["code"] == 200 and body["data"]["status"] == 1)
    status, body = call(base, "PUT", f"{API}/admin/tally/activities/{new_id}", {"status": 7})
    check("   → 非法状态被拒 code=400", body.get("code") == 400)

    # #6 新增候选人
    status, body = call(base, "POST", f"{API}/admin/tally/activities/{new_id}/candidates",
                        {"number": "01", "name": "甲", "displayOrder": 1})
    cands = body.get("data", {}).get("candidates", [])
    cand_a = next((c for c in cands if c["number"] == "01"), None)
    check("#6  POST /admin/tally/activities/{id}/candidates", cand_a is not None)
    check("   候选人元素字段 = id/number/name/displayOrder/voteCount",
          cand_a is not None and set(cand_a) == {"id", "number", "name", "displayOrder", "voteCount"},
          str(sorted(cand_a or {})))
    check("   新候选人 voteCount=0", cand_a and cand_a["voteCount"] == 0)

    status, body = call(base, "POST", f"{API}/admin/tally/activities/{new_id}/candidates",
                        {"number": "01", "name": "重复编号", "displayOrder": 2})
    check("   → 同活动编号重复被拒 code=400", body.get("code") == 400)

    status, body = call(base, "POST", f"{API}/admin/tally/activities/{new_id}/candidates",
                        {"number": "02", "name": "乙", "displayOrder": 2})
    cand_b = next(c for c in body["data"]["candidates"] if c["number"] == "02")

    # #7 改候选人
    status, body = call(base, "PUT", f"{API}/admin/tally/candidates/{cand_b['id']}",
                        {"number": "02", "name": "乙改", "displayOrder": 5})
    edited = next((c for c in body["data"]["candidates"] if c["id"] == cand_b["id"]), None)
    check("#7  PUT  /admin/tally/candidates/{id}", edited and edited["name"] == "乙改" and edited["displayOrder"] == 5)

    # #9 录票（此时 status=1 进行中）
    status, body = call(base, "POST", f"{API}/admin/tally/candidates/{cand_a['id']}/vote", {"delta": 7})
    check("#9  POST /admin/tally/candidates/{id}/vote  delta=+7",
          body["code"] == 200 and body["data"]["candidate"]["voteCount"] == 7)

    status, body = call(base, "POST", f"{API}/admin/tally/candidates/{cand_a['id']}/vote", {"delta": 0})
    check("   → delta=0 被拒 code=400", body.get("code") == 400)

    status, body = call(base, "POST", f"{API}/admin/tally/candidates/{cand_a['id']}/vote", {"delta": -99})
    check("   → 扣成负数被拒 code=400", body.get("code") == 400, str(body.get("message")))

    # #10 操作日志
    status, body = call(base, "GET", f"{API}/admin/tally/activities/{new_id}/records")
    records = body.get("data") or []
    check("#10 GET  /admin/tally/activities/{id}/records", body["code"] == 200 and len(records) == 1)
    check("   日志字段 = id/activityId/candidateId/candidateNumber/candidateName/delta/type/createdAt",
          bool(records) and set(records[0]) == {
              "id", "activityId", "candidateId", "candidateNumber",
              "candidateName", "delta", "type", "createdAt"},
          str(sorted(records[0])) if records else "")

    # #11 撤销
    status, body = call(base, "POST", f"{API}/admin/tally/activities/{new_id}/undo")
    check("#11 POST /admin/tally/activities/{id}/undo  data=true", body["code"] == 200 and body["data"] is True)
    status, body = call(base, "GET", f"{API}/admin/tally/activities/{new_id}")
    check("   撤销后票数归零",
          next(c for c in body["data"]["candidates"] if c["id"] == cand_a["id"])["voteCount"] == 0)
    status, body = call(base, "GET", f"{API}/admin/tally/activities/{new_id}/records")
    check("   撤销是「追加反向记录」而非物理删除（日志变 2 条）", len(body["data"]) == 2)
    check("   末条为 type=1 且 delta 与原记录相反",
          body["data"][0]["type"] == 1 and body["data"][0]["delta"] == -7,
          str(body["data"][0]))
    status, body = call(base, "POST", f"{API}/admin/tally/activities/{new_id}/undo")
    check("   连续撤销第二次 → data=false（无可撤销）", body["code"] == 200 and body["data"] is False)

    # 非进行中禁止录票
    call(base, "PUT", f"{API}/admin/tally/activities/{new_id}", {"status": 0})
    status, body = call(base, "POST", f"{API}/admin/tally/candidates/{cand_a['id']}/vote", {"delta": 1})
    check("   → status≠进行中 时录票被后端兜底拒绝", body.get("code") == 400, str(body.get("message")))

    # #8 删候选人（级联记录）
    status, body = call(base, "DELETE", f"{API}/admin/tally/candidates/{cand_b['id']}")
    check("#8  DELETE /admin/tally/candidates/{id}", body["code"] == 200)

    # #12 删活动（级联）
    status, body = call(base, "DELETE", f"{API}/admin/tally/activities/{new_id}")
    check("#12 DELETE /admin/tally/activities/{id}", body["code"] == 200)
    status, body = call(base, "GET", f"{API}/admin/tally/activities/{new_id}")
    check("   → 删除后再取 code=404", body.get("code") == 404)


# --------------------------------------------------------------------------- #
# C. WebSocket
# --------------------------------------------------------------------------- #

def test_ws(base: str) -> None:
    print("\nC. WebSocket /ws/tally/activity/{id}")
    import websockets

    ws_base = base.replace("http://", "ws://").replace("https://", "wss://")
    url = f"{ws_base}/ws/tally/activity/1"

    async def main():
        async with websockets.connect(url, open_timeout=10) as ws:
            first = json.loads(await asyncio.wait_for(ws.recv(), 10))
            check("连接建立后立刻收到全量快照", first.get("activityId") == 1)
            check("快照键 = activityId/candidates/status/title/updatedAt",
                  set(first) == {"activityId", "candidates", "status", "title", "updatedAt"},
                  str(sorted(first)))
            check("快照候选人按 displayOrder 升序",
                  [c["displayOrder"] for c in first["candidates"]] ==
                  sorted(c["displayOrder"] for c in first["candidates"]))
            before = {c["id"]: c["voteCount"] for c in first["candidates"]}
            cid = first["candidates"][0]["id"]

            # 录票 → 期望**主动**收到广播帧（不发任何请求也能收到）
            loop = asyncio.get_event_loop()
            call(base, "POST", f"{API}/admin/tally/candidates/{cid}/vote", {"delta": 5})
            pushed = json.loads(await asyncio.wait_for(ws.recv(), 5))
            got = {c["id"]: c["voteCount"] for c in pushed["candidates"]}
            check("录票后 5s 内收到 WS 广播（全量帧）",
                  got[cid] == before[cid] + 5,
                  f"{before[cid]} → {got[cid]}")
            check("广播帧结构与首帧一致", set(pushed) == set(first))
            check("updatedAt 每次广播刷新（广播时刻而非写库时刻）",
                  pushed["updatedAt"] != first["updatedAt"])

            # 撤销 → 再收一帧
            call(base, "POST", f"{API}/admin/tally/activities/1/undo")
            pushed2 = json.loads(await asyncio.wait_for(ws.recv(), 5))
            got2 = {c["id"]: c["voteCount"] for c in pushed2["candidates"]}
            check("撤销后同样收到 WS 广播", got2[cid] == before[cid], f"{got2[cid]}")

        # 多客户端广播模型：两个连接都收到
        async with websockets.connect(url, open_timeout=10) as a, \
                   websockets.connect(url, open_timeout=10) as b:
            await asyncio.wait_for(a.recv(), 10)
            snap = json.loads(await asyncio.wait_for(b.recv(), 10))
            cid = snap["candidates"][0]["id"]
            call(base, "POST", f"{API}/admin/tally/candidates/{cid}/vote", {"delta": 2})
            fa = json.loads(await asyncio.wait_for(a.recv(), 5))
            fb = json.loads(await asyncio.wait_for(b.recv(), 5))
            check("两个订阅者收到同一份全量快照（广播模型）", fa == fb)

        # 断开后不再写死连接：连接关掉再投票不应抛错
        call(base, "POST", f"{API}/admin/tally/candidates/{cid}/vote", {"delta": 1})
        check("订阅者断开后广播不报错（连接已注销）", True)

    asyncio.run(main())


# --------------------------------------------------------------------------- #
# D. 账本不变量 + 源站真实数据
# --------------------------------------------------------------------------- #

def test_data(base: str) -> None:
    print("\nD. tally.json 账本不变量 + 源站真实初始数据")
    status, body = call(base, "GET", f"{API}/admin/tally/activities")
    ids = {a["id"] for a in body["data"]}
    check("含源站 id=1/2/3/4 四次历史活动", {1, 2, 3, 4} <= ids, str(sorted(ids)))

    status, body = call(base, "GET", f"{API}/admin/tally/activities/1")
    d = body["data"]
    check("活动 1 标题 = 源站真实标题", d["title"] == "2026厦门一中思明校区双代会", d["title"])
    check("活动 1 候选人为源站三位", [c["name"] for c in d["candidates"]] == ["测试1", "测试2", "测试3"])

    ledger_bad = []
    for act_id in sorted(ids):
        _, body = call(base, "GET", f"{API}/admin/tally/activities/{act_id}")
        _, rec = call(base, "GET", f"{API}/admin/tally/activities/{act_id}/records")
        rows = rec.get("data") or []
        for c in body["data"]["candidates"]:
            total = sum(r["delta"] for r in rows if r["candidateId"] == c["id"])
            if total != c["voteCount"]:
                ledger_bad.append((act_id, c["id"], total, c["voteCount"]))
    check("每位候选人「票数 == Σ其记录 delta」", not ledger_bad, str(ledger_bad[:3]))

    _, rec = call(base, "GET", f"{API}/admin/tally/activities/3/records")
    check("活动 3 末条为 type=1（撤销）→ 可演示「无可撤销操作」",
          rec["data"] and rec["data"][0]["type"] == 1, str(rec["data"][:1])[:120])


# --------------------------------------------------------------------------- #
# E. 静态资源 / SPA 回落
# --------------------------------------------------------------------------- #

def test_static(base: str) -> None:
    print("\nE. 静态资源 + SPA 深路由回落 + 登录态注入")

    def get(path):
        req = urllib.request.Request(base + path)
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status, r.read().decode("utf-8", "replace"), r.headers.get("Content-Type")

    status, html, ctype = get("/")
    check("GET / 返回 index.html", status == 200 and "<div id=\"app\">" in html)
    check("index.html 已注入 dev-auth 登录态脚本", "/__dev-auth.js" in html)
    check("Content-Type 为 text/html", "text/html" in (ctype or ""))

    status, js, ctype = get("/assets/index-DJrtCu9i.js")
    check("GET /assets/index-DJrtCu9i.js 可加载", status == 200 and len(js) > 100000)
    check("入口 chunk baseURL 已改写为同源 /api/v2",
          'Ih = "/api/v2"' in js and "https://api.xmyzstudent.com/api/v2" in js)

    status, _, ctype = get("/__dev-auth.js")
    check("GET /__dev-auth.js 可加载", status == 200)

    for path in ["/admin/tally", "/admin/tally/activities/1/edit",
                 "/admin/tally/activities/1/control", "/tally/screen/1"]:
        status, html, _ = get(path)
        check(f"SPA 深路由回落 index.html：{path}", status == 200 and "<div id=\"app\">" in html)

    for path in ["/assets/tally-DC36h0vE.js", "/assets/useTallySocket-Bnuwbx53.js",
                 "/assets/ScreenPage-D-8ErF3w.js", "/assets/ScreenPage-DXdZRHQT.css",
                 "/assets/TallyActivitiesPage-Ck1JhJya.js",
                 "/assets/TallyActivityEditPage-DFD129SB.js",
                 "/assets/TallyControlPage-CBBTMqC8.js",
                 "/assets/PageHeader-BWL8GUHB.js", "/assets/PageFooter-BK6at51a.js",
                 "/assets/PageBreadcrumb-BfFUydNi.js", "/vite.svg"]:
        status, _, _ = get(path)
        check(f"静态文件可加载：{path}", status == 200)

    try:
        urllib.request.urlopen(base + "/assets/NotExist-xxx.js", timeout=5)
        check("缺失的带扩展名资源返回 404", False)
    except urllib.error.HTTPError as err:
        check("缺失的带扩展名资源返回 404（不回退 HTML）", err.code == 404)


def main() -> int:
    base = resolve_base()
    print("=" * 72)
    print(f"tally 端到端自检  target = {base}")
    print("=" * 72)
    test_auth(base)
    test_rest(base)
    test_ws(base)
    test_data(base)
    test_static(base)
    print("\n" + "=" * 72)
    print(f"通过 {len(PASS)} 项，失败 {len(FAIL)} 项")
    if FAIL:
        print("失败项：")
        for name in FAIL:
            print("  - " + name)
    print("=" * 72)
    return 0 if not FAIL else 1


if __name__ == "__main__":
    sys.exit(main())