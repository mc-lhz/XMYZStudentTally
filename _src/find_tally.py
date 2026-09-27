"""在全部 chunk 中定位 tally / 辩论投票 相关文件，并抽取 API 与 WS 端点。"""
import os
import re

LIVE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "live")

API_PAT = re.compile(r'["\'`](/(?:api|tally|admin/tally)[^"\'`\s]{0,120})["\'`]')
WS_PAT = re.compile(r'["\'`](wss?://[^"\'`\s]{0,160}|/[a-zA-Z0-9_\-/]*(?:ws|websocket|socket)[a-zA-Z0-9_\-/]*)["\'`]')
NET_PAT = re.compile(r'(new WebSocket\(|WebSocket\(|socket\.io|io\(|EventSource|/ws)')

rows = []
for name in sorted(os.listdir(LIVE)):
    if not name.endswith(".js"):
        continue
    src = open(os.path.join(LIVE, name), encoding="utf-8", errors="replace").read()
    low = name.lower()
    is_tally = "tally" in low or "screen" in low or "vote" in low or "debate" in low
    tag = "TALLY" if is_tally else "     "
    apis = sorted(set(API_PAT.findall(src)))
    ws = sorted(set(WS_PAT.findall(src)))
    net = sorted(set(NET_PAT.findall(src)))
    rows.append((tag, name, len(src), apis, ws, net, "tally" in src.lower(), "websocket" in src.lower()))

for tag, name, size, apis, ws, net, has_tally, has_ws in rows:
    flags = []
    if has_tally:
        flags.append("has-tally")
    if has_ws:
        flags.append("has-ws")
    if net:
        flags.append("net:" + ",".join(net))
    print(f"{tag} {name:<48} {size:>7}  {' '.join(flags)}")
    for a in apis[:40]:
        print("        API", a)
    for w in ws[:10]:
        print("        WS ", w)
