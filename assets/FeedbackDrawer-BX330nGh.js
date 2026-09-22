/*!
 * 模块：FeedbackDrawer（FeedbackDrawer-BX330nGh.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/FeedbackDrawer-BX330nGh.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, applyDirectives, watch, createBlock, createVNode, withSlots, toDisplayValue, Teleport, createElementBlock, createCommentVNode, createElementVNode, toDisplayString, Fragment, createTextVNode, normalizeClass, withModifiers, withDirectives, vModelText, TransitionGroup, renderList, nextTick, useToast, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 评分控件组件（星级/评分） */
import { batchRatingItemsRatingCommunityContributions as we, createRatingCommunityContributions as ke, createRatingCommunityContributions } from "./rating-CCUJ0_Xu.js";
const Ce = {
    class: "drawer-header"
  },
  Ie = {
    class: "drawer-header-content"
  },
  Be = {
    class: "drawer-icon"
  },
  Te = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  _e = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Me = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Fe = {
    class: "drawer-title-group"
  },
  Se = {
    class: "drawer-subtitle"
  },
  Ve = {
    class: "drawer-content"
  },
  De = {
    key: 0,
    class: "parent-path-card"
  },
  Ne = {
    class: "path-text"
  },
  Pe = {
    class: "path-value"
  },
  Ue = {
    key: 0,
    class: "mode-switch"
  },
  $e = {
    key: 0,
    class: "form-group"
  },
  Le = {
    class: "input-wrapper"
  },
  ze = ["placeholder"],
  Re = {
    key: 0,
    class: "form-current"
  },
  Ge = {
    class: "current-value"
  },
  Ae = {
    key: 1,
    class: "form-group"
  },
  He = {
    class: "textarea-wrapper"
  },
  We = ["placeholder"],
  qe = {
    key: 0,
    class: "form-current"
  },
  Oe = {
    class: "current-value"
  },
  Je = {
    key: 2,
    class: "form-group"
  },
  Ee = {
    key: 0,
    class: "image-preview-card"
  },
  Ke = ["src"],
  je = {
    key: 1,
    class: "image-upload-area"
  },
  Qe = {
    class: "form-group"
  },
  Xe = {
    class: "form-label-row"
  },
  Ye = {
    class: "form-label"
  },
  Ze = {
    class: "textarea-wrapper"
  },
  et = ["placeholder"],
  tt = {
    key: "batch",
    class: "batch-form"
  },
  lt = {
    class: "form-group"
  },
  nt = {
    class: "form-label-row"
  },
  st = {
    class: "batch-count"
  },
  at = {
    class: "batch-item-header"
  },
  ot = {
    class: "batch-item-number"
  },
  it = ["disabled", "onClick"],
  rt = {
    class: "batch-item-content"
  },
  ut = {
    class: "batch-item-fields"
  },
  dt = ["onUpdate:modelValue"],
  ct = ["onUpdate:modelValue"],
  vt = {
    class: "batch-item-image"
  },
  pt = {
    key: 0,
    class: "batch-image-preview"
  },
  mt = ["src"],
  yt = ["onClick"],
  ft = {
    key: 1,
    class: "batch-image-upload"
  },
  xt = ["onChange"],
  ht = ["disabled"],
  gt = {
    class: "form-group"
  },
  bt = {
    class: "textarea-wrapper"
  },
  wt = {
    class: "drawer-footer"
  },
  kt = ["disabled"],
  Ct = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  It = {
    key: 1,
    class: "loading-dots"
  },
  Bt = {
    key: 2
  },
  Tt = {
    key: 3
  },
  _t = defineComponent({
    __name: "FeedbackDrawer",
    props: {
      isOpen: {
        type: Boolean
      },
      contributionType: {},
      targetType: {},
      targetId: {
        default: null
      },
      parentId: {
        default: null
      },
      schoolId: {
        default: null
      },
      parentPath: {
        default: ""
      },
      currentName: {
        default: ""
      },
      currentDescription: {
        default: ""
      }
    },
    emits: ["close", "success"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = val,
        val4 = zz0,
        useToast1 = useToast(),
        useUserStore1 = useUserStore(),
        refVal = ref(!1),
        val5 = applyDirectives(() => val3.contributionType === 2 && val3.targetType === 2),
        refVal2 = ref({
          name: "",
          description: "",
          reason: ""
        }),
        refVal3 = ref(null),
        refVal4 = ref(null),
        refVal5 = ref(null),
        refVal6 = ref([]),
        refVal7 = ref("");
      let num = 0;
      const refVal8 = ref(!1),
        refVal9 = ref(!1),
        obj = {
          1: "分类",
          2: "评分项目",
          3: "合集"
        },
        obj2 = {
          1: "修改",
          2: "新增"
        },
        val6 = applyDirectives(() => refVal.value ? "批量新增评分项目" : `${obj2[val3.contributionType]}${obj[val3.targetType]}`),
        val7 = applyDirectives(() => !refVal.value),
        val8 = applyDirectives(() => !refVal.value),
        val9 = applyDirectives(() => refVal.value ? !1 : val3.contributionType === 2 ? !0 : val3.targetType === 2 || val3.targetType === 3),
        val10 = applyDirectives(() => val3.contributionType === 2),
        val11 = applyDirectives(() => val10.value ? "新增说明" : "修改理由");
      function zz1() {
        refVal6.value.push({
          id: ++num,
          name: "",
          description: "",
          imageFile: null,
          imagePreview: null,
          uploadedImageId: null
        }), nextTick(() => {
          const selectorAll = document.querySelectorAll(".batch-item-input");
          selectorAll[selectorAll.length - 1]?.focus();
        });
      }
      function zz2(val1) {
        const val13 = refVal6.value.findIndex(val14 => val14.id === val1);
        val13 > -1 && refVal6.value.splice(val13, 1);
      }
      function zz3() {
        refVal2.value = {
          name: val3.contributionType === 1 ? val3.currentName : "",
          description: val3.contributionType === 1 ? val3.currentDescription : "",
          reason: ""
        }, refVal3.value = null, refVal4.value = null, refVal5.value = null, refVal.value = !1, refVal6.value = [{
          id: ++num,
          name: "",
          description: "",
          imageFile: null,
          imagePreview: null,
          uploadedImageId: null
        }], refVal7.value = "";
      }
      function zz4(val1, val13) {
        const val14 = val1.target.files?.[0];
        if (!val14) return;
        if (!val14.type.startsWith("image/")) {
          useToast1.error("请选择图片文件");
          return;
        }
        if (val14.size > 20 * 1024 * 1024) {
          useToast1.error("图片大小不能超过 20MB");
          return;
        }
        const val15 = refVal6.value.find(val16 => val16.id === val13);
        if (!val15) return;
        val15.imageFile = val14;
        const filereader = new FileReader();
        filereader.onload = val16 => {
          val15.imagePreview = val16.target?.result;
        }, filereader.readAsDataURL(val14);
      }
      function zz5(val1) {
        const val13 = refVal6.value.find(val14 => val14.id === val1);
        val13 && (val13.imageFile = null, val13.imagePreview = null, val13.uploadedImageId = null);
      }
      async function zz6() {
        const val1 = refVal6.value.filter(val13 => val13.imageFile && val13.name.trim());
        for (const zz7 of val1) if (zz7.imageFile) try {
          const val13 = await createRatingCommunityContributions(zz7.imageFile);
          if (val13.data.code === 200) zz7.uploadedImageId = val13.data.data.id;else return useToast1.error(`图片上传失败: ${zz7.name}`), !1;
        } catch {
          return useToast1.error(`图片上传失败: ${zz7.name}`), !1;
        }
        return !0;
      }
      watch(() => val3.isOpen, val1 => {
        val1 ? (zz3(), document.body.style.overflow = "hidden") : document.body.style.overflow = "";
      });
      function zz8() {
        val4("close");
      }
      function zz9(val1) {
        const val13 = val1.target.files?.[0];
        if (!val13) return;
        if (!val13.type.startsWith("image/")) {
          useToast1.error("请选择图片文件");
          return;
        }
        if (val13.size > 20 * 1024 * 1024) {
          useToast1.error("图片大小不能超过 20MB");
          return;
        }
        refVal3.value = val13;
        const filereader = new FileReader();
        filereader.onload = val14 => {
          refVal4.value = val14.target?.result;
        }, filereader.readAsDataURL(val13);
      }
      function zz10() {
        refVal3.value = null, refVal4.value = null, refVal5.value = null;
      }
      async function zz11() {
        if (!refVal3.value) return null;
        refVal9.value = !0;
        try {
          const val1 = await createRatingCommunityContributions(refVal3.value);
          return val1.data.code === 200 ? val1.data.data.id : (useToast1.error(val1.data.message || "图片上传失败"), null);
        } catch {
          return useToast1.error("图片上传失败"), null;
        } finally {
          refVal9.value = !1;
        }
      }
      function zz12() {
        return refVal2.value.name.trim() ? refVal2.value.reason.trim() ? !0 : (useToast1.error(val10.value ? "请填写新增说明" : "请填写修改理由"), !1) : (useToast1.error("请输入名称"), !1);
      }
      function zz13() {
        return refVal6.value.filter(val1 => val1.name.trim()).length === 0 ? (useToast1.error("请至少填写一个评分项目名称"), !1) : !0;
      }
      async function zz14() {
        if (zz12()) {
          refVal8.value = !0;
          try {
            let val1 = null;
            if (refVal3.value && (val1 = await zz11(), refVal3.value && !val1)) {
              refVal8.value = !1;
              return;
            }
            const list = [];
            refVal2.value.name.trim() && list.push({
              fieldName: "name",
              newValue: refVal2.value.name.trim()
            }), refVal2.value.description.trim() && list.push({
              fieldName: "description",
              newValue: refVal2.value.description.trim()
            }), val1 && list.push({
              fieldName: "image",
              newValue: String(val1)
            });
            const val13 = await ke({
              contributionType: val3.contributionType,
              targetType: val3.targetType,
              targetId: val3.contributionType === 1 ? val3.targetId : null,
              parentId: val3.contributionType === 2 ? val3.parentId : null,
              schoolId: val3.contributionType === 2 && val3.targetType === 1 ? val3.schoolId : null,
              reason: refVal2.value.reason.trim(),
              details: list
            });
            val13.data.code === 200 ? (useToast1.success("提交成功，等待审核"), val4("success"), zz8()) : useToast1.error(val13.data.message || "提交失败");
          } catch {
            useToast1.error("提交失败");
          } finally {
            refVal8.value = !1;
          }
        }
      }
      async function zz15() {
        if (zz13()) {
          refVal8.value = !0, refVal9.value = !0;
          try {
            if (!(await zz6())) {
              refVal8.value = !1, refVal9.value = !1;
              return;
            }
            refVal9.value = !1;
            const val1 = refVal6.value.filter(val14 => val14.name.trim()).map(val14 => ({
                name: val14.name.trim(),
                description: val14.description.trim() || void 0,
                imageId: val14.uploadedImageId || void 0
              })),
              val13 = await we({
                categoryId: val3.parentId,
                reason: refVal7.value.trim() || void 0,
                items: val1
              });
            if (val13.data.code === 200) {
              const {
                successCount: val14,
                totalCount: val15
              } = val13.data.data;
              useToast1.success(`成功提交 ${val14}/${val15} 个评分项目，等待审核`), val4("success"), zz8();
            } else useToast1.error(val13.data.message || "提交失败");
          } catch {
            useToast1.error("提交失败");
          } finally {
            refVal8.value = !1, refVal9.value = !1;
          }
        }
      }
      async function zz16() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal();
          return;
        }
        refVal.value ? await zz15() : await zz14();
      }
      const val12 = applyDirectives(() => refVal6.value.filter(val1 => val1.name.trim()).length);
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val13) => (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "drawer"
      }, {
        default: toDisplayValue(() => [val.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz8
        }, [createElementVNode("div", {
          class: "drawer-container",
          onClick: val13[6] || (val13[6] = withModifiers(() => {}, ["stop"]))
        }, [createElementVNode("div", Ce, [createElementVNode("div", Ie, [createElementVNode("div", Be, [refVal.value ? (openBlock(), createElementBlock("svg", Te, [...(val13[7] || (val13[7] = [createElementVNode("line", {
          x1: "8",
          y1: "6",
          x2: "21",
          y2: "6"
        }, null, -1), createElementVNode("line", {
          x1: "8",
          y1: "12",
          x2: "21",
          y2: "12"
        }, null, -1), createElementVNode("line", {
          x1: "8",
          y1: "18",
          x2: "21",
          y2: "18"
        }, null, -1), createElementVNode("line", {
          x1: "3",
          y1: "6",
          x2: "3.01",
          y2: "6"
        }, null, -1), createElementVNode("line", {
          x1: "3",
          y1: "12",
          x2: "3.01",
          y2: "12"
        }, null, -1), createElementVNode("line", {
          x1: "3",
          y1: "18",
          x2: "3.01",
          y2: "18"
        }, null, -1)]))])) : val10.value ? (openBlock(), createElementBlock("svg", _e, [...(val13[8] || (val13[8] = [createElementVNode("circle", {
          cx: "12",
          cy: "12",
          r: "10"
        }, null, -1), createElementVNode("line", {
          x1: "12",
          y1: "8",
          x2: "12",
          y2: "16"
        }, null, -1), createElementVNode("line", {
          x1: "8",
          y1: "12",
          x2: "16",
          y2: "12"
        }, null, -1)]))])) : (openBlock(), createElementBlock("svg", Me, [...(val13[9] || (val13[9] = [createElementVNode("path", {
          d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        }, null, -1), createElementVNode("path", {
          d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        }, null, -1)]))]))]), createElementVNode("div", Fe, [createElementVNode("h3", null, toDisplayString(val6.value), 1), createElementVNode("p", Se, [refVal.value ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [createTextVNode("一次添加多个评分项目")], 64)) : val10.value ? (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode("为社区添加新内容")], 64)) : (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [createTextVNode("帮助完善社区信息")], 64))])])]), createElementVNode("button", {
          class: "drawer-close",
          onClick: zz8
        }, [...(val13[10] || (val13[10] = [createElementVNode("svg", {
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
        })], -1)]))])]), createElementVNode("div", Ve, [val10.value && val.parentPath ? (openBlock(), createElementBlock("div", De, [val13[12] || (val13[12] = createElementVNode("div", {
          class: "path-icon"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
        })])], -1)), createElementVNode("div", Ne, [val13[11] || (val13[11] = createElementVNode("span", {
          class: "path-label"
        }, "添加位置", -1)), createElementVNode("span", Pe, toDisplayString(val.parentPath), 1)])])) : createCommentVNode("", !0), createVNode(withSlots, {
          name: "fade-slide"
        }, {
          default: toDisplayValue(() => [val5.value ? (openBlock(), createElementBlock("div", Ue, [createElementVNode("button", {
            type: "button",
            class: normalizeClass(["mode-btn", {
              active: !refVal.value
            }]),
            onClick: val13[0] || (val13[0] = val14 => refVal.value = !1)
          }, [...(val13[13] || (val13[13] = [createElementVNode("svg", {
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
          })], -1), createElementVNode("span", null, "单个新增", -1)]))], 2), createElementVNode("button", {
            type: "button",
            class: normalizeClass(["mode-btn", {
              active: refVal.value
            }]),
            onClick: val13[1] || (val13[1] = val14 => refVal.value = !0)
          }, [...(val13[14] || (val13[14] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("line", {
            x1: "8",
            y1: "6",
            x2: "21",
            y2: "6"
          }), createElementVNode("line", {
            x1: "8",
            y1: "12",
            x2: "21",
            y2: "12"
          }), createElementVNode("line", {
            x1: "8",
            y1: "18",
            x2: "21",
            y2: "18"
          }), createElementVNode("line", {
            x1: "3",
            y1: "6",
            x2: "3.01",
            y2: "6"
          }), createElementVNode("line", {
            x1: "3",
            y1: "12",
            x2: "3.01",
            y2: "12"
          }), createElementVNode("line", {
            x1: "3",
            y1: "18",
            x2: "3.01",
            y2: "18"
          })], -1), createElementVNode("span", null, "批量新增", -1)]))], 2)])) : createCommentVNode("", !0)]),
          _: 1
        }), createVNode(withSlots, {
          name: "mode-switch",
          mode: "out-in"
        }, {
          default: toDisplayValue(() => [refVal.value ? (openBlock(), createElementBlock("div", tt, [createElementVNode("div", lt, [createElementVNode("div", nt, [val13[27] || (val13[27] = createElementVNode("label", {
            class: "form-label"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("line", {
            x1: "8",
            y1: "6",
            x2: "21",
            y2: "6"
          }), createElementVNode("line", {
            x1: "8",
            y1: "12",
            x2: "21",
            y2: "12"
          }), createElementVNode("line", {
            x1: "8",
            y1: "18",
            x2: "21",
            y2: "18"
          }), createElementVNode("line", {
            x1: "3",
            y1: "6",
            x2: "3.01",
            y2: "6"
          }), createElementVNode("line", {
            x1: "3",
            y1: "12",
            x2: "3.01",
            y2: "12"
          }), createElementVNode("line", {
            x1: "3",
            y1: "18",
            x2: "3.01",
            y2: "18"
          })]), createTextVNode(" 评分项目列表 ")], -1)), createElementVNode("span", st, toDisplayString(val12.value) + " 个有效", 1)]), createVNode(TransitionGroup, {
            name: "batch-list",
            tag: "div",
            class: "batch-items"
          }, {
            default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal6.value, (val14, val15) => (openBlock(), createElementBlock("div", {
              key: val14.id,
              class: "batch-item"
            }, [createElementVNode("div", at, [createElementVNode("div", ot, toDisplayString(val15 + 1), 1), createElementVNode("button", {
              type: "button",
              class: "batch-item-remove",
              disabled: refVal6.value.length <= 1,
              onClick: val16 => zz2(val14.id)
            }, [...(val13[28] || (val13[28] = [createElementVNode("svg", {
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
            })], -1)]))], 8, it)]), createElementVNode("div", rt, [createElementVNode("div", ut, [withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": val16 => val14.name = val16,
              type: "text",
              class: "batch-item-input",
              placeholder: "名称（必填）",
              maxlength: "100"
            }, null, 8, dt), [[vModelText, val14.name]]), withDirectives(createElementVNode("input", {
              "onUpdate:modelValue": val16 => val14.description = val16,
              type: "text",
              class: "batch-item-desc",
              placeholder: "描述（选填）",
              maxlength: "500"
            }, null, 8, ct), [[vModelText, val14.description]])]), createElementVNode("div", vt, [val14.imagePreview ? (openBlock(), createElementBlock("div", pt, [createElementVNode("img", {
              src: val14.imagePreview,
              alt: "预览"
            }, null, 8, mt), createElementVNode("button", {
              type: "button",
              class: "batch-image-remove",
              onClick: val16 => zz5(val14.id)
            }, [...(val13[29] || (val13[29] = [createElementVNode("svg", {
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
            })], -1)]))], 8, yt)])) : (openBlock(), createElementBlock("label", ft, [createElementVNode("input", {
              type: "file",
              accept: "image/*",
              class: "hidden-input",
              onChange: val16 => zz4(val16, val14.id)
            }, null, 40, xt), val13[30] || (val13[30] = createElementVNode("svg", {
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
            })], -1)), val13[31] || (val13[31] = createElementVNode("span", null, "添加图片", -1))]))])])]))), 128))]),
            _: 1
          }), createElementVNode("button", {
            type: "button",
            class: "add-batch-item-btn",
            disabled: refVal6.value.length >= 50,
            onClick: zz1
          }, [...(val13[32] || (val13[32] = [createElementVNode("svg", {
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
          })], -1), createElementVNode("span", null, "添加更多", -1), createElementVNode("span", {
            class: "add-limit"
          }, "（最多 50 个）", -1)]))], 8, ht)]), createElementVNode("div", gt, [val13[33] || (val13[33] = createElementVNode("div", {
            class: "form-label-row"
          }, [createElementVNode("label", {
            class: "form-label"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }), createElementVNode("path", {
            d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          }), createElementVNode("line", {
            x1: "12",
            y1: "17",
            x2: "12.01",
            y2: "17"
          })]), createTextVNode(" 新增说明 ")]), createElementVNode("span", {
            class: "form-optional"
          }, "选填")], -1)), createElementVNode("div", bt, [withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val13[5] || (val13[5] = val14 => refVal7.value = val14),
            class: "form-textarea form-textarea-sm",
            placeholder: "简单说明为什么要批量添加这些内容~",
            rows: "2",
            maxlength: "500"
          }, null, 512), [[vModelText, refVal7.value]])]), val13[34] || (val13[34] = createElementVNode("div", {
            class: "form-tip"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          }), createElementVNode("path", {
            d: "M12 16v-4"
          }), createElementVNode("path", {
            d: "M12 8h.01"
          })]), createElementVNode("span", null, "提交后将由管理员审核，通过后即可生效")], -1))])])) : (openBlock(), createElementBlock("form", {
            key: "single",
            class: "feedback-form",
            onSubmit: withModifiers(zz16, ["prevent"])
          }, [val7.value ? (openBlock(), createElementBlock("div", $e, [val13[16] || (val13[16] = createElementVNode("div", {
            class: "form-label-row"
          }, [createElementVNode("label", {
            class: "form-label"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M4 7V4h16v3"
          }), createElementVNode("path", {
            d: "M9 20h6"
          }), createElementVNode("path", {
            d: "M12 4v16"
          })]), createTextVNode(" 名称 ")]), createElementVNode("span", {
            class: "form-required"
          }, "必填")], -1)), createElementVNode("div", Le, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val13[2] || (val13[2] = val14 => refVal2.value.name = val14),
            type: "text",
            class: "form-input",
            placeholder: `给这个${obj[val.targetType]}起个名字吧`,
            maxlength: "50"
          }, null, 8, ze), [[vModelText, refVal2.value.name]])]), val.contributionType === 1 && val.currentName ? (openBlock(), createElementBlock("div", Re, [val13[15] || (val13[15] = createElementVNode("span", {
            class: "current-label"
          }, "当前名称", -1)), createElementVNode("span", Ge, toDisplayString(val.currentName), 1)])) : createCommentVNode("", !0)])) : createCommentVNode("", !0), val8.value ? (openBlock(), createElementBlock("div", Ae, [val13[18] || (val13[18] = createElementVNode("div", {
            class: "form-label-row"
          }, [createElementVNode("label", {
            class: "form-label"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("line", {
            x1: "17",
            y1: "10",
            x2: "3",
            y2: "10"
          }), createElementVNode("line", {
            x1: "21",
            y1: "6",
            x2: "3",
            y2: "6"
          }), createElementVNode("line", {
            x1: "21",
            y1: "14",
            x2: "3",
            y2: "14"
          }), createElementVNode("line", {
            x1: "17",
            y1: "18",
            x2: "3",
            y2: "18"
          })]), createTextVNode(" 描述 ")]), createElementVNode("span", {
            class: "form-optional"
          }, "选填")], -1)), createElementVNode("div", He, [withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val13[3] || (val13[3] = val14 => refVal2.value.description = val14),
            class: "form-textarea",
            placeholder: `简单介绍一下这个${obj[val.targetType]}~`,
            rows: "3",
            maxlength: "500"
          }, null, 8, We), [[vModelText, refVal2.value.description]])]), val.contributionType === 1 && val.currentDescription ? (openBlock(), createElementBlock("div", qe, [val13[17] || (val13[17] = createElementVNode("span", {
            class: "current-label"
          }, "当前描述", -1)), createElementVNode("span", Oe, toDisplayString(val.currentDescription), 1)])) : createCommentVNode("", !0)])) : createCommentVNode("", !0), val9.value ? (openBlock(), createElementBlock("div", Je, [val13[23] || (val13[23] = createElementVNode("div", {
            class: "form-label-row"
          }, [createElementVNode("label", {
            class: "form-label"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
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
          })]), createTextVNode(" 配图 ")]), createElementVNode("span", {
            class: "form-optional"
          }, "选填")], -1)), refVal4.value ? (openBlock(), createElementBlock("div", Ee, [createElementVNode("img", {
            src: refVal4.value,
            alt: "预览",
            class: "image-preview"
          }, null, 8, Ke), createElementVNode("button", {
            type: "button",
            class: "remove-image-btn",
            onClick: zz10
          }, [...(val13[19] || (val13[19] = [createElementVNode("svg", {
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
          })], -1), createElementVNode("span", null, "移除", -1)]))])])) : (openBlock(), createElementBlock("label", je, [createElementVNode("input", {
            type: "file",
            accept: "image/*",
            class: "hidden-input",
            onChange: zz9
          }, null, 32), val13[20] || (val13[20] = createElementVNode("div", {
            class: "upload-icon"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("path", {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          }), createElementVNode("polyline", {
            points: "17 8 12 3 7 8"
          }), createElementVNode("line", {
            x1: "12",
            y1: "3",
            x2: "12",
            y2: "15"
          })])], -1)), val13[21] || (val13[21] = createElementVNode("span", {
            class: "upload-text"
          }, "点击或拖拽上传图片", -1)), val13[22] || (val13[22] = createElementVNode("span", {
            class: "upload-hint"
          }, "JPG / PNG / GIF / WebP，最大 20MB", -1))]))])) : createCommentVNode("", !0), createElementVNode("div", Qe, [createElementVNode("div", Xe, [createElementVNode("label", Ye, [val13[24] || (val13[24] = createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }), createElementVNode("path", {
            d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          }), createElementVNode("line", {
            x1: "12",
            y1: "17",
            x2: "12.01",
            y2: "17"
          })], -1)), createTextVNode(" " + toDisplayString(val11.value), 1)]), val13[25] || (val13[25] = createElementVNode("span", {
            class: "form-required"
          }, "必填", -1))]), createElementVNode("div", Ze, [withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val13[4] || (val13[4] = val14 => refVal2.value.reason = val14),
            class: "form-textarea",
            placeholder: val10.value ? "告诉我们为什么要添加这个内容~" : "简单说明一下修改的原因~",
            rows: "3",
            maxlength: "500"
          }, null, 8, et), [[vModelText, refVal2.value.reason]])]), val13[26] || (val13[26] = createElementVNode("div", {
            class: "form-tip"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          }), createElementVNode("path", {
            d: "M12 16v-4"
          }), createElementVNode("path", {
            d: "M12 8h.01"
          })]), createElementVNode("span", null, "提交后将由管理员审核，通过后即可生效")], -1))])], 32))]),
          _: 1
        })]), createElementVNode("div", wt, [createElementVNode("button", {
          class: "btn-secondary",
          onClick: zz8
        }, [...(val13[35] || (val13[35] = [createElementVNode("span", null, "下次再说", -1)]))]), createElementVNode("button", {
          class: "btn-primary",
          disabled: refVal8.value || refVal9.value,
          onClick: zz16
        }, [!refVal8.value && !refVal9.value ? (openBlock(), createElementBlock("svg", Ct, [...(val13[36] || (val13[36] = [createElementVNode("path", {
          d: "M22 2L11 13"
        }, null, -1), createElementVNode("path", {
          d: "M22 2l-7 20-4-9-9-4 20-7z"
        }, null, -1)]))])) : createCommentVNode("", !0), refVal8.value || refVal9.value ? (openBlock(), createElementBlock("span", It, [...(val13[37] || (val13[37] = [createElementVNode("span", null, null, -1), createElementVNode("span", null, null, -1), createElementVNode("span", null, null, -1)]))])) : refVal.value ? (openBlock(), createElementBlock("span", Bt, "提交 " + toDisplayString(val12.value) + " 个项目", 1)) : (openBlock(), createElementBlock("span", Tt, toDisplayString(val10.value ? "提交申请" : "提交反馈"), 1))], 8, kt)])])])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  scopedStyle_zb0 = withScopeId(_t, [["__scopeId", "data-v-ebfcd2b4"]]);
/* index 运行时导出（已语义化） */
export { scopedStyle_zb0 };