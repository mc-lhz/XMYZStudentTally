/*!
 * 页面模块：验票核销（AdminVerifyPage）
 * 路由：/admin/tickets/verify   name=admin-tickets-verify   层级=3   需登录=是
 * 功能：登录后的「验票核销」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/AdminVerifyPage-BoopLU4m.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, normalizeClass, createCommentVNode, toDisplayString, createTextVNode, Fragment, withDirectives, vModelText, renderList, nextTick, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { verifyAdminTicket as verifyTicket, useAdminTicketVerify as useTicket } from "./ticket-SMxxVFG1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：content-container */
/* 模板属性配置：breadcrumb-wrapper */
const AdminVerifyPageConfig = {
    class: "page-container"
  },
  AdminVerifyPageConfig_2 = {
    class: "page-content"
  },
  AdminVerifyPageConfig_3 = {
    class: "content-container"
  },
  AdminVerifyPageConfig_4 = {
    class: "breadcrumb-wrapper"
  },
  AdminVerifyPageConfig_5 = {
    key: 0,
    class: "result-section"
  },
  ee = {
    class: "result-icon"
  },
  se = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  te = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  ae = {
    class: "result-title"
  },
  le = {
    key: 0,
    class: "result-details"
  },
  ne = {
    key: 0
  },
  oe = {
    class: "search-section"
  },
  ie = {
    class: "search-box"
  },
  ue = ["disabled"],
  re = {
    key: 0,
    class: "error-section"
  },
  ce = {
    class: "error-card"
  },
  de = {
    key: 1,
    class: "ticket-section"
  },
  ve = {
    class: "ticket-card"
  },
  fe = {
    class: "ticket-header"
  },
  pe = {
    class: "ticket-code"
  },
  _e = {
    class: "ticket-info"
  },
  me = {
    class: "info-row"
  },
  ke = {
    class: "info-value"
  },
  ye = {
    class: "info-row"
  },
  ge = {
    class: "info-value"
  },
  he = {
    class: "info-row"
  },
  be = {
    class: "info-value"
  },
  xe = {
    class: "info-row"
  },
  we = {
    class: "info-value"
  },
  Ne = {
    key: 0,
    class: "info-row"
  },
  Ce = {
    class: "info-value"
  },
  Ae = {
    key: 1,
    class: "info-row"
  },
  Ue = {
    class: "info-value"
  },
  Te = {
    key: 0,
    class: "extra-info"
  },
  Ve = {
    class: "extra-content"
  },
  Pe = {
    class: "extra-label"
  },
  Se = {
    class: "extra-value"
  },
  Be = {
    class: "ticket-actions"
  },
  Me = ["disabled"],
  Ie = {
    key: 1,
    class: "status-hint"
  },
  De = defineComponent({
    __name: "AdminVerifyPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(""),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref(null),
        refVal5 = ref(""),
        refVal6 = ref(!1),
        refVal7 = ref(!1),
        refVal8 = ref(""),
        refVal9 = ref({}),
        refVal10 = ref(null);
      /* 调用接口：验票查询（校验票码）（异步请求） */
      async function zz0() {
        const val1 = refVal.value.trim().toUpperCase();
        if (!val1) {
          useToast1.error("请输入票码");
          return;
        }
        if (val1.length !== 5) {
          useToast1.error("票码应为5位");
          return;
        }
        refVal2.value = !0, refVal5.value = "", refVal4.value = null;
        try {
          const val2 = await verifyTicket(val1);
          val2.data.code === 200 ? refVal4.value = val2.data.data : refVal5.value = val2.data.message || "未找到票据";
        } catch {
          refVal5.value = "查询失败，请重试";
        } finally {
          refVal2.value = !1;
        }
      }
      /* 调用接口：核销票据（异步请求） */
      async function zz1() {
        if (refVal4.value) {
          refVal3.value = !0;
          try {
            const ticket = await useTicket(refVal4.value.ticketCode);
            if (ticket.data.code === 200) {
              const val2 = ticket.data.data;
              val2.success ? (refVal7.value = !0, refVal8.value = val2.message || "核销成功", refVal9.value = {
                userName: val2.userName,
                activityName: val2.activityName,
                sessionName: val2.sessionName,
                usedAt: val2.usedAt
              }) : (refVal7.value = !1, refVal8.value = val2.message || "核销失败"), refVal6.value = !0;
            } else useToast1.error(ticket.data.message || "核销失败");
          } catch {
            useToast1.error("核销失败，请重试");
          } finally {
            refVal3.value = !1;
          }
        }
      }
      function zz2() {
        refVal.value = "", refVal4.value = null, refVal5.value = "", refVal6.value = !1, refVal7.value = !1, refVal8.value = "", refVal9.value = {}, nextTick(() => {
          refVal10.value?.focus();
        });
      }
      function zz3() {
        refVal6.value = !1, refVal.value = "", refVal4.value = null, nextTick(() => {
          refVal10.value?.focus();
        });
      }
      function zz4(val1) {
        return {
          pending: {
            label: "待审核",
            class: "status-pending",
            canUse: !1
          },
          confirmed: {
            label: "已确认",
            class: "status-confirmed",
            canUse: !0
          },
          used: {
            label: "已使用",
            class: "status-used",
            canUse: !1
          },
          cancelled: {
            label: "已取消",
            class: "status-cancelled",
            canUse: !1
          }
        }[val1] || {
          label: val1,
          class: "",
          canUse: !1
        };
      }
      function zz5(val1) {
        return new Date(val1).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz6(val1) {
        val1.key === "Enter" && zz0();
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageTickets) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        refVal10.value?.focus();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", AdminVerifyPageConfig, [createVNode(PageHeader, {
        "back-to": "/admin/tickets"
      }), createElementVNode("main", AdminVerifyPageConfig_2, [createElementVNode("div", AdminVerifyPageConfig_3, [createElementVNode("div", AdminVerifyPageConfig_4, [createVNode(PageBreadcrumb)]), val2[16] || (val2[16] = createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "验票核销"), createElementVNode("p", {
        class: "page-subtitle"
      }, "输入票码查询并核销票据")], -1)), refVal6.value ? (openBlock(), createElementBlock("div", AdminVerifyPageConfig_5, [createElementVNode("div", {
        class: normalizeClass(["result-card", {
          success: refVal7.value,
          error: !refVal7.value
        }])
      }, [createElementVNode("div", ee, [refVal7.value ? (openBlock(), createElementBlock("svg", se, [...(val2[1] || (val2[1] = [createElementVNode("path", {
        d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }, null, -1), createElementVNode("polyline", {
        points: "22 4 12 14.01 9 11.01"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", te, [...(val2[2] || (val2[2] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }, null, -1), createElementVNode("line", {
        x1: "15",
        y1: "9",
        x2: "9",
        y2: "15"
      }, null, -1), createElementVNode("line", {
        x1: "9",
        y1: "9",
        x2: "15",
        y2: "15"
      }, null, -1)]))]))]), createElementVNode("h2", ae, toDisplayString(refVal8.value), 1), refVal7.value && refVal9.value.userName ? (openBlock(), createElementBlock("div", le, [createElementVNode("p", null, [val2[3] || (val2[3] = createElementVNode("strong", null, "用户：", -1)), createTextVNode(toDisplayString(refVal9.value.userName), 1)]), createElementVNode("p", null, [val2[4] || (val2[4] = createElementVNode("strong", null, "活动：", -1)), createTextVNode(toDisplayString(refVal9.value.activityName), 1)]), createElementVNode("p", null, [val2[5] || (val2[5] = createElementVNode("strong", null, "档期：", -1)), createTextVNode(toDisplayString(refVal9.value.sessionName), 1)]), refVal9.value.usedAt ? (openBlock(), createElementBlock("p", ne, [val2[6] || (val2[6] = createElementVNode("strong", null, "核销时间：", -1)), createTextVNode(toDisplayString(zz5(refVal9.value.usedAt)), 1)])) : createCommentVNode("", !0)])) : createCommentVNode("", !0), createElementVNode("button", {
        class: "continue-btn",
        onClick: zz3
      }, " 继续验票 ")], 2)])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", oe, [createElementVNode("div", ie, [withDirectives(createElementVNode("input", {
        ref_key: "inputRef",
        ref: refVal10,
        "onUpdate:modelValue": val2[0] || (val2[0] = val3 => refVal.value = val3),
        type: "text",
        class: "search-input",
        placeholder: "请输入5位票码",
        maxlength: "5",
        onKeydown: zz6
      }, null, 544), [[vModelText, refVal.value]]), createElementVNode("button", {
        class: "search-btn",
        onClick: zz0,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "查询中..." : "查询"), 9, ue)]), val2[7] || (val2[7] = createElementVNode("p", {
        class: "search-hint"
      }, "输入票码后按回车或点击查询按钮", -1))]), refVal5.value ? (openBlock(), createElementBlock("div", re, [createElementVNode("div", ce, [val2[8] || (val2[8] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "12"
      }), createElementVNode("line", {
        x1: "12",
        y1: "16",
        x2: "12.01",
        y2: "16"
      })], -1)), createElementVNode("p", null, toDisplayString(refVal5.value), 1), createElementVNode("button", {
        class: "retry-btn",
        onClick: zz2
      }, "重新输入")])])) : createCommentVNode("", !0), refVal4.value ? (openBlock(), createElementBlock("div", de, [createElementVNode("div", ve, [createElementVNode("div", fe, [createElementVNode("div", pe, toDisplayString(refVal4.value.ticketCode), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz4(refVal4.value.status).class])
      }, toDisplayString(zz4(refVal4.value.status).label), 3)]), createElementVNode("div", _e, [createElementVNode("div", me, [val2[9] || (val2[9] = createElementVNode("span", {
        class: "info-label"
      }, "用户", -1)), createElementVNode("span", ke, toDisplayString(refVal4.value.nickname || refVal4.value.username), 1)]), createElementVNode("div", ye, [val2[10] || (val2[10] = createElementVNode("span", {
        class: "info-label"
      }, "活动", -1)), createElementVNode("span", ge, toDisplayString(refVal4.value.activityName), 1)]), createElementVNode("div", he, [val2[11] || (val2[11] = createElementVNode("span", {
        class: "info-label"
      }, "档期", -1)), createElementVNode("span", be, toDisplayString(refVal4.value.sessionName), 1)]), createElementVNode("div", xe, [val2[12] || (val2[12] = createElementVNode("span", {
        class: "info-label"
      }, "抢票时间", -1)), createElementVNode("span", we, toDisplayString(zz5(refVal4.value.createdAt)), 1)]), refVal4.value.confirmedAt ? (openBlock(), createElementBlock("div", Ne, [val2[13] || (val2[13] = createElementVNode("span", {
        class: "info-label"
      }, "确认时间", -1)), createElementVNode("span", Ce, toDisplayString(zz5(refVal4.value.confirmedAt)), 1)])) : createCommentVNode("", !0), refVal4.value.usedAt ? (openBlock(), createElementBlock("div", Ae, [val2[14] || (val2[14] = createElementVNode("span", {
        class: "info-label"
      }, "使用时间", -1)), createElementVNode("span", Ue, toDisplayString(zz5(refVal4.value.usedAt)), 1)])) : createCommentVNode("", !0)]), refVal4.value.userInfo && Object.keys(refVal4.value.userInfo).length > 0 ? (openBlock(), createElementBlock("div", Te, [val2[15] || (val2[15] = createElementVNode("h3", {
        class: "extra-title"
      }, "用户填写信息", -1)), createElementVNode("div", Ve, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value.userInfo, (val3, val4) => (openBlock(), createElementBlock("div", {
        key: val4,
        class: "extra-row"
      }, [createElementVNode("span", Pe, toDisplayString(val4), 1), createElementVNode("span", Se, toDisplayString(val3), 1)]))), 128))])])) : createCommentVNode("", !0), createElementVNode("div", Be, [createElementVNode("button", {
        class: "reset-btn",
        onClick: zz2
      }, " 重新查询 "), zz4(refVal4.value.status).canUse ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "use-btn",
        onClick: zz1,
        disabled: refVal3.value
      }, toDisplayString(refVal3.value ? "核销中..." : "确认核销"), 9, Me)) : (openBlock(), createElementBlock("div", Ie, [refVal4.value.status === "pending" ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createTextVNode(" 该票据尚未审核通过，无法核销 ")], 64)) : refVal4.value.status === "used" ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createTextVNode(" 该票据已于 " + toDisplayString(zz5(refVal4.value.usedAt)) + " 使用 ", 1)], 64)) : refVal4.value.status === "cancelled" ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [createTextVNode(" 该票据已被取消 ")], 64)) : createCommentVNode("", !0)]))])])])) : createCommentVNode("", !0)], 64))])]), createVNode(PageFooter)]));
    }
  }),
  Ke = withScopeId(De, [["__scopeId", "data-v-7650d2f4"]]);
/* index 运行时导出（已语义化） */
export { Ke as default };