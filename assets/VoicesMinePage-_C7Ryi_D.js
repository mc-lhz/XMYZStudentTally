/*!
 * 页面模块：我的档案袋（VoicesMinePage）
 * 路由：/voices/mine   name=voices-mine   层级=2   需登录=是
 * 功能：登录后的「我的档案袋」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoicesMinePage-_C7Ryi_D.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, useRouter, createElementBlock, createBlock, createElementVNode, createVNode, unref, normalizeClass, createCommentVNode, Fragment, renderList, toDisplayString, createTextVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { showToast, VxBackButton, VxNoticeHostScoped, useVxToast } from "./voices-theme-B9KdZorS.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { getVoicesMineQuestions, getVoicesMineAnswers, getVoicesMineFavorites, helper_zb59 } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 VxFooter（站点内功能模块） */
import { scopedStyle_zb2 } from "./VxFooter-DKxE7um7.js";
/* 导入：本地模块 VxLoading（站点内功能模块） */
import { scopedStyle_zb3 } from "./VxLoading-5_b9iJ9q.js";
/* 导入：本地模块 VxTabs.vue_vue_type_script_setup_true_lang（站点内功能模块） */
import { helper_zb4 } from "./VxTabs.vue_vue_type_script_setup_true_lang-fKsEzOL3.js";
/* 模板属性配置：vx-topbar vx-topbar--center */
/* 模板属性配置：vx-container mine-container */
/* 模板属性配置：vx-empty */
/* 模板属性配置：mine-item-content vx-kaiti */
/* 模板属性配置：vx-card-meta */
/* 模板属性配置：mine-takedown */
/* 模板属性配置：vx-empty */
const VoicesMinePageConfig = {
    class: "vx-page"
  },
  VoicesMinePageConfig_2 = {
    key: 0,
    class: "vx-topbar vx-topbar--center"
  },
  VoicesMinePageConfig_3 = {
    class: "vx-container mine-container"
  },
  VoicesMinePageConfig_4 = {
    key: 0
  },
  VoicesMinePageConfig_5 = {
    key: 0,
    class: "vx-empty"
  },
  VoicesMinePageList = ["onClick"],
  VoicesMinePageConfig_6 = {
    class: "mine-item-content vx-kaiti"
  },
  VoicesMinePageConfig_7 = {
    class: "vx-card-meta"
  },
  VoicesMinePageConfig_8 = {
    key: 0,
    class: "mine-takedown"
  },
  VoicesMinePageConfig_9 = {
    key: 1
  },
  VoicesMinePageConfig_10 = {
    key: 0,
    class: "vx-empty"
  },
  ee = ["onClick"],
  te = {
    class: "mine-item-q"
  },
  se = {
    class: "mine-item-content vx-kaiti"
  },
  ae = {
    class: "vx-card-meta"
  },
  oe = {
    key: 0,
    class: "vx-empty"
  },
  ne = ["onClick"],
  ie = {
    class: "mine-item-q"
  },
  le = {
    class: "mine-item-content vx-kaiti"
  },
  re = {
    class: "vx-card-meta"
  },
  ce = {
    key: 0,
    class: "mine-takedown"
  },
  de = defineComponent({
    __name: "VoicesMinePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        vxToast = useVxToast(),
        val3 = showToast(),
        refVal = ref("questions"),
        refVal2 = ref([]),
        refVal3 = ref([]),
        refVal4 = ref([]),
        refVal5 = ref(!1);
      async function zz0() {
        try {
          const [val1, val4, val5] = await Promise.all([getVoicesMineQuestions(1, 50), getVoicesMineAnswers(1, 50), getVoicesMineFavorites(1, 50)]);
          val1.data.code === 200 && (refVal2.value = val1.data.data.records), val4.data.code === 200 && (refVal3.value = val4.data.data.records), val5.data.code === 200 && (refVal4.value = val5.data.data.records), refVal5.value = !0;
        } catch {
          vxToast.error("档案袋加载失败");
        }
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal(), useRouter1.replace("/voices");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", VoicesMinePageConfig, [unref(val3) ? (openBlock(), createBlock(VxBackButton, {
        key: 1,
        to: "/voices",
        class: "vx-desk-back"
      })) : (openBlock(), createElementBlock("header", VoicesMinePageConfig_2, [createVNode(VxBackButton, {
        to: "/voices"
      }), val4[1] || (val4[1] = createElementVNode("span", {
        class: "vx-topbar-title"
      }, "我的档案袋", -1))])), createElementVNode("main", VoicesMinePageConfig_3, [createElementVNode("div", {
        class: normalizeClass(["mine-head", {
          "vx-desk-head": unref(val3)
        }])
      }, [unref(val3) ? (openBlock(), createElementBlock("h2", VoicesMinePageConfig_4, "我的档案袋")) : createCommentVNode("", !0), createVNode(helper_zb4, {
        modelValue: refVal.value,
        "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal.value = val5),
        options: [{
          value: "questions",
          label: `我出的卷（${refVal2.value.length}）`
        }, {
          value: "answers",
          label: `我交的答卷（${refVal3.value.length}）`
        }, {
          value: "favorites",
          label: `我的收藏（${refVal4.value.length}）`
        }]
      }, null, 8, ["modelValue", "options"])], 2), refVal5.value ? refVal.value === "questions" ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", VoicesMinePageConfig_5, " 还没出过题，去出第一道吧 ")) : createCommentVNode("", !0), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "vx-paper-card vx-paper-card--plain vx-paper-card--clickable mine-item",
        onClick: val6 => val5.status === 0 && unref(useRouter1).push(`/voices/question/${val5.id}`)
      }, [createElementVNode("div", VoicesMinePageConfig_6, toDisplayString(val5.content), 1), createElementVNode("div", VoicesMinePageConfig_7, [createElementVNode("span", null, [val4[2] || (val4[2] = createTextVNode(" 投给：", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(val5.targetIdentities, val6 => (openBlock(), createElementBlock("span", {
        key: val6,
        class: "vx-target-chip",
        style: {
          "margin-right": "4px"
        }
      }, toDisplayString(unref(helper_zb59)(val6)) + "卷", 1))), 128))]), val5.status !== 0 ? (openBlock(), createElementBlock("span", VoicesMinePageConfig_8, "已下架")) : (openBlock(), createElementBlock("span", VoicesMinePageConfig_9, [val4[3] || (val4[3] = createTextVNode("已收 ", -1)), createElementVNode("b", null, toDisplayString(val5.answerCount), 1), val4[4] || (val4[4] = createTextVNode(" 份答卷", -1))]))])], 8, VoicesMinePageList))), 128))], 64)) : refVal.value === "favorites" ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", VoicesMinePageConfig_10, " 还没收藏过题目，看到喜欢的题点「收藏」就会出现在这里 ")) : createCommentVNode("", !0), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "vx-paper-card vx-paper-card--plain vx-paper-card--clickable mine-item",
        onClick: val6 => unref(useRouter1).push(`/voices/question/${val5.id}`)
      }, [createElementVNode("div", te, toDisplayString(val5.askerIdentityLabel) + " 出的题", 1), createElementVNode("div", se, toDisplayString(val5.content), 1), createElementVNode("div", ae, [createElementVNode("span", null, [val4[5] || (val4[5] = createTextVNode(" 投给：", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(val5.targetIdentities, val6 => (openBlock(), createElementBlock("span", {
        key: val6,
        class: "vx-target-chip",
        style: {
          "margin-right": "4px"
        }
      }, toDisplayString(unref(helper_zb59)(val6)) + "卷", 1))), 128))]), createElementVNode("span", null, [val4[6] || (val4[6] = createTextVNode("已收 ", -1)), createElementVNode("b", null, toDisplayString(val5.answerCount), 1), val4[7] || (val4[7] = createTextVNode(" 份答卷", -1))])])], 8, ee))), 128))], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 3
      }, [refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", oe, " 还没交过答卷，去答题大厅看看 ")) : createCommentVNode("", !0), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "vx-paper-card vx-paper-card--plain vx-paper-card--clickable mine-item",
        onClick: val6 => unref(useRouter1).push(`/voices/question/${val5.questionId}`)
      }, [createElementVNode("div", ie, "问：" + toDisplayString(val5.questionContent), 1), createElementVNode("div", le, "答：" + toDisplayString(val5.content), 1), createElementVNode("div", re, [createElementVNode("span", null, toDisplayString(new Date(val5.createdAt).toLocaleDateString("zh-CN")), 1), val5.status !== 0 ? (openBlock(), createElementBlock("span", ce, "已下架")) : createCommentVNode("", !0)])], 8, ne))), 128))], 64)) : (openBlock(), createBlock(scopedStyle_zb3, {
        key: 0,
        text: "翻档案中…"
      })), createVNode(scopedStyle_zb2)]), createVNode(VxNoticeHostScoped)]));
    }
  }),
  ye = withScopeId(de, [["__scopeId", "data-v-7bb94021"]]);
/* index 运行时导出（已语义化） */
export { ye as default };