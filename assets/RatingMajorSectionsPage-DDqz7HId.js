/*!
 * 页面模块：大分区管理（RatingMajorSectionsPage）
 * 路由：/admin/rating/schools/:schoolId   name=admin-rating-major-sections   层级=3   需登录=是
 * 功能：登录后的「大分区管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingMajorSectionsPage-DDqz7HId.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, toDisplayString, createTextVNode, Fragment, normalizeClass, createVNodeWrapper, createCommentVNode, renderList, toDisplayValue, withSlots, unref, withModifiers, withDirectives, vModelText, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getSchoolsById as xe, getMajorSectionsById as Ce, createMajorSections as Se, createMajorSectionsImage, updateMajorSections as Me, deleteMajorSectionsImage as Ie, updateMajorSectionsStatus as Pe, deleteMajorSections as Be } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb47 } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Fe = {
    class: "page-container"
  },
  Ne = {
    class: "page-content"
  },
  Ge = {
    class: "content-container"
  },
  Re = {
    class: "breadcrumb-wrapper"
  },
  Ue = {
    class: "page-header-section"
  },
  ze = {
    class: "header-main"
  },
  Ae = {
    class: "header-text"
  },
  Ve = {
    class: "page-title"
  },
  Ee = {
    key: 0,
    class: "loading-container"
  },
  Le = {
    class: "status-tabs"
  },
  $e = {
    key: 0,
    class: "empty-container"
  },
  Oe = {
    key: 1,
    class: "items-list"
  },
  He = ["onClick"],
  Je = {
    class: "item-cover"
  },
  We = ["src", "alt"],
  qe = {
    key: 1,
    class: "cover-placeholder"
  },
  Ke = {
    class: "item-info"
  },
  Qe = {
    class: "item-header"
  },
  Xe = {
    class: "item-name"
  },
  Ye = {
    key: 0,
    class: "item-desc"
  },
  Ze = {
    class: "item-meta"
  },
  ea = {
    class: "meta-item"
  },
  aa = {
    class: "meta-item"
  },
  ta = {
    class: "item-actions"
  },
  sa = ["onClick"],
  oa = ["onClick"],
  la = ["onClick"],
  na = {
    class: "modal-title"
  },
  ia = {
    class: "form-group"
  },
  ra = {
    class: "form-group"
  },
  da = {
    class: "form-group"
  },
  ca = {
    class: "image-upload-area"
  },
  ua = {
    key: 0,
    class: "image-preview"
  },
  va = ["src"],
  ma = {
    key: 1,
    class: "upload-placeholder"
  },
  pa = {
    class: "modal-actions"
  },
  ga = ["disabled"],
  fa = ["disabled"],
  ha = {
    class: "modal-desc"
  },
  ya = {
    class: "modal-actions"
  },
  ba = ["disabled"],
  ka = ["disabled"],
  wa = defineComponent({
    __name: "RatingMajorSectionsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.schoolId)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(0),
        refVal5 = ref(1),
        refVal6 = ref(20),
        refVal7 = ref("all"),
        list = ["all", 1, 0],
        refVal8 = ref(""),
        refVal9 = ref(!1);
      watch(refVal7, (val1, val4) => {
        if (val4 === void 0) return;
        const val5 = list.indexOf(val4),
          val6 = list.indexOf(val1);
        refVal8.value = val6 > val5 ? "left" : "right", refVal9.value = !0, zz1(), nextTick(() => {
          setTimeout(() => {
            refVal9.value = !1, refVal8.value = "";
          }, 300);
        });
      });
      const refVal10 = ref(!1),
        refVal11 = ref("create"),
        refVal12 = ref(null),
        refVal13 = ref({
          schoolId: 0,
          name: "",
          description: ""
        }),
        refVal14 = ref(!1),
        refVal15 = ref(null),
        refVal16 = ref(null),
        refVal17 = ref(!1),
        refVal18 = ref(null),
        refVal19 = ref(!1);
      async function zz0() {
        try {
          const val1 = await xe(val3.value);
          val1.data.code === 200 ? refVal2.value = val1.data.data : (useToast1.error("获取学校信息失败"), useRouter1.push("/admin/rating"));
        } catch {
          useToast1.error("获取学校信息失败"), useRouter1.push("/admin/rating");
        }
      }
      async function zz1() {
        try {
          const obj = {
            page: refVal5.value,
            size: refVal6.value,
            schoolId: val3.value
          };
          refVal7.value !== "all" && (obj.status = refVal7.value);
          const val1 = await Ce(obj);
          val1.data.code === 200 ? (refVal3.value = val1.data.data.items, refVal4.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取大分区列表失败");
        } catch {
          useToast1.error("获取大分区列表失败");
        }
      }
      async function zz2() {
        refVal.value = !0;
        try {
          await Promise.all([zz0(), zz1()]);
        } finally {
          refVal.value = !1;
        }
      }
      function zz3() {
        refVal11.value = "create", refVal12.value = null, refVal13.value = {
          schoolId: val3.value,
          name: "",
          description: ""
        }, refVal15.value = null, refVal16.value = null, refVal10.value = !0;
      }
      function zz4(val1, val4) {
        val4.stopPropagation(), refVal11.value = "edit", refVal12.value = val1, refVal13.value = {
          schoolId: val1.schoolId,
          name: val1.name,
          description: val1.description || ""
        }, refVal15.value = null, refVal16.value = val1.imageUrl, refVal10.value = !0;
      }
      function zz5() {
        refVal10.value = !1, refVal12.value = null, refVal13.value = {
          schoolId: val3.value,
          name: "",
          description: ""
        }, refVal15.value = null, refVal16.value = null;
      }
      function zz6(val1) {
        const val4 = val1.target;
        if (val4.files && val4.files[0]) {
          const val5 = val4.files[0];
          if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"].includes(val5.type)) {
            useToast1.error("只支持 JPEG/PNG/GIF/WebP/BMP 格式");
            return;
          }
          if (val5.size > 10 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 10MB");
            return;
          }
          refVal15.value = val5;
          const filereader = new FileReader();
          filereader.onload = val6 => {
            refVal16.value = val6.target?.result;
          }, filereader.readAsDataURL(val5);
        }
      }
      function zz7() {
        refVal15.value = null, refVal16.value = null;
      }
      async function zz8() {
        if (!refVal13.value.name.trim()) {
          useToast1.error("请填写名称");
          return;
        }
        refVal14.value = !0;
        try {
          if (refVal11.value === "create") {
            const val1 = await Se(refVal13.value);
            val1.data.code === 200 ? (refVal15.value && (await createMajorSectionsImage(val1.data.data.id, refVal15.value)), useToast1.success("创建成功"), zz5(), await zz1()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal12.value) {
            const obj = {
                name: refVal13.value.name,
                description: refVal13.value.description
              },
              val1 = await Me(refVal12.value.id, obj);
            val1.data.code === 200 ? (refVal15.value ? await createMajorSectionsImage(refVal12.value.id, refVal15.value) : !refVal16.value && refVal12.value.imageUrl && (await Ie(refVal12.value.id)), useToast1.success("更新成功"), zz5(), await zz1()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal11.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal14.value = !1;
        }
      }
      async function zz9(val1, val4) {
        val4.stopPropagation();
        const val5 = val1.status === 1 ? 0 : 1;
        try {
          const val6 = await Pe(val1.id, {
            status: val5
          });
          val6.data.code === 200 ? (useToast1.success(val5 === 1 ? "已启用" : "已禁用"), await zz1()) : useToast1.error(val6.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz10(val1, val4) {
        val4.stopPropagation(), refVal18.value = val1, refVal17.value = !0;
      }
      async function zz11() {
        if (refVal18.value) {
          refVal19.value = !0;
          try {
            const val1 = await Be(refVal18.value.id);
            val1.data.code === 200 ? (useToast1.success("已删除"), refVal17.value = !1, refVal18.value = null, await zz1()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal19.value = !1;
          }
        }
      }
      function zz12() {
        refVal17.value = !1, refVal18.value = null;
      }
      function zz13(val1) {
        useRouter1.push(`/admin/rating/major-sections/${val1.id}`);
      }
      function zz14() {
        useRouter1.push("/admin/rating");
      }
      function zz15(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageRating) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz2();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", Fe, [createVNode(PageHeader, {
        "back-to": "/admin/rating"
      }), createElementVNode("main", Ne, [createElementVNode("div", Ge, [createElementVNode("div", Re, [createVNode(PageBreadcrumb)]), createElementVNode("div", Ue, [createElementVNode("div", ze, [createElementVNode("div", Ae, [createElementVNode("h1", Ve, toDisplayString(refVal2.value?.name || "加载中..."), 1), val4[7] || (val4[7] = createElementVNode("p", {
        class: "page-subtitle"
      }, "管理大分区", -1))]), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz14
      }, [...(val4[8] || (val4[8] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "15 18 9 12 15 6"
      })], -1), createTextVNode(" 返回 ", -1)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz3
      }, [...(val4[9] || (val4[9] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加大分区 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", Ee, [...(val4[10] || (val4[10] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Le, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === "all"
        }]),
        onClick: val4[0] || (val4[0] = val5 => refVal7.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 1
        }]),
        onClick: val4[1] || (val4[1] = val5 => refVal7.value = 1)
      }, " 启用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal7.value === 0
        }]),
        onClick: val4[2] || (val4[2] = val5 => refVal7.value = 0)
      }, " 禁用 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal9.value && refVal8.value === "left",
          "slide-right": refVal9.value && refVal8.value === "right"
        }])
      }, [refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", $e, [val4[11] || (val4[11] = createVNodeWrapper('<div class="empty-icon" data-v-14c750d4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-14c750d4><rect x="3" y="3" width="7" height="7" data-v-14c750d4></rect><rect x="14" y="3" width="7" height="7" data-v-14c750d4></rect><rect x="3" y="14" width="7" height="7" data-v-14c750d4></rect><rect x="14" y="14" width="7" height="7" data-v-14c750d4></rect></svg></div>', 1)), createElementVNode("h2", null, toDisplayString(refVal7.value === "all" ? "暂无大分区" : "暂无相关大分区"), 1), createElementVNode("p", null, toDisplayString(refVal7.value === "all" ? "还没有添加任何大分区" : "没有找到该状态的大分区"), 1), refVal7.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz3
      }, " 添加第一个大分区 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Oe, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val5 => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "item-card",
        onClick: val6 => zz13(val5)
      }, [createElementVNode("div", Je, [val5.imageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val5.imageUrl,
        alt: val5.name,
        class: "cover-image"
      }, null, 8, We)) : (openBlock(), createElementBlock("div", qe, [...(val4[12] || (val4[12] = [createElementVNode("svg", {
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
      }), createElementVNode("circle", {
        cx: "8.5",
        cy: "8.5",
        r: "1.5"
      }), createElementVNode("polyline", {
        points: "21 15 16 10 5 21"
      })], -1)]))]))]), createElementVNode("div", Ke, [createElementVNode("div", Qe, [createElementVNode("h3", Xe, toDisplayString(val5.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(statusLabel_zb47)(val5.status).class])
      }, toDisplayString(unref(statusLabel_zb47)(val5.status).label), 3)]), val5.description ? (openBlock(), createElementBlock("p", Ye, toDisplayString(val5.description), 1)) : createCommentVNode("", !0), createElementVNode("div", Ze, [createElementVNode("span", ea, toDisplayString(val5.minorSectionCount) + " 个小分区", 1), val4[13] || (val4[13] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", aa, toDisplayString(zz15(val5.createdAt)), 1)])]), createElementVNode("div", ta, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val5.status === 1
        }]),
        onClick: val6 => zz9(val5, val6)
      }, toDisplayString(val5.status === 1 ? "禁用" : "启用"), 11, sa), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val6 => zz4(val5, val6)
      }, " 编辑 ", 8, oa), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val6 => zz10(val5, val6)
      }, " 删除 ", 8, la), val4[14] || (val4[14] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, He))), 128))]))], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz5, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal10.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-large",
            onClick: val4[5] || (val4[5] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", na, toDisplayString(refVal11.value === "create" ? "添加大分区" : "编辑大分区"), 1), createElementVNode("div", ia, [val4[15] || (val4[15] = createElementVNode("label", {
            class: "form-label"
          }, "名称 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val4[3] || (val4[3] = val5 => refVal13.value.name = val5),
            type: "text",
            class: "form-input",
            placeholder: "例如：食堂",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal13.value.name]])]), createElementVNode("div", ra, [val4[16] || (val4[16] = createElementVNode("label", {
            class: "form-label"
          }, "描述", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val4[4] || (val4[4] = val5 => refVal13.value.description = val5),
            class: "form-textarea",
            placeholder: "简单描述一下这个分区...",
            rows: "3",
            maxlength: "200"
          }, null, 512), [[vModelText, refVal13.value.description]])]), createElementVNode("div", da, [val4[21] || (val4[21] = createElementVNode("label", {
            class: "form-label"
          }, "封面图片", -1)), createElementVNode("div", ca, [refVal16.value ? (openBlock(), createElementBlock("div", ua, [createElementVNode("img", {
            src: refVal16.value,
            alt: "预览"
          }, null, 8, va), createElementVNode("button", {
            class: "remove-image-btn",
            onClick: zz7,
            type: "button"
          }, [...(val4[17] || (val4[17] = [createElementVNode("svg", {
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
          })], -1)]))])])) : (openBlock(), createElementBlock("label", ma, [createElementVNode("input", {
            type: "file",
            accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
            onChange: zz6,
            class: "hidden-input"
          }, null, 32), val4[18] || (val4[18] = createElementVNode("svg", {
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
          }), createElementVNode("circle", {
            cx: "8.5",
            cy: "8.5",
            r: "1.5"
          }), createElementVNode("polyline", {
            points: "21 15 16 10 5 21"
          })], -1)), val4[19] || (val4[19] = createElementVNode("span", null, "点击上传图片", -1)), val4[20] || (val4[20] = createElementVNode("span", {
            class: "upload-hint"
          }, "支持 JPEG/PNG/GIF/WebP/BMP，最大 10MB", -1))]))])]), createElementVNode("div", pa, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz5,
            disabled: refVal14.value
          }, " 取消 ", 8, ga), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz8,
            disabled: refVal14.value
          }, toDisplayString(refVal14.value ? "保存中..." : "保存"), 9, fa)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal17.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz12, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal17.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val4[6] || (val4[6] = withModifiers(() => {}, ["stop"]))
          }, [val4[22] || (val4[22] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", ha, ' 确定要删除大分区"' + toDisplayString(refVal18.value?.name) + '"吗？此操作不可撤销。 ', 1), val4[23] || (val4[23] = createElementVNode("p", {
            class: "modal-warning"
          }, "注意：如果该分区下有小分区，将无法删除。", -1)), createElementVNode("div", ya, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz12,
            disabled: refVal19.value
          }, " 取消 ", 8, ba), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz11,
            disabled: refVal19.value
          }, toDisplayString(refVal19.value ? "删除中..." : "确认删除"), 9, ka)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Ba = withScopeId(wa, [["__scopeId", "data-v-14c750d4"]]);
/* index 运行时导出（已语义化） */
export { Ba as default };