"""从 Gitee 网页版尝试读取镜像仓库中单个文件的源码。"""
import json
import re
import sys
import urllib.request

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": "https://gitee.com/mc_lhz/aitest-using-xmyzstudent",
}
BASE = "https://gitee.com/mc_lhz/aitest-using-xmyzstudent"


def get(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")


path = sys.argv[1] if len(sys.argv) > 1 else "tools/dev-auth.cjs"

for candidate in [
    f"{BASE}/blob/main/{path}",
    f"{BASE}/raw/main/{path}",
    f"{BASE}/raw/main/{path}?raw=1",
]:
    try:
        html = get(candidate)
    except Exception as exc:  # noqa: BLE001
        print(f"## {candidate} ERR {exc}")
        continue
    print(f"## {candidate} len={len(html)}")
    # Gitee 在 blob 页面中以 JSON 内嵌文件内容
    hits = re.findall(r'"content":"(.*?)","', html)
    if hits:
        for h in hits[:3]:
            try:
                text = json.loads('"' + h + '"')
            except Exception:  # noqa: BLE001
                text = h
            print(text[:4000])
        break
    print("no embedded content; head:")
    print(html[:600])
