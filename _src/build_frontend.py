"""构建 tally 业务最小前端子集。

策略（镜像复用，不自研页面）：
  1. 源站 SPA 入口 chunk（index-*.js）保留，但做两处最小改写：
     - axios baseURL: https://api.xmyzstudent.com/api/v2  ->  /api/v2 （同源，路由规范同构）
     - WS 地址:      wss://api.xmyzstudent.com           ->  同源 ws（仅等价化 origin）
  2. 入口 chunk 的 Vue Router 路由表裁剪：只保留 5 条 tally 路由 + 404 兜底。
  3. 只复制 tally 业务真正依赖的 chunk / css / 图标（不做整站复制）。
"""
import os
import re
import shutil
import sys

SRC_LIVE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "live")
OUT = sys.argv[1] if len(sys.argv) > 1 else None
if not OUT:
    raise SystemExit("用法: build_frontend.py <tally/static 输出目录>")

ENTRY_JS = "index-D2vbWxba.js"
TALLY_API_JS = "tally-BvCEJ8Iv.js"   # tally 接口封装，内含 WS 地址构造函数

# —— tally 业务子集清单（依据 __vite__mapDeps[138..147] 与页面 import 推导）——
JS_FILES = [
    "index-D2vbWxba.js",          # SPA 入口：vue/router/store/axios/基础组件
    "PageHeader-ch1RqF1N.js",
    "PageFooter-CYgaov2a.js",
    "ScreenPage-BLh1rRtO.js",             # 大屏
    "TallyActivitiesPage-tccNm29V.js",    # 活动管理
    "TallyActivityEditPage-zSPhMPUE.js",  # 配置活动
    "TallyControlPage-Dtvs_iR1.js",       # 唱票控制台
    "useTallySocket-BrS_O9ye.js",         # WS 复用 hook
    "tally-BvCEJ8Iv.js",                  # tally 接口封装
    "NotFoundPage-BLCj-Y0r.js",           # 未保留路由的统一兜底页面
]
CSS_FILES = [
    "index-CZZQpGPl.css",
    "PageHeader-BhUR9sVR.css",
    "PageFooter-DRmqTZ73.css",
    "ScreenPage-DXdZRHQT.css",
    "TallyActivitiesPage-Cm0F3HF2.css",
    "TallyActivityEditPage-ZYDNOPki.css",
    "TallyControlPage-Dx3I3Pka.css",
    "NotFoundPage-Dd7lPujL.css",
]
OTHER_FILES = ["vite.svg"]

# —— 保留的路由（与源站逐字一致，不带 XMYZStudent 前缀）——
KEEP_ROUTE_PATHS = {
    "/tally/screen/:id",
    "/admin/tally",
    "/admin/tally/activities/:id/edit",
    "/admin/tally/activities/:id/control",
}
# 兜底路由名，命中即整条丢弃（NotFoundPage chunk 仍会复制，但仅保留下面这条）
DROP_ROUTE_NAMES = {"not-found"}


def patch_entry(src):
    """对入口 chunk 做最小改写：接口同源化 + 路由表裁剪。"""
    report = []

    # 1) axios baseURL 同源化
    old = 'Mh="https://api.xmyzstudent.com/api/v2"'
    new = 'Mh=window.__TALLY_API_BASE__||"/api/v2"'
    assert src.count(old) == 1, f"baseURL 片段不唯一: {src.count(old)}"
    src = src.replace(old, new)
    report.append("axios baseURL -> window.__TALLY_API_BASE__ || /api/v2")

    # 2) WS origin 同源化（路径 /ws/tally/activity/:id 保持不变，与源站同构）
    #    WS 构造在 tally 接口封装 chunk 中，单独改写
    report.append("WS 同源化见 tally-BvCEJ8Iv.js")

    # 3) 路由表裁剪
    src, dropped = trim_routes(src)
    report.append(f"路由裁剪：移除 {len(dropped)} 条，保留 {len(KEEP_ROUTE_PATHS) + 1} 条")
    for name in dropped:
        report.append(f"    移除路由 {name}")
    return src, report


def patch_ws_chunk(src):
    """把 WS 地址由线上 origin 改为同源 origin，路径保持与源站同构。"""
    old_ws = '`wss://api.xmyzstudent.com/ws/tally/activity/${t}`'
    assert src.count(old_ws) == 1, f"WS 片段不唯一: {src.count(old_ws)}"
    new_ws = (
        '`${window.__TALLY_WS_ORIGIN__||((location.protocol==="https:"?"wss://":"ws://")+location.host)}'
        '/ws/tally/activity/${t}`'
    )
    return src.replace(old_ws, new_ws)


def find_array_span(src, anchor):
    """从 anchor（形如 'routes:['）定位数组区间 [start, end)。"""
    idx = src.index(anchor)
    start = src.index("[", idx)
    depth = 0
    i = start
    in_str = None
    while i < len(src):
        ch = src[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in "\"'`":
            in_str = ch
            i += 1
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return start, i + 1
        i += 1
    raise ValueError("未找到 routes 数组结尾")


def split_top_level(inner):
    """按顶层逗号切分数组元素（元素均为对象字面量）。"""
    items = []
    depth = 0
    in_str = None
    buf = []
    i = 0
    while i < len(inner):
        ch = inner[i]
        if in_str:
            buf.append(ch)
            if ch == "\\":
                if i + 1 < len(inner):
                    buf.append(inner[i + 1])
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in "\"'`":
            in_str = ch
            buf.append(ch)
            i += 1
            continue
        if ch in "[{(":
            depth += 1
        elif ch in "]})":
            depth -= 1
        if ch == "," and depth == 0:
            items.append("".join(buf).strip())
            buf = []
            i += 1
            continue
        buf.append(ch)
        i += 1
    tail = "".join(buf).strip()
    if tail:
        items.append(tail)
    return items


def trim_routes(src):
    anchor = "routes:["
    start, end = find_array_span(src, anchor)
    inner = src[start + 1 : end - 1]
    items = [it for it in split_top_level(inner) if it]

    kept, dropped = [], []
    for item in items:
        path_m = re.search(r'path:"([^"]+)"', item)
        name_m = re.search(r'name:"([^"]+)"', item)
        path = path_m.group(1) if path_m else "?"
        name = name_m.group(1) if name_m else "?"
        if path in KEEP_ROUTE_PATHS:
            kept.append(item)
        elif path == "/:pathMatch(.*)*":
            dropped.append(name)  # 兜底路由在下面重新追加
        else:
            dropped.append(name)
    kept.append('{path:"/:pathMatch(.*)*",name:"not-found",component:()=>W(()=>import("./NotFoundPage-BLCj-Y0r.js")),meta:{level:1,title:"页面未找到",shell:!1}}')
    new_inner = ",".join(kept)
    return src[: start + 1] + new_inner + src[end - 1 :], dropped


def main():
    os.makedirs(os.path.join(OUT, "assets"), exist_ok=True)

    missing = []
    for name in JS_FILES + CSS_FILES + OTHER_FILES:
        src = os.path.join(SRC_LIVE, name)
        if not os.path.exists(src):
            missing.append(name)
    if missing:
        raise SystemExit("缺少源文件: " + ", ".join(missing))

    # 入口改写
    entry_src = open(os.path.join(SRC_LIVE, ENTRY_JS), encoding="utf-8").read()
    patched, report = patch_entry(entry_src)
    with open(os.path.join(OUT, "assets", ENTRY_JS), "w", encoding="utf-8") as fh:
        fh.write(patched)
    print("入口改写报告：")
    for line in report:
        print("  -", line)

    # tally 接口封装改写（WS 同源化）
    api_src = open(os.path.join(SRC_LIVE, TALLY_API_JS), encoding="utf-8").read()
    with open(os.path.join(OUT, "assets", TALLY_API_JS), "w", encoding="utf-8") as fh:
        fh.write(patch_ws_chunk(api_src))
    print("  - WS 已同源化为 ws(s)://<当前 host>/ws/tally/activity/<id>")

    for name in JS_FILES:
        if name in (ENTRY_JS, TALLY_API_JS):
            continue
        shutil.copyfile(os.path.join(SRC_LIVE, name), os.path.join(OUT, "assets", name))
    for name in CSS_FILES:
        shutil.copyfile(os.path.join(SRC_LIVE, name), os.path.join(OUT, "assets", name))
    for name in OTHER_FILES:
        shutil.copyfile(os.path.join(SRC_LIVE, name), os.path.join(OUT, name))

    print(f"\n已复制 JS {len(JS_FILES)} 个 / CSS {len(CSS_FILES)} 个 / 其他 {len(OTHER_FILES)} 个 -> {OUT}")


if __name__ == "__main__":
    main()
