/*!
 * 页面模块：实时唱票大屏（ScreenPage）
 * ---------------------------------------------------------------------------
 * 路由：/tally/screen/:id    name=tally-screen   层级=1   **需登录=否（公开页）**
 * 页面：会场大屏。只有 WebSocket 一个数据源，进入即连、连上即有数据。
 *
 *       ┌────────────────────────────────────────────────────────┐
 *       │  活动标题                                    [全屏] ●  │
 *       │  ┌──────────────────────────────────────────────────┐  │
 *       │  │  横向条形图：每位候选人一根柱子，柱顶是票数        │  │
 *       │  │  柱子顶端浮出 +N / -N 的飘字（1.4s 后自动消失）      │  │
 *       │  └──────────────────────────────────────────────────┘  │
 *       └────────────────────────────────────────────────────────┘
 *
 * 来源：assets/ScreenPage-D-8ErF3w.js（源站 https://xmyzstudent.com/）
 *
 * 【接口】WS  /ws/tally/activity/:id —— 唯一数据源，无 REST 调用。
 *
 * 【三个值得学的实现细节】
 *  1. **Y 轴自适应**：maxVote = max(voteCount) * 1.2（下限 10），再经 niceCeil()
 *     归整到 5/10/25/50/100/250/500/1000/2500 的整数倍。让"最高票的人刚好顶到格顶"，
 *     既不浪费画布又不会因为票数微增而频繁跳变。
 *  2. **飘字由差分得到**：watch 深度监听 snapshot.candidates，逐个对比"上次票数"，
 *     有变化就算出 delta 压进 floaters，1.4s 后移除。这让大屏能"看见票是怎么加上去的"，
 *     而不是数字默默跳变。
 *  3. **全屏态退出即清理**：卸载时移除 body 上的 tally-screen-mode 类（控制页面 padding）、
 *     摘掉 fullscreenchange 监听、并主动退出全屏——否则会把操作员"关"在全屏里出不来。
 *
 * 【治理说明】重写自压缩产物：变量/函数语义化 + 格式化 + 注释，
 * 渲染逻辑（DOM 结构、patchFlag、动态 props）逐字保持。
 */
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
  withScopeId,
} from "./index-DJrtCu9i.js";
import { createTallySocket } from "./useTallySocket-Bnuwbx53.js";
import "./tally-DC36h0vE.js";

/* ── 模板属性配置 ── */
const SCREEN_ROOT = { class: "screen-root" };
const SCREEN_HEADER = { class: "screen-header" };
const TITLE = { class: "title" };
const CHART_WRAPPER = { class: "chart-wrapper" };
const EMPTY = { key: 0, class: "empty" };
const CHART = { key: 1, class: "chart" };
const Y_TICKS = { class: "y-ticks" };
const Y_LABEL = { class: "y-label" };
const BARS_AREA = { class: "bars-area" };
const X_LABELS = { class: "x-labels" };
const CAND_NAME = { class: "cand-name" };
const LOADING = { key: 1, class: "loading" };
const FULLSCREEN_BTN = ["title"];
/** 退出全屏图标（key=1）：四角向内收 */
const SCREEN_SVG_EXIT = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
/** 进入全屏图标（key=0）：四角向外张 */
const SCREEN_SVG_ENTER = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
const CONN_TEXT = { class: "conn-text" };
/** 挂在 body 上的类名，控制大屏专用的全屏留白（见 ScreenPage-DXdZRHQT.css） */
const BODY_MODE_CLASS = "tally-screen-mode";
/** 飘字存活时长（毫秒） */
const POPUP_TTL = 1400;

/** 极光背景（纯装饰，内联 SVG-free 的 CSS blob），整页静态，缓存一次即可 */
const AURORA_HTML =
  '<div class="bg-aurora" aria-hidden="true" data-v-8dd12e5f>' +
  '<div class="blob blob-1" data-v-8dd12e5f></div>' +
  '<div class="blob blob-2" data-v-8dd12e5f></div>' +
  '<div class="blob blob-3" data-v-8dd12e5f></div>' +
  '<div class="blob blob-4" data-v-8dd12e5f></div>' +
  "</div>";

const ScreenPage = defineComponent({
  __name: "ScreenPage",
  setup() {
    const route = inject();
    /** 路由参数 :id */
    const activityId = ref(Number(route.params.id) || null);
    /** 是否处于全屏 */
    const isFullscreen = ref(false);

    /** fullscreenchange 回调：同步按钮的 title/图标状态 */
    function syncFullscreenState() {
      isFullscreen.value = !!document.fullscreenElement;
    }

    /** 切换全屏；进/出都必须 catch，因为浏览器会在非用户手势里拒绝 */
    function toggleFullscreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }

    onMounted(() => {
      document.body.classList.add(BODY_MODE_CLASS);
      document.addEventListener("fullscreenchange", syncFullscreenState);
    });

    // directiveBum 即 Vue 的 onBeforeUnmount（镜像工具把该名字重命名成了 directiveBum）
    directiveBum(() => {
      document.body.classList.remove(BODY_MODE_CLASS);
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      // 卸载时强制退出全屏：大屏常挂在会场机上，留在全屏里会挡住其他页面
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    });

    /* ── 实时数据 ── */
    const { snapshot, connected } = createTallySocket(activityId);

    /** 候选人在快照内按 displayOrder 升序 */
    const sortedCandidates = applyDirectives(() =>
      [...(snapshot.value?.candidates || [])].sort((a, b) => a.displayOrder - b.displayOrder)
    );

    /**
     * Y 轴上限：把"最高票 × 1.2"归整到一个好看的整数刻度。
     * 纯函数，无副作用。
     * @param {number} rawValue 期望上限
     * @returns {number} 归整后的上限（至少 10）
     */
    function niceCeil(rawValue) {
      if (rawValue <= 0) return 10;
      let step;
      if (rawValue < 25) step = 5;
      else if (rawValue < 60) step = 10;
      else if (rawValue < 150) step = 25;
      else if (rawValue < 300) step = 50;
      else if (rawValue < 600) step = 100;
      else if (rawValue < 1500) step = 250;
      else if (rawValue < 3000) step = 500;
      else if (rawValue < 8000) step = 1000;
      else step = 2500;
      return Math.max(step, Math.ceil(rawValue / step) * step);
    }

    /** Y 轴上限（响应式派生） */
    const axisMax = applyDirectives(() => {
      const highest = sortedCandidates.value.reduce(
        (max, candidate) => Math.max(max, candidate.voteCount),
        0
      );
      return niceCeil(Math.max(highest * 1.2, 10));
    });

    /** Y 轴 6 个刻度值（含 0 与顶），从上到下 */
    const axisTicks = applyDirectives(() => {
      const ticks = [];
      for (let step = 5; step >= 0; step--) {
        ticks.push((axisMax.value * step) / 5);
      }
      return ticks;
    });

    /**
     * 票数飘字（floaters）：{ id, candidateId, delta }
     * 由 snapshot 的差分产生，1.4s 后自动移除。
     */
    const floaters = ref([]);
    /** 每个候选人上一次已渲染的票数，用于算差分 */
    const previousVoteCounts = ref({});

    watch(
      () => snapshot.value?.candidates,
      (candidates) => {
        if (!candidates) return;
        for (const candidate of candidates) {
          const previous = previousVoteCounts.value[candidate.id];
          if (previous !== undefined && previous !== candidate.voteCount) {
            const delta = candidate.voteCount - previous;
            // id 里带时间戳+随机串，保证同一候选人的多次飘字 key 不冲突
            const id = `${candidate.id}-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 6)}`;
            floaters.value.push({ id: id, candidateId: candidate.id, delta: delta });
            window.setTimeout(() => {
              floaters.value = floaters.value.filter((f) => f.id !== id);
            }, POPUP_TTL);
          }
          previousVoteCounts.value[candidate.id] = candidate.voteCount;
        }
      },
      { deep: true, immediate: true }
    );

    /** 取某位候选人当前还活着的飘字 */
    function floatersOf(candidateId) {
      return floaters.value.filter((f) => f.candidateId === candidateId);
    }

    /** 飘字文案：正数补 + 号，负数原样 */
    function formatDelta(delta) {
      return delta > 0 ? `+${delta}` : `${delta}`;
    }

    /** 柱子高度百分比：票数 / Y 轴上限，上限 100% 防止溢出画布 */
    function barHeightPercent(candidate) {
      if (axisMax.value <= 0) return 0;
      return Math.min(100, (candidate.voteCount / axisMax.value) * 100);
    }

    /** 渲染函数：构建组件模板 DOM 结构 */
    return (_ctx, _cache) => (
      openBlock(),
      createElementBlock("div", SCREEN_ROOT, [
        unref(snapshot)
          ? (openBlock(),
            createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("header", SCREEN_HEADER, [
                createElementVNode("h1", TITLE, toDisplayString(unref(snapshot).title), 1),
              ]),
              createElementVNode("main", CHART_WRAPPER, [
                sortedCandidates.value.length === 0
                  ? (openBlock(),
                    createElementBlock("p", EMPTY, "暂无候选人"))
                  : (openBlock(),
                    createElementBlock("div", CHART, [
                      /* Y 轴刻度文字 */
                      createElementVNode("div", Y_TICKS, [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(axisTicks.value, (tick, index) =>
                            (openBlock(),
                            createElementVNode(
                              "div",
                              {
                                key: index,
                                class: "y-tick",
                                style: resolveRaw({
                                  top: `${(tick / (axisTicks.value.length - 1)) * 100}%`,
                                }),
                              },
                              [createElementVNode("span", Y_LABEL, toDisplayString(Math.round(tick)), 1)],
                              4
                            ))
                          ),
                          128
                        )),
                      ]),
                      createElementVNode("div", BARS_AREA, [
                        /* 水平网格线（与刻度同高，靠 128 的 keyed diff 对齐） */
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(axisTicks.value, (tick, index) =>
                            (openBlock(),
                            createElementVNode(
                              "div",
                              {
                                key: `g-${index}`,
                                class: "gridline",
                                style: resolveRaw({
                                  top: `${(tick / (axisTicks.value.length - 1)) * 100}%`,
                                }),
                              },
                              null,
                              4
                            ))
                          ),
                          128
                        )),
                        /* 柱子区：票数标签 + 飘字 + 柱子，三者都锚在柱子顶端 */
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(sortedCandidates.value, (candidate) =>
                            (openBlock(),
                            createElementVNode("div", { key: candidate.id, class: "bar-cell" }, [
                              createElementVNode(
                                "div",
                                {
                                  class: "vote-label",
                                  style: resolveRaw({
                                    bottom: `${barHeightPercent(candidate)}%`,
                                  }),
                                },
                                toDisplayString(candidate.voteCount),
                                5
                              ),
                              createElementVNode(
                                "div",
                                {
                                  class: "popups",
                                  style: resolveRaw({
                                    bottom: `${barHeightPercent(candidate)}%`,
                                  }),
                                },
                                [
                                  (openBlock(true),
                                  createElementBlock(
                                    Fragment,
                                    null,
                                    renderList(floatersOf(candidate.id), (floater) =>
                                      (openBlock(),
                                      createElementVNode(
                                        "span",
                                        {
                                          key: floater.id,
                                          class: normalizeClass([
                                            "popup",
                                            floater.delta > 0 ? "positive" : "negative",
                                          ]),
                                        },
                                        toDisplayString(formatDelta(floater.delta)),
                                        3
                                      ))
                                    ),
                                    128
                                  )),
                                ],
                                4
                              ),
                              createElementVNode(
                                "div",
                                {
                                  class: "bar",
                                  style: resolveRaw({
                                    height: `${barHeightPercent(candidate)}%`,
                                  }),
                                },
                                null,
                                4
                              ),
                            ]))
                          ),
                          128
                        )),
                        (_cache[0] ||=
                          createElementVNode("div", { class: "axis-spacer" }, null, -1)),
                        /* X 轴姓名标签 */
                        createElementVNode("div", X_LABELS, [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(sortedCandidates.value, (candidate) =>
                              (openBlock(),
                              createElementVNode("div", { key: `xl-${candidate.id}`, class: "x-label" }, [
                                createElementVNode("span", CAND_NAME, toDisplayString(candidate.name), 1),
                              ]))
                            ),
                            128
                          )),
                        ]),
                      ]),
                    ])),
              ]),
            ], 64))
          : (openBlock(), createElementBlock("div", LOADING, "加载中...")),

        /* 全屏切换按钮：进入/退出两套图标 */
        createElementVNode(
          "button",
          {
            class: "fullscreen-btn",
            title: isFullscreen.value ? "退出全屏" : "进入全屏",
            onClick: toggleFullscreen,
          },
          [
isFullscreen.value
              ? (openBlock(),
                createElementBlock(
                  "svg",
                  SCREEN_SVG_EXIT,
                  [
                    ...((_cache[2] ||= [
                      /* 向内收拢的四角 = "退出全屏" */
                      createElementVNode("path", { d: "M8 3v5H3" }, null, -1),
                      createElementVNode("path", { d: "M16 3v5h5" }, null, -1),
                      createElementVNode("path", { d: "M8 21v-5H3" }, null, -1),
                      createElementVNode("path", { d: "M16 21v-5h5" }, null, -1),
                    ])),
                  ]
                ))
              : (openBlock(),
                createElementBlock(
                  "svg",
                  SCREEN_SVG_ENTER,
                  [
                    ...((_cache[1] ||= [
                      /* 向外张开的四角 = "进入全屏" */
                      createElementVNode("path", { d: "M3 8V3h5" }, null, -1),
                      createElementVNode("path", { d: "M21 8V3h-5" }, null, -1),
                      createElementVNode("path", { d: "M3 16v5h5" }, null, -1),
                      createElementVNode("path", { d: "M21 16v5h-5" }, null, -1),
                    ])),
                  ]
                )),
        ],
          8,
          FULLSCREEN_BTN
        ),

        /* WS 连接指示灯（右下角小圆点） */
        createElementVNode(
          "div",
          { class: normalizeClass(["conn-indicator", { ok: unref(connected) }]) },
          [
            (_cache[3] ||=
              createElementVNode("span", { class: "dot" }, null, -1)),
            createElementVNode(
              "span",
              CONN_TEXT,
              toDisplayString(unref(connected) ? "已连接" : "重连中…"),
              1
            ),
          ],
          2
        ),

        /* 极光装饰背景 */
        (_cache[4] ||=
          createVNodeWrapper(
            '<div class="bg-aurora" aria-hidden="true" data-v-8dd12e5f><div class="blob blob-1" data-v-8dd12e5f></div><div class="blob blob-2" data-v-8dd12e5f></div><div class="blob blob-3" data-v-8dd12e5f></div><div class="blob blob-4" data-v-8dd12e5f></div></div>',
            1
          )),
      ])
    );
  },
});

export default withScopeId(ScreenPage, [["__scopeId", "data-v-8dd12e5f"]]);