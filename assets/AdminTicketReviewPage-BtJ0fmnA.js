/*!
 * 页面模块：审票管理（AdminTicketReviewPage）
 * 路由：/admin/tickets/:id/review   name=admin-tickets-review   层级=4   需登录=是
 * 功能：登录后的「审票管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/AdminTicketReviewPage-BtJ0fmnA.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, withDirectives, deepDirectiveOptions, renderList, withModifiers, vModelText, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { reviewAdminTicketActivities as getAdminTicketActivityReviews, reviewAdminTicketTickets as reviewTicket, batchReviewAdminTicketTickets as batchReviewTicket, exportAdminTicketActivity, getAdminTicketActivitiesById as getAdminTicketActivity } from "./ticket-SMxxVFG1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const be = {
    class: "page-container"
  },
  me = {
    class: "page-content"
  },
  he = {
    class: "content-container"
  },
  _e = {
    class: "breadcrumb-wrapper"
  },
  ke = {
    key: 0,
    class: "loading-container"
  },
  ye = {
    class: "page-header-section"
  },
  we = {
    class: "page-subtitle"
  },
  Ce = {
    class: "filter-section"
  },
  xe = {
    class: "filter-row"
  },
  $e = {
    class: "status-tabs"
  },
  Te = ["disabled"],
  Ie = {
    key: 0,
    class: "session-filter"
  },
  Me = ["value"],
  Ae = {
    key: 0,
    class: "batch-actions"
  },
  Se = {
    class: "select-all"
  },
  Ne = ["checked"],
  Re = {
    class: "batch-buttons"
  },
  Pe = ["disabled"],
  je = ["disabled"],
  Be = {
    key: 1,
    class: "empty-container"
  },
  Ve = {
    key: 2,
    class: "tickets-list"
  },
  De = {
    key: 0,
    class: "ticket-checkbox"
  },
  Fe = ["checked", "onChange"],
  ze = {
    class: "ticket-info"
  },
  Le = {
    class: "ticket-header"
  },
  Ee = ["onClick"],
  Ue = {
    class: "ticket-user"
  },
  qe = {
    class: "user-name"
  },
  He = {
    class: "user-id"
  },
  Oe = {
    class: "ticket-meta"
  },
  Ze = {
    key: 0,
    class: "ticket-extra"
  },
  Ge = {
    key: 1,
    class: "ticket-actions"
  },
  Je = ["onClick"],
  Ke = ["onClick"],
  Qe = {
    key: 3,
    class: "pagination"
  },
  We = ["disabled"],
  Xe = {
    class: "page-info"
  },
  Ye = ["disabled"],
  es = {
    class: "modal-content"
  },
  ss = {
    class: "modal-title"
  },
  ts = {
    class: "modal-desc"
  },
  as = {
    class: "form-group"
  },
  ls = {
    class: "modal-actions"
  },
  os = ["disabled"],
  ns = ["disabled"],
  is = defineComponent({
    __name: "AdminTicketReviewPage",
    setup(us) {
      const useRouter1 = useRouter(),
        val = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val2 = applyDirectives(() => Number(val.params.id)),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref(null),
        refVal4 = ref([]),
        refVal5 = ref(0),
        refVal6 = ref(1),
        refVal7 = ref(20),
        refVal8 = ref("pending"),
        refVal9 = ref("all"),
        refVal10 = ref(!1),
        refVal11 = ref([]),
        val3 = applyDirectives(() => refVal4.value.length === 0 ? !1 : refVal4.value.every(val1 => refVal11.value.includes(val1.id))),
        refVal12 = ref(!1),
        refVal13 = ref("approve"),
        refVal14 = ref(""),
        refVal15 = ref([]);
      /* 调用接口：获取单个活动管理详情（异步请求） */
      async function zz0() {
        try {
          const adminTicketActivity = await getAdminTicketActivity(val2.value);
          adminTicketActivity.data.code === 200 ? refVal3.value = adminTicketActivity.data.data : (useToast1.error(adminTicketActivity.data.message || "获取活动信息失败"), useRouter1.push("/admin/tickets"));
        } catch {
          useToast1.error("获取活动信息失败"), useRouter1.push("/admin/tickets");
        }
      }
      /* 调用接口：获取活动审核列表（异步请求） */
      async function zz1() {
        try {
          const val1 = refVal8.value === "all" ? void 0 : refVal8.value,
            val4 = refVal9.value === "all" ? void 0 : refVal9.value,
            adminTicketActivityReviews = await getAdminTicketActivityReviews(val2.value, refVal6.value, refVal7.value, val1, val4);
          adminTicketActivityReviews.data.code === 200 ? (refVal4.value = adminTicketActivityReviews.data.data.tickets, refVal5.value = adminTicketActivityReviews.data.data.total) : useToast1.error(adminTicketActivityReviews.data.message || "获取票据列表失败");
        } catch {
          useToast1.error("获取票据列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      async function zz2() {
        refVal.value = !0, await zz0(), await zz1();
      }
      function zz3() {
        val3.value ? refVal11.value = [] : refVal11.value = refVal4.value.map(val1 => val1.id);
      }
      function zz4(val1) {
        const val4 = refVal11.value.indexOf(val1);
        val4 > -1 ? refVal11.value.splice(val4, 1) : refVal11.value.push(val1);
      }
      function zz5(val1, val4) {
        refVal15.value = [val1.id], refVal13.value = val4, refVal14.value = "", refVal12.value = !0;
      }
      function zz6(val1) {
        if (refVal11.value.length === 0) {
          useToast1.error("请先选择票据");
          return;
        }
        refVal15.value = [...refVal11.value], refVal13.value = val1, refVal14.value = "", refVal12.value = !0;
      }
      /* 调用接口：审核单张票据、批量审核票据（异步请求） */
      async function zz7() {
        if (refVal15.value.length !== 0) {
          refVal2.value = !0;
          try {
            if (refVal15.value.length === 1) {
              const val1 = refVal15.value[0];
              if (val1 === void 0) return;
              const val4 = await reviewTicket(val1, {
                action: refVal13.value,
                adminNote: refVal14.value || void 0
              });
              val4.data.code === 200 ? (useToast1.success("审核成功"), refVal12.value = !1, refVal11.value = [], zz1()) : useToast1.error(val4.data.message || "审核失败");
            } else {
              const val1 = await batchReviewTicket({
                ticketIds: refVal15.value,
                action: refVal13.value,
                adminNote: refVal14.value || void 0
              });
              val1.data.code === 200 ? (useToast1.success(`审核完成：成功 ${val1.data.data.success_count} 张，失败 ${val1.data.data.failed_count} 张`), refVal12.value = !1, refVal11.value = [], zz1()) : useToast1.error(val1.data.message || "审核失败");
            }
          } catch {
            useToast1.error("审核失败");
          } finally {
            refVal2.value = !1;
          }
        }
      }
      function zz8(val1) {
        return {
          pending: {
            label: "待审核",
            class: "status-pending"
          },
          confirmed: {
            label: "已确认",
            class: "status-confirmed"
          },
          used: {
            label: "已使用",
            class: "status-used"
          },
          cancelled: {
            label: "已取消",
            class: "status-cancelled"
          }
        }[val1] || {
          label: val1,
          class: ""
        };
      }
      function zz9(val1) {
        return new Date(val1).toLocaleString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz10(val1) {
        navigator.clipboard.writeText(val1).then(() => {
          useToast1.success("已复制票码");
        });
      }
      /* 调用接口：导出活动数据（异步请求） */
      async function zz11() {
        if (!refVal10.value) {
          refVal10.value = !0;
          try {
            const val1 = refVal8.value === "all" ? void 0 : refVal8.value,
              val4 = refVal9.value === "all" ? void 0 : refVal9.value,
              val5 = await exportAdminTicketActivity(val2.value, val1, val4);
            val5.success ? useToast1.success("导出成功") : useToast1.error(val5.error || "导出失败，请稍后重试");
          } catch {
            useToast1.error("导出失败，请稍后重试");
          } finally {
            refVal10.value = !1;
          }
        }
      }
      return watch(refVal8, () => {
        refVal6.value = 1, refVal11.value = [], zz1();
      }), watch(refVal9, () => {
        refVal6.value = 1, refVal11.value = [], zz1();
      }), onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageTickets) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz2();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", be, [createVNode(PageHeader, {
        "back-to": `/admin/tickets/${val2.value}`
      }, null, 8, ["back-to"]), createElementVNode("main", me, [createElementVNode("div", he, [createElementVNode("div", _e, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", ke, [...(val4[12] || (val4[12] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ye, [val4[13] || (val4[13] = createElementVNode("h1", {
        class: "page-title"
      }, "审票管理", -1)), createElementVNode("p", we, toDisplayString(refVal3.value?.name), 1)]), createElementVNode("div", Ce, [createElementVNode("div", xe, [createElementVNode("div", $e, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === "pending"
        }]),
        onClick: val4[0] || (val4[0] = val5 => refVal8.value = "pending")
      }, " 待审核 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === "confirmed"
        }]),
        onClick: val4[1] || (val4[1] = val5 => refVal8.value = "confirmed")
      }, " 已确认 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === "used"
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal8.value = "used")
      }, " 已使用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === "all"
        }]),
        onClick: val4[3] || (val4[3] = val5 => refVal8.value = "all")
      }, " 全部 ", 2)]), createElementVNode("button", {
        class: "export-btn",
        onClick: zz11,
        disabled: refVal10.value
      }, [val4[14] || (val4[14] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }), createElementVNode("polyline", {
        points: "7 10 12 15 17 10"
      }), createElementVNode("line", {
        x1: "12",
        y1: "15",
        x2: "12",
        y2: "3"
      })], -1)), createTextVNode(" " + toDisplayString(refVal10.value ? "导出中..." : "导出"), 1)], 8, Te)]), refVal3.value && refVal3.value.sessions.length > 1 ? (openBlock(), createElementBlock("div", Ie, [val4[16] || (val4[16] = createElementVNode("label", {
        class: "filter-label"
      }, "档期：", -1)), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val4[4] || (val4[4] = val5 => refVal9.value = val5),
        class: "filter-select"
      }, [val4[15] || (val4[15] = createElementVNode("option", {
        value: "all"
      }, "全部档期", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value.sessions, val5 => (openBlock(), createElementBlock("option", {
        key: val5.id,
        value: val5.id
      }, toDisplayString(val5.name), 9, Me))), 128))], 512), [[deepDirectiveOptions, refVal9.value]])])) : createCommentVNode("", !0)]), refVal4.value.length > 0 && refVal8.value === "pending" ? (openBlock(), createElementBlock("div", Ae, [createElementVNode("label", Se, [createElementVNode("input", {
        type: "checkbox",
        checked: val3.value,
        onChange: zz3
      }, null, 40, Ne), val4[17] || (val4[17] = createElementVNode("span", null, "全选", -1))]), createElementVNode("div", Re, [createElementVNode("button", {
        class: "batch-btn approve",
        disabled: refVal11.value.length === 0,
        onClick: val4[5] || (val4[5] = val5 => zz6("approve"))
      }, " 批量通过 (" + toDisplayString(refVal11.value.length) + ") ", 9, Pe), createElementVNode("button", {
        class: "batch-btn reject",
        disabled: refVal11.value.length === 0,
        onClick: val4[6] || (val4[6] = val5 => zz6("reject"))
      }, " 批量驳回 (" + toDisplayString(refVal11.value.length) + ") ", 9, je)])])) : createCommentVNode("", !0), refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Be, [val4[18] || (val4[18] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M9 12l2 2 4-4"
      }), createElementVNode("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      })])], -1)), val4[19] || (val4[19] = createElementVNode("h2", null, "暂无票据", -1)), createElementVNode("p", null, "没有" + toDisplayString(refVal8.value === "all" ? "" : "该状态的") + "票据", 1)])) : (openBlock(), createElementBlock("div", Ve, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: normalizeClass(["ticket-card", {
          selected: refVal11.value.includes(val5.id)
        }])
      }, [refVal8.value === "pending" ? (openBlock(), createElementBlock("div", De, [createElementVNode("input", {
        type: "checkbox",
        checked: refVal11.value.includes(val5.id),
        onChange: val6 => zz4(val5.id)
      }, null, 40, Fe)])) : createCommentVNode("", !0), createElementVNode("div", ze, [createElementVNode("div", Le, [createElementVNode("span", {
        class: "ticket-code",
        onClick: val6 => zz10(val5.ticketCode)
      }, toDisplayString(val5.ticketCode), 9, Ee), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz8(val5.status).class])
      }, toDisplayString(zz8(val5.status).label), 3)]), createElementVNode("div", Ue, [createElementVNode("span", qe, toDisplayString(val5.nickname || val5.username), 1), createElementVNode("span", He, "@" + toDisplayString(val5.username), 1)]), createElementVNode("div", Oe, [createElementVNode("span", null, toDisplayString(val5.sessionName), 1), val4[20] || (val4[20] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", null, toDisplayString(zz9(val5.createdAt)), 1)]), val5.userInfo && Object.keys(val5.userInfo).length > 0 ? (openBlock(), createElementBlock("div", Ze, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.userInfo, (val6, val7) => (openBlock(), createElementBlock("span", {
        key: val7,
        class: "extra-item"
      }, toDisplayString(val7) + ": " + toDisplayString(val6), 1))), 128))])) : createCommentVNode("", !0)]), val5.status === "pending" ? (openBlock(), createElementBlock("div", Ge, [createElementVNode("button", {
        class: "action-btn approve",
        onClick: val6 => zz5(val5, "approve")
      }, " 通过 ", 8, Je), createElementVNode("button", {
        class: "action-btn reject",
        onClick: val6 => zz5(val5, "reject")
      }, " 驳回 ", 8, Ke)])) : createCommentVNode("", !0)], 2))), 128))])), refVal5.value > refVal7.value ? (openBlock(), createElementBlock("div", Qe, [createElementVNode("button", {
        class: "page-btn",
        disabled: refVal6.value === 1,
        onClick: val4[7] || (val4[7] = val5 => {
          refVal6.value--, zz1();
        })
      }, " 上一页 ", 8, We), createElementVNode("span", Xe, toDisplayString(refVal6.value) + " / " + toDisplayString(Math.ceil(refVal5.value / refVal7.value)), 1), createElementVNode("button", {
        class: "page-btn",
        disabled: refVal6.value >= Math.ceil(refVal5.value / refVal7.value),
        onClick: val4[8] || (val4[8] = val5 => {
          refVal6.value++, zz1();
        })
      }, " 下一页 ", 8, Ye)])) : createCommentVNode("", !0)], 64))])]), createVNode(PageFooter), refVal12.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: val4[11] || (val4[11] = withModifiers(val5 => refVal12.value = !1, ["self"]))
      }, [createElementVNode("div", es, [createElementVNode("h3", ss, toDisplayString(refVal13.value === "approve" ? "确认通过" : "确认驳回"), 1), createElementVNode("p", ts, toDisplayString(refVal15.value.length === 1 ? "即将审核 1 张票据" : `即将批量审核 ${refVal15.value.length} 张票据`), 1), createElementVNode("div", as, [val4[21] || (val4[21] = createElementVNode("label", {
        class: "form-label"
      }, "备注（可选）", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val4[9] || (val4[9] = val5 => refVal14.value = val5),
        class: "form-textarea",
        placeholder: "添加审核备注...",
        rows: "2"
      }, null, 512), [[vModelText, refVal14.value]])]), createElementVNode("div", ls, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: val4[10] || (val4[10] = val5 => refVal12.value = !1),
        disabled: refVal2.value
      }, " 取消 ", 8, os), createElementVNode("button", {
        class: normalizeClass(["modal-btn confirm", {
          danger: refVal13.value === "reject"
        }]),
        onClick: zz7,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "处理中..." : refVal13.value === "approve" ? "确认通过" : "确认驳回"), 11, ns)])])])) : createCommentVNode("", !0)]));
    }
  }),
  fs = withScopeId(is, [["__scopeId", "data-v-866c3ef1"]]);
/* index 运行时导出（已语义化） */
export { fs as default };