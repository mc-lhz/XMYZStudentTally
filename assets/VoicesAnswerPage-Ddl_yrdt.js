/*!
 * 页面模块：答题大厅（VoicesAnswerPage）
 * 路由：/voices/answer   name=voices-answer   层级=2   需登录=否
 * 功能：公开的「答题大厅」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesAnswerPage-Ddl_yrdt.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, watch, onMounted, directiveBum, createElementBlock, createBlock, createElementVNode, createVNode, unref, createCommentVNode, normalizeClass, toDisplayString, toDisplayValue, withSlots, Fragment, renderList, resolveRaw, useRouter, createTextVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { showToast as _e, VxBackButton, VxNoticeHostScoped as ye, useVxToast as ke } from "./voices-theme-B9KdZorS.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { getVoicesStatus as he, getVoicesQuestions as xe, helper_zb59, helper_zb50 as be, helper_zb55 as we } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 useVoiceIdentity（站点内功能模块） */
import { syncVoiceUserId as Ie, VxSealLine as Ve, IdentityIcon as Ce, IdentityBindModalScoped as Se } from "./useVoiceIdentity-CU57DzMk.js";
/* 导入：本地模块 VxLoading（站点内功能模块） */
import { scopedStyle_zb3 } from "./VxLoading-5_b9iJ9q.js";
/* 导入：本地模块 VxTabs.vue_vue_type_script_setup_true_lang（站点内功能模块） */
import { helper_zb4 } from "./VxTabs.vue_vue_type_script_setup_true_lang-fKsEzOL3.js";
const Be = {
    class: "vx-page"
  },
  Le = {
    key: 0,
    class: "vx-topbar vx-topbar--center"
  },
  Me = {
    class: "vx-container wall-container"
  },
  Te = {
    key: 0
  },
  $e = {
    key: 0,
    class: "target-filter-row"
  },
  Ee = ["onClick"],
  Ne = {
    key: 0,
    class: "vx-empty"
  },
  De = ["onClick"],
  Fe = {
    key: 0,
    class: "vx-corner-stamp"
  },
  Oe = {
    key: 1,
    class: "vx-corner-stamp"
  },
  Ue = {
    class: "vx-exam-head"
  },
  ze = {
    class: "vx-question-text wall-q"
  },
  Ge = {
    class: "vx-card-meta"
  },
  Ae = {
    class: "wall-targets"
  },
  Pe = {
    class: "wall-count"
  },
  je = {
    key: 3,
    class: "wall-bottom vx-kaiti"
  },
  VoicesAnswerPageConst0 = 10,
  VoicesAnswerPageConst1 = "vx-wall-guide-shown",
  He = defineComponent({
    __name: "VoicesAnswerPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        val2 = ke(),
        {
          identity: val3,
          setIdentity: val4,
          syncFromServer: val5
        } = Ie(),
        val6 = _e(),
        refVal = ref(null),
        refVal2 = ref(useUserStore1.isLoggedIn && val3.value ? "mine" : "all"),
        refVal3 = ref("random"),
        list = [{
          value: "mine",
          label: "可能问我"
        }, {
          value: "all",
          label: "全部试卷"
        }],
        list2 = [{
          value: "random",
          label: "默认"
        }, {
          value: "latest",
          label: "最新"
        }, {
          value: "hot",
          label: "最热"
        }],
        refVal4 = ref([]),
        refVal5 = ref(1),
        refVal6 = ref(0),
        refVal7 = ref(!1);
      let num = 0;
      const refVal8 = ref(0),
        val7 = applyDirectives(() => refVal3.value !== "random" && refVal4.value.length < refVal6.value),
        val8 = applyDirectives(() => !!(useUserStore1.isLoggedIn && val3.value)),
        val9 = applyDirectives(() => refVal3.value !== "random" && !val7.value && !refVal7.value && refVal4.value.length > 0),
        refVal9 = ref([]);
      function zz0(val1) {
        const val12 = refVal9.value.indexOf(val1);
        val12 >= 0 ? refVal9.value.splice(val12, 1) : refVal9.value.push(val1), refVal4.value = [], refVal6.value = 0, zz1(!0);
      }
      async function zz1(zz2 = !1) {
        const val12 = ++num;
        zz2 && (refVal5.value = 1), refVal7.value = !0;
        try {
          const val13 = await xe({
            scope: refVal2.value,
            sort: refVal3.value,
            targets: refVal2.value === "all" ? refVal9.value : void 0,
            page: refVal5.value,
            size: VoicesAnswerPageConst0
          });
          if (val12 !== num) return;
          val13.data.code === 200 ? (refVal4.value = zz2 ? val13.data.data.records : [...refVal4.value, ...val13.data.data.records], refVal6.value = val13.data.data.total, zz2 && (refVal8.value += 1)) : val2.error(val13.data.message || "加载失败");
        } catch {
          val12 === num && val2.error("网络错误，请稍后再试");
        } finally {
          val12 === num && (refVal7.value = !1);
        }
      }
      function zz3(val1) {
        refVal2.value !== val1 && (refVal2.value = val1, refVal4.value = [], refVal6.value = 0, zz1(!0));
      }
      function zz4(val1) {
        refVal3.value !== val1 && (refVal3.value = val1, refVal4.value = [], refVal6.value = 0, zz1(!0));
      }
      const refVal10 = ref(null);
      let val10 = !1,
        val11 = null;
      function zz5() {
        val10 && val7.value && !refVal7.value && (refVal5.value += 1, zz1());
      }
      watch(refVal7, val1 => {
        val1 || zz5();
      });
      function zz6() {
        zz7(), refVal3.value !== "random" && (refVal3.value = "random"), zz1(!0);
      }
      const refVal11 = ref(!1);
      function zz7() {
        refVal11.value && (refVal11.value = !1, localStorage.setItem(VoicesAnswerPageConst1, "1"));
      }
      const refVal12 = ref(!1);
      function zz8() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        refVal12.value = !0;
      }
      function zz9(val1) {
        val4(val1), refVal12.value = !1, refVal2.value = "mine", refVal4.value = [], refVal6.value = 0, zz1(!0);
      }
      return onMounted(() => {
        zz1(!0), he().then(val1 => {
          val1.data.code === 200 && (refVal.value = val1.data.data, useUserStore1.isLoggedIn && (val5(val1.data.data.myIdentity), !val1.data.data.myIdentity && refVal2.value === "mine" && (refVal2.value = "all", zz1(!0))));
        }).catch(() => {}), localStorage.getItem(VoicesAnswerPageConst1) || (refVal11.value = !0), val11 = new IntersectionObserver(val1 => {
          val10 = val1[0]?.isIntersecting ?? !1, zz5();
        }, {
          rootMargin: "240px"
        }), refVal10.value && val11.observe(refVal10.value);
      }), directiveBum(() => val11?.disconnect()), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val12) => (openBlock(), createElementBlock("div", Be, [unref(val6) ? (openBlock(), createBlock(VxBackButton, {
        key: 1,
        to: "/voices",
        class: "vx-desk-back"
      })) : (openBlock(), createElementBlock("header", Le, [createVNode(VxBackButton, {
        to: "/voices"
      }), val12[1] || (val12[1] = createElementVNode("span", {
        class: "vx-topbar-title"
      }, "答题大厅", -1))])), createElementVNode("main", Me, [createElementVNode("div", {
        class: normalizeClass(["wall-toolbar", {
          "vx-desk-head": unref(val6)
        }])
      }, [unref(val6) ? (openBlock(), createElementBlock("h2", Te, "答题大厅")) : createCommentVNode("", !0), val8.value ? (openBlock(), createBlock(helper_zb4, {
        key: 1,
        options: list,
        "model-value": refVal2.value,
        "onUpdate:modelValue": zz3
      }, null, 8, ["model-value"])) : (openBlock(), createElementBlock("button", {
        key: 2,
        class: "wall-tip vx-kaiti",
        type: "button",
        onClick: zz8
      }, toDisplayString(unref(useUserStore1).isLoggedIn ? "登记身份后可筛选可能问你的试卷 →" : "登录并登记身份后即可作答 →"), 1)), createVNode(helper_zb4, {
        class: "wall-sort",
        options: list2,
        "model-value": refVal3.value,
        "onUpdate:modelValue": zz4
      }, null, 8, ["model-value"])], 2), createVNode(withSlots, {
        name: "target-row"
      }, {
        default: toDisplayValue(() => [refVal2.value === "all" ? (openBlock(), createElementBlock("div", $e, [val12[2] || (val12[2] = createElementVNode("span", {
          class: "target-filter-label"
        }, "只看投给：", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(be), val13 => (openBlock(), createElementBlock("button", {
          key: val13,
          type: "button",
          class: normalizeClass(["vx-target-option target-filter-option", {
            "vx-target-option--active": refVal9.value.includes(val13)
          }]),
          onClick: val14 => zz0(val13)
        }, toDisplayString(unref(helper_zb59)(val13)), 11, Ee))), 128))])) : createCommentVNode("", !0)]),
        _: 1
      }), !refVal7.value && refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Ne, toDisplayString(refVal2.value === "mine" ? "还没有投放给你的试卷，去看看全部试卷吧" : "还没有人出题，去出第一道吧"), 1)) : createCommentVNode("", !0), (openBlock(), createElementBlock("div", {
        key: refVal8.value,
        class: "vx-grid"
      }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, (val13, val14) => (openBlock(), createElementBlock("div", {
        key: val13.id,
        class: "vx-paper-card vx-paper-card--clickable wall-card-in",
        style: resolveRaw({
          animationDelay: `${val14 % VoicesAnswerPageConst0 * 45}ms`
        }),
        onClick: val15 => unref(useRouter1).push(`/voices/question/${val13.id}`)
      }, [createVNode(Ve), val13.answeredByMe ? (openBlock(), createElementBlock("span", Fe, "已答")) : val13.mine ? (openBlock(), createElementBlock("span", Oe, "我出的")) : createCommentVNode("", !0), createElementVNode("div", Ue, [createElementVNode("h3", null, [createVNode(Ce, {
        identity: val13.askerIdentity,
        size: 16
      }, null, 8, ["identity"]), createTextVNode(toDisplayString(unref(we)(val13.askerIdentity)), 1)])]), createElementVNode("div", ze, toDisplayString(val13.content), 1), createElementVNode("div", Ge, [createElementVNode("span", Ae, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val13.targetIdentities, val15 => (openBlock(), createElementBlock("span", {
        key: val15,
        class: "vx-target-chip"
      }, toDisplayString(unref(helper_zb59)(val15)) + "卷", 1))), 128))]), createElementVNode("span", Pe, [val12[3] || (val12[3] = createTextVNode("已有 ", -1)), createElementVNode("b", null, toDisplayString(val13.answerCount), 1), val12[4] || (val12[4] = createTextVNode(" 人回答", -1))])])], 12, De))), 128))])), createElementVNode("div", {
        ref_key: "sentinel",
        ref: refVal10,
        class: "wall-sentinel"
      }, null, 512), refVal7.value && refVal4.value.length === 0 ? (openBlock(), createBlock(scopedStyle_zb3, {
        key: 1,
        text: "翻卷中…"
      })) : refVal7.value && val7.value ? (openBlock(), createBlock(scopedStyle_zb3, {
        key: 2,
        text: "翻卷中…"
      })) : val9.value ? (openBlock(), createElementBlock("div", je, "—— 你已经到达底部啦！——")) : createCommentVNode("", !0)]), createElementVNode("button", {
        class: normalizeClass(["wall-refresh", {
          "wall-refresh--spinning": refVal7.value && refVal3.value === "random",
          "wall-refresh--guiding": refVal11.value
        }]),
        type: "button",
        title: "换一批",
        "aria-label": "换一批",
        onClick: zz6
      }, [...(val12[5] || (val12[5] = [createElementVNode("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.8",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true"
      }, [createElementVNode("path", {
        d: "M21 12 a9 9 0 1 1 -2.64 -6.36"
      }), createElementVNode("path", {
        d: "M21 3 v5 h-5"
      })], -1)]))], 2), createVNode(withSlots, {
        name: "guide-fade"
      }, {
        default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "guide-mask",
          onClick: zz7
        }, [...(val12[6] || (val12[6] = [createElementVNode("div", {
          class: "guide-bubble vx-kaiti"
        }, [createTextVNode(" 当筛选器处于【默认】时，"), createElementVNode("br"), createTextVNode("可以点我刷新一组问题！ "), createElementVNode("span", {
          class: "guide-arrow"
        })], -1)]))])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "vx-modal"
      }, {
        default: toDisplayValue(() => [refVal12.value ? (openBlock(), createBlock(Se, {
          key: 0,
          onBound: zz9,
          onClose: val12[0] || (val12[0] = val13 => refVal12.value = !1)
        })) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(ye)]));
    }
  }),
  Xe = withScopeId(He, [["__scopeId", "data-v-692b188f"]]);
/* index 运行时导出（已语义化） */
export { Xe as default };