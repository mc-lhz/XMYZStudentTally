"""tally 选票业务本地服务入口（Flask + WebSocket）。

启动：
    python main.py                # 自动选端口：先试 5000，被占用则换随机可用端口
    python main.py --port 8080    # 指定端口（占用时会自动改随机端口并打印实际端口）
    python main.py --port 8080 --strict-port   # 指定端口不可用则直接报错退出
    python main.py --check        # 只做端口可用性检测后退出

静态资源：tally/static 下的镜像前端子集，SPA 路由 /tally/**、/admin/tally/** 统一回 index.html。
"""
from __future__ import annotations

import argparse
import json
import os
import socket
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PYLIBS = os.path.join(HERE, ".pylibs")
if os.path.isdir(PYLIBS) and PYLIBS not in sys.path:
    # 随包离线依赖优先（用户侧无需 pip 也能启动）
    sys.path.insert(0, PYLIBS)

from flask import Flask, jsonify, request, send_from_directory  # noqa: E402
from flask_sock import Sock  # noqa: E402

from api import bp as api_blueprint  # noqa: E402
from store import TallyStore, TallyStoreError  # noqa: E402
from ws_hub import TallySocketHub  # noqa: E402

DEFAULT_PORT = 5000
DEFAULT_ADMIN = ("admin", "admin")


# --------------------------------------------------------------------- 端口


def port_available(port: int, host: str = "127.0.0.1") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.bind((host, port))
        except OSError:
            return False
    return True


def pick_port(preferred: int, strict: bool, host: str = "127.0.0.1") -> int:
    if port_available(preferred, host):
        return preferred
    if strict:
        raise SystemExit(f"[tally] 端口 {preferred} 已被占用（--strict-port 已指定，退出）")
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((host, 0))
        port = sock.getsockname()[1]
    print(f"[tally] 端口 {preferred} 被占用，已自动切换为可用端口 {port}")
    return port


# --------------------------------------------------------------------- 应用


def build_app(data_file: str) -> Flask:
    static_dir = os.path.join(HERE, "static")
    # 镜像子集按源站布局放在 static/assets 下，因此 static_url_path 必须是 /assets
    app = Flask(__name__, static_folder=os.path.join(static_dir, "assets"), static_url_path="/assets")
    app.config["TALLY_DATA_FILE"] = data_file

    store = TallyStore(data_file)
    auth = load_auth(data_file)
    app.config["TALLY_STORE"] = store
    app.config["TALLY_HUB"] = TallySocketHub()
    app.config["TALLY_AUTH"] = auth
    app.config["TALLY_TOKEN"] = auth["token"]
    app.config["JSON_AS_ASCII"] = False

    app.register_blueprint(api_blueprint)
    sock = Sock(app)

    @app.before_request
    def guard_readonly_store():
        """fail-closed：数据文件载入失败后，一切写操作直接拒绝（读操作仍可服务）。"""
        store_obj = app.config["TALLY_STORE"]
        if store_obj.is_readonly() and request.method not in ("GET", "HEAD", "OPTIONS"):
            return (
                jsonify({"code": 500, "message": store_obj.load_error or "存储只读保护中", "data": None}),
                500,
            )
        return None

    # ---------------------------------------------------------------- WebSocket

    @sock.route("/ws/tally/activity/<int:activity_id>")
    def tally_ws(ws, activity_id: int):
        """大屏实时通道：连上先给快照，之后由写操作触发广播。"""
        hub = app.config["TALLY_HUB"]
        store = app.config["TALLY_STORE"]
        snap = store.snapshot(activity_id)
        if snap is None:
            ws.send(json.dumps({"code": 404, "message": "活动不存在", "data": None}, ensure_ascii=False))
            return
        hub.register(activity_id, ws, remote=str(getattr(ws, "remote_addr", "?")))
        try:
            hub.send(ws, snap)
            while True:
                # 大屏只接收推送；这里持续读以探测断开，同时兼容前端主动 ping
                data = ws.receive(timeout=None)
                if data is None:
                    break
                if isinstance(data, str) and data.strip() in ("ping", '{"type":"ping"}'):
                    ws.send(json.dumps({"type": "pong"}, ensure_ascii=False))
                elif isinstance(data, str) and data.strip():
                    # 兼容感兴趣客户端主动要快照
                    latest = store.snapshot(activity_id)
                    if latest is not None:
                        hub.send(ws, latest)
        except Exception:  # noqa: BLE001
            pass
        finally:
            hub.unregister(ws)

    # ---------------------------------------------------------------- 静态与 SPA 回退

    @app.get("/")
    def index():
        return send_from_directory(static_dir, "index.html")

    @app.get("/<path:any_path>")
    def spa_fallback(any_path: str):
        # 已存在的静态文件直接给文件，其余交给前端路由（history 模式）
        candidate = os.path.join(static_dir, any_path)
        if os.path.isfile(candidate):
            return send_from_directory(static_dir, any_path)
        return send_from_directory(static_dir, "index.html")

    @app.errorhandler(404)
    def not_found(_exc):
        return jsonify({"code": 404, "message": "接口不存在", "data": None}), 404

    @app.errorhandler(500)
    def server_error(exc):  # noqa: ANN001
        return jsonify({"code": 500, "message": f"系统内部错误：{exc}", "data": None}), 500

    @app.errorhandler(TallyStoreError)
    def store_error(exc):  # noqa: ANN001
        return jsonify({"code": 500, "message": str(exc), "data": None}), 500

    return app


def load_auth(data_file: str) -> dict:
    """本地管理员口令：可用 tally.auth.json 覆盖，否则内置 admin/admin。"""
    auth_path = os.path.join(HERE, "auth.json")
    users = {DEFAULT_ADMIN[0]: {"id": 1, "password": DEFAULT_ADMIN[1], "nickname": "本地开发管理员"}}
    token = os.environ.get("TALLY_TOKEN", "local-dev-token")
    if os.path.exists(auth_path):
        try:
            with open(auth_path, "r", encoding="utf-8") as fh:
                cfg = json.load(fh)
            token = cfg.get("token", token)
            users = {}
            for user in cfg.get("users", []):
                users[user["username"]] = {
                    "id": user.get("id", 1),
                    "password": user["password"],
                    "nickname": user.get("nickname", user["username"]),
                }
        except Exception as exc:  # noqa: BLE001
            print(f"[tally] auth.json 解析失败，回退内置口令：{exc}")
    return {"users": users, "token": token}


# --------------------------------------------------------------------- 命令行


def main() -> None:
    parser = argparse.ArgumentParser(description="tally 选票业务本地服务")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址（默认 127.0.0.1）")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="首选端口（默认 5000）")
    parser.add_argument("--strict-port", action="store_true", help="端口被占用时直接退出，不自动切换")
    parser.add_argument("--data", default=os.path.join(HERE, "tally.json"), help="单文件数据存储路径")
    parser.add_argument("--check", action="store_true", help="只检测端口可用性后退出")
    args = parser.parse_args()

    port = pick_port(args.port, args.strict_port, "127.0.0.1")
    if args.check:
        print(f"[tally] 端口 {port} 可用")
        return

    app = build_app(args.data)
    print("=" * 68)
    print(" tally 选票业务 · 本地服务")
    print(f"   后台活动管理  http://{args.host}:{port}/admin/tally")
    print(f"   唱票控制台    http://{args.host}:{port}/admin/tally/activities/1/control")
    print(f"   实时大屏      http://{args.host}:{port}/tally/screen/1")
    print(f"   WebSocket     ws://{args.host}:{port}/ws/tally/activity/1")
    print(f"   数据文件      {os.path.abspath(args.data)}")
    print(f"   管理账号      admin / admin（可用 auth.json 覆盖）")
    print("=" * 68)
    app.run(host=args.host, port=port, threaded=True, debug=False, use_reloader=False)


if __name__ == "__main__":
    main()
