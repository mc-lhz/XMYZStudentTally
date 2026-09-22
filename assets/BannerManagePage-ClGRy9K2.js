/*!
 * 页面模块：轮播图管理（BannerManagePage）
 * 路由：/admin/banners   name=admin-banners   层级=2   需登录=是
 * 功能：登录后的「轮播图管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/BannerManagePage-ClGRy9K2.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, normalizeClass, createVNodeWrapper, toDisplayString, renderList, withModifiers, withDirectives, vModelText, deepDirectiveOptions, getAdminBanners, updateAdminBanner, createAdminBanner, deleteAdminBanner, toggleAdminBannerStatus, openBlock, nextTick, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 file（站点内功能模块） */
import { uploadFiles as ge } from "./file-CSaAaIBf.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const xe = {
    class: "page-container"
  },
  he = {
    class: "page-content"
  },
  _e = {
    class: "content-container"
  },
  we = {
    class: "breadcrumb-wrapper"
  },
  Ce = {
    key: 0,
    class: "loading-container"
  },
  Te = {
    class: "status-tabs"
  },
  Ue = {
    key: 0,
    class: "empty-container"
  },
  Be = {
    key: 1,
    class: "banners-list"
  },
  Me = ["onClick"],
  De = {
    class: "banner-cover"
  },
  Ve = ["src", "alt"],
  Ie = {
    key: 1,
    class: "cover-placeholder"
  },
  Oe = {
    class: "banner-info"
  },
  Pe = {
    class: "banner-header"
  },
  Se = {
    class: "banner-name"
  },
  Fe = {
    key: 0,
    class: "banner-desc"
  },
  Ne = {
    class: "banner-meta"
  },
  Le = {
    class: "meta-item"
  },
  Ee = {
    class: "meta-item"
  },
  Ge = {
    class: "meta-item"
  },
  ze = {
    class: "banner-actions"
  },
  He = ["onClick"],
  $e = ["onClick"],
  Re = {
    class: "modal-content modal-lg"
  },
  qe = {
    class: "modal-title"
  },
  Ae = {
    class: "form-group"
  },
  je = {
    class: "form-group"
  },
  Je = {
    class: "form-group"
  },
  We = {
    key: 0,
    class: "uploaded-image-wrapper"
  },
  Ze = ["src"],
  Ke = {
    class: "image-actions"
  },
  Qe = ["disabled"],
  Xe = ["disabled"],
  Ye = {
    key: 0,
    class: "upload-loading"
  },
  et = {
    class: "form-row"
  },
  tt = {
    class: "form-group"
  },
  lt = {
    class: "form-group"
  },
  st = {
    key: 0,
    class: "form-group"
  },
  at = ["placeholder"],
  ot = {
    class: "form-row"
  },
  it = {
    class: "form-group"
  },
  nt = {
    class: "form-group"
  },
  rt = {
    class: "modal-actions"
  },
  dt = ["disabled"],
  ut = ["disabled"],
  ct = {
    class: "modal-content"
  },
  vt = {
    class: "modal-desc"
  },
  pt = {
    class: "modal-actions"
  },
  mt = ["disabled"],
  ft = ["disabled"],
  gt = defineComponent({
    __name: "BannerManagePage",
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
        refVal13 = ref(null),
        refVal14 = ref(!1),
        refVal15 = ref({
          title: "",
          description: "",
          imageUrl: "",
          linkUrl: "",
          linkType: "none",
          position: "home",
          sortOrder: 0,
          startTime: null,
          endTime: null
        }),
        val2 = applyDirectives(() => {
          if (refVal3.value === "all") return refVal2.value;
          const val1 = refVal3.value === "enabled" ? 1 : 0;
          return refVal2.value.filter(val3 => val3.status === val1);
        });
      async function zz0() {
        try {
          const adminBanners = await getAdminBanners();
          refVal2.value = adminBanners;
        } catch {
          useToast1.error("获取轮播图列表失败");
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
      function zz2(val1) {
        return {
          internal: "站内",
          external: "站外",
          none: "无"
        }[val1] || val1;
      }
      function zz3() {
        refVal13.value?.click();
      }
      async function zz4(val1) {
        const val3 = val1.target,
          val4 = val3.files?.[0];
        if (val4) {
          if (!val4.type.startsWith("image/")) {
            useToast1.error("请选择图片文件");
            return;
          }
          if (val4.size > 20 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 20MB");
            return;
          }
          refVal14.value = !0;
          try {
            const val5 = await ge(val4, "banner");
            refVal15.value.imageUrl = val5.data.data.fileUrl, useToast1.success("图片上传成功");
          } catch {
            useToast1.error("图片上传失败");
          } finally {
            refVal14.value = !1, val3.value = "";
          }
        }
      }
      function zz5() {
        refVal15.value.imageUrl = "";
      }
      async function zz6(val1, val3) {
        val3.stopPropagation();
        try {
          const adminBannerStatus = await toggleAdminBannerStatus(val1.id),
            val5 = refVal2.value.findIndex(val6 => val6.id === val1.id);
          val5 !== -1 && (refVal2.value[val5] = adminBannerStatus), useToast1.success(adminBannerStatus.status === 1 ? "已启用" : "已禁用");
        } catch {
          useToast1.error("操作失败");
        }
      }
      function zz7() {
        refVal10.value = !1, refVal12.value = null, refVal15.value = {
          title: "",
          description: "",
          imageUrl: "",
          linkUrl: "",
          linkType: "none",
          position: "home",
          sortOrder: 0,
          startTime: null,
          endTime: null
        }, refVal9.value = !0;
      }
      function zz8(val1, val3) {
        refVal10.value = !0, refVal12.value = val1, refVal15.value = {
          title: val1.title,
          description: val1.description || "",
          imageUrl: val1.imageUrl,
          linkUrl: val1.linkUrl || "",
          linkType: val1.linkType,
          position: val1.position,
          sortOrder: val1.sortOrder,
          startTime: val1.startTime,
          endTime: val1.endTime
        }, refVal9.value = !0;
      }
      function zz9() {
        refVal9.value = !1, refVal12.value = null;
      }
      async function zz10() {
        if (!refVal15.value.title.trim()) {
          useToast1.error("请输入标题");
          return;
        }
        if (!refVal15.value.imageUrl.trim()) {
          useToast1.error("请上传图片");
          return;
        }
        refVal11.value = !0;
        try {
          if (refVal10.value && refVal12.value) {
            const obj = {
                title: refVal15.value.title,
                description: refVal15.value.description || void 0,
                imageUrl: refVal15.value.imageUrl,
                linkUrl: refVal15.value.linkUrl || void 0,
                linkType: refVal15.value.linkType,
                position: refVal15.value.position,
                sortOrder: refVal15.value.sortOrder,
                startTime: refVal15.value.startTime,
                endTime: refVal15.value.endTime
              },
              adminBanner = await updateAdminBanner(refVal12.value.id, obj),
              val3 = refVal2.value.findIndex(val4 => val4.id === refVal12.value.id);
            val3 !== -1 && (refVal2.value[val3] = adminBanner), useToast1.success("更新成功");
          } else {
            const adminBanner = await createAdminBanner(refVal15.value);
            refVal2.value.unshift(adminBanner), useToast1.success("创建成功");
          }
          zz9();
        } catch {
          useToast1.error(refVal10.value ? "更新失败" : "创建失败");
        } finally {
          refVal11.value = !1;
        }
      }
      function zz11(val1, val3) {
        val3.stopPropagation(), refVal7.value = val1, refVal6.value = !0;
      }
      async function zz12() {
        if (refVal7.value) {
          refVal8.value = !0;
          try {
            await deleteAdminBanner(refVal7.value.id), refVal2.value = refVal2.value.filter(val1 => val1.id !== refVal7.value.id), useToast1.success("删除成功"), refVal6.value = !1, refVal7.value = null;
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal8.value = !1;
          }
        }
      }
      function zz13() {
        refVal6.value = !1, refVal7.value = null;
      }
      function zz14(val1) {
        return val1 ? new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }) : "-";
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageBanners) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", xe, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", he, [createElementVNode("div", _e, [createElementVNode("div", we, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val3[11] || (val3[11] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "轮播图管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理首页轮播图展示")], -1)), createElementVNode("div", {
        class: "header-actions"
      }, [createElementVNode("button", {
        class: "action-button primary",
        onClick: zz7
      }, [...(val3[10] || (val3[10] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 添加轮播图 ", -1)]))])])])]), refVal.value ? (openBlock(), createElementBlock("div", Ce, [...(val3[12] || (val3[12] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Te, [createElementVNode("button", {
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
      }, [val2.value.length === 0 ? (openBlock(), createElementBlock("div", Ue, [val3[13] || (val3[13] = createVNodeWrapper('<div class="empty-icon" data-v-9e679418><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-9e679418><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-9e679418></rect><line x1="8" y1="21" x2="16" y2="21" data-v-9e679418></line><line x1="12" y1="17" x2="12" y2="21" data-v-9e679418></line></svg></div>', 1)), createElementVNode("h2", null, toDisplayString(refVal3.value === "all" ? "暂无轮播图" : "暂无相关轮播图"), 1), createElementVNode("p", null, toDisplayString(refVal3.value === "all" ? "还没有添加任何轮播图" : "没有找到该状态的轮播图"), 1), refVal3.value === "all" ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "empty-action-btn",
        onClick: zz7
      }, " 添加第一个轮播图 ")) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Be, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val2.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.id,
        class: "banner-card",
        onClick: val5 => zz8(val4)
      }, [createElementVNode("div", De, [val4.imageUrl ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val4.imageUrl,
        alt: val4.title,
        class: "cover-image"
      }, null, 8, Ve)) : (openBlock(), createElementBlock("div", Ie, [...(val3[14] || (val3[14] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("rect", {
        x: "2",
        y: "3",
        width: "20",
        height: "14",
        rx: "2",
        ry: "2"
      }), createElementVNode("line", {
        x1: "8",
        y1: "21",
        x2: "16",
        y2: "21"
      }), createElementVNode("line", {
        x1: "12",
        y1: "17",
        x2: "12",
        y2: "21"
      })], -1)]))]))]), createElementVNode("div", Oe, [createElementVNode("div", Pe, [createElementVNode("h3", Se, toDisplayString(val4.title), 1), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz1(val4.status).class])
      }, toDisplayString(zz1(val4.status).label), 3)]), val4.description ? (openBlock(), createElementBlock("p", Fe, toDisplayString(val4.description), 1)) : createCommentVNode("", !0), createElementVNode("div", Ne, [createElementVNode("span", Le, "排序: " + toDisplayString(val4.sortOrder), 1), val3[15] || (val3[15] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Ee, "链接: " + toDisplayString(zz2(val4.linkType)), 1), val3[16] || (val3[16] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", Ge, toDisplayString(zz14(val4.createdAt)), 1)])]), createElementVNode("div", ze, [createElementVNode("button", {
        class: normalizeClass(["action-btn", val4.status === 1 ? "disable" : "enable"]),
        onClick: val5 => zz6(val4, val5)
      }, toDisplayString(val4.status === 1 ? "禁用" : "启用"), 11, He), createElementVNode("button", {
        class: "action-btn delete",
        onClick: val5 => zz11(val4, val5)
      }, " 删除 ", 8, $e), val3[17] || (val3[17] = createElementVNode("div", {
        class: "arrow-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })])], -1))])], 8, Me))), 128))]))], 2)], 64))])]), createVNode(PageFooter), refVal9.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz9, ["self"])
      }, [createElementVNode("div", Re, [createElementVNode("h3", qe, toDisplayString(refVal10.value ? "编辑轮播图" : "添加轮播图"), 1), createElementVNode("div", Ae, [val3[18] || (val3[18] = createElementVNode("label", {
        class: "form-label"
      }, [createTextVNode(" 标题 "), createElementVNode("span", {
        class: "required"
      }, "*")], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[3] || (val3[3] = val4 => refVal15.value.title = val4),
        type: "text",
        class: "form-input",
        placeholder: "请输入标题",
        maxlength: "100"
      }, null, 512), [[vModelText, refVal15.value.title]])]), createElementVNode("div", je, [val3[19] || (val3[19] = createElementVNode("label", {
        class: "form-label"
      }, "描述", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val3[4] || (val3[4] = val4 => refVal15.value.description = val4),
        class: "form-textarea",
        placeholder: "请输入描述（可选）",
        maxlength: "500",
        rows: "2"
      }, null, 512), [[vModelText, refVal15.value.description]])]), createElementVNode("div", Je, [val3[24] || (val3[24] = createElementVNode("label", {
        class: "form-label"
      }, [createTextVNode(" 轮播图图片 "), createElementVNode("span", {
        class: "required"
      }, "*")], -1)), createElementVNode("input", {
        ref_key: "fileInputRef",
        ref: refVal13,
        type: "file",
        accept: "image/*",
        class: "file-input-hidden",
        onChange: zz4
      }, null, 544), refVal15.value.imageUrl ? (openBlock(), createElementBlock("div", We, [createElementVNode("img", {
        src: refVal15.value.imageUrl,
        alt: "预览",
        class: "uploaded-image"
      }, null, 8, Ze), createElementVNode("div", Ke, [createElementVNode("button", {
        type: "button",
        class: "image-action-btn replace",
        onClick: zz3,
        disabled: refVal14.value
      }, [...(val3[20] || (val3[20] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }), createElementVNode("polyline", {
        points: "17 8 12 3 7 8"
      }), createElementVNode("line", {
        x1: "12",
        y1: "3",
        x2: "12",
        y2: "15"
      })], -1), createTextVNode(" 更换 ", -1)]))], 8, Qe), createElementVNode("button", {
        type: "button",
        class: "image-action-btn remove",
        onClick: zz5,
        disabled: refVal14.value
      }, [...(val3[21] || (val3[21] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "3 6 5 6 21 6"
      }), createElementVNode("path", {
        d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      })], -1), createTextVNode(" 移除 ", -1)]))], 8, Xe)])])) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["upload-area", {
          uploading: refVal14.value
        }]),
        onClick: zz3
      }, [refVal14.value ? (openBlock(), createElementBlock("div", Ye, [...(val3[22] || (val3[22] = [createElementVNode("div", {
        class: "upload-spinner"
      }, null, -1), createElementVNode("span", null, "上传中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val3[23] || (val3[23] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-9e679418><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-9e679418></path><polyline points="17 8 12 3 7 8" data-v-9e679418></polyline><line x1="12" y1="3" x2="12" y2="15" data-v-9e679418></line></svg><span class="upload-text" data-v-9e679418>点击上传图片</span><span class="upload-hint" data-v-9e679418>支持 JPG、PNG、GIF，不超过 20MB</span>', 3))], 64))], 2))]), createElementVNode("div", et, [createElementVNode("div", tt, [val3[26] || (val3[26] = createElementVNode("label", {
        class: "form-label"
      }, "链接类型", -1)), withDirectives(createElementVNode("select", {
        "onUpdate:modelValue": val3[5] || (val3[5] = val4 => refVal15.value.linkType = val4),
        class: "form-select"
      }, [...(val3[25] || (val3[25] = [createElementVNode("option", {
        value: "none"
      }, "不跳转", -1), createElementVNode("option", {
        value: "internal"
      }, "站内链接", -1), createElementVNode("option", {
        value: "external"
      }, "站外链接", -1)]))], 512), [[deepDirectiveOptions, refVal15.value.linkType]])]), createElementVNode("div", lt, [val3[27] || (val3[27] = createElementVNode("label", {
        class: "form-label"
      }, "排序", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[6] || (val3[6] = val4 => refVal15.value.sortOrder = val4),
        type: "number",
        class: "form-input",
        placeholder: "0",
        min: "0"
      }, null, 512), [[vModelText, refVal15.value.sortOrder, void 0, {
        number: !0
      }]])])]), refVal15.value.linkType !== "none" ? (openBlock(), createElementBlock("div", st, [val3[28] || (val3[28] = createElementVNode("label", {
        class: "form-label"
      }, "跳转链接", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[7] || (val3[7] = val4 => refVal15.value.linkUrl = val4),
        type: "url",
        class: "form-input",
        placeholder: refVal15.value.linkType === "internal" ? "如: /ticket" : "如: https://example.com"
      }, null, 8, at), [[vModelText, refVal15.value.linkUrl]])])) : createCommentVNode("", !0), createElementVNode("div", ot, [createElementVNode("div", it, [val3[29] || (val3[29] = createElementVNode("label", {
        class: "form-label"
      }, "生效开始时间", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[8] || (val3[8] = val4 => refVal15.value.startTime = val4),
        type: "datetime-local",
        class: "form-input"
      }, null, 512), [[vModelText, refVal15.value.startTime]])]), createElementVNode("div", nt, [val3[30] || (val3[30] = createElementVNode("label", {
        class: "form-label"
      }, "生效结束时间", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val3[9] || (val3[9] = val4 => refVal15.value.endTime = val4),
        type: "datetime-local",
        class: "form-input"
      }, null, 512), [[vModelText, refVal15.value.endTime]])])]), createElementVNode("div", rt, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz9,
        disabled: refVal11.value
      }, " 取消 ", 8, dt), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz10,
        disabled: refVal11.value
      }, toDisplayString(refVal11.value ? "保存中..." : "保存"), 9, ut)])])])) : createCommentVNode("", !0), refVal6.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "modal-overlay",
        onClick: withModifiers(zz13, ["self"])
      }, [createElementVNode("div", ct, [val3[31] || (val3[31] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), createElementVNode("p", vt, ' 确定要删除轮播图"' + toDisplayString(refVal7.value?.title) + '"吗？此操作不可撤销。 ', 1), createElementVNode("div", pt, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz13,
        disabled: refVal8.value
      }, " 取消 ", 8, mt), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz12,
        disabled: refVal8.value
      }, toDisplayString(refVal8.value ? "删除中..." : "确认删除"), 9, ft)])])])) : createCommentVNode("", !0)]));
    }
  }),
  wt = withScopeId(gt, [["__scopeId", "data-v-9e679418"]]);
/* index 运行时导出（已语义化） */
export { wt as default };