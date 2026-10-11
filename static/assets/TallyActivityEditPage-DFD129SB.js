/*!
 * 页面模块：配置活动（TallyActivityEditPage）
 * ---------------------------------------------------------------------------
 * 路由：/admin/tally/activities/:id/edit   name=admin-tally-edit   层级=3   需登录=是
 * 页面：单活动的「改名 + 候选人维护」。三块 UI：
 *        ① 页头：标题 + 状态下拉 + 「改名」弹窗 + 「进入唱票控制台」
 *        ② 候选人表格：编号 / 姓名 / 显示顺序 / **当前票数** / 编辑·删除
 *        ③ 候选人弹窗：新增与编辑共用，靠 editingCandidateId 是否为 null 区分标题
 *
 * 来源：assets/TallyActivityEditPage-DFD129SB.js（源站 https://xmyzstudent.com/）
 *
 * 【接口】
 *   GET    /api/v2/admin/tally/activities/:id                    onMounted 拉详情
 *   PUT    /api/v2/admin/tally/activities/:id   {title}          改名弹窗
 *   PUT    /api/v2/admin/tally/activities/:id   {status}         状态下拉
 *   POST   /api/v2/admin/tally/activities/:id/candidates         新增候选人
 *   PUT    /api/v2/admin/tally/candidates/:id                    编辑候选人
 *   DELETE /api/v2/admin/tally/candidates/:id                    删除候选人
 *
 * 【关键设计点】
 *   · displayOrder 是**大屏 x 轴顺序**，前端用 [...candidates].sort(...) 本地排序，
 *     后端不做排序 —— 排序是展示职责，不污染存储。
 *   · 新增候选人时 displayOrder 默认取"当前最大 + 1"（见 openAddCandidate），
 *     避免运营方每次都要手填序号。
 *   · 候选人表单的 number/name/displayOrder 三个字段前端各预检一次，后端再校验一次。
 *
 * 【治理说明】重写自压缩产物：变量/函数语义化 + 格式化 + 注释，
 * 渲染逻辑（DOM 结构、patchFlag、动态 props、缓存的静态 vnode 数组）逐字保持。
 */
import {
  defineComponent,
  applyDirectives,
  inject,
  ref,
  onMounted,
  createElementBlock,
  createVNode,
  createElementVNode,
  createCommentVNode,
  Fragment,
  toDisplayString,
  normalizeClass,
  createTextVNode,
  renderList,
  toDisplayValue,
  resolveAsset,
  withModifiers,
  withDirectives,
  vModelText,
  withKeys,
  useToast,
  useRouter,
  openBlock,
  withScopeId,
} from "./index-DJrtCu9i.js";
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
import { PageFooter } from "./PageFooter-BK6at51a.js";
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
import {
  getAdminTallyActivitiesById as fetchActivityDetail,
  updateAdminTallyActivities,
  createAdminTallyActivitiesCandidates,
  updateAdminTallyCandidates,
  deleteAdminTallyCandidates,
} from "./tally-DC36h0vE.js";

/* ── 编译器生成的动态 props 常量 ── */
const PROPS_ON_CLICK = ["onClick"];
const PROPS_VALUE = ["value"];

/* ── 模板属性配置 ── */
const PAGE_CONTAINER = { class: "page-container" };
const PAGE_CONTENT = { class: "page-content" };
const CONTENT_CONTAINER = { class: "content-container" };
const BREADCRUMB_WRAPPER = { class: "breadcrumb-wrapper" };
const LOADING_CONTAINER = { key: 0, class: "loading-container" };
const PAGE_HEADER_SECTION = { class: "page-header-section" };
const HEADER_MAIN = { class: "header-main" };
const HEADER_TEXT = { class: "header-text" };
const TITLE_ROW = { class: "title-row" };
const PAGE_TITLE = { class: "page-title" };
const HEADER_ACTIONS = { class: "header-actions" };
const CANDIDATES_SECTION = { class: "candidates-section" };
const EMPTY_MINI = { key: 0, class: "empty-mini" };
const TABLE_WRAPPER = { key: 1, class: "table-wrapper" };
const DATA_TABLE = { class: "data-table" };
const CELL_NUM = { class: "cell-num" };
const CELL_NAME = { class: "cell-name" };
const CELL_VOTES = { class: "cell-votes" };
const ROW_ACTIONS = { class: "row-actions" };
const BACK_LINK_WRAP = { class: "back-link-wrap" };
const RENAME_MODAL = { class: "modal" };
const RENAME_MODAL_BODY = { class: "modal-body" };
const FORM_GROUP = { class: "form-group" };
const RENAME_MODAL_FOOT = { class: "modal-foot" };
const PROPS_DISABLED = ["disabled"];
const CANDIDATE_MODAL = { class: "modal" };
const CANDIDATE_MODAL_HEAD = { class: "modal-head" };
const CANDIDATE_MODAL_BODY = { class: "modal-body" };
const FORM_ROW = { class: "form-row" };
const FORM_GROUP_ORDER = { class: "form-group" };
const FORM_GROUP_NAME = { class: "form-group" };
const CANDIDATE_MODAL_FOOT = { class: "modal-foot" };

/** 关闭叉的 SVG path：两段对角线 */
const CLOSE_ICON_LINES = [
  { x1: "18", y1: "6", x2: "6", y2: "18" },
  { x1: "6", y1: "6", x2: "18", y2: "18" },
];

/** 状态 <select> 的三个 <option>（三块页面共用同一组三态） */
function statusOptions() {
  return [
    createElementVNode("option", { value: 0 }, "待开始", -1),
    createElementVNode("option", { value: 1 }, "进行中", -1),
    createElementVNode("option", { value: 2 }, "已结束", -1),
  ];
}

const TallyActivityEditPage = defineComponent({
  __name: "TallyActivityEditPage",
  setup() {
    const route = inject();
    const router = useRouter();
    const toast = useToast();

    /** 路由参数 :id（活动 id），非法时页面直接报错提示 */
    const activityId = applyDirectives(() => Number(route.params.id));
    const loading = ref(true);
    /** GET /admin/tally/activities/:id 的完整返回（含 candidates） */
    const activity = ref(null);
    /** 按 displayOrder 升序排好的候选人（不改动后端返回的原始顺序） */
    const sortedCandidates = applyDirectives(() =>
      [...(activity.value?.candidates || [])].sort((a, b) => a.displayOrder - b.displayOrder)
    );

    /** 「改名」弹窗 */
    const renameModalVisible = ref(false);
    const renameTitle = ref("");
    const renaming = ref(false);

    /** 候选人弹窗（新增/编辑共用） */
    const candidateModalVisible = ref(false);
    /** null = 新增模式；非 null = 编辑模式（值为候选人 id） */
    const editingCandidateId = ref(null);
    const candidateForm = ref({ number: "", name: "", displayOrder: 0 });
    const savingCandidate = ref(false);

    /** 数字状态码 → 中文文案 */
    function statusLabel(status) {
      if (status === 0) return "待开始";
      if (status === 1) return "进行中";
      return "已结束";
    }

    /** 数字状态码 → badge class */
    function statusBadgeClass(status) {
      if (status === 0) return "pending";
      if (status === 1) return "live";
      return "ended";
    }

    /** 加载活动详情。id 非法直接拦下，不发请求。 */
    async function loadActivity() {
      if (!activityId.value || Number.isNaN(activityId.value)) {
        toast.error("活动 ID 无效");
        return;
      }
      loading.value = true;
      try {
        const response = await fetchActivityDetail(activityId.value);
        if (response.data.code === 200) {
          activity.value = response.data.data;
        } else {
          toast.error(response.data.message || "加载失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        loading.value = false;
      }
    }

    /** 打开改名弹窗，预填当前标题 */
    function openRenameModal() {
      renameTitle.value = activity.value?.title || "";
      renameModalVisible.value = true;
    }

    /** 关闭改名弹窗（提交中不允许） */
    function closeRenameModal() {
      if (!renaming.value) {
        renameModalVisible.value = false;
      }
    }

    /** 提交改名：PUT { title } */
    async function submitRename() {
      const title = renameTitle.value.trim();
      if (!title) {
        toast.warning("标题不能为空");
        return;
      }
      renaming.value = true;
      try {
        const response = await updateAdminTallyActivities(activityId.value, { title: title });
        if (response.data.code === 200) {
          toast.success("已更新");
          renameModalVisible.value = false;
          await loadActivity();
        } else {
          toast.error(response.data.message || "更新失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        renaming.value = false;
      }
    }

    /** 状态下拉变更 → PUT { status }，失败回滚 select 的 DOM 值 */
    async function changeStatus(event) {
      if (!activity.value) return;
      const selectEl = event.target;
      const nextStatus = Number(selectEl.value);
      const currentStatus = activity.value.status;
      if (nextStatus === currentStatus) return;
      try {
        const response = await updateAdminTallyActivities(activityId.value, { status: nextStatus });
        if (response.data.code === 200) {
          toast.success("状态已更新");
          await loadActivity();
        } else {
          toast.error(response.data.message || "更新失败");
          selectEl.value = String(currentStatus);
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
        selectEl.value = String(currentStatus);
      }
    }

    /** 打开「添加候选人」弹窗：displayOrder 预填当前最大值 + 1 */
    function openAddCandidateModal() {
      editingCandidateId.value = null;
      const maxOrder = sortedCandidates.value.reduce(
        (max, candidate) => Math.max(max, candidate.displayOrder),
        0
      );
      candidateForm.value = { number: "", name: "", displayOrder: maxOrder + 1 };
      candidateModalVisible.value = true;
    }

    /** 打开「编辑候选人」弹窗：按候选人的原值预填 */
    function openEditCandidateModal(candidate) {
      editingCandidateId.value = candidate.id;
      candidateForm.value = {
        number: candidate.number,
        name: candidate.name,
        displayOrder: candidate.displayOrder,
      };
      candidateModalVisible.value = true;
    }

    /** 关闭候选人弹窗（提交中不允许） */
    function closeCandidateModal() {
      if (!savingCandidate.value) {
        candidateModalVisible.value = false;
      }
    }

    /**
     * 提交候选人表单。
     * editingCandidateId === null → 新增（入参是 activityId）
     * 否则                     → 编辑（入参是 candidateId，注意维度不同）
     */
    async function submitCandidate() {
      const number = candidateForm.value.number.trim();
      const name = candidateForm.value.name.trim();
      const displayOrder = Number(candidateForm.value.displayOrder) || 0;
      if (!number) {
        toast.warning("请输入编号");
        return;
      }
      if (!name) {
        toast.warning("请输入姓名");
        return;
      }
      savingCandidate.value = true;
      try {
        if (editingCandidateId.value === null) {
          const response = await createAdminTallyActivitiesCandidates(activityId.value, {
            number: number,
            name: name,
            displayOrder: displayOrder,
          });
          if (response.data.code === 200) {
            toast.success("已添加");
            candidateModalVisible.value = false;
            await loadActivity();
          } else {
            toast.error(response.data.message || "添加失败");
          }
        } else {
          const response = await updateAdminTallyCandidates(editingCandidateId.value, {
            number: number,
            name: name,
            displayOrder: displayOrder,
          });
          if (response.data.code === 200) {
            toast.success("已更新");
            candidateModalVisible.value = false;
            await loadActivity();
          } else {
            toast.error(response.data.message || "更新失败");
          }
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      } finally {
        savingCandidate.value = false;
      }
    }

    /** 删除候选人（confirm 二次确认，后端级联删除其唱票记录） */
    async function removeCandidate(candidate) {
      const confirmed = confirm(
        `确认删除候选人「${candidate.number} · ${candidate.name}」？\n其历史唱票记录将一并删除。`
      );
      if (!confirmed) return;
      try {
        const response = await deleteAdminTallyCandidates(candidate.id);
        if (response.data.code === 200) {
          toast.success("已删除");
          await loadActivity();
        } else {
          toast.error(response.data.message || "删除失败");
        }
      } catch (error) {
        toast.error(error?.message || "网络错误");
      }
    }

    /** 跳到唱票控制台 */
    function goControl() {
      router.push(`/admin/tally/activities/${activityId.value}/control`);
    }

    onMounted(loadActivity);

    /** 渲染函数：构建组件模板 DOM 结构 */
    return (_ctx, _cache) => {
      const routerLink = resolveAsset("router-link");
      return openBlock(),
        createElementBlock("div", PAGE_CONTAINER, [
          createVNode(PageHeader, { "back-to": "/admin/tally" }),
          createElementVNode("main", PAGE_CONTENT, [
            createElementVNode("div", CONTENT_CONTAINER, [
              createElementVNode("div", BREADCRUMB_WRAPPER, [createVNode(PageBreadcrumb)]),

              loading.value
                ? (openBlock(),
                  createElementBlock("div", LOADING_CONTAINER, [
                    ...((_cache[4] ||= [
                      createElementVNode("div", { class: "loading-spinner" }, null, -1),
                      createElementVNode("p", null, "加载中...", -1),
                    ])),
                  ]))
                : activity.value
                  ? (openBlock(),
                    createElementBlock(Fragment, { key: 1 }, [
                      /* 页头：标题 + 状态 + 改名 + 进入控制台 */
                      createElementVNode("div", PAGE_HEADER_SECTION, [
                        createElementVNode("div", HEADER_MAIN, [
                          createElementVNode("div", HEADER_TEXT, [
                            createElementVNode("div", TITLE_ROW, [
                              createElementVNode(
                                "h1",
                                PAGE_TITLE,
                                toDisplayString(activity.value.title),
                                1
                              ),
                              createElementVNode(
                                "span",
                                {
                                  class: normalizeClass([
                                    "badge",
                                    statusBadgeClass(activity.value.status),
                                  ]),
                                },
                                toDisplayString(statusLabel(activity.value.status)),
                                3
                              ),
                            ]),
                            (_cache[5] ||=
                              createElementVNode(
                                "p",
                                { class: "page-subtitle" },
                                "配置候选人、调整状态",
                                -1
                              )),
                          ]),
                          createElementVNode("div", HEADER_ACTIONS, [
                            createElementVNode(
                              "button",
                              { class: "action-button secondary", onClick: openRenameModal },
                              "改名"
                            ),
                            createElementVNode(
                              "select",
                              {
                                class: "status-select-lg",
                                value: activity.value.status,
                                onChange: changeStatus,
                              },
                              [...((_cache[6] ||= statusOptions()))],
                              40,
                              PROPS_VALUE
                            ),
                            createElementVNode(
                              "button",
                              { class: "action-button primary", onClick: goControl },
                              "进入唱票控制台"
                            ),
                          ]),
                        ]),
                      ]),

                      /* 候选人区 */
                      createElementVNode("section", CANDIDATES_SECTION, [
                        createElementVNode("div", { class: "section-head" }, [
                          createElementVNode("h2", { class: "section-title" }, "候选人", -1),
                          createElementVNode(
                            "button",
                            { class: "action-button primary", onClick: openAddCandidateModal },
                            [
                              ...((_cache[7] ||= [
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
                                    createElementVNode("line", {
                                      x1: "12",
                                      y1: "5",
                                      x2: "12",
                                      y2: "19",
                                    }),
                                    createElementVNode("line", {
                                      x1: "5",
                                      y1: "12",
                                      x2: "19",
                                      y2: "12",
                                    }),
                                  ],
                                  -1
                                ),
                                createTextVNode(" 添加候选人 ", -1),
                              ])),
                            ]
                          ),
                        ]),
                        sortedCandidates.value.length === 0
                          ? (openBlock(),
                            createElementBlock("div", EMPTY_MINI, [
                              ...((_cache[9] ||= [
                                createElementVNode(
                                  "p",
                                  null,
                                  "暂无候选人，点击右上「添加候选人」",
                                  -1
                                ),
                              ])),
                            ]))
                          : (openBlock(),
                            createElementBlock("div", TABLE_WRAPPER, [
                              createElementVNode("table", DATA_TABLE, [
                                (_cache[10] ||=
                                  createElementVNode("thead", null, [
                                    createElementVNode("tr", null, [
                                      createElementVNode("th", { class: "col-num" }, "编号", -1),
                                      createElementVNode("th", null, "姓名", -1),
                                      createElementVNode(
                                        "th",
                                        { class: "col-order" },
                                        "显示顺序",
                                        -1
                                      ),
                                      createElementVNode(
                                        "th",
                                        { class: "col-votes" },
                                        "当前票数",
                                        -1
                                      ),
                                      createElementVNode(
                                        "th",
                                        { class: "col-actions" },
                                        "操作",
                                        -1
                                      ),
                                    ], -1),
                                  ])),
                                createElementVNode("tbody", null, [
                                  (openBlock(true),
                                  createElementBlock(
                                    Fragment,
                                    null,
                                    renderList(sortedCandidates.value, (candidate) =>
                                      (openBlock(),
                                      createElementBlock("tr", { key: candidate.id }, [
                                        createElementVNode(
                                          "td",
                                          CELL_NUM,
                                          toDisplayString(candidate.number),
                                          1
                                        ),
                                        createElementVNode(
                                          "td",
                                          CELL_NAME,
                                          toDisplayString(candidate.name),
                                          1
                                        ),
                                        createElementVNode(
                                          "td",
                                          null,
                                          toDisplayString(candidate.displayOrder),
                                          1
                                        ),
                                        /* 当前票数只读：票数只能通过控制台录票产生 */
                                        createElementVNode(
                                          "td",
                                          CELL_VOTES,
                                          toDisplayString(candidate.voteCount),
                                          1
                                        ),
                                        createElementVNode("td", null, [
                                          createElementVNode("div", ROW_ACTIONS, [
                                            createElementVNode(
                                              "button",
                                              {
                                                class: "act-btn",
                                                onClick: () => openEditCandidateModal(candidate),
                                              },
                                              "编辑",
                                              8,
                                              PROPS_ON_CLICK
                                            ),
                                            createElementVNode(
                                              "button",
                                              {
                                                class: "act-btn danger",
                                                onClick: () => removeCandidate(candidate),
                                              },
                                              "删除",
                                              8,
                                              PROPS_ON_CLICK
                                            ),
                                          ]),
                                        ]),
                                      ])),
                                    ),
128
                                    )),
                                  ]),
                                ]),
                              ])),
                        ]),

                        createElementVNode("div", BACK_LINK_WRAP, [
                        createVNode(
                          routerLink,
                          { to: "/admin/tally", class: "back-link" },
                          {
                            default: toDisplayValue(() => [
                              ...((_cache[11] ||= [
                                createTextVNode("← 返回活动列表", -1),
                              ])),
                            ]),
                            _: 1,
                          },
                          1032,
                          ["to", "class"]
                        ),
                      ]),
                    ], 64))
                  : createCommentVNode("", true),
            ]),
          ]),
          createVNode(PageFooter),

          /* 「修改活动标题」弹窗 */
          renameModalVisible.value
            ? (openBlock(),
              createElementBlock(
                "div",
                {
                  key: 0,
                  class: "modal-mask",
                  onClick: withModifiers(closeRenameModal, ["self"]),
                },
                [
                  createElementVNode("div", RENAME_MODAL, [
                    createElementVNode("header", { class: "modal-head" }, [
                      ...((_cache[13] ||= [
                        createElementVNode("h2", null, "修改活动标题", -1),
                        createElementVNode(
                          "button",
                          { class: "modal-close", onClick: closeRenameModal },
                          [
                            ...((_cache[12] ||= [
                              createElementVNode(
                                "svg",
                                {
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2",
                                },
                                CLOSE_ICON_LINES.map((line) =>
                                  createElementVNode("line", line, -1)
                                ),
                                -1
                              ),
                            ])),
                          ]
                        ),
                      ])),
                    ]),
                    createElementVNode("div", RENAME_MODAL_BODY, [
                      createElementVNode("div", FORM_GROUP, [
                        createElementVNode("label", { class: "form-label" }, "标题", -1),
                        withDirectives(
                          createElementVNode(
                            "input",
                            {
                              "onUpdate:modelValue":
                                _cache[0] ||
                                (_cache[0] = (value) => (renameTitle.value = value)),
                              type: "text",
                              class: "form-input",
                              onKeydown: withKeys(submitRename, ["enter"]),
                            },
                            null,
                            544
                          ),
                          [[vModelText, renameTitle.value]]
                        ),
                      ]),
                    ]),
                    createElementVNode("div", RENAME_MODAL_FOOT, [
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn ghost",
                          disabled: renaming.value,
                          onClick: closeRenameModal,
                        },
                        "取消",
                        8,
                        PROPS_DISABLED
                      ),
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn primary",
                          disabled: renaming.value,
                          onClick: submitRename,
                        },
                        toDisplayString(renaming.value ? "保存中..." : "保存"),
                        9,
                        PROPS_DISABLED
                      ),
                    ]),
                  ]),
                ]
              ))
            : createCommentVNode("", true),

          /* 「添加/编辑候选人」弹窗 */
          candidateModalVisible.value
            ? (openBlock(),
              createElementBlock(
                "div",
                {
                  key: 1,
                  class: "modal-mask",
                  onClick: withModifiers(closeCandidateModal, ["self"]),
                },
                [
                  createElementVNode("div", CANDIDATE_MODAL, [
                    createElementVNode("header", CANDIDATE_MODAL_HEAD, [
                      createElementVNode(
                        "h2",
                        null,
                        toDisplayString(
                          editingCandidateId.value === null ? "添加候选人" : "编辑候选人"
                        ),
                        1
                      ),
                      createElementVNode(
                        "button",
                        { class: "modal-close", onClick: closeCandidateModal },
                        [
                          ...((_cache[15] ||= [
                            createElementVNode(
                              "svg",
                              {
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                              },
                              CLOSE_ICON_LINES.map((line) =>
                                createElementVNode("line", line, -1)
                              ),
                              -1
                            ),
                          ])),
                        ]
                      ),
                    ]),
                    createElementVNode("div", CANDIDATE_MODAL_BODY, [
                      createElementVNode("div", FORM_ROW, [
                        createElementVNode("div", FORM_GROUP_ORDER, [
                          createElementVNode("label", { class: "form-label" }, "编号", -1),
                          withDirectives(
                            createElementVNode(
                              "input",
                              {
                                "onUpdate:modelValue":
                                  _cache[1] ||
                                  (_cache[1] = (value) =>
                                    (candidateForm.value.number = value)
                                  ),
                                type: "text",
                                class: "form-input",
                                placeholder: "如 01",
                              },
                              null,
                              512
                            ),
                            [[vModelText, candidateForm.value.number]]
                          ),
                        ]),
                        createElementVNode("div", FORM_GROUP_ORDER, [
                          createElementVNode(
                            "label",
                            { class: "form-label" },
                            "显示顺序",
                            -1
                          ),
                          withDirectives(
                            createElementVNode(
                              "input",
                              {
                                "onUpdate:modelValue":
                                  _cache[2] ||
                                  (_cache[2] = (value) =>
                                    (candidateForm.value.displayOrder = value)
                                  ),
                                type: "number",
                                class: "form-input",
                              },
                              null,
                              512
                            ),
                            [
                              [
                                vModelText,
                                candidateForm.value.displayOrder,
                                void 0,
                                { number: true },
                              ],
                            ]
                          ),
                        ]),
                      ]),
                      createElementVNode("div", FORM_GROUP_NAME, [
                        createElementVNode(
                          "label",
                          { class: "form-label" },
                          "姓名",
                          -1
                        ),
                        withDirectives(
                          createElementVNode(
                            "input",
                            {
                              "onUpdate:modelValue":
                                _cache[3] ||
                                (_cache[3] = (value) => (candidateForm.value.name = value)),
                              type: "text",
                              class: "form-input",
                              placeholder: "候选人姓名",
                              onKeydown: withKeys(submitCandidate, ["enter"]),
                            },
                            null,
                            544
                          ),
                          [[vModelText, candidateForm.value.name]]
                        ),
                      ]),
                    ]),
                    createElementVNode("div", CANDIDATE_MODAL_FOOT, [
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn ghost",
                          disabled: savingCandidate.value,
                          onClick: closeCandidateModal,
                        },
                        "取消",
                        8,
                        PROPS_DISABLED
                      ),
                      createElementVNode(
                        "button",
                        {
                          class: "modal-btn primary",
                          disabled: savingCandidate.value,
                          onClick: submitCandidate,
                        },
                        toDisplayString(savingCandidate.value ? "保存中..." : "保存"),
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

export default withScopeId(TallyActivityEditPage, [["__scopeId", "data-v-4c5e1dfb"]]);