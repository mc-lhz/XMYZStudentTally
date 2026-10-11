/*!
 * 页面模块：宿舍管理（DormManagePage）
 * 路由：/admin/dorm   name=admin-dorm   层级=2   需登录=是
 * 功能：登录后的「宿舍管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/DormManagePage-C3ncVEQm.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createVNodeWrapper, Fragment, normalizeClass, createCommentVNode, toDisplayString, createTextVNode, renderList, toDisplayValue, withSlots, withModifiers, withDirectives, vModelText, deepDirectiveOptions, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 dorm（站点内功能模块） */
import { getCampuses as Ye, getBuildings as ea, getResourceTimePeriods as aa, createAdminCampuses as sa, updateAdminCampuses as Ce, deleteAdminCampuses as ta, createAdminBuildings as la, updateAdminBuildings as he, deleteAdminBuildings as oa, getBuildingsTimePeriods as na, deleteAdminBuildingsTimePeriods as ia, createAdminBuildingsTimePeriods as da, createAdminResourceTimePeriods as ra, updateAdminResourceTimePeriods as we, deleteAdminResourceTimePeriods as ua } from "./dorm-BlpLVPfV.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const fa = {
    class: "page-container"
  },
  pa = {
    class: "page-content"
  },
  ba = {
    class: "content-container"
  },
  ga = {
    class: "breadcrumb-wrapper"
  },
  ya = {
    key: 0,
    class: "loading-container"
  },
  ka = {
    class: "status-tabs"
  },
  _a = {
    class: "tab-header"
  },
  Ca = {
    class: "tab-count"
  },
  ha = {
    key: 0,
    class: "empty-container"
  },
  wa = {
    key: 1,
    class: "items-list"
  },
  xa = {
    class: "item-info"
  },
  Ta = {
    class: "item-header"
  },
  Ba = {
    class: "item-name"
  },
  Ma = {
    class: "item-meta"
  },
  Da = {
    class: "meta-item"
  },
  Pa = {
    class: "meta-item"
  },
  Ia = {
    class: "item-actions"
  },
  Sa = ["onClick"],
  $a = ["onClick"],
  Oa = ["onClick"],
  Va = {
    class: "tab-header"
  },
  Ua = {
    class: "tab-count"
  },
  La = {
    key: 0,
    class: "empty-container"
  },
  Na = {
    key: 1,
    class: "items-list"
  },
  Aa = {
    class: "item-info"
  },
  Fa = {
    class: "item-header"
  },
  Ea = {
    class: "item-name"
  },
  za = {
    class: "item-meta"
  },
  Ha = {
    class: "meta-item"
  },
  ja = {
    class: "meta-item"
  },
  Ga = {
    class: "meta-item"
  },
  Ka = {
    class: "item-actions"
  },
  Ra = ["onClick"],
  Wa = ["onClick"],
  Za = ["onClick"],
  qa = ["onClick"],
  Ja = {
    class: "tab-header"
  },
  Qa = {
    class: "tab-count"
  },
  Xa = {
    key: 0,
    class: "empty-container"
  },
  Ya = {
    key: 1,
    class: "items-list"
  },
  es = {
    class: "item-info"
  },
  as = {
    class: "item-header"
  },
  ss = {
    class: "item-name"
  },
  ts = {
    key: 0,
    class: "item-desc"
  },
  ls = {
    class: "item-meta"
  },
  os = {
    class: "meta-item"
  },
  ns = {
    class: "meta-item"
  },
  is = {
    class: "meta-item"
  },
  ds = {
    class: "item-actions"
  },
  rs = ["onClick"],
  us = ["onClick"],
  cs = ["onClick"],
  vs = {
    class: "modal-title"
  },
  ms = {
    class: "form-group"
  },
  fs = {
    class: "form-group"
  },
  ps = {
    class: "modal-actions"
  },
  bs = ["disabled"],
  gs = ["disabled"],
  ys = {
    class: "modal-title"
  },
  ks = {
    class: "form-group"
  },
  _s = ["value"],
  Cs = {
    class: "form-group"
  },
  hs = {
    class: "form-group"
  },
  ws = {
    class: "modal-actions"
  },
  xs = ["disabled"],
  Ts = ["disabled"],
  Bs = {
    class: "modal-title"
  },
  Ms = {
    class: "form-group"
  },
  Ds = {
    class: "form-group"
  },
  Ps = {
    class: "form-group"
  },
  Is = {
    class: "form-group"
  },
  Ss = {
    class: "modal-actions"
  },
  $s = ["disabled"],
  Os = ["disabled"],
  Vs = {
    class: "modal-title"
  },
  Us = {
    key: 0,
    class: "modal-loading"
  },
  Ls = {
    key: 1,
    class: "time-period-list"
  },
  Ns = ["onClick"],
  As = {
    class: "tp-info"
  },
  Fs = {
    class: "tp-name"
  },
  Es = {
    class: "tp-code"
  },
  zs = {
    class: "tp-check"
  },
  Hs = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "3"
  },
  js = {
    class: "modal-desc"
  },
  Gs = {
    class: "modal-actions"
  },
  Ks = ["disabled"],
  Rs = ["disabled"],
  Ws = {
    class: "modal-desc"
  },
  Zs = {
    class: "modal-actions"
  },
  qs = ["disabled"],
  Js = ["disabled"],
  Qs = {
    class: "modal-desc"
  },
  Xs = {
    class: "modal-actions"
  },
  Ys = ["disabled"],
  et = ["disabled"],
  at = defineComponent({
    __name: "DormManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref("campus"),
        list = ["campus", "building", "timePeriod"],
        refVal3 = ref(""),
        refVal4 = ref(!1);
      watch(refVal2, (val1, val2) => {
        if (!val2) return;
        const val3 = list.indexOf(val2),
          val4 = list.indexOf(val1);
        refVal3.value = val4 > val3 ? "left" : "right", refVal4.value = !0, nextTick(() => {
          setTimeout(() => {
            refVal4.value = !1, refVal3.value = "";
          }, 300);
        });
      });
      const refVal5 = ref([]),
        refVal6 = ref(!1),
        refVal7 = ref("create"),
        refVal8 = ref(null),
        refVal9 = ref({
          name: "",
          code: ""
        }),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        refVal13 = ref(!1),
        refVal14 = ref([]),
        refVal15 = ref(!1),
        refVal16 = ref("create"),
        refVal17 = ref(null),
        refVal18 = ref({
          campusId: 0,
          name: "",
          code: ""
        }),
        refVal19 = ref(!1),
        refVal20 = ref(!1),
        refVal21 = ref(null),
        refVal22 = ref(!1),
        refVal23 = ref(!1),
        refVal24 = ref(null),
        refVal25 = ref([]),
        refVal26 = ref(!1),
        refVal27 = ref([]),
        refVal28 = ref(!1),
        refVal29 = ref("create"),
        refVal30 = ref(null),
        refVal31 = ref({
          name: "",
          code: "",
          description: "",
          sortOrder: 0
        }),
        refVal32 = ref(!1),
        refVal33 = ref(!1),
        refVal34 = ref(null),
        refVal35 = ref(!1);
      async function zz0() {
        try {
          const val1 = await Ye();
          val1.data.code === 200 ? refVal5.value = val1.data.data : useToast1.error(val1.data.message || "获取校区列表失败");
        } catch {
          useToast1.error("获取校区列表失败");
        }
      }
      async function zz1() {
        try {
          const val1 = await ea();
          val1.data.code === 200 ? refVal14.value = val1.data.data : useToast1.error(val1.data.message || "获取宿舍楼列表失败");
        } catch {
          useToast1.error("获取宿舍楼列表失败");
        }
      }
      async function zz2() {
        try {
          const val1 = await aa();
          val1.data.code === 200 ? refVal27.value = val1.data.data : useToast1.error(val1.data.message || "获取铃声时段列表失败");
        } catch {
          useToast1.error("获取铃声时段列表失败");
        }
      }
      async function zz3() {
        refVal.value = !0;
        try {
          await Promise.all([zz0(), zz1(), zz2()]);
        } finally {
          refVal.value = !1;
        }
      }
      function zz4() {
        refVal7.value = "create", refVal8.value = null, refVal9.value = {
          name: "",
          code: ""
        }, refVal6.value = !0;
      }
      function zz5(val1) {
        refVal7.value = "edit", refVal8.value = val1, refVal9.value = {
          name: val1.name,
          code: val1.code
        }, refVal6.value = !0;
      }
      function zz6() {
        refVal6.value = !1, refVal8.value = null;
      }
      async function zz7() {
        if (!refVal9.value.name.trim() || !refVal9.value.code.trim()) {
          useToast1.error("请填写完整信息");
          return;
        }
        refVal10.value = !0;
        try {
          if (refVal7.value === "create") {
            const val1 = await sa(refVal9.value);
            val1.data.code === 200 ? (useToast1.success("校区创建成功"), zz6(), await zz0()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal8.value) {
            const obj = {
                name: refVal9.value.name,
                code: refVal9.value.code
              },
              val1 = await Ce(refVal8.value.id, obj);
            val1.data.code === 200 ? (useToast1.success("校区更新成功"), zz6(), await zz0()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal7.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal10.value = !1;
        }
      }
      async function zz8(val1) {
        try {
          const val2 = await Ce(val1.id, {
            status: val1.status === 1 ? 0 : 1
          });
          val2.data.code === 200 ? (useToast1.success(val1.status === 1 ? "已禁用" : "已启用"), await zz0()) : useToast1.error(val2.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz9(val1) {
        refVal12.value = val1, refVal11.value = !0;
      }
      async function zz10() {
        if (refVal12.value) {
          refVal13.value = !0;
          try {
            const val1 = await ta(refVal12.value.id);
            val1.data.code === 200 ? (useToast1.success("校区已删除"), refVal11.value = !1, refVal12.value = null, await zz0()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal13.value = !1;
          }
        }
      }
      function zz11() {
        refVal11.value = !1, refVal12.value = null;
      }
      function zz12() {
        const val1 = refVal5.value[0];
        if (!val1) {
          useToast1.warning("请先创建校区");
          return;
        }
        refVal16.value = "create", refVal17.value = null, refVal18.value = {
          campusId: val1.id,
          name: "",
          code: ""
        }, refVal15.value = !0;
      }
      function zz13(val1) {
        refVal16.value = "edit", refVal17.value = val1, refVal18.value = {
          campusId: val1.campusId,
          name: val1.name,
          code: val1.code
        }, refVal15.value = !0;
      }
      function zz14() {
        refVal15.value = !1, refVal17.value = null;
      }
      async function zz15() {
        if (!refVal18.value.name.trim() || !refVal18.value.code.trim()) {
          useToast1.error("请填写完整信息");
          return;
        }
        refVal19.value = !0;
        try {
          if (refVal16.value === "create") {
            const val1 = await la(refVal18.value);
            val1.data.code === 200 ? (useToast1.success("宿舍楼创建成功"), zz14(), await zz1()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal17.value) {
            const obj = {
                campusId: refVal18.value.campusId,
                name: refVal18.value.name,
                code: refVal18.value.code
              },
              val1 = await he(refVal17.value.id, obj);
            val1.data.code === 200 ? (useToast1.success("宿舍楼更新成功"), zz14(), await zz1()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal16.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal19.value = !1;
        }
      }
      async function zz16(val1) {
        try {
          const val2 = await he(val1.id, {
            status: val1.status === 1 ? 0 : 1
          });
          val2.data.code === 200 ? (useToast1.success(val1.status === 1 ? "已禁用" : "已启用"), await zz1()) : useToast1.error(val2.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz17(val1) {
        refVal21.value = val1, refVal20.value = !0;
      }
      async function zz18() {
        if (refVal21.value) {
          refVal22.value = !0;
          try {
            const val1 = await oa(refVal21.value.id);
            val1.data.code === 200 ? (useToast1.success("宿舍楼已删除"), refVal20.value = !1, refVal21.value = null, await zz1()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal22.value = !1;
          }
        }
      }
      function zz19() {
        refVal20.value = !1, refVal21.value = null;
      }
      async function zz20(val1) {
        refVal24.value = val1, refVal26.value = !0, refVal23.value = !0;
        try {
          const val2 = await na(val1.id);
          val2.data.code === 200 ? refVal25.value = val2.data.data : useToast1.error(val2.data.message || "获取时段列表失败");
        } catch {
          useToast1.error("获取时段列表失败");
        } finally {
          refVal26.value = !1;
        }
      }
      function zz21() {
        refVal23.value = !1, refVal24.value = null, refVal25.value = [];
      }
      function zz22(val1) {
        return refVal25.value.some(val2 => val2.id === val1);
      }
      async function zz23(val1) {
        if (!refVal24.value) return;
        const val2 = zz22(val1.id);
        try {
          if (val2) {
            const val3 = await ia({
              buildingId: refVal24.value.id,
              timePeriodId: val1.id
            });
            val3.data.code === 200 ? (useToast1.success("已移除时段"), refVal25.value = refVal25.value.filter(val4 => val4.id !== val1.id)) : useToast1.error(val3.data.message || "操作失败");
          } else {
            const val3 = await da({
              buildingId: refVal24.value.id,
              timePeriodId: val1.id
            });
            val3.data.code === 200 ? (useToast1.success("已添加时段"), refVal25.value.push(val1)) : useToast1.error(val3.data.message || "操作失败");
          }
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz24() {
        refVal29.value = "create", refVal30.value = null, refVal31.value = {
          name: "",
          code: "",
          description: "",
          sortOrder: 0
        }, refVal28.value = !0;
      }
      function zz25(val1) {
        refVal29.value = "edit", refVal30.value = val1, refVal31.value = {
          name: val1.name,
          code: val1.code,
          description: val1.description || "",
          sortOrder: val1.sortOrder
        }, refVal28.value = !0;
      }
      function zz26() {
        refVal28.value = !1, refVal30.value = null;
      }
      async function zz27() {
        if (!refVal31.value.name.trim() || !refVal31.value.code.trim()) {
          useToast1.error("请填写完整信息");
          return;
        }
        refVal32.value = !0;
        try {
          if (refVal29.value === "create") {
            const val1 = await ra(refVal31.value);
            val1.data.code === 200 ? (useToast1.success("铃声时段创建成功"), zz26(), await zz2()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal30.value) {
            const obj = {
                name: refVal31.value.name,
                code: refVal31.value.code,
                description: refVal31.value.description,
                sortOrder: refVal31.value.sortOrder
              },
              val1 = await we(refVal30.value.id, obj);
            val1.data.code === 200 ? (useToast1.success("铃声时段更新成功"), zz26(), await zz2()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal29.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal32.value = !1;
        }
      }
      async function zz28(val1) {
        try {
          const val2 = await we(val1.id, {
            status: val1.status === 1 ? 0 : 1
          });
          val2.data.code === 200 ? (useToast1.success(val1.status === 1 ? "已禁用" : "已启用"), await zz2()) : useToast1.error(val2.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz29(val1) {
        refVal34.value = val1, refVal33.value = !0;
      }
      async function zz30() {
        if (refVal34.value) {
          refVal35.value = !0;
          try {
            const val1 = await ua(refVal34.value.id);
            val1.data.code === 200 ? (useToast1.success("铃声时段已删除"), refVal33.value = !1, refVal34.value = null, await zz2()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal35.value = !1;
          }
        }
      }
      function zz31() {
        refVal33.value = !1, refVal34.value = null;
      }
      function zz32(val1) {
        return val1 === 1 ? {
          label: "启用",
          class: "status-enabled"
        } : {
          label: "禁用",
          class: "status-disabled"
        };
      }
      function zz33(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      function zz34(val1) {
        return refVal5.value.find(val2 => val2.id === val1)?.name || "未知校区";
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz3();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", fa, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", pa, [createElementVNode("div", ba, [createElementVNode("div", ga, [createVNode(PageBreadcrumb)]), val2[35] || (val2[35] = createVNodeWrapper('<div class="page-header-section" data-v-b1c9bdaf><div class="header-main" data-v-b1c9bdaf><div class="header-text" data-v-b1c9bdaf><h1 class="page-title" data-v-b1c9bdaf>宿舍管理</h1><p class="page-subtitle" data-v-b1c9bdaf>管理校区、宿舍楼和铃声时段</p></div></div></div>', 1)), refVal.value ? (openBlock(), createElementBlock("div", ya, [...(val2[19] || (val2[19] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ka, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal2.value === "campus"
        }]),
        onClick: val2[0] || (val2[0] = val3 => refVal2.value = "campus")
      }, " 校区 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal2.value === "building"
        }]),
        onClick: val2[1] || (val2[1] = val3 => refVal2.value = "building")
      }, " 宿舍楼 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal2.value === "timePeriod"
        }]),
        onClick: val2[2] || (val2[2] = val3 => refVal2.value = "timePeriod")
      }, " 铃声时段 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal4.value && refVal3.value === "left",
          "slide-right": refVal4.value && refVal3.value === "right"
        }])
      }, [refVal2.value === "campus" ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("div", _a, [createElementVNode("span", Ca, "共 " + toDisplayString(refVal5.value.length) + " 个校区", 1), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz4
      }, [...(val2[20] || (val2[20] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加校区 ", -1)]))])]), refVal5.value.length === 0 ? (openBlock(), createElementBlock("div", ha, [val2[21] || (val2[21] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M12 3l9 4H3l9-4z"
      })])], -1)), val2[22] || (val2[22] = createElementVNode("h2", null, "暂无校区", -1)), val2[23] || (val2[23] = createElementVNode("p", null, "还没有创建任何校区", -1)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: zz4
      }, "创建第一个校区")])) : (openBlock(), createElementBlock("div", wa, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal5.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "item-card"
      }, [createElementVNode("div", xa, [createElementVNode("div", Ta, [createElementVNode("h3", Ba, toDisplayString(val3.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz32(val3.status).class])
      }, toDisplayString(zz32(val3.status).label), 3)]), createElementVNode("div", Ma, [createElementVNode("span", Da, "代码: " + toDisplayString(val3.code), 1), val2[24] || (val2[24] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Pa, toDisplayString(zz33(val3.createdAt)), 1)])]), createElementVNode("div", Ia, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val3.status === 1
        }]),
        onClick: val4 => zz8(val3)
      }, toDisplayString(val3.status === 1 ? "禁用" : "启用"), 11, Sa), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val4 => zz5(val3)
      }, "编辑", 8, $a), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4 => zz9(val3)
      }, "删除", 8, Oa)])]))), 128))]))], 64)) : createCommentVNode("", !0), refVal2.value === "building" ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Va, [createElementVNode("span", Ua, "共 " + toDisplayString(refVal14.value.length) + " 栋宿舍楼", 1), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz12
      }, [...(val2[25] || (val2[25] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加宿舍楼 ", -1)]))])]), refVal14.value.length === 0 ? (openBlock(), createElementBlock("div", La, [val2[26] || (val2[26] = createVNodeWrapper('<div class="empty-icon" data-v-b1c9bdaf><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-b1c9bdaf><rect x="4" y="2" width="16" height="20" rx="2" data-v-b1c9bdaf></rect><line x1="9" y1="7" x2="15" y2="7" data-v-b1c9bdaf></line><line x1="9" y1="11" x2="15" y2="11" data-v-b1c9bdaf></line><line x1="9" y1="15" x2="15" y2="15" data-v-b1c9bdaf></line></svg></div><h2 data-v-b1c9bdaf>暂无宿舍楼</h2>', 2)), createElementVNode("p", null, toDisplayString(refVal5.value.length === 0 ? "请先创建校区" : "还没有创建任何宿舍楼"), 1), refVal5.value.length > 0 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz12
      }, " 创建第一栋宿舍楼 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Na, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal14.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "item-card"
      }, [createElementVNode("div", Aa, [createElementVNode("div", Fa, [createElementVNode("h3", Ea, toDisplayString(val3.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz32(val3.status).class])
      }, toDisplayString(zz32(val3.status).label), 3)]), createElementVNode("div", za, [createElementVNode("span", Ha, toDisplayString(zz34(val3.campusId)), 1), val2[27] || (val2[27] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ja, "代码: " + toDisplayString(val3.code), 1), val2[28] || (val2[28] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Ga, toDisplayString(zz33(val3.createdAt)), 1)])]), createElementVNode("div", Ka, [createElementVNode("button", {
        class: "action-btn link",
        onClick: val4 => zz20(val3)
      }, "时段", 8, Ra), createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val3.status === 1
        }]),
        onClick: val4 => zz16(val3)
      }, toDisplayString(val3.status === 1 ? "禁用" : "启用"), 11, Wa), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val4 => zz13(val3)
      }, "编辑", 8, Za), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4 => zz17(val3)
      }, "删除", 8, qa)])]))), 128))]))], 64)) : createCommentVNode("", !0), refVal2.value === "timePeriod" ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [createElementVNode("div", Ja, [createElementVNode("span", Qa, "共 " + toDisplayString(refVal27.value.length) + " 个时段", 1), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz24
      }, [...(val2[29] || (val2[29] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加时段 ", -1)]))])]), refVal27.value.length === 0 ? (openBlock(), createElementBlock("div", Xa, [val2[30] || (val2[30] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      })])], -1)), val2[31] || (val2[31] = createElementVNode("h2", null, "暂无铃声时段", -1)), val2[32] || (val2[32] = createElementVNode("p", null, "还没有创建任何铃声时段", -1)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: zz24
      }, "创建第一个时段")])) : (openBlock(), createElementBlock("div", Ya, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal27.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "item-card"
      }, [createElementVNode("div", es, [createElementVNode("div", as, [createElementVNode("h3", ss, toDisplayString(val3.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz32(val3.status).class])
      }, toDisplayString(zz32(val3.status).label), 3)]), val3.description ? (openBlock(), createElementBlock("p", ts, toDisplayString(val3.description), 1)) : createCommentVNode("", !0), createElementVNode("div", ls, [createElementVNode("span", os, "代码: " + toDisplayString(val3.code), 1), val2[33] || (val2[33] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", ns, "排序: " + toDisplayString(val3.sortOrder), 1), val2[34] || (val2[34] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", is, toDisplayString(zz33(val3.createdAt)), 1)])]), createElementVNode("div", ds, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val3.status === 1
        }]),
        onClick: val4 => zz28(val3)
      }, toDisplayString(val3.status === 1 ? "禁用" : "启用"), 11, rs), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val4 => zz25(val3)
      }, "编辑", 8, us), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4 => zz29(val3)
      }, "删除", 8, cs)])]))), 128))]))], 64)) : createCommentVNode("", !0)], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz6, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[5] || (val2[5] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", vs, toDisplayString(refVal7.value === "create" ? "添加校区" : "编辑校区"), 1), createElementVNode("div", ms, [val2[36] || (val2[36] = createElementVNode("label", {
            class: "form-label"
          }, "校区名称", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[3] || (val2[3] = val3 => refVal9.value.name = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：南校区",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal9.value.name]])]), createElementVNode("div", fs, [val2[37] || (val2[37] = createElementVNode("label", {
            class: "form-label"
          }, "校区代码", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[4] || (val2[4] = val3 => refVal9.value.code = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：SOUTH",
            maxlength: "20"
          }, null, 512), [[vModelText, refVal9.value.code]])]), createElementVNode("div", ps, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz6,
            disabled: refVal10.value
          }, "取消", 8, bs), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz7,
            disabled: refVal10.value
          }, toDisplayString(refVal10.value ? "保存中..." : "保存"), 9, gs)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal15.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz14, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal15.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[9] || (val2[9] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", ys, toDisplayString(refVal16.value === "create" ? "添加宿舍楼" : "编辑宿舍楼"), 1), createElementVNode("div", ks, [val2[38] || (val2[38] = createElementVNode("label", {
            class: "form-label"
          }, "所属校区", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val2[6] || (val2[6] = val3 => refVal18.value.campusId = val3),
            class: "form-select"
          }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal5.value, val3 => (openBlock(), createElementBlock("option", {
            key: val3.id,
            value: val3.id
          }, toDisplayString(val3.name), 9, _s))), 128))], 512), [[deepDirectiveOptions, refVal18.value.campusId]])]), createElementVNode("div", Cs, [val2[39] || (val2[39] = createElementVNode("label", {
            class: "form-label"
          }, "宿舍楼名称", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[7] || (val2[7] = val3 => refVal18.value.name = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：1号楼",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal18.value.name]])]), createElementVNode("div", hs, [val2[40] || (val2[40] = createElementVNode("label", {
            class: "form-label"
          }, "宿舍楼代码", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[8] || (val2[8] = val3 => refVal18.value.code = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：B1",
            maxlength: "20"
          }, null, 512), [[vModelText, refVal18.value.code]])]), createElementVNode("div", ws, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz14,
            disabled: refVal19.value
          }, "取消", 8, xs), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz15,
            disabled: refVal19.value
          }, toDisplayString(refVal19.value ? "保存中..." : "保存"), 9, Ts)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal28.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz26, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal28.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[14] || (val2[14] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", Bs, toDisplayString(refVal29.value === "create" ? "添加铃声时段" : "编辑铃声时段"), 1), createElementVNode("div", Ms, [val2[41] || (val2[41] = createElementVNode("label", {
            class: "form-label"
          }, "时段名称", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[10] || (val2[10] = val3 => refVal31.value.name = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：起床铃",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal31.value.name]])]), createElementVNode("div", Ds, [val2[42] || (val2[42] = createElementVNode("label", {
            class: "form-label"
          }, "时段代码", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[11] || (val2[11] = val3 => refVal31.value.code = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：WAKE_UP",
            maxlength: "20"
          }, null, 512), [[vModelText, refVal31.value.code]])]), createElementVNode("div", Ps, [val2[43] || (val2[43] = createElementVNode("label", {
            class: "form-label"
          }, "时段描述", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val2[12] || (val2[12] = val3 => refVal31.value.description = val3),
            class: "form-textarea",
            placeholder: "例如：早上起床铃声",
            maxlength: "200",
            rows: "3"
          }, null, 512), [[vModelText, refVal31.value.description]])]), createElementVNode("div", Is, [val2[44] || (val2[44] = createElementVNode("label", {
            class: "form-label"
          }, "排序顺序", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[13] || (val2[13] = val3 => refVal31.value.sortOrder = val3),
            type: "number",
            class: "form-input",
            placeholder: "数值越小越靠前"
          }, null, 512), [[vModelText, refVal31.value.sortOrder, void 0, {
            number: !0
          }]])]), createElementVNode("div", Ss, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz26,
            disabled: refVal32.value
          }, "取消", 8, $s), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz27,
            disabled: refVal32.value
          }, toDisplayString(refVal32.value ? "保存中..." : "保存"), 9, Os)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal23.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz21, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal23.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-lg",
            onClick: val2[15] || (val2[15] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", Vs, "管理铃声时段 - " + toDisplayString(refVal24.value?.name), 1), val2[47] || (val2[47] = createElementVNode("p", {
            class: "modal-subtitle"
          }, "选择该宿舍楼适用的铃声时段", -1)), refVal26.value ? (openBlock(), createElementBlock("div", Us, [...(val2[45] || (val2[45] = [createElementVNode("div", {
            class: "loading-spinner"
          }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", Ls, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal27.value, val3 => (openBlock(), createElementBlock("div", {
            key: val3.id,
            class: normalizeClass(["time-period-item", {
              "is-linked": zz22(val3.id)
            }]),
            onClick: val4 => zz23(val3)
          }, [createElementVNode("div", As, [createElementVNode("span", Fs, toDisplayString(val3.name), 1), createElementVNode("span", Es, toDisplayString(val3.code), 1)]), createElementVNode("div", zs, [zz22(val3.id) ? (openBlock(), createElementBlock("svg", Hs, [...(val2[46] || (val2[46] = [createElementVNode("polyline", {
            points: "20 6 9 17 4 12"
          }, null, -1)]))])) : createCommentVNode("", !0)])], 10, Ns))), 128))])), createElementVNode("div", {
            class: "modal-actions"
          }, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz21
          }, "完成")])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz11, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[16] || (val2[16] = withModifiers(() => {}, ["stop"]))
          }, [val2[48] || (val2[48] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", js, ' 确定要删除校区"' + toDisplayString(refVal12.value?.name) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", Gs, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz11,
            disabled: refVal13.value
          }, "取消", 8, Ks), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz10,
            disabled: refVal13.value
          }, toDisplayString(refVal13.value ? "删除中..." : "确认删除"), 9, Rs)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal20.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz19, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal20.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[17] || (val2[17] = withModifiers(() => {}, ["stop"]))
          }, [val2[49] || (val2[49] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", Ws, ' 确定要删除宿舍楼"' + toDisplayString(refVal21.value?.name) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", Zs, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz19,
            disabled: refVal22.value
          }, "取消", 8, qs), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz18,
            disabled: refVal22.value
          }, toDisplayString(refVal22.value ? "删除中..." : "确认删除"), 9, Js)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal33.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz31, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal33.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[18] || (val2[18] = withModifiers(() => {}, ["stop"]))
          }, [val2[50] || (val2[50] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", Qs, ' 确定要删除铃声时段"' + toDisplayString(refVal34.value?.name) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", Xs, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz31,
            disabled: refVal35.value
          }, "取消", 8, Ys), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz30,
            disabled: refVal35.value
          }, toDisplayString(refVal35.value ? "删除中..." : "确认删除"), 9, et)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  dt = withScopeId(at, [["__scopeId", "data-v-b1c9bdaf"]]);
/* index 运行时导出（已语义化） */
export { dt as default };