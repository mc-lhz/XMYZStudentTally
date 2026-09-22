/*!
 * 页面模块：宿舍铃声（RingtonePage）
 * 路由：/ringtone   name=ringtone   层级=1   需登录=否
 * 功能：公开的「宿舍铃声」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RingtonePage-DMJmC_vj.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, onMounted, watch, createElementBlock, createVNode, createElementVNode, unref, createVNodeWrapper, Fragment, renderList, useToast, normalizeClass, createCommentVNode, toDisplayString, resolveRaw, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getCampaigns } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：content-container */
/* 模板属性配置：loading-container */
/* 模板属性配置：empty-container */
/* 模板属性配置：campaigns-section */
/* 模板属性配置：campaigns-list */
/* 模板属性配置：campaign-steps */
/* 模板属性配置：steps-track */
/* 模板属性配置：step-dot */
/* 模板属性配置：step-label */
const RingtonePageConfig = {
    class: "page-container"
  },
  RingtonePageConfig_2 = {
    class: "page-content"
  },
  RingtonePageConfig_3 = {
    class: "content-container"
  },
  RingtonePageConfig_4 = {
    key: 0,
    class: "login-prompt"
  },
  RingtonePageConfig_5 = {
    key: 1,
    class: "loading-container"
  },
  RingtonePageConfig_6 = {
    key: 2,
    class: "empty-container"
  },
  RingtonePageConfig_7 = {
    key: 3,
    class: "campaigns-section"
  },
  RingtonePageConfig_8 = {
    class: "campaigns-list"
  },
  RingtonePageList = ["onClick"],
  RingtonePageConfig_9 = {
    class: "campaign-steps"
  },
  RingtonePageConfig_10 = {
    class: "steps-track"
  },
  RingtonePageConfig_11 = {
    class: "step-dot"
  },
  RingtonePageConfig_12 = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3"
  },
  RingtonePageConfig_13 = {
    class: "step-label"
  },
  ee = {
    class: "steps-line"
  },
  te = {
    class: "campaign-info"
  },
  se = {
    class: "campaign-title"
  },
  ae = {
    key: 0,
    class: "campaign-desc"
  },
  oe = {
    class: "campaign-meta"
  },
  ne = {
    class: "meta-item"
  },
  ie = defineComponent({
    __name: "RingtonePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        val2 = applyDirectives(() => refVal2.value.filter(val1 => val1.status === "active"));
      async function zz0() {
        if (!useUserStore1.isLoggedIn) {
          refVal2.value = [], refVal.value = !1;
          return;
        }
        refVal.value = !0;
        try {
          const val1 = await getCampaigns();
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取活动列表失败");
        } catch {
          useToast1.error("获取活动列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
        if (!val1.currentStage) return !1;
        const val3 = val1.currentStage.stageType;
        return val3 === "submission" || val3 === "voting";
      }
      const list = [{
        key: "pending",
        label: "未开始"
      }, {
        key: "submission",
        label: "投稿"
      }, {
        key: "review",
        label: "审核"
      }, {
        key: "voting",
        label: "投票"
      }, {
        key: "ended",
        label: "结束"
      }];
      function zz2(val1) {
        if (!val1.currentStage) return 0;
        switch (val1.currentStage.stageType) {
          case "submission":
            return 1;
          case "review":
            return 2;
          case "voting":
            return 3;
          case "result":
            return 4;
          default:
            return 0;
        }
      }
      function zz3(val1) {
        if (!val1.currentStage) return;
        const val3 = val1.currentStage.stageType;
        val3 === "submission" ? useRouter1.push(`/ringtone/${val1.id}/submit`) : val3 === "voting" && useRouter1.push(`/ringtone/${val1.id}/vote`);
      }
      return onMounted(() => {
        zz0();
      }), watch(() => useUserStore1.isLoggedIn, val1 => {
        if (val1) {
          zz0();
          return;
        }
        refVal2.value = [], refVal.value = !1;
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", RingtonePageConfig, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", RingtonePageConfig_2, [createElementVNode("div", RingtonePageConfig_3, [val3[6] || (val3[6] = createElementVNode("h1", {
        class: "page-title desktop-only"
      }, "宿舍铃声", -1)), unref(useUserStore1).isLoggedIn ? refVal.value ? (openBlock(), createElementBlock("div", RingtonePageConfig_5, [...(val3[2] || (val3[2] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : val2.value.length === 0 ? (openBlock(), createElementBlock("div", RingtonePageConfig_6, [...(val3[3] || (val3[3] = [createVNodeWrapper('<div class="empty-icon" data-v-a2630cc1><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-a2630cc1><path d="M9 18V5l12-2v13" data-v-a2630cc1></path><circle cx="6" cy="18" r="3" data-v-a2630cc1></circle><circle cx="18" cy="16" r="3" data-v-a2630cc1></circle></svg></div><h2 data-v-a2630cc1>暂无活动</h2><p data-v-a2630cc1>目前没有进行中的铃声征集活动</p>', 3)]))])) : (openBlock(), createElementBlock("div", RingtonePageConfig_7, [createElementVNode("div", RingtonePageConfig_8, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: normalizeClass(["campaign-card", {
          clickable: zz1(val4)
        }]),
        onClick: val5 => zz1(val4) && zz3(val4)
      }, [createElementVNode("div", RingtonePageConfig_9, [createElementVNode("div", RingtonePageConfig_10, [(openBlock(), createElementBlock(Fragment, null, renderList(list, (val5, val6) => createElementVNode("div", {
        key: val5.key,
        class: normalizeClass(["step-item", {
          active: val6 === zz2(val4),
          completed: val6 < zz2(val4)
        }])
      }, [createElementVNode("div", RingtonePageConfig_11, [val6 < zz2(val4) ? (openBlock(), createElementBlock("svg", RingtonePageConfig_12, [...(val3[4] || (val3[4] = [createElementVNode("polyline", {
        points: "20 6 9 17 4 12"
      }, null, -1)]))])) : createCommentVNode("", !0)]), createElementVNode("span", RingtonePageConfig_13, toDisplayString(val5.label), 1)], 2)), 64))]), createElementVNode("div", ee, [createElementVNode("div", {
        class: "steps-line-fill",
        style: resolveRaw({
          width: `${zz2(val4) / (list.length - 1) * 100}%`
        })
      }, null, 4)])]), createElementVNode("div", te, [createElementVNode("h3", se, toDisplayString(val4.title), 1), val4.description ? (openBlock(), createElementBlock("p", ae, toDisplayString(val4.description), 1)) : createCommentVNode("", !0), createElementVNode("div", oe, [createElementVNode("span", ne, toDisplayString(val4.campus?.name || "未知校区"), 1)])]), val3[5] || (val3[5] = createElementVNode("div", {
        class: "campaign-arrow"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))], 10, RingtonePageList))), 128))])])) : (openBlock(), createElementBlock("div", RingtonePageConfig_4, [val3[1] || (val3[1] = createVNodeWrapper('<div class="prompt-icon" data-v-a2630cc1><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-a2630cc1><path d="M9 18V5l12-2v13" data-v-a2630cc1></path><circle cx="6" cy="18" r="3" data-v-a2630cc1></circle><circle cx="18" cy="16" r="3" data-v-a2630cc1></circle></svg></div><h2 data-v-a2630cc1>登录后查看活动</h2><p data-v-a2630cc1>登录账号即可参与铃声征集活动</p>', 3)), createElementVNode("button", {
        class: "login-btn",
        onClick: val3[0] || (val3[0] = val4 => unref(useUserStore1).openLoginModal("请先登录以查看活动"))
      }, " 立即登录 ")]))])]), createVNode(PageFooter)]));
    }
  }),
  ve = withScopeId(ie, [["__scopeId", "data-v-a2630cc1"]]);
/* index 运行时导出（已语义化） */
export { ve as default };