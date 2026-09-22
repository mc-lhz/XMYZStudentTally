/*!
 * 页面模块：审核投稿（CampaignReviewPage-DIC-1GaW）
 * 路由：/admin/campaigns/:id/review   name=admin-campaigns-review   层级=3   需登录=是
 * 功能：登录后的「审核投稿」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampaignReviewPage-DIC-1GaW.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayString, Fragment, renderList, toDisplayValue, withSlots, normalizeClass, withModifiers, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getCampaignsById, getAdminReviewCampaignsSubmissions, deleteAdminReviewSubmissions } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const ts = {
    class: "page-container"
  },
  as = {
    class: "page-content"
  },
  ns = {
    class: "content-container"
  },
  is = {
    class: "breadcrumb-wrapper"
  },
  ls = {
    class: "page-header-section"
  },
  cs = {
    class: "header-main"
  },
  ds = {
    class: "header-text"
  },
  rs = {
    key: 0,
    class: "page-subtitle"
  },
  us = {
    key: 0,
    class: "loading-container"
  },
  vs = {
    class: "action-bar"
  },
  ms = {
    class: "selection-info"
  },
  _s = {
    key: 0
  },
  fs = {
    key: 1
  },
  hs = {
    class: "action-buttons"
  },
  ps = ["disabled"],
  bs = {
    key: 0,
    class: "empty-container"
  },
  gs = {
    key: 1,
    class: "period-groups"
  },
  ks = ["onClick"],
  ys = {
    class: "period-info"
  },
  Cs = {
    class: "period-name"
  },
  Ps = {
    class: "period-count"
  },
  ws = {
    key: 0,
    class: "submissions-list"
  },
  xs = {
    class: "submissions-header"
  },
  Es = ["onClick"],
  Ss = ["onClick"],
  Is = ["onClick"],
  Bs = {
    class: "submission-checkbox"
  },
  Ms = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3"
  },
  Rs = {
    class: "music-cover"
  },
  Vs = ["src", "alt"],
  As = {
    key: 1,
    class: "cover-placeholder"
  },
  Ns = {
    class: "music-info"
  },
  $s = {
    class: "music-name"
  },
  Fs = {
    class: "music-artist"
  },
  Ls = {
    class: "music-meta"
  },
  Ts = {
    class: "meta-item"
  },
  zs = {
    class: "meta-item"
  },
  Hs = {
    class: "submission-count"
  },
  js = {
    class: "count-value"
  },
  qs = {
    class: "modal-desc"
  },
  Us = {
    class: "modal-actions"
  },
  Gs = ["disabled"],
  Js = ["disabled"],
  Ks = defineComponent({
    __name: "CampaignReviewPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(new Set()),
        refVal5 = ref(!1),
        refVal6 = ref(new Set()),
        refVal7 = ref(!1);
      async function zz0() {
        refVal.value = !0;
        try {
          const [val1, val6] = await Promise.all([getCampaignsById(val3.value), getAdminReviewCampaignsSubmissions(val3.value)]);
          if (val1.data.code === 200) refVal2.value = val1.data.data;else {
            useToast1.error(val1.data.message || "获取活动详情失败");
            return;
          }
          if (val6.data.code === 200) {
            refVal3.value = val6.data.data;
            const val7 = refVal3.value[0];
            val7 && refVal6.value.add(val7.timePeriod.id);
          } else useToast1.error(val6.data.message || "获取投稿列表失败");
        } catch {
          useToast1.error("加载数据失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
        refVal6.value.has(val1) ? refVal6.value.delete(val1) : refVal6.value.add(val1);
      }
      function zz2(val1) {
        return refVal6.value.has(val1);
      }
      function zz3(val1) {
        val1.every(val6 => refVal4.value.has(val6)) ? val1.forEach(val6 => refVal4.value.delete(val6)) : val1.forEach(val6 => refVal4.value.add(val6));
      }
      function zz4(val1) {
        return val1.some(val6 => refVal4.value.has(val6));
      }
      function zz5(val1) {
        val1.submissions.forEach(val6 => {
          val6.submissionIds.forEach(val7 => refVal4.value.add(val7));
        });
      }
      function zz6(val1) {
        val1.submissions.forEach(val6 => {
          val6.submissionIds.forEach(val7 => refVal4.value.delete(val7));
        });
      }
      function zz7() {
        refVal3.value.forEach(val1 => {
          val1.submissions.forEach(val6 => {
            val6.submissionIds.forEach(val7 => refVal4.value.add(val7));
          });
        });
      }
      function zz8() {
        const set = new Set();
        refVal3.value.forEach(val1 => {
          val1.submissions.forEach(val6 => {
            val6.submissionIds.forEach(val7 => set.add(val7));
          });
        }), set.forEach(val1 => {
          refVal4.value.has(val1) ? refVal4.value.delete(val1) : refVal4.value.add(val1);
        });
      }
      const val4 = applyDirectives(() => refVal4.value.size),
        val5 = applyDirectives(() => {
          let num = 0;
          return refVal3.value.forEach(val1 => {
            val1.submissions.forEach(val6 => {
              num += val6.submissionIds.length;
            });
          }), num;
        });
      function zz9() {
        if (val4.value === 0) {
          useToast1.warning("请先选择要删除的投稿");
          return;
        }
        refVal7.value = !0;
      }
      async function zz10() {
        if (val4.value !== 0) {
          refVal5.value = !0;
          try {
            const val1 = await deleteAdminReviewSubmissions({
              submissionIds: Array.from(refVal4.value)
            });
            val1.data.code === 200 ? (useToast1.success("已删除选中投稿"), refVal7.value = !1, refVal4.value.clear(), await zz0()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal5.value = !1;
          }
        }
      }
      function zz11() {
        refVal7.value = !1;
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", ts, [createVNode(PageHeader, {
        "back-to": "/admin/campaigns"
      }), createElementVNode("main", as, [createElementVNode("div", ns, [createElementVNode("div", is, [createVNode(PageBreadcrumb)]), createElementVNode("div", ls, [createElementVNode("div", cs, [createElementVNode("div", ds, [val6[1] || (val6[1] = createElementVNode("h1", {
        class: "page-title"
      }, "审核投稿", -1)), refVal2.value ? (openBlock(), createElementBlock("p", rs, toDisplayString(refVal2.value.title), 1)) : createCommentVNode("", !0)])])]), refVal.value ? (openBlock(), createElementBlock("div", us, [...(val6[2] || (val6[2] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", vs, [createElementVNode("div", ms, [val4.value > 0 ? (openBlock(), createElementBlock("span", _s, "已选择 " + toDisplayString(val4.value) + " / " + toDisplayString(val5.value) + " 条", 1)) : (openBlock(), createElementBlock("span", fs, "共 " + toDisplayString(val5.value) + " 条投稿", 1))]), createElementVNode("div", hs, [createElementVNode("button", {
        class: "action-btn select",
        onClick: zz7
      }, " 全选 "), createElementVNode("button", {
        class: "action-btn select",
        onClick: zz8
      }, " 反选 "), createElementVNode("button", {
        class: "action-btn delete",
        disabled: val4.value === 0 || refVal5.value,
        onClick: zz9
      }, " 批量删除 ", 8, ps)])]), refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", bs, [...(val6[3] || (val6[3] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      })])], -1), createElementVNode("h2", null, "暂无投稿", -1), createElementVNode("p", null, "该活动还没有收到任何投稿", -1)]))])) : (openBlock(), createElementBlock("div", gs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val7 => (openBlock(), createElementBlock("div", {
        key: val7.timePeriod.id,
        class: "period-group"
      }, [createElementVNode("div", {
        class: "period-header",
        onClick: val8 => zz1(val7.timePeriod.id)
      }, [createElementVNode("div", ys, [createElementVNode("h3", Cs, toDisplayString(val7.timePeriod.name), 1), createElementVNode("span", Ps, toDisplayString(val7.submissions.length) + " 首音乐", 1)]), createElementVNode("div", {
        class: normalizeClass(["expand-icon", {
          expanded: zz2(val7.timePeriod.id)
        }])
      }, [...(val6[4] || (val6[4] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1)]))], 2)], 8, ks), createVNode(withSlots, {
        name: "expand"
      }, {
        default: toDisplayValue(() => [zz2(val7.timePeriod.id) ? (openBlock(), createElementBlock("div", ws, [createElementVNode("div", xs, [createElementVNode("button", {
          class: "text-btn-sm",
          onClick: withModifiers(val8 => zz5(val7), ["stop"])
        }, "全选本时段", 8, Es), createElementVNode("button", {
          class: "text-btn-sm",
          onClick: withModifiers(val8 => zz6(val7), ["stop"])
        }, "取消", 8, Ss)]), (openBlock(!0), createElementBlock(Fragment, null, renderList(val7.submissions, val8 => (openBlock(), createElementBlock("div", {
          key: val8.music.id,
          class: normalizeClass(["submission-item", {
            selected: zz4(val8.submissionIds)
          }]),
          onClick: val9 => zz3(val8.submissionIds)
        }, [createElementVNode("div", Bs, [createElementVNode("div", {
          class: normalizeClass(["checkbox", {
            checked: zz4(val8.submissionIds)
          }])
        }, [zz4(val8.submissionIds) ? (openBlock(), createElementBlock("svg", Ms, [...(val6[5] || (val6[5] = [createElementVNode("polyline", {
          points: "20 6 9 17 4 12"
        }, null, -1)]))])) : createCommentVNode("", !0)], 2)]), createElementVNode("div", Rs, [val8.music.cover ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: val8.music.cover,
          alt: val8.music.song
        }, null, 8, Vs)) : (openBlock(), createElementBlock("div", As, [...(val6[6] || (val6[6] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M9 18V5l12-2v13"
        }), createElementVNode("circle", {
          cx: "6",
          cy: "18",
          r: "3"
        }), createElementVNode("circle", {
          cx: "18",
          cy: "16",
          r: "3"
        })], -1)]))]))]), createElementVNode("div", Ns, [createElementVNode("h4", $s, toDisplayString(val8.music.song), 1), createElementVNode("p", Fs, toDisplayString(val8.music.singer), 1), createElementVNode("div", Ls, [createElementVNode("span", Ts, toDisplayString(val8.music.album), 1), val6[7] || (val6[7] = createElementVNode("span", {
          class: "meta-divider"
        }, "|", -1)), createElementVNode("span", zs, toDisplayString(val8.music.interval), 1)])]), createElementVNode("div", Hs, [createElementVNode("span", js, toDisplayString(val8.submissionCount), 1), val6[8] || (val6[8] = createElementVNode("span", {
          class: "count-label"
        }, "人投稿", -1))])], 10, Is))), 128))])) : createCommentVNode("", !0)]),
        _: 2
      }, 1024)]))), 128))]))], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal7.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz11, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal7.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val6[0] || (val6[0] = withModifiers(() => {}, ["stop"]))
          }, [val6[9] || (val6[9] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", qs, " 确定要删除选中的 " + toDisplayString(val4.value) + " 条投稿吗？此操作不可撤销。 ", 1), createElementVNode("div", Us, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz11,
            disabled: refVal5.value
          }, "取消", 8, Gs), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz10,
            disabled: refVal5.value
          }, toDisplayString(refVal5.value ? "删除中..." : "确认删除"), 9, Js)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  se = withScopeId(Ks, [["__scopeId", "data-v-0cf90f1b"]]);
/* index 运行时导出（已语义化） */
export { se as default };