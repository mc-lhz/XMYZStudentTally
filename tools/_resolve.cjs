// 公共路径 / 依赖解析。
// 目的：让 tools/ 下的脚本从任意 cwd 都能运行，且不写死任何一台机器的 node_modules 路径。
const path = require("path");

const ROOT      = path.resolve(__dirname, "..");
const ASSETS    = path.join(ROOT, "assets");     // 反混淆后的站点资源(94 JS + 76 CSS)
const OVERRIDES = path.join(ROOT, "overrides");  // 人工命名映射
const PROPOSALS = path.join(ROOT, "data", "proposals");

// @babel/core 可能装在项目内，也可能装在托管 Node 的共享 workspace 里，逐级回退。
function loadBabel() {
  const candidates = [
    process.env.BABEL_CORE,
    "@babel/core",
    path.join(ROOT, "node_modules", "@babel", "core"),
    "C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules/@babel/core",
  ].filter(Boolean);

  for (const c of candidates) {
    try { return require(c); } catch { /* 尝试下一个候选位置 */ }
  }
  throw new Error(
    "找不到 @babel/core。请任选其一：\n" +
    "  1) 在项目根执行 npm install\n" +
    "  2) 设置 NODE_PATH 指向已有的 node_modules\n" +
    "  3) 设置 BABEL_CORE 指向 @babel/core 的绝对路径"
  );
}

// 解析用户传入的相对路径：先按 cwd 找，找不到再按仓库根找。
function resolveInput(p) {
  if (!p) return null;
  if (path.isAbsolute(p)) return p;
  const fs = require("fs");
  const byCwd = path.resolve(process.cwd(), p);
  if (fs.existsSync(byCwd)) return byCwd;
  return path.join(ROOT, p);
}

module.exports = { ROOT, ASSETS, OVERRIDES, PROPOSALS, loadBabel, resolveInput };
