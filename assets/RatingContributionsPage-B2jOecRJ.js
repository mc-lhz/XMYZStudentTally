/*!
 * 页面模块：审核反馈（RatingContributionsPage）
 * 路由：/admin/rating/contributions   name=admin-rating-contributions   层级=3   需登录=是
 * 功能：登录后的「审核反馈」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingContributionsPage-B2jOecRJ.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createTextVNode, createCommentVNode, toDisplayString, normalizeClass, withDirectives, deepDirectiveOptions, createVNodeWrapper, Fragment, renderList, toDisplayValue, withSlots, unref, withModifiers, vModelText, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getContributionsById as pe, getContributionsPendingCount as me, reviewContributions as ge } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { ratingTypeLabel as fe, ratingTargetLabel as ye, ratingStatusLabel as _e } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const xe = {
    class: "page-container"
  },
  be = {
    class: "page-content"
  },
  Ce = {
    class: "content-container"
  },
  Te = {
    class: "breadcrumb-wrapper"
  },
  Me = {
    class: "page-header-section"
  },
  Ie = {
    class: "header-main"
  },
  Be = {
    class: "header-text"
  },
  Re = {
    class: "page-subtitle"
  },
  De = {
    key: 0,
    class: "pending-badge"
  },
  Ve = {
    class: "status-tabs"
  },
  $e = {
    key: 0,
    class: "tab-count"
  },
  je = {
    class: "filter-row"
  },
  Ne = {
    class: "filter-group"
  },
  Pe = {
    class: "filter-group"
  },
  Ue = {
    key: 0,
    class: "loading-container"
  },
  Se = {
    key: 0,
    class: "empty-container"
  },
  Ae = {
    key: 1,
    class: "contributions-list"
  },
  Fe = ["onClick"],
  ze = {
    class: "card-badges"
  },
  Le = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Ee = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  He = {
    class: "card-meta"
  },
  Oe = {
    class: "card-user"
  },
  qe = {
    class: "card-time"
  },
  Ge = {
    class: "card-summary"
  },
  Ze = {
    class: "card-title"
  },
  Je = {
    class: "card-reason"
  },
  Ke = {
    key: 0,
    class: "card-details"
  },
  Qe = {
    class: "detail-label"
  },
  We = {
    key: 0,
    class: "detail-images"
  },
  Xe = {
    key: 0,
    class: "image-compare"
  },
  Ye = {
    class: "image-box"
  },
  es = ["src"],
  ss = {
    key: 1,
    class: "image-placeholder"
  },
  as = {
    class: "image-box"
  },
  ts = ["src"],
  ls = {
    key: 1,
    class: "image-placeholder"
  },
  os = ["src"],
  ns = {
    key: 1,
    class: "image-placeholder"
  },
  is = {
    key: 1,
    class: "detail-content"
  },
  rs = {
    key: 0,
    class: "text-compare"
  },
  ds = {
    class: "old-value"
  },
  us = {
    class: "new-value"
  },
  vs = {
    key: 1,
    class: "new-value"
  },
  cs = {
    key: 0,
    class: "reject-reason"
  },
  ps = {
    key: 1,
    class: "review-info"
  },
  ms = {
    key: 2,
    class: "review-actions"
  },
  gs = ["onClick"],
  fs = ["onClick"],
  ys = {
    key: 0,
    class: "load-more"
  },
  _s = ["disabled"],
  hs = {
    key: 1,
    class: "no-more"
  },
  ks = {
    class: "modal-title"
  },
  ws = {
    class: "modal-desc"
  },
  xs = {
    key: 0,
    class: "form-group"
  },
  bs = {
    class: "char-count"
  },
  Cs = {
    class: "modal-actions"
  },
  Ts = ["disabled"],
  Ms = ["disabled"],
  Is = defineComponent({
    __name: "RatingContributionsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(1),
        refVal5 = ref(20),
        refVal6 = ref(0),
        refVal7 = ref("all"),
        refVal8 = ref("all"),
        refVal9 = ref("all"),
        list = ["all", 0, 1, 2],
        refVal10 = ref(""),
        refVal11 = ref(!1),
        refVal12 = ref(!1),
        refVal13 = ref(null),
        refVal14 = ref("approve"),
        refVal15 = ref(""),
        refVal16 = ref(!1),
        refVal17 = ref(new Set()),
        val2 = applyDirectives(() => refVal2.value.length < refVal3.value);
      watch(refVal7, (val1, val3) => {
        if (val3 === void 0) return;
        const val4 = list.indexOf(val3),
          val5 = list.indexOf(val1);
        refVal10.value = val5 > val4 ? "left" : "right", refVal11.value = !0, zz0(!0), nextTick(() => {
          setTimeout(() => {
            refVal11.value = !1, refVal10.value = "";
          }, 300);
        });
      }), watch([refVal8, refVal9], () => {
        zz0(!0);
      });
      async function zz0(zz1 = !1) {
        zz1 && (refVal4.value = 1, refVal2.value = []), refVal.value = !0;
        try {
          const obj = {
            page: refVal4.value,
            size: refVal5.value
          };
          refVal7.value !== "all" && (obj.status = refVal7.value), refVal8.value !== "all" && (obj.contributionType = refVal8.value), refVal9.value !== "all" && (obj.targetType = refVal9.value);
          const val3 = await pe(obj);
          val3.data.code === 200 ? (zz1 ? refVal2.value = val3.data.data.items : refVal2.value = [...refVal2.value, ...val3.data.data.items], refVal3.value = val3.data.data.total) : useToast1.error(val3.data.message || "获取贡献列表失败");
        } catch {
          useToast1.error("获取贡献列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      async function zz2() {
        try {
          const val1 = await me();
          val1.data.code === 200 && (refVal6.value = val1.data.data);
        } catch {}
      }
      function zz3() {
        !val2.value || refVal.value || (refVal4.value++, zz0());
      }
      function zz4(val1) {
        refVal17.value.has(val1) ? refVal17.value.delete(val1) : refVal17.value.add(val1);
      }
      function zz5(val1) {
        return refVal17.value.has(val1);
      }
      function zz6(val1, val3) {
        refVal13.value = val1, refVal14.value = val3, refVal15.value = "", refVal12.value = !0;
      }
      function zz7() {
        refVal12.value = !1, refVal13.value = null, refVal15.value = "";
      }
      async function zz8() {
        if (refVal13.value) {
          if (refVal14.value === "reject" && !refVal15.value.trim()) {
            useToast1.error("请填写拒绝原因");
            return;
          }
          refVal16.value = !0;
          try {
            const obj = {
                status: refVal14.value === "approve" ? 1 : 2,
                rejectReason: refVal14.value === "reject" ? refVal15.value.trim() : void 0
              },
              val1 = await ge(refVal13.value.id, obj);
            val1.data.code === 200 ? (useToast1.success(refVal14.value === "approve" ? "已通过审核" : "已拒绝"), zz7(), await Promise.all([zz0(!0), zz2()])) : useToast1.error(val1.data.message || "审核失败");
          } catch {
            useToast1.error("审核失败");
          } finally {
            refVal16.value = !1;
          }
        }
      }
      function zz9(val1) {
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
      function zz10(val1) {
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
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0(!0), zz2();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", xe, [createVNode(PageHeader, {
        "back-to": "/admin/rating"
      }), createElementVNode("main", be, [createElementVNode("div", Ce, [createElementVNode("div", Te, [createVNode(PageBreadcrumb)]), createElementVNode("div", Me, [createElementVNode("div", Ie, [createElementVNode("div", Be, [val3[9] || (val3[9] = createElementVNode("h1", {
        class: "page-title"
      }, "审核反馈", -1)), createElementVNode("p", Re, [val3[8] || (val3[8] = createTextVNode(" 审核用户提交的内容修改和新增请求 ", -1)), refVal6.value > 0 ? (openBlock(), createElementBlock("span", De, toDisplayString(refVal6.value) + " 条待审核", 1)) : createCommentVNode("", !0)])])])]), createElementVNode("div", Ve, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === "all"
        }]),
        onClick: val3[0] || (val3[0] = val4 => refVal7.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 0
        }]),
        onClick: val3[1] || (val3[1] = val4 => refVal7.value = 0)
      }, [val3[10] || (val3[10] = createTextVNode(" 待审核 ", -1)), refVal6.value > 0 && refVal7.value !== 0 ? (openBlock(), createElementBlock("span", $e, toDisplayString(refVal6.value), 1)) : createCommentVNode("", !0)], 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 1
        }]),
        onClick: val3[2] || (val3[2] = val4 => refVal7.value = 1)
      }, " 已通过 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 2
        }]),
        onClick: val3[3] || (val3[3] = val4 => refVal7.value = 2)
      }, " 已拒绝 ", 2)]), createElementVNode("div", je, [createElementVNode("div", Ne, [val3[12] || (val3[12] = createElementVNode("label", {
        class: "filter-label"
      }, "贡献类型", -1)), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[4] || (val3[4] = val4 => refVal8.value = val4),
        class: "filter-select"
      }, [...(val3[11] || (val3[11] = [createElementVNode("option", {
        value: "all"
      }, "全部类型", -1), createElementVNode("option", {
        value: 1
      }, "修改现有", -1), createElementVNode("option", {
        value: 2
      }, "新增内容", -1)]))], 512), [[deepDirectiveOptions, refVal8.value]])]), createElementVNode("div", Pe, [val3[14] || (val3[14] = createElementVNode("label", {
        class: "filter-label"
      }, "目标类型", -1)), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[5] || (val3[5] = val4 => refVal9.value = val4),
        class: "filter-select"
      }, [...(val3[13] || (val3[13] = [createElementVNode("option", {
        value: "all"
      }, "全部目标", -1), createElementVNode("option", {
        value: 1
      }, "分类", -1), createElementVNode("option", {
        value: 2
      }, "评分项目", -1), createElementVNode("option", {
        value: 3
      }, "合集", -1)]))], 512), [[deepDirectiveOptions, refVal9.value]])])]), refVal.value && refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Ue, [...(val3[15] || (val3[15] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal11.value && refVal10.value === "left",
          "slide-right": refVal11.value && refVal10.value === "right"
        }])
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Se, [val3[16] || (val3[16] = createVNodeWrapper('<div class="empty-icon" data-v-a540bc2e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-a540bc2e><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" data-v-a540bc2e></path><rect x="9" y="3" width="6" height="4" rx="1" data-v-a540bc2e></rect><path d="M9 12h6M9 16h6" data-v-a540bc2e></path></svg></div><h2 data-v-a540bc2e>暂无反馈</h2>', 2)), createElementVNode("p", null, toDisplayString(refVal7.value === "all" ? "还没有用户提交任何反馈" : "没有找到符合条件的反馈"), 1)])) : (openBlock(), createElementBlock("div", Ae, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: normalizeClass(["contribution-card", {
          expanded: zz5(val4.id)
        }])
      }, [createElementVNode("div", {
        class: "card-header",
        onClick: val5 => zz4(val4.id)
      }, [createElementVNode("div", ze, [createElementVNode("span", {
        class: normalizeClass(["type-badge", unref(fe)(val4.contributionType).class])
      }, [val4.contributionType === 1 ? (openBlock(), createElementBlock("svg", Le, [...(val3[17] || (val3[17] = [createElementVNode("path", {
        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }, null, -1), createElementVNode("path", {
        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", Ee, [...(val3[18] || (val3[18] = [createElementVNode("circle", {
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
      }, null, -1)]))])), createTextVNode(" " + toDisplayString(val4.contributionTypeDisplay), 1)], 2), createElementVNode("span", {
        class: normalizeClass(["target-badge", unref(ye)(val4.targetType).class])
      }, toDisplayString(val4.targetTypeDisplay), 3), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(_e)(val4.status).class])
      }, toDisplayString(val4.statusDisplay), 3)]), createElementVNode("div", He, [createElementVNode("span", Oe, toDisplayString(val4.nickname || val4.username), 1), createElementVNode("span", qe, toDisplayString(zz9(val4.createdAt)), 1), createElementVNode("div", {
        class: normalizeClass(["expand-icon", {
          expanded: zz5(val4.id)
        }])
      }, [...(val3[19] || (val3[19] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1)]))], 2)])], 8, Fe), createElementVNode("div", Ge, [createElementVNode("h3", Ze, [val4.contributionType === 1 ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createTextVNode(" 修改「" + toDisplayString(val4.targetName || "未知目标") + "」 ", 1)], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createTextVNode(" 新建" + toDisplayString(val4.targetTypeDisplay) + " ", 1), val4.parentName ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createTextVNode(" （位于「" + toDisplayString(val4.parentName) + "」下） ", 1)], 64)) : createCommentVNode("", !0)], 64))]), createElementVNode("p", Je, toDisplayString(val4.reason), 1)]), createVNode(withSlots, {
        name: "expand"
      }, {
        default: toDisplayValue(() => [zz5(val4.id) ? (openBlock(), createElementBlock("div", Ke, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val4.details, (val5, val6) => (openBlock(), createElementBlock("div", {
          key: val6,
          class: "detail-item"
        }, [createElementVNode("span", Qe, toDisplayString(val5.fieldNameDisplay || zz10(val5.fieldName)), 1), val5.fieldName === "image" ? (openBlock(), createElementBlock("div", We, [val4.contributionType === 1 ? (openBlock(), createElementBlock("div", Xe, [createElementVNode("div", Ye, [val3[20] || (val3[20] = createElementVNode("span", {
          class: "image-label"
        }, "修改前", -1)), val5.oldImageUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val5.oldImageUrl,
          alt: "修改前图片",
          class: "detail-image"
        }, null, 8, es)) : (openBlock(), createElementBlock("div", ss, "无图片"))]), val3[22] || (val3[22] = createElementVNode("svg", {
          class: "arrow-icon",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M5 12h14M12 5l7 7-7 7"
        })], -1)), createElementVNode("div", as, [val3[21] || (val3[21] = createElementVNode("span", {
          class: "image-label"
        }, "修改后", -1)), val5.newImageUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val5.newImageUrl,
          alt: "修改后图片",
          class: "detail-image"
        }, null, 8, ts)) : (openBlock(), createElementBlock("div", ls, "无图片"))])])) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [val5.newImageUrl ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val5.newImageUrl,
          alt: "新建图片",
          class: "detail-image single"
        }, null, 8, os)) : (openBlock(), createElementBlock("div", ns, "未上传图片"))], 64))])) : (openBlock(), createElementBlock("div", is, [val4.contributionType === 1 && val5.oldValue !== void 0 ? (openBlock(), createElementBlock("div", rs, [createElementVNode("span", ds, toDisplayString(val5.oldValue || "（空）"), 1), val3[23] || (val3[23] = createElementVNode("svg", {
          class: "arrow-icon small",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M5 12h14M12 5l7 7-7 7"
        })], -1)), createElementVNode("span", us, toDisplayString(val5.newValue), 1)])) : (openBlock(), createElementBlock("span", vs, toDisplayString(val5.newValue), 1))]))]))), 128)), val4.status === 2 && val4.rejectReason ? (openBlock(), createElementBlock("div", cs, [val3[24] || (val3[24] = createElementVNode("svg", {
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
        })], -1)), createElementVNode("span", null, "拒绝原因：" + toDisplayString(val4.rejectReason), 1)])) : createCommentVNode("", !0), val4.reviewedAt ? (openBlock(), createElementBlock("div", ps, [createElementVNode("span", null, "审核人：" + toDisplayString(val4.reviewerUsername || "未知"), 1), createElementVNode("span", null, "审核于 " + toDisplayString(zz9(val4.reviewedAt)), 1)])) : createCommentVNode("", !0), val4.status === 0 ? (openBlock(), createElementBlock("div", ms, [createElementVNode("button", {
          class: "review-btn approve",
          onClick: withModifiers(val5 => zz6(val4, "approve"), ["stop"])
        }, [...(val3[25] || (val3[25] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "20 6 9 17 4 12"
        })], -1), createTextVNode(" 通过 ", -1)]))], 8, gs), createElementVNode("button", {
          class: "review-btn reject",
          onClick: withModifiers(val5 => zz6(val4, "reject"), ["stop"])
        }, [...(val3[26] || (val3[26] = [createElementVNode("svg", {
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
        })], -1), createTextVNode(" 拒绝 ", -1)]))], 8, fs)])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]),
        _: 2
      }, 1024)], 2))), 128)), val2.value ? (openBlock(), createElementBlock("div", ys, [createElementVNode("button", {
        class: "load-more-btn",
        disabled: refVal.value,
        onClick: zz3
      }, toDisplayString(refVal.value ? "加载中..." : "加载更多"), 9, _s)])) : refVal2.value.length > 0 ? (openBlock(), createElementBlock("div", hs, " 已加载全部 ")) : createCommentVNode("", !0)]))], 2))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz7, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val3[7] || (val3[7] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", ks, toDisplayString(refVal14.value === "approve" ? "确认通过" : "确认拒绝"), 1), createElementVNode("p", ws, toDisplayString(refVal14.value === "approve" ? "确定要通过这条反馈吗？审核通过后内容将被更新。" : "请填写拒绝原因，以便用户了解情况。"), 1), refVal14.value === "reject" ? (openBlock(), createElementBlock("div", xs, [val3[27] || (val3[27] = createElementVNode("label", {
            class: "form-label"
          }, [createTextVNode("拒绝原因 "), createElementVNode("span", {
            class: "required"
          }, "*")], -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val3[6] || (val3[6] = val4 => refVal15.value = val4),
            class: "form-textarea",
            placeholder: "请说明拒绝的原因，帮助用户改进...",
            rows: "3",
            maxlength: "200"
          }, null, 512), [[vModelText, refVal15.value]]), createElementVNode("div", bs, toDisplayString(refVal15.value.length) + "/200", 1)])) : createCommentVNode("", !0), createElementVNode("div", Cs, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz7,
            disabled: refVal16.value
          }, " 取消 ", 8, Ts), createElementVNode("button", {
            class: normalizeClass(["modal-btn confirm", refVal14.value === "approve" ? "primary" : "danger"]),
            onClick: zz8,
            disabled: refVal16.value
          }, toDisplayString(refVal16.value ? "处理中..." : refVal14.value === "approve" ? "确认通过" : "确认拒绝"), 11, Ms)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Ps = withScopeId(Is, [["__scopeId", "data-v-a540bc2e"]]);
/* index 运行时导出（已语义化） */
export { Ps as default };