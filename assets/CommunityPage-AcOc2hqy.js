/*!
 * 页面模块：评分社区（CommunityPage）
 * 路由：/community   name=community   层级=1   需登录=否
 * 功能：公开的「评分社区」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CommunityPage-AcOc2hqy.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, appProvider, directiveUm, nextTick, createElementBlock, createVNode, createElementVNode, createCommentVNode, normalizeClass, Fragment, renderList, createTextVNode, toDisplayString, createVNodeWrapper, useRouter, useToast, unref, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunitySchoolsCategoriesById as pt, getRatingCommunityHotItems as mt, getRatingCommunityRandomItems as gt, getRatingCommunityCollections as yt } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingSectionName as _t } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
const wt = {
    class: "page-container"
  },
  Mt = {
    class: "page-content"
  },
  xt = {
    class: "top-section"
  },
  Tt = {
    id: "tour-explore-section",
    class: "category-pills-wrapper"
  },
  bt = ["id", "onClick"],
  It = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5"
  },
  Nt = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5"
  },
  Ot = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5"
  },
  Bt = {
    key: 3,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5"
  },
  St = {
    key: 4,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5"
  },
  Lt = {
    id: "tour-hot-section",
    class: "content-card hot-section"
  },
  Rt = {
    class: "card-header"
  },
  Ut = {
    key: 0,
    class: "header-stat"
  },
  Et = {
    key: 0,
    class: "hot-top-skeleton"
  },
  Ht = {
    class: "hot-top-list"
  },
  Yt = ["onClick"],
  Ft = {
    class: "hot-card-count"
  },
  $t = {
    class: "hot-card-cover"
  },
  At = ["src", "alt"],
  Vt = {
    key: 1,
    class: "cover-placeholder-mini"
  },
  zt = {
    class: "hot-card-info"
  },
  Pt = {
    class: "hot-card-name"
  },
  Dt = {
    class: "hot-card-rating"
  },
  qt = {
    class: "stars-display"
  },
  Gt = {
    class: "score-text"
  },
  Xt = {
    key: 0,
    class: "hot-card-comment"
  },
  jt = {
    class: "comment-text"
  },
  Jt = {
    key: 1,
    class: "hot-card-comment empty"
  },
  Kt = {
    key: 0,
    class: "hot-more"
  },
  Qt = {
    class: "hot-scroll"
  },
  Wt = ["onClick"],
  Zt = {
    class: "hot-scroll-cover"
  },
  to = ["src", "alt"],
  oo = {
    key: 1,
    class: "cover-placeholder-mini"
  },
  eo = {
    class: "scroll-score-badge"
  },
  so = {
    class: "hot-scroll-info"
  },
  lo = {
    class: "hot-scroll-name"
  },
  no = {
    class: "hot-scroll-count"
  },
  io = {
    key: 2,
    class: "empty-state small"
  },
  ro = {
    id: "tour-random-section",
    class: "content-card"
  },
  ao = {
    class: "card-header"
  },
  co = ["disabled"],
  uo = {
    key: 0,
    class: "item-scroll"
  },
  vo = {
    key: 1,
    class: "item-scroll"
  },
  ho = ["onClick"],
  ko = {
    class: "item-cover"
  },
  po = ["src", "alt"],
  mo = {
    key: 1,
    class: "cover-placeholder"
  },
  go = {
    class: "score-badge"
  },
  yo = {
    class: "item-info"
  },
  _o = {
    class: "item-name"
  },
  fo = {
    class: "item-breadcrumb"
  },
  Co = {
    class: "item-stats"
  },
  wo = {
    class: "stat-item"
  },
  Mo = {
    key: 2,
    class: "empty-state small"
  },
  xo = {
    key: 0,
    id: "tour-collection-section",
    class: "content-card"
  },
  To = {
    key: 0,
    class: "item-scroll"
  },
  bo = {
    key: 1,
    class: "item-scroll"
  },
  Io = ["onClick"],
  No = {
    class: "collection-cover"
  },
  Oo = ["src", "alt"],
  Bo = {
    key: 1,
    class: "cover-placeholder collection-placeholder"
  },
  So = {
    class: "count-badge"
  },
  Lo = {
    class: "item-info"
  },
  Ro = {
    class: "item-name"
  },
  Uo = {
    key: 0,
    class: "item-breadcrumb"
  },
  local_zb63 = 1,
  Eo = defineComponent({
    __name: "CommunityPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        {
          shouldStartTour: val2,
          getCurrentStep: val3,
          TourStep: val4,
          saveStep: val5,
          highlightElement: val6,
          showCenteredPopover: val7,
          destroyDriver: val8,
          completeTour: val9,
          forceStartTour: val10
        } = appProvider();
      function zz0() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        useRouter1.push("/community/contributions");
      }
      function zz1() {
        val10(val4.COMMUNITY_EXPLORE), zz12();
      }
      const refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref([]),
        refVal4 = ref([]),
        refVal5 = ref([]),
        refVal6 = ref(!0),
        refVal7 = ref(!1),
        refVal8 = ref(!0);
      async function zz2() {
        refVal.value = !0;
        try {
          const val1 = await pt(local_zb63);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取分类列表失败");
        } catch {
          useToast1.error("获取分类列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      async function zz3() {
        refVal6.value = !0;
        try {
          const val1 = await mt(8);
          val1.data.code === 200 && (refVal3.value = val1.data.data);
        } catch {} finally {
          refVal6.value = !1;
        }
      }
      async function zz4() {
        refVal7.value = !0;
        try {
          const val1 = await gt(local_zb63, 8);
          val1.data.code === 200 && (refVal4.value = val1.data.data.sort((val11, val12) => val11.url && !val12.url ? -1 : !val11.url && val12.url ? 1 : 0));
        } catch {} finally {
          refVal7.value = !1;
        }
      }
      async function zz5() {
        refVal8.value = !0;
        try {
          const val1 = await yt();
          val1.data.code === 200 && (refVal5.value = val1.data.data);
        } catch {} finally {
          refVal8.value = !1;
        }
      }
      async function zz6() {
        await zz4();
      }
      function zz7(val1) {
        useRouter1.push(`/community/item/${val1.id}`);
      }
      function zz8(val1) {
        useRouter1.push(`/community/collection/${val1.id}`);
      }
      function zz9(val1) {
        return val1.toFixed(1);
      }
      function zz10(val1) {
        useRouter1.push(`/community/category/${val1.id}`);
      }
      function zz11(val1) {
        return val1.includes("食堂") || val1.includes("档口") || val1.includes("餐") ? "utensils" : val1.includes("建筑") || val1.includes("楼") || val1.includes("馆") ? "building" : val1.includes("考试") || val1.includes("测验") || val1.includes("课程") ? "clipboard" : val1.includes("活动") || val1.includes("社团") ? "users" : "star";
      }
      onMounted(() => {
        if (zz2(), zz3(), zz4(), zz5(), val2()) {
          const val1 = val3();
          val1 === val4.COMMUNITY_EXPLORE ? zz12() : val1 >= val4.COMMUNITY_HOT && val1 <= val4.COMMUNITY_FINAL && zz13(val1);
        }
      }), directiveUm(() => {
        val8();
      });
      function zz12() {
        const interval = setInterval(() => {
          !refVal.value && refVal2.value.length > 0 && (clearInterval(interval), setTimeout(() => {
            zz14();
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz13(val1) {
        const interval = setInterval(() => {
          !refVal.value && !refVal6.value && !refVal7.value && (clearInterval(interval), setTimeout(() => {
            zz15(val1);
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz14() {
        val6("#tour-explore-section", "探索分区", "你可以在这里根据分类入口找到所有评分项目。", {
          side: "bottom",
          nextBtnText: "选择分区",
          onNextClick: () => {
            val5(val4.MINOR_SECTION_INTRO), val8(), refVal2.value.length > 0 && zz10(refVal2.value[0]);
          }
        });
      }
      function zz15(val1) {
        switch (val1) {
          case val4.COMMUNITY_HOT:
            zz16();
            break;
          case val4.COMMUNITY_RANDOM:
            zz17();
            break;
          case val4.COMMUNITY_REFRESH:
            zz18();
            break;
          case val4.COMMUNITY_COLLECTION:
            zz19();
            break;
          case val4.COMMUNITY_FINAL:
            zz20();
            break;
        }
      }
      function zz16() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        }), setTimeout(() => {
          val6("#tour-hot-section", "热门评分", "这里可以看到评分人数最多的评分项目。", {
            side: "top",
            onNextClick: () => {
              val5(val4.COMMUNITY_RANDOM), val8(), nextTick(() => zz17());
            }
          });
        }, 500);
      }
      function zz17() {
        val6("#tour-random-section", "随机发现", "这里会随机刷新一些评分项目，帮助你发现更多有趣的内容。", {
          side: "top",
          onNextClick: () => {
            val5(val4.COMMUNITY_REFRESH), val8(), nextTick(() => zz18());
          }
        });
      }
      function zz18() {
        val6("#tour-refresh-btn", "换一批", "你也可以点击它来刷新随机推荐的内容。", {
          side: "left",
          onNextClick: () => {
            val5(val4.COMMUNITY_COLLECTION), val8(), nextTick(() => zz19());
          }
        });
      }
      function zz19() {
        if (refVal5.value.length === 0) {
          val5(val4.COMMUNITY_FINAL), zz20();
          return;
        }
        val6("#tour-collection-section", "精选合集", "这里有部分热门项目的合集，从这里进入能更快找到你想要的内容。", {
          side: "top",
          onNextClick: () => {
            val5(val4.COMMUNITY_FINAL), val8(), nextTick(() => zz20());
          }
        });
      }
      function zz20() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        }), setTimeout(() => {
          val7("欢迎来到评分社区", `<p style="margin-bottom: 12px;">我们希望你能够尽可能真实客观地进行评分，共同维护评分社区的良好氛围！</p><p style="font-family: 'Georgia', serif; font-style: italic; color: var(--color-text-secondary); font-size: 0.9em;">—— 2023届玄学狗狗倾情设计</p>`, {
            doneBtnText: "开始探索",
            onNextClick: () => {
              val9(), val8();
            }
          });
        }, 500);
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val11) => (openBlock(), createElementBlock("div", wt, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", Mt, [createElementVNode("div", xt, [createElementVNode("div", {
        class: "search-box",
        onClick: val11[0] || (val11[0] = val12 => val1.$router.push("/community/search"))
      }, [...(val11[1] || (val11[1] = [createElementVNode("svg", {
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
      })], -1), createElementVNode("span", null, "搜索食堂、建筑、课程...", -1)]))]), createElementVNode("div", {
        class: "quick-actions"
      }, [createElementVNode("button", {
        class: "quick-action-btn",
        onClick: zz0
      }, [...(val11[2] || (val11[2] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
      }), createElementVNode("rect", {
        x: "9",
        y: "3",
        width: "6",
        height: "4",
        rx: "1"
      })], -1)]))]), createElementVNode("button", {
        class: "quick-action-btn guide-btn",
        onClick: zz1
      }, [...(val11[3] || (val11[3] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("path", {
        d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "17",
        r: "0.5",
        fill: "currentColor"
      })], -1), createElementVNode("span", null, "引导", -1)]))])])]), createElementVNode("div", Tt, [createElementVNode("div", {
        class: normalizeClass(["category-pills", {
          "first-load": !refVal.value
        }])
      }, [refVal.value ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, renderList(4, val12 => createElementVNode("div", {
        key: val12,
        class: "category-pill-skeleton"
      })), 64)) : (openBlock(!0), createElementBlock(Fragment, {
        key: 1
      }, renderList(refVal2.value, (val12, val13) => (openBlock(), createElementBlock("button", {
        key: val12.id,
        id: val13 === 0 ? "tour-first-category" : void 0,
        class: normalizeClass(["category-pill", `category-pill-${val13 % 4 + 1}`]),
        onClick: val14 => zz10(val12)
      }, [zz11(val12.name) === "utensils" ? (openBlock(), createElementBlock("svg", It, [...(val11[4] || (val11[4] = [createElementVNode("path", {
        d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"
      }, null, -1), createElementVNode("path", {
        d: "M7 2v20"
      }, null, -1), createElementVNode("path", {
        d: "M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"
      }, null, -1)]))])) : zz11(val12.name) === "building" ? (openBlock(), createElementBlock("svg", Nt, [...(val11[5] || (val11[5] = [createElementVNode("rect", {
        x: "4",
        y: "2",
        width: "16",
        height: "20",
        rx: "2",
        ry: "2"
      }, null, -1), createElementVNode("path", {
        d: "M9 22v-4h6v4"
      }, null, -1), createElementVNode("path", {
        d: "M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"
      }, null, -1)]))])) : zz11(val12.name) === "clipboard" ? (openBlock(), createElementBlock("svg", Ot, [...(val11[6] || (val11[6] = [createElementVNode("path", {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      }, null, -1), createElementVNode("rect", {
        x: "8",
        y: "2",
        width: "8",
        height: "4",
        rx: "1",
        ry: "1"
      }, null, -1), createElementVNode("path", {
        d: "M9 12h6M9 16h6"
      }, null, -1)]))])) : zz11(val12.name) === "users" ? (openBlock(), createElementBlock("svg", Bt, [...(val11[7] || (val11[7] = [createElementVNode("path", {
        d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      }, null, -1), createElementVNode("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      }, null, -1), createElementVNode("path", {
        d: "M23 21v-2a4 4 0 0 0-3-3.87"
      }, null, -1), createElementVNode("path", {
        d: "M16 3.13a4 4 0 0 1 0 7.75"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", St, [...(val11[8] || (val11[8] = [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      }, null, -1)]))])), createElementVNode("span", null, toDisplayString(val12.name), 1), val11[9] || (val11[9] = createElementVNode("svg", {
        class: "pill-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1))], 10, bt))), 128))], 2), val11[10] || (val11[10] = createElementVNode("div", {
        class: "category-pills-fade"
      }, null, -1))]), createElementVNode("div", Lt, [createElementVNode("div", Rt, [val11[11] || (val11[11] = createElementVNode("h2", {
        class: "card-header-title"
      }, [createElementVNode("svg", {
        class: "title-icon hot",
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [createElementVNode("path", {
        d: "M12 23c-4.97 0-9-3.58-9-8 0-1.95.7-3.76 1.86-5.14A7.5 7.5 0 0 1 9 5c0 .91.2 1.76.56 2.53.49 1.03 1.24 1.91 2.19 2.55A6.18 6.18 0 0 0 12 5.5a5.87 5.87 0 0 1 5.14 3A9.03 9.03 0 0 1 21 15c0 4.42-4.03 8-9 8z"
      })]), createTextVNode(" 热门评分 ")], -1)), refVal3.value.length > 0 ? (openBlock(), createElementBlock("span", Ut, toDisplayString(refVal3.value.reduce((val12, val13) => val12 + val13.ratingCount, 0)) + "+ 评价", 1)) : createCommentVNode("", !0)]), refVal6.value ? (openBlock(), createElementBlock("div", Et, [(openBlock(), createElementBlock(Fragment, null, renderList(3, val12 => createElementVNode("div", {
        key: val12,
        class: "hot-card-skeleton"
      }, [...(val11[12] || (val11[12] = [createVNodeWrapper('<div class="skeleton-cover-sm" data-v-10d81e5d></div><div class="skeleton-content" data-v-10d81e5d><div class="skeleton-line w60" data-v-10d81e5d></div><div class="skeleton-line w40" data-v-10d81e5d></div><div class="skeleton-line w80" data-v-10d81e5d></div></div>', 2)]))])), 64))])) : refVal3.value.length > 0 ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Ht, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value.slice(0, 3), (val12, val13) => (openBlock(), createElementBlock("div", {
        key: val12.id,
        class: "hot-card",
        onClick: val14 => zz7(val12)
      }, [createElementVNode("div", {
        class: normalizeClass(["hot-card-rank", `rank-${val13 + 1}`])
      }, toDisplayString(val13 + 1), 3), createElementVNode("span", Ft, toDisplayString(val12.ratingCount) + "人评分", 1), createElementVNode("div", $t, [val12.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val12.url,
        alt: val12.name,
        loading: "lazy"
      }, null, 8, At)) : (openBlock(), createElementBlock("div", Vt, [...(val11[13] || (val11[13] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))]))]), createElementVNode("div", zt, [createElementVNode("h3", Pt, toDisplayString(val12.name), 1), createElementVNode("div", Dt, [createElementVNode("div", qt, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val14 => createElementVNode("svg", {
        key: val14,
        viewBox: "0 0 24 24",
        class: normalizeClass({
          filled: val14 <= Math.round(val12.averageScore / 2)
        })
      }, [...(val11[14] || (val11[14] = [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      }, null, -1)]))], 2)), 64))]), createElementVNode("span", Gt, toDisplayString(zz9(val12.averageScore)), 1)]), val12.topComment ? (openBlock(), createElementBlock("div", Xt, [createElementVNode("span", jt, '"' + toDisplayString(val12.topComment.commentText) + '" —— ' + toDisplayString(val12.topComment.nickname), 1)])) : (openBlock(), createElementBlock("div", Jt, [...(val11[15] || (val11[15] = [createElementVNode("span", {
        class: "comment-text"
      }, '"快来抢沙发吧！"', -1)]))]))])], 8, Yt))), 128))]), refVal3.value.length > 3 ? (openBlock(), createElementBlock("div", Kt, [val11[17] || (val11[17] = createElementVNode("div", {
        class: "hot-more-header"
      }, [createElementVNode("span", {
        class: "hot-more-label"
      }, "更多热门")], -1)), createElementVNode("div", Qt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value.slice(3), val12 => (openBlock(), createElementBlock("div", {
        key: val12.id,
        class: "hot-scroll-card",
        onClick: val13 => zz7(val12)
      }, [createElementVNode("div", Zt, [val12.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val12.url,
        alt: val12.name,
        loading: "lazy"
      }, null, 8, to)) : (openBlock(), createElementBlock("div", oo, [...(val11[16] || (val11[16] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))])), createElementVNode("div", eo, toDisplayString(zz9(val12.averageScore)), 1)]), createElementVNode("div", so, [createElementVNode("h4", lo, toDisplayString(val12.name), 1), createElementVNode("span", no, toDisplayString(val12.ratingCount) + "人评分", 1)])], 8, Wt))), 128))])])) : createCommentVNode("", !0)], 64)) : (openBlock(), createElementBlock("div", io, [...(val11[18] || (val11[18] = [createElementVNode("p", null, "暂无热门评分", -1)]))]))]), createElementVNode("div", ro, [createElementVNode("div", ao, [val11[21] || (val11[21] = createVNodeWrapper('<h2 class="card-header-title" data-v-10d81e5d><svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-10d81e5d><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-10d81e5d></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-10d81e5d></circle><circle cx="15.5" cy="8.5" r="1.5" data-v-10d81e5d></circle><circle cx="15.5" cy="15.5" r="1.5" data-v-10d81e5d></circle><circle cx="8.5" cy="15.5" r="1.5" data-v-10d81e5d></circle></svg> 随机发现 </h2>', 1)), createElementVNode("button", {
        id: "tour-refresh-btn",
        class: "refresh-btn",
        disabled: refVal7.value,
        onClick: zz6
      }, [(openBlock(), createElementBlock("svg", {
        class: normalizeClass({
          spinning: refVal7.value
        }),
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [...(val11[19] || (val11[19] = [createElementVNode("polyline", {
        points: "23 4 23 10 17 10"
      }, null, -1), createElementVNode("path", {
        d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
      }, null, -1)]))], 2)), val11[20] || (val11[20] = createElementVNode("span", null, "换一批", -1))], 8, co)]), refVal7.value && refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", uo, [(openBlock(), createElementBlock(Fragment, null, renderList(4, val12 => createElementVNode("div", {
        key: val12,
        class: "item-skeleton"
      }, [...(val11[22] || (val11[22] = [createElementVNode("div", {
        class: "skeleton-cover"
      }, null, -1), createElementVNode("div", {
        class: "skeleton-info"
      }, [createElementVNode("div", {
        class: "skeleton-title"
      }), createElementVNode("div", {
        class: "skeleton-meta"
      })], -1)]))])), 64))])) : refVal4.value.length > 0 ? (openBlock(), createElementBlock("div", vo, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val12 => (openBlock(), createElementBlock("div", {
        key: val12.id,
        class: "item-card",
        onClick: val13 => zz7(val12)
      }, [createElementVNode("div", ko, [val12.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val12.url,
        alt: val12.name,
        loading: "lazy"
      }, null, 8, po)) : (openBlock(), createElementBlock("div", mo, [...(val11[23] || (val11[23] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)]))])), createElementVNode("div", go, [val11[24] || (val11[24] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [createElementVNode("polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      })], -1)), createElementVNode("span", null, toDisplayString(zz9(val12.averageScore)), 1)])]), createElementVNode("div", yo, [createElementVNode("h3", _o, toDisplayString(val12.name), 1), createElementVNode("p", fo, toDisplayString(unref(_t)(val12.breadcrumb)), 1), createElementVNode("div", Co, [createElementVNode("span", wo, toDisplayString(val12.ratingCount) + " 人评分", 1)])])], 8, ho))), 128))])) : (openBlock(), createElementBlock("div", Mo, [...(val11[25] || (val11[25] = [createElementVNode("p", null, "暂无推荐", -1)]))]))]), refVal8.value || refVal5.value.length > 0 ? (openBlock(), createElementBlock("div", xo, [val11[28] || (val11[28] = createElementVNode("div", {
        class: "card-header"
      }, [createElementVNode("h2", {
        class: "card-header-title"
      }, [createElementVNode("svg", {
        class: "title-icon collection",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      })]), createTextVNode(" 精选合集 ")])], -1)), refVal8.value ? (openBlock(), createElementBlock("div", To, [(openBlock(), createElementBlock(Fragment, null, renderList(4, val12 => createElementVNode("div", {
        key: val12,
        class: "collection-skeleton"
      }, [...(val11[26] || (val11[26] = [createElementVNode("div", {
        class: "skeleton-cover"
      }, null, -1), createElementVNode("div", {
        class: "skeleton-info"
      }, [createElementVNode("div", {
        class: "skeleton-title"
      }), createElementVNode("div", {
        class: "skeleton-meta"
      })], -1)]))])), 64))])) : refVal5.value.length > 0 ? (openBlock(), createElementBlock("div", bo, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal5.value, val12 => (openBlock(), createElementBlock("div", {
        key: val12.id,
        class: "collection-card",
        onClick: val13 => zz8(val12)
      }, [createElementVNode("div", No, [val12.coverUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val12.coverUrl,
        alt: val12.name,
        loading: "lazy"
      }, null, 8, Oo)) : (openBlock(), createElementBlock("div", Bo, [...(val11[27] || (val11[27] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      })], -1)]))])), createElementVNode("div", So, [createElementVNode("span", null, toDisplayString(val12.itemCount) + " 项", 1)])]), createElementVNode("div", Lo, [createElementVNode("h3", Ro, toDisplayString(val12.name), 1), val12.description ? (openBlock(), createElementBlock("p", Uo, toDisplayString(val12.description), 1)) : createCommentVNode("", !0)])], 8, Io))), 128))])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]), createVNode(PageFooter)]));
    }
  }),
  zo = withScopeId(Eo, [["__scopeId", "data-v-10d81e5d"]]);
/* index 运行时导出（已语义化） */
export { zo as default };