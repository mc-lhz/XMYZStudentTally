/*!
 * 页面模块：实时唱票（ScreenPage-D）
 * 路由：/tally/screen/:id   name=tally-screen   层级=1   需登录=否
 * 功能：公开的「实时唱票」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/ScreenPage-D-8ErF3w.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import {
  defineComponent,
  ref,
  inject,
  onMounted,
  directiveBum,
  applyDirectives,
  watch,
  createElementBlock,
  createElementVNode,
  createVNodeWrapper,
  unref,
  Fragment,
  toDisplayString,
  renderList,
  normalizeClass,
  resolveRaw,
  openBlock,
  withScopeId
} from "./index-DJrtCu9i.js";
/* 导入：本地模块 useTallySocket（站点内功能模块） */
import {
  createTallySocket
} from "./useTallySocket-Bnuwbx53.js";
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
  screenLoadingAttrs = {
    key: 1,
    class: "loading"
  },
  titlePatchFlag = ["title"],
  enterFullscreenIconAttrs = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  exitFullscreenIconAttrs = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  connTextClass = {
    class: "conn-text"
  },
  SCREEN_BODY_CLASS = "tally-screen-mode",
  ScreenPageComponent = defineComponent({
    __name: "ScreenPage",
    setup(props) {
      const route = inject(),
        activityId = ref(Number(route.params.id) || null),
        isFullscreen = ref(!1);

      function syncFullscreenFlag() {
        isFullscreen.value = !!document.fullscreenElement;
      }

      function toggleFullscreen() {
        document.fullscreenElement ? document.exitFullscreen().catch(() => {}) : document.documentElement
          .requestFullscreen().catch(() => {});
      }
      onMounted(() => {
        document.body.classList.add(SCREEN_BODY_CLASS), document.addEventListener("fullscreenchange",
          syncFullscreenFlag);
      }), directiveBum(() => {
        document.body.classList.remove(SCREEN_BODY_CLASS), document.removeEventListener(
            "fullscreenchange", syncFullscreenFlag), document.fullscreenElement && document
          .exitFullscreen().catch(() => {});
      });
      const {
        snapshot: snapshot,
        connected: connected
      } = createTallySocket(activityId),
        sortedCandidates = applyDirectives(() => [...(snapshot.value?.candidates || [])].sort((a, b) => a
          .displayOrder - b.displayOrder)),
        axisMax = applyDirectives(() => {
          const maxVoteCount = sortedCandidates.value.reduce((maxSoFar, candidate) => Math.max(maxSoFar,
              candidate.voteCount), 0),
            paddedMax = Math.max(maxVoteCount * 1.2, 10);
          return roundAxisMax(paddedMax);
        }),
        yTicks = applyDirectives(() => {
          const list = [];
          for (let num = 5; num >= 0; num--) list.push(axisMax.value * num / 5);
          return list;
        });

      function roundAxisMax(rawMax) {
        if (rawMax <= 0) return 10;
        let step;
        return rawMax < 25 ? step = 5 : rawMax < 60 ? step = 10 : rawMax < 150 ? step = 25 : rawMax < 300 ?
          step = 50 : rawMax < 600 ? step = 100 : rawMax < 1500 ? step = 250 : rawMax < 3e3 ? step = 500 :
          rawMax < 8e3 ? step = 1e3 : step = 2500, Math.max(step, Math.ceil(rawMax / step) * step);
      }
      const floaters = ref([]),
        lastVoteCounts = ref({});
      watch(() => snapshot.value?.candidates, candidates => {
        if (candidates)
          for (const candidate of candidates) {
            const prevCount = lastVoteCounts.value[candidate.id];
            if (prevCount !== void 0 && prevCount !== candidate.voteCount) {
              const delta = candidate.voteCount - prevCount,
                floaterId = `${candidate.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
              floaters.value.push({
                id: floaterId,
                candidateId: candidate.id,
                delta: delta
              }), window.setTimeout(() => {
                floaters.value = floaters.value.filter(floater => floater.id !== floaterId);
              }, 1400);
            }
            lastVoteCounts.value[candidate.id] = candidate.voteCount;
          }
      }, {
        deep: !0,
        immediate: !0
      });

      function floatersOf(candidateId) {
        return floaters.value.filter(floater => floater.candidateId === candidateId);
      }

      function formatDelta(delta) {
        return delta > 0 ? `+${delta}` : `${delta}`;
      }

      function barHeightPercent(candidate) {
        return axisMax.value <= 0 ? 0 : Math.min(100, candidate.voteCount / axisMax.value * 100);
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */ (props, cache) => (openBlock(), createElementBlock("div",
        ScreenPageConfig, [unref(snapshot) ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createElementVNode("header", ScreenPageConfig_2, [createElementVNode("h1",
            ScreenPageConfig_3, toDisplayString(unref(snapshot).title), 1)]), createElementVNode(
            "main", ScreenPageConfig_4, [sortedCandidates.value.length === 0 ? (openBlock(),
              createElementBlock("p", ScreenPageConfig_5, "暂无候选人")) : (openBlock(),
              createElementBlock("div", ScreenPageConfig_6, [createElementVNode("div",
                  ScreenPageConfig_7, [(openBlock(!0), createElementBlock(Fragment, null,
                    renderList(yTicks.value, (tickValue, tickIndex) => (openBlock(),
                      createElementBlock("div", {
                        key: tickIndex,
                        class: "y-tick",
                        style: resolveRaw({
                          top: `${tickIndex / (yTicks.value.length - 1) * 100}%`
                        })
                      }, [createElementVNode("span", ScreenPageConfig_8,
                        toDisplayString(Math.round(tickValue)), 1)], 4))), 128))]),
                createElementVNode("div", ScreenPageConfig_9, [(openBlock(!0),
                  createElementBlock(Fragment, null, renderList(yTicks.value, (tickValue,
                    tickIndex) => (openBlock(), createElementBlock("div", {
                    key: `g-${tickIndex}`,
                    class: "gridline",
                    style: resolveRaw({
                      top: `${tickIndex / (yTicks.value.length - 1) * 100}%`
                    })
                  }, null, 4))), 128)), (openBlock(!0), createElementBlock(Fragment, null,
                  renderList(sortedCandidates.value, candidate => (openBlock(),
                    createElementBlock("div", {
                      key: candidate.id,
                      class: "bar-cell"
                    }, [createElementVNode("div", {
                        class: "vote-label",
                        style: resolveRaw({
                          bottom: `${barHeightPercent(candidate)}%`
                        })
                      }, toDisplayString(candidate.voteCount), 5),
                      createElementVNode("div", {
                        class: "popups",
                        style: resolveRaw({
                          bottom: `${barHeightPercent(candidate)}%`
                        })
                      }, [(openBlock(!0), createElementBlock(Fragment, null,
                        renderList(floatersOf(candidate.id), floater => (
                          openBlock(), createElementBlock("span", {
                              key: floater.id,
                              class: normalizeClass(["popup", floater
                                .delta > 0 ? "positive" : "negative"
                              ])
                            }, toDisplayString(formatDelta(floater.delta)),
                            3))), 128))], 4), createElementVNode("div", {
                        class: "bar",
                        style: resolveRaw({
                          height: `${barHeightPercent(candidate)}%`
                        })
                      }, null, 4)
                    ]))), 128))]), cache[0] || (cache[0] = createElementVNode("div", {
                  class: "axis-spacer"
                }, null, -1)), createElementVNode("div", ScreenPageConfig_10, [(openBlock(!0),
                  createElementBlock(Fragment, null, renderList(sortedCandidates.value,
                    candidate => (openBlock(), createElementBlock("div", {
                      key: `xl-${candidate.id}`,
                      class: "x-label"
                    }, [createElementVNode("span", ScreenPageConfig_11,
                      toDisplayString(candidate.name), 1)]))), 128))])
              ]))])], 64)) : (openBlock(), createElementBlock("div", screenLoadingAttrs, "加载中...")),
          createElementVNode("button", {
            class: "fullscreen-btn",
            title: isFullscreen.value ? "退出全屏" : "进入全屏",
            onClick: toggleFullscreen
          }, [isFullscreen.value ? (openBlock(), createElementBlock("svg", exitFullscreenIconAttrs, [
            ...(cache[2] || (cache[2] = [createElementVNode("path", {
              d: "M8 3v5H3"
            }, null, -1), createElementVNode("path", {
              d: "M16 3v5h5"
            }, null, -1), createElementVNode("path", {
              d: "M8 21v-5H3"
            }, null, -1), createElementVNode("path", {
              d: "M16 21v-5h5"
            }, null, -1)]))
          ])) : (openBlock(), createElementBlock("svg", enterFullscreenIconAttrs, [...(cache[1] || (
            cache[1] = [createElementVNode("path", {
              d: "M3 8V3h5"
            }, null, -1), createElementVNode("path", {
              d: "M21 8V3h-5"
            }, null, -1), createElementVNode("path", {
              d: "M3 16v5h5"
            }, null, -1), createElementVNode("path", {
              d: "M21 16v5h-5"
            }, null, -1)]))]))], 8, titlePatchFlag), createElementVNode("div", {
            class: normalizeClass(["conn-indicator", {
              ok: unref(connected)
            }])
          }, [cache[3] || (cache[3] = createElementVNode("span", {
            class: "dot"
          }, null, -1)), createElementVNode("span", connTextClass, toDisplayString(unref(
            connected) ? "已连接" : "重连中…"), 1)], 2), cache[4] || (cache[4] = createVNodeWrapper(
            '<div class="bg-aurora" aria-hidden="true" data-v-8dd12e5f><div class="blob blob-1" data-v-8dd12e5f></div><div class="blob blob-2" data-v-8dd12e5f></div><div class="blob blob-3" data-v-8dd12e5f></div><div class="blob blob-4" data-v-8dd12e5f></div></div>',
            1))
        ]));
    }
  }),
  ScopedScreenPage = withScopeId(ScreenPageComponent, [
    ["__scopeId", "data-v-8dd12e5f"]
  ]);
/* index 运行时导出（已语义化） */
export {
  ScopedScreenPage as
  default
};