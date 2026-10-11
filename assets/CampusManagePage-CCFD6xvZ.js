/*!
 * 页面模块：校园网管理（CampusManagePage）
 * 路由：/admin/campus   name=admin-campus   层级=2   需登录=是
 * 功能：登录后的「校园网管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampusManagePage-CCFD6xvZ.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http, defineComponent, useUserStore, ref, applyDirectives, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, resolveRaw, Fragment, renderList, toDisplayValue, withSlots, createVNodeWrapper, toDisplayString, normalizeClass, withDirectives, vModelText, withKeys, createCommentVNode, withModifiers, createTextVNode, nextTick, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
function zz0(val) {
  return http.get("/admin/users/search/by-campus-name", {
    params: {
      name: val
    }
  });
}
function zz1(val) {
  return http.get("/admin/users/search/by-campus-account", {
    params: {
      campusAccount: val
    }
  });
}
function zz2(val) {
  return http.get("/admin/users/search/by-user", {
    params: val
  });
}
const rs = {
    class: "campus-manage-page"
  },
  cs = {
    class: "page-content"
  },
  vs = {
    class: "content-container"
  },
  ps = {
    class: "breadcrumb-wrapper"
  },
  ms = {
    class: "search-section"
  },
  _s = {
    class: "search-card"
  },
  fs = {
    class: "search-type-tabs"
  },
  hs = ["onClick"],
  bs = {
    class: "search-inputs-wrapper"
  },
  ys = {
    key: 0,
    class: "search-input-row"
  },
  gs = ["placeholder"],
  ks = ["disabled"],
  xs = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  ws = {
    key: 1,
    class: "btn-spinner"
  },
  Cs = {
    class: "search-fields"
  },
  Is = {
    class: "search-field"
  },
  Bs = {
    class: "search-field"
  },
  Us = {
    class: "search-field"
  },
  Ds = ["disabled"],
  Ts = {
    class: "results-section"
  },
  As = {
    key: 0,
    class: "loading-container"
  },
  Ms = {
    key: 1,
    class: "empty-container"
  },
  Ps = {
    key: 2,
    class: "empty-container"
  },
  Ss = {
    key: 3,
    class: "results-list"
  },
  Ns = {
    class: "results-header"
  },
  Vs = {
    class: "results-count"
  },
  Ks = ["onClick"],
  Ls = {
    class: "user-avatar"
  },
  zs = {
    class: "user-content"
  },
  Fs = {
    class: "user-primary"
  },
  $s = {
    class: "campus-name"
  },
  Gs = {
    class: "campus-class"
  },
  Hs = {
    class: "user-secondary"
  },
  Rs = {
    class: "user-nickname"
  },
  js = {
    class: "user-id"
  },
  Es = {
    class: "user-primary"
  },
  Xs = {
    class: "user-nickname-main"
  },
  qs = {
    class: "user-secondary"
  },
  Js = {
    class: "user-id"
  },
  Os = {
    class: "detail-section"
  },
  Qs = {
    class: "detail-grid"
  },
  Ws = {
    class: "detail-item"
  },
  Ys = {
    class: "detail-value"
  },
  Zs = {
    class: "detail-item"
  },
  se = {
    class: "detail-value"
  },
  ee = {
    class: "detail-item"
  },
  ae = {
    class: "detail-value"
  },
  te = {
    class: "detail-item"
  },
  le = {
    class: "detail-value"
  },
  ne = {
    class: "detail-item"
  },
  ie = {
    class: "detail-item"
  },
  oe = {
    class: "detail-value"
  },
  de = {
    key: 0,
    class: "detail-item full"
  },
  ue = {
    class: "detail-value"
  },
  re = {
    class: "detail-section"
  },
  ce = {
    class: "section-title"
  },
  ve = {
    key: 0,
    class: "detail-grid"
  },
  pe = {
    class: "detail-item"
  },
  me = {
    class: "detail-value"
  },
  _e = {
    class: "detail-item"
  },
  fe = {
    class: "detail-value"
  },
  he = {
    class: "detail-item"
  },
  be = {
    class: "detail-value highlight"
  },
  ye = {
    class: "detail-item"
  },
  ge = {
    class: "detail-value"
  },
  ke = {
    class: "detail-item full"
  },
  xe = {
    class: "detail-value"
  },
  we = {
    class: "detail-item"
  },
  Ce = {
    class: "detail-value"
  },
  Ie = {
    class: "detail-item"
  },
  Be = {
    class: "detail-value"
  },
  Ue = {
    class: "detail-item"
  },
  De = {
    class: "detail-value"
  },
  Te = {
    class: "detail-item"
  },
  Ae = {
    class: "detail-value"
  },
  Me = {
    key: 1,
    class: "unbound-notice"
  },
  Pe = defineComponent({
    __name: "CampusManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref("campus-name"),
        refVal2 = ref(""),
        refVal3 = ref(""),
        refVal4 = ref(""),
        refVal5 = ref(""),
        refVal6 = ref("right"),
        refVal7 = ref(!1),
        refVal8 = ref([]),
        refVal9 = ref(!1),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        refVal12 = ref(null),
        list = [{
          value: "campus-name",
          label: "校园网姓名",
          placeholder: "输入校园网真实姓名..."
        }, {
          value: "campus-account",
          label: "校园网账号",
          placeholder: "输入校园网账号..."
        }, {
          value: "user-info",
          label: "用户信息",
          placeholder: ""
        }],
        val2 = applyDirectives(() => list.findIndex(val1 => val1.value === refVal.value));
      function zz3() {
        return list.find(val1 => val1.value === refVal.value)?.placeholder || "";
      }
      function zz4(val1) {
        const val3 = list.findIndex(val5 => val5.value === val1),
          val4 = val2.value;
        refVal6.value = val3 > val4 ? "right" : "left", refVal7.value = !0, refVal.value = val1, refVal2.value = "", refVal3.value = "", refVal4.value = "", refVal5.value = "", refVal8.value = [], refVal10.value = !1, nextTick(() => {
          setTimeout(() => {
            refVal7.value = !1;
          }, 250);
        });
      }
      async function zz5() {
        if (refVal.value === "campus-name" || refVal.value === "campus-account") {
          if (!refVal2.value.trim()) {
            useToast1.warning("请输入搜索关键词");
            return;
          }
        } else if (refVal.value === "user-info" && !refVal3.value.trim() && !refVal4.value.trim() && !refVal5.value.trim()) {
          useToast1.warning("请至少输入一个搜索条件");
          return;
        }
        refVal9.value = !0, refVal10.value = !0;
        try {
          let val1;
          if (refVal.value === "campus-name") val1 = await zz0(refVal2.value.trim());else if (refVal.value === "campus-account") val1 = await zz1(refVal2.value.trim());else {
            const obj = {};
            if (refVal3.value.trim()) {
              const int = parseInt(refVal3.value.trim());
              isNaN(int) || (obj.userId = int);
            }
            refVal4.value.trim() && (obj.username = refVal4.value.trim()), refVal5.value.trim() && (obj.nickname = refVal5.value.trim()), val1 = await zz2(obj);
          }
          val1.data.code === 200 ? (refVal8.value = val1.data.data, refVal8.value.length === 0 && useToast1.info("未找到匹配的用户")) : (useToast1.error(val1.data.message || "搜索失败"), refVal8.value = []);
        } catch {
          useToast1.error("搜索失败"), refVal8.value = [];
        } finally {
          refVal9.value = !1;
        }
      }
      function zz6(val1) {
        refVal12.value = val1, refVal11.value = !0;
      }
      function zz7() {
        refVal11.value = !1, refVal12.value = null;
      }
      function zz8(val1) {
        return val1 ? new Date(val1).toLocaleString("zh-CN") : "-";
      }
      function zz9(val1) {
        switch (val1) {
          case 1:
            return "男";
          case 2:
            return "女";
          default:
            return "未设置";
        }
      }
      function zz10(val1) {
        return val1 === 1 ? "正常" : "禁用";
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageUsers) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", rs, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", cs, [createElementVNode("div", vs, [createElementVNode("div", ps, [createVNode(PageBreadcrumb)]), createElementVNode("div", ms, [createElementVNode("div", _s, [createElementVNode("div", fs, [createElementVNode("div", {
        class: "tabs-indicator",
        style: resolveRaw({
          transform: `translateX(${val2.value * 100}%)`
        })
      }, null, 4), (openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("button", {
        key: val4.value,
        class: normalizeClass(["search-type-tab", {
          active: refVal.value === val4.value
        }]),
        onClick: val5 => zz4(val4.value)
      }, toDisplayString(val4.label), 11, hs)), 64))]), createElementVNode("div", bs, [createVNode(withSlots, {
        name: refVal6.value === "right" ? "slide-right" : "slide-left",
        mode: "out-in"
      }, {
        default: toDisplayValue(() => [(openBlock(), createElementBlock("div", {
          class: "search-inputs",
          key: refVal.value
        }, [refVal.value === "campus-name" || refVal.value === "campus-account" ? (openBlock(), createElementBlock("div", ys, [withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val3[0] || (val3[0] = val4 => refVal2.value = val4),
          type: "text",
          class: "search-input",
          placeholder: zz3(),
          onKeyup: withKeys(zz5, ["enter"])
        }, null, 40, gs), [[vModelText, refVal2.value]]), createElementVNode("button", {
          class: "search-btn",
          disabled: refVal9.value,
          onClick: zz5
        }, [refVal9.value ? (openBlock(), createElementBlock("span", ws)) : (openBlock(), createElementBlock("svg", xs, [...(val3[5] || (val3[5] = [createElementVNode("circle", {
          cx: "11",
          cy: "11",
          r: "8"
        }, null, -1), createElementVNode("line", {
          x1: "21",
          y1: "21",
          x2: "16.65",
          y2: "16.65"
        }, null, -1)]))]))], 8, ks)])) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createElementVNode("div", Cs, [createElementVNode("div", Is, [val3[6] || (val3[6] = createElementVNode("label", {
          class: "field-label"
        }, "用户ID", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val3[1] || (val3[1] = val4 => refVal3.value = val4),
          type: "text",
          class: "field-input",
          placeholder: "精确匹配",
          onKeyup: withKeys(zz5, ["enter"])
        }, null, 544), [[vModelText, refVal3.value]])]), createElementVNode("div", Bs, [val3[7] || (val3[7] = createElementVNode("label", {
          class: "field-label"
        }, "用户名", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val3[2] || (val3[2] = val4 => refVal4.value = val4),
          type: "text",
          class: "field-input",
          placeholder: "模糊搜索",
          onKeyup: withKeys(zz5, ["enter"])
        }, null, 544), [[vModelText, refVal4.value]])]), createElementVNode("div", Us, [val3[8] || (val3[8] = createElementVNode("label", {
          class: "field-label"
        }, "昵称", -1)), withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val3[3] || (val3[3] = val4 => refVal5.value = val4),
          type: "text",
          class: "field-input",
          placeholder: "模糊搜索",
          onKeyup: withKeys(zz5, ["enter"])
        }, null, 544), [[vModelText, refVal5.value]])])]), createElementVNode("button", {
          class: "search-btn-full",
          disabled: refVal9.value,
          onClick: zz5
        }, toDisplayString(refVal9.value ? "搜索中..." : "搜索"), 9, Ds)], 64))]))]),
        _: 1
      }, 8, ["name"])])])]), createElementVNode("div", Ts, [refVal9.value ? (openBlock(), createElementBlock("div", As, [...(val3[9] || (val3[9] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "搜索中...", -1)]))])) : refVal10.value && refVal8.value.length === 0 ? (openBlock(), createElementBlock("div", Ms, [...(val3[10] || (val3[10] = [createElementVNode("svg", {
        class: "empty-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), createElementVNode("line", {
        x1: "21",
        y1: "21",
        x2: "16.65",
        y2: "16.65"
      })], -1), createElementVNode("p", null, "未找到匹配的用户", -1)]))])) : refVal10.value ? (openBlock(), createElementBlock("div", Ss, [createElementVNode("div", Ns, [createElementVNode("span", Vs, "找到 " + toDisplayString(refVal8.value.length) + " 个用户", 1)]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal8.value, val4 => (openBlock(), createElementBlock("div", {
        key: val4.userId,
        class: "user-card",
        onClick: val5 => zz6(val4)
      }, [createElementVNode("div", Ls, toDisplayString(val4.hasCampusBinding ? val4.name?.charAt(0) : val4.nickname?.charAt(0) || val4.username?.charAt(0) || "?"), 1), createElementVNode("div", zs, [val4.hasCampusBinding ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("div", Fs, [createElementVNode("span", $s, toDisplayString(val4.name), 1), val3[12] || (val3[12] = createElementVNode("span", {
        class: "campus-badge bound"
      }, "已绑定", -1))]), createElementVNode("div", Gs, toDisplayString(val4.classAlias), 1), createElementVNode("div", Hs, [createElementVNode("span", Rs, toDisplayString(val4.nickname), 1), val3[13] || (val3[13] = createElementVNode("span", {
        class: "user-divider"
      }, "·", -1)), createElementVNode("span", js, "ID: " + toDisplayString(val4.userId), 1)])], 64)) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Es, [createElementVNode("span", Xs, toDisplayString(val4.nickname || val4.username), 1), val3[14] || (val3[14] = createElementVNode("span", {
        class: "campus-badge unbound"
      }, "未绑定", -1))]), createElementVNode("div", qs, [createElementVNode("span", Js, "ID: " + toDisplayString(val4.userId), 1), val3[15] || (val3[15] = createElementVNode("span", {
        class: "user-divider"
      }, "·", -1)), createElementVNode("span", {
        class: normalizeClass(["user-status", {
          disabled: val4.status !== 1
        }])
      }, toDisplayString(zz10(val4.status)), 3)])], 64))]), val3[16] || (val3[16] = createElementVNode("svg", {
        class: "user-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1))], 8, Ks))), 128))])) : (openBlock(), createElementBlock("div", Ps, [...(val3[11] || (val3[11] = [createVNodeWrapper('<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-65760fb5><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-v-65760fb5></path><circle cx="9" cy="7" r="4" data-v-65760fb5></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-v-65760fb5></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-v-65760fb5></path></svg><p data-v-65760fb5>输入关键词搜索用户校园网绑定信息</p>', 2)]))]))])])]), createVNode(PageFooter), createVNode(withSlots, {
        name: "drawer-fade"
      }, {
        default: toDisplayValue(() => [refVal11.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: zz7
        }, [createVNode(withSlots, {
          name: "drawer-slide"
        }, {
          default: toDisplayValue(() => [refVal11.value && refVal12.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "drawer-content",
            onClick: val3[4] || (val3[4] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("div", {
            class: "drawer-header"
          }, [val3[18] || (val3[18] = createElementVNode("h3", {
            class: "drawer-title"
          }, "用户详情", -1)), createElementVNode("button", {
            class: "drawer-close",
            onClick: zz7
          }, [...(val3[17] || (val3[17] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", Os, [val3[26] || (val3[26] = createElementVNode("h4", {
            class: "section-title"
          }, "账号信息", -1)), createElementVNode("div", Qs, [createElementVNode("div", Ws, [val3[19] || (val3[19] = createElementVNode("span", {
            class: "detail-label"
          }, "用户ID", -1)), createElementVNode("span", Ys, toDisplayString(refVal12.value.userId), 1)]), createElementVNode("div", Zs, [val3[20] || (val3[20] = createElementVNode("span", {
            class: "detail-label"
          }, "用户名", -1)), createElementVNode("span", se, toDisplayString(refVal12.value.username), 1)]), createElementVNode("div", ee, [val3[21] || (val3[21] = createElementVNode("span", {
            class: "detail-label"
          }, "昵称", -1)), createElementVNode("span", ae, toDisplayString(refVal12.value.nickname), 1)]), createElementVNode("div", te, [val3[22] || (val3[22] = createElementVNode("span", {
            class: "detail-label"
          }, "性别", -1)), createElementVNode("span", le, toDisplayString(zz9(refVal12.value.gender)), 1)]), createElementVNode("div", ne, [val3[23] || (val3[23] = createElementVNode("span", {
            class: "detail-label"
          }, "状态", -1)), createElementVNode("span", {
            class: normalizeClass(["detail-value", {
              "status-disabled": refVal12.value.status !== 1
            }])
          }, toDisplayString(zz10(refVal12.value.status)), 3)]), createElementVNode("div", ie, [val3[24] || (val3[24] = createElementVNode("span", {
            class: "detail-label"
          }, "注册时间", -1)), createElementVNode("span", oe, toDisplayString(zz8(refVal12.value.userCreatedAt)), 1)]), refVal12.value.signature ? (openBlock(), createElementBlock("div", de, [val3[25] || (val3[25] = createElementVNode("span", {
            class: "detail-label"
          }, "个性签名", -1)), createElementVNode("span", ue, toDisplayString(refVal12.value.signature), 1)])) : createCommentVNode("", !0)])]), createElementVNode("div", re, [createElementVNode("h4", ce, [val3[27] || (val3[27] = createTextVNode(" 校园网绑定 ", -1)), createElementVNode("span", {
            class: normalizeClass(["binding-status", {
              bound: refVal12.value.hasCampusBinding
            }])
          }, toDisplayString(refVal12.value.hasCampusBinding ? "已绑定" : "未绑定"), 3)]), refVal12.value.hasCampusBinding ? (openBlock(), createElementBlock("div", ve, [createElementVNode("div", pe, [val3[28] || (val3[28] = createElementVNode("span", {
            class: "detail-label"
          }, "绑定ID", -1)), createElementVNode("span", me, toDisplayString(refVal12.value.campusBindingId), 1)]), createElementVNode("div", _e, [val3[29] || (val3[29] = createElementVNode("span", {
            class: "detail-label"
          }, "校园网账号", -1)), createElementVNode("span", fe, toDisplayString(refVal12.value.campusAccount), 1)]), createElementVNode("div", he, [val3[30] || (val3[30] = createElementVNode("span", {
            class: "detail-label"
          }, "真实姓名", -1)), createElementVNode("span", be, toDisplayString(refVal12.value.name), 1)]), createElementVNode("div", ye, [val3[31] || (val3[31] = createElementVNode("span", {
            class: "detail-label"
          }, "学号", -1)), createElementVNode("span", ge, toDisplayString(refVal12.value.studentId || "-"), 1)]), createElementVNode("div", ke, [val3[32] || (val3[32] = createElementVNode("span", {
            class: "detail-label"
          }, "班级", -1)), createElementVNode("span", xe, toDisplayString(refVal12.value.classAlias || "-"), 1)]), createElementVNode("div", we, [val3[33] || (val3[33] = createElementVNode("span", {
            class: "detail-label"
          }, "手机号", -1)), createElementVNode("span", Ce, toDisplayString(refVal12.value.mobilePhone || "-"), 1)]), createElementVNode("div", Ie, [val3[34] || (val3[34] = createElementVNode("span", {
            class: "detail-label"
          }, "校区", -1)), createElementVNode("span", Be, toDisplayString(refVal12.value.address || "-"), 1)]), createElementVNode("div", Ue, [val3[35] || (val3[35] = createElementVNode("span", {
            class: "detail-label"
          }, "绑定时间", -1)), createElementVNode("span", De, toDisplayString(zz8(refVal12.value.campusBindingCreatedAt)), 1)]), createElementVNode("div", Te, [val3[36] || (val3[36] = createElementVNode("span", {
            class: "detail-label"
          }, "更新时间", -1)), createElementVNode("span", Ae, toDisplayString(zz8(refVal12.value.campusBindingUpdatedAt)), 1)])])) : (openBlock(), createElementBlock("div", Me, [...(val3[37] || (val3[37] = [createElementVNode("svg", {
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
            y2: "12"
          }), createElementVNode("line", {
            x1: "12",
            y1: "16",
            x2: "12.01",
            y2: "16"
          })], -1), createElementVNode("span", null, "该用户尚未绑定校园网账号", -1)]))]))])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Le = withScopeId(Pe, [["__scopeId", "data-v-65760fb5"]]);
/* index 运行时导出（已语义化） */
export { Le as default };