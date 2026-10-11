/*!
 * 页面模块：分类详情（CategoryPage）
 * 路由：/community/category/:categoryId   name=community-category   层级=2   需登录=否
 * 功能：公开的「分类详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CategoryPage-BU35xpIp.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, appProvider, directiveUm, nextTick, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, renderList, toDisplayString, createVNodeWrapper, normalizeClass, toDisplayValue, withSlots, useToast, useRouter, createBlock, createTextVNode, resolveAsset, resolveRaw, TransitionGroup, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityCategoriesById as Oe, createRatingCommunityRatings as Le } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：本地模块 FeedbackDrawer（站点内功能模块） */
import { scopedStyle_zb0 as Pe } from "./FeedbackDrawer-BX330nGh.js";
const ze = {
    class: "page-container"
  },
  He = {
    class: "page-content"
  },
  Ke = {
    key: 0,
    class: "breadcrumb-nav"
  },
  Ve = {
    key: 0,
    class: "breadcrumb-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Ue = {
    key: 1,
    class: "breadcrumb-item current"
  },
  je = {
    key: 2,
    class: "breadcrumb-chevron",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  qe = {
    key: 1,
    class: "loading-container"
  },
  Je = {
    key: 2,
    class: "empty-container"
  },
  Qe = {
    key: 3,
    class: "content-container"
  },
  We = {
    class: "page-title desktop-only"
  },
  Xe = {
    key: 0,
    class: "empty-state-enhanced"
  },
  Ye = {
    class: "action-cards"
  },
  Ze = {
    key: 1,
    id: "tour-category-grid",
    class: "section-grid"
  },
  et = ["id", "onClick"],
  tt = {
    class: "section-cover"
  },
  at = ["src", "alt"],
  nt = {
    key: 2,
    class: "count-badge"
  },
  ot = {
    key: 3,
    class: "count-badge"
  },
  st = {
    class: "section-info"
  },
  it = {
    class: "section-name"
  },
  rt = {
    key: 0,
    class: "section-desc"
  },
  lt = {
    key: 0,
    class: "filter-bar"
  },
  dt = {
    class: "filter-nav"
  },
  ct = {
    class: "filter-count"
  },
  ut = {
    class: "filter-buttons"
  },
  vt = ["onClick"],
  ft = {
    class: "view-toggle"
  },
  gt = {
    key: 1,
    class: "empty-state-enhanced"
  },
  ht = {
    class: "action-cards"
  },
  pt = {
    key: "list-view",
    class: "view-container"
  },
  yt = ["id", "onClick"],
  mt = {
    class: "item-image-wrapper"
  },
  kt = ["src", "alt"],
  _t = {
    key: 1,
    class: "item-image-placeholder"
  },
  xt = {
    class: "item-details"
  },
  bt = {
    class: "item-header"
  },
  Ct = {
    class: "item-name"
  },
  wt = {
    class: "item-rating"
  },
  Tt = {
    class: "item-score"
  },
  It = ["id", "onMouseleave"],
  St = ["onClick", "onMouseenter"],
  Nt = {
    class: "item-meta"
  },
  Rt = {
    class: "rating-count"
  },
  Bt = {
    key: 0,
    class: "hot-comment"
  },
  Et = {
    class: "comment-text"
  },
  Mt = {
    class: "comment-author"
  },
  At = {
    key: 1,
    class: "hot-comment empty"
  },
  Ft = {
    key: "grid-view",
    class: "view-container"
  },
  Dt = ["onClick"],
  Ot = {
    class: "grid-item-cover"
  },
  Lt = ["src", "alt"],
  $t = {
    class: "grid-item-score"
  },
  Gt = {
    class: "grid-item-info"
  },
  Pt = {
    class: "grid-item-name"
  },
  zt = {
    class: "grid-item-count"
  },
  Ht = {
    key: 0,
    id: "tour-rating-feedback",
    class: "fab-container"
  },
  Kt = {
    key: 0,
    class: "fab-menu"
  },
  Vt = defineComponent({
    __name: "CategoryPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        {
          shouldStartTour: val3,
          getCurrentStep: val4,
          TourStep: val5,
          saveStep: val6,
          highlightElement: val7,
          destroyDriver: val8,
          isInStarRatingTour: val9
        } = appProvider(),
        val10 = applyDirectives(() => Number(val2.params.categoryId)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref(!1),
        refVal4 = ref(1),
        refVal5 = ref(!1),
        refVal6 = ref("hot"),
        list = [{
          label: "热门",
          value: "hot"
        }, {
          label: "高分",
          value: "high"
        }, {
          label: "低分",
          value: "low"
        }],
        refVal7 = ref("list"),
        refVal8 = ref({}),
        val11 = applyDirectives(() => refVal2.value?.hasChildren ?? !1),
        val12 = applyDirectives(() => refVal2.value?.children ?? []),
        val13 = applyDirectives(() => {
          const list1 = [...(refVal2.value?.ratingItems ?? [])];
          switch (refVal6.value) {
            case "hot":
              return list1.sort((val1, val17) => val17.ratingCount - val1.ratingCount);
            case "high":
              return list1.sort((val1, val17) => val17.averageScore - val1.averageScore);
            case "low":
              return list1.sort((val1, val17) => val1.averageScore - val17.averageScore);
            default:
              return list1;
          }
        }),
        val14 = applyDirectives(() => {
          if (!refVal2.value?.breadcrumb) return [];
          const val1 = refVal2.value.breadcrumb;
          return [{
            id: 0,
            name: val1.school.name,
            path: "/community"
          }, ...val1.ancestors.map(val17 => ({
            id: val17.id,
            name: val17.name,
            path: `/community/category/${val17.id}`
          })), {
            id: val1.current.id,
            name: val1.current.name,
            path: ""
          }];
        }),
        val15 = applyDirectives(() => refVal2.value?.breadcrumb?.school?.id ?? null),
        val16 = applyDirectives(() => {
          if (!refVal2.value?.breadcrumb) return "";
          const val1 = refVal2.value.breadcrumb;
          return [val1.school.name, ...val1.ancestors.map(val17 => val17.name), val1.current.name].join(" > ");
        });
      function zz0(val1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        refVal4.value = val1, refVal5.value = !1, refVal3.value = !0;
      }
      function zz1() {
        refVal3.value = !1;
      }
      function zz2() {
        refVal5.value = !refVal5.value;
      }
      function zz3() {
        refVal5.value = !1;
      }
      function zz4() {}
      async function zz5() {
        refVal.value = !0;
        try {
          const val1 = await Oe(val10.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取分类详情失败");
        } catch {
          useToast1.error("获取分类详情失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz6(val1) {
        useRouter1.push(`/community/category/${val1.id}`);
      }
      function zz7(val1) {
        useRouter1.push(`/community/item/${val1}`);
      }
      function zz8(val1) {
        refVal6.value = val1;
      }
      function zz9(val1, val17) {
        refVal8.value[val1] = val17;
      }
      function zz10(val1) {
        refVal8.value[val1] = 0;
      }
      function zz11(val1) {
        return refVal8.value[val1.id] ? refVal8.value[val1.id] ?? 0 : val1.myStars || 0;
      }
      async function zz12(val1, val17, val18) {
        if (val18.stopPropagation(), val9()) {
          val1.myStars = val17, val1.myScore = val17 * 2;
          return;
        }
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        const val19 = val1.myStars,
          val20 = val1.myScore;
        val1.myStars = val17, val1.myScore = val17 * 2;
        try {
          const val21 = await Le({
            ratingItemId: val1.id,
            stars: val17
          });
          val21.data.code === 200 ? useToast1.success("评分成功") : (val1.myStars = val19, val1.myScore = val20, useToast1.error(val21.data.message || "评分失败"));
        } catch {
          val1.myStars = val19, val1.myScore = val20, useToast1.error("评分失败");
        }
      }
      const list2 = ["linear-gradient(135deg, #667eea, #764ba2)", "linear-gradient(135deg, #f093fb, #f5576c)", "linear-gradient(135deg, #4facfe, #00f2fe)", "linear-gradient(135deg, #43e97b, #38f9d7)", "linear-gradient(135deg, #fa709a, #fee140)", "linear-gradient(135deg, #a8edea, #fed6e3)"];
      function zz13(val1) {
        return list2[val1 % list2.length] || "linear-gradient(135deg, #667eea, #764ba2)";
      }
      watch(() => val2.params.categoryId, val1 => {
        val1 && zz5();
      }), onMounted(() => {
        if (zz5(), val3()) {
          const val1 = val4();
          val1 >= val5.MINOR_SECTION_INTRO && val1 <= val5.MINOR_SECTION_CLICK ? zz14(val1) : val1 >= val5.RATING_LIST_INTRO && val1 <= val5.RATING_ITEM_STARS && zz15(val1);
        }
      }), directiveUm(() => {
        val8();
      });
      function zz14(val1) {
        const interval = setInterval(() => {
          !refVal.value && refVal2.value && val11.value && val12.value.length > 0 && (clearInterval(interval), setTimeout(() => {
            zz16(val1);
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz15(val1) {
        const interval = setInterval(() => {
          !refVal.value && refVal2.value && !val11.value && val13.value.length > 0 && (clearInterval(interval), setTimeout(() => {
            zz20(val1);
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz16(val1) {
        switch (val1) {
          case val5.MINOR_SECTION_INTRO:
            zz17();
            break;
          case val5.MINOR_SECTION_FEEDBACK:
            zz18();
            break;
          case val5.MINOR_SECTION_CLICK:
            zz19();
            break;
        }
      }
      function zz17() {
        val7("#tour-category-grid", "选择子分类", "这里将显示该分类下的所有子分类，点击可以查看该分类内的评分项目。", {
          side: "bottom",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.MINOR_SECTION_FEEDBACK), val8(), nextTick(() => zz18());
          }
        });
      }
      function zz18() {
        val7("#tour-category-feedback", "添加内容", "点击这个按钮可以创建新的分类或评分项目。", {
          side: "left",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.MINOR_SECTION_CLICK), val8(), nextTick(() => zz19());
          }
        });
      }
      function zz19() {
        val7("#tour-first-category", "查看评分项目", "点击选择子分类查看评分项目列表。", {
          side: "bottom",
          nextBtnText: "查看项目",
          onNextClick: () => {
            val6(val5.RATING_LIST_INTRO), val8(), val12.value.length > 0 && zz6(val12.value[0]);
          }
        });
      }
      function zz20(val1) {
        switch (val1) {
          case val5.RATING_LIST_INTRO:
            zz21();
            break;
          case val5.RATING_LIST_FEEDBACK:
            zz22();
            break;
          case val5.RATING_ITEM_CARD:
            zz23();
            break;
          case val5.RATING_ITEM_STARS:
            zz24();
            break;
        }
      }
      function zz21() {
        val7("#tour-rating-list", "评分项目列表", "这里将显示该分类内的所有评分项目，你可以查看评分、热门评论，并对它们进行评分。", {
          side: "top",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_LIST_FEEDBACK), val8(), window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth"
            }), setTimeout(() => zz22(), 500);
          }
        });
      }
      function zz22() {
        val7("#tour-rating-feedback", "添加内容", "点击这个按钮可以创建新的分类或评分项目。", {
          side: "left",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_ITEM_CARD), val8(), window.scrollTo({
              top: 0,
              behavior: "smooth"
            }), setTimeout(() => zz23(), 500);
          }
        });
      }
      function zz23() {
        val7("#tour-first-rating-item", "评分项目", "这是一个单独的评分项目，你可以直接在这里查看总分、热门评论以及对它进行评分。", {
          side: "bottom",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_ITEM_STARS), val8(), nextTick(() => zz24());
          }
        });
      }
      function zz24() {
        const val1 = useUserStore1.isLoggedIn ? "点击星星可以直接对该项目进行评分。现在试试给它打个分吧！" : "点击星星可以直接对该项目进行评分。现在试试点击星星体验一下吧！（登录后即可真正评分）";
        val7("#tour-star-rating", "快速评分", val1, {
          side: "left",
          nextBtnText: "进入详情",
          allowInteraction: !0,
          onNextClick: () => {
            val6(val5.RATING_DETAIL_FEEDBACK), val8(), val13.value.length > 0 && zz7(val13.value[0].id);
          }
        });
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val17) => {
        const val18 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", ze, [createVNode(PageHeader), createElementVNode("main", He, [!refVal.value && refVal2.value ? (openBlock(), createElementBlock("nav", Ke, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val14.value, (val19, val20) => (openBlock(), createElementBlock(Fragment, {
          key: val19.id
        }, [val19.path ? (openBlock(), createBlock(val18, {
          key: 0,
          to: val19.path,
          class: "breadcrumb-item"
        }, {
          default: toDisplayValue(() => [val20 === 0 ? (openBlock(), createElementBlock("svg", Ve, [...(val17[8] || (val17[8] = [createElementVNode("path", {
            d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          }, null, -1), createElementVNode("polyline", {
            points: "9 22 9 12 15 12 15 22"
          }, null, -1)]))])) : createCommentVNode("", !0), createTextVNode(" " + toDisplayString(val19.name), 1)]),
          _: 2
        }, 1032, ["to"])) : (openBlock(), createElementBlock("span", Ue, toDisplayString(val19.name), 1)), val20 < val14.value.length - 1 ? (openBlock(), createElementBlock("svg", je, [...(val17[9] || (val17[9] = [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        }, null, -1)]))])) : createCommentVNode("", !0)], 64))), 128))])) : createCommentVNode("", !0), refVal.value ? (openBlock(), createElementBlock("div", qe, [...(val17[10] || (val17[10] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? val11.value ? (openBlock(), createElementBlock("div", Qe, [createElementVNode("h1", We, toDisplayString(refVal2.value.name), 1), val12.value.length === 0 ? (openBlock(), createElementBlock("div", Xe, [val17[14] || (val17[14] = createVNodeWrapper('<div class="empty-hero" data-v-dffedfa0><div class="empty-icon-large" data-v-dffedfa0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-dffedfa0><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-dffedfa0></rect><line x1="3" y1="9" x2="21" y2="9" data-v-dffedfa0></line><line x1="9" y1="21" x2="9" y2="9" data-v-dffedfa0></line></svg></div><h2 data-v-dffedfa0>这里还是一片空白</h2><p data-v-dffedfa0>成为第一个贡献者，帮助完善这个分类</p></div>', 1)), createElementVNode("div", Ye, [createElementVNode("button", {
          class: "action-card",
          onClick: val17[0] || (val17[0] = val19 => zz0(1))
        }, [...(val17[12] || (val17[12] = [createVNodeWrapper('<div class="action-card-icon category" data-v-dffedfa0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" data-v-dffedfa0></path><line x1="12" y1="11" x2="12" y2="17" data-v-dffedfa0></line><line x1="9" y1="14" x2="15" y2="14" data-v-dffedfa0></line></svg></div><div class="action-card-content" data-v-dffedfa0><span class="action-card-title" data-v-dffedfa0>新建子分类</span><span class="action-card-desc" data-v-dffedfa0>添加一个新的分类层级</span></div>', 2)]))]), createElementVNode("button", {
          class: "action-card",
          onClick: val17[1] || (val17[1] = val19 => zz0(2))
        }, [...(val17[13] || (val17[13] = [createVNodeWrapper('<div class="action-card-icon item" data-v-dffedfa0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-dffedfa0></polygon></svg></div><div class="action-card-content" data-v-dffedfa0><span class="action-card-title" data-v-dffedfa0>新建评分项目</span><span class="action-card-desc" data-v-dffedfa0>直接创建可评分的内容</span></div>', 2)]))])])])) : (openBlock(), createElementBlock("div", Ze, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val12.value, (val19, val20) => (openBlock(), createElementBlock("div", {
          key: val19.id,
          id: val20 === 0 ? "tour-first-category" : void 0,
          class: "section-card",
          onClick: val21 => zz6(val19)
        }, [createElementVNode("div", tt, [val19.imageUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val19.imageUrl,
          alt: val19.name,
          loading: "lazy"
        }, null, 8, at)) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: "section-placeholder",
          style: resolveRaw({
            background: zz13(val20)
          })
        }, [...(val17[15] || (val17[15] = [createElementVNode("svg", {
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
        }), createElementVNode("line", {
          x1: "3",
          y1: "9",
          x2: "21",
          y2: "9"
        }), createElementVNode("line", {
          x1: "9",
          y1: "21",
          x2: "9",
          y2: "9"
        })], -1)]))], 4)), val19.hasChildren ? (openBlock(), createElementBlock("div", nt, toDisplayString(val19.childrenCount) + " 个子分类 ", 1)) : val19.itemCount > 0 ? (openBlock(), createElementBlock("div", ot, toDisplayString(val19.itemCount) + " 个项目 ", 1)) : createCommentVNode("", !0)]), createElementVNode("div", st, [createElementVNode("h3", it, toDisplayString(val19.name), 1), val19.description ? (openBlock(), createElementBlock("p", rt, toDisplayString(val19.description), 1)) : createCommentVNode("", !0)])], 8, et))), 128))]))])) : (openBlock(), createElementBlock(Fragment, {
          key: 4
        }, [val13.value.length > 0 ? (openBlock(), createElementBlock("div", lt, [createElementVNode("nav", dt, [createElementVNode("span", ct, toDisplayString(refVal2.value?.ratingItems?.length ?? 0) + " 个评分", 1), val17[16] || (val17[16] = createElementVNode("span", {
          class: "filter-separator"
        }, null, -1)), createElementVNode("div", ut, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val19 => createElementVNode("button", {
          key: val19.value,
          class: normalizeClass(["filter-btn", {
            active: refVal6.value === val19.value
          }]),
          onClick: val20 => zz8(val19.value)
        }, toDisplayString(val19.label), 11, vt)), 64))])]), createElementVNode("div", ft, [createElementVNode("button", {
          class: normalizeClass(["view-btn", {
            active: refVal7.value === "list"
          }]),
          onClick: val17[2] || (val17[2] = val19 => refVal7.value = "list"),
          title: "列表视图"
        }, [...(val17[17] || (val17[17] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><line x1="8" y1="6" x2="21" y2="6" data-v-dffedfa0></line><line x1="8" y1="12" x2="21" y2="12" data-v-dffedfa0></line><line x1="8" y1="18" x2="21" y2="18" data-v-dffedfa0></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-dffedfa0></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-dffedfa0></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-dffedfa0></line></svg>', 1)]))], 2), createElementVNode("button", {
          class: normalizeClass(["view-btn", {
            active: refVal7.value === "grid"
          }]),
          onClick: val17[3] || (val17[3] = val19 => refVal7.value = "grid"),
          title: "网格视图"
        }, [...(val17[18] || (val17[18] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><rect x="3" y="3" width="7" height="7" data-v-dffedfa0></rect><rect x="14" y="3" width="7" height="7" data-v-dffedfa0></rect><rect x="14" y="14" width="7" height="7" data-v-dffedfa0></rect><rect x="3" y="14" width="7" height="7" data-v-dffedfa0></rect></svg>', 1)]))], 2)])])) : createCommentVNode("", !0), val13.value.length === 0 ? (openBlock(), createElementBlock("div", gt, [val17[21] || (val17[21] = createElementVNode("div", {
          class: "empty-hero"
        }, [createElementVNode("div", {
          class: "empty-icon-large"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        })])]), createElementVNode("h2", null, "这里还是一片空白"), createElementVNode("p", null, "成为第一个贡献者，帮助完善这个分类")], -1)), createElementVNode("div", ht, [createElementVNode("button", {
          class: "action-card",
          onClick: val17[4] || (val17[4] = val19 => zz0(1))
        }, [...(val17[19] || (val17[19] = [createVNodeWrapper('<div class="action-card-icon category" data-v-dffedfa0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" data-v-dffedfa0></path><line x1="12" y1="11" x2="12" y2="17" data-v-dffedfa0></line><line x1="9" y1="14" x2="15" y2="14" data-v-dffedfa0></line></svg></div><div class="action-card-content" data-v-dffedfa0><span class="action-card-title" data-v-dffedfa0>新建子分类</span><span class="action-card-desc" data-v-dffedfa0>添加一个新的分类层级</span></div>', 2)]))]), createElementVNode("button", {
          class: "action-card",
          onClick: val17[5] || (val17[5] = val19 => zz0(2))
        }, [...(val17[20] || (val17[20] = [createVNodeWrapper('<div class="action-card-icon item" data-v-dffedfa0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dffedfa0><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-dffedfa0></polygon></svg></div><div class="action-card-content" data-v-dffedfa0><span class="action-card-title" data-v-dffedfa0>新建评分项目</span><span class="action-card-desc" data-v-dffedfa0>直接创建可评分的内容</span></div>', 2)]))])])])) : createCommentVNode("", !0), createVNode(withSlots, {
          name: "view-switch",
          mode: "out-in"
        }, {
          default: toDisplayValue(() => [refVal7.value === "list" ? (openBlock(), createElementBlock("div", pt, [createVNode(TransitionGroup, {
            name: "list",
            tag: "div",
            id: "tour-rating-list",
            class: "rating-list"
          }, {
            default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(val13.value, (val19, val20) => (openBlock(), createElementBlock("div", {
              key: val19.id,
              id: val20 === 0 ? "tour-first-rating-item" : void 0,
              class: "rating-item",
              onClick: val21 => zz7(val19.id)
            }, [createElementVNode("div", mt, [val19.url ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: val19.url,
              alt: val19.name,
              class: "item-image",
              loading: "lazy"
            }, null, 8, kt)) : (openBlock(), createElementBlock("div", _t, [...(val17[22] || (val17[22] = [createElementVNode("svg", {
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
            })], -1)]))]))]), createElementVNode("div", xt, [createElementVNode("div", bt, [createElementVNode("h3", Ct, toDisplayString(val19.name), 1), createElementVNode("div", wt, [createElementVNode("span", Tt, toDisplayString(val19.averageScore.toFixed(1)) + "分", 1), createElementVNode("div", {
              id: val20 === 0 ? "tour-star-rating" : void 0,
              class: "star-rating",
              onMouseleave: val21 => zz10(val19.id)
            }, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val21 => createElementVNode("button", {
              key: val21,
              class: normalizeClass(["star-btn", {
                filled: val21 <= zz11(val19)
              }]),
              onClick: val22 => zz12(val19, val21, val22),
              onMouseenter: val22 => zz9(val19.id, val21)
            }, [...(val17[23] || (val17[23] = [createElementVNode("svg", {
              viewBox: "0 0 24 24",
              "stroke-width": "1.5"
            }, [createElementVNode("polygon", {
              points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            })], -1)]))], 42, St)), 64))], 40, It)])]), createElementVNode("div", Nt, [createElementVNode("span", Rt, toDisplayString(val19.ratingCount) + " 人评分", 1)]), val19.topComment ? (openBlock(), createElementBlock("div", Bt, [createElementVNode("span", Et, '"' + toDisplayString(val19.topComment.commentText) + '"', 1), createElementVNode("span", Mt, "—— " + toDisplayString(val19.topComment.nickname), 1)])) : (openBlock(), createElementBlock("div", At, [...(val17[24] || (val17[24] = [createElementVNode("span", {
              class: "comment-text"
            }, '"TA还在等着你评论呢！"', -1)]))]))])], 8, yt))), 128))]),
            _: 1
          })])) : (openBlock(), createElementBlock("div", Ft, [createVNode(TransitionGroup, {
            name: "grid",
            tag: "div",
            class: "rating-grid"
          }, {
            default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(val13.value, (val19, val20) => (openBlock(), createElementBlock("div", {
              key: val19.id,
              class: "grid-item",
              onClick: val21 => zz7(val19.id)
            }, [createElementVNode("div", Ot, [val19.url ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: val19.url,
              alt: val19.name,
              loading: "lazy"
            }, null, 8, Lt)) : (openBlock(), createElementBlock("div", {
              key: 1,
              class: "grid-item-placeholder",
              style: resolveRaw({
                background: zz13(val20)
              })
            }, [...(val17[25] || (val17[25] = [createElementVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [createElementVNode("polygon", {
              points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            })], -1)]))], 4)), createElementVNode("div", $t, toDisplayString(val19.averageScore.toFixed(1)), 1)]), createElementVNode("div", Gt, [createElementVNode("h3", Pt, toDisplayString(val19.name), 1), createElementVNode("span", zt, toDisplayString(val19.ratingCount) + " 人评分", 1)])], 8, Dt))), 128))]),
            _: 1
          })]))]),
          _: 1
        })], 64)) : (openBlock(), createElementBlock("div", Je, [...(val17[11] || (val17[11] = [createElementVNode("div", {
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
        }), createElementVNode("path", {
          d: "M8 15h8M9 9h.01M15 9h.01"
        })])], -1), createElementVNode("h2", null, "分类不存在", -1), createElementVNode("p", null, "该分类可能已被删除或不存在", -1)]))]))]), createVNode(PageFooter), refVal2.value && !refVal.value ? (openBlock(), createElementBlock("div", Ht, [createVNode(withSlots, {
          name: "fade"
        }, {
          default: toDisplayValue(() => [refVal5.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fab-overlay",
            onClick: zz3
          })) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "fab-menu"
        }, {
          default: toDisplayValue(() => [refVal5.value ? (openBlock(), createElementBlock("div", Kt, [createElementVNode("button", {
            class: "fab-menu-item",
            onClick: val17[6] || (val17[6] = val19 => zz0(1))
          }, [...(val17[26] || (val17[26] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("path", {
            d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
          }), createElementVNode("line", {
            x1: "12",
            y1: "11",
            x2: "12",
            y2: "17"
          }), createElementVNode("line", {
            x1: "9",
            y1: "14",
            x2: "15",
            y2: "14"
          })], -1), createElementVNode("span", null, "新建分类", -1)]))]), createElementVNode("button", {
            class: "fab-menu-item",
            onClick: val17[7] || (val17[7] = val19 => zz0(2))
          }, [...(val17[27] || (val17[27] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("polygon", {
            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          })], -1), createElementVNode("span", null, "新建评分项目", -1)]))])])) : createCommentVNode("", !0)]),
          _: 1
        }), createElementVNode("button", {
          id: "tour-category-feedback",
          class: normalizeClass(["fab-button", {
            expanded: refVal5.value
          }]),
          onClick: zz2
        }, [...(val17[28] || (val17[28] = [createElementVNode("svg", {
          class: "fab-icon",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
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
        })], -1)]))], 2)])) : createCommentVNode("", !0), createVNode(Pe, {
          "is-open": refVal3.value,
          "contribution-type": 2,
          "target-type": refVal4.value,
          "parent-id": val10.value,
          "school-id": val15.value,
          "parent-path": val16.value,
          onClose: zz1,
          onSuccess: zz4
        }, null, 8, ["is-open", "target-type", "parent-id", "school-id", "parent-path"])]);
      };
    }
  }),
  Xt = withScopeId(Vt, [["__scopeId", "data-v-dffedfa0"]]);
/* index 运行时导出（已语义化） */
export { Xt as default };