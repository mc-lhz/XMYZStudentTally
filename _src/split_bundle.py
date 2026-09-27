"""把线上 bundle 按换行拆分，便于分段阅读（压缩产物每行可能就是一个模块）。"""
import os
import sys

src_path = sys.argv[1]
out_dir = sys.argv[2]
os.makedirs(out_dir, exist_ok=True)

raw = open(src_path, "rb").read().decode("utf-8", "replace")
lines = raw.split("\n")
print("lines:", len(lines))
sizes = sorted((len(l), i) for i, l in enumerate(lines))
print("total chars:", len(raw))

os.makedirs(out_dir, exist_ok=True)
for idx, line in enumerate(lines):
    with open(os.path.join(out_dir, f"line_{idx:04d}.txt"), "w", encoding="utf-8") as fh:
        fh.write(line)
print("wrote", len(lines), "files to", out_dir)
