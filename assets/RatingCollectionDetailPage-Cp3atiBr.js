/*!
 * 页面模块：合集详情（RatingCollectionDetailPage）
 * 路由：/admin/rating/collections/:collectionId   name=admin-rating-collection-detail   层级=4   需登录=是
 * 功能：登录后的「合集详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingCollectionDetailPage-Cp3atiBr.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, createTextVNode, renderList, toDisplayValue, withSlots, unref, withModifiers, withDirectives, vModelText, normalizeClass, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getCollectionsById2 as ye, getCollectionsItemsById as he, getRatingItemsById as ke, createCollectionsItems as be, sortCollectionsItems as Ce, deleteCollectionsItems as we } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb49, getRatingPathName as Ie } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Re = {
    class: "page-container"
  },
  Pe = {
    class: "page-content"
  },
  Ae = {
    class: "content-container"
  },
  Me = {
    class: "breadcrumb-wrapper"
  },
  Ne = {
    key: 0,
    class: "loading-container"
  },
  Ue = {
    class: "collection-info-card"
  },
  Oe = {
    key: 0,
    class: "collection-cover"
  },
  Te = ["src", "alt"],
  De = {
    class: "collection-details"
  },
  Ve = {
    class: "collection-title"
  },
  ze = {
    key: 0,
    class: "collection-desc"
  },
  Fe = {
    class: "collection-stats"
  },
  Le = {
    class: "stat-item"
  },
  $e = {
    class: "stat-item"
  },
  je = {
    class: "items-section"
  },
  qe = {
    key: 0,
    class: "loading-inline"
  },
  Ee = {
    key: 1,
    class: "empty-container"
  },
  He = {
    key: 2,
    class: "items-list"
  },
  Ke = {
    class: "item-cover"
  },
  Ge = ["src", "alt"],
  Je = {
    key: 1,
    class: "cover-placeholder"
  },
  Qe = {
    class: "item-info"
  },
  We = {
    class: "item-name"
  },
  Xe = {
    class: "item-breadcrumb"
  },
  Ye = {
    class: "item-meta"
  },
  Ze = {
    class: "meta-item score"
  },
  es = {
    class: "meta-item"
  },
  ss = {
    class: "meta-item"
  },
  ts = {
    class: "item-actions"
  },
  as = ["onClick"],
  os = ["onClick"],
  ls = {
    class: "search-box"
  },
  ns = {
    key: 0,
    class: "search-loading"
  },
  is = {
    class: "search-results"
  },
  rs = {
    key: 0,
    class: "empty-search"
  },
  ds = {
    key: 1,
    class: "empty-search"
  },
  cs = ["onClick"],
  us = {
    class: "search-item-cover"
  },
  vs = ["src", "alt"],
  ms = {
    key: 1,
    class: "cover-placeholder-sm"
  },
  fs = {
    class: "search-item-info"
  },
  ps = {
    class: "search-item-name"
  },
  gs = {
    class: "search-item-path"
  },
  _s = {
    key: 0,
    class: "check-icon"
  },
  ys = {
    class: "modal-actions"
  },
  hs = ["disabled"],
  ks = ["disabled"],
  bs = {
    class: "modal-desc"
  },
  Cs = {
    class: "form-group"
  },
  ws = {
    class: "modal-actions"
  },
  Is = ["disabled"],
  xs = ["disabled"],
  Ss = {
    class: "modal-desc"
  },
  Bs = {
    class: "modal-actions"
  },
  Rs = ["disabled"],
  Ps = ["disabled"],
  As = defineComponent({
    __name: "RatingCollectionDetailPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.collectionId)),
        refVal = ref(!0),
        refVal2 = ref(!0),
        refVal3 = ref(null),
        refVal4 = ref([]),
        refVal5 = ref(0),
        refVal6 = ref(1),
        refVal7 = ref(50),
        refVal8 = ref(!1),
        refVal9 = ref(""),
        refVal10 = ref([]),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        refVal13 = ref(!1),
        refVal14 = ref(!1),
        refVal15 = ref(null),
        refVal16 = ref(0),
        refVal17 = ref(!1),
        refVal18 = ref(!1),
        refVal19 = ref(null),
        refVal20 = ref(!1);
      async function zz0() {
        try {
          const val1 = await ye(val3.value);
          val1.data.code === 200 ? refVal3.value = val1.data.data : (useToast1.error("获取合集信息失败"), useRouter1.push("/admin/rating/collections"));
        } catch {
          useToast1.error("获取合集信息失败"), useRouter1.push("/admin/rating/collections");
        }
      }
      async function zz1() {
        refVal2.value = !0;
        try {
          const val1 = await he(val3.value, {
            page: refVal6.value,
            size: refVal7.value
          });
          val1.data.code === 200 ? (refVal4.value = val1.data.data.items, refVal5.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取项目列表失败");
        } catch {
          useToast1.error("获取项目列表失败");
        } finally {
          refVal2.value = !1;
        }
      }
      async function zz2() {
        refVal.value = !0;
        try {
          await zz0(), await zz1();
        } finally {
          refVal.value = !1;
        }
      }
      async function zz3() {
        if (!refVal9.value.trim()) {
          refVal10.value = [];
          return;
        }
        refVal11.value = !0;
        try {
          const val1 = await ke({
            keyword: refVal9.value,
            size: 20,
            status: 1
          });
          if (val1.data.code === 200) {
            const set = new Set(refVal4.value.map(val4 => val4.ratingItemId));
            refVal10.value = val1.data.data.items.filter(val4 => !set.has(val4.id));
          }
        } catch {
          useToast1.error("搜索失败");
        } finally {
          refVal11.value = !1;
        }
      }
      function zz4() {
        refVal8.value = !0, refVal9.value = "", refVal10.value = [], refVal12.value = null;
      }
      function zz5() {
        refVal8.value = !1, refVal9.value = "", refVal10.value = [], refVal12.value = null;
      }
      function zz6(val1) {
        refVal12.value = val1.id;
      }
      async function zz7() {
        if (!refVal12.value) {
          useToast1.error("请选择要添加的项目");
          return;
        }
        refVal13.value = !0;
        try {
          const val1 = await be(val3.value, {
            ratingItemId: refVal12.value,
            sortOrder: 0
          });
          val1.data.code === 200 ? (useToast1.success("添加成功"), zz5(), await zz1(), await zz0()) : useToast1.error(val1.data.message || "添加失败");
        } catch {
          useToast1.error("添加失败");
        } finally {
          refVal13.value = !1;
        }
      }
      function zz8(val1) {
        refVal15.value = val1, refVal16.value = val1.sortOrder, refVal14.value = !0;
      }
      function zz9() {
        refVal14.value = !1, refVal15.value = null, refVal16.value = 0;
      }
      async function zz10() {
        if (refVal15.value) {
          refVal17.value = !0;
          try {
            const val1 = await Ce(val3.value, refVal15.value.ratingItemId, {
              sortOrder: refVal16.value
            });
            val1.data.code === 200 ? (useToast1.success("排序已更新"), zz9(), await zz1()) : useToast1.error(val1.data.message || "更新失败");
          } catch {
            useToast1.error("更新失败");
          } finally {
            refVal17.value = !1;
          }
        }
      }
      function zz11(val1) {
        refVal19.value = val1, refVal18.value = !0;
      }
      async function zz12() {
        if (refVal19.value) {
          refVal20.value = !0;
          try {
            const val1 = await we(val3.value, refVal19.value.ratingItemId);
            val1.data.code === 200 ? (useToast1.success("已移除"), refVal18.value = !1, refVal19.value = null, await zz1(), await zz0()) : useToast1.error(val1.data.message || "移除失败");
          } catch {
            useToast1.error("移除失败");
          } finally {
            refVal20.value = !1;
          }
        }
      }
      function zz13() {
        refVal18.value = !1, refVal19.value = null;
      }
      function zz14() {
        useRouter1.push("/admin/rating/collections");
      }
      function zz15(val1) {
        return val1.toFixed(1);
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz2();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", Re, [createVNode(PageHeader, {
        "back-to": "/admin/rating/collections"
      }), createElementVNode("main", Pe, [createElementVNode("div", Ae, [createElementVNode("div", Me, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", Ne, [...(val4[5] || (val4[5] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal3.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Ue, [refVal3.value.coverUrl ? (openBlock(), createElementBlock("div", Oe, [createElementVNode("img", {
        src: refVal3.value.coverUrl,
        alt: refVal3.value.name
      }, null, 8, Te)])) : createCommentVNode("", !0), createElementVNode("div", De, [createElementVNode("h1", Ve, toDisplayString(refVal3.value.name), 1), refVal3.value.description ? (openBlock(), createElementBlock("p", ze, toDisplayString(refVal3.value.description), 1)) : createCommentVNode("", !0), createElementVNode("div", Fe, [createElementVNode("span", Le, toDisplayString(refVal3.value.itemCount) + " 个项目", 1), val4[6] || (val4[6] = createElementVNode("span", {
        class: "stat-divider"
      }, "·", -1)), createElementVNode("span", $e, "排序权重: " + toDisplayString(refVal3.value.sortOrder), 1)])]), createElementVNode("div", {
        class: "collection-actions"
      }, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz14
      }, [...(val4[7] || (val4[7] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "15 18 9 12 15 6"
      })], -1), createTextVNode(" 返回 ", -1)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz4
      }, [...(val4[8] || (val4[8] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加项目 ", -1)]))])])]), createElementVNode("div", je, [val4[16] || (val4[16] = createElementVNode("h2", {
        class: "section-title"
      }, "合集项目", -1)), refVal2.value ? (openBlock(), createElementBlock("div", qe, [...(val4[9] || (val4[9] = [createElementVNode("div", {
        class: "loading-spinner small"
      }, null, -1), createTextVNode(" 加载中... ", -1)]))])) : refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Ee, [...(val4[10] || (val4[10] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })])], -1), createElementVNode("h3", null, "暂无项目", -1), createElementVNode("p", null, '点击上方"添加项目"按钮添加评分项目', -1)]))])) : (openBlock(), createElementBlock("div", He, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "item-card"
      }, [createElementVNode("div", Ke, [val5.ratingItemImageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.ratingItemImageUrl,
        alt: val5.ratingItemName,
        class: "cover-image"
      }, null, 8, Ge)) : (openBlock(), createElementBlock("div", Je, [...(val4[11] || (val4[11] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))]))]), createElementVNode("div", Qe, [createElementVNode("h3", We, toDisplayString(val5.ratingItemName), 1), createElementVNode("div", Xe, [createElementVNode("span", null, toDisplayString(unref(statusLabel_zb49)(val5.breadcrumb).school), 1), (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(statusLabel_zb49)(val5.breadcrumb).parts, (val6, val7) => (openBlock(), createElementBlock(Fragment, {
        key: val7
      }, [val4[12] || (val4[12] = createElementVNode("span", {
        class: "sep"
      }, "/", -1)), createElementVNode("span", null, toDisplayString(val6), 1)], 64))), 128))]), createElementVNode("div", Ye, [createElementVNode("span", Ze, [val4[13] || (val4[13] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        width: "12",
        height: "12"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)), createTextVNode(" " + toDisplayString(zz15(val5.averageScore)), 1)]), val4[14] || (val4[14] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", es, toDisplayString(val5.ratingCount) + " 评分", 1), val4[15] || (val4[15] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ss, "排序: " + toDisplayString(val5.sortOrder), 1)])]), createElementVNode("div", ts, [createElementVNode("button", {
        class: "action-btn sort",
        onClick: val6 => zz8(val5)
      }, " 排序 ", 8, as), createElementVNode("button", {
        class: "action-btn remove",
        onClick: val6 => zz11(val5)
      }, " 移除 ", 8, os)])]))), 128))]))])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz5, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-large",
            onClick: val4[1] || (val4[1] = withModifiers(() => {}, ["stop"]))
          }, [val4[20] || (val4[20] = createElementVNode("h3", {
            class: "modal-title"
          }, "添加评分项目", -1)), createElementVNode("div", ls, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal9.value = val5),
            type: "text",
            class: "search-input",
            placeholder: "搜索评分项目名称...",
            onInput: zz3
          }, null, 544), [[vModelText, refVal9.value]]), refVal11.value ? (openBlock(), createElementBlock("div", ns, [...(val4[17] || (val4[17] = [createElementVNode("div", {
            class: "loading-spinner small"
          }, null, -1)]))])) : createCommentVNode("", !0)]), createElementVNode("div", is, [refVal10.value.length === 0 && refVal9.value ? (openBlock(), createElementBlock("div", rs, toDisplayString(refVal11.value ? "搜索中..." : "没有找到匹配的项目"), 1)) : refVal10.value.length === 0 ? (openBlock(), createElementBlock("div", ds, " 输入关键词搜索评分项目 ")) : createCommentVNode("", !0), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal10.value, val5 => (openBlock(), createElementBlock("div", {
            key: val5.id,
            class: normalizeClass(["search-item", {
              selected: refVal12.value === val5.id
            }]),
            onClick: val6 => zz6(val5)
          }, [createElementVNode("div", us, [val5.imageUrl ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: val5.imageUrl,
            alt: val5.name
          }, null, 8, vs)) : (openBlock(), createElementBlock("div", ms, [...(val4[18] || (val4[18] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("polygon", {
            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          })], -1)]))]))]), createElementVNode("div", fs, [createElementVNode("div", ps, toDisplayString(val5.name), 1), createElementVNode("div", gs, toDisplayString(unref(Ie)(val5.breadcrumb)), 1)]), refVal12.value === val5.id ? (openBlock(), createElementBlock("div", _s, [...(val4[19] || (val4[19] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("polyline", {
            points: "20 6 9 17 4 12"
          })], -1)]))])) : createCommentVNode("", !0)], 10, cs))), 128))]), createElementVNode("div", ys, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz5,
            disabled: refVal13.value
          }, " 取消 ", 8, hs), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz7,
            disabled: refVal13.value || !refVal12.value
          }, toDisplayString(refVal13.value ? "添加中..." : "确认添加"), 9, ks)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal14.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz9, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal14.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val4[3] || (val4[3] = withModifiers(() => {}, ["stop"]))
          }, [val4[23] || (val4[23] = createElementVNode("h3", {
            class: "modal-title"
          }, "编辑排序", -1)), createElementVNode("p", bs, "项目: " + toDisplayString(refVal15.value?.ratingItemName), 1), createElementVNode("div", Cs, [val4[21] || (val4[21] = createElementVNode("label", {
            class: "form-label"
          }, "排序权重", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val4[2] || (val4[2] = val5 => refVal16.value = val5),
            type: "number",
            class: "form-input",
            placeholder: "数字越小排序越靠前",
            min: "0"
          }, null, 512), [[vModelText, refVal16.value, void 0, {
            number: !0
          }]]), val4[22] || (val4[22] = createElementVNode("p", {
            class: "form-hint"
          }, "数字越小排序越靠前", -1))]), createElementVNode("div", ws, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz9,
            disabled: refVal17.value
          }, " 取消 ", 8, Is), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz10,
            disabled: refVal17.value
          }, toDisplayString(refVal17.value ? "保存中..." : "保存"), 9, xs)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal18.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz13, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal18.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val4[4] || (val4[4] = withModifiers(() => {}, ["stop"]))
          }, [val4[24] || (val4[24] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认移除", -1)), createElementVNode("p", Ss, ' 确定要从合集中移除"' + toDisplayString(refVal19.value?.ratingItemName) + '"吗？ ', 1), val4[25] || (val4[25] = createElementVNode("p", {
            class: "modal-warning"
          }, "注意：这不会删除评分项目本身。", -1)), createElementVNode("div", Bs, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz13,
            disabled: refVal20.value
          }, " 取消 ", 8, Rs), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz12,
            disabled: refVal20.value
          }, toDisplayString(refVal20.value ? "移除中..." : "确认移除"), 9, Ps)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  zs = withScopeId(As, [["__scopeId", "data-v-eeecda30"]]);
/* index 运行时导出（已语义化） */
export { zs as default };