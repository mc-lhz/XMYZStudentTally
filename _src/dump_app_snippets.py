"""导出入口 bundle 中应用级逻辑（去 vendor）的可读片段，便于继续做接口/鉴权分析。"""
import os
import re
import sys

src_path = sys.argv[1]
out_dir = sys.argv[2]
os.makedirs(out_dir, exist_ok=True)

raw = open(src_path, encoding="utf-8", errors="replace").read()
lines = raw.split("\n")

# 找出含应用特征的行
KEYS = ["/auth/login", "localStorage", "api.xmyzstudent.com", "restoreSession", "requiresAuth", "tally"]
for idx, line in enumerate(lines):
    for key in KEYS:
        for m in re.finditer(re.escape(key), line):
            start = max(0, m.start() - 1200)
            end = min(len(line), m.end() + 1800)
            chunk = line[start:end]
            name = f"line{idx:02d}_{key.replace('/', '_').replace('.', '_')[:18]}_{m.start()}.txt"
            with open(os.path.join(out_dir, name), "w", encoding="utf-8") as fh:
                fh.write(chunk)
            print("wrote", name, len(chunk))
            break
