/*!
 * 模块：useTallySocket（useTallySocket-Bnuwbx53.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：本地模块 tally（站点内功能模块） */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";
/**
 * createTallySocket
 * 创建实时唱票 WebSocket 组合式函数：
 * 入参 activityIdRef 为活动 ID 的 ref，内部 watch 它建立/断开连接；
 * 返回 { snapshot, connected }：snapshot 为服务端推送的全量快照，connected 为连接状态。
 */
function createTallySocket(activityIdRef) {
  const snapshot = ref(null),
    connected = ref(!1);
  let socket = null,
    retryDelayMs = 1e3,
    reconnectTimer = null,
    manualClose = !1;
  /**
   * connectSocket
   * 建立（或重连）WebSocket 连接：
   * onopen   —— 标记 connected=true 并把重连间隔重置为 1s；
   * onmessage—— JSON.parse 后整体替换 snapshot（源站推的是全量快照，非增量）；
   * onclose  —— 非主动关闭时按指数退避重连；onerror 静默（close 会随后触发）。
   */
  function connectSocket(activityId) {
    closeSocket(), manualClose = !1;
    try {
      socket = new WebSocket(tallyActivityWsUrl(activityId));
    } catch (val5) {
      console.error("Tally WS connect failed", val5), scheduleReconnect(activityId);
      return;
    }
    socket.onopen = () => {
      connected.value = !0, retryDelayMs = 1e3;
    }, socket.onmessage = val5 => {
      try {
        snapshot.value = JSON.parse(val5.data);
      } catch (val6) {
        console.error("Tally WS message parse failed", val6);
      }
    }, socket.onclose = () => {
      connected.value = !1, manualClose || scheduleReconnect(activityId);
    }, socket.onerror = () => {};
  }
  /**
   * scheduleReconnect
   * 指数退避重连调度：1s → 2s → 4s … 上限 30s。
   */
  function scheduleReconnect(activityId) {
    reconnectTimer && clearTimeout(reconnectTimer), reconnectTimer = setTimeout(() => connectSocket(activityId), retryDelayMs), retryDelayMs = Math.min(retryDelayMs * 2, 3e4);
  }
  /**
   * closeSocket
   * 主动断开并清理重连定时器；置 manualClose 避免 onclose 触发自动重连。
   */
  function closeSocket() {
    if (reconnectTimer && (clearTimeout(reconnectTimer), reconnectTimer = null), socket) {
      manualClose = !0;
      try {
        socket.close();
      } catch {}
      socket = null;
    }
  }
  return watch(activityIdRef, activityId => {
    activityId ? connectSocket(activityId) : closeSocket();
  }, {
    immediate: !0
  }), directiveBum(() => {
    manualClose = !0, closeSocket();
  }), { snapshot, connected };
}
/* index 运行时导出（已语义化） */
export { createTallySocket };