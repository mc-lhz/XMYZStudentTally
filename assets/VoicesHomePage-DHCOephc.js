/*!
 * 页面模块：跨代留声（VoicesHomePage）
 * 路由：/voices   name=voices   层级=1   需登录=否
 * 功能：公开的「跨代留声」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesHomePage-DHCOephc.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, createElementBlock, createBlock, createElementVNode, createVNode, unref, createCommentVNode, createTextVNode, toDisplayString, Fragment, normalizeClass, useRouter, withKeys, toDisplayValue, resolveAsset, renderList, withSlots, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { helper_zb59, getVoicesStatus, helper_zb55 as tt, getVoicesQuestions as st } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 useVoiceIdentity（站点内功能模块） */
import { syncVoiceUserId as et, IdentityIcon, VxSealLine, IdentityBindModalScoped as nt } from "./useVoiceIdentity-CU57DzMk.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { showToast as ot, VxBackButton, VxNoticeHostScoped as at } from "./voices-theme-B9KdZorS.js";
/* 导入：本地模块 VxFooter（站点内功能模块） */
import { scopedStyle_zb2 as it } from "./VxFooter-DKxE7um7.js";
/* 导入：本地模块 usePageScrollLock（站点内功能模块） */
import { usePageScrollLock as lt } from "./usePageScrollLock-C1lt3cX0.js";
const rt = {
    class: "vx-page vx-page--lock"
  },
  dt = {
    key: 0,
    class: "vx-topbar vx-topbar--center"
  },
  ut = {
    class: "vx-container home-container"
  },
  vt = {
    class: "home-grid"
  },
  pt = {
    class: "home-left"
  },
  ct = {
    class: "hero"
  },
  mt = {
    class: "hero-stats"
  },
  yt = {
    class: "identity-line"
  },
  xt = {
    key: 1,
    class: "vx-kaiti identity-placeholder"
  },
  kt = {
    class: "entries"
  },
  ft = {
    key: 0,
    class: "home-right vx-paper-card"
  },
  gt = {
    class: "vx-exam-head panel-head"
  },
  bt = {
    class: "panel-list"
  },
  wt = ["onClick", "onKeydown"],
  It = {
    class: "pq-num"
  },
  Ct = {
    class: "pq-body"
  },
  _t = {
    class: "pq-text vx-kaiti"
  },
  $t = {
    class: "pq-meta"
  },
  Lt = {
    class: "pq-from"
  },
  Vt = {
    class: "pq-count"
  },
  ht = {
    key: 0,
    class: "vx-empty"
  },
  VoicesHomePageConst0 = "vx-participant-count",
  St = defineComponent({
    __name: "VoicesHomePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        {
          identity: val2,
          setIdentity: val3,
          syncFromServer: val4
        } = et(),
        val5 = ot(),
        refVal = ref(null),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref(null),
        refVal5 = ref(null),
        refVal6 = ref(sessionStorage.getItem(VoicesHomePageConst0) ?? "--");
      async function zz0() {
        try {
          const voicesStatus = await getVoicesStatus();
          voicesStatus.data.code === 200 && (refVal.value = voicesStatus.data.data, refVal6.value = String(voicesStatus.data.data.participantCount), sessionStorage.setItem(VoicesHomePageConst0, refVal6.value), useUserStore1.isLoggedIn && val4(voicesStatus.data.data.myIdentity));
        } catch {} finally {
          if (refVal2.value = !0, refVal5.value) {
            const refVal5Value = refVal5.value;
            refVal5.value = null, zz1(refVal5Value);
          }
        }
      }
      function zz1(val1) {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        if (val2.value) {
          useRouter1.push(val1);
          return;
        }
        if (!refVal2.value) {
          refVal5.value = val1;
          return;
        }
        refVal4.value = val1, refVal3.value = !0;
      }
      function zz2(val1) {
        val3(val1), refVal.value && (refVal.value.myIdentity = val1, refVal.value.myIdentityLabel = helper_zb59(val1)), refVal3.value = !1, refVal4.value && (useRouter1.push(refVal4.value), refVal4.value = null);
      }
      const refVal7 = ref([]),
        refVal8 = ref(!1);
      let val6 = !1;
      async function zz3() {
        if (!val6) {
          val6 = !0;
          try {
            const val1 = await st({
              scope: "all",
              sort: "latest",
              page: 1,
              size: 12
            });
            val1.data.code === 200 && (refVal7.value = val1.data.data.records);
          } catch {} finally {
            refVal8.value = !0;
          }
        }
      }
      return watch(val5, val1 => val1 && zz3(), {
        immediate: !0
      }), lt(), onMounted(zz0), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val7) => {
        const val8 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", rt, [unref(val5) ? (openBlock(), createBlock(VxBackButton, {
          key: 1,
          to: "/",
          home: "",
          class: "vx-desk-back"
        })) : (openBlock(), createElementBlock("header", dt, [createVNode(VxBackButton, {
          to: "/",
          home: ""
        }), val7[8] || (val7[8] = createElementVNode("span", {
          class: "vx-topbar-title"
        }, "跨代留声", -1))])), createElementVNode("main", ut, [createElementVNode("div", vt, [createElementVNode("div", pt, [createElementVNode("section", ct, [val7[11] || (val7[11] = createElementVNode("h1", {
          class: "hero-title"
        }, "跨代留声", -1)), val7[12] || (val7[12] = createElementVNode("p", {
          class: "hero-sub vx-kaiti"
        }, [createTextVNode(" 初中生的大问题、高中生的中问题、大学生的小问题、社会人的老问题——"), createElementVNode("br"), createTextVNode(" 把你的问题投给另一代人，匿名出卷，匿名作答。 ")], -1)), createElementVNode("div", mt, [val7[9] || (val7[9] = createTextVNode(" 已有 ", -1)), createElementVNode("b", null, toDisplayString(refVal6.value), 1), val7[10] || (val7[10] = createTextVNode(" 人参与活动 ", -1))])]), createElementVNode("div", yt, [unref(useUserStore1).isLoggedIn && unref(val2) ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [val7[14] || (val7[14] = createElementVNode("span", {
          class: "vx-kaiti"
        }, "考生身份：", -1)), createElementVNode("b", {
          class: normalizeClass(["vx-kaiti", `vx-id-${unref(val2)}`])
        }, [createVNode(IdentityIcon, {
          identity: unref(val2),
          size: 20
        }, null, 8, ["identity"]), createTextVNode(toDisplayString(unref(helper_zb59)(unref(val2))), 1)], 2), createElementVNode("button", {
          class: "archive-btn",
          type: "button",
          onClick: val7[0] || (val7[0] = val9 => unref(useRouter1).push("/voices/mine"))
        }, [...(val7[13] || (val7[13] = [createElementVNode("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.7",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true"
        }, [createElementVNode("path", {
          d: "M4 8 a2 2 0 0 1 2 -2 h4 l2 2 h6 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 Z"
        })], -1), createElementVNode("span", null, "档案袋", -1)]))])], 64)) : unref(useUserStore1).isLoggedIn && !refVal2.value ? (openBlock(), createElementBlock("span", xt, "考生身份核对中…")) : unref(useUserStore1).isLoggedIn ? (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [val7[15] || (val7[15] = createElementVNode("span", {
          class: "vx-kaiti"
        }, "尚未登记考生身份", -1)), createElementVNode("button", {
          class: "vx-btn vx-btn--red vx-btn--sm",
          type: "button",
          onClick: val7[1] || (val7[1] = val9 => refVal3.value = !0)
        }, " 填写登记表 ")], 64)) : (openBlock(), createElementBlock(Fragment, {
          key: 3
        }, [val7[16] || (val7[16] = createElementVNode("span", {
          class: "vx-kaiti"
        }, "登录后即可出卷、答卷", -1)), createElementVNode("button", {
          class: "vx-btn vx-btn--sm",
          type: "button",
          onClick: val7[2] || (val7[2] = val9 => unref(useUserStore1).openLoginModal())
        }, " 登录 ")], 64))]), createElementVNode("section", kt, [createElementVNode("div", {
          class: "vx-paper-card entry-card",
          role: "button",
          tabindex: "0",
          onClick: val7[3] || (val7[3] = val9 => zz1("/voices/ask")),
          onKeydown: val7[4] || (val7[4] = withKeys(val9 => zz1("/voices/ask"), ["enter"]))
        }, [createVNode(VxSealLine), val7[17] || (val7[17] = createElementVNode("div", {
          class: "vx-exam-head"
        }, [createElementVNode("h3", null, "我要出卷"), createElementVNode("span", {
          class: "vx-stamp"
        }, "提问")], -1)), val7[18] || (val7[18] = createElementVNode("p", {
          class: "entry-desc vx-kaiti"
        }, "写下你想问另一代人的问题，选好投放对象，等他们来答。", -1)), val7[19] || (val7[19] = createElementVNode("div", {
          class: "entry-foot"
        }, "去出题 →", -1))], 32), createElementVNode("div", {
          class: "vx-paper-card entry-card",
          role: "button",
          tabindex: "0",
          onClick: val7[5] || (val7[5] = val9 => unref(useRouter1).push("/voices/answer")),
          onKeydown: val7[6] || (val7[6] = withKeys(val9 => unref(useRouter1).push("/voices/answer"), ["enter"]))
        }, [createVNode(VxSealLine), val7[20] || (val7[20] = createElementVNode("div", {
          class: "vx-exam-head"
        }, [createElementVNode("h3", null, "我要答卷"), createElementVNode("span", {
          class: "vx-stamp"
        }, "回答")], -1)), val7[21] || (val7[21] = createElementVNode("p", {
          class: "entry-desc vx-kaiti"
        }, "看看另一代人给你出了什么题，选题作答。", -1)), val7[22] || (val7[22] = createElementVNode("div", {
          class: "entry-foot"
        }, "进入答题大厅 →", -1))], 32)])]), unref(val5) ? (openBlock(), createElementBlock("aside", ft, [createVNode(VxSealLine), createElementVNode("div", gt, [val7[24] || (val7[24] = createElementVNode("h3", null, "考题速览", -1)), createVNode(val8, {
          class: "panel-link",
          to: "/voices/answer"
        }, {
          default: toDisplayValue(() => [...(val7[23] || (val7[23] = [createTextVNode("进入答题大厅 →", -1)]))]),
          _: 1
        })]), createElementVNode("div", bt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal7.value, (val9, val10) => (openBlock(), createElementBlock("div", {
          key: val9.id,
          class: "pq",
          role: "button",
          tabindex: "0",
          onClick: val11 => unref(useRouter1).push(`/voices/question/${val9.id}`),
          onKeydown: withKeys(val11 => unref(useRouter1).push(`/voices/question/${val9.id}`), ["enter"])
        }, [createElementVNode("span", It, toDisplayString(val10 + 1) + ".", 1), createElementVNode("div", Ct, [createElementVNode("div", _t, toDisplayString(val9.content), 1), createElementVNode("div", $t, [createElementVNode("span", Lt, [createVNode(IdentityIcon, {
          identity: val9.askerIdentity,
          size: 14
        }, null, 8, ["identity"]), createTextVNode(toDisplayString(unref(tt)(val9.askerIdentity)), 1)]), createElementVNode("span", Vt, [val7[25] || (val7[25] = createTextVNode("已有 ", -1)), createElementVNode("b", null, toDisplayString(val9.answerCount), 1), val7[26] || (val7[26] = createTextVNode(" 人作答", -1))])])])], 40, wt))), 128)), refVal8.value && !refVal7.value.length ? (openBlock(), createElementBlock("div", ht, " 还没有人出题，去出第一道吧 ")) : createCommentVNode("", !0)])])) : createCommentVNode("", !0)]), createVNode(it, {
          class: "home-footer"
        })]), createVNode(withSlots, {
          name: "vx-modal"
        }, {
          default: toDisplayValue(() => [refVal3.value ? (openBlock(), createBlock(nt, {
            key: 0,
            onBound: zz2,
            onClose: val7[7] || (val7[7] = val9 => {
              refVal3.value = !1, refVal4.value = null;
            })
          })) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(at)]);
      };
    }
  }),
  qt = withScopeId(St, [["__scopeId", "data-v-7d84659b"]]);
/* index 运行时导出（已语义化） */
export { qt as default };