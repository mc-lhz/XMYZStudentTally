import re, os, sys, urllib.request, urllib.parse, shutil

BASE = "https://xmyzstudent.com"
ROOT = os.path.dirname(os.path.abspath(__file__))
visited = set()
queue = [BASE + "/"]
found_assets = set()

# patterns for resource references
ext = r"(?:js|css|png|jpe?g|gif|svg|webp|avif|woff2?|ttf|otf|eot|mp3|mp4|webm|ogg|wav|json|ico|html?)"
# quoted URL refs
ref_re = re.compile(r"""['"]((?:/|\.{1,2}/|https?://xmyzstudent\.com/)[^'"]+?\.(?:%s))['"]""" % ext, re.I)
abs_re = re.compile(r"""(?:['"](/[^'"]+?\.(?:%s))['"])""" % ext, re.I)

def local_path(url):
    p = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(p.path)
    if path.endswith("/"):
        path += "index.html"
    if not os.path.splitext(path)[1]:
        path += ".html"
    return os.path.join(ROOT, path.lstrip("/"))

def fetch(url):
    if url in visited:
        return None
    visited.add(url)
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            ctype = r.headers.get("Content-Type","")
    except Exception as e:
        print("FAIL", url, e)
        return None
    lp = local_path(url)
    os.makedirs(os.path.dirname(lp), exist_ok=True)
    with open(lp,"wb") as f:
        f.write(data)
    print("OK  %-60s %8d %s" % (url.replace(BASE,"/"), len(data), ctype[:30]))
    return data, ctype

count = 0
while queue and count < 500:
    url = queue.pop(0)
    res = fetch(url)
    if not res: 
        continue
    data, ctype = res
    count += 1
    text = data.decode("utf-8","ignore")
    refs = set()
    for m in ref_re.findall(text):
        refs.add(m)
    for m in abs_re.findall(text):
        refs.add(m)
    for r in refs:
        if r.startswith("http"):
            full = r
        elif r.startswith("//"):
            full = "https:" + r
        elif r.startswith("/"):
            full = BASE + r
        else:
            full = urllib.parse.urljoin(url, r)
        if full.startswith(BASE):
            if full not in visited:
                queue.append(full)
                found_assets.add(full)

print("\n=== visited %d, queued %d ===" % (len(visited), len(queue)))
print("total local size:")
