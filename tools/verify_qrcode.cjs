// QR 码库（assets/browser-COI8Ulb7.js）全链路正确性回归测试。
//
// 为什么需要它：反混淆的「变量塌陷」在这个 chunk 里制造了 10+ 处缺陷，
// 其中一半**不报错、不崩溃，只是算错** —— 二维码结构完全合法、能扫，
// 但内容是 "1" 而不是整条 URL。只靠 pc_all / verify_links / 页面能渲染，全都发现不了。
//
// 三层验证（逐层加严）：
//   1. 结构：定位图形 / 时序图形 / 对齐图形 / 暗模块 / 格式信息 BCH / 版本信息 BCH
//   2. 回读：独立实现的解码器把矩阵解回原文（覆盖掩码、数据锯齿摆放、纠错块交织、
//      字符计数指示位、NUMERIC/ALPHANUMERIC/BYTE 三种模式）—— 40 版本 × 4 纠错级 = 160 组
//   3. 渲染：SVG path 反解 + Canvas 像素反解，与矩阵逐格比对
//
// 解码器是**独立实现**，不调用被测代码的任何逻辑；只有静态查找表从产物里抄
// （表是死数据，不受塌陷影响，已抽样对照 QR 规范）。否则就是自己验自己。
//
// 用法: node tools/verify_qrcode.cjs
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { ROOT } = require("./_resolve.cjs");

const CHUNK = "browser-COI8Ulb7.js";
const TMP = path.join(ROOT, ".headless");
const ESBUILD = "C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules/.bin/esbuild.cmd";

// ---- 打包被测 chunk ----
fs.mkdirSync(TMP, { recursive: true });
const entry = path.join(TMP, "_qrentry.js");
const bundle = path.join(TMP, "_qrbundle.js");
fs.writeFileSync(
  entry,
  `import { mathHelper_zb5 } from ${JSON.stringify(path.join(ROOT, "assets", CHUNK).replace(/\\/g, "/"))};\n` +
    `globalThis.__QR = mathHelper_zb5;\n`
);
execFileSync(ESBUILD, [entry, "--bundle", "--format=iife", "--outfile=" + bundle, "--log-level=error"], { stdio: "inherit", shell: true });

// ---- DOM 桩（chunk 引用了 canvas）----
let captured = null;
function makeCanvas() {
  return {
    width: 0, height: 0, style: {},
    getContext: () => ({
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      putImageData: (img) => { captured = img; },
      clearRect: () => {}, fillRect: () => {}, save: () => {}, restore: () => {}, scale: () => {}, translate: () => {},
      getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
    }),
    toDataURL: () => "data:image/png;base64,",
  };
}
globalThis.window = globalThis;
globalThis.document = { createElement: (t) => (t === "canvas" ? makeCanvas() : { style: {} }) };
require(bundle);
const QR = globalThis.__QR;

// ---- 规范静态表（抄自 assets/browser-COI8Ulb7.js L25/L289/L290，已抽样对照 QR 规范）----
const CODEWORDS = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
const EC_BLOCKS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
const EC_TOTAL = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
const ECL_IDX = { L: 0, M: 1, Q: 2, H: 3 };
const ECL_BIT = { L: 1, M: 0, Q: 3, H: 2 };
const size = (v) => v * 4 + 17;
const blocksCount = (v, e) => EC_BLOCKS[(v - 1) * 4 + ECL_IDX[e]];
const ecCodewords = (v, e) => EC_TOTAL[(v - 1) * 4 + ECL_IDX[e]];

function alignCoords(v) {
  if (v === 1) return [];
  const posCount = Math.floor(v / 7) + 2, s = size(v);
  const intervals = s === 145 ? 26 : Math.ceil((s - 13) / (2 * posCount - 2)) * 2;
  const pos = [s - 7];
  for (let i = 1; i < posCount - 1; i++) pos[i] = pos[i - 1] - intervals;
  pos.push(6);
  return pos.reverse();
}
function alignPositions(v) {
  const co = alignCoords(v), n = co.length, out = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue;
    out.push([co[i], co[j]]);
  }
  return out;
}
function buildReserved(v) {
  const s = size(v), res = new Uint8Array(s * s);
  const mark = (r, c) => { if (r >= 0 && c >= 0 && r < s && c < s) res[r * s + c] = 1; };
  for (let r = 0; r <= 7; r++) for (let c = 0; c <= 7; c++) { mark(r, c); mark(r, s - 1 - c); mark(s - 1 - r, c); }
  for (let i = 0; i < s; i++) { mark(6, i); mark(i, 6); }
  for (let c = 0; c <= 8; c++) mark(8, c);
  for (let c = s - 8; c < s; c++) mark(8, c);
  for (let r = 0; r <= 8; r++) mark(r, 8);
  for (let r = s - 8; r < s; r++) mark(r, 8);
  for (const [ar, ac] of alignPositions(v)) for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) mark(ar + dr, ac + dc);
  if (v >= 7) for (let i = 0; i < 18; i++) { const r = Math.floor(i / 3), c = (i % 3) + s - 8 - 3; mark(r, c); mark(c, r); }
  return res;
}
function maskAt(p, i, j) {
  switch (p) {
    case 0: return (i + j) % 2 === 0;
    case 1: return i % 2 === 0;
    case 2: return j % 3 === 0;
    case 3: return (i + j) % 3 === 0;
    case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case 5: return ((i * j) % 2) + ((i * j) % 3) === 0;
    case 6: return (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
    case 7: return (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;
    default: throw new Error("非法掩码 " + p);
  }
}
const bchDigit = (d) => { let n = 0; while (d !== 0) { n++; d >>>= 1; } return n; };
function formatBits(e, mask) {
  const G15 = 0b10100110111, G15_MASK = 0b101010000010010;
  const data = (ECL_BIT[e] << 3) | mask;
  let d = data << 10;
  while (bchDigit(d) - bchDigit(G15) >= 0) d ^= G15 << (bchDigit(d) - bchDigit(G15));
  return (((data << 10) | d) ^ G15_MASK) >>> 0;
}
function versionBits(v) {
  const G18 = 0b1111100100101;
  let d = v << 12;
  while (bchDigit(d) - bchDigit(G18) >= 0) d ^= G18 << (bchDigit(d) - bchDigit(G18));
  return ((v << 12) | d) >>> 0;
}
const ALNUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
function charCountBits(mode, v) {
  const t = v < 10 ? 0 : v < 27 ? 1 : 2;
  if (mode === 1) return [10, 12, 14][t];
  if (mode === 2) return [9, 11, 13][t];
  if (mode === 4) return [8, 16, 16][t];
  if (mode === 8) return [8, 10, 12][t];
  throw new Error("非法模式 " + mode);
}

function decode(qr, ecl) {
  const v = qr.version, s = qr.modules.size, m = qr.modules.data;
  if (s !== size(v)) throw new Error("size 与 version 不符");
  const get = (r, c) => !!m[r * s + c];
  const res = buildReserved(v);
  const problems = [];

  const finder = (r0, c0) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      const want = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
      if (get(r0 + r, c0 + c) !== want) return false;
    }
    return true;
  };
  if (!finder(0, 0) || !finder(0, s - 7) || !finder(s - 7, 0)) problems.push("定位图形");
  for (let i = 8; i < s - 8; i++) if (get(6, i) !== (i % 2 === 0) || get(i, 6) !== (i % 2 === 0)) { problems.push("时序图形"); break; }
  if (!get(s - 8, 8)) problems.push("暗模块");
  for (const [ar, ac] of alignPositions(v)) {
    let bad = false;
    for (let dr = -2; dr <= 2 && !bad; dr++) for (let dc = -2; dc <= 2 && !bad; dc++)
      if (get(ar + dr, ac + dc) !== (Math.max(Math.abs(dr), Math.abs(dc)) !== 1)) bad = true;
    if (bad) { problems.push("对齐图形@" + ar + "," + ac); break; }
  }
  const fb = formatBits(ecl, qr.maskPattern);
  for (let i = 0; i < 15; i++) {
    const bit = ((fb >> i) & 1) === 1;
    const rv = i < 6 ? i : i < 8 ? i + 1 : s - 15 + i;
    const ch = i < 8 ? s - i - 1 : i < 9 ? 15 - i : 15 - i - 1;
    if (get(rv, 8) !== bit) { problems.push("格式信息(竖)"); break; }
    if (get(8, ch) !== bit) { problems.push("格式信息(横)"); break; }
  }
  if (v >= 7) {
    const vb = versionBits(v);
    for (let i = 0; i < 18; i++) {
      const bit = ((vb >> i) & 1) === 1;
      const r = Math.floor(i / 3), c = (i % 3) + s - 8 - 3;
      if (get(r, c) !== bit || get(c, r) !== bit) { problems.push("版本信息"); break; }
    }
  }

  // 解掩码 + 锯齿回读
  const bits = [];
  let row = s - 1, inc = -1;
  for (let col = s - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (;;) {
      for (let c = 0; c < 2; c++) {
        const cc = col - c;
        if (!res[row * s + cc]) bits.push(get(row, cc) !== maskAt(qr.maskPattern, row, cc) ? 1 : 0);
      }
      row += inc;
      if (row < 0 || row >= s) { row -= inc; inc = -inc; break; }
    }
  }
  const total = CODEWORDS[v];
  const cw = new Uint8Array(total);
  for (let i = 0; i < total; i++) { let b = 0; for (let k = 0; k < 8; k++) b = (b << 1) | (bits[i * 8 + k] || 0); cw[i] = b; }

  // 反交织
  const nb = blocksCount(v, ecl), dataTotal = total - ecCodewords(v, ecl);
  const g2 = total % nb, g1 = nb - g2, d1 = Math.floor(dataTotal / nb), d2 = d1 + 1;
  const sizes = [];
  for (let b = 0; b < nb; b++) sizes.push(b < g1 ? d1 : d2);
  const dc = sizes.map((n) => new Uint8Array(n));
  let idx = 0;
  for (let i = 0; i < Math.max(...sizes); i++) for (let b = 0; b < nb; b++) if (i < sizes[b]) dc[b][i] = cw[idx++];
  const stream = [];
  for (const blk of dc) for (const byte of blk) stream.push(byte);

  // 位流解析
  let bp = 0;
  const readBits = (n) => { let x = 0; for (let k = 0; k < n; k++) { const byte = stream[bp >> 3] || 0; x = (x << 1) | ((byte >> (7 - (bp & 7))) & 1); bp++; } return x; };
  let out = "";
  for (;;) {
    if (bp + 4 > stream.length * 8) break;
    const mode = readBits(4);
    if (mode === 0) break;
    const n = readBits(charCountBits(mode, v));
    if (mode === 4) { const buf = []; for (let i = 0; i < n; i++) buf.push(readBits(8)); out += Buffer.from(buf).toString("utf8"); }
    else if (mode === 2) {
      for (let i = 0; i + 1 < n; i += 2) { const x = readBits(11); out += ALNUM[Math.floor(x / 45)] + ALNUM[x % 45]; }
      if (n % 2) out += ALNUM[readBits(6)];
    } else if (mode === 1) {
      let i = 0;
      for (; i + 2 < n; i += 3) out += String(readBits(10)).padStart(3, "0");
      if (n - i === 2) out += String(readBits(7)).padStart(2, "0");
      else if (n - i === 1) out += String(readBits(4));
    } else { problems.push("未知模式" + mode); break; }
  }
  return { problems, text: out };
}

function gridFromPath(d, s, margin) {
  const g = new Uint8Array(s * s);
  let x = 0, y = 0;
  for (const t of d.match(/[Mmh][^Mmh]*/g) || []) {
    const nums = t.slice(1).trim().split(/\s+/).map(Number);
    if (t[0] === "M") { x = nums[0]; y = nums[1]; }
    else if (t[0] === "m") { x += nums[0]; y += nums[1] || 0; }
    else { const row = Math.round(y - 0.5) - margin;
      for (let k = 0; k < nums[0]; k++) { const col = x - margin + k; if (row >= 0 && row < s && col >= 0 && col < s) g[row * s + col] = 1; }
      x += nums[0]; }
  }
  return g;
}

// ================= 跑测试 =================
const SAMPLES = [
  "https://xmyzstudent.com/voices/question/1",
  "https://xmyzstudent.com/ticket/12345?code=ABCDEF",
  "HELLO WORLD 123",
  "校园门票核销码-2026-0805-0001",
  "A".repeat(300),
];
const LOREM = "The quick brown fox jumps over the lazy dog 0123456789 https://xmyzstudent.com/ticket/ ";
const MARGIN = 4;
let fail = 0;

// 1+2) 结构 + 回读：40 版本 × 4 纠错级
let rtPass = 0;
const rtFail = [];
for (let v = 1; v <= 40; v++) for (const ecl of ["L", "M", "Q", "H"]) {
  const cap = Math.max(1, Math.floor(((CODEWORDS[v] - ecCodewords(v, ecl)) * 8 - 20) / 8) - 1);
  const text = LOREM.repeat(Math.ceil(cap / LOREM.length) + 1).slice(0, cap);
  try {
    const r = decode(QR.create(text, { errorCorrectionLevel: ecl, version: v }), ecl);
    if (r.problems.length === 0 && r.text.startsWith(text)) rtPass++;
    else rtFail.push(`v${v}-${ecl} ${r.problems.join(",")}${r.text.startsWith(text) ? "" : " 回读文本不符"}`);
  } catch (e) { rtFail.push(`v${v}-${ecl} 抛错 ${e.message}`); }
}
console.log(`[1+2] 结构 + 回读: ${rtPass}/160 通过（40 版本 × 4 纠错级）`);
rtFail.slice(0, 10).forEach((f) => console.log("      FAIL " + f));
fail += rtFail.length;

// 站点真实文本（自动选版本）
console.log("\n[2b] 站点真实文本（自动选版本）");
for (const t of SAMPLES) {
  const qr = QR.create(t, { errorCorrectionLevel: "M" });
  const r = decode(qr, "M");
  const ok = r.problems.length === 0 && r.text.startsWith(t);
  if (!ok) fail++;
  console.log(`      ${ok ? "OK  " : "FAIL"} version=${qr.version} mask=${qr.maskPattern} 回读=${JSON.stringify(r.text.slice(0, 46))}${r.problems.length ? " 问题:" + r.problems.join(",") : ""}`);
}

// 3) 渲染器
(async () => {
  let svgOk = 0, cvOk = 0;
  for (const text of SAMPLES) {
    const qr = QR.create(text, { errorCorrectionLevel: "M" });
    const s = qr.modules.size;
    // SVG：第一个 <path> 是背景矩形，取最长的那个 d
    const svg = await QR.toString(text, { type: "svg", errorCorrectionLevel: "M", margin: MARGIN });
    const d = [...String(svg).matchAll(/ d="([^"]+)"/g)].map((x) => x[1]).sort((a, b) => b.length - a.length)[0];
    const g = gridFromPath(d || "", s, MARGIN);
    let diff = 0;
    for (let i = 0; i < s * s; i++) if (!!qr.modules.data[i] !== !!g[i]) diff++;
    if (diff === 0) svgOk++; else { fail++; console.log(`      SVG FAIL size=${s} 不一致 ${diff} 处`); }
    // Canvas
    captured = null;
    await QR.toCanvas(makeCanvas(), text, { errorCorrectionLevel: "M", margin: MARGIN, scale: 1 });
    const W = captured ? captured.width : -1;
    let cdiff = W === s + MARGIN * 2 ? 0 : 1;
    if (!cdiff) for (let r = 0; r < s; r++) for (let c = 0; c < s; c++)
      if ((captured.data[((r + MARGIN) * W + (c + MARGIN)) * 4] < 128) !== !!qr.modules.data[r * s + c]) cdiff++;
    if (cdiff === 0) cvOk++; else { fail++; console.log(`      Canvas FAIL size=${s} 不一致 ${cdiff} 处`); }
  }
  console.log(`\n[3] SVG path 反解: ${svgOk}/${SAMPLES.length} 通过`);
  console.log(`[3] Canvas 像素反解: ${cvOk}/${SAMPLES.length} 通过`);
  console.log(`\n================ ${fail === 0 ? "全部通过 ✓" : "失败 " + fail + " 项"} ================`);
  process.exit(fail === 0 ? 0 : 1);
})();
