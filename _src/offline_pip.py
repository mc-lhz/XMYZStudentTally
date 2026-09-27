"""离线安装依赖：直接从 PyPI 下载 wheel 并手工解压到目标目录。

为什么不用 pip install：
  本机文件沙箱下 pip 在解包阶段的临时文件写入被拒（Errno 13），
  因此改为「解析 PyPI JSON -> 下载 wheel -> zipfile 解压」的等价流程。
"""
import email.parser
import json
import os
import re
import sys
import time
import urllib.request
import zipfile

TARGET = sys.argv[1]
SEEDS = sys.argv[2:]

PY_TAGS = ("cp314", "py3", "py2.py3")
PLAT_TAGS = ("win_amd64", "win32", "any")


def pick_wheel(files):
    cands = []
    for f in files:
        name = f.get("filename", "")
        if not name.endswith(".whl"):
            continue
        parts = name[:-4].split("-")
        if len(parts) < 5:
            continue
        pytag, plat = parts[-3], parts[-1]
        if plat not in PLAT_TAGS:
            continue
        if not any(t in pytag for t in PY_TAGS):
            continue
        cands.append((plat == "any", "cp314" in pytag, name, f))
    cands.sort(key=lambda x: (x[0], x[1]), reverse=True)
    return [c[3] for c in cands]


def fetch_json(url, tries=6):
    last = None
    for attempt in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": "tally-offline-installer/1.0"})
        try:
            return json.loads(urllib.request.urlopen(req, timeout=60).read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"{url} 拉取失败: {last}")


def requires_dist(text):
    msg = email.parser.Parser().parsestr(text)
    reqs = msg.get_all("Requires-Dist") or []
    out = []
    for r in reqs:
        if ";" in r:
            marker = r.split(";", 1)[1]
            if "extra" in marker:
                continue
        base = r.split(";")[0].strip()
        name = re.split(r"[\[\s(<>=!~;]", base, 1)[0].strip()
        if name:
            out.append(name)
    return out


def main():
    os.makedirs(TARGET, exist_ok=True)
    queue = list(SEEDS)
    done = set()
    installed = []
    while queue:
        pkg = queue.pop(0)
        key = pkg.lower().replace("_", "-")
        if key in done:
            continue
        done.add(key)
        meta = fetch_json(f"https://pypi.org/pypi/{pkg}/json")
        version = meta["info"]["version"]
        wheels = pick_wheel(meta["urls"])
        if not wheels:
            print(f"!! {pkg} {version} 无可用 wheel")
            continue
        wheel = wheels[0]
        req = urllib.request.Request(wheel["url"], headers={"User-Agent": "tally-offline-installer/1.0"})
        data = urllib.request.urlopen(req, timeout=180).read()
        tmp = os.path.join(TARGET, "_tmp.whl")
        open(tmp, "wb").write(data)
        with zipfile.ZipFile(tmp) as zf:
            names = zf.namelist()
            zf.extractall(TARGET)
            meta_name = next((n for n in names if n.endswith(".dist-info/METADATA")), None)
            if meta_name:
                text = zf.read(meta_name).decode("utf-8", "replace")
                for dep in requires_dist(text):
                    if dep.lower().replace("_", "-") not in done:
                        queue.append(dep)
        os.remove(tmp)
        installed.append(f"{pkg}=={version} ({wheel['filename']})")
        print(f"OK {pkg} {version} <- {wheel['filename']}")

    print("\n已安装：")
    for i in sorted(installed):
        print("  ", i)


if __name__ == "__main__":
    main()
