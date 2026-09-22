/*!
 * 页面模块：选择小分区（MinorSectionPage）
 * 路由：/community/major/:majorId   name=community-major   层级=2   需登录=否
 * 功能：公开的「选择小分区」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MinorSectionPage-CaGZwHME.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, inject, ref, onMounted, appProvider, directiveUm, nextTick, createElementBlock, createVNode, createElementVNode, createCommentVNode, createVNodeWrapper, Fragment, renderList, createTextVNode, unref, useToast, useRouter, resolveRaw, toDisplayString, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getRatingCommunityMajorSectionsMinorSectionsById } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：本地模块 FeedbackDrawer（站点内功能模块） */
import { scopedStyle_zb0 as oe } from "./FeedbackDrawer-BX330nGh.js";
const ne = {
    class: "page-container"
  },
  ae = {
    class: "page-content"
  },
  se = {
    class: "content-container"
  },
  re = {
    key: 0,
    class: "loading-container"
  },
  ie = {
    key: 1,
    class: "empty-container"
  },
  ce = {
    key: 2,
    id: "tour-minor-section-grid",
    class: "section-grid"
  },
  de = ["id", "onClick"],
  le = {
    class: "section-cover"
  },
  ue = ["src", "alt"],
  ge = {
    class: "section-info"
  },
  fe = {
    class: "section-name"
  },
  ve = {
    key: 0,
    class: "section-desc"
  },
  me = {
    key: 3,
    class: "feedback-prompt"
  },
  pe = defineComponent({
    __name: "MinorSectionPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        {
          shouldStartTour: val3,
          getCurrentStep: val4,
          TourStep: val5,
          saveStep: val6,
          highlightElement: val7,
          destroyDriver: val8
        } = appProvider(),
        val9 = Number(val2.params.majorId),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(!1);
      function zz0() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        refVal3.value = !0;
      }
      function zz1() {
        refVal3.value = !1;
      }
      function zz2() {}
      async function zz3() {
        refVal.value = !0;
        try {
          const val1 = await getRatingCommunityMajorSectionsMinorSectionsById(val9);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取分区列表失败");
        } catch {
          useToast1.error("获取分区列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz4(val1) {
        useRouter1.push(`/community/minor/${val1.id}`);
      }
      const list = ["linear-gradient(135deg, #667eea, #764ba2)", "linear-gradient(135deg, #f093fb, #f5576c)", "linear-gradient(135deg, #4facfe, #00f2fe)", "linear-gradient(135deg, #43e97b, #38f9d7)", "linear-gradient(135deg, #fa709a, #fee140)", "linear-gradient(135deg, #a8edea, #fed6e3)"];
      function zz5(val1) {
        return list[val1 % list.length] || "linear-gradient(135deg, #667eea, #764ba2)";
      }
      onMounted(() => {
        if (zz3(), val3()) {
          const val1 = val4();
          val1 >= val5.MINOR_SECTION_INTRO && val1 <= val5.MINOR_SECTION_CLICK && zz6(val1);
        }
      }), directiveUm(() => {
        val8();
      });
      function zz6(val1) {
        const interval = setInterval(() => {
          !refVal.value && refVal2.value.length > 0 && (clearInterval(interval), setTimeout(() => {
            zz7(val1);
          }, 300));
        }, 100);
        setTimeout(() => clearInterval(interval), 5e3);
      }
      function zz7(val1) {
        switch (val1) {
          case val5.MINOR_SECTION_INTRO:
            zz8();
            break;
          case val5.MINOR_SECTION_FEEDBACK:
            zz9();
            break;
          case val5.MINOR_SECTION_CLICK:
            zz10();
            break;
        }
      }
      function zz8() {
        val7("#tour-minor-section-grid", "选择小分区", "这里将显示该分类下的所有小分区，点击可以查看该分区内的评分项目。", {
          side: "bottom",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.MINOR_SECTION_FEEDBACK), val8(), nextTick(() => zz9());
          }
        });
      }
      function zz9() {
        val7("#tour-minor-feedback", "新建分区", "如果没找到想要的分区，可以点击这里发起添加请求。", {
          side: "top",
          nextBtnText: "我知道了",
          onNextClick: () => {
            val6(val5.MINOR_SECTION_CLICK), val8(), nextTick(() => zz10());
          }
        });
      }
      function zz10() {
        val7("#tour-first-minor-section", "查看评分项目", "点击选择小分区查看评分项目列表。", {
          side: "bottom",
          nextBtnText: "查看项目",
          onNextClick: () => {
            val6(val5.RATING_LIST_INTRO), val8(), refVal2.value.length > 0 && zz4(refVal2.value[0]);
          }
        });
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val10) => (openBlock(), createElementBlock("div", ne, [createVNode(PageHeader), createElementVNode("main", ae, [createElementVNode("div", se, [val10[4] || (val10[4] = createElementVNode("h1", {
        class: "page-title desktop-only"
      }, "选择小分区", -1)), refVal.value ? (openBlock(), createElementBlock("div", re, [...(val10[0] || (val10[0] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", ie, [...(val10[1] || (val10[1] = [createVNodeWrapper('<div class="empty-icon" data-v-8d437b3e><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-8d437b3e><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-8d437b3e></rect><line x1="3" y1="9" x2="21" y2="9" data-v-8d437b3e></line><line x1="9" y1="21" x2="9" y2="9" data-v-8d437b3e></line></svg></div><h2 data-v-8d437b3e>暂无区域</h2><p data-v-8d437b3e>该分区暂无可用区域</p>', 3)]))])) : (openBlock(), createElementBlock("div", ce, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, (val11, val12) => (openBlock(), createElementBlock("div", {
        key: val11.id,
        id: val12 === 0 ? "tour-first-minor-section" : void 0,
        class: "section-card",
        onClick: val13 => zz4(val11)
      }, [createElementVNode("div", le, [val11.url ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val11.url,
        alt: val11.name,
        loading: "lazy"
      }, null, 8, ue)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "section-placeholder",
        style: resolveRaw({
          background: zz5(val12)
        })
      }, [...(val10[2] || (val10[2] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }), createElementVNode("line", {
        x1: "3",
        y1: "9",
        x2: "21",
        y2: "9"
      }), createElementVNode("line", {
        x1: "9",
        y1: "21",
        x2: "9",
        y2: "9"
      })], -1)]))], 4))]), createElementVNode("div", ge, [createElementVNode("h3", fe, toDisplayString(val11.name), 1), val11.description ? (openBlock(), createElementBlock("p", ve, toDisplayString(val11.description), 1)) : createCommentVNode("", !0)])], 8, de))), 128))])), refVal.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", me, [createElementVNode("button", {
        id: "tour-minor-feedback",
        class: "feedback-link",
        onClick: zz0
      }, [...(val10[3] || (val10[3] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "16"
      }), createElementVNode("line", {
        x1: "8",
        y1: "12",
        x2: "16",
        y2: "12"
      })], -1), createTextVNode(" 没找到想要的分区？点我发起新建请求 ", -1)]))])]))])]), createVNode(PageFooter), createVNode(oe, {
        "is-open": refVal3.value,
        "contribution-type": 2,
        "target-type": 1,
        "parent-id": unref(val9),
        "school-id": 1,
        onClose: zz1,
        onSuccess: zz2
      }, null, 8, ["is-open", "parent-id"])]));
    }
  }),
  Ce = withScopeId(pe, [["__scopeId", "data-v-8d437b3e"]]);
/* index 运行时导出（已语义化） */
export { Ce as default };