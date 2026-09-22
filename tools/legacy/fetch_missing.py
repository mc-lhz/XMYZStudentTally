import re, os, glob, urllib.request, urllib.parse

BASE = "https://xmyzstudent.com"
ROOT = os.path.join(os.getcwd())  # crawl dir
assets_dir = os.path.join(ROOT, "assets")
os.makedirs(assets_dir, exist_ok=True)

# find references like assets/Xxx-hash.css or assets/Xxx-hash.js (no leading slash)
pat = re.compile(r'assets/([A-Za-z0-9_][A-Za-z0-9_.\-/]*?\.(?:css|js))')
refs = set()
for f in glob.glob("assets/*.js") + ["index.html"]:
    try:
        t = open(f, encoding="utf-8", errors="ignore").read()
    except: 
        continue
    for m in pat.findall(t):
        refs.add(m)

local = set(os.listdir(assets_dir))
missing = sorted(r for r in refs if r not in local)
print("referenced assets/ files:", len(refs))
print("missing (not in local assets/):", len(missing))
for m in missing:
    print("  MISSING:", m)

# download missing
ok=0; fail=[]
for m in missing:
    url = BASE + "/assets/" + m
    lp = os.path.join(assets_dir, m)
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        with open(lp,"wb") as fo:
            fo.write(data)
        ok+=1
    except Exception as e:
        fail.append((m, str(e)[:60]))
print("\ndownloaded:", ok, "failed:", len(fail))
for m,e in fail:
    print("  FAIL", m, e)
