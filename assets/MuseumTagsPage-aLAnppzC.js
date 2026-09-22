/*!
 * 页面模块：标签管理（MuseumTagsPage）
 * 路由：/admin/museum/tags   name=admin-museum-tags   层级=3   需登录=是
 * 功能：登录后的「标签管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MuseumTagsPage-aLAnppzC.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, normalizeClass, toDisplayString, renderList, withModifiers, withDirectives, vModelText, resolveRaw, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 museum-BDeGDA-n（站点内功能模块） */
import { getAdminMuseumTags as le, updateAdminMuseumTags as oe, createAdminMuseumTags as ne, deleteAdminMuseumTags as ie, toggleStatusAdminMuseumTags as re } from "./museum-BDeGDA-n.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const ve = {
    class: "page-container"
  },
  me = {
    class: "page-content"
  },
  fe = {
    class: "content-container"
  },
  pe = {
    class: "breadcrumb-wrapper"
  },
  be = {
    key: 0,
    class: "loading-container"
  },
  ge = {
    class: "status-tabs"
  },
  _e = {
    key: 0,
    class: "empty-container"
  },
  ke = {
    key: 1,
    class: "tags-list"
  },
  ye = ["onClick"],
  he = {
    class: "tag-info"
  },
  Ce = {
    class: "tag-header"
  },
  xe = {
    class: "tag-name"
  },
  we = {
    class: "tag-meta"
  },
  Te = {
    key: 0,
    class: "meta-item"
  },
  Me = {
    class: "meta-item"
  },
  De = {
    class: "meta-item"
  },
  Oe = {
    class: "tag-actions"
  },
  Pe = ["onClick"],
  Se = ["onClick"],
  Ve = {
    class: "modal-content"
  },
  Be = {
    class: "modal-title"
  },
  Ie = {
    class: "form-group"
  },
  Ue = {
    class: "form-group"
  },
  Ee = {
    class: "color-picker"
  },
  $e = {
    class: "preset-colors"
  },
  ze = ["onClick"],
  Fe = {
    class: "form-group"
  },
  Le = {
    class: "form-group"
  },
  Ne = {
    class: "modal-actions"
  },
  je = ["disabled"],
  Ge = ["disabled"],
  qe = {
    class: "modal-content"
  },
  Ae = {
    class: "modal-desc"
  },
  He = {
    class: "modal-actions"
  },
  Re = ["disabled"],
  Je = ["disabled"],
  Ke = defineComponent({
    __name: "MuseumTagsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref("all"),
        list = ["all", "enabled", "disabled"],
        refVal4 = ref(""),
        refVal5 = ref(!1);
      watch(refVal3, (val1, val3) => {
        if (!val3) return;
        const val4 = list.indexOf(val3),
          val5 = list.indexOf(val1);
        refVal4.value = val5 > val4 ? "left" : "right", refVal5.value = !0, nextTick(() => {
          setTimeout(() => {
            refVal5.value = !1, refVal4.value = "";
          }, 300);
        });
      });
      const refVal6 = ref(!1),
        refVal7 = ref(null),
        refVal8 = ref(!1),
        refVal9 = ref(!1),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        refVal13 = ref({
          name: "",
          color: "#6366f1",
          icon: "",
          sortOrder: 0
        }),
        list2 = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"],
        val2 = applyDirectives(() => {
          if (refVal3.value === "all") return refVal2.value;
          const val1 = refVal3.value === "enabled" ? 1 : 0;
          return refVal2.value.filter(val3 => val3.status === val1);
        });
      async function zz0() {
        try {
          const val1 = await le();
          refVal2.value = val1;
        } catch {
          useToast1.error("获取标签列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz1(val1) {
        return val1 === 1 ? {
          label: "启用",
          class: "status-enabled"
        } : {
          label: "禁用",
          class: "status-disabled"
        };
      }
      async function zz2(val1, val3) {
        val3.stopPropagation();
        try {
          const val4 = await re(val1.id),
            val5 = refVal2.value.findIndex(val6 => val6.id === val1.id);
          val5 !== -1 && (refVal2.value[val5] = val4), useToast1.success(val4.status === 1 ? "已启用" : "已禁用");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz3() {
        refVal10.value = !1, refVal12.value = null, refVal13.value = {
          name: "",
          color: "#6366f1",
          icon: "",
          sortOrder: refVal2.value.length
        }, refVal9.value = !0;
      }
      function zz4(val1, val3) {
        refVal10.value = !0, refVal12.value = val1, refVal13.value = {
          name: val1.name,
          color: val1.color,
          icon: val1.icon || "",
          sortOrder: val1.sortOrder
        }, refVal9.value = !0;
      }
      function zz5() {
        refVal9.value = !1, refVal12.value = null;
      }
      async function zz6() {
        if (!refVal13.value.name.trim()) {
          useToast1.error("请输入标签名称");
          return;
        }
        refVal11.value = !0;
        try {
          if (refVal10.value && refVal12.value) {
            const val1 = await oe(refVal12.value.id, refVal13.value),
              val3 = refVal2.value.findIndex(val4 => val4.id === refVal12.value.id);
            val3 !== -1 && (refVal2.value[val3] = val1), useToast1.success("更新成功");
          } else {
            const val1 = await ne(refVal13.value);
            refVal2.value.push(val1), useToast1.success("创建成功");
          }
          zz5();
        } catch {
          useToast1.error(refVal10.value ? "更新失败" : "创建失败");
        } finally {
          refVal11.value = !1;
        }
      }
      function zz7(val1, val3) {
        val3.stopPropagation(), refVal7.value = val1, refVal6.value = !0;
      }
      async function zz8() {
        if (refVal7.value) {
          refVal8.value = !0;
          try {
            await ie(refVal7.value.id), refVal2.value = refVal2.value.filter(val1 => val1.id !== refVal7.value.id), useToast1.success("删除成功"), refVal6.value = !1, refVal7.value = null;
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal8.value = !1;
          }
        }
      }
      function zz9() {
        refVal6.value = !1, refVal7.value = null;
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMuseum) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", ve, [createVNode(PageHeader, {
        "back-to": "/admin/museum"
      }), createElementVNode("main", me, [createElementVNode("div", fe, [createElementVNode("div", pe, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val3[8] || (val3[8] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "标签管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理活动分类标签")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button primary",
        onClick: zz3
      }, [...(val3[7] || (val3[7] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加标签 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", be, [...(val3[9] || (val3[9] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ge, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "all"
        }]),
        onClick: val3[0] || (val3[0] = val4 => refVal3.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "enabled"
        }]),
        onClick: val3[1] || (val3[1] = val4 => refVal3.value = "enabled")
      }, " 已启用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal3.value === "disabled"
        }]),
        onClick: val3[2] || (val3[2] = val4 => refVal3.value = "disabled")
      }, " 已禁用 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal5.value && refVal4.value === "left",
          "slide-right": refVal5.value && refVal4.value === "right"
        }])
      }, [val2.value.length === 0 ? (openBlock(), createElementBlock("div", _e, [val3[10] || (val3[10] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
      }), createElementVNode("line", {
        x1: "7",
        y1: "7",
        x2: "7.01",
        y2: "7"
      })])], -1)), createElementVNode("h2", null, toDisplayString(refVal3.value === "all" ? "暂无标签" : "暂无相关标签"), 1), createElementVNode("p", null, toDisplayString(refVal3.value === "all" ? "还没有添加任何标签" : "没有找到该状态的标签"), 1), refVal3.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz3
      }, " 添加第一个标签 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", ke, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "tag-card",
        onClick: val5 => zz4(val4)
      }, [createElementVNode("div", {
        class: "tag-color",
        style: resolveRaw({
          backgroundColor: val4.color
        })
      }, null, 4), createElementVNode("div", he, [createElementVNode("div", Ce, [createElementVNode("h3", xe, toDisplayString(val4.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz1(val4.status).class])
      }, toDisplayString(zz1(val4.status).label), 3)]), createElementVNode("div", we, [val4.icon ? (openBlock(), createElementBlock("span", Te, "图标: " + toDisplayString(val4.icon), 1)) : createCommentVNode("", !0), createElementVNode("span", Me, "排序: " + toDisplayString(val4.sortOrder), 1), createElementVNode("span", De, "活动数: " + toDisplayString(val4.eventCount), 1)])]), createElementVNode("div", Oe, [createElementVNode("button", {
        class: normalizeClass(["action-btn", val4.status === 1 ? "disable" : "enable"]),
        onClick: val5 => zz2(val4, val5)
      }, toDisplayString(val4.status === 1 ? "禁用" : "启用"), 11, Pe), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val5 => zz7(val4, val5)
      }, " 删除 ", 8, Se), val3[11] || (val3[11] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, ye))), 128))]))], 2)], 64))])]), createVNode(PageFooter), refVal9.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz5, ["self"])
      }, [createElementVNode("div", Ve, [createElementVNode("h3", Be, toDisplayString(refVal10.value ? "编辑标签" : "添加标签"), 1), createElementVNode("div", Ie, [val3[12] || (val3[12] = createElementVNode("label", {
        class: "form-label"
      }, [createTextVNode(" 标签名称 "), createElementVNode("span", {
        class: "required"
      }, "*")], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[3] || (val3[3] = val4 => refVal13.value.name = val4),
        type: "text",
        class: "form-input",
        placeholder: "请输入标签名称",
        maxlength: "20"
      }, null, 512), [[vModelText, refVal13.value.name]])]), createElementVNode("div", Ue, [val3[13] || (val3[13] = createElementVNode("label", {
        class: "form-label"
      }, "标签颜色", -1)), createElementVNode("div", Ee, [createElementVNode("div", {
        class: "color-preview",
        style: resolveRaw({
          backgroundColor: refVal13.value.color
        })
      }, null, 4), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[4] || (val3[4] = val4 => refVal13.value.color = val4),
        type: "text",
        class: "form-input color-input",
        placeholder: "#6366f1"
      }, null, 512), [[vModelText, refVal13.value.color]])]), createElementVNode("div", $e, [(openBlock(), createElementBlock(Fragment, null, renderList(list2, val4 => createElementVNode("button", {
        key: val4,
        class: normalizeClass(["preset-color", {
          active: refVal13.value.color === val4
        }]),
        style: resolveRaw({
          backgroundColor: val4
        }),
        onClick: val5 => refVal13.value.color = val4
      }, null, 14, ze)), 64))])]), createElementVNode("div", Fe, [val3[14] || (val3[14] = createElementVNode("label", {
        class: "form-label"
      }, "图标名称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[5] || (val3[5] = val4 => refVal13.value.icon = val4),
        type: "text",
        class: "form-input",
        placeholder: "如: music, trophy, star"
      }, null, 512), [[vModelText, refVal13.value.icon]])]), createElementVNode("div", Le, [val3[15] || (val3[15] = createElementVNode("label", {
        class: "form-label"
      }, "排序", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[6] || (val3[6] = val4 => refVal13.value.sortOrder = val4),
        type: "number",
        class: "form-input",
        placeholder: "0",
        min: "0"
      }, null, 512), [[vModelText, refVal13.value.sortOrder, void 0, {
        number: !0
      }]])]), createElementVNode("div", Ne, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz5,
        disabled: refVal11.value
      }, " 取消 ", 8, je), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz6,
        disabled: refVal11.value
      }, toDisplayString(refVal11.value ? "保存中..." : "保存"), 9, Ge)])])])) : createCommentVNode("", !0), refVal6.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "modal-overlay",
        onClick: withModifiers(zz9, ["self"])
      }, [createElementVNode("div", qe, [val3[16] || (val3[16] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), createElementVNode("p", Ae, ' 确定要删除标签"' + toDisplayString(refVal7.value?.name) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", He, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz9,
        disabled: refVal8.value
      }, " 取消 ", 8, Re), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz8,
        disabled: refVal8.value
      }, toDisplayString(refVal8.value ? "删除中..." : "确认删除"), 9, Je)])])])) : createCommentVNode("", !0)]));
    }
  }),
  ss = withScopeId(Ke, [["__scopeId", "data-v-b5f9ccb3"]]);
/* index 运行时导出（已语义化） */
export { ss as default };