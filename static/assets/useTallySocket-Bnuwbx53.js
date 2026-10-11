/*!
 * 模块：useTallySocket —— 唱票实时通道的 Vue 组合式封装
 * ---------------------------------------------------------------------------
 * 来源：assets/useTallySocket-Bnuwbx53.js（源站 https://xmyzstudent.com/）
 * 被谁用：TallyControlPage（唱票控制台）、ScreenPage（大屏）
 *
 * 【协议约定】
 *   · 服务端 → 客户端：**只有一种消息**，即活动的全量快照 JSON
 *     { activityId, title, status, candidates:[{id,number,name,displayOrder,voteCount}], updatedAt }
 *   · 客户端 → 服务端：**不发任何消息**（大屏是纯订阅者）。
 *     所以本模块的 receive 方向只用于感知关闭，不解析任何上行帧。
 *
 * 【为什么用全量广播而不是增量】
 *   快照只有几百字节，候选人最多十几位；用"每次全量"换来的是
 *   客户端**零状态合并**——收到即整体替换，重连后天然自愈（首帧即最新值），
 *   不需要补差、不需要序号比对、不会因为漏收一帧而永久错位。
 *
 * 【治理说明】重写自压缩产物：变量语义化 + 格式化 + 注释，行为与源码一致。
 */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";

/** 初始重连延迟（毫秒） */
const RECONNECT_DELAY_INIT = 1000;
/** 重连延迟上限（毫秒） */
const RECONNECT_DELAY_MAX = 30000;

/**
 * 订阅某个活动的实时唱票快照。
 *
 * @param {import('vue').Ref<number|null>} activityIdRef 目标活动 id；
 *        为 falsy 时不连接（组件初始化阶段路由参数还没就绪的情况）。
 * @returns {{snapshot: import('vue').Ref<object|null>, connected: import('vue').Ref<boolean>}}
 *   - snapshot  : 最近一帧快照（未收到前为 null，大屏据此显示"加载中…"）
 *   - connected : 连接是否在线（控制台与大屏都拿它渲染"已连接/断线重连中"指示灯）
 */
export function createTallySocket(activityIdRef) {
  // 最近收到的全量快照
  const snapshot = ref(null);
  // 连接是否在线（onopen 置 true，onclose 置 false）
  const connected = ref(false);

  // 当前持有的 WebSocket 实例；null 表示未连接
  let socket = null;
  // 指数退避的当前延迟（ms），连接成功一次就重置回初始值
  let reconnectDelay = RECONNECT_DELAY_INIT;
  // 重连定时器句柄
  let reconnectTimer = null;
  // 主动关闭标记：true 时 onclose 不再触发重连（用于组件卸载、切换活动）
  let manualClose = false;

  /**
   * 建立（或重建）连接，并立即挂好四个事件回调。
   * @param {number} activityId 目标活动 id
   */
  function connect(activityId) {
    // 先清掉旧连接与重连定时器，避免同一时刻存在两条并行连接
    disconnect();
    manualClose = false;

    try {
      socket = new WebSocket(tallyActivityWsUrl(activityId));
    } catch (error) {
      // URL 非法等同步抛出的异常：走退避重连，等价于一次连接失败
      console.error("Tally WS connect failed", error);
      scheduleReconnect(activityId);
      return;
    }

    socket.onopen = () => {
      connected.value = true;
      // 连接建立 = 服务端是健康的，退避重置回 1s，下一次断线从最小延迟开始
      reconnectDelay = RECONNECT_DELAY_INIT;
    };

    socket.onmessage = (event) => {
      try {
        // 整体替换。协议只允许快照帧，若将来混入别的帧，这里会解析失败并
        // 只打日志、不污染已有 snapshot（大屏不会闪成空白）。
        snapshot.value = JSON.parse(event.data);
      } catch (error) {
        console.error("Tally WS message parse failed", error);
      }
    };

    socket.onclose = () => {
      connected.value = false;
      // 非主动关闭（网络抖动 / 服务重启 / 休眠唤醒）→ 退避重连
      if (!manualClose) {
        scheduleReconnect(activityId);
      }
    };

    // onerror 不单独处理：规范上紧随其后的 onclose 才是决定性事件，
    // 在这里做重连会与 onclose 里的重连重复（double reconnect）。
    socket.onerror = () => {};
  }

  /**
   * 安排一次指数退避重连。
   * 1s → 2s → 4s → … → 30s 封顶，且**排他**（新的定时器覆盖旧的）。
   * @param {number} activityId
   */
  function scheduleReconnect(activityId) {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    reconnectTimer = setTimeout(() => connect(activityId), reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_DELAY_MAX);
  }

  /** 关闭当前连接并清理重连定时器（不重置 manualClose，由调用方决定）。 */
  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      manualClose = true;
      try {
        socket.close();
      } catch {
        // close() 在已关闭/未连接时可能抛错，忽略即可
      }
      socket = null;
    }
  }

  // 活动 id 变化（首次 immediate 求值 + 后续路由参数变化）→ 重连到新活动；
  // 变为 falsy 则断开（例如从 /tally/screen/1 跳走）。
  watch(
    activityIdRef,
    (nextId) => {
      if (nextId) {
        connect(nextId);
      } else {
        disconnect();
      }
    },
    { immediate: true }
  );

  // 组件卸载：必须断开，否则泄漏一条长连接 + 后端线程
  // directiveBum 即 Vue 的 onBeforeUnmount（镜像工具把该名字重命名成了 directiveBum）
  directiveBum(() => {
    manualClose = true;
    disconnect();
  });

  return { snapshot, connected };
}