"""用 Flask 测试客户端直接打接口，逼出真实异常（便于定位 500）。"""
import os
import sys
import traceback

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, ".pylibs"))

import main as app_module  # noqa: E402

app = app_module.build_app(os.path.join(HERE, "tally.json"))
app.config["PROPAGATE_EXCEPTIONS"] = True
client = app.test_client()

print("--- GET /api/v2/tally/health")
print(client.get("/api/v2/tally/health").get_json())

print("--- POST /api/v2/auth/login")
resp = client.post("/api/v2/auth/login", json={"loginType": "normal", "username": "admin", "password": "admin"})
print(resp.status_code, resp.get_json())
token = resp.get_json()["data"]["token"]
headers = {"Authorization": f"Bearer {token}"}

try:
    resp = client.get("/api/v2/admin/tally/activities", headers=headers)
    print("--- GET activities:", resp.status_code, resp.get_json())
except Exception:  # noqa: BLE001
    traceback.print_exc()

try:
    resp = client.get("/api/v2/tally/activities/4/snapshot")
    print("--- GET snapshot:", resp.status_code, resp.get_json())
except Exception:  # noqa: BLE001
    traceback.print_exc()
