/*!
 * 模块：useTallySocket（useTallySocket-Bnuwbx53.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * ── 业务说明 ─────────────────────────────────────────────────────────────
 * 「实时唱票」的实时刷新通道。唱票控制台与大屏页各自调用 createTallySocket(activityId)，
 * 建立一条指向 /ws/tally/activity/:id 的原生 WebSocket 连接。
 * 后端把活动快照（title/status/candidates，各候选人 voteCount）广播推给该活动的所有订阅者。
 *
 * ── 返回的响应式值 ────────────────────────────────────────────────────────
 *   snapshot  : ref<object|null>  最近一次收到的快照 JSON，页面直接用它渲染
 *               （大屏：柱状图；控制台：候选人卡片、状态栏）
 *   connected : ref<boolean>      当前是否处于已连接状态（页面据此显示「已连接/重连中」）
 *
 * ── 连接生命周期（WebSocket 前端知识点）────────────────────────────────────
 * 1. 原生 new WebSocket(url) 发起升级握手；onopen 置 connected=true；
 * 2. onmessage 收到文本帧，JSON.parse 后写入 snapshot —— 后端每次业务变更都会广播全量快照；
 * 3. 断线即 onclose：若非主动关闭（zz3 前置过 val4=true），则按「指数退避」自动重连：
 *    初始 1000ms，每次 *2，封顶 30000ms（1s→2s→4s→…→30s），避免雪崩式打满服务器；
 * 4. ?devauth 无关：本模块不依赖登录态，大屏 /tally/screen/:id 是公开路由；
 * 5. watch(val,,{immediate:true})：activityId 变化时重建连接；组件卸载（directiveBum）时主动关闭。
 * 注意：真实线上站点采用同构地址 wss://api.xmyzstudent.com/ws/tally/activity/:id，
 *       本地部署经 tally-DC36h0vE.js 的 zz11 改为与当前页面同 host。
 */
/* 导入：本地模块 tally（站点内功能模块）—— 提供 WS 地址构造器 tallyActivityWsUrl */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";

/**
 * createTallySocket(activityId) —— 为指定活动建立实时唱票 WebSocket 连接。
 * @param {Ref<number|null>} val activityId 的 ref：为 null 时不连接，变化时重建连接。
 * @returns {{ snapshot: Ref<object|null>, connected: Ref<boolean> }}
 */
function zz0(val) {
  // refVal：最近一次快照；refVal2：连接状态（页面据此显示「已连接/重连中」）
  const refVal = ref(null),
    refVal2 = ref(!1);
  // val2：当前 WebSocket 实例（null 表示未连接）
  // num：本次重连的延时基数，指数退避（下限 1000ms，翻倍增长，上限 30000ms）
  // val3：重连定时器句柄；val4：是否“主动关闭”标记（主动关闭不再重连）
  let val2 = null,
    num = 1e3,
    val3 = null,
    val4 = !1;

  // zz1 —— 建立一条新的 WebSocket 连接并挂各类生命周期回调
  function zz1(val1) {
    // 连接前先清理旧定时器与旧实例，避免重复连接
    zz3(), val4 = !1;
    try {
      val2 = new WebSocket(tallyActivityWsUrl(val1));
    } catch (val5) {
      // URL 非法等初始化异常：记日志并立即排队重连
      console.error("Tally WS connect failed", val5), zz2(val1);
      return;
    }
    // 打开成功：置连接状态，并把重连基数恢复到最小（说明此前可能经历过多轮退避）
    val2.onopen = () => {
      refVal2.value = !0, num = 1e3;
    }, val2.onmessage = val5 => {
      // 后端每次推送都是 JSON 文本帧 → 解析为快照对象
      try {
        refVal.value = JSON.parse(val5.data);
      } catch (val6) {
        console.error("Tally WS message parse failed", val6);
      }
    }, val2.onclose = () => {
      // 非主动关闭（如网络中断/服务器重启）→ 调度重连；主动关闭则静默退出
      refVal2.value = !1, val4 || zz2(val1);
    }, val2.onerror = () => {};
    // 说明：vite 产物将逻辑压缩为单行，以上每段换行仅为可读化，未改动语义
  }
  // zz2 —— 定时重连：延时 = 当前基数，随后基数翻倍（上限 30s）
  function zz2(val1) {
    val3 && clearTimeout(val3), val3 = setTimeout(() => zz1(val1), num), num = Math.min(num * 2, 3e4);
  }
  // zz3 —— 主动关闭现有连接（组件卸载 / 活动切换前调用），并清理重连定时器
  function zz3() {
    if (val3 && (clearTimeout(val3), val3 = null), val2) {
      val4 = !0; // 标记主动关闭 → onclose 里不再触发重连
      try {
        val2.close();
      } catch {}
      val2 = null;
    }
  }
  // 监听 activityId 变化：有值即连接（immediate 保证初始即有值就立刻连），
  // 置 null（或页面销毁）则主动关闭。组件卸载时 directiveBum 兜底关闭。
  return watch(val, val1 => {
    val1 ? zz1(val1) : zz3();
  }, {
    immediate: !0
  }), directiveBum(() => {
    val4 = !0, zz3(); // 标记主动关闭并清理
  }), {
    snapshot: refVal,
    connected: refVal2
  };
}
/* index 运行时导出（已语义化） */
export { zz0 as createTallySocket };