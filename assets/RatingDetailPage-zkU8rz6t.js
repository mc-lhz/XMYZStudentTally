/*!
 * 页面模块：评分详情（RatingDetailPage）
 * 路由：/community/item/:itemId   name=community-item   层级=4   需登录=否
 * 功能：公开的「评分详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingDetailPage-zkU8rz6t.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, watch, onMounted, directiveUm, createBlock, Teleport, createVNode, toDisplayValue, withSlots, createElementVNode, createElementBlock, createCommentVNode, resolveRaw, normalizeClass, Fragment, createTextVNode, toDisplayString, withModifiers, openBlock, nextTick, getUserProfile, withScopeId, useUserStore, inject, applyDirectives, appProvider, useRouter, createVNodeWrapper, renderList, withDirectives, vModelText, withKeys, unref, useToast, getUserAvatar, resolveAsset } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityContributionsHistory as At, uploadFiles as Et, createRatingCommunityComments as xe, getRatingCommunityRatingItemsById as Pt, createRatingCommunityRatings as zt, createRatingCommunityLikes as Ht, deleteRatingCommunityComments as Nt } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：本地模块 FeedbackDrawer（站点内功能模块） */
import { scopedStyle_zb0 as jt } from "./FeedbackDrawer-BX330nGh.js";
const Vt = {
    key: 0,
    class: "popover-loading"
  },
  Ft = {
    key: 1,
    class: "popover-error"
  },
  Gt = {
    class: "popover-header"
  },
  Kt = ["src"],
  Wt = {
    class: "popover-user-info"
  },
  Xt = {
    class: "popover-nickname"
  },
  Yt = {
    class: "popover-meta"
  },
  qt = {
    class: "popover-gender"
  },
  Zt = {
    class: "popover-join"
  },
  Jt = {
    key: 0,
    class: "popover-signature"
  },
  Qt = {
    key: 1,
    class: "popover-section"
  },
  es = {
    class: "popover-section-content"
  },
  ts = {
    class: "popover-section-label"
  },
  ss = {
    class: "popover-section-value"
  },
  ns = {
    key: 2,
    class: "popover-stats"
  },
  os = {
    class: "stat-item"
  },
  as = {
    class: "stat-value"
  },
  ls = {
    class: "stat-item"
  },
  is = {
    class: "stat-value"
  },
  rs = {
    class: "stat-item"
  },
  us = {
    class: "stat-value"
  },
  cs = {
    key: 3,
    class: "popover-contribution"
  },
  ds = defineComponent({
    __name: "UserProfilePopover",
    props: {
      userId: {},
      triggerElement: {}
    },
    emits: ["close"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = val,
        val4 = zz0,
        loading = ref(!0),
        userProfile = ref(null),
        loadError = ref(!1),
        popoverEl = ref(null),
        placementTop = ref(!1),
        arrowOffset = ref(0),
        popoverStyle = ref({
          top: "0px",
          left: "0px",
          transformOrigin: "top left"
        });
      function zz1(val1) {
        switch (val1) {
          case 1:
            return "男";
          case 2:
            return "女";
          default:
            return "保密";
        }
      }
      async function zz2() {
        loading.value = !0, loadError.value = !1;
        try {
          const zz3 = await getUserProfile(val3.userId);
          zz3.data.code === 200 ? zz3.value = zz3.data.data : loadError.value = !0;
        } catch {
          loadError.value = !0;
        } finally {
          loading.value = !1;
        }
      }
      function zz4() {
        if (!val3.triggerElement || !popoverEl.value) return;
        const refVal4Value = popoverEl.value,
          boundingClientRect = val3.triggerElement.getBoundingClientRect(),
          windowInnerWidth = window.innerWidth,
          windowInnerHeight = window.innerHeight,
          popoverWidth = windowInnerWidth < 768 ? 240 : 280,
          popoverHeight = refVal4Value.offsetHeight || 300,
          num = 12;
        let popoverTop = boundingClientRect.bottom + num,
          popoverLeft = boundingClientRect.left + boundingClientRect.width / 2 - popoverWidth / 2,
          text = "top center";
        placementTop.value = !1, popoverLeft + popoverWidth > windowInnerWidth - 16 && (popoverLeft = windowInnerWidth - popoverWidth - 16, text = "top right"), popoverLeft < 16 && (popoverLeft = 16, text = "top left"), popoverTop + popoverHeight > windowInnerHeight - 16 && (popoverTop = boundingClientRect.top - popoverHeight - num, text = text.replace("top", "bottom"), placementTop.value = !0);
        const anchorCenterX = boundingClientRect.left + boundingClientRect.width / 2;
        arrowOffset.value = Math.max(16, Math.min(anchorCenterX - popoverLeft, popoverWidth - 16)), popoverStyle.value = {
          top: `${popoverTop}px`,
          left: `${popoverLeft}px`,
          transformOrigin: text
        };
      }
      function zz5(val1) {
        popoverEl.value && !popoverEl.value.contains(val1.target) && val4("close");
      }
      return watch(() => val3.userId, () => {
        zz2();
      }, {
        immediate: !0
      }), watch(() => val3.triggerElement, () => {
        nextTick(zz4);
      }, {
        immediate: !0
      }), onMounted(() => {
        document.addEventListener("click", zz5, !0), window.addEventListener("resize", zz4), window.addEventListener("scroll", zz4, !0);
      }), directiveUm(() => {
        document.removeEventListener("click", zz5, !0), window.removeEventListener("resize", zz4), window.removeEventListener("scroll", zz4, !0);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "popover"
      }, {
        default: toDisplayValue(() => [createElementVNode("div", {
          ref_key: "popoverRef",
          ref: popoverEl,
          class: normalizeClass(["user-popover", {
            "is-above": placementTop.value
          }]),
          style: resolveRaw(popoverStyle.value),
          onClick: val5[0] || (val5[0] = withModifiers(() => {}, ["stop"]))
        }, [createElementVNode("div", {
          class: "popover-arrow",
          style: resolveRaw({
            left: `${arrowOffset.value}px`
          })
        }, null, 4), loading.value ? (openBlock(), createElementBlock("div", Vt, [...(val5[1] || (val5[1] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : loadError.value ? (openBlock(), createElementBlock("div", Ft, [...(val5[2] || (val5[2] = [createElementVNode("span", null, "加载失败", -1)]))])) : userProfile.value ? (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [createElementVNode("div", Gt, [createElementVNode("div", {
          class: normalizeClass(["popover-avatar", {
            "has-avatar": userProfile.value.hasAvatar
          }])
        }, [userProfile.value.hasAvatar && userProfile.value.avatarUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: userProfile.value.avatarUrl,
          alt: ""
        }, null, 8, Kt)) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode(toDisplayString(userProfile.value.nickname.charAt(0)), 1)], 64))], 2), createElementVNode("div", Wt, [createElementVNode("div", Xt, toDisplayString(userProfile.value.nickname), 1), createElementVNode("div", Yt, [createElementVNode("span", qt, toDisplayString(zz1(userProfile.value.gender)), 1), createElementVNode("span", Zt, toDisplayString(userProfile.value.joinDate) + " 加入", 1)])])]), userProfile.value.signature ? (openBlock(), createElementBlock("div", Jt, toDisplayString(userProfile.value.signature), 1)) : createCommentVNode("", !0), userProfile.value.showCampusBinding && userProfile.value.hasCampusBinding ? (openBlock(), createElementBlock("div", Qt, [val5[3] || (val5[3] = createElementVNode("div", {
          class: "popover-section-icon campus"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M22 10v6M2 10l10-5 10 5-10 5z"
        }), createElementVNode("path", {
          d: "M6 12v5c3 3 9 3 12 0v-5"
        })])], -1)), createElementVNode("div", es, [createElementVNode("span", ts, toDisplayString(userProfile.value.campusName), 1), createElementVNode("span", ss, toDisplayString(userProfile.value.classAlias), 1)])])) : createCommentVNode("", !0), userProfile.value.showStatistics ? (openBlock(), createElementBlock("div", ns, [createElementVNode("div", os, [createElementVNode("span", as, toDisplayString(userProfile.value.ratingCount ?? 0), 1), val5[4] || (val5[4] = createElementVNode("span", {
          class: "stat-label"
        }, "评分", -1))]), createElementVNode("div", ls, [createElementVNode("span", is, toDisplayString(userProfile.value.commentCount ?? 0), 1), val5[5] || (val5[5] = createElementVNode("span", {
          class: "stat-label"
        }, "评论", -1))]), createElementVNode("div", rs, [createElementVNode("span", us, toDisplayString(userProfile.value.likeCount ?? 0), 1), val5[6] || (val5[6] = createElementVNode("span", {
          class: "stat-label"
        }, "获赞", -1))])])) : createCommentVNode("", !0), userProfile.value.showContributions ? (openBlock(), createElementBlock("div", cs, [val5[7] || (val5[7] = createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        })], -1)), createElementVNode("span", null, "贡献 " + toDisplayString(userProfile.value.contributionCount ?? 0) + " 条内容", 1)])) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0)], 6)]),
        _: 1
      })]));
    }
  }),
  vs = withScopeId(ds, [["__scopeId", "data-v-964eeeaa"]]),
  ms = {
    class: "page-container"
  },
  ps = {
    class: "page-content"
  },
  gs = {
    class: "skeleton-comments"
  },
  fs = {
    class: "item-header-card"
  },
  ks = {
    class: "item-header"
  },
  hs = {
    class: "item-image-wrapper"
  },
  ys = ["src", "alt"],
  _s = {
    key: 1,
    class: "item-image-placeholder"
  },
  ws = {
    class: "item-info"
  },
  bs = {
    class: "item-name"
  },
  Cs = {
    key: 0,
    class: "item-breadcrumb"
  },
  Is = {
    key: 0,
    class: "breadcrumb-sep"
  },
  xs = {
    key: 1,
    class: "item-desc"
  },
  Ls = {
    class: "score-card"
  },
  Ss = {
    class: "score-content"
  },
  $s = {
    class: "score-main"
  },
  Ms = {
    class: "score-value"
  },
  Us = {
    class: "rating-count"
  },
  Ts = {
    key: 0,
    class: "score-distribution"
  },
  Rs = {
    class: "dist-stars"
  },
  Ds = {
    class: "dist-bar-wrapper"
  },
  Bs = {
    class: "user-rating-row"
  },
  As = {
    class: "user-rating-label"
  },
  Es = {
    class: "user-rating-stars"
  },
  Ps = ["onClick", "onMouseenter"],
  zs = ["fill"],
  Hs = {
    class: "comments-section"
  },
  Ns = {
    class: "comments-header"
  },
  Os = {
    class: "comments-count"
  },
  js = {
    class: "sort-tabs"
  },
  Vs = {
    key: 0,
    class: "empty-comments"
  },
  Fs = {
    key: 1,
    class: "comment-list"
  },
  Gs = {
    class: "comment-main"
  },
  Ks = ["onClick"],
  Ws = ["src"],
  Xs = {
    class: "comment-body"
  },
  Ys = {
    class: "comment-header"
  },
  qs = {
    class: "comment-nickname"
  },
  Zs = {
    key: 0,
    class: "commenter-stars"
  },
  Js = {
    class: "comment-text"
  },
  Qs = {
    key: 0,
    class: "comment-images"
  },
  en = ["onClick"],
  tn = ["src"],
  sn = {
    class: "comment-footer"
  },
  nn = {
    class: "comment-time"
  },
  on = {
    class: "comment-actions"
  },
  an = ["onClick"],
  ln = ["fill"],
  rn = {
    key: 0
  },
  un = ["onClick"],
  cn = ["onClick"],
  dn = {
    key: 0,
    class: "replies-preview"
  },
  vn = {
    class: "reply-author"
  },
  mn = {
    class: "reply-text"
  },
  pn = ["onClick"],
  gn = {
    key: 1,
    class: "reply-input-wrapper"
  },
  fn = ["placeholder"],
  kn = {
    class: "reply-actions"
  },
  hn = ["disabled"],
  yn = {
    class: "bottom-input-bar"
  },
  _n = {
    key: 0,
    class: "pending-images-bar"
  },
  wn = ["src"],
  bn = {
    key: 0,
    class: "pending-image-overlay"
  },
  Cn = ["onClick"],
  In = ["onClick"],
  xn = {
    class: "bottom-input-row"
  },
  Ln = {
    class: "input-wrapper"
  },
  Sn = ["disabled"],
  $n = ["disabled"],
  Mn = {
    class: "drawer-content"
  },
  Un = {
    key: 0,
    class: "drawer-original-comment"
  },
  Tn = ["src"],
  Rn = {
    class: "comment-body"
  },
  Dn = {
    class: "comment-header"
  },
  Bn = {
    class: "comment-nickname"
  },
  An = {
    key: 0,
    class: "commenter-stars"
  },
  En = {
    class: "comment-text"
  },
  Pn = {
    key: 0,
    class: "comment-images"
  },
  zn = ["onClick"],
  Hn = ["src"],
  Nn = {
    class: "comment-footer"
  },
  On = {
    class: "comment-time"
  },
  jn = {
    class: "comment-actions"
  },
  Vn = ["fill"],
  Fn = {
    key: 0
  },
  Gn = {
    class: "drawer-replies-header"
  },
  Kn = {
    class: "drawer-replies-count"
  },
  Wn = {
    class: "sort-tabs"
  },
  Xn = {
    class: "drawer-replies"
  },
  Yn = ["onClick"],
  qn = ["src"],
  Zn = {
    class: "comment-body"
  },
  Jn = {
    class: "comment-header"
  },
  Qn = {
    class: "comment-nickname"
  },
  eo = {
    key: 0,
    class: "commenter-stars"
  },
  to = {
    class: "comment-text"
  },
  so = {
    key: 0,
    class: "reply-to"
  },
  no = {
    class: "comment-footer"
  },
  oo = {
    class: "comment-time"
  },
  ao = {
    class: "comment-actions"
  },
  lo = ["onClick"],
  io = ["fill"],
  ro = {
    key: 0
  },
  uo = ["onClick"],
  co = ["onClick"],
  vo = {
    class: "drawer-input-bar"
  },
  mo = ["placeholder"],
  po = ["disabled"],
  go = {
    class: "modal-content"
  },
  fo = {
    class: "modal-actions"
  },
  ko = ["disabled"],
  ho = ["disabled"],
  yo = ["src"],
  _o = {
    key: 2,
    class: "image-preview-counter"
  },
  wo = {
    class: "history-modal"
  },
  bo = {
    class: "history-content"
  },
  Co = {
    key: 0,
    class: "history-loading"
  },
  Io = {
    key: 1,
    class: "history-empty"
  },
  xo = {
    key: 2,
    class: "history-list"
  },
  Lo = {
    class: "history-item-header"
  },
  So = {
    class: "history-user"
  },
  $o = {
    class: "history-time"
  },
  Mo = {
    class: "history-details"
  },
  Uo = {
    class: "detail-field"
  },
  To = {
    key: 0,
    class: "detail-images"
  },
  Ro = ["src"],
  Do = {
    key: 1,
    class: "no-image"
  },
  Bo = ["src"],
  Ao = {
    key: 3,
    class: "no-image"
  },
  Eo = ["src"],
  Po = {
    key: 1,
    class: "no-image"
  },
  zo = {
    key: 1,
    class: "detail-text"
  },
  Ho = {
    class: "old-text"
  },
  No = {
    class: "new-text"
  },
  Oo = {
    key: 1,
    class: "new-text"
  },
  jo = {
    key: 2,
    class: "error-container"
  },
  ce = 9,
  Vo = 20 * 1024 * 1024,
  Fo = defineComponent({
    __name: "RatingDetailPage",
    setup(val) {
      const route = inject(),
        useRouter1 = useRouter(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        {
          shouldStartTour: shouldStartTour,
          getCurrentStep: getCurrentStep,
          TourStep: tourStep,
          saveStep: saveStep,
          highlightElement: highlightElement,
          destroyDriver: destroyDriver
        } = appProvider(),
        itemId = Number(route.params.itemId),
        loading = ref(!0),
        ratingItem = ref(null),
        myStars = ref(0),
        hoverStars = ref(0),
        submittingRating = ref(!1),
        replyTarget = ref(null),
        replyText = ref(""),
        submittingReply = ref(!1),
        commentText = ref(""),
        submittingComment = ref(!1),
        uploadImages = ref([]),
        fileInputEl = ref(null),
        list = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"],
        previewImage = ref(null),
        previewIndex = ref(0),
        previewList = ref([]),
        commentSort = ref("hot"),
        replySort = ref("time"),
        activeComment = ref(null),
        commentPanelOpen = ref(!1),
        quoteTarget = ref(null),
        quoteText = ref(""),
        submittingQuote = ref(!1),
        deleteConfirmOpen = ref(!1),
        deleteTargetId = ref(null),
        deleting = ref(!1),
        feedbackModalOpen = ref(!1),
        avatarCache = ref(new Map()),
        me = ref(!1),
        popoverUserId = ref(null),
        popoverTriggerEl = ref(null);
      function zz6() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        feedbackModalOpen.value = !0;
      }
      function zz7() {
        feedbackModalOpen.value = !1;
      }
      function zz8() {}
      const historyModalOpen = ref(!1),
        contributionHistory = ref([]),
        historyLoading = ref(!1);
      async function zz9() {
        historyModalOpen.value = !0, historyLoading.value = !0;
        try {
          const val1 = await At(3, itemId);
          val1.data.code === 200 ? contributionHistory.value = val1.data.data || [] : useToast1.error(val1.data.message || "获取历史失败");
        } catch {
          useToast1.error("获取历史失败");
        } finally {
          historyLoading.value = !1;
        }
      }
      function zz10() {
        historyModalOpen.value = !1;
      }
      function zz11(val1) {
        const date = new Date(val1);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      }
      function zz12(val1) {
        switch (val1) {
          case "name":
            return "名称";
          case "description":
            return "描述";
          case "image":
            return "图片";
          default:
            return val1;
        }
      }
      const sortedComments = applyDirectives(() => {
        if (!ratingItem.value?.comments) return [];
        const list1 = [...ratingItem.value.comments];
        return commentSort.value === "hot" ? list1.sort((val1, val17) => val17.likeCount - val1.likeCount) : list1.sort((val1, val17) => new Date(val17.createdAt).getTime() - new Date(val1.createdAt).getTime());
      });
      function zz13(val1, zz14 = null) {
        if (!val1 || val1.length === 0) return [];
        const list1 = [];
        for (const zz15 of val1) {
          const val18 = zz15;
          val18.replyToNickname === void 0 && (val18.replyToNickname = zz14), list1.push(val18), zz15.replies && zz15.replies.length > 0 && list1.push(...zz13(zz15.replies, zz15.nickname));
        }
        return list1;
      }
      const commentReplies = applyDirectives(() => {
        if (!activeComment.value?.replies) return [];
        const val1 = zz13(activeComment.value.replies);
        return replySort.value === "hot" ? val1.sort((val17, val18) => val18.likeCount - val17.likeCount) : val1.sort((val17, val18) => new Date(val17.createdAt).getTime() - new Date(val18.createdAt).getTime());
      });
      function zz16(val1) {
        return !val1 || val1.length === 0 ? [] : [...val1].sort((val17, val18) => val18.likeCount - val17.likeCount).slice(0, 2);
      }
      function zz17(val1) {
        if (!val1 || val1.length === 0) return 0;
        let val17 = val1.length;
        for (const zz18 of val1) val17 += zz17(zz18.replies);
        return val17;
      }
      function zz19(val1) {
        activeComment.value = val1, commentPanelOpen.value = !0, quoteTarget.value = null, quoteText.value = "", document.body.style.overflow = "hidden";
      }
      function zz20() {
        commentPanelOpen.value = !1, document.body.style.overflow = "", quoteTarget.value = null, quoteText.value = "", setTimeout(() => {
          activeComment.value = null;
        }, 300);
      }
      function zz21() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        fileInputEl.value?.click();
      }
      async function zz22(val1) {
        const val17 = val1.target,
          val18 = val17.files;
        if (!val18 || val18.length === 0) return;
        const val19 = ce - uploadImages.value.length;
        if (val19 <= 0) {
          useToast1.error(`最多只能上传${ce}张图片`), val17.value = "";
          return;
        }
        const val20 = Array.from(val18).slice(0, val19);
        for (const zz23 of val20) {
          if (!list.includes(zz23.type)) {
            useToast1.error(`不支持的图片格式: ${zz23.name}`);
            continue;
          }
          if (zz23.size > Vo) {
            useToast1.error(`图片 ${zz23.name} 超过20MB限制`);
            continue;
          }
          const objectURL = URL.createObjectURL(zz23),
            obj = {
              id: null,
              file: zz23,
              previewUrl: objectURL,
              status: "uploading"
            };
          uploadImages.value.push(obj), zz24(objectURL);
        }
        val17.value = "";
      }
      async function zz24(val1) {
        const val17 = uploadImages.value.findIndex(val19 => val19.previewUrl === val1);
        if (val17 === -1) return;
        const val18 = uploadImages.value[val17];
        if (val18) try {
          const val19 = await Et(val18.file),
            val20 = uploadImages.value.findIndex(val22 => val22.previewUrl === val1);
          if (val20 === -1) return;
          const val21 = uploadImages.value[val20];
          if (!val21) return;
          val19.data.code === 200 && val19.data.data ? uploadImages.value[val20] = {
            ...val21,
            id: val19.data.data.id,
            status: "success"
          } : uploadImages.value[val20] = {
            ...val21,
            status: "error",
            errorMessage: val19.data.message || "上传失败"
          };
        } catch {
          const val19 = uploadImages.value.findIndex(val21 => val21.previewUrl === val1);
          if (val19 === -1) return;
          const val20 = uploadImages.value[val19];
          if (!val20) return;
          uploadImages.value[val19] = {
            ...val20,
            status: "error",
            errorMessage: "上传失败"
          };
        }
      }
      function zz25(val1) {
        const val17 = uploadImages.value[val1];
        val17 && (URL.revokeObjectURL(val17.previewUrl), uploadImages.value.splice(val1, 1));
      }
      function zz26(val1) {
        const val17 = uploadImages.value[val1];
        val17 && val17.status === "error" && (uploadImages.value[val1] = {
          ...val17,
          status: "uploading",
          errorMessage: void 0
        }, zz24(val17.previewUrl));
      }
      function zz27(val1, val17) {
        previewList.value = val1, previewIndex.value = val17, previewImage.value = val1[val17] ?? null, document.body.style.overflow = "hidden";
      }
      function zz28() {
        previewImage.value = null, previewList.value = [], document.body.style.overflow = "";
      }
      function zz29(val1) {
        const val17 = previewList.value.length;
        val17 <= 1 || (val1 === "prev" ? previewIndex.value = (previewIndex.value - 1 + val17) % val17 : previewIndex.value = (previewIndex.value + 1) % val17, previewImage.value = previewList.value[previewIndex.value] ?? null);
      }
      const hasUploadingImages = applyDirectives(() => uploadImages.value.some(val1 => val1.status === "uploading")),
        uploadedImageIds = applyDirectives(() => uploadImages.value.filter(val1 => val1.status === "success" && val1.id !== null).map(val1 => val1.id));
      async function zz30() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        if (!commentText.value.trim() || submittingComment.value) return;
        if (hasUploadingImages.value) {
          useToast1.error("请等待图片上传完成");
          return;
        }
        if (uploadImages.value.some(val19 => val19.status === "error")) {
          useToast1.error("有图片上传失败，请重试或移除");
          return;
        }
        const val1 = commentText.value.trim(),
          val17 = uploadedImageIds.value,
          val18 = uploadImages.value.map(val19 => val19.previewUrl),
          list1 = [...val18],
          obj = {
            id: Date.now(),
            userId: useUserStore1.user?.id || 0,
            commentText: val1,
            username: useUserStore1.user?.username || "",
            nickname: useUserStore1.user?.nickname || "我",
            createdAt: new Date().toISOString(),
            likeCount: 0,
            isLiked: !1,
            isMyComment: !0,
            commenterScore: null,
            commenterStars: null,
            imageUrls: list1.length > 0 ? list1 : null,
            replies: null
          };
        ratingItem.value && (ratingItem.value.comments || (ratingItem.value.comments = []), ratingItem.value.comments.unshift(obj)), commentText.value = "", uploadImages.value = [], window.scrollTo({
          top: 0,
          behavior: "smooth"
        }), submittingComment.value = !0;
        try {
          const val19 = await xe({
            ratingItemId: itemId,
            commentText: val1,
            imageIds: val17.length > 0 ? val17 : void 0
          });
          if (val19.data.code === 200) {
            const val20 = val19.data.data;
            val20 && (obj.id = val20.id), await zz34(!0), val18.forEach(val21 => URL.revokeObjectURL(val21));
          } else ratingItem.value?.comments && (ratingItem.value.comments = ratingItem.value.comments.filter(val20 => val20.id !== obj.id)), val18.forEach(val20 => URL.revokeObjectURL(val20)), useToast1.error(val19.data.message || "评论失败");
        } catch {
          ratingItem.value?.comments && (ratingItem.value.comments = ratingItem.value.comments.filter(val19 => val19.id !== obj.id)), val18.forEach(val19 => URL.revokeObjectURL(val19)), useToast1.error("评论失败");
        } finally {
          submittingComment.value = !1;
        }
      }
      function zz31(val1, val17) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        quoteTarget.value = {
          commentId: val1,
          nickname: val17
        };
      }
      function zz32() {
        quoteTarget.value = null, quoteText.value = "";
      }
      async function zz33() {
        if (!activeComment.value || !quoteText.value.trim() || submittingQuote.value) return;
        const val1 = quoteText.value.trim(),
          val17 = quoteTarget.value?.commentId ?? activeComment.value.id,
          val18 = quoteTarget.value?.nickname,
          obj = {
            id: Date.now(),
            userId: useUserStore1.user?.id || 0,
            commentText: val1,
            username: useUserStore1.user?.username || "",
            nickname: useUserStore1.user?.nickname || "我",
            createdAt: new Date().toISOString(),
            likeCount: 0,
            isLiked: !1,
            isMyComment: !0,
            commenterScore: null,
            commenterStars: null,
            imageUrls: null,
            replies: null,
            replyToNickname: val18 ?? null
          };
        if (activeComment.value.replies || (activeComment.value.replies = []), activeComment.value.replies.unshift(obj), ratingItem.value?.comments) {
          const val19 = ratingItem.value.comments.find(val20 => val20.id === val17);
          val19 && (val19.replies || (val19.replies = []), val19.replies.unshift(obj));
        }
        quoteTarget.value = null, quoteText.value = "", submittingQuote.value = !0;
        try {
          const val19 = await xe({
            ratingItemId: itemId,
            commentText: val1,
            parentId: val17
          });
          if (val19.data.code === 200) {
            const val20 = val19.data.data;
            val20 && (obj.id = val20.id);
          } else {
            if (activeComment.value?.replies && (activeComment.value.replies = activeComment.value.replies.filter(val20 => val20.id !== obj.id)), ratingItem.value?.comments) {
              const val20 = ratingItem.value.comments.find(val21 => val21.id === activeComment.value?.id);
              val20?.replies && (val20.replies = val20.replies.filter(val21 => val21.id !== obj.id));
            }
            useToast1.error(val19.data.message || "回复失败");
          }
        } catch {
          if (activeComment.value?.replies && (activeComment.value.replies = activeComment.value.replies.filter(val19 => val19.id !== obj.id)), ratingItem.value?.comments) {
            const val19 = ratingItem.value.comments.find(val20 => val20.id === activeComment.value?.id);
            val19?.replies && (val19.replies = val19.replies.filter(val20 => val20.id !== obj.id));
          }
          useToast1.error("回复失败");
        } finally {
          submittingQuote.value = !1;
        }
      }
      async function zz34(zz35 = !1) {
        zz35 || (loading.value = !0);
        try {
          const val17 = await Pt(itemId);
          if (val17.data.code === 200) {
            if (ratingItem.value = val17.data.data, ratingItem.value?.myRating !== null && ratingItem.value?.myRating !== void 0 && (myStars.value = Math.round(ratingItem.value.myRating / 2)), commentPanelOpen.value && activeComment.value && ratingItem.value?.comments) {
              const val18 = ratingItem.value.comments.find(val19 => val19.id === activeComment.value.id);
              val18 && (activeComment.value = val18);
            }
            zz50();
          } else zz35 || useToast1.error(val17.data.message || "获取详情失败");
        } catch {
          zz35 || useToast1.error("获取详情失败");
        } finally {
          zz35 || (loading.value = !1);
        }
      }
      const breadcrumb = applyDirectives(() => {
          if (!ratingItem.value?.breadcrumb) return [];
          const val1 = ratingItem.value.breadcrumb,
            list1 = [];
          return "ancestors" in val1 && "current" in val1 ? (val1.ancestors.forEach(val17 => {
            list1.push({
              id: val17.id,
              name: val17.name,
              path: `/community/category/${val17.id}`,
              isCurrent: !1
            });
          }), list1.push({
            id: val1.current.id,
            name: val1.current.name,
            path: `/community/category/${val1.current.id}`,
            isCurrent: !0
          })) : (list1.push({
            id: val1.majorSection.id,
            name: val1.majorSection.name,
            path: `/community/major-section/${val1.majorSection.id}`,
            isCurrent: !1
          }), list1.push({
            id: val1.minorSection.id,
            name: val1.minorSection.name,
            path: `/community/minor-section/${val1.minorSection.id}`,
            isCurrent: !0
          })), list1;
        }),
        starDistribution = applyDirectives(() => {
          if (!ratingItem.value?.scoreDistribution) return [];
          const val1 = ratingItem.value.scoreDistribution;
          return [{
            star: 5,
            count: val1.fiveStar,
            percent: val1.fiveStarPercent
          }, {
            star: 4,
            count: val1.fourStar,
            percent: val1.fourStarPercent
          }, {
            star: 3,
            count: val1.threeStar,
            percent: val1.threeStarPercent
          }, {
            star: 2,
            count: val1.twoStar,
            percent: val1.twoStarPercent
          }, {
            star: 1,
            count: val1.oneStar,
            percent: val1.oneStarPercent
          }];
        }),
        displayStars = applyDirectives(() => hoverStars.value || myStars.value);
      async function zz36(val1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        if (submittingRating.value) return;
        const val17 = ratingItem.value?.myRating !== null && ratingItem.value?.myRating !== void 0 ? Math.round(ratingItem.value.myRating / 2) : 0;
        myStars.value = val1, submittingRating.value = !0;
        try {
          const val18 = await zt({
            ratingItemId: itemId,
            stars: val1
          });
          val18.data.code === 200 ? await zz34(!0) : (myStars.value = val17, useToast1.error(val18.data.message || "评分失败"));
        } catch {
          myStars.value = val17, useToast1.error("评分失败");
        } finally {
          submittingRating.value = !1;
        }
      }
      function zz37(val1) {
        hoverStars.value = val1;
      }
      function zz38() {
        hoverStars.value = 0;
      }
      async function zz39(val1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        const val17 = val1.isLiked,
          val18 = val1.likeCount;
        val1.isLiked = !val17, val1.likeCount = val17 ? val18 - 1 : val18 + 1;
        try {
          const val19 = await Ht(val1.id);
          val19.data.code !== 200 && (val1.isLiked = val17, val1.likeCount = val18, useToast1.error(val19.data.message || "操作失败"));
        } catch {
          val1.isLiked = val17, val1.likeCount = val18, useToast1.error("操作失败");
        }
      }
      function zz40(val1, val17) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        replyTarget.value = {
          commentId: val1,
          nickname: val17
        }, replyText.value = "";
      }
      function zz41() {
        replyTarget.value = null, replyText.value = "";
      }
      async function zz42() {
        if (!replyTarget.value || !replyText.value.trim()) return;
        const val1 = replyText.value.trim(),
          val17 = replyTarget.value.commentId,
          obj = {
            id: Date.now(),
            userId: useUserStore1.user?.id || 0,
            commentText: val1,
            username: useUserStore1.user?.username || "",
            nickname: useUserStore1.user?.nickname || "我",
            createdAt: new Date().toISOString(),
            likeCount: 0,
            isLiked: !1,
            isMyComment: !0,
            commenterScore: null,
            commenterStars: null,
            imageUrls: null,
            replies: null
          };
        if (ratingItem.value?.comments) {
          const val18 = ratingItem.value.comments.find(val19 => val19.id === val17);
          val18 && (val18.replies || (val18.replies = []), val18.replies.unshift(obj));
        }
        zz41(), submittingReply.value = !0;
        try {
          const val18 = await xe({
            ratingItemId: itemId,
            commentText: val1,
            parentId: val17
          });
          if (val18.data.code === 200) {
            const val19 = val18.data.data;
            val19 && (obj.id = val19.id), await zz34(!0);
          } else {
            if (ratingItem.value?.comments) {
              const val19 = ratingItem.value.comments.find(val20 => val20.id === val17);
              val19?.replies && (val19.replies = val19.replies.filter(val20 => val20.id !== obj.id));
            }
            useToast1.error(val18.data.message || "回复失败");
          }
        } catch {
          if (ratingItem.value?.comments) {
            const val18 = ratingItem.value.comments.find(val19 => val19.id === val17);
            val18?.replies && (val18.replies = val18.replies.filter(val19 => val19.id !== obj.id));
          }
          useToast1.error("回复失败");
        } finally {
          submittingReply.value = !1;
        }
      }
      function zz43(val1) {
        deleteTargetId.value = val1, deleteConfirmOpen.value = !0;
      }
      function zz44() {
        deleteConfirmOpen.value = !1, deleteTargetId.value = null;
      }
      async function zz45() {
        if (deleteTargetId.value) {
          deleting.value = !0;
          try {
            const val1 = await Nt(deleteTargetId.value);
            val1.data.code === 200 ? (useToast1.success("删除成功"), deleteConfirmOpen.value = !1, deleteTargetId.value = null, await zz34(!0)) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            deleting.value = !1;
          }
        }
      }
      function zz46(val1) {
        const date = new Date(val1),
          val17 = new Date().getTime() - date.getTime(),
          val18 = Math.floor(val17 / 6e4),
          val19 = Math.floor(val17 / 36e5),
          val20 = Math.floor(val17 / 864e5);
        return val18 < 1 ? "刚刚" : val18 < 60 ? `${val18}分钟前` : val19 < 24 ? `${val19}小时前` : val20 < 30 ? `${val20}天前` : date.toLocaleDateString("zh-CN");
      }
      function zz47(val1) {
        return avatarCache.value.get(val1);
      }
      function zz48(val1, val17) {
        val17.stopPropagation();
        const val18 = val17.currentTarget;
        popoverUserId.value = val1, popoverTriggerEl.value = val18, me.value = !0;
      }
      function zz49() {
        me.value = !1, popoverUserId.value = null, popoverTriggerEl.value = null;
      }
      async function zz50() {
        if (!ratingItem.value?.comments) return;
        const set = new Set();
        function zz51(val1) {
          if (val1) for (const zz52 of val1) zz52.userId && !avatarCache.value.has(zz52.userId) && set.add(zz52.userId), zz52.replies && zz51(zz52.replies);
        }
        zz51(ratingItem.value.comments);
        for (const zz53 of set) avatarCache.value.set(zz53, null), getUserAvatar(zz53).then(val1 => {
          val1.data.code === 200 && val1.data.data?.hasAvatar && val1.data.data?.avatarUrl && avatarCache.value.set(zz53, val1.data.data.avatarUrl);
        }).catch(() => {});
      }
      function zz54(val1) {
        return `${Math.max(val1, 2)}%`;
      }
      onMounted(() => {
        zz34(), shouldStartTour() && getCurrentStep() === tourStep.RATING_DETAIL_FEEDBACK && zz55();
      }), directiveUm(() => {
        destroyDriver();
      });
      function zz55() {
        const interval = setInterval(() => {
          !loading.value && ratingItem.value && (clearInterval(interval), setTimeout(() => {
            zz56();
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz56() {
        highlightElement("#tour-detail-feedback", "提交反馈", "如果评分项目有更新（如描述已经过时，或已不存在），可以通过这里进行反馈。", {
          side: "bottom",
          nextBtnText: "继续引导",
          onNextClick: () => {
            saveStep(tourStep.COMMUNITY_HOT), destroyDriver(), useRouter1.push("/community");
          }
        });
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val17) => {
        const val18 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", ms, [createVNode(PageHeader), createElementVNode("main", ps, [loading.value ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [val17[15] || (val17[15] = createVNodeWrapper('<div class="skeleton-header" data-v-c2808096><div class="skeleton-image" data-v-c2808096></div><div class="skeleton-info" data-v-c2808096><div class="skeleton-title" data-v-c2808096></div><div class="skeleton-breadcrumb" data-v-c2808096></div></div></div><div class="skeleton-score-card" data-v-c2808096></div>', 2)), createElementVNode("div", gs, [(openBlock(), createElementBlock(Fragment, null, renderList(3, val19 => createElementVNode("div", {
          key: val19,
          class: "skeleton-comment"
        })), 64))])], 64)) : ratingItem.value ? (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createElementVNode("div", fs, [createElementVNode("div", ks, [createElementVNode("div", hs, [ratingItem.value.url ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: ratingItem.value.url,
          alt: ratingItem.value.name,
          class: "item-image"
        }, null, 8, ys)) : (openBlock(), createElementBlock("div", _s, [...(val17[16] || (val17[16] = [createElementVNode("svg", {
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
        })], -1)]))]))]), createElementVNode("div", ws, [createElementVNode("h1", bs, toDisplayString(ratingItem.value.name), 1), breadcrumb.value.length > 0 ? (openBlock(), createElementBlock("div", Cs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(breadcrumb.value, (val19, val20) => (openBlock(), createElementBlock(Fragment, {
          key: val19.id
        }, [val20 > 0 ? (openBlock(), createElementBlock("span", Is, "/")) : createCommentVNode("", !0), createVNode(val18, {
          to: val19.path,
          class: "breadcrumb-link"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val19.name), 1)]),
          _: 2
        }, 1032, ["to"])], 64))), 128))])) : createCommentVNode("", !0), ratingItem.value.description ? (openBlock(), createElementBlock("p", xs, toDisplayString(ratingItem.value.description), 1)) : createCommentVNode("", !0)])]), createElementVNode("div", {
          class: "item-actions"
        }, [createElementVNode("button", {
          id: "tour-detail-feedback",
          class: "feedback-btn",
          onClick: zz6
        }, [...(val17[17] || (val17[17] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        }), createElementVNode("path", {
          d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        })], -1), createTextVNode(" 信息有误？提交反馈 ", -1)]))]), createElementVNode("button", {
          class: "history-btn",
          onClick: zz9
        }, [...(val17[18] || (val17[18] = [createElementVNode("svg", {
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
        })], -1), createTextVNode(" 更改历史 ", -1)]))])])]), createElementVNode("div", Ls, [createElementVNode("div", Ss, [createElementVNode("div", $s, [createElementVNode("div", Ms, toDisplayString(ratingItem.value.averageScore.toFixed(1)), 1), createElementVNode("div", Us, toDisplayString(ratingItem.value.ratingCount) + "人评分", 1)]), val17[20] || (val17[20] = createElementVNode("div", {
          class: "score-divider-vertical"
        }, null, -1)), starDistribution.value.length > 0 ? (openBlock(), createElementBlock("div", Ts, [(openBlock(!0), createElementBlock(Fragment, null, renderList(starDistribution.value, val19 => (openBlock(), createElementBlock("div", {
          key: val19.star,
          class: "dist-row"
        }, [createElementVNode("div", Rs, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val20 => createElementVNode("svg", {
          key: val20,
          class: normalizeClass(["dist-star-icon", {
            inactive: val20 > val19.star
          }]),
          viewBox: "0 0 24 24",
          fill: "currentColor",
          stroke: "currentColor",
          "stroke-width": "1"
        }, [...(val17[19] || (val17[19] = [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        }, null, -1)]))], 2)), 64))]), createElementVNode("div", Ds, [createElementVNode("div", {
          class: "dist-bar",
          style: resolveRaw({
            width: zz54(val19.percent)
          })
        }, null, 4)])]))), 128))])) : createCommentVNode("", !0)]), val17[22] || (val17[22] = createElementVNode("div", {
          class: "score-divider"
        }, null, -1)), createElementVNode("div", Bs, [createElementVNode("span", As, toDisplayString(ratingItem.value.myRating !== null ? "已评分" : "未评分"), 1), createElementVNode("div", Es, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val19 => createElementVNode("button", {
          key: val19,
          class: normalizeClass(["star-btn", {
            active: val19 <= displayStars.value,
            submitting: submittingRating.value
          }]),
          onClick: val20 => zz36(val19),
          onMouseenter: val20 => zz37(val19),
          onMouseleave: zz38
        }, [(openBlock(), createElementBlock("svg", {
          viewBox: "0 0 24 24",
          fill: val19 <= displayStars.value ? "currentColor" : "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [...(val17[21] || (val17[21] = [createElementVNode("polygon", {
          points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        }, null, -1)]))], 8, zs))], 42, Ps)), 64))])])]), createElementVNode("div", Hs, [createElementVNode("div", Ns, [createElementVNode("span", Os, "全部评论 (" + toDisplayString(ratingItem.value.comments?.length || 0) + ")", 1), createElementVNode("div", js, [createElementVNode("button", {
          class: normalizeClass(["sort-tab", {
            active: commentSort.value === "time"
          }]),
          onClick: val17[0] || (val17[0] = val19 => commentSort.value = "time")
        }, " 按时间 ", 2), createElementVNode("button", {
          class: normalizeClass(["sort-tab", {
            active: commentSort.value === "hot"
          }]),
          onClick: val17[1] || (val17[1] = val19 => commentSort.value = "hot")
        }, " 按热度 ", 2)])]), !ratingItem.value.comments || ratingItem.value.comments.length === 0 ? (openBlock(), createElementBlock("div", Vs, [...(val17[23] || (val17[23] = [createElementVNode("p", null, "暂无评论，快来发表第一条评论吧~", -1)]))])) : ratingItem.value.comments ? (openBlock(), createElementBlock("div", Fs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sortedComments.value, val19 => (openBlock(), createElementBlock("div", {
          key: val19.id,
          class: "comment-card"
        }, [createElementVNode("div", Gs, [createElementVNode("div", {
          class: normalizeClass(["comment-avatar clickable", {
            "has-avatar": zz47(val19.userId)
          }]),
          onClick: val20 => zz48(val19.userId, val20)
        }, [zz47(val19.userId) ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: zz47(val19.userId),
          alt: "",
          class: "avatar-img"
        }, null, 8, Ws)) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode(toDisplayString(val19.nickname.charAt(0)), 1)], 64))], 10, Ks), createElementVNode("div", Xs, [createElementVNode("div", Ys, [createElementVNode("span", qs, toDisplayString(val19.nickname), 1), val19.commenterStars !== null ? (openBlock(), createElementBlock("span", Zs, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val20 => createElementVNode("svg", {
          key: val20,
          class: normalizeClass(["star-icon", {
            filled: val20 <= val19.commenterStars
          }]),
          viewBox: "0 0 24 24"
        }, [...(val17[24] || (val17[24] = [createElementVNode("path", {
          d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }, null, -1)]))], 2)), 64))])) : createCommentVNode("", !0)]), createElementVNode("p", Js, toDisplayString(val19.commentText), 1), val19.imageUrls && val19.imageUrls.length > 0 ? (openBlock(), createElementBlock("div", Qs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val19.imageUrls, (val20, val21) => (openBlock(), createElementBlock("div", {
          key: val21,
          class: normalizeClass(["comment-image-item", {
            single: val19.imageUrls.length === 1,
            double: val19.imageUrls.length === 2
          }]),
          onClick: val22 => zz27(val19.imageUrls, val21)
        }, [createElementVNode("img", {
          src: val20,
          alt: "",
          class: "comment-image-thumb",
          loading: "lazy"
        }, null, 8, tn)], 10, en))), 128))])) : createCommentVNode("", !0), createElementVNode("div", sn, [createElementVNode("span", nn, toDisplayString(zz46(val19.createdAt)), 1), createElementVNode("div", on, [createElementVNode("button", {
          class: normalizeClass(["action-btn", {
            liked: val19.isLiked
          }]),
          onClick: val20 => zz39(val19)
        }, [(openBlock(), createElementBlock("svg", {
          viewBox: "0 0 24 24",
          fill: val19.isLiked ? "currentColor" : "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [...(val17[25] || (val17[25] = [createElementVNode("path", {
          d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
        }, null, -1)]))], 8, ln)), val19.likeCount > 0 ? (openBlock(), createElementBlock("span", rn, toDisplayString(val19.likeCount), 1)) : createCommentVNode("", !0)], 10, an), createElementVNode("button", {
          class: "action-btn",
          onClick: val20 => zz40(val19.id, val19.nickname)
        }, [...(val17[26] || (val17[26] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        })], -1), createTextVNode(" 回复 ", -1)]))], 8, un), val19.isMyComment ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "action-btn delete",
          onClick: val20 => zz43(val19.id)
        }, " 删除 ", 8, cn)) : createCommentVNode("", !0)])])])]), val19.replies && val19.replies.length > 0 ? (openBlock(), createElementBlock("div", dn, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz16(val19.replies), val20 => (openBlock(), createElementBlock("div", {
          key: val20.id,
          class: "reply-preview-item"
        }, [createElementVNode("span", vn, toDisplayString(val20.nickname) + "：", 1), createElementVNode("span", mn, toDisplayString(val20.commentText), 1)]))), 128)), val19.replies.length > 0 ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "view-replies-btn",
          onClick: val20 => zz19(val19)
        }, [createTextVNode(" 查看全部 " + toDisplayString(zz17(val19.replies)) + " 条回复 ", 1), val17[27] || (val17[27] = createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        })], -1))], 8, pn)) : createCommentVNode("", !0)])) : createCommentVNode("", !0), replyTarget.value?.commentId === val19.id ? (openBlock(), createElementBlock("div", gn, [withDirectives(createElementVNode("textarea", {
          "onUpdate:modelValue": val17[2] || (val17[2] = val20 => replyText.value = val20),
          class: "reply-input",
          placeholder: `回复 @${replyTarget.value.nickname}...`,
          rows: "2"
        }, null, 8, fn), [[vModelText, replyText.value]]), createElementVNode("div", kn, [createElementVNode("button", {
          class: "cancel-btn",
          onClick: zz41
        }, "取消"), createElementVNode("button", {
          class: "submit-btn small",
          disabled: submittingReply.value || !replyText.value.trim(),
          onClick: zz42
        }, toDisplayString(submittingReply.value ? "发送中..." : "发送"), 9, hn)])])) : createCommentVNode("", !0)]))), 128))])) : createCommentVNode("", !0)]), createElementVNode("div", yn, [createVNode(withSlots, {
          name: "images-slide"
        }, {
          default: toDisplayValue(() => [uploadImages.value.length > 0 ? (openBlock(), createElementBlock("div", _n, [(openBlock(!0), createElementBlock(Fragment, null, renderList(uploadImages.value, (val19, val20) => (openBlock(), createElementBlock("div", {
            key: val19.previewUrl,
            class: normalizeClass(["pending-image-item", {
              "is-uploading": val19.status === "uploading",
              "is-error": val19.status === "error"
            }])
          }, [createElementVNode("img", {
            src: val19.previewUrl,
            alt: "",
            class: "pending-image-thumb"
          }, null, 8, wn), val19.status === "uploading" ? (openBlock(), createElementBlock("div", bn, [...(val17[28] || (val17[28] = [createElementVNode("div", {
            class: "upload-spinner"
          }, null, -1)]))])) : createCommentVNode("", !0), val19.status === "error" ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "pending-image-overlay error",
            onClick: val21 => zz26(val20)
          }, [...(val17[29] || (val17[29] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M23 4v6h-6M1 20v-6h6"
          }), createElementVNode("path", {
            d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
          })], -1)]))], 8, Cn)) : createCommentVNode("", !0), createElementVNode("button", {
            class: "pending-image-remove",
            onClick: val21 => zz25(val20)
          }, [...(val17[30] || (val17[30] = [createElementVNode("svg", {
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
          })], -1)]))], 8, In)], 2))), 128)), uploadImages.value.length < ce ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "add-more-image-btn",
            onClick: zz21
          }, [...(val17[31] || (val17[31] = [createElementVNode("svg", {
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
          })], -1)]))])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]),
          _: 1
        }), createElementVNode("div", xn, [createElementVNode("input", {
          ref_key: "imageInputRef",
          ref: fileInputEl,
          type: "file",
          accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
          multiple: "",
          class: "hidden-file-input",
          onChange: zz22
        }, null, 544), createElementVNode("div", Ln, [createElementVNode("button", {
          class: normalizeClass(["image-select-btn", {
            "has-images": uploadImages.value.length > 0
          }]),
          onClick: zz21,
          disabled: uploadImages.value.length >= ce
        }, [...(val17[32] || (val17[32] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
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
        })], -1)]))], 10, Sn), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val17[3] || (val17[3] = val19 => commentText.value = val19),
          type: "text",
          class: "bottom-input",
          placeholder: "写评论...",
          onKeyup: withKeys(zz30, ["enter"])
        }, null, 544), [[vModelText, commentText.value]])]), createElementVNode("button", {
          class: "bottom-send-btn",
          disabled: submittingComment.value || !commentText.value.trim() || hasUploadingImages.value,
          onClick: zz30
        }, toDisplayString(submittingComment.value ? "..." : "发送"), 9, $n)])]), (openBlock(), createBlock(Teleport, {
          to: "body"
        }, [createVNode(withSlots, {
          name: "drawer"
        }, {
          default: toDisplayValue(() => [commentPanelOpen.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-overlay",
            onClick: zz20
          }, [createElementVNode("div", {
            class: "drawer-container",
            onClick: val17[10] || (val17[10] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", {
            class: "drawer-header"
          }, [val17[34] || (val17[34] = createElementVNode("h3", null, "回复详情", -1)), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz20
          }, [...(val17[33] || (val17[33] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", Mn, [activeComment.value ? (openBlock(), createElementBlock("div", Un, [createElementVNode("div", {
            class: normalizeClass(["comment-avatar clickable", {
              "has-avatar": zz47(activeComment.value.userId)
            }]),
            onClick: val17[4] || (val17[4] = val19 => zz48(activeComment.value.userId, val19))
          }, [zz47(activeComment.value.userId) ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: zz47(activeComment.value.userId),
            alt: "",
            class: "avatar-img"
          }, null, 8, Tn)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createTextVNode(toDisplayString(activeComment.value.nickname.charAt(0)), 1)], 64))], 2), createElementVNode("div", Rn, [createElementVNode("div", Dn, [createElementVNode("span", Bn, toDisplayString(activeComment.value.nickname), 1), activeComment.value.commenterStars !== null ? (openBlock(), createElementBlock("span", An, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val19 => createElementVNode("svg", {
            key: val19,
            class: normalizeClass(["star-icon", {
              filled: val19 <= activeComment.value.commenterStars
            }]),
            viewBox: "0 0 24 24"
          }, [...(val17[35] || (val17[35] = [createElementVNode("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          }, null, -1)]))], 2)), 64))])) : createCommentVNode("", !0)]), createElementVNode("p", En, toDisplayString(activeComment.value.commentText), 1), activeComment.value.imageUrls && activeComment.value.imageUrls.length > 0 ? (openBlock(), createElementBlock("div", Pn, [(openBlock(!0), createElementBlock(Fragment, null, renderList(activeComment.value.imageUrls, (val19, val20) => (openBlock(), createElementBlock("div", {
            key: val20,
            class: normalizeClass(["comment-image-item", {
              single: activeComment.value.imageUrls.length === 1,
              double: activeComment.value.imageUrls.length === 2
            }]),
            onClick: val21 => zz27(activeComment.value.imageUrls, val20)
          }, [createElementVNode("img", {
            src: val19,
            alt: "",
            class: "comment-image-thumb",
            loading: "lazy"
          }, null, 8, Hn)], 10, zn))), 128))])) : createCommentVNode("", !0), createElementVNode("div", Nn, [createElementVNode("span", On, toDisplayString(zz46(activeComment.value.createdAt)), 1), createElementVNode("div", jn, [createElementVNode("button", {
            class: normalizeClass(["action-btn", {
              liked: activeComment.value.isLiked
            }]),
            onClick: val17[5] || (val17[5] = val19 => zz39(activeComment.value))
          }, [(openBlock(), createElementBlock("svg", {
            viewBox: "0 0 24 24",
            fill: activeComment.value.isLiked ? "currentColor" : "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...(val17[36] || (val17[36] = [createElementVNode("path", {
            d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
          }, null, -1)]))], 8, Vn)), activeComment.value.likeCount > 0 ? (openBlock(), createElementBlock("span", Fn, toDisplayString(activeComment.value.likeCount), 1)) : createCommentVNode("", !0)], 2), createElementVNode("button", {
            class: "action-btn",
            onClick: val17[6] || (val17[6] = val19 => zz31(activeComment.value.id, activeComment.value.nickname))
          }, [...(val17[37] || (val17[37] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          })], -1), createTextVNode(" 回复 ", -1)]))])])])])])) : createCommentVNode("", !0), createElementVNode("div", Gn, [createElementVNode("span", Kn, "相关回复共 " + toDisplayString(zz17(activeComment.value?.replies ?? null)) + " 条", 1), createElementVNode("div", Wn, [createElementVNode("button", {
            class: normalizeClass(["sort-tab", {
              active: replySort.value === "time"
            }]),
            onClick: val17[7] || (val17[7] = val19 => replySort.value = "time")
          }, " 按时间 ", 2), createElementVNode("button", {
            class: normalizeClass(["sort-tab", {
              active: replySort.value === "hot"
            }]),
            onClick: val17[8] || (val17[8] = val19 => replySort.value = "hot")
          }, " 按热度 ", 2)])]), createElementVNode("div", Xn, [(openBlock(!0), createElementBlock(Fragment, null, renderList(commentReplies.value, val19 => (openBlock(), createElementBlock("div", {
            key: val19.id,
            class: "drawer-reply-item"
          }, [createElementVNode("div", {
            class: normalizeClass(["comment-avatar small clickable", {
              "has-avatar": zz47(val19.userId)
            }]),
            onClick: val20 => zz48(val19.userId, val20)
          }, [zz47(val19.userId) ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: zz47(val19.userId),
            alt: "",
            class: "avatar-img"
          }, null, 8, qn)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createTextVNode(toDisplayString(val19.nickname.charAt(0)), 1)], 64))], 10, Yn), createElementVNode("div", Zn, [createElementVNode("div", Jn, [createElementVNode("span", Qn, toDisplayString(val19.nickname), 1), val19.commenterStars !== null ? (openBlock(), createElementBlock("span", eo, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val20 => createElementVNode("svg", {
            key: val20,
            class: normalizeClass(["star-icon", {
              filled: val20 <= val19.commenterStars
            }]),
            viewBox: "0 0 24 24"
          }, [...(val17[38] || (val17[38] = [createElementVNode("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          }, null, -1)]))], 2)), 64))])) : createCommentVNode("", !0)]), createElementVNode("p", to, [val19.replyToNickname ? (openBlock(), createElementBlock("span", so, "回复 @" + toDisplayString(val19.replyToNickname) + "：", 1)) : createCommentVNode("", !0), createTextVNode(toDisplayString(val19.commentText), 1)]), createElementVNode("div", no, [createElementVNode("span", oo, toDisplayString(zz46(val19.createdAt)), 1), createElementVNode("div", ao, [createElementVNode("button", {
            class: normalizeClass(["action-btn", {
              liked: val19.isLiked
            }]),
            onClick: val20 => zz39(val19)
          }, [(openBlock(), createElementBlock("svg", {
            viewBox: "0 0 24 24",
            fill: val19.isLiked ? "currentColor" : "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [...(val17[39] || (val17[39] = [createElementVNode("path", {
            d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
          }, null, -1)]))], 8, io)), val19.likeCount > 0 ? (openBlock(), createElementBlock("span", ro, toDisplayString(val19.likeCount), 1)) : createCommentVNode("", !0)], 10, lo), createElementVNode("button", {
            class: "action-btn",
            onClick: val20 => zz31(val19.id, val19.nickname)
          }, [...(val17[40] || (val17[40] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          })], -1), createTextVNode(" 回复 ", -1)]))], 8, uo), val19.isMyComment ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "action-btn delete",
            onClick: val20 => zz43(val19.id)
          }, " 删除 ", 8, co)) : createCommentVNode("", !0)])])])]))), 128))])]), createElementVNode("div", vo, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val17[9] || (val17[9] = val19 => quoteText.value = val19),
            type: "text",
            class: "bottom-input",
            placeholder: quoteTarget.value ? `回复 @${quoteTarget.value.nickname}...` : "写回复...",
            onKeyup: withKeys(zz33, ["enter"])
          }, null, 40, mo), [[vModelText, quoteText.value]]), quoteTarget.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "cancel-reply-btn",
            onClick: zz32
          }, " 取消 ")) : createCommentVNode("", !0), createElementVNode("button", {
            class: "bottom-send-btn",
            disabled: submittingQuote.value || !quoteText.value.trim(),
            onClick: zz33
          }, toDisplayString(submittingQuote.value ? "..." : "发送"), 9, po)])])])) : createCommentVNode("", !0)]),
          _: 1
        })])), (openBlock(), createBlock(Teleport, {
          to: "body"
        }, [createVNode(withSlots, {
          name: "modal"
        }, {
          default: toDisplayValue(() => [deleteConfirmOpen.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-overlay",
            onClick: withModifiers(zz44, ["self"])
          }, [createElementVNode("div", go, [val17[41] || (val17[41] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), val17[42] || (val17[42] = createElementVNode("p", {
            class: "modal-desc"
          }, "确定要删除这条评论吗？此操作不可撤销。", -1)), createElementVNode("div", fo, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz44,
            disabled: deleting.value
          }, " 取消 ", 8, ko), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz45,
            disabled: deleting.value
          }, toDisplayString(deleting.value ? "删除中..." : "确认删除"), 9, ho)])])])) : createCommentVNode("", !0)]),
          _: 1
        })])), (openBlock(), createBlock(Teleport, {
          to: "body"
        }, [createVNode(withSlots, {
          name: "image-preview"
        }, {
          default: toDisplayValue(() => [previewImage.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "image-preview-overlay",
            onClick: zz28
          }, [createElementVNode("div", {
            class: "image-preview-container",
            onClick: val17[13] || (val17[13] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("button", {
            class: "image-preview-close",
            onClick: zz28
          }, [...(val17[43] || (val17[43] = [createElementVNode("svg", {
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
          })], -1)]))]), createElementVNode("img", {
            src: previewImage.value,
            alt: "",
            class: "image-preview-img"
          }, null, 8, yo), previewList.value.length > 1 ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "image-preview-nav prev",
            onClick: val17[11] || (val17[11] = withModifiers(val19 => zz29("prev"), ["stop"]))
          }, [...(val17[44] || (val17[44] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("polyline", {
            points: "15 18 9 12 15 6"
          })], -1)]))])) : createCommentVNode("", !0), previewList.value.length > 1 ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "image-preview-nav next",
            onClick: val17[12] || (val17[12] = withModifiers(val19 => zz29("next"), ["stop"]))
          }, [...(val17[45] || (val17[45] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("polyline", {
            points: "9 18 15 12 9 6"
          })], -1)]))])) : createCommentVNode("", !0), previewList.value.length > 1 ? (openBlock(), createElementBlock("div", _o, toDisplayString(previewIndex.value + 1) + " / " + toDisplayString(previewList.value.length), 1)) : createCommentVNode("", !0)])])) : createCommentVNode("", !0)]),
          _: 1
        })])), createVNode(jt, {
          "is-open": feedbackModalOpen.value,
          "contribution-type": 1,
          "target-type": 2,
          "target-id": unref(itemId),
          "current-name": ratingItem.value.name,
          "current-description": ratingItem.value.description,
          onClose: zz7,
          onSuccess: zz8
        }, null, 8, ["is-open", "target-id", "current-name", "current-description"]), me.value && popoverUserId.value ? (openBlock(), createBlock(vs, {
          key: 0,
          "user-id": popoverUserId.value,
          "trigger-element": popoverTriggerEl.value,
          onClose: zz49
        }, null, 8, ["user-id", "trigger-element"])) : createCommentVNode("", !0), (openBlock(), createBlock(Teleport, {
          to: "body"
        }, [createVNode(withSlots, {
          name: "modal"
        }, {
          default: toDisplayValue(() => [historyModalOpen.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-overlay",
            onClick: withModifiers(zz10, ["self"])
          }, [createElementVNode("div", wo, [createElementVNode("div", {
            class: "history-header"
          }, [val17[47] || (val17[47] = createElementVNode("h3", null, "更改历史", -1)), createElementVNode("button", {
            class: "history-close",
            onClick: zz10
          }, [...(val17[46] || (val17[46] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", bo, [historyLoading.value ? (openBlock(), createElementBlock("div", Co, [...(val17[48] || (val17[48] = [createElementVNode("div", {
            class: "loading-spinner"
          }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : contributionHistory.value.length === 0 ? (openBlock(), createElementBlock("div", Io, [...(val17[49] || (val17[49] = [createElementVNode("svg", {
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
          })], -1), createElementVNode("p", null, "暂无更改历史", -1)]))])) : (openBlock(), createElementBlock("div", xo, [(openBlock(!0), createElementBlock(Fragment, null, renderList(contributionHistory.value, val19 => (openBlock(), createElementBlock("div", {
            key: val19.contributionId,
            class: "history-item"
          }, [createElementVNode("div", Lo, [createElementVNode("span", {
            class: normalizeClass(["history-type", val19.contributionType === 1 ? "modify" : "create"])
          }, toDisplayString(val19.contributionTypeDisplay), 3), createElementVNode("span", So, toDisplayString(val19.nickname), 1), createElementVNode("span", $o, toDisplayString(zz11(val19.reviewedAt)), 1)]), createElementVNode("div", Mo, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val19.details, (val20, val21) => (openBlock(), createElementBlock("div", {
            key: val21,
            class: "history-detail"
          }, [createElementVNode("span", Uo, toDisplayString(val20.fieldNameDisplay || zz12(val20.fieldName)), 1), val20.fieldName === "image" ? (openBlock(), createElementBlock("div", To, [val19.contributionType === 1 ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [val20.oldImageUrl ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: val20.oldImageUrl,
            class: "detail-thumb",
            alt: "旧图"
          }, null, 8, Ro)) : (openBlock(), createElementBlock("span", Do, "无")), val17[50] || (val17[50] = createElementVNode("span", {
            class: "arrow"
          }, "→", -1)), val20.newImageUrl ? (openBlock(), createElementBlock("img", {
            key: 2,
            src: val20.newImageUrl,
            class: "detail-thumb",
            alt: "新图"
          }, null, 8, Bo)) : (openBlock(), createElementBlock("span", Ao, "无"))], 64)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [val20.newImageUrl ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: val20.newImageUrl,
            class: "detail-thumb",
            alt: "新图"
          }, null, 8, Eo)) : (openBlock(), createElementBlock("span", Po, "无"))], 64))])) : (openBlock(), createElementBlock("div", zo, [val19.contributionType === 1 && val20.oldValue !== void 0 ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createElementVNode("span", Ho, toDisplayString(val20.oldValue || "（空）"), 1), val17[51] || (val17[51] = createElementVNode("span", {
            class: "arrow"
          }, "→", -1)), createElementVNode("span", No, toDisplayString(val20.newValue), 1)], 64)) : (openBlock(), createElementBlock("span", Oo, toDisplayString(val20.newValue), 1))]))]))), 128))])]))), 128))]))])])])) : createCommentVNode("", !0)]),
          _: 1
        })]))], 64)) : (openBlock(), createElementBlock("div", jo, [val17[52] || (val17[52] = createElementVNode("h2", null, "加载失败", -1)), val17[53] || (val17[53] = createElementVNode("p", null, "无法获取评分项目详情", -1)), createElementVNode("button", {
          class: "retry-btn",
          onClick: val17[14] || (val17[14] = () => zz34())
        }, "重试")]))])]);
      };
    }
  }),
  Yo = withScopeId(Fo, [["__scopeId", "data-v-c2808096"]]);
/* index 运行时导出（已语义化） */
export { Yo as default };