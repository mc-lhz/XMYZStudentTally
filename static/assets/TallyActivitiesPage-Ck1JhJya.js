/*!
 * 页面模块：实时唱票管理（TallyActivitiesPage）
 * 路由：/admin/tally    name=admin-tally    level=2    需登录=是
 * 功能：唱票业务总入口。展示所有活动，支持新建、改状态、删除、跳转配置/控制台、复制大屏链接。
 *
 * 来源：assets/TallyActivitiesPage-Ck1JhJya.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：编译产物（变量名 val / zz0..zzN）。为不破坏随后的渲染树，本文件保留全部标识符原貌，
 *       仅通过以下映射注释告诉你每个名字的业务含义。
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, renderList, withModifiers, withDirectives, vModelText, withKeys, toDisplayString, useToast, normalizeClass, useRouter, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivities, createAdminTallyActivities, updateAdminTallyActivities, deleteAdminTallyActivities } from "./tally-DC36h0vE.js";
/* 模板属性配置：page-container */
const local_zba2 = {
    class: "page-container"
  },
  tt = {
    class: "page-content"
  },
  et = {
    class: "content-container"
  },
  st = {
    class: "breadcrumb-wrapper"
  },
  at = {
    key: 0,
    class: "loading-container"
  },
  ot = {
    key: 0,
    class: "empty-container"
  },
  nt = {
    key: 1,
    class: "table-wrapper"
  },
  lt = {
    class: "data-table"
  },
  it = {
    class: "cell-title"
  },
  rt = {
    class: "cell-time"
  },
  ct = {
    class: "row-actions"
  },
  dt = ["onClick"],
  ut = ["onClick"],
  vt = ["onClick"],
  mt = ["onClick"],
  ft = ["value", "onChange"],
  pt = ["onClick"],
  gt = {
    class: "modal"
  },
  yt = {
    class: "modal-body"
  },
  bt = {
    class: "form-group"
  },
  ht = {
    class: "modal-foot"
  },
  _t = ["disabled"],
  kt = ["disabled"],
  Ct = defineComponent({
    __name: "TallyActivitiesPage",
    setup(val) {
      /* ---- 局部命名 → 业务语义映射 ----
        * refVal  = isLoading                列表首屏加载态
        * refVal2 = activities               当前活动列表
        * refVal3 = isCreateModalOpen        「新建活动」弹窗显隐
        * refVal4 = createDraftTitle         新建活动输入框暂存
        * refVal5 = isCreating               正在创建（防止重复提交）
        *
        * zz0 = statusText        status -> 中文标签
        * zz1 = statusBadgeClass  status -> 徽章背景 class
        * zz2 = formatCreatedAt   Go 风格时间串 -> 中文本地时间
        * zz3 = loadActivities    拉取活动列表
        * zz4 = openCreateModal   打开「新建活动」弹窗
        * zz5 = closeCreateModal  关闭弹窗（创建中拒绝）
        * zz6 = submitCreate      提交新建
        * zz7 = changeStatus      行内 select 切换活动状态
        * zz8 = deleteActivity    删除活动（含 confirm）
        * zz9 = goToEditPage      跳 /admin/tally/activities/<id>/edit
        * zz10 = goToControlPage  跳 /admin/tally/activities/<id>/control
        * zz11 = buildScreenUrl   大屏 URL 构造（origin + /tally/screen/<id>）
        * zz12 = copyScreenLink   复制大屏链接到剪贴板
        * zz13 = openScreenInTab  新窗口打开大屏
        **/

      const useRouter1 = useRouter(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(!1),
        refVal4 = ref(""),
        refVal5 = ref(!1);
      function zz0(val1) {
        return val1 === 0 ? "待开始" : val1 === 1 ? "进行中" : "已结束";
      }
      function zz1(val1) {
        return val1 === 0 ? "pending" : val1 === 1 ? "live" : "ended";
      }
      function zz2(val1) {
        return val1 ? new Date(val1).toLocaleString("zh-CN") : "—";
      }
      async function zz3() {
        refVal.value = !0;
        try {
          const val1 = await getAdminTallyActivities();
          val1.data.code === 200 ? refVal2.value = val1.data.data || [] : useToast1.error(val1.data.message || "加载失败");
        } catch (val1) {
          useToast1.error(val1?.message || "网络错误");
        } finally {
          refVal.value = !1;
        }
      }
      function zz4() {
        refVal4.value = "", refVal3.value = !0;
      }
      function zz5() {
        refVal5.value || (refVal3.value = !1);
      }
      async function zz6() {
        const val1 = refVal4.value.trim();
        if (!val1) {
          useToast1.warning("请输入活动标题");
          return;
        }
        refVal5.value = !0;
        try {
          const val2 = await createAdminTallyActivities(val1);
          val2.data.code === 200 ? (useToast1.success("已创建"), refVal3.value = !1, await zz3()) : useToast1.error(val2.data.message || "创建失败");
        } catch (val2) {
          useToast1.error(val2?.message || "网络错误");
        } finally {
          refVal5.value = !1;
        }
      }
      async function zz7(val1, val2) {
        const val3 = val2.target,
          val4 = Number(val3.value);
        if (val4 !== val1.status) try {
          const val5 = await updateAdminTallyActivities(val1.id, {
            status: val4
          });
          val5.data.code === 200 ? (useToast1.success("状态已更新"), await zz3()) : (useToast1.error(val5.data.message || "更新失败"), val3.value = String(val1.status));
        } catch (val5) {
          useToast1.error(val5?.message || "网络错误"), val3.value = String(val1.status);
        }
      }
      async function zz8(val1) {
        if (confirm(`确认删除活动「${val1.title}」？
候选人与唱票记录将一并删除，不可恢复。`)) try {
          const val2 = await deleteAdminTallyActivities(val1.id);
          val2.data.code === 200 ? (useToast1.success("已删除"), await zz3()) : useToast1.error(val2.data.message || "删除失败");
        } catch (val2) {
          useToast1.error(val2?.message || "网络错误");
        }
      }
      function zz9(val1) {
        useRouter1.push(`/admin/tally/activities/${val1}/edit`);
      }
      function zz10(val1) {
        useRouter1.push(`/admin/tally/activities/${val1}/control`);
      }
      function zz11(val1) {
        return `${window.location.origin}/tally/screen/${val1}`;
      }
      function zz12(val1) {
        const val2 = zz11(val1);
        navigator.clipboard.writeText(val2).then(() => useToast1.success(`已复制大屏链接：${val2}`), () => useToast1.error(`复制失败：${val2}`));
      }
      function zz13(val1) {
        window.open(zz11(val1), "_blank", "noopener,noreferrer");
      }
      /* ---- 渲染函数 ----
       *   Vue 编译产物：以 createElementBlock 树描述 DOM，外层由 withScopeId 注入 scoped CSS 哈希。
       *   节点含义可对照 setup 顶部的映射表（zzN / refValN）。
       *   三个分支：loading / 空列表 / 表格；表格尾部用 <select> 切换状态，「删除」走 confirm。
       *   「新建活动」弹窗为受控模态，仅在 isCreateModalOpen 为真时挂载。
       */
      return onMounted(zz3), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", local_zba2, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", tt, [createElementVNode("div", et, [createElementVNode("div", st, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val2[2] || (val2[2] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "实时唱票管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理活动、候选人、唱票控制台")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button primary",
        onClick: zz4
      }, [...(val2[1] || (val2[1] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 新建活动 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", at, [...(val2[3] || (val2[3] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", ot, [val2[4] || (val2[4] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      })])], -1)), val2[5] || (val2[5] = createElementVNode("h2", null, "暂无唱票活动", -1)), val2[6] || (val2[6] = createElementVNode("p", null, "点击右上角「新建活动」开始", -1)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: zz4
      }, "新建第一个活动")])) : (openBlock(), createElementBlock("div", nt, [createElementVNode("table", lt, [val2[8] || (val2[8] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "标题"), createElementVNode("th", {
        class: "col-status"
      }, "状态"), createElementVNode("th", {
        class: "col-time"
      }, "创建时间"), createElementVNode("th", {
        class: "col-actions"
      }, "操作")])], -1)), createElementVNode("tbody", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val3 => (openBlock(), createElementBlock("tr", {
        key: val3.id
      }, [createElementVNode("td", it, toDisplayString(val3.title), 1), createElementVNode("td", null, [createElementVNode("span", {
        class: normalizeClass(["badge", zz1(val3.status)])
      }, toDisplayString(zz0(val3.status)), 3)]), createElementVNode("td", rt, toDisplayString(zz2(val3.createdAt)), 1), createElementVNode("td", null, [createElementVNode("div", ct, [createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => zz9(val3.id)
      }, "配置候选人", 8, dt), createElementVNode("button", {
        class: "act-btn primary",
        onClick: val4 => zz10(val3.id)
      }, "唱票控制台", 8, ut), createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => zz13(val3.id)
      }, "打开大屏", 8, vt), createElementVNode("button", {
        class: "act-btn",
        onClick: val4 => zz12(val3.id)
      }, "复制大屏链接", 8, mt), createElementVNode("select", {
        class: "status-select",
        value: val3.status,
        onChange: val4 => zz7(val3, val4)
      }, [...(val2[7] || (val2[7] = [createElementVNode("option", {
        value: 0
      }, "待开始", -1), createElementVNode("option", {
        value: 1
      }, "进行中", -1), createElementVNode("option", {
        value: 2
      }, "已结束", -1)]))], 40, ft), createElementVNode("button", {
        class: "act-btn danger",
        onClick: val4 => zz8(val3)
      }, "删除", 8, pt)])])]))), 128))])])]))], 64))])]), createVNode(PageFooter), refVal3.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-mask",
        onClick: withModifiers(zz5, ["self"])
      }, [createElementVNode("div", gt, [createElementVNode("header", {
        class: "modal-head"
      }, [val2[10] || (val2[10] = createElementVNode("h2", null, "新建活动", -1)), createElementVNode("button", {
        class: "modal-close",
        onClick: zz5
      }, [...(val2[9] || (val2[9] = [createElementVNode("svg", {
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
      })], -1)]))])]), createElementVNode("div", yt, [createElementVNode("div", bt, [val2[11] || (val2[11] = createElementVNode("label", {
        class: "form-label"
      }, "活动标题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val2[0] || (val2[0] = val3 => refVal4.value = val3),
        type: "text",
        class: "form-input",
        placeholder: "例：2026 年校园歌手大赛决赛",
        onKeydown: withKeys(zz6, ["enter"])
      }, null, 544), [[vModelText, refVal4.value]])])]), createElementVNode("div", ht, [createElementVNode("button", {
        class: "modal-btn ghost",
        disabled: refVal5.value,
        onClick: zz5
      }, "取消", 8, _t), createElementVNode("button", {
        class: "modal-btn primary",
        disabled: refVal5.value,
        onClick: zz6
      }, toDisplayString(refVal5.value ? "创建中..." : "确认创建"), 9, kt)])])])) : createCommentVNode("", !0)]));
    }
  }),
  Bt = withScopeId(Ct, [["__scopeId", "data-v-3fe3aa58"]]);
/* index 运行时导出（已语义化） */
export { Bt as default };