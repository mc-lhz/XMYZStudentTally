#!/usr/bin/env node
/**
 * 渲染等价性校验（镜像原版 vs 治理版）
 * =====================================
 *
 * 目的：证明"治理后的 JS 只是可读性改造，没有动渲染逻辑"。
 *
 * 做法：
 *   1. 把待测 chunk 的相对 import 重定向到本目录下的 Vue 运行时桩
 *      （runtime-stub.mjs / components-stub.mjs / api-stub.mjs / socket-stub.mjs）；
 *   2. 跑一遍 setup() 与 render()；
 *   3. 把产出的 vnode 树规范化成 JSON —— 规范化会把函数折叠成 "<fn>"，
 *      但保留 **DOM 层级、props、children、patchFlag、dynamicProps、
 *      以及静态 vnode 缓存数组(_cache)的槽位填充情况**；
 *   4. 与另一份产物逐字节比对。
 *
 * 用法：
 *   node tools/verify_render.mjs <页面chunk路径> <输出json>
 *
 * 例（一次比完四个页面）：
 *   node tools/verify_render.mjs <repo>/assets/TallyControlPage-CBBTMqC8.js /tmp/orig.json
 *   node tools/verify_render.mjs <model>/tally/static/assets/TallyControlPage-CBBTMqC8.js /tmp/new.json
 *   fc /tmp/orig.json /tmp/new.json     # Windows
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1").replace(/%7E/i, "~")
);

/* ── 浏览器全局桩 ── */
globalThis.window = {
  location: { origin: "http://localhost:5000", protocol: "http:", host: "localhost:5000" },
  addEventListener() {},
  removeEventListener() {},
  open() {},
  setTimeout,
  clearTimeout,
};
globalThis.location = globalThis.window.location;
globalThis.document = {
  body: { classList: { add() {}, remove() {} } },
  documentElement: { classList: { contains: () => false, toggle() {} } },
  addEventListener() {},
  removeEventListener() {},
  fullscreenElement: null,
  exitFullscreen: () => Promise.resolve(),
};
Object.defineProperty(globalThis, "navigator", {
  value: { clipboard: { writeText: () => Promise.resolve() } },
  configurable: true,
  writable: true,
});
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.sessionStorage = { getItem: () => null, setItem() {} };
globalThis.confirm = () => true;

/** 把 chunk 里的相对 import 重定向到桩模块 */
function rewrite(code) {
  return code
    .replace(/from\s+"\.\/index-DJrtCu9i\.js"/g, 'from "./runtime-stub.mjs"')
    .replace(/from\s+"\.\/tally-DC36h0vE\.js"/g, 'from "./api-stub.mjs"')
    .replace(/from\s+"\.\/useTallySocket-Bnuwbx53\.js"/g, 'from "./socket-stub.mjs"')
    .replace(/from\s+"\.\/PageHeader-BWL8GUHB\.js"/g, 'from "./components-stub.mjs"')
    .replace(/from\s+"\.\/PageFooter-BK6at51a\.js"/g, 'from "./components-stub.mjs"')
    .replace(/from\s+"\.\/PageBreadcrumb-BfFUydNi\.js"/g, 'from "./components-stub.mjs"')
    .replace(/import\s+"\.\/tally-DC36h0vE\.js"/g, 'import "./api-stub.mjs"')
    .replace(/from\s+"\.\/([A-Za-z0-9_.-]+\.js)"/g, 'from "./components-stub.mjs"');
}

const target = process.argv[2];
const output = process.argv[3];
if (!target || !output) {
  console.error("用法: node verify_render.mjs <页面chunk> <输出json>");
  process.exit(2);
}

const code = rewrite(fs.readFileSync(target, "utf8"));
const tmp = path.join(HERE, "_target.mjs");
fs.writeFileSync(tmp, code, "utf8");

const mod = await import(pathToFileURL(tmp).href);
const component = mod.default || Object.values(mod)[0];

/* setup 阶段 */
const setupResult = component.setup({}, {});

/* render 阶段：ctx 只作保险（本项目 render 全部走 setup 内闭包，不读 ctx） */
const ctx = new Proxy(
  {},
  { get: (_t, k) => (typeof k === "string" ? `<ctx.${k}>` : undefined) }
);
const cache = [];
const renderFn = typeof setupResult === "function" ? setupResult : () => null;
const tree = renderFn(ctx, cache);

/** 规范化：函数/符号折叠成稳定标记，其余全部原样保留 */
function normalize(node, seen) {
  if (!seen) seen = [];
  if (node == null) return node;
  if (typeof node === "function") return "<fn>";
  if (typeof node === "symbol") return "<symbol>";
  if (typeof node !== "object") return node;
  if (seen.indexOf(node) >= 0) return "<circular>";
  seen.push(node);
  if (Array.isArray(node)) return node.map((n) => normalize(n, seen.slice()));
  if ("__raw" in node) return { __raw: node.__raw };
  if ("value" in node && Object.keys(node).length === 1) {
    return { __ref: normalize(node.value, seen.slice()) };
  }
  const out = {};
  for (const key of Object.keys(node).sort()) out[key] = normalize(node[key], seen.slice());
  return out;
}

fs.writeFileSync(
  output,
  JSON.stringify(
    {
      component: component.__name,
      tree: normalize(tree),
      cacheFilled: cache.map((c) => (c === undefined ? null : "filled")),
    },
    null,
    2
  ),
  "utf8"
);
console.log("rendered " + component.__name + " -> " + output);
fs.unlinkSync(tmp);