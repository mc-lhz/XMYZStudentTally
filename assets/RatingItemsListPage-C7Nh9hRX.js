/*!
 * 页面模块：评分项目管理（RatingItemsListPage）
 * 路由：/admin/rating/minor-sections/:minorSectionId   name=admin-rating-items-legacy   层级=5   需登录=是
 * 功能：登录后的「评分项目管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingItemsListPage-C7Nh9hRX.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayString, Fragment, renderList, createTextVNode, withDirectives, vModelText, withKeys, normalizeClass, toDisplayValue, withSlots, unref, withModifiers, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingItemsById as Pe, getCategoriesById as Be, createRatingItems as Re, getRatingItemsById, updateRatingItems as Se, deleteRatingItemsImage as De, updateRatingItemsStatus as Me, deleteRatingItems as Te } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb47 as ee } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const $e = {
    class: "page-container"
  },
  Ge = {
    class: "page-content"
  },
  Le = {
    class: "content-container"
  },
  Ve = {
    class: "breadcrumb-wrapper"
  },
  ze = {
    class: "page-header-section"
  },
  Ae = {
    class: "header-main"
  },
  Ee = {
    class: "header-text"
  },
  je = {
    key: 0,
    class: "header-breadcrumb"
  },
  Ke = {
    class: "breadcrumb-item"
  },
  Oe = {
    class: "page-title"
  },
  We = {
    key: 0,
    class: "loading-container"
  },
  Je = {
    class: "search-bar"
  },
  qe = {
    class: "status-tabs"
  },
  He = {
    key: 0,
    class: "empty-container"
  },
  Xe = {
    key: 1,
    class: "items-list"
  },
  Ye = ["onClick"],
  Qe = {
    class: "item-cover"
  },
  Ze = ["src", "alt"],
  ea = {
    key: 1,
    class: "cover-placeholder"
  },
  aa = {
    class: "item-info"
  },
  ta = {
    class: "item-header"
  },
  sa = {
    class: "item-name"
  },
  la = {
    key: 0,
    class: "item-desc"
  },
  oa = {
    class: "item-meta"
  },
  na = {
    class: "meta-item score"
  },
  ia = {
    class: "meta-item"
  },
  ra = {
    class: "meta-item"
  },
  da = {
    class: "meta-item"
  },
  ua = {
    class: "item-actions"
  },
  ca = ["onClick"],
  va = ["onClick"],
  ma = ["onClick"],
  pa = {
    key: 2,
    class: "pagination"
  },
  ga = ["disabled"],
  fa = {
    class: "page-info"
  },
  ba = ["disabled"],
  ya = {
    class: "modal-title"
  },
  ka = {
    class: "form-group"
  },
  ha = {
    class: "form-group"
  },
  wa = {
    class: "form-group"
  },
  _a = {
    class: "image-upload-area"
  },
  Ca = {
    key: 0,
    class: "image-preview"
  },
  xa = ["src"],
  Ia = {
    key: 1,
    class: "upload-placeholder"
  },
  Pa = {
    class: "modal-actions"
  },
  Ba = ["disabled"],
  Ra = ["disabled"],
  Sa = {
    class: "modal-desc"
  },
  Da = {
    class: "modal-actions"
  },
  Ma = ["disabled"],
  Ta = ["disabled"],
  Na = defineComponent({
    __name: "RatingItemsListPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => val2.params.categoryId ? Number(val2.params.categoryId) : val2.params.minorSectionId ? Number(val2.params.minorSectionId) : 0),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(0),
        refVal5 = ref(1),
        refVal6 = ref(20),
        refVal7 = ref("all"),
        refVal8 = ref(""),
        list = ["all", 1, 0],
        refVal9 = ref(""),
        refVal10 = ref(!1);
      watch(refVal7, (val1, val4) => {
        if (val4 === void 0) return;
        const val5 = list.indexOf(val4),
          val6 = list.indexOf(val1);
        refVal9.value = val6 > val5 ? "left" : "right", refVal10.value = !0, zz1(), nextTick(() => {
          setTimeout(() => {
            refVal10.value = !1, refVal9.value = "";
          }, 300);
        });
      });
      const refVal11 = ref(!1),
        refVal12 = ref("create"),
        refVal13 = ref(null),
        refVal14 = ref({
          categoryId: 0,
          name: "",
          description: ""
        }),
        refVal15 = ref(!1),
        refVal16 = ref(null),
        refVal17 = ref(null),
        refVal18 = ref(!1),
        refVal19 = ref(null),
        refVal20 = ref(!1);
      async function zz0() {
        try {
          const val1 = await Be(val3.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : (useToast1.error("获取分类信息失败"), useRouter1.push("/admin/rating"));
        } catch {
          useToast1.error("获取分类信息失败"), useRouter1.push("/admin/rating");
        }
      }
      async function zz1() {
        try {
          const obj = {
            page: refVal5.value,
            size: refVal6.value,
            categoryId: val3.value
          };
          refVal7.value !== "all" && (obj.status = refVal7.value), refVal8.value.trim() && (obj.keyword = refVal8.value.trim());
          const val1 = await Pe(obj);
          val1.data.code === 200 ? (refVal3.value = val1.data.data.items, refVal4.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取评分项目列表失败");
        } catch {
          useToast1.error("获取评分项目列表失败");
        }
      }
      function zz2() {
        refVal5.value = 1, zz1();
      }
      async function zz3() {
        refVal.value = !0;
        try {
          await Promise.all([zz0(), zz1()]);
        } finally {
          refVal.value = !1;
        }
      }
      function zz4() {
        refVal12.value = "create", refVal13.value = null, refVal14.value = {
          categoryId: val3.value,
          name: "",
          description: ""
        }, refVal16.value = null, refVal17.value = null, refVal11.value = !0;
      }
      function zz5(val1, val4) {
        val4.stopPropagation(), refVal12.value = "edit", refVal13.value = val1, refVal14.value = {
          categoryId: val1.categoryId,
          name: val1.name,
          description: val1.description || ""
        }, refVal16.value = null, refVal17.value = val1.imageUrl, refVal11.value = !0;
      }
      function zz6() {
        refVal11.value = !1, refVal13.value = null, refVal14.value = {
          categoryId: val3.value,
          name: "",
          description: ""
        }, refVal16.value = null, refVal17.value = null;
      }
      function zz7(val1) {
        const val4 = val1.target;
        if (val4.files && val4.files[0]) {
          const val5 = val4.files[0];
          if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"].includes(val5.type)) {
            useToast1.error("只支持 JPEG/PNG/GIF/WebP/BMP 格式");
            return;
          }
          if (val5.size > 10 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 10MB");
            return;
          }
          refVal16.value = val5;
          const filereader = new FileReader();
          filereader.onload = val6 => {
            refVal17.value = val6.target?.result;
          }, filereader.readAsDataURL(val5);
        }
      }
      function zz8() {
        refVal16.value = null, refVal17.value = null;
      }
      async function zz9() {
        if (!refVal14.value.name.trim()) {
          useToast1.error("请填写名称");
          return;
        }
        refVal15.value = !0;
        try {
          if (refVal12.value === "create") {
            const val1 = await Re(refVal14.value);
            val1.data.code === 200 ? (refVal16.value && (await getRatingItemsById(val1.data.data.id, refVal16.value)), useToast1.success("创建成功"), zz6(), await zz1()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal13.value) {
            const obj = {
                name: refVal14.value.name,
                description: refVal14.value.description
              },
              val1 = await Se(refVal13.value.id, obj);
            val1.data.code === 200 ? (refVal16.value ? await getRatingItemsById(refVal13.value.id, refVal16.value) : !refVal17.value && refVal13.value.imageUrl && (await De(refVal13.value.id)), useToast1.success("更新成功"), zz6(), await zz1()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal12.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal15.value = !1;
        }
      }
      async function zz10(val1, val4) {
        val4.stopPropagation();
        const val5 = val1.status === 1 ? 0 : 1;
        try {
          const val6 = await Me(val1.id, {
            status: val5
          });
          val6.data.code === 200 ? (useToast1.success(val5 === 1 ? "已启用" : "已禁用"), await zz1()) : useToast1.error(val6.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz11(val1, val4) {
        val4.stopPropagation(), refVal19.value = val1, refVal18.value = !0;
      }
      async function zz12() {
        if (refVal19.value) {
          refVal20.value = !0;
          try {
            const val1 = await Te(refVal19.value.id);
            val1.data.code === 200 ? (useToast1.success("已删除"), refVal18.value = !1, refVal19.value = null, await zz1()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal20.value = !1;
          }
        }
      }
      function zz13() {
        refVal18.value = !1, refVal19.value = null;
      }
      function zz14(val1) {
        useRouter1.push(`/admin/rating/items/${val1.id}`);
      }
      function zz15() {
        refVal2.value && refVal2.value.parentId ? useRouter1.push(`/admin/rating/categories/${refVal2.value.parentId}`) : useRouter1.push("/admin/rating");
      }
      function zz16(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      function zz17(val1) {
        return val1.toFixed(1);
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz3();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", $e, [createVNode(PageHeader, {
        "back-to": refVal2.value && refVal2.value.parentId ? `/admin/rating/categories/${refVal2.value.parentId}` : "/admin/rating"
      }, null, 8, ["back-to"]), createElementVNode("main", Ge, [createElementVNode("div", Le, [createElementVNode("div", Ve, [createVNode(PageBreadcrumb)]), createElementVNode("div", ze, [createElementVNode("div", Ae, [createElementVNode("div", Ee, [refVal2.value ? (openBlock(), createElementBlock("div", je, [createElementVNode("span", Ke, toDisplayString(refVal2.value.schoolName), 1), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.breadcrumb, (val5, val6) => (openBlock(), createElementBlock(Fragment, {
        key: val6
      }, [val4[10] || (val4[10] = createElementVNode("span", {
        class: "breadcrumb-sep"
      }, "/", -1)), createElementVNode("span", {
        class: normalizeClass(val6 === refVal2.value.breadcrumb.length - 1 ? "breadcrumb-current" : "breadcrumb-item")
      }, toDisplayString(val5.name), 3)], 64))), 128))])) : createCommentVNode("", !0), createElementVNode("h1", Oe, toDisplayString(refVal2.value?.name || "加载中..."), 1), val4[11] || (val4[11] = createElementVNode("p", {
        class: "page-subtitle"
      }, "管理评分项目", -1))]), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz15
      }, [...(val4[12] || (val4[12] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "15 18 9 12 15 6"
      })], -1), createTextVNode(" 返回 ", -1)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz4
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
      })], -1), createTextVNode(" 添加评分项目 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", We, [...(val4[14] || (val4[14] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Je, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal8.value = val5),
        type: "text",
        class: "search-input",
        placeholder: "搜索评分项目...",
        onKeyup: withKeys(zz2, ["enter"])
      }, null, 544), [[vModelText, refVal8.value]]), createElementVNode("button", {
        class: "search-btn",
        onClick: zz2
      }, [...(val4[15] || (val4[15] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), createElementVNode("line", {
        x1: "21",
        y1: "21",
        x2: "16.65",
        y2: "16.65"
      })], -1)]))])]), createElementVNode("div", qe, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === "all"
        }]),
        onClick: val4[1] || (val4[1] = val5 => refVal7.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 1
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal7.value = 1)
      }, " 启用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 0
        }]),
        onClick: val4[3] || (val4[3] = val5 => refVal7.value = 0)
      }, " 禁用 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal10.value && refVal9.value === "left",
          "slide-right": refVal10.value && refVal9.value === "right"
        }])
      }, [refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", He, [val4[16] || (val4[16] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })])], -1)), createElementVNode("h2", null, toDisplayString(refVal7.value === "all" ? "暂无评分项目" : "暂无相关评分项目"), 1), createElementVNode("p", null, toDisplayString(refVal7.value === "all" ? "还没有添加任何评分项目" : "没有找到该状态的评分项目"), 1), refVal7.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz4
      }, " 添加第一个评分项目 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Xe, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "item-card",
        onClick: val6 => zz14(val5)
      }, [createElementVNode("div", Qe, [val5.imageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.imageUrl,
        alt: val5.name,
        class: "cover-image"
      }, null, 8, Ze)) : (openBlock(), createElementBlock("div", ea, [...(val4[17] || (val4[17] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))]))]), createElementVNode("div", aa, [createElementVNode("div", ta, [createElementVNode("h3", sa, toDisplayString(val5.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(ee)(val5.status).class])
      }, toDisplayString(unref(ee)(val5.status).label), 3)]), val5.description ? (openBlock(), createElementBlock("p", la, toDisplayString(val5.description), 1)) : createCommentVNode("", !0), createElementVNode("div", oa, [createElementVNode("span", na, [val4[18] || (val4[18] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        width: "12",
        height: "12"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)), createTextVNode(" " + toDisplayString(zz17(val5.averageScore)), 1)]), val4[19] || (val4[19] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ia, toDisplayString(val5.ratingCount) + " 评分", 1), val4[20] || (val4[20] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ra, toDisplayString(val5.commentCount) + " 评论", 1), val4[21] || (val4[21] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", da, toDisplayString(zz16(val5.createdAt)), 1)])]), createElementVNode("div", ua, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val5.status === 1
        }]),
        onClick: val6 => zz10(val5, val6)
      }, toDisplayString(val5.status === 1 ? "禁用" : "启用"), 11, ca), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val6 => zz5(val5, val6)
      }, " 编辑 ", 8, va), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val6 => zz11(val5, val6)
      }, " 删除 ", 8, ma), val4[22] || (val4[22] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Ye))), 128))])), refVal4.value > refVal6.value ? (openBlock(), createElementBlock("div", pa, [createElementVNode("button", {
        class: "page-btn",
        disabled: refVal5.value === 1,
        onClick: val4[4] || (val4[4] = val5 => {
          refVal5.value--, zz1();
        })
      }, " 上一页 ", 8, ga), createElementVNode("span", fa, toDisplayString(refVal5.value) + " / " + toDisplayString(Math.ceil(refVal4.value / refVal6.value)), 1), createElementVNode("button", {
        class: "page-btn",
        disabled: refVal5.value >= Math.ceil(refVal4.value / refVal6.value),
        onClick: val4[5] || (val4[5] = val5 => {
          refVal5.value++, zz1();
        })
      }, " 下一页 ", 8, ba)])) : createCommentVNode("", !0)], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz6, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-large",
            onClick: val4[8] || (val4[8] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", ya, toDisplayString(refVal12.value === "create" ? "添加评分项目" : "编辑评分项目"), 1), createElementVNode("div", ka, [val4[23] || (val4[23] = createElementVNode("label", {
            class: "form-label"
          }, "名称 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val4[6] || (val4[6] = val5 => refVal14.value.name = val5),
            type: "text",
            class: "form-input",
            placeholder: "例如：黄焖鸡米饭",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal14.value.name]])]), createElementVNode("div", ha, [val4[24] || (val4[24] = createElementVNode("label", {
            class: "form-label"
          }, "描述", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val4[7] || (val4[7] = val5 => refVal14.value.description = val5),
            class: "form-textarea",
            placeholder: "简单描述一下...",
            rows: "3",
            maxlength: "500"
          }, null, 512), [[vModelText, refVal14.value.description]])]), createElementVNode("div", wa, [val4[29] || (val4[29] = createElementVNode("label", {
            class: "form-label"
          }, "封面图片", -1)), createElementVNode("div", _a, [refVal17.value ? (openBlock(), createElementBlock("div", Ca, [createElementVNode("img", {
            src: refVal17.value,
            alt: "预览"
          }, null, 8, xa), createElementVNode("button", {
            class: "remove-image-btn",
            onClick: zz8,
            type: "button"
          }, [...(val4[25] || (val4[25] = [createElementVNode("svg", {
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
          })], -1)]))])])) : (openBlock(), createElementBlock("label", Ia, [createElementVNode("input", {
            type: "file",
            accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
            onChange: zz7,
            class: "hidden-input"
          }, null, 32), val4[26] || (val4[26] = createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("rect", {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }), createElementVNode("circle", {
            cx: "8.5",
            cy: "8.5",
            r: "1.5"
          }), createElementVNode("polyline", {
            points: "21 15 16 10 5 21"
          })], -1)), val4[27] || (val4[27] = createElementVNode("span", null, "点击上传图片", -1)), val4[28] || (val4[28] = createElementVNode("span", {
            class: "upload-hint"
          }, "支持 JPEG/PNG/GIF/WebP/BMP，最大 10MB", -1))]))])]), createElementVNode("div", Pa, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz6,
            disabled: refVal15.value
          }, " 取消 ", 8, Ba), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz9,
            disabled: refVal15.value
          }, toDisplayString(refVal15.value ? "保存中..." : "保存"), 9, Ra)])])) : createCommentVNode("", !0)]),
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
            onClick: val4[9] || (val4[9] = withModifiers(() => {}, ["stop"]))
          }, [val4[30] || (val4[30] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", Sa, ' 确定要删除评分项目"' + toDisplayString(refVal19.value?.name) + '"吗？此操作不可撤销。 ', 1), val4[31] || (val4[31] = createElementVNode("p", {
            class: "modal-warning"
          }, "注意：删除后会同时删除关联的所有评分和评论。", -1)), createElementVNode("div", Da, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz13,
            disabled: refVal20.value
          }, " 取消 ", 8, Ma), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz12,
            disabled: refVal20.value
          }, toDisplayString(refVal20.value ? "删除中..." : "确认删除"), 9, Ta)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Aa = withScopeId(Na, [["__scopeId", "data-v-849c66d3"]]);
/* index 运行时导出（已语义化） */
export { Aa as default };