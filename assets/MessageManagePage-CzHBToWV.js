/*!
 * 页面模块：消息管理（MessageManagePage）
 * 路由：/admin/messages   name=admin-messages   层级=2   需登录=是
 * 功能：登录后的「消息管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MessageManagePage-CzHBToWV.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http, defineComponent, useUserStore, ref, applyDirectives, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, normalizeClass, withDirectives, deepDirectiveOptions, Fragment, renderList, vModelText, toDisplayString, createVNodeWrapper, toDisplayValue, withSlots, withModifiers, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
function zz0(val, val2) {
  return http.get("/admin/messages/templates", {
    params: {
      type: val,
      status: val2
    }
  });
}
function zz1(val) {
  return http.post("/admin/messages/templates", val);
}
function zz2(val, val2) {
  return http.put(`/admin/messages/templates/${val}`, val2);
}
function zz3(val) {
  return http.delete(`/admin/messages/templates/${val}`);
}
function zz4(zz5 = {}) {
  return http.get("/admin/messages", {
    params: {
      userId: zz5.userId,
      type: zz5.type,
      isRead: zz5.isRead,
      keyword: zz5.keyword,
      page: zz5.page || 1,
      size: zz5.size || 20
    }
  });
}
function zz6(val) {
  return http.post("/admin/messages/send", val);
}
function zz7(val) {
  return http.post("/admin/messages/broadcast", val);
}
function zz8(val) {
  return http.delete(`/admin/messages/${val}`);
}
function zz9(val) {
  return http.delete("/admin/messages/batch", {
    data: val
  });
}
function zz10() {
  return http.get("/admin/messages/stats");
}
const Ee = {
    class: "message-manage-page"
  },
  Ke = {
    class: "page-content"
  },
  je = {
    class: "content-container"
  },
  Ge = {
    class: "breadcrumb-wrapper"
  },
  He = {
    class: "tabs-section"
  },
  Oe = {
    class: "tabs-scroll"
  },
  Ze = {
    key: 0,
    class: "tab-content"
  },
  qe = {
    class: "filter-bar"
  },
  Je = ["value"],
  Qe = {
    key: 0,
    class: "batch-bar"
  },
  We = {
    class: "batch-count"
  },
  Xe = ["disabled"],
  Ye = {
    key: 1,
    class: "loading-container"
  },
  et = {
    key: 2,
    class: "empty-container"
  },
  tt = {
    key: 3,
    class: "messages-list"
  },
  st = {
    class: "list-header"
  },
  at = {
    class: "checkbox-label"
  },
  lt = ["checked"],
  nt = ["onClick"],
  ot = ["checked", "onChange"],
  it = {
    class: "col-user"
  },
  dt = {
    class: "col-type"
  },
  ut = {
    class: "col-title"
  },
  rt = {
    class: "col-status"
  },
  ct = {
    key: 0,
    class: "status-read"
  },
  vt = {
    key: 1,
    class: "status-unread"
  },
  pt = {
    class: "col-time"
  },
  mt = ["onClick"],
  ft = {
    key: 4,
    class: "pagination"
  },
  yt = ["disabled"],
  gt = {
    class: "page-info"
  },
  bt = ["disabled"],
  _t = {
    key: 1,
    class: "tab-content"
  },
  kt = {
    class: "filter-bar"
  },
  wt = ["value"],
  ht = {
    key: 0,
    class: "loading-container"
  },
  Tt = {
    key: 1,
    class: "empty-container"
  },
  Ct = {
    key: 2,
    class: "templates-list"
  },
  xt = {
    class: "template-header"
  },
  Mt = {
    class: "template-code"
  },
  St = {
    key: 0,
    class: "status-badge enabled"
  },
  $t = {
    key: 1,
    class: "status-badge disabled"
  },
  It = {
    class: "template-title"
  },
  Dt = {
    class: "template-content"
  },
  Vt = {
    class: "template-footer"
  },
  Ut = {
    class: "template-time"
  },
  Bt = {
    class: "template-actions"
  },
  Pt = ["onClick"],
  At = ["onClick"],
  zt = {
    key: 2,
    class: "tab-content"
  },
  Ft = {
    class: "send-form"
  },
  Lt = {
    class: "form-group"
  },
  Nt = ["value"],
  Rt = {
    class: "form-group"
  },
  Et = {
    class: "form-group"
  },
  Kt = {
    class: "form-group"
  },
  jt = {
    class: "form-actions"
  },
  Gt = ["disabled"],
  Ht = ["disabled"],
  Ot = {
    key: 3,
    class: "tab-content"
  },
  Zt = {
    key: 0,
    class: "loading-container"
  },
  qt = {
    key: 1,
    class: "stats-grid"
  },
  Jt = {
    class: "stat-card"
  },
  Qt = {
    class: "stat-value"
  },
  Wt = {
    class: "stat-card"
  },
  Xt = {
    class: "stat-value"
  },
  Yt = {
    class: "stat-card"
  },
  es = {
    class: "stat-value"
  },
  ts = {
    class: "stat-card"
  },
  ss = {
    class: "stat-value"
  },
  as = {
    class: "stat-card wide"
  },
  ls = {
    class: "type-stats"
  },
  ns = {
    class: "type-stat"
  },
  os = {
    class: "type-count"
  },
  is = {
    class: "type-stat"
  },
  ds = {
    class: "type-count"
  },
  us = {
    class: "type-stat"
  },
  rs = {
    class: "type-count"
  },
  cs = {
    class: "type-stat"
  },
  vs = {
    class: "type-count"
  },
  ps = {
    class: "drawer-header"
  },
  ms = {
    class: "drawer-title"
  },
  fs = {
    class: "drawer-meta"
  },
  ys = {
    class: "drawer-body"
  },
  gs = {
    class: "drawer-footer"
  },
  bs = {
    key: 0,
    class: "status-read"
  },
  _s = {
    key: 1,
    class: "status-unread"
  },
  ks = {
    class: "drawer-header"
  },
  ws = {
    class: "drawer-title-text"
  },
  hs = {
    class: "form-group"
  },
  Ts = ["disabled"],
  Cs = {
    class: "form-group"
  },
  xs = ["value"],
  Ms = {
    class: "form-group"
  },
  Ss = {
    class: "form-group"
  },
  $s = {
    class: "form-group"
  },
  Is = {
    class: "form-actions"
  },
  Ds = ["disabled"],
  Vs = {
    class: "modal-message"
  },
  Us = {
    class: "modal-actions"
  },
  Bs = ["disabled"],
  Ps = defineComponent({
    __name: "MessageManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref("messages"),
        refVal2 = ref([]),
        refVal3 = ref(!1),
        refVal4 = ref(1),
        refVal5 = ref(0),
        refVal6 = ref(20),
        refVal7 = ref(""),
        refVal8 = ref(""),
        refVal9 = ref([]),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        refVal13 = ref([]),
        refVal14 = ref(!1),
        refVal15 = ref(""),
        refVal16 = ref(!1),
        refVal17 = ref(!1),
        refVal18 = ref(null),
        refVal19 = ref({
          code: "",
          titleTemplate: "",
          contentTemplate: "",
          type: "system",
          status: 1
        }),
        refVal20 = ref(!1),
        refVal21 = ref(!1),
        refVal22 = ref(null),
        refVal23 = ref(!1),
        refVal24 = ref({
          userIds: "",
          type: "system",
          title: "",
          content: ""
        }),
        refVal25 = ref(!1),
        refVal26 = ref(!1),
        refVal27 = ref(null),
        refVal28 = ref(!1),
        list = [{
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
        }],
        val2 = applyDirectives(() => refVal2.value.length === 0 ? !1 : refVal2.value.every(val1 => refVal9.value.includes(val1.id)));
      async function zz11() {
        refVal3.value = !0;
        try {
          const val1 = await zz4({
            type: refVal7.value || void 0,
            keyword: refVal8.value || void 0,
            page: refVal4.value,
            size: refVal6.value
          });
          val1.data.code === 200 ? (refVal2.value = val1.data.data.records, refVal5.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取消息列表失败");
        } catch {
          useToast1.error("获取消息列表失败");
        } finally {
          refVal3.value = !1;
        }
      }
      function zz12(val1) {
        refVal12.value = val1, refVal11.value = !0;
      }
      function zz13(val1) {
        const val3 = refVal9.value.indexOf(val1);
        val3 === -1 ? refVal9.value.push(val1) : refVal9.value.splice(val3, 1);
      }
      function zz14() {
        val2.value ? refVal9.value = [] : refVal9.value = refVal2.value.map(val1 => val1.id);
      }
      async function zz15() {
        if (refVal9.value.length !== 0) {
          refVal10.value = !0;
          try {
            const val1 = await zz9(refVal9.value);
            val1.data.code === 200 ? (useToast1.success("删除成功"), refVal9.value = [], zz11()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal10.value = !1;
          }
        }
      }
      async function zz16(val1) {
        refVal22.value = {
          type: "message",
          id: val1,
          name: "此消息"
        }, refVal21.value = !0;
      }
      async function zz17() {
        refVal14.value = !0;
        try {
          const val1 = await zz0(refVal15.value || void 0);
          val1.data.code === 200 ? refVal13.value = val1.data.data : useToast1.error(val1.data.message || "获取模板列表失败");
        } catch {
          useToast1.error("获取模板列表失败");
        } finally {
          refVal14.value = !1;
        }
      }
      function zz18() {
        refVal17.value = !1, refVal18.value = null, refVal19.value = {
          code: "",
          titleTemplate: "",
          contentTemplate: "",
          type: "system",
          status: 1
        }, refVal16.value = !0;
      }
      function zz19(val1) {
        refVal17.value = !0, refVal18.value = val1, refVal19.value = {
          code: val1.code,
          titleTemplate: val1.titleTemplate,
          contentTemplate: val1.contentTemplate,
          type: val1.type,
          status: val1.status
        }, refVal16.value = !0;
      }
      function zz20() {
        refVal16.value = !1, refVal18.value = null;
      }
      async function zz21() {
        if (!refVal19.value.code.trim()) {
          useToast1.warning("请输入模板代码");
          return;
        }
        if (!refVal19.value.titleTemplate.trim()) {
          useToast1.warning("请输入标题模板");
          return;
        }
        if (!refVal19.value.contentTemplate.trim()) {
          useToast1.warning("请输入内容模板");
          return;
        }
        refVal20.value = !0;
        try {
          if (refVal17.value && refVal18.value) {
            const val1 = await zz2(refVal18.value.id, {
              titleTemplate: refVal19.value.titleTemplate,
              contentTemplate: refVal19.value.contentTemplate,
              type: refVal19.value.type,
              status: refVal19.value.status
            });
            val1.data.code === 200 ? (useToast1.success("更新成功"), zz20(), zz17()) : useToast1.error(val1.data.message || "更新失败");
          } else {
            const val1 = await zz1({
              code: refVal19.value.code,
              titleTemplate: refVal19.value.titleTemplate,
              contentTemplate: refVal19.value.contentTemplate,
              type: refVal19.value.type,
              status: refVal19.value.status
            });
            val1.data.code === 200 ? (useToast1.success("创建成功"), zz20(), zz17()) : useToast1.error(val1.data.message || "创建失败");
          }
        } catch {
          useToast1.error(refVal17.value ? "更新失败" : "创建失败");
        } finally {
          refVal20.value = !1;
        }
      }
      function zz22(val1) {
        refVal22.value = {
          type: "template",
          id: val1.id,
          name: val1.code
        }, refVal21.value = !0;
      }
      async function zz23() {
        if (refVal22.value) {
          refVal23.value = !0;
          try {
            if (refVal22.value.type === "template") {
              const val1 = await zz3(refVal22.value.id);
              val1.data.code === 200 ? (useToast1.success("删除成功"), zz17()) : useToast1.error(val1.data.message || "删除失败");
            } else {
              const val1 = await zz8(refVal22.value.id);
              val1.data.code === 200 ? (useToast1.success("删除成功"), zz11(), refVal11.value && (refVal11.value = !1)) : useToast1.error(val1.data.message || "删除失败");
            }
            refVal21.value = !1, refVal22.value = null;
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal23.value = !1;
          }
        }
      }
      async function zz24() {
        if (!refVal24.value.userIds.trim()) {
          useToast1.warning("请输入用户ID");
          return;
        }
        if (!refVal24.value.title.trim()) {
          useToast1.warning("请输入标题");
          return;
        }
        if (!refVal24.value.content.trim()) {
          useToast1.warning("请输入内容");
          return;
        }
        const val1 = refVal24.value.userIds.split(/[,，\s]+/).map(val3 => parseInt(val3.trim())).filter(val3 => !isNaN(val3));
        if (val1.length === 0) {
          useToast1.warning("请输入有效的用户ID");
          return;
        }
        refVal25.value = !0;
        try {
          const val3 = await zz6({
            userIds: val1,
            type: refVal24.value.type,
            title: refVal24.value.title,
            content: refVal24.value.content
          });
          val3.data.code === 200 ? (useToast1.success(val3.data.data || "发送成功"), refVal24.value = {
            userIds: "",
            type: "system",
            title: "",
            content: ""
          }) : useToast1.error(val3.data.message || "发送失败");
        } catch {
          useToast1.error("发送失败");
        } finally {
          refVal25.value = !1;
        }
      }
      async function zz25() {
        if (!refVal24.value.title.trim()) {
          useToast1.warning("请输入标题");
          return;
        }
        if (!refVal24.value.content.trim()) {
          useToast1.warning("请输入内容");
          return;
        }
        refVal26.value = !0;
        try {
          const val1 = await zz7({
            title: refVal24.value.title,
            content: refVal24.value.content
          });
          val1.data.code === 200 ? (useToast1.success(val1.data.data || "广播任务已提交"), refVal24.value = {
            userIds: "",
            type: "system",
            title: "",
            content: ""
          }) : useToast1.error(val1.data.message || "广播失败");
        } catch {
          useToast1.error("广播失败");
        } finally {
          refVal26.value = !1;
        }
      }
      async function zz26() {
        refVal28.value = !0;
        try {
          const val1 = await zz10();
          val1.data.code === 200 ? refVal27.value = val1.data.data : useToast1.error(val1.data.message || "获取统计信息失败");
        } catch {
          useToast1.error("获取统计信息失败");
        } finally {
          refVal28.value = !1;
        }
      }
      function zz27(val1) {
        return new Date(val1).toLocaleString("zh-CN");
      }
      function zz28(val1) {
        return list.find(val3 => val3.value === val1)?.label || val1;
      }
      return watch(refVal, val1 => {
        val1 === "messages" && refVal2.value.length === 0 ? zz11() : val1 === "templates" && refVal13.value.length === 0 ? zz17() : val1 === "stats" && zz26();
      }), watch([refVal7, refVal8], () => {
        refVal4.value = 1, refVal9.value = [], zz11();
      }), watch(refVal15, () => {
        zz17();
      }), onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMessages) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz11();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", Ee, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", Ke, [createElementVNode("div", je, [createElementVNode("div", Ge, [createVNode(PageBreadcrumb)]), createElementVNode("div", He, [createElementVNode("div", Oe, [createElementVNode("button", {
        class: normalizeClass(["tab-btn", {
          active: refVal.value === "messages"
        }]),
        onClick: val3[0] || (val3[0] = val4 => refVal.value = "messages")
      }, " 消息列表 ", 2), createElementVNode("button", {
        class: normalizeClass(["tab-btn", {
          active: refVal.value === "templates"
        }]),
        onClick: val3[1] || (val3[1] = val4 => refVal.value = "templates")
      }, " 模板管理 ", 2), createElementVNode("button", {
        class: normalizeClass(["tab-btn", {
          active: refVal.value === "send"
        }]),
        onClick: val3[2] || (val3[2] = val4 => refVal.value = "send")
      }, " 发送消息 ", 2), createElementVNode("button", {
        class: normalizeClass(["tab-btn", {
          active: refVal.value === "stats"
        }]),
        onClick: val3[3] || (val3[3] = val4 => refVal.value = "stats")
      }, " 统计 ", 2)])]), refVal.value === "messages" ? (openBlock(), createElementBlock("div", Ze, [createElementVNode("div", qe, [withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[4] || (val3[4] = val4 => refVal7.value = val4),
        class: "filter-select"
      }, [val3[28] || (val3[28] = createElementVNode("option", {
        value: ""
      }, "全部类型", -1)), (openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("option", {
        key: val4.value,
        value: val4.value
      }, toDisplayString(val4.label), 9, Je)), 64))], 512), [[deepDirectiveOptions, refVal7.value]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[5] || (val3[5] = val4 => refVal8.value = val4),
        type: "text",
        class: "filter-input",
        placeholder: "搜索标题或内容..."
      }, null, 512), [[vModelText, refVal8.value]])]), refVal9.value.length > 0 ? (openBlock(), createElementBlock("div", Qe, [createElementVNode("span", We, "已选择 " + toDisplayString(refVal9.value.length) + " 条", 1), createElementVNode("button", {
        class: "batch-btn danger",
        disabled: refVal10.value,
        onClick: zz15
      }, toDisplayString(refVal10.value ? "删除中..." : "批量删除"), 9, Xe)])) : createCommentVNode("", !0), refVal3.value ? (openBlock(), createElementBlock("div", Ye, [...(val3[29] || (val3[29] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", et, [...(val3[30] || (val3[30] = [createElementVNode("p", null, "暂无消息", -1)]))])) : (openBlock(), createElementBlock("div", tt, [createElementVNode("div", st, [createElementVNode("label", at, [createElementVNode("input", {
        type: "checkbox",
        checked: val2.value,
        onChange: zz14
      }, null, 40, lt)]), val3[31] || (val3[31] = createVNodeWrapper('<span class="col-user" data-v-62c1fa07>用户</span><span class="col-type" data-v-62c1fa07>类型</span><span class="col-title" data-v-62c1fa07>标题</span><span class="col-status" data-v-62c1fa07>状态</span><span class="col-time" data-v-62c1fa07>时间</span><span class="col-action" data-v-62c1fa07>操作</span>', 6))]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "list-item",
        onClick: val5 => zz12(val4)
      }, [createElementVNode("label", {
        class: "checkbox-label",
        onClick: val3[6] || (val3[6] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("input", {
        type: "checkbox",
        checked: refVal9.value.includes(val4.id),
        onChange: val5 => zz13(val4.id)
      }, null, 40, ot)]), createElementVNode("span", it, toDisplayString(val4.username), 1), createElementVNode("span", dt, [createElementVNode("span", {
        class: normalizeClass(["type-badge", `type-${val4.type}`])
      }, toDisplayString(zz28(val4.type)), 3)]), createElementVNode("span", ut, toDisplayString(val4.title), 1), createElementVNode("span", rt, [val4.isRead ? (openBlock(), createElementBlock("span", ct, "已读")) : (openBlock(), createElementBlock("span", vt, "未读"))]), createElementVNode("span", pt, toDisplayString(zz27(val4.createdAt)), 1), createElementVNode("span", {
        class: "col-action",
        onClick: val3[7] || (val3[7] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("button", {
        class: "action-btn",
        onClick: val5 => zz16(val4.id)
      }, "删除", 8, mt)])], 8, nt))), 128))])), refVal5.value > refVal6.value ? (openBlock(), createElementBlock("div", ft, [createElementVNode("button", {
        class: "page-btn",
        disabled: refVal4.value === 1,
        onClick: val3[8] || (val3[8] = val4 => {
          refVal4.value--, zz11();
        })
      }, " 上一页 ", 8, yt), createElementVNode("span", gt, toDisplayString(refVal4.value) + " / " + toDisplayString(Math.ceil(refVal5.value / refVal6.value)), 1), createElementVNode("button", {
        class: "page-btn",
        disabled: refVal4.value >= Math.ceil(refVal5.value / refVal6.value),
        onClick: val3[9] || (val3[9] = val4 => {
          refVal4.value++, zz11();
        })
      }, " 下一页 ", 8, bt)])) : createCommentVNode("", !0)])) : createCommentVNode("", !0), refVal.value === "templates" ? (openBlock(), createElementBlock("div", _t, [createElementVNode("div", kt, [withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[10] || (val3[10] = val4 => refVal15.value = val4),
        class: "filter-select"
      }, [val3[32] || (val3[32] = createElementVNode("option", {
        value: ""
      }, "全部类型", -1)), (openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("option", {
        key: val4.value,
        value: val4.value
      }, toDisplayString(val4.label), 9, wt)), 64))], 512), [[deepDirectiveOptions, refVal15.value]]), createElementVNode("button", {
        class: "primary-btn",
        onClick: zz18
      }, "新建模板")]), refVal14.value ? (openBlock(), createElementBlock("div", ht, [...(val3[33] || (val3[33] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal13.value.length === 0 ? (openBlock(), createElementBlock("div", Tt, [...(val3[34] || (val3[34] = [createElementVNode("p", null, "暂无模板", -1)]))])) : (openBlock(), createElementBlock("div", Ct, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal13.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "template-card"
      }, [createElementVNode("div", xt, [createElementVNode("span", Mt, toDisplayString(val4.code), 1), createElementVNode("span", {
        class: normalizeClass(["type-badge", `type-${val4.type}`])
      }, toDisplayString(zz28(val4.type)), 3), val4.status === 1 ? (openBlock(), createElementBlock("span", St, "启用")) : (openBlock(), createElementBlock("span", $t, "禁用"))]), createElementVNode("div", It, toDisplayString(val4.titleTemplate), 1), createElementVNode("div", Dt, toDisplayString(val4.contentTemplate), 1), createElementVNode("div", Vt, [createElementVNode("span", Ut, toDisplayString(zz27(val4.updatedAt)), 1), createElementVNode("div", Bt, [createElementVNode("button", {
        class: "action-btn",
        onClick: val5 => zz19(val4)
      }, "编辑", 8, Pt), createElementVNode("button", {
        class: "action-btn danger",
        onClick: val5 => zz22(val4)
      }, "删除", 8, At)])])]))), 128))]))])) : createCommentVNode("", !0), refVal.value === "send" ? (openBlock(), createElementBlock("div", zt, [createElementVNode("div", Ft, [createElementVNode("div", Lt, [val3[35] || (val3[35] = createElementVNode("label", {
        class: "form-label"
      }, "消息类型", -1)), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[11] || (val3[11] = val4 => refVal24.value.type = val4),
        class: "form-select"
      }, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("option", {
        key: val4.value,
        value: val4.value
      }, toDisplayString(val4.label), 9, Nt)), 64))], 512), [[deepDirectiveOptions, refVal24.value.type]])]), createElementVNode("div", Rt, [val3[36] || (val3[36] = createElementVNode("label", {
        class: "form-label"
      }, "接收用户ID（多个用逗号分隔）", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[12] || (val3[12] = val4 => refVal24.value.userIds = val4),
        type: "text",
        class: "form-input",
        placeholder: "例如: 1, 2, 3"
      }, null, 512), [[vModelText, refVal24.value.userIds]])]), createElementVNode("div", Et, [val3[37] || (val3[37] = createElementVNode("label", {
        class: "form-label"
      }, "标题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[13] || (val3[13] = val4 => refVal24.value.title = val4),
        type: "text",
        class: "form-input",
        placeholder: "请输入消息标题"
      }, null, 512), [[vModelText, refVal24.value.title]])]), createElementVNode("div", Kt, [val3[38] || (val3[38] = createElementVNode("label", {
        class: "form-label"
      }, "内容", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val3[14] || (val3[14] = val4 => refVal24.value.content = val4),
        class: "form-textarea",
        placeholder: "请输入消息内容",
        rows: "5"
      }, null, 512), [[vModelText, refVal24.value.content]])]), createElementVNode("div", jt, [createElementVNode("button", {
        class: "primary-btn",
        disabled: refVal25.value,
        onClick: zz24
      }, toDisplayString(refVal25.value ? "发送中..." : "发送给指定用户"), 9, Gt), createElementVNode("button", {
        class: "secondary-btn",
        disabled: refVal26.value,
        onClick: zz25
      }, toDisplayString(refVal26.value ? "广播中..." : "广播给所有用户"), 9, Ht)])])])) : createCommentVNode("", !0), refVal.value === "stats" ? (openBlock(), createElementBlock("div", Ot, [refVal28.value ? (openBlock(), createElementBlock("div", Zt, [...(val3[39] || (val3[39] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal27.value ? (openBlock(), createElementBlock("div", qt, [createElementVNode("div", Jt, [createElementVNode("div", Qt, toDisplayString(refVal27.value.totalMessages), 1), val3[40] || (val3[40] = createElementVNode("div", {
        class: "stat-label"
      }, "总消息数", -1))]), createElementVNode("div", Wt, [createElementVNode("div", Xt, toDisplayString(refVal27.value.unreadMessages), 1), val3[41] || (val3[41] = createElementVNode("div", {
        class: "stat-label"
      }, "未读消息", -1))]), createElementVNode("div", Yt, [createElementVNode("div", es, toDisplayString(refVal27.value.readMessages), 1), val3[42] || (val3[42] = createElementVNode("div", {
        class: "stat-label"
      }, "已读消息", -1))]), createElementVNode("div", ts, [createElementVNode("div", ss, toDisplayString(refVal27.value.todaySent), 1), val3[43] || (val3[43] = createElementVNode("div", {
        class: "stat-label"
      }, "今日发送", -1))]), createElementVNode("div", as, [val3[48] || (val3[48] = createElementVNode("div", {
        class: "stat-label"
      }, "按类型分布", -1)), createElementVNode("div", ls, [createElementVNode("div", ns, [val3[44] || (val3[44] = createElementVNode("span", {
        class: "type-badge type-ticket"
      }, "抢票", -1)), createElementVNode("span", os, toDisplayString(refVal27.value.typeStats.ticket), 1)]), createElementVNode("div", is, [val3[45] || (val3[45] = createElementVNode("span", {
        class: "type-badge type-rating"
      }, "社区", -1)), createElementVNode("span", ds, toDisplayString(refVal27.value.typeStats.rating), 1)]), createElementVNode("div", us, [val3[46] || (val3[46] = createElementVNode("span", {
        class: "type-badge type-contribution"
      }, "反馈", -1)), createElementVNode("span", rs, toDisplayString(refVal27.value.typeStats.contribution), 1)]), createElementVNode("div", cs, [val3[47] || (val3[47] = createElementVNode("span", {
        class: "type-badge type-system"
      }, "系统", -1)), createElementVNode("span", vs, toDisplayString(refVal27.value.typeStats.system), 1)])])])])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: val3[18] || (val3[18] = val4 => refVal11.value = !1)
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal11.value && refVal12.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val3[17] || (val3[17] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", ps, [createElementVNode("span", {
            class: normalizeClass(["type-badge", `type-${refVal12.value.type}`])
          }, toDisplayString(zz28(refVal12.value.type)), 3), createElementVNode("button", {
            class: "drawer-close",
            onClick: val3[15] || (val3[15] = val4 => refVal11.value = !1)
          }, [...(val3[49] || (val3[49] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("h3", ms, toDisplayString(refVal12.value.title), 1), createElementVNode("div", fs, [createElementVNode("span", null, "用户: " + toDisplayString(refVal12.value.username) + " (ID: " + toDisplayString(refVal12.value.userId) + ")", 1), createElementVNode("span", null, toDisplayString(zz27(refVal12.value.createdAt)), 1)]), createElementVNode("div", ys, toDisplayString(refVal12.value.content), 1), createElementVNode("div", gs, [refVal12.value.isRead ? (openBlock(), createElementBlock("span", bs, "已读")) : (openBlock(), createElementBlock("span", _s, "未读")), createElementVNode("button", {
            class: "action-btn danger",
            onClick: val3[16] || (val3[16] = val4 => zz16(refVal12.value.id))
          }, " 删除 ")])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz20
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val3[24] || (val3[24] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", ks, [createElementVNode("h3", ws, toDisplayString(refVal17.value ? "编辑模板" : "新建模板"), 1), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz20
          }, [...(val3[50] || (val3[50] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", hs, [val3[51] || (val3[51] = createElementVNode("label", {
            class: "form-label"
          }, "模板代码 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val3[19] || (val3[19] = val4 => refVal19.value.code = val4),
            type: "text",
            class: "form-input",
            placeholder: "例如: TICKET_GRAB_SUCCESS",
            disabled: refVal17.value
          }, null, 8, Ts), [[vModelText, refVal19.value.code]])]), createElementVNode("div", Cs, [val3[52] || (val3[52] = createElementVNode("label", {
            class: "form-label"
          }, "消息类型", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val3[20] || (val3[20] = val4 => refVal19.value.type = val4),
            class: "form-select"
          }, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("option", {
            key: val4.value,
            value: val4.value
          }, toDisplayString(val4.label), 9, xs)), 64))], 512), [[deepDirectiveOptions, refVal19.value.type]])]), createElementVNode("div", Ms, [val3[53] || (val3[53] = createElementVNode("label", {
            class: "form-label"
          }, "标题模板 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val3[21] || (val3[21] = val4 => refVal19.value.titleTemplate = val4),
            type: "text",
            class: "form-input",
            placeholder: "支持 {变量名}"
          }, null, 512), [[vModelText, refVal19.value.titleTemplate]])]), createElementVNode("div", Ss, [val3[54] || (val3[54] = createElementVNode("label", {
            class: "form-label"
          }, "内容模板 *", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val3[22] || (val3[22] = val4 => refVal19.value.contentTemplate = val4),
            class: "form-textarea",
            placeholder: "支持 {变量名}",
            rows: "4"
          }, null, 512), [[vModelText, refVal19.value.contentTemplate]])]), createElementVNode("div", $s, [val3[56] || (val3[56] = createElementVNode("label", {
            class: "form-label"
          }, "状态", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val3[23] || (val3[23] = val4 => refVal19.value.status = val4),
            class: "form-select"
          }, [...(val3[55] || (val3[55] = [createElementVNode("option", {
            value: 1
          }, "启用", -1), createElementVNode("option", {
            value: 0
          }, "禁用", -1)]))], 512), [[deepDirectiveOptions, refVal19.value.status]])]), createElementVNode("div", Is, [createElementVNode("button", {
            class: "secondary-btn",
            onClick: zz20
          }, "取消"), createElementVNode("button", {
            class: "primary-btn",
            disabled: refVal20.value,
            onClick: zz21
          }, toDisplayString(refVal20.value ? "保存中..." : "保存"), 9, Ds)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal21.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: val3[27] || (val3[27] = val4 => refVal21.value = !1)
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [refVal21.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val3[26] || (val3[26] = withModifiers(() => {}, ["stop"]))
          }, [val3[57] || (val3[57] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", Vs, "确定要删除 " + toDisplayString(refVal22.value?.name) + " 吗？此操作不可恢复。", 1), createElementVNode("div", Us, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: val3[25] || (val3[25] = val4 => refVal21.value = !1)
          }, "取消"), createElementVNode("button", {
            class: "modal-btn confirm",
            disabled: refVal23.value,
            onClick: zz23
          }, toDisplayString(refVal23.value ? "删除中..." : "确定"), 9, Bs)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Ns = withScopeId(Ps, [["__scopeId", "data-v-62c1fa07"]]);
/* index 运行时导出（已语义化） */
export { Ns as default };