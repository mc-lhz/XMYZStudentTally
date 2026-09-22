/*!
 * 页面模块：数据统计（RatingStatisticsPage）
 * 路由：/admin/rating/statistics   name=admin-rating-statistics   层级=3   需登录=是
 * 功能：登录后的「数据统计」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingStatisticsPage-CwAlkmsJ.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, Fragment, createCommentVNode, toDisplayString, normalizeClass, renderList, withDirectives, vModelText, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getStatisticsOverview, getStatisticsDailyRatings as ap } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const et = {
    class: "page-container"
  },
  at = {
    class: "page-content"
  },
  lt = {
    class: "content-container"
  },
  nt = {
    class: "breadcrumb-wrapper"
  },
  ot = {
    key: 0,
    class: "loading-container"
  },
  it = {
    key: 0,
    class: "overview-section"
  },
  rt = {
    class: "overview-grid"
  },
  ut = {
    class: "overview-card"
  },
  dt = {
    class: "overview-value"
  },
  vt = {
    class: "overview-card"
  },
  ct = {
    class: "overview-value"
  },
  pt = {
    class: "overview-card"
  },
  mt = {
    class: "overview-value"
  },
  gt = {
    class: "overview-card"
  },
  yt = {
    class: "overview-value"
  },
  ht = {
    class: "chart-section"
  },
  _t = {
    class: "range-selector"
  },
  ft = {
    class: "range-tabs"
  },
  xt = {
    key: 0,
    class: "preset-options"
  },
  wt = ["onClick"],
  bt = {
    key: 1,
    class: "custom-range"
  },
  $t = {
    class: "date-inputs"
  },
  Dt = {
    class: "chart-container"
  },
  kt = {
    key: 0,
    class: "chart-loading"
  },
  St = {
    class: "chart-summary"
  },
  Ct = {
    class: "summary-item"
  },
  Pt = {
    class: "summary-value"
  },
  Lt = {
    class: "summary-item"
  },
  Rt = {
    class: "summary-value highlight"
  },
  Mt = {
    class: "summary-item"
  },
  It = {
    class: "summary-value"
  },
  Tt = {
    class: "chart-wrapper"
  },
  Bt = {
    class: "line-chart",
    viewBox: "0 0 100 60",
    preserveAspectRatio: "none"
  },
  Ft = ["d"],
  Vt = ["d"],
  Nt = ["cx", "cy"],
  Ot = {
    class: "y-axis"
  },
  jt = {
    key: 0,
    class: "x-axis"
  },
  zt = {
    key: 0
  },
  At = {
    class: "data-list"
  },
  Et = {
    class: "data-date"
  },
  Ut = {
    class: "data-count"
  },
  Zt = {
    key: 2,
    class: "chart-empty"
  },
  Ht = defineComponent({
    __name: "RatingStatisticsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        loading = ref(!0),
        loadingDaily = ref(!1),
        overview = ref(null),
        dailyData = ref(null),
        rangeMode = ref("preset"),
        presetDays = ref("last7days"),
        startDate = ref(""),
        endDate = ref(""),
        list = [{
          value: "today",
          label: "今日"
        }, {
          value: "yesterday",
          label: "昨日"
        }, {
          value: "last7days",
          label: "近7天"
        }, {
          value: "last30days",
          label: "近30天"
        }];
      async function zz0() {
        try {
          const val1 = await getStatisticsOverview();
          val1.data.code === 200 && (overview.value = val1.data.data);
        } catch (val1) {
          console.error("获取统计概览失败", val1);
        }
      }
      async function zz1() {
        loadingDaily.value = !0;
        try {
          const val1 = rangeMode.value === "preset" ? {
              preset: presetDays.value
            } : {
              startDate: startDate.value,
              endDate: endDate.value
            },
            val6 = await ap(val1);
          val6.data.code === 200 ? dailyData.value = val6.data.data : useToast1.error(val6.data.message || "获取数据失败");
        } catch {
          useToast1.error("获取数据失败");
        } finally {
          loadingDaily.value = !1;
        }
      }
      watch([presetDays], () => {
        rangeMode.value === "preset" && zz1();
      });
      function zz2() {
        if (!startDate.value || !endDate.value) {
          useToast1.error("请选择开始和结束日期");
          return;
        }
        if (startDate.value > endDate.value) {
          useToast1.error("开始日期不能晚于结束日期");
          return;
        }
        zz1();
      }
      function zz3(val1) {
        rangeMode.value = val1, val1 === "preset" && zz1();
      }
      const val2 = applyDirectives(() => {
          if (!dailyData.value || dailyData.value.dailyStats.length === 0) return null;
          const val1 = dailyData.value.dailyStats,
            val6 = Math.max(...val1.map(val7 => val7.count), 1);
          return {
            stats: val1,
            maxCount: val6,
            width: 100,
            height: 60,
            points: val1.map((val7, val8) => ({
              x: val1.length === 1 ? 50 : val8 / (val1.length - 1) * 100,
              y: 60 - val7.count / val6 * 55 - 2.5,
              date: val7.date,
              count: val7.count
            }))
          };
        }),
        val3 = applyDirectives(() => {
          if (!val2.value || val2.value.points.length === 0) return "";
          const val1 = val2.value.points,
            val6 = val1[0];
          return val6 ? val1.length === 1 ? `M ${val6.x} ${val6.y}` : val1.map((val7, val8) => `${val8 === 0 ? "M" : "L"} ${val7.x} ${val7.y}`).join(" ") : "";
        }),
        val4 = applyDirectives(() => {
          if (!val2.value || val2.value.points.length === 0) return "";
          const val1 = val2.value.points,
            val6 = val2.value.height,
            val7 = val1[0],
            val8 = val1[val1.length - 1];
          if (!val7 || !val8) return "";
          if (val1.length === 1) return `M ${val7.x} ${val6} L ${val7.x} ${val7.y} L ${val7.x} ${val6} Z`;
          const text = `M ${val7.x} ${val6}`,
            val9 = val1.map(val10 => `L ${val10.x} ${val10.y}`).join(" "),
            text2 = `L ${val8.x} ${val6} Z`;
          return `${text} ${val9} ${text2}`;
        }),
        val5 = applyDirectives(() => {
          if (!val2.value || val2.value.stats.length === 0) return null;
          const val1 = val2.value.stats,
            val6 = val1[0],
            val7 = val1[val1.length - 1],
            val8 = val1.length > 2 ? val1[Math.floor(val1.length / 2)] : null;
          return !val6 || !val7 ? null : {
            first: val6,
            mid: val8,
            last: val7
          };
        });
      function zz4(val1) {
        const date = new Date(val1);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
      function zz5(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      async function zz6() {
        loading.value = !0;
        try {
          const date = new Date(),
            date2 = new Date();
          date2.setDate(date.getDate() - 6), endDate.value = date.toISOString().split("T")[0] ?? "", startDate.value = date2.toISOString().split("T")[0] ?? "", await Promise.all([zz0(), zz1()]);
        } finally {
          loading.value = !1;
        }
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz6();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", et, [createVNode(PageHeader, {
        "back-to": "/admin/rating"
      }), createElementVNode("main", at, [createElementVNode("div", lt, [createElementVNode("div", nt, [createVNode(PageBreadcrumb)]), val6[22] || (val6[22] = createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "数据统计"), createElementVNode("p", {
        class: "page-subtitle"
      }, "查看评分社区的数据统计")])], -1)), loading.value ? (openBlock(), createElementBlock("div", ot, [...(val6[4] || (val6[4] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [overview.value ? (openBlock(), createElementBlock("div", it, [val6[9] || (val6[9] = createElementVNode("h2", {
        class: "section-title"
      }, "数据概览", -1)), createElementVNode("div", rt, [createElementVNode("div", ut, [createElementVNode("div", dt, toDisplayString(overview.value.userRatingCount), 1), val6[5] || (val6[5] = createElementVNode("div", {
        class: "overview-label"
      }, "总评分数", -1))]), createElementVNode("div", vt, [createElementVNode("div", ct, toDisplayString(overview.value.commentCount), 1), val6[6] || (val6[6] = createElementVNode("div", {
        class: "overview-label"
      }, "总评论数", -1))]), createElementVNode("div", pt, [createElementVNode("div", mt, toDisplayString(overview.value.ratingItemCount), 1), val6[7] || (val6[7] = createElementVNode("div", {
        class: "overview-label"
      }, "评分项目", -1))]), createElementVNode("div", gt, [createElementVNode("div", yt, toDisplayString(overview.value.enabledRatingItemCount), 1), val6[8] || (val6[8] = createElementVNode("div", {
        class: "overview-label"
      }, "已启用项目", -1))])])])) : createCommentVNode("", !0), createElementVNode("div", ht, [val6[21] || (val6[21] = createElementVNode("h2", {
        class: "section-title"
      }, "评分趋势", -1)), createElementVNode("div", _t, [createElementVNode("div", ft, [createElementVNode("button", {
        class: normalizeClass(["range-tab", {
          active: rangeMode.value === "preset"
        }]),
        onClick: val6[0] || (val6[0] = val7 => zz3("preset"))
      }, " 预设 ", 2), createElementVNode("button", {
        class: normalizeClass(["range-tab", {
          active: rangeMode.value === "custom"
        }]),
        onClick: val6[1] || (val6[1] = val7 => zz3("custom"))
      }, " 自定义 ", 2)]), rangeMode.value === "preset" ? (openBlock(), createElementBlock("div", xt, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val7 => createElementVNode("button", {
        key: val7.value,
        class: normalizeClass(["preset-btn", {
          active: presetDays.value === val7.value
        }]),
        onClick: val8 => presetDays.value = val7.value
      }, toDisplayString(val7.label), 11, wt)), 64))])) : (openBlock(), createElementBlock("div", bt, [createElementVNode("div", $t, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[2] || (val6[2] = val7 => startDate.value = val7),
        type: "date",
        class: "date-input"
      }, null, 512), [[vModelText, startDate.value]]), val6[10] || (val6[10] = createElementVNode("span", {
        class: "date-separator"
      }, "至", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[3] || (val6[3] = val7 => endDate.value = val7),
        type: "date",
        class: "date-input"
      }, null, 512), [[vModelText, endDate.value]])]), createElementVNode("button", {
        class: "apply-btn",
        onClick: zz2
      }, " 查询 ")]))]), createElementVNode("div", Dt, [loadingDaily.value ? (openBlock(), createElementBlock("div", kt, [...(val6[11] || (val6[11] = [createElementVNode("div", {
        class: "loading-spinner small"
      }, null, -1)]))])) : dailyData.value && val2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", St, [createElementVNode("div", Ct, [val6[12] || (val6[12] = createElementVNode("span", {
        class: "summary-label"
      }, "时间范围", -1)), createElementVNode("span", Pt, toDisplayString(zz5(dailyData.value.startDate)) + " - " + toDisplayString(zz5(dailyData.value.endDate)), 1)]), createElementVNode("div", Lt, [val6[13] || (val6[13] = createElementVNode("span", {
        class: "summary-label"
      }, "总评分数", -1)), createElementVNode("span", Rt, toDisplayString(dailyData.value.totalRatings), 1)]), createElementVNode("div", Mt, [val6[14] || (val6[14] = createElementVNode("span", {
        class: "summary-label"
      }, "日均评分", -1)), createElementVNode("span", It, toDisplayString(dailyData.value.totalDays > 0 ? (dailyData.value.totalRatings / dailyData.value.totalDays).toFixed(1) : 0), 1)])]), createElementVNode("div", Tt, [(openBlock(), createElementBlock("svg", Bt, [val6[15] || (val6[15] = createElementVNode("line", {
        x1: "0",
        y1: "15",
        x2: "100",
        y2: "15",
        class: "grid-line"
      }, null, -1)), val6[16] || (val6[16] = createElementVNode("line", {
        x1: "0",
        y1: "30",
        x2: "100",
        y2: "30",
        class: "grid-line"
      }, null, -1)), val6[17] || (val6[17] = createElementVNode("line", {
        x1: "0",
        y1: "45",
        x2: "100",
        y2: "45",
        class: "grid-line"
      }, null, -1)), createElementVNode("path", {
        d: val4.value,
        class: "chart-area"
      }, null, 8, Ft), createElementVNode("path", {
        d: val3.value,
        class: "chart-line"
      }, null, 8, Vt), (openBlock(!0), createElementBlock(Fragment, null, renderList(val2.value.points, (val7, val8) => (openBlock(), createElementBlock("circle", {
        key: val8,
        cx: val7.x,
        cy: val7.y,
        r: "1.5",
        class: "chart-point"
      }, null, 8, Nt))), 128))])), createElementVNode("div", Ot, [createElementVNode("span", null, toDisplayString(val2.value.maxCount), 1), createElementVNode("span", null, toDisplayString(Math.round(val2.value.maxCount / 2)), 1), val6[18] || (val6[18] = createElementVNode("span", null, "0", -1))])]), val2.value.points.length > 1 && val5.value ? (openBlock(), createElementBlock("div", jt, [createElementVNode("span", null, toDisplayString(zz4(val5.value.first.date)), 1), val5.value.mid ? (openBlock(), createElementBlock("span", zt, toDisplayString(zz4(val5.value.mid.date)), 1)) : createCommentVNode("", !0), createElementVNode("span", null, toDisplayString(zz4(val5.value.last.date)), 1)])) : createCommentVNode("", !0), createElementVNode("div", At, [val6[19] || (val6[19] = createElementVNode("div", {
        class: "data-list-header"
      }, [createElementVNode("span", null, "日期"), createElementVNode("span", null, "评分数")], -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList([...dailyData.value.dailyStats].reverse(), val7 => (openBlock(), createElementBlock("div", {
        key: val7.date,
        class: "data-list-item"
      }, [createElementVNode("span", Et, toDisplayString(zz5(val7.date)), 1), createElementVNode("span", Ut, toDisplayString(val7.count), 1)]))), 128))])], 64)) : (openBlock(), createElementBlock("div", Zt, [...(val6[20] || (val6[20] = [createElementVNode("p", null, "暂无数据", -1)]))]))])])], 64))])]), createVNode(PageFooter)]));
    }
  }),
  Xt = withScopeId(Ht, [["__scopeId", "data-v-2f893815"]]);
/* index 运行时导出（已语义化） */
export { Xt as default };