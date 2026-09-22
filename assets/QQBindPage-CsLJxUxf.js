/*!
 * 页面模块：QQ 绑定（QQBindPage）
 * 路由：/auth/qq/bindOrRegister   name=qq-bindOrRegister   层级=2   需登录=否
 * 功能：公开的「QQ 绑定」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/QQBindPage-CsLJxUxf.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, cloneIfRaw, onMounted, inject, useRouter, createElementBlock, createElementVNode, createCommentVNode, toDisplayString, withDirectives, vModelText, useToast, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 模板属性配置：qq-bind-page */
/* 模板属性配置：card */
/* 模板属性配置：qq-info */
/* 模板属性配置：qq-avatar-placeholder */
/* 模板属性配置：qq-nickname */
/* 模板属性配置：mode-choose */
/* 模板属性配置：button-group */
/* 模板属性配置：form-group */
/* 模板属性配置：form-group */
/* 模板属性配置：error-message */
/* 模板属性配置：button-group */
/* 模板属性配置：form-section */
/* 模板属性配置：form-group */
/* 模板属性配置：form-group */
const QQBindPageConfig = {
    class: "qq-bind-page"
  },
  QQBindPageConfig_2 = {
    class: "card"
  },
  QQBindPageConfig_3 = {
    class: "qq-info"
  },
  QQBindPageList = ["src"],
  QQBindPageConfig_4 = {
    key: 1,
    class: "qq-avatar-placeholder"
  },
  QQBindPageConfig_5 = {
    class: "qq-nickname"
  },
  QQBindPageConfig_6 = {
    key: 0,
    class: "mode-choose"
  },
  QQBindPageConfig_7 = {
    class: "button-group"
  },
  QQBindPageConfig_8 = {
    key: 1,
    class: "form-section"
  },
  QQBindPageConfig_9 = {
    class: "form-group"
  },
  QQBindPageList_2 = ["disabled"],
  QQBindPageConfig_10 = {
    class: "form-group"
  },
  QQBindPageList_3 = ["disabled"],
  QQBindPageConfig_11 = {
    key: 0,
    class: "error-message"
  },
  local_zb90 = {
    class: "button-group"
  },
  local_zb91 = ["disabled"],
  local_zb92 = ["disabled"],
  local_zb93 = {
    key: 2,
    class: "form-section"
  },
  local_zb94 = {
    class: "form-group"
  },
  local_zb95 = ["disabled"],
  local_zb96 = {
    class: "form-group"
  },
  local_zb97 = ["disabled"],
  ss = {
    key: 0,
    class: "error-message"
  },
  es = {
    class: "button-group"
  },
  ts = ["disabled"],
  os = ["disabled"],
  as = defineComponent({
    __name: "QQBindPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref("choose"),
        refVal2 = ref(!1),
        refVal3 = ref(""),
        val3 = cloneIfRaw({
          openid: "",
          unionid: "",
          nickname: "",
          avatar: ""
        }),
        val4 = cloneIfRaw({
          username: "",
          password: ""
        }),
        val5 = cloneIfRaw({
          username: "",
          password: ""
        });
      onMounted(() => {
        const {
          openid: val1,
          unionid: val6,
          nickname: val7,
          avatar: val8
        } = val2.query;
        if (!val1) {
          useRouter1.push("/");
          return;
        }
        val3.openid = val1, val3.unionid = val6 || void 0, val3.nickname = val7 || void 0, val3.avatar = val8 || void 0;
      });
      async function zz0() {
        if (!val4.username || !val4.password) {
          refVal3.value = "请填写用户名和密码";
          return;
        }
        refVal2.value = !0, refVal3.value = "";
        try {
          const val1 = await useUserStore1.qqBind(val4.username, val4.password, val3);
          if (val1.code === 200) {
            useToast1.success("绑定成功");
            const val6 = useUserStore1.consumeRedirectRoute();
            useRouter1.push(val6 || "/");
          } else refVal3.value = val1.message || "绑定失败";
        } catch {
          refVal3.value = "网络错误";
        } finally {
          refVal2.value = !1;
        }
      }
      async function zz1() {
        if (!val5.username || !val5.password) {
          refVal3.value = "请填写用户名和密码";
          return;
        }
        if (val5.password.length < 6) {
          refVal3.value = "密码至少 6 位";
          return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(val5.username)) {
          refVal3.value = "用户名只能包含英文字母、数字和下划线";
          return;
        }
        refVal2.value = !0, refVal3.value = "";
        try {
          const val1 = await useUserStore1.qqRegister(val5.username, val5.password, val3);
          if (val1.code === 200) {
            useToast1.success("注册成功");
            const val6 = useUserStore1.consumeRedirectRoute();
            useRouter1.push(val6 || "/");
          } else refVal3.value = val1.message || "注册失败";
        } catch {
          refVal3.value = "网络错误";
        } finally {
          refVal2.value = !1;
        }
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", QQBindPageConfig, [createElementVNode("div", QQBindPageConfig_2, [createElementVNode("div", QQBindPageConfig_3, [val3.avatar ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: val3.avatar,
        alt: "头像",
        class: "qq-avatar"
      }, null, 8, QQBindPageList)) : (openBlock(), createElementBlock("div", QQBindPageConfig_4, "QQ")), createElementVNode("span", QQBindPageConfig_5, toDisplayString(val3.nickname || "QQ用户"), 1)]), refVal.value === "choose" ? (openBlock(), createElementBlock("div", QQBindPageConfig_6, [val6[8] || (val6[8] = createElementVNode("h2", null, "请选择操作", -1)), val6[9] || (val6[9] = createElementVNode("p", {
        class: "hint"
      }, "该 QQ 尚未绑定账号，请选择：", -1)), createElementVNode("div", QQBindPageConfig_7, [createElementVNode("button", {
        class: "btn btn-primary",
        onClick: val6[0] || (val6[0] = val7 => refVal.value = "bind")
      }, " 绑定已有账号 "), createElementVNode("button", {
        class: "btn btn-secondary",
        onClick: val6[1] || (val6[1] = val7 => refVal.value = "register")
      }, " 注册新账号 ")])])) : refVal.value === "bind" ? (openBlock(), createElementBlock("div", QQBindPageConfig_8, [val6[12] || (val6[12] = createElementVNode("h2", null, "绑定已有账号", -1)), createElementVNode("div", QQBindPageConfig_9, [val6[10] || (val6[10] = createElementVNode("label", null, "用户名", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[2] || (val6[2] = val7 => val4.username = val7),
        type: "text",
        placeholder: "请输入用户名",
        disabled: refVal2.value
      }, null, 8, QQBindPageList_2), [[vModelText, val4.username]])]), createElementVNode("div", QQBindPageConfig_10, [val6[11] || (val6[11] = createElementVNode("label", null, "密码", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[3] || (val6[3] = val7 => val4.password = val7),
        type: "password",
        placeholder: "请输入密码",
        disabled: refVal2.value
      }, null, 8, QQBindPageList_3), [[vModelText, val4.password]])]), refVal3.value ? (openBlock(), createElementBlock("p", QQBindPageConfig_11, toDisplayString(refVal3.value), 1)) : createCommentVNode("", !0), createElementVNode("div", local_zb90, [createElementVNode("button", {
        class: "btn btn-primary",
        disabled: refVal2.value,
        onClick: zz0
      }, toDisplayString(refVal2.value ? "绑定中..." : "确认绑定"), 9, local_zb91), createElementVNode("button", {
        class: "btn btn-text",
        disabled: refVal2.value,
        onClick: val6[4] || (val6[4] = val7 => refVal.value = "choose")
      }, " 返回 ", 8, local_zb92)])])) : refVal.value === "register" ? (openBlock(), createElementBlock("div", local_zb93, [val6[15] || (val6[15] = createElementVNode("h2", null, "注册新账号", -1)), createElementVNode("div", local_zb94, [val6[13] || (val6[13] = createElementVNode("label", null, "用户名", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[5] || (val6[5] = val7 => val5.username = val7),
        type: "text",
        placeholder: "英文字母、数字、下划线",
        disabled: refVal2.value
      }, null, 8, local_zb95), [[vModelText, val5.username]])]), createElementVNode("div", local_zb96, [val6[14] || (val6[14] = createElementVNode("label", null, "密码", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val6[6] || (val6[6] = val7 => val5.password = val7),
        type: "password",
        placeholder: "至少 6 位",
        disabled: refVal2.value
      }, null, 8, local_zb97), [[vModelText, val5.password]])]), refVal3.value ? (openBlock(), createElementBlock("p", ss, toDisplayString(refVal3.value), 1)) : createCommentVNode("", !0), createElementVNode("div", es, [createElementVNode("button", {
        class: "btn btn-primary",
        disabled: refVal2.value,
        onClick: zz1
      }, toDisplayString(refVal2.value ? "注册中..." : "确认注册"), 9, ts), createElementVNode("button", {
        class: "btn btn-text",
        disabled: refVal2.value,
        onClick: val6[7] || (val6[7] = val7 => refVal.value = "choose")
      }, " 返回 ", 8, os)])])) : createCommentVNode("", !0)])]));
    }
  }),
  ds = withScopeId(as, [["__scopeId", "data-v-3170ffc3"]]);
/* index 运行时导出（已语义化） */
export { ds as default };