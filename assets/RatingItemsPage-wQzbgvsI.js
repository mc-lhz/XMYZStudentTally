/*!
 * 页面模块：评分列表（RatingItemsPage）
 * 路由：/community/minor/:minorId   name=community-minor   层级=3   需登录=否
 * 功能：公开的「评分列表」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingItemsPage-wQzbgvsI.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, inject, ref, applyDirectives, onMounted, appProvider, directiveUm, nextTick, createElementBlock, createVNode, createElementVNode, Fragment, renderList, toDisplayString, createTextVNode, unref, useToast, useRouter, createVNodeWrapper, normalizeClass, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityMinorSectionsRatingItemsById as de, createRatingCommunityRatings as ue } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：本地模块 FeedbackDrawer（站点内功能模块） */
import { scopedStyle_zb0 as me } from "./FeedbackDrawer-BX330nGh.js";
const _e = {
    class: "page-container"
  },
  pe = {
    class: "page-content"
  },
  he = {
    class: "skeleton-list"
  },
  ke = {
    key: 1,
    class: "empty-container"
  },
  fe = {
    class: "filter-section"
  },
  ye = {
    class: "total-count"
  },
  Te = {
    class: "filter-buttons"
  },
  Se = ["onClick"],
  Ie = {
    id: "tour-rating-list",
    class: "rating-list"
  },
  be = ["id", "onClick"],
  xe = {
    class: "item-image-wrapper"
  },
  Ce = ["src", "alt"],
  we = {
    key: 1,
    class: "item-image-placeholder"
  },
  Re = {
    class: "item-details"
  },
  Ae = {
    class: "item-header"
  },
  Ne = {
    class: "item-name"
  },
  Fe = {
    class: "item-rating"
  },
  Ee = {
    class: "item-score"
  },
  Be = ["id", "onMouseleave"],
  De = ["onClick", "onMouseenter"],
  Le = {
    class: "item-meta"
  },
  Me = {
    class: "rating-count"
  },
  Ge = {
    key: 0,
    class: "hot-comment"
  },
  Pe = {
    class: "comment-text"
  },
  $e = {
    class: "comment-author"
  },
  Ve = {
    key: 1,
    class: "hot-comment empty"
  },
  He = defineComponent({
    __name: "RatingItemsPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
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
        val10 = Number(val2.params.minorId),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref("hot"),
        refVal4 = ref(!1);
      function zz0() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        refVal4.value = !0;
      }
      function zz1() {
        refVal4.value = !1;
      }
      function zz2() {}
      const refVal5 = ref({}),
        list = [{
          label: "热门",
          value: "hot"
        }, {
          label: "高分",
          value: "high"
        }, {
          label: "低分",
          value: "low"
        }];
      async function zz3() {
        refVal.value = !0;
        try {
          const val1 = await de(val10);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取评分列表失败");
        } catch {
          useToast1.error("获取评分列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      const val11 = applyDirectives(() => {
        const list1 = [...refVal2.value];
        switch (refVal3.value) {
          case "hot":
            return list1.sort((val1, val12) => val12.ratingCount - val1.ratingCount);
          case "high":
            return list1.sort((val1, val12) => val12.averageScore - val1.averageScore);
          case "low":
            return list1.sort((val1, val12) => val1.averageScore - val12.averageScore);
          default:
            return list1;
        }
      });
      function zz4(val1) {
        refVal3.value = val1;
      }
      function zz5(val1) {
        useRouter1.push(`/community/item/${val1}`);
      }
      function zz6(val1, val12) {
        refVal5.value[val1] = val12;
      }
      function zz7(val1) {
        refVal5.value[val1] = 0;
      }
      function zz8(val1) {
        return refVal5.value[val1.id] ? refVal5.value[val1.id] ?? 0 : val1.myStars || 0;
      }
      async function zz9(val1, val12, val13) {
        if (val13.stopPropagation(), val9()) {
          val1.myStars = val12, val1.myScore = val12 * 2;
          return;
        }
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        const val14 = val1.myStars,
          val15 = val1.myScore;
        val1.myStars = val12, val1.myScore = val12 * 2;
        try {
          const val16 = await ue({
            ratingItemId: val1.id,
            stars: val12
          });
          val16.data.code === 200 ? useToast1.success("评分成功") : (val1.myStars = val14, val1.myScore = val15, useToast1.error(val16.data.message || "评分失败"));
        } catch {
          val1.myStars = val14, val1.myScore = val15, useToast1.error("评分失败");
        }
      }
      onMounted(() => {
        if (zz3(), val3()) {
          const val1 = val4();
          val1 >= val5.RATING_LIST_INTRO && val1 <= val5.RATING_ITEM_STARS && zz10(val1);
        }
      }), directiveUm(() => {
        val8();
      });
      function zz10(val1) {
        const interval = setInterval(() => {
          !refVal.value && refVal2.value.length > 0 && (clearInterval(interval), setTimeout(() => {
            zz11(val1);
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz11(val1) {
        switch (val1) {
          case val5.RATING_LIST_INTRO:
            zz12();
            break;
          case val5.RATING_LIST_FEEDBACK:
            zz13();
            break;
          case val5.RATING_ITEM_CARD:
            zz14();
            break;
          case val5.RATING_ITEM_STARS:
            zz15();
            break;
        }
      }
      function zz12() {
        val7("#tour-rating-list", "评分项目列表", "这里将显示该分区内的所有评分项目，你可以查看评分、热门评论，并对它们进行评分。", {
          side: "top",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_LIST_FEEDBACK), val8(), window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth"
            }), setTimeout(() => zz13(), 500);
          }
        });
      }
      function zz13() {
        val7("#tour-rating-feedback", "新建评分项目", "如果没找到想要的评分项目，可以点击这里发起添加请求。", {
          side: "top",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_ITEM_CARD), val8(), window.scrollTo({
              top: 0,
              behavior: "smooth"
            }), setTimeout(() => zz14(), 500);
          }
        });
      }
      function zz14() {
        val7("#tour-first-rating-item", "评分项目", "这是一个单独的评分项目，你可以直接在这里查看总分、热门评论以及对它进行评分。", {
          side: "bottom",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.RATING_ITEM_STARS), val8(), nextTick(() => zz15());
          }
        });
      }
      function zz15() {
        const val1 = useUserStore1.isLoggedIn ? "点击星星可以直接对该项目进行评分。现在试试给它打个分吧！" : "点击星星可以直接对该项目进行评分。现在试试点击星星体验一下吧！（登录后即可真正评分）";
        val7("#tour-star-rating", "快速评分", val1, {
          side: "left",
          nextBtnText: "进入详情",
          allowInteraction: !0,
          onNextClick: () => {
            val6(val5.RATING_DETAIL_FEEDBACK), val8(), val11.value.length > 0 && zz5(val11.value[0].id);
          }
        });
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val12) => (openBlock(), createElementBlock("div", _e, [createVNode(PageHeader), createElementVNode("main", pe, [refVal.value ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [val12[1] || (val12[1] = createElementVNode("div", {
        class: "skeleton-filter"
      }, [createElementVNode("div", {
        class: "skeleton-total"
      }), createElementVNode("div", {
        class: "skeleton-buttons"
      })], -1)), createElementVNode("div", he, [(openBlock(), createElementBlock(Fragment, null, renderList(4, val13 => createElementVNode("div", {
        key: val13,
        class: "skeleton-item"
      }, [...(val12[0] || (val12[0] = [createVNodeWrapper('<div class="skeleton-image" data-v-a97d258e></div><div class="skeleton-content" data-v-a97d258e><div class="skeleton-title" data-v-a97d258e></div><div class="skeleton-rating" data-v-a97d258e></div><div class="skeleton-comment" data-v-a97d258e></div></div>', 2)]))])), 64))])], 64)) : refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", ke, [...(val12[2] || (val12[2] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })])], -1), createElementVNode("h2", null, "暂无评分项目", -1), createElementVNode("p", null, "该区域暂无可评分的项目", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [createElementVNode("div", fe, [createElementVNode("span", ye, "全部评分 / " + toDisplayString(refVal2.value.length), 1), createElementVNode("div", Te, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val13 => createElementVNode("button", {
        key: val13.value,
        class: normalizeClass(["filter-btn", {
          active: refVal3.value === val13.value
        }]),
        onClick: val14 => zz4(val13.value)
      }, toDisplayString(val13.label), 11, Se)), 64))])]), createElementVNode("div", Ie, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val11.value, (val13, val14) => (openBlock(), createElementBlock("div", {
        key: val13.id,
        id: val14 === 0 ? "tour-first-rating-item" : void 0,
        class: "rating-item",
        onClick: val15 => zz5(val13.id)
      }, [createElementVNode("div", xe, [val13.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val13.url,
        alt: val13.name,
        class: "item-image",
        loading: "lazy"
      }, null, 8, Ce)) : (openBlock(), createElementBlock("div", we, [...(val12[3] || (val12[3] = [createElementVNode("svg", {
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
      })], -1)]))]))]), createElementVNode("div", Re, [createElementVNode("div", Ae, [createElementVNode("h3", Ne, toDisplayString(val13.name), 1), createElementVNode("div", Fe, [createElementVNode("span", Ee, toDisplayString(val13.averageScore.toFixed(1)) + "分", 1), createElementVNode("div", {
        id: val14 === 0 ? "tour-star-rating" : void 0,
        class: "star-rating",
        onMouseleave: val15 => zz7(val13.id)
      }, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val15 => createElementVNode("button", {
        key: val15,
        class: normalizeClass(["star-btn", {
          filled: val15 <= zz8(val13)
        }]),
        onClick: val16 => zz9(val13, val15, val16),
        onMouseenter: val16 => zz6(val13.id, val15)
      }, [...(val12[4] || (val12[4] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))], 42, De)), 64))], 40, Be)])]), createElementVNode("div", Le, [createElementVNode("span", Me, toDisplayString(val13.ratingCount) + " 人评分", 1)]), val13.topComment ? (openBlock(), createElementBlock("div", Ge, [createElementVNode("span", Pe, '"' + toDisplayString(val13.topComment.commentText) + '"', 1), createElementVNode("span", $e, "—— " + toDisplayString(val13.topComment.nickname), 1)])) : (openBlock(), createElementBlock("div", Ve, [...(val12[5] || (val12[5] = [createElementVNode("span", {
        class: "comment-text"
      }, '"TA还在等着你评论呢！"', -1)]))]))])], 8, be))), 128))]), createElementVNode("div", {
        class: "feedback-prompt"
      }, [createElementVNode("button", {
        id: "tour-rating-feedback",
        class: "feedback-link",
        onClick: zz0
      }, [...(val12[6] || (val12[6] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "16"
      }), createElementVNode("line", {
        x1: "8",
        y1: "12",
        x2: "16",
        y2: "12"
      })], -1), createTextVNode(" 没找到想要的评分项目？点我发起新建请求 ", -1)]))])])], 64))]), createVNode(PageFooter), createVNode(me, {
        "is-open": refVal4.value,
        "contribution-type": 2,
        "target-type": 2,
        "parent-id": unref(val10),
        onClose: zz1,
        onSuccess: zz2
      }, null, 8, ["is-open", "parent-id"])]));
    }
  }),
  Je = withScopeId(He, [["__scopeId", "data-v-a97d258e"]]);
/* index 运行时导出（已语义化） */
export { Je as default };