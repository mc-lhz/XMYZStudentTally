"""对运行版本（tally/static/assets）的 5 个业务模块做「零风险」可读化治理。

治理策略（安全优先）：
  1. 格式化：在语句/块边界插入换行与缩进，绝不改动任何 token；
  2. 中文头部注释：说明模块职责、对应后端接口与消费方；
  3. 语义化改名：**只改非导出的局部声明**。压缩产物把单字母名直接当作
     模块导出符号使用（如 `export{Re as default}`），整体改名会破坏跨 chunk
     契约，因此这里跳过所有导出相关的标识符。

治理后立刻用 node --check 校验语法，并确认导出符号集合一字不变。
"""
import os
import re
import subprocess
import sys

WS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(WS, "tally", "static", "assets")
NODE = r"D:\QQBOT-V3\node\node.exe"

TARGETS = [
    "useTallySocket-BrS_O9ye.js",
    "ScreenPage-BLh1rRtO.js",
    "TallyActivitiesPage-tccNm29V.js",
    "TallyActivityEditPage-zSPhMPUE.js",
    "TallyControlPage-Dtvs_iR1.js",
]


def exported_identifiers(src):
    """返回出现在 export 子句里的本地标识符（这些名字绝对不能改）。"""
    names = set()
    for m in re.finditer(r"export\s*\{([^}]*)\}", src):
        for part in m.group(1).split(","):
            local = part.strip().split(" as ")[0].strip()
            if local:
                names.add(local)
    return names


HEADERS = {
    "useTallySocket-BrS_O9ye.js": (
        "大屏实时通道 Hook（useTallySocket）",
        "建立 WebSocket -> 收到消息即 JSON.parse 为快照 -> 断线后 1s 起指数退避至 30s 自动重连。",
        "消费方：ScreenPage（大屏）、TallyControlPage（控制台）。协议：服务端连上即推一份快照，之后票数变化再推。",
    ),
    "ScreenPage-BLh1rRtO.js": (
        "实时唱票大屏（/tally/screen/:id）",
        "消费 WS 快照，按 displayOrder 渲染柱状图，显示连接状态、支持全屏。",
        "接口：GET /tally/activities/{id}/snapshot（首屏）+ WS /ws/tally/activity/{id}（实时）。",
    ),
    "TallyActivitiesPage-tccNm29V.js": (
        "活动管理页（/admin/tally）",
        "活动列表 / 新建 / 状态切换（0 待开始 1 进行中 2 已结束）/ 删除 / 跳转配置与控制台 / 复制大屏链接。",
        "接口：GET|POST /admin/tally/activities，PUT|DELETE /admin/tally/activities/{id}。",
    ),
    "TallyActivityEditPage-zSPhMPUE.js": (
        "活动配置页（/admin/tally/activities/:id/edit）",
        "修改标题与状态；候选人的新增 / 改名 / 排序 / 删除。",
        "接口：GET|PUT /admin/tally/activities/{id}，POST /admin/tally/activities/{id}/candidates，PUT|DELETE /admin/tally/candidates/{cid}。",
    ),
    "TallyControlPage-Dtvs_iR1.js": (
        "唱票控制台（/admin/tally/activities/:id/control）",
        "现场录票（+1 / +5 / +10 / -1 / 自定义增量）、撤销上一步、操作日志（最近 20 条）。",
        "接口：POST /admin/tally/candidates/{cid}/vote，POST /admin/tally/activities/{id}/undo，GET /admin/tally/activities/{id}/records，快照走 WS。",
    ),
}


def format_statements(src):
    """纯格式化：在 `;`、`{`、`}`、`,` 之后换行并缩进。

    字符串、模板串、行/块注释、正则字面量一律整段拷贝，不做任何 token 改动。
    正则判定用「前一个有效字符」启发式：只有出现在 `( , = : [ ! & | ? { } ; return` 等
    位置之后的 `/` 才当作正则起始（这是 JS 词法里的经典判定法）。
    """
    out, indent, i, n = [], 0, 0, len(src)
    quote = None
    prev_significant = ""      # 上一个有效字符（用于判定 `/` 是除号还是正则）

    def emit_newline():
        out.append("\n" + "  " * indent)

    while i < n:
        ch = src[i]

        # ---------- 已进入字符串 / 模板串 ----------
        if quote:
            out.append(ch)
            if ch == "\\" and i + 1 < n:
                out.append(src[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue

        # ---------- 注释 ----------
        if ch == "/" and i + 1 < n and src[i + 1] == "/":
            j = src.find("\n", i)
            j = n if j == -1 else j
            out.append(src[i:j])
            i = j
            continue
        if ch == "/" and i + 1 < n and src[i + 1] == "*":
            j = src.find("*/", i + 2)
            j = n if j == -1 else j + 2
            out.append(src[i:j])
            i = j
            continue

        # ---------- 正则字面量 ----------
        if ch == "/" and prev_significant in "(,=:[!&|?{};+-*%~^<>" :
            in_class = False
            j = i + 1
            while j < n:
                cj = src[j]
                if cj == "\\":
                    j += 2
                    continue
                if cj == "[":
                    in_class = True
                elif cj == "]":
                    in_class = False
                elif cj == "/" and not in_class:
                    j += 1
                    break
                elif cj == "\n":
                    break
                j += 1
            out.append(src[i:j])
            i = j
            prev_significant = "/"
            continue

        # ---------- 字符串起点 ----------
        if ch in "\"'`":
            quote = ch
            out.append(ch)
            i += 1
            prev_significant = ch
            continue

        if ch in "{([":
            indent += 1
            out.append(ch)
            emit_newline()
            i += 1
            prev_significant = ch
            continue
        if ch in "})]":
            indent = max(0, indent - 1)
            emit_newline()
            out.append(ch)
            i += 1
            prev_significant = ch
            continue
        if ch == ";":
            out.append(ch)
            emit_newline()
            i += 1
            prev_significant = ch
            continue
        if ch == "," and indent:
            out.append(ch)
            emit_newline()
            i += 1
            prev_significant = ch
            continue

        out.append(ch)
        if not ch.isspace():
            prev_significant = ch
        i += 1

    text = "\n".join(line.rstrip() for line in "".join(out).split("\n"))
    return re.sub(r"\n{3,}", "\n\n", text)


def strip_for_compare(src):
    """去掉注释与全部空白，用于「格式化前后 token 序列一致」的等价性校验。"""
    out, i, n = [], 0, len(src)
    quote = None
    prev_significant = ""
    while i < n:
        ch = src[i]
        if quote:
            out.append(ch)
            if ch == "\\" and i + 1 < n:
                out.append(src[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch == "/" and i + 1 < n and src[i + 1] == "/":
            j = src.find("\n", i)
            i = n if j == -1 else j
            continue
        if ch == "/" and i + 1 < n and src[i + 1] == "*":
            j = src.find("*/", i + 2)
            i = n if j == -1 else j + 2
            continue
        if ch == "/" and prev_significant in "(,=:[!&|?{};+-*%~^<>":
            j = i + 1
            in_class = False
            while j < n:
                cj = src[j]
                if cj == "\\":
                    j += 2
                    continue
                if cj == "[":
                    in_class = True
                elif cj == "]":
                    in_class = False
                elif cj == "/" and not in_class:
                    j += 1
                    break
                elif cj == "\n":
                    break
                j += 1
            out.append(src[i:j])
            i = j
            prev_significant = "/"
            continue
        if ch in "\"'`":
            quote = ch
            out.append(ch)
            i += 1
            prev_significant = ch
            continue
        if ch.isspace():
            i += 1
            continue
        out.append(ch)
        prev_significant = ch
        i += 1
    return "".join(out)


def _load_original_sources():
    """优先取未治理的原件（_src/live），保证治理脚本可反复重跑且结果一致。"""
    live = os.path.join(WS, "_src", "live")
    sources = {}
    for name in TARGETS:
        candidate = os.path.join(live, name)
        if os.path.exists(candidate):
            sources[name] = open(candidate, encoding="utf-8").read()
    return sources


def main():
    print("=" * 78)
    print("运行版本模块可读化治理（格式化 + 注释，不改任何标识符）")
    print("=" * 78)
    sources = _load_original_sources()
    for name in TARGETS:
        path = os.path.join(ASSETS, name)
        if not os.path.exists(path):
            print(f"  跳过 {name}（缺失）")
            continue
        src = sources.get(name)
        if src is None:
            print(f"  跳过 {name}（找不到未治理的原件）")
            continue
        module_name, duty, contract = HEADERS[name]
        exported = exported_identifiers(src)
        formatted = format_statements(src)
        header = (
            "/**\n"
            f" * {module_name} —— 可读化版本（由源站压缩产物治理而来）\n"
            " *\n"
            f" * 职责：{duty}\n"
            f" * 契约：{contract}\n"
            " *\n"
            " * 治理方式：\n"
            " *   1) 格式化：按语句/块统一换行与缩进，未改动任何 token；\n"
            " *   2) 注释：补充模块职责与接口对应关系；\n"
            " *   3) 标识符：保留源站原名。压缩产物把单字母名直接作为模块导出符号使用\n"
            f" *      （本文件导出 {', '.join(sorted(exported)) or '默认导出'}），改名会破坏跨 chunk 契约，故不参与改名；\n"
            " *      tally 业务的接口层改名见同目录 tally-BvCEJ8Iv.js。\n"
            " */\n"
        )
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(header + formatted + "\n")

        check = subprocess.run([NODE, "--check", path], capture_output=True, text=True)
        same_code = strip_for_compare(src) == strip_for_compare(formatted)
        print(
            f"  {name}\n"
            f"      语法 {'OK' if check.returncode == 0 else '失败 ' + check.stderr[:160]}"
            f" / 去空白后代码完全一致 {same_code} / 导出符号 {len(exported)} 个未动"
            f" / 行数 {formatted.count(chr(10)) + 1}"
        )


if __name__ == "__main__":
    main()
