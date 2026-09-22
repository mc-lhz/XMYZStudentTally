// 把 SPA 的 ESM 产物打包成单个 IIFE，供 jsdom 无头执行（jsdom 不支持 <script type="module">）
// 用法: node tools/headless_build.cjs
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { ROOT } = require("./_resolve.cjs");

const ESBUILD =
  process.env.ESBUILD ||
  "C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules/.bin/esbuild.cmd";

const entry = path.join(ROOT, "assets", "index-DJrtCu9i.js");
const outdir = path.join(ROOT, ".headless");
const outfile = path.join(outdir, "bundle.js");

if (!fs.existsSync(entry)) {
  console.error("找不到入口:", entry);
  process.exit(2);
}
fs.mkdirSync(outdir, { recursive: true });

try {
  // Windows 下 .cmd 需要 shell:true，否则 spawnSync 抛 EINVAL
  execFileSync(
    ESBUILD,
    [entry, "--bundle", "--format=iife", "--outfile=" + outfile, "--log-level=warning"],
    { stdio: "inherit", shell: true }
  );
} catch (e) {
  console.error("esbuild 打包失败:", e.message);
  process.exit(1);
}

const size = fs.statSync(outfile).size;
console.log(`打包完成: .headless/bundle.js (${(size / 1024 / 1024).toFixed(2)} MB)`);
