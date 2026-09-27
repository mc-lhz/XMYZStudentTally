"""全流程复核：干净目录 + 端口自动选 + 端到端自测。

用途：交付前的一键验证。步骤
  1. 删除 __pycache__ 等构建残留；
  2. 端口可用性检测（占用则自动切换，并打印实际端口）；
  3. 以子进程启动服务，等待就绪；
  4. 跑 tests/test_e2e.py；
  5. 关闭服务，校验 tally.json 是否恢复初始状态。
"""
from __future__ import annotations

import json
import os
import shutil
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
TALLY = os.path.dirname(HERE)
WS = os.path.dirname(TALLY)


def free_port(preferred=5000):
    for port in [preferred, 0]:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind(("127.0.0.1", port))
            except OSError:
                continue
            return sock.getsockname()[1]
    raise RuntimeError("找不到可用端口")


def wait_ready(base, timeout=30):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            urllib.request.urlopen(base + "/api/v2/tally/health", timeout=3)
            return True
        except urllib.error.HTTPError:
            return True
        except Exception:  # noqa: BLE001
            time.sleep(0.5)
    return False


def cleanup_pycache():
    removed = 0
    for root, dirs, _files in os.walk(WS):
        if ".pylibs" in root:
            continue
        for name in list(dirs):
            if name == "__pycache__":
                shutil.rmtree(os.path.join(root, name), ignore_errors=True)
                dirs.remove(name)
                removed += 1
    return removed


def main():
    print("=" * 72)
    print(" tally 交付复核")
    print("=" * 72)

    print(f"1) 清理构建残留：删除 {cleanup_pycache()} 个 __pycache__")

    port = free_port(5000)
    print(f"2) 端口检测：选定 {port}")

    env = dict(os.environ, PYTHONIOENCODING="utf-8")
    # 日志与进程解耦：服务输出写文件，避免管道缓冲区写满导致服务端阻塞（曾出现请求超时）
    log_path = os.path.join(TALLY, "tests", "server.log")
    log_file = open(log_path, "w", encoding="utf-8")
    proc = subprocess.Popen(
        [sys.executable, os.path.join(TALLY, "main.py"), "--port", str(port)],
        stdout=log_file,
        stderr=subprocess.STDOUT,
        env=env,
        cwd=TALLY,
    )
    base = f"http://127.0.0.1:{port}"
    try:
        if not wait_ready(base):
            log_file.flush()
            print("   服务启动失败，输出如下：")
            print(open(log_path, encoding="utf-8", errors="replace").read()[-2000:])
            return 1
        print(f"3) 服务已就绪：{base}")

        result = subprocess.run(
            [sys.executable, os.path.join(TALLY, "tests", "test_e2e.py"), base],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            env=env,
        )
        tail = [line for line in result.stdout.splitlines() if line.startswith(("[PASS]", "[FAIL]", "通过"))]
        for line in tail[-6:]:
            print("   ", line)
        failed = [line for line in tail if line.startswith("[FAIL]")]
        print(f"4) 端到端：{'全部通过' if not failed else f'{len(failed)} 项失败'}")
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
        log_file.close()

    with open(os.path.join(TALLY, "tally.json"), encoding="utf-8") as fh:
        doc = json.load(fh)
    acts = [a["id"] for a in doc["activities"]]
    votes = {}
    for act in doc["activities"]:
        cands = [c for c in doc["candidates"] if c["activityId"] == act["id"]]
        votes[act["id"]] = sum(c["voteCount"] for c in cands)
    expect = {1: 66, 2: 505, 3: 579, 4: 3814}
    intact = acts == [1, 2, 3, 4] and votes == expect
    print(f"5) 数据文件：活动 {acts} 票数 {votes} -> {'恢复初始状态' if intact else '未恢复，请检查'}")
    print("=" * 72)
    print(" 结论：" + ("交付复核通过" if not failed and intact else "存在待修项"))
    return 0 if (not failed and intact) else 1


if __name__ == "__main__":
    sys.exit(main())
