/*!
 * 页面模块：搜索（CommunitySearchPage）
 * 路由：/community/search   name=community-search   层级=2   需登录=否
 * 功能：公开的「搜索」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CommunitySearchPage-Bt5X32By.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, nextTick, createElementBlock, createVNode, createElementVNode, withDirectives, vModelText, Fragment, renderList, createVNodeWrapper, toDisplayString, useToast, normalizeClass, createCommentVNode, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { searchRatingCommunity, createRatingCommunityRatings } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：search-section */
/* 模板属性配置：search-box */
/* 模板属性配置：skeleton-list */
/* 模板属性配置：empty-container */
const local_zb64 = {
    class: "page-container"
  },
  local_zb65 = {
    class: "page-content"
  },
  local_zb66 = {
    class: "search-section"
  },
  local_zb67 = {
    class: "search-box"
  },
  local_zb68 = ["disabled"],
  local_zb69 = {
    key: 0,
    class: "skeleton-list"
  },
  CommunitySearchPageConfig = {
    key: 1,
    class: "empty-container"
  },
  ee = {
    key: 2,
    class: "empty-container"
  },
  te = {
    class: "filter-section"
  },
  se = {
    class: "total-count"
  },
  ae = {
    class: "rating-list"
  },
  oe = ["onClick"],
  ne = {
    class: "item-image-wrapper"
  },
  re = ["src", "alt"],
  ie = {
    key: 1,
    class: "item-image-placeholder"
  },
  ce = {
    class: "item-details"
  },
  le = {
    class: "item-header"
  },
  de = {
    class: "item-name"
  },
  ue = {
    class: "item-rating"
  },
  ve = {
    class: "item-score"
  },
  me = ["onMouseleave"],
  he = ["onClick", "onMouseenter"],
  ye = {
    class: "item-meta"
  },
  pe = {
    class: "rating-count"
  },
  _e = {
    key: 0,
    class: "item-breadcrumb"
  },
  ge = {
    key: 0,
    class: "hot-comment"
  },
  ke = {
    class: "comment-text"
  },
  fe = {
    class: "comment-author"
  },
  xe = {
    key: 1,
    class: "hot-comment empty"
  },
  Se = defineComponent({
    __name: "CommunitySearchPage",
    setup(we) {
      const useRouter1 = useRouter(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        refVal = ref(""),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(!1),
        refVal5 = ref(!1),
        refVal6 = ref(null),
        refVal7 = ref({});
      function zz0(val) {
        if (!val) return "";
        const list = [];
        return val.ancestors && Array.isArray(val.ancestors) && val.ancestors.forEach(val1 => {
          val1.name && list.push(val1.name);
        }), val.current && val.current.name && list.push(val.current.name), list.join(" / ");
      }
      async function zz1() {
        const val = refVal.value.trim();
        if (val) {
          refVal4.value = !0, refVal5.value = !0;
          try {
            const val1 = await searchRatingCommunity(val);
            val1.data.code === 200 ? (refVal2.value = val1.data.data.items, refVal3.value = val1.data.data.total) : useToast1.error(val1.data.message || "搜索失败");
          } catch {
            useToast1.error("搜索失败");
          } finally {
            refVal4.value = !1;
          }
        }
      }
      function zz2(val) {
        useRouter1.push(`/community/item/${val}`);
      }
      function zz3(val, val2) {
        refVal7.value[val] = val2;
      }
      function zz4(val) {
        refVal7.value[val] = 0;
      }
      function zz5(val) {
        return refVal7.value[val.id] ? refVal7.value[val.id] ?? 0 : val.myStars || 0;
      }
      async function zz6(val, val2, val3) {
        if (val3.stopPropagation(), !useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        const val4 = val.myStars,
          val5 = val.myScore;
        val.myStars = val2, val.myScore = val2 * 2;
        try {
          const val1 = await createRatingCommunityRatings({
            ratingItemId: val.id,
            stars: val2
          });
          val1.data.code === 200 ? useToast1.success("评分成功") : (val.myStars = val4, val.myScore = val5, useToast1.error(val1.data.message || "评分失败"));
        } catch {
          val.myStars = val4, val.myScore = val5, useToast1.error("评分失败");
        }
      }
      function zz7(val) {
        val.key === "Enter" && zz1();
      }
      return onMounted(() => {
        nextTick(() => {
          refVal6.value?.focus();
        });
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val, val2) => (openBlock(), createElementBlock("div", local_zb64, [createVNode(PageHeader, {
        "back-to": "/community"
      }), createElementVNode("main", local_zb65, [createElementVNode("div", local_zb66, [createElementVNode("div", local_zb67, [val2[2] || (val2[2] = createElementVNode("svg", {
        class: "search-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), createElementVNode("path", {
        d: "m21 21-4.35-4.35"
      })], -1)), withDirectives(createElementVNode("input", {
        ref_key: "searchInputRef",
        ref: refVal6,
        "onUpdate:modelValue": val2[0] || (val2[0] = val1 => refVal.value = val1),
        type: "text",
        enterkeyhint: "search",
        class: "search-input",
        placeholder: "搜索食堂、建筑、课程...",
        onKeydown: zz7
      }, null, 544), [[vModelText, refVal.value]]), createElementVNode("button", {
        class: "search-trigger-btn",
        onClick: zz1,
        disabled: !refVal.value.trim()
      }, [...(val2[1] || (val2[1] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1)]))], 8, local_zb68)])]), refVal4.value ? (openBlock(), createElementBlock("div", local_zb69, [(openBlock(), createElementBlock(Fragment, null, renderList(4, val1 => createElementVNode("div", {
        key: val1,
        class: "skeleton-item"
      }, [...(val2[3] || (val2[3] = [createVNodeWrapper('<div class="skeleton-image" data-v-0deb6a1a></div><div class="skeleton-content" data-v-0deb6a1a><div class="skeleton-title" data-v-0deb6a1a></div><div class="skeleton-rating" data-v-0deb6a1a></div><div class="skeleton-comment" data-v-0deb6a1a></div></div>', 2)]))])), 64))])) : refVal5.value ? refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", ee, [...(val2[5] || (val2[5] = [createVNodeWrapper('<div class="empty-icon warning" data-v-0deb6a1a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-0deb6a1a><circle cx="12" cy="12" r="10" data-v-0deb6a1a></circle><line x1="12" y1="8" x2="12" y2="12" data-v-0deb6a1a></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-0deb6a1a></line></svg></div><h2 data-v-0deb6a1a>未找到相关结果</h2><p data-v-0deb6a1a>换个关键词试试吧</p>', 3)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 3
      }, [createElementVNode("div", te, [createElementVNode("span", se, "搜索结果 / " + toDisplayString(refVal3.value), 1)]), createElementVNode("div", ae, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val1 => (openBlock(), createElementBlock("div", {
        key: val1.id,
        class: "rating-item",
        onClick: val3 => zz2(val1.id)
      }, [createElementVNode("div", ne, [val1.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val1.url,
        alt: val1.name,
        class: "item-image",
        loading: "lazy"
      }, null, 8, re)) : (openBlock(), createElementBlock("div", ie, [...(val2[6] || (val2[6] = [createElementVNode("svg", {
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
      })], -1)]))]))]), createElementVNode("div", ce, [createElementVNode("div", le, [createElementVNode("h3", de, toDisplayString(val1.name), 1), createElementVNode("div", ue, [createElementVNode("span", ve, toDisplayString(val1.averageScore.toFixed(1)) + "分", 1), createElementVNode("div", {
        class: "star-rating",
        onMouseleave: val3 => zz4(val1.id)
      }, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val3 => createElementVNode("button", {
        key: val3,
        class: normalizeClass(["star-btn", {
          filled: val3 <= zz5(val1)
        }]),
        onClick: val4 => zz6(val1, val3, val4),
        onMouseenter: val4 => zz3(val1.id, val3)
      }, [...(val2[7] || (val2[7] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))], 42, he)), 64))], 40, me)])]), createElementVNode("div", ye, [createElementVNode("span", pe, toDisplayString(val1.ratingCount) + " 人评分", 1), "breadcrumb" in val1 && zz0(val1.breadcrumb) ? (openBlock(), createElementBlock("span", _e, toDisplayString(zz0(val1.breadcrumb)), 1)) : createCommentVNode("", !0)]), val1.topComment ? (openBlock(), createElementBlock("div", ge, [createElementVNode("span", ke, '"' + toDisplayString(val1.topComment.commentText) + '"', 1), createElementVNode("span", fe, "—— " + toDisplayString(val1.topComment.nickname), 1)])) : (openBlock(), createElementBlock("div", xe, [...(val2[8] || (val2[8] = [createElementVNode("span", {
        class: "comment-text"
      }, '"TA还在等着你评论呢！"', -1)]))]))])], 8, oe))), 128))])], 64)) : (openBlock(), createElementBlock("div", CommunitySearchPageConfig, [...(val2[4] || (val2[4] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), createElementVNode("path", {
        d: "m21 21-4.35-4.35"
      })])], -1), createElementVNode("h2", null, "搜索评分项目", -1), createElementVNode("p", null, "输入关键词，点击箭头或按回车搜索", -1)]))]))])]));
    }
  }),
  Me = withScopeId(Se, [["__scopeId", "data-v-0deb6a1a"]]);
/* index 运行时导出（已语义化） */
export { Me as default };