// 提取 assets/ 指定页面的导入别名 + GEN 声明(val/fn/refVal/obj...) 清单，便于人工命名。
// 用法: FILES="a.js,b.js" node tools/extract_pages.cjs   (从任意 cwd 均可运行)
const fs = require("fs");
const path = require("path");
const { ASSETS } = require("./_resolve.cjs");
const FILES = (process.env.FILES || "").split(",").filter(Boolean);
if (!FILES.length) { console.error("缺少 FILES"); process.exit(1); }

for (const F of FILES) {
  const code = fs.readFileSync(path.join(ASSETS, F), "utf8");
  console.log("\n\n################ " + F + " ################");
  // ---- 导入 ----
  console.log("=== IMPORTS (别名→源) ===");
  const impRe = /import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
  let m;
  while ((m = impRe.exec(code))) {
    const specs = m[1].split(",").map(s => s.trim()).filter(Boolean);
    console.log("  " + m[2] + "  <-  {" + specs.join(", ") + "}");
  }
  // ---- GEN 声明 ----
  console.log("=== GEN 声明 (const/let/var/function <GEN> = / ref(...)) ===");
  const lines = code.split("\n");
  const GEN = /^(?:val|fn|from|obj|list|arr|x|y|el|item|data|tmp|res|ret|ctx|param|arg|idx|key|val2|fn2|refVal)[0-9]*$/;
  lines.forEach((l, i) => {
    const re = /\b(const|let|var|function)\s+((?:val|fn|from|obj|list|arr|x|y|el|item|data|tmp|res|ret|ctx|param|arg|idx|key|val2|fn2|refVal)[0-9]*)\b/g;
    let mm;
    while ((mm = re.exec(l))) {
      const name = mm[2];
      const kind = mm[1];
      const tag = /^refVal/.test(name) ? "[state]" : /^fn/.test(name) ? "[fn]" : "[val]";
      console.log("  L" + (i + 1) + " " + tag + " " + l.trim().slice(0, 120));
    }
  });
}
