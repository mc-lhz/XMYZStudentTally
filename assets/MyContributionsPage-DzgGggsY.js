/*!
 * 页面模块：我的反馈（MyContributionsPage）
 * 路由：/community/contributions   name=community-contributions   层级=2   需登录=是
 * 功能：登录后的「我的反馈」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MyContributionsPage-DzgGggsY.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, onMounted, createElementBlock, createVNode, createElementVNode, Fragment, renderList, createCommentVNode, toDisplayString, useToast, normalizeClass, createVNodeWrapper, createTextVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityContributionsMy } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：filter-tabs */
/* 模板属性配置：loading-container */
/* 模板属性配置：empty-container */
/* 模板属性配置：contributions-list */
/* 模板属性配置：card-header */
/* 模板属性配置：card-badges */
const local_zb79 = {
    class: "page-container"
  },
  MyContributionsPageConfig = {
    class: "page-content"
  },
  MyContributionsPageConfig_2 = {
    class: "filter-tabs"
  },
  MyContributionsPageList = ["onClick"],
  MyContributionsPageConfig_3 = {
    key: 0,
    class: "loading-container"
  },
  MyContributionsPageConfig_4 = {
    key: 1,
    class: "empty-container"
  },
  MyContributionsPageConfig_5 = {
    key: 2,
    class: "contributions-list"
  },
  MyContributionsPageConfig_6 = {
    class: "card-header"
  },
  MyContributionsPageConfig_7 = {
    class: "card-badges"
  },
  ee = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  se = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  te = {
    class: "target-badge"
  },
  ae = {
    class: "card-time"
  },
  le = {
    class: "card-body"
  },
  oe = {
    class: "card-title"
  },
  ne = {
    class: "card-reason"
  },
  re = {
    class: "card-details"
  },
  ie = {
    class: "detail-label"
  },
  de = {
    key: 0,
    class: "detail-images"
  },
  ce = {
    key: 0,
    class: "image-compare"
  },
  ue = {
    class: "image-box"
  },
  ve = ["src"],
  ge = {
    key: 1,
    class: "image-placeholder"
  },
  _e = {
    class: "image-box"
  },
  me = ["src"],
  he = {
    key: 1,
    class: "image-placeholder"
  },
  ye = ["src"],
  pe = {
    key: 1,
    class: "image-placeholder"
  },
  fe = {
    key: 1,
    class: "detail-content"
  },
  ke = {
    key: 0,
    class: "text-compare"
  },
  we = {
    class: "old-value"
  },
  xe = {
    class: "new-value"
  },
  Me = {
    key: 1,
    class: "new-value"
  },
  be = {
    key: 0,
    class: "reject-reason"
  },
  Ce = {
    key: 1,
    class: "review-time"
  },
  Te = {
    key: 0,
    class: "load-more"
  },
  De = ["disabled"],
  Ve = {
    key: 1,
    class: "no-more"
  },
  Be = defineComponent({
    __name: "MyContributionsPage",
    setup(val) {
      const useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(1),
        refVal5 = ref(20),
        refVal6 = ref(null),
        list = [{
          label: "全部",
          value: null
        }, {
          label: "待审核",
          value: 0
        }, {
          label: "已通过",
          value: 1
        }, {
          label: "已拒绝",
          value: 2
        }],
        val2 = applyDirectives(() => refVal2.value.length < refVal3.value);
      async function zz0(zz1 = !1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        zz1 && (refVal4.value = 1, refVal2.value = []), refVal.value = !0;
        try {
          const obj = {
            page: refVal4.value,
            size: refVal5.value
          };
          refVal6.value !== null && (obj.status = refVal6.value);
          const val3 = await getRatingCommunityContributionsMy(obj);
          val3.data.code === 200 ? (zz1 ? refVal2.value = val3.data.data.items : refVal2.value = [...refVal2.value, ...val3.data.data.items], refVal3.value = val3.data.data.total) : useToast1.error(val3.data.message || "获取反馈列表失败");
        } catch {
          useToast1.error("获取反馈列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz2(val1) {
        refVal6.value = val1, zz0(!0);
      }
      function zz3() {
        !val2.value || refVal.value || (refVal4.value++, zz0());
      }
      function zz4(val1) {
        switch (val1) {
          case 0:
            return "status-pending";
          case 1:
            return "status-approved";
          case 2:
            return "status-rejected";
          default:
            return "";
        }
      }
      function zz5(val1) {
        return val1 === 1 ? "edit" : "plus";
      }
      function zz6(val1) {
        const date = new Date(val1),
          val3 = new Date().getTime() - date.getTime(),
          val4 = Math.floor(val3 / (1e3 * 60 * 60 * 24));
        if (val4 === 0) {
          const val5 = Math.floor(val3 / 36e5);
          if (val5 === 0) {
            const val6 = Math.floor(val3 / 6e4);
            return val6 <= 0 ? "刚刚" : `${val6}分钟前`;
          }
          return `${val5}小时前`;
        } else return val4 === 1 ? "昨天" : val4 < 7 ? `${val4}天前` : `${date.getMonth() + 1}月${date.getDate()}日`;
      }
      function zz7(val1) {
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
      return onMounted(() => {
        zz0(!0);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", local_zb79, [createVNode(PageHeader, {
        "back-to": "/community"
      }), createElementVNode("main", MyContributionsPageConfig, [createElementVNode("div", MyContributionsPageConfig_2, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("button", {
        key: val4.value ?? "all",
        class: normalizeClass(["filter-tab", {
          active: refVal6.value === val4.value
        }]),
        onClick: val5 => zz2(val4.value)
      }, toDisplayString(val4.label), 11, MyContributionsPageList)), 64))]), refVal.value && refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", MyContributionsPageConfig_3, [(openBlock(), createElementBlock(Fragment, null, renderList(3, val4 => createElementVNode("div", {
        key: val4,
        class: "skeleton-card"
      }, [...(val3[0] || (val3[0] = [createVNodeWrapper('<div class="skeleton-header" data-v-82f219f7><div class="skeleton-badge" data-v-82f219f7></div><div class="skeleton-time" data-v-82f219f7></div></div><div class="skeleton-title" data-v-82f219f7></div><div class="skeleton-desc" data-v-82f219f7></div>', 3)]))])), 64))])) : !refVal.value && refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", MyContributionsPageConfig_4, [...(val3[1] || (val3[1] = [createElementVNode("svg", {
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
      }), createElementVNode("path", {
        d: "M9 12h6M9 16h6"
      })], -1), createElementVNode("h3", null, "暂无反馈记录", -1), createElementVNode("p", null, "在评分社区中发现问题或想贡献内容时，可以提交反馈", -1)]))])) : (openBlock(), createElementBlock("div", MyContributionsPageConfig_5, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "contribution-card"
      }, [createElementVNode("div", MyContributionsPageConfig_6, [createElementVNode("div", MyContributionsPageConfig_7, [createElementVNode("span", {
        class: normalizeClass(["type-badge", zz5(val4.contributionType)])
      }, [val4.contributionType === 1 ? (openBlock(), createElementBlock("svg", ee, [...(val3[2] || (val3[2] = [createElementVNode("path", {
        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }, null, -1), createElementVNode("path", {
        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", se, [...(val3[3] || (val3[3] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }, null, -1), createElementVNode("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "16"
      }, null, -1), createElementVNode("line", {
        x1: "8",
        y1: "12",
        x2: "16",
        y2: "12"
      }, null, -1)]))])), createTextVNode(" " + toDisplayString(val4.contributionTypeDisplay), 1)], 2), createElementVNode("span", te, toDisplayString(val4.targetTypeDisplay), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz4(val4.status)])
      }, toDisplayString(val4.statusDisplay), 3)]), createElementVNode("span", ae, toDisplayString(zz6(val4.createdAt)), 1)]), createElementVNode("div", le, [createElementVNode("h3", oe, [val4.contributionType === 1 ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createTextVNode(" 修改「" + toDisplayString(val4.targetName || "未知目标") + "」 ", 1)], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createTextVNode(" 新建" + toDisplayString(val4.targetTypeDisplay), 1)], 64))]), createElementVNode("p", ne, "提交原因：" + toDisplayString(val4.reason), 1), createElementVNode("div", re, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val4.details, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: val6,
        class: "detail-item"
      }, [createElementVNode("span", ie, toDisplayString(val5.fieldNameDisplay || zz7(val5.fieldName)), 1), val5.fieldName === "image" ? (openBlock(), createElementBlock("div", de, [val4.contributionType === 1 ? (openBlock(), createElementBlock("div", ce, [createElementVNode("div", ue, [val3[4] || (val3[4] = createElementVNode("span", {
        class: "image-label"
      }, "修改前", -1)), val5.oldImageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.oldImageUrl,
        alt: "修改前图片",
        class: "detail-image"
      }, null, 8, ve)) : (openBlock(), createElementBlock("div", ge, "无图片"))]), val3[6] || (val3[6] = createElementVNode("svg", {
        class: "arrow-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M5 12h14M12 5l7 7-7 7"
      })], -1)), createElementVNode("div", _e, [val3[5] || (val3[5] = createElementVNode("span", {
        class: "image-label"
      }, "修改后", -1)), val5.newImageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.newImageUrl,
        alt: "修改后图片",
        class: "detail-image"
      }, null, 8, me)) : (openBlock(), createElementBlock("div", he, "无图片"))])])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val5.newImageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.newImageUrl,
        alt: "新建图片",
        class: "detail-image single"
      }, null, 8, ye)) : (openBlock(), createElementBlock("div", pe, "未上传图片"))], 64))])) : (openBlock(), createElementBlock("div", fe, [val4.contributionType === 1 && val5.oldValue !== void 0 ? (openBlock(), createElementBlock("div", ke, [createElementVNode("span", we, toDisplayString(val5.oldValue || "（空）"), 1), val3[7] || (val3[7] = createElementVNode("svg", {
        class: "arrow-icon small",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M5 12h14M12 5l7 7-7 7"
      })], -1)), createElementVNode("span", xe, toDisplayString(val5.newValue), 1)])) : (openBlock(), createElementBlock("span", Me, toDisplayString(val5.newValue), 1))]))]))), 128))])]), val4.status === 2 && val4.rejectReason ? (openBlock(), createElementBlock("div", be, [val3[8] || (val3[8] = createElementVNode("svg", {
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
        y2: "12"
      }), createElementVNode("line", {
        x1: "12",
        y1: "16",
        x2: "12.01",
        y2: "16"
      })], -1)), createElementVNode("span", null, "拒绝原因：" + toDisplayString(val4.rejectReason), 1)])) : createCommentVNode("", !0), val4.reviewedAt ? (openBlock(), createElementBlock("div", Ce, " 审核于 " + toDisplayString(zz6(val4.reviewedAt)), 1)) : createCommentVNode("", !0)]))), 128)), val2.value ? (openBlock(), createElementBlock("div", Te, [createElementVNode("button", {
        class: "load-more-btn",
        disabled: refVal.value,
        onClick: zz3
      }, toDisplayString(refVal.value ? "加载中..." : "加载更多"), 9, De)])) : refVal2.value.length > 0 ? (openBlock(), createElementBlock("div", Ve, " 已加载全部 ")) : createCommentVNode("", !0)]))]), createVNode(PageFooter)]));
    }
  }),
  $e = withScopeId(Be, [["__scopeId", "data-v-82f219f7"]]);
/* index 运行时导出（已语义化） */
export { $e as default };