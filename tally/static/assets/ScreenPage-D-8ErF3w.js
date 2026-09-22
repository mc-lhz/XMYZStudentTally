/*!
 * 页面模块：实时唱票（ScreenPage-D）
 * 路由：/tally/screen/:id   name=tally-screen   层级=1   需登录=否
 * 功能：公开的「实时唱票」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/ScreenPage-D-8ErF3w.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, inject, onMounted, directiveBum, applyDirectives, watch, createElementBlock, createElementVNode, createVNodeWrapper, unref, Fragment, toDisplayString, renderList, normalizeClass, resolveRaw, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 useTallySocket（站点内功能模块） */
import { createTallySocket } from "./useTallySocket-Bnuwbx53.js";
/*
 * ── 页面业务说明（大屏）────────────────────────────────────────────────
 * 本页是「实时唱票」的公开大屏：把某活动的唱票结果做成实时柱状图。
 * 数据来源**不是 REST 轮询**，而是 createTallySocket(activityId) 建立的原生
 * WebSocket（/ws/tally/activity/:id）。后端每次业务变更（录票/撤销/改状态）
 * 都会广播全量快照，前端收到即 JSON.parse → snapshot ref → 触发图表重渲染。
 *
 * 渲染要点：
 *  - val5  ：按 displayOrder 升序的候选人列表（柱状图每根柱对应一位候选人）；
 *  - val6  ：Y 轴量程 = max(voteCount)*1.2 并对齐到“整洁刻度”（5/10/25/50/100/…/2500，靠 zz2 完成）；
 *  - zz2   ：把目标量程向上取整到最近的标准刻度步长，保证纵轴刻度整洁易读；
 *  - refVal3/refVal4 + watch：监听候选人票数变化，计算出 delta 并在对应柱上
 *            弹出“+N/−N”浮动气泡（1400ms 后自动消失），即唱票动效；
 *  - zz6   ：单柱高度百分比 = voteCount / val6 * 100，封顶 100%；
 *  - val4/connected：右下角“已连接/重连中…”指示灯，状态来自 WS 连接事件。
 * 接口依赖：useTallySocket.createTallySocket（本页唯一的数据通道，无 REST 调用）。
 */
/* 导入：本地模块 tally（站点内功能模块） */
import "./tally-DC36h0vE.js";
/* 模板属性配置：screen-header */
/* 模板属性配置：title */
/* 模板属性配置：chart-wrapper */
/* 模板属性配置：empty */
/* 模板属性配置：chart */
/* 模板属性配置：y-ticks */
/* 模板属性配置：y-label */
/* 模板属性配置：bars-area */
/* 模板属性配置：x-labels */
/* 模板属性配置：cand-name */
/* 模板属性配置：loading */
const ScreenPageConfig = {
    class: "screen-root"
  },
  ScreenPageConfig_2 = {
    class: "screen-header"
  },
  ScreenPageConfig_3 = {
    class: "title"
  },
  ScreenPageConfig_4 = {
    class: "chart-wrapper"
  },
  ScreenPageConfig_5 = {
    key: 0,
    class: "empty"
  },
  ScreenPageConfig_6 = {
    key: 1,
    class: "chart"
  },
  ScreenPageConfig_7 = {
    class: "y-ticks"
  },
  ScreenPageConfig_8 = {
    class: "y-label"
  },
  ScreenPageConfig_9 = {
    class: "bars-area"
  },
  ScreenPageConfig_10 = {
    class: "x-labels"
  },
  ScreenPageConfig_11 = {
    class: "cand-name"
  },
  local_zba0 = {
    key: 1,
    class: "loading"
  },
  ee = ["title"],
  te = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  se = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  ne = {
    class: "conn-text"
  },
  local_zba1 = "tally-screen-mode",
  le = defineComponent({
    __name: "ScreenPage",
    setup(val) {
      const val2 = inject(),
        refVal = ref(Number(val2.params.id) || null),
        refVal2 = ref(!1);
      function zz0() {
        refVal2.value = !!document.fullscreenElement;
      }
      function zz1() {
        document.fullscreenElement ? document.exitFullscreen().catch(() => {}) : document.documentElement.requestFullscreen().catch(() => {});
      }
      onMounted(() => {
        document.body.classList.add(local_zba1), document.addEventListener("fullscreenchange", zz0);
      }), directiveBum(() => {
        document.body.classList.remove(local_zba1), document.removeEventListener("fullscreenchange", zz0), document.fullscreenElement && document.exitFullscreen().catch(() => {});
      });
      const {
          snapshot: val3,
          connected: val4
        } = createTallySocket(refVal),
        val5 = applyDirectives(() => [...(val3.value?.candidates || [])].sort((val1, val8) => val1.displayOrder - val8.displayOrder)),
        val6 = applyDirectives(() => {
          const val1 = val5.value.reduce((val9, val10) => Math.max(val9, val10.voteCount), 0),
            val8 = Math.max(val1 * 1.2, 10);
          return zz2(val8);
        }),
        val7 = applyDirectives(() => {
          const list = [];
          for (let num = 5; num >= 0; num--) list.push(val6.value * num / 5);
          return list;
        });
      function zz2(val1) {
        if (val1 <= 0) return 10;
        let val8;
        return val1 < 25 ? val8 = 5 : val1 < 60 ? val8 = 10 : val1 < 150 ? val8 = 25 : val1 < 300 ? val8 = 50 : val1 < 600 ? val8 = 100 : val1 < 1500 ? val8 = 250 : val1 < 3e3 ? val8 = 500 : val1 < 8e3 ? val8 = 1e3 : val8 = 2500, Math.max(val8, Math.ceil(val1 / val8) * val8);
      }
      const refVal3 = ref([]),
        refVal4 = ref({});
      watch(() => val3.value?.candidates, val1 => {
        if (val1) for (const zz3 of val1) {
          const val8 = refVal4.value[zz3.id];
          if (val8 !== void 0 && val8 !== zz3.voteCount) {
            const val9 = zz3.voteCount - val8,
              text = `${zz3.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            refVal3.value.push({
              id: text,
              candidateId: zz3.id,
              delta: val9
            }), window.setTimeout(() => {
              refVal3.value = refVal3.value.filter(val10 => val10.id !== text);
            }, 1400);
          }
          refVal4.value[zz3.id] = zz3.voteCount;
        }
      }, {
        deep: !0,
        immediate: !0
      });
      function zz4(val1) {
        return refVal3.value.filter(val8 => val8.candidateId === val1);
      }
      function zz5(val1) {
        return val1 > 0 ? `+${val1}` : `${val1}`;
      }
      function zz6(val1) {
        return val6.value <= 0 ? 0 : Math.min(100, val1.voteCount / val6.value * 100);
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val8) => (openBlock(), createElementBlock("div", ScreenPageConfig, [unref(val3) ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("header", ScreenPageConfig_2, [createElementVNode("h1", ScreenPageConfig_3, toDisplayString(unref(val3).title), 1)]), createElementVNode("main", ScreenPageConfig_4, [val5.value.length === 0 ? (openBlock(), createElementBlock("p", ScreenPageConfig_5, "暂无候选人")) : (openBlock(), createElementBlock("div", ScreenPageConfig_6, [createElementVNode("div", ScreenPageConfig_7, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val7.value, (val9, val10) => (openBlock(), createElementBlock("div", {
        key: val10,
        class: "y-tick",
        style: resolveRaw({
          top: `${val10 / (val7.value.length - 1) * 100}%`
        })
      }, [createElementVNode("span", ScreenPageConfig_8, toDisplayString(Math.round(val9)), 1)], 4))), 128))]), createElementVNode("div", ScreenPageConfig_9, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val7.value, (val9, val10) => (openBlock(), createElementBlock("div", {
        key: `g-${val10}`,
        class: "gridline",
        style: resolveRaw({
          top: `${val10 / (val7.value.length - 1) * 100}%`
        })
      }, null, 4))), 128)), (openBlock(!0), createElementBlock(Fragment, null, renderList(val5.value, val9 => (openBlock(), createElementBlock("div", {
        key: val9.id,
        class: "bar-cell"
      }, [createElementVNode("div", {
        class: "vote-label",
        style: resolveRaw({
          bottom: `${zz6(val9)}%`
        })
      }, toDisplayString(val9.voteCount), 5), createElementVNode("div", {
        class: "popups",
        style: resolveRaw({
          bottom: `${zz6(val9)}%`
        })
      }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz4(val9.id), val10 => (openBlock(), createElementBlock("span", {
        key: val10.id,
        class: normalizeClass(["popup", val10.delta > 0 ? "positive" : "negative"])
      }, toDisplayString(zz5(val10.delta)), 3))), 128))], 4), createElementVNode("div", {
        class: "bar",
        style: resolveRaw({
          height: `${zz6(val9)}%`
        })
      }, null, 4)]))), 128))]), val8[0] || (val8[0] = createElementVNode("div", {
        class: "axis-spacer"
      }, null, -1)), createElementVNode("div", ScreenPageConfig_10, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.value, val9 => (openBlock(), createElementBlock("div", {
        key: `xl-${val9.id}`,
        class: "x-label"
      }, [createElementVNode("span", ScreenPageConfig_11, toDisplayString(val9.name), 1)]))), 128))])]))])], 64)) : (openBlock(), createElementBlock("div", local_zba0, "加载中...")), createElementVNode("button", {
        class: "fullscreen-btn",
        title: refVal2.value ? "退出全屏" : "进入全屏",
        onClick: zz1
      }, [refVal2.value ? (openBlock(), createElementBlock("svg", se, [...(val8[2] || (val8[2] = [createElementVNode("path", {
        d: "M8 3v5H3"
      }, null, -1), createElementVNode("path", {
        d: "M16 3v5h5"
      }, null, -1), createElementVNode("path", {
        d: "M8 21v-5H3"
      }, null, -1), createElementVNode("path", {
        d: "M16 21v-5h5"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", te, [...(val8[1] || (val8[1] = [createElementVNode("path", {
        d: "M3 8V3h5"
      }, null, -1), createElementVNode("path", {
        d: "M21 8V3h-5"
      }, null, -1), createElementVNode("path", {
        d: "M3 16v5h5"
      }, null, -1), createElementVNode("path", {
        d: "M21 16v5h-5"
      }, null, -1)]))]))], 8, ee), createElementVNode("div", {
        class: normalizeClass(["conn-indicator", {
          ok: unref(val4)
        }])
      }, [val8[3] || (val8[3] = createElementVNode("span", {
        class: "dot"
      }, null, -1)), createElementVNode("span", ne, toDisplayString(unref(val4) ? "已连接" : "重连中…"), 1)], 2), val8[4] || (val8[4] = createVNodeWrapper('<div class="bg-aurora" aria-hidden="true" data-v-8dd12e5f><div class="blob blob-1" data-v-8dd12e5f></div><div class="blob blob-2" data-v-8dd12e5f></div><div class="blob blob-3" data-v-8dd12e5f></div><div class="blob blob-4" data-v-8dd12e5f></div></div>', 1))]));
    }
  }),
  re = withScopeId(le, [["__scopeId", "data-v-8dd12e5f"]]);
/* index 运行时导出（已语义化） */
export { re as default };