/*!
 * 模块：useTallySocket（useTallySocket-Bnuwbx53.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/useTallySocket-Bnuwbx53.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：本地模块 tally（站点内功能模块） */
import { tallyActivityWsUrl } from "./tally-DC36h0vE.js";
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { ref, watch, directiveBum } from "./index-DJrtCu9i.js";
function zz0(val) {
  const refVal = ref(null),
    refVal2 = ref(!1);
  let val2 = null,
    num = 1e3,
    val3 = null,
    val4 = !1;
  function zz1(val1) {
    zz3(), val4 = !1;
    try {
      val2 = new WebSocket(tallyActivityWsUrl(val1));
    } catch (val5) {
      console.error("Tally WS connect failed", val5), zz2(val1);
      return;
    }
    val2.onopen = () => {
      refVal2.value = !0, num = 1e3;
    }, val2.onmessage = val5 => {
      try {
        refVal.value = JSON.parse(val5.data);
      } catch (val6) {
        console.error("Tally WS message parse failed", val6);
      }
    }, val2.onclose = () => {
      refVal2.value = !1, val4 || zz2(val1);
    }, val2.onerror = () => {};
  }
  function zz2(val1) {
    val3 && clearTimeout(val3), val3 = setTimeout(() => zz1(val1), num), num = Math.min(num * 2, 3e4);
  }
  function zz3() {
    if (val3 && (clearTimeout(val3), val3 = null), val2) {
      val4 = !0;
      try {
        val2.close();
      } catch {}
      val2 = null;
    }
  }
  return watch(val, val1 => {
    val1 ? zz1(val1) : zz3();
  }, {
    immediate: !0
  }), directiveBum(() => {
    val4 = !0, zz3();
  }), {
    snapshot: refVal,
    connected: refVal2
  };
}
/* index 运行时导出（已语义化） */
export { zz0 as createTallySocket };