import os, glob, re
ext = r"(?:png|jpe?g|gif|svg|webp|avif|woff2?|ttf|otf|eot|mp3|mp4|webm|ogg|wav|json|ico|js|css)"
pat = re.compile(r"""(?:['"]((?:/|\.{1,2}/|https?://xmyzstudent\.com/)[^'"]*?\.(?:%s))['"])""" % ext, re.I)
missing=[]; ok=0
refs=set()
for f in glob.glob("**/*", recursive=True):
    if not os.path.isfile(f) or f.endswith(".py"): continue
    t=open(f,encoding="utf-8",errors="ignore").read()
    for m in pat.findall(t): refs.add(m)
for r in sorted(refs):
    if r.startswith("http"): path=r.split("xmyzstudent.com",1)[1]
    elif r.startswith("/"): path=r
    else: path="/assets/"+r.lstrip("./")
    local="."+path
    if os.path.exists(local): ok+=1
    else: missing.append(path)
print("referenced:",len(refs),"present:",ok,"missing:",len(missing))
for m in missing: print("  MISSING",m)
