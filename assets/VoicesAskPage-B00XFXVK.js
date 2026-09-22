/*!
 * 页面模块：我要出卷（VoicesAskPage）
 * 路由：/voices/ask   name=voices-ask   层级=2   需登录=是
 * 功能：登录后的「我要出卷」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesAskPage-B00XFXVK.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useRouter, createElementBlock, createBlock, createElementVNode, createVNode, unref, createCommentVNode, toDisplayValue, withSlots, withDirectives, toDisplayString, createTextVNode, normalizeClass, vModelText, Fragment, renderList, resolveAsset, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { showToast as oe, useVxToast as ne, VxBackButton, VxNoticeHostScoped as le } from "./voices-theme-B9KdZorS.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { helper_zb55 as re, getVoicesStatus as ie, voiceIdentityTypeLabels, helper_zb50 as ue, createVoicesQuestions as ce } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 useVoiceIdentity（站点内功能模块） */
import { syncVoiceUserId as de, VxSealLine, IdentityIcon as ve, VxPenScoped as pe, IdentityBindModalScoped as me } from "./useVoiceIdentity-CU57DzMk.js";
/* 导入：本地模块 VxFooter（站点内功能模块） */
import { scopedStyle_zb2 as fe } from "./VxFooter-DKxE7um7.js";
/* 导入：本地模块 VxLoading（站点内功能模块） */
import { scopedStyle_zb3 as xe } from "./VxLoading-5_b9iJ9q.js";
/* 导入：本地模块 usePageScrollLock（站点内功能模块） */
import { usePageScrollLock as ke } from "./usePageScrollLock-C1lt3cX0.js";
const ge = {
    class: "vx-page vx-page--lock"
  },
  ye = {
    key: 0,
    class: "vx-topbar vx-topbar--center"
  },
  _e = {
    class: "vx-container ask-container"
  },
  be = {
    key: 0,
    class: "vx-desk-head"
  },
  Ie = {
    key: "form",
    class: "vx-paper-card ask-paper"
  },
  Ve = {
    class: "vx-exam-head"
  },
  Se = {
    class: "ask-by"
  },
  Te = {
    key: 1,
    class: "vx-kaiti"
  },
  Ne = ["maxlength"],
  he = {
    class: "vx-target-select"
  },
  Ce = ["onClick"],
  Le = {
    class: "ask-actions"
  },
  we = ["disabled"],
  Be = {
    key: "done",
    class: "vx-paper-card ask-paper ask-done"
  },
  Ee = {
    class: "done-sub"
  },
  De = {
    class: "ask-actions done-actions"
  },
  VoicesAskPageConst0 = 200,
  Me = 4,
  VoicesAskPageConst1 = "vx-draft-ask",
  Ae = defineComponent({
    __name: "VoicesAskPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        val2 = ne(),
        {
          identity: val3,
          setIdentity: val4,
          syncFromServer: val5
        } = de();
      ke();
      const val6 = oe(),
        refVal = ref(!1),
        refVal2 = ref(!1),
        refVal3 = ref(""),
        refVal4 = ref([]),
        refVal5 = ref(!1),
        refVal6 = ref(!1);
      try {
        const item = localStorage.getItem(VoicesAskPageConst1);
        if (item) {
          const val10 = JSON.parse(item);
          refVal3.value = val10.content ?? "", refVal4.value = val10.targets ?? [];
        }
      } catch {
        localStorage.removeItem(VoicesAskPageConst1);
      }
      watch([refVal3, refVal4], () => {
        refVal3.value.trim() || refVal4.value.length ? localStorage.setItem(VoicesAskPageConst1, JSON.stringify({
          content: refVal3.value,
          targets: refVal4.value
        })) : localStorage.removeItem(VoicesAskPageConst1);
      }, {
        deep: !0
      });
      const refVal7 = ref([]),
        refVal8 = ref("paper-fold"),
        val7 = applyDirectives(() => val3.value ? re(val3.value) : "＿＿的问题"),
        val8 = applyDirectives(() => refVal3.value.trim().length),
        val9 = applyDirectives(() => !refVal5.value && val8.value >= Me && val8.value <= VoicesAskPageConst0 && refVal4.value.length > 0);
      function zz0(val1) {
        const val10 = refVal4.value.indexOf(val1);
        val10 >= 0 ? refVal4.value.splice(val10, 1) : refVal4.value.push(val1);
      }
      async function zz1() {
        if (val9.value) {
          refVal5.value = !0;
          try {
            const val1 = await ce(refVal3.value.trim(), [...refVal4.value].sort());
            val1.data.code === 200 ? (refVal7.value = [...refVal4.value].sort(), refVal8.value = "paper-fold", refVal6.value = !0, localStorage.removeItem(VoicesAskPageConst1)) : val2.error(val1.data.message || "递交失败");
          } catch (val1) {
            const val10 = val1;
            val2.error(val10.response?.data?.message || "网络错误，请稍后再试");
          } finally {
            refVal5.value = !1;
          }
        }
      }
      function zz2() {
        refVal3.value = "", refVal4.value = [], localStorage.removeItem(VoicesAskPageConst1), refVal8.value = "paper-pass", refVal6.value = !1;
      }
      onMounted(async () => {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal(), useRouter1.replace("/voices");
          return;
        }
        try {
          const val1 = await ie();
          if (val1.data.code === 200) {
            if (!val1.data.data.open) {
              val2.info("活动已结束，不再收卷"), useRouter1.replace("/voices");
              return;
            }
            val5(val1.data.data.myIdentity), val1.data.data.myIdentity || (refVal2.value = !0);
          }
        } catch {
          val2.error("加载失败，请稍后再试");
        } finally {
          refVal.value = !0;
        }
      });
      function zz3(val1) {
        val4(val1), refVal2.value = !1;
      }
      function zz4() {
        refVal2.value = !1, val3.value || useRouter1.replace("/voices");
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val10) => {
        const val11 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", ge, [unref(val6) ? (openBlock(), createBlock(VxBackButton, {
          key: 1,
          to: "/voices",
          class: "vx-desk-back"
        })) : (openBlock(), createElementBlock("header", ye, [createVNode(VxBackButton, {
          to: "/voices"
        }), val10[1] || (val10[1] = createElementVNode("span", {
          class: "vx-topbar-title"
        }, "我要出卷", -1))])), createElementVNode("main", _e, [unref(val6) ? (openBlock(), createElementBlock("div", be, [...(val10[2] || (val10[2] = [createElementVNode("h2", null, "我要出卷", -1)]))])) : createCommentVNode("", !0), createVNode(withSlots, {
          name: refVal8.value,
          mode: "out-in"
        }, {
          default: toDisplayValue(() => [!unref(val3) && !refVal.value ? (openBlock(), createBlock(xe, {
            key: "loading",
            text: "备卷中…"
          })) : refVal6.value ? (openBlock(), createElementBlock("div", Be, [createVNode(VxSealLine), val10[12] || (val10[12] = createElementVNode("div", {
            class: "done-stamp"
          }, "已收卷", -1)), val10[13] || (val10[13] = createElementVNode("h2", {
            class: "done-title vx-kaiti"
          }, "试卷已递交", -1)), createElementVNode("p", Ee, [val10[9] || (val10[9] = createTextVNode(" 你的问题已进入答题大厅，等待 ", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal7.value, (val12, val13) => (openBlock(), createElementBlock(Fragment, {
            key: val12
          }, [createTextVNode(toDisplayString(val13 > 0 ? "、" : "") + toDisplayString(unref(voiceIdentityTypeLabels)[val12]), 1)], 64))), 128)), val10[10] || (val10[10] = createTextVNode(" 来作答。收到答卷后可在「我的档案袋」查看。 ", -1))]), createElementVNode("div", De, [createElementVNode("button", {
            class: "vx-btn",
            type: "button",
            onClick: zz2
          }, "再出一题"), createVNode(val11, {
            class: "vx-btn vx-btn--red",
            to: "/voices/answer"
          }, {
            default: toDisplayValue(() => [...(val10[11] || (val10[11] = [createTextVNode("去答题大厅", -1)]))]),
            _: 1
          })])])) : (openBlock(), createElementBlock("div", Ie, [createVNode(VxSealLine), createElementVNode("div", Ve, [createElementVNode("h3", null, toDisplayString(val7.value), 1), val10[3] || (val10[3] = createElementVNode("span", {
            class: "vx-stamp"
          }, "全国卷", -1))]), createElementVNode("div", Se, [val10[4] || (val10[4] = createTextVNode(" 出题人：", -1)), unref(val3) ? (openBlock(), createElementBlock("b", {
            key: 0,
            class: normalizeClass(["vx-kaiti", `vx-id-${unref(val3)}`])
          }, [createVNode(ve, {
            identity: unref(val3),
            size: 17
          }, null, 8, ["identity"]), createTextVNode("一位匿名的" + toDisplayString(unref(voiceIdentityTypeLabels)[unref(val3)]), 1)], 2)) : (openBlock(), createElementBlock("span", Te, "（待登记）"))]), val10[6] || (val10[6] = createElementVNode("div", {
            class: "vx-field-label"
          }, "题 目", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val10[0] || (val10[0] = val12 => refVal3.value = val12),
            class: "vx-textarea ask-textarea",
            maxlength: VoicesAskPageConst0 + 20,
            rows: "4",
            placeholder: "写下你想问另一代人的问题，比如：幸福是什么？"
          }, null, 8, Ne), [[vModelText, refVal3.value]]), createElementVNode("div", {
            class: normalizeClass(["vx-char-count", {
              "vx-char-count--over": val8.value > VoicesAskPageConst0
            }])
          }, toDisplayString(val8.value) + " / " + toDisplayString(VoicesAskPageConst0), 3), val10[7] || (val10[7] = createElementVNode("div", {
            class: "vx-field-label"
          }, "投 放 给（可多选）", -1)), createElementVNode("div", he, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(ue), val12 => (openBlock(), createElementBlock("button", {
            key: val12,
            type: "button",
            class: normalizeClass(["vx-target-option", {
              "vx-target-option--active": refVal4.value.includes(val12)
            }]),
            onClick: val13 => zz0(val12)
          }, toDisplayString(unref(voiceIdentityTypeLabels)[val12]), 11, Ce))), 128))]), val10[8] || (val10[8] = createElementVNode("p", {
            class: "ask-hint"
          }, "小提示：你的问题将会指定投放给所选身份的人", -1)), createElementVNode("div", Le, [createElementVNode("button", {
            class: "vx-btn vx-btn--red",
            type: "button",
            disabled: !val9.value,
            onClick: zz1
          }, [refVal5.value ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createVNode(pe), val10[5] || (val10[5] = createTextVNode(" 递交中…", -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createTextVNode("递 交 试 卷")], 64))], 8, we)])]))]),
          _: 1
        }, 8, ["name"]), createVNode(fe)]), createVNode(withSlots, {
          name: "vx-modal",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal2.value ? (openBlock(), createBlock(me, {
            key: 0,
            onBound: zz3,
            onClose: zz4
          })) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(le)]);
      };
    }
  }),
  Ue = withScopeId(Ae, [["__scopeId", "data-v-bac938af"]]);
/* index 运行时导出（已语义化） */
export { Ue as default };