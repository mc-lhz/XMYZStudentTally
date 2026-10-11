/*!
 * 页面模块：活动管理（MuseumEventsPage）
 * 路由：/admin/museum/events   name=admin-museum-events   层级=3   需登录=是
 * 功能：登录后的「活动管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MuseumEventsPage-Czhbu_BO.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, withDirectives, vModelText, withKeys, deepDirectiveOptions, Fragment, renderList, normalizeClass, createVNodeWrapper, toDisplayString, withModifiers, unref, resolveRaw, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 museum-BDeGDA-n（站点内功能模块） */
import { getAdminMuseumTags as ft, getAdminMuseumEvents as yt, deleteAdminMuseumEvents as kt, batchAdminMuseumEvents as xt, publishAdminMuseumEvents as _t, unpublishAdminMuseumEvents as Ct, unfeatureAdminMuseumEvents as wt, featureAdminMuseumEvents as Pt } from "./museum-BDeGDA-n.js";
/* 导入：本地模块 museum（站点内功能模块） */
import { museumTypeLabel } from "./museum-BRoy68F1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Dt = {
    class: "page-container"
  },
  Mt = {
    class: "page-content"
  },
  St = {
    class: "content-container"
  },
  Tt = {
    class: "breadcrumb-wrapper"
  },
  Ft = {
    class: "filter-bar"
  },
  zt = {
    class: "search-input-wrapper"
  },
  It = ["value"],
  Ut = {
    class: "status-tabs"
  },
  Nt = {
    key: 0,
    class: "batch-actions"
  },
  Vt = {
    class: "select-all"
  },
  At = ["checked"],
  Lt = {
    class: "batch-btns"
  },
  Ot = ["disabled"],
  Gt = ["disabled"],
  Kt = ["disabled"],
  jt = ["disabled"],
  qt = {
    key: 1,
    class: "loading-container"
  },
  Ht = {
    key: 0,
    class: "empty-container"
  },
  Rt = {
    key: 1,
    class: "events-list"
  },
  Zt = ["onClick"],
  Jt = ["checked", "onChange"],
  Qt = {
    class: "event-cover"
  },
  Wt = ["src", "alt"],
  Xt = {
    key: 1,
    class: "cover-placeholder"
  },
  Yt = {
    key: 2,
    class: "featured-badge"
  },
  te = {
    class: "event-info"
  },
  ee = {
    class: "event-header"
  },
  se = {
    class: "event-title"
  },
  ae = {
    key: 0,
    class: "event-subtitle"
  },
  le = {
    key: 1,
    class: "event-tags"
  },
  ne = {
    class: "event-meta"
  },
  oe = {
    class: "meta-item"
  },
  ie = {
    key: 0,
    class: "meta-item"
  },
  re = {
    class: "meta-item"
  },
  ue = {
    class: "meta-item"
  },
  ce = {
    class: "event-actions"
  },
  de = ["onClick"],
  ve = ["onClick"],
  be = ["onClick"],
  pe = ["onClick"],
  he = ["onClick"],
  ge = {
    key: 2,
    class: "pagination"
  },
  me = ["disabled"],
  fe = {
    class: "page-info"
  },
  ye = ["disabled"],
  ke = {
    class: "modal-content"
  },
  xe = {
    class: "modal-desc"
  },
  _e = {
    class: "modal-actions"
  },
  Ce = ["disabled"],
  we = ["disabled"],
  Pe = defineComponent({
    __name: "MuseumEventsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref([]),
        refVal4 = ref(0),
        refVal5 = ref(1),
        refVal6 = ref(20),
        refVal7 = ref("all"),
        refVal8 = ref(null),
        refVal9 = ref(""),
        list = ["all", 0, 1, 2],
        refVal10 = ref(""),
        refVal11 = ref(!1);
      watch(refVal7, (val1, val4) => {
        if (val4 === void 0) return;
        const val5 = list.indexOf(val4),
          val6 = list.indexOf(val1);
        refVal10.value = val6 > val5 ? "left" : "right", refVal11.value = !0, refVal5.value = 1, zz1(), nextTick(() => {
          setTimeout(() => {
            refVal11.value = !1, refVal10.value = "";
          }, 300);
        });
      });
      const refVal12 = ref(!1),
        refVal13 = ref(null),
        refVal14 = ref(!1),
        refVal15 = ref([]),
        val2 = applyDirectives(() => refVal2.value.length === 0 ? !1 : refVal2.value.every(val1 => refVal15.value.includes(val1.id))),
        val3 = applyDirectives(() => Math.ceil(refVal4.value / refVal6.value));
      async function zz0() {
        try {
          refVal3.value = await ft({
            status: 1
          });
        } catch (val1) {
          console.error("Failed to load tags:", val1);
        }
      }
      async function zz1() {
        refVal.value = !0;
        try {
          const obj = {
            page: refVal5.value,
            size: refVal6.value
          };
          refVal7.value !== "all" && (obj.status = refVal7.value), refVal8.value && (obj.tagId = refVal8.value), refVal9.value.trim() && (obj.keyword = refVal9.value.trim());
          const val1 = await yt(obj);
          refVal2.value = val1.list, refVal4.value = val1.total, refVal15.value = [];
        } catch {
          useToast1.error("获取活动列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz2() {
        refVal5.value = 1, zz1();
      }
      function zz3() {
        refVal5.value = 1, zz1();
      }
      function zz4(val1) {
        val1 < 1 || val1 > val3.value || (refVal5.value = val1, zz1());
      }
      function zz5() {
        useRouter1.push("/admin/museum/events/create");
      }
      function zz6(val1) {
        useRouter1.push(`/admin/museum/events/${val1.id}/content`);
      }
      function zz7(val1, val4) {
        val4.stopPropagation(), useRouter1.push(`/admin/museum/events/${val1.id}/edit`);
      }
      async function zz8(val1, val4) {
        val4.stopPropagation();
        try {
          await _t(val1.id), useToast1.success("已发布"), zz1();
        } catch {
          useToast1.error("发布失败");
        }
      }
      async function zz9(val1, val4) {
        val4.stopPropagation();
        try {
          await Ct(val1.id), useToast1.success("已下架"), zz1();
        } catch {
          useToast1.error("下架失败");
        }
      }
      async function zz10(val1, val4) {
        val4.stopPropagation();
        try {
          val1.isFeatured ? (await wt(val1.id), useToast1.success("已取消精选")) : (await Pt(val1.id), useToast1.success("已设为精选")), zz1();
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz11(val1, val4) {
        val4.stopPropagation(), refVal13.value = val1, refVal12.value = !0;
      }
      async function zz12() {
        if (refVal13.value) {
          refVal14.value = !0;
          try {
            await kt(refVal13.value.id), useToast1.success("删除成功"), refVal12.value = !1, refVal13.value = null, zz1();
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal14.value = !1;
          }
        }
      }
      function zz13() {
        refVal12.value = !1, refVal13.value = null;
      }
      function zz14(val1) {
        const val4 = refVal15.value.indexOf(val1);
        val4 === -1 ? refVal15.value.push(val1) : refVal15.value.splice(val4, 1);
      }
      function zz15() {
        val2.value ? refVal15.value = [] : refVal15.value = refVal2.value.map(val1 => val1.id);
      }
      async function zz16(val1) {
        if (refVal15.value.length === 0) {
          useToast1.error("请先选择要操作的活动");
          return;
        }
        const obj = {
          publish: "发布",
          unpublish: "下架",
          feature: "设为精选",
          unfeature: "取消精选",
          delete: "删除"
        };
        try {
          await xt({
            ids: refVal15.value,
            action: val1
          }), useToast1.success(`批量${obj[val1]}成功`), zz1();
        } catch {
          useToast1.error(`批量${obj[val1]}失败`);
        }
      }
      function zz17(val1) {
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
        zz0(), zz1();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", Dt, [createVNode(PageHeader, {
        "back-to": "/admin/museum"
      }), createElementVNode("main", Mt, [createElementVNode("div", St, [createElementVNode("div", Tt, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val4[14] || (val4[14] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "活动管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "创建和管理时间线活动")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button primary",
        onClick: zz5
      }, [...(val4[13] || (val4[13] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 创建活动 ", -1)]))])])])]), createElementVNode("div", Ft, [createElementVNode("div", zt, [val4[15] || (val4[15] = createElementVNode("svg", {
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
        "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal9.value = val5),
        type: "text",
        class: "search-input",
        placeholder: "搜索活动...",
        onKeyup: withKeys(zz2, ["enter"])
      }, null, 544), [[vModelText, refVal9.value]])]), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val4[1] || (val4[1] = val5 => refVal8.value = val5),
        class: "filter-select",
        onChange: zz3
      }, [val4[16] || (val4[16] = createElementVNode("option", {
        value: null
      }, "全部标签", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val5 => (openBlock(), createElementBlock("option", {
        key: val5.id,
        value: val5.id
      }, toDisplayString(val5.name), 9, It))), 128))], 544), [[deepDirectiveOptions, refVal8.value]]), createElementVNode("button", {
        class: "search-btn",
        onClick: zz2
      }, "搜索")]), createElementVNode("div", Ut, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === "all"
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal7.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 0
        }]),
        onClick: val4[3] || (val4[3] = val5 => refVal7.value = 0)
      }, " 草稿 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 1
        }]),
        onClick: val4[4] || (val4[4] = val5 => refVal7.value = 1)
      }, " 已发布 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 2
        }]),
        onClick: val4[5] || (val4[5] = val5 => refVal7.value = 2)
      }, " 已下架 ", 2)]), refVal2.value.length > 0 ? (openBlock(), createElementBlock("div", Nt, [createElementVNode("label", Vt, [createElementVNode("input", {
        type: "checkbox",
        checked: val2.value,
        onChange: zz15
      }, null, 40, At), val4[17] || (val4[17] = createElementVNode("span", null, "全选", -1))]), createElementVNode("div", Lt, [createElementVNode("button", {
        class: "batch-btn publish",
        disabled: refVal15.value.length === 0,
        onClick: val4[6] || (val4[6] = val5 => zz16("publish"))
      }, " 批量发布 ", 8, Ot), createElementVNode("button", {
        class: "batch-btn unpublish",
        disabled: refVal15.value.length === 0,
        onClick: val4[7] || (val4[7] = val5 => zz16("unpublish"))
      }, " 批量下架 ", 8, Gt), createElementVNode("button", {
        class: "batch-btn feature",
        disabled: refVal15.value.length === 0,
        onClick: val4[8] || (val4[8] = val5 => zz16("feature"))
      }, " 批量精选 ", 8, Kt), createElementVNode("button", {
        class: "batch-btn delete",
        disabled: refVal15.value.length === 0,
        onClick: val4[9] || (val4[9] = val5 => zz16("delete"))
      }, " 批量删除 ", 8, jt)])])) : createCommentVNode("", !0), refVal.value ? (openBlock(), createElementBlock("div", qt, [...(val4[18] || (val4[18] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal11.value && refVal10.value === "left",
          "slide-right": refVal11.value && refVal10.value === "right"
        }])
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Ht, [val4[19] || (val4[19] = createVNodeWrapper('<div class="empty-icon" data-v-52b15986><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-52b15986><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-52b15986></rect><line x1="16" y1="2" x2="16" y2="6" data-v-52b15986></line><line x1="8" y1="2" x2="8" y2="6" data-v-52b15986></line><line x1="3" y1="10" x2="21" y2="10" data-v-52b15986></line></svg></div>', 1)), createElementVNode("h2", null, toDisplayString(refVal7.value === "all" ? "暂无活动" : "暂无相关活动"), 1), createElementVNode("p", null, toDisplayString(refVal7.value === "all" ? "还没有创建任何活动" : "没有找到该状态的活动"), 1), refVal7.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz5
      }, " 创建第一个活动 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Rt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "event-card",
        onClick: val6 => zz6(val5)
      }, [createElementVNode("div", {
        class: "event-checkbox",
        onClick: val4[10] || (val4[10] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("input", {
        type: "checkbox",
        checked: refVal15.value.includes(val5.id),
        onChange: val6 => zz14(val5.id)
      }, null, 40, Jt)]), createElementVNode("div", Qt, [val5.coverUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.coverUrl,
        alt: val5.title,
        class: "cover-image"
      }, null, 8, Wt)) : (openBlock(), createElementBlock("div", Xt, [...(val4[20] || (val4[20] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-52b15986><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-52b15986></rect><line x1="16" y1="2" x2="16" y2="6" data-v-52b15986></line><line x1="8" y1="2" x2="8" y2="6" data-v-52b15986></line><line x1="3" y1="10" x2="21" y2="10" data-v-52b15986></line></svg>', 1)]))])), val5.isFeatured ? (openBlock(), createElementBlock("span", Yt, "精选")) : createCommentVNode("", !0)]), createElementVNode("div", te, [createElementVNode("div", ee, [createElementVNode("h3", se, toDisplayString(val5.title), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(museumTypeLabel)(val5.status).class])
      }, toDisplayString(unref(museumTypeLabel)(val5.status).label), 3)]), val5.subtitle ? (openBlock(), createElementBlock("p", ae, toDisplayString(val5.subtitle), 1)) : createCommentVNode("", !0), val5.tags && val5.tags.length > 0 ? (openBlock(), createElementBlock("div", le, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.tags, val6 => (openBlock(), createElementBlock("span", {
        key: val6.id,
        class: "event-tag",
        style: resolveRaw({
          backgroundColor: val6.color + "20",
          color: val6.color
        })
      }, toDisplayString(val6.name), 5))), 128))])) : createCommentVNode("", !0), createElementVNode("div", ne, [createElementVNode("span", oe, [val4[21] || (val4[21] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-52b15986><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-52b15986></rect><line x1="16" y1="2" x2="16" y2="6" data-v-52b15986></line><line x1="8" y1="2" x2="8" y2="6" data-v-52b15986></line><line x1="3" y1="10" x2="21" y2="10" data-v-52b15986></line></svg>', 1)), createTextVNode(" " + toDisplayString(zz17(val5.startDate)), 1)]), val5.location ? (openBlock(), createElementBlock("span", ie, [val4[22] || (val4[22] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      })], -1)), createTextVNode(" " + toDisplayString(val5.location), 1)])) : createCommentVNode("", !0), createElementVNode("span", re, [val4[23] || (val4[23] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })], -1)), createTextVNode(" " + toDisplayString(val5.viewCount), 1)]), createElementVNode("span", ue, [val4[24] || (val4[24] = createElementVNode("svg", {
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
      })], -1)), createTextVNode(" " + toDisplayString(val5.momentCount), 1)])])]), createElementVNode("div", ce, [createElementVNode("button", {
        class: "action-btn edit",
        onClick: val6 => zz7(val5, val6)
      }, " 编辑 ", 8, de), val5.status === 0 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn publish",
        onClick: val6 => zz8(val5, val6)
      }, " 发布 ", 8, ve)) : createCommentVNode("", !0), val5.status === 1 ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "action-btn unpublish",
        onClick: val6 => zz9(val5, val6)
      }, " 下架 ", 8, be)) : createCommentVNode("", !0), createElementVNode("button", {
        class: normalizeClass(["action-btn feature", {
          active: val5.isFeatured
        }]),
        onClick: val6 => zz10(val5, val6)
      }, toDisplayString(val5.isFeatured ? "取消精选" : "精选"), 11, pe), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val6 => zz11(val5, val6)
      }, " 删除 ", 8, he), val4[25] || (val4[25] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Zt))), 128))])), val3.value > 1 ? (openBlock(), createElementBlock("div", ge, [createElementVNode("button", {
        class: "page-btn",
        disabled: refVal5.value === 1,
        onClick: val4[11] || (val4[11] = val5 => zz4(refVal5.value - 1))
      }, " 上一页 ", 8, me), createElementVNode("span", fe, toDisplayString(refVal5.value) + " / " + toDisplayString(val3.value), 1), createElementVNode("button", {
        class: "page-btn",
        disabled: refVal5.value === val3.value,
        onClick: val4[12] || (val4[12] = val5 => zz4(refVal5.value + 1))
      }, " 下一页 ", 8, ye)])) : createCommentVNode("", !0)], 2))])]), createVNode(PageFooter), refVal12.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz13, ["self"])
      }, [createElementVNode("div", ke, [val4[26] || (val4[26] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), createElementVNode("p", xe, ' 确定要删除活动"' + toDisplayString(refVal13.value?.title) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", _e, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz13,
        disabled: refVal14.value
      }, " 取消 ", 8, Ce), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz12,
        disabled: refVal14.value
      }, toDisplayString(refVal14.value ? "删除中..." : "确认删除"), 9, we)])])])) : createCommentVNode("", !0)]));
    }
  }),
  Fe = withScopeId(Pe, [["__scopeId", "data-v-52b15986"]]);
/* index 运行时导出（已语义化） */
export { Fe as default };