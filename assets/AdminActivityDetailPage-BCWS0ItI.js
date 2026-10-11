/*!
 * 页面模块：创建活动（AdminActivityDetailPage）
 * 路由：/admin/tickets/new   name=admin-tickets-new   层级=3   需登录=是
 * 功能：登录后的「创建活动」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/AdminActivityDetailPage-BCWS0ItI.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, watch, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, withDirectives, vModelText, createVNodeWrapper, deepWatchOptions, toDisplayValue, TransitionGroup, renderList, unref, withModifiers, deepDirectiveOptions, directiveCreated, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：票务接口模块 —— 票据查询 / 抢票 / 核销 / 验票 / 管理审核 等语义化 API */
import { getAdminTicketActivitiesById as getAdminTicketActivity, getAdminTicketActivitiesStats as getAdminTicketActivityStats, createAdminTicketActivities as createAdminTicketActivity, updateAdminTicketActivities as updateAdminTicketActivity, createAdminTicketActivitiesStatus as setAdminTicketActivityStatus, updateAdminTicketSessions as updateAdminTicketSession, createAdminTicketActivitiesSessions as createAdminTicketSession, deleteAdminTicketActivities as deleteAdminTicketActivity, deleteAdminTicketSessions as deleteAdminTicketSession, exportAdminTicketActivity } from "./ticket-SMxxVFG1.js";
/* 导入：本地模块 file（站点内功能模块） */
import { uploadFiles as Re } from "./file-CSaAaIBf.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Ge = {
    class: "page-container"
  },
  Oe = {
    class: "page-content"
  },
  je = {
    class: "content-container"
  },
  He = {
    class: "breadcrumb-wrapper"
  },
  Je = {
    key: 0,
    class: "loading-container"
  },
  We = {
    class: "page-header-section"
  },
  Ze = {
    class: "header-main"
  },
  Ke = {
    class: "page-title"
  },
  Qe = {
    class: "page-subtitle"
  },
  Xe = {
    key: 0,
    class: "header-status"
  },
  Ye = {
    key: 0,
    class: "mobile-status-bar"
  },
  et = {
    key: 1,
    class: "stats-section"
  },
  tt = {
    class: "stats-grid"
  },
  st = {
    class: "stat-card"
  },
  at = {
    class: "stat-value"
  },
  lt = {
    class: "stat-card"
  },
  it = {
    class: "stat-value"
  },
  ot = {
    class: "stat-card"
  },
  nt = {
    class: "stat-value"
  },
  ut = {
    class: "stat-card"
  },
  rt = {
    class: "stat-value"
  },
  dt = {
    class: "stats-actions"
  },
  ct = ["disabled"],
  vt = {
    class: "form-section"
  },
  mt = {
    class: "form-group"
  },
  ft = {
    class: "form-group"
  },
  pt = {
    class: "form-group"
  },
  gt = {
    key: 0,
    class: "image-preview-wrapper"
  },
  bt = ["src"],
  _t = {
    class: "image-actions"
  },
  yt = ["disabled"],
  kt = {
    key: 0,
    class: "upload-loading"
  },
  xt = {
    class: "form-section"
  },
  ht = {
    class: "config-grid"
  },
  Tt = {
    class: "config-item"
  },
  wt = {
    class: "config-item"
  },
  Ct = {
    class: "config-item"
  },
  Ut = {
    class: "form-group"
  },
  St = {
    class: "form-section"
  },
  Vt = {
    class: "section-header"
  },
  qt = {
    class: "config-toggle"
  },
  Mt = ["onUpdate:modelValue"],
  $t = ["onUpdate:modelValue"],
  At = ["value"],
  Dt = {
    class: "field-required"
  },
  It = ["onUpdate:modelValue"],
  Bt = ["onClick"],
  Pt = {
    key: 2,
    class: "form-section"
  },
  Nt = {
    key: 0,
    class: "empty-sessions"
  },
  Ft = {
    key: 1,
    class: "sessions-list"
  },
  Rt = {
    class: "session-info"
  },
  Et = {
    class: "session-header"
  },
  Lt = {
    class: "session-name"
  },
  zt = {
    class: "session-time"
  },
  Gt = {
    class: "session-tickets"
  },
  Ot = {
    class: "session-actions"
  },
  jt = ["onClick"],
  Ht = ["onClick"],
  Jt = {
    class: "action-section"
  },
  Wt = {
    class: "action-left"
  },
  Zt = {
    class: "action-right"
  },
  Kt = ["disabled"],
  Qt = {
    class: "modal-content"
  },
  Xt = {
    class: "modal-title"
  },
  Yt = {
    class: "modal-form"
  },
  es = {
    class: "form-group"
  },
  ts = {
    class: "form-group"
  },
  ss = {
    class: "form-row"
  },
  as = {
    class: "form-group"
  },
  ls = {
    class: "form-group"
  },
  is = {
    class: "form-group"
  },
  os = {
    class: "modal-actions"
  },
  ns = ["disabled"],
  us = {
    class: "modal-content"
  },
  rs = {
    class: "modal-desc"
  },
  ds = {
    class: "modal-actions"
  },
  cs = ["disabled"],
  vs = ["disabled"],
  ms = {
    class: "modal-content"
  },
  fs = {
    class: "status-options"
  },
  ps = ["value"],
  gs = {
    class: "status-option-content"
  },
  bs = {
    class: "status-option-label"
  },
  _s = {
    class: "status-option-desc"
  },
  ys = {
    key: 0,
    class: "current-tag"
  },
  ks = {
    class: "modal-actions"
  },
  xs = ["disabled"],
  hs = ["disabled"],
  Ts = defineComponent({
    __name: "AdminActivityDetailPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => !val2.params.id || val2.params.id === "new" || val2.name === "admin-tickets-new"),
        val4 = applyDirectives(() => val3.value ? null : Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref(null),
        refVal4 = ref(null),
        refVal5 = ref({
          name: "",
          description: "",
          imageUrl: "",
          config: {
            require_campus_binding: !1,
            require_extra_info: !1,
            extra_info_fields: [],
            require_approval: !1,
            max_tickets_per_user: 1,
            auto_confirm_tickets: !0
          }
        }),
        refVal6 = ref(!1),
        refVal7 = ref(!1),
        refVal8 = ref(null),
        refVal9 = ref({
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          totalTickets: 100
        }),
        refVal10 = ref(!1),
        refVal11 = ref("activity"),
        refVal12 = ref(null),
        refVal13 = ref(""),
        refVal14 = ref(!1),
        refVal15 = ref(!1),
        refVal16 = ref(null),
        refVal17 = ref(!1),
        list = [{
          value: "text",
          label: "文本"
        }, {
          value: "number",
          label: "数字"
        }, {
          value: "email",
          label: "邮箱"
        }, {
          value: "phone",
          label: "手机号"
        }, {
          value: "textarea",
          label: "多行文本"
        }];
      /* 调用接口：获取单个活动管理详情、获取活动统计数据（异步请求） */
      async function zz0() {
        if (val3.value) {
          refVal.value = !1;
          return;
        }
        try {
          const [val1, val5] = await Promise.all([getAdminTicketActivity(val4.value), getAdminTicketActivityStats(val4.value)]);
          if (val1.data.code === 200) refVal3.value = val1.data.data, refVal5.value.name = refVal3.value.name, refVal5.value.description = refVal3.value.description || "", refVal5.value.imageUrl = refVal3.value.imageUrl || "", refVal5.value.config = {
            ...refVal3.value.config
          };else {
            useToast1.error(val1.data.message || "获取活动详情失败"), useRouter1.push("/admin/tickets");
            return;
          }
          val5.data.code === 200 && (refVal4.value = val5.data.data);
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/admin/tickets");
        } finally {
          refVal.value = !1;
        }
      }
      /* 调用接口：创建票务活动、更新票务活动（异步请求） */
      async function zz1() {
        if (!refVal5.value.name.trim()) {
          useToast1.error("请输入活动名称");
          return;
        }
        refVal2.value = !0;
        try {
          if (val3.value) {
            const adminTicketActivity = await createAdminTicketActivity({
              name: refVal5.value.name,
              description: refVal5.value.description || void 0,
              imageUrl: refVal5.value.imageUrl || void 0,
              config: refVal5.value.config
            });
            adminTicketActivity.data.code === 200 ? (useToast1.success("活动创建成功"), useRouter1.replace(`/admin/tickets/${adminTicketActivity.data.data.id}`)) : useToast1.error(adminTicketActivity.data.message || "创建失败");
          } else {
            const adminTicketActivity = await updateAdminTicketActivity(val4.value, {
              name: refVal5.value.name,
              description: refVal5.value.description || void 0,
              imageUrl: refVal5.value.imageUrl || void 0,
              config: refVal5.value.config
            });
            adminTicketActivity.data.code === 200 ? (useToast1.success("保存成功"), refVal3.value = adminTicketActivity.data.data) : useToast1.error(adminTicketActivity.data.message || "保存失败");
          }
        } catch {
          useToast1.error("保存失败");
        } finally {
          refVal2.value = !1;
        }
      }
      const refVal18 = ref(!1),
        refVal19 = ref(!1),
        refVal20 = ref(null),
        list2 = [{
          value: "draft",
          label: "草稿",
          desc: "活动未发布，仅管理员可见"
        }, {
          value: "published",
          label: "已发布",
          desc: "活动已发布，用户可见但不可抢票"
        }, {
          value: "active",
          label: "进行中",
          desc: "活动进行中，用户可抢票"
        }, {
          value: "ended",
          label: "已结束",
          desc: "活动已结束，不可抢票"
        }, {
          value: "cancelled",
          label: "已取消",
          desc: "活动已取消"
        }];
      function zz2() {
        refVal3.value && (refVal20.value = refVal3.value.status, refVal18.value = !0);
      }
      /* 调用接口：设置活动状态（上/下线）（异步请求） */
      async function zz3() {
        if (!(!val4.value || !refVal20.value)) {
          refVal19.value = !0;
          try {
            const adminTicketActivityStatus = await setAdminTicketActivityStatus(val4.value, refVal20.value);
            adminTicketActivityStatus.data.code === 200 ? (useToast1.success("状态更新成功"), refVal3.value = adminTicketActivityStatus.data.data, refVal18.value = !1) : useToast1.error(adminTicketActivityStatus.data.message || "更新失败");
          } catch {
            useToast1.error("更新失败");
          } finally {
            refVal19.value = !1;
          }
        }
      }
      /* 调用接口：设置活动状态（上/下线）（异步请求） */
      async function zz4(val1) {
        if (val4.value) try {
          const adminTicketActivityStatus = await setAdminTicketActivityStatus(val4.value, val1);
          adminTicketActivityStatus.data.code === 200 ? (useToast1.success("状态更新成功"), refVal3.value = adminTicketActivityStatus.data.data) : useToast1.error(adminTicketActivityStatus.data.message || "更新失败");
        } catch {
          useToast1.error("更新失败");
        }
      }
      function zz5() {
        refVal7.value = !1, refVal8.value = null, refVal9.value = {
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          totalTickets: 100
        }, refVal6.value = !0;
      }
      function zz6(val1) {
        refVal7.value = !0, refVal8.value = val1.id, refVal9.value = {
          name: val1.name,
          description: val1.description || "",
          startTime: zz7(val1.startTime),
          endTime: zz7(val1.endTime),
          totalTickets: val1.totalTickets
        }, refVal6.value = !0;
      }
      function zz7(val1) {
        return new Date(val1).toISOString().slice(0, 16);
      }
      /* 调用接口：更新活动场次、创建活动场次（异步请求） */
      async function zz8() {
        if (!refVal9.value.name.trim()) {
          useToast1.error("请输入档期名称");
          return;
        }
        if (!refVal9.value.startTime || !refVal9.value.endTime) {
          useToast1.error("请选择开始和结束时间");
          return;
        }
        if (refVal9.value.totalTickets < 1) {
          useToast1.error("票数至少为 1");
          return;
        }
        refVal2.value = !0;
        try {
          if (refVal7.value && refVal8.value) {
            const adminTicketSession = await updateAdminTicketSession(refVal8.value, {
              name: refVal9.value.name,
              description: refVal9.value.description || void 0,
              startTime: refVal9.value.startTime,
              endTime: refVal9.value.endTime,
              totalTickets: refVal9.value.totalTickets
            });
            adminTicketSession.data.code === 200 ? (useToast1.success("档期更新成功"), refVal6.value = !1, zz0()) : useToast1.error(adminTicketSession.data.message || "更新失败");
          } else {
            const adminTicketSession = await createAdminTicketSession(val4.value, {
              name: refVal9.value.name,
              description: refVal9.value.description || void 0,
              startTime: refVal9.value.startTime,
              endTime: refVal9.value.endTime,
              totalTickets: refVal9.value.totalTickets
            });
            adminTicketSession.data.code === 200 ? (useToast1.success("档期创建成功"), refVal6.value = !1, zz0()) : useToast1.error(adminTicketSession.data.message || "创建失败");
          }
        } catch {
          useToast1.error("保存失败");
        } finally {
          refVal2.value = !1;
        }
      }
      function zz9(val1, val5, val6) {
        refVal11.value = val1, refVal12.value = val5, refVal13.value = val6, refVal10.value = !0;
      }
      /* 调用接口：删除活动、删除活动场次（异步请求） */
      async function zz10() {
        if (refVal12.value) {
          refVal14.value = !0;
          try {
            if (refVal11.value === "activity") {
              const adminTicketActivity = await deleteAdminTicketActivity(refVal12.value);
              adminTicketActivity.data.code === 200 ? (useToast1.success("活动已删除"), useRouter1.push("/admin/tickets")) : useToast1.error(adminTicketActivity.data.message || "删除失败");
            } else {
              const adminTicketSession = await deleteAdminTicketSession(refVal12.value);
              adminTicketSession.data.code === 200 ? (useToast1.success("档期已删除"), refVal10.value = !1, zz0()) : useToast1.error(adminTicketSession.data.message || "删除失败");
            }
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal14.value = !1;
          }
        }
      }
      function zz11() {
        refVal5.value.config.extra_info_fields || (refVal5.value.config.extra_info_fields = []), refVal5.value.config.extra_info_fields.push({
          name: `field_${Date.now()}`,
          label: "",
          type: "text",
          required: !1
        });
      }
      function zz12(val1) {
        refVal5.value.config.extra_info_fields.splice(val1, 1);
      }
      function zz13() {
        val4.value && useRouter1.push(`/admin/tickets/${val4.value}/review`);
      }
      /* 调用接口：导出活动数据（异步请求） */
      async function zz14() {
        if (!(refVal17.value || !val4.value)) {
          refVal17.value = !0;
          try {
            const val1 = await exportAdminTicketActivity(val4.value);
            val1.success ? useToast1.success("导出成功") : useToast1.error(val1.error || "导出失败，请稍后重试");
          } catch {
            useToast1.error("导出失败，请稍后重试");
          } finally {
            refVal17.value = !1;
          }
        }
      }
      function zz15() {
        refVal16.value?.click();
      }
      async function zz16(val1) {
        const val5 = val1.target,
          val6 = val5.files?.[0];
        if (val6) {
          if (!val6.type.startsWith("image/")) {
            useToast1.error("请选择图片文件");
            return;
          }
          if (val6.size > 10 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 10MB");
            return;
          }
          refVal15.value = !0;
          try {
            const val7 = await Re(val6, "activity_image");
            val7.data.code === 200 ? (refVal5.value.imageUrl = val7.data.data.fileUrl, useToast1.success("图片上传成功")) : useToast1.error(val7.data.message || "上传失败");
          } catch {
            useToast1.error("上传失败，请重试");
          } finally {
            refVal15.value = !1, val5.value = "";
          }
        }
      }
      function zz17() {
        refVal5.value.imageUrl = "";
      }
      function zz18(val1) {
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
          },
          waiting: {
            label: "等待中",
            class: "status-waiting"
          }
        }[val1] || {
          label: val1,
          class: ""
        };
      }
      function zz19(val1) {
        return new Date(val1).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageTickets) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), watch(() => val2.params.id, () => {
        val2.path.includes("/admin/tickets/") && zz0();
      }), watch(() => refVal5.value.config.require_approval, val1 => {
        val1 && (refVal5.value.config.auto_confirm_tickets = !1);
      }), watch(() => refVal5.value.config.auto_confirm_tickets, val1 => {
        val1 && (refVal5.value.config.require_approval = !1);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => (openBlock(), createElementBlock("div", Ge, [createVNode(PageHeader, {
        "back-to": "/admin/tickets"
      }), createElementVNode("main", Oe, [createElementVNode("div", je, [createElementVNode("div", He, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", Je, [...(val5[22] || (val5[22] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", We, [createElementVNode("div", Ze, [createElementVNode("div", null, [createElementVNode("h1", Ke, toDisplayString(val3.value ? "创建活动" : "编辑活动"), 1), createElementVNode("p", Qe, toDisplayString(val3.value ? "填写活动信息" : refVal3.value?.name), 1)]), !val3.value && refVal3.value ? (openBlock(), createElementBlock("div", Xe, [createElementVNode("button", {
        class: normalizeClass(["status-badge-btn", zz18(refVal3.value.status).class]),
        onClick: zz2
      }, [createTextVNode(toDisplayString(zz18(refVal3.value.status).label) + " ", 1), val5[23] || (val5[23] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1))], 2)])) : createCommentVNode("", !0)])]), !val3.value && refVal3.value ? (openBlock(), createElementBlock("div", Ye, [val5[25] || (val5[25] = createElementVNode("span", {
        class: "mobile-status-label"
      }, "活动状态", -1)), createElementVNode("button", {
        class: normalizeClass(["status-badge-btn", zz18(refVal3.value.status).class]),
        onClick: zz2
      }, [createTextVNode(toDisplayString(zz18(refVal3.value.status).label) + " ", 1), val5[24] || (val5[24] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1))], 2)])) : createCommentVNode("", !0), !val3.value && refVal4.value ? (openBlock(), createElementBlock("div", et, [createElementVNode("div", tt, [createElementVNode("div", st, [createElementVNode("div", at, toDisplayString(refVal4.value.totalTickets), 1), val5[26] || (val5[26] = createElementVNode("div", {
        class: "stat-label"
      }, "总票数", -1))]), createElementVNode("div", lt, [createElementVNode("div", it, toDisplayString(refVal4.value.grabbedTickets), 1), val5[27] || (val5[27] = createElementVNode("div", {
        class: "stat-label"
      }, "已抢票", -1))]), createElementVNode("div", ot, [createElementVNode("div", nt, toDisplayString(refVal4.value.pendingTickets), 1), val5[28] || (val5[28] = createElementVNode("div", {
        class: "stat-label"
      }, "待审核", -1))]), createElementVNode("div", ut, [createElementVNode("div", rt, toDisplayString(refVal4.value.usedTickets), 1), val5[29] || (val5[29] = createElementVNode("div", {
        class: "stat-label"
      }, "已使用", -1))])]), createElementVNode("div", dt, [refVal4.value.pendingTickets > 0 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "review-btn",
        onClick: zz13
      }, " 查看待审核票据 ")) : createCommentVNode("", !0), createElementVNode("button", {
        class: "export-btn",
        onClick: zz14,
        disabled: refVal17.value
      }, [val5[30] || (val5[30] = createElementVNode("svg", {
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
      })], -1)), createTextVNode(" " + toDisplayString(refVal17.value ? "导出中..." : "导出票据"), 1)], 8, ct)])])) : createCommentVNode("", !0), createElementVNode("div", vt, [val5[36] || (val5[36] = createElementVNode("h2", {
        class: "section-title"
      }, "基本信息", -1)), createElementVNode("div", mt, [val5[31] || (val5[31] = createElementVNode("label", {
        class: "form-label"
      }, "活动名称 *", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[0] || (val5[0] = val6 => refVal5.value.name = val6),
        type: "text",
        class: "form-input",
        placeholder: "请输入活动名称"
      }, null, 512), [[vModelText, refVal5.value.name]])]), createElementVNode("div", ft, [val5[32] || (val5[32] = createElementVNode("label", {
        class: "form-label"
      }, "活动描述", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val5[1] || (val5[1] = val6 => refVal5.value.description = val6),
        class: "form-textarea",
        placeholder: "请输入活动描述",
        rows: "3"
      }, null, 512), [[vModelText, refVal5.value.description]])]), createElementVNode("div", pt, [val5[35] || (val5[35] = createElementVNode("label", {
        class: "form-label"
      }, "封面图片", -1)), createElementVNode("input", {
        ref_key: "imageInputRef",
        ref: refVal16,
        type: "file",
        accept: "image/*",
        class: "hidden-input",
        onChange: zz16
      }, null, 544), refVal5.value.imageUrl ? (openBlock(), createElementBlock("div", gt, [createElementVNode("img", {
        src: refVal5.value.imageUrl,
        alt: "封面预览",
        class: "preview-image"
      }, null, 8, bt), createElementVNode("div", _t, [createElementVNode("button", {
        type: "button",
        class: "image-action-btn change",
        onClick: zz15,
        disabled: refVal15.value
      }, toDisplayString(refVal15.value ? "上传中..." : "更换图片"), 9, yt), createElementVNode("button", {
        type: "button",
        class: "image-action-btn remove",
        onClick: zz17
      }, " 删除 ")])])) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "image-upload-area",
        onClick: zz15
      }, [refVal15.value ? (openBlock(), createElementBlock("div", kt, [...(val5[33] || (val5[33] = [createElementVNode("div", {
        class: "loading-spinner small"
      }, null, -1), createElementVNode("span", null, "上传中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val5[34] || (val5[34] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-26169958><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-26169958></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-26169958></circle><polyline points="21 15 16 10 5 21" data-v-26169958></polyline></svg><span data-v-26169958>点击上传封面图片</span><span class="upload-hint" data-v-26169958>支持 JPG、PNG、GIF，最大 10MB</span>', 3))], 64))]))])]), createElementVNode("div", xt, [val5[41] || (val5[41] = createElementVNode("h2", {
        class: "section-title"
      }, "活动配置", -1)), createElementVNode("div", ht, [createElementVNode("label", Tt, [withDirectives(createElementVNode("input", {
        type: "checkbox",
        "onUpdate:modelValue": val5[2] || (val5[2] = val6 => refVal5.value.config.require_campus_binding = val6)
      }, null, 512), [[deepWatchOptions, refVal5.value.config.require_campus_binding]]), val5[37] || (val5[37] = createElementVNode("span", {
        class: "config-text"
      }, [createElementVNode("span", {
        class: "config-label"
      }, "需要绑定校园网"), createElementVNode("span", {
        class: "config-desc"
      }, "用户必须先绑定校园网账号才能抢票")], -1))]), createElementVNode("label", wt, [withDirectives(createElementVNode("input", {
        type: "checkbox",
        "onUpdate:modelValue": val5[3] || (val5[3] = val6 => refVal5.value.config.require_approval = val6)
      }, null, 512), [[deepWatchOptions, refVal5.value.config.require_approval]]), val5[38] || (val5[38] = createElementVNode("span", {
        class: "config-text"
      }, [createElementVNode("span", {
        class: "config-label"
      }, "需要管理员审核"), createElementVNode("span", {
        class: "config-desc"
      }, "抢票后需要管理员审核通过才能使用")], -1))]), createElementVNode("label", Ct, [withDirectives(createElementVNode("input", {
        type: "checkbox",
        "onUpdate:modelValue": val5[4] || (val5[4] = val6 => refVal5.value.config.auto_confirm_tickets = val6)
      }, null, 512), [[deepWatchOptions, refVal5.value.config.auto_confirm_tickets]]), val5[39] || (val5[39] = createElementVNode("span", {
        class: "config-text"
      }, [createElementVNode("span", {
        class: "config-label"
      }, "自动确认票据"), createElementVNode("span", {
        class: "config-desc"
      }, "抢票成功后自动确认（无需审核时有效）")], -1))])]), createElementVNode("div", Ut, [val5[40] || (val5[40] = createElementVNode("label", {
        class: "form-label"
      }, "每用户最大抢票数", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[5] || (val5[5] = val6 => refVal5.value.config.max_tickets_per_user = val6),
        type: "number",
        class: "form-input small",
        min: "1"
      }, null, 512), [[vModelText, refVal5.value.config.max_tickets_per_user, void 0, {
        number: !0
      }]])])]), createElementVNode("div", St, [createElementVNode("div", Vt, [val5[43] || (val5[43] = createElementVNode("h2", {
        class: "section-title"
      }, "额外信息收集", -1)), createElementVNode("label", qt, [withDirectives(createElementVNode("input", {
        type: "checkbox",
        "onUpdate:modelValue": val5[6] || (val5[6] = val6 => refVal5.value.config.require_extra_info = val6)
      }, null, 512), [[deepWatchOptions, refVal5.value.config.require_extra_info]]), val5[42] || (val5[42] = createElementVNode("span", null, "启用", -1))])]), refVal5.value.config.require_extra_info ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createVNode(TransitionGroup, {
        name: "field-list",
        tag: "div",
        class: "extra-fields-container"
      }, {
        default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal5.value.config.extra_info_fields, (val6, val7) => (openBlock(), createElementBlock("div", {
          key: val6.name,
          class: "extra-field-item"
        }, [withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val8 => val6.label = val8,
          type: "text",
          class: "form-input",
          placeholder: "字段名称"
        }, null, 8, Mt), [[vModelText, val6.label]]), withDirectives(createElementVNode("select", {
          "onUpdate:modelValue": val8 => val6.type = val8,
          class: "form-select"
        }, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val8 => createElementVNode("option", {
          key: val8.value,
          value: val8.value
        }, toDisplayString(val8.label), 9, At)), 64))], 8, $t), [[deepDirectiveOptions, val6.type]]), createElementVNode("label", Dt, [withDirectives(createElementVNode("input", {
          type: "checkbox",
          "onUpdate:modelValue": val8 => val6.required = val8
        }, null, 8, It), [[deepWatchOptions, val6.required]]), val5[44] || (val5[44] = createElementVNode("span", null, "必填", -1))]), createElementVNode("button", {
          class: "remove-field-btn",
          onClick: val8 => zz12(val7)
        }, [...(val5[45] || (val5[45] = [createElementVNode("svg", {
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
        })], -1)]))], 8, Bt)]))), 128))]),
        _: 1
      }), createElementVNode("button", {
        class: "add-field-btn",
        onClick: zz11
      }, [...(val5[46] || (val5[46] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加字段 ", -1)]))])], 64)) : createCommentVNode("", !0)]), !val3.value && refVal3.value ? (openBlock(), createElementBlock("div", Pt, [createElementVNode("div", {
        class: "section-header"
      }, [val5[48] || (val5[48] = createElementVNode("h2", {
        class: "section-title"
      }, "档期管理", -1)), createElementVNode("button", {
        class: "add-session-btn",
        onClick: zz5
      }, [...(val5[47] || (val5[47] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加档期 ", -1)]))])]), refVal3.value.sessions.length === 0 ? (openBlock(), createElementBlock("div", Nt, [...(val5[49] || (val5[49] = [createElementVNode("p", null, "暂无档期，请添加档期", -1)]))])) : (openBlock(), createElementBlock("div", Ft, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value.sessions, val6 => (openBlock(), createElementBlock("div", {
        key: val6.id,
        class: "session-card"
      }, [createElementVNode("div", Rt, [createElementVNode("div", Et, [createElementVNode("h3", Lt, toDisplayString(val6.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge small", zz18(val6.status).class])
      }, toDisplayString(zz18(val6.status).label), 3)]), createElementVNode("p", zt, toDisplayString(zz19(val6.startTime)) + " - " + toDisplayString(zz19(val6.endTime)), 1), createElementVNode("p", Gt, " 已售 " + toDisplayString(val6.totalTickets - val6.availableTickets) + " / " + toDisplayString(val6.totalTickets) + " 票 ", 1)]), createElementVNode("div", Ot, [createElementVNode("button", {
        class: "session-btn edit",
        onClick: val7 => zz6(val6)
      }, " 编辑 ", 8, jt), createElementVNode("button", {
        class: "session-btn delete",
        onClick: val7 => zz9("session", val6.id, val6.name)
      }, " 删除 ", 8, Ht)])]))), 128))]))])) : createCommentVNode("", !0), createElementVNode("div", Jt, [createElementVNode("div", Wt, [!val3.value && refVal3.value && (refVal3.value.status === "draft" || refVal3.value.status === "ended") ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "delete-btn",
        onClick: val5[7] || (val5[7] = val6 => zz9("activity", refVal3.value.id, refVal3.value.name))
      }, " 删除活动 ")) : createCommentVNode("", !0)]), createElementVNode("div", Zt, [createElementVNode("button", {
        class: "cancel-btn",
        onClick: val5[8] || (val5[8] = val6 => unref(useRouter1).push("/admin/tickets"))
      }, " 取消 "), !val3.value && refVal3.value?.status === "draft" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "publish-btn",
        onClick: val5[9] || (val5[9] = val6 => zz4("published"))
      }, " 发布活动 ")) : createCommentVNode("", !0), createElementVNode("button", {
        class: "save-btn",
        onClick: zz1,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "保存中..." : "保存"), 9, Kt)])])], 64))])]), createVNode(PageFooter), refVal6.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: val5[16] || (val5[16] = withModifiers(val6 => refVal6.value = !1, ["self"]))
      }, [createElementVNode("div", Qt, [createElementVNode("h3", Xt, toDisplayString(refVal7.value ? "编辑档期" : "添加档期"), 1), createElementVNode("div", Yt, [createElementVNode("div", es, [val5[50] || (val5[50] = createElementVNode("label", {
        class: "form-label"
      }, "档期名称 *", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[10] || (val5[10] = val6 => refVal9.value.name = val6),
        type: "text",
        class: "form-input",
        placeholder: "如：第一场"
      }, null, 512), [[vModelText, refVal9.value.name]])]), createElementVNode("div", ts, [val5[51] || (val5[51] = createElementVNode("label", {
        class: "form-label"
      }, "档期描述", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val5[11] || (val5[11] = val6 => refVal9.value.description = val6),
        class: "form-textarea",
        placeholder: "档期描述（可选）",
        rows: "2"
      }, null, 512), [[vModelText, refVal9.value.description]])]), createElementVNode("div", ss, [createElementVNode("div", as, [val5[52] || (val5[52] = createElementVNode("label", {
        class: "form-label"
      }, "开始时间 *", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[12] || (val5[12] = val6 => refVal9.value.startTime = val6),
        type: "datetime-local",
        class: "form-input"
      }, null, 512), [[vModelText, refVal9.value.startTime]])]), createElementVNode("div", ls, [val5[53] || (val5[53] = createElementVNode("label", {
        class: "form-label"
      }, "结束时间 *", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[13] || (val5[13] = val6 => refVal9.value.endTime = val6),
        type: "datetime-local",
        class: "form-input"
      }, null, 512), [[vModelText, refVal9.value.endTime]])])]), createElementVNode("div", is, [val5[54] || (val5[54] = createElementVNode("label", {
        class: "form-label"
      }, "总票数 *", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[14] || (val5[14] = val6 => refVal9.value.totalTickets = val6),
        type: "number",
        class: "form-input small",
        min: "1"
      }, null, 512), [[vModelText, refVal9.value.totalTickets, void 0, {
        number: !0
      }]])])]), createElementVNode("div", os, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: val5[15] || (val5[15] = val6 => refVal6.value = !1)
      }, " 取消 "), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz8,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "保存中..." : "保存"), 9, ns)])])])) : createCommentVNode("", !0), refVal10.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "modal-overlay",
        onClick: val5[18] || (val5[18] = withModifiers(val6 => refVal10.value = !1, ["self"]))
      }, [createElementVNode("div", us, [val5[55] || (val5[55] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), createElementVNode("p", rs, " 确定要删除" + toDisplayString(refVal11.value === "activity" ? "活动" : "档期") + '"' + toDisplayString(refVal13.value) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", ds, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: val5[17] || (val5[17] = val6 => refVal10.value = !1),
        disabled: refVal14.value
      }, " 取消 ", 8, cs), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz10,
        disabled: refVal14.value
      }, toDisplayString(refVal14.value ? "删除中..." : "确认删除"), 9, vs)])])])) : createCommentVNode("", !0), refVal18.value ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "modal-overlay",
        onClick: val5[21] || (val5[21] = withModifiers(val6 => refVal18.value = !1, ["self"]))
      }, [createElementVNode("div", ms, [val5[56] || (val5[56] = createElementVNode("h3", {
        class: "modal-title"
      }, "切换活动状态", -1)), createElementVNode("div", fs, [(openBlock(), createElementBlock(Fragment, null, renderList(list2, val6 => createElementVNode("label", {
        key: val6.value,
        class: normalizeClass(["status-option", {
          active: refVal20.value === val6.value,
          current: refVal3.value?.status === val6.value
        }])
      }, [withDirectives(createElementVNode("input", {
        type: "radio",
        value: val6.value,
        "onUpdate:modelValue": val5[19] || (val5[19] = val7 => refVal20.value = val7),
        class: "status-radio"
      }, null, 8, ps), [[directiveCreated, refVal20.value]]), createElementVNode("div", gs, [createElementVNode("span", bs, toDisplayString(val6.label), 1), createElementVNode("span", _s, toDisplayString(val6.desc), 1)]), refVal3.value?.status === val6.value ? (openBlock(), createElementBlock("span", ys, "当前")) : createCommentVNode("", !0)], 2)), 64))]), createElementVNode("div", ks, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: val5[20] || (val5[20] = val6 => refVal18.value = !1),
        disabled: refVal19.value
      }, " 取消 ", 8, xs), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz3,
        disabled: refVal19.value || refVal20.value === refVal3.value?.status
      }, toDisplayString(refVal19.value ? "切换中..." : "确认切换"), 9, hs)])])])) : createCommentVNode("", !0)]));
    }
  }),
  $s = withScopeId(Ts, [["__scopeId", "data-v-26169958"]]);
/* index 运行时导出（已语义化） */
export { $s as default };