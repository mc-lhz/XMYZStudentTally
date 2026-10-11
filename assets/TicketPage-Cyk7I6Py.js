/*!
 * 页面模块：活动抢票（TicketPage）
 * 路由：/ticket   name=ticket   层级=1   需登录=否
 * 功能：公开的「活动抢票」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TicketPage-Cyk7I6Py.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, watch, createElementBlock, createVNode, createElementVNode, unref, Fragment, renderList, createTextVNode, createVNodeWrapper, normalizeClass, toDisplayString, useToast, useRouter, createCommentVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { getTicketActivities } from "./ticket-SMxxVFG1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：content-container */
/* 模板属性配置：login-prompt */
/* 模板属性配置：loading-container */
/* 模板属性配置：activities-section */
/* 模板属性配置：section-header */
const local_zba3 = {
    class: "page-container"
  },
  local_zba4 = {
    class: "page-content"
  },
  local_zba5 = {
    class: "content-container"
  },
  local_zba6 = {
    key: 0,
    class: "login-prompt"
  },
  local_zba7 = {
    key: 1,
    class: "loading-container"
  },
  local_zba8 = {
    key: 2,
    class: "activities-section"
  },
  local_zba9 = {
    class: "section-header"
  },
  ee = {
    class: "filter-tabs"
  },
  te = ["onClick"],
  ae = {
    key: 0,
    class: "empty-container"
  },
  se = ["onClick"],
  le = {
    class: "activity-cover"
  },
  oe = ["src", "alt"],
  ie = {
    key: 1,
    class: "cover-placeholder"
  },
  ne = {
    class: "activity-info"
  },
  re = {
    class: "activity-name"
  },
  de = {
    key: 0,
    class: "activity-desc"
  },
  ce = {
    class: "activity-meta"
  },
  ve = {
    class: "meta-item"
  },
  ue = {
    class: "meta-item"
  },
  fe = {
    key: 0,
    class: "load-more"
  },
  ge = ["disabled"],
  pe = {
    key: 1,
    class: "no-more"
  },
  me = defineComponent({
    __name: "TicketPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(1),
        refVal5 = ref(10),
        refVal6 = ref(!1),
        refVal7 = ref(void 0),
        refVal8 = ref(!1),
        list = [{
          value: void 0,
          label: "进行中"
        }, {
          value: "all",
          label: "全部"
        }, {
          value: "ended",
          label: "已结束"
        }];
      /* 调用接口：获取活动列表（公开）（异步请求） */
      async function zz0(zz1 = !1) {
        if (!useUserStore1.isLoggedIn) {
          refVal2.value = [], refVal3.value = 0, refVal.value = !1, refVal6.value = !1;
          return;
        }
        zz1 ? refVal6.value = !0 : refVal.value = !0;
        try {
          const ticketActivities = await getTicketActivities(refVal4.value, refVal5.value, refVal7.value);
          ticketActivities.data.code === 200 ? (zz1 ? refVal2.value.push(...ticketActivities.data.data.activities) : refVal2.value = ticketActivities.data.data.activities, refVal3.value = ticketActivities.data.data.total) : useToast1.error(ticketActivities.data.message || "获取活动列表失败");
        } catch {
          useToast1.error("获取活动列表失败");
        } finally {
          refVal.value = !1, refVal6.value = !1;
        }
      }
      function zz2() {
        refVal2.value.length < refVal3.value && !refVal6.value && (refVal4.value++, zz0(!0));
      }
      /* 调用接口：获取活动列表（公开）（异步请求） */
      async function zz3(val1) {
        if (!(refVal7.value === val1 || refVal8.value)) {
          refVal7.value = val1, refVal4.value = 1, refVal8.value = !0;
          try {
            const ticketActivities = await getTicketActivities(1, refVal5.value, val1);
            ticketActivities.data.code === 200 && (refVal2.value = ticketActivities.data.data.activities, refVal3.value = ticketActivities.data.data.total);
          } catch {} finally {
            refVal8.value = !1;
          }
        }
      }
      const fn = () => refVal2.value.length < refVal3.value;
      function zz4(val1) {
        useRouter1.push(`/ticket/${val1}`);
      }
      function zz5() {
        useRouter1.push("/ticket/my");
      }
      function zz6(val1) {
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
      function zz7(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          month: "long",
          day: "numeric"
        });
      }
      return onMounted(() => {
        zz0();
      }), watch(() => useUserStore1.isLoggedIn, val1 => {
        if (val1) {
          refVal4.value = 1, zz0();
          return;
        }
        refVal2.value = [], refVal3.value = 0, refVal4.value = 1, refVal.value = !1, refVal6.value = !1, refVal8.value = !1;
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", local_zba3, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", local_zba4, [createElementVNode("div", local_zba5, [val2[10] || (val2[10] = createElementVNode("h1", {
        class: "page-title desktop-only"
      }, "活动抢票", -1)), unref(useUserStore1).isLoggedIn ? refVal.value ? (openBlock(), createElementBlock("div", local_zba7, [...(val2[4] || (val2[4] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", local_zba8, [createElementVNode("div", local_zba9, [createElementVNode("div", ee, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val3 => createElementVNode("button", {
        key: val3.value ?? "default",
        class: normalizeClass(["filter-tab", {
          active: refVal7.value === val3.value
        }]),
        onClick: val4 => zz3(val3.value)
      }, toDisplayString(val3.label), 11, te)), 64))]), createElementVNode("button", {
        class: "my-tickets-btn",
        onClick: zz5
      }, [...(val2[5] || (val2[5] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      })], -1), createTextVNode(" 我的票据 ", -1)]))])]), refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", ae, [...(val2[6] || (val2[6] = [createVNodeWrapper('<div class="empty-icon" data-v-20f626b3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-20f626b3><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-20f626b3></rect><line x1="16" y1="2" x2="16" y2="6" data-v-20f626b3></line><line x1="8" y1="2" x2="8" y2="6" data-v-20f626b3></line><line x1="3" y1="10" x2="21" y2="10" data-v-20f626b3></line></svg></div><h2 data-v-20f626b3>暂无活动</h2><p data-v-20f626b3>当前筛选条件下没有活动</p>', 3)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", {
        class: normalizeClass(["activities-list", {
          "is-loading": refVal8.value
        }])
      }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "activity-card",
        onClick: val4 => zz4(val3.id)
      }, [createElementVNode("div", le, [val3.imageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val3.imageUrl,
        alt: val3.name,
        class: "cover-image"
      }, null, 8, oe)) : (openBlock(), createElementBlock("div", ie, [...(val2[7] || (val2[7] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-20f626b3><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-20f626b3></rect><line x1="16" y1="2" x2="16" y2="6" data-v-20f626b3></line><line x1="8" y1="2" x2="8" y2="6" data-v-20f626b3></line><line x1="3" y1="10" x2="21" y2="10" data-v-20f626b3></line></svg>', 1)]))])), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz6(val3.status).class])
      }, toDisplayString(zz6(val3.status).label), 3)]), createElementVNode("div", ne, [createElementVNode("h3", re, toDisplayString(val3.name), 1), val3.description ? (openBlock(), createElementBlock("p", de, toDisplayString(val3.description), 1)) : createCommentVNode("", !0), createElementVNode("div", ce, [createElementVNode("span", ve, toDisplayString(val3.sessionCount) + " 场次", 1), val2[8] || (val2[8] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ue, toDisplayString(zz7(val3.createdAt)), 1)])]), val2[9] || (val2[9] = createElementVNode("div", {
        class: "activity-arrow"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))], 8, se))), 128))], 2), fn() ? (openBlock(), createElementBlock("div", fe, [createElementVNode("button", {
        class: "load-more-btn",
        disabled: refVal6.value,
        onClick: zz2
      }, toDisplayString(refVal6.value ? "加载中..." : "加载更多"), 9, ge)])) : (openBlock(), createElementBlock("div", pe, " 已经到底啦 "))], 64))])) : (openBlock(), createElementBlock("div", local_zba6, [val2[1] || (val2[1] = createElementVNode("div", {
        class: "prompt-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      })])], -1)), val2[2] || (val2[2] = createElementVNode("h2", null, "登录后查看活动", -1)), val2[3] || (val2[3] = createElementVNode("p", null, "登录账号即可浏览和参与校园活动抢票", -1)), createElementVNode("button", {
        class: "login-btn",
        onClick: val2[0] || (val2[0] = val3 => unref(useUserStore1).openLoginModal("请先登录以查看活动"))
      }, " 立即登录 ")]))])]), createVNode(PageFooter)]));
    }
  }),
  xe = withScopeId(me, [["__scopeId", "data-v-20f626b3"]]);
/* index 运行时导出（已语义化） */
export { xe as default };