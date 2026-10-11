/*!
 * 页面模块：实时唱票管理（TallyActivitiesPage）
 * ---------------------------------------------------------------------------
 * 路由：/admin/tally            name=admin-tally   层级=2   需登录=是
 * 页面：活动列表。整块业务的第一入口，四行操作把玩家带到其余三块：
 *        配置候选人 → /admin/tally/activities/:id/edit
 *        唱票控制台 → /admin/tally/activities/:id/control
 *        打开大屏   → /tally/screen/:id（window.open 新标签）
 *        复制大屏链接 → clipboard 写入 `${origin}/tally/screen/:id`
 *        状态下拉   → PUT { status }（失败时把 select 手动回滚成旧值）
 *        删除       → DELETE（confirm 二次确认，会级联候选人与唱票记录）
 *
 * 来源：assets/TallyActivitiesPage-Ck1JhJya.js（源站 https://xmyzstudent.com/）
 *
 * 【接口】
 *   GET    /api/v2/admin/tally/activities     onMounted 拉列表
 *   POST   /api/v2/admin/tally/activities     新建（只传 title）
 *   PUT    /api/v2/admin/tally/activities/:id 改状态（只传 status）
 *   DELETE /api/v2/admin/tally/activities/:id 删除
 *
 * 【治理说明】重写自压缩产物：变量/函数语义化 + 格式化 + 注释，
 * 渲染逻辑（DOM 结构、patchFlag、动态 props、缓存的静态 vnode 数组）逐字保持。
 */
import {
  defineComponent,
  ref,
  onMounted,
  createElementBlock,
  createVNode,
  createElementVNode,
  createCommentVNode,
  createTextVNode,
  Fragment,
  renderList,
  withModifiers,
  withDirectives,
  vModelText,
  withKeys,
  toDisplayString,
  useToast,
  normalizeClass,
  useRouter,
  openBlock,
  withScopeId,
} from "./index-DJrtCu9i.js";
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
import { PageFooter } from "./PageFooter-BK6at51a.js";
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
import {
  getAdminTallyActivities,
  createAdminTallyActivities,
  updateAdminTallyActivities,
  deleteAdminTallyActivities,
} from "./tally-DC36h0vE.js";

/* ── 编译器生成的动态 props 常量（保持与产物一致，不可随意删） ── */
const PROPS_ON_CLICK = ["onClick"];
const PROPS_VALUE_AND_CHANGE = ["value", "onChange"];
const PROPS_DISABLED = ["disabled"];

/* ── 模板属性配置：静态 vnode 的 props 常量（产物里的 local_zba2 / tt / ... ） ── */
const PAGE_CONTAINER = { class: "page-container" };
const PAGE_CONTENT = { class: "page-content" };
const CONTENT_CONTAINER = { class: "content-container" };
const BREADCRUMB_WRAPPER = { class: "breadcrumb-wrapper" };
const LOADING_CONTAINER = { key: 0, class: "loading-container" };
const EMPTY_CONTAINER = { key: 0, class: "empty-container" };
const TABLE_WRAPPER = { key: 1, class: "table-wrapper" };
const DATA_TABLE = { class: "data-table" };
const CELL_TITLE = { class: "cell-title" };
const CELL_TIME = { class: "cell-time" };
const ROW_ACTIONS = { class: "row-actions" };
const MODAL = { class: "modal" };
const MODAL_BODY = { class: "modal-body" };
const FORM_GROUP = { class: "form-group" };
const MODAL_FOOT = { class: "modal-foot" };

/** SVG path 数据：空状态图标（对话气泡）、关闭叉、加号 */
const ICON_EMPTY_CHAT = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";

const TallyActivitiesPage = defineComponent({
  __name: "TallyActivitiesPage",
  setup() {
    const router = useRouter();
    const toast = useToast();

    /** 列表首屏加载态（true 时表格区显示 spinner） */
    const loading = ref(true);
    /** GET /admin/tally/activities 返回的活动数组 */
    const activities = ref([]);
    /** 「新建活动」弹窗可见性 */
    const createModalVisible = ref(false);
    /** 新建活动弹窗里输入的标题 */
    const newTitle = ref("");
    /** 新建提交中（禁用按钮 + 改文案，防重复提交） */
    const creating = ref(false);

    /** 数字状态码 → 中文文案 */
    function statusLabel(status) {
      if (status === 0) return "待开始";
      if (status === 1) return "进行中";
      return "已结束";
    }

    /** 数字状态码 → badge 的 CSS class（pending / live / ended） */
    function statusBadgeClass(status) {
      if (status === 0) return "pending";
      if (status === 1) return "live";
      return "ended";
    }

    /** createdAt（RFC3339 字符串）→ 本地化时间；缺失时显示破折号 */
    function formatTime(value) {
      return value ? new Date(value).toLocaleString("zh-CN") : "—";
    }

    /** 拉取活动列表。成功才填表，失败弹 toast。 */
    async function loadActivities() {
      loading.value = true;
      try {
        const response = await getAdminTallyActivities();
        if (response.data.code === 200) {
          activities.value = response.data.data || [];
        } else {
          toast.error(response.data.message || "加载失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        loading.value = false;
      }
    }

    /** 打开新建弹窗并清空上次的输入 */
    function openCreateModal() {
      newTitle.value = "";
      createModalVisible.value = true;
    }

    /** 关闭弹窗；提交中不允许关（避免请求还在飞就消失） */
    function closeCreateModal() {
      if (!creating.value) {
        createModalVisible.value = false;
      }
    }

    /** 提交新建：前端先做一次空标题预检，后端仍会再校验一次 */
    async function submitCreate() {
      const title = newTitle.value.trim();
      if (!title) {
        toast.warning("请输入活动标题");
        return;
      }
      creating.value = true;
      try {
        const response = await createAdminTallyActivities(title);
        if (response.data.code === 200) {
          toast.success("已创建");
          createModalVisible.value = false;
          await loadActivities();
        } else {
          toast.error(response.data.message || "创建失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        creating.value = false;
      }
    }

    /**
     * 状态下拉变更 → PUT { status }。
     * 值没变直接短路（select 的 change 只在真变更时触发，这里是双保险）；
     * 失败时把 select 的 DOM value 强行改回旧状态，避免"界面显示已改但后端没改"。
     */
    async function changeStatus(activity, event) {
      const selectEl = event.target;
      const nextStatus = Number(selectEl.value);
      if (nextStatus === activity.status) return;
      try {
        const response = await updateAdminTallyActivities(activity.id, { status: nextStatus });
        if (response.data.code === 200) {
          toast.success("状态已更新");
          await loadActivities();
        } else {
          toast.error(response.data.message || "更新失败");
          selectEl.value = String(activity.status);
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
        selectEl.value = String(activity.status);
      }
    }

    /** 删除活动（confirm 二次确认后调用），成功后重拉列表 */
    async function removeActivity(activity) {
      const confirmed = confirm(
        `确认删除活动「${activity.title}」？\n候选人与唱票记录将一并删除，不可恢复。`
      );
      if (!confirmed) return;
      try {
        const response = await deleteAdminTallyActivities(activity.id);
        if (response.data.code === 200) {
          toast.success("已删除");
          await loadActivities();
        } else {
          toast.error(response.data.message || "删除失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      }
    }

    /** 跳「配置候选人」页 */
    function goEdit(activityId) {
      router.push(`/admin/tally/activities/${activityId}/edit`);
    }

    /** 跳「唱票控制台」页 */
    function goControl(activityId) {
      router.push(`/admin/tally/activities/${activityId}/control`);
    }

    /** 大屏地址：用当前 origin 拼，源站同构（源站 origin 即 xmyzstudent.com） */
    function screenUrl(activityId) {
      return `${window.location.origin}/tally/screen/${activityId}`;
    }

    /** 复制大屏链接到剪贴板（失败时把地址直接 toast 出来，便于手抄） */
    function copyScreenUrl(activityId) {
      const url = screenUrl(activityId);
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success(`已复制大屏链接：${url}`))
        .catch(() => toast.error(`复制失败：${url}`));
    }

    /** 新标签打开大屏 */
    function openScreen(activityId) {
      window.open(screenUrl(activityId), "_blank", "noopener,noreferrer");
    }

    onMounted(loadActivities);

    /** 渲染函数：构建组件模板 DOM 结构 */
    return (_ctx, _cache) => {
      // _cache：产物里用来缓存"整块静态"的 vnode 数组，避免每次渲染重建。
      //        这里保留同样的缓存语义，只是换成了可读的下标常量名。
      return openBlock(),
        createElementBlock("div", PAGE_CONTAINER, [
          createVNode(PageHeader, { "back-to": "/" }),
          createElementVNode("main", PAGE_CONTENT, [
            createElementVNode("div", CONTENT_CONTAINER, [
              createElementVNode("div", BREADCRUMB_WRAPPER, [createVNode(PageBreadcrumb)]),

              /* 页头：标题 + 「新建活动」按钮 */
              createElementVNode("div", { class: "page-header-section" }, [
                createElementVNode("div", { class: "header-main" }, [
                  (_cache[2] ||= createElementVNode("div", { class: "header-text" }, [
                    createElementVNode("h1", { class: "page-title" }, "实时唱票管理"),
                    createElementVNode(
                      "p",
                      { class: "page-subtitle" },
                      "管理活动、候选人、唱票控制台"
                    ),
                  ], -1)),
                  createElementVNode("div", { class: "header-actions" }, [
                    createElementVNode(
                      "button",
                      { class: "action-button primary", onClick: openCreateModal },
                      [
                        ...((_cache[1] ||= [
                          /* 加号图标 */
                          createElementVNode(
                            "svg",
                            {
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                            },
                            [
                              createElementVNode("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                              createElementVNode("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
                            ],
                            -1
                          ),
                          createTextVNode(" 新建活动 ", -1),
                        ])),
                      ]
                    ),
                  ]),
                ]),
              ]),

              /* 主体：加载中 / 空态 / 表格 三选一 */
              loading.value
                ? (openBlock(),
                  createElementBlock("div", LOADING_CONTAINER, [
                    ...((_cache[3] ||= [
                      createElementVNode("div", { class: "loading-spinner" }, null, -1),
                      createElementVNode("p", null, "加载中...", -1),
                    ])),
                  ]))
                : (openBlock(),
                  createElementBlock(Fragment, { key: 1 }, [
                    activities.value.length === 0
                      ? (openBlock(),
                        createElementBlock("div", EMPTY_CONTAINER, [
                          ...((_cache[4] ||= [
                            createElementVNode("div", { class: "empty-icon" }, [
                              createElementVNode(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "1.5",
                                },
                                [createElementVNode("path", { d: ICON_EMPTY_CHAT })],
                                -1
                              ),
                            ]),
                            createElementVNode("h2", null, "暂无唱票活动", -1),
                            createElementVNode(
                              "p",
                              null,
                              "点击右上角「新建活动」开始",
                              -1
                            ),
createElementVNode(
                            "button",
                            { class: "empty-action-btn", onClick: openCreateModal },
                            "新建第一个活动"
                          ),
                        ])),
                        ]))
                      : (openBlock(),
                        createElementBlock("div", TABLE_WRAPPER, [
                          createElementVNode("table", DATA_TABLE, [
                            /* 表头（整块静态，缓存） */
                            ...((_cache[8] ||= [
                              createElementVNode("thead", null, [
                                createElementVNode("tr", null, [
                                  createElementVNode("th", null, "标题"),
                                  createElementVNode("th", { class: "col-status" }, "状态"),
                                  createElementVNode("th", { class: "col-time" }, "创建时间"),
                                  createElementVNode("th", { class: "col-actions" }, "操作"),
                                ], -1),
                              ]),
                            ])),
                            createElementVNode("tbody", null, [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(activities.value, (activity) =>
                                  (openBlock(),
                                  createElementBlock("tr", { key: activity.id }, [
                                    createElementVNode(
                                      "td",
                                      CELL_TITLE,
                                      toDisplayString(activity.title),
                                      1
                                    ),
                                    /* 状态：文案 + badge 颜色都由 status 推导 */
                                    createElementVNode("td", null, [
                                      createElementVNode(
                                        "span",
                                        {
                                          class: normalizeClass([
                                            "badge",
                                            statusBadgeClass(activity.status),
                                          ]),
                                        },
                                        toDisplayString(statusLabel(activity.status)),
                                        3
                                      ),
                                    ]),
                                    createElementVNode(
                                      "td",
                                      CELL_TIME,
                                      toDisplayString(formatTime(activity.createdAt)),
                                      1
                                    ),
                                    createElementVNode("td", null, [
                                      createElementVNode("div", ROW_ACTIONS, [
                                        createElementVNode(
                                          "button",
                                          {
                                            class: "act-btn",
                                            onClick: () => goEdit(activity.id),
                                          },
                                          "配置候选人",
                                          8,
                                          PROPS_ON_CLICK
                                        ),
                                        createElementVNode(
                                          "button",
                                          {
                                            class: "act-btn primary",
                                            onClick: () => goControl(activity.id),
                                          },
                                          "唱票控制台",
                                          8,
                                          PROPS_ON_CLICK
                                        ),
                                        createElementVNode(
                                          "button",
                                          {
                                            class: "act-btn",
                                            onClick: () => openScreen(activity.id),
                                          },
                                          "打开大屏",
                                          8,
                                          PROPS_ON_CLICK
                                        ),
                                        createElementVNode(
                                          "button",
                                          {
                                            class: "act-btn",
                                            onClick: () => copyScreenUrl(activity.id),
                                          },
                                          "复制大屏链接",
                                          8,
                                          PROPS_ON_CLICK
                                        ),
                                        /* 状态下拉：三态 0/1/2 直选，省去"编辑再保存" */
                                        createElementVNode(
                                          "select",
                                          {
                                            class: "status-select",
                                            value: activity.status,
                                            onChange: (event) => changeStatus(activity, event),
                                          },
                                          [
                                            ...((_cache[7] ||= [
                                              createElementVNode(
                                                "option",
                                                { value: 0 },
                                                "待开始",
                                                -1
                                              ),
                                              createElementVNode(
                                                "option",
                                                { value: 1 },
                                                "进行中",
                                                -1
                                              ),
                                              createElementVNode(
                                                "option",
                                                { value: 2 },
                                                "已结束",
                                                -1
                                              ),
                                            ])),
                                          ],
                                          40,
                                          PROPS_VALUE_AND_CHANGE
                                        ),
                                        createElementVNode(
                                          "button",
                                          {
                                            class: "act-btn danger",
                                            onClick: () => removeActivity(activity),
                                          },
                                          "删除",
                                          8,
                                          PROPS_ON_CLICK
                                        ),
                                      ]),
                                    ]),
                                  ])),
                                ),
                                128,
)),
                            ]),
                          ], 64),
                        ])),
                      ])),
                    ]),
                  ]),
          createVNode(PageFooter),

          /* 「新建活动」弹窗：点遮罩空白处（withModifiers + self）才关闭 */
          createModalVisible.value
            ? (openBlock(),
              createElementBlock(
                "div",
                {
                  key: 0,
                  class: "modal-mask",
                  onClick: withModifiers(closeCreateModal, ["self"]),
                },
                [
                  createElementVNode("div", MODAL, [
                    createElementVNode("header", { class: "modal-head" }, [
                      ...((_cache[10] ||= [
                        createElementVNode("h2", null, "新建活动", -1),
                        createElementVNode(
                          "button",
                          { class: "modal-close", onClick: closeCreateModal },
                          [
                            ...((_cache[9] ||= [
                              createElementVNode(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2",
                                },
                                [
                                  createElementVNode("line", {
                                    x1: "18",
                                    y1: "6",
                                    x2: "6",
                                    y2: "18",
                                  }),
                                  createElementVNode("line", {
                                    x1: "6",
                                    y1: "6",
                                    x2: "18",
                                    y2: "18",
                                  }),
                                ],
                                -1
                              ),
                            ])),
                          ]
                        ),
                      ])),
                    ]),
                    createElementVNode("div", MODAL_BODY, [
                      createElementVNode("div", FORM_GROUP, [
                        createElementVNode(
                          "label",
                          { class: "form-label" },
                          "活动标题",
                          -1
                        ),
                        withDirectives(
                          createElementVNode(
                            "input",
                            {
                              "onUpdate:modelValue":
                                _cache[0] || (_cache[0] = (value) => (newTitle.value = value)),
                              type: "text",
                              class: "form-input",
                              placeholder: "例：2026 年校园歌手大赛决赛",
                              onKeydown: withKeys(submitCreate, ["enter"]),
                            },
                            null,
                            544
                          ),
                          [[vModelText, newTitle.value]]
                        ),
                      ]),
                    ]),
                    createElementVNode("div", MODAL_FOOT, [
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn ghost",
                          disabled: creating.value,
                          onClick: closeCreateModal,
                        },
                        "取消",
                        8,
                        PROPS_DISABLED
                      ),
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn primary",
                          disabled: creating.value,
                          onClick: submitCreate,
                        },
                        toDisplayString(creating.value ? "创建中..." : "确认创建"),
                        9,
                        PROPS_DISABLED
                      ),
                    ]),
                  ]),
                ]
              ))
            : createCommentVNode("", true),
        ]);
    };
  },
});

/* withScopeId：把 CSS 作用域 data-v-3fe3aa58 打到组件根节点，配合 TallyActivitiesPage-Cm0F3HF2.css */
export default withScopeId(TallyActivitiesPage, [["__scopeId", "data-v-3fe3aa58"]]);