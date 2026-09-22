/*!
 * 页面模块：个人中心（ProfilePage）
 * 路由：/profile   name=profile   层级=2   需登录=是
 * 功能：登录后的「个人中心」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/ProfilePage-zNPfiNzc.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, watch, directiveUm, createBlock, createVNode, withSlots, toDisplayValue, Teleport, createElementBlock, createCommentVNode, withModifiers, createElementVNode, toDisplayString, Fragment, useToast, buildFormData, openBlock, withScopeId, useUserStore, onMounted, createTextVNode, unref, withDirectives, vModelText, renderList, createVNodeWrapper, normalizeClass, getPrivacySettings, updatePrivacySettings, getCaptcha, getUserHasPassword, directiveHooks, sendSmsCode, updateUserPassword } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const ss = {
    class: "modal-header"
  },
  as = {
    class: "modal-title"
  },
  ts = {
    class: "modal-body"
  },
  ls = {
    key: 0,
    class: "current-avatar"
  },
  ns = ["src"],
  os = {
    key: 1,
    class: "avatar-placeholder"
  },
  is = {
    class: "cropper-container"
  },
  ds = {
    class: "scale-control"
  },
  rs = ["min", "max", "value"],
  us = {
    class: "modal-footer"
  },
  cs = ["disabled"],
  ProfilePageConst0 = 200,
  ProfilePageConst1 = 300,
  vs = defineComponent({
    __name: "AvatarUploader",
    props: {
      show: {
        type: Boolean
      },
      currentAvatar: {}
    },
    emits: ["close", "uploaded"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = val,
        val4 = zz0,
        useToast1 = useToast(),
        refVal = ref(null),
        refVal2 = ref(null),
        refVal3 = ref(null),
        refVal4 = ref(null),
        refVal5 = ref(!1),
        refVal6 = ref(null),
        refVal7 = ref(1),
        refVal8 = ref(.1),
        refVal9 = ref(3),
        refVal10 = ref(0),
        refVal11 = ref(0),
        refVal12 = ref(!1),
        refVal13 = ref(0),
        refVal14 = ref(0),
        refVal15 = ref(0),
        refVal16 = ref(0),
        val5 = applyDirectives(() => !!refVal4.value);
      function zz1() {
        refVal.value?.click();
      }
      function zz2(val1) {
        const val6 = val1.target.files?.[0];
        if (!val6) return;
        if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"].includes(val6.type)) {
          useToast1.error("请选择有效的图片文件（JPEG, PNG, GIF, WebP, BMP）");
          return;
        }
        if (val6.size > 10 * 1024 * 1024) {
          useToast1.error("图片大小不能超过 10MB");
          return;
        }
        refVal3.value = val6, zz3(val6);
      }
      function zz3(val1) {
        const filereader = new FileReader();
        filereader.onload = val6 => {
          const val7 = val6.target?.result;
          refVal4.value = val7;
          const image = new Image();
          image.onload = () => {
            refVal6.value = image;
            const val8 = ProfilePageConst0 / image.width,
              val9 = ProfilePageConst0 / image.height;
            refVal7.value = Math.max(val8, val9), refVal8.value = Math.max(val8, val9) * .5, refVal9.value = Math.max(val8, val9) * 4, refVal10.value = 0, refVal11.value = 0, zz4();
          }, image.src = val7;
        }, filereader.readAsDataURL(val1);
      }
      function zz4() {
        const refVal2Value = refVal2.value,
          refVal6Value = refVal6.value;
        if (!refVal2Value || !refVal6Value) return;
        const context = refVal2Value.getContext("2d");
        if (!context) return;
        context.fillStyle = "#1a1a1a", context.fillRect(0, 0, ProfilePageConst1, ProfilePageConst1);
        const val8 = refVal6Value.width * refVal7.value,
          val9 = refVal6Value.height * refVal7.value,
          val10 = (ProfilePageConst1 - val8) / 2 + refVal10.value,
          val11 = (ProfilePageConst1 - val9) / 2 + refVal11.value;
        context.drawImage(refVal6Value, val10, val11, val8, val9), context.fillStyle = "rgba(0, 0, 0, 0.6)";
        const val12 = (ProfilePageConst1 - ProfilePageConst0) / 2,
          val13 = (ProfilePageConst1 - ProfilePageConst0) / 2;
        context.fillRect(0, 0, ProfilePageConst1, val13), context.fillRect(0, val13 + ProfilePageConst0, ProfilePageConst1, val13), context.fillRect(0, val13, val12, ProfilePageConst0), context.fillRect(val12 + ProfilePageConst0, val13, val12, ProfilePageConst0), context.strokeStyle = "white", context.lineWidth = 2, context.strokeRect(val12, val13, ProfilePageConst0, ProfilePageConst0), context.beginPath(), context.arc(ProfilePageConst1 / 2, ProfilePageConst1 / 2, ProfilePageConst0 / 2, 0, Math.PI * 2), context.strokeStyle = "rgba(255, 255, 255, 0.5)", context.lineWidth = 1, context.stroke();
      }
      function zz5(val1) {
        refVal12.value = !0, refVal13.value = val1.clientX, refVal14.value = val1.clientY, refVal15.value = refVal10.value, refVal16.value = refVal11.value, val1.target.setPointerCapture(val1.pointerId);
      }
      function zz6(val1) {
        if (!refVal12.value) return;
        const val6 = val1.clientX - refVal13.value,
          val7 = val1.clientY - refVal14.value;
        refVal10.value = refVal15.value + val6, refVal11.value = refVal16.value + val7, zz4();
      }
      function zz7() {
        refVal12.value = !1;
      }
      function zz8(val1) {
        val1.preventDefault();
        const val6 = val1.deltaY > 0 ? -.1 : .1,
          val7 = Math.min(refVal9.value, Math.max(refVal8.value, refVal7.value + val6));
        refVal7.value = val7, zz4();
      }
      function zz9(val1) {
        const val6 = val1.target;
        refVal7.value = parseFloat(val6.value), zz4();
      }
      function zz10() {
        return new Promise((val1, val6) => {
          const refVal6Value = refVal6.value;
          if (!refVal6Value) {
            val6(new Error("No image"));
            return;
          }
          const element = document.createElement("canvas");
          element.width = ProfilePageConst0, element.height = ProfilePageConst0;
          const context = element.getContext("2d");
          if (!context) {
            val6(new Error("Cannot get canvas context"));
            return;
          }
          const val10 = refVal6Value.width * refVal7.value,
            val11 = refVal6Value.height * refVal7.value,
            val12 = (ProfilePageConst1 - val10) / 2 + refVal10.value,
            val13 = (ProfilePageConst1 - val11) / 2 + refVal11.value,
            me = (ProfilePageConst1 - ProfilePageConst0) / 2,
            val14 = (ProfilePageConst1 - ProfilePageConst0) / 2,
            val15 = (me - val12) / refVal7.value,
            val16 = (val14 - val13) / refVal7.value,
            val17 = ProfilePageConst0 / refVal7.value,
            val18 = ProfilePageConst0 / refVal7.value;
          context.drawImage(refVal6Value, val15, val16, val17, val18, 0, 0, ProfilePageConst0, ProfilePageConst0), element.toBlob(val19 => {
            val19 ? val1(val19) : val6(new Error("Failed to create blob"));
          }, "image/jpeg", .9);
        });
      }
      async function zz11() {
        if (!refVal5.value) {
          refVal5.value = !0;
          try {
            const val1 = await zz10(),
              file = new File([val1], "avatar.jpg", {
                type: "image/jpeg"
              }),
              formData = await buildFormData(file);
            formData.data.code === 200 ? (useToast1.success("头像上传成功"), val4("uploaded", formData.data.data.fileUrl), zz12()) : useToast1.error(formData.data.message || "上传失败");
          } catch {
            useToast1.error("上传失败，请稍后重试");
          } finally {
            refVal5.value = !1;
          }
        }
      }
      function zz12() {
        refVal3.value = null, refVal4.value = null, refVal6.value = null, refVal7.value = 1, refVal10.value = 0, refVal11.value = 0, val4("close");
      }
      function zz13() {
        refVal3.value = null, refVal4.value = null, refVal6.value = null, zz1();
      }
      return watch(() => val3.show, val1 => {
        val1 || (refVal3.value = null, refVal4.value = null, refVal6.value = null);
      }), directiveUm(() => {
        refVal4.value && URL.revokeObjectURL(refVal4.value);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [val.show ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: zz12
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [val.show ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val6[0] || (val6[0] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", ss, [createElementVNode("h3", as, toDisplayString(val5.value ? "裁剪头像" : "更换头像"), 1), createElementVNode("button", {
            class: "close-btn",
            onClick: zz12
          }, [...(val6[1] || (val6[1] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", ts, [val5.value ? (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", is, [createElementVNode("canvas", {
            ref_key: "canvasRef",
            ref: refVal2,
            width: ProfilePageConst1,
            height: ProfilePageConst1,
            class: "cropper-canvas",
            onPointerdown: zz5,
            onPointermove: zz6,
            onPointerup: zz7,
            onPointerleave: zz7,
            onWheel: zz8
          }, null, 544)]), createElementVNode("div", ds, [val6[5] || (val6[5] = createElementVNode("svg", {
            class: "scale-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("circle", {
            cx: "11",
            cy: "11",
            r: "8"
          }), createElementVNode("line", {
            x1: "21",
            y1: "21",
            x2: "16.65",
            y2: "16.65"
          }), createElementVNode("line", {
            x1: "8",
            y1: "11",
            x2: "14",
            y2: "11"
          })], -1)), createElementVNode("input", {
            type: "range",
            min: refVal8.value,
            max: refVal9.value,
            step: .01,
            value: refVal7.value,
            class: "scale-slider",
            onInput: zz9
          }, null, 40, rs), val6[6] || (val6[6] = createElementVNode("svg", {
            class: "scale-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("circle", {
            cx: "11",
            cy: "11",
            r: "8"
          }), createElementVNode("line", {
            x1: "21",
            y1: "21",
            x2: "16.65",
            y2: "16.65"
          }), createElementVNode("line", {
            x1: "11",
            y1: "8",
            x2: "11",
            y2: "14"
          }), createElementVNode("line", {
            x1: "8",
            y1: "11",
            x2: "14",
            y2: "11"
          })], -1))]), val6[7] || (val6[7] = createElementVNode("p", {
            class: "cropper-hint"
          }, "拖动图片调整位置，滑动滑块或滚轮缩放", -1))], 64)) : (openBlock(), createElementBlock("div", {
            key: 0,
            class: "upload-area",
            onClick: zz1
          }, [val.currentAvatar ? (openBlock(), createElementBlock("div", ls, [createElementVNode("img", {
            src: val.currentAvatar,
            alt: "当前头像"
          }, null, 8, ns)])) : (openBlock(), createElementBlock("div", os, [...(val6[2] || (val6[2] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [createElementVNode("path", {
            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          }), createElementVNode("circle", {
            cx: "12",
            cy: "7",
            r: "4"
          })], -1)]))])), val6[3] || (val6[3] = createElementVNode("p", {
            class: "upload-text"
          }, "点击选择图片", -1)), val6[4] || (val6[4] = createElementVNode("p", {
            class: "upload-hint"
          }, "支持 JPEG、PNG、GIF、WebP，最大 10MB", -1))]))]), createElementVNode("div", us, [val5.value ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createElementVNode("button", {
            class: "btn btn-secondary",
            onClick: zz13
          }, " 重新选择 "), createElementVNode("button", {
            class: "btn btn-primary",
            disabled: refVal5.value,
            onClick: zz11
          }, toDisplayString(refVal5.value ? "上传中..." : "确认上传"), 9, cs)], 64)) : (openBlock(), createElementBlock("button", {
            key: 1,
            class: "btn btn-secondary",
            onClick: zz12
          }, " 取消 "))]), createElementVNode("input", {
            ref_key: "fileInput",
            ref: refVal,
            type: "file",
            accept: "image/jpeg,image/png,image/gif,image/webp,image/bmp",
            class: "hidden-input",
            onChange: zz2
          }, null, 544)])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  ps = withScopeId(vs, [["__scopeId", "data-v-9979eaba"]]),
  fs = {
    class: "profile-page"
  },
  bs = {
    class: "page-content"
  },
  ms = {
    class: "content-container"
  },
  gs = {
    class: "breadcrumb-wrapper"
  },
  ys = {
    key: 0,
    class: "loading-container"
  },
  ws = {
    class: "profile-main"
  },
  hs = {
    class: "section"
  },
  ks = {
    class: "section-header"
  },
  Cs = {
    class: "card"
  },
  xs = {
    class: "user-header"
  },
  _s = {
    key: 0,
    class: "user-avatar"
  },
  Bs = ["src"],
  Ps = {
    key: 1,
    class: "user-avatar default upload-hint-avatar"
  },
  Ms = {
    class: "user-info"
  },
  Us = {
    class: "user-nickname"
  },
  Ss = {
    class: "user-username"
  },
  Is = {
    key: 0,
    class: "info-list"
  },
  $s = {
    class: "info-row"
  },
  Vs = {
    class: "info-value"
  },
  As = {
    class: "info-row"
  },
  zs = {
    class: "info-value"
  },
  Fs = {
    class: "info-row"
  },
  Es = {
    class: "info-value"
  },
  Ns = {
    class: "info-row"
  },
  Qs = {
    class: "info-value signature"
  },
  Rs = {
    key: 1,
    class: "edit-form"
  },
  qs = {
    class: "form-group"
  },
  Ds = {
    class: "form-group"
  },
  Xs = {
    class: "gender-options"
  },
  Ys = ["onClick"],
  Ts = {
    class: "form-group"
  },
  Hs = {
    class: "form-group"
  },
  Ls = {
    class: "form-actions"
  },
  js = ["disabled"],
  Ws = ["disabled"],
  Gs = {
    class: "section"
  },
  Os = {
    class: "card"
  },
  Js = {
    class: "binding-item"
  },
  Ks = {
    class: "binding-info"
  },
  Zs = {
    key: 0,
    class: "binding-desc"
  },
  ea = {
    key: 0,
    class: "binding-detail"
  },
  sa = {
    key: 1,
    class: "binding-desc unbound"
  },
  aa = {
    key: 2,
    class: "binding-expired-hint"
  },
  ta = {
    class: "binding-actions"
  },
  la = {
    class: "binding-item"
  },
  na = {
    class: "binding-info"
  },
  oa = {
    key: 0,
    class: "binding-desc"
  },
  ia = {
    key: 1,
    class: "binding-desc unbound"
  },
  da = {
    class: "binding-item"
  },
  ra = {
    class: "binding-info"
  },
  ua = {
    key: 0,
    class: "binding-desc"
  },
  ca = {
    key: 1,
    class: "binding-desc unbound"
  },
  va = {
    class: "section"
  },
  pa = {
    class: "card"
  },
  fa = {
    key: 0,
    class: "privacy-loading"
  },
  ba = {
    class: "privacy-item"
  },
  ma = ["disabled"],
  ga = {
    class: "privacy-item"
  },
  ya = ["disabled"],
  wa = {
    class: "privacy-item"
  },
  ha = ["disabled"],
  ka = {
    class: "modal-message"
  },
  Ca = {
    class: "modal-actions"
  },
  xa = ["disabled"],
  _a = ["disabled"],
  Ba = {
    class: "drawer-header"
  },
  Pa = {
    class: "drawer-title"
  },
  Ma = {
    key: 0,
    class: "rebind-hint"
  },
  Ua = {
    key: 1,
    class: "bind-error"
  },
  Sa = {
    class: "bind-form-group"
  },
  Ia = ["disabled"],
  $a = {
    class: "bind-form-group"
  },
  Va = ["disabled"],
  Aa = {
    class: "bind-form-group"
  },
  za = {
    class: "captcha-row"
  },
  Fa = ["disabled"],
  Ea = ["src"],
  Na = {
    key: 1,
    class: "captcha-loading"
  },
  Qa = {
    key: 2,
    class: "captcha-placeholder"
  },
  Ra = ["disabled"],
  qa = {
    class: "drawer-header"
  },
  Da = ["disabled"],
  Xa = {
    key: 0,
    class: "password-loading"
  },
  Ya = {
    key: 0,
    class: "bind-error"
  },
  Ta = {
    key: 1,
    class: "password-hint"
  },
  Ha = {
    key: 0,
    class: "bind-form-group"
  },
  La = {
    class: "password-input-wrapper"
  },
  ja = ["type", "disabled"],
  Wa = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Ga = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Oa = {
    class: "bind-form-group"
  },
  Ja = {
    class: "password-input-wrapper"
  },
  Ka = ["type", "disabled"],
  Za = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  et = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  st = {
    class: "bind-form-group"
  },
  at = {
    class: "password-input-wrapper"
  },
  tt = ["type", "disabled"],
  lt = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  nt = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  ot = ["disabled"],
  it = {
    class: "drawer-header"
  },
  dt = ["disabled"],
  rt = {
    key: 0,
    class: "bind-error"
  },
  ut = {
    class: "bind-form-group"
  },
  ct = ["disabled"],
  vt = {
    class: "bind-form-group"
  },
  pt = {
    class: "sms-code-row"
  },
  ft = ["disabled"],
  bt = ["disabled"],
  mt = ["disabled"],
  gt = defineComponent({
    __name: "ProfilePage",
    setup(val) {
      const useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref(!1),
        refVal5 = ref(!1),
        refVal6 = ref("campus"),
        refVal7 = ref(!1),
        refVal8 = ref(!1),
        refVal9 = ref({
          phoneNumber: "",
          code: ""
        }),
        refVal10 = ref(!1),
        refVal11 = ref(""),
        refVal12 = ref(!1),
        refVal13 = ref(0);
      let val2 = null;
      const refVal14 = ref(!1),
        refVal15 = ref(!1),
        refVal16 = ref({
          studentId: "",
          password: "",
          captchaCode: "",
          jsessionId: ""
        }),
        refVal17 = ref(""),
        refVal18 = ref(!1),
        refVal19 = ref(!1),
        refVal20 = ref(""),
        refVal21 = ref(!1),
        refVal22 = ref(!1),
        refVal23 = ref(!0),
        refVal24 = ref(!1),
        refVal25 = ref(""),
        refVal26 = ref({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }),
        refVal27 = ref(!1),
        refVal28 = ref(!1),
        refVal29 = ref(!1),
        refVal30 = ref({
          showCampusBinding: !1,
          showStatistics: !0,
          showContributions: !0
        }),
        refVal31 = ref(!0),
        refVal32 = ref(null),
        refVal33 = ref({
          nickname: "",
          gender: 0,
          signature: "",
          birthdate: ""
        }),
        list = [{
          value: 0,
          label: "保密"
        }, {
          value: 1,
          label: "男"
        }, {
          value: 2,
          label: "女"
        }],
        val3 = applyDirectives(() => list.find(val1 => val1.value === useUserStore1.profile?.gender)?.label || "保密"),
        val4 = applyDirectives(() => useUserStore1.profile?.avatarUrl);
      function zz14() {
        refVal4.value = !0;
      }
      function zz15(val1) {
        useUserStore1.profile && (useUserStore1.profile.hasAvatar = !0, useUserStore1.profile.avatarUrl = val1);
      }
      async function zz16() {
        refVal31.value = !0;
        try {
          const privacySettings = await getPrivacySettings();
          privacySettings.data.code === 200 && (refVal30.value = privacySettings.data.data);
        } catch {} finally {
          refVal31.value = !1;
        }
      }
      async function zz17(val1) {
        if (refVal32.value) return;
        const val6 = !refVal30.value[val1];
        refVal32.value = val1;
        try {
          const privacySettings = await updatePrivacySettings({
            [val1]: val6
          });
          privacySettings.data.code === 200 ? (refVal30.value = privacySettings.data.data, useToast1.success("设置已更新")) : useToast1.error(privacySettings.data.message || "更新失败");
        } catch {
          useToast1.error("网络错误，请稍后重试");
        } finally {
          refVal32.value = null;
        }
      }
      onMounted(async () => {
        try {
          await Promise.all([useUserStore1.fetchProfile(), useUserStore1.fetchCampusBinding(), useUserStore1.fetchQQBinding(), useUserStore1.fetchPhoneBinding(), zz16()]);
        } catch {
          useToast1.error("加载数据失败");
        } finally {
          refVal.value = !1;
        }
      });
      function zz18() {
        useUserStore1.profile && (refVal33.value = {
          nickname: useUserStore1.profile.nickname || "",
          gender: useUserStore1.profile.gender || 0,
          signature: useUserStore1.profile.signature || "",
          birthdate: useUserStore1.profile.birthdate || ""
        }), refVal3.value = !0;
      }
      function zz19() {
        refVal3.value = !1;
      }
      async function zz20() {
        if (!refVal33.value.nickname.trim()) {
          useToast1.warning("昵称不能为空");
          return;
        }
        refVal2.value = !0;
        try {
          const profile = await useUserStore1.updateProfile({
            nickname: refVal33.value.nickname.trim(),
            gender: refVal33.value.gender,
            signature: refVal33.value.signature.trim(),
            birthdate: refVal33.value.birthdate || void 0
          });
          profile.code === 200 ? (useToast1.success("保存成功"), refVal3.value = !1) : useToast1.error(profile.message || "保存失败");
        } catch {
          useToast1.error("保存失败");
        } finally {
          refVal2.value = !1;
        }
      }
      function zz21(zz22 = !1) {
        refVal15.value = zz22, refVal14.value = !0, refVal20.value = "", refVal16.value = {
          studentId: "",
          password: "",
          captchaCode: "",
          jsessionId: ""
        }, zz24();
      }
      function zz23() {
        refVal14.value = !1, refVal20.value = "";
      }
      let val5 = null;
      function zz24() {
        return val5 || (refVal18.value = !0, val5 = (async () => {
          try {
            const captcha = await getCaptcha();
            captcha.data.code === 200 ? (refVal17.value = captcha.data.data.captchaImage, refVal16.value.jsessionId = captcha.data.data.jsessionId, refVal16.value.captchaCode = "") : refVal20.value = captcha.data.message || "获取验证码失败";
          } catch {
            refVal20.value = "网络错误，请稍后重试";
          } finally {
            refVal18.value = !1, val5 = null;
          }
        })(), val5);
      }
      async function zz25() {
        const {
          studentId: val1,
          password: val6,
          captchaCode: val7,
          jsessionId: val8
        } = refVal16.value;
        if (!val1 || !val6) {
          refVal20.value = "请填写学号和密码";
          return;
        }
        if (!val7) {
          refVal20.value = "请输入验证码";
          return;
        }
        refVal19.value = !0, refVal20.value = "";
        try {
          const val9 = refVal15.value ? await useUserStore1.rebindCampus(val1, val6, val7, val8) : await useUserStore1.bindCampus(val1, val6, val7, val8);
          val9.code === 200 ? (useToast1.success(refVal15.value ? "更新成功" : "绑定成功"), zz23()) : (refVal20.value = val9.message || (refVal15.value ? "更新失败" : "绑定失败"), zz24());
        } catch {
          refVal20.value = "网络错误，请稍后重试", zz24();
        } finally {
          refVal19.value = !1;
        }
      }
      async function zz26() {
        try {
          const qQBindAuthorizeUrl = await useUserStore1.getQQBindAuthorizeUrl();
          qQBindAuthorizeUrl.data.code === 200 && qQBindAuthorizeUrl.data.data?.authorizeUrl ? window.location.href = qQBindAuthorizeUrl.data.data.authorizeUrl : useToast1.error(qQBindAuthorizeUrl.data.message || "获取授权链接失败");
        } catch {
          useToast1.error("获取授权链接失败");
        }
      }
      function zz27() {
        refVal8.value = !0, refVal11.value = "", refVal9.value = {
          phoneNumber: "",
          code: ""
        }, refVal13.value = 0, val2 && (clearInterval(val2), val2 = null);
      }
      function zz28() {
        refVal8.value = !1, refVal11.value = "", val2 && (clearInterval(val2), val2 = null);
      }
      async function zz29() {
        const {
          phoneNumber: val1
        } = refVal9.value;
        if (!val1) {
          refVal11.value = "请输入手机号";
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(val1)) {
          refVal11.value = "请输入正确的手机号";
          return;
        }
        refVal12.value = !0, refVal11.value = "";
        try {
          const smsCode = await sendSmsCode(val1, "bind_phone");
          smsCode.data.code === 200 ? (useToast1.success("验证码已发送"), refVal13.value = smsCode.data.data.cooldownSeconds || 60, val2 = setInterval(() => {
            refVal13.value--, refVal13.value <= 0 && val2 && (clearInterval(val2), val2 = null);
          }, 1e3)) : refVal11.value = smsCode.data.message || "发送失败";
        } catch {
          refVal11.value = "网络错误，请稍后重试";
        } finally {
          refVal12.value = !1;
        }
      }
      async function zz30() {
        const {
          phoneNumber: val1,
          code: val6
        } = refVal9.value;
        if (!val1) {
          refVal11.value = "请输入手机号";
          return;
        }
        if (!/^1[3-9]\d{9}$/.test(val1)) {
          refVal11.value = "请输入正确的手机号";
          return;
        }
        if (!val6) {
          refVal11.value = "请输入验证码";
          return;
        }
        if (!/^\d{6}$/.test(val6)) {
          refVal11.value = "验证码为6位数字";
          return;
        }
        refVal10.value = !0, refVal11.value = "";
        try {
          const val7 = await useUserStore1.bindPhone(val1, val6);
          val7.code === 200 ? (useToast1.success("绑定成功"), zz28()) : refVal11.value = val7.message || "绑定失败";
        } catch {
          refVal11.value = "网络错误，请稍后重试";
        } finally {
          refVal10.value = !1;
        }
      }
      function zz31(val1) {
        refVal6.value = val1, refVal5.value = !0;
      }
      async function zz32() {
        refVal7.value = !0;
        try {
          let val1;
          refVal6.value === "campus" ? val1 = await useUserStore1.unbindCampus() : refVal6.value === "qq" ? val1 = await useUserStore1.unbindQQ() : val1 = await useUserStore1.unbindPhone(), val1.code === 200 ? (useToast1.success("解绑成功"), refVal5.value = !1) : useToast1.error(val1.message || "解绑失败");
        } catch {
          useToast1.error("解绑失败");
        } finally {
          refVal7.value = !1;
        }
      }
      function zz33() {
        refVal5.value = !1;
      }
      async function zz34() {
        refVal21.value = !0, refVal25.value = "", refVal26.value = {
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }, refVal27.value = !1, refVal28.value = !1, refVal29.value = !1, refVal24.value = !0;
        try {
          const userHasPassword = await getUserHasPassword();
          userHasPassword.data.code === 200 && (refVal23.value = userHasPassword.data.data);
        } catch {
          refVal23.value = !0;
        } finally {
          refVal24.value = !1;
        }
      }
      function zz35() {
        refVal21.value = !1, refVal25.value = "";
      }
      async function zz36() {
        const {
          oldPassword: val1,
          newPassword: val6,
          confirmPassword: val7
        } = refVal26.value;
        if (refVal23.value && !val1) {
          refVal25.value = "请输入旧密码";
          return;
        }
        if (!val6) {
          refVal25.value = "请输入新密码";
          return;
        }
        if (val6.length < 6 || val6.length > 32) {
          refVal25.value = "新密码需要 6-32 位";
          return;
        }
        if (val6 !== val7) {
          refVal25.value = "两次密码输入不一致";
          return;
        }
        refVal22.value = !0, refVal25.value = "";
        try {
          const userPassword = await updateUserPassword({
            oldPassword: refVal23.value ? val1 : void 0,
            newPassword: val6
          });
          userPassword.data.code === 200 ? (useToast1.success("密码修改成功"), zz35()) : refVal25.value = userPassword.data.message || "修改失败";
        } catch {
          refVal25.value = "网络错误，请稍后重试";
        } finally {
          refVal22.value = !1;
        }
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", fs, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", bs, [createElementVNode("div", ms, [createElementVNode("div", gs, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", ys, [...(val6[27] || (val6[27] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ws, [createElementVNode("section", hs, [createElementVNode("div", ks, [val6[29] || (val6[29] = createElementVNode("h2", {
        class: "section-title"
      }, "个人资料", -1)), refVal3.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn",
        onClick: zz18
      }, [...(val6[28] || (val6[28] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }), createElementVNode("path", {
        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      })], -1), createTextVNode(" 编辑 ", -1)]))]))]), createElementVNode("div", Cs, [createElementVNode("div", xs, [createElementVNode("div", {
        class: "user-avatar-wrapper",
        onClick: zz14
      }, [val4.value ? (openBlock(), createElementBlock("div", _s, [createElementVNode("img", {
        src: val4.value,
        alt: "头像"
      }, null, 8, Bs), val6[30] || (val6[30] = createElementVNode("div", {
        class: "avatar-edit-overlay"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "13",
        r: "4"
      })])], -1))])) : (openBlock(), createElementBlock("div", Ps, [...(val6[31] || (val6[31] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
      }), createElementVNode("circle", {
        cx: "12",
        cy: "13",
        r: "4"
      })], -1)]))]))]), createElementVNode("div", Ms, [createElementVNode("span", Us, toDisplayString(unref(useUserStore1).profile?.nickname || unref(useUserStore1).profile?.username), 1), createElementVNode("span", Ss, "@" + toDisplayString(unref(useUserStore1).profile?.username), 1)])]), refVal3.value ? (openBlock(), createElementBlock("div", Rs, [createElementVNode("div", qs, [val6[36] || (val6[36] = createElementVNode("label", {
        class: "form-label"
      }, "昵称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[0] || (val6[0] = val7 => refVal33.value.nickname = val7),
        type: "text",
        class: "form-input",
        placeholder: "请输入昵称",
        maxlength: "20"
      }, null, 512), [[vModelText, refVal33.value.nickname]])]), createElementVNode("div", Ds, [val6[37] || (val6[37] = createElementVNode("label", {
        class: "form-label"
      }, "性别", -1)), createElementVNode("div", Xs, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val7 => createElementVNode("button", {
        key: val7.value,
        class: normalizeClass(["gender-btn", {
          active: refVal33.value.gender === val7.value
        }]),
        onClick: val8 => refVal33.value.gender = val7.value
      }, toDisplayString(val7.label), 11, Ys)), 64))])]), createElementVNode("div", Ts, [val6[38] || (val6[38] = createElementVNode("label", {
        class: "form-label"
      }, "生日", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[1] || (val6[1] = val7 => refVal33.value.birthdate = val7),
        type: "date",
        class: "form-input"
      }, null, 512), [[vModelText, refVal33.value.birthdate]])]), createElementVNode("div", Hs, [val6[39] || (val6[39] = createElementVNode("label", {
        class: "form-label"
      }, "个性签名", -1)), withDirectives(createElementVNode("textarea", {
        "onUpdate:modelValue": val6[2] || (val6[2] = val7 => refVal33.value.signature = val7),
        class: "form-textarea",
        placeholder: "写点什么介绍自己...",
        maxlength: "100",
        rows: "3"
      }, null, 512), [[vModelText, refVal33.value.signature]])]), createElementVNode("div", Ls, [createElementVNode("button", {
        class: "btn btn-outline",
        onClick: zz19,
        disabled: refVal2.value
      }, "取消", 8, js), createElementVNode("button", {
        class: "btn btn-primary",
        onClick: zz20,
        disabled: refVal2.value
      }, toDisplayString(refVal2.value ? "保存中..." : "保存"), 9, Ws)])])) : (openBlock(), createElementBlock("div", Is, [createElementVNode("div", $s, [val6[32] || (val6[32] = createElementVNode("span", {
        class: "info-label"
      }, "昵称", -1)), createElementVNode("span", Vs, toDisplayString(unref(useUserStore1).profile?.nickname || "未设置"), 1)]), createElementVNode("div", As, [val6[33] || (val6[33] = createElementVNode("span", {
        class: "info-label"
      }, "性别", -1)), createElementVNode("span", zs, toDisplayString(val3.value), 1)]), createElementVNode("div", Fs, [val6[34] || (val6[34] = createElementVNode("span", {
        class: "info-label"
      }, "生日", -1)), createElementVNode("span", Es, toDisplayString(unref(useUserStore1).profile?.birthdate || "未设置"), 1)]), createElementVNode("div", Ns, [val6[35] || (val6[35] = createElementVNode("span", {
        class: "info-label"
      }, "个性签名", -1)), createElementVNode("span", Qs, toDisplayString(unref(useUserStore1).profile?.signature || "这个人很懒，什么都没写~"), 1)])]))])]), createElementVNode("section", Gs, [val6[48] || (val6[48] = createElementVNode("div", {
        class: "section-header"
      }, [createElementVNode("h2", {
        class: "section-title"
      }, "账号绑定")], -1)), createElementVNode("div", Os, [createElementVNode("div", Js, [val6[41] || (val6[41] = createElementVNode("div", {
        class: "binding-icon campus"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M22 10v6M2 10l10-5 10 5-10 5z"
      }), createElementVNode("path", {
        d: "M6 12v5c3 3 9 3 12 0v-5"
      })])], -1)), createElementVNode("div", Ks, [val6[40] || (val6[40] = createElementVNode("h4", {
        class: "binding-title"
      }, "校园网账号", -1)), unref(useUserStore1).campusBinding?.isBound ? (openBlock(), createElementBlock("p", Zs, [createTextVNode(" 已绑定 · " + toDisplayString(unref(useUserStore1).campusBinding?.name) + " ", 1), unref(useUserStore1).campusBinding?.classAlias ? (openBlock(), createElementBlock("span", ea, toDisplayString(unref(useUserStore1).campusBinding?.classAlias), 1)) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("p", sa, "未绑定")), unref(useUserStore1).campusBinding?.isBound && unref(useUserStore1).campusBinding?.isClassInfoExpired ? (openBlock(), createElementBlock("p", aa, " 需要更新 · 请重新绑定以更新高二分班信息 ")) : createCommentVNode("", !0)]), createElementVNode("div", ta, [unref(useUserStore1).campusBinding?.isBound ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [unref(useUserStore1).campusBinding?.isClassInfoExpired ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "binding-btn update",
        onClick: val6[4] || (val6[4] = val7 => zz21(!0))
      }, " 更新 ")) : createCommentVNode("", !0), createElementVNode("button", {
        class: "binding-btn unbind",
        onClick: val6[5] || (val6[5] = val7 => zz31("campus"))
      }, " 解绑 ")], 64)) : (openBlock(), createElementBlock("button", {
        key: 0,
        class: "binding-btn",
        onClick: val6[3] || (val6[3] = val7 => zz21(!1))
      }, " 绑定 "))])]), val6[46] || (val6[46] = createElementVNode("div", {
        class: "binding-divider"
      }, null, -1)), createElementVNode("div", la, [val6[43] || (val6[43] = createElementVNode("div", {
        class: "binding-icon qq"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [createElementVNode("path", {
        d: "M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
      })])], -1)), createElementVNode("div", na, [val6[42] || (val6[42] = createElementVNode("h4", {
        class: "binding-title"
      }, "QQ 账号", -1)), unref(useUserStore1).qqBinding?.isBound ? (openBlock(), createElementBlock("p", oa, " 已绑定 · " + toDisplayString(unref(useUserStore1).qqBinding?.nickname), 1)) : (openBlock(), createElementBlock("p", ia, "未绑定"))]), unref(useUserStore1).qqBinding?.isBound ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "binding-btn unbind",
        onClick: val6[6] || (val6[6] = val7 => zz31("qq"))
      }, " 解绑 ")) : (openBlock(), createElementBlock("button", {
        key: 0,
        class: "binding-btn",
        onClick: zz26
      }, " 绑定 "))]), val6[47] || (val6[47] = createElementVNode("div", {
        class: "binding-divider"
      }, null, -1)), createElementVNode("div", da, [val6[45] || (val6[45] = createElementVNode("div", {
        class: "binding-icon phone"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("rect", {
        x: "5",
        y: "2",
        width: "14",
        height: "20",
        rx: "2",
        ry: "2"
      }), createElementVNode("line", {
        x1: "12",
        y1: "18",
        x2: "12.01",
        y2: "18"
      })])], -1)), createElementVNode("div", ra, [val6[44] || (val6[44] = createElementVNode("h4", {
        class: "binding-title"
      }, "手机号", -1)), unref(useUserStore1).phoneBinding?.bound ? (openBlock(), createElementBlock("p", ua, " 已绑定 · " + toDisplayString(unref(useUserStore1).phoneBinding?.phoneNumber), 1)) : (openBlock(), createElementBlock("p", ca, "未绑定"))]), unref(useUserStore1).phoneBinding?.bound ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "binding-btn unbind",
        onClick: val6[7] || (val6[7] = val7 => zz31("phone"))
      }, " 解绑 ")) : (openBlock(), createElementBlock("button", {
        key: 0,
        class: "binding-btn",
        onClick: zz27
      }, " 绑定 "))])])]), createElementVNode("section", {
        class: "section"
      }, [val6[50] || (val6[50] = createElementVNode("div", {
        class: "section-header"
      }, [createElementVNode("h2", {
        class: "section-title"
      }, "安全设置")], -1)), createElementVNode("div", {
        class: "card"
      }, [createElementVNode("button", {
        class: "action-item",
        onClick: zz34
      }, [...(val6[49] || (val6[49] = [createVNodeWrapper('<div class="action-icon" data-v-dcc3a731><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcc3a731><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-dcc3a731></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-dcc3a731></path></svg></div><div class="action-content" data-v-dcc3a731><span class="action-title" data-v-dcc3a731>修改密码</span><span class="action-desc" data-v-dcc3a731>定期更换密码保障账号安全</span></div><svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcc3a731><polyline points="9 18 15 12 9 6" data-v-dcc3a731></polyline></svg>', 3)]))])])]), createElementVNode("section", va, [val6[60] || (val6[60] = createElementVNode("div", {
        class: "section-header"
      }, [createElementVNode("h2", {
        class: "section-title"
      }, "隐私设置")], -1)), createElementVNode("div", pa, [refVal31.value ? (openBlock(), createElementBlock("div", fa, [...(val6[51] || (val6[51] = [createElementVNode("div", {
        class: "loading-spinner small"
      }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ba, [val6[53] || (val6[53] = createVNodeWrapper('<div class="privacy-icon" data-v-dcc3a731><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcc3a731><path d="M22 10v6M2 10l10-5 10 5-10 5z" data-v-dcc3a731></path><path d="M6 12v5c3 3 9 3 12 0v-5" data-v-dcc3a731></path></svg></div><div class="privacy-info" data-v-dcc3a731><h4 class="privacy-title" data-v-dcc3a731>公开校园网绑定信息</h4><p class="privacy-desc" data-v-dcc3a731>允许他人查看您的班级、姓名等信息</p></div>', 2)), createElementVNode("button", {
        class: normalizeClass(["toggle-switch", {
          active: refVal30.value.showCampusBinding,
          loading: refVal32.value === "showCampusBinding"
        }]),
        disabled: refVal32.value !== null,
        onClick: val6[8] || (val6[8] = val7 => zz17("showCampusBinding"))
      }, [...(val6[52] || (val6[52] = [createElementVNode("span", {
        class: "toggle-slider"
      }, null, -1)]))], 10, ma)]), val6[58] || (val6[58] = createElementVNode("div", {
        class: "privacy-divider"
      }, null, -1)), createElementVNode("div", ga, [val6[55] || (val6[55] = createVNodeWrapper('<div class="privacy-icon" data-v-dcc3a731><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcc3a731><line x1="18" y1="20" x2="18" y2="10" data-v-dcc3a731></line><line x1="12" y1="20" x2="12" y2="4" data-v-dcc3a731></line><line x1="6" y1="20" x2="6" y2="14" data-v-dcc3a731></line></svg></div><div class="privacy-info" data-v-dcc3a731><h4 class="privacy-title" data-v-dcc3a731>公开统计数据</h4><p class="privacy-desc" data-v-dcc3a731>允许他人查看您的评分数、评论数、获赞数</p></div>', 2)), createElementVNode("button", {
        class: normalizeClass(["toggle-switch", {
          active: refVal30.value.showStatistics,
          loading: refVal32.value === "showStatistics"
        }]),
        disabled: refVal32.value !== null,
        onClick: val6[9] || (val6[9] = val7 => zz17("showStatistics"))
      }, [...(val6[54] || (val6[54] = [createElementVNode("span", {
        class: "toggle-slider"
      }, null, -1)]))], 10, ya)]), val6[59] || (val6[59] = createElementVNode("div", {
        class: "privacy-divider"
      }, null, -1)), createElementVNode("div", wa, [val6[57] || (val6[57] = createVNodeWrapper('<div class="privacy-icon" data-v-dcc3a731><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcc3a731><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-dcc3a731></polygon></svg></div><div class="privacy-info" data-v-dcc3a731><h4 class="privacy-title" data-v-dcc3a731>公开贡献数</h4><p class="privacy-desc" data-v-dcc3a731>允许他人查看您的贡献数量</p></div>', 2)), createElementVNode("button", {
        class: normalizeClass(["toggle-switch", {
          active: refVal30.value.showContributions,
          loading: refVal32.value === "showContributions"
        }]),
        disabled: refVal32.value !== null,
        onClick: val6[10] || (val6[10] = val7 => zz17("showContributions"))
      }, [...(val6[56] || (val6[56] = [createElementVNode("span", {
        class: "toggle-slider"
      }, null, -1)]))], 10, ha)])], 64))])])]), val6[61] || (val6[61] = createElementVNode("div", {
        class: "bottom-spacer"
      }, null, -1))], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal5.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: zz33
        }, [createVNode(withSlots, {
          name: "modal-scale"
        }, {
          default: toDisplayValue(() => [refVal5.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val6[11] || (val6[11] = withModifiers(() => {}, ["stop"]))
          }, [val6[62] || (val6[62] = createElementVNode("h3", {
            class: "modal-title"
          }, "确认解绑", -1)), createElementVNode("p", ka, " 确定要解绑" + toDisplayString(refVal6.value === "campus" ? "校园网" : refVal6.value === "qq" ? "QQ" : "手机号") + "吗？ ", 1), createElementVNode("div", Ca, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz33,
            disabled: refVal7.value
          }, "取消", 8, xa), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz32,
            disabled: refVal7.value
          }, toDisplayString(refVal7.value ? "解绑中..." : "确定"), 9, _a)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal14.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz23
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal14.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val6[15] || (val6[15] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", Ba, [createElementVNode("h3", Pa, toDisplayString(refVal15.value ? "更新校园网账号" : "绑定校园网账号"), 1), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz23
          }, [...(val6[63] || (val6[63] = [createElementVNode("svg", {
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
          })], -1)]))])]), refVal15.value ? (openBlock(), createElementBlock("div", Ma, " 请输入校园网账号密码以更新您的高二分班信息 ")) : createCommentVNode("", !0), refVal20.value ? (openBlock(), createElementBlock("div", Ua, toDisplayString(refVal20.value), 1)) : createCommentVNode("", !0), createElementVNode("form", {
            class: "bind-form",
            onSubmit: withModifiers(zz25, ["prevent"])
          }, [createElementVNode("div", Sa, [val6[64] || (val6[64] = createElementVNode("label", {
            class: "bind-form-label"
          }, "学号", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[12] || (val6[12] = val7 => refVal16.value.studentId = val7),
            type: "text",
            class: "bind-form-input",
            placeholder: "请输入学号",
            disabled: refVal19.value
          }, null, 8, Ia), [[vModelText, refVal16.value.studentId]])]), createElementVNode("div", $a, [val6[65] || (val6[65] = createElementVNode("label", {
            class: "bind-form-label"
          }, "校园网密码", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[13] || (val6[13] = val7 => refVal16.value.password = val7),
            type: "password",
            class: "bind-form-input",
            placeholder: "请输入校园网密码",
            disabled: refVal19.value
          }, null, 8, Va), [[vModelText, refVal16.value.password]])]), createElementVNode("div", Aa, [val6[66] || (val6[66] = createElementVNode("label", {
            class: "bind-form-label"
          }, "验证码", -1)), createElementVNode("div", za, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[14] || (val6[14] = val7 => refVal16.value.captchaCode = val7),
            type: "text",
            class: "bind-form-input captcha-input",
            placeholder: "请输入验证码",
            disabled: refVal19.value
          }, null, 8, Fa), [[vModelText, refVal16.value.captchaCode]]), createElementVNode("div", {
            class: normalizeClass(["captcha-image", {
              "is-loading": refVal18.value
            }]),
            onClick: zz24
          }, [refVal17.value && !refVal18.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: refVal17.value,
            alt: "验证码"
          }, null, 8, Ea)) : refVal18.value ? (openBlock(), createElementBlock("span", Na, "加载中")) : (openBlock(), createElementBlock("span", Qa, "点击获取"))], 2)])]), createElementVNode("button", {
            type: "submit",
            class: "bind-submit-btn",
            disabled: refVal19.value
          }, toDisplayString(refVal19.value ? refVal15.value ? "更新中..." : "绑定中..." : refVal15.value ? "更新" : "绑定"), 9, Ra)], 32)])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal21.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz35
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal21.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val6[22] || (val6[22] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", qa, [val6[68] || (val6[68] = createElementVNode("h3", {
            class: "drawer-title"
          }, "修改密码", -1)), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz35,
            disabled: refVal22.value
          }, [...(val6[67] || (val6[67] = [createElementVNode("svg", {
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
          })], -1)]))], 8, Da)]), refVal24.value ? (openBlock(), createElementBlock("div", Xa, [...(val6[69] || (val6[69] = [createElementVNode("div", {
            class: "loading-spinner small"
          }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [refVal25.value ? (openBlock(), createElementBlock("div", Ya, toDisplayString(refVal25.value), 1)) : createCommentVNode("", !0), refVal23.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Ta, " 您的账号由QQ登录自动创建，尚未设置密码。设置密码后可使用用户名密码登录。 ")), createElementVNode("form", {
            class: "bind-form",
            onSubmit: withModifiers(zz36, ["prevent"])
          }, [refVal23.value ? (openBlock(), createElementBlock("div", Ha, [val6[72] || (val6[72] = createElementVNode("label", {
            class: "bind-form-label"
          }, "旧密码", -1)), createElementVNode("div", La, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[16] || (val6[16] = val7 => refVal26.value.oldPassword = val7),
            type: refVal27.value ? "text" : "password",
            class: "bind-form-input",
            placeholder: "请输入旧密码",
            disabled: refVal22.value
          }, null, 8, ja), [[directiveHooks, refVal26.value.oldPassword]]), createElementVNode("button", {
            type: "button",
            class: "password-toggle",
            onClick: val6[17] || (val6[17] = val7 => refVal27.value = !refVal27.value),
            tabindex: "-1"
          }, [refVal27.value ? (openBlock(), createElementBlock("svg", Wa, [...(val6[70] || (val6[70] = [createElementVNode("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), createElementVNode("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (openBlock(), createElementBlock("svg", Ga, [...(val6[71] || (val6[71] = [createElementVNode("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), createElementVNode("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])])) : createCommentVNode("", !0), createElementVNode("div", Oa, [val6[75] || (val6[75] = createElementVNode("label", {
            class: "bind-form-label"
          }, "新密码", -1)), createElementVNode("div", Ja, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[18] || (val6[18] = val7 => refVal26.value.newPassword = val7),
            type: refVal28.value ? "text" : "password",
            class: "bind-form-input",
            placeholder: "6-32位密码",
            disabled: refVal22.value
          }, null, 8, Ka), [[directiveHooks, refVal26.value.newPassword]]), createElementVNode("button", {
            type: "button",
            class: "password-toggle",
            onClick: val6[19] || (val6[19] = val7 => refVal28.value = !refVal28.value),
            tabindex: "-1"
          }, [refVal28.value ? (openBlock(), createElementBlock("svg", Za, [...(val6[73] || (val6[73] = [createElementVNode("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), createElementVNode("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (openBlock(), createElementBlock("svg", et, [...(val6[74] || (val6[74] = [createElementVNode("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), createElementVNode("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), createElementVNode("div", st, [val6[78] || (val6[78] = createElementVNode("label", {
            class: "bind-form-label"
          }, "确认新密码", -1)), createElementVNode("div", at, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[20] || (val6[20] = val7 => refVal26.value.confirmPassword = val7),
            type: refVal29.value ? "text" : "password",
            class: "bind-form-input",
            placeholder: "再次输入新密码",
            disabled: refVal22.value
          }, null, 8, tt), [[directiveHooks, refVal26.value.confirmPassword]]), createElementVNode("button", {
            type: "button",
            class: "password-toggle",
            onClick: val6[21] || (val6[21] = val7 => refVal29.value = !refVal29.value),
            tabindex: "-1"
          }, [refVal29.value ? (openBlock(), createElementBlock("svg", lt, [...(val6[76] || (val6[76] = [createElementVNode("path", {
            d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          }, null, -1), createElementVNode("line", {
            x1: "1",
            y1: "1",
            x2: "23",
            y2: "23"
          }, null, -1)]))])) : (openBlock(), createElementBlock("svg", nt, [...(val6[77] || (val6[77] = [createElementVNode("path", {
            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          }, null, -1), createElementVNode("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, null, -1)]))]))])])]), createElementVNode("button", {
            type: "submit",
            class: "bind-submit-btn",
            disabled: refVal22.value
          }, toDisplayString(refVal22.value ? "提交中..." : "确认修改"), 9, ot)], 32)], 64))])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz28
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal8.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val6[25] || (val6[25] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", it, [val6[80] || (val6[80] = createElementVNode("h3", {
            class: "drawer-title"
          }, "绑定手机号", -1)), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz28,
            disabled: refVal10.value
          }, [...(val6[79] || (val6[79] = [createElementVNode("svg", {
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
          })], -1)]))], 8, dt)]), refVal11.value ? (openBlock(), createElementBlock("div", rt, toDisplayString(refVal11.value), 1)) : createCommentVNode("", !0), createElementVNode("form", {
            class: "bind-form",
            onSubmit: withModifiers(zz30, ["prevent"])
          }, [createElementVNode("div", ut, [val6[81] || (val6[81] = createElementVNode("label", {
            class: "bind-form-label"
          }, "手机号", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[23] || (val6[23] = val7 => refVal9.value.phoneNumber = val7),
            type: "tel",
            class: "bind-form-input",
            placeholder: "请输入手机号",
            maxlength: "11",
            disabled: refVal10.value
          }, null, 8, ct), [[vModelText, refVal9.value.phoneNumber]])]), createElementVNode("div", vt, [val6[82] || (val6[82] = createElementVNode("label", {
            class: "bind-form-label"
          }, "验证码", -1)), createElementVNode("div", pt, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val6[24] || (val6[24] = val7 => refVal9.value.code = val7),
            type: "text",
            class: "bind-form-input sms-code-input",
            placeholder: "6位验证码",
            maxlength: "6",
            disabled: refVal10.value
          }, null, 8, ft), [[vModelText, refVal9.value.code]]), createElementVNode("button", {
            type: "button",
            class: "sms-send-btn",
            disabled: refVal10.value || refVal12.value || refVal13.value > 0,
            onClick: zz29
          }, toDisplayString(refVal13.value > 0 ? `${refVal13.value}s` : refVal12.value ? "发送中" : "获取验证码"), 9, bt)])]), createElementVNode("button", {
            type: "submit",
            class: "bind-submit-btn",
            disabled: refVal10.value
          }, toDisplayString(refVal10.value ? "绑定中..." : "绑定"), 9, mt)], 32)])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(ps, {
        show: refVal4.value,
        "current-avatar": val4.value,
        onClose: val6[26] || (val6[26] = val7 => refVal4.value = !1),
        onUploaded: zz15
      }, null, 8, ["show", "current-avatar"])]));
    }
  }),
  Ct = withScopeId(gt, [["__scopeId", "data-v-dcc3a731"]]);
/* index 运行时导出（已语义化） */
export { Ct as default };