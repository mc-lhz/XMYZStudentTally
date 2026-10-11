/*!
 * 页面模块：考试详情（GradeExamDetailPage）
 * 路由：/grade/:examId   name=grade-exam-detail   层级=2   需登录=是
 * 功能：登录后的「考试详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/GradeExamDetailPage-DHgL2_mY.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, unref, resolveRaw, createTextVNode, renderList, useToast, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 grade（站点内功能模块） */
import { getGradeTypeName, getGradeExamsById } from "./grade-BOUREyqU.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 模板属性配置：page-content */
/* 模板属性配置：content-container */
/* 模板属性配置：loading-container */
/* 模板属性配置：exam-header-section */
/* 模板属性配置：exam-header-card */
/* 模板属性配置：exam-title-row */
/* 模板属性配置：exam-title */
/* 模板属性配置：exam-type */
/* 模板属性配置：exam-time */
/* 模板属性配置：total-score */
/* 模板属性配置：score-main */
const GradeExamDetailPageConfig = {
    class: "page-container"
  },
  GradeExamDetailPageConfig_2 = {
    class: "page-content"
  },
  GradeExamDetailPageConfig_3 = {
    class: "content-container"
  },
  GradeExamDetailPageConfig_4 = {
    class: "breadcrumb-wrapper"
  },
  GradeExamDetailPageConfig_5 = {
    key: 0,
    class: "loading-container"
  },
  GradeExamDetailPageConfig_6 = {
    class: "exam-header-section"
  },
  GradeExamDetailPageConfig_7 = {
    class: "exam-header-card"
  },
  GradeExamDetailPageConfig_8 = {
    class: "exam-title-row"
  },
  GradeExamDetailPageConfig_9 = {
    class: "exam-title"
  },
  GradeExamDetailPageConfig_10 = {
    class: "exam-type"
  },
  GradeExamDetailPageConfig_11 = {
    class: "exam-time"
  },
  GradeExamDetailPageConfig_12 = {
    class: "total-score"
  },
  GradeExamDetailPageConfig_13 = {
    class: "score-main"
  },
  GradeExamDetailPageConfig_14 = {
    class: "score-value"
  },
  ss = {
    class: "score-full"
  },
  as = {
    class: "score-progress"
  },
  es = {
    class: "rank-section"
  },
  os = {
    class: "rank-cards"
  },
  ts = {
    class: "rank-card"
  },
  ns = {
    class: "rank-header"
  },
  rs = {
    class: "rank-total"
  },
  ls = {
    class: "rank-value"
  },
  cs = {
    class: "rank-defeat"
  },
  is = {
    class: "defeat-value"
  },
  ds = {
    class: "rank-card"
  },
  us = {
    class: "rank-header"
  },
  ms = {
    class: "rank-total"
  },
  vs = {
    class: "rank-value"
  },
  ps = {
    class: "rank-defeat"
  },
  _s = {
    class: "defeat-value"
  },
  fs = {
    key: 0,
    class: "compare-section"
  },
  gs = {
    class: "compare-card"
  },
  hs = {
    class: "compare-row"
  },
  ks = {
    class: "compare-value"
  },
  ys = {
    class: "compare-row"
  },
  bs = {
    class: "compare-value"
  },
  xs = {
    class: "compare-row"
  },
  Is = {
    class: "compare-value"
  },
  ws = {
    class: "compare-row"
  },
  Ds = {
    class: "compare-value"
  },
  Ns = {
    class: "subjects-section"
  },
  Ss = {
    class: "subjects-list"
  },
  Ps = {
    class: "subject-info"
  },
  Rs = {
    class: "subject-name"
  },
  Es = {
    class: "subject-score"
  },
  Ls = {
    class: "subject-score-value"
  },
  Bs = {
    class: "subject-score-full"
  },
  Cs = {
    class: "subject-progress"
  },
  Ts = defineComponent({
    __name: "GradeExamDetailPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.examId)),
        refVal = ref(!0),
        refVal2 = ref(null);
      async function zz0() {
        try {
          const val1 = await getGradeExamsById(val3.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : (useToast1.error(val1.data.message || "获取考试详情失败"), useRouter1.push("/grade"));
        } catch {
          useToast1.error("网络错误，请稍后重试"), useRouter1.push("/grade");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
      function zz2(val1, val4) {
        return Math.round(val1 / val4 * 100);
      }
      function zz3(val1) {
        return val1 >= 85 ? "var(--color-success)" : val1 >= 70 ? "var(--color-primary)" : val1 >= 60 ? "var(--color-warning)" : "var(--color-error)";
      }
      return watch(() => useUserStore1.isLoggedIn, val1 => {
        val1 && zz0();
      }), onMounted(() => {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal("请先登录以查看成绩"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", GradeExamDetailPageConfig, [createVNode(PageHeader, {
        "back-to": "/grade"
      }), createElementVNode("main", GradeExamDetailPageConfig_2, [createElementVNode("div", GradeExamDetailPageConfig_3, [createElementVNode("div", GradeExamDetailPageConfig_4, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", GradeExamDetailPageConfig_5, [...(val4[0] || (val4[0] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("section", GradeExamDetailPageConfig_6, [createElementVNode("div", GradeExamDetailPageConfig_7, [createElementVNode("div", GradeExamDetailPageConfig_8, [createElementVNode("h1", GradeExamDetailPageConfig_9, toDisplayString(refVal2.value.name), 1), createElementVNode("span", GradeExamDetailPageConfig_10, toDisplayString(unref(getGradeTypeName)(refVal2.value.type)), 1)]), createElementVNode("p", GradeExamDetailPageConfig_11, toDisplayString(zz1(refVal2.value.time)), 1), createElementVNode("div", GradeExamDetailPageConfig_12, [createElementVNode("div", GradeExamDetailPageConfig_13, [createElementVNode("span", GradeExamDetailPageConfig_14, toDisplayString(refVal2.value.score), 1), val4[1] || (val4[1] = createElementVNode("span", {
        class: "score-divider"
      }, "/", -1)), createElementVNode("span", ss, toDisplayString(refVal2.value.manfen), 1)]), createElementVNode("div", {
        class: "score-rate",
        style: resolveRaw({
          color: zz3(zz2(refVal2.value.score, refVal2.value.manfen))
        })
      }, toDisplayString(zz2(refVal2.value.score, refVal2.value.manfen)) + "% ", 5)]), createElementVNode("div", as, [createElementVNode("div", {
        class: "progress-bar",
        style: resolveRaw({
          width: zz2(refVal2.value.score, refVal2.value.manfen) + "%",
          background: zz3(zz2(refVal2.value.score, refVal2.value.manfen))
        })
      }, null, 4)])])]), createElementVNode("section", es, [val4[8] || (val4[8] = createElementVNode("h2", {
        class: "section-title"
      }, "排名信息", -1)), createElementVNode("div", os, [createElementVNode("div", ts, [createElementVNode("div", ns, [val4[2] || (val4[2] = createElementVNode("span", {
        class: "rank-label"
      }, "班级排名", -1)), createElementVNode("span", rs, "共 " + toDisplayString(refVal2.value.rankInfo.classStuNum) + " 人", 1)]), createElementVNode("div", ls, toDisplayString(refVal2.value.rankInfo.classRank), 1), createElementVNode("div", cs, [val4[3] || (val4[3] = createTextVNode(" 超越 ", -1)), createElementVNode("span", is, toDisplayString(refVal2.value.rankInfo.classDefeatRatio) + "%", 1), val4[4] || (val4[4] = createTextVNode(" 同学 ", -1))])]), createElementVNode("div", ds, [createElementVNode("div", us, [val4[5] || (val4[5] = createElementVNode("span", {
        class: "rank-label"
      }, "年级排名", -1)), createElementVNode("span", ms, "共 " + toDisplayString(refVal2.value.rankInfo.gradeStuNum) + " 人", 1)]), createElementVNode("div", vs, toDisplayString(refVal2.value.rankInfo.gradeRank), 1), createElementVNode("div", ps, [val4[6] || (val4[6] = createTextVNode(" 超越 ", -1)), createElementVNode("span", _s, toDisplayString(refVal2.value.rankInfo.gradeDefeatRatio) + "%", 1), val4[7] || (val4[7] = createTextVNode(" 同学 ", -1))])])])]), refVal2.value.compareInfo ? (openBlock(), createElementBlock("section", fs, [val4[14] || (val4[14] = createElementVNode("h2", {
        class: "section-title"
      }, "成绩对比", -1)), createElementVNode("div", gs, [createElementVNode("div", hs, [val4[9] || (val4[9] = createElementVNode("span", {
        class: "compare-label"
      }, "班级最高分", -1)), createElementVNode("span", ks, toDisplayString(refVal2.value.compareInfo.classHighest ?? "-"), 1)]), createElementVNode("div", ys, [val4[10] || (val4[10] = createElementVNode("span", {
        class: "compare-label"
      }, "班级平均分", -1)), createElementVNode("span", bs, toDisplayString(refVal2.value.compareInfo.classAvg ?? "-"), 1)]), val4[13] || (val4[13] = createElementVNode("div", {
        class: "compare-divider"
      }, null, -1)), createElementVNode("div", xs, [val4[11] || (val4[11] = createElementVNode("span", {
        class: "compare-label"
      }, "年级最高分", -1)), createElementVNode("span", Is, toDisplayString(refVal2.value.compareInfo.gradeHighest ?? "-"), 1)]), createElementVNode("div", ws, [val4[12] || (val4[12] = createElementVNode("span", {
        class: "compare-label"
      }, "年级平均分", -1)), createElementVNode("span", Ds, toDisplayString(refVal2.value.compareInfo.gradeAvg ?? "-"), 1)])])])) : createCommentVNode("", !0), createElementVNode("section", Ns, [val4[15] || (val4[15] = createElementVNode("h2", {
        class: "section-title"
      }, "科目成绩", -1)), createElementVNode("div", Ss, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.subjects, val5 => (openBlock(), createElementBlock("div", {
        key: val5.paperId,
        class: "subject-card"
      }, [createElementVNode("div", Ps, [createElementVNode("span", Rs, toDisplayString(val5.subject), 1), createElementVNode("span", Es, [createElementVNode("span", Ls, toDisplayString(val5.score), 1), createElementVNode("span", Bs, "/ " + toDisplayString(val5.manfen), 1)])]), createElementVNode("div", Cs, [createElementVNode("div", {
        class: "progress-bar",
        style: resolveRaw({
          width: zz2(val5.score, val5.manfen) + "%",
          background: zz3(zz2(val5.score, val5.manfen))
        })
      }, null, 4)]), createElementVNode("div", {
        class: "subject-rate",
        style: resolveRaw({
          color: zz3(zz2(val5.score, val5.manfen))
        })
      }, toDisplayString(zz2(val5.score, val5.manfen)) + "% ", 5)]))), 128))])])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter)]));
    }
  }),
  As = withScopeId(Ts, [["__scopeId", "data-v-f1259e7e"]]);
/* index 运行时导出（已语义化） */
export { As as default };