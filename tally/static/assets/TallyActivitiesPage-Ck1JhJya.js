/*!
 * 页面模块：实时唱票管理（TallyActivitiesPage）
 * 路由：/admin/tally   name=admin-tally   层级=2   需登录=是
 * 功能：登录后的「实时唱票管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyActivitiesPage-Ck1JhJya.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, renderList, withModifiers, withDirectives, vModelText, withKeys, toDisplayString, useToast, normalizeClass, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivities, createAdminTallyActivities, updateAdminTallyActivities, deleteAdminTallyActivities } from "./tally-DC36h0vE.js";
/* 模板属性配置：page-container */
const pageContainerProps = {
    class: "page-container"
  },
  pageContentProps = {
    class: "page-content"
  },
  contentContainerProps = {
    class: "content-container"
  },
  breadcrumbWrapperProps = {
    class: "breadcrumb-wrapper"
  },
  loadingStateProps = {
    key: 0,
    class: "loading-container"
  },
  emptyStateProps = {
    key: 0,
    class: "empty-container"
  },
  tableWrapperProps = {
    key: 1,
    class: "table-wrapper"
  },
  dataTableProps = {
    class: "data-table"
  },
  cellTitleProps = {
    class: "cell-title"
  },
  cellTimeProps = {
    class: "cell-time"
  },
  rowActionsProps = {
    class: "row-actions"
  },
  editButtonProps = ["onClick"],
  controlButtonProps = ["onClick"],
  openScreenButtonProps = ["onClick"],
  copyLinkButtonProps = ["onClick"],
  statusSelectProps = ["value", "onChange"],
  deleteButtonProps = ["onClick"],
  modalProps = {
    class: "modal"
  },
  modalBodyProps = {
    class: "modal-body"
  },
  formGroupProps = {
    class: "form-group"
  },
  modalFootProps = {
    class: "modal-foot"
  },
  cancelButtonProps = ["disabled"],
  confirmButtonProps = ["disabled"],
  TallyActivitiesPageComponent = defineComponent({
    __name: "TallyActivitiesPage",
    setup(val) {
      const router = useRouter(),
        toast = useToast(),
        loading = ref(!0),
        activities = ref([]),
        showCreateModal = ref(!1),
        newTitle = ref(""),
        creating = ref(!1);
      /**
       * statusLabel
       * 状态码 → 中文标签：0 待开始 / 1 进行中 / 2 已结束
       */
      function statusLabel(val1) {
        return val1 === 0 ? "待开始" : val1 === 1 ? "进行中" : "已结束";
      }
      /**
       * statusClass
       * 状态码 → 徽标 class 名：pending / live / ended
       */
      function statusClass(val1) {
        return val1 === 0 ? "pending" : val1 === 1 ? "live" : "ended";
      }
      /**
       * formatDateTime
       * 时间戳 → 本地化字符串（空值显示 —）
       */
      function formatDateTime(val1) {
        return val1 ? new Date(val1).toLocaleString("zh-CN") : "—";
      }
      /**
       * loadActivities
       * 拉取活动列表：GET /admin/tally/activities
       */
      async function loadActivities() {
        loading.value = !0;
        try {
          const val1 = await getAdminTallyActivities();
          val1.data.code === 200 ? activities.value = val1.data.data || [] : toast.error(val1.data.message || "加载失败");
        } catch (val1) {
          toast.error(val1?.message || "网络错误");
        } finally {
          loading.value = !1;
        }
      }
      /**
       * openCreateModal
       * 打开「新建活动」弹窗
       */
      function openCreateModal() {
        newTitle.value = "", showCreateModal.value = !0;
      }
      /**
       * closeCreateModal
       * 关闭「新建活动」弹窗（提交中时禁用）
       */
      function closeCreateModal() {
        creating.value || (showCreateModal.value = !1);
      }
      /**
       * submitCreate
       * 提交新建活动：POST /admin/tally/activities，请求体 { title }
       */
      async function submitCreate() {
        const val1 = newTitle.value.trim();
        if (!val1) {
          toast.warning("请输入活动标题");
          return;
        }
        creating.value = !0;
        try {
          const val2 = await createAdminTallyActivities(val1);
          val2.data.code === 200 ? (toast.success("已创建"), showCreateModal.value = !1, await loadActivities()) : toast.error(val2.data.message || "创建失败");
        } catch (val2) {
          toast.error(val2?.message || "网络错误");
        } finally {
          creating.value = !1;
        }
      }
      /**
       * changeStatus
       * 行内切换活动状态：PUT /admin/tally/activities/:id，请求体 { status }
       */
      async function changeStatus(val1, val2) {
        const val3 = val2.target,
          val4 = Number(val3.value);
        if (val4 !== val1.status) try {
          const val5 = await updateAdminTallyActivities(val1.id, {
            status: val4
          });
          val5.data.code === 200 ? (toast.success("状态已更新"), await loadActivities()) : (toast.error(val5.data.message || "更新失败"), val3.value = String(val1.status));
        } catch (val5) {
          toast.error(val5?.message || "网络错误"), val3.value = String(val1.status);
        }
      }
      /**
       * deleteActivity
       * 删除活动（级联候选人与记录）：DELETE /admin/tally/activities/:id
       */
      async function deleteActivity(val1) {
        if (confirm(`确认删除活动「${val1.title}」？
候选人与唱票记录将一并删除，不可恢复。`)) try {
          const val2 = await deleteAdminTallyActivities(val1.id);
          val2.data.code === 200 ? (toast.success("已删除"), await loadActivities()) : toast.error(val2.data.message || "删除失败");
        } catch (val2) {
          toast.error(val2?.message || "网络错误");
        }
      }
      /**
       * goEditCandidates
       * 跳转候选人配置页 /admin/tally/activities/:id/edit
       */
      function goEditCandidates(val1) {
        router.push(`/admin/tally/activities/${val1}/edit`);
      }
      /**
       * goControlConsole
       * 跳转唱票控制台 /admin/tally/activities/:id/control
       */
      function goControlConsole(val1) {
        router.push(`/admin/tally/activities/${val1}/control`);
      }
      /**
       * buildScreenUrl
       * 拼装大屏公开链接 {origin}/tally/screen/:id
       */
      function buildScreenUrl(val1) {
        return `${window.location.origin}/tally/screen/${val1}`;
      }
      /**
       * copyScreenLink
       * 复制大屏链接到剪贴板
       */
      function copyScreenLink(val1) {
        const val2 = buildScreenUrl(val1);
        navigator.clipboard.writeText(val2).then(() => toast.success(`已复制大屏链接：${val2}`), () => toast.error(`复制失败：${val2}`));
      }
      /**
       * openScreen
       * 新窗口打开大屏
       */
      function openScreen(val1) {
        window.open(buildScreenUrl(val1), "_blank", "noopener,noreferrer");
      }
      return onMounted(loadActivities), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", pageContainerProps, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", pageContentProps, [createElementVNode("div", contentContainerProps, [createElementVNode("div", breadcrumbWrapperProps, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val2[2] || (val2[2] = createElementVNode("div", {
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
      }, [...(val2[1] || (val2[1] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 新建活动 ", -1)]))])])])]), loading.value ? (openBlock(), createElementBlock("div", loadingStateProps, [...(val2[3] || (val2[3] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [activities.value.length === 0 ? (openBlock(), createElementBlock("div", emptyStateProps, [val2[4] || (val2[4] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      })])], -1)), val2[5] || (val2[5] = createElementVNode("h2", null, "暂无唱票活动", -1)), val2[6] || (val2[6] = createElementVNode("p", null, "点击右上角「新建活动」开始", -1)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: openCreateModal
      }, "新建第一个活动")])) : (openBlock(), createElementBlock("div", tableWrapperProps, [createElementVNode("table", dataTableProps, [val2[8] || (val2[8] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "标题"), createElementVNode("th", {
        class: "col-status"
      }, "状态"), createElementVNode("th", {
        class: "col-time"
      }, "创建时间"), createElementVNode("th", {
        class: "col-actions"
      }, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(activities.value, val3 => (openBlock(), createElementBlock("tr", {
        key: val3.id
      }, [createElementVNode("td", cellTitleProps, toDisplayString(val3.title), 1), createElementVNode("td", null, [createElementVNode("span", {
        class: normalizeClass(["badge", statusClass(val3.status)])
      }, toDisplayString(statusLabel(val3.status)), 3)]), createElementVNode("td", cellTimeProps, toDisplayString(formatDateTime(val3.createdAt)), 1), createElementVNode("td", null, [createElementVNode("div", rowActionsProps, [createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => goEditCandidates(val3.id)
      }, "配置候选人", 8, editButtonProps), createElementVNode("button", {
        class: "act-btn primary",
        onClick: val4 => goControlConsole(val3.id)
      }, "唱票控制台", 8, controlButtonProps), createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => openScreen(val3.id)
      }, "打开大屏", 8, openScreenButtonProps), createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => copyScreenLink(val3.id)
      }, "复制大屏链接", 8, copyLinkButtonProps), createElementVNode("select", {
        class: "status-select",
        value: val3.status,
        onChange: val4 => changeStatus(val3, val4)
      }, [...(val2[7] || (val2[7] = [createElementVNode("option", {
        value: 0
      }, "待开始", -1), createElementVNode("option", {
        value: 1
      }, "进行中", -1), createElementVNode("option", {
        value: 2
      }, "已结束", -1)]))], 40, statusSelectProps), createElementVNode("button", {
        class: "act-btn danger",
        onClick: val4 => deleteActivity(val3)
      }, "删除", 8, deleteButtonProps)])])]))), 128))])])]))], 64))])]), createVNode(PageFooter), showCreateModal.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-mask",
        onClick: withModifiers(closeCreateModal, ["self"])
      }, [createElementVNode("div", modalProps, [createElementVNode("header", {
        class: "modal-head"
      }, [val2[10] || (val2[10] = createElementVNode("h2", null, "新建活动", -1)), createElementVNode("button", {
        class: "modal-close",
        onClick: closeCreateModal
      }, [...(val2[9] || (val2[9] = [createElementVNode("svg", {
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
      })], -1)]))])]), createElementVNode("div", modalBodyProps, [createElementVNode("div", formGroupProps, [val2[11] || (val2[11] = createElementVNode("label", {
        class: "form-label"
      }, "活动标题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val2[0] || (val2[0] = val3 => newTitle.value = val3),
        type: "text",
        class: "form-input",
        placeholder: "例：2026 年校园歌手大赛决赛",
        onKeydown: withKeys(submitCreate, ["enter"])
      }, null, 544), [[vModelText, newTitle.value]])])]), createElementVNode("div", modalFootProps, [createElementVNode("button", {
        class: "modal-btn ghost",
        disabled: creating.value,
        onClick: closeCreateModal
      }, "取消", 8, cancelButtonProps), createElementVNode("button", {
        class: "modal-btn primary",
        disabled: creating.value,
        onClick: submitCreate
      }, toDisplayString(creating.value ? "创建中..." : "确认创建"), 9, confirmButtonProps)])])])) : createCommentVNode("", !0)]));
    }
  }),
  TallyActivitiesPageDefaultExport = withScopeId(TallyActivitiesPageComponent, [["__scopeId", "data-v-3fe3aa58"]]);
/* index 运行时导出（已语义化） */
export { TallyActivitiesPageDefaultExport as default };