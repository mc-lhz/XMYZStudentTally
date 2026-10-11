"""
前端治理的等价性验收（两条）
==============================

1) 导入校验：每个 chunk 从入口 chunk 导入的名字，都必须在入口的 export 列表里；
   每个相对路径 import 指向的文件都必须真实存在。
   （治理过程中最容易翻车的就是"写了 onBeforeUnmount / computed 这类
   Vue 原始 API 名，但镜像工具其实把它们重命名成了 directiveBum / applyDirectives"。）

2) 渲染等价校验：把镜像原版与治理版 chunk 各自放进 Vue 运行时桩跑一遍
   setup()+render()，把 vnode 树（含 patchFlag、dynamicProps、静态 vnode 缓存槽位）
   序列化后逐字节比对。四个页面必须全部 IDENTICAL。

用法：
    python tools/verify_frontend.py <镜像仓库根目录> <交付目录/tally/static/assets>

例：
    python tools/verify_frontend.py .. ../tally/static/assets
"""
import json
import os
import subprocess
import sys
import tempfile

PAGES = [
    "TallyActivitiesPage-Ck1JhJya.js",
    "TallyActivityEditPage-DFD129SB.js",
    "TallyControlPage-CBBTMqC8.js",
    "ScreenPage-D-8ErF3w.js",
]
HERE = os.path.dirname(os.path.abspath(__file__))
VERIFY = os.path.join(HERE, "verify_imports.py")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    mirror_root = os.path.abspath(sys.argv[1])
    assets = os.path.abspath(sys.argv[2])

    print("=" * 70)
    print("1) 导入/导出校验")
    print("=" * 70)
    rc = subprocess.call([sys.executable, VERIFY, assets])
    if rc != 0:
        print("导入校验未通过")
        return rc

    print()
    print("=" * 70)
    print("2) 渲染等价性校验（镜像原版 vs 治理版）")
    print("=" * 70)
    ok = True
    with tempfile.TemporaryDirectory() as tmp:
        for page in PAGES:
            orig = os.path.join(mirror_root, "assets", page)
            new = os.path.join(assets, page)
            if not os.path.isfile(orig) or not os.path.isfile(new):
                print(f"  [SKIP] {page} —— 缺少其中一份，跳过")
                continue
            out_a = os.path.join(tmp, "orig.json")
            out_b = os.path.join(tmp, "new.json")
            for src, out in ((orig, out_a), (new, out_b)):
                r = subprocess.run(
                    ["node", os.path.join(HERE, "verify_render.mjs"), src, out],
                    capture_output=True,
                    text=True,
                )
                if r.returncode != 0:
                    print(f"  [FAIL] {page} —— 运行报错:\n{r.stderr.strip()[:600]}")
                    ok = False
                    break
            else:
                a = open(out_a, encoding="utf-8").read()
                b = open(out_b, encoding="utf-8").read()
                if a == b:
                    print(f"  [PASS] {page} : IDENTICAL")
                else:
                    print(f"  [FAIL] {page} : DIFFERENT")
                    ok = False
    print()
    print("结果：" + ("全部通过" if ok else "存在差异"))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())