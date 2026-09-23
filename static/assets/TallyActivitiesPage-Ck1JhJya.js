/*!
 * 页面模块：实时唱票管理（TallyActivitiesPage）
 * 路由：/admin/tally   name=admin-tally   层级=2   需登录=是
 * 功能：登录后的「实时唱票管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyActivitiesPage-Ck1JhJya.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
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
  withScopeId
} from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import {
  PageHeader
} from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import {
  PageFooter
} from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import {
  PageBreadcrumb
} from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 tally（站点内功能模块） */
import {
  getAdminTallyActivities,
  createAdminTallyActivities,
  updateAdminTallyActivities,
  deleteAdminTallyActivities
} from "./tally-DC36h0vE.js";
/* 模板属性配置：page-container */
const pageContainerAttrs = {
    class: "page-container"
  },
  pageContentAttrs = {
    class: "page-content"
  },
  contentContainerAttrs = {
    class: "content-container"
  },
  breadcrumbWrapperAttrs = {
    class: "breadcrumb-wrapper"
  },
  loadingContainerAttrs = {
    key: 0,
    class: "loading-container"
  },
  emptyContainerAttrs = {
    key: 0,
    class: "empty-container"
  },
  tableWrapperAttrs = {
    key: 1,
    class: "table-wrapper"
  },
  dataTableAttrs = {
    class: "data-table"
  },
  cellTitleAttrs = {
    class: "cell-title"
  },
  cellTimeAttrs = {
    class: "cell-time"
  },
  rowActionsAttrs = {
    class: "row-actions"
  },
  editBtnPatchFlags = ["onClick"],
  controlBtnPatchFlags = ["onClick"],
  screenBtnPatchFlags = ["onClick"],
  copyLinkBtnPatchFlags = ["onClick"],
  statusSelectBindings = ["value", "onChange"],
  deleteBtnPatchFlags = ["onClick"],
  modalAttrs = {
    class: "modal"
  },
  modalBodyAttrs = {
    class: "modal-body"
  },
  formGroupAttrs = {
    class: "form-group"
  },
  modalFootAttrs = {
    class: "modal-foot"
  },
  cancelBtnPatchFlags = ["disabled"],
  createBtnPatchFlags = ["disabled"],
  TallyActivitiesPageComponent = defineComponent({
    __name: "TallyActivitiesPage",
    setup(props) {
      const router = useRouter(),
        toast = useToast(),
        loading = ref(!0),
        activities = ref([]),
        createModalOpen = ref(!1),
        newTitle = ref(""),
        creating = ref(!1);

      function statusText(status) {
        return status === 0 ? "待开始" : status === 1 ? "进行中" : "已结束";
      }

      function statusClass(status) {
        return status === 0 ? "pending" : status === 1 ? "live" : "ended";
      }

      function formatTime(isoTime) {
        return isoTime ? new Date(isoTime).toLocaleString("zh-CN") : "—";
      }
      async function loadActivities() {
        loading.value = !0;
        try {
          const resp = await getAdminTallyActivities();
          resp.data.code === 200 ? activities.value = resp.data.data || [] : toast.error(resp.data
            .message || "加载失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        } finally {
          loading.value = !1;
        }
      }

      function openCreateModal() {
        newTitle.value = "", createModalOpen.value = !0;
      }

      function closeCreateModal() {
        creating.value || (createModalOpen.value = !1);
      }
      async function confirmCreate() {
        const title = newTitle.value.trim();
        if (!title) {
          toast.warning("请输入活动标题");
          return;
        }
        creating.value = !0;
        try {
          const resp = await createAdminTallyActivities(title);
          resp.data.code === 200 ? (toast.success("已创建"), createModalOpen.value = !1,
            await loadActivities()) : toast.error(resp.data.message || "创建失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        } finally {
          creating.value = !1;
        }
      }
      async function handleStatusChange(activity, event) {
        const selectEl = event.target,
          nextStatus = Number(selectEl.value);
        if (nextStatus !== activity.status) try {
          const resp = await updateAdminTallyActivities(activity.id, {
            status: nextStatus
          });
          resp.data.code === 200 ? (toast.success("状态已更新"), await loadActivities()) : (toast.error(resp
            .data.message || "更新失败"), selectEl.value = String(activity.status));
        } catch (error) {
          toast.error(error?.message || "网络错误"), selectEl.value = String(activity.status);
        }
      }
      async function handleDeleteActivity(activity) {
        if (confirm(`确认删除活动「${activity.title}」？
候选人与唱票记录将一并删除，不可恢复。`)) try {
          const resp = await deleteAdminTallyActivities(activity.id);
          resp.data.code === 200 ? (toast.success("已删除"), await loadActivities()) : toast.error(resp
            .data.message || "删除失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        }
      }

      function goEditActivity(activityId) {
        router.push(`/admin/tally/activities/${activityId}/edit`);
      }

      function goControlConsole(activityId) {
        router.push(`/admin/tally/activities/${activityId}/control`);
      }

      function screenUrlOf(activityId) {
        return `${window.location.origin}/tally/screen/${activityId}`;
      }

      function copyScreenLink(activityId) {
        const url = screenUrlOf(activityId);
        navigator.clipboard.writeText(url).then(() => toast.success(`已复制大屏链接：${url}`), () => toast.error(
          `复制失败：${url}`));
      }

      function openScreenWindow(activityId) {
        window.open(screenUrlOf(activityId), "_blank", "noopener,noreferrer");
      }
      return onMounted(loadActivities), /* 渲染函数：构建组件模板 DOM 结构 */ (props, cache) => (openBlock(),
        createElementBlock("div", pageContainerAttrs, [createVNode(PageHeader, {
          "back-to": "/"
        }), createElementVNode("main", pageContentAttrs, [createElementVNode("div",
          contentContainerAttrs, [createElementVNode("div", breadcrumbWrapperAttrs, [createVNode(
            PageBreadcrumb)]), createElementVNode("div", {
            class: "page-header-section"
          }, [createElementVNode("div", {
            class: "header-main"
          }, [cache[2] || (cache[2] = createElementVNode("div", {
            class: "header-text"
          }, [createElementVNode("h1", {
            class: "page-title"
          }, "实时唱票管理"), createElementVNode("p", {
            class: "page-subtitle"
          }, "管理活动、候选人、唱票控制台")], -1)), createElementVNode("div", {
            class: "header-actions"
          }, [createElementVNode("button", {
            class: "action-button primary",
            onClick: openCreateModal
          }, [...(cache[1] || (cache[1] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("line", {
            x1: "12",
            y1: "5",
            x2: "12",
            y2: "19"
          }), createElementVNode("line", {
            x1: "5",
            y1: "12",
            x2: "19",
            y2: "12"
          })], -1), createTextVNode(" 新建活动 ", -1)]))])])])]), loading.value ? (openBlock(),
            createElementBlock("div", loadingContainerAttrs, [...(cache[3] || (cache[3] = [
              createElementVNode("div", {
                class: "loading-spinner"
              }, null, -1), createElementVNode("p", null, "加载中...", -1)
            ]))])) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [activities.value.length === 0 ? (openBlock(), createElementBlock("div",
            emptyContainerAttrs, [cache[4] || (cache[4] = createElementVNode("div", {
              class: "empty-icon"
            }, [createElementVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [createElementVNode("path", {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            })])], -1)), cache[5] || (cache[5] = createElementVNode("h2", null,
              "暂无唱票活动", -1)), cache[6] || (cache[6] = createElementVNode("p", null,
              "点击右上角「新建活动」开始", -1)), createElementVNode("button", {
              class: "empty-action-btn",
              onClick: openCreateModal
            }, "新建第一个活动")])) : (openBlock(), createElementBlock("div", tableWrapperAttrs,
            [createElementVNode("table", dataTableAttrs, [cache[8] || (cache[8] =
              createElementVNode("thead", null, [createElementVNode("tr", null, [
                createElementVNode("th", null, "标题"), createElementVNode(
                  "th", {
                    class: "col-status"
                  }, "状态"), createElementVNode("th", {
                  class: "col-time"
                }, "创建时间"), createElementVNode("th", {
                  class: "col-actions"
                }, "操作")
              ])], -1)), createElementVNode("tbody", null, [(openBlock(!0),
              createElementBlock(Fragment, null, renderList(activities.value,
                activity => (openBlock(), createElementBlock("tr", {
                  key: activity.id
                }, [createElementVNode("td", cellTitleAttrs,
                    toDisplayString(activity.title), 1),
                  createElementVNode("td", null, [createElementVNode(
                    "span", {
                      class: normalizeClass(["badge", statusClass(
                        activity.status)])
                    }, toDisplayString(statusText(activity.status)),
                    3)]), createElementVNode("td", cellTimeAttrs,
                    toDisplayString(formatTime(activity.createdAt)), 1),
                  createElementVNode("td", null, [createElementVNode(
                    "div", rowActionsAttrs, [createElementVNode(
                        "button", {
                          class: "act-btn",
                          onClick: event => goEditActivity(activity
                            .id)
                        }, "配置候选人", 8, editBtnPatchFlags),
                      createElementVNode("button", {
                        class: "act-btn primary",
                        onClick: event => goControlConsole(
                          activity.id)
                      }, "唱票控制台", 8, controlBtnPatchFlags),
                      createElementVNode("button", {
                        class: "act-btn",
                        onClick: event => openScreenWindow(
                          activity.id)
                      }, "打开大屏", 8, screenBtnPatchFlags),
                      createElementVNode("button", {
                        class: "act-btn",
                        onClick: event => copyScreenLink(activity
                          .id)
                      }, "复制大屏链接", 8, copyLinkBtnPatchFlags),
                      createElementVNode("select", {
                        class: "status-select",
                        value: activity.status,
                        onChange: event => handleStatusChange(
                          activity, event)
                      }, [...(cache[7] || (cache[7] = [
                        createElementVNode("option", {
                          value: 0
                        }, "待开始", -1), createElementVNode(
                          "option", {
                            value: 1
                          }, "进行中", -1), createElementVNode(
                          "option", {
                            value: 2
                          }, "已结束", -1)
                      ]))], 40, statusSelectBindings),
                      createElementVNode("button", {
                        class: "act-btn danger",
                        onClick: event => handleDeleteActivity(
                          activity)
                      }, "删除", 8, deleteBtnPatchFlags)
                    ])])
                ]))), 128))])])]))], 64))])]), createVNode(PageFooter), createModalOpen.value ? (
          openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-mask",
            onClick: withModifiers(closeCreateModal, ["self"])
          }, [createElementVNode("div", modalAttrs, [createElementVNode("header", {
            class: "modal-head"
          }, [cache[10] || (cache[10] = createElementVNode("h2", null, "新建活动", -1)),
            createElementVNode("button", {
              class: "modal-close",
              onClick: closeCreateModal
            }, [...(cache[9] || (cache[9] = [createElementVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [createElementVNode("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }), createElementVNode("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })], -1)]))])
          ]), createElementVNode("div", modalBodyAttrs, [createElementVNode("div",
            formGroupAttrs, [cache[11] || (cache[11] = createElementVNode("label", {
              class: "form-label"
            }, "活动标题", -1)), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": cache[0] || (cache[0] = value => newTitle
                .value = value),
              type: "text",
              class: "form-input",
              placeholder: "例：2026 年校园歌手大赛决赛",
              onKeydown: withKeys(confirmCreate, ["enter"])
            }, null, 544), [
              [vModelText, newTitle.value]
            ])])]), createElementVNode("div", modalFootAttrs, [createElementVNode("button", {
            class: "modal-btn ghost",
            disabled: creating.value,
            onClick: closeCreateModal
          }, "取消", 8, cancelBtnPatchFlags), createElementVNode("button", {
              class: "modal-btn primary",
              disabled: creating.value,
              onClick: confirmCreate
            }, toDisplayString(creating.value ? "创建中..." : "确认创建"), 9,
            createBtnPatchFlags)])])])) : createCommentVNode("", !0)]));
    }
  }),
  ScopedTallyActivitiesPage = withScopeId(TallyActivitiesPageComponent, [
    ["__scopeId", "data-v-3fe3aa58"]
  ]);
/* index 运行时导出（已语义化） */
export {
  ScopedTallyActivitiesPage as
  default
};