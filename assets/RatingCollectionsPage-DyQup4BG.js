/*!
 * 页面模块：合集管理（RatingCollectionsPage）
 * 路由：/admin/rating/collections   name=admin-rating-collections   层级=3   需登录=是
 * 功能：登录后的「合集管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/RatingCollectionsPage-DyQup4BG.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createTextVNode, Fragment, normalizeClass, createVNodeWrapper, createCommentVNode, toDisplayString, renderList, toDisplayValue, withSlots, unref, withModifiers, withDirectives, vModelText, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { getCollectionsById as ye, createCollections as be, createCollectionsImage as ad, updateCollections as ke, deleteCollectionsImage as we, updateCollectionsStatus as he, deleteCollections as Ce } from "./rating-CCUJ0_Xu.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { statusLabel_zb47 } from "./rating-DOU6YvDA.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Be = {
    class: "page-container"
  },
  De = {
    class: "page-content"
  },
  Me = {
    class: "content-container"
  },
  Oe = {
    class: "breadcrumb-wrapper"
  },
  Ie = {
    key: 0,
    class: "loading-container"
  },
  Se = {
    class: "status-tabs"
  },
  Te = {
    key: 0,
    class: "empty-container"
  },
  Ue = {
    key: 1,
    class: "items-list"
  },
  Fe = ["onClick"],
  Ne = {
    class: "item-cover"
  },
  Ge = ["src", "alt"],
  Re = {
    key: 1,
    class: "cover-placeholder"
  },
  Ve = {
    class: "item-info"
  },
  ze = {
    class: "item-header"
  },
  Ae = {
    class: "item-name"
  },
  Le = {
    key: 0,
    class: "item-desc"
  },
  $e = {
    class: "item-meta"
  },
  Ee = {
    class: "meta-item"
  },
  je = {
    class: "meta-item"
  },
  Je = {
    class: "meta-item"
  },
  We = {
    class: "item-actions"
  },
  He = ["onClick"],
  qe = ["onClick"],
  Ke = ["onClick"],
  Qe = {
    class: "modal-title"
  },
  Xe = {
    class: "form-group"
  },
  Ye = {
    class: "form-group"
  },
  Ze = {
    class: "form-group"
  },
  et = {
    class: "form-group"
  },
  tt = {
    class: "image-upload-area"
  },
  at = {
    key: 0,
    class: "image-preview"
  },
  st = ["src"],
  lt = {
    key: 1,
    class: "upload-placeholder"
  },
  ot = {
    class: "modal-actions"
  },
  nt = ["disabled"],
  it = ["disabled"],
  rt = {
    class: "modal-desc"
  },
  dt = {
    class: "modal-actions"
  },
  ut = ["disabled"],
  ct = ["disabled"],
  vt = defineComponent({
    __name: "RatingCollectionsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref(0),
        refVal4 = ref(1),
        refVal5 = ref(20),
        refVal6 = ref("all"),
        list = ["all", 1, 0],
        refVal7 = ref(""),
        refVal8 = ref(!1);
      watch(refVal6, (val1, val2) => {
        if (val2 === void 0) return;
        const val3 = list.indexOf(val2),
          val4 = list.indexOf(val1);
        refVal7.value = val4 > val3 ? "left" : "right", refVal8.value = !0, zz0(), nextTick(() => {
          setTimeout(() => {
            refVal8.value = !1, refVal7.value = "";
          }, 300);
        });
      });
      const refVal9 = ref(!1),
        refVal10 = ref("create"),
        refVal11 = ref(null),
        refVal12 = ref({
          name: "",
          description: "",
          sortOrder: 0
        }),
        refVal13 = ref(!1),
        refVal14 = ref(null),
        refVal15 = ref(null),
        refVal16 = ref(!1),
        refVal17 = ref(null),
        refVal18 = ref(!1);
      async function zz0() {
        try {
          const obj = {
            page: refVal4.value,
            size: refVal5.value
          };
          refVal6.value !== "all" && (obj.status = refVal6.value);
          const val1 = await ye(obj);
          val1.data.code === 200 ? (refVal2.value = val1.data.data.items, refVal3.value = val1.data.data.total) : useToast1.error(val1.data.message || "获取合集列表失败");
        } catch {
          useToast1.error("获取合集列表失败");
        }
      }
      async function zz1() {
        refVal.value = !0;
        try {
          await zz0();
        } finally {
          refVal.value = !1;
        }
      }
      function zz2() {
        refVal10.value = "create", refVal11.value = null, refVal12.value = {
          name: "",
          description: "",
          sortOrder: 0
        }, refVal14.value = null, refVal15.value = null, refVal9.value = !0;
      }
      function zz3(val1, val2) {
        val2.stopPropagation(), refVal10.value = "edit", refVal11.value = val1, refVal12.value = {
          name: val1.name,
          description: val1.description || "",
          sortOrder: val1.sortOrder
        }, refVal14.value = null, refVal15.value = val1.coverUrl, refVal9.value = !0;
      }
      function zz4() {
        refVal9.value = !1, refVal11.value = null, refVal12.value = {
          name: "",
          description: "",
          sortOrder: 0
        }, refVal14.value = null, refVal15.value = null;
      }
      function zz5(val1) {
        const val2 = val1.target;
        if (val2.files && val2.files[0]) {
          const val3 = val2.files[0];
          if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"].includes(val3.type)) {
            useToast1.error("只支持 JPEG/PNG/GIF/WebP/BMP 格式");
            return;
          }
          if (val3.size > 10 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 10MB");
            return;
          }
          refVal14.value = val3;
          const filereader = new FileReader();
          filereader.onload = val4 => {
            refVal15.value = val4.target?.result;
          }, filereader.readAsDataURL(val3);
        }
      }
      function zz6() {
        refVal14.value = null, refVal15.value = null;
      }
      async function zz7() {
        if (!refVal12.value.name.trim()) {
          useToast1.error("请填写名称");
          return;
        }
        refVal13.value = !0;
        try {
          if (refVal10.value === "create") {
            const val1 = await be(refVal12.value);
            val1.data.code === 200 ? (refVal14.value && (await ad(val1.data.data.id, refVal14.value)), useToast1.success("创建成功"), zz4(), await zz0()) : useToast1.error(val1.data.message || "创建失败");
          } else if (refVal11.value) {
            const obj = {
                name: refVal12.value.name,
                description: refVal12.value.description,
                sortOrder: refVal12.value.sortOrder
              },
              val1 = await ke(refVal11.value.id, obj);
            val1.data.code === 200 ? (refVal14.value ? await ad(refVal11.value.id, refVal14.value) : !refVal15.value && refVal11.value.coverUrl && (await we(refVal11.value.id)), useToast1.success("更新成功"), zz4(), await zz0()) : useToast1.error(val1.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal10.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal13.value = !1;
        }
      }
      async function zz8(val1, val2) {
        val2.stopPropagation();
        const val3 = val1.status === 1 ? 0 : 1;
        try {
          const val4 = await he(val1.id, {
            status: val3
          });
          val4.data.code === 200 ? (useToast1.success(val3 === 1 ? "已启用" : "已禁用"), await zz0()) : useToast1.error(val4.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz9(val1, val2) {
        val2.stopPropagation(), refVal17.value = val1, refVal16.value = !0;
      }
      async function zz10() {
        if (refVal17.value) {
          refVal18.value = !0;
          try {
            const val1 = await Ce(refVal17.value.id);
            val1.data.code === 200 ? (useToast1.success("已删除"), refVal16.value = !1, refVal17.value = null, await zz0()) : useToast1.error(val1.data.message || "删除失败");
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal18.value = !1;
          }
        }
      }
      function zz11() {
        refVal16.value = !1, refVal17.value = null;
      }
      function zz12(val1) {
        useRouter1.push(`/admin/rating/collections/${val1.id}`);
      }
      function zz13() {
        useRouter1.push("/admin/rating");
      }
      function zz14(val1) {
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
        zz1();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", Be, [createVNode(PageHeader, {
        "back-to": "/admin/rating"
      }), createElementVNode("main", De, [createElementVNode("div", Me, [createElementVNode("div", Oe, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val2[10] || (val2[10] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "合集管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理评分项目合集")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz13
      }, [...(val2[8] || (val2[8] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "15 18 9 12 15 6"
      })], -1), createTextVNode(" 返回 ", -1)]))]), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz2
      }, [...(val2[9] || (val2[9] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加合集 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", Ie, [...(val2[11] || (val2[11] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Se, [createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === "all"
        }]),
        onClick: val2[0] || (val2[0] = val3 => refVal6.value = "all")
      }, " 全部 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 1
        }]),
        onClick: val2[1] || (val2[1] = val3 => refVal6.value = 1)
      }, " 启用 ", 2), createElementVNode("button", {
        class: normalizeClass(["status-tab", {
          active: refVal6.value === 0
        }]),
        onClick: val2[2] || (val2[2] = val3 => refVal6.value = 0)
      }, " 禁用 ", 2)]), createElementVNode("div", {
        class: normalizeClass(["content-slide-wrapper", {
          "slide-left": refVal8.value && refVal7.value === "left",
          "slide-right": refVal8.value && refVal7.value === "right"
        }])
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Te, [val2[12] || (val2[12] = createVNodeWrapper('<div class="empty-icon" data-v-1f648761><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-1f648761><rect x="3" y="3" width="7" height="7" data-v-1f648761></rect><rect x="14" y="3" width="7" height="7" data-v-1f648761></rect><rect x="3" y="14" width="7" height="7" data-v-1f648761></rect><rect x="14" y="14" width="7" height="7" data-v-1f648761></rect></svg></div>', 1)), createElementVNode("h2", null, toDisplayString(refVal6.value === "all" ? "暂无合集" : "暂无相关合集"), 1), createElementVNode("p", null, toDisplayString(refVal6.value === "all" ? "还没有添加任何合集" : "没有找到该状态的合集"), 1), refVal6.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz2
      }, " 添加第一个合集 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Ue, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "item-card",
        onClick: val4 => zz12(val3)
      }, [createElementVNode("div", Ne, [val3.coverUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val3.coverUrl,
        alt: val3.name,
        class: "cover-image"
      }, null, 8, Ge)) : (openBlock(), createElementBlock("div", Re, [...(val2[13] || (val2[13] = [createElementVNode("svg", {
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
      })], -1)]))]))]), createElementVNode("div", Ve, [createElementVNode("div", ze, [createElementVNode("h3", Ae, toDisplayString(val3.name), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", unref(statusLabel_zb47)(val3.status).class])
      }, toDisplayString(unref(statusLabel_zb47)(val3.status).label), 3)]), val3.description ? (openBlock(), createElementBlock("p", Le, toDisplayString(val3.description), 1)) : createCommentVNode("", !0), createElementVNode("div", $e, [createElementVNode("span", Ee, toDisplayString(val3.itemCount) + " 个项目", 1), val2[14] || (val2[14] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", je, "排序: " + toDisplayString(val3.sortOrder), 1), val2[15] || (val2[15] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Je, toDisplayString(zz14(val3.createdAt)), 1)])]), createElementVNode("div", We, [createElementVNode("button", {
        class: normalizeClass(["action-btn toggle", {
          "is-enabled": val3.status === 1
        }]),
        onClick: val4 => zz8(val3, val4)
      }, toDisplayString(val3.status === 1 ? "禁用" : "启用"), 11, He), createElementVNode("button", {
        class: "action-btn edit",
        onClick: val4 => zz3(val3, val4)
      }, " 编辑 ", 8, qe), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val4 => zz9(val3, val4)
      }, " 删除 ", 8, Ke), val2[16] || (val2[16] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Fe))), 128))]))], 2)], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal9.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz4, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal9.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-large",
            onClick: val2[6] || (val2[6] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", Qe, toDisplayString(refVal10.value === "create" ? "添加合集" : "编辑合集"), 1), createElementVNode("div", Xe, [val2[17] || (val2[17] = createElementVNode("label", {
            class: "form-label"
          }, "名称 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[3] || (val2[3] = val3 => refVal12.value.name = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：新年晚会合集",
            maxlength: "50"
          }, null, 512), [[vModelText, refVal12.value.name]])]), createElementVNode("div", Ye, [val2[18] || (val2[18] = createElementVNode("label", {
            class: "form-label"
          }, "描述", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val2[4] || (val2[4] = val3 => refVal12.value.description = val3),
            class: "form-textarea",
            placeholder: "简单描述一下这个合集...",
            rows: "3",
            maxlength: "200"
          }, null, 512), [[vModelText, refVal12.value.description]])]), createElementVNode("div", Ze, [val2[19] || (val2[19] = createElementVNode("label", {
            class: "form-label"
          }, "排序权重", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[5] || (val2[5] = val3 => refVal12.value.sortOrder = val3),
            type: "number",
            class: "form-input",
            placeholder: "数字越小排序越靠前",
            min: "0"
          }, null, 512), [[vModelText, refVal12.value.sortOrder, void 0, {
            number: !0
          }]]), val2[20] || (val2[20] = createElementVNode("p", {
            class: "form-hint"
          }, "数字越小排序越靠前，默认为0", -1))]), createElementVNode("div", et, [val2[25] || (val2[25] = createElementVNode("label", {
            class: "form-label"
          }, "封面图片", -1)), createElementVNode("div", tt, [refVal15.value ? (openBlock(), createElementBlock("div", at, [createElementVNode("img", {
            src: refVal15.value,
            alt: "预览"
          }, null, 8, st), createElementVNode("button", {
            class: "remove-image-btn",
            onClick: zz6,
            type: "button"
          }, [...(val2[21] || (val2[21] = [createElementVNode("svg", {
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
          })], -1)]))])])) : (openBlock(), createElementBlock("label", lt, [createElementVNode("input", {
            type: "file",
            accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
            onChange: zz5,
            class: "hidden-input"
          }, null, 32), val2[22] || (val2[22] = createElementVNode("svg", {
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
          })], -1)), val2[23] || (val2[23] = createElementVNode("span", null, "点击上传图片", -1)), val2[24] || (val2[24] = createElementVNode("span", {
            class: "upload-hint"
          }, "支持 JPEG/PNG/GIF/WebP/BMP，最大 10MB", -1))]))])]), createElementVNode("div", ot, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz4,
            disabled: refVal13.value
          }, " 取消 ", 8, nt), createElementVNode("button", {
            class: "modal-btn confirm primary",
            onClick: zz7,
            disabled: refVal13.value
          }, toDisplayString(refVal13.value ? "保存中..." : "保存"), 9, it)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz11, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal16.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[7] || (val2[7] = withModifiers(() => {}, ["stop"]))
          }, [val2[26] || (val2[26] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认删除", -1)), createElementVNode("p", rt, ' 确定要删除合集"' + toDisplayString(refVal17.value?.name) + '"吗？此操作不可撤销。 ', 1), val2[27] || (val2[27] = createElementVNode("p", {
            class: "modal-warning"
          }, "注意：删除合集不会删除其中的评分项目。", -1)), createElementVNode("div", dt, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz11,
            disabled: refVal18.value
          }, " 取消 ", 8, ut), createElementVNode("button", {
            class: "modal-btn confirm danger",
            onClick: zz10,
            disabled: refVal18.value
          }, toDisplayString(refVal18.value ? "删除中..." : "确认删除"), 9, ct)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  wt = withScopeId(vt, [["__scopeId", "data-v-1f648761"]]);
/* index 运行时导出（已语义化） */
export { wt as default };