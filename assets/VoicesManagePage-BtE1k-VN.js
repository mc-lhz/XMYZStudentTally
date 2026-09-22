/*!
 * 页面模块：跨代留声管理（VoicesManagePage-BtE1k-VN）
 * 路由：/admin/voices   name=admin-voices   层级=2   需登录=是
 * 功能：登录后的「跨代留声管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesManagePage-BtE1k-VN.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayValue, resolveAsset, Fragment, renderList, toDisplayString, normalizeClass, withDirectives, deepDirectiveOptions, vModelText, withKeys, useToast, createTextVNode, unref, createBlock, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { getAdminVoicesStats as vt, getAdminVoicesQuestions as bt, getAdminVoicesAnswers as pt, getAdminVoicesReports as yt, helper_zb59, takedownAdminVoicesQuestions, restoreAdminVoicesQuestions as kt, takedownAdminVoicesAnswers, restoreAdminVoicesAnswers as mt, handleAdminVoicesReports } from "./voices-DF_9WYD3.js";
const gt = {
    class: "page-container"
  },
  wt = {
    class: "page-content"
  },
  ft = {
    class: "content-container"
  },
  _t = {
    class: "page-title-row"
  },
  ht = {
    class: "tabs"
  },
  Ct = ["onClick"],
  $t = {
    key: 0
  },
  It = {
    key: 0,
    class: "stats-grid"
  },
  Vt = {
    class: "stat-card"
  },
  St = {
    class: "stat-num"
  },
  Tt = {
    class: "stat-card"
  },
  At = {
    class: "stat-num"
  },
  Pt = {
    class: "stat-card"
  },
  Ut = {
    class: "stat-num"
  },
  Lt = {
    class: "stat-card"
  },
  Rt = {
    class: "stat-num"
  },
  Dt = {
    class: "stat-card"
  },
  Qt = {
    key: 1,
    class: "identity-stats"
  },
  zt = {
    key: 1
  },
  Kt = {
    class: "filter-row"
  },
  Mt = {
    class: "total-hint"
  },
  Nt = {
    class: "table-wrap"
  },
  Bt = {
    class: "data-table"
  },
  Gt = {
    class: "col-content"
  },
  Ht = {
    class: "col-time"
  },
  Et = ["onClick"],
  Ft = {
    key: 0
  },
  qt = {
    class: "pager"
  },
  xt = ["disabled"],
  Zt = ["disabled"],
  jt = {
    key: 2
  },
  Ot = {
    class: "filter-row"
  },
  Jt = {
    class: "total-hint"
  },
  Wt = {
    class: "table-wrap"
  },
  Xt = {
    class: "data-table"
  },
  Yt = {
    class: "col-content"
  },
  te = {
    class: "col-content"
  },
  ee = {
    class: "col-time"
  },
  se = ["onClick"],
  ae = {
    key: 0
  },
  ne = {
    class: "pager"
  },
  oe = ["disabled"],
  le = ["disabled"],
  ue = {
    key: 3
  },
  ie = {
    class: "filter-row"
  },
  de = {
    class: "total-hint"
  },
  re = {
    class: "table-wrap"
  },
  ce = {
    class: "data-table"
  },
  ve = {
    class: "col-content"
  },
  be = {
    class: "col-content"
  },
  pe = {
    class: "col-time"
  },
  ye = ["onClick"],
  ke = ["onClick"],
  me = {
    key: 1,
    class: "status-ok"
  },
  ge = {
    key: 0
  },
  we = {
    class: "pager"
  },
  fe = ["disabled"],
  _e = ["disabled"],
  VoicesManagePageConst0 = 20,
  he = defineComponent({
    __name: "VoicesManagePage",
    setup(val) {
      const useToast1 = useToast(),
        refVal = ref("stats"),
        refVal2 = ref(null);
      async function zz0() {
        try {
          const val1 = await vt();
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "统计加载失败");
        } catch {
          useToast1.error("统计加载失败（可能没有 voices.manage 权限）");
        }
      }
      const refVal3 = ref([]),
        refVal4 = ref(""),
        refVal5 = ref(""),
        refVal6 = ref(1),
        refVal7 = ref(0),
        refVal8 = ref(!1);
      async function zz1(zz2 = !1) {
        zz2 && (refVal6.value = 1), refVal8.value = !0;
        try {
          const val2 = await bt({
            status: refVal4.value === "" ? void 0 : refVal4.value,
            keyword: refVal5.value || void 0,
            page: refVal6.value,
            size: VoicesManagePageConst0
          });
          val2.data.code === 200 ? (refVal3.value = val2.data.data.records, refVal7.value = val2.data.data.total) : useToast1.error(val2.data.message || "加载失败");
        } catch {
          useToast1.error("加载失败");
        } finally {
          refVal8.value = !1;
        }
      }
      async function zz3(val1) {
        const val2 = val1.status === 0;
        if (!(val2 && !confirm(`确认下架该问题？
「${val1.content}」
下架后墙上不可见，其回答也一并隐藏。`))) try {
          const val3 = val2 ? await takedownAdminVoicesQuestions(val1.id) : await kt(val1.id);
          val3.data.code === 200 ? (useToast1.success(val2 ? "已下架" : "已恢复"), await zz1()) : useToast1.error(val3.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      const refVal9 = ref([]),
        refVal10 = ref(""),
        refVal11 = ref(""),
        refVal12 = ref(""),
        refVal13 = ref(1),
        refVal14 = ref(0),
        refVal15 = ref(!1);
      async function zz4(zz5 = !1) {
        zz5 && (refVal13.value = 1), refVal15.value = !0;
        try {
          const val2 = await pt({
            status: refVal10.value === "" ? void 0 : refVal10.value,
            keyword: refVal11.value || void 0,
            questionId: refVal12.value ? Number(refVal12.value) : void 0,
            page: refVal13.value,
            size: VoicesManagePageConst0
          });
          val2.data.code === 200 ? (refVal9.value = val2.data.data.records, refVal14.value = val2.data.data.total) : useToast1.error(val2.data.message || "加载失败");
        } catch {
          useToast1.error("加载失败");
        } finally {
          refVal15.value = !1;
        }
      }
      async function zz6(val1) {
        const val2 = val1.status === 0;
        if (!(val2 && !confirm(`确认下架该回答？
「${val1.content}」`))) try {
          const val3 = val2 ? await takedownAdminVoicesAnswers(val1.id) : await mt(val1.id);
          val3.data.code === 200 ? (useToast1.success(val2 ? "已下架" : "已恢复"), await zz4()) : useToast1.error(val3.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      const refVal16 = ref([]),
        refVal17 = ref(0),
        refVal18 = ref(1),
        refVal19 = ref(0),
        refVal20 = ref(!1);
      async function zz7(zz8 = !1) {
        zz8 && (refVal18.value = 1), refVal20.value = !0;
        try {
          const val2 = await yt({
            status: refVal17.value === "" ? void 0 : refVal17.value,
            page: refVal18.value,
            size: VoicesManagePageConst0
          });
          val2.data.code === 200 ? (refVal16.value = val2.data.data.records, refVal19.value = val2.data.data.total) : useToast1.error(val2.data.message || "加载失败");
        } catch {
          useToast1.error("加载失败");
        } finally {
          refVal20.value = !1;
        }
      }
      async function zz9(val1) {
        try {
          const val2 = await handleAdminVoicesReports(val1.id);
          val2.data.code === 200 ? (useToast1.success("已标记处理"), await zz7()) : useToast1.error(val2.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      async function zz10(val1) {
        if (confirm(`确认下架该${val1.targetType === 1 ? "问题" : "回答"}并标记举报已处理？
「${val1.targetContent}」`)) try {
          const val2 = val1.targetType === 1 ? await takedownAdminVoicesQuestions(val1.targetId) : await takedownAdminVoicesAnswers(val1.targetId);
          if (val2.data.code !== 200) {
            useToast1.error(val2.data.message || "下架失败");
            return;
          }
          await handleAdminVoicesReports(val1.id), useToast1.success("已下架并处理"), await zz7();
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz11(val1) {
        refVal.value = val1, val1 === "stats" && zz0(), val1 === "questions" && refVal3.value.length === 0 && zz1(!0), val1 === "answers" && refVal9.value.length === 0 && zz4(!0), val1 === "reports" && zz7(!0);
      }
      function zz12(val1) {
        return new Date(val1).toLocaleString("zh-CN");
      }
      return onMounted(zz0), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => {
        const val3 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", gt, [createVNode(PageHeader, {
          "back-to": "/"
        }), createElementVNode("main", wt, [createElementVNode("div", ft, [createElementVNode("div", _t, [val2[21] || (val2[21] = createElementVNode("h1", {
          class: "page-title"
        }, "跨代留声管理", -1)), createVNode(val3, {
          class: "preview-link",
          to: "/voices",
          target: "_blank"
        }, {
          default: toDisplayValue(() => [...(val2[20] || (val2[20] = [createTextVNode("查看活动页 →", -1)]))]),
          _: 1
        })]), createElementVNode("div", ht, [(openBlock(), createElementBlock(Fragment, null, renderList([{
          key: "stats",
          label: "统计"
        }, {
          key: "questions",
          label: "问题管理"
        }, {
          key: "answers",
          label: "回答管理"
        }, {
          key: "reports",
          label: "举报处理"
        }], val4 => createElementVNode("button", {
          key: val4.key,
          class: normalizeClass(["tab", {
            "tab--active": refVal.value === val4.key
          }]),
          type: "button",
          onClick: val5 => zz11(val4.key)
        }, toDisplayString(val4.label), 11, Ct)), 64))]), refVal.value === "stats" ? (openBlock(), createElementBlock("section", $t, [refVal2.value ? (openBlock(), createElementBlock("div", It, [createElementVNode("div", Vt, [createElementVNode("div", St, toDisplayString(refVal2.value.questionCount), 1), val2[22] || (val2[22] = createElementVNode("div", {
          class: "stat-label"
        }, "在线问题", -1))]), createElementVNode("div", Tt, [createElementVNode("div", At, toDisplayString(refVal2.value.answerCount), 1), val2[23] || (val2[23] = createElementVNode("div", {
          class: "stat-label"
        }, "在线回答", -1))]), createElementVNode("div", Pt, [createElementVNode("div", Ut, toDisplayString(refVal2.value.bindCount), 1), val2[24] || (val2[24] = createElementVNode("div", {
          class: "stat-label"
        }, "身份登记人数", -1))]), createElementVNode("div", Lt, [createElementVNode("div", Rt, toDisplayString(refVal2.value.takedownQuestionCount) + " / " + toDisplayString(refVal2.value.takedownAnswerCount), 1), val2[25] || (val2[25] = createElementVNode("div", {
          class: "stat-label"
        }, "已下架 问题/回答", -1))]), createElementVNode("div", Dt, [createElementVNode("div", {
          class: normalizeClass(["stat-num", {
            "stat-num--warn": refVal2.value.pendingReportCount > 0
          }])
        }, toDisplayString(refVal2.value.pendingReportCount), 3), val2[26] || (val2[26] = createElementVNode("div", {
          class: "stat-label"
        }, "待处理举报", -1))])])) : createCommentVNode("", !0), refVal2.value ? (openBlock(), createElementBlock("div", Qt, [(openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4], val4 => createElementVNode("div", {
          key: val4,
          class: "identity-stat"
        }, [createTextVNode(toDisplayString(unref(helper_zb59)(val4)) + "：", 1), createElementVNode("b", null, toDisplayString(refVal2.value.bindCountByIdentity?.[val4] ?? 0), 1), val2[27] || (val2[27] = createTextVNode(" 人 ", -1))])), 64))])) : createCommentVNode("", !0)])) : createCommentVNode("", !0), refVal.value === "questions" ? (openBlock(), createElementBlock("section", zt, [createElementVNode("div", Kt, [withDirectives(createElementVNode("select", {
          "onUpdate:modelValue": val2[0] || (val2[0] = val4 => refVal4.value = val4),
          class: "filter-select",
          onChange: val2[1] || (val2[1] = val4 => zz1(!0))
        }, [...(val2[28] || (val2[28] = [createElementVNode("option", {
          value: ""
        }, "全部状态", -1), createElementVNode("option", {
          value: 0
        }, "正常", -1), createElementVNode("option", {
          value: 1
        }, "已下架", -1)]))], 544), [[deepDirectiveOptions, refVal4.value]]), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val2[2] || (val2[2] = val4 => refVal5.value = val4),
          class: "filter-input",
          placeholder: "搜索问题内容",
          onKeydown: val2[3] || (val2[3] = withKeys(val4 => zz1(!0), ["enter"]))
        }, null, 544), [[vModelText, refVal5.value]]), createElementVNode("button", {
          class: "btn",
          type: "button",
          onClick: val2[4] || (val2[4] = val4 => zz1(!0))
        }, "搜索"), createElementVNode("span", Mt, "共 " + toDisplayString(refVal7.value) + " 条", 1)]), createElementVNode("div", Nt, [createElementVNode("table", Bt, [val2[30] || (val2[30] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "ID"), createElementVNode("th", {
          class: "col-content"
        }, "内容"), createElementVNode("th", null, "提问人"), createElementVNode("th", null, "投放给"), createElementVNode("th", null, "回答数"), createElementVNode("th", null, "状态"), createElementVNode("th", null, "时间"), createElementVNode("th", null, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val4 => (openBlock(), createElementBlock("tr", {
          key: val4.id,
          class: normalizeClass({
            "row-takedown": val4.status !== 0
          })
        }, [createElementVNode("td", null, toDisplayString(val4.id), 1), createElementVNode("td", Gt, [createVNode(val3, {
          to: `/voices/question/${val4.id}`,
          target: "_blank"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val4.content), 1)]),
          _: 2
        }, 1032, ["to"])]), createElementVNode("td", null, toDisplayString(val4.askerIdentityLabel) + "（uid:" + toDisplayString(val4.askerUserId) + "）", 1), createElementVNode("td", null, toDisplayString(val4.targetIdentities.map(val5 => unref(helper_zb59)(val5)).join("、")), 1), createElementVNode("td", null, toDisplayString(val4.answerCount), 1), createElementVNode("td", null, [createElementVNode("span", {
          class: normalizeClass(val4.status === 0 ? "status-ok" : "status-down")
        }, toDisplayString(val4.status === 0 ? "正常" : "已下架"), 3)]), createElementVNode("td", Ht, toDisplayString(zz12(val4.createdAt)), 1), createElementVNode("td", null, [createElementVNode("button", {
          class: normalizeClass(["btn btn--sm", {
            "btn--danger": val4.status === 0
          }]),
          type: "button",
          onClick: val5 => zz3(val4)
        }, toDisplayString(val4.status === 0 ? "下架" : "恢复"), 11, Et)])], 2))), 128)), !refVal8.value && refVal3.value.length === 0 ? (openBlock(), createElementBlock("tr", Ft, [...(val2[29] || (val2[29] = [createElementVNode("td", {
          colspan: "8",
          class: "empty-cell"
        }, "暂无数据", -1)]))])) : createCommentVNode("", !0)])])]), createElementVNode("div", qt, [createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal6.value <= 1,
          onClick: val2[5] || (val2[5] = val4 => {
            refVal6.value--, zz1();
          })
        }, "上一页", 8, xt), createElementVNode("span", null, "第 " + toDisplayString(refVal6.value) + " 页", 1), createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal6.value * VoicesManagePageConst0 >= refVal7.value,
          onClick: val2[6] || (val2[6] = val4 => {
            refVal6.value++, zz1();
          })
        }, "下一页", 8, Zt)])])) : createCommentVNode("", !0), refVal.value === "answers" ? (openBlock(), createElementBlock("section", jt, [createElementVNode("div", Ot, [withDirectives(createElementVNode("select", {
          "onUpdate:modelValue": val2[7] || (val2[7] = val4 => refVal10.value = val4),
          class: "filter-select",
          onChange: val2[8] || (val2[8] = val4 => zz4(!0))
        }, [...(val2[31] || (val2[31] = [createElementVNode("option", {
          value: ""
        }, "全部状态", -1), createElementVNode("option", {
          value: 0
        }, "正常", -1), createElementVNode("option", {
          value: 1
        }, "已下架", -1)]))], 544), [[deepDirectiveOptions, refVal10.value]]), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val2[9] || (val2[9] = val4 => refVal12.value = val4),
          class: "filter-input filter-input--narrow",
          placeholder: "问题ID",
          onKeydown: val2[10] || (val2[10] = withKeys(val4 => zz4(!0), ["enter"]))
        }, null, 544), [[vModelText, refVal12.value]]), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val2[11] || (val2[11] = val4 => refVal11.value = val4),
          class: "filter-input",
          placeholder: "搜索回答内容",
          onKeydown: val2[12] || (val2[12] = withKeys(val4 => zz4(!0), ["enter"]))
        }, null, 544), [[vModelText, refVal11.value]]), createElementVNode("button", {
          class: "btn",
          type: "button",
          onClick: val2[13] || (val2[13] = val4 => zz4(!0))
        }, "搜索"), createElementVNode("span", Jt, "共 " + toDisplayString(refVal14.value) + " 条", 1)]), createElementVNode("div", Wt, [createElementVNode("table", Xt, [val2[33] || (val2[33] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "ID"), createElementVNode("th", {
          class: "col-content"
        }, "回答内容"), createElementVNode("th", {
          class: "col-content"
        }, "所属问题"), createElementVNode("th", null, "回答人"), createElementVNode("th", null, "状态"), createElementVNode("th", null, "时间"), createElementVNode("th", null, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal9.value, val4 => (openBlock(), createElementBlock("tr", {
          key: val4.id,
          class: normalizeClass({
            "row-takedown": val4.status !== 0
          })
        }, [createElementVNode("td", null, toDisplayString(val4.id), 1), createElementVNode("td", Yt, toDisplayString(val4.content), 1), createElementVNode("td", te, [createVNode(val3, {
          to: `/voices/question/${val4.questionId}`,
          target: "_blank"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val4.questionContent), 1)]),
          _: 2
        }, 1032, ["to"])]), createElementVNode("td", null, toDisplayString(val4.answererIdentityLabel) + "（uid:" + toDisplayString(val4.answererUserId) + "）", 1), createElementVNode("td", null, [createElementVNode("span", {
          class: normalizeClass(val4.status === 0 ? "status-ok" : "status-down")
        }, toDisplayString(val4.status === 0 ? "正常" : "已下架"), 3)]), createElementVNode("td", ee, toDisplayString(zz12(val4.createdAt)), 1), createElementVNode("td", null, [createElementVNode("button", {
          class: normalizeClass(["btn btn--sm", {
            "btn--danger": val4.status === 0
          }]),
          type: "button",
          onClick: val5 => zz6(val4)
        }, toDisplayString(val4.status === 0 ? "下架" : "恢复"), 11, se)])], 2))), 128)), !refVal15.value && refVal9.value.length === 0 ? (openBlock(), createElementBlock("tr", ae, [...(val2[32] || (val2[32] = [createElementVNode("td", {
          colspan: "7",
          class: "empty-cell"
        }, "暂无数据", -1)]))])) : createCommentVNode("", !0)])])]), createElementVNode("div", ne, [createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal13.value <= 1,
          onClick: val2[14] || (val2[14] = val4 => {
            refVal13.value--, zz4();
          })
        }, "上一页", 8, oe), createElementVNode("span", null, "第 " + toDisplayString(refVal13.value) + " 页", 1), createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal13.value * VoicesManagePageConst0 >= refVal14.value,
          onClick: val2[15] || (val2[15] = val4 => {
            refVal13.value++, zz4();
          })
        }, "下一页", 8, le)])])) : createCommentVNode("", !0), refVal.value === "reports" ? (openBlock(), createElementBlock("section", ue, [createElementVNode("div", ie, [withDirectives(createElementVNode("select", {
          "onUpdate:modelValue": val2[16] || (val2[16] = val4 => refVal17.value = val4),
          class: "filter-select",
          onChange: val2[17] || (val2[17] = val4 => zz7(!0))
        }, [...(val2[34] || (val2[34] = [createElementVNode("option", {
          value: 0
        }, "待处理", -1), createElementVNode("option", {
          value: 1
        }, "已处理", -1), createElementVNode("option", {
          value: ""
        }, "全部", -1)]))], 544), [[deepDirectiveOptions, refVal17.value]]), createElementVNode("span", de, "共 " + toDisplayString(refVal19.value) + " 条", 1)]), createElementVNode("div", re, [createElementVNode("table", ce, [val2[36] || (val2[36] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "ID"), createElementVNode("th", null, "类型"), createElementVNode("th", {
          class: "col-content"
        }, "被举报内容"), createElementVNode("th", {
          class: "col-content"
        }, "举报理由"), createElementVNode("th", null, "对象状态"), createElementVNode("th", null, "举报人"), createElementVNode("th", null, "时间"), createElementVNode("th", null, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal16.value, val4 => (openBlock(), createElementBlock("tr", {
          key: val4.id,
          class: normalizeClass({
            "row-takedown": val4.status === 1
          })
        }, [createElementVNode("td", null, toDisplayString(val4.id), 1), createElementVNode("td", null, toDisplayString(val4.targetType === 1 ? "问题" : "回答"), 1), createElementVNode("td", ve, [val4.questionId ? (openBlock(), createBlock(val3, {
          key: 0,
          to: `/voices/question/${val4.questionId}`,
          target: "_blank"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val4.targetContent), 1)]),
          _: 2
        }, 1032, ["to"])) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode(toDisplayString(val4.targetContent), 1)], 64))]), createElementVNode("td", be, toDisplayString(val4.reason || "—"), 1), createElementVNode("td", null, [createElementVNode("span", {
          class: normalizeClass(val4.targetStatus === 0 ? "status-ok" : "status-down")
        }, toDisplayString(val4.targetStatus === 0 ? "正常" : val4.targetStatus === 1 ? "已下架" : "已删除"), 3)]), createElementVNode("td", null, "uid:" + toDisplayString(val4.reporterUserId), 1), createElementVNode("td", pe, toDisplayString(zz12(val4.createdAt)), 1), createElementVNode("td", null, [val4.status === 0 ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [val4.targetStatus === 0 ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "btn btn--sm btn--danger",
          type: "button",
          onClick: val5 => zz10(val4)
        }, " 下架并处理 ", 8, ye)) : createCommentVNode("", !0), createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          onClick: val5 => zz9(val4)
        }, toDisplayString(val4.targetStatus === 0 ? "忽略" : "标记已处理"), 9, ke)], 64)) : (openBlock(), createElementBlock("span", me, "已处理"))])], 2))), 128)), !refVal20.value && refVal16.value.length === 0 ? (openBlock(), createElementBlock("tr", ge, [...(val2[35] || (val2[35] = [createElementVNode("td", {
          colspan: "8",
          class: "empty-cell"
        }, "暂无举报", -1)]))])) : createCommentVNode("", !0)])])]), createElementVNode("div", we, [createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal18.value <= 1,
          onClick: val2[18] || (val2[18] = val4 => {
            refVal18.value--, zz7();
          })
        }, "上一页", 8, fe), createElementVNode("span", null, "第 " + toDisplayString(refVal18.value) + " 页", 1), createElementVNode("button", {
          class: "btn btn--sm",
          type: "button",
          disabled: refVal18.value * VoicesManagePageConst0 >= refVal19.value,
          onClick: val2[19] || (val2[19] = val4 => {
            refVal18.value++, zz7();
          })
        }, "下一页", 8, _e)])])) : createCommentVNode("", !0)])]), createVNode(PageFooter)]);
      };
    }
  }),
  Te = withScopeId(he, [["__scopeId", "data-v-2aec8add"]]);
/* index 运行时导出（已语义化） */
export { Te as default };