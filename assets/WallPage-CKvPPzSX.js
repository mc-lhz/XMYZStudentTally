/*!
 * 页面模块：厦一万能墙（WallPage）
 * 路由：/wall   name=wall   层级=1   需登录=否
 * 功能：公开的「厦一万能墙」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/WallPage-CKvPPzSX.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, createElementBlock, createVNode, createElementVNode, unref, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const WallPageConst0 = "/assets/wall-DFhZ-_8T.jpg",
  WallPageConfig = {
    class: "page-container"
  },
  WallPageConfig_2 = {
    class: "page-content"
  },
  WallPageConfig_3 = {
    class: "content-container"
  },
  WallPageConfig_4 = {
    class: "wall-image-container"
  },
  WallPageList = ["src"],
  WallPageConst6 = defineComponent({
    __name: "WallPage",
    setup(val) {
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", WallPageConfig, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", WallPageConfig_2, [createElementVNode("div", WallPageConfig_3, [createElementVNode("div", WallPageConfig_4, [createElementVNode("img", {
        src: unref(WallPageConst0),
        alt: "厦一万能墙",
        class: "wall-image"
      }, null, 8, WallPageList)])])]), createVNode(PageFooter)]));
    }
  }),
  WallPageConst7 = withScopeId(WallPageConst6, [["__scopeId", "data-v-b5d0ded8"]]);
/* index 运行时导出（已语义化） */
export { WallPageConst7 as default };