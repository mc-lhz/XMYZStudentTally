// 通过 V8 Inspector 协议中断一个「事件循环被饿死」的 Node 进程，抓取真实调用栈。
//
// 背景：当 JS 陷入同步死循环或 microtask starvation 时，setTimeout / Promise.race
// 超时保护全部失效（回调排不到），进程内自省无解。但 V8 inspector 跑在独立 IO 线程，
// 仍能响应 CDP 命令；Debugger.pause 会设置中断标志，V8 在循环回边/函数调用处检查并中断。
// 这正是 Chrome DevTools 能暂停死循环脚本的原理。
//
// 用法：
//   1) 后台启动被测进程：node --inspect=127.0.0.1:9339 <script> <args>
//   2) node tools/cdp_pause.cjs [port] [waitMs]
//
// 输出：暂停点的完整调用栈（函数名 + 脚本 + 行:列），以及最内层若干帧的源码片段。

const PORT = Number(process.argv[2] || 9339);
const WAIT = Number(process.argv[3] || 6000);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getTarget() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const list = await res.json();
  const t = list.find((x) => x.webSocketDebuggerUrl);
  if (!t) throw new Error("没有可调试的 target");
  return t.webSocketDebuggerUrl;
}

(async () => {
  console.log(`[cdp] 等待 ${WAIT}ms 让目标进程进入卡死状态...`);
  await sleep(WAIT);

  const url = await getTarget();
  console.log("[cdp] 连接", url);
  const ws = new WebSocket(url);

  let id = 0;
  const pending = new Map();
  const scripts = new Map(); // scriptId -> url

  function send(method, params = {}) {
    const mid = ++id;
    ws.send(JSON.stringify({ id: mid, method, params }));
    return new Promise((resolve) => pending.set(mid, resolve));
  }

  const paused = new Promise((resolve) => {
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg.result);
        pending.delete(msg.id);
        return;
      }
      if (msg.method === "Debugger.scriptParsed") {
        scripts.set(msg.params.scriptId, msg.params.url || "(eval)");
      }
      if (msg.method === "Debugger.paused") resolve(msg.params);
    });
  });

  await new Promise((r) => ws.addEventListener("open", r));
  console.log("[cdp] 已连接，启用 Debugger 并请求中断");

  await send("Debugger.enable", { maxScriptsCacheSize: 10000000 });
  await send("Debugger.pause");

  const timeout = sleep(15000).then(() => null);
  const p = await Promise.race([paused, timeout]);

  if (!p) {
    console.log("[cdp] ✗ 15s 内未能中断——目标可能不在执行 JS（真死锁/原生阻塞）");
    ws.close();
    process.exit(1);
  }

  console.log(`\n[cdp] ★ 已中断！reason=${p.reason}`);
  console.log(`[cdp] 调用栈深度 = ${p.callFrames.length}\n`);

  const frames = p.callFrames.slice(0, 40);
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    const loc = f.location;
    const src = scripts.get(loc.scriptId) || "?";
    const short = String(src).split(/[\\/]/).pop() || src;
    console.log(
      `  #${String(i).padStart(2)} ${(f.functionName || "(anonymous)").padEnd(28)} ${short}:${loc.lineNumber + 1}:${loc.columnNumber}`
    );
  }

  // 取最内层几帧的源码，定位真实语句
  console.log("\n[cdp] === 最内层帧源码 ===");
  for (const f of p.callFrames.slice(0, 6)) {
    const loc = f.location;
    const r = await send("Debugger.getScriptSource", { scriptId: loc.scriptId });
    if (!r || !r.scriptSource) continue;
    const lines = r.scriptSource.split("\n");
    const ln = loc.lineNumber;
    const line = lines[ln] || "";
    const src = scripts.get(loc.scriptId) || "?";
    const short = String(src).split(/[\\/]/).pop() || src;
    console.log(`\n--- ${f.functionName || "(anonymous)"} @ ${short}:${ln + 1} ---`);
    // 行可能极长（压缩产物），只取列号附近
    const c = loc.columnNumber;
    const from = Math.max(0, c - 300);
    console.log(line.slice(from, c + 300));
    console.log(" ".repeat(Math.min(c - from, 300)) + "^");
  }

  ws.close();
  process.exit(0);
})().catch((e) => {
  console.error("[cdp] 失败:", e.message);
  process.exit(1);
});
