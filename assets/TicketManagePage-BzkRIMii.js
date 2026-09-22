/*!
 * 页面模块：票务管理（TicketManagePage）
 * 路由：/admin/tickets   name=admin-tickets   层级=2   需登录=是
 * 功能：登录后的「票务管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TicketManagePage-BzkRIMii.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, normalizeClass, createVNodeWrapper, toDisplayString, renderList, withModifiers, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { getAdminTicketActivities, deleteAdminTicketActivities as deleteAdminTicketActivity, updateAdminTicketActivities as updateAdminTicketActivity } from "./ticket-SMxxVFG1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const le = {
    class: "page-container"
  },
  ne = {
    class: "page-content"
  },
  ie = {
    class: "content-container"
  },
  re = {
    class: "breadcrumb-wrapper"
  },
  de = {
    key: 0,
    class: "loading-container"
  },
  ce = {
    class: "status-tabs"
  },
  ue = {
    key: 0,
    class: "empty-container"
  },
  ve = {
    key: 1,
    class: "activities-list"
  },
  fe = ["onClick"],
  pe = {
    class: "activity-cover"
  },
  me = ["src", "alt"],
  ge = {
    key: 1,
    class: "cover-placeholder"
  },
  be = {
    class: "activity-info"
  },
  ke = {
    class: "activity-header"
  },
  he = {
    class: "activity-name"
  },
  ye = {
    key: 0,
    class: "activity-desc"
  },
  _e = {
    class: "activity-meta"
  },
  xe = {
    class: "meta-item"
  },
  Ce = {
    class: "meta-item"
  },
  we = {
    class: "meta-item"
  },
  Te = {
    class: "activity-actions"
  },
  Ae = ["onClick"],
  Pe = ["onClick"],
  De = ["onClick"],
  Be = {
    class: "modal-content"
  },
  Me = {
    class: "modal-desc"
  },
  Se = {
    class: "modal-actions"
  },
  $e = ["disabled"],
  Ne = ["disabled"],
  Ie = defineComponent({
    __name: "TicketManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(1),
        refVal5 = ref(20),
        refVal6 = ref("all"),
        list = ["all", "draft", "published", "active", "ended"],
        refVal7 = ref(""),
        refVal8 = ref(!1);
      watch(refVal6, (val1, val3) => {
        if (!val3) return;
        const val4 = list.indexOf(val3),
          val5 = list.indexOf(val1);
        refVal7.value = val5 > val4 ? "left" : "right", refVal8.value = !0, nextTick(() => {
          setTimeout(() => {
            refVal8.value = !1, refVal7.value = "";
          }, 300);
        });
      });
      const refVal9 = ref(!1),
        refVal10 = ref(null),
        refVal11 = ref(!1),
        val2 = applyDirectives(() => refVal6.value === "all" ? refVal2.value : refVal2.value.filter(val1 => val1.status === refVal6.value));
      /* 调用接口：管理员获取活动列表（异步请求） */
      async function zz0() {
        try {
          const adminTicketActivities = await getAdminTicketActivities(refVal4.value, refVal5.value);
          adminTicketActivities.data.code === 200 ? (refVal2.value = adminTicketActivities.data.data.activities, refVal3.value = adminTicketActivities.data.data.total) : useToast1.error(adminTicketActivities.data.message || "获取活动列表失败");
        } catch {
          useToast1.error("获取活动列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
        return {
          draft: {
            label: "草稿",
            class: "status-draft"
          },
          published: {
            label: "已发布",
            class: "status-published"
          },
          active: {
            label: "进行中",
            class: "status-active"
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
      /* 调用接口：更新票务活动（异步请求） */
      async function zz2(val1, val3) {
        val3.stopPropagation();
        try {
          const adminTicketActivity = await updateAdminTicketActivity(val1, {
            status: "published"
          });
          adminTicketActivity.data.code === 200 ? (useToast1.success("活动已发布"), zz0()) : useToast1.error(adminTicketActivity.data.message || "发布失败");
        } catch {
          useToast1.error("发布失败");
        }
      }
      /* 调用接口：更新票务活动（异步请求） */
      async function zz3(val1, val3) {
        val3.stopPropagation();
        try {
          const adminTicketActivity = await updateAdminTicketActivity(val1, {
            status: "active"
          });
          adminTicketActivity.data.code === 200 ? (useToast1.success("活动已激活"), zz0()) : useToast1.error(adminTicketActivity.data.message || "激活失败");
        } catch {
          useToast1.error("激活失败");
        }
      }
      function zz4(val1, val3) {
        val3.stopPropagation(), refVal10.value = val1, refVal9.value = !0;
      }
      /* 调用接口：删除活动（异步请求） */
      async function zz5() {
        if (refVal10.value) {
          refVal11.value = !0;
          try {
            const adminTicketActivity = await deleteAdminTicketActivity(refVal10.value.id);
            adminTicketActivity.data.code === 200 ? (useToast1.success("活动已删除"), refVal9.value = !1, refVal10.value = null, zz0()) : useToast1.error(adminTicketActivity.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal11.value = !1;
          }
        }
      }
      function zz6() {
        refVal9.value = !1, refVal10.value = null;
      }
      function zz7(val1) {
        useRouter1.push(`/admin/tickets/${val1}`);
      }
      function zz8() {
        useRouter1.push("/admin/tickets/new");
      }
      function zz9() {
        useRouter1.push("/admin/tickets/verify");
      }
      function zz10(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageTickets) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", le, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", ne, [createElementVNode("div", ie, [createElementVNode("div", re, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val3[7] || (val3[7] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "票务管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理活动、档期和票据")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz9
      }, [...(val3[5] || (val3[5] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M9 12l2 2 4-4"
      }), createElementVNode("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      })], -1), createTextVNode(" 验票 ", -1)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz8
      }, [...(val3[6] || (val3[6] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 创建活动 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", de, [...(val3[8] || (val3[8] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ce, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "all"
        }]),
        onClick: val3[0] || (val3[0] = val4 => refVal6.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "draft"
        }]),
        onClick: val3[1] || (val3[1] = val4 => refVal6.value = "draft")
      }, " 草稿 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "published"
        }]),
        onClick: val3[2] || (val3[2] = val4 => refVal6.value = "published")
      }, " 已发布 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "active"
        }]),
        onClick: val3[3] || (val3[3] = val4 => refVal6.value = "active")
      }, " 进行中 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "ended"
        }]),
        onClick: val3[4] || (val3[4] = val4 => refVal6.value = "ended")
      }, " 已结束 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal8.value && refVal7.value === "left",
          "slide-right": refVal8.value && refVal7.value === "right"
        }])
      }, [val2.value.length === 0 ? (openBlock(), createElementBlock("div", ue, [val3[9] || (val3[9] = createVNodeWrapper('<div class="empty-icon" data-v-68e0706d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-68e0706d><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-68e0706d></rect><line x1="16" y1="2" x2="16" y2="6" data-v-68e0706d></line><line x1="8" y1="2" x2="8" y2="6" data-v-68e0706d></line><line x1="3" y1="10" x2="21" y2="10" data-v-68e0706d></line></svg></div>', 1)), createElementVNode("h2", null, toDisplayString(refVal6.value === "all" ? "暂无活动" : "暂无相关活动"), 1), createElementVNode("p", null, toDisplayString(refVal6.value === "all" ? "还没有创建任何活动" : "没有找到该状态的活动"), 1), refVal6.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz8
      }, " 创建第一个活动 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", ve, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "activity-card",
        onClick: val5 => zz7(val4.id)
      }, [createElementVNode("div", pe, [val4.imageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val4.imageUrl,
        alt: val4.name,
        class: "cover-image"
      }, null, 8, me)) : (openBlock(), createElementBlock("div", ge, [...(val3[10] || (val3[10] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-68e0706d><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-68e0706d></rect><line x1="16" y1="2" x2="16" y2="6" data-v-68e0706d></line><line x1="8" y1="2" x2="8" y2="6" data-v-68e0706d></line><line x1="3" y1="10" x2="21" y2="10" data-v-68e0706d></line></svg>', 1)]))]))]), createElementVNode("div", be, [createElementVNode("div", ke, [createElementVNode("h3", he, toDisplayString(val4.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz1(val4.status).class])
      }, toDisplayString(zz1(val4.status).label), 3)]), val4.description ? (openBlock(), createElementBlock("p", ye, toDisplayString(val4.description), 1)) : createCommentVNode("", !0), createElementVNode("div", _e, [createElementVNode("span", xe, toDisplayString(val4.sessionCount) + " 场次", 1), val3[11] || (val3[11] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Ce, toDisplayString(val4.soldTickets) + "/" + toDisplayString(val4.totalTickets) + " 票", 1), val3[12] || (val3[12] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", we, toDisplayString(zz10(val4.createdAt)), 1)])]), createElementVNode("div", Te, [val4.status === "draft" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn publish",
        onClick: val5 => zz2(val4.id, val5)
      }, " 发布 ", 8, Ae)) : createCommentVNode("", !0), val4.status === "published" ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "action-btn activate",
        onClick: val5 => zz3(val4.id, val5)
      }, " 激活 ", 8, Pe)) : createCommentVNode("", !0), val4.status === "draft" || val4.status === "ended" ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "action-btn delete",
        onClick: val5 => zz4(val4, val5)
      }, " 删除 ", 8, De)) : createCommentVNode("", !0), val3[13] || (val3[13] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, fe))), 128))]))], 2)], 64))])]), createVNode(PageFooter), refVal9.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz6, ["self"])
      }, [createElementVNode("div", Be, [val3[14] || (val3[14] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), createElementVNode("p", Me, ' 确定要删除活动"' + toDisplayString(refVal10.value?.name) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", Se, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz6,
        disabled: refVal11.value
      }, " 取消 ", 8, $e), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz5,
        disabled: refVal11.value
      }, toDisplayString(refVal11.value ? "删除中..." : "确认删除"), 9, Ne)])])])) : createCommentVNode("", !0)]));
    }
  }),
  je = withScopeId(Ie, [["__scopeId", "data-v-68e0706d"]]);
/* index 运行时导出（已语义化） */
export { je as default };