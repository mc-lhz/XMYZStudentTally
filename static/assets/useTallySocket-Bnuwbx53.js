/*!
 * 模块：useTallySocket（useTallySocket-Bnuwbx53.js）
 * 角色：实时唱票的 WebSocket 组合式函数 —— 连接 / 快照 / 断线指数退避重连。
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * ── 治理说明 ────────────────────────────────────────────────────
 *   1. 语义化：原 zz0/zz1/zz2/zz3 与 val*、num 等混淆名已重命名为业务语义名；
 *   2. 格式化：统一 2 空格缩进、按语句换行；
 *   3. 注释：补充与源站协议的对应关系（只收不发、JSON 快照、指数退避）。
 *   连接地址由 tally-DC36h0vE.js 的 tallyActivityWsUrl(activityId) 提供，
 *   本地路径与源站逐字一致：/ws/tally/activity/:id。
 *
 * ── 使用方 ──────────────────────────────────────────────────────
 *   ScreenPage（大屏 /tally/screen/:id）与 TallyControlPage（唱票控制台）共用：
 *     const { snapshot, connected } = useTallySocket(activityIdRef)
 *   snapshot 即服务端推送的整份活动快照（含 candidates 票数），页面渲染全部来自它，
 *   因此大屏/控制台无需再发任何 REST 请求即可实时刷新。
 */
/* 导入：本地模块 tally —— WS 地址构造器 */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— Vue 响应式 ref / watch / onUnmounted(语义名 directiveBum) */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";

/**
 * 建立（并维持）一条 tally WebSocket 连接。
 * @param {import('vue').Ref<number|null>} activityId 活动 ID；变化时自动重连，置空则断开
 * @returns {{ snapshot: import('vue').Ref<object|null>, connected: import('vue').Ref<boolean> }}
 *          snapshot = 最近一次服务端快照；connected = 当前是否已连接
 */
function createTallySocket(activityId) {
  const snapshot = ref(null);     // 最近一次收到的活动快照（服务端全量推送）
  const connected = ref(false);   // 连接状态（页面显示「已连接 / 重连中…」）

  let socket = null;              // 当前 WebSocket 实例
  let reconnectDelayMs = 1000;    // 下次重连等待毫秒数：1s 起，指数翻倍，封顶 30s
  let reconnectTimer = null;      // setTimeout 句柄
  let closedByUser = false;       // 主动关闭标记（组件卸载/切走活动时置 true，抑制自动重连）

  /** 打开连接，并注册 onopen / onmessage / onclose / onerror 四个处理器。 */
  function connect(targetActivityId) {
    teardownSocket();
    closedByUser = false;
    try {
      socket = new WebSocket(tallyActivityWsUrl(targetActivityId));
    } catch (error) {
      // 构造失败（如地址非法）也走重连，避免页面永远停在「重连中」
      console.error("Tally WS connect failed", error);
      scheduleReconnect(targetActivityId);
      return;
    }
    socket.onopen = () => {
      connected.value = true;
      reconnectDelayMs = 1000; // 连接成功后重置退避基数
    };
    socket.onmessage = (event) => {
      // 协议：服务端每次推一整份 JSON 快照（非增量），直接整体替换 snapshot
      try {
        snapshot.value = JSON.parse(event.data);
      } catch (error) {
        console.error("Tally WS message parse failed", error);
      }
    };
    socket.onclose = () => {
      connected.value = false;
      // 非主动关闭 → 进入指数退避重连
      if (!closedByUser) scheduleReconnect(targetActivityId);
    };
    socket.onerror = () => {}; // 错误总会触发 onclose，重连统一在 onclose 处理
  }

  /** 指数退避：delay = min(delay * 2, 30s)，到点后重新 connect。 */
  function scheduleReconnect(targetActivityId) {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connect(targetActivityId), reconnectDelayMs);
    reconnectDelayMs = Math.min(reconnectDelayMs * 2, 30000);
  }

  /** 清定时器并关闭 socket（不触发重连）。 */
  function teardownSocket() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      closedByUser = true;
      try {
        socket.close();
      } catch {
        /* 已关闭时忽略 */
      }
      socket = null;
    }
  }

  // activityId 变化（含首次赋值 immediate）→ 重连到新活动；为空 → 断开
  watch(activityId, (newId) => {
    if (newId) connect(newId);
    else teardownSocket();
  }, { immediate: true });

  // 组件卸载：标记主动关闭并释放连接
  directiveBum(() => {
    closedByUser = true;
    teardownSocket();
  });

  return { snapshot, connected };
}

/* index 运行时导出（名字与源站一致，页面 chunk 按此 import） */
export { createTallySocket };
