/*!
 * 页面模块：辩论赛投票（VotePage）
 * 路由：/vote   name=debate-vote   层级=1   需登录=否
 * 功能：公开的「辩论赛投票」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VotePage-CPzz36Ky.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, onMounted, directiveBum, createElementBlock, createElementVNode, createTextVNode, toDisplayString, withModifiers, createCommentVNode, normalizeClass, withDirectives, directiveCreated, Fragment, renderList, inject, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 debate（站点内功能模块） */
import { getDebateMe, getAdminDebateRounds_2, getDebateRound, getDebateActive, helper_zb17 } from "./debate-B8dkqKam.js";
/* 模板属性配置：vote-container */
/* 模板属性配置：loading-wrap */
/* 模板属性配置：state warn */
/* 模板属性配置：state error */
/* 模板属性配置：state */
const VotePageConfig = {
    class: "vote-container"
  },
  VotePageConfig_2 = {
    key: 0,
    class: "loading-wrap"
  },
  VotePageConfig_3 = {
    key: 1,
    class: "state warn"
  },
  VotePageConfig_4 = {
    key: 2,
    class: "state error"
  },
  VotePageConfig_5 = {
    key: 3,
    class: "state"
  },
  ee = {
    key: 4,
    class: "state"
  },
  te = {
    class: "sub"
  },
  se = {
    key: 5,
    class: "state success"
  },
  ae = {
    class: "sub"
  },
  le = {
    key: 6,
    class: "state"
  },
  oe = {
    class: "sub"
  },
  ne = {
    class: "header"
  },
  ie = {
    class: "topic"
  },
  ue = {
    class: "section"
  },
  de = {
    class: "side-pick"
  },
  re = {
    class: "side-name"
  },
  ve = {
    class: "side-name"
  },
  ce = {
    class: "section"
  },
  pe = {
    class: "debater-list"
  },
  me = ["value"],
  fe = {
    class: "position"
  },
  be = {
    class: "name"
  },
  _e = {
    class: "section"
  },
  ye = {
    class: "debater-list"
  },
  ge = ["value"],
  he = {
    class: "position"
  },
  Ie = {
    class: "name"
  },
  Ae = ["disabled"],
  Be = {
    key: 1,
    class: "form-error"
  },
  Se = defineComponent({
    __name: "VotePage",
    setup(val) {
      const val2 = inject(),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref(""),
        refVal4 = ref(!1),
        refVal5 = ref(!1),
        refVal6 = ref(""),
        refVal7 = ref(null);
      let val3 = null;
      const refVal8 = ref({
          supportSide: "",
          bestAId: null,
          bestBId: null
        }),
        val4 = applyDirectives(() => /MicroMessenger/i.test(navigator.userAgent)),
        val5 = applyDirectives(() => !!refVal2.value && (refVal2.value.debatersA?.length ?? 0) <= 1 && (refVal2.value.debatersB?.length ?? 0) <= 1),
        val6 = applyDirectives(() => !!refVal8.value.supportSide && !!refVal8.value.bestAId && !!refVal8.value.bestBId);
      async function zz0() {
        if (refVal.value = !0, refVal3.value = "", val2.query.err) {
          refVal3.value = String(val2.query.err) === "oauth_failed" ? "微信登录失败，请重新扫码" : "会话已失效，请重新扫码", refVal.value = !1;
          return;
        }
        let val1 = !1;
        try {
          const val7 = await getDebateMe();
          if (val7.data.code !== 200) {
            refVal3.value = val7.data.message || "请求失败";
            return;
          }
          const val8 = val7.data.data;
          if (!val8.openid) {
            if (val4.value) {
              const val11 = window.location.pathname + window.location.search;
              val1 = !0, window.location.replace(getAdminDebateRounds_2(val11));
              return;
            }
            return;
          }
          const val9 = val2.query.round;
          let val10;
          if (val9 ? val10 = (await getDebateRound(Number(val9))).data.data : val10 = (await getDebateActive()).data.data, refVal2.value = val10, refVal2.value && (refVal7.value = refVal2.value.secondsLeft, refVal2.value.startedAt && !refVal2.value.locked && zz1(), refVal4.value = val8.votedActive && val8.activeRoundId === refVal2.value.id, val5.value)) {
            const val11 = refVal2.value.debatersA?.[0],
              val12 = refVal2.value.debatersB?.[0];
            val11 && (refVal8.value.bestAId = val11.id), val12 && (refVal8.value.bestBId = val12.id);
          }
        } catch (val7) {
          refVal3.value = val7?.message || "加载失败";
        } finally {
          val1 || (refVal.value = !1);
        }
      }
      function zz1() {
        val3 && clearInterval(val3), val3 = setInterval(() => {
          refVal7.value !== null && (refVal7.value = Math.max(0, refVal7.value - 1), refVal7.value === 0 && refVal2.value && (refVal2.value.locked = !0, val3 && clearInterval(val3)));
        }, 1e3);
      }
      function zz2(val1) {
        if (val1 === null) return "--:--";
        const val7 = Math.floor(val1 / 60),
          val8 = val1 % 60;
        return `${String(val7).padStart(2, "0")}:${String(val8).padStart(2, "0")}`;
      }
      async function zz3() {
        if (!(!refVal2.value || !val6.value)) {
          refVal5.value = !0, refVal6.value = "";
          try {
            const val1 = await helper_zb17({
              roundId: refVal2.value.id,
              supportSide: refVal8.value.supportSide,
              bestAId: refVal8.value.bestAId,
              bestBId: refVal8.value.bestBId
            });
            val1.data.code === 200 ? refVal4.value = !0 : refVal6.value = val1.data.message || "投票失败";
          } catch (val1) {
            refVal6.value = val1?.message || "网络异常，请重试";
          } finally {
            refVal5.value = !1;
          }
        }
      }
      function zz4() {
        window.location.href = "/vote";
      }
      return onMounted(zz0), directiveBum(() => {
        val3 && clearInterval(val3);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val7) => (openBlock(), createElementBlock("div", VotePageConfig, [refVal.value ? (openBlock(), createElementBlock("div", VotePageConfig_2, [...(val7[4] || (val7[4] = [createElementVNode("div", {
        class: "spinner"
      }, null, -1), createElementVNode("div", {
        class: "loading-text"
      }, "正在进入投票系统，若长时间未响应请重新扫描二维码", -1)]))])) : val4.value ? refVal3.value ? (openBlock(), createElementBlock("div", VotePageConfig_4, [createTextVNode(toDisplayString(refVal3.value) + " ", 1), createElementVNode("button", {
        class: "btn",
        onClick: zz4
      }, "刷新重试")])) : refVal2.value ? !refVal2.value.isActive && !refVal2.value.startedAt ? (openBlock(), createElementBlock("div", ee, [val7[7] || (val7[7] = createElementVNode("h2", null, "本场投票尚未开始", -1)), createElementVNode("p", te, toDisplayString(refVal2.value.topic), 1), val7[8] || (val7[8] = createElementVNode("p", {
        class: "hint"
      }, "请等待主持人开启此场。", -1))])) : refVal4.value ? (openBlock(), createElementBlock("div", se, [val7[9] || (val7[9] = createElementVNode("h2", null, "✓ 你已为本场投票", -1)), createElementVNode("p", ae, toDisplayString(refVal2.value.topic), 1), val7[10] || (val7[10] = createElementVNode("p", {
        class: "hint"
      }, "感谢参与，等待主持人公布结果。", -1))])) : !refVal2.value.isActive || refVal2.value.locked ? (openBlock(), createElementBlock("div", le, [val7[11] || (val7[11] = createElementVNode("h2", null, "本场投票已结束", -1)), createElementVNode("p", oe, toDisplayString(refVal2.value.topic), 1)])) : (openBlock(), createElementBlock("form", {
        key: 7,
        class: "vote-form",
        onSubmit: withModifiers(zz3, ["prevent"])
      }, [createElementVNode("div", ne, [createElementVNode("div", ie, toDisplayString(refVal2.value.topic), 1), createElementVNode("div", {
        class: normalizeClass(["timer", {
          urgent: refVal7.value !== null && refVal7.value < 60
        }])
      }, " 距离投票结束还有 " + toDisplayString(zz2(refVal7.value)), 3)]), createElementVNode("div", ue, [val7[14] || (val7[14] = createElementVNode("h3", null, "你支持哪一方？", -1)), createElementVNode("div", de, [createElementVNode("label", {
        class: normalizeClass(["side-card", {
          active: refVal8.value.supportSide === "A"
        }])
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7[0] || (val7[0] = val8 => refVal8.value.supportSide = val8),
        type: "radio",
        value: "A"
      }, null, 512), [[directiveCreated, refVal8.value.supportSide]]), val7[12] || (val7[12] = createElementVNode("span", {
        class: "side-tag"
      }, "正方", -1)), createElementVNode("span", re, toDisplayString(refVal2.value.sideAName), 1)], 2), createElementVNode("label", {
        class: normalizeClass(["side-card", {
          active: refVal8.value.supportSide === "B"
        }])
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7[1] || (val7[1] = val8 => refVal8.value.supportSide = val8),
        type: "radio",
        value: "B"
      }, null, 512), [[directiveCreated, refVal8.value.supportSide]]), val7[13] || (val7[13] = createElementVNode("span", {
        class: "side-tag"
      }, "反方", -1)), createElementVNode("span", ve, toDisplayString(refVal2.value.sideBName), 1)], 2)])]), val5.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("div", ce, [createElementVNode("h3", null, toDisplayString(refVal2.value.sideAName) + "（正方）佳辩", 1), createElementVNode("div", pe, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.debatersA, val8 => (openBlock(), createElementBlock("label", {
        key: val8.id,
        class: normalizeClass(["debater-card", {
          active: refVal8.value.bestAId === val8.id
        }])
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7[2] || (val7[2] = val9 => refVal8.value.bestAId = val9),
        type: "radio",
        value: val8.id
      }, null, 8, me), [[directiveCreated, refVal8.value.bestAId]]), createElementVNode("span", fe, toDisplayString(val8.position || "辩手"), 1), createElementVNode("span", be, toDisplayString(val8.name), 1)], 2))), 128))])]), createElementVNode("div", _e, [createElementVNode("h3", null, toDisplayString(refVal2.value.sideBName) + "（反方）佳辩", 1), createElementVNode("div", ye, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value.debatersB, val8 => (openBlock(), createElementBlock("label", {
        key: val8.id,
        class: normalizeClass(["debater-card", {
          active: refVal8.value.bestBId === val8.id
        }])
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7[3] || (val7[3] = val9 => refVal8.value.bestBId = val9),
        type: "radio",
        value: val8.id
      }, null, 8, ge), [[directiveCreated, refVal8.value.bestBId]]), createElementVNode("span", he, toDisplayString(val8.position || "辩手"), 1), createElementVNode("span", Ie, toDisplayString(val8.name), 1)], 2))), 128))])])], 64)), createElementVNode("button", {
        class: "btn primary",
        disabled: !val6.value || refVal5.value,
        type: "submit"
      }, toDisplayString(refVal5.value ? "提交中…" : "提交投票"), 9, Ae), refVal6.value ? (openBlock(), createElementBlock("p", Be, toDisplayString(refVal6.value), 1)) : createCommentVNode("", !0)], 32)) : (openBlock(), createElementBlock("div", VotePageConfig_5, [...(val7[6] || (val7[6] = [createElementVNode("h2", null, "暂无进行中的投票", -1), createElementVNode("p", null, "请等待主持人开启下一场。", -1)]))])) : (openBlock(), createElementBlock("div", VotePageConfig_3, [...(val7[5] || (val7[5] = [createElementVNode("h2", null, "请在微信中扫码进入", -1), createElementVNode("p", null, "本投票需要使用微信进行身份识别（防止重复投票）。请回到大屏前用微信扫一扫。", -1)]))]))]));
    }
  }),
  Me = withScopeId(Se, [["__scopeId", "data-v-e99d93ad"]]);
/* index 运行时导出（已语义化） */
export { Me as default };