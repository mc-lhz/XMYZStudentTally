/*!
 * 模块：VxTabs.vue_vue_type_script_setup_true_lang（VxTabs.vue_vue_type_script_setup_true_lang-fKsEzOL3.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/VxTabs.vue_vue_type_script_setup_true_lang-fKsEzOL3.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, applyDirectives, createElementBlock, resolveRaw, createElementVNode, Fragment, renderList, normalizeClass, toDisplayString, openBlock } from "./index-DJrtCu9i.js";
const VxTabs_vue_vue_type_script_setup_true_langList = ["onClick"],
  helper_zb4 = defineComponent({
    __name: "VxTabs",
    props: {
      options: {},
      modelValue: {}
    },
    emits: ["update:modelValue"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = val,
        val4 = zz0,
        val5 = applyDirectives(() => {
          const val1 = val3.options.findIndex(val6 => val6.value === val3.modelValue);
          return val1 < 0 ? 0 : val1;
        });
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", {
        class: "vx-tabs",
        style: resolveRaw({
          "--vx-tabs-count": val.options.length,
          "--vx-tabs-index": val5.value
        })
      }, [val6[0] || (val6[0] = createElementVNode("span", {
        class: "vx-tabs-slider"
      }, null, -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(val.options, val7 => (openBlock(), createElementBlock("button", {
        key: val7.value,
        type: "button",
        class: normalizeClass(["vx-tab", {
          "vx-tab--active": val7.value === val.modelValue
        }]),
        onClick: val8 => val4("update:modelValue", val7.value)
      }, toDisplayString(val7.label), 11, VxTabs_vue_vue_type_script_setup_true_langList))), 128))], 4));
    }
  });
/* index 运行时导出（已语义化） */
export { helper_zb4 };