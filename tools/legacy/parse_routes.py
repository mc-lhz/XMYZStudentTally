import re, json, os

js = open("assets/index-DJrtCu9i.js", encoding="utf-8", errors="ignore").read()
idx = js.find("routes:[")
assert idx != -1, "routes:[ not found"
# extract routes array content by bracket matching
start = js.index("[", idx)
depth = 0
i = start
while i < len(js):
    c = js[i]
    if c == "[": depth += 1
    elif c == "]":
        depth -= 1
        if depth == 0:
            end = i
            break
    i += 1
arr = js[start+1:end]

def obj_start(s, pos):
    depth = 0
    i = pos
    while i >= 0:
        c = s[i]
        if c == "}": depth += 1
        elif c == "{":
            if depth == 0: return i
            depth -= 1
        i -= 1
    return -1

def obj_end(s, start):
    depth = 0
    i = start
    while i < len(s):
        c = s[i]
        if c == "{": depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0: return i
        i += 1
    return -1

routes = []
for m in re.finditer(r'path:"', arr):
    s = obj_start(arr, m.start()-1)
    e = obj_end(arr, s)
    block = arr[s:e+1]
    path = re.search(r'path:"([^"]*)"', block)
    name = re.search(r'name:"([^"]*)"', block)
    redirect = re.search(r'redirect:"([^"]*)"', block)
    title = re.search(r'title:"([^"]*)"', block)
    level = re.search(r'level:(\d+)', block)
    parent = re.search(r'parent:"([^"]*)"', block)
    chunk = re.search(r'import\("\./([^"]+)"\)', block)
    auth = "requiresAuth:!0" in block
    routes.append({
        "path": path.group(1) if path else "",
        "name": name.group(1) if name else "",
        "title": title.group(1) if title else "",
        "level": int(level.group(1)) if level else None,
        "requiresAuth": auth,
        "parent": parent.group(1) if parent else "",
        "redirect": redirect.group(1) if redirect else "",
        "chunk": chunk.group(1) if chunk else "",
    })

print("parsed route entries:", len(routes))
# build full path for nested (parent chain) - we only have parent name; approximate with path
# output JSON
with open("routes.json", "w", encoding="utf-8") as f:
    json.dump(routes, f, ensure_ascii=False, indent=2)

# markdown table
lines = ["# xmyzstudent.com 路由表（提取自 index-DJrtCu9i.js）", "",
         f"共 {len(routes)} 条路由", "",
         "| 路径 path | 名称 name | 标题 title | 层级 | 需登录 | 父级 | 懒加载分块 |",
         "|---|---|---|---|---|---|---|"]
for r in routes:
    auth = "是" if r["requiresAuth"] else "否"
    path = r["redirect"] and f"→ {r['redirect']}" or r["path"]
    lines.append(f"| {path} | {r['name']} | {r['title']} | {r['level']} | {auth} | {r['parent']} | {r['chunk']} |")
open("routes.md", "w", encoding="utf-8").write("\n".join(lines) + "\n")
print("wrote routes.json and routes.md")
