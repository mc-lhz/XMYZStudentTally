/*!
 * 页面模块：配置活动（TallyActivityEditPage）
 * 路由：/admin/tally/activities/:id/edit    name=admin-tally-edit    level=3    需登录=是
 * 功能：单个活动的详情编辑页。改名 / 改状态 / 候选人增删改；提供「进入唱票控制台」入口。
 *
 * 来源：assets/TallyActivityEditPage-DFD129SB.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：编译产物（变量名 val / zz0..zzN）。为不破坏随后的渲染树，本文件保留全部标识符原貌，
 *       仅通过以下映射注释告诉你每个名字的业务含义。
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, applyDirectives, inject, ref, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, renderList, toDisplayValue, resolveAsset, withModifiers, withDirectives, vModelText, withKeys, useToast, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivitiesById as ne, updateAdminTallyActivities, createAdminTallyActivitiesCandidates as ie, updateAdminTallyCandidates as de, deleteAdminTallyCandidates as re } from "./tally-DC36h0vE.js";
const ue = {
    class: "page-container"
  },
  ce = {
    class: "page-content"
  },
  me = {
    class: "content-container"
  },
  ve = {
    class: "breadcrumb-wrapper"
  },
  pe = {
    key: 0,
    class: "loading-container"
  },
  fe = {
    class: "page-header-section"
  },
  ye = {
    class: "header-main"
  },
  be = {
    class: "header-text"
  },
  _e = {
    class: "title-row"
  },
  ge = {
    class: "page-title"
  },
  he = {
    class: "header-actions"
  },
  ke = ["value"],
  Ce = {
    class: "candidates-section"
  },
  we = {
    key: 0,
    class: "empty-mini"
  },
  xe = {
    key: 1,
    class: "table-wrapper"
  },
  Oe = {
    class: "data-table"
  },
  Ne = {
    class: "cell-num"
  },
  Ve = {
    class: "cell-name"
  },
  Pe = {
    class: "cell-votes"
  },
  Be = {
    class: "row-actions"
  },
  Me = ["onClick"],
  Ae = ["onClick"],
  Se = {
    class: "back-link-wrap"
  },
  Ue = {
    class: "modal"
  },
  De = {
    class: "modal-body"
  },
  Ee = {
    class: "form-group"
  },
  Ie = {
    class: "modal-foot"
  },
  Re = ["disabled"],
  Te = ["disabled"],
  $e = {
    class: "modal"
  },
  Fe = {
    class: "modal-head"
  },
  Ke = {
    class: "modal-body"
  },
  Le = {
    class: "form-row"
  },
  ze = {
    class: "form-group"
  },
  je = {
    class: "form-group"
  },
  qe = {
    class: "form-group"
  },
  Ge = {
    class: "modal-foot"
  },
  He = ["disabled"],
  Je = ["disabled"],
  Qe = defineComponent({
    __name: "TallyActivityEditPage",
    setup(val) {
      /* ---- 局部命名 → 业务语义映射 ----
        * inject()                 = route（来自 useRoute，Vue Router 自动注入）
        * applyDirectives(ref(n))  = 解析 URL 中的活动 ID，转 Number
        * refVal  = isLoading
        * refVal2 = activity            当前活动详情（含 candidates）
        * computed = sortedCandidates   按 displayOrder 升序的候选人列表
        * refVal3 = isRenameModalOpen   「改名」弹窗显隐
        * refVal4 = renameDraftTitle    改名暂存
        * refVal5 = isRenaming
        * refVal6 = isCandidateModalOpen 「添加/编辑候选人」弹窗显隐
        * refVal7 = editingCandidateId  null=新增；数字=编辑现有
        * refVal8 = candidateDraft      {number, name, displayOrder}
        * refVal9 = isSavingCandidate
        *
        * zz0 = statusText         status -> 中文标签
        * zz1 = statusBadgeClass
        * zz2 = loadActivity       拉取活动详情
        * zz3 = openRenameModal
        * zz4 = closeRenameModal
        * zz5 = submitRename
        * zz6 = changeStatus       顶部 select 切状态
        * zz7 = openAddCandidate   自动设置 displayOrder = 当前最大 + 1
        * zz8 = openEditCandidate  回填 refVal8 进入编辑模式
        * zz9 = closeCandidateModal
        * zz10 = submitCandidate   新增 / 编辑共用，根据 editingCandidateId 走不同接口
        * zz11 = deleteCandidate   含 confirm
        * zz12 = goToControlPage
        **/

      const val2 = inject(),
        useRouter1 = useRouter(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(null),
        val4 = applyDirectives(() => [...(refVal2.value?.candidates || [])].sort((val1, val5) => val1.displayOrder - val5.displayOrder)),
        refVal3 = ref(!1),
        refVal4 = ref(""),
        refVal5 = ref(!1),
        refVal6 = ref(!1),
        refVal7 = ref(null),
        refVal8 = ref({
          number: "",
          name: "",
          displayOrder: 0
        }),
        refVal9 = ref(!1);
      function zz0(val1) {
        return val1 === 0 ? "待开始" : val1 === 1 ? "进行中" : "已结束";
      }
      function zz1(val1) {
        return val1 === 0 ? "pending" : val1 === 1 ? "live" : "ended";
      }
      async function zz2() {
        if (!val3.value || Number.isNaN(val3.value)) {
          useToast1.error("活动 ID 无效");
          return;
        }
        refVal.value = !0;
        try {
          const val1 = await ne(val3.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "加载失败");
        } catch (val1) {
          useToast1.error(val1?.message || "网络错误");
        } finally {
          refVal.value = !1;
        }
      }
      function zz3() {
        refVal4.value = refVal2.value?.title || "", refVal3.value = !0;
      }
      function zz4() {
        refVal5.value || (refVal3.value = !1);
      }
      async function zz5() {
        const val1 = refVal4.value.trim();
        if (!val1) {
          useToast1.warning("标题不能为空");
          return;
        }
        refVal5.value = !0;
        try {
          const val5 = await updateAdminTallyActivities(val3.value, {
            title: val1
          });
          val5.data.code === 200 ? (useToast1.success("已更新"), refVal3.value = !1, await zz2()) : useToast1.error(val5.data.message || "更新失败");
        } catch (val5) {
          useToast1.error(val5?.message || "网络错误");
        } finally {
          refVal5.value = !1;
        }
      }
      async function zz6(val1) {
        if (!refVal2.value) return;
        const val5 = val1.target,
          val6 = Number(val5.value),
          val7 = refVal2.value.status;
        if (val6 !== val7) try {
          const val8 = await updateAdminTallyActivities(val3.value, {
            status: val6
          });
          val8.data.code === 200 ? (useToast1.success("状态已更新"), await zz2()) : (useToast1.error(val8.data.message || "更新失败"), val5.value = String(val7));
        } catch (val8) {
          useToast1.error(val8?.message || "网络错误"), val5.value = String(val7);
        }
      }
      function zz7() {
        refVal7.value = null;
        const val1 = val4.value.reduce((val5, val6) => Math.max(val5, val6.displayOrder), 0);
        refVal8.value = {
          number: "",
          name: "",
          displayOrder: val1 + 1
        }, refVal6.value = !0;
      }
      function zz8(val1) {
        refVal7.value = val1.id, refVal8.value = {
          number: val1.number,
          name: val1.name,
          displayOrder: val1.displayOrder
        }, refVal6.value = !0;
      }
      function zz9() {
        refVal9.value || (refVal6.value = !1);
      }
      async function zz10() {
        const val1 = refVal8.value.number.trim(),
          val5 = refVal8.value.name.trim(),
          val6 = Number(refVal8.value.displayOrder) || 0;
        if (!val1) {
          useToast1.warning("请输入编号");
          return;
        }
        if (!val5) {
          useToast1.warning("请输入姓名");
          return;
        }
        refVal9.value = !0;
        try {
          if (refVal7.value === null) {
            const val7 = await ie(val3.value, {
              number: val1,
              name: val5,
              displayOrder: val6
            });
            val7.data.code === 200 ? (useToast1.success("已添加"), refVal6.value = !1, await zz2()) : useToast1.error(val7.data.message || "添加失败");
          } else {
            const val7 = await de(refVal7.value, {
              number: val1,
              name: val5,
              displayOrder: val6
            });
            val7.data.code === 200 ? (useToast1.success("已更新"), refVal6.value = !1, await zz2()) : useToast1.error(val7.data.message || "更新失败");
          }
        } catch (val7) {
          useToast1.error(val7?.message || "网络错误");
        } finally {
          refVal9.value = !1;
        }
      }
      async function zz11(val1) {
        if (confirm(`确认删除候选人「${val1.number} · ${val1.name}」？
其历史唱票记录将一并删除。`)) try {
          const val5 = await re(val1.id);
          val5.data.code === 200 ? (useToast1.success("已删除"), await zz2()) : useToast1.error(val5.data.message || "删除失败");
        } catch (val5) {
          useToast1.error(val5?.message || "网络错误");
        }
      }
      function zz12() {
        useRouter1.push(`/admin/tally/activities/${val3.value}/control`);
      }
      /* ---- 渲染函数 ----
       *   Vue 编译产物；以 createElementBlock 树描述 DOM，由 withScopeId 注入 scoped CSS 哈希。
       *   三个模态：「改名」「添加/编辑候选人」「loading 兜底」；其余结构按渲染顺序阅读即可。
       *   zz10 内部根据 refVal7（编辑 ID）派发到 create 或 update 接口，是 TallyActivityEditPage 的关键分支点。
       */
      return onMounted(zz2), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => {
        const val6 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", ue, [createVNode(PageHeader, {
          "back-to": "/admin/tally"
        }), createElementVNode("main", ce, [createElementVNode("div", me, [createElementVNode("div", ve, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", pe, [...(val5[4] || (val5[4] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createElementVNode("div", fe, [createElementVNode("div", ye, [createElementVNode("div", be, [createElementVNode("div", _e, [createElementVNode("h1", ge, toDisplayString(refVal2.value.title), 1), createElementVNode("span", {
          class: normalizeClass(["badge", zz1(refVal2.value.status)])
        }, toDisplayString(zz0(refVal2.value.status)), 3)]), val5[5] || (val5[5] = createElementVNode("p", {
          class: "page-subtitle"
        }, "配置候选人、调整状态", -1))]), createElementVNode("div", he, [createElementVNode("button", {
          class: "action-button secondary",
          onClick: zz3
        }, "改名"), createElementVNode("select", {
          class: "status-select-lg",
          value: refVal2.value.status,
          onChange: zz6
        }, [...(val5[6] || (val5[6] = [createElementVNode("option", {
          value: 0
        }, "待开始", -1), createElementVNode("option", {
          value: 1
        }, "进行中", -1), createElementVNode("option", {
          value: 2
        }, "已结束", -1)]))], 40, ke), createElementVNode("button", {
          class: "action-button primary",
          onClick: zz12
        }, "进入唱票控制台")])])]), createElementVNode("section", Ce, [createElementVNode("div", {
          class: "section-head"
        }, [val5[8] || (val5[8] = createElementVNode("h2", {
          class: "section-title"
        }, "候选人", -1)), createElementVNode("button", {
          class: "action-button primary",
          onClick: zz7
        }, [...(val5[7] || (val5[7] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("line", {
          x1: "12",
          y1: "5",
          x2: "12",
          y2: "19"
        }), createElementVNode("line", {
          x1: "5",
          y1: "12",
          x2: "19",
          y2: "12"
        })], -1), createTextVNode(" 添加候选人 ", -1)]))])]), val4.value.length === 0 ? (openBlock(), createElementBlock("div", we, [...(val5[9] || (val5[9] = [createElementVNode("p", null, "暂无候选人，点击右上「添加候选人」", -1)]))])) : (openBlock(), createElementBlock("div", xe, [createElementVNode("table", Oe, [val5[10] || (val5[10] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", {
          class: "col-num"
        }, "编号"), createElementVNode("th", null, "姓名"), createElementVNode("th", {
          class: "col-order"
        }, "显示顺序"), createElementVNode("th", {
          class: "col-votes"
        }, "当前票数"), createElementVNode("th", {
          class: "col-actions"
        }, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val4.value, val7 => (openBlock(), createElementBlock("tr", {
          key: val7.id
        }, [createElementVNode("td", Ne, toDisplayString(val7.number), 1), createElementVNode("td", Ve, toDisplayString(val7.name), 1), createElementVNode("td", null, toDisplayString(val7.displayOrder), 1), createElementVNode("td", Pe, toDisplayString(val7.voteCount), 1), createElementVNode("td", null, [createElementVNode("div", Be, [createElementVNode("button", {
          class: "act-btn",
          onClick: val8 => zz8(val7)
        }, "编辑", 8, Me), createElementVNode("button", {
          class: "act-btn danger",
          onClick: val8 => zz11(val7)
        }, "删除", 8, Ae)])])]))), 128))])])]))]), createElementVNode("div", Se, [createVNode(val6, {
          to: "/admin/tally",
          class: "back-link"
        }, {
          default: toDisplayValue(() => [...(val5[11] || (val5[11] = [createTextVNode("← 返回活动列表", -1)]))]),
          _: 1
        })])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), refVal3.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-mask",
          onClick: withModifiers(zz4, ["self"])
        }, [createElementVNode("div", Ue, [createElementVNode("header", {
          class: "modal-head"
        }, [val5[13] || (val5[13] = createElementVNode("h2", null, "修改活动标题", -1)), createElementVNode("button", {
          class: "modal-close",
          onClick: zz4
        }, [...(val5[12] || (val5[12] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("line", {
          x1: "18",
          y1: "6",
          x2: "6",
          y2: "18"
        }), createElementVNode("line", {
          x1: "6",
          y1: "6",
          x2: "18",
          y2: "18"
        })], -1)]))])]), createElementVNode("div", De, [createElementVNode("div", Ee, [val5[14] || (val5[14] = createElementVNode("label", {
          class: "form-label"
        }, "标题", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[0] || (val5[0] = val7 => refVal4.value = val7),
          type: "text",
          class: "form-input",
          onKeydown: withKeys(zz5, ["enter"])
        }, null, 544), [[vModelText, refVal4.value]])])]), createElementVNode("div", Ie, [createElementVNode("button", {
          class: "modal-btn ghost",
          disabled: refVal5.value,
          onClick: zz4
        }, "取消", 8, Re), createElementVNode("button", {
          class: "modal-btn primary",
          disabled: refVal5.value,
          onClick: zz5
        }, toDisplayString(refVal5.value ? "保存中..." : "保存"), 9, Te)])])])) : createCommentVNode("", !0), refVal6.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "modal-mask",
          onClick: withModifiers(zz9, ["self"])
        }, [createElementVNode("div", $e, [createElementVNode("header", Fe, [createElementVNode("h2", null, toDisplayString(refVal7.value === null ? "添加候选人" : "编辑候选人"), 1), createElementVNode("button", {
          class: "modal-close",
          onClick: zz9
        }, [...(val5[15] || (val5[15] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("line", {
          x1: "18",
          y1: "6",
          x2: "6",
          y2: "18"
        }), createElementVNode("line", {
          x1: "6",
          y1: "6",
          x2: "18",
          y2: "18"
        })], -1)]))])]), createElementVNode("div", Ke, [createElementVNode("div", Le, [createElementVNode("div", ze, [val5[16] || (val5[16] = createElementVNode("label", {
          class: "form-label"
        }, "编号", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[1] || (val5[1] = val7 => refVal8.value.number = val7),
          type: "text",
          class: "form-input",
          placeholder: "如 01"
        }, null, 512), [[vModelText, refVal8.value.number]])]), createElementVNode("div", je, [val5[17] || (val5[17] = createElementVNode("label", {
          class: "form-label"
        }, "显示顺序", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[2] || (val5[2] = val7 => refVal8.value.displayOrder = val7),
          type: "number",
          class: "form-input"
        }, null, 512), [[vModelText, refVal8.value.displayOrder, void 0, {
          number: !0
        }]])])]), createElementVNode("div", qe, [val5[18] || (val5[18] = createElementVNode("label", {
          class: "form-label"
        }, "姓名", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val5[3] || (val5[3] = val7 => refVal8.value.name = val7),
          type: "text",
          class: "form-input",
          placeholder: "候选人姓名",
          onKeydown: withKeys(zz10, ["enter"])
        }, null, 544), [[vModelText, refVal8.value.name]])])]), createElementVNode("div", Ge, [createElementVNode("button", {
          class: "modal-btn ghost",
          disabled: refVal9.value,
          onClick: zz9
        }, "取消", 8, He), createElementVNode("button", {
          class: "modal-btn primary",
          disabled: refVal9.value,
          onClick: zz10
        }, toDisplayString(refVal9.value ? "保存中..." : "保存"), 9, Je)])])])) : createCommentVNode("", !0)]);
      };
    }
  }),
  at = withScopeId(Qe, [["__scopeId", "data-v-4c5e1dfb"]]);
/* index 运行时导出（已语义化） */
export { at as default };