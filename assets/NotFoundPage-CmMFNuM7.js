/*!
 * 页面模块：页面未找到（NotFoundPage）
 * 路由：/:pathMatch(.*)*   name=not-found   层级=1   需登录=否
 * 功能：公开的「页面未找到」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/NotFoundPage-CmMFNuM7.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, createElementBlock, createElementVNode, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const NotFoundPageConfig = {
    class: "not-found"
  },
  NotFoundPageConst1 = defineComponent({
    __name: "NotFoundPage",
    setup(val) {
      const useRouter1 = useRouter();
      function zz0() {
        useRouter1.push("/");
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", NotFoundPageConfig, [createElementVNode("div", {
        class: "content"
      }, [val2[0] || (val2[0] = createElementVNode("h1", {
        class: "code"
      }, "404", -1)), val2[1] || (val2[1] = createElementVNode("p", {
        class: "message"
      }, "页面不存在", -1)), createElementVNode("button", {
        class: "btn",
        onClick: zz0
      }, "返回首页")])]));
    }
  }),
  NotFoundPageConst2 = withScopeId(NotFoundPageConst1, [["__scopeId", "data-v-7840b945"]]);
/* index 运行时导出（已语义化） */
export { NotFoundPageConst2 as default };