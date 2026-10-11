/*!
 * 模块：useTallySocket（useTallySocket-Bnuwbx53.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * —— 本地镜像治理说明 ——
 * 本文件是「实时唱票大屏 / 唱票控制台」共用的 WebSocket 组合式函数：
 *   - 对外导出 createTallySocket(activityIdRef)，返回 { snapshot, connected }；
 *   - snapshot   : ref，保存最近一次 WS 推送的活动快照（JSON 已解析）；
 *   - connected  : ref，当前连接是否处于 OPEN 状态（大屏显示「已连接/重连中」）；
 *   - 内部实现了断开自动重连（指数退避 1s→2s→4s… 封顶 30s）与
 *     组件卸载时的连接清理，保证切换路由不残留连接。
 * 治理动作：仅对局部变量做语义化重命名并补充注释，不改变任何连接/重连逻辑。
 */
/* 导入：本地模块 tally（站点内功能模块）—— 提供 WS 地址生成器 tallyActivityWsUrl */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— Vue 组合式 API（ref / watch / onScopeDispose 的编译别名 directiveBum） */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";

/**
 * createTallySocket —— 建立并维护到「实时唱票」服务的 WebSocket 连接。
 *
 * @param {import("vue").Ref<number|null>} activityIdRef  活动 id 的 ref（可为 null）
 * @returns {{ snapshot: import("vue").Ref<object|null>, connected: import("vue").Ref<boolean> }}
 *
 * 工作流程：
 *   1. 监听 activityIdRef：有值 → 立即连接；无值 → 关闭现有连接；
 *   2. 连接成功后把 connected 置 true，并把重连退避间隔重置为 1s；
 *   3. 收到服务端消息 → JSON.parse 后写入 snapshot（大屏/控制台据此渲染）；
 *   4. 连接断开（非主动关闭）→ 按指数退避计划定时重连（1s、2s、4s…最大 30s）；
 *   5. 组件卸载（directiveBum = onScopeDispose）→ 标记主动关闭并清理定时器与连接。
 */
function createTallySocket(activityIdRef) {
  // 最近一次收到的活动快照（服务端 JSON 已解析为对象）
  const snapshot = ref(null);
  // 连接状态：true=WebSocket OPEN，false=断开/重连中
  const connected = ref(false);

  // 当前 WebSocket 实例（null 表示未连接）
  let socket = null;
  // 重连退避间隔（毫秒）：初始 1s，失败后翻倍，最大 30s
  let reconnectDelayMs = 1000;
  // 重连定时器句柄（用于在重连前/卸载时取消）
  let reconnectTimer = null;
  // 主动关闭标记：true 表示由组件卸载或 id 置空触发，不再自动重连
  let manuallyClosed = false;

  /**
   * connect —— 建立到指定活动的 WebSocket 连接并注册事件回调。
   * @param {number} activityId 活动 id
   */
  function connect(activityId) {
    // 先清掉可能残留的重连定时器与旧连接，再新建连接
    clearReconnectTimer();
    manuallyClosed = false;
    try {
      socket = new WebSocket(tallyActivityWsUrl(activityId));
    } catch (err) {
      // 地址非法等同步异常：直接进入退避重连
      console.error("Tally WS connect failed", err);
      scheduleReconnect(activityId);
      return;
    }

    // 连接建立：置 connected=true，重连间隔重置回初始值（下次断开从头退避）
    socket.onopen = () => {
      connected.value = true;
      reconnectDelayMs = 1000;
    };

    // 收到服务端推送：解析为 JSON 快照写入 snapshot ref
    // （服务端在连接建立后立即推一次当前快照，此后每次录票/撤销/候选人变更都会推新快照）
    socket.onmessage = (event) => {
      try {
        snapshot.value = JSON.parse(event.data);
      } catch (err) {
        console.error("Tally WS message parse failed", err);
      }
    };

    // 连接关闭：非主动关闭时按指数退避重连
    socket.onclose = () => {
      connected.value = false;
      if (!manuallyClosed) {
        scheduleReconnect(activityId);
      }
    };

    // onerror 保持空实现：错误后必然触发 onclose，统一由 onclose 走重连
    socket.onerror = () => {};
  }

  /**
   * scheduleReconnect —— 按指数退避调度下一次重连。
   * 间隔序列：1000 → 2000 → 4000 → … → 封顶 30000ms。
   */
  function scheduleReconnect(activityId) {
    clearReconnectTimer();
    reconnectTimer = setTimeout(() => connect(activityId), reconnectDelayMs);
    reconnectDelayMs = Math.min(reconnectDelayMs * 2, 30000);
  }

  /** clearReconnectTimer —— 取消尚未触发的重连定时器。 */
  function clearReconnectTimer() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }

  /**
   * teardown —— 主动关闭连接：标记手动关闭，取消重连定时器，
   * 关闭 WebSocket（不触发 onclose 里的重连分支）。
   */
  function teardown() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      manuallyClosed = true;
      try {
        socket.close();
      } catch (err) {
        /* 连接已关闭时忽略 */
      }
      socket = null;
    }
  }

  // 监听 activityIdRef：有 id 就连接，无 id（如离开页面）就关闭
  watch(
    activityIdRef,
    (activityId) => {
      if (activityId) {
        connect(activityId);
      } else {
        teardown();
      }
    },
    { immediate: true }
  );

  // 组件卸载（对应 onScopeDispose）：主动关闭，避免连接泄漏
  directiveBum(() => {
    manuallyClosed = true;
    teardown();
  });

  return {
    snapshot,
    connected,
  };
}

/* index 运行时导出（已语义化） */
export { createTallySocket };
