"""镜像仓库（gitee mc_lhz/aitest-using-xmyzstudent）文件清单侦察脚本。"""
import re
import sys
import urllib.request

BASE = "https://gitee.com/mc_lhz/aitest-using-xmyzstudent"
UA = {"User-Agent": "Mozilla/5.0"}


def get(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")


def list_dir(path):
    url = f"{BASE}/tree/main/{path}".rstrip("/")
    try:
        html = get(url)
    except Exception as exc:  # noqa: BLE001
        return None, f"ERR {exc}"
    links = re.findall(r'href="(/mc_lhz/aitest-using-xmyzstudent/blob/main/[^"]+)"', html)
    names = sorted({link.split("/blob/main/")[-1] for link in links})
    return names, ""


for path in sys.argv[1:] or ["", "assets", "data", "tools", "docs", "overrides"]:
    names, err = list_dir(path)
    print(f"== /{path} ==")
    if err:
        print("  ", err)
        continue
    for name in names:
        print("  ", name)
