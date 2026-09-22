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
const screenRootProps = {
    class: "screen-root"
  },
  screenHeaderProps = {
    class: "screen-header"
  },
  screenTitleProps = {
    class: "title"
  },
  chartWrapperProps = {
    class: "chart-wrapper"
  },
  emptyStateProps = {
    key: 0,
    class: "empty"
  },
  chartProps = {
    key: 1,
    class: "chart"
  },
  yTicksProps = {
    class: "y-ticks"
  },
  yLabelProps = {
    class: "y-label"
  },
  barsAreaProps = {
    class: "bars-area"
  },
  xLabelsProps = {
    class: "x-labels"
  },
  candNameProps = {
    class: "cand-name"
  },
  loadingStateProps = {
    key: 1,
    class: "loading"
  },
  fullscreenButtonProps = ["title"],
  expandIconProps = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  collapseIconProps = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  connTextProps = {
    class: "conn-text"
  },
  bodyScreenModeClass = "tally-screen-mode",
  ScreenPageComponent = defineComponent({
    __name: "ScreenPage",
    setup(props) {
      const route = inject(),
        activityId = ref(Number(route.params.id) || null),
        isFullscreen = ref(!1);
      /**
       * syncFullscreenState
       * 同步全屏状态标志（fullscreenchange 事件回调）
       */
      function syncFullscreenState() {
        isFullscreen.value = !!document.fullscreenElement;
      }
      /**
       * toggleFullscreen
       * 切换浏览器全屏
       */
      function toggleFullscreen() {
        document.fullscreenElement ? document.exitFullscreen().catch(() => {}) : document.documentElement.requestFullscreen().catch(() => {});
      }
      onMounted(() => {
        document.body.classList.add(bodyScreenModeClass), document.addEventListener("fullscreenchange", syncFullscreenState);
      }), directiveBum(() => {
        document.body.classList.remove(bodyScreenModeClass), document.removeEventListener("fullscreenchange", syncFullscreenState), document.fullscreenElement && document.exitFullscreen().catch(() => {});
      });
      const { snapshot, connected } = createTallySocket(activityId),
        sortedCandidates = applyDirectives(() => [...(snapshot.value?.candidates || [])].sort((val1, val8) => val1.displayOrder - val8.displayOrder)),
        chartMax = applyDirectives(() => {
          const val1 = sortedCandidates.value.reduce((val9, val10) => Math.max(val9, val10.voteCount), 0),
            val8 = Math.max(val1 * 1.2, 10);
          return niceCeiling(val8);
        }),
        yTicks = applyDirectives(() => {
          const list = [];
          for (let num = 5; num >= 0; num--) list.push(chartMax.value * num / 5);
          return list;
        });
      /**
       * niceCeiling
       * 把纵轴上限取整到「好看」的刻度（5/10/25/50/100/250/500/1000/2500 档位）
       */
      function niceCeiling(val1) {
        if (val1 <= 0) return 10;
        let val8;
        return val1 < 25 ? val8 = 5 : val1 < 60 ? val8 = 10 : val1 < 150 ? val8 = 25 : val1 < 300 ? val8 = 50 : val1 < 600 ? val8 = 100 : val1 < 1500 ? val8 = 250 : val1 < 3e3 ? val8 = 500 : val1 < 8e3 ? val8 = 1e3 : val8 = 2500, Math.max(val8, Math.ceil(val1 / val8) * val8);
      }
      const popups = ref([]),
        lastVoteCounts = ref({});
      watch(() => snapshot.value?.candidates, val1 => {
        if (val1) for (const candidate of val1) {
          const val8 = lastVoteCounts.value[candidate.id];
          if (val8 !== void 0 && val8 !== candidate.voteCount) {
            const val9 = candidate.voteCount - val8,
              text = `${candidate.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            popups.value.push({
              id: text,
              candidateId: candidate.id,
              delta: val9
            }), window.setTimeout(() => {
              popups.value = popups.value.filter(val10 => val10.id !== text);
            }, 1400);
          }
          lastVoteCounts.value[candidate.id] = candidate.voteCount;
        }
      }, {
        deep: !0,
        immediate: !0
      });
      /**
       * popupsFor
       * 取某候选人当前展示中的浮动票数气泡
       */
      function popupsFor(val1) {
        return popups.value.filter(val8 => val8.candidateId === val1);
      }
      /**
       * formatDelta
       * 票数增量格式化：正数带 + 号
       */
      function formatDelta(val1) {
        return val1 > 0 ? `+${val1}` : `${val1}`;
      }
      /**
       * barHeightPercent
       * 按图表上限计算柱子高度百分比
       */
      function barHeightPercent(val1) {
        return chartMax.value <= 0 ? 0 : Math.min(100, val1.voteCount / chartMax.value * 100);
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val8) => (openBlock(), createElementBlock("div", screenRootProps, [unref(snapshot) ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("header", screenHeaderProps, [createElementVNode("h1", screenTitleProps, toDisplayString(unref(snapshot).title), 1)]), createElementVNode("main", chartWrapperProps, [sortedCandidates.value.length === 0 ? (openBlock(), createElementBlock("p", emptyStateProps, "暂无候选人")) : (openBlock(), createElementBlock("div", chartProps, [createElementVNode("div", yTicksProps, [(openBlock(!0), createElementBlock(Fragment, null, renderList(yTicks.value, (val9, val10) => (openBlock(), createElementBlock("div", {
        key: val10,
        class: "y-tick",
        style: resolveRaw({
          top: `${val10 / (yTicks.value.length - 1) * 100}%`
        })
      }, [createElementVNode("span", yLabelProps, toDisplayString(Math.round(val9)), 1)], 4))), 128))]), createElementVNode("div", barsAreaProps, [(openBlock(!0), createElementBlock(Fragment, null, renderList(yTicks.value, (val9, val10) => (openBlock(), createElementBlock("div", {
        key: `g-${val10}`,
        class: "gridline",
        style: resolveRaw({
          top: `${val10 / (yTicks.value.length - 1) * 100}%`
        })
      }, null, 4))), 128)), (openBlock(!0), createElementBlock(Fragment, null, renderList(sortedCandidates.value, val9 => (openBlock(), createElementBlock("div", {
        key: val9.id,
        class: "bar-cell"
      }, [createElementVNode("div", {
        class: "vote-label",
        style: resolveRaw({
          bottom: `${barHeightPercent(val9)}%`
        })
      }, toDisplayString(val9.voteCount), 5), createElementVNode("div", {
        class: "popups",
        style: resolveRaw({
          bottom: `${barHeightPercent(val9)}%`
        })
      }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(popupsFor(val9.id), val10 => (openBlock(), createElementBlock("span", {
        key: val10.id,
        class: normalizeClass(["popup", val10.delta > 0 ? "positive" : "negative"])
      }, toDisplayString(formatDelta(val10.delta)), 3))), 128))], 4), createElementVNode("div", {
        class: "bar",
        style: resolveRaw({
          height: `${barHeightPercent(val9)}%`
        })
      }, null, 4)]))), 128))]), val8[0] || (val8[0] = createElementVNode("div", {
        class: "axis-spacer"
      }, null, -1)), createElementVNode("div", xLabelsProps, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sortedCandidates.value, val9 => (openBlock(), createElementBlock("div", {
        key: `xl-${val9.id}`,
        class: "x-label"
      }, [createElementVNode("span", candNameProps, toDisplayString(val9.name), 1)]))), 128))])]))])], 64)) : (openBlock(), createElementBlock("div", loadingStateProps, "加载中...")), createElementVNode("button", {
        class: "fullscreen-btn",
        title: isFullscreen.value ? "退出全屏" : "进入全屏",
        onClick: toggleFullscreen
      }, [isFullscreen.value ? (openBlock(), createElementBlock("svg", collapseIconProps, [...(val8[2] || (val8[2] = [createElementVNode("path", {
        d: "M8 3v5H3"
      }, null, -1), createElementVNode("path", {
        d: "M16 3v5h5"
      }, null, -1), createElementVNode("path", {
        d: "M8 21v-5H3"
      }, null, -1), createElementVNode("path", {
        d: "M16 21v-5h5"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", expandIconProps, [...(val8[1] || (val8[1] = [createElementVNode("path", {
        d: "M3 8V3h5"
      }, null, -1), createElementVNode("path", {
        d: "M21 8V3h-5"
      }, null, -1), createElementVNode("path", {
        d: "M3 16v5h5"
      }, null, -1), createElementVNode("path", {
        d: "M21 16v5h-5"
      }, null, -1)]))]))], 8, fullscreenButtonProps), createElementVNode("div", {
        class: normalizeClass(["conn-indicator", {
          ok: unref(connected)
        }])
      }, [val8[3] || (val8[3] = createElementVNode("span", {
        class: "dot"
      }, null, -1)), createElementVNode("span", connTextProps, toDisplayString(unref(connected) ? "已连接" : "重连中…"), 1)], 2), val8[4] || (val8[4] = createVNodeWrapper('<div class="bg-aurora" aria-hidden="true" data-v-8dd12e5f><div class="blob blob-1" data-v-8dd12e5f></div><div class="blob blob-2" data-v-8dd12e5f></div><div class="blob blob-3" data-v-8dd12e5f></div><div class="blob blob-4" data-v-8dd12e5f></div></div>', 1))]));
    }
  }),
  ScreenPageDefaultExport = withScopeId(ScreenPageComponent, [["__scopeId", "data-v-8dd12e5f"]]);
/* index 运行时导出（已语义化） */
export { ScreenPageDefaultExport as default };