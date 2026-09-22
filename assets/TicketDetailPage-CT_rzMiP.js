/*!
 * 页面模块：活动详情（TicketDetailPage）
 * 路由：/ticket/:id   name=ticket-detail   层级=2   需登录=否
 * 功能：公开的「活动详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TicketDetailPage-CT_rzMiP.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, directiveUm, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, renderList, toDisplayValue, withSlots, useToast, useRouter, withModifiers, withDirectives, vModelText, directiveHooks, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { getTicketActivitiesById as getTicketActivity, getTicketsMyActivityById as getMyActivityTickets, grabTickets as grabTicket } from "./ticket-SMxxVFG1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const ye = {
    class: "page-container"
  },
  he = {
    class: "page-content"
  },
  we = {
    class: "content-container"
  },
  xe = {
    class: "breadcrumb-wrapper"
  },
  Ce = {
    key: 0,
    class: "loading-container"
  },
  Te = {
    class: "activity-header"
  },
  Me = {
    key: 0,
    class: "activity-cover"
  },
  Be = ["src", "alt"],
  qe = {
    class: "activity-info"
  },
  Ie = {
    class: "activity-title-row"
  },
  $e = {
    class: "activity-title"
  },
  Se = {
    key: 0,
    class: "activity-desc"
  },
  Ve = {
    class: "activity-meta"
  },
  De = {
    key: 0,
    class: "meta-tag campus"
  },
  Pe = {
    key: 1,
    class: "meta-tag approval"
  },
  Ge = {
    class: "meta-tag limit"
  },
  ze = {
    key: 0,
    class: "campus-notice"
  },
  Ue = {
    key: 1,
    class: "campus-notice warning"
  },
  Ee = {
    class: "sessions-section"
  },
  Le = {
    key: 0,
    class: "empty-sessions"
  },
  Ne = {
    key: 1,
    class: "sessions-list"
  },
  Re = {
    class: "session-main"
  },
  Fe = {
    class: "session-info"
  },
  Ae = {
    class: "session-name"
  },
  He = {
    key: 0,
    class: "session-desc"
  },
  je = {
    class: "session-time"
  },
  We = {
    class: "session-stats"
  },
  Je = {
    class: "tickets-count"
  },
  Ke = {
    class: "available"
  },
  Oe = {
    class: "total"
  },
  Qe = {
    class: "session-footer"
  },
  Xe = {
    key: 0,
    class: "countdown"
  },
  Ye = {
    key: 1,
    class: "has-ticket-hint"
  },
  Ze = ["disabled", "onClick"],
  et = {
    class: "grab-form"
  },
  tt = {
    class: "form-label"
  },
  st = {
    key: 0,
    class: "required"
  },
  at = ["onUpdate:modelValue", "placeholder"],
  it = ["onUpdate:modelValue", "type", "placeholder"],
  ot = {
    class: "modal-actions"
  },
  nt = ["disabled"],
  lt = ["disabled"],
  rt = {
    class: "ticket-code"
  },
  ct = {
    class: "ticket-code-hint"
  },
  ut = defineComponent({
    __name: "TicketDetailPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(!1),
        refVal5 = ref(null),
        refVal6 = ref(!1),
        refVal7 = ref({}),
        refVal8 = ref(!1),
        refVal9 = ref(""),
        refVal10 = ref({});
      let val4 = null;
      const val5 = applyDirectives(() => refVal2.value?.config?.require_campus_binding ?? !1),
        val6 = applyDirectives(() => useUserStore1.campusBinding?.isBound ?? !1),
        val7 = applyDirectives(() => useUserStore1.campusBinding?.isClassInfoExpired ?? !1),
        val8 = applyDirectives(() => val5.value ? val6.value && !val7.value : !0);
      /* 调用接口：获取活动详情（票务）、获取我参与的某活动票据（异步请求） */
      async function zz0() {
        try {
          const [val1, val9] = await Promise.all([getTicketActivity(val3.value), getMyActivityTickets(val3.value)]);
          val1.data.code === 200 ? (refVal2.value = val1.data.data, zz1(), refVal2.value?.config?.require_campus_binding && (await useUserStore1.fetchCampusBinding())) : (useToast1.error(val1.data.message || "获取活动详情失败"), useRouter1.push("/ticket")), val9.data.code === 200 && (refVal3.value = val9.data.data.tickets);
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/ticket");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1() {
        refVal2.value?.config?.extra_info_fields && (refVal7.value = {}, refVal2.value.config.extra_info_fields.forEach(val1 => {
          refVal7.value[val1.name] = "";
        }));
      }
      function zz2(val1) {
        if (!val1.canGrab) {
          val1.status === "waiting" ? useToast1.info("该场次尚未开始抢票") : val1.status === "ended" ? useToast1.info("该场次已结束") : val1.availableTickets <= 0 && useToast1.info("该场次票已售罄");
          return;
        }
        if (refVal3.value.find(val10 => val10.sessionId === val1.id && val10.status !== "cancelled")) {
          useToast1.warning("您已有该场次的票据");
          return;
        }
        const val9 = refVal2.value?.config?.max_tickets_per_user || 1;
        if (refVal3.value.filter(val10 => val10.status !== "cancelled").length >= val9) {
          useToast1.warning(`每人最多抢 ${val9} 张票`);
          return;
        }
        if (refVal2.value?.config?.require_campus_binding) {
          if (!useUserStore1.campusBinding?.isBound) {
            useToast1.warning("该活动需要绑定校园网账号");
            return;
          }
          if (useUserStore1.campusBinding?.isClassInfoExpired) {
            useToast1.warning("校园网账号需要更新，请重新绑定");
            return;
          }
        }
        refVal5.value = val1, refVal2.value?.config?.require_extra_info && refVal2.value.config.extra_info_fields?.length ? refVal6.value = !0 : zz3();
      }
      /* 调用接口：抢票（锁定/下单名额）、获取我参与的某活动票据、获取活动详情（票务）（异步请求） */
      async function zz3() {
        if (refVal5.value) {
          if (refVal2.value?.config?.require_extra_info && refVal2.value.config.extra_info_fields?.length) {
            for (const zz4 of refVal2.value.config.extra_info_fields) if (zz4.required && !refVal7.value[zz4.name]?.trim()) {
              useToast1.warning(`请填写${zz4.label}`);
              return;
            }
          }
          refVal4.value = !0;
          try {
            const obj = {
              sessionId: refVal5.value.id
            };
            refVal2.value?.config?.require_extra_info && (obj.userInfo = {
              ...refVal7.value
            });
            const val1 = await grabTicket(obj);
            if (val1.data.code === 200 && val1.data.data.success) {
              refVal6.value = !1, refVal9.value = val1.data.data.ticketCode || "", refVal8.value = !0;
              const myActivityTickets = await getMyActivityTickets(val3.value);
              myActivityTickets.data.code === 200 && (refVal3.value = myActivityTickets.data.data.tickets);
              const ticketActivity = await getTicketActivity(val3.value);
              ticketActivity.data.code === 200 && (refVal2.value = ticketActivity.data.data);
            } else useToast1.error(val1.data.data?.message || val1.data.message || "抢票失败");
          } catch {
            useToast1.error("抢票失败，请重试");
          } finally {
            refVal4.value = !1;
          }
        }
      }
      function zz5() {
        refVal6.value = !1, refVal5.value = null, zz1();
      }
      function zz6() {
        refVal8.value = !1, refVal9.value = "";
      }
      function zz7() {
        useRouter1.push("/ticket/my");
      }
      function zz8() {
        useRouter1.push("/profile");
      }
      function zz9(val1) {
        return {
          active: {
            label: "进行中",
            class: "status-active"
          },
          published: {
            label: "即将开始",
            class: "status-published"
          },
          ended: {
            label: "已结束",
            class: "status-ended"
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
      function zz10(val1) {
        return val1.status === "cancelled" ? {
          label: "已取消",
          class: "session-cancelled"
        } : val1.status === "ended" ? {
          label: "已结束",
          class: "session-ended"
        } : val1.status === "waiting" ? {
          label: "未开始",
          class: "session-waiting"
        } : val1.availableTickets <= 0 ? {
          label: "已售罄",
          class: "session-soldout"
        } : {
          label: "抢票中",
          class: "session-active"
        };
      }
      function zz11(val1) {
        return new Date(val1).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz12(val1) {
        const time = new Date().getTime(),
          val10 = new Date(val1).getTime() - time;
        if (val10 <= 0) return "";
        const val11 = Math.floor(val10 / (1e3 * 60 * 60 * 24)),
          val12 = Math.floor(val10 % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
          val13 = Math.floor(val10 % (1e3 * 60 * 60) / (1e3 * 60)),
          val14 = Math.floor(val10 % (1e3 * 60) / 1e3);
        return val11 > 0 ? `${val11}天${val12}小时后开始` : val12 > 0 ? `${val12}小时${val13}分钟后开始` : val13 > 0 ? `${val13}分${val14}秒后开始` : `${val14}秒后开始`;
      }
      function zz13() {
        if (!refVal2.value?.sessions) return;
        const obj = {};
        refVal2.value.sessions.forEach(val1 => {
          val1.status === "waiting" && (obj[val1.id] = zz12(val1.startTime));
        }), refVal10.value = obj;
      }
      function zz14(val1) {
        return refVal3.value.some(val9 => val9.sessionId === val1 && val9.status !== "cancelled");
      }
      return onMounted(() => {
        zz0(), val4 = setInterval(zz13, 1e3);
      }), directiveUm(() => {
        val4 && clearInterval(val4);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val9) => (openBlock(), createElementBlock("div", ye, [createVNode(PageHeader, {
        "back-to": "/ticket"
      }), createElementVNode("main", he, [createElementVNode("div", we, [createElementVNode("div", xe, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", Ce, [...(val9[2] || (val9[2] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Te, [refVal2.value.imageUrl ? (openBlock(), createElementBlock("div", Me, [createElementVNode("img", {
        src: refVal2.value.imageUrl,
        alt: refVal2.value.name
      }, null, 8, Be)])) : createCommentVNode("", !0), createElementVNode("div", qe, [createElementVNode("div", Ie, [createElementVNode("h1", $e, toDisplayString(refVal2.value.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-tag", zz9(refVal2.value.status).class])
      }, toDisplayString(zz9(refVal2.value.status).label), 3)]), refVal2.value.description ? (openBlock(), createElementBlock("p", Se, toDisplayString(refVal2.value.description), 1)) : createCommentVNode("", !0), createElementVNode("div", Ve, [refVal2.value.config.require_campus_binding ? (openBlock(), createElementBlock("span", De, [...(val9[3] || (val9[3] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M22 10v6M2 10l10-5 10 5-10 5z"
      }), createElementVNode("path", {
        d: "M6 12v5c3 3 9 3 12 0v-5"
      })], -1), createTextVNode(" 需绑定校园网 ", -1)]))])) : createCommentVNode("", !0), refVal2.value.config.require_approval ? (openBlock(), createElementBlock("span", Pe, [...(val9[4] || (val9[4] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M9 12l2 2 4-4"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })], -1), createTextVNode(" 需审核 ", -1)]))])) : createCommentVNode("", !0), createElementVNode("span", Ge, [val9[5] || (val9[5] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      })], -1)), createTextVNode(" 每人限 " + toDisplayString(refVal2.value.config.max_tickets_per_user) + " 张 ", 1)])])])]), val5.value && !val6.value ? (openBlock(), createElementBlock("div", ze, [val9[6] || (val9[6] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M22 10v6M2 10l10-5 10 5-10 5z"
      }), createElementVNode("path", {
        d: "M6 12v5c3 3 9 3 12 0v-5"
      })], -1)), val9[7] || (val9[7] = createElementVNode("span", null, "该活动需要绑定校园网账号", -1)), createElementVNode("button", {
        class: "notice-btn",
        onClick: zz8
      }, "前往绑定")])) : val5.value && val7.value ? (openBlock(), createElementBlock("div", Ue, [val9[8] || (val9[8] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      }), createElementVNode("line", {
        x1: "12",
        y1: "9",
        x2: "12",
        y2: "13"
      }), createElementVNode("line", {
        x1: "12",
        y1: "17",
        x2: "12.01",
        y2: "17"
      })], -1)), val9[9] || (val9[9] = createElementVNode("span", null, "校园网账号需要更新，请重新绑定以更新高二分班信息", -1)), createElementVNode("button", {
        class: "notice-btn",
        onClick: zz8
      }, "前往更新")])) : createCommentVNode("", !0), refVal3.value.length > 0 ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "my-tickets-notice",
        onClick: zz7
      }, [val9[10] || (val9[10] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      })], -1)), createElementVNode("span", null, "您已有 " + toDisplayString(refVal3.value.length) + " 张票据", 1), val9[11] || (val9[11] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1))])) : createCommentVNode("", !0), createElementVNode("section", Ee, [val9[16] || (val9[16] = createElementVNode("h2", {
        class: "section-title"
      }, "场次列表", -1)), refVal2.value.sessions.length === 0 ? (openBlock(), createElementBlock("div", Le, [...(val9[12] || (val9[12] = [createElementVNode("p", null, "暂无场次信息", -1)]))])) : (openBlock(), createElementBlock("div", Ne, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.sessions, val10 => (openBlock(), createElementBlock("div", {
        key: val10.id,
        class: normalizeClass(["session-card", {
          "session-disabled": !val10.canGrab,
          "session-has-ticket": zz14(val10.id)
        }])
      }, [createElementVNode("div", Re, [createElementVNode("div", Fe, [createElementVNode("h3", Ae, toDisplayString(val10.name), 1), val10.description ? (openBlock(), createElementBlock("p", He, toDisplayString(val10.description), 1)) : createCommentVNode("", !0), createElementVNode("div", je, [val9[13] || (val9[13] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      })], -1)), createTextVNode(" " + toDisplayString(zz11(val10.startTime)) + " - " + toDisplayString(zz11(val10.endTime)), 1)])]), createElementVNode("div", We, [createElementVNode("div", Je, [createElementVNode("span", Ke, toDisplayString(val10.availableTickets), 1), val9[14] || (val9[14] = createElementVNode("span", {
        class: "divider"
      }, "/", -1)), createElementVNode("span", Oe, toDisplayString(val10.totalTickets), 1)]), val9[15] || (val9[15] = createElementVNode("div", {
        class: "tickets-label"
      }, "剩余/总数", -1))])]), createElementVNode("div", Qe, [createElementVNode("span", {
        class: normalizeClass(["session-status", zz10(val10).class])
      }, toDisplayString(zz10(val10).label), 3), val10.status === "waiting" && refVal10.value[val10.id] ? (openBlock(), createElementBlock("span", Xe, toDisplayString(refVal10.value[val10.id]), 1)) : zz14(val10.id) ? (openBlock(), createElementBlock("span", Ye, " 已抢到 ")) : createCommentVNode("", !0), val10.canGrab && !zz14(val10.id) ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "grab-btn",
        disabled: refVal4.value || !val8.value,
        onClick: val11 => zz2(val10)
      }, " 立即抢票 ", 8, Ze)) : createCommentVNode("", !0)])], 2))), 128))]))])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: zz5
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content grab-modal",
            onClick: val9[0] || (val9[0] = withModifiers(() => {}, ["stop"]))
          }, [val9[17] || (val9[17] = createElementVNode("h3", {
            class: "modal-title"
          }, "填写信息", -1)), val9[18] || (val9[18] = createElementVNode("p", {
            class: "modal-subtitle"
          }, "请填写以下信息完成抢票", -1)), createElementVNode("div", et, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value?.config?.extra_info_fields, val10 => (openBlock(), createElementBlock("div", {
            key: val10.name,
            class: "form-group"
          }, [createElementVNode("label", tt, [createTextVNode(toDisplayString(val10.label) + " ", 1), val10.required ? (openBlock(), createElementBlock("span", st, "*")) : createCommentVNode("", !0)]), val10.type === "textarea" ? withDirectives((openBlock(), createElementBlock("textarea", {
            key: 0,
            "onUpdate:modelValue": val11 => refVal7.value[val10.name] = val11,
            class: "form-textarea",
            placeholder: `请输入${val10.label}`,
            rows: "3"
          }, null, 8, at)), [[vModelText, refVal7.value[val10.name]]]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            "onUpdate:modelValue": val11 => refVal7.value[val10.name] = val11,
            type: val10.type === "phone" ? "tel" : val10.type,
            class: "form-input",
            placeholder: `请输入${val10.label}`
          }, null, 8, it)), [[directiveHooks, refVal7.value[val10.name]]])]))), 128))]), createElementVNode("div", ot, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz5,
            disabled: refVal4.value
          }, "取消", 8, nt), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz3,
            disabled: refVal4.value
          }, toDisplayString(refVal4.value ? "抢票中..." : "确认抢票"), 9, lt)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: zz6
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content success-modal",
            onClick: val9[1] || (val9[1] = withModifiers(() => {}, ["stop"]))
          }, [val9[19] || (val9[19] = createElementVNode("div", {
            class: "success-icon"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
          }), createElementVNode("polyline", {
            points: "22 4 12 14.01 9 11.01"
          })])], -1)), val9[20] || (val9[20] = createElementVNode("h3", {
            class: "modal-title"
          }, "抢票成功", -1)), val9[21] || (val9[21] = createElementVNode("p", {
            class: "ticket-code-label"
          }, "您的票据码", -1)), createElementVNode("div", rt, toDisplayString(refVal9.value), 1), createElementVNode("p", ct, toDisplayString(refVal2.value?.config?.require_approval ? "请等待管理员审核后方可使用" : "请妥善保管您的票据码"), 1), createElementVNode("div", {
            class: "modal-actions"
          }, [createElementVNode("button", {
            class: "modal-btn secondary",
            onClick: zz6
          }, "继续浏览"), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz7
          }, "查看票据")])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  kt = withScopeId(ut, [["__scopeId", "data-v-46c2a0c4"]]);
/* index 运行时导出（已语义化） */
export { kt as default };