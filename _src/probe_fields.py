"""统计页面代码里模板渲染用到的字段名与表头文字。"""
import glob
import os
import re

PRETTY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pretty")

HEADER_PAT = re.compile(r'[\'"]([\u4e00-\u9fa5A-Za-z][\u4e00-\u9fa50-9A-Za-z\s·：:！？/（）()，。\-]{1,24})[\'"]')
FIELD_PAT = re.compile(r"\b(?:s|t|e|n|a|o|m|u|i|r|v|p|c|d)\.([a-zA-Z][A-Za-z0-9_]{1,24})\b")

for path in sorted(glob.glob(os.path.join(PRETTY, "*.pretty.js"))):
    src = open(path, encoding="utf-8").read()
    name = os.path.basename(path)
    fields = sorted(set(FIELD_PAT.findall(src)))
    joined = "".join(src)
    zh = sorted({h for h in HEADER_PAT.findall(joined) if re.search(r"[\u4e00-\u9fa5]", h)})
    print(f"===== {name}")
    print("  props/fields:", " ".join(fields))
    print("  中文文案:", " | ".join(zh[:60]))
    print()
