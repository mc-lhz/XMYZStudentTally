/*!
 * 页面模块：分数查询（GradePage）
 * 路由：/grade   name=grade   层级=1   需登录=是
 * 功能：登录后的「分数查询」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/GradePage-BbPP7xQB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, useRouter, createElementBlock, createVNode, createElementVNode, Fragment, createVNodeWrapper, createCommentVNode, toDisplayString, withModifiers, withDirectives, vModelText, normalizeClass, renderList, toDisplayValue, withSlots, useToast, unref, resolveRaw, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 grade（站点内功能模块） */
import { getGradeStatus, getGradeExams, getGradeTypeName as aa, bindGrade as sa, unbindGrade as ea } from "./grade-BOUREyqU.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const oa = {
    class: "page-container"
  },
  ia = {
    class: "page-content"
  },
  da = {
    class: "content-container"
  },
  ra = {
    class: "breadcrumb-wrapper"
  },
  ua = {
    key: 0,
    class: "loading-container"
  },
  ca = {
    key: 0,
    class: "bind-section"
  },
  va = {
    class: "bind-card"
  },
  fa = {
    key: 0,
    class: "bind-error"
  },
  pa = {
    class: "form-group"
  },
  ma = ["disabled"],
  ba = {
    class: "form-group"
  },
  ga = ["disabled"],
  ya = {
    class: "form-group"
  },
  _a = {
    class: "role-options"
  },
  ha = ["disabled"],
  ka = ["disabled"],
  xa = ["disabled"],
  wa = {
    class: "binding-info-section"
  },
  Ca = {
    class: "binding-info-card"
  },
  Ta = {
    class: "binding-info-left"
  },
  Ba = {
    class: "binding-text"
  },
  Sa = {
    class: "binding-account"
  },
  La = {
    class: "exam-list-section"
  },
  Ma = {
    key: 0,
    class: "empty-state"
  },
  Pa = {
    key: 1,
    class: "exam-list"
  },
  Ua = ["onClick"],
  Va = {
    class: "exam-main"
  },
  Ea = {
    class: "exam-header"
  },
  Ia = {
    class: "exam-name"
  },
  Na = {
    class: "exam-type"
  },
  $a = {
    class: "exam-time"
  },
  za = {
    class: "exam-stats"
  },
  Da = {
    class: "stat-item score"
  },
  Ga = {
    class: "stat-value"
  },
  Fa = {
    class: "stat-label"
  },
  Ra = {
    class: "stat-item"
  },
  Ha = {
    class: "stat-value"
  },
  qa = {
    class: "stat-item"
  },
  Aa = {
    class: "stat-value"
  },
  ja = {
    class: "exam-progress"
  },
  Ja = ["disabled"],
  Ka = {
    class: "modal-actions"
  },
  Oa = ["disabled"],
  Qa = ["disabled"],
  Wa = 10,
  Xa = defineComponent({
    __name: "GradePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(1),
        refVal5 = ref(0),
        refVal6 = ref(!1),
        refVal7 = ref({
          account: "",
          password: "",
          roleType: 1
        }),
        refVal8 = ref(!1),
        refVal9 = ref(""),
        refVal10 = ref(!1),
        refVal11 = ref(!1);
      async function zz0() {
        try {
          const val1 = await getGradeStatus();
          val1.data.code === 200 ? (refVal2.value = val1.data.data, refVal2.value?.bound && (await zz1())) : useToast1.error(val1.data.message || "获取绑定状态失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal.value = !1;
        }
      }
      async function zz1(zz2 = !1) {
        zz2 && (refVal6.value = !0);
        try {
          const val2 = zz2 ? refVal4.value + 1 : 1,
            val3 = await getGradeExams(val2, Wa);
          val3.data.code === 200 ? (zz2 ? (refVal3.value = [...refVal3.value, ...val3.data.data.list], refVal4.value = val2) : (refVal3.value = val3.data.data.list, refVal4.value = 1), refVal5.value = val3.data.data.totalCount) : useToast1.error(val3.data.message || "获取考试列表失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal6.value = !1;
        }
      }
      async function zz3() {
        if (!refVal7.value.account.trim()) {
          refVal9.value = "请输入账号";
          return;
        }
        if (!refVal7.value.password.trim()) {
          refVal9.value = "请输入密码";
          return;
        }
        refVal8.value = !0, refVal9.value = "";
        try {
          const val1 = await sa({
            account: refVal7.value.account.trim(),
            password: refVal7.value.password,
            roleType: refVal7.value.roleType
          });
          val1.data.code === 200 ? (useToast1.success("绑定成功"), refVal2.value = val1.data.data, await zz1()) : refVal9.value = val1.data.message || "绑定失败";
        } catch {
          refVal9.value = "网络错误，请稍后重试";
        } finally {
          refVal8.value = !1;
        }
      }
      function zz4() {
        refVal10.value = !0;
      }
      async function zz5() {
        refVal11.value = !0;
        try {
          const val1 = await ea();
          val1.data.code === 200 ? (useToast1.success("解绑成功"), refVal2.value = {
            bound: !1,
            account: null,
            name: null,
            studentId: null,
            roleType: null,
            bindTime: null
          }, refVal3.value = [], refVal10.value = !1, refVal7.value = {
            account: "",
            password: "",
            roleType: 1
          }) : useToast1.error(val1.data.message || "解绑失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal11.value = !1;
        }
      }
      function zz6() {
        refVal10.value = !1;
      }
      function zz7(val1) {
        useRouter1.push(`/grade/${val1}`);
      }
      function zz8(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
      function zz9(val1, val2) {
        return Math.round(val1 / val2 * 100);
      }
      function zz10() {
        return refVal3.value.length < refVal5.value;
      }
      return watch(() => useUserStore1.isLoggedIn, val1 => {
        val1 && zz0();
      }), onMounted(() => {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal("请先登录以查看成绩"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", oa, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", ia, [createElementVNode("div", da, [createElementVNode("div", ra, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", ua, [...(val2[6] || (val2[6] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val2[21] || (val2[21] = createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "分数查询"), createElementVNode("p", {
        class: "page-desc"
      }, "查看你的好分数考试成绩")], -1)), refVal2.value?.bound ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("section", wa, [createElementVNode("div", Ca, [createElementVNode("div", Ta, [val2[13] || (val2[13] = createElementVNode("div", {
        class: "binding-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }), createElementVNode("polyline", {
        points: "22 4 12 14.01 9 11.01"
      })])], -1)), createElementVNode("div", Ba, [val2[12] || (val2[12] = createElementVNode("span", {
        class: "binding-label"
      }, "已绑定账号", -1)), createElementVNode("span", Sa, toDisplayString(refVal2.value.account), 1)])]), createElementVNode("button", {
        class: "unbind-btn",
        onClick: zz4
      }, " 解绑 ")])]), createElementVNode("section", La, [val2[20] || (val2[20] = createElementVNode("h2", {
        class: "section-title"
      }, "考试记录", -1)), refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", Ma, [...(val2[14] || (val2[14] = [createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-40a4fe53><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" data-v-40a4fe53></path><rect x="9" y="3" width="6" height="4" rx="1" data-v-40a4fe53></rect><line x1="9" y1="12" x2="15" y2="12" data-v-40a4fe53></line><line x1="9" y1="16" x2="13" y2="16" data-v-40a4fe53></line></svg><p data-v-40a4fe53>暂无考试记录</p>', 2)]))])) : (openBlock(), createElementBlock("div", Pa, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.examId,
        class: "exam-card",
        onClick: val4 => zz7(val3.examId)
      }, [createElementVNode("div", Va, [createElementVNode("div", Ea, [createElementVNode("h3", Ia, toDisplayString(val3.name), 1), createElementVNode("span", Na, toDisplayString(unref(aa)(val3.type)), 1)]), createElementVNode("div", $a, toDisplayString(zz8(val3.time)), 1)]), createElementVNode("div", za, [createElementVNode("div", Da, [createElementVNode("span", Ga, toDisplayString(val3.score), 1), createElementVNode("span", Fa, "/ " + toDisplayString(val3.manfen), 1)]), val2[17] || (val2[17] = createElementVNode("div", {
        class: "stat-divider"
      }, null, -1)), createElementVNode("div", Ra, [createElementVNode("span", Ha, toDisplayString(val3.classRank), 1), val2[15] || (val2[15] = createElementVNode("span", {
        class: "stat-label"
      }, "班级名次", -1))]), val2[18] || (val2[18] = createElementVNode("div", {
        class: "stat-divider"
      }, null, -1)), createElementVNode("div", qa, [createElementVNode("span", Aa, toDisplayString(val3.gradeRank), 1), val2[16] || (val2[16] = createElementVNode("span", {
        class: "stat-label"
      }, "年级名次", -1))])]), createElementVNode("div", ja, [createElementVNode("div", {
        class: "progress-bar",
        style: resolveRaw({
          width: zz9(val3.score, val3.manfen) + "%"
        })
      }, null, 4)]), val2[19] || (val2[19] = createElementVNode("svg", {
        class: "exam-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1))], 8, Ua))), 128)), zz10() ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "load-more-btn",
        disabled: refVal6.value,
        onClick: val2[4] || (val2[4] = val3 => zz1(!0))
      }, toDisplayString(refVal6.value ? "加载中..." : `加载更多 (${refVal5.value - refVal3.value.length}条)`), 9, Ja)) : createCommentVNode("", !0)]))])], 64)) : (openBlock(), createElementBlock("section", ca, [createElementVNode("div", va, [val2[10] || (val2[10] = createVNodeWrapper('<div class="bind-icon" data-v-40a4fe53><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-40a4fe53><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-v-40a4fe53></path><circle cx="9" cy="7" r="4" data-v-40a4fe53></circle><line x1="19" y1="8" x2="19" y2="14" data-v-40a4fe53></line><line x1="22" y1="11" x2="16" y2="11" data-v-40a4fe53></line></svg></div><h2 class="bind-title" data-v-40a4fe53>绑定好分数账号</h2><p class="bind-desc" data-v-40a4fe53>绑定后可以查看你的考试成绩和排名</p>', 3)), refVal9.value ? (openBlock(), createElementBlock("div", fa, toDisplayString(refVal9.value), 1)) : createCommentVNode("", !0), createElementVNode("form", {
        class: "bind-form",
        onSubmit: withModifiers(zz3, ["prevent"])
      }, [createElementVNode("div", pa, [val2[7] || (val2[7] = createElementVNode("label", {
        class: "form-label"
      }, "账号（手机号）", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val2[0] || (val2[0] = val3 => refVal7.value.account = val3),
        type: "text",
        class: "form-input",
        placeholder: "请输入好分数账号",
        disabled: refVal8.value
      }, null, 8, ma), [[vModelText, refVal7.value.account]])]), createElementVNode("div", ba, [val2[8] || (val2[8] = createElementVNode("label", {
        class: "form-label"
      }, "密码", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val2[1] || (val2[1] = val3 => refVal7.value.password = val3),
        type: "password",
        class: "form-input",
        placeholder: "请输入好分数密码",
        disabled: refVal8.value
      }, null, 8, ga), [[vModelText, refVal7.value.password]])]), createElementVNode("div", ya, [val2[9] || (val2[9] = createElementVNode("label", {
        class: "form-label"
      }, "角色", -1)), createElementVNode("div", _a, [createElementVNode("button", {
        type: "button",
        class: normalizeClass(["role-btn", {
          active: refVal7.value.roleType === 1
        }]),
        disabled: refVal8.value,
        onClick: val2[2] || (val2[2] = val3 => refVal7.value.roleType = 1)
      }, " 学生 ", 10, ha), createElementVNode("button", {
        type: "button",
        class: normalizeClass(["role-btn", {
          active: refVal7.value.roleType === 2
        }]),
        disabled: refVal8.value,
        onClick: val2[3] || (val2[3] = val3 => refVal7.value.roleType = 2)
      }, " 家长 ", 10, ka)])]), createElementVNode("button", {
        type: "submit",
        class: "bind-submit-btn",
        disabled: refVal8.value
      }, toDisplayString(refVal8.value ? "绑定中..." : "绑定账号"), 9, xa)], 32), val2[11] || (val2[11] = createVNodeWrapper('<div class="bind-tips" data-v-40a4fe53><div class="tips-header" data-v-40a4fe53><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-40a4fe53><circle cx="12" cy="12" r="10" data-v-40a4fe53></circle><line x1="12" y1="16" x2="12" y2="12" data-v-40a4fe53></line><line x1="12" y1="8" x2="12.01" y2="8" data-v-40a4fe53></line></svg><span data-v-40a4fe53>温馨提示</span></div><ul class="tips-list" data-v-40a4fe53><li data-v-40a4fe53>好分数账号是厦门一中平时考试时使用的第三方平台，账号所有权均属于好分数。</li><li data-v-40a4fe53>你无法在这里修改好分数密码，如果遗忘了账号密码，请前往<strong data-v-40a4fe53>好分数官方 App</strong> 处理。</li><li data-v-40a4fe53>如果提示&quot;密码过于简单&quot;，也请前往好分数 App 进行更改。</li><li data-v-40a4fe53>好分数账号仅用于查分，只有拥有<strong data-v-40a4fe53>好分数会员</strong>的账号可以查看排名。</li><li data-v-40a4fe53>我们无法从好分数会员中获得任何收益，好分数与我们没有任何关系。</li></ul></div>', 1))])]))], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: zz6
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[5] || (val2[5] = withModifiers(() => {}, ["stop"]))
          }, [val2[22] || (val2[22] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认解绑", -1)), val2[23] || (val2[23] = createElementVNode("p", {
            class: "modal-message"
          }, " 确定要解绑好分数账号吗？解绑后需要重新绑定才能查看成绩。 ", -1)), createElementVNode("div", Ka, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz6,
            disabled: refVal11.value
          }, "取消", 8, Oa), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz5,
            disabled: refVal11.value
          }, toDisplayString(refVal11.value ? "解绑中..." : "确定"), 9, Qa)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  ns = withScopeId(Xa, [["__scopeId", "data-v-40a4fe53"]]);
/* index 运行时导出（已语义化） */
export { ns as default };