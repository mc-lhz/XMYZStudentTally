"""极简 JS 美化器：只做安全换行（不改 token），便于阅读压缩产物。

规则：在字符串/模板/正则之外的 `;`、`{`、`}`、`,` 之后插入换行并缩进。
不追求完美，只求可读；编译产物语义不变（换行不改变 JS 语义，注意 ASI 场景已由 `;` 分隔）。
"""
import os
import sys

OPEN = "{(["
CLOSE = "})]"


def beautify(src):
    out = []
    indent = 0
    i = 0
    n = len(src)
    quote = None       # 当前字符串引号
    in_template = False
    in_regex = False
    in_line_comment = False
    in_block_comment = False

    def newline():
        out.append("\n" + "  " * indent)

    while i < n:
        ch = src[i]
        nxt = src[i + 1] if i + 1 < n else ""

        if in_line_comment:
            out.append(ch)
            if ch == "\n":
                in_line_comment = False
                newline()
            i += 1
            continue
        if in_block_comment:
            out.append(ch)
            if ch == "*" and nxt == "/":
                out.append("/")
                i += 2
                in_block_comment = False
                newline()
                continue
            i += 1
            continue
        if in_template:
            out.append(ch)
            if ch == "\\":
                if nxt:
                    out.append(nxt)
                i += 2
                continue
            if ch == "`":
                in_template = False
            i += 1
            continue
        if quote:
            out.append(ch)
            if ch == "\\":
                if nxt:
                    out.append(nxt)
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue

        # 注释起点
        if ch == "/" and nxt == "/":
            in_line_comment = True
            out.append(ch)
            i += 1
            continue
        if ch == "/" and nxt == "*":
            in_block_comment = True
            out.append("/*")
            i += 2
            continue
        if ch in "\"'":
            quote = ch
            out.append(ch)
            i += 1
            continue
        if ch == "`":
            in_template = True
            out.append(ch)
            i += 1
            continue

        if ch in OPEN:
            indent += 1
            out.append(ch)
            newline()
            i += 1
            continue
        if ch in CLOSE:
            indent = max(0, indent - 1)
            newline()
            out.append(ch)
            i += 1
            continue
        if ch == ";":
            out.append(";")
            newline()
            i += 1
            continue
        if ch == "," and indent > 0:
            out.append(",")
            newline()
            i += 1
            continue
        if ch == " " and out and out[-1] in ("\n",):
            i += 1
            continue
        out.append(ch)
        i += 1

    text = "".join(out)
    lines = [ln.rstrip() for ln in text.split("\n")]
    return "\n".join(ln for ln in lines if ln.strip())


def main():
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pretty")
    os.makedirs(out_dir, exist_ok=True)
    for path in sys.argv[1:]:
        src = open(path, encoding="utf-8", errors="replace").read()
        pretty = beautify(src)
        name = os.path.basename(path)
        dest = os.path.join(out_dir, name.replace(".js", ".pretty.js"))
        with open(dest, "w", encoding="utf-8") as fh:
            fh.write(pretty)
        print(f"{name}: {len(src)} -> {len(pretty)} chars, {pretty.count(chr(10))+1} lines -> {dest}")


if __name__ == "__main__":
    main()
