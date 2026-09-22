/*!
 * 页面模块：我的票据（MyTicketsPage）
 * 路由：/ticket/my   name=my-tickets   层级=2   需登录=是
 * 功能：登录后的「我的票据」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MyTicketsPage-DRUwk3BB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, onMounted, useRouter, createElementBlock, createVNode, createElementVNode, Fragment, resolveRaw, normalizeClass, createCommentVNode, toDisplayString, unref, renderList, useToast, createTextVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { getTicketsMy as getMyTickets } from "./ticket-SMxxVFG1.js";
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
/* 模板属性配置：loading-container */
/* 模板属性配置：status-tabs */
/* 模板属性配置：tickets-list */
/* 模板属性配置：ticket-left */
/* 模板属性配置：ticket-title */
/* 模板属性配置：ticket-subtitle */
/* 模板属性配置：ticket-code */
const MyTicketsPageConfig = {
    class: "page-container"
  },
  MyTicketsPageConfig_2 = {
    class: "page-content"
  },
  MyTicketsPageConfig_3 = {
    class: "content-container"
  },
  MyTicketsPageConfig_4 = {
    class: "breadcrumb-wrapper"
  },
  MyTicketsPageConfig_5 = {
    key: 0,
    class: "loading-container"
  },
  MyTicketsPageConfig_6 = {
    class: "status-tabs"
  },
  MyTicketsPageConfig_7 = {
    key: 0,
    class: "empty-container"
  },
  MyTicketsPageConfig_8 = {
    key: 1,
    class: "tickets-list"
  },
  MyTicketsPageList = ["onClick"],
  MyTicketsPageConfig_9 = {
    class: "ticket-left"
  },
  MyTicketsPageConfig_10 = {
    class: "ticket-title"
  },
  MyTicketsPageConfig_11 = {
    class: "ticket-subtitle"
  },
  MyTicketsPageList_2 = ["onClick"],
  MyTicketsPageConfig_12 = {
    class: "ticket-code"
  },
  tt = defineComponent({
    __name: "MyTicketsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref("all"),
        val2 = applyDirectives(() => ["all", "pending", "confirmed", "used"].indexOf(refVal3.value)),
        val3 = applyDirectives(() => refVal3.value === "all" ? refVal2.value : refVal2.value.filter(val1 => val1.status === refVal3.value));
      /* 调用接口：获取我的票据列表（异步请求） */
      async function zz0() {
        try {
          const myTickets = await getMyTickets();
          myTickets.data.code === 200 ? refVal2.value = myTickets.data.data.tickets : useToast1.error(myTickets.data.message || "获取票据列表失败");
        } catch {
          useToast1.error("获取票据列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
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
      function zz2(val1) {
        useRouter1.push(`/ticket/${val1}`);
      }
      async function zz3(val1, val4) {
        val4.stopPropagation();
        try {
          await navigator.clipboard.writeText(val1), useToast1.success("票据码已复制");
        } catch {
          useToast1.error("复制失败，请手动复制");
        }
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal("请先登录以查看票据"), useRouter1.push("/ticket");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", MyTicketsPageConfig, [createVNode(PageHeader, {
        "back-to": "/ticket"
      }), createElementVNode("main", MyTicketsPageConfig_2, [createElementVNode("div", MyTicketsPageConfig_3, [createElementVNode("div", MyTicketsPageConfig_4, [createVNode(PageBreadcrumb)]), val4[12] || (val4[12] = createElementVNode("h1", {
        class: "page-title desktop-only"
      }, "我的票据", -1)), refVal.value ? (openBlock(), createElementBlock("div", MyTicketsPageConfig_5, [...(val4[5] || (val4[5] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", MyTicketsPageConfig_6, [createElementVNode("div", {
        class: "tab-slider",
        style: resolveRaw({
          transform: `translateX(${val2.value * 100}%)`
        })
      }, null, 4), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "all"
        }]),
        onClick: val4[0] || (val4[0] = val5 => refVal3.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "pending"
        }]),
        onClick: val4[1] || (val4[1] = val5 => refVal3.value = "pending")
      }, " 待审核 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "confirmed"
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal3.value = "confirmed")
      }, " 已确认 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "used"
        }]),
        onClick: val4[3] || (val4[3] = val5 => refVal3.value = "used")
      }, " 已使用 ", 2)]), val3.value.length === 0 ? (openBlock(), createElementBlock("div", MyTicketsPageConfig_7, [val4[6] || (val4[6] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      })])], -1)), createElementVNode("h2", null, toDisplayString(refVal3.value === "all" ? "暂无票据" : "暂无相关票据"), 1), createElementVNode("p", null, toDisplayString(refVal3.value === "all" ? "去参加活动抢票吧" : "没有找到该状态的票据"), 1), refVal3.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "browse-btn",
        onClick: val4[4] || (val4[4] = val5 => unref(useRouter1).push("/ticket"))
      }, " 浏览活动 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", MyTicketsPageConfig_8, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val3.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: normalizeClass(["ticket-card", zz1(val5.status).class]),
        onClick: val6 => zz2(val5.activityId)
      }, [val4[9] || (val4[9] = createElementVNode("div", {
        class: "ticket-punch left"
      }, null, -1)), createElementVNode("div", MyTicketsPageConfig_9, [createElementVNode("div", {
        class: normalizeClass(["ticket-status-badge", zz1(val5.status).class])
      }, toDisplayString(zz1(val5.status).label), 3), createElementVNode("div", MyTicketsPageConfig_10, toDisplayString(val5.activityName), 1), createElementVNode("div", MyTicketsPageConfig_11, toDisplayString(val5.sessionName), 1)]), val4[10] || (val4[10] = createElementVNode("div", {
        class: "ticket-divider"
      }, [createElementVNode("div", {
        class: "divider-line"
      })], -1)), createElementVNode("div", {
        class: "ticket-right",
        onClick: val6 => zz3(val5.ticketCode, val6)
      }, [val4[7] || (val4[7] = createElementVNode("div", {
        class: "ticket-code-label"
      }, "票码", -1)), createElementVNode("div", MyTicketsPageConfig_12, toDisplayString(val5.ticketCode), 1), val4[8] || (val4[8] = createElementVNode("div", {
        class: "ticket-copy-hint"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("rect", {
        x: "9",
        y: "9",
        width: "13",
        height: "13",
        rx: "2",
        ry: "2"
      }), createElementVNode("path", {
        d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
      })]), createTextVNode(" 点击复制 ")], -1))], 8, MyTicketsPageList_2), val4[11] || (val4[11] = createElementVNode("div", {
        class: "ticket-punch right"
      }, null, -1))], 10, MyTicketsPageList))), 128))]))], 64))])]), createVNode(PageFooter)]));
    }
  }),
  nt = withScopeId(tt, [["__scopeId", "data-v-0813b2b6"]]);
/* index 运行时导出（已语义化） */
export { nt as default };