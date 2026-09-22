# -*- coding: utf-8 -*-
"""Verify tally local server static/API integration."""
import json
import re
import sys
import urllib.request

sys.stdout = __import__("io").TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE = "http://localhost:5001"


def get(url):
    req = urllib.request.Request(BASE + url)
    return urllib.request.urlopen(req).read().decode("utf-8")


# 1) index.html should have dev-auth injection
html = get("/")
print("1. dev-auth injected:", "/dev-auth.js" in html)
print("   module script ref:", "index-DJrtCu9i.js" in html)

# 2) main bundle baseURL now relative
js = get("/assets/index-DJrtCu9i.js")
m = re.search(r'Ih = "([^"]+)"', js)
print("2. main bundle baseURL:", m.group(1) if m else "NOT FOUND")

# 3) tally ws url now local
tj = get("/assets/tally-DC36h0vE.js")
print("3. tally.js uses location.host for WS:", "location.host" in tj)
print("   old wss://api.xmyzstudent host gone:", "wss://api.xmyzstudent.com" not in tj)

# 4) any remaining absolute api host refs in main bundle (should be none actionable)
print("4. main bundle still has api.xmyzstudent.com:", "api.xmyzstudent.com" in js)

# 5) dev-auth.js served
da = get("/dev-auth.js")
print("5. dev-auth.js served:", "__devAuth" in da)

# 6) REST roundtrip through /api/v2
def call(method, path, body=None):
    req = urllib.request.Request(BASE + "/api/v2" + path, method=method)
    req.add_header("Content-Type", "application/json")
    data = json.dumps(body).encode("utf-8") if body is not None else None
    with urllib.request.urlopen(req, data=data) as r:
        return json.loads(r.read().decode("utf-8"))


r = call("GET", "/admin/tally/activities")
print("6. activities via /api/v2:", [(a["id"], a["title"]) for a in r["data"]])

# 7) static assets all present (the 22 tally files)
import os
assets_dir = r"C:\Users\Administrator\AppData\Local\Temp\big-pickle\tally\static\assets"
names = sorted(os.listdir(assets_dir))
print("7. static/assets files ({}):".format(len(names)))
print("   " + ", ".join(names))