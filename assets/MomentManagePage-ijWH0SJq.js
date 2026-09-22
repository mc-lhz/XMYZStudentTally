/*!
 * 页面模块：瞬间管理（MomentManagePage）
 * 路由：/admin/museum/moments   name=admin-museum-moments   层级=3   需登录=是
 * 功能：登录后的「瞬间管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MomentManagePage-ijWH0SJq.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, createVNodeWrapper, withDirectives, vModelText, withKeys, normalizeClass, toDisplayString, Fragment, renderList, withModifiers, createTextVNode, unref, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 museum-BDeGDA-n（站点内功能模块） */
import { getAdminMuseumMoments as ye, approveAdminMuseumMoments as Ce, rejectAdminMuseumMoments as we, takedownAdminMuseumMoments as Me, deleteAdminMuseumMoments as xe, batchAdminMuseumMoments as je } from "./museum-BDeGDA-n.js";
/* 导入：本地模块 museum（站点内功能模块） */
import { museumStatusLabel } from "./museum-BRoy68F1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Te = {
    class: "page-container"
  },
  Pe = {
    class: "page-content"
  },
  Se = {
    class: "content-container"
  },
  Be = {
    class: "breadcrumb-wrapper"
  },
  ze = {
    class: "search-bar"
  },
  Le = {
    class: "search-input-wrapper"
  },
  Re = {
    class: "status-tabs"
  },
  Ne = {
    key: 0,
    class: "batch-actions"
  },
  Ve = {
    class: "select-all"
  },
  Ie = ["checked"],
  Fe = {
    class: "batch-btns"
  },
  Oe = ["disabled"],
  Ue = ["disabled"],
  Ge = ["disabled"],
  He = ["disabled"],
  Ke = {
    key: 1,
    class: "loading-container"
  },
  qe = {
    key: 0,
    class: "empty-container"
  },
  Ee = {
    key: 1,
    class: "moments-list"
  },
  Je = ["onClick"],
  Qe = ["checked", "onChange"],
  We = {
    class: "moment-user"
  },
  Xe = {
    class: "user-avatar"
  },
  Ye = {
    class: "user-info"
  },
  Ze = {
    class: "user-name"
  },
  et = {
    key: 0,
    class: "anonymous-badge"
  },
  tt = {
    class: "moment-content"
  },
  st = {
    class: "content-text"
  },
  at = {
    key: 0,
    class: "content-images"
  },
  lt = ["src"],
  nt = {
    key: 0,
    class: "more-images"
  },
  ot = {
    class: "moment-meta"
  },
  it = {
    key: 0,
    class: "event-tag"
  },
  ut = {
    class: "meta-item"
  },
  ct = {
    class: "meta-item"
  },
  dt = {
    class: "meta-time"
  },
  rt = {
    class: "moment-actions"
  },
  vt = ["onClick"],
  mt = ["onClick"],
  pt = ["onClick"],
  bt = ["onClick"],
  kt = {
    key: 2,
    class: "pagination"
  },
  gt = ["disabled"],
  _t = {
    class: "page-info"
  },
  ht = ["disabled"],
  ft = {
    class: "modal-content"
  },
  yt = {
    class: "modal-title"
  },
  Ct = {
    class: "form-group"
  },
  wt = {
    class: "form-label"
  },
  Mt = ["placeholder"],
  xt = {
    class: "modal-actions"
  },
  jt = ["disabled"],
  At = ["disabled"],
  $t = {
    class: "modal-content"
  },
  Dt = {
    class: "modal-actions"
  },
  Tt = ["disabled"],
  Pt = ["disabled"],
  St = {
    class: "modal-content modal-lg"
  },
  Bt = {
    class: "detail-user"
  },
  zt = {
    class: "user-avatar large"
  },
  Lt = {
    class: "user-info"
  },
  Rt = {
    class: "user-name"
  },
  Nt = {
    key: 0,
    class: "user-username"
  },
  Vt = {
    key: 1,
    class: "anonymous-badge"
  },
  It = {
    class: "detail-content"
  },
  Ft = {
    key: 0,
    class: "detail-images"
  },
  Ot = ["src"],
  Ut = {
    class: "detail-meta"
  },
  Gt = {
    class: "meta-row"
  },
  Ht = {
    class: "meta-value"
  },
  Kt = {
    class: "meta-row"
  },
  qt = {
    class: "meta-value"
  },
  Et = {
    key: 0,
    class: "meta-row"
  },
  Jt = {
    class: "meta-value"
  },
  Qt = {
    class: "meta-row"
  },
  Wt = {
    class: "meta-value"
  },
  Xt = {
    class: "meta-row"
  },
  Yt = {
    class: "meta-value"
  },
  Zt = {
    class: "detail-actions"
  },
  es = defineComponent({
    __name: "MomentManagePage",
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
        refVal7 = ref(""),
        list = ["all", 0, 1, 2, 3],
        refVal8 = ref(""),
        refVal9 = ref(!1);
      watch(refVal6, (val1, val4) => {
        if (val4 === void 0) return;
        const val5 = list.indexOf(val4),
          val6 = list.indexOf(val1);
        refVal8.value = val6 > val5 ? "left" : "right", refVal9.value = !0, refVal4.value = 1, zz0(), nextTick(() => {
          setTimeout(() => {
            refVal9.value = !1, refVal8.value = "";
          }, 300);
        });
      });
      const refVal10 = ref(!1),
        refVal11 = ref(null),
        refVal12 = ref(!1),
        refVal13 = ref(!1),
        refVal14 = ref(null),
        refVal15 = ref(""),
        refVal16 = ref(!1),
        refVal17 = ref("reject"),
        refVal18 = ref(!1),
        refVal19 = ref(null),
        refVal20 = ref([]),
        val2 = applyDirectives(() => refVal2.value.length === 0 ? !1 : refVal2.value.every(val1 => refVal20.value.includes(val1.id))),
        val3 = applyDirectives(() => Math.ceil(refVal3.value / refVal5.value));
      async function zz0() {
        refVal.value = !0;
        try {
          const obj = {
            page: refVal4.value,
            size: refVal5.value
          };
          refVal6.value !== "all" && (obj.status = refVal6.value), refVal7.value.trim() && (obj.keyword = refVal7.value.trim());
          const val1 = await ye(obj);
          refVal2.value = val1.list, refVal3.value = val1.total, refVal20.value = [];
        } catch {
          useToast1.error("获取瞬间列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1() {
        refVal4.value = 1, zz0();
      }
      function zz2(val1) {
        val1 < 1 || val1 > val3.value || (refVal4.value = val1, zz0());
      }
      async function zz3(val1, val4) {
        val4?.stopPropagation();
        try {
          await Ce(val1.id), useToast1.success("已通过审核"), zz0();
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz4(val1, val4, val5) {
        val5?.stopPropagation(), refVal14.value = val1, refVal17.value = val4, refVal15.value = "", refVal13.value = !0;
      }
      async function zz5() {
        if (refVal14.value) {
          if (!refVal15.value.trim()) {
            useToast1.error("请输入原因");
            return;
          }
          refVal16.value = !0;
          try {
            refVal17.value === "reject" ? (await we(refVal14.value.id, {
              reason: refVal15.value.trim()
            }), useToast1.success("已拒绝")) : (await Me(refVal14.value.id, {
              reason: refVal15.value.trim()
            }), useToast1.success("已下架")), refVal13.value = !1, refVal14.value = null, zz0();
          } catch {
            useToast1.error("操作失败");
          } finally {
            refVal16.value = !1;
          }
        }
      }
      function zz6() {
        refVal13.value = !1, refVal14.value = null, refVal15.value = "";
      }
      function zz7(val1, val4) {
        val4?.stopPropagation(), refVal11.value = val1, refVal10.value = !0;
      }
      async function zz8() {
        if (refVal11.value) {
          refVal12.value = !0;
          try {
            await xe(refVal11.value.id), useToast1.success("删除成功"), refVal10.value = !1, refVal11.value = null, zz0();
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal12.value = !1;
          }
        }
      }
      function zz9() {
        refVal10.value = !1, refVal11.value = null;
      }
      function zz10(val1) {
        refVal19.value = val1, refVal18.value = !0;
      }
      function zz11() {
        refVal18.value = !1, refVal19.value = null;
      }
      function zz12(val1) {
        const val4 = refVal20.value.indexOf(val1);
        val4 === -1 ? refVal20.value.push(val1) : refVal20.value.splice(val4, 1);
      }
      function zz13() {
        val2.value ? refVal20.value = [] : refVal20.value = refVal2.value.map(val1 => val1.id);
      }
      async function zz14(val1) {
        if (refVal20.value.length === 0) {
          useToast1.error("请先选择要操作的瞬间");
          return;
        }
        const obj = {
          approve: "通过",
          reject: "拒绝",
          takedown: "下架",
          delete: "删除"
        };
        try {
          await je({
            ids: refVal20.value,
            action: val1
          }), useToast1.success(`批量${obj[val1]}成功`), zz0();
        } catch {
          useToast1.error(`批量${obj[val1]}失败`);
        }
      }
      function zz15(val1) {
        return new Date(val1).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz16(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMuseum) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", Te, [createVNode(PageHeader, {
        "back-to": "/admin/museum"
      }), createElementVNode("main", Pe, [createElementVNode("div", Se, [createElementVNode("div", Be, [createVNode(PageBreadcrumb)]), val4[25] || (val4[25] = createVNodeWrapper('<div class="page-header-section" data-v-00cb84c2><div class="header-main" data-v-00cb84c2><div class="header-text" data-v-00cb84c2><h1 class="page-title" data-v-00cb84c2>瞬间管理</h1><p class="page-subtitle" data-v-00cb84c2>审核和管理用户投稿的瞬间</p></div></div></div>', 1)), createElementVNode("div", ze, [createElementVNode("div", Le, [val4[18] || (val4[18] = createElementVNode("svg", {
        class: "search-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), createElementVNode("path", {
        d: "M21 21l-4.35-4.35"
      })], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal7.value = val5),
        type: "text",
        class: "search-input",
        placeholder: "搜索瞬间内容...",
        onKeyup: withKeys(zz1, ["enter"])
      }, null, 544), [[vModelText, refVal7.value]])]), createElementVNode("button", {
        class: "search-btn",
        onClick: zz1
      }, "搜索")]), createElementVNode("div", Re, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "all"
        }]),
        onClick: val4[1] || (val4[1] = val5 => refVal6.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 0
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal6.value = 0)
      }, " 待审核 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 1
        }]),
        onClick: val4[3] || (val4[3] = val5 => refVal6.value = 1)
      }, " 已发布 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 2
        }]),
        onClick: val4[4] || (val4[4] = val5 => refVal6.value = 2)
      }, " 已拒绝 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 3
        }]),
        onClick: val4[5] || (val4[5] = val5 => refVal6.value = 3)
      }, " 已下架 ", 2)]), refVal2.value.length > 0 ? (openBlock(), createElementBlock("div", Ne, [createElementVNode("label", Ve, [createElementVNode("input", {
        type: "checkbox",
        checked: val2.value,
        onChange: zz13
      }, null, 40, Ie), val4[19] || (val4[19] = createElementVNode("span", null, "全选", -1))]), createElementVNode("div", Fe, [refVal6.value === 0 || refVal6.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "batch-btn approve",
        disabled: refVal20.value.length === 0,
        onClick: val4[6] || (val4[6] = val5 => zz14("approve"))
      }, " 批量通过 ", 8, Oe)) : createCommentVNode("", !0), refVal6.value === 0 || refVal6.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "batch-btn reject",
        disabled: refVal20.value.length === 0,
        onClick: val4[7] || (val4[7] = val5 => zz14("reject"))
      }, " 批量拒绝 ", 8, Ue)) : createCommentVNode("", !0), refVal6.value === 1 || refVal6.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "batch-btn takedown",
        disabled: refVal20.value.length === 0,
        onClick: val4[8] || (val4[8] = val5 => zz14("takedown"))
      }, " 批量下架 ", 8, Ge)) : createCommentVNode("", !0), createElementVNode("button", {
        class: "batch-btn delete",
        disabled: refVal20.value.length === 0,
        onClick: val4[9] || (val4[9] = val5 => zz14("delete"))
      }, " 批量删除 ", 8, He)])])) : createCommentVNode("", !0), refVal.value ? (openBlock(), createElementBlock("div", Ke, [...(val4[20] || (val4[20] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal9.value && refVal8.value === "left",
          "slide-right": refVal9.value && refVal8.value === "right"
        }])
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", qe, [val4[21] || (val4[21] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      })])], -1)), createElementVNode("h2", null, toDisplayString(refVal6.value === "all" ? "暂无瞬间" : "暂无相关瞬间"), 1), createElementVNode("p", null, toDisplayString(refVal6.value === "all" ? "还没有用户投稿瞬间" : "没有找到该状态的瞬间"), 1)])) : (openBlock(), createElementBlock("div", Ee, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "moment-card",
        onClick: val6 => zz10(val5)
      }, [createElementVNode("div", {
        class: "moment-checkbox",
        onClick: val4[10] || (val4[10] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("input", {
        type: "checkbox",
        checked: refVal20.value.includes(val5.id),
        onChange: val6 => zz12(val5.id)
      }, null, 40, Qe)]), createElementVNode("div", We, [createElementVNode("div", Xe, toDisplayString(val5.isAnonymous ? "匿" : val5.nickname?.charAt(0) || val5.username.charAt(0)), 1), createElementVNode("div", Ye, [createElementVNode("span", Ze, toDisplayString(val5.isAnonymous ? "匿名用户" : val5.nickname || val5.username), 1), val5.isAnonymous ? (openBlock(), createElementBlock("span", et, "匿名")) : createCommentVNode("", !0)])]), createElementVNode("div", tt, [createElementVNode("p", st, toDisplayString(val5.content), 1), val5.images && val5.images.length > 0 ? (openBlock(), createElementBlock("div", at, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.images.slice(0, 3), (val6, val7) => (openBlock(), createElementBlock("img", {
        key: val7,
        src: val6,
        class: "content-image"
      }, null, 8, lt))), 128)), val5.images.length > 3 ? (openBlock(), createElementBlock("div", nt, " +" + toDisplayString(val5.images.length - 3), 1)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]), createElementVNode("div", ot, [createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(museumStatusLabel)(val5.status).class])
      }, toDisplayString(unref(museumStatusLabel)(val5.status).label), 3), val5.eventTitle ? (openBlock(), createElementBlock("span", it, toDisplayString(val5.eventTitle), 1)) : createCommentVNode("", !0), createElementVNode("span", ut, [val4[22] || (val4[22] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      })], -1)), createTextVNode(" " + toDisplayString(val5.likeCount), 1)]), createElementVNode("span", ct, [val4[23] || (val4[23] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      })], -1)), createTextVNode(" " + toDisplayString(val5.commentCount), 1)]), createElementVNode("span", dt, toDisplayString(zz16(val5.createdAt)), 1)]), createElementVNode("div", rt, [val5.status === 0 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn approve",
        onClick: val6 => zz3(val5, val6)
      }, " 通过 ", 8, vt)) : createCommentVNode("", !0), val5.status === 0 ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "action-btn reject",
        onClick: val6 => zz4(val5, "reject", val6)
      }, " 拒绝 ", 8, mt)) : createCommentVNode("", !0), val5.status === 1 ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "action-btn takedown",
        onClick: val6 => zz4(val5, "takedown", val6)
      }, " 下架 ", 8, pt)) : createCommentVNode("", !0), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val6 => zz7(val5, val6)
      }, " 删除 ", 8, bt), val4[24] || (val4[24] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Je))), 128))])), val3.value > 1 ? (openBlock(), createElementBlock("div", kt, [createElementVNode("button", {
        class: "page-btn",
        disabled: refVal4.value === 1,
        onClick: val4[11] || (val4[11] = val5 => zz2(refVal4.value - 1))
      }, " 上一页 ", 8, gt), createElementVNode("span", _t, toDisplayString(refVal4.value) + " / " + toDisplayString(val3.value), 1), createElementVNode("button", {
        class: "page-btn",
        disabled: refVal4.value === val3.value,
        onClick: val4[12] || (val4[12] = val5 => zz2(refVal4.value + 1))
      }, " 下一页 ", 8, ht)])) : createCommentVNode("", !0)], 2))])]), createVNode(PageFooter), refVal13.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz6, ["self"])
      }, [createElementVNode("div", ft, [createElementVNode("h3", yt, toDisplayString(refVal17.value === "reject" ? "拒绝审核" : "下架瞬间"), 1), createElementVNode("div", Ct, [createElementVNode("label", wt, [createTextVNode(toDisplayString(refVal17.value === "reject" ? "拒绝原因" : "下架原因") + " ", 1), val4[26] || (val4[26] = createElementVNode("span", {
        class: "required"
      }, "*", -1))]), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val4[13] || (val4[13] = val5 => refVal15.value = val5),
        class: "form-textarea",
        placeholder: refVal17.value === "reject" ? "请输入拒绝原因" : "请输入下架原因",
        rows: "3"
      }, null, 8, Mt), [[vModelText, refVal15.value]])]), createElementVNode("div", xt, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz6,
        disabled: refVal16.value
      }, " 取消 ", 8, jt), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz5,
        disabled: refVal16.value
      }, toDisplayString(refVal16.value ? "处理中..." : "确认"), 9, At)])])])) : createCommentVNode("", !0), refVal10.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "modal-overlay",
        onClick: withModifiers(zz9, ["self"])
      }, [createElementVNode("div", $t, [val4[27] || (val4[27] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), val4[28] || (val4[28] = createElementVNode("p", {
        class: "modal-desc"
      }, " 确定要删除这条瞬间吗？此操作不可撤销。 ", -1)), createElementVNode("div", Dt, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz9,
        disabled: refVal12.value
      }, " 取消 ", 8, Tt), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz8,
        disabled: refVal12.value
      }, toDisplayString(refVal12.value ? "删除中..." : "确认删除"), 9, Pt)])])])) : createCommentVNode("", !0), refVal18.value && refVal19.value ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: "modal-overlay",
        onClick: withModifiers(zz11, ["self"])
      }, [createElementVNode("div", St, [val4[34] || (val4[34] = createElementVNode("h3", {
        class: "modal-title"
      }, "瞬间详情", -1)), createElementVNode("div", Bt, [createElementVNode("div", zt, toDisplayString(refVal19.value.isAnonymous ? "匿" : refVal19.value.nickname?.charAt(0) || refVal19.value.username.charAt(0)), 1), createElementVNode("div", Lt, [createElementVNode("span", Rt, toDisplayString(refVal19.value.isAnonymous ? "匿名用户" : refVal19.value.nickname || refVal19.value.username), 1), refVal19.value.isAnonymous ? createCommentVNode("", !0) : (openBlock(), createElementBlock("span", Nt, "@" + toDisplayString(refVal19.value.username), 1)), refVal19.value.isAnonymous ? (openBlock(), createElementBlock("span", Vt, "匿名投稿")) : createCommentVNode("", !0)]), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(museumStatusLabel)(refVal19.value.status).class])
      }, toDisplayString(unref(museumStatusLabel)(refVal19.value.status).label), 3)]), createElementVNode("div", It, [createElementVNode("p", null, toDisplayString(refVal19.value.content), 1)]), refVal19.value.images && refVal19.value.images.length > 0 ? (openBlock(), createElementBlock("div", Ft, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal19.value.images, (val5, val6) => (openBlock(), createElementBlock("img", {
        key: val6,
        src: val5,
        class: "detail-image"
      }, null, 8, Ot))), 128))])) : createCommentVNode("", !0), createElementVNode("div", Ut, [createElementVNode("div", Gt, [val4[29] || (val4[29] = createElementVNode("span", {
        class: "meta-label"
      }, "瞬间时间：", -1)), createElementVNode("span", Ht, toDisplayString(zz15(refVal19.value.momentTime)), 1)]), createElementVNode("div", Kt, [val4[30] || (val4[30] = createElementVNode("span", {
        class: "meta-label"
      }, "投稿时间：", -1)), createElementVNode("span", qt, toDisplayString(zz15(refVal19.value.createdAt)), 1)]), refVal19.value.eventTitle ? (openBlock(), createElementBlock("div", Et, [val4[31] || (val4[31] = createElementVNode("span", {
        class: "meta-label"
      }, "关联活动：", -1)), createElementVNode("span", Jt, toDisplayString(refVal19.value.eventTitle), 1)])) : createCommentVNode("", !0), createElementVNode("div", Qt, [val4[32] || (val4[32] = createElementVNode("span", {
        class: "meta-label"
      }, "点赞数：", -1)), createElementVNode("span", Wt, toDisplayString(refVal19.value.likeCount), 1)]), createElementVNode("div", Xt, [val4[33] || (val4[33] = createElementVNode("span", {
        class: "meta-label"
      }, "评论数：", -1)), createElementVNode("span", Yt, toDisplayString(refVal19.value.commentCount), 1)])]), createElementVNode("div", Zt, [refVal19.value.status === 0 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn approve",
        onClick: val4[14] || (val4[14] = val5 => {
          zz3(refVal19.value), zz11();
        })
      }, " 通过审核 ")) : createCommentVNode("", !0), refVal19.value.status === 0 ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "action-btn reject",
        onClick: val4[15] || (val4[15] = val5 => {
          zz11(), zz4(refVal19.value, "reject");
        })
      }, " 拒绝 ")) : createCommentVNode("", !0), refVal19.value.status === 1 ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "action-btn takedown",
        onClick: val4[16] || (val4[16] = val5 => {
          zz11(), zz4(refVal19.value, "takedown");
        })
      }, " 下架 ")) : createCommentVNode("", !0), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4[17] || (val4[17] = val5 => {
          zz11(), zz7(refVal19.value);
        })
      }, " 删除 "), createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz11
      }, " 关闭 ")])])])) : createCommentVNode("", !0)]));
    }
  }),
  us = withScopeId(es, [["__scopeId", "data-v-00cb84c2"]]);
/* index 运行时导出（已语义化） */
export { us as default };