/*!
 * 页面模块：配置活动（TallyActivityEditPage）
 * 路由：/admin/tally/activities/:id/edit   name=admin-tally-edit   层级=3   需登录=是
 * 功能：登录后的「配置活动」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyActivityEditPage-DFD129SB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
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
  getAdminTallyActivitiesById as ne,
  updateAdminTallyActivities,
  createAdminTallyActivitiesCandidates as ie,
  updateAdminTallyCandidates as de,
  deleteAdminTallyCandidates as re
} from "./tally-DC36h0vE.js";
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
  headerSectionAttrs = {
    class: "page-header-section"
  },
  headerMainAttrs = {
    class: "header-main"
  },
  headerTextAttrs = {
    class: "header-text"
  },
  titleRowAttrs = {
    class: "title-row"
  },
  pageTitleAttrs = {
    class: "page-title"
  },
  headerActionsAttrs = {
    class: "header-actions"
  },
  statusSelectBindings = ["value"],
  candidatesSectionAttrs = {
    class: "candidates-section"
  },
  emptyMiniAttrs = {
    key: 0,
    class: "empty-mini"
  },
  tableWrapperAttrs = {
    key: 1,
    class: "table-wrapper"
  },
  dataTableAttrs = {
    class: "data-table"
  },
  cellNumAttrs = {
    class: "cell-num"
  },
  cellNameAttrs = {
    class: "cell-name"
  },
  cellVotesAttrs = {
    class: "cell-votes"
  },
  rowActionsAttrs = {
    class: "row-actions"
  },
  editBtnPatchFlags = ["onClick"],
  deleteBtnPatchFlags = ["onClick"],
  backLinkWrapAttrs = {
    class: "back-link-wrap"
  },
  renameModalAttrs = {
    class: "modal"
  },
  renameModalBodyAttrs = {
    class: "modal-body"
  },
  renameFormGroupAttrs = {
    class: "form-group"
  },
  renameModalFootAttrs = {
    class: "modal-foot"
  },
  renameCancelPatchFlags = ["disabled"],
  renameSavePatchFlags = ["disabled"],
  candidateModalAttrs = {
    class: "modal"
  },
  candidateModalHeadAttrs = {
    class: "modal-head"
  },
  candidateModalBodyAttrs = {
    class: "modal-body"
  },
  formRowAttrs = {
    class: "form-row"
  },
  numberGroupAttrs = {
    class: "form-group"
  },
  orderGroupAttrs = {
    class: "form-group"
  },
  nameGroupAttrs = {
    class: "form-group"
  },
  candidateModalFootAttrs = {
    class: "modal-foot"
  },
  candidateCancelPatchFlags = ["disabled"],
  candidateSavePatchFlags = ["disabled"],
  TallyActivityEditPageComponent = defineComponent({
    __name: "TallyActivityEditPage",
    setup(props) {
      const route = inject(),
        router = useRouter(),
        toast = useToast(),
        activityId = applyDirectives(() => Number(route.params.id)),
        loading = ref(!0),
        activity = ref(null),
        sortedCandidates = applyDirectives(() => [...(activity.value?.candidates || [])].sort((a, b) => a
          .displayOrder - b.displayOrder)),
        renameModalOpen = ref(!1),
        renameTitle = ref(""),
        renameSaving = ref(!1),
        candidateModalOpen = ref(!1),
        editingCandidateId = ref(null),
        candidateForm = ref({
          number: "",
          name: "",
          displayOrder: 0
        }),
        candidateSaving = ref(!1);

      function statusText(status) {
        return status === 0 ? "待开始" : status === 1 ? "进行中" : "已结束";
      }

      function statusClass(status) {
        return status === 0 ? "pending" : status === 1 ? "live" : "ended";
      }
      async function loadActivity() {
        if (!activityId.value || Number.isNaN(activityId.value)) {
          toast.error("活动 ID 无效");
          return;
        }
        loading.value = !0;
        try {
          const resp = await ne(activityId.value);
          resp.data.code === 200 ? activity.value = resp.data.data : toast.error(resp.data.message ||
            "加载失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        } finally {
          loading.value = !1;
        }
      }

      function openRenameModal() {
        renameTitle.value = activity.value?.title || "", renameModalOpen.value = !0;
      }

      function closeRenameModal() {
        renameSaving.value || (renameModalOpen.value = !1);
      }
      async function confirmRename() {
        const title = renameTitle.value.trim();
        if (!title) {
          toast.warning("标题不能为空");
          return;
        }
        renameSaving.value = !0;
        try {
          const resp = await updateAdminTallyActivities(activityId.value, {
            title: title
          });
          resp.data.code === 200 ? (toast.success("已更新"), renameModalOpen.value = !1,
          await loadActivity()) : toast.error(resp.data.message || "更新失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        } finally {
          renameSaving.value = !1;
        }
      }
      async function handleStatusChange(event) {
        if (!activity.value) return;
        const selectEl = event.target,
          nextStatus = Number(selectEl.value),
          prevStatus = activity.value.status;
        if (nextStatus !== prevStatus) try {
          const resp = await updateAdminTallyActivities(activityId.value, {
            status: nextStatus
          });
          resp.data.code === 200 ? (toast.success("状态已更新"), await loadActivity()) : (toast.error(resp
            .data.message || "更新失败"), selectEl.value = String(prevStatus));
        } catch (error) {
          toast.error(error?.message || "网络错误"), selectEl.value = String(prevStatus);
        }
      }

      function openAddCandidateModal() {
        editingCandidateId.value = null;
        const maxOrder = sortedCandidates.value.reduce((max, item) => Math.max(max, item.displayOrder), 0);
        candidateForm.value = {
          number: "",
          name: "",
          displayOrder: maxOrder + 1
        }, candidateModalOpen.value = !0;
      }

      function openEditCandidateModal(candidate) {
        editingCandidateId.value = candidate.id, candidateForm.value = {
          number: candidate.number,
          name: candidate.name,
          displayOrder: candidate.displayOrder
        }, candidateModalOpen.value = !0;
      }

      function closeCandidateModal() {
        candidateSaving.value || (candidateModalOpen.value = !1);
      }
      async function confirmSaveCandidate() {
        const number = candidateForm.value.number.trim(),
          name = candidateForm.value.name.trim(),
          displayOrder = Number(candidateForm.value.displayOrder) || 0;
        if (!number) {
          toast.warning("请输入编号");
          return;
        }
        if (!name) {
          toast.warning("请输入姓名");
          return;
        }
        candidateSaving.value = !0;
        try {
          if (editingCandidateId.value === null) {
            const resp = await ie(activityId.value, {
              number: number,
              name: name,
              displayOrder: displayOrder
            });
            resp.data.code === 200 ? (toast.success("已添加"), candidateModalOpen.value = !1,
              await loadActivity()) : toast.error(resp.data.message || "添加失败");
          } else {
            const resp = await de(editingCandidateId.value, {
              number: number,
              name: name,
              displayOrder: displayOrder
            });
            resp.data.code === 200 ? (toast.success("已更新"), candidateModalOpen.value = !1,
              await loadActivity()) : toast.error(resp.data.message || "更新失败");
          }
        } catch (error) {
          toast.error(error?.message || "网络错误");
        } finally {
          candidateSaving.value = !1;
        }
      }
      async function handleDeleteCandidate(candidate) {
        if (confirm(`确认删除候选人「${candidate.number} · ${candidate.name}」？
其历史唱票记录将一并删除。`)) try {
          const resp = await re(candidate.id);
          resp.data.code === 200 ? (toast.success("已删除"), await loadActivity()) : toast.error(resp.data
            .message || "删除失败");
        } catch (error) {
          toast.error(error?.message || "网络错误");
        }
      }

      function goControlConsole() {
        router.push(`/admin/tally/activities/${activityId.value}/control`);
      }
      return onMounted(loadActivity), /* 渲染函数：构建组件模板 DOM 结构 */ (props, cache) => {
        const RouterLink = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", pageContainerAttrs, [createVNode(PageHeader, {
            "back-to": "/admin/tally"
          }), createElementVNode("main", pageContentAttrs, [createElementVNode("div",
            contentContainerAttrs, [createElementVNode("div", breadcrumbWrapperAttrs, [
              createVNode(PageBreadcrumb)
            ]), loading.value ? (openBlock(), createElementBlock("div", loadingContainerAttrs, [
              ...(cache[4] || (cache[4] = [createElementVNode("div", {
                class: "loading-spinner"
              }, null, -1), createElementVNode("p", null, "加载中...", -1)]))
            ])) : activity.value ? (openBlock(), createElementBlock(Fragment, {
              key: 1
            }, [createElementVNode("div", headerSectionAttrs, [createElementVNode("div",
              headerMainAttrs, [createElementVNode("div", headerTextAttrs, [
                createElementVNode("div", titleRowAttrs, [createElementVNode("h1",
                    pageTitleAttrs, toDisplayString(activity.value.title), 1),
                  createElementVNode("span", {
                    class: normalizeClass(["badge", statusClass(activity.value
                      .status)])
                  }, toDisplayString(statusText(activity.value.status)), 3)
                ]), cache[5] || (cache[5] = createElementVNode("p", {
                  class: "page-subtitle"
                }, "配置候选人、调整状态", -1))
              ]), createElementVNode("div", headerActionsAttrs, [createElementVNode(
                "button", {
                  class: "action-button secondary",
                  onClick: openRenameModal
                }, "改名"), createElementVNode("select", {
                class: "status-select-lg",
                value: activity.value.status,
                onChange: handleStatusChange
              }, [...(cache[6] || (cache[6] = [createElementVNode("option", {
                value: 0
              }, "待开始", -1), createElementVNode("option", {
                value: 1
              }, "进行中", -1), createElementVNode("option", {
                value: 2
              }, "已结束", -1)]))], 40, statusSelectBindings), createElementVNode(
                "button", {
                  class: "action-button primary",
                  onClick: goControlConsole
                }, "进入唱票控制台")])])]), createElementVNode("section", candidatesSectionAttrs,
              [createElementVNode("div", {
                  class: "section-head"
                }, [cache[8] || (cache[8] = createElementVNode("h2", {
                  class: "section-title"
                }, "候选人", -1)), createElementVNode("button", {
                  class: "action-button primary",
                  onClick: openAddCandidateModal
                }, [...(cache[7] || (cache[7] = [createElementVNode("svg", {
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
                })], -1), createTextVNode(" 添加候选人 ", -1)]))])]), sortedCandidates.value
                .length === 0 ? (openBlock(), createElementBlock("div", emptyMiniAttrs, [
                  ...(cache[9] || (cache[9] = [createElementVNode("p", null,
                    "暂无候选人，点击右上「添加候选人」", -1)]))
                ])) : (openBlock(), createElementBlock("div", tableWrapperAttrs, [
                  createElementVNode("table", dataTableAttrs, [cache[10] || (cache[
                    10] = createElementVNode("thead", null, [createElementVNode(
                      "tr", null, [createElementVNode("th", {
                          class: "col-num"
                        }, "编号"), createElementVNode("th", null, "姓名"),
                        createElementVNode("th", {
                          class: "col-order"
                        }, "显示顺序"), createElementVNode("th", {
                          class: "col-votes"
                        }, "当前票数"), createElementVNode("th", {
                          class: "col-actions"
                        }, "操作")
                      ])], -1)), createElementVNode("tbody", null, [(openBlock(!
                    0), createElementBlock(Fragment, null, renderList(
                      sortedCandidates.value, candidate => (openBlock(),
                        createElementBlock("tr", {
                          key: candidate.id
                        }, [createElementVNode("td", cellNumAttrs,
                            toDisplayString(candidate.number), 1),
                          createElementVNode("td", cellNameAttrs,
                            toDisplayString(candidate.name), 1),
                          createElementVNode("td", null, toDisplayString(
                            candidate.displayOrder), 1),
                          createElementVNode("td", cellVotesAttrs,
                            toDisplayString(candidate.voteCount), 1),
                          createElementVNode("td", null, [
                            createElementVNode("div", rowActionsAttrs, [
                              createElementVNode("button", {
                                class: "act-btn",
                                onClick: event =>
                                  openEditCandidateModal(candidate)
                              }, "编辑", 8, editBtnPatchFlags),
                              createElementVNode("button", {
                                class: "act-btn danger",
                                onClick: event =>
                                  handleDeleteCandidate(candidate)
                              }, "删除", 8, deleteBtnPatchFlags)
                            ])
                          ])
                        ]))), 128))])])
                ]))
              ]), createElementVNode("div", backLinkWrapAttrs, [createVNode(RouterLink, {
              to: "/admin/tally",
              class: "back-link"
            }, {
              default: toDisplayValue(() => [...(cache[11] || (cache[11] = [
                createTextVNode("← 返回活动列表", -1)
              ]))]),
              _: 1
            })])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), renameModalOpen
          .value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-mask",
            onClick: withModifiers(closeRenameModal, ["self"])
          }, [createElementVNode("div", renameModalAttrs, [createElementVNode("header", {
            class: "modal-head"
          }, [cache[13] || (cache[13] = createElementVNode("h2", null, "修改活动标题", -1)),
            createElementVNode("button", {
              class: "modal-close",
              onClick: closeRenameModal
            }, [...(cache[12] || (cache[12] = [createElementVNode("svg", {
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
          ]), createElementVNode("div", renameModalBodyAttrs, [createElementVNode("div",
            renameFormGroupAttrs, [cache[14] || (cache[14] = createElementVNode(
            "label", {
              class: "form-label"
            }, "标题", -1)), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": cache[0] || (cache[0] = value => renameTitle
                .value = value),
              type: "text",
              class: "form-input",
              onKeydown: withKeys(confirmRename, ["enter"])
            }, null, 544), [
              [vModelText, renameTitle.value]
            ])])]), createElementVNode("div", renameModalFootAttrs, [createElementVNode(
            "button", {
              class: "modal-btn ghost",
              disabled: renameSaving.value,
              onClick: closeRenameModal
            }, "取消", 8, renameCancelPatchFlags), createElementVNode("button", {
              class: "modal-btn primary",
              disabled: renameSaving.value,
              onClick: confirmRename
            }, toDisplayString(renameSaving.value ? "保存中..." : "保存"), 9,
            renameSavePatchFlags)])])])) : createCommentVNode("", !0), candidateModalOpen.value ? (
            openBlock(), createElementBlock("div", {
              key: 1,
              class: "modal-mask",
              onClick: withModifiers(closeCandidateModal, ["self"])
            }, [createElementVNode("div", candidateModalAttrs, [createElementVNode("header",
              candidateModalHeadAttrs, [createElementVNode("h2", null, toDisplayString(
                  editingCandidateId.value === null ? "添加候选人" : "编辑候选人"), 1),
                createElementVNode("button", {
                  class: "modal-close",
                  onClick: closeCandidateModal
                }, [...(cache[15] || (cache[15] = [createElementVNode("svg", {
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
              ]), createElementVNode("div", candidateModalBodyAttrs, [createElementVNode(
              "div", formRowAttrs, [createElementVNode("div", numberGroupAttrs, [cache[
                16] || (cache[16] = createElementVNode("label", {
                  class: "form-label"
                }, "编号", -1)), withDirectives(createElementVNode("input", {
                  "onUpdate:modelValue": cache[1] || (cache[1] = value =>
                    candidateForm.value.number = value),
                  type: "text",
                  class: "form-input",
                  placeholder: "如 01"
                }, null, 512), [
                  [vModelText, candidateForm.value.number]
                ])
              ]), createElementVNode("div", orderGroupAttrs, [cache[17] || (cache[17] =
                createElementVNode("label", {
                  class: "form-label"
                }, "显示顺序", -1)), withDirectives(createElementVNode("input", {
                "onUpdate:modelValue": cache[2] || (cache[2] = value =>
                  candidateForm.value.displayOrder = value),
                type: "number",
                class: "form-input"
              }, null, 512), [
                [vModelText, candidateForm.value.displayOrder, void 0, {
                  number: !0
                }]
              ])])]), createElementVNode("div", nameGroupAttrs, [cache[18] || (cache[18] =
              createElementVNode("label", {
                class: "form-label"
              }, "姓名", -1)), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": cache[3] || (cache[3] = value =>
                candidateForm.value.name = value),
              type: "text",
              class: "form-input",
              placeholder: "候选人姓名",
              onKeydown: withKeys(confirmSaveCandidate, ["enter"])
            }, null, 544), [
              [vModelText, candidateForm.value.name]
            ])])]), createElementVNode("div", candidateModalFootAttrs, [createElementVNode(
              "button", {
                class: "modal-btn ghost",
                disabled: candidateSaving.value,
                onClick: closeCandidateModal
              }, "取消", 8, candidateCancelPatchFlags), createElementVNode("button", {
                class: "modal-btn primary",
                disabled: candidateSaving.value,
                onClick: confirmSaveCandidate
              }, toDisplayString(candidateSaving.value ? "保存中..." : "保存"), 9,
              candidateSavePatchFlags)])])])) : createCommentVNode("", !0)
        ]);
      };
    }
  }),
  ScopedTallyActivityEditPage = withScopeId(TallyActivityEditPageComponent, [
    ["__scopeId", "data-v-4c5e1dfb"]
  ]);
/* index 运行时导出（已语义化） */
export {
  ScopedTallyActivityEditPage as
  default
};