/*!
 * 通用组件：PageBreadcrumb
 * 角色：面包屑导航组件，被多个页面复用（通过 X as P 导出）。
 * 来源：assets/PageBreadcrumb-BfFUydNi.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import {
  defineComponent,
  applyDirectives,
  resolveList,
  inject,
  createElementBlock,
  Fragment,
  renderList,
  createCommentVNode,
  createBlock,
  toDisplayValue,
  createTextVNode,
  toDisplayString,
  resolveAsset,
  openBlock,
  withScopeId
} from "./index-DJrtCu9i.js";
/* 模板属性配置：breadcrumb-current */
const PageBreadcrumbConfig = {
    class: "breadcrumb",
    "aria-label": "面包屑导航"
  },
  breadcrumbSepAttrs = {
    key: 0,
    class: "breadcrumb-sep"
  },
  breadcrumbCurrentAttrs = {
    key: 2,
    class: "breadcrumb-current"
  },
  PageBreadcrumbComponent = defineComponent({
    __name: "PageBreadcrumb",
    props: {
      items: {}
    },
    setup(props) {
      const setupProps = props,
        route = inject(),
        displayItems = applyDirectives(() => setupProps.items && setupProps.items.length > 0 ? setupProps
          .items : resolveList(route.name));
      return /* 渲染函数：构建组件模板 DOM 结构 */ (ctx, cache) => {
        const RouterLink = resolveAsset("router-link");
        return openBlock(), createElementBlock("nav", PageBreadcrumbConfig, [(openBlock(!0),
          createElementBlock(Fragment, null, renderList(displayItems.value, (item, index) => (
            openBlock(), createElementBlock(Fragment, {
              key: item.path
            }, [index > 0 ? (openBlock(), createElementBlock("span", breadcrumbSepAttrs,
              "/")) : createCommentVNode("", !0), index < displayItems.value.length - 1 ? (
                openBlock(), createBlock(RouterLink, {
                  key: 1,
                  to: item.path,
                  class: "breadcrumb-link"
                }, {
                  default: toDisplayValue(() => [createTextVNode(toDisplayString(item
                    .title), 1)]),
                  _: 2
                }, 1032, ["to"])) : (openBlock(), createElementBlock("span",
                breadcrumbCurrentAttrs, toDisplayString(item.title), 1))
            ], 64))), 128))]);
      };
    }
  }),
  PageBreadcrumb = withScopeId(PageBreadcrumbComponent, [
    ["__scopeId", "data-v-1507b835"]
  ]);
/* index 运行时导出（已语义化） */
export {
  PageBreadcrumb
};