/*!
 * 页面模块：唱票控制台（TallyControlPage）
 * ---------------------------------------------------------------------------
 * 路由：/admin/tally/activities/:id/control   name=admin-tally-control   层级=3   需登录=是
 * 页面：现场计票的操作台，也是本业务**唯一同时消费 REST 与 WebSocket** 的页面。
 *
 *       ┌ 顶部条 ──────────────────────────────────────────────┐
 *       │ 活动标题 | 状态徽标 | WS 连接指示灯 | 返回/大屏/撤销      │
 *       └────────────────────────────────────────────────────┘
 *       ┌ 候选人卡片网格（每位一张）──────────────────────────┐
 *       │  编号 姓名 当前票数                                   │
 *       │  [+1] [+5] [+10] [-1] [自定义输入框] [ 应用 ]          │
 *       └────────────────────────────────────────────────────┘
 *       ┌ 操作日志 ─────────────────────────────────────────┐
 *       │ 时间 | 编号·姓名 | ±delta | 普通/撤销                │
 *       └────────────────────────────────────────────────────┘
 *
 * 来源：assets/TallyControlPage-CBBTMqC8.js（源站 https://xmyzstudent.com/）
 *
 * 【接口】
 *   GET  /api/v2/admin/tally/activities/:id/records    onMounted + 每次录票/撤销后刷新日志
 *   POST /api/v2/admin/tally/candidates/:id/vote      +1/+5/+10/-1/自定义
 *   POST /api/v2/admin/tally/activities/:id/undo      撤销上一步
 *   WS   /ws/tally/activity/:id                       候选人与票数的实时来源
 *
 * 【为什么票数不靠 REST 回包】
 *   录票成功后前端只用响应里的 code 判断成败，**不用它刷票数**，而是：
 *     票数 ← WebSocket 快照（日志来自 REST）
 *     日志 ← REST records（票数来自 WS）
 *   这样"票数"只有一个数据源（WS），不会出现两处各刷一次导致的中间态闪烁。
 *   代价是必须依赖 WS 在线；若 WS 断线，控制台顶部会亮"断线重连中"并禁用所有录票按钮
 *   —— 这是有意为之：宁可拒绝操作，也不让运营在看不到大屏的情况下继续录票。
 *
 * 【并发护栏】votingCandidateId 是"正在提交的候选人 id"，用于把该卡片及
 *   其按钮置 busy + disabled，避免手快点出两下导致重复录票。
 *
 * 【治理说明】重写自压缩产物：变量/函数语义化 + 格式化 + 注释，
 * 渲染逻辑（DOM 结构、patchFlag、动态 props、缓存的静态 vnode 数组）逐字保持。
 */
import {
  defineComponent,
  ref,
  inject,
  applyDirectives,
  onMounted,
  createElementBlock,
  createVNode,
  createElementVNode,
  createCommentVNode,
  toDisplayString,
  unref,
  normalizeClass,
  createTextVNode,
  toDisplayValue,
  resolveAsset,
  Fragment,
  renderList,
  useToast,
  withDirectives,
  vModelText,
  withKeys,
  openBlock,
  withScopeId,
} from "./index-DJrtCu9i.js";
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
import {
  getAdminTallyActivitiesRecords as fetchOperationRecords,
  undoAdminTallyActivities,
  voteAdminTallyCandidates,
} from "./tally-DC36h0vE.js";
import { createTallySocket } from "./useTallySocket-Bnuwbx53.js";

/* ── 编译器生成的动态 props 常量 ── */
const PROPS_DISABLED = ["disabled"];
const PROPS_DISABLED_AND_CLICK = ["disabled", "onClick"];
const PROPS_MODEL_DISABLED_KEYS = ["onUpdate:modelValue", "disabled", "onKeydown"];

/* ── 模板属性配置 ── */
const PAGE_CONTAINER = { class: "page-container" };
const CONTROL_MAIN = { class: "control-main" };
const TOPBAR = { class: "topbar" };
const TOPBAR_LEFT = { class: "topbar-left" };
const CONTROL_TITLE = { class: "control-title" };
const TOPBAR_META = { class: "topbar-meta" };
const TOPBAR_RIGHT = { class: "topbar-right" };
const BANNER_WARN = { key: 0, class: "banner warn" };
const LOADING_BLOCK = { key: 1, class: "loading-block" };
const EMPTY_BLOCK = { key: 2, class: "empty-block" };
const CANDIDATES_GRID = { key: 3, class: "candidates-grid" };
const CAND_HEAD = { class: "cand-head" };
const CAND_NUMBER = { class: "cand-number" };
const CAND_NAME = { class: "cand-name" };
const CAND_VOTES = { class: "cand-votes" };
const CAND_ACTIONS = { class: "cand-actions" };
const CUSTOM_WRAP = { class: "custom-wrap" };
const LOG_SECTION = { class: "log-section" };
const LOG_HEAD = { class: "log-head" };
const LOG_EMPTY = { key: 0, class: "log-empty" };
const LOG_LIST = { key: 1, class: "log-list" };
const LOG_TIME = { class: "log-time" };
const LOG_CAND = { class: "log-cand" };

const TallyControlPage = defineComponent({
  __name: "TallyControlPage",
  setup() {
    const route = inject();
    const toast = useToast();

    /** 路由参数 :id */
    const activityId = ref(Number(route.params.id) || null);
    /** WS 全量快照（票数、候选人、标题、状态的唯一来源） */
    const { snapshot, connected } = createTallySocket(activityId);

    /** 操作日志（最近 20 条，来自 REST） */
    const logRecords = ref([]);
    const loadingLog = ref(false);
    const undoing = ref(false);
    /** 自定义票数输入框的值，按候选人 id 存：{ [candidateId]: "文本" } */
    const customInputs = ref({});
    /** 正在提交录票的候选人 id（busy 护栏） */
    const votingCandidateId = ref(null);

    /** 候选人在快照内按 displayOrder 升序 */
    const sortedCandidates = applyDirectives(() =>
      [...(snapshot.value?.candidates || [])].sort((a, b) => a.displayOrder - b.displayOrder)
    );
    /** 是否处于「进行中」——非进行中一律禁止录票 */
    const isLive = applyDirectives(() => snapshot.value?.status === 1);
    /** 录票按钮的禁用条件：不在进行中，或还没收到快照 */
    const votingDisabled = applyDirectives(() => !isLive.value || !snapshot.value);

    /** 大屏地址：同源 origin + /tally/screen/:id */
    function screenUrl() {
      return activityId.value
        ? `${window.location.origin}/tally/screen/${activityId.value}`
        : null;
    }

    /** 复制大屏链接 */
    function copyScreenUrl() {
      const url = screenUrl();
      if (url) {
        navigator.clipboard
          .writeText(url)
          .then(() => toast.success(`已复制大屏链接：${url}`))
          .catch(() => toast.error(`复制失败：${url}`));
      }
    }

    /** 新窗口打开大屏 */
    function openScreen() {
      const url = screenUrl();
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }

    /**
     * 状态文案。注意 undefined（还没收到快照）单独映射成"加载中"，
     * 否则会沿用 `status === 2` 的 else 分支显示成"已结束"，误导现场人员。
     */
    function statusLabel(status) {
      if (status === undefined) return "加载中";
      if (status === 0) return "待开始";
      if (status === 1) return "进行中";
      return "已结束";
    }

    /** 状态徽标 class；undefined 也当 pending（灰） */
    function statusBadgeClass(status) {
      if (status === undefined || status === 0) return "pending";
      if (status === 1) return "live";
      return "ended";
    }

    /** 日志时间：只取 时:分:秒，比完整时间更适合会场快速扫读 */
    function formatClockTime(value) {
      if (!value) return "";
      const date = new Date(value);
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }

    /** 拉取最近 20 条操作日志（票数不靠它，靠 WS） */
    async function loadRecords() {
      if (!activityId.value) return;
      loadingLog.value = true;
      try {
        const response = await fetchOperationRecords(activityId.value);
        if (response.data.code === 200) {
          logRecords.value = (response.data.data || []).slice(0, 20);
        }
      } catch {
        // 日志拉取失败不打断主流程：大屏与录票仍可用，静默忽略
      } finally {
        loadingLog.value = false;
      }
    }

    /**
     * 录票主流程。
     * @param {object} candidate 快照里的候选人对象
     * @param {number} delta 增量（+1/+5/+10/-1 或自定义值）
     */
    async function submitVote(candidate, delta) {
      if (votingDisabled.value) return;
      if (!Number.isFinite(delta) || delta === 0) {
        toast.warning("票数变化不能为 0");
        return;
      }
      // 同一候选人已有请求在飞：直接丢弃本次点击（防手快重复提交）
      if (votingCandidateId.value === candidate.id) return;
      votingCandidateId.value = candidate.id;
      try {
        const response = await voteAdminTallyCandidates(candidate.id, delta);
        if (response.data.code === 200) {
          // 票数由 WS 推来，这里只刷日志
          await loadRecords();
        } else {
          toast.error(response.data.message || "录票失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        votingCandidateId.value = null;
      }
    }

    /** 自定义票数：读取输入框 → 校验 → 提交 → 清空输入框 */
    async function applyCustomVote(candidate) {
      const raw = customInputs.value[candidate.id];
      const value = Number(raw);
      if (!raw || !Number.isFinite(value) || value === 0) {
        toast.warning("请输入非 0 的整数");
        return;
      }
      await submitVote(candidate, Math.trunc(value));
      customInputs.value[candidate.id] = "";
    }

    /** 撤销上一步：后端按"最近一条是否为普通录票"决定成功与否 */
    async function undoLast() {
      if (!activityId.value || undoing.value) return;
      undoing.value = true;
      try {
        const response = await undoAdminTallyActivities(activityId.value);
        if (response.data.code === 200) {
          if (response.data.data) {
            toast.success("已撤销最近一次操作");
            await loadRecords();
          } else {
            toast.info("无可撤销操作");
          }
        } else {
          toast.error(response.data.message || "撤销失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        undoing.value = false;
      }
    }

    onMounted(() => {
      loadRecords();
    });

    /** 渲染函数：构建组件模板 DOM 结构 */
    return (_ctx, _cache) => {
      const routerLink = resolveAsset("router-link");
      return openBlock(),
        createElementBlock("div", PAGE_CONTAINER, [
          createVNode(PageHeader, { "back-to": "/admin/tally" }),
          createElementVNode("main", CONTROL_MAIN, [
            /* 顶部条：标题 / 状态 / WS 连接指示灯 / 四个操作 */
            createElementVNode("div", TOPBAR, [
              createElementVNode("div", TOPBAR_LEFT, [
                createElementVNode(
                  "h1",
                  CONTROL_TITLE,
                  toDisplayString(unref(snapshot)?.title || "加载中..."),
                  1
                ),
                createElementVNode("div", TOPBAR_META, [
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass([
                        "badge",
                        statusBadgeClass(unref(snapshot)?.status),
                      ]),
                    },
                    toDisplayString(statusLabel(unref(snapshot)?.status)),
                    3
                  ),
                  /* WS 连接指示灯：绿=已连接 / 灰=断线重连中 */
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass(["conn", { ok: unref(connected) }]),
                    },
                    [
                      ...((_cache[0] ||= [
                        createElementVNode("span", { class: "dot" }, null, -1),
                        createTextVNode(
                          " " + toDisplayString(unref(connected) ? "已连接" : "断线重连中"),
                          1
                        ),
                      ])),
                    ],
                    2
                  ),
                ]),
              ]),
              createElementVNode("div", TOPBAR_RIGHT, [
                createVNode(
                  routerLink,
                  { to: "/admin/tally", class: "back-link" },
                  {
                    default: toDisplayValue(() => [
                      ...((_cache[1] ||= [createTextVNode("← 返回", -1)])),
                    ]),
                    _: 1,
                  }
                ),
                createElementVNode(
                  "button",
                  { class: "screen-btn", onClick: openScreen, title: "新窗口打开大屏" },
                  "打开大屏"
                ),
                createElementVNode(
                  "button",
                  { class: "screen-btn", onClick: copyScreenUrl, title: "复制大屏链接" },
                  "复制链接"
                ),
                createElementVNode(
                  "button",
                  {
                    class: "undo-btn",
                    disabled: undoing.value || !unref(snapshot),
                    onClick: undoLast,
                  },
                  [
                    ...((_cache[2] ||= [
                      /* 回退箭头图标 */
                      createElementVNode(
                        "svg",
                        {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                        },
                        [
                          createElementVNode("path", { d: "M3 7v6h6" }),
                          createElementVNode("path", {
                            d: "M21 17a9 9 0 0 0-15-6.7L3 13",
                          }),
                        ],
                        -1
                      ),
                      createTextVNode(
                        " " + toDisplayString(undoing.value ? "撤销中..." : "撤销上一步"),
                        1
                      ),
                    ])),
                  ],
                  8,
                  PROPS_DISABLED
                ),
              ]),
            ]),

            /* 非「进行中」时的提示条 */
            unref(snapshot) && !isLive.value
              ? (openBlock(),
                createElementBlock(
                  "div",
                  BANNER_WARN,
                  " 活动当前状态为「" +
                    toDisplayString(statusLabel(unref(snapshot).status)) +
                    "」，无法录票。请在活动配置页或活动列表将状态改为「进行中」。 ",
                  1
                ))
              : createCommentVNode("", true),

            /* 候选人区：加载中 / 无候选人 / 卡片网格 */
            unref(snapshot)
              ? sortedCandidates.value.length === 0
                ? (openBlock(),
                  createElementBlock("div", EMPTY_BLOCK, [
                    ...((_cache[4] ||= [
                      createElementVNode(
                        "p",
                        null,
                        "此活动暂无候选人，请先到「配置候选人」页添加。",
                        -1
                      ),
                    ])),
                  ]))
                : (openBlock(),
                  createElementBlock("div", CANDIDATES_GRID, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(sortedCandidates.value, (candidate) =>
                        (openBlock(),
                        createElementBlock(
                          "article",
                          {
                            key: candidate.id,
                            class: normalizeClass([
                              "cand-card",
                              {
                                disabled: votingDisabled.value,
                                busy: votingCandidateId.value === candidate.id,
                              },
                            ]),
                          },
                          [
                            createElementVNode("div", CAND_HEAD, [
                              createElementVNode(
                                "div",
                                CAND_NUMBER,
                                toDisplayString(candidate.number),
                                1
                              ),
                              createElementVNode(
                                "div",
                                CAND_NAME,
                                toDisplayString(candidate.name),
                                1
                              ),
                              createElementVNode(
                                "div",
                                CAND_VOTES,
                                toDisplayString(candidate.voteCount),
                                1
                              ),
                            ]),
                            createElementVNode("div", CAND_ACTIONS, [
                              /* +1 / +5 / +10：现场最常用的三个粒度，做成大按钮 */
                              createElementVNode(
                                "button",
                                {
                                  class: "big-btn plus",
                                  disabled:
                                    votingDisabled.value ||
                                    votingCandidateId.value === candidate.id,
                                  onClick: () => submitVote(candidate, 1),
                                },
                                "+1",
                                8,
                                PROPS_DISABLED_AND_CLICK
                              ),
                              createElementVNode(
                                "button",
                                {
                                  class: "big-btn plus",
                                  disabled:
                                    votingDisabled.value ||
                                    votingCandidateId.value === candidate.id,
                                  onClick: () => submitVote(candidate, 5),
                                },
                                "+5",
                                8,
                                PROPS_DISABLED_AND_CLICK
                              ),
                              createElementVNode(
                                "button",
                                {
                                  class: "big-btn plus",
                                  disabled:
                                    votingDisabled.value ||
                                    votingCandidateId.value === candidate.id,
                                  onClick: () => submitVote(candidate, 10),
                                },
                                "+10",
                                8,
                                PROPS_DISABLED_AND_CLICK
                              ),
                              createElementVNode(
                                "button",
                                {
                                  class: "big-btn minus",
                                  disabled:
                                    votingDisabled.value ||
                                    votingCandidateId.value === candidate.id,
                                  onClick: () => submitVote(candidate, -1),
                                },
                                "-1",
                                8,
                                PROPS_DISABLED_AND_CLICK
                              ),
                              /* 自定义：可以是任意非 0 整数，负数即扣票 */
                              createElementVNode("div", CUSTOM_WRAP, [
                                withDirectives(
                                  createElementVNode(
                                    "input",
                                    {
                                      "onUpdate:modelValue":
                                        _cache[3] ||
                                        (_cache[3] = (value) =>
                                          (customInputs.value[candidate.id] = value)
                                        ),
                                      type: "number",
                                      class: "custom-input",
                                      placeholder: "自定义",
                                      disabled: votingDisabled.value,
                                      onKeydown: withKeys(
                                        () => applyCustomVote(candidate),
                                        ["enter"]
                                      ),
                                    },
                                    null,
                                    40
                                  ),
                                  [[vModelText, customInputs.value[candidate.id]]]
                                ),
                                createElementVNode(
                                  "button",
                                  {
                                    class: "apply-btn",
                                    disabled:
                                      votingDisabled.value ||
                                      votingCandidateId.value === candidate.id,
                                    onClick: () => applyCustomVote(candidate),
                                  },
                                  " 应用 ",
                                  8,
                                  PROPS_DISABLED_AND_CLICK
                                ),
                              ]),
                            ]),
                          ]
                        ))
                      ),
                      128
                    )),
                  ]))
              : (openBlock(),
                createElementBlock("div", LOADING_BLOCK, [
                  ...((_cache[3] ||= [
                    createElementVNode("div", { class: "loading-spinner" }, null, -1),
                    createElementVNode("p", null, "正在连接实时唱票通道...", -1),
                  ])),
                ])),

            /* 操作日志 */
            createElementVNode("section", LOG_SECTION, [
              createElementVNode("div", LOG_HEAD, [
                (_cache[5] ||=
                  createElementVNode("h2", { class: "log-title" }, "操作日志", -1)),
                createElementVNode(
                  "button",
                  { class: "log-refresh", disabled: loadingLog.value, onClick: loadRecords },
                  toDisplayString(loadingLog.value ? "刷新中..." : "刷新"),
                  9,
                  PROPS_DISABLED
                ),
              ]),
              logRecords.value.length === 0
                ? (openBlock(),
                  createElementBlock("div", LOG_EMPTY, "暂无操作记录"))
                : (openBlock(),
                  createElementBlock("ul", LOG_LIST, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(logRecords.value, (record) =>
                        (openBlock(),
                        createElementBlock("li", { key: record.id, class: "log-item" }, [
                          createElementVNode(
                            "span",
                            LOG_TIME,
                            toDisplayString(formatClockTime(record.createdAt)),
                            1
                          ),
                          createElementVNode(
                            "span",
                            LOG_CAND,
                            toDisplayString(record.candidateNumber) +
                              " · " +
                              toDisplayString(record.candidateName),
                            1
                          ),
                          /* delta >= 0 绿(上)，< 0 红(下) */
                          createElementVNode(
                            "span",
                            {
                              class: normalizeClass([
                                "log-delta",
                                record.delta >= 0 ? "up" : "down",
                              ]),
                            },
                            toDisplayString(
                              record.delta > 0 ? `+${record.delta}` : record.delta
                            ),
                            3
                          ),
                          /* type === 1 即"撤销"记录 */
                          createElementVNode(
                            "span",
                            {
                              class: normalizeClass([
                                "log-type",
                                record.type === 1 ? "undo" : "normal",
                              ]),
                            },
                            toDisplayString(record.type === 1 ? "撤销" : "普通"),
                            3
                          ),
                        ])))
                      ,
                      128
                    )),
                  ])),
            ]),
          ]),
        ]);
    };
  },
});

export default withScopeId(TallyControlPage, [["__scopeId", "data-v-cec9ba62"]]);