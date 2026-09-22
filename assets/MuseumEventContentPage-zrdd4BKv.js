/*!
 * 页面模块：内容管理（MuseumEventContentPage）
 * 路由：/admin/museum/events/:id/content   name=admin-museum-event-content   层级=4   需登录=是
 * 功能：登录后的「内容管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MuseumEventContentPage-zrdd4BKv.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, createVNodeWrapper, createTextVNode, renderList, withModifiers, unref, withDirectives, vModelText, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 museum-BDeGDA-n（站点内功能模块） */
import { getAdminMuseumEventsById as fe, getAdminMuseumEventsBlocks as he, updateAdminMuseumEventsBlocks as ge, createAdminMuseumEventsBlocks as _e, deleteAdminMuseumEventsBlocks as be, sortAdminMuseumEventsBlocks as xe } from "./museum-BDeGDA-n.js";
/* 导入：本地模块 file（站点内功能模块） */
import { uploadFiles as we } from "./file-CSaAaIBf.js";
/* 导入：本地模块 museum（站点内功能模块） */
import { museumMediaTypeLabels } from "./museum-BRoy68F1.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Ve = {
    class: "page-container"
  },
  Te = {
    class: "page-content"
  },
  Me = {
    class: "content-container"
  },
  De = {
    class: "breadcrumb-wrapper"
  },
  Ie = {
    key: 0,
    class: "loading-container"
  },
  $e = {
    class: "event-header-card"
  },
  Pe = {
    key: 0,
    class: "event-cover"
  },
  Le = ["src", "alt"],
  Ne = {
    class: "event-info"
  },
  Se = {
    class: "event-title"
  },
  ze = {
    key: 0,
    class: "event-subtitle"
  },
  Ee = {
    class: "event-meta"
  },
  Fe = {
    class: "meta-item"
  },
  Ge = {
    key: 0,
    class: "meta-item"
  },
  Oe = {
    class: "content-editor"
  },
  He = {
    class: "blocks-container"
  },
  Re = ["onClick"],
  Ae = {
    class: "block-sort-controls"
  },
  Je = ["disabled", "onClick"],
  je = {
    class: "block-index"
  },
  qe = ["disabled", "onClick"],
  We = {
    class: "block-content"
  },
  Ke = {
    class: "block-type-badge"
  },
  Qe = {
    key: 0,
    class: "block-title"
  },
  Xe = {
    class: "block-preview"
  },
  Ye = {
    key: 1,
    class: "gallery-preview"
  },
  Ze = ["src", "alt"],
  et = {
    key: 0,
    class: "gallery-more"
  },
  tt = {
    key: 2,
    class: "timeline-preview"
  },
  lt = {
    class: "timeline-time"
  },
  nt = {
    class: "timeline-title"
  },
  ot = {
    key: 3,
    class: "links-preview"
  },
  st = {
    class: "block-actions"
  },
  it = ["onClick"],
  at = ["onClick"],
  rt = {
    key: 0,
    class: "empty-blocks"
  },
  ct = {
    class: "add-block-section"
  },
  dt = {
    class: "add-block-buttons"
  },
  ut = ["onClick"],
  vt = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  pt = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  mt = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  kt = {
    key: 3,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  yt = {
    class: "modal-content modal-lg"
  },
  ft = {
    class: "modal-title"
  },
  ht = {
    class: "form-group"
  },
  gt = {
    key: 0,
    class: "form-group"
  },
  _t = {
    key: 1,
    class: "form-group"
  },
  bt = {
    class: "gallery-grid"
  },
  xt = ["src", "alt"],
  wt = ["onClick"],
  Ct = ["onUpdate:modelValue"],
  Bt = ["disabled"],
  Ut = {
    key: 2,
    class: "form-group"
  },
  Vt = {
    class: "timeline-items"
  },
  Tt = {
    class: "timeline-item-header"
  },
  Mt = {
    class: "item-number"
  },
  Dt = ["onClick"],
  It = ["onUpdate:modelValue"],
  $t = ["onUpdate:modelValue"],
  Pt = ["onUpdate:modelValue"],
  Lt = {
    key: 3,
    class: "form-group"
  },
  Nt = {
    class: "link-items"
  },
  St = {
    class: "link-item-header"
  },
  zt = {
    class: "item-number"
  },
  Et = ["onClick"],
  Ft = ["onUpdate:modelValue"],
  Gt = ["onUpdate:modelValue"],
  Ot = ["onUpdate:modelValue"],
  Ht = {
    class: "modal-actions"
  },
  Rt = ["disabled"],
  At = ["disabled"],
  Jt = {
    class: "modal-content"
  },
  jt = {
    class: "modal-actions"
  },
  qt = ["disabled"],
  Wt = ["disabled"],
  Kt = defineComponent({
    __name: "MuseumEventContentPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(!1),
        refVal5 = ref(!1),
        refVal6 = ref(null),
        refVal7 = ref({
          blockType: "text",
          title: "",
          content: {
            text: ""
          },
          sortOrder: 0
        }),
        refVal8 = ref(!1),
        refVal9 = ref(null),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        refVal13 = ref(!1),
        list = [{
          value: "text",
          label: "文字",
          icon: "text"
        }, {
          value: "gallery",
          label: "图片画廊",
          icon: "gallery"
        }, {
          value: "timeline",
          label: "时间线",
          icon: "timeline"
        }, {
          value: "link",
          label: "链接",
          icon: "link"
        }];
      async function zz0() {
        try {
          refVal2.value = await fe(val3.value);
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/admin/museum/events");
        }
      }
      async function zz1() {
        try {
          refVal3.value = await he(val3.value);
        } catch (val1) {
          console.error("Failed to load blocks:", val1);
        } finally {
          refVal.value = !1;
        }
      }
      function zz2(val1) {
        refVal5.value = !1, refVal6.value = null, refVal7.value = {
          blockType: val1,
          title: "",
          content: zz3(val1),
          sortOrder: refVal3.value.length
        }, refVal4.value = !0;
      }
      function zz3(val1) {
        switch (val1) {
          case "text":
            return {
              text: ""
            };
          case "gallery":
            return {
              images: []
            };
          case "video":
            return {
              fileId: 0
            };
          case "file":
            return {
              files: []
            };
          case "timeline":
            return {
              items: []
            };
          case "link":
            return {
              links: []
            };
        }
      }
      function zz4(val1) {
        refVal5.value = !0, refVal6.value = val1, refVal7.value = {
          blockType: val1.blockType,
          title: val1.title || "",
          content: JSON.parse(JSON.stringify(val1.content)),
          sortOrder: val1.sortOrder
        }, refVal4.value = !0;
      }
      function zz5() {
        refVal4.value = !1, refVal6.value = null;
      }
      function zz6() {
        const val1 = refVal7.value.content;
        val1.items || (val1.items = []), val1.items.push({
          time: "",
          title: "",
          description: ""
        });
      }
      function zz7(val1) {
        refVal7.value.content.items.splice(val1, 1);
      }
      function zz8() {
        const val1 = refVal7.value.content;
        val1.links || (val1.links = []), val1.links.push({
          url: "",
          title: "",
          description: ""
        });
      }
      function zz9(val1) {
        refVal7.value.content.links.splice(val1, 1);
      }
      function zz10() {
        refVal9.value?.click();
      }
      async function zz11(val1) {
        const val4 = val1.target,
          val5 = val4.files;
        if (!val5 || val5.length === 0) return;
        refVal10.value = !0;
        const val6 = refVal7.value.content;
        val6.images || (val6.images = []);
        try {
          for (const zz12 of Array.from(val5)) {
            if (!zz12.type.startsWith("image/")) {
              useToast1.error(`${zz12.name} 不是图片文件`);
              continue;
            }
            if (zz12.size > 20 * 1024 * 1024) {
              useToast1.error(`${zz12.name} 超过 20MB`);
              continue;
            }
            const val7 = await we(zz12, "museum");
            val6.images.push({
              fileId: val7.data.data.id,
              url: val7.data.data.fileUrl,
              caption: ""
            });
          }
          useToast1.success("图片上传成功");
        } catch {
          useToast1.error("图片上传失败");
        } finally {
          refVal10.value = !1, val4.value = "";
        }
      }
      function zz13(val1) {
        refVal7.value.content.images.splice(val1, 1);
      }
      async function zz14() {
        refVal8.value = !0;
        try {
          refVal5.value && refVal6.value ? (await ge(val3.value, refVal6.value.id, refVal7.value), useToast1.success("更新成功")) : (await _e(val3.value, refVal7.value), useToast1.success("添加成功")), zz5(), zz1();
        } catch {
          useToast1.error(refVal5.value ? "更新失败" : "添加失败");
        } finally {
          refVal8.value = !1;
        }
      }
      function zz15(val1, val4) {
        val4.stopPropagation(), refVal12.value = val1, refVal11.value = !0;
      }
      async function zz16() {
        if (refVal12.value) {
          refVal13.value = !0;
          try {
            await be(val3.value, refVal12.value.id), useToast1.success("删除成功"), refVal11.value = !1, refVal12.value = null, zz1();
          } catch {
            useToast1.error("删除失败");
          } finally {
            refVal13.value = !1;
          }
        }
      }
      function zz17() {
        refVal11.value = !1, refVal12.value = null;
      }
      async function zz18(val1, val4) {
        const val5 = val4 === "up" ? val1 - 1 : val1 + 1;
        if (val5 < 0 || val5 >= refVal3.value.length) return;
        const list1 = [...refVal3.value],
          [val6] = list1.splice(val1, 1);
        if (!val6) return;
        list1.splice(val5, 0, val6);
        const val7 = list1.map(val8 => val8.id);
        try {
          await xe(val3.value, val7), refVal3.value = list1, useToast1.success("排序已更新");
        } catch {
          useToast1.error("排序更新失败"), zz1();
        }
      }
      function zz19(val1) {
        switch (val1.blockType) {
          case "text":
            {
              const val4 = val1.content.text || "";
              return val4.length > 100 ? val4.substring(0, 100) + "..." : val4;
            }
          case "gallery":
            return `${val1.content.images?.length || 0} 张图片`;
          case "timeline":
            return `${val1.content.items?.length || 0} 个时间点`;
          case "link":
            return `${val1.content.links?.length || 0} 个链接`;
          default:
            return "";
        }
      }
      function zz20(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
      function zz21() {
        useRouter1.push(`/admin/museum/events/${val3.value}/edit`);
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMuseum) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0(), zz1();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", Ve, [createVNode(PageHeader, {
        "back-to": "/admin/museum/events"
      }), createElementVNode("main", Te, [createElementVNode("div", Me, [createElementVNode("div", De, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", Ie, [...(val4[2] || (val4[2] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", $e, [refVal2.value.coverUrl ? (openBlock(), createElementBlock("div", Pe, [createElementVNode("img", {
        src: refVal2.value.coverUrl,
        alt: refVal2.value.title
      }, null, 8, Le)])) : createCommentVNode("", !0), createElementVNode("div", Ne, [createElementVNode("h1", Se, toDisplayString(refVal2.value.title), 1), refVal2.value.subtitle ? (openBlock(), createElementBlock("p", ze, toDisplayString(refVal2.value.subtitle), 1)) : createCommentVNode("", !0), createElementVNode("div", Ee, [createElementVNode("span", Fe, [val4[3] || (val4[3] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-2c0321e2><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-2c0321e2></rect><line x1="16" y1="2" x2="16" y2="6" data-v-2c0321e2></line><line x1="8" y1="2" x2="8" y2="6" data-v-2c0321e2></line><line x1="3" y1="10" x2="21" y2="10" data-v-2c0321e2></line></svg>', 1)), createTextVNode(" " + toDisplayString(zz20(refVal2.value.startDate)), 1)]), refVal2.value.location ? (openBlock(), createElementBlock("span", Ge, [val4[4] || (val4[4] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      })], -1)), createTextVNode(" " + toDisplayString(refVal2.value.location), 1)])) : createCommentVNode("", !0)]), createElementVNode("button", {
        class: "edit-info-btn",
        onClick: zz21
      }, [...(val4[5] || (val4[5] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }), createElementVNode("path", {
        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      })], -1), createTextVNode(" 编辑基本信息 ", -1)]))])])]), createElementVNode("div", Oe, [val4[16] || (val4[16] = createElementVNode("div", {
        class: "editor-header"
      }, [createElementVNode("h2", {
        class: "editor-title"
      }, "内容模块"), createElementVNode("p", {
        class: "editor-hint"
      }, "拖拽模块卡片可调整顺序，点击可编辑内容")], -1)), createElementVNode("div", He, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: val5.id,
        class: "block-item",
        onClick: val7 => zz4(val5)
      }, [createElementVNode("div", Ae, [createElementVNode("button", {
        class: "sort-btn",
        disabled: val6 === 0,
        onClick: withModifiers(val7 => zz18(val6, "up"), ["stop"])
      }, [...(val4[6] || (val4[6] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "18 15 12 9 6 15"
      })], -1)]))], 8, Je), createElementVNode("span", je, toDisplayString(val6 + 1), 1), createElementVNode("button", {
        class: "sort-btn",
        disabled: val6 === refVal3.value.length - 1,
        onClick: withModifiers(val7 => zz18(val6, "down"), ["stop"])
      }, [...(val4[7] || (val4[7] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1)]))], 8, qe)]), createElementVNode("div", We, [createElementVNode("div", Ke, toDisplayString(unref(museumMediaTypeLabels)(val5.blockType)), 1), val5.title ? (openBlock(), createElementBlock("h4", Qe, toDisplayString(val5.title), 1)) : createCommentVNode("", !0), createElementVNode("p", Xe, toDisplayString(zz19(val5)), 1), val5.blockType === "gallery" && val5.content.images?.length ? (openBlock(), createElementBlock("div", Ye, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.content.images.slice(0, 4), (val7, val8) => (openBlock(), createElementBlock("img", {
        key: val8,
        src: val7.url,
        alt: val7.caption || "",
        class: "gallery-thumb"
      }, null, 8, Ze))), 128)), val5.content.images.length > 4 ? (openBlock(), createElementBlock("span", et, " +" + toDisplayString(val5.content.images.length - 4), 1)) : createCommentVNode("", !0)])) : createCommentVNode("", !0), val5.blockType === "timeline" && val5.content.items?.length ? (openBlock(), createElementBlock("div", tt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.content.items.slice(0, 3), (val7, val8) => (openBlock(), createElementBlock("div", {
        key: val8,
        class: "timeline-item-preview"
      }, [createElementVNode("span", lt, toDisplayString(val7.time), 1), createElementVNode("span", nt, toDisplayString(val7.title), 1)]))), 128))])) : createCommentVNode("", !0), val5.blockType === "link" && val5.content.links?.length ? (openBlock(), createElementBlock("div", ot, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.content.links.slice(0, 3), (val7, val8) => (openBlock(), createElementBlock("div", {
        key: val8,
        class: "link-item-preview"
      }, toDisplayString(val7.title || val7.url), 1))), 128))])) : createCommentVNode("", !0)]), createElementVNode("div", st, [createElementVNode("button", {
        class: "block-action-btn edit",
        onClick: withModifiers(val7 => zz4(val5), ["stop"])
      }, [...(val4[8] || (val4[8] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }), createElementVNode("path", {
        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      })], -1)]))], 8, it), createElementVNode("button", {
        class: "block-action-btn delete",
        onClick: withModifiers(val7 => zz15(val5, val7), ["stop"])
      }, [...(val4[9] || (val4[9] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "3 6 5 6 21 6"
      }), createElementVNode("path", {
        d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      })], -1)]))], 8, at)])], 8, Re))), 128)), refVal3.value.length === 0 ? (openBlock(), createElementBlock("div", rt, [...(val4[10] || (val4[10] = [createVNodeWrapper('<div class="empty-icon" data-v-2c0321e2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-2c0321e2><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-2c0321e2></rect><line x1="3" y1="9" x2="21" y2="9" data-v-2c0321e2></line><line x1="9" y1="21" x2="9" y2="9" data-v-2c0321e2></line></svg></div><h3 data-v-2c0321e2>暂无内容模块</h3><p data-v-2c0321e2>点击下方按钮添加第一个内容模块</p>', 3)]))])) : createCommentVNode("", !0)]), createElementVNode("div", ct, [val4[15] || (val4[15] = createElementVNode("p", {
        class: "add-block-hint"
      }, "添加内容模块", -1)), createElementVNode("div", dt, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val5 => createElementVNode("button", {
        key: val5.value,
        class: "add-block-btn",
        onClick: val6 => zz2(val5.value)
      }, [val5.icon === "text" ? (openBlock(), createElementBlock("svg", vt, [...(val4[11] || (val4[11] = [createVNodeWrapper('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-2c0321e2></path><polyline points="14 2 14 8 20 8" data-v-2c0321e2></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-2c0321e2></line><line x1="16" y1="17" x2="8" y2="17" data-v-2c0321e2></line><polyline points="10 9 9 9 8 9" data-v-2c0321e2></polyline>', 5)]))])) : createCommentVNode("", !0), val5.icon === "gallery" ? (openBlock(), createElementBlock("svg", pt, [...(val4[12] || (val4[12] = [createElementVNode("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }, null, -1), createElementVNode("circle", {
        cx: "8.5",
        cy: "8.5",
        r: "1.5"
      }, null, -1), createElementVNode("polyline", {
        points: "21 15 16 10 5 21"
      }, null, -1)]))])) : createCommentVNode("", !0), val5.icon === "timeline" ? (openBlock(), createElementBlock("svg", mt, [...(val4[13] || (val4[13] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }, null, -1), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      }, null, -1)]))])) : createCommentVNode("", !0), val5.icon === "link" ? (openBlock(), createElementBlock("svg", kt, [...(val4[14] || (val4[14] = [createElementVNode("path", {
        d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      }, null, -1), createElementVNode("path", {
        d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      }, null, -1)]))])) : createCommentVNode("", !0), createElementVNode("span", null, toDisplayString(val5.label), 1)], 8, ut)), 64))])])])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), refVal4.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-overlay",
        onClick: withModifiers(zz5, ["self"])
      }, [createElementVNode("div", yt, [createElementVNode("h3", ft, toDisplayString(refVal5.value ? "编辑" : "添加") + toDisplayString(unref(museumMediaTypeLabels)(refVal7.value.blockType)) + "模块 ", 1), createElementVNode("div", ht, [val4[17] || (val4[17] = createElementVNode("label", {
        class: "form-label"
      }, "模块标题（可选）", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[0] || (val4[0] = val5 => refVal7.value.title = val5),
        type: "text",
        class: "form-input",
        placeholder: "请输入模块标题"
      }, null, 512), [[vModelText, refVal7.value.title]])]), refVal7.value.blockType === "text" ? (openBlock(), createElementBlock("div", gt, [val4[18] || (val4[18] = createElementVNode("label", {
        class: "form-label"
      }, "内容", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val4[1] || (val4[1] = val5 => refVal7.value.content.text = val5),
        class: "form-textarea large",
        placeholder: "请输入文字内容，支持多段落",
        rows: "8"
      }, null, 512), [[vModelText, refVal7.value.content.text]])])) : createCommentVNode("", !0), refVal7.value.blockType === "gallery" ? (openBlock(), createElementBlock("div", _t, [val4[24] || (val4[24] = createElementVNode("label", {
        class: "form-label"
      }, "图片", -1)), createElementVNode("input", {
        ref_key: "galleryFileInputRef",
        ref: refVal9,
        type: "file",
        accept: "image/*",
        multiple: "",
        class: "file-input-hidden",
        onChange: zz11
      }, null, 544), createElementVNode("div", bt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal7.value.content.images, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: val6,
        class: "gallery-item"
      }, [createElementVNode("img", {
        src: val5.url,
        alt: val5.caption || ""
      }, null, 8, xt), createElementVNode("button", {
        class: "remove-image-btn",
        onClick: val7 => zz13(val6)
      }, [...(val4[19] || (val4[19] = [createElementVNode("svg", {
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
      })], -1)]))], 8, wt), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.caption = val7,
        type: "text",
        class: "image-caption-input",
        placeholder: "图片说明"
      }, null, 8, Ct), [[vModelText, val5.caption]])]))), 128)), createElementVNode("button", {
        class: "add-image-btn",
        onClick: zz10,
        disabled: refVal10.value
      }, [refVal10.value ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [val4[20] || (val4[20] = createElementVNode("div", {
        class: "upload-spinner"
      }, null, -1)), val4[21] || (val4[21] = createElementVNode("span", null, "上传中...", -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val4[22] || (val4[22] = createElementVNode("svg", {
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
      })], -1)), val4[23] || (val4[23] = createElementVNode("span", null, "添加图片", -1))], 64))], 8, Bt)])])) : createCommentVNode("", !0), refVal7.value.blockType === "timeline" ? (openBlock(), createElementBlock("div", Ut, [val4[26] || (val4[26] = createElementVNode("label", {
        class: "form-label"
      }, "时间线项目", -1)), createElementVNode("div", Vt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal7.value.content.items, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: val6,
        class: "timeline-item-form"
      }, [createElementVNode("div", Tt, [createElementVNode("span", Mt, toDisplayString(val6 + 1), 1), createElementVNode("button", {
        class: "remove-item-btn",
        onClick: val7 => zz7(val6)
      }, [...(val4[25] || (val4[25] = [createElementVNode("svg", {
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
      })], -1)]))], 8, Dt)]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.time = val7,
        type: "text",
        class: "form-input",
        placeholder: "时间（如：2024年1月）"
      }, null, 8, It), [[vModelText, val5.time]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.title = val7,
        type: "text",
        class: "form-input",
        placeholder: "标题"
      }, null, 8, $t), [[vModelText, val5.title]]), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val7 => val5.description = val7,
        class: "form-textarea",
        placeholder: "描述（可选）",
        rows: "2"
      }, null, 8, Pt), [[vModelText, val5.description]])]))), 128))]), createElementVNode("button", {
        class: "add-item-btn",
        onClick: zz6
      }, " + 添加时间点 ")])) : createCommentVNode("", !0), refVal7.value.blockType === "link" ? (openBlock(), createElementBlock("div", Lt, [val4[28] || (val4[28] = createElementVNode("label", {
        class: "form-label"
      }, "链接列表", -1)), createElementVNode("div", Nt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal7.value.content.links, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: val6,
        class: "link-item-form"
      }, [createElementVNode("div", St, [createElementVNode("span", zt, toDisplayString(val6 + 1), 1), createElementVNode("button", {
        class: "remove-item-btn",
        onClick: val7 => zz9(val6)
      }, [...(val4[27] || (val4[27] = [createElementVNode("svg", {
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
      })], -1)]))], 8, Et)]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.url = val7,
        type: "url",
        class: "form-input",
        placeholder: "链接地址（https://...）"
      }, null, 8, Ft), [[vModelText, val5.url]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.title = val7,
        type: "text",
        class: "form-input",
        placeholder: "链接标题"
      }, null, 8, Gt), [[vModelText, val5.title]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.description = val7,
        type: "text",
        class: "form-input",
        placeholder: "描述（可选）"
      }, null, 8, Ot), [[vModelText, val5.description]])]))), 128))]), createElementVNode("button", {
        class: "add-item-btn",
        onClick: zz8
      }, " + 添加链接 ")])) : createCommentVNode("", !0), createElementVNode("div", Ht, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz5,
        disabled: refVal8.value
      }, " 取消 ", 8, Rt), createElementVNode("button", {
        class: "modal-btn confirm",
        onClick: zz14,
        disabled: refVal8.value
      }, toDisplayString(refVal8.value ? "保存中..." : "保存"), 9, At)])])])) : createCommentVNode("", !0), refVal11.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "modal-overlay",
        onClick: withModifiers(zz17, ["self"])
      }, [createElementVNode("div", Jt, [val4[29] || (val4[29] = createElementVNode("h3", {
        class: "modal-title"
      }, "确认删除", -1)), val4[30] || (val4[30] = createElementVNode("p", {
        class: "modal-desc"
      }, " 确定要删除这个内容模块吗？此操作不可撤销。 ", -1)), createElementVNode("div", jt, [createElementVNode("button", {
        class: "modal-btn cancel",
        onClick: zz17,
        disabled: refVal13.value
      }, " 取消 ", 8, qt), createElementVNode("button", {
        class: "modal-btn confirm danger",
        onClick: zz16,
        disabled: refVal13.value
      }, toDisplayString(refVal13.value ? "删除中..." : "确认删除"), 9, Wt)])])])) : createCommentVNode("", !0)]));
    }
  }),
  ol = withScopeId(Kt, [["__scopeId", "data-v-2c0321e2"]]);
/* index 运行时导出（已语义化） */
export { ol as default };