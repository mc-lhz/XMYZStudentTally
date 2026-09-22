import re, glob
# Find self-referential assignments: identifier[identifier] = ...
# Strong signal of a for-in/for-of loop whose body wrongly used the loop
# variable as the target object (deobfuscation name-collapse bug).
pat = re.compile(r'\b([A-Za-z_$][\w$]*)\[\1\]\s*=')
hits = []
for f in sorted(glob.glob('assets/*.js')):
    try:
        lines = open(f, encoding='utf-8').read().splitlines()
    except Exception as e:
        continue
    for i, line in enumerate(lines, 1):
        for m in pat.finditer(line):
            hits.append((f, i, line.strip()[:240]))
for f, i, ln in hits:
    print(f"{f}:{i}: {ln}")
print("TOTAL:", len(hits))
