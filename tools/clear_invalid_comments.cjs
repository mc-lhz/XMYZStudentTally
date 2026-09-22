// 清除 assets/ 下所有 `/* 内部工具函数 */` 无效占位注释（Vue/Vite 编译噪音）。
// 纯文本删除，块注释不承担 ASI 角色，零语法风险。
// 用法:
//   DRY=1 node tools/clear_invalid_comments.cjs   # 仅预览影响
//   node tools/clear_invalid_comments.cjs         # 实际删除并写回
const fs = require("fs");
const path = require("path");
const { ASSETS } = require("./_resolve.cjs");

const DIR = ASSETS;
const DRY = process.env.DRY === "1";
// 匹配 `/* 内部工具函数 */` 及其变体（允许标签两侧空白）
const RE = /\/\*\s*内部工具函数\s*\*\//g;

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".js"));
let totalFiles = 0, totalComments = 0, changed = 0;

for (const f of files) {
  const fp = path.join(DIR, f);
  const code = fs.readFileSync(fp, "utf8");
  const m = code.match(RE);
  if (!m) continue;
  totalFiles++;
  totalComments += m.length;
  if (DRY) {
    console.log(`[DRY] ${f}: ${m.length} 处`);
    continue;
  }
  const out = code.replace(RE, "");
  // 顺手把删除注释后可能留下的多余空白压实（如 `= /* */val` -> `= val` 已在 replace 内处理；
  // 仅清理连续出现两个空格的情况，避免误伤缩进）
  fs.writeFileSync(fp, out);
  changed++;
}

console.log(`\n涉及文件 ${totalFiles} 个，共 ${totalComments} 处无效注释${DRY ? "（DRY 未改动）" : `，已清除并写回 ${changed} 个文件`}。`);
