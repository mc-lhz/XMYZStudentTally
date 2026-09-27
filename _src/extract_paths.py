"""在应用代码行（line_0006 / line_0007）中提取路由与接口相关字符串。"""
import re
import sys

for path in sys.argv[1:]:
    src = open(path, encoding="utf-8").read()
    print(f"\n########## {path}  ({len(src)} chars) ##########")

    # 1) 形如 "/xxx/yyy" 的字符串常量
    paths = re.findall(r'["\'`](/(?:[A-Za-z0-9_\-:.:]|\$\{[^}]*\})*)["\'`]', src)
    uniq = sorted({p for p in paths if len(p) > 1})
    print(f"--- string paths ({len(uniq)}) ---")
    for p in uniq:
        print("   ", p)
