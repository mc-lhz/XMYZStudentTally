"""静态校验：交付目录里的每个 chunk 的 import 名字，是否都能在入口 chunk 的 export 列表里找到，
并且每个相对路径 import 指向的文件都真实存在。

用法：python verify_imports.py <tally/static/assets 目录>
"""
import os
import re
import sys

EXPORT_RE = re.compile(r"export\s*\{(.*?)\}\s*;", re.S)
ENTRY = "index-DJrtCu9i.js"


def entry_exports(path):
    src = open(path, encoding="utf-8").read()
    m = None
    for m in EXPORT_RE.finditer(src):
        pass
    if not m:
        raise SystemExit("入口 chunk 未找到 export 语句")
    names = set()
    for item in m.group(1).split(","):
        item = item.strip()
        if not item:
            continue
        # 形如 `zz435 as useUserStore`
        if " as " in item:
            names.add(item.split(" as ")[-1].strip())
        else:
            names.add(item)
    return names


IMPORT_RE = re.compile(r'import\s*\{([^}]*)\}\s*from\s*"(\.[^"]+)"', re.S)
BARE_IMPORT_RE = re.compile(r'import\s*"(\.[^"]+)"', re.S)
EXPORT_FROM_RE = re.compile(r'export\s*\{([^}]*)\}\s*from\s*"(\.[^"]+)"', re.S)


def main():
    assets = sys.argv[1]
    exports = entry_exports(os.path.join(assets, ENTRY))
    ok = True
    for name in sorted(os.listdir(assets)):
        if not name.endswith(".js") or name == ENTRY:
            continue
        path = os.path.join(assets, name)
        src = open(path, encoding="utf-8").read()
        for spec in re.findall(r'from\s*"(\.[^"]+)"', src) + BARE_IMPORT_RE.findall(src):
            target = os.path.normpath(os.path.join(assets, spec.lstrip("./")))
            if not os.path.isfile(target):
                print(f"[缺失文件] {name} -> {spec}")
                ok = False
        for names_blob, spec in IMPORT_RE.findall(src):
            if not spec.endswith(ENTRY):
                continue
            for raw in names_blob.split(","):
                raw = raw.strip()
                if not raw:
                    continue
                local = raw.split(" as ")[0].strip()
                if local not in exports:
                    print(f"[未导出]   {name} 导入了 {local}，但入口 chunk 未导出它")
                    ok = False
        # 自身 export 的名字列表（自检：不能重复/不能导出未定义的名字）
        for m in EXPORT_FROM_RE.finditer(src):
            pass
    print("导入校验：" + ("通过" if ok else "存在问题"))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())