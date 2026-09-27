"""解析入口 bundle 中的 __vite__mapDeps 数组，还原「动态 chunk -> 依赖文件」映射。"""
import json
import os
import re
import sys

src = open(sys.argv[1], encoding="utf-8", errors="replace").read()

m = re.search(r"__vite__mapDeps[^;]{0,400}", src)
print("mapDeps 定义片段:", (m.group(0)[:400] if m else "未找到"))
print()

arr = re.search(r"const __vite__mapDeps=\(i,m=__vite__mapDeps,d=\(m\.f\|\|\(m\.f=\[([^\]]*)\]\)\)\)", src)
if not arr:
    # 退而求其次：找最长的字符串数组
    cands = re.findall(r'\[((?:"[^"]{1,80}",?){20,})\]', src)
    cands.sort(key=len, reverse=True)
    arr_src = cands[0] if cands else "[]"
    print("（回退）使用最长字符串数组")
else:
    arr_src = arr.group(1)

files = [x.strip().strip('"') for x in arr_src.split(",") if x.strip()]
print(f"依赖文件总数：{len(files)}")
for i, f in enumerate(files):
    print(f"  [{i:>3}] {f}")

out = os.path.join(os.path.dirname(os.path.abspath(sys.argv[1])), "vite_mapdeps.json")
json.dump(files, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("已写入", out)
