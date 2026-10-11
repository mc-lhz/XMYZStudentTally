/*!
 * 页面模块：试题详情（VoicesQuestionDetailPage）
 * 路由：/voices/question/:id   name=voices-question-detail   层级=3   需登录=否
 * 功能：公开的「试题详情」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesQuestionDetailPage-Dl5Lc0xe.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, inject, ref, watch, applyDirectives, onMounted, createElementBlock, createBlock, createElementVNode, createVNode, unref, createCommentVNode, toDisplayString, toDisplayValue, resolveAsset, createTextVNode, normalizeClass, Fragment, renderList, withDirectives, modalShowDef, withSlots, TransitionGroup, vModelText, withModifiers, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 browser（站点内功能模块） */
import { mathHelper_zb5 as $e } from "./browser-COI8Ulb7.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { showToast as Ae, VxBackButton as ie, VxNoticeHostScoped as Se, useVxToast as Re } from "./voices-theme-B9KdZorS.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { helper_zb59, helper_zb55 as De, getVoicesQuestions2 as Te, favoriteVoicesQuestions as Ne, createVoicesQuestionsAnswers as ze, likeVoicesAnswers as qe, reportVoices as Ee } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 useVoiceIdentity（站点内功能模块） */
import { syncVoiceUserId as Oe, VxSealLine as Qe, IdentityIcon, VxPenScoped as re, IdentityBindModalScoped as Ue } from "./useVoiceIdentity-CU57DzMk.js";
/* 导入：本地模块 VxFooter（站点内功能模块） */
import { scopedStyle_zb2 as je } from "./VxFooter-DKxE7um7.js";
/* 导入：本地模块 VxLoading（站点内功能模块） */
import { scopedStyle_zb3 as Pe } from "./VxLoading-5_b9iJ9q.js";
const He = {
    class: "vx-page"
  },
  Xe = {
    key: 0,
    class: "vx-topbar vx-topbar--center"
  },
  Ge = {
    class: "vx-container detail-container"
  },
  Je = {
    key: 1,
    class: "vx-paper-card vx-paper-card--plain detail-error"
  },
  Ke = {
    class: "vx-kaiti"
  },
  Ye = {
    key: 2,
    class: "vx-paper-card detail-paper"
  },
  Ze = {
    class: "vx-exam-head"
  },
  We = {
    class: "vx-question-text detail-q"
  },
  et = {
    class: "detail-meta"
  },
  tt = {
    class: "detail-by"
  },
  st = {
    class: "detail-targets"
  },
  at = {
    class: "detail-side"
  },
  nt = ["src"],
  ot = ["aria-label"],
  lt = {
    class: "fav-label"
  },
  it = {
    class: "vx-answer-sheet"
  },
  rt = {
    class: "sheet-head"
  },
  dt = {
    key: 0,
    class: "sheet-tools"
  },
  ut = {
    key: "form",
    class: "detail-write"
  },
  vt = ["maxlength"],
  ct = {
    class: "write-actions"
  },
  ft = ["disabled"],
  yt = {
    key: 1,
    class: "vx-notice detail-reason"
  },
  mt = {
    class: "answers-inner"
  },
  pt = {
    key: 0,
    class: "vx-empty detail-noanswer"
  },
  kt = {
    key: 1,
    class: "vx-empty detail-noanswer"
  },
  wt = ["aria-label", "onClick"],
  xt = {
    key: 0,
    class: "like-count"
  },
  gt = ["onClick"],
  bt = {
    class: "vx-answer-text vx-ruled"
  },
  ht = {
    class: "vx-modal report-modal"
  },
  _t = {
    class: "vx-exam-head"
  },
  Ct = {
    class: "report-quote vx-kaiti"
  },
  Mt = ["maxlength"],
  Bt = {
    class: "report-actions"
  },
  Lt = ["disabled"],
  It = {
    class: "vx-modal view-modal"
  },
  Vt = {
    class: "view-options"
  },
  Ft = ["onClick"],
  VoicesQuestionDetailPageConst0 = 500,
  $t = 2,
  VoicesQuestionDetailPageConst1 = 200,
  At = defineComponent({
    __name: "VoicesQuestionDetailPage",
    setup(val) {
      const val2 = inject(),
        useUserStore1 = useUserStore(),
        val3 = Re(),
        {
          identity: val4,
          setIdentity: val5
        } = Oe(),
        val6 = Ae(),
        val7 = Number(val2.params.id),
        refVal = ref(null),
        refVal2 = ref(!0),
        refVal3 = ref(null),
        refVal4 = ref("");
      $e.toDataURL(`${window.location.origin}/voices/question/${val7}`, {
        margin: 0,
        width: 128,
        color: {
          dark: "#1a1611",
          light: "#fdfbf4"
        }
      }).then(val1 => refVal4.value = val1).catch(() => {});
      const refVal5 = ref(!1),
        refVal6 = ref(""),
        refVal7 = ref(!1),
        text = `vx-draft-answer-${val7}`;
      try {
        refVal6.value = localStorage.getItem(text) ?? "";
      } catch {}
      watch(refVal6, val1 => {
        val1.trim() ? localStorage.setItem(text, val1) : localStorage.removeItem(text);
      });
      const val8 = applyDirectives(() => refVal6.value.trim().length),
        val9 = applyDirectives(() => !refVal7.value && val8.value >= $t && val8.value <= VoicesQuestionDetailPageConst0),
        refVal8 = ref(0),
        refVal9 = ref(!1),
        refVal10 = ref("latest"),
        refVal11 = ref(new Map()),
        obj = {
          latest: "最新",
          hot: "最热",
          random: "随机"
        },
        val10 = applyDirectives(() => refVal8.value === 0 ? "全部" : helper_zb59(refVal8.value));
      function zz0() {
        const list = ["latest", "hot", "random"],
          val1 = list[(list.indexOf(refVal10.value) + 1) % list.length] ?? "latest";
        refVal10.value = val1, val1 === "random" && zz2();
      }
      function zz1() {
        refVal10.value !== "random" && (refVal10.value = "random"), zz2();
      }
      function zz2() {
        const val1 = (refVal.value?.answers ?? []).map(val12 => val12.id);
        for (let zz3 = val1.length - 1; zz3 > 0; zz3--) {
          const val12 = Math.floor(Math.random() * (zz3 + 1)),
            val13 = val1[zz3];
          val1[zz3] = val1[val12], val1[val12] = val13;
        }
        refVal11.value = new Map(val1.map((val12, val13) => [val12, val13]));
      }
      const val11 = applyDirectives(() => {
        let list = [...(refVal.value?.answers ?? [])];
        return refVal8.value !== 0 && (list = list.filter(val1 => val1.answererIdentity === refVal8.value)), refVal10.value === "latest" ? list.sort((val1, val12) => new Date(val12.createdAt).getTime() - new Date(val1.createdAt).getTime()) : refVal10.value === "hot" ? list.sort((val1, val12) => val12.likeCount - val1.likeCount || val1.id - val12.id) : list.sort((val1, val12) => (refVal11.value.get(val1.id) ?? -1) - (refVal11.value.get(val12.id) ?? -1)), [...list.filter(val1 => val1.mine), ...list.filter(val1 => !val1.mine)];
      });
      async function zz4() {
        refVal2.value = !0, refVal3.value = null;
        try {
          const val1 = await Te(val7);
          val1.data.code === 200 ? (refVal.value = val1.data.data, map.clear(), obj2.serverFavorited = val1.data.data.favoritedByMe, obj2.initialized = !0) : refVal3.value = val1.data.message || "加载失败";
        } catch (val1) {
          const val12 = val1;
          refVal3.value = val12.response?.data?.message || "问题不存在或已下架";
        } finally {
          refVal2.value = !1;
        }
      }
      onMounted(zz4);
      async function zz5() {
        if (!val9.value || !refVal.value) return;
        const val1 = refVal6.value.trim(),
          refValValue = refVal.value,
          obj1 = {
            id: -Date.now(),
            content: val1,
            answererIdentity: val4.value ?? 1,
            answererIdentityLabel: helper_zb59(val4.value),
            createdAt: new Date().toISOString(),
            mine: !0,
            likeCount: 0,
            likedByMe: !1
          },
          obj3 = {
            canAnswer: refValValue.canAnswer,
            reason: refValValue.cannotAnswerReason,
            answeredByMe: refValValue.answeredByMe
          };
        refValValue.answers.unshift(obj1), refValValue.answerCount += 1, refValValue.canAnswer = !1, refValValue.cannotAnswerReason = "你已经交过卷了", refValValue.answeredByMe = !0, refVal5.value = !1, refVal6.value = "", localStorage.removeItem(text), refVal10.value = "latest", refVal7.value = !0;
        try {
          const val13 = await ze(val7, val1);
          if (val13.data.code === 200) {
            const val14 = refValValue.answers.findIndex(val15 => val15.id === obj1.id);
            val14 >= 0 && (refValValue.answers[val14] = val13.data.data), val3.success("答卷已交");
          } else zz6(obj1, obj3, val1), val3.error(val13.data.message || "交卷失败");
        } catch (val13) {
          const val14 = val13;
          zz6(obj1, obj3, val1), val3.error(val14.response?.data?.message || "网络错误，答卷已帮你留在草稿里");
        } finally {
          refVal7.value = !1;
        }
      }
      function zz6(val1, val12, val13) {
        const refValValue = refVal.value;
        refValValue && (refValValue.answers = refValValue.answers.filter(val15 => val15.id !== val1.id), refValValue.answerCount = Math.max(0, refValValue.answerCount - 1), refValValue.canAnswer = val12.canAnswer, refValValue.cannotAnswerReason = val12.reason, refValValue.answeredByMe = val12.answeredByMe, refVal6.value = val13, refVal5.value = !0);
      }
      const map = new Map();
      function zz7(val1) {
        let val12 = map.get(val1.id);
        return val12 || (val12 = {
          inFlight: !1,
          serverLiked: val1.likedByMe,
          serverCount: val1.likeCount
        }, map.set(val1.id, val12)), val12;
      }
      function zz8(val1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        if (val1.id < 0) return;
        const val12 = zz7(val1);
        val1.likedByMe = !val1.likedByMe, val1.likeCount = val12.serverCount + (val1.likedByMe === val12.serverLiked ? 0 : val1.likedByMe ? 1 : -1), zz9(val1, val12);
      }
      async function zz9(val1, val12) {
        if (!val12.inFlight) {
          val12.inFlight = !0;
          try {
            for (; val12.serverLiked !== val1.likedByMe;) {
              const val13 = await qe(val1.id);
              if (val13.data.code === 200) val12.serverLiked = val13.data.data.liked, val12.serverCount = val13.data.data.likeCount;else {
                val1.likedByMe = val12.serverLiked, val1.likeCount = val12.serverCount, val3.error(val13.data.message || "操作失败");
                return;
              }
            }
            val1.likeCount = val12.serverCount;
          } catch {
            val1.likedByMe = val12.serverLiked, val1.likeCount = val12.serverCount, val3.error("网络错误，请稍后再试");
          } finally {
            val12.inFlight = !1, val12.serverLiked !== val1.likedByMe && zz9(val1, val12);
          }
        }
      }
      const obj2 = {
        inFlight: !1,
        serverFavorited: !1,
        initialized: !1
      };
      function zz10() {
        if (refVal.value) {
          if (!useUserStore1.isLoggedIn) {
            useUserStore1.openLoginModal();
            return;
          }
          obj2.initialized || (obj2.serverFavorited = refVal.value.favoritedByMe, obj2.initialized = !0), refVal.value.favoritedByMe = !refVal.value.favoritedByMe, zz11();
        }
      }
      async function zz11() {
        if (!(obj2.inFlight || !refVal.value)) {
          obj2.inFlight = !0;
          try {
            for (; refVal.value && obj2.serverFavorited !== refVal.value.favoritedByMe;) {
              const val1 = await Ne(val7);
              if (val1.data.code === 200) obj2.serverFavorited = val1.data.data.favorited;else {
                refVal.value.favoritedByMe = obj2.serverFavorited, val3.error(val1.data.message || "操作失败");
                return;
              }
            }
          } catch {
            refVal.value && (refVal.value.favoritedByMe = obj2.serverFavorited), val3.error("网络错误，请稍后再试");
          } finally {
            obj2.inFlight = !1, refVal.value && obj2.serverFavorited !== refVal.value.favoritedByMe && zz11();
          }
        }
      }
      const refVal12 = ref(null),
        refVal13 = ref(""),
        refVal14 = ref(!1);
      function zz12(val1, val12, val13) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        val12 < 0 || (refVal13.value = "", refVal12.value = {
          type: val1,
          id: val12,
          summary: val13
        });
      }
      async function zz13() {
        if (!(!refVal12.value || refVal14.value)) {
          if (refVal13.value.trim().length > VoicesQuestionDetailPageConst1) {
            val3.error(`举报理由最多 ${VoicesQuestionDetailPageConst1} 字`);
            return;
          }
          refVal14.value = !0;
          try {
            const val1 = await Ee(refVal12.value.type, refVal12.value.id, refVal13.value.trim() || void 0);
            val1.data.code === 200 ? (val3.success("已收到举报，我们会尽快处理"), refVal12.value = null) : val3.error(val1.data.message || "举报失败");
          } catch (val1) {
            const val12 = val1;
            val3.error(val12.response?.data?.message || "网络错误，请稍后再试");
          } finally {
            refVal14.value = !1;
          }
        }
      }
      const refVal15 = ref(!1);
      function zz14(val1) {
        val5(val1), refVal15.value = !1, zz4();
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val12) => {
        const val13 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", He, [unref(val6) ? (openBlock(), createBlock(ie, {
          key: 1,
          class: "vx-desk-back"
        })) : (openBlock(), createElementBlock("header", Xe, [createVNode(ie), val12[13] || (val12[13] = createElementVNode("span", {
          class: "vx-topbar-title"
        }, "试题详情", -1))])), createElementVNode("main", Ge, [refVal2.value ? (openBlock(), createBlock(Pe, {
          key: 0,
          text: "调卷中…"
        })) : refVal3.value ? (openBlock(), createElementBlock("div", Je, [createElementVNode("p", Ke, toDisplayString(refVal3.value), 1), createVNode(val13, {
          class: "vx-btn vx-btn--sm",
          to: "/voices/answer"
        }, {
          default: toDisplayValue(() => [...(val12[14] || (val12[14] = [createTextVNode("回答题大厅", -1)]))]),
          _: 1
        })])) : refVal.value ? (openBlock(), createElementBlock("div", Ye, [createVNode(Qe), createElementVNode("div", Ze, [createElementVNode("h3", null, [createVNode(IdentityIcon, {
          identity: refVal.value.askerIdentity,
          size: 17
        }, null, 8, ["identity"]), createTextVNode(toDisplayString(unref(De)(refVal.value.askerIdentity)), 1)]), createElementVNode("button", {
          class: "report-stamp",
          type: "button",
          onClick: val12[0] || (val12[0] = val14 => zz12(1, refVal.value.id, refVal.value.content))
        }, " 举报 ")]), createElementVNode("div", We, toDisplayString(refVal.value.content), 1), createElementVNode("div", et, [createElementVNode("div", tt, [createElementVNode("span", null, [val12[15] || (val12[15] = createTextVNode(" 出题人：", -1)), createElementVNode("b", {
          class: normalizeClass(`vx-id-${refVal.value.askerIdentity}`)
        }, [createVNode(IdentityIcon, {
          identity: refVal.value.askerIdentity,
          size: 16
        }, null, 8, ["identity"]), createTextVNode("一位匿名的" + toDisplayString(refVal.value.askerIdentityLabel), 1)], 2)]), createElementVNode("span", st, [val12[16] || (val12[16] = createTextVNode(" 投放给：", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal.value.targetIdentities, val14 => (openBlock(), createElementBlock("span", {
          key: val14,
          class: "vx-target-chip",
          style: {
            "margin-right": "4px"
          }
        }, toDisplayString(unref(helper_zb59)(val14)) + "卷", 1))), 128))])]), createElementVNode("div", at, [refVal4.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: refVal4.value,
          class: "detail-qr",
          alt: "扫码打开这道题"
        }, null, 8, nt)) : createCommentVNode("", !0), val12[18] || (val12[18] = createElementVNode("span", {
          class: "detail-qr-tip"
        }, "扫码看题", -1)), createElementVNode("button", {
          class: normalizeClass(["fav-btn", {
            "fav-btn--on": refVal.value.favoritedByMe
          }]),
          type: "button",
          "aria-label": refVal.value.favoritedByMe ? "取消收藏" : "收藏",
          onClick: zz10
        }, [val12[17] || (val12[17] = createElementVNode("span", {
          class: "fav-seal"
        }, "藏", -1)), createElementVNode("span", lt, toDisplayString(refVal.value.favoritedByMe ? "已收藏" : "收藏"), 1)], 10, ot)])]), createElementVNode("div", it, [withDirectives(createElementVNode("div", rt, [val12[20] || (val12[20] = createElementVNode("div", {
          class: "vx-sheet-label",
          style: {
            margin: "0"
          }
        }, "答 题 区", -1)), refVal.value.answers.length > 0 ? (openBlock(), createElementBlock("div", dt, [createElementVNode("button", {
          class: "sheet-tool",
          type: "button",
          onClick: val12[1] || (val12[1] = val14 => refVal9.value = !0)
        }, " 只看：" + toDisplayString(val10.value), 1), createElementVNode("button", {
          class: "sheet-tool",
          type: "button",
          onClick: zz0
        }, " 排序：" + toDisplayString(obj[refVal10.value]), 1), createElementVNode("button", {
          class: "sheet-tool sheet-tool--icon",
          type: "button",
          title: "换一换",
          "aria-label": "换一换",
          onClick: zz1
        }, [...(val12[19] || (val12[19] = [createElementVNode("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true"
        }, [createElementVNode("path", {
          d: "M21 12 a9 9 0 1 1 -2.64 -6.36"
        }), createElementVNode("path", {
          d: "M21 3 v5 h-5"
        })], -1)]))])])) : createCommentVNode("", !0)], 512), [[modalShowDef, !refVal5.value]]), refVal.value.canAnswer ? (openBlock(), createBlock(withSlots, {
          key: 0,
          name: "write-swap",
          mode: "out-in"
        }, {
          default: toDisplayValue(() => [refVal5.value ? (openBlock(), createElementBlock("div", ut, [val12[23] || (val12[23] = createElementVNode("div", {
            class: "vx-field-label",
            style: {
              "margin-top": "4px"
            }
          }, "我 来 作 答", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val12[3] || (val12[3] = val14 => refVal6.value = val14),
            class: "vx-textarea",
            maxlength: VoicesQuestionDetailPageConst0 + 20,
            rows: "4",
            placeholder: "写下你的回答…"
          }, null, 8, vt), [[vModelText, refVal6.value]]), createElementVNode("div", {
            class: normalizeClass(["vx-char-count", {
              "vx-char-count--over": val8.value > VoicesQuestionDetailPageConst0
            }])
          }, toDisplayString(val8.value) + " / " + toDisplayString(VoicesQuestionDetailPageConst0), 3), createElementVNode("div", ct, [createElementVNode("button", {
            class: "vx-btn vx-btn--red",
            type: "button",
            disabled: !val9.value,
            onClick: zz5
          }, [refVal7.value ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createVNode(re), val12[22] || (val12[22] = createTextVNode(" 交卷中…", -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createTextVNode("交 卷")], 64))], 8, ft), createElementVNode("button", {
            class: "write-cancel",
            type: "button",
            onClick: val12[4] || (val12[4] = val14 => refVal5.value = !1)
          }, " 我不想回答了 ")])])) : (openBlock(), createElementBlock("button", {
            key: "cta",
            class: "answer-cta",
            type: "button",
            onClick: val12[2] || (val12[2] = val14 => refVal5.value = !0)
          }, [...(val12[21] || (val12[21] = [createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.8",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "aria-hidden": "true"
          }, [createElementVNode("path", {
            d: "M4 20 l1.2 -4.2 L16.6 4.4 a2 2 0 0 1 2.8 0 l0.2 0.2 a2 2 0 0 1 0 2.8 L8.2 18.8 Z"
          }), createElementVNode("path", {
            d: "M14.5 6.5 l3 3"
          })], -1), createTextVNode(" 点我回答这个问题 ", -1)]))]))]),
          _: 1
        })) : refVal.value.cannotAnswerReason ? (openBlock(), createElementBlock("div", yt, [createTextVNode(toDisplayString(refVal.value.cannotAnswerReason) + " ", 1), unref(useUserStore1).isLoggedIn ? refVal.value.cannotAnswerReason.includes("绑定身份") ? (openBlock(), createElementBlock("button", {
          key: 1,
          class: "vx-btn vx-btn--sm",
          style: {
            "margin-left": "10px"
          },
          type: "button",
          onClick: val12[6] || (val12[6] = val14 => refVal15.value = !0)
        }, " 去登记身份 ")) : createCommentVNode("", !0) : (openBlock(), createElementBlock("button", {
          key: 0,
          class: "vx-btn vx-btn--sm",
          style: {
            "margin-left": "10px"
          },
          type: "button",
          onClick: val12[5] || (val12[5] = val14 => unref(useUserStore1).openLoginModal())
        }, " 登录 "))])) : createCommentVNode("", !0), createElementVNode("div", {
          class: normalizeClass(["answers-collapse", {
            "answers-collapse--closed": refVal5.value
          }])
        }, [createElementVNode("div", mt, [refVal.value.answers.length === 0 ? (openBlock(), createElementBlock("div", pt, " 还没有人交卷，第一份答卷等你来写 ")) : val11.value.length === 0 ? (openBlock(), createElementBlock("div", kt, " 没有「" + toDisplayString(val10.value) + "」的答卷，换个身份看看 ", 1)) : createCommentVNode("", !0), createVNode(TransitionGroup, {
          name: "ans",
          tag: "div",
          class: "answers-list"
        }, {
          default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(val11.value, val14 => (openBlock(), createElementBlock("div", {
            key: val14.id,
            class: "vx-answer-item"
          }, [createElementVNode("span", {
            class: normalizeClass(["vx-answer-who", `vx-id-${val14.answererIdentity}`])
          }, [createVNode(IdentityIcon, {
            identity: val14.answererIdentity,
            size: 15
          }, null, 8, ["identity"]), createTextVNode(toDisplayString(val14.answererIdentityLabel), 1), val14.mine ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createTextVNode("（我）")], 64)) : createCommentVNode("", !0), val12[24] || (val12[24] = createTextVNode(" 答： ", -1))], 2), createElementVNode("button", {
            class: normalizeClass(["like-btn", {
              "like-btn--on": val14.likedByMe
            }]),
            type: "button",
            "aria-label": val14.likedByMe ? "取消点赞" : "点赞",
            onClick: val15 => zz8(val14)
          }, [val12[25] || (val12[25] = createElementVNode("span", {
            class: "like-seal"
          }, "赞", -1)), val14.likeCount > 0 ? (openBlock(), createElementBlock("span", xt, toDisplayString(val14.likeCount), 1)) : createCommentVNode("", !0)], 10, wt), val14.mine ? createCommentVNode("", !0) : (openBlock(), createElementBlock("button", {
            key: 0,
            class: "report-btn report-btn--inline",
            type: "button",
            onClick: val15 => zz12(2, val14.id, val14.content)
          }, " 举报 ", 8, gt)), createElementVNode("div", bt, toDisplayString(val14.content), 1)]))), 128))]),
          _: 1
        })])], 2)])])) : createCommentVNode("", !0), createVNode(je)]), createVNode(withSlots, {
          name: "vx-modal"
        }, {
          default: toDisplayValue(() => [refVal15.value ? (openBlock(), createBlock(Ue, {
            key: 0,
            onBound: zz14,
            onClose: val12[7] || (val12[7] = val14 => refVal15.value = !1)
          })) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "vx-modal"
        }, {
          default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "vx-modal-mask",
            onClick: val12[10] || (val12[10] = withModifiers(val14 => refVal12.value = null, ["self"]))
          }, [createElementVNode("div", ht, [createElementVNode("div", _t, [createElementVNode("h3", null, "举报" + toDisplayString(refVal12.value.type === 1 ? "这道题" : "这份答卷"), 1)]), createElementVNode("p", Ct, "「" + toDisplayString(refVal12.value.summary.length > 60 ? refVal12.value.summary.slice(0, 60) + "…" : refVal12.value.summary) + "」", 1), val12[27] || (val12[27] = createElementVNode("div", {
            class: "vx-field-label"
          }, "理 由（选填）", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val12[8] || (val12[8] = val14 => refVal13.value = val14),
            class: "vx-textarea",
            rows: "3",
            maxlength: VoicesQuestionDetailPageConst1 + 20,
            placeholder: "说说哪里不合适…"
          }, null, 8, Mt), [[vModelText, refVal13.value]]), createElementVNode("div", {
            class: normalizeClass(["vx-char-count", {
              "vx-char-count--over": refVal13.value.trim().length > VoicesQuestionDetailPageConst1
            }])
          }, toDisplayString(refVal13.value.trim().length) + " / " + toDisplayString(VoicesQuestionDetailPageConst1), 3), createElementVNode("div", Bt, [createElementVNode("button", {
            class: "vx-btn vx-btn--sm",
            type: "button",
            onClick: val12[9] || (val12[9] = val14 => refVal12.value = null)
          }, "取消"), createElementVNode("button", {
            class: "vx-btn vx-btn--red vx-btn--sm",
            type: "button",
            disabled: refVal14.value,
            onClick: zz13
          }, [refVal14.value ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createVNode(re), val12[26] || (val12[26] = createTextVNode(" 提交中…", -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createTextVNode("提交举报")], 64))], 8, Lt)])])])) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "vx-modal"
        }, {
          default: toDisplayValue(() => [refVal9.value && refVal.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "vx-modal-mask",
            onClick: val12[12] || (val12[12] = withModifiers(val14 => refVal9.value = !1, ["self"]))
          }, [createElementVNode("div", It, [val12[28] || (val12[28] = createElementVNode("div", {
            class: "vx-exam-head"
          }, [createElementVNode("h3", null, "只看谁的答卷")], -1)), createElementVNode("div", Vt, [createElementVNode("button", {
            class: normalizeClass(["view-option", {
              "view-option--active": refVal8.value === 0
            }]),
            type: "button",
            onClick: val12[11] || (val12[11] = val14 => {
              refVal8.value = 0, refVal9.value = !1;
            })
          }, " 所有都看 ", 2), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal.value.targetIdentities, val14 => (openBlock(), createElementBlock("button", {
            key: val14,
            class: normalizeClass(["view-option", {
              "view-option--active": refVal8.value === val14
            }]),
            type: "button",
            onClick: val15 => {
              refVal8.value = val14, refVal9.value = !1;
            }
          }, [createVNode(IdentityIcon, {
            identity: val14,
            size: 16
          }, null, 8, ["identity"]), createTextVNode(toDisplayString(unref(helper_zb59)(val14)), 1)], 10, Ft))), 128))])])])) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(Se)]);
      };
    }
  }),
  Ot = withScopeId(At, [["__scopeId", "data-v-eaeecdfb"]]);
/* index 运行时导出（已语义化） */
export { Ot as default };