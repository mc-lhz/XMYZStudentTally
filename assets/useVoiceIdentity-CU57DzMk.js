/*!
 * 模块：useVoiceIdentity（useVoiceIdentity-CU57DzMk.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/useVoiceIdentity-CU57DzMk.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, createElementBlock, Fragment, createVNodeWrapper, createElementVNode, openBlock, withScopeId, ref, applyDirectives, withModifiers, normalizeClass, createVNode, createTextVNode, renderList, createCommentVNode, toDisplayString, unref, withSlots, toDisplayValue, onMounted, directiveBum, useUserStore } from "./index-DJrtCu9i.js";
/* 导入：本地模块 voices（站点内功能模块） */
import { voiceIdentityTypeLabels, helper_zb50, createVoicesIdentity } from "./voices-DF_9WYD3.js";
/* 导入：本地模块 voices-theme（站点内功能模块） */
import { useVxToast } from "./voices-theme-B9KdZorS.js";
/* 模板属性配置：bind-options */
/* 模板属性配置：bind-actions bind-dimmable */
/* 模板属性配置：vx-modal bind-confirm */
const useVoiceIdentityList = ["width", "height"],
  IdentityIcon = defineComponent({
    __name: "IdentityIcon",
    props: {
      identity: {},
      size: {
        default: 18
      }
    },
    setup(val) {
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("svg", {
        class: "vx-identity-icon",
        width: val.size,
        height: val.size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.7",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true"
      }, [val.identity === 1 ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [val2[0] || (val2[0] = createVNodeWrapper('<path d="M9 7.5 C9 4.5 15 4.5 15 7.5"></path><rect x="5" y="7.5" width="14" height="12.5" rx="3"></rect><path d="M5 12.5 h14"></path><rect x="8.5" y="14.5" width="7" height="5.5" rx="1.5"></rect><path d="M12 14.5 v2"></path>', 5))], 64)) : val.identity === 2 ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [val2[1] || (val2[1] = createVNodeWrapper('<rect x="4.5" y="4.5" width="15" height="4.4" rx="1"></rect><rect x="6" y="8.9" width="14" height="4.4" rx="1"></rect><rect x="4" y="13.3" width="15.5" height="4.4" rx="1"></rect><path d="M16 4.5 v4.4"></path><path d="M9.5 8.9 v4.4"></path><path d="M14.5 13.3 v4.4"></path><path d="M7 20.8 h10"></path>', 7))], 64)) : val.identity === 3 ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [val2[2] || (val2[2] = createElementVNode("path", {
        d: "M12 4.5 L21.5 9 L12 13.5 L2.5 9 Z"
      }, null, -1)), val2[3] || (val2[3] = createElementVNode("path", {
        d: "M7 11.5 v3.8 c0 2 10 2 10 0 v-3.8"
      }, null, -1)), val2[4] || (val2[4] = createElementVNode("path", {
        d: "M21.5 9 v4.5"
      }, null, -1)), val2[5] || (val2[5] = createElementVNode("circle", {
        cx: "21.5",
        cy: "14.6",
        r: "0.9"
      }, null, -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 3
      }, [val2[6] || (val2[6] = createElementVNode("path", {
        d: "M9.5 8.5 V7 c0-1.2 5-1.2 5 0 v1.5"
      }, null, -1)), val2[7] || (val2[7] = createElementVNode("rect", {
        x: "4",
        y: "8.5",
        width: "16",
        height: "11",
        rx: "2"
      }, null, -1)), val2[8] || (val2[8] = createElementVNode("path", {
        d: "M4 13.5 h16"
      }, null, -1)), val2[9] || (val2[9] = createElementVNode("path", {
        d: "M10.8 13.5 h2.4 v2 h-2.4 z"
      }, null, -1))], 64))], 8, useVoiceIdentityList));
    }
  }),
  useVoiceIdentityList_2 = ["width", "height"],
  local_zbe0 = defineComponent({
    __name: "VxPen",
    props: {
      size: {
        default: 14
      }
    },
    setup(val) {
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("svg", {
        class: "vx-pen-writing",
        width: val.size,
        height: val.size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.8",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true"
      }, [...(val2[0] || (val2[0] = [createElementVNode("path", {
        d: "M4 20 l1.2 -4.2 L16.6 4.4 a2 2 0 0 1 2.8 0 l0.2 0.2 a2 2 0 0 1 0 2.8 L8.2 18.8 Z"
      }, null, -1), createElementVNode("path", {
        d: "M14.5 6.5 l3 3"
      }, null, -1)]))], 8, useVoiceIdentityList_2));
    }
  }),
  VxPenScoped = withScopeId(local_zbe0, [["__scopeId", "data-v-b7bc9f6b"]]),
  local_zbe2 = {
    class: "bind-options"
  },
  local_zbe3 = ["disabled", "onClick"],
  local_zbe4 = {
    key: 0,
    class: "bind-stamp"
  },
  local_zbe5 = {
    class: "bind-actions bind-dimmable"
  },
  local_zbe6 = ["disabled"],
  local_zbe7 = ["disabled"],
  local_zbe8 = {
    class: "vx-modal bind-confirm"
  },
  tt = {
    class: "bind-confirm-text"
  },
  et = {
    class: "vx-kaiti"
  },
  nt = {
    class: "bind-actions"
  },
  st = ["disabled"],
  it = ["disabled"],
  lt = defineComponent({
    __name: "IdentityBindModal",
    emits: ["bound", "close"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = zz0,
        vxToast = useVxToast(),
        refVal = ref(null),
        refVal2 = ref(!1),
        refVal3 = ref("select"),
        val5 = applyDirectives(() => refVal.value ? voiceIdentityTypeLabels[refVal.value] : "");
      function zz1() {
        refVal3.value === "select" && val3("close");
      }
      async function zz2() {
        if (!(!refVal.value || refVal2.value)) {
          refVal2.value = !0;
          try {
            const voicesIdentity = await createVoicesIdentity(refVal.value);
            if (voicesIdentity.data.code === 200) {
              refVal3.value = "stamping";
              const refValValue = refVal.value;
              setTimeout(() => val3("bound", refValValue), 1600);
            } else refVal3.value = "select", vxToast.error(voicesIdentity.data.message || "绑定失败");
          } catch {
            refVal3.value = "select", vxToast.error("网络错误，请稍后再试");
          } finally {
            refVal2.value = !1;
          }
        }
      }
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock("div", {
        class: normalizeClass(["vx-modal-mask", {
          "bind-mask--stamping": refVal3.value === "stamping"
        }]),
        onClick: withModifiers(zz1, ["self"])
      }, [createElementVNode("div", {
        class: normalizeClass(["vx-modal", {
          "bind-modal--stamping": refVal3.value === "stamping"
        }])
      }, [val6[4] || (val6[4] = createElementVNode("div", {
        class: "vx-exam-head bind-dimmable"
      }, [createElementVNode("h3", null, "考生信息登记表")], -1)), val6[5] || (val6[5] = createElementVNode("p", {
        class: "bind-tip bind-dimmable"
      }, [createTextVNode(" 选择你现在的身份。登记后"), createElementVNode("b", null, "不可修改"), createTextVNode("，它将出现在你出的每一份卷子和每一份答卷上（全程匿名，只展示身份）。 ")], -1)), createElementVNode("div", local_zbe2, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(helper_zb50), val7 => (openBlock(), createElementBlock("button", {
        key: val7,
        class: normalizeClass(["bind-option", {
          "bind-option--active": refVal.value === val7,
          "bind-option--dim": refVal3.value === "stamping" && refVal.value !== val7,
          "bind-option--spot": refVal3.value === "stamping" && refVal.value === val7
        }]),
        type: "button",
        disabled: refVal3.value !== "select",
        onClick: val8 => refVal.value = val7
      }, [createVNode(IdentityIcon, {
        identity: val7,
        size: 30,
        class: "bind-option-icon"
      }, null, 8, ["identity"]), createElementVNode("span", null, toDisplayString(unref(voiceIdentityTypeLabels)[val7]), 1), refVal3.value === "stamping" && refVal.value === val7 ? (openBlock(), createElementBlock("span", local_zbe4, "已登记")) : createCommentVNode("", !0)], 10, local_zbe3))), 128))]), createElementVNode("div", local_zbe5, [createElementVNode("button", {
        class: "vx-btn vx-btn--sm",
        type: "button",
        disabled: refVal3.value !== "select",
        onClick: val6[0] || (val6[0] = val7 => val3("close"))
      }, "再想想", 8, local_zbe6), createElementVNode("button", {
        class: "vx-btn vx-btn--red vx-btn--sm",
        type: "button",
        disabled: !refVal.value || refVal3.value !== "select",
        onClick: val6[1] || (val6[1] = val7 => refVal3.value = "confirm")
      }, " 确认登记 ", 8, local_zbe7)])], 2), createVNode(withSlots, {
        name: "vx-modal"
      }, {
        default: toDisplayValue(() => [refVal3.value === "confirm" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "bind-confirm-mask",
          onClick: val6[3] || (val6[3] = withModifiers(val7 => refVal3.value = "select", ["self"]))
        }, [createElementVNode("div", local_zbe8, [createElementVNode("p", tt, [val6[6] || (val6[6] = createTextVNode(" 请再次确认：你的考生身份是 ", -1)), val6[7] || (val6[7] = createElementVNode("br", null, null, -1)), createElementVNode("b", et, "「" + toDisplayString(val5.value) + "」", 1), val6[8] || (val6[8] = createElementVNode("br", null, null, -1)), val6[9] || (val6[9] = createElementVNode("span", {
          class: "bind-confirm-sub"
        }, "登记后不可修改", -1))]), createElementVNode("div", nt, [createElementVNode("button", {
          class: "vx-btn vx-btn--sm",
          type: "button",
          disabled: refVal2.value,
          onClick: val6[2] || (val6[2] = val7 => refVal3.value = "select")
        }, " 返回修改 ", 8, st), createElementVNode("button", {
          class: "vx-btn vx-btn--red vx-btn--sm",
          type: "button",
          disabled: refVal2.value,
          onClick: zz2
        }, [refVal2.value ? (openBlock(), createElementBlock(Fragment, {
          key: 0
        }, [createVNode(VxPenScoped), val6[10] || (val6[10] = createTextVNode(" 登记中…", -1))], 64)) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode("确认无误")], 64))], 8, it)])])])) : createCommentVNode("", !0)]),
        _: 1
      })], 2));
    }
  }),
  IdentityBindModalScoped = withScopeId(lt, [["__scopeId", "data-v-204de06a"]]),
  VxSealLine = defineComponent({
    __name: "VxSealLine",
    setup(val) {
      const refVal = ref(null),
        refVal2 = ref(1);
      let val2 = null;
      return onMounted(() => {
        refVal.value && (val2 = new ResizeObserver(val1 => {
          const val3 = val1[0]?.contentRect.height ?? 0;
          refVal2.value = Math.max(1, Math.round(val3 / 230));
        }), val2.observe(refVal.value));
      }), directiveBum(() => val2?.disconnect()), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock(Fragment, null, [val3[0] || (val3[0] = createElementVNode("span", {
        class: "vx-seal"
      }, null, -1)), createElementVNode("span", {
        ref_key: "el",
        ref: refVal,
        class: "vx-seal-text",
        "aria-hidden": "true"
      }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val4 => (openBlock(), createElementBlock("span", {
        key: val4
      }, "密封线内不得答题"))), 128))], 512)], 64));
    }
  }),
  local_zbe9 = "vx-identity",
  useVoiceIdentityConst2 = ref(null);
let useVoiceIdentityConst3 = null;
function zz3() {
  const useUserStore1 = useUserStore();
  function zz4() {
    return useUserStore1.user?.id ?? null;
  }
  function zz5() {
    const val = zz4();
    if (val === null) {
      useVoiceIdentityConst2.value = null, useVoiceIdentityConst3 = null;
      return;
    }
    if (useVoiceIdentityConst3 !== val) {
      useVoiceIdentityConst3 = val, useVoiceIdentityConst2.value = null;
      try {
        const item = localStorage.getItem(local_zbe9);
        if (item) {
          const val2 = JSON.parse(item);
          val2.userId === val && (useVoiceIdentityConst2.value = val2.identity);
        }
      } catch {
        localStorage.removeItem(local_zbe9);
      }
    }
  }
  function zz6(val) {
    useVoiceIdentityConst2.value = val;
    const val2 = zz4();
    val2 !== null && val ? localStorage.setItem(local_zbe9, JSON.stringify({
      userId: val2,
      identity: val
    })) : localStorage.removeItem(local_zbe9);
  }
  function zz7(val) {
    val !== useVoiceIdentityConst2.value && zz6(val);
  }
  return zz5(), {
    identity: useVoiceIdentityConst2,
    setIdentity: zz6,
    syncFromServer: zz7
  };
}
/* index 运行时导出（已语义化） */
export { IdentityBindModalScoped, VxPenScoped, IdentityIcon, VxSealLine, zz3 as syncVoiceUserId };