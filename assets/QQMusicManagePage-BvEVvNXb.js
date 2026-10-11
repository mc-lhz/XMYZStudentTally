/*!
 * 页面模块：QQ音乐管理（QQMusicManagePage）
 * 路由：/admin/qqmusic   name=admin-qqmusic   层级=2   需登录=是
 * 功能：登录后的「QQ音乐管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/QQMusicManagePage-BvEVvNXb.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http, defineComponent, useUserStore, ref, applyDirectives, onMounted, useToast, useRouter, directiveUm, createElementBlock, createVNode, createElementVNode, createVNodeWrapper, Fragment, createCommentVNode, normalizeClass, toDisplayString, createTextVNode, toDisplayValue, withSlots, withModifiers, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
function zz0() {
  return http.get("/qqmusic/auth/qrcode");
}
function zz1(val) {
  return http.get("/qqmusic/auth/qrcode/status", {
    params: {
      qrKey: val
    }
  });
}
function zz2() {
  return http.get("/qqmusic/auth/status");
}
const oe = {
    class: "page-container"
  },
  ne = {
    class: "page-content"
  },
  re = {
    class: "content-container"
  },
  ie = {
    class: "breadcrumb-wrapper"
  },
  de = {
    key: 0,
    class: "loading-container"
  },
  ue = {
    class: "status-card"
  },
  ce = {
    class: "status-header"
  },
  ve = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  fe = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  ge = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  pe = {
    class: "status-text"
  },
  me = {
    class: "status-desc"
  },
  he = {
    key: 0,
    class: "status-details"
  },
  ye = {
    class: "detail-item"
  },
  ke = {
    class: "detail-value"
  },
  xe = {
    class: "detail-item"
  },
  we = {
    class: "detail-item"
  },
  _e = {
    class: "detail-value"
  },
  Ce = {
    class: "status-actions"
  },
  Qe = ["disabled"],
  be = {
    class: "qrcode-container"
  },
  qe = {
    key: 0,
    class: "qrcode-loading"
  },
  Me = ["src"],
  Se = {
    key: 0,
    class: "qrcode-overlay"
  },
  Pe = {
    key: 0,
    class: "qrcode-timer"
  },
  Be = ["src"],
  Ie = {
    class: "modal-actions"
  },
  Re = ["disabled"],
  Te = defineComponent({
    __name: "QQMusicManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref(!1),
        refVal4 = ref(null),
        refVal5 = ref(null),
        refVal6 = ref(!1),
        refVal7 = ref(null),
        refVal8 = ref(null),
        refVal9 = ref(0),
        val2 = applyDirectives(() => refVal2.value ? refVal2.value.loggedIn ? refVal2.value.expired ? {
          status: "expired",
          label: "已过期",
          class: "status-error",
          desc: "凭证已过期，请重新登录"
        } : (refVal2.value.remainingSeconds || 0) < 3600 ? {
          status: "expiring",
          label: "即将过期",
          class: "status-warning",
          desc: "凭证即将过期，建议重新登录"
        } : {
          status: "normal",
          label: "正常",
          class: "status-success",
          desc: "凭证有效"
        } : {
          status: "not-logged",
          label: "未登录",
          class: "status-error",
          desc: "尚未登录QQ音乐账号"
        } : {
          status: "unknown",
          label: "未知",
          class: "status-unknown",
          desc: "无法获取状态信息"
        }),
        val3 = applyDirectives(() => {
          if (!refVal5.value) return "等待扫描";
          switch (refVal5.value.code) {
            case 0:
              return "登录成功";
            case 66:
              return "等待扫描二维码";
            case 67:
              return refVal5.value.nickname ? `${refVal5.value.nickname} 已扫码，请在手机上确认` : "已扫码，请在手机上确认";
            case 65:
              return "二维码已过期，请刷新";
            case 68:
              return "用户取消登录";
            default:
              return "未知状态";
          }
        }),
        val4 = applyDirectives(() => {
          if (!refVal5.value) return "";
          switch (refVal5.value.code) {
            case 0:
              return "status-success";
            case 66:
              return "";
            case 67:
              return "status-info";
            case 65:
            case 68:
              return "status-error";
            default:
              return "";
          }
        });
      function zz3(val1) {
        if (val1 === null || val1 <= 0) return "已过期";
        const val5 = Math.floor(val1 / 86400),
          val6 = Math.floor(val1 % 86400 / 3600),
          val7 = Math.floor(val1 % 3600 / 60);
        return val5 > 0 ? `${val5}天${val6}小时` : val6 > 0 ? `${val6}小时${val7}分钟` : `${val7}分钟`;
      }
      function zz4(val1) {
        return val1 ? new Date(val1 * 1e3).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }) : "未知";
      }
      async function zz5() {
        refVal.value = !0;
        try {
          const val1 = await zz2();
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取登录状态失败");
        } catch {
          useToast1.error("获取登录状态失败");
        } finally {
          refVal.value = !1;
        }
      }
      async function zz6() {
        refVal3.value = !0, refVal5.value = null, await zz8();
      }
      function zz7() {
        refVal3.value = !1, zz12(), zz10(), refVal4.value = null, refVal5.value = null;
      }
      async function zz8() {
        refVal6.value = !0, zz12(), zz10(), refVal5.value = null;
        try {
          const val1 = await zz0();
          val1.data.code === 200 ? (refVal4.value = val1.data.data, refVal9.value = val1.data.data.expiresIn, zz9(), zz11()) : useToast1.error(val1.data.message || "获取二维码失败");
        } catch {
          useToast1.error("获取二维码失败");
        } finally {
          refVal6.value = !1;
        }
      }
      function zz9() {
        zz10(), refVal8.value = window.setInterval(() => {
          refVal9.value > 0 ? refVal9.value-- : zz10();
        }, 1e3);
      }
      function zz10() {
        refVal8.value && (clearInterval(refVal8.value), refVal8.value = null);
      }
      function zz11() {
        refVal4.value?.qrKey && (refVal7.value = window.setInterval(async () => {
          if (!refVal4.value?.qrKey) {
            zz12();
            return;
          }
          try {
            const val1 = await zz1(refVal4.value.qrKey);
            if (val1.data.code === 200) switch (refVal5.value = val1.data.data, val1.data.data.code) {
              case 0:
                zz12(), zz10(), useToast1.success("登录成功"), zz7(), await zz5();
                break;
              case 65:
              case 68:
                zz12(), zz10();
                break;
            }
          } catch (val1) {
            console.error("Check QR code status failed:", val1);
          }
        }, 2e3));
      }
      function zz12() {
        refVal7.value && (clearInterval(refVal7.value), refVal7.value = null);
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz5();
      }), directiveUm(() => {
        zz12(), zz10();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val5) => (openBlock(), createElementBlock("div", oe, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", ne, [createElementVNode("div", re, [createElementVNode("div", ie, [createVNode(PageBreadcrumb)]), val5[11] || (val5[11] = createVNodeWrapper('<div class="page-header-section" data-v-d049d8e2><div class="header-main" data-v-d049d8e2><div class="header-text" data-v-d049d8e2><h1 class="page-title" data-v-d049d8e2>QQ音乐管理</h1><p class="page-subtitle" data-v-d049d8e2>管理QQ音乐账号登录状态</p></div></div></div>', 1)), refVal.value ? (openBlock(), createElementBlock("div", de, [...(val5[1] || (val5[1] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", ue, [createElementVNode("div", ce, [createElementVNode("div", {
        class: normalizeClass(["status-icon", val2.value.class])
      }, [val2.value.status === "normal" ? (openBlock(), createElementBlock("svg", ve, [...(val5[2] || (val5[2] = [createElementVNode("path", {
        d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }, null, -1), createElementVNode("polyline", {
        points: "22 4 12 14.01 9 11.01"
      }, null, -1)]))])) : val2.value.status === "expiring" ? (openBlock(), createElementBlock("svg", fe, [...(val5[3] || (val5[3] = [createElementVNode("path", {
        d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      }, null, -1), createElementVNode("line", {
        x1: "12",
        y1: "9",
        x2: "12",
        y2: "13"
      }, null, -1), createElementVNode("line", {
        x1: "12",
        y1: "17",
        x2: "12.01",
        y2: "17"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", ge, [...(val5[4] || (val5[4] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }, null, -1), createElementVNode("line", {
        x1: "15",
        y1: "9",
        x2: "9",
        y2: "15"
      }, null, -1), createElementVNode("line", {
        x1: "9",
        y1: "9",
        x2: "15",
        y2: "15"
      }, null, -1)]))]))], 2), createElementVNode("div", pe, [createElementVNode("span", {
        class: normalizeClass(["status-label", val2.value.class])
      }, toDisplayString(val2.value.label), 3), createElementVNode("p", me, toDisplayString(val2.value.desc), 1)])]), refVal2.value?.loggedIn ? (openBlock(), createElementBlock("div", he, [createElementVNode("div", ye, [val5[5] || (val5[5] = createElementVNode("span", {
        class: "detail-label"
      }, "用户ID", -1)), createElementVNode("span", ke, toDisplayString(refVal2.value.musicid), 1)]), createElementVNode("div", xe, [val5[6] || (val5[6] = createElementVNode("span", {
        class: "detail-label"
      }, "剩余有效期", -1)), createElementVNode("span", {
        class: normalizeClass(["detail-value", {
          "text-warning": (refVal2.value.remainingSeconds || 0) < 86400
        }])
      }, toDisplayString(zz3(refVal2.value.remainingSeconds)), 3)]), createElementVNode("div", we, [val5[7] || (val5[7] = createElementVNode("span", {
        class: "detail-label"
      }, "过期时间", -1)), createElementVNode("span", _e, toDisplayString(zz4(refVal2.value.expiredAt)), 1)])])) : createCommentVNode("", !0), createElementVNode("div", Ce, [createElementVNode("button", {
        class: "action-button secondary",
        onClick: zz5,
        disabled: refVal.value
      }, [...(val5[8] || (val5[8] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "23 4 23 10 17 10"
      }), createElementVNode("path", {
        d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
      })], -1), createTextVNode(" 刷新状态 ", -1)]))], 8, Qe), createElementVNode("button", {
        class: "action-button primary",
        onClick: zz6
      }, [val5[9] || (val5[9] = createVNodeWrapper('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d049d8e2><rect x="3" y="3" width="7" height="7" data-v-d049d8e2></rect><rect x="14" y="3" width="7" height="7" data-v-d049d8e2></rect><rect x="3" y="14" width="7" height="7" data-v-d049d8e2></rect><rect x="14" y="14" width="7" height="7" data-v-d049d8e2></rect></svg>', 1)), createTextVNode(" " + toDisplayString(refVal2.value?.loggedIn && !refVal2.value?.expired ? "重新登录" : "扫码登录"), 1)])])]), val5[10] || (val5[10] = createVNodeWrapper('<div class="info-card" data-v-d049d8e2><h3 class="info-title" data-v-d049d8e2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d049d8e2><circle cx="12" cy="12" r="10" data-v-d049d8e2></circle><line x1="12" y1="16" x2="12" y2="12" data-v-d049d8e2></line><line x1="12" y1="8" x2="12.01" y2="8" data-v-d049d8e2></line></svg> 使用说明 </h3><ul class="info-list" data-v-d049d8e2><li data-v-d049d8e2>QQ音乐账号用于获取音乐资源，需要保持登录状态</li><li data-v-d049d8e2>登录凭证有效期有限，过期后需要重新扫码登录</li><li data-v-d049d8e2>建议在凭证即将过期时提前刷新登录</li><li data-v-d049d8e2>扫码登录需要使用QQ或QQ音乐APP扫描</li></ul></div>', 1))], 64))])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal3.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz7, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal3.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content qrcode-modal",
            onClick: val5[0] || (val5[0] = withModifiers(() => {}, ["stop"]))
          }, [val5[14] || (val5[14] = createElementVNode("h3", {
            class: "modal-title"
          }, "扫码登录QQ音乐", -1)), val5[15] || (val5[15] = createElementVNode("p", {
            class: "modal-subtitle"
          }, "请使用QQ或QQ音乐APP扫描二维码", -1)), createElementVNode("div", be, [refVal6.value ? (openBlock(), createElementBlock("div", qe, [...(val5[12] || (val5[12] = [createElementVNode("div", {
            class: "loading-spinner"
          }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal4.value ? (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", {
            class: normalizeClass(["qrcode-wrapper", {
              expired: refVal5.value?.code === 65 || refVal5.value?.code === 68
            }])
          }, [createElementVNode("img", {
            src: refVal4.value.qrCodeBase64,
            alt: "QQ音乐登录二维码",
            class: "qrcode-image"
          }, null, 8, Me), refVal5.value?.code === 65 || refVal5.value?.code === 68 ? (openBlock(), createElementBlock("div", Se, [...(val5[13] || (val5[13] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("polyline", {
            points: "23 4 23 10 17 10"
          }), createElementVNode("path", {
            d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
          })], -1), createElementVNode("span", null, "点击刷新", -1)]))])) : createCommentVNode("", !0), refVal5.value?.code === 65 || refVal5.value?.code === 68 ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "qrcode-refresh-click",
            onClick: zz8
          })) : createCommentVNode("", !0)], 2), refVal9.value > 0 && refVal5.value?.code !== 65 ? (openBlock(), createElementBlock("div", Pe, " 二维码有效期：" + toDisplayString(refVal9.value) + "秒 ", 1)) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0)]), createElementVNode("div", {
            class: normalizeClass(["qrcode-status", val4.value])
          }, [refVal5.value?.code === 67 && refVal5.value.avatar ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: refVal5.value.avatar,
            alt: "头像",
            class: "qrcode-avatar"
          }, null, 8, Be)) : createCommentVNode("", !0), createElementVNode("span", null, toDisplayString(val3.value), 1)], 2), createElementVNode("div", Ie, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz7
          }, "取消"), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz8,
            disabled: refVal6.value
          }, toDisplayString(refVal6.value ? "加载中..." : "刷新二维码"), 9, Re)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  $e = withScopeId(Te, [["__scopeId", "data-v-d049d8e2"]]);
/* index 运行时导出（已语义化） */
export { $e as default };