/*!
 * 页面模块：配置活动（TallyActivityEditPage）
 * 路由：/admin/tally/activities/:id/edit   name=admin-tally-edit   层级=3   需登录=是
 * 功能：登录后的「配置活动」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyActivityEditPage-DFD129SB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, applyDirectives, inject, ref, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, renderList, toDisplayValue, resolveAsset, withModifiers, withDirectives, vModelText, withKeys, useToast, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivitiesById as getActivityById, updateAdminTallyActivities, createAdminTallyActivitiesCandidates as addCandidate, updateAdminTallyCandidates as updateCandidate, deleteAdminTallyCandidates as deleteCandidateApi } from "./tally-DC36h0vE.js";
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
  pageHeaderSectionProps = {
    class: "page-header-section"
  },
  headerMainProps = {
    class: "header-main"
  },
  headerTextProps = {
    class: "header-text"
  },
  titleRowProps = {
    class: "title-row"
  },
  pageTitleProps = {
    class: "page-title"
  },
  headerActionsProps = {
    class: "header-actions"
  },
  statusSelectProps = ["value"],
  candidatesSectionProps = {
    class: "candidates-section"
  },
  emptyMiniProps = {
    key: 0,
    class: "empty-mini"
  },
  tableWrapperProps = {
    key: 1,
    class: "table-wrapper"
  },
  dataTableProps = {
    class: "data-table"
  },
  cellNumProps = {
    class: "cell-num"
  },
  cellNameProps = {
    class: "cell-name"
  },
  cellVotesProps = {
    class: "cell-votes"
  },
  rowActionsProps = {
    class: "row-actions"
  },
  editButtonProps = ["onClick"],
  deleteButtonProps = ["onClick"],
  backLinkWrapProps = {
    class: "back-link-wrap"
  },
  renameModalProps = {
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
  candidateModalProps = {
    class: "modal"
  },
  modalHeadProps = {
    class: "modal-head"
  },
  candidateModalBodyProps = {
    class: "modal-body"
  },
  formRowProps = {
    class: "form-row"
  },
  numberFormGroupProps = {
    class: "form-group"
  },
  orderFormGroupProps = {
    class: "form-group"
  },
  nameFormGroupProps = {
    class: "form-group"
  },
  candidateModalFootProps = {
    class: "modal-foot"
  },
  candidateCancelButtonProps = ["disabled"],
  candidateConfirmButtonProps = ["disabled"],
  TallyActivityEditPageComponent = defineComponent({
    __name: "TallyActivityEditPage",
    setup(props) {
      const route = inject(),
        router = useRouter(),
        toast = useToast(),
        activityId = applyDirectives(() => Number(route.params.id)),
        loading = ref(!0),
        activity = ref(null),
        sortedCandidates = applyDirectives(() => [...(activity.value?.candidates || [])].sort((val1, val5) => val1.displayOrder - val5.displayOrder)),
        showRenameModal = ref(!1),
        renameTitle = ref(""),
        renaming = ref(!1),
        showCandidateModal = ref(!1),
        editingCandidateId = ref(null),
        candidateForm = ref({
          number: "",
          name: "",
          displayOrder: 0
        }),
        savingCandidate = ref(!1);
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
       * loadActivity
       * 拉取活动详情（含候选人）：GET /admin/tally/activities/:id
       */
      async function loadActivity() {
        if (!activityId.value || Number.isNaN(activityId.value)) {
          toast.error("活动 ID 无效");
          return;
        }
        loading.value = !0;
        try {
          const val1 = await getActivityById(activityId.value);
          val1.data.code === 200 ? activity.value = val1.data.data : toast.error(val1.data.message || "加载失败");
        } catch (val1) {
          toast.error(val1?.message || "网络错误");
        } finally {
          loading.value = !1;
        }
      }
      /**
       * openRenameModal
       * 打开「修改活动标题」弹窗
       */
      function openRenameModal() {
        renameTitle.value = activity.value?.title || "", showRenameModal.value = !0;
      }
      /**
       * closeRenameModal
       * 关闭改名弹窗（保存中时禁用）
       */
      function closeRenameModal() {
        renaming.value || (showRenameModal.value = !1);
      }
      /**
       * submitRename
       * 提交改名：PUT /admin/tally/activities/:id，请求体 { title }
       */
      async function submitRename() {
        const val1 = renameTitle.value.trim();
        if (!val1) {
          toast.warning("标题不能为空");
          return;
        }
        renaming.value = !0;
        try {
          const val5 = await updateAdminTallyActivities(activityId.value, {
            title: val1
          });
          val5.data.code === 200 ? (toast.success("已更新"), showRenameModal.value = !1, await loadActivity()) : toast.error(val5.data.message || "更新失败");
        } catch (val5) {
          toast.error(val5?.message || "网络错误");
        } finally {
          renaming.value = !1;
        }
      }
      /**
       * changeStatus
       * 切换活动状态：PUT /admin/tally/activities/:id，请求体 { status }
       */
      async function changeStatus(val1) {
        if (!activity.value) return;
        const val5 = val1.target,
          val6 = Number(val5.value),
          val7 = activity.value.status;
        if (val6 !== val7) try {
          const val8 = await updateAdminTallyActivities(activityId.value, {
            status: val6
          });
          val8.data.code === 200 ? (toast.success("状态已更新"), await loadActivity()) : (toast.error(val8.data.message || "更新失败"), val5.value = String(val7));
        } catch (val8) {
          toast.error(val8?.message || "网络错误"), val5.value = String(val7);
        }
      }
      /**
       * openAddCandidate
       * 打开「添加候选人」弹窗（显示顺序默认取当前最大值 +1）
       */
      function openAddCandidate() {
        editingCandidateId.value = null;
        const val1 = sortedCandidates.value.reduce((val5, val6) => Math.max(val5, val6.displayOrder), 0);
        candidateForm.value = {
          number: "",
          name: "",
          displayOrder: val1 + 1
        }, showCandidateModal.value = !0;
      }
      /**
       * openEditCandidate
       * 打开「编辑候选人」弹窗并回填表单
       */
      function openEditCandidate(val1) {
        editingCandidateId.value = val1.id, candidateForm.value = {
          number: val1.number,
          name: val1.name,
          displayOrder: val1.displayOrder
        }, showCandidateModal.value = !0;
      }
      /**
       * closeCandidateModal
       * 关闭候选人弹窗（保存中时禁用）
       */
      function closeCandidateModal() {
        savingCandidate.value || (showCandidateModal.value = !1);
      }
      /**
       * submitCandidate
       * 提交候选人：新增走 POST /admin/tally/activities/:id/candidates，
       * 编辑走 PUT /admin/tally/candidates/:id，请求体均为 { number, name, displayOrder }
       */
      async function submitCandidate() {
        const val1 = candidateForm.value.number.trim(),
          val5 = candidateForm.value.name.trim(),
          val6 = Number(candidateForm.value.displayOrder) || 0;
        if (!val1) {
          toast.warning("请输入编号");
          return;
        }
        if (!val5) {
          toast.warning("请输入姓名");
          return;
        }
        savingCandidate.value = !0;
        try {
          if (editingCandidateId.value === null) {
            const val7 = await addCandidate(activityId.value, {
              number: val1,
              name: val5,
              displayOrder: val6
            });
            val7.data.code === 200 ? (toast.success("已添加"), showCandidateModal.value = !1, await loadActivity()) : toast.error(val7.data.message || "添加失败");
          } else {
            const val7 = await updateCandidate(editingCandidateId.value, {
              number: val1,
              name: val5,
              displayOrder: val6
            });
            val7.data.code === 200 ? (toast.success("已更新"), showCandidateModal.value = !1, await loadActivity()) : toast.error(val7.data.message || "更新失败");
          }
        } catch (val7) {
          toast.error(val7?.message || "网络错误");
        } finally {
          savingCandidate.value = !1;
        }
      }
      /**
       * deleteCandidate
       * 删除候选人（级联其唱票记录）：DELETE /admin/tally/candidates/:id
       */
      async function deleteCandidate(val1) {
        if (confirm(`确认删除候选人「${val1.number} · ${val1.name}」？
其历史唱票记录将一并删除。`)) try {
          const val5 = await deleteCandidateApi(val1.id);
          val5.data.code === 200 ? (toast.success("已删除"), await loadActivity()) : toast.error(val5.data.message || "删除失败");
        } catch (val5) {
          toast.error(val5?.message || "网络错误");
        }
      }
      /**
       * goControlConsole
       * 跳转唱票控制台 /admin/tally/activities/:id/control
       */
      function goControlConsole() {
        router.push(`/admin/tally/activities/${activityId.value}/control`);
      }
      return onMounted(loadActivity), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => {
        const val6 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", pageContainerProps, [createVNode(PageHeader, {
          "back-to": "/admin/tally"
        }), createElementVNode("main", pageContentProps, [createElementVNode("div", contentContainerProps, [createElementVNode("div", breadcrumbWrapperProps, [createVNode(PageBreadcrumb)]), loading.value ? (openBlock(), createElementBlock("div", loadingStateProps, [...(val5[4] || (val5[4] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : activity.value ? (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createElementVNode("div", pageHeaderSectionProps, [createElementVNode("div", headerMainProps, [createElementVNode("div", headerTextProps, [createElementVNode("div", titleRowProps, [createElementVNode("h1", pageTitleProps, toDisplayString(activity.value.title), 1), createElementVNode("span", {
          class: normalizeClass(["badge", statusClass(activity.value.status)])
        }, toDisplayString(statusLabel(activity.value.status)), 3)]), val5[5] || (val5[5] = createElementVNode("p", {
          class: "page-subtitle"
        }, "配置候选人、调整状态", -1))]), createElementVNode("div", headerActionsProps, [createElementVNode("button", {
          class: "action-button secondary",
          onClick: openRenameModal
        }, "改名"), createElementVNode("select", {
          class: "status-select-lg",
          value: activity.value.status,
          onChange: changeStatus
        }, [...(val5[6] || (val5[6] = [createElementVNode("option", {
          value: 0
        }, "待开始", -1), createElementVNode("option", {
          value: 1
        }, "进行中", -1), createElementVNode("option", {
          value: 2
        }, "已结束", -1)]))], 40, statusSelectProps), createElementVNode("button", {
          class: "action-button primary",
          onClick: goControlConsole
        }, "进入唱票控制台")])])]), createElementVNode("section", candidatesSectionProps, [createElementVNode("div", {
          class: "section-head"
        }, [val5[8] || (val5[8] = createElementVNode("h2", {
          class: "section-title"
        }, "候选人", -1)), createElementVNode("button", {
          class: "action-button primary",
          onClick: openAddCandidate
        }, [...(val5[7] || (val5[7] = [createElementVNode("svg", {
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
        })], -1), createTextVNode(" 添加候选人 ", -1)]))])]), sortedCandidates.value.length === 0 ? (openBlock(), createElementBlock("div", emptyMiniProps, [...(val5[9] || (val5[9] = [createElementVNode("p", null, "暂无候选人，点击右上「添加候选人」", -1)]))])) : (openBlock(), createElementBlock("div", tableWrapperProps, [createElementVNode("table", dataTableProps, [val5[10] || (val5[10] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", {
          class: "col-num"
        }, "编号"), createElementVNode("th", null, "姓名"), createElementVNode("th", {
          class: "col-order"
        }, "显示顺序"), createElementVNode("th", {
          class: "col-votes"
        }, "当前票数"), createElementVNode("th", {
          class: "col-actions"
        }, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sortedCandidates.value, val7 => (openBlock(), createElementBlock("tr", {
          key: val7.id
        }, [createElementVNode("td", cellNumProps, toDisplayString(val7.number), 1), createElementVNode("td", cellNameProps, toDisplayString(val7.name), 1), createElementVNode("td", null, toDisplayString(val7.displayOrder), 1), createElementVNode("td", cellVotesProps, toDisplayString(val7.voteCount), 1), createElementVNode("td", null, [createElementVNode("div", rowActionsProps, [createElementVNode("button", {
          class: "act-btn",
          onClick: val8 => openEditCandidate(val7)
        }, "编辑", 8, editButtonProps), createElementVNode("button", {
          class: "act-btn danger",
          onClick: val8 => deleteCandidate(val7)
        }, "删除", 8, deleteButtonProps)])])]))), 128))])])]))]), createElementVNode("div", backLinkWrapProps, [createVNode(val6, {
          to: "/admin/tally",
          class: "back-link"
        }, {
          default: toDisplayValue(() => [...(val5[11] || (val5[11] = [createTextVNode("← 返回活动列表", -1)]))]),
          _: 1
        })])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), showRenameModal.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-mask",
          onClick: withModifiers(closeRenameModal, ["self"])
        }, [createElementVNode("div", renameModalProps, [createElementVNode("header", {
          class: "modal-head"
        }, [val5[13] || (val5[13] = createElementVNode("h2", null, "修改活动标题", -1)), createElementVNode("button", {
          class: "modal-close",
          onClick: closeRenameModal
        }, [...(val5[12] || (val5[12] = [createElementVNode("svg", {
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
        })], -1)]))])]), createElementVNode("div", modalBodyProps, [createElementVNode("div", formGroupProps, [val5[14] || (val5[14] = createElementVNode("label", {
          class: "form-label"
        }, "标题", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[0] || (val5[0] = val7 => renameTitle.value = val7),
          type: "text",
          class: "form-input",
          onKeydown: withKeys(submitRename, ["enter"])
        }, null, 544), [[vModelText, renameTitle.value]])])]), createElementVNode("div", modalFootProps, [createElementVNode("button", {
          class: "modal-btn ghost",
          disabled: renaming.value,
          onClick: closeRenameModal
        }, "取消", 8, cancelButtonProps), createElementVNode("button", {
          class: "modal-btn primary",
          disabled: renaming.value,
          onClick: submitRename
        }, toDisplayString(renaming.value ? "保存中..." : "保存"), 9, confirmButtonProps)])])])) : createCommentVNode("", !0), showCandidateModal.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "modal-mask",
          onClick: withModifiers(closeCandidateModal, ["self"])
        }, [createElementVNode("div", candidateModalProps, [createElementVNode("header", modalHeadProps, [createElementVNode("h2", null, toDisplayString(editingCandidateId.value === null ? "添加候选人" : "编辑候选人"), 1), createElementVNode("button", {
          class: "modal-close",
          onClick: closeCandidateModal
        }, [...(val5[15] || (val5[15] = [createElementVNode("svg", {
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
        })], -1)]))])]), createElementVNode("div", candidateModalBodyProps, [createElementVNode("div", formRowProps, [createElementVNode("div", numberFormGroupProps, [val5[16] || (val5[16] = createElementVNode("label", {
          class: "form-label"
        }, "编号", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[1] || (val5[1] = val7 => candidateForm.value.number = val7),
          type: "text",
          class: "form-input",
          placeholder: "如 01"
        }, null, 512), [[vModelText, candidateForm.value.number]])]), createElementVNode("div", orderFormGroupProps, [val5[17] || (val5[17] = createElementVNode("label", {
          class: "form-label"
        }, "显示顺序", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[2] || (val5[2] = val7 => candidateForm.value.displayOrder = val7),
          type: "number",
          class: "form-input"
        }, null, 512), [[vModelText, candidateForm.value.displayOrder, void 0, {
          number: !0
        }]])])]), createElementVNode("div", nameFormGroupProps, [val5[18] || (val5[18] = createElementVNode("label", {
          class: "form-label"
        }, "姓名", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[3] || (val5[3] = val7 => candidateForm.value.name = val7),
          type: "text",
          class: "form-input",
          placeholder: "候选人姓名",
          onKeydown: withKeys(submitCandidate, ["enter"])
        }, null, 544), [[vModelText, candidateForm.value.name]])])]), createElementVNode("div", candidateModalFootProps, [createElementVNode("button", {
          class: "modal-btn ghost",
          disabled: savingCandidate.value,
          onClick: closeCandidateModal
        }, "取消", 8, candidateCancelButtonProps), createElementVNode("button", {
          class: "modal-btn primary",
          disabled: savingCandidate.value,
          onClick: submitCandidate
        }, toDisplayString(savingCandidate.value ? "保存中..." : "保存"), 9, candidateConfirmButtonProps)])])])) : createCommentVNode("", !0)]);
      };
    }
  }),
  TallyActivityEditPageDefaultExport = withScopeId(TallyActivityEditPageComponent, [["__scopeId", "data-v-4c5e1dfb"]]);
/* index 运行时导出（已语义化） */
export { TallyActivityEditPageDefaultExport as default };