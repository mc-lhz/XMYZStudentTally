/*!
 * 通用组件：PageFooter
 * 角色：页面公共底部组件，被多个页面复用（通过 X as P 导出）。
 * 来源：assets/PageFooter-BK6at51a.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, createElementBlock, createVNodeWrapper, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const local_zb83 = {
    class: "page-footer"
  },
  local_zb84 = defineComponent({
    __name: "PageFooter",
    setup(val) {
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("footer", local_zb83, [...(val2[0] || (val2[0] = [createVNodeWrapper('<div class="footer-container" data-v-725cd928><div class="footer-links" data-v-725cd928><a href="#" data-v-725cd928>关于我们</a><a href="#" data-v-725cd928>使用条款</a><a href="#" data-v-725cd928>隐私政策</a><a href="#" data-v-725cd928>帮助中心</a></div><p class="copyright" data-v-725cd928>© 2026 厦门一中学生社区 · designed by 23届玄学狗狗</p><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="icp-link" data-v-725cd928> 闽ICP备2024074144号-4 </a></div>', 1)]))]));
    }
  }),
  PageFooter = withScopeId(local_zb84, [["__scopeId", "data-v-725cd928"]]);
/* index 运行时导出（已语义化） */
export { PageFooter };