/*!
 * 页面模块：时间线管理（MuseumIndexPage）
 * 路由：/admin/museum   name=admin-museum   层级=2   需登录=是
 * 功能：登录后的「时间线管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MuseumIndexPage-WGdLk3Gq.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createVNodeWrapper, Fragment, renderList, normalizeClass, createCommentVNode, toDisplayString, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 模板属性配置：page-container */
/* 模板属性配置：page-content */
/* 模板属性配置：content-container */
/* 模板属性配置：breadcrumb-wrapper */
/* 模板属性配置：menu-list */
/* 模板属性配置：menu-title */
/* 模板属性配置：menu-desc */
const MuseumIndexPageConfig = {
    class: "page-container"
  },
  MuseumIndexPageConfig_2 = {
    class: "page-content"
  },
  MuseumIndexPageConfig_3 = {
    class: "content-container"
  },
  MuseumIndexPageConfig_4 = {
    class: "breadcrumb-wrapper"
  },
  MuseumIndexPageConfig_5 = {
    class: "menu-list"
  },
  MuseumIndexPageList = ["onClick"],
  MuseumIndexPageConfig_6 = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  MuseumIndexPageConfig_7 = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_zb70 = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  local_zb71 = {
    class: "menu-info"
  },
  local_zb72 = {
    class: "menu-title"
  },
  local_zb73 = {
    class: "menu-desc"
  },
  local_zb74 = defineComponent({
    __name: "MuseumIndexPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        list = [{
          title: "瞬间管理",
          description: "审核和管理用户投稿的瞬间",
          icon: "moment",
          path: "/admin/museum/moments"
        }, {
          title: "活动管理",
          description: "创建和管理时间线活动",
          icon: "event",
          path: "/admin/museum/events"
        }, {
          title: "标签管理",
          description: "管理活动分类标签",
          icon: "tag",
          path: "/admin/museum/tags"
        }];
      function zz0(val1) {
        useRouter1.push(val1);
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMuseum) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", MuseumIndexPageConfig, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", MuseumIndexPageConfig_2, [createElementVNode("div", MuseumIndexPageConfig_3, [createElementVNode("div", MuseumIndexPageConfig_4, [createVNode(PageBreadcrumb)]), val2[4] || (val2[4] = createVNodeWrapper('<div class="page-header-section" data-v-4c79e075><div class="header-main" data-v-4c79e075><div class="header-text" data-v-4c79e075><h1 class="page-title" data-v-4c79e075>时间线管理</h1><p class="page-subtitle" data-v-4c79e075>管理瞬间、活动和标签</p></div></div></div>', 1)), createElementVNode("div", MuseumIndexPageConfig_5, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val3 => createElementVNode("div", {
        key: val3.path,
        class: "menu-card",
        onClick: val4 => zz0(val3.path)
      }, [createElementVNode("div", {
        class: normalizeClass(["menu-icon", val3.icon])
      }, [val3.icon === "moment" ? (openBlock(), createElementBlock("svg", MuseumIndexPageConfig_6, [...(val2[0] || (val2[0] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }, null, -1), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      }, null, -1)]))])) : createCommentVNode("", !0), val3.icon === "event" ? (openBlock(), createElementBlock("svg", MuseumIndexPageConfig_7, [...(val2[1] || (val2[1] = [createElementVNode("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }, null, -1), createElementVNode("line", {
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6"
      }, null, -1), createElementVNode("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6"
      }, null, -1), createElementVNode("line", {
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10"
      }, null, -1)]))])) : createCommentVNode("", !0), val3.icon === "tag" ? (openBlock(), createElementBlock("svg", local_zb70, [...(val2[2] || (val2[2] = [createElementVNode("path", {
        d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
      }, null, -1), createElementVNode("line", {
        x1: "7",
        y1: "7",
        x2: "7.01",
        y2: "7"
      }, null, -1)]))])) : createCommentVNode("", !0)], 2), createElementVNode("div", local_zb71, [createElementVNode("h3", local_zb72, toDisplayString(val3.title), 1), createElementVNode("p", local_zb73, toDisplayString(val3.description), 1)]), val2[3] || (val2[3] = createElementVNode("div", {
        class: "menu-arrow"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))], 8, MuseumIndexPageList)), 64))])])]), createVNode(PageFooter)]));
    }
  }),
  local_zb75 = withScopeId(local_zb74, [["__scopeId", "data-v-4c79e075"]]);
/* index 运行时导出（已语义化） */
export { local_zb75 as default };