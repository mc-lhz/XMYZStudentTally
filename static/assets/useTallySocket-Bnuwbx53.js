/*!
 * 模块：useTallySocket（assets/useTallySocket-Bnuwbx53.js）
 * 角色：唱票实时通道的组合式函数（composable）。
 *       大屏页 ScreenPage 与唱票控制台 TallyControlPage 共用它订阅同一份快照。
 *
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：变量名 val/zzN -> 语义名，逐段补注释（逻辑零改动）。
 *
 * 契约（由源站实现反推，本地 Flask 侧按此实现）：
 *   · 服务端只在「连接建立」和「数据变更」两种时机发消息，内容都是全量快照；
 *   · 客户端不做增量合并，每收到一帧就整体替换 snapshot；
 *   · 客户端从不主动发业务消息，连接是单向的（服务端 → 客户端）。
 *
 * 断线语义：
 *   · 正常关闭（组件卸载 / 活动 id 置空）用 closedByUs 标记，不再重连；
 *   · 异常断开按 1s → 2s → 4s … 指数退避重连，上限 30s，连上即重置为 1s。
 */

/* 导入：本地模块 tally（提供 WebSocket 地址构造函数） */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— ref / watch / directiveBum(等价 onUnmounted) 等 */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";

/** 重连退避参数 */
const retryBaseDelay = 1e3;   // 首次重连等待 1s
const retryMaxDelay = 3e4;    // 退避上限 30s

/**
 * 订阅某个活动的实时唱票快照。
 *
 * @param {import('vue').Ref<number|null>} activityIdRef 活动 ID（响应式）
 * @returns {{ snapshot: Ref<object|null>, connected: Ref<boolean> }}
 *          snapshot —— 最新一帧全量快照；connected —— 连接是否在线（供页面显示「已连接/重连中」）
 */
export function createTallySocket(activityIdRef) {
  const snapshot = ref(null);
  const connected = ref(false);

  let socket = null;        // 当前 WebSocket 实例
  let retryDelay = retryBaseDelay;
  let retryTimer = null;    // 重连定时器
  let closedByUs = false;   // 是否是我们主动关闭（主动关闭不再重连）

  /** 建立连接并挂上四个回调 */
  function connect(activityId) {
    // 先拆掉旧连接，并把「主动关闭」标记复位，避免误判成异常断开
    teardown();
    closedByUs = false;

    try {
      socket = new WebSocket(tallyActivityWsUrl(activityId));
    } catch (error) {
      console.error("Tally WS connect failed", error);
      scheduleReconnect(activityId);
      return;
    }

    socket.onopen = () => {
      connected.value = true;
      retryDelay = retryBaseDelay;      // 连上即把退避计数重置
    };

    socket.onmessage = (event) => {
      try {
        // 服务端推的是全量快照，直接整体替换
        snapshot.value = JSON.parse(event.data);
      } catch (error) {
        console.error("Tally WS message parse failed", error);
      }
    };

    socket.onclose = () => {
      connected.value = false;
      // 只有「非主动关闭」才需要重连
      if (!closedByUs) {
        scheduleReconnect(activityId);
      }
    };

    // 错误不单独处理：WebSocket 报错后必然紧跟一次 close，重连逻辑放在 onclose 里
    socket.onerror = () => {};
  }

  /** 指数退避重连：1s → 2s → 4s … → 30s 封顶 */
  function scheduleReconnect(activityId) {
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = setTimeout(() => connect(activityId), retryDelay);
    retryDelay = Math.min(retryDelay * 2, retryMaxDelay);
  }

  /** 拆除连接：清掉待执行的重连、标记主动关闭、关闭 socket */
  function teardown() {
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    if (socket) {
      closedByUs = true;                // 先置位，onclose 里就不会再排重连
      try {
        socket.close();
      } catch {}
      socket = null;
    }
  }

  // 活动 ID 变化时自动换房：有值就连，空值就断（immediate 保证首次即连接）
  watch(activityIdRef, (activityId) => {
    activityId ? connect(activityId) : teardown();
  }, {
    immediate: true
  });

  // 组件卸载时收线，避免路由跳走后残留连接
  directiveBum(() => {
    closedByUs = true;
    teardown();
  });

  return {
    snapshot,
    connected
  };
}
