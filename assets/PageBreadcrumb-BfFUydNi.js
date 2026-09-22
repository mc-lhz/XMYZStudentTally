/*!
 * 通用组件：PageBreadcrumb
 * 角色：面包屑导航组件，被多个页面复用（通过 X as P 导出）。
 * 来源：assets/PageBreadcrumb-BfFUydNi.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, applyDirectives, resolveList, inject, createElementBlock, Fragment, renderList, createCommentVNode, createBlock, toDisplayValue, createTextVNode, toDisplayString, resolveAsset, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 模板属性配置：breadcrumb-current */
const PageBreadcrumbConfig = {
    class: "breadcrumb",
    "aria-label": "面包屑导航"
  },
  local_zb80 = {
    key: 0,
    class: "breadcrumb-sep"
  },
  local_zb81 = {
    key: 2,
    class: "breadcrumb-current"
  },
  local_zb82 = defineComponent({
    __name: "PageBreadcrumb",
    props: {
      items: {}
    },
    setup(val) {
      const val2 = val,
        val3 = inject(),
        val4 = applyDirectives(() => val2.items && val2.items.length > 0 ? val2.items : resolveList(val3.name));
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => {
        const val6 = resolveAsset("router-link");
        return openBlock(), createElementBlock("nav", PageBreadcrumbConfig, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val4.value, (val7, val8) => (openBlock(), createElementBlock(Fragment, {
          key: val7.path
        }, [val8 > 0 ? (openBlock(), createElementBlock("span", local_zb80, "/")) : createCommentVNode("", !0), val8 < val4.value.length - 1 ? (openBlock(), createBlock(val6, {
          key: 1,
          to: val7.path,
          class: "breadcrumb-link"
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val7.title), 1)]),
          _: 2
        }, 1032, ["to"])) : (openBlock(), createElementBlock("span", local_zb81, toDisplayString(val7.title), 1))], 64))), 128))]);
      };
    }
  }),
  PageBreadcrumb = withScopeId(local_zb82, [["__scopeId", "data-v-1507b835"]]);
/* index 运行时导出（已语义化） */
export { PageBreadcrumb };