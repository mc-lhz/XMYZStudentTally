/*!
 * 页面模块：创建活动（MuseumEventEditPage）
 * 路由：/admin/museum/events/create   name=admin-museum-event-create   层级=4   需登录=是
 * 功能：登录后的「创建活动」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MuseumEventEditPage-CFVVmsbA.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, toDisplayString, withDirectives, createTextVNode, vModelText, normalizeClass, Fragment, createVNodeWrapper, renderList, resolveRaw, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 museum-BDeGDA-n（站点内功能模块） */
import { getAdminMuseumTags, getAdminMuseumEventsById, updateAdminMuseumEvents, createAdminMuseumEvents } from "./museum-BDeGDA-n.js";
/* 导入：本地模块 file（站点内功能模块） */
import { uploadFiles } from "./file-CSaAaIBf.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 模板属性配置：page-container */
const MuseumEventEditPageConfig = {
    class: "page-container"
  },
  ee = {
    class: "page-content"
  },
  te = {
    class: "content-container"
  },
  se = {
    class: "breadcrumb-wrapper"
  },
  ae = {
    class: "page-header-section"
  },
  le = {
    class: "header-main"
  },
  oe = {
    class: "header-text"
  },
  ne = {
    class: "page-title"
  },
  ie = {
    class: "page-subtitle"
  },
  re = {
    key: 0,
    class: "loading-container"
  },
  de = {
    key: 1,
    class: "form-section"
  },
  ue = {
    class: "form-group"
  },
  ce = {
    class: "form-group"
  },
  ve = {
    class: "form-group"
  },
  pe = {
    class: "form-group"
  },
  me = {
    key: 0,
    class: "uploaded-image-wrapper"
  },
  fe = ["src"],
  ge = {
    class: "image-actions"
  },
  be = ["disabled"],
  _e = ["disabled"],
  ye = {
    key: 0,
    class: "upload-loading"
  },
  he = {
    class: "form-row"
  },
  ke = {
    class: "form-group"
  },
  xe = {
    class: "form-group"
  },
  Ue = {
    class: "form-group"
  },
  Ce = {
    class: "form-group"
  },
  Ie = {
    class: "tags-select"
  },
  De = ["onClick"],
  we = {
    class: "form-actions"
  },
  Ee = ["disabled"],
  Ve = defineComponent({
    __name: "MuseumEventEditPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => val2.params.id && val2.params.id !== "create"),
        val4 = applyDirectives(() => val3.value ? Number(val2.params.id) : null),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref([]),
        refVal4 = ref({
          title: "",
          subtitle: "",
          description: "",
          coverUrl: "",
          startDate: "",
          endDate: "",
          location: "",
          tagIds: []
        }),
        refVal5 = ref(null),
        refVal6 = ref(!1);
      async function zz0() {
        try {
          refVal3.value = await getAdminMuseumTags({
            status: 1
          });
        } catch (val1) {
          console.error("Failed to load tags:", val1);
        }
      }
      async function zz1() {
        if (!val4.value) {
          refVal.value = !1;
          return;
        }
        try {
          const val1 = await getAdminMuseumEventsById(val4.value);
          refVal4.value = {
            title: val1.title,
            subtitle: val1.subtitle || "",
            description: val1.description || "",
            coverUrl: val1.coverUrl || "",
            startDate: val1.startDate,
            endDate: val1.endDate || "",
            location: val1.location || "",
            tagIds: val1.tags?.map(val5 => val5.id) || []
          };
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/admin/museum/events");
        } finally {
          refVal.value = !1;
        }
      }
      function zz2() {
        refVal5.value?.click();
      }
      async function zz3(val1) {
        const val5 = val1.target,
          val6 = val5.files?.[0];
        if (val6) {
          if (!val6.type.startsWith("image/")) {
            useToast1.error("请选择图片文件");
            return;
          }
          if (val6.size > 20 * 1024 * 1024) {
            useToast1.error("图片大小不能超过 20MB");
            return;
          }
          refVal6.value = !0;
          try {
            const val7 = await uploadFiles(val6, "museum");
            refVal4.value.coverUrl = val7.data.data.fileUrl, useToast1.success("图片上传成功");
          } catch {
            useToast1.error("图片上传失败");
          } finally {
            refVal6.value = !1, val5.value = "";
          }
        }
      }
      function zz4() {
        refVal4.value.coverUrl = "";
      }
      function zz5(val1) {
        (refVal4.value.tagIds?.indexOf(val1) ?? -1) === -1 ? refVal4.value.tagIds = [...(refVal4.value.tagIds || []), val1] : refVal4.value.tagIds = refVal4.value.tagIds?.filter(val5 => val5 !== val1) || [];
      }
      async function zz6() {
        if (!refVal4.value.title.trim()) {
          useToast1.error("请输入活动标题");
          return;
        }
        if (!refVal4.value.startDate) {
          useToast1.error("请选择活动开始日期");
          return;
        }
        refVal2.value = !0;
        try {
          if (val3.value && val4.value) await updateAdminMuseumEvents(val4.value, refVal4.value), useToast1.success("更新成功"), useRouter1.push("/admin/museum/events");else {
            const val1 = await createAdminMuseumEvents(refVal4.value);
            useToast1.success("创建成功"), useRouter1.replace(`/admin/museum/events/${val1.id}/content`);
          }
        } catch {
          useToast1.error(val3.value ? "更新失败" : "创建失败");
        } finally {
          refVal2.value = !1;
        }
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageMuseum) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz0(), zz1();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => (openBlock(), createElementBlock("div", MuseumEventEditPageConfig, [createVNode(PageHeader, {
        "back-to": (val3.value, "/admin/museum/events")
      }, null, 8, ["back-to"]), createElementVNode("main", ee, [createElementVNode("div", te, [createElementVNode("div", se, [createVNode(PageBreadcrumb)]), createElementVNode("div", ae, [createElementVNode("div", le, [createElementVNode("div", oe, [createElementVNode("h1", ne, toDisplayString(val3.value ? "编辑活动" : "创建活动"), 1), createElementVNode("p", ie, toDisplayString(val3.value ? "修改活动基本信息" : "填写活动基本信息"), 1)])])]), refVal.value ? (openBlock(), createElementBlock("div", re, [...(val5[6] || (val5[6] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", de, [val5[17] || (val5[17] = createElementVNode("h2", {
        class: "section-title"
      }, "基本信息", -1)), createElementVNode("div", ue, [val5[7] || (val5[7] = createElementVNode("label", {
        class: "form-label"
      }, [createTextVNode(" 活动标题 "), createElementVNode("span", {
        class: "required"
      }, "*")], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[0] || (val5[0] = val6 => refVal4.value.title = val6),
        type: "text",
        class: "form-input",
        placeholder: "请输入活动标题",
        maxlength: "100"
      }, null, 512), [[vModelText, refVal4.value.title]])]), createElementVNode("div", ce, [val5[8] || (val5[8] = createElementVNode("label", {
        class: "form-label"
      }, "副标题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[1] || (val5[1] = val6 => refVal4.value.subtitle = val6),
        type: "text",
        class: "form-input",
        placeholder: "请输入副标题（可选）",
        maxlength: "200"
      }, null, 512), [[vModelText, refVal4.value.subtitle]])]), createElementVNode("div", ve, [val5[9] || (val5[9] = createElementVNode("label", {
        class: "form-label"
      }, "活动描述", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val5[2] || (val5[2] = val6 => refVal4.value.description = val6),
        class: "form-textarea",
        placeholder: "请输入活动描述（可选）",
        rows: "3"
      }, null, 512), [[vModelText, refVal4.value.description]])]), createElementVNode("div", pe, [val5[12] || (val5[12] = createElementVNode("label", {
        class: "form-label"
      }, "封面图片", -1)), createElementVNode("input", {
        ref_key: "fileInputRef",
        ref: refVal5,
        type: "file",
        accept: "image/*",
        class: "file-input-hidden",
        onChange: zz3
      }, null, 544), refVal4.value.coverUrl ? (openBlock(), createElementBlock("div", me, [createElementVNode("img", {
        src: refVal4.value.coverUrl,
        alt: "封面预览",
        class: "uploaded-image"
      }, null, 8, fe), createElementVNode("div", ge, [createElementVNode("button", {
        type: "button",
        class: "image-action-btn replace",
        onClick: zz2,
        disabled: refVal6.value
      }, " 更换 ", 8, be), createElementVNode("button", {
        type: "button",
        class: "image-action-btn remove",
        onClick: zz4,
        disabled: refVal6.value
      }, " 移除 ", 8, _e)])])) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["upload-area", {
          uploading: refVal6.value
        }]),
        onClick: zz2
      }, [refVal6.value ? (openBlock(), createElementBlock("div", ye, [...(val5[10] || (val5[10] = [createElementVNode("div", {
        class: "upload-spinner"
      }, null, -1), createElementVNode("span", null, "上传中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val5[11] || (val5[11] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-07650535><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-07650535></path><polyline points="17 8 12 3 7 8" data-v-07650535></polyline><line x1="12" y1="3" x2="12" y2="15" data-v-07650535></line></svg><span class="upload-text" data-v-07650535>点击上传封面图片</span><span class="upload-hint" data-v-07650535>建议尺寸 16:9，不超过 20MB</span>', 3))], 64))], 2))]), createElementVNode("div", he, [createElementVNode("div", ke, [val5[13] || (val5[13] = createElementVNode("label", {
        class: "form-label"
      }, [createTextVNode(" 开始日期 "), createElementVNode("span", {
        class: "required"
      }, "*")], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[3] || (val5[3] = val6 => refVal4.value.startDate = val6),
        type: "date",
        class: "form-input"
      }, null, 512), [[vModelText, refVal4.value.startDate]])]), createElementVNode("div", xe, [val5[14] || (val5[14] = createElementVNode("label", {
        class: "form-label"
      }, "结束日期", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[4] || (val5[4] = val6 => refVal4.value.endDate = val6),
        type: "date",
        class: "form-input"
      }, null, 512), [[vModelText, refVal4.value.endDate]])])]), createElementVNode("div", Ue, [val5[15] || (val5[15] = createElementVNode("label", {
        class: "form-label"
      }, "活动地点", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val5[5] || (val5[5] = val6 => refVal4.value.location = val6),
        type: "text",
        class: "form-input",
        placeholder: "请输入活动地点（可选）"
      }, null, 512), [[vModelText, refVal4.value.location]])]), createElementVNode("div", Ce, [val5[16] || (val5[16] = createElementVNode("label", {
        class: "form-label"
      }, "标签", -1)), createElementVNode("div", Ie, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val6 => (openBlock(), createElementBlock("button", {
        key: val6.id,
        class: normalizeClass(["tag-option", {
          active: refVal4.value.tagIds?.includes(val6.id)
        }]),
        style: resolveRaw({
          "--tag-color": val6.color,
          backgroundColor: refVal4.value.tagIds?.includes(val6.id) ? val6.color + "20" : void 0,
          borderColor: refVal4.value.tagIds?.includes(val6.id) ? val6.color : void 0,
          color: refVal4.value.tagIds?.includes(val6.id) ? val6.color : void 0
        }),
        onClick: val7 => zz5(val6.id)
      }, toDisplayString(val6.name), 15, De))), 128))])]), createElementVNode("div", we, [createElementVNode("button", {
        class: "save-btn",
        onClick: zz6,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "保存中..." : val3.value ? "保存修改" : "创建活动"), 9, Ee)])]))])]), createVNode(PageFooter)]));
    }
  }),
  ze = withScopeId(Ve, [["__scopeId", "data-v-07650535"]]);
/* index 运行时导出（已语义化） */
export { ze as default };