/*!
 * 页面模块：评分社区管理（RatingSchoolsPage）
 * 路由：/admin/rating   name=admin-rating   层级=2   需登录=是
 * 功能：登录后的「评分社区管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingSchoolsPage-F_7no0Qr.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, unref, createVNodeWrapper, createTextVNode, createCommentVNode, toDisplayString, Fragment, normalizeClass, renderList, toDisplayValue, withSlots, withModifiers, withDirectives, vModelText, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getStatisticsOverview as mt, getContributionsPendingCount as ft, getSchoolsById2 as gt, createSchools as pt, updateSchools as ht, updateSchoolsStatus as bt, deleteSchools as yt } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb47 } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const wt = {
    class: "page-container"
  },
  xt = {
    class: "page-content"
  },
  St = {
    class: "content-container"
  },
  Mt = {
    class: "breadcrumb-wrapper"
  },
  Pt = {
    class: "page-header-section"
  },
  Dt = {
    class: "header-main"
  },
  Bt = {
    class: "header-actions"
  },
  Tt = {
    key: 0,
    class: "pending-count"
  },
  It = {
    key: 0,
    class: "loading-container"
  },
  Vt = {
    key: 0,
    class: "statistics-grid"
  },
  $t = {
    class: "stat-card"
  },
  zt = {
    class: "stat-value"
  },
  Rt = {
    class: "stat-sub"
  },
  At = {
    class: "stat-card"
  },
  Nt = {
    class: "stat-value"
  },
  Ft = {
    class: "stat-card"
  },
  Lt = {
    class: "stat-value"
  },
  jt = {
    class: "stat-card"
  },
  Ht = {
    class: "stat-value"
  },
  Ot = {
    class: "stat-sub"
  },
  Et = {
    class: "stat-card"
  },
  Ut = {
    class: "stat-value"
  },
  Gt = {
    class: "stat-card"
  },
  qt = {
    class: "stat-value"
  },
  Jt = {
    class: "status-tabs"
  },
  Kt = {
    key: 0,
    class: "empty-container"
  },
  Qt = {
    key: 1,
    class: "items-list"
  },
  Wt = ["onClick"],
  Xt = {
    class: "item-info"
  },
  Yt = {
    class: "item-header"
  },
  Zt = {
    class: "item-name"
  },
  ta = {
    class: "item-meta"
  },
  aa = {
    class: "meta-item"
  },
  ea = {
    class: "meta-item"
  },
  sa = {
    class: "item-actions"
  },
  oa = ["onClick"],
  la = ["onClick"],
  na = ["onClick"],
  ia = {
    class: "modal-title"
  },
  da = {
    class: "form-group"
  },
  ra = {
    class: "modal-actions"
  },
  ca = ["disabled"],
  ua = ["disabled"],
  va = {
    class: "modal-desc"
  },
  ma = {
    class: "modal-actions"
  },
  fa = ["disabled"],
  ga = ["disabled"],
  pa = defineComponent({
    __name: "RatingSchoolsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref(0),
        refVal4 = ref([]),
        refVal5 = ref(0),
        refVal6 = ref(1),
        refVal7 = ref(20),
        refVal8 = ref("all"),
        list = ["all", 1, 0],
        refVal9 = ref(""),
        refVal10 = ref(!1);
      watch(refVal8, (val1, val2) => {
        if (val2 === void 0) return;
        const val3 = list.indexOf(val2),
          val4 = list.indexOf(val1);
        refVal9.value = val4 > val3 ? "left" : "right", refVal10.value = !0, zz2(), nextTick(() => {
          setTimeout(() => {
            refVal10.value = !1, refVal9.value = "";
          }, 300);
        });
      });
      const refVal11 = ref(!1),
        refVal12 = ref("create"),
        refVal13 = ref(null),
        refVal14 = ref({
          name: ""
        }),
        refVal15 = ref(!1),
        refVal16 = ref(!1),
        refVal17 = ref(null),
        refVal18 = ref(!1);
      async function zz0() {
        try {
          const val1 = await mt();
          val1.data.code === 200 && (refVal2.value = val1.data.data);
        } catch (val1) {
          console.error("获取统计数据失败", val1);
        }
      }
      async function zz1() {
        try {
          const val1 = await ft();
          val1.data.code === 200 && (refVal3.value = val1.data.data);
        } catch (val1) {
          console.error("获取待审核数量失败", val1);
        }
      }
      async function zz2() {
        try {
          const obj = {
            page: refVal6.value,
            size: refVal7.value
          };
          refVal8.value !== "all" && (obj.status = refVal8.value);
          const val1 = await gt(obj);
          val1.data.code === 200 ? (refVal4.value = val1.data.data.items, refVal5.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取学校列表失败");
        } catch {
          useToast1.error("获取学校列表失败");
        }
      }
      async function zz3() {
        refVal.value = !0;
        try {
          await Promise.all([zz0(), zz2(), zz1()]);
        } finally {
          refVal.value = !1;
        }
      }
      function zz4() {
        refVal12.value = "create", refVal13.value = null, refVal14.value = {
          name: ""
        }, refVal11.value = !0;
      }
      function zz5(val1, val2) {
        val2.stopPropagation(), refVal12.value = "edit", refVal13.value = val1, refVal14.value = {
          name: val1.name
        }, refVal11.value = !0;
      }
      function zz6() {
        refVal11.value = !1, refVal13.value = null, refVal14.value = {
          name: ""
        };
      }
      async function zz7() {
        if (!refVal14.value.name.trim()) {
          useToast1.error("请填写学校名称");
          return;
        }
        refVal15.value = !0;
        try {
          if (refVal12.value === "create") {
            const val1 = await pt(refVal14.value);
            val1.data.code === 200 ? (useToast1.success("学校创建成功"), zz6(), await zz3()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal13.value) {
            const val1 = await ht(refVal13.value.id, refVal14.value);
            val1.data.code === 200 ? (useToast1.success("学校更新成功"), zz6(), await zz2()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal12.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal15.value = !1;
        }
      }
      async function zz8(val1, val2) {
        val2.stopPropagation();
        const val3 = val1.status === 1 ? 0 : 1;
        try {
          const val4 = await bt(val1.id, {
            status: val3
          });
          val4.data.code === 200 ? (useToast1.success(val3 === 1 ? "已启用" : "已禁用"), await zz2()) : useToast1.error(val4.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz9(val1, val2) {
        val2.stopPropagation(), refVal17.value = val1, refVal16.value = !0;
      }
      async function zz10() {
        if (refVal17.value) {
          refVal18.value = !0;
          try {
            const val1 = await yt(refVal17.value.id);
            val1.data.code === 200 ? (useToast1.success("学校已删除"), refVal16.value = !1, refVal17.value = null, await zz3()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal18.value = !1;
          }
        }
      }
      function zz11() {
        refVal16.value = !1, refVal17.value = null;
      }
      function zz12(val1) {
        useRouter1.push(`/admin/rating/categories?schoolId=${val1.id}`);
      }
      function zz13(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz3();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", wt, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", xt, [createElementVNode("div", St, [createElementVNode("div", Mt, [createVNode(PageBreadcrumb)]), createElementVNode("div", Pt, [createElementVNode("div", Dt, [val2[14] || (val2[14] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "评分社区管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理学校、分区和评分项目")], -1)), createElementVNode("div", Bt, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: val2[0] || (val2[0] = val3 => unref(useRouter1).push("/admin/rating/statistics"))
      }, [...(val2[9] || (val2[9] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e49e552a><path d="M3 3v18h18" data-v-e49e552a></path><path d="M18 17V9" data-v-e49e552a></path><path d="M13 17V5" data-v-e49e552a></path><path d="M8 17v-3" data-v-e49e552a></path></svg> 数据统计 ', 2)]))]), createElementVNode("button", {
        class: "action-button secondary",
        onClick: val2[1] || (val2[1] = val3 => unref(useRouter1).push("/admin/rating/contributions"))
      }, [val2[10] || (val2[10] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
      }), createElementVNode("rect", {
        x: "9",
        y: "3",
        width: "6",
        height: "4",
        rx: "1"
      }), createElementVNode("path", {
        d: "M9 12l2 2 4-4"
      })], -1)), val2[11] || (val2[11] = createTextVNode(" 审核反馈 ", -1)), refVal3.value > 0 ? (openBlock(), createElementBlock("span", Tt, toDisplayString(refVal3.value), 1)) : createCommentVNode("", !0)]), createElementVNode("button", {
        class: "action-button secondary",
        onClick: val2[2] || (val2[2] = val3 => unref(useRouter1).push("/admin/rating/collections"))
      }, [...(val2[12] || (val2[12] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e49e552a><rect x="3" y="3" width="7" height="7" data-v-e49e552a></rect><rect x="14" y="3" width="7" height="7" data-v-e49e552a></rect><rect x="3" y="14" width="7" height="7" data-v-e49e552a></rect><rect x="14" y="14" width="7" height="7" data-v-e49e552a></rect></svg> 合集管理 ', 2)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz4
      }, [...(val2[13] || (val2[13] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加学校 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", It, [...(val2[15] || (val2[15] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [refVal2.value ? (openBlock(), createElementBlock("div", Vt, [createElementVNode("div", $t, [createElementVNode("div", zt, toDisplayString(refVal2.value.schoolCount), 1), val2[16] || (val2[16] = createElementVNode("div", {
        class: "stat-label"
      }, "学校总数", -1)), createElementVNode("div", Rt, toDisplayString(refVal2.value.enabledSchoolCount) + " 个启用", 1)]), createElementVNode("div", At, [createElementVNode("div", Nt, toDisplayString(refVal2.value.majorSectionCount), 1), val2[17] || (val2[17] = createElementVNode("div", {
        class: "stat-label"
      }, "大分区", -1))]), createElementVNode("div", Ft, [createElementVNode("div", Lt, toDisplayString(refVal2.value.minorSectionCount), 1), val2[18] || (val2[18] = createElementVNode("div", {
        class: "stat-label"
      }, "小分区", -1))]), createElementVNode("div", jt, [createElementVNode("div", Ht, toDisplayString(refVal2.value.ratingItemCount), 1), val2[19] || (val2[19] = createElementVNode("div", {
        class: "stat-label"
      }, "评分项目", -1)), createElementVNode("div", Ot, toDisplayString(refVal2.value.enabledRatingItemCount) + " 个启用", 1)]), createElementVNode("div", Et, [createElementVNode("div", Ut, toDisplayString(refVal2.value.userRatingCount), 1), val2[20] || (val2[20] = createElementVNode("div", {
        class: "stat-label"
      }, "用户评分", -1))]), createElementVNode("div", Gt, [createElementVNode("div", qt, toDisplayString(refVal2.value.commentCount), 1), val2[21] || (val2[21] = createElementVNode("div", {
        class: "stat-label"
      }, "评论数", -1))])])) : createCommentVNode("", !0), val2[25] || (val2[25] = createElementVNode("div", {
        class: "section-header"
      }, [createElementVNode("h2", {
        class: "section-title"
      }, "学校列表")], -1)), createElementVNode("div", Jt, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === "all"
        }]),
        onClick: val2[3] || (val2[3] = val3 => refVal8.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === 1
        }]),
        onClick: val2[4] || (val2[4] = val3 => refVal8.value = 1)
      }, " 启用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal8.value === 0
        }]),
        onClick: val2[5] || (val2[5] = val3 => refVal8.value = 0)
      }, " 禁用 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal10.value && refVal9.value === "left",
          "slide-right": refVal10.value && refVal9.value === "right"
        }])
      }, [refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Kt, [val2[22] || (val2[22] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z"
      })])], -1)), createElementVNode("h2", null, toDisplayString(refVal8.value === "all" ? "暂无学校" : "暂无相关学校"), 1), createElementVNode("p", null, toDisplayString(refVal8.value === "all" ? "还没有添加任何学校" : "没有找到该状态的学校"), 1), refVal8.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz4
      }, " 添加第一个学校 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Qt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "item-card",
        onClick: val4 => zz12(val3)
      }, [createElementVNode("div", Xt, [createElementVNode("div", Yt, [createElementVNode("h3", Zt, toDisplayString(val3.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(statusLabel_zb47)(val3.status).class])
      }, toDisplayString(unref(statusLabel_zb47)(val3.status).label), 3)]), createElementVNode("div", ta, [createElementVNode("span", aa, toDisplayString(val3.majorSectionCount) + " 个大分区", 1), val2[23] || (val2[23] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ea, toDisplayString(zz13(val3.createdAt)), 1)])]), createElementVNode("div", sa, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val3.status === 1
        }]),
        onClick: val4 => zz8(val3, val4)
      }, toDisplayString(val3.status === 1 ? "禁用" : "启用"), 11, oa), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val4 => zz5(val3, val4)
      }, " 编辑 ", 8, la), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4 => zz9(val3, val4)
      }, " 删除 ", 8, na), val2[24] || (val2[24] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Wt))), 128))]))], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
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
            class: "modal-content",
            onClick: val2[7] || (val2[7] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", ia, toDisplayString(refVal12.value === "create" ? "添加学校" : "编辑学校"), 1), createElementVNode("div", da, [val2[26] || (val2[26] = createElementVNode("label", {
            class: "form-label"
          }, "学校名称", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[6] || (val2[6] = val3 => refVal14.value.name = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：西门一中",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal14.value.name]])]), createElementVNode("div", ra, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz6,
            disabled: refVal15.value
          }, " 取消 ", 8, ca), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz7,
            disabled: refVal15.value
          }, toDisplayString(refVal15.value ? "保存中..." : "保存"), 9, ua)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz11, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[8] || (val2[8] = withModifiers(() => {}, ["stop"]))
          }, [val2[27] || (val2[27] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", va, ' 确定要删除学校"' + toDisplayString(refVal17.value?.name) + '"吗？此操作不可撤销。 ', 1), val2[28] || (val2[28] = createElementVNode("p", {
            class: "modal-warning"
          }, "注意：如果该学校下有大分区，将无法删除。", -1)), createElementVNode("div", ma, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz11,
            disabled: refVal18.value
          }, " 取消 ", 8, fa), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz10,
            disabled: refVal18.value
          }, toDisplayString(refVal18.value ? "删除中..." : "确认删除"), 9, ga)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  xa = withScopeId(pa, [["__scopeId", "data-v-e49e552a"]]);
/* index 运行时导出（已语义化） */
export { xa as default };