/*!
 * 页面模块：合集详情（CollectionDetailPage）
 * 路由：/community/collection/:collectionId   name=community-collection   层级=2   需登录=否
 * 功能：公开的「合集详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CollectionDetailPage-B1MhHCDA.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, inject, ref, applyDirectives, onMounted, createElementBlock, createVNode, createElementVNode, Fragment, createVNodeWrapper, renderList, createCommentVNode, toDisplayString, useToast, normalizeClass, unref, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityCollectionsById, createRatingCommunityRatings } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingSectionName } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：skeleton-list */
/* 模板属性配置：empty-container */
/* 模板属性配置：collection-header */
const CollectionDetailPageConfig = {
    class: "page-container"
  },
  CollectionDetailPageConfig_2 = {
    class: "page-content"
  },
  local_zb60 = {
    class: "skeleton-list"
  },
  local_zb61 = {
    key: 1,
    class: "empty-container"
  },
  local_zb62 = {
    class: "collection-header"
  },
  ee = {
    class: "collection-cover-wrapper"
  },
  te = ["src", "alt"],
  se = {
    key: 1,
    class: "collection-cover-placeholder"
  },
  oe = {
    class: "collection-info"
  },
  ae = {
    class: "collection-title"
  },
  ne = {
    key: 0,
    class: "collection-desc"
  },
  le = {
    class: "collection-count"
  },
  ie = {
    key: 0,
    class: "empty-container"
  },
  ce = {
    class: "filter-section"
  },
  re = {
    class: "total-count"
  },
  de = {
    class: "filter-buttons"
  },
  ve = ["onClick"],
  ue = {
    class: "rating-list"
  },
  me = ["onClick"],
  _e = {
    class: "item-image-wrapper"
  },
  he = ["src", "alt"],
  pe = {
    key: 1,
    class: "item-image-placeholder"
  },
  ge = {
    class: "item-details"
  },
  ke = {
    class: "item-header"
  },
  ye = {
    class: "item-name"
  },
  be = {
    class: "item-rating"
  },
  fe = {
    class: "item-score"
  },
  Ce = ["onMouseleave"],
  Se = ["onClick", "onMouseenter"],
  we = {
    class: "item-meta"
  },
  xe = {
    class: "rating-count"
  },
  Me = {
    class: "item-breadcrumb-text"
  },
  Be = {
    key: 0,
    class: "hot-comment"
  },
  De = {
    class: "comment-text"
  },
  Ie = {
    class: "comment-author"
  },
  Pe = {
    key: 1,
    class: "hot-comment empty"
  },
  Fe = defineComponent({
    __name: "CollectionDetailPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        val3 = Number(val2.params.collectionId),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref("hot"),
        refVal4 = ref({}),
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
      async function zz0() {
        refVal.value = !0;
        try {
          const val1 = await getRatingCommunityCollectionsById(val3);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取合集详情失败");
        } catch {
          useToast1.error("获取合集详情失败");
        } finally {
          refVal.value = !1;
        }
      }
      const val4 = applyDirectives(() => {
        if (!refVal2.value?.items) return [];
        const list1 = [...refVal2.value.items];
        switch (refVal3.value) {
          case "hot":
            return list1.sort((val1, val5) => val5.ratingCount - val1.ratingCount);
          case "high":
            return list1.sort((val1, val5) => val5.averageScore - val1.averageScore);
          case "low":
            return list1.sort((val1, val5) => val1.averageScore - val5.averageScore);
          default:
            return list1;
        }
      });
      function zz1(val1) {
        refVal3.value = val1;
      }
      function zz2(val1) {
        useRouter1.push(`/community/item/${val1}`);
      }
      function zz3(val1, val5) {
        refVal4.value[val1] = val5;
      }
      function zz4(val1) {
        refVal4.value[val1] = 0;
      }
      function zz5(val1) {
        return refVal4.value[val1.id] ? refVal4.value[val1.id] ?? 0 : val1.myStars || 0;
      }
      async function zz6(val1, val5, val6) {
        if (val6.stopPropagation(), !useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        const val7 = val1.myStars,
          val8 = val1.myScore;
        val1.myStars = val5, val1.myScore = val5 * 2;
        try {
          const val9 = await createRatingCommunityRatings({
            ratingItemId: val1.id,
            stars: val5
          });
          val9.data.code === 200 ? useToast1.success("评分成功") : (val1.myStars = val7, val1.myScore = val8, useToast1.error(val9.data.message || "评分失败"));
        } catch {
          val1.myStars = val7, val1.myScore = val8, useToast1.error("评分失败");
        }
      }
      return onMounted(() => {
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => (openBlock(), createElementBlock("div", CollectionDetailPageConfig, [createVNode(PageHeader), createElementVNode("main", CollectionDetailPageConfig_2, [refVal.value ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [val5[1] || (val5[1] = createVNodeWrapper('<div class="collection-header-skeleton" data-v-547bebe4><div class="skeleton-cover" data-v-547bebe4></div><div class="skeleton-info" data-v-547bebe4><div class="skeleton-title" data-v-547bebe4></div><div class="skeleton-desc" data-v-547bebe4></div></div></div><div class="skeleton-filter" data-v-547bebe4><div class="skeleton-total" data-v-547bebe4></div><div class="skeleton-buttons" data-v-547bebe4></div></div>', 2)), createElementVNode("div", local_zb60, [(openBlock(), createElementBlock(Fragment, null, renderList(4, val6 => createElementVNode("div", {
        key: val6,
        class: "skeleton-item"
      }, [...(val5[0] || (val5[0] = [createVNodeWrapper('<div class="skeleton-image" data-v-547bebe4></div><div class="skeleton-content" data-v-547bebe4><div class="skeleton-title" data-v-547bebe4></div><div class="skeleton-rating" data-v-547bebe4></div><div class="skeleton-comment" data-v-547bebe4></div></div>', 2)]))])), 64))])], 64)) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [createElementVNode("div", local_zb62, [createElementVNode("div", ee, [refVal2.value.coverUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: refVal2.value.coverUrl,
        alt: refVal2.value.name,
        class: "collection-cover"
      }, null, 8, te)) : (openBlock(), createElementBlock("div", se, [...(val5[3] || (val5[3] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      })], -1)]))]))]), createElementVNode("div", oe, [createElementVNode("h1", ae, toDisplayString(refVal2.value.name), 1), refVal2.value.description ? (openBlock(), createElementBlock("p", ne, toDisplayString(refVal2.value.description), 1)) : createCommentVNode("", !0), createElementVNode("span", le, toDisplayString(refVal2.value.itemCount) + " 个评分项目", 1)])]), refVal2.value.items.length === 0 ? (openBlock(), createElementBlock("div", ie, [...(val5[4] || (val5[4] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })])], -1), createElementVNode("h2", null, "暂无评分项目", -1), createElementVNode("p", null, "该合集暂无可评分的项目", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ce, [createElementVNode("span", re, "全部评分 / " + toDisplayString(refVal2.value.items.length), 1), createElementVNode("div", de, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val6 => createElementVNode("button", {
        key: val6.value,
        class: normalizeClass(["filter-btn", {
          active: refVal3.value === val6.value
        }]),
        onClick: val7 => zz1(val6.value)
      }, toDisplayString(val6.label), 11, ve)), 64))])]), createElementVNode("div", ue, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val4.value, val6 => (openBlock(), createElementBlock("div", {
        key: val6.id,
        class: "rating-item",
        onClick: val7 => zz2(val6.id)
      }, [createElementVNode("div", _e, [val6.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val6.url,
        alt: val6.name,
        class: "item-image",
        loading: "lazy"
      }, null, 8, he)) : (openBlock(), createElementBlock("div", pe, [...(val5[5] || (val5[5] = [createElementVNode("svg", {
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
      })], -1)]))]))]), createElementVNode("div", ge, [createElementVNode("div", ke, [createElementVNode("h3", ye, toDisplayString(val6.name), 1), createElementVNode("div", be, [createElementVNode("span", fe, toDisplayString(val6.averageScore.toFixed(1)) + "分", 1), createElementVNode("div", {
        class: "star-rating",
        onMouseleave: val7 => zz4(val6.id)
      }, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val7 => createElementVNode("button", {
        key: val7,
        class: normalizeClass(["star-btn", {
          filled: val7 <= zz5(val6)
        }]),
        onClick: val8 => zz6(val6, val7, val8),
        onMouseenter: val8 => zz3(val6.id, val7)
      }, [...(val5[6] || (val5[6] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))], 42, Se)), 64))], 40, Ce)])]), createElementVNode("div", we, [createElementVNode("span", xe, toDisplayString(val6.ratingCount) + " 人评分", 1), createElementVNode("span", Me, toDisplayString(unref(getRatingSectionName)(val6.breadcrumb)), 1)]), val6.topComment ? (openBlock(), createElementBlock("div", Be, [createElementVNode("span", De, '"' + toDisplayString(val6.topComment.commentText) + '"', 1), createElementVNode("span", Ie, "—— " + toDisplayString(val6.topComment.nickname), 1)])) : (openBlock(), createElementBlock("div", Pe, [...(val5[7] || (val5[7] = [createElementVNode("span", {
        class: "comment-text"
      }, '"TA还在等着你评论呢！"', -1)]))]))])], 8, me))), 128))])], 64))], 64)) : (openBlock(), createElementBlock("div", local_zb61, [...(val5[2] || (val5[2] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      })])], -1), createElementVNode("h2", null, "合集不存在", -1), createElementVNode("p", null, "该合集可能已被删除或不可用", -1)]))]))]), createVNode(PageFooter)]));
    }
  }),
  Re = withScopeId(Fe, [["__scopeId", "data-v-547bebe4"]]);
/* index 运行时导出（已语义化） */
export { Re as default };