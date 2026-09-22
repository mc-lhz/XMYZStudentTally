/*!
 * 模块：voices-theme（voices-theme-B9KdZorS.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/voices-theme-B9KdZorS.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { ref, defineComponent, createElementBlock, createElementVNode, useRouter, openBlock, createBlock, toDisplayValue, withSlots, createCommentVNode, unref, normalizeClass, toDisplayString, withScopeId, directiveBum } from "./index-DJrtCu9i.js";
const voicesConst0 = ref(null);
let voicesConst1 = 0,
  voicesConst2 = null;
function zz0(val, zz1 = "info", zz2 = 2600) {
  voicesConst0.value = {
    id: ++voicesConst1,
    message: val,
    type: zz1
  }, voicesConst2 && window.clearTimeout(voicesConst2), voicesConst2 = window.setTimeout(() => voicesConst0.value = null, zz2);
}
function zz3() {
  voicesConst2 && window.clearTimeout(voicesConst2), voicesConst2 = null, voicesConst0.value = null;
}
function zz4() {
  return {
    current: voicesConst0,
    close: zz3,
    show: zz0,
    success: val => zz0(val, "success"),
    error: val => zz0(val, "error", 3200),
    info: val => zz0(val, "info")
  };
}
/* 模板属性配置：vx-notice-stamp */
/* 模板属性配置：vx-notice-text vx-kaiti */
const voicesList = ["aria-label"],
  voicesConfig = {
    key: 0,
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true"
  },
  voicesConfig_2 = {
    key: 1,
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true"
  },
  VxBackButton = defineComponent({
    __name: "VxBackButton",
    props: {
      to: {},
      home: {
        type: Boolean
      }
    },
    setup(val) {
      const val2 = val,
        useRouter1 = useRouter();
      function zz5() {
        val2.to ? useRouter1.push(val2.to) : useRouter1.back();
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("button", {
        class: "vx-back-circle",
        type: "button",
        "aria-label": val.home ? "回到主页" : "返回",
        onClick: zz5
      }, [val.home ? (openBlock(), createElementBlock("svg", voicesConfig, [...(val3[0] || (val3[0] = [createElementVNode("path", {
        d: "M4 11 L12 4 L20 11"
      }, null, -1), createElementVNode("path", {
        d: "M6 10 V19 a1 1 0 0 0 1 1 h10 a1 1 0 0 0 1-1 V10"
      }, null, -1), createElementVNode("path", {
        d: "M10 20 v-6 h4 v6"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", voicesConfig_2, [...(val3[1] || (val3[1] = [createElementVNode("path", {
        d: "M15 5 L8 12 L15 19"
      }, null, -1)]))]))], 8, voicesList));
    }
  }),
  voicesConfig_3 = {
    class: "vx-notice-stamp"
  },
  voicesConfig_4 = {
    class: "vx-notice-text vx-kaiti"
  },
  voicesConst10 = defineComponent({
    __name: "VxNoticeHost",
    setup(val) {
      const {
          current: val2,
          close: val3
        } = zz4(),
        obj = {
          success: "已阅",
          error: "驳回",
          info: "提示"
        };
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createBlock(withSlots, {
        name: "vx-notice"
      }, {
        default: toDisplayValue(() => [unref(val2) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "vx-notice-mask",
          onClick: val4[0] || (val4[0] = (...val5) => unref(val3) && unref(val3)(...val5))
        }, [(openBlock(), createElementBlock("div", {
          key: unref(val2).id,
          class: normalizeClass(["vx-notice-card", `vx-notice-card--${unref(val2).type}`])
        }, [createElementVNode("span", voicesConfig_3, toDisplayString(obj[unref(val2).type]), 1), createElementVNode("p", voicesConfig_4, toDisplayString(unref(val2).message), 1)], 2))])) : createCommentVNode("", !0)]),
        _: 1
      }));
    }
  }),
  VxNoticeHostScoped = withScopeId(voicesConst10, [["__scopeId", "data-v-62cd8186"]]),
  voicesConst11 = "(min-width: 920px)";
function zz6() {
  const val = window.matchMedia(voicesConst11),
    refVal = ref(val.matches),
    fn = val1 => {
      refVal.value = val1.matches;
    };
  return val.addEventListener("change", fn), directiveBum(() => val.removeEventListener("change", fn)), refVal;
}
/* index 运行时导出（已语义化） */
export { VxNoticeHostScoped, VxBackButton, zz4 as useVxToast, zz6 as showToast };