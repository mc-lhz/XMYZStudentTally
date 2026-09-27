"""在入口 bundle 中定位 auth store 的初始化（是否从 localStorage 还原登录态）。"""
import re
import sys

src = open(sys.argv[1], encoding="utf-8", errors="replace").read()

# auth store 的特征：导出 canManageTally / restoreSession
idx = src.find("canManageTally")
print("canManageTally at", idx)

start = max(0, idx - 9000)
seg = src[start:idx + 2000]
print("===== auth store 片段 =====")
print(seg)

print("\n===== token 声明 =====")
for m in re.finditer(r'localStorage\.getItem\("token"\)', src):
    s = max(0, m.start() - 400)
    print("…", src[s:m.end() + 200].replace("\n", " "), "…\n")
