/*!
 * 页面模块：我的消息（MessagesPage）
 * 路由：/messages   name=messages   层级=2   需登录=是
 * 功能：登录后的「我的消息」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MessagesPage-BIpOxa43.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http, defineComponent, useUserStore, ref, applyDirectives, watch, onMounted, useToast, useRouter, directiveUm, createElementBlock, createVNode, createElementVNode, Fragment, renderList, toDisplayValue, withSlots, toDisplayString, createCommentVNode, TransitionGroup, normalizeClass, createTextVNode, resolveRaw, withModifiers, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
function zz0(zz1 = {}) {
  return http.get("/messages", {
    params: {
      type: zz1.type,
      isRead: zz1.isRead,
      page: zz1.page || 1,
      size: zz1.size || 20
    }
  });
}
function zz2() {
  return http.get("/messages/unread-count");
}
function zz3(val) {
  return http.put(`/messages/${val}/read`);
}
function zz4(val) {
  return http.put("/messages/read-all", null, {
    params: val ? {
      type: val
    } : void 0
  });
}
function zz5(val) {
  return http.delete(`/messages/${val}`);
}
const Be = {
    class: "messages-page"
  },
  Se = {
    class: "page-content"
  },
  Le = {
    class: "content-container"
  },
  Ae = {
    class: "breadcrumb-wrapper"
  },
  ze = {
    class: "tabs-section"
  },
  Ee = {
    class: "tabs-scroll"
  },
  Pe = ["onClick"],
  Ve = {
    key: 0,
    class: "tab-badge"
  },
  qe = {
    key: 0,
    class: "unread-bar"
  },
  He = {
    class: "unread-text"
  },
  Ne = ["disabled"],
  Xe = {
    key: 0,
    class: "loading-container"
  },
  Ue = {
    key: 1,
    class: "empty-container"
  },
  Ye = {
    key: 2,
    class: "messages-list"
  },
  Fe = ["onClick"],
  Ge = ["onClick", "onTouchstart", "onTouchmove", "onTouchend"],
  Oe = {
    key: 0,
    class: "unread-indicator"
  },
  je = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Je = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Ze = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Ke = {
    key: 3,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Qe = {
    class: "message-content"
  },
  We = {
    class: "message-header"
  },
  et = {
    class: "message-title"
  },
  tt = {
    class: "message-time"
  },
  at = {
    class: "message-text"
  },
  st = {
    key: 0,
    class: "message-quote"
  },
  lt = {
    class: "quote-text"
  },
  nt = {
    key: 0,
    class: "load-more"
  },
  ot = ["disabled"],
  it = {
    key: 1,
    class: "no-more"
  },
  rt = {
    class: "drawer-header"
  },
  ut = {
    class: "drawer-title"
  },
  dt = {
    class: "drawer-time"
  },
  ct = {
    class: "drawer-body"
  },
  vt = {
    key: 0,
    class: "drawer-quote"
  },
  ft = {
    class: "drawer-quote-text"
  },
  ht = {
    class: "drawer-actions"
  },
  pt = ["disabled"],
  MessagesPageConst0 = 80,
  yt = defineComponent({
    __name: "MessagesPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref([]),
        refVal5 = ref({
          total: 0,
          ticket: 0,
          rating: 0,
          contribution: 0,
          system: 0
        }),
        refVal6 = ref(1),
        refVal7 = ref(20),
        refVal8 = ref(0),
        val2 = applyDirectives(() => refVal4.value.length < refVal8.value),
        refVal9 = ref("all"),
        refVal10 = ref(!1),
        refVal11 = ref(null),
        refVal12 = ref(!1),
        refVal13 = ref(null),
        refVal14 = ref(null),
        refVal15 = ref(0),
        refVal16 = ref(0),
        refVal17 = ref(0),
        refVal18 = ref(!1),
        list = [{
          value: "all",
          label: "全部"
        }, {
          value: "ticket",
          label: "抢票"
        }, {
          value: "rating",
          label: "社区"
        }, {
          value: "contribution",
          label: "反馈"
        }, {
          value: "system",
          label: "系统"
        }];
      function zz6(val1) {
        return val1 === "all" ? refVal5.value.total : refVal5.value[val1] || 0;
      }
      async function zz7(zz8 = !1) {
        zz8 && (refVal6.value = 1, refVal3.value = !0);
        try {
          const val3 = await zz0({
            type: refVal9.value === "all" ? void 0 : refVal9.value,
            page: refVal6.value,
            size: refVal7.value
          });
          val3.data.code === 200 ? (zz8 || refVal6.value === 1 ? refVal4.value = val3.data.data.records : refVal4.value.push(...val3.data.data.records), refVal8.value = val3.data.data.total) : useToast1.error(val3.data.message || "获取消息失败");
        } catch {
          useToast1.error("获取消息失败");
        } finally {
          refVal.value = !1, refVal3.value = !1, refVal2.value = !1;
        }
      }
      async function zz9() {
        try {
          const val1 = await zz2();
          val1.data.code === 200 && (refVal5.value = val1.data.data);
        } catch {}
      }
      async function zz10() {
        refVal2.value || !val2.value || (refVal2.value = !0, refVal6.value++, await zz7());
      }
      async function zz11(val1) {
        if (refVal13.value = val1, refVal12.value = !0, !val1.isRead) try {
          await zz3(val1.id), val1.isRead = !0, zz9();
        } catch {}
      }
      function zz12() {
        refVal12.value = !1, refVal13.value = null;
      }
      async function zz13() {
        if (!refVal10.value) {
          refVal10.value = !0;
          try {
            const val1 = refVal9.value === "all" ? void 0 : refVal9.value,
              val3 = await zz4(val1);
            val3.data.code === 200 ? (useToast1.success("已全部标记为已读"), refVal4.value.forEach(val4 => {
              (refVal9.value === "all" || val4.type === refVal9.value) && (val4.isRead = !0);
            }), zz9()) : useToast1.error(val3.data.message || "操作失败");
          } catch {
            useToast1.error("操作失败");
          } finally {
            refVal10.value = !1;
          }
        }
      }
      async function zz14(val1, val3) {
        if (refVal11.value !== val1.id) {
          refVal11.value = val1.id;
          try {
            const val4 = await zz5(val1.id);
            val4.data.code === 200 ? (useToast1.success("删除成功"), refVal4.value = refVal4.value.filter(val5 => val5.id !== val1.id), refVal8.value--, val1.isRead || zz9(), refVal13.value?.id === val1.id && zz12()) : useToast1.error(val4.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal11.value = null;
          }
        }
      }
      function zz15(val1) {
        if (zz12(), val1.ratingItemId) {
          useRouter1.push(`/community/item/${val1.ratingItemId}`);
          return;
        }
        if (!(!val1.targetType || !val1.targetId)) switch (val1.targetType) {
          case "ticket":
            useRouter1.push("/ticket/my");
            break;
          case "activity":
            useRouter1.push(`/ticket/${val1.targetId}`);
            break;
          case "comment":
            useRouter1.push("/community");
            break;
          case "contribution":
            useRouter1.push("/community/contributions");
            break;
        }
      }
      function zz16(val1) {
        switch (val1) {
          case "ticket":
            return "ticket";
          case "rating":
            return "star";
          case "contribution":
            return "edit";
          case "system":
            return "bell";
          default:
            return "bell";
        }
      }
      function zz17(val1) {
        return `type-${val1}`;
      }
      function zz18(val1, val3) {
        refVal14.value && refVal14.value !== val3 && zz21();
        const val4 = val1.touches[0];
        val4 && (refVal16.value = val4.clientX, refVal17.value = val4.clientY, refVal14.value = val3, refVal18.value = !1);
      }
      function zz19(val1, val3) {
        if (refVal14.value !== val3) return;
        const val4 = val1.touches[0];
        if (!val4) return;
        const val5 = refVal16.value - val4.clientX;
        Math.abs(val4.clientY - refVal17.value) > Math.abs(val5) && !refVal18.value || (refVal18.value = !0, val5 > 0 ? (refVal15.value = Math.min(val5, MessagesPageConst0 + 20), val1.preventDefault()) : refVal15.value = Math.max(val5 * .3, -20));
      }
      function zz20(val1) {
        refVal14.value === val1 && (refVal15.value >= MessagesPageConst0 ? refVal15.value = MessagesPageConst0 : zz21());
      }
      function zz21() {
        refVal15.value = 0, refVal14.value = null, refVal18.value = !1;
      }
      function zz22(val1) {
        zz21(), zz14(val1);
      }
      function zz23(val1) {
        if (refVal14.value === val1.id && refVal15.value > 10) {
          zz21();
          return;
        }
        zz11(val1);
      }
      function zz24(val1) {
        refVal14.value && refVal15.value > 0 && (val1.target.closest(".message-item") || zz21());
      }
      function zz25(val1) {
        const date = new Date(val1),
          val3 = new Date().getTime() - date.getTime(),
          val4 = Math.floor(val3 / 6e4),
          val5 = Math.floor(val3 / 36e5),
          val6 = Math.floor(val3 / 864e5);
        return val4 < 1 ? "刚刚" : val4 < 60 ? `${val4}分钟前` : val5 < 24 ? `${val5}小时前` : val6 < 7 ? `${val6}天前` : date.toLocaleDateString("zh-CN", {
          month: "2-digit",
          day: "2-digit"
        });
      }
      return watch(refVal9, () => {
        refVal4.value = [], refVal.value = !0, zz7(!0);
      }), onMounted(async () => {
        if (document.addEventListener("click", zz24), !useUserStore1.isLoggedIn) {
          useToast1.error("请先登录"), useRouter1.push("/");
          return;
        }
        await Promise.all([zz7(), zz9()]);
      }), directiveUm(() => {
        document.removeEventListener("click", zz24);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", Be, [createVNode(PageHeader, {
        "back-to": "/profile"
      }), createElementVNode("main", Se, [createElementVNode("div", Le, [createElementVNode("div", Ae, [createVNode(PageBreadcrumb)]), createElementVNode("div", ze, [createElementVNode("div", Ee, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("button", {
        key: val4.value,
        class: normalizeClass(["tab-btn", {
          active: refVal9.value === val4.value
        }]),
        onClick: val5 => refVal9.value = val4.value
      }, [createTextVNode(toDisplayString(val4.label) + " ", 1), zz6(val4.value) > 0 ? (openBlock(), createElementBlock("span", Ve, toDisplayString(zz6(val4.value) > 99 ? "99+" : zz6(val4.value)), 1)) : createCommentVNode("", !0)], 10, Pe)), 64))])]), createVNode(withSlots, {
        name: "fade"
      }, {
        default: toDisplayValue(() => [refVal5.value.total > 0 ? (openBlock(), createElementBlock("div", qe, [createElementVNode("span", He, toDisplayString(refVal5.value.total) + " 条未读消息 ", 1), createElementVNode("button", {
          class: "mark-all-btn",
          disabled: refVal10.value,
          onClick: zz13
        }, toDisplayString(refVal10.value ? "处理中..." : "全部已读"), 9, Ne)])) : createCommentVNode("", !0)]),
        _: 1
      }), refVal.value ? (openBlock(), createElementBlock("div", Xe, [...(val3[3] || (val3[3] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Ue, [val3[4] || (val3[4] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      }), createElementVNode("path", {
        d: "M13.73 21a2 2 0 0 1-3.46 0"
      })])], -1)), val3[5] || (val3[5] = createElementVNode("h2", null, "暂无消息", -1)), createElementVNode("p", null, toDisplayString(refVal9.value === "all" ? "您还没有收到任何消息" : "该类型暂无消息"), 1)])) : (openBlock(), createElementBlock("div", Ye, [createVNode(TransitionGroup, {
        name: "message-list"
      }, {
        default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val4 => (openBlock(), createElementBlock("div", {
          key: val4.id,
          class: normalizeClass(["message-item", {
            deleting: refVal11.value === val4.id
          }])
        }, [createElementVNode("div", {
          class: "swipe-action",
          style: resolveRaw({
            opacity: refVal14.value === val4.id ? Math.min(refVal15.value / MessagesPageConst0, 1) : 0
          }),
          onClick: val5 => zz22(val4)
        }, [...(val3[6] || (val3[6] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "3 6 5 6 21 6"
        }), createElementVNode("path", {
          d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        })], -1), createElementVNode("span", null, "删除", -1)]))], 12, Fe), createElementVNode("div", {
          class: normalizeClass(["message-card", {
            unread: !val4.isRead
          }]),
          style: resolveRaw({
            transform: refVal14.value === val4.id ? `translateX(-${refVal15.value}px)` : "translateX(0)"
          }),
          onClick: val5 => zz23(val4),
          onTouchstart: val5 => zz18(val5, val4.id),
          onTouchmove: val5 => zz19(val5, val4.id),
          onTouchend: val5 => zz20(val4.id)
        }, [val4.isRead ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Oe)), createElementVNode("div", {
          class: normalizeClass(["message-icon", zz17(val4.type)])
        }, [zz16(val4.type) === "ticket" ? (openBlock(), createElementBlock("svg", je, [...(val3[7] || (val3[7] = [createElementVNode("path", {
          d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
        }, null, -1), createElementVNode("path", {
          d: "M13 5v2"
        }, null, -1), createElementVNode("path", {
          d: "M13 17v2"
        }, null, -1), createElementVNode("path", {
          d: "M13 11v2"
        }, null, -1)]))])) : zz16(val4.type) === "star" ? (openBlock(), createElementBlock("svg", Je, [...(val3[8] || (val3[8] = [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        }, null, -1)]))])) : zz16(val4.type) === "edit" ? (openBlock(), createElementBlock("svg", Ze, [...(val3[9] || (val3[9] = [createElementVNode("path", {
          d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        }, null, -1), createElementVNode("path", {
          d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        }, null, -1)]))])) : (openBlock(), createElementBlock("svg", Ke, [...(val3[10] || (val3[10] = [createElementVNode("path", {
          d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        }, null, -1), createElementVNode("path", {
          d: "M13.73 21a2 2 0 0 1-3.46 0"
        }, null, -1)]))]))], 2), createElementVNode("div", Qe, [createElementVNode("div", We, [createElementVNode("h3", et, toDisplayString(val4.title), 1), createElementVNode("span", tt, toDisplayString(zz25(val4.createdAt)), 1)]), createElementVNode("p", at, toDisplayString(val4.content), 1), val4.originalComment ? (openBlock(), createElementBlock("div", st, [val3[11] || (val3[11] = createElementVNode("span", {
          class: "quote-icon"
        }, '"', -1)), createElementVNode("span", lt, toDisplayString(val4.originalComment), 1)])) : createCommentVNode("", !0)]), val3[12] || (val3[12] = createElementVNode("div", {
          class: "message-arrow"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        })])], -1))], 46, Ge)], 2))), 128))]),
        _: 1
      }), val2.value ? (openBlock(), createElementBlock("div", nt, [createElementVNode("button", {
        class: "load-more-btn",
        disabled: refVal2.value,
        onClick: zz10
      }, toDisplayString(refVal2.value ? "加载中..." : "加载更多"), 9, ot)])) : refVal4.value.length > 0 ? (openBlock(), createElementBlock("div", it, " 没有更多消息了 ")) : createCommentVNode("", !0)]))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz12
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal12.value && refVal13.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val3[2] || (val3[2] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", rt, [createElementVNode("div", {
            class: normalizeClass(["drawer-type", zz17(refVal13.value.type)])
          }, toDisplayString(list.find(val4 => val4.value === refVal13.value.type)?.label || "消息"), 3), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz12
          }, [...(val3[13] || (val3[13] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("h3", ut, toDisplayString(refVal13.value.title), 1), createElementVNode("div", dt, toDisplayString(new Date(refVal13.value.createdAt).toLocaleString("zh-CN")), 1), createElementVNode("div", ct, toDisplayString(refVal13.value.content), 1), refVal13.value.originalComment ? (openBlock(), createElementBlock("div", vt, [val3[14] || (val3[14] = createElementVNode("div", {
            class: "drawer-quote-label"
          }, "原评论", -1)), createElementVNode("div", ft, '"' + toDisplayString(refVal13.value.originalComment) + '"', 1)])) : createCommentVNode("", !0), createElementVNode("div", ht, [refVal13.value.ratingItemId || refVal13.value.targetType && refVal13.value.targetId ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "drawer-btn primary",
            onClick: val3[0] || (val3[0] = val4 => zz15(refVal13.value))
          }, " 查看详情 ")) : createCommentVNode("", !0), createElementVNode("button", {
            class: "drawer-btn danger",
            disabled: refVal11.value === refVal13.value.id,
            onClick: val3[1] || (val3[1] = val4 => zz14(refVal13.value))
          }, toDisplayString(refVal11.value === refVal13.value.id ? "删除中..." : "删除消息"), 9, pt)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  wt = withScopeId(yt, [["__scopeId", "data-v-b730bb07"]]);
/* index 运行时导出（已语义化） */
export { wt as default };