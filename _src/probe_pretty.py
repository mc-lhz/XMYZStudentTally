"""从美化后的 tally 页面代码中抽取：接口调用点、响应字段读取点。"""
import glob
import os
import re

PRETTY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pretty")

CALL_PAT = re.compile(r"([A-Za-z0-9_$]{1,4}\.(?:get|post|put|delete)\([^\n]{0,110})")
FIELD_PAT = re.compile(r"\?\.([a-zA-Z][A-Za-z0-9_]{2,30})")
DATA_PAT = re.compile(r"\.data\.data")

for path in sorted(glob.glob(os.path.join(PRETTY, "*.pretty.js"))):
    src = open(path, encoding="utf-8").read()
    name = os.path.basename(path)
    calls = sorted(set(CALL_PAT.findall(src)))
    fields = sorted(set(FIELD_PAT.findall(src)))
    print(f"===== {name} =====")
    if calls:
        print("  -- 接口调用 --")
        for c in calls:
            print("     ", c)
    if DATA_PAT.search(src):
        print("  -- 使用 .data.data 取值 --")
    if fields:
        print("  -- 字段读取 (?.x) --")
        print("     ", " ".join(fields))
    print()
