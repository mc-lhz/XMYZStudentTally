/*!
 * 模块：VxLoading（VxLoading-5_b9iJ9q.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/VxLoading-5_b9iJ9q.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, createElementBlock, createVNodeWrapper, createElementVNode, toDisplayString, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const VxLoadingConfig = {
    class: "vx-loading"
  },
  VxLoadingConfig_2 = {
    class: "vx-loading-text vx-kaiti"
  },
  VxLoadingConst2 = defineComponent({
    __name: "VxLoading",
    props: {
      text: {
        default: "加载中…"
      }
    },
    setup(val) {
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", VxLoadingConfig, [val2[0] || (val2[0] = createVNodeWrapper('<div class="vx-loading-stage" data-v-7d721bc1><svg class="vx-loading-pen" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-7d721bc1><path d="M4 20 l1.2 -4.2 L16.6 4.4 a2 2 0 0 1 2.8 0 l0.2 0.2 a2 2 0 0 1 0 2.8 L8.2 18.8 Z" data-v-7d721bc1></path><path d="M14.5 6.5 l3 3" data-v-7d721bc1></path></svg><span class="vx-loading-line" data-v-7d721bc1></span></div>', 1)), createElementVNode("span", VxLoadingConfig_2, toDisplayString(val.text), 1)]));
    }
  }),
  scopedStyle_zb3 = withScopeId(VxLoadingConst2, [["__scopeId", "data-v-7d721bc1"]]);
/* index 运行时导出（已语义化） */
export { scopedStyle_zb3 };