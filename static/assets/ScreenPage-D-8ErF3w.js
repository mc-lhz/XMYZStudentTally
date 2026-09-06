/*!
 * 页面模块：实时唱票大屏（ScreenPage）
 * 路由：/tally/screen/:id    name=tally-screen    level=1    需登录=否（免登录公开投屏页）
 * 功能：以柱状图实时展示候选人当前得票，柱顶出现 ±N 动画气泡，顶部支持全屏切换。
 * 实时性：与控制台共用 useTallySocket，订阅同一份全量快照；
 *         通过 watch(snapshot.candidates) 监听 voteCount 变化，diff 出 delta 用于气泡动画。
 *
 * 来源：assets/ScreenPage-D-8ErF3w.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：编译产物（变量名 val / zz0..zzN）。为不破坏随后的渲染树，本文件保留全部标识符原貌，
 *       仅通过以下映射注释告诉你每个名字的业务含义。
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
      /* ---- 局部命名 → 业务语义映射 ----
        * inject()            = route
        * refVal   = activityId
        * refVal2  = isFullscreen
        * val3     = snapshot             WS 收到的最新全量快照
        * val4     = connected
        * computed = sortedCandidates     按 displayOrder 升序
        *           = yAxisMax            自动选刻度（5/10/25/50/100/250/500/1000/2500）且不低于 max(voteCount)*1.2
        *           = yTicks              6 档 0..yAxisMax
        * refVal3  = activePopups         当前屏幕上的 ±N 气泡（每条 1.4s 后自动消失）
        * refVal4  = lastSeenVoteCount    用于对比新旧 voteCount 计算 delta
        *
        * zz0 = syncFullscreenFlag       跟随 fullscreenchange 事件更新 isFullscreen
        * zz1 = toggleFullscreen         进入 / 退出全屏
        * zz2 = roundUpToNiceTick        把 yAxisMax 圆整到「漂亮刻度」
        * zz4 = popupsForCandidate       给定候选人 id，过滤当前应当显示的气泡
        * zz5 = formatDelta              "+3" / "-1"
        * zz6 = voteCountToPercent       候选人的票数转成柱高百分比（受 yAxisMax 归一）
        **/

      const val2 = inject(),
        refVal = ref(Number(val2.params.id) || null),
        refVal2 = ref(!1);
      function zz0() {
        refVal2.value = !!document.fullscreenElement;
      }
      function zz1() {
        document.fullscreenElement ? document.exitFullscreen().catch(() => {}) : document.documentElement.requestFullscreen().catch(() => {});
      }
      /* ---- 渲染函数 ----
       *   Vue 编译产物；以 createElementBlock 树描述 DOM，由 withScopeId 注入 scoped CSS 哈希。
       *   左：Y 轴刻度 + 网格线；中：每个候选人一列柱 + 票数 label + 票数变化气泡；
       *   右：连接状态指示 + 全屏按钮；背景为静态的极光层（bg-aurora）做氛围。
       *   refVal3 与 refVal4 是页面上的核心派生状态：每次 snapshot.candidates 变化，
       *   用 lastSeenVoteCount 与新 voteCount 对比算出 delta，临时入栈到 refVal3 显示 1.4s 后消失。
       *   全屏切换走浏览器原生 fullscreen API；这里只同步一次 refVal2 的显示态。
       */
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