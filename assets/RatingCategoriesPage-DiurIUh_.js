/*!
 * 页面模块：分类管理（RatingCategoriesPage）
 * 路由：/admin/rating/categories   name=admin-rating-categories   层级=3   需登录=是
 * 功能：登录后的「分类管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingCategoriesPage-DiurIUh_.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayValue, resolveAsset, Fragment, renderList, toDisplayString, createTextVNode, normalizeClass, withSlots, createBlock, unref, withModifiers, withDirectives, vModelText, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getCategoriesById2 as Me, getCategoriesById as De, createCategories as $e, createCategoriesImage as ae, updateCategories as Se, deleteCategoriesImage as Te, updateCategoriesStatus as Oe, deleteCategories as Ne } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb47 as te } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Re = {
    class: "page-container"
  },
  Ve = {
    class: "page-content"
  },
  Ge = {
    class: "content-container"
  },
  Ae = {
    class: "breadcrumb-wrapper"
  },
  He = {
    class: "page-header-section"
  },
  Le = {
    class: "header-main"
  },
  Ee = {
    class: "header-text"
  },
  je = {
    key: 0,
    class: "header-breadcrumb"
  },
  qe = {
    key: 1,
    class: "breadcrumb-current"
  },
  Je = {
    class: "page-title"
  },
  We = {
    class: "page-subtitle"
  },
  Ze = {
    class: "header-actions"
  },
  Ke = {
    key: 0,
    class: "loading-container"
  },
  Qe = {
    class: "status-tabs"
  },
  Xe = {
    key: 0,
    class: "empty-container"
  },
  Ye = {
    key: 1,
    class: "items-list"
  },
  ea = ["onClick"],
  aa = {
    class: "item-cover"
  },
  ta = ["src", "alt"],
  sa = {
    key: 1,
    class: "cover-placeholder"
  },
  la = {
    class: "item-info"
  },
  oa = {
    class: "item-header"
  },
  na = {
    class: "item-name"
  },
  ia = {
    key: 0,
    class: "item-desc"
  },
  ra = {
    class: "item-meta"
  },
  da = {
    class: "meta-item"
  },
  ua = {
    class: "meta-item"
  },
  ca = {
    class: "meta-item"
  },
  va = {
    class: "meta-item"
  },
  ma = {
    class: "item-actions"
  },
  pa = ["onClick"],
  ga = ["onClick"],
  fa = ["onClick"],
  ba = {
    key: 2,
    class: "pagination"
  },
  ya = ["disabled"],
  ka = {
    class: "page-info"
  },
  ha = ["disabled"],
  Ca = {
    class: "modal-title"
  },
  _a = {
    class: "form-group"
  },
  wa = {
    class: "form-group"
  },
  Ia = {
    class: "form-group"
  },
  xa = {
    class: "form-group"
  },
  Ba = {
    class: "image-upload-area"
  },
  Pa = {
    key: 0,
    class: "image-preview"
  },
  Ma = ["src"],
  Da = {
    key: 1,
    class: "upload-placeholder"
  },
  $a = {
    class: "modal-actions"
  },
  Sa = ["disabled"],
  Ta = ["disabled"],
  Oa = {
    class: "modal-desc"
  },
  Na = {
    class: "modal-actions"
  },
  za = ["disabled"],
  Ua = ["disabled"],
  Fa = defineComponent({
    __name: "RatingCategoriesPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => {
          const val1 = val2.params.categoryId;
          return val1 ? Number(val1) : null;
        }),
        val4 = applyDirectives(() => {
          const val1 = val2.query.schoolId;
          return val1 ? Number(val1) : null;
        }),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(0),
        refVal5 = ref(1),
        refVal6 = ref(20),
        refVal7 = ref("all"),
        list = ["all", 1, 0],
        refVal8 = ref(""),
        refVal9 = ref(!1);
      watch(refVal7, (val1, val7) => {
        if (val7 === void 0) return;
        const val8 = list.indexOf(val7),
          val9 = list.indexOf(val1);
        refVal8.value = val9 > val8 ? "left" : "right", refVal9.value = !0, zz1(), nextTick(() => {
          setTimeout(() => {
            refVal9.value = !1, refVal8.value = "";
          }, 300);
        });
      });
      const refVal10 = ref(!1),
        refVal11 = ref("create"),
        refVal12 = ref(null),
        refVal13 = ref({
          parentId: null,
          schoolId: void 0,
          name: "",
          description: "",
          sortOrder: 0
        }),
        refVal14 = ref(!1),
        refVal15 = ref(null),
        refVal16 = ref(null),
        refVal17 = ref(!1),
        refVal18 = ref(null),
        refVal19 = ref(!1);
      async function zz0() {
        if (!val3.value) {
          refVal2.value = null;
          return;
        }
        try {
          const val1 = await De(val3.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : (useToast1.error("获取分类信息失败"), useRouter1.push("/admin/rating"));
        } catch {
          useToast1.error("获取分类信息失败"), useRouter1.push("/admin/rating");
        }
      }
      async function zz1() {
        try {
          const obj = {
            page: refVal5.value,
            size: refVal6.value
          };
          val3.value ? obj.parentId = val3.value : (obj.parentId = 0, val4.value && (obj.schoolId = val4.value)), refVal7.value !== "all" && (obj.status = refVal7.value);
          const val1 = await Me(obj);
          val1.data.code === 200 ? (refVal3.value = val1.data.data.items, refVal4.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取分类列表失败");
        } catch {
          useToast1.error("获取分类列表失败");
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
      function zz3() {
        refVal11.value = "create", refVal12.value = null, refVal13.value = {
          parentId: val3.value,
          schoolId: refVal2.value?.schoolId ?? val4.value ?? void 0,
          name: "",
          description: "",
          sortOrder: 0
        }, refVal15.value = null, refVal16.value = null, refVal10.value = !0;
      }
      function zz4(val1, val7) {
        val7.stopPropagation(), refVal11.value = "edit", refVal12.value = val1, refVal13.value = {
          parentId: val1.parentId,
          schoolId: val1.schoolId,
          name: val1.name,
          description: val1.description || "",
          sortOrder: val1.sortOrder
        }, refVal15.value = null, refVal16.value = val1.imageUrl, refVal10.value = !0;
      }
      function zz5() {
        refVal10.value = !1, refVal12.value = null, refVal13.value = {
          parentId: val3.value,
          schoolId: refVal2.value?.schoolId ?? val4.value ?? void 0,
          name: "",
          description: "",
          sortOrder: 0
        }, refVal15.value = null, refVal16.value = null;
      }
      function zz6(val1) {
        const val7 = val1.target;
        if (val7.files && val7.files[0]) {
          const val8 = val7.files[0];
          if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"].includes(val8.type)) {
            useToast1.error("只支持 JPEG/PNG/GIF/WebP/BMP 格式");
            return;
          }
          if (val8.size > 10 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 10MB");
            return;
          }
          refVal15.value = val8;
          const filereader = new FileReader();
          filereader.onload = val9 => {
            refVal16.value = val9.target?.result;
          }, filereader.readAsDataURL(val8);
        }
      }
      function zz7() {
        refVal15.value = null, refVal16.value = null;
      }
      async function zz8() {
        if (!refVal13.value.name.trim()) {
          useToast1.error("请填写名称");
          return;
        }
        refVal14.value = !0;
        try {
          if (refVal11.value === "create") {
            const val1 = await $e(refVal13.value);
            val1.data.code === 200 ? (refVal15.value && (await ae(val1.data.data.id, refVal15.value)), useToast1.success("创建成功"), zz5(), await zz1()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal12.value) {
            const obj = {
                name: refVal13.value.name,
                description: refVal13.value.description,
                sortOrder: refVal13.value.sortOrder
              },
              val1 = await Se(refVal12.value.id, obj);
            val1.data.code === 200 ? (refVal15.value ? await ae(refVal12.value.id, refVal15.value) : !refVal16.value && refVal12.value.imageUrl && (await Te(refVal12.value.id)), useToast1.success("更新成功"), zz5(), await zz1()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal11.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal14.value = !1;
        }
      }
      async function zz9(val1, val7) {
        val7.stopPropagation();
        const val8 = val1.status === 1 ? 0 : 1;
        try {
          const val9 = await Oe(val1.id, {
            status: val8
          });
          val9.data.code === 200 ? (useToast1.success(val8 === 1 ? "已启用" : "已禁用"), await zz1()) : useToast1.error(val9.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz10(val1, val7) {
        val7.stopPropagation(), refVal18.value = val1, refVal17.value = !0;
      }
      async function zz11() {
        if (refVal18.value) {
          refVal19.value = !0;
          try {
            const val1 = await Ne(refVal18.value.id);
            val1.data.code === 200 ? (useToast1.success("已删除"), refVal17.value = !1, refVal18.value = null, await zz1()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal19.value = !1;
          }
        }
      }
      function zz12() {
        refVal17.value = !1, refVal18.value = null;
      }
      function zz13(val1) {
        useRouter1.push(`/admin/rating/categories/${val1.id}`);
      }
      function zz14() {
        val3.value && useRouter1.push(`/admin/rating/categories/${val3.value}/items`);
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
      const val5 = applyDirectives(() => refVal2.value ? refVal2.value.name : "分类管理"),
        val6 = applyDirectives(() => refVal2.value ? `管理子分类 · 层级 ${refVal2.value.depth + 1}` : "管理顶级分类");
      return watch([val3, val4], () => {
        zz2();
      }), onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz2();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val7) => {
        const val8 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", Re, [createVNode(PageHeader, {
          "back-to": refVal2.value && refVal2.value.parentId ? `/admin/rating/categories/${refVal2.value.parentId}` : "/admin/rating"
        }, null, 8, ["back-to"]), createElementVNode("main", Ve, [createElementVNode("div", Ge, [createElementVNode("div", Ae, [createVNode(PageBreadcrumb)]), createElementVNode("div", He, [createElementVNode("div", Le, [createElementVNode("div", Ee, [refVal2.value ? (openBlock(), createElementBlock("nav", je, [createVNode(val8, {
          to: `/admin/rating/categories?schoolId=${refVal2.value.schoolId}`,
          class: "breadcrumb-item"
        }, {
          default: toDisplayValue(() => [val7[10] || (val7[10] = createElementVNode("svg", {
            class: "breadcrumb-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          }), createElementVNode("polyline", {
            points: "9 22 9 12 15 12 15 22"
          })], -1)), createTextVNode(" " + toDisplayString(refVal2.value.schoolName), 1)]),
          _: 1
        }, 8, ["to"]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.breadcrumb, (val9, val10) => (openBlock(), createElementBlock(Fragment, {
          key: val10
        }, [val7[11] || (val7[11] = createElementVNode("svg", {
          class: "breadcrumb-chevron",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        })], -1)), val10 < refVal2.value.breadcrumb.length - 1 ? (openBlock(), createBlock(val8, {
          key: 0,
          to: `/admin/rating/categories/${val9.id}`,
          class: "breadcrumb-item"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val9.name), 1)]),
          _: 2
        }, 1032, ["to"])) : (openBlock(), createElementBlock("span", qe, toDisplayString(val9.name), 1))], 64))), 128))])) : createCommentVNode("", !0), createElementVNode("h1", Je, toDisplayString(val5.value), 1), createElementVNode("p", We, toDisplayString(val6.value), 1)]), createElementVNode("div", Ze, [createElementVNode("button", {
          class: "action-button secondary",
          onClick: zz15
        }, [...(val7[12] || (val7[12] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "15 18 9 12 15 6"
        })], -1), createTextVNode(" 返回 ", -1)]))]), val3.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "action-button secondary",
          onClick: zz14
        }, [...(val7[13] || (val7[13] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        })], -1), createTextVNode(" 管理评分项目 ", -1)]))])) : createCommentVNode("", !0), createElementVNode("button", {
          class: "action-button primary",
          onClick: zz3
        }, [...(val7[14] || (val7[14] = [createElementVNode("svg", {
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
        })], -1), createTextVNode(" 添加分类 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", Ke, [...(val7[15] || (val7[15] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createElementVNode("div", Qe, [createElementVNode("button", {
          class: normalizeClass(["status-tab", {
            active: refVal7.value === "all"
          }]),
          onClick: val7[0] || (val7[0] = val9 => refVal7.value = "all")
        }, " 全部 ", 2), createElementVNode("button", {
          class: normalizeClass(["status-tab", {
            active: refVal7.value === 1
          }]),
          onClick: val7[1] || (val7[1] = val9 => refVal7.value = 1)
        }, " 启用 ", 2), createElementVNode("button", {
          class: normalizeClass(["status-tab", {
            active: refVal7.value === 0
          }]),
          onClick: val7[2] || (val7[2] = val9 => refVal7.value = 0)
        }, " 禁用 ", 2)]), createElementVNode("div", {
          class: normalizeClass(["content-slide-wrapper", {
            "slide-left": refVal9.value && refVal8.value === "left",
            "slide-right": refVal9.value && refVal8.value === "right"
          }])
        }, [refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", Xe, [val7[16] || (val7[16] = createElementVNode("div", {
          class: "empty-icon"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [createElementVNode("path", {
          d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
        })])], -1)), createElementVNode("h2", null, toDisplayString(refVal7.value === "all" ? "暂无分类" : "暂无相关分类"), 1), createElementVNode("p", null, toDisplayString(refVal7.value === "all" ? "还没有添加任何分类" : "没有找到该状态的分类"), 1), refVal7.value === "all" ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "empty-action-btn",
          onClick: zz3
        }, " 添加第一个分类 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Ye, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val9 => (openBlock(), createElementBlock("div", {
          key: val9.id,
          class: "item-card",
          onClick: val10 => zz13(val9)
        }, [createElementVNode("div", aa, [val9.imageUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val9.imageUrl,
          alt: val9.name,
          class: "cover-image"
        }, null, 8, ta)) : (openBlock(), createElementBlock("div", sa, [...(val7[17] || (val7[17] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [createElementVNode("path", {
          d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
        })], -1)]))]))]), createElementVNode("div", la, [createElementVNode("div", oa, [createElementVNode("h3", na, toDisplayString(val9.name), 1), createElementVNode("span", {
          class: normalizeClass(["status-badge", unref(te)(val9.status).class])
        }, toDisplayString(unref(te)(val9.status).label), 3)]), val9.description ? (openBlock(), createElementBlock("p", ia, toDisplayString(val9.description), 1)) : createCommentVNode("", !0), createElementVNode("div", ra, [createElementVNode("span", da, toDisplayString(val9.childrenCount) + " 个子分类", 1), val7[18] || (val7[18] = createElementVNode("span", {
          class: "meta-divider"
        }, "·", -1)), createElementVNode("span", ua, toDisplayString(val9.itemCount) + " 个评分项目", 1), val7[19] || (val7[19] = createElementVNode("span", {
          class: "meta-divider"
        }, "·", -1)), createElementVNode("span", ca, "层级 " + toDisplayString(val9.depth), 1), val7[20] || (val7[20] = createElementVNode("span", {
          class: "meta-divider"
        }, "·", -1)), createElementVNode("span", va, toDisplayString(zz16(val9.createdAt)), 1)])]), createElementVNode("div", ma, [createElementVNode("button", {
          class: normalizeClass(["action-btn toggle", {
            "is-enabled": val9.status === 1
          }]),
          onClick: val10 => zz9(val9, val10)
        }, toDisplayString(val9.status === 1 ? "禁用" : "启用"), 11, pa), createElementVNode("button", {
          class: "action-btn edit",
          onClick: val10 => zz4(val9, val10)
        }, " 编辑 ", 8, ga), createElementVNode("button", {
          class: "action-btn delete",
          onClick: val10 => zz10(val9, val10)
        }, " 删除 ", 8, fa), val7[21] || (val7[21] = createElementVNode("div", {
          class: "arrow-icon"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        })])], -1))])], 8, ea))), 128))])), refVal4.value > refVal6.value ? (openBlock(), createElementBlock("div", ba, [createElementVNode("button", {
          class: "page-btn",
          disabled: refVal5.value === 1,
          onClick: val7[3] || (val7[3] = val9 => {
            refVal5.value--, zz1();
          })
        }, " 上一页 ", 8, ya), createElementVNode("span", ka, toDisplayString(refVal5.value) + " / " + toDisplayString(Math.ceil(refVal4.value / refVal6.value)), 1), createElementVNode("button", {
          class: "page-btn",
          disabled: refVal5.value >= Math.ceil(refVal4.value / refVal6.value),
          onClick: val7[4] || (val7[4] = val9 => {
            refVal5.value++, zz1();
          })
        }, " 下一页 ", 8, ha)])) : createCommentVNode("", !0)], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
          name: "modal-fade"
        }, {
          default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-overlay",
            onClick: withModifiers(zz5, ["self"])
          }, [createVNode(withSlots, {
            name: "modal-scale",
            appear: ""
          }, {
            default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "modal-content modal-large",
              onClick: val7[8] || (val7[8] = withModifiers(() => {}, ["stop"]))
            }, [createElementVNode("h3", Ca, toDisplayString(refVal11.value === "create" ? "添加分类" : "编辑分类"), 1), createElementVNode("div", _a, [val7[22] || (val7[22] = createElementVNode("label", {
              class: "form-label"
            }, "名称 *", -1)), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": val7[5] || (val7[5] = val9 => refVal13.value.name = val9),
              type: "text",
              class: "form-input",
              placeholder: "例如：一食堂",
              maxlength: "50"
            }, null, 512), [[vModelText, refVal13.value.name]])]), createElementVNode("div", wa, [val7[23] || (val7[23] = createElementVNode("label", {
              class: "form-label"
            }, "描述", -1)), withDirectives(createElementVNode("textarea", {
              "onUpdate:modelValue": val7[6] || (val7[6] = val9 => refVal13.value.description = val9),
              class: "form-textarea",
              placeholder: "简单描述一下这个分类...",
              rows: "3",
              maxlength: "200"
            }, null, 512), [[vModelText, refVal13.value.description]])]), createElementVNode("div", Ia, [val7[24] || (val7[24] = createElementVNode("label", {
              class: "form-label"
            }, "排序权重", -1)), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": val7[7] || (val7[7] = val9 => refVal13.value.sortOrder = val9),
              type: "number",
              class: "form-input",
              placeholder: "数字越小排序越靠前",
              min: "0"
            }, null, 512), [[vModelText, refVal13.value.sortOrder, void 0, {
              number: !0
            }]]), val7[25] || (val7[25] = createElementVNode("p", {
              class: "form-hint"
            }, "数字越小排序越靠前，默认为 0", -1))]), createElementVNode("div", xa, [val7[30] || (val7[30] = createElementVNode("label", {
              class: "form-label"
            }, "封面图片", -1)), createElementVNode("div", Ba, [refVal16.value ? (openBlock(), createElementBlock("div", Pa, [createElementVNode("img", {
              src: refVal16.value,
              alt: "预览"
            }, null, 8, Ma), createElementVNode("button", {
              class: "remove-image-btn",
              onClick: zz7,
              type: "button"
            }, [...(val7[26] || (val7[26] = [createElementVNode("svg", {
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
            })], -1)]))])])) : (openBlock(), createElementBlock("label", Da, [createElementVNode("input", {
              type: "file",
              accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
              onChange: zz6,
              class: "hidden-input"
            }, null, 32), val7[27] || (val7[27] = createElementVNode("svg", {
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
            })], -1)), val7[28] || (val7[28] = createElementVNode("span", null, "点击上传图片", -1)), val7[29] || (val7[29] = createElementVNode("span", {
              class: "upload-hint"
            }, "支持 JPEG/PNG/GIF/WebP/BMP，最大 10MB", -1))]))])]), createElementVNode("div", $a, [createElementVNode("button", {
              class: "modal-btn cancel",
              onClick: zz5,
              disabled: refVal14.value
            }, " 取消 ", 8, Sa), createElementVNode("button", {
              class: "modal-btn confirm primary",
              onClick: zz8,
              disabled: refVal14.value
            }, toDisplayString(refVal14.value ? "保存中..." : "保存"), 9, Ta)])])) : createCommentVNode("", !0)]),
            _: 1
          })])) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "modal-fade"
        }, {
          default: toDisplayValue(() => [refVal17.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-overlay",
            onClick: withModifiers(zz12, ["self"])
          }, [createVNode(withSlots, {
            name: "modal-scale",
            appear: ""
          }, {
            default: toDisplayValue(() => [refVal17.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "modal-content",
              onClick: val7[9] || (val7[9] = withModifiers(() => {}, ["stop"]))
            }, [val7[31] || (val7[31] = createElementVNode("h3", {
              class: "modal-title"
            }, "确认删除", -1)), createElementVNode("p", Oa, ' 确定要删除分类"' + toDisplayString(refVal18.value?.name) + '"吗？此操作不可撤销。 ', 1), val7[32] || (val7[32] = createElementVNode("p", {
              class: "modal-warning"
            }, "注意：如果该分类下有子分类或评分项目，将无法删除。", -1)), createElementVNode("div", Na, [createElementVNode("button", {
              class: "modal-btn cancel",
              onClick: zz12,
              disabled: refVal19.value
            }, " 取消 ", 8, za), createElementVNode("button", {
              class: "modal-btn confirm danger",
              onClick: zz11,
              disabled: refVal19.value
            }, toDisplayString(refVal19.value ? "删除中..." : "确认删除"), 9, Ua)])])) : createCommentVNode("", !0)]),
            _: 1
          })])) : createCommentVNode("", !0)]),
          _: 1
        })]);
      };
    }
  }),
  ja = withScopeId(Fa, [["__scopeId", "data-v-7972b1b1"]]);
/* index 运行时导出（已语义化） */
export { ja as default };