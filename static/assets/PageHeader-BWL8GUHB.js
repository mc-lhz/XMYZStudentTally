/*!
 * 通用组件：PageHeader
 * 角色：页面公共头部组件，被多个页面复用（通过 X as P 导出）。
 * 来源：assets/PageHeader-BWL8GUHB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, inject, createElementBlock, createElementVNode, toDisplayString, withScope, createVNode, resolveAsset, toDisplayValue, Fragment, renderList, createVNodeWrapper, unref, useRouter, createTextVNode, normalizeClass, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 模板属性配置：page-header */
/* 模板属性配置：header-container mobile-header */
/* 模板属性配置：header-spacer */
/* 模板属性配置：header-title mobile-title */
/* 模板属性配置：header-center */
/* 模板属性配置：nav-links */
/* 模板属性配置：header-right */
const local_zb85 = {
    class: "page-header"
  },
  local_zb86 = {
    class: "header-container mobile-header"
  },
  local_zb87 = {
    key: 1,
    class: "header-spacer"
  },
  local_zb88 = {
    class: "header-title mobile-title"
  },
  local_zb89 = {
    class: "header-spacer"
  },
  PageHeaderConfig = {
    class: "header-container desktop-header"
  },
  PageHeaderConfig_2 = {
    class: "header-center"
  },
  PageHeaderConfig_3 = {
    class: "nav-links"
  },
  PageHeaderConfig_4 = {
    class: "header-right"
  },
  PageHeaderConfig_5 = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  PageHeaderConfig_6 = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  PageHeaderConst6 = defineComponent({
    __name: "PageHeader",
    props: {
      title: {},
      showBack: {
        type: Boolean,
        default: !0
      },
      backTo: {}
    },
    setup(val) {
      const val2 = val,
        val3 = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        refVal = ref(document.documentElement.classList.contains("dark")),
        val4 = applyDirectives(() => val2.title || val3.meta?.title || ""),
        list = [{
          path: "/",
          name: "home",
          label: "首页"
        }, {
          path: "/ticket",
          name: "ticket",
          label: "活动抢票"
        }, {
          path: "/ringtone",
          name: "ringtone",
          label: "宿舍铃声"
        }, {
          path: "/community",
          name: "community",
          label: "评分社区"
        }];
      function zz0(val1) {
        return val3.name === val1;
      }
      function zz1() {
        val2.backTo ? useRouter1.push(val2.backTo) : useRouter1.back();
      }
      function zz2() {
        refVal.value = !refVal.value, document.documentElement.classList.toggle("dark", refVal.value);
      }
      function zz3() {
        useUserStore1.openLoginModal();
      }
      function zz4() {
        useRouter1.push("/profile");
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => {
        const val6 = resolveAsset("router-link");
        return openBlock(), createElementBlock("header", local_zb85, [createElementVNode("div", local_zb86, [val.showBack ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "back-btn",
          onClick: zz1
        }, [...(val5[0] || (val5[0] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "15 18 9 12 15 6"
        })], -1)]))])) : (openBlock(), createElementBlock("div", local_zb87)), createElementVNode("h1", local_zb88, toDisplayString(val4.value), 1), createElementVNode("div", local_zb89, [withScope(val1.$slots, "mobile-right", {}, void 0)])]), createElementVNode("div", PageHeaderConfig, [createElementVNode("div", PageHeaderConfig_2, [createVNode(val6, {
          to: "/",
          class: "brand-link"
        }, {
          default: toDisplayValue(() => [...(val5[1] || (val5[1] = [createElementVNode("h1", {
            class: "header-title"
          }, "厦门一中学生社区", -1)]))]),
          _: 1
        })]), createElementVNode("nav", PageHeaderConfig_3, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val7 => createVNode(val6, {
          key: val7.name,
          to: val7.path,
          class: normalizeClass(["nav-link", {
            active: zz0(val7.name)
          }])
        }, {
          default: toDisplayValue(() => [createTextVNode(toDisplayString(val7.label), 1)]),
          _: 2
        }, 1032, ["to", "class"])), 64))]), createElementVNode("div", PageHeaderConfig_4, [createElementVNode("button", {
          class: "theme-toggle-btn",
          onClick: zz2,
          title: "切换主题"
        }, [refVal.value ? (openBlock(), createElementBlock("svg", PageHeaderConfig_5, [...(val5[2] || (val5[2] = [createVNodeWrapper('<circle cx="12" cy="12" r="5" data-v-8ea97a97></circle><line x1="12" y1="1" x2="12" y2="3" data-v-8ea97a97></line><line x1="12" y1="21" x2="12" y2="23" data-v-8ea97a97></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-v-8ea97a97></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-v-8ea97a97></line><line x1="1" y1="12" x2="3" y2="12" data-v-8ea97a97></line><line x1="21" y1="12" x2="23" y2="12" data-v-8ea97a97></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-v-8ea97a97></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-v-8ea97a97></line>', 9)]))])) : (openBlock(), createElementBlock("svg", PageHeaderConfig_6, [...(val5[3] || (val5[3] = [createElementVNode("path", {
          d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        }, null, -1)]))]))]), unref(useUserStore1).isLoggedIn ? (openBlock(), createElementBlock("button", {
          key: 1,
          class: "user-name-btn",
          onClick: zz4
        }, toDisplayString(unref(useUserStore1).user?.nickname || unref(useUserStore1).user?.username), 1)) : (openBlock(), createElementBlock("button", {
          key: 0,
          class: "login-btn",
          onClick: zz3
        }, " 登录 ")), withScope(val1.$slots, "desktop-right", {}, void 0)])])]);
      };
    }
  }),
  PageHeader = withScopeId(PageHeaderConst6, [["__scopeId", "data-v-8ea97a97"]]);
/* index 运行时导出（已语义化） */
export { PageHeader };