# -*- coding: utf-8 -*-
"""Test the native WebSocket endpoint: connect, receive snapshot, trigger vote, receive push."""
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# simple-websocket installed -> use its client for a real WS handshake
from simple_websocket import Client

BASE = "ws://127.0.0.1:5001"

ws = Client.connect(BASE + "/ws/tally/activity/1")
# 1) immediate snapshot on connect
snap = json.loads(ws.receive())
print("1. snapshot on connect:")
print("   title =", snap["title"])
print("   status =", snap["status"])
print("   candidates =", [(c["name"], c["voteCount"]) for c in snap["candidates"]])

# store candidate 1 count before
cand1_before = [c["voteCount"] for c in snap["candidates"] if c["id"] == 1][0]

# 2) trigger a REST vote to candidate 1 (+3)
import urllib.request

def call(method, path, body=None):
    req = urllib.request.Request("http://localhost:5001/api/v2" + path, method=method)
    req.add_header("Content-Type", "application/json")
    data = json.dumps(body).encode("utf-8") if body is not None else None
    with urllib.request.urlopen(req, data=data) as r:
        return json.loads(r.read().decode("utf-8"))


r = call("POST", "/admin/tally/candidates/1/vote", {"delta": 3})
print("2. REST vote +3:", r["code"], r["data"]["delta"])

# 3) WS should push the new snapshot with updated count
push = json.loads(ws.receive())
cand1_after = [c["voteCount"] for c in push["candidates"] if c["id"] == 1][0]
print("3. WS pushed updated snapshot, cand1:", cand1_before, "->", cand1_after)

# 4) undo the vote -> WS pushes again back to before
r = call("POST", "/admin/tally/activities/1/undo")
print("4. REST undo:", r["code"], r["data"])
push2 = json.loads(ws.receive())
cand1_after2 = [c["voteCount"] for c in push2["candidates"] if c["id"] == 1][0]
print("   after undo cand1:", cand1_after2, "(== before:", cand1_before, ")")

ws.close()
print("\nWS OK")