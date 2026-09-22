/*!
 * 页面模块：设计系统（DesignSystemPage）
 * 路由：/design-system   name=design-system   层级=1   需登录=否
 * 功能：公开的「设计系统」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/DesignSystemPage-CaPC67ZG.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, onMounted, directiveUm, createElementBlock, createElementVNode, createBlock, toDisplayString, createVNodeWrapper, Fragment, renderList, withDirectives, vModelText, withModifiers, createVNode, normalizeClass, toDisplayValue, withSlots, deepWatchOptions, directiveCreated, resolveRaw, createCommentVNode, createTextVNode, TransitionGroup, Teleport, nextTick, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const Ua = {
    class: "design-system"
  },
  za = {
    class: "header"
  },
  Ha = {
    class: "header-content"
  },
  Oa = {
    class: "main"
  },
  Ra = {
    class: "section"
  },
  Xa = {
    class: "color-group"
  },
  qa = {
    class: "color-scroll"
  },
  Ga = {
    class: "color-info"
  },
  Ya = {
    class: "color-name"
  },
  Za = {
    class: "color-value"
  },
  Ja = {
    class: "color-group"
  },
  Ka = {
    class: "color-scroll"
  },
  Wa = {
    class: "color-info"
  },
  ja = {
    class: "color-name"
  },
  Qa = {
    class: "color-value"
  },
  _a = {
    class: "color-group"
  },
  as = {
    class: "color-scroll"
  },
  ss = {
    class: "color-info"
  },
  ts = {
    class: "color-name"
  },
  ls = {
    class: "color-value"
  },
  es = {
    class: "color-group"
  },
  ds = {
    class: "color-scroll"
  },
  os = {
    class: "color-info"
  },
  ns = {
    class: "color-name"
  },
  is = {
    class: "color-value"
  },
  vs = {
    class: "section"
  },
  cs = {
    class: "card"
  },
  rs = {
    class: "form-group"
  },
  us = {
    class: "card"
  },
  bs = {
    class: "form-group"
  },
  ps = {
    class: "custom-select-value"
  },
  ms = {
    key: 0,
    class: "custom-select-dropdown"
  },
  gs = ["onClick"],
  ks = {
    key: 0,
    class: "custom-select-check"
  },
  fs = {
    class: "card"
  },
  ys = {
    class: "toggle-group"
  },
  ws = {
    class: "toggle-item"
  },
  hs = ["aria-checked"],
  Cs = {
    class: "toggle-item"
  },
  xs = ["aria-checked"],
  $s = {
    class: "card"
  },
  Bs = {
    class: "toggle-group"
  },
  Ms = {
    class: "toggle-item"
  },
  Ts = ["aria-checked"],
  Vs = {
    class: "toggle-item"
  },
  Fs = ["aria-checked"],
  Ss = {
    class: "card"
  },
  Ps = {
    class: "check-group"
  },
  Ds = {
    class: "checkbox-label"
  },
  Es = {
    class: "card"
  },
  Ls = {
    class: "check-group"
  },
  As = {
    class: "radio-label"
  },
  Ns = {
    class: "radio-label"
  },
  Is = {
    class: "radio-label"
  },
  Us = {
    class: "section"
  },
  zs = {
    class: "card"
  },
  Hs = ["onClick"],
  Os = {
    class: "section"
  },
  Rs = {
    class: "card"
  },
  Xs = {
    class: "button-group"
  },
  qs = {
    class: "section"
  },
  Gs = {
    class: "card"
  },
  Ys = {
    class: "button-grid"
  },
  Zs = {
    class: "section"
  },
  Js = {
    class: "card"
  },
  Ks = {
    class: "button-grid"
  },
  Ws = {
    class: "section"
  },
  js = {
    class: "card"
  },
  Qs = {
    class: "button-group"
  },
  _s = {
    class: "section"
  },
  at = {
    class: "card"
  },
  st = {
    class: "section"
  },
  tt = {
    class: "card"
  },
  lt = {
    class: "progress-demos"
  },
  et = {
    class: "progress-item"
  },
  dt = {
    class: "progress-bar"
  },
  ot = {
    class: "progress-text"
  },
  nt = {
    class: "progress-controls"
  },
  it = {
    class: "card"
  },
  vt = {
    class: "progress-circle-demos"
  },
  ct = {
    class: "progress-circle-text"
  },
  rt = {
    class: "section"
  },
  ut = {
    class: "card"
  },
  bt = {
    class: "tabs"
  },
  pt = {
    class: "tabs-nav"
  },
  mt = ["onClick"],
  gt = {
    class: "tabs-content"
  },
  kt = {
    key: 0,
    class: "tabs-pane"
  },
  ft = {
    key: 1,
    class: "tabs-pane"
  },
  yt = {
    key: 2,
    class: "tabs-pane"
  },
  wt = {
    class: "section"
  },
  ht = {
    class: "collapse-list"
  },
  Ct = {
    class: "section"
  },
  xt = {
    class: "card"
  },
  $t = {
    class: "popover-wrapper"
  },
  Bt = {
    key: 0,
    class: "popover"
  },
  Mt = {
    class: "popover-footer"
  },
  Tt = {
    class: "section"
  },
  Vt = {
    class: "card table-card"
  },
  Ft = {
    class: "table-wrapper"
  },
  St = {
    class: "table"
  },
  Pt = {
    class: "section"
  },
  Dt = {
    class: "card"
  },
  Et = {
    class: "steps"
  },
  Lt = {
    class: "step-icon"
  },
  At = {
    class: "step-icon"
  },
  Nt = {
    class: "steps-controls"
  },
  It = ["disabled"],
  Ut = ["disabled"],
  zt = {
    class: "section"
  },
  Ht = {
    class: "card"
  },
  Ot = {
    key: 0,
    class: "dropdown-menu"
  },
  Rt = {
    class: "section"
  },
  Xt = {
    class: "card"
  },
  qt = {
    class: "pagination"
  },
  Gt = ["disabled"],
  Yt = ["onClick"],
  Zt = ["disabled"],
  Jt = {
    class: "pagination-info"
  },
  Kt = {
    class: "section"
  },
  Wt = {
    class: "card"
  },
  jt = {
    class: "slider-demo"
  },
  Qt = {
    class: "slider-value"
  },
  _t = {
    class: "section"
  },
  al = {
    class: "card"
  },
  sl = {
    class: "rate"
  },
  tl = ["onClick", "onMouseenter"],
  ll = {
    class: "rate-text"
  },
  el = {
    class: "section"
  },
  dl = {
    class: "card swiper-card"
  },
  ol = {
    class: "swiper"
  },
  nl = {
    class: "swiper-dots"
  },
  il = ["onClick"],
  vl = {
    class: "section"
  },
  cl = {
    class: "card"
  },
  rl = {
    class: "image-grid"
  },
  ul = {
    class: "toast-container"
  },
  bl = {
    class: "toast-icon"
  },
  pl = {
    class: "toast-message"
  },
  ml = {
    class: "notification-container"
  },
  gl = {
    class: "notification-icon"
  },
  kl = {
    class: "notification-content"
  },
  fl = {
    class: "notification-title"
  },
  yl = {
    class: "notification-message"
  },
  wl = ["onClick"],
  hl = {
    class: "modal"
  },
  Cl = {
    class: "modal-header"
  },
  xl = {
    class: "modal-footer"
  },
  $l = {
    class: "modal modal-confirm"
  },
  Bl = {
    class: "modal-confirm-actions"
  },
  Ml = {
    class: "drawer-header"
  },
  Tl = {
    class: "drawer-title"
  },
  Vl = {
    key: 0,
    class: "actionsheet"
  },
  Fl = {
    class: "actionsheet-content"
  },
  Sl = {
    key: 0,
    class: "loading-overlay"
  },
  Pl = {
    class: "bottom-nav"
  },
  DesignSystemPageConst0 = 10,
  Dl = defineComponent({
    __name: "DesignSystemPage",
    setup(val) {
      const refVal = ref(document.documentElement.classList.contains("dark")),
        refVal2 = ref("home");
      function zz0() {
        refVal.value = !refVal.value, document.documentElement.classList.toggle("dark", refVal.value);
      }
      const list = [{
          name: "主色",
          var: "--color-primary",
          value: "#E74C3C"
        }, {
          name: "主色-浅",
          var: "--color-primary-light",
          value: "#FF6B6B"
        }, {
          name: "主色-深",
          var: "--color-primary-dark",
          value: "#C0392B"
        }, {
          name: "主色-背景",
          var: "--color-primary-bg",
          value: "rgba(231, 76, 60, 0.08)"
        }],
        list2 = [{
          name: "辅助色",
          var: "--color-secondary",
          value: "#06B6D4"
        }, {
          name: "辅助色-浅",
          var: "--color-secondary-light",
          value: "#22D3EE"
        }, {
          name: "强调色",
          var: "--color-accent",
          value: "#F59E0B"
        }],
        list3 = [{
          name: "背景色",
          var: "--color-bg",
          value: "#F9FAFB"
        }, {
          name: "卡片色",
          var: "--color-card",
          value: "#FFFFFF"
        }, {
          name: "边框色",
          var: "--color-border",
          value: "#E5E7EB"
        }, {
          name: "主文字",
          var: "--color-text",
          value: "#1F2937"
        }, {
          name: "次要文字",
          var: "--color-text-secondary",
          value: "#6B7280"
        }, {
          name: "占位符",
          var: "--color-text-placeholder",
          value: "#9CA3AF"
        }],
        list4 = [{
          name: "成功",
          var: "--color-success",
          value: "#10B981"
        }, {
          name: "警告",
          var: "--color-warning",
          value: "#F59E0B"
        }, {
          name: "错误",
          var: "--color-error",
          value: "#EF4444"
        }, {
          name: "信息",
          var: "--color-info",
          value: "#3B82F6"
        }],
        refVal3 = ref(""),
        refVal4 = ref(!1),
        refVal5 = ref("option1"),
        refVal6 = ref(!0),
        refVal7 = ref(!1),
        list5 = [{
          value: "",
          label: "请选择社团"
        }, {
          value: "1",
          label: "技术部"
        }, {
          value: "2",
          label: "宣传部"
        }, {
          value: "3",
          label: "文艺部"
        }, {
          value: "4",
          label: "体育部"
        }, {
          value: "5",
          label: "外联部"
        }],
        refVal8 = ref(""),
        refVal9 = ref(!1),
        val2 = applyDirectives(() => list5.find(val1 => val1.value === refVal8.value)?.label || "请选择社团");
      function zz1(val1) {
        refVal8.value = val1, refVal9.value = !1;
      }
      function zz2() {
        refVal9.value = !refVal9.value;
      }
      const list6 = [{
          key: "home",
          label: "首页"
        }, {
          key: "activity",
          label: "活动"
        }, {
          key: "mine",
          label: "我的"
        }],
        refVal10 = ref(null),
        refVal11 = ref({
          left: "0px",
          width: "0px"
        });
      function zz3() {
        nextTick(() => {
          if (!refVal10.value) return;
          const selector = refVal10.value.querySelector(".segment-btn.active");
          selector && (refVal11.value = {
            left: `${selector.offsetLeft}px`,
            width: `${selector.offsetWidth}px`
          });
        });
      }
      function zz4(val1) {
        refVal2.value = val1, zz3();
      }
      onMounted(() => {
        zz3(), window.addEventListener("resize", zz3);
      }), directiveUm(() => {
        window.removeEventListener("resize", zz3);
      });
      const refVal12 = ref(!1),
        refVal13 = ref(!1),
        refVal14 = ref([]);
      let num = 0;
      function zz5(val1, zz6 = "info") {
        const val4 = ++num;
        refVal14.value.push({
          id: val4,
          message: val1,
          type: zz6
        }), setTimeout(() => {
          refVal14.value = refVal14.value.filter(val5 => val5.id !== val4);
        }, 3e3);
      }
      const refVal15 = ref(!1),
        refVal16 = ref("right");
      function zz7(val1) {
        refVal16.value = val1, refVal15.value = !0;
      }
      const refVal17 = ref(!1);
      function zz8() {
        refVal17.value = !0, setTimeout(() => {
          refVal17.value = !1;
        }, 2e3);
      }
      const refVal18 = ref(65),
        refVal19 = ref("tab1"),
        list7 = [{
          key: "tab1",
          label: "全部活动"
        }, {
          key: "tab2",
          label: "进行中"
        }, {
          key: "tab3",
          label: "已结束"
        }],
        refVal20 = ref(["panel1"]);
      function zz9(val1) {
        const val3 = refVal20.value.indexOf(val1);
        val3 > -1 ? refVal20.value.splice(val3, 1) : refVal20.value.push(val1);
      }
      const refVal21 = ref(!1),
        refVal22 = ref(1),
        refVal23 = ref(!1),
        refVal24 = ref(1);
      function zz10(val1) {
        val1 >= 1 && val1 <= DesignSystemPageConst0 && (refVal24.value = val1);
      }
      const refVal25 = ref(50),
        refVal26 = ref(3),
        refVal27 = ref(0),
        refVal28 = ref(!1),
        refVal29 = ref([]);
      let num2 = 0;
      function zz11(val1, val3, zz12 = "info") {
        const val5 = ++num2;
        refVal29.value.push({
          id: val5,
          title: val1,
          message: val3,
          type: zz12
        }), setTimeout(() => {
          refVal29.value = refVal29.value.filter(val6 => val6.id !== val5);
        }, 5e3);
      }
      function zz13(val1) {
        refVal29.value = refVal29.value.filter(val3 => val3.id !== val1);
      }
      const refVal30 = ref(0),
        list8 = ["轮播图 1", "轮播图 2", "轮播图 3"];
      function zz14() {
        refVal30.value = (refVal30.value + 1) % list8.length;
      }
      function zz15() {
        refVal30.value = (refVal30.value - 1 + list8.length) % list8.length;
      }
      const refVal31 = ref(!1),
        list9 = [{
          id: 1,
          name: "张三",
          department: "技术部",
          status: "在线"
        }, {
          id: 2,
          name: "李四",
          department: "宣传部",
          status: "忙碌"
        }, {
          id: 3,
          name: "王五",
          department: "文艺部",
          status: "离线"
        }];
      return /* 渲染函数：构建组件模板 DOM 结构 */(val1, val3) => (openBlock(), createElementBlock("div", Ua, [createElementVNode("header", za, [createElementVNode("div", Ha, [val3[64] || (val3[64] = createElementVNode("h1", {
        class: "title"
      }, "XMYZ Club", -1)), val3[65] || (val3[65] = createElementVNode("p", {
        class: "subtitle"
      }, "设计规范 v1.0", -1)), createElementVNode("button", {
        class: "btn btn-secondary btn-touch",
        onClick: zz0
      }, toDisplayString(refVal.value ? "亮色模式" : "暗色模式"), 1)])]), createElementVNode("main", Oa, [createElementVNode("section", Ra, [val3[70] || (val3[70] = createElementVNode("h2", {
        class: "section-title"
      }, "颜色系统", -1)), createElementVNode("div", Xa, [val3[66] || (val3[66] = createElementVNode("h3", {
        class: "group-title"
      }, "主色系", -1)), createElementVNode("div", qa, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val4 => createElementVNode("div", {
        key: val4.var,
        class: "color-card"
      }, [createElementVNode("div", {
        class: "color-preview",
        style: resolveRaw({
          backgroundColor: `var(${val4.var})`
        })
      }, null, 4), createElementVNode("div", Ga, [createElementVNode("span", Ya, toDisplayString(val4.name), 1), createElementVNode("code", Za, toDisplayString(val4.value), 1)])])), 64))])]), createElementVNode("div", Ja, [val3[67] || (val3[67] = createElementVNode("h3", {
        class: "group-title"
      }, "辅助色系", -1)), createElementVNode("div", Ka, [(openBlock(), createElementBlock(Fragment, null, renderList(list2, val4 => createElementVNode("div", {
        key: val4.var,
        class: "color-card"
      }, [createElementVNode("div", {
        class: "color-preview",
        style: resolveRaw({
          backgroundColor: `var(${val4.var})`
        })
      }, null, 4), createElementVNode("div", Wa, [createElementVNode("span", ja, toDisplayString(val4.name), 1), createElementVNode("code", Qa, toDisplayString(val4.value), 1)])])), 64))])]), createElementVNode("div", _a, [val3[68] || (val3[68] = createElementVNode("h3", {
        class: "group-title"
      }, "中性色", -1)), createElementVNode("div", as, [(openBlock(), createElementBlock(Fragment, null, renderList(list3, val4 => createElementVNode("div", {
        key: val4.var,
        class: "color-card"
      }, [createElementVNode("div", {
        class: "color-preview",
        style: resolveRaw({
          backgroundColor: `var(${val4.var})`
        })
      }, null, 4), createElementVNode("div", ss, [createElementVNode("span", ts, toDisplayString(val4.name), 1), createElementVNode("code", ls, toDisplayString(val4.value), 1)])])), 64))])]), createElementVNode("div", es, [val3[69] || (val3[69] = createElementVNode("h3", {
        class: "group-title"
      }, "状态色", -1)), createElementVNode("div", ds, [(openBlock(), createElementBlock(Fragment, null, renderList(list4, val4 => createElementVNode("div", {
        key: val4.var,
        class: "color-card"
      }, [createElementVNode("div", {
        class: "color-preview",
        style: resolveRaw({
          backgroundColor: `var(${val4.var})`
        })
      }, null, 4), createElementVNode("div", os, [createElementVNode("span", ns, toDisplayString(val4.name), 1), createElementVNode("code", is, toDisplayString(val4.value), 1)])])), 64))])])]), val3[157] || (val3[157] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>排版系统</h2><div class="card" data-v-7ad470a9><div class="typography-demo" data-v-7ad470a9><h1 class="demo-h1" data-v-7ad470a9>H1 厦门一中</h1><h2 class="demo-h2" data-v-7ad470a9>H2 学生社区</h2><h3 class="demo-h3" data-v-7ad470a9>H3 社团活动公告</h3><h4 class="demo-h4" data-v-7ad470a9>H4 最新动态</h4><p class="demo-body" data-v-7ad470a9>正文 - 厦门一中学生社区是一个面向全校学生的综合性平台。</p><p class="demo-secondary" data-v-7ad470a9>次要文字 - 本平台由学生会技术部维护</p><p class="demo-small" data-v-7ad470a9>小字 - 更新于 2024年1月</p></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>按钮组件</h2><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>基础按钮</h3><div class="button-stack" data-v-7ad470a9><button class="btn btn-primary btn-block btn-touch" data-v-7ad470a9>主要按钮</button><button class="btn btn-secondary btn-block btn-touch" data-v-7ad470a9>次要按钮</button><button class="btn btn-outline btn-block btn-touch" data-v-7ad470a9>描边按钮</button></div><div class="button-group" data-v-7ad470a9><button class="btn btn-ghost btn-touch" data-v-7ad470a9>幽灵按钮</button><button class="btn btn-link btn-touch" data-v-7ad470a9>链接按钮</button></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>状态按钮</h3><div class="button-grid" data-v-7ad470a9><button class="btn btn-success btn-touch" data-v-7ad470a9>成功</button><button class="btn btn-warning btn-touch" data-v-7ad470a9>警告</button><button class="btn btn-error btn-touch" data-v-7ad470a9>错误</button><button class="btn btn-info btn-touch" data-v-7ad470a9>信息</button></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>按钮尺寸</h3><div class="button-stack" data-v-7ad470a9><button class="btn btn-primary btn-sm btn-block" data-v-7ad470a9>小按钮 (sm)</button><button class="btn btn-primary btn-block btn-touch" data-v-7ad470a9>默认按钮</button><button class="btn btn-primary btn-lg btn-block" data-v-7ad470a9>大按钮 (lg)</button></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>特殊按钮</h3><div class="button-group" data-v-7ad470a9><button class="btn btn-primary btn-rounded btn-touch" data-v-7ad470a9>圆角按钮</button><button class="btn btn-primary btn-icon btn-touch" data-v-7ad470a9>+</button><button class="btn btn-secondary btn-icon btn-touch" data-v-7ad470a9><span class="icon-heart" data-v-7ad470a9></span></button></div></div></section>', 2)), createElementVNode("section", vs, [val3[100] || (val3[100] = createElementVNode("h2", {
        class: "section-title"
      }, "表单组件", -1)), createElementVNode("div", cs, [val3[72] || (val3[72] = createElementVNode("h3", {
        class: "card-title"
      }, "输入框", -1)), createElementVNode("div", rs, [val3[71] || (val3[71] = createElementVNode("label", {
        class: "form-label"
      }, "用户名", -1)), withDirectives(createElementVNode("input", {
        type: "text",
        class: "form-input",
        placeholder: "请输入用户名...",
        "onUpdate:modelValue": val3[0] || (val3[0] = val4 => refVal3.value = val4)
      }, null, 512), [[vModelText, refVal3.value]])]), val3[73] || (val3[73] = createVNodeWrapper('<div class="form-group" data-v-7ad470a9><label class="form-label" data-v-7ad470a9>密码</label><input type="password" class="form-input" placeholder="请输入密码..." data-v-7ad470a9></div><div class="form-group" data-v-7ad470a9><label class="form-label" data-v-7ad470a9>错误状态</label><input type="text" class="form-input form-input-error" placeholder="请输入正确的内容" data-v-7ad470a9><span class="form-error" data-v-7ad470a9>请输入有效的邮箱地址</span></div>', 2))]), val3[101] || (val3[101] = createVNodeWrapper('<div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>文本域</h3><div class="form-group" data-v-7ad470a9><label class="form-label" data-v-7ad470a9>活动描述</label><textarea class="form-textarea" placeholder="请输入详细描述..." rows="4" data-v-7ad470a9></textarea></div></div>', 1)), createElementVNode("div", us, [val3[76] || (val3[76] = createElementVNode("h3", {
        class: "card-title"
      }, "选择框", -1)), createElementVNode("div", bs, [val3[75] || (val3[75] = createElementVNode("label", {
        class: "form-label"
      }, "选择社团", -1)), createElementVNode("div", {
        class: "custom-select",
        onClick: val3[1] || (val3[1] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("button", {
        class: normalizeClass(["custom-select-trigger", {
          "is-open": refVal9.value,
          "has-value": refVal8.value
        }]),
        onClick: zz2
      }, [createElementVNode("span", ps, toDisplayString(val2.value), 1), val3[74] || (val3[74] = createElementVNode("span", {
        class: "custom-select-arrow"
      }, null, -1))], 2), createVNode(withSlots, {
        name: "dropdown"
      }, {
        default: toDisplayValue(() => [refVal9.value ? (openBlock(), createElementBlock("div", ms, [(openBlock(), createElementBlock(Fragment, null, renderList(list5, val4 => createElementVNode("div", {
          key: val4.value,
          class: normalizeClass(["custom-select-option", {
            "is-selected": refVal8.value === val4.value,
            "is-placeholder": !val4.value
          }]),
          onClick: val5 => zz1(val4.value)
        }, [createElementVNode("span", null, toDisplayString(val4.label), 1), refVal8.value === val4.value ? (openBlock(), createElementBlock("span", ks, "✓")) : createCommentVNode("", !0)], 10, gs)), 64))])) : createCommentVNode("", !0)]),
        _: 1
      })])]), val3[77] || (val3[77] = createVNodeWrapper('<div class="form-group" data-v-7ad470a9><label class="form-label" data-v-7ad470a9>多选标签</label><div class="select-tags" data-v-7ad470a9><span class="select-tag" data-v-7ad470a9> 技术部 <button class="select-tag-remove" data-v-7ad470a9>×</button></span><span class="select-tag" data-v-7ad470a9> 宣传部 <button class="select-tag-remove" data-v-7ad470a9>×</button></span><input type="text" class="select-tags-input" placeholder="添加更多..." data-v-7ad470a9></div></div>', 1))]), createElementVNode("div", fs, [val3[83] || (val3[83] = createElementVNode("h3", {
        class: "card-title"
      }, "开关", -1)), createElementVNode("div", ys, [createElementVNode("div", ws, [val3[79] || (val3[79] = createElementVNode("span", {
        class: "toggle-label"
      }, "接收通知", -1)), createElementVNode("button", {
        class: normalizeClass(["toggle", {
          "toggle-on": refVal6.value
        }]),
        onClick: val3[2] || (val3[2] = val4 => refVal6.value = !refVal6.value),
        role: "switch",
        "aria-checked": refVal6.value
      }, [...(val3[78] || (val3[78] = [createElementVNode("span", {
        class: "toggle-track"
      }, [createElementVNode("span", {
        class: "toggle-text toggle-text-on"
      }, "开"), createElementVNode("span", {
        class: "toggle-text toggle-text-off"
      }, "关")], -1), createElementVNode("span", {
        class: "toggle-handle"
      }, null, -1)]))], 10, hs)]), createElementVNode("div", Cs, [val3[81] || (val3[81] = createElementVNode("span", {
        class: "toggle-label"
      }, "暗色模式", -1)), createElementVNode("button", {
        class: normalizeClass(["toggle", {
          "toggle-on": refVal.value
        }]),
        onClick: zz0,
        role: "switch",
        "aria-checked": refVal.value
      }, [...(val3[80] || (val3[80] = [createElementVNode("span", {
        class: "toggle-track"
      }, [createElementVNode("span", {
        class: "toggle-text toggle-text-on"
      }, "开"), createElementVNode("span", {
        class: "toggle-text toggle-text-off"
      }, "关")], -1), createElementVNode("span", {
        class: "toggle-handle"
      }, null, -1)]))], 10, xs)]), val3[82] || (val3[82] = createElementVNode("div", {
        class: "toggle-item"
      }, [createElementVNode("span", {
        class: "toggle-label"
      }, "自动更新（禁用）"), createElementVNode("button", {
        class: "toggle toggle-disabled",
        disabled: "",
        role: "switch",
        "aria-checked": "false"
      }, [createElementVNode("span", {
        class: "toggle-track"
      }, [createElementVNode("span", {
        class: "toggle-text toggle-text-on"
      }, "开"), createElementVNode("span", {
        class: "toggle-text toggle-text-off"
      }, "关")]), createElementVNode("span", {
        class: "toggle-handle"
      })])], -1))])]), createElementVNode("div", $s, [val3[88] || (val3[88] = createElementVNode("h3", {
        class: "card-title"
      }, "开关变体", -1)), createElementVNode("div", Bs, [createElementVNode("div", Ms, [val3[85] || (val3[85] = createElementVNode("span", {
        class: "toggle-label"
      }, "小尺寸开关", -1)), createElementVNode("button", {
        class: normalizeClass(["toggle toggle-sm", {
          "toggle-on": refVal7.value
        }]),
        onClick: val3[3] || (val3[3] = val4 => refVal7.value = !refVal7.value),
        role: "switch",
        "aria-checked": refVal7.value
      }, [...(val3[84] || (val3[84] = [createElementVNode("span", {
        class: "toggle-handle"
      }, null, -1)]))], 10, Ts)]), createElementVNode("div", Vs, [val3[87] || (val3[87] = createElementVNode("span", {
        class: "toggle-label"
      }, "带状态色的开关", -1)), createElementVNode("button", {
        class: normalizeClass(["toggle toggle-success", {
          "toggle-on": refVal6.value
        }]),
        onClick: val3[4] || (val3[4] = val4 => refVal6.value = !refVal6.value),
        role: "switch",
        "aria-checked": refVal6.value
      }, [...(val3[86] || (val3[86] = [createElementVNode("span", {
        class: "toggle-track"
      }, [createElementVNode("span", {
        class: "toggle-text toggle-text-on"
      }, "✓"), createElementVNode("span", {
        class: "toggle-text toggle-text-off"
      }, "✕")], -1), createElementVNode("span", {
        class: "toggle-handle"
      }, null, -1)]))], 10, Fs)])])]), createElementVNode("div", Ss, [val3[92] || (val3[92] = createElementVNode("h3", {
        class: "card-title"
      }, "复选框", -1)), createElementVNode("div", Ps, [createElementVNode("label", Ds, [withDirectives(createElementVNode("input", {
        type: "checkbox",
        class: "form-checkbox",
        "onUpdate:modelValue": val3[5] || (val3[5] = val4 => refVal4.value = val4)
      }, null, 512), [[deepWatchOptions, refVal4.value]]), val3[89] || (val3[89] = createElementVNode("span", {
        class: "checkbox-custom"
      }, null, -1)), val3[90] || (val3[90] = createElementVNode("span", {
        class: "checkbox-text"
      }, "同意用户协议", -1))]), val3[91] || (val3[91] = createVNodeWrapper('<label class="checkbox-label" data-v-7ad470a9><input type="checkbox" class="form-checkbox" checked data-v-7ad470a9><span class="checkbox-custom" data-v-7ad470a9></span><span class="checkbox-text" data-v-7ad470a9>接收推送消息</span></label><label class="checkbox-label checkbox-disabled" data-v-7ad470a9><input type="checkbox" class="form-checkbox" disabled data-v-7ad470a9><span class="checkbox-custom" data-v-7ad470a9></span><span class="checkbox-text" data-v-7ad470a9>禁用选项</span></label>', 2))])]), createElementVNode("div", Es, [val3[99] || (val3[99] = createElementVNode("h3", {
        class: "card-title"
      }, "单选框", -1)), createElementVNode("div", Ls, [createElementVNode("label", As, [withDirectives(createElementVNode("input", {
        type: "radio",
        name: "demo",
        class: "form-radio",
        "onUpdate:modelValue": val3[6] || (val3[6] = val4 => refVal5.value = val4),
        value: "option1"
      }, null, 512), [[directiveCreated, refVal5.value]]), val3[93] || (val3[93] = createElementVNode("span", {
        class: "radio-custom"
      }, null, -1)), val3[94] || (val3[94] = createElementVNode("span", {
        class: "radio-text"
      }, "选项一", -1))]), createElementVNode("label", Ns, [withDirectives(createElementVNode("input", {
        type: "radio",
        name: "demo",
        class: "form-radio",
        "onUpdate:modelValue": val3[7] || (val3[7] = val4 => refVal5.value = val4),
        value: "option2"
      }, null, 512), [[directiveCreated, refVal5.value]]), val3[95] || (val3[95] = createElementVNode("span", {
        class: "radio-custom"
      }, null, -1)), val3[96] || (val3[96] = createElementVNode("span", {
        class: "radio-text"
      }, "选项二", -1))]), createElementVNode("label", Is, [withDirectives(createElementVNode("input", {
        type: "radio",
        name: "demo",
        class: "form-radio",
        "onUpdate:modelValue": val3[8] || (val3[8] = val4 => refVal5.value = val4),
        value: "option3"
      }, null, 512), [[directiveCreated, refVal5.value]]), val3[97] || (val3[97] = createElementVNode("span", {
        class: "radio-custom"
      }, null, -1)), val3[98] || (val3[98] = createElementVNode("span", {
        class: "radio-text"
      }, "选项三", -1))])])])]), val3[158] || (val3[158] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>卡片组件</h2><div class="card-stack" data-v-7ad470a9><div class="card card-interactive" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>基础卡片</h3><p class="card-content" data-v-7ad470a9>这是一个基础卡片组件，点击有反馈效果。可以用于展示社团信息、活动详情等内容。</p><div class="card-footer" data-v-7ad470a9><button class="btn btn-primary btn-touch btn-block" data-v-7ad470a9>了解更多</button></div></div><div class="card card-interactive" data-v-7ad470a9><div class="card-badge" data-v-7ad470a9>新</div><h3 class="card-title" data-v-7ad470a9>带徽章卡片</h3><p class="card-content" data-v-7ad470a9>卡片可以包含徽章，用于标记新内容、热门活动等。</p><div class="card-footer" data-v-7ad470a9><button class="btn btn-outline btn-touch btn-block" data-v-7ad470a9>查看详情</button></div></div><div class="card card-interactive card-featured" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>特色卡片</h3><p class="card-content" data-v-7ad470a9>带有主色边框的特色卡片，用于突出重要内容。</p><div class="card-footer card-footer-split" data-v-7ad470a9><button class="btn btn-ghost btn-touch" data-v-7ad470a9>取消</button><button class="btn btn-primary btn-touch" data-v-7ad470a9>立即参与</button></div></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>列表项</h2><div class="list-card" data-v-7ad470a9><div class="list-item list-item-interactive" data-v-7ad470a9><div class="list-item-content" data-v-7ad470a9><div class="list-item-title" data-v-7ad470a9>社团活动通知</div><div class="list-item-desc" data-v-7ad470a9>技术部本周六举办编程马拉松</div></div><div class="list-item-arrow" data-v-7ad470a9></div></div><div class="list-item list-item-interactive" data-v-7ad470a9><div class="list-item-avatar" data-v-7ad470a9><span data-v-7ad470a9>李</span></div><div class="list-item-content" data-v-7ad470a9><div class="list-item-title" data-v-7ad470a9>李同学</div><div class="list-item-desc" data-v-7ad470a9>技术部 · 部长</div></div><div class="list-item-action" data-v-7ad470a9><button class="btn btn-primary btn-sm btn-touch" data-v-7ad470a9>关注</button></div></div><div class="list-item list-item-interactive" data-v-7ad470a9><div class="list-item-icon list-item-icon-primary" data-v-7ad470a9><span data-v-7ad470a9>!</span></div><div class="list-item-content" data-v-7ad470a9><div class="list-item-title" data-v-7ad470a9>系统消息</div><div class="list-item-desc" data-v-7ad470a9>您有3条未读消息</div></div><div class="list-item-badge" data-v-7ad470a9>3</div></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>徽章 &amp; 标签</h2><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>徽章</h3><div class="badge-group" data-v-7ad470a9><span class="badge badge-primary" data-v-7ad470a9>主要</span><span class="badge badge-secondary" data-v-7ad470a9>次要</span><span class="badge badge-accent" data-v-7ad470a9>强调</span><span class="badge badge-success" data-v-7ad470a9>成功</span><span class="badge badge-warning" data-v-7ad470a9>警告</span><span class="badge badge-error" data-v-7ad470a9>错误</span><span class="badge badge-info" data-v-7ad470a9>信息</span></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>标签</h3><div class="tag-group" data-v-7ad470a9><span class="tag tag-touch" data-v-7ad470a9>技术部</span><span class="tag tag-touch" data-v-7ad470a9>宣传部</span><span class="tag tag-touch" data-v-7ad470a9>文艺部</span><span class="tag tag-closable tag-touch" data-v-7ad470a9> 可关闭 <button class="tag-close" data-v-7ad470a9>×</button></span></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>状态指示</h3><div class="status-group" data-v-7ad470a9><span class="status status-online" data-v-7ad470a9><span class="status-dot" data-v-7ad470a9></span> 在线 </span><span class="status status-busy" data-v-7ad470a9><span class="status-dot" data-v-7ad470a9></span> 忙碌 </span><span class="status status-offline" data-v-7ad470a9><span class="status-dot" data-v-7ad470a9></span> 离线 </span></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>提示框</h2><div class="alert-stack" data-v-7ad470a9><div class="alert alert-success" data-v-7ad470a9><div class="alert-icon" data-v-7ad470a9>✓</div><div class="alert-content" data-v-7ad470a9><strong data-v-7ad470a9>成功！</strong> 您的操作已完成。 </div></div><div class="alert alert-warning" data-v-7ad470a9><div class="alert-icon" data-v-7ad470a9>!</div><div class="alert-content" data-v-7ad470a9><strong data-v-7ad470a9>警告！</strong> 请检查输入内容。 </div></div><div class="alert alert-error" data-v-7ad470a9><div class="alert-icon" data-v-7ad470a9>×</div><div class="alert-content" data-v-7ad470a9><strong data-v-7ad470a9>错误！</strong> 操作失败，请重试。 </div></div><div class="alert alert-info" data-v-7ad470a9><div class="alert-icon" data-v-7ad470a9>i</div><div class="alert-content" data-v-7ad470a9><strong data-v-7ad470a9>提示：</strong> 可在个人中心修改设置。 </div></div></div></section>', 4)), createElementVNode("section", Us, [val3[103] || (val3[103] = createVNodeWrapper('<h2 class="section-title" data-v-7ad470a9>移动端组件</h2><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>操作栏示例</h3><div class="action-bar-demo" data-v-7ad470a9><div class="action-bar" data-v-7ad470a9><button class="action-bar-btn" data-v-7ad470a9><span class="action-icon" data-v-7ad470a9>♡</span><span data-v-7ad470a9>收藏</span></button><button class="action-bar-btn" data-v-7ad470a9><span class="action-icon" data-v-7ad470a9>↻</span><span data-v-7ad470a9>分享</span></button><button class="action-bar-btn action-bar-btn-primary" data-v-7ad470a9><span class="action-icon" data-v-7ad470a9>+</span><span data-v-7ad470a9>报名</span></button></div></div></div>', 2)), createElementVNode("div", zs, [val3[102] || (val3[102] = createElementVNode("h3", {
        class: "card-title"
      }, "分段控制器（带滑动动画）", -1)), createElementVNode("div", {
        class: "segment-control",
        ref_key: "segmentRef",
        ref: refVal10
      }, [createElementVNode("div", {
        class: "segment-slider",
        style: resolveRaw(refVal11.value)
      }, null, 4), (openBlock(), createElementBlock(Fragment, null, renderList(list6, val4 => createElementVNode("button", {
        key: val4.key,
        class: normalizeClass(["segment-btn", {
          active: refVal2.value === val4.key
        }]),
        onClick: val5 => zz4(val4.key)
      }, toDisplayString(val4.label), 11, Hs)), 64))], 512)]), val3[104] || (val3[104] = createElementVNode("div", {
        class: "card"
      }, [createElementVNode("h3", {
        class: "card-title"
      }, "底部安全区域"), createElementVNode("p", {
        class: "card-content"
      }, "在有底部导航的页面，需要考虑 iPhone 等设备的安全区域。"), createElementVNode("code", {
        class: "code-block"
      }, "padding-bottom: env(safe-area-inset-bottom);")], -1))]), val3[159] || (val3[159] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>阴影系统</h2><div class="shadow-scroll" data-v-7ad470a9><div class="shadow-demo shadow-sm" data-v-7ad470a9><span data-v-7ad470a9>sm</span></div><div class="shadow-demo shadow-md" data-v-7ad470a9><span data-v-7ad470a9>md</span></div><div class="shadow-demo shadow-lg" data-v-7ad470a9><span data-v-7ad470a9>lg</span></div><div class="shadow-demo shadow-xl" data-v-7ad470a9><span data-v-7ad470a9>xl</span></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>圆角系统</h2><div class="radius-scroll" data-v-7ad470a9><div class="radius-demo" style="border-radius:var(--radius-sm);" data-v-7ad470a9><span data-v-7ad470a9>sm</span></div><div class="radius-demo" style="border-radius:var(--radius-md);" data-v-7ad470a9><span data-v-7ad470a9>md</span></div><div class="radius-demo" style="border-radius:var(--radius-lg);" data-v-7ad470a9><span data-v-7ad470a9>lg</span></div><div class="radius-demo" style="border-radius:var(--radius-xl);" data-v-7ad470a9><span data-v-7ad470a9>xl</span></div><div class="radius-demo radius-demo-circle" style="border-radius:var(--radius-full);" data-v-7ad470a9><span data-v-7ad470a9>full</span></div></div></section>', 2)), createElementVNode("section", Os, [val3[106] || (val3[106] = createElementVNode("h2", {
        class: "section-title"
      }, "模态框 Modal", -1)), createElementVNode("div", Rs, [val3[105] || (val3[105] = createElementVNode("h3", {
        class: "card-title"
      }, "基础模态框", -1)), createElementVNode("div", Xs, [createElementVNode("button", {
        class: "btn btn-primary btn-touch",
        onClick: val3[9] || (val3[9] = val4 => refVal12.value = !0)
      }, "打开模态框"), createElementVNode("button", {
        class: "btn btn-secondary btn-touch",
        onClick: val3[10] || (val3[10] = val4 => refVal13.value = !0)
      }, "确认对话框")])])]), createElementVNode("section", qs, [val3[108] || (val3[108] = createElementVNode("h2", {
        class: "section-title"
      }, "消息提示 Toast", -1)), createElementVNode("div", Gs, [val3[107] || (val3[107] = createElementVNode("h3", {
        class: "card-title"
      }, "不同类型的消息", -1)), createElementVNode("div", Ys, [createElementVNode("button", {
        class: "btn btn-success btn-touch",
        onClick: val3[11] || (val3[11] = val4 => zz5("操作成功！", "success"))
      }, "成功"), createElementVNode("button", {
        class: "btn btn-warning btn-touch",
        onClick: val3[12] || (val3[12] = val4 => zz5("请注意检查", "warning"))
      }, "警告"), createElementVNode("button", {
        class: "btn btn-error btn-touch",
        onClick: val3[13] || (val3[13] = val4 => zz5("操作失败", "error"))
      }, "错误"), createElementVNode("button", {
        class: "btn btn-info btn-touch",
        onClick: val3[14] || (val3[14] = val4 => zz5("这是一条提示信息", "info"))
      }, "信息")])])]), createElementVNode("section", Zs, [val3[110] || (val3[110] = createElementVNode("h2", {
        class: "section-title"
      }, "通知 Notification", -1)), createElementVNode("div", Js, [val3[109] || (val3[109] = createElementVNode("h3", {
        class: "card-title"
      }, "带标题的通知", -1)), createElementVNode("div", Ks, [createElementVNode("button", {
        class: "btn btn-success btn-touch",
        onClick: val3[15] || (val3[15] = val4 => zz11("成功", "您的操作已完成", "success"))
      }, "成功通知"), createElementVNode("button", {
        class: "btn btn-error btn-touch",
        onClick: val3[16] || (val3[16] = val4 => zz11("错误", "网络连接失败", "error"))
      }, "错误通知")])])]), createElementVNode("section", {
        class: "section"
      }, [val3[112] || (val3[112] = createElementVNode("h2", {
        class: "section-title"
      }, "加载 Loading", -1)), createElementVNode("div", {
        class: "card"
      }, [val3[111] || (val3[111] = createVNodeWrapper('<h3 class="card-title" data-v-7ad470a9>加载状态</h3><div class="loading-demos" data-v-7ad470a9><div class="loading-demo-item" data-v-7ad470a9><div class="loading-spinner" data-v-7ad470a9></div><span data-v-7ad470a9>加载中</span></div><div class="loading-demo-item" data-v-7ad470a9><div class="loading-dots" data-v-7ad470a9><span data-v-7ad470a9></span><span data-v-7ad470a9></span><span data-v-7ad470a9></span></div><span data-v-7ad470a9>加载中</span></div></div>', 2)), createElementVNode("button", {
        class: "btn btn-primary btn-touch btn-block",
        onClick: zz8
      }, "模拟全屏加载")])]), createElementVNode("section", Ws, [val3[114] || (val3[114] = createElementVNode("h2", {
        class: "section-title"
      }, "抽屉 Drawer", -1)), createElementVNode("div", js, [val3[113] || (val3[113] = createElementVNode("h3", {
        class: "card-title"
      }, "不同方向的抽屉", -1)), createElementVNode("div", Qs, [createElementVNode("button", {
        class: "btn btn-outline btn-touch",
        onClick: val3[17] || (val3[17] = val4 => zz7("left"))
      }, "左侧抽屉"), createElementVNode("button", {
        class: "btn btn-outline btn-touch",
        onClick: val3[18] || (val3[18] = val4 => zz7("right"))
      }, "右侧抽屉"), createElementVNode("button", {
        class: "btn btn-outline btn-touch",
        onClick: val3[19] || (val3[19] = val4 => zz7("bottom"))
      }, "底部抽屉")])])]), createElementVNode("section", _s, [val3[115] || (val3[115] = createElementVNode("h2", {
        class: "section-title"
      }, "操作菜单 ActionSheet", -1)), createElementVNode("div", at, [createElementVNode("button", {
        class: "btn btn-primary btn-touch btn-block",
        onClick: val3[20] || (val3[20] = val4 => refVal28.value = !0)
      }, "打开操作菜单")])]), createElementVNode("section", st, [val3[121] || (val3[121] = createElementVNode("h2", {
        class: "section-title"
      }, "进度条 Progress", -1)), createElementVNode("div", tt, [val3[117] || (val3[117] = createElementVNode("h3", {
        class: "card-title"
      }, "线形进度条", -1)), createElementVNode("div", lt, [createElementVNode("div", et, [createElementVNode("div", dt, [createElementVNode("div", {
        class: "progress-bar-inner",
        style: resolveRaw({
          width: refVal18.value + "%"
        })
      }, null, 4)]), createElementVNode("span", ot, toDisplayString(refVal18.value) + "%", 1)]), val3[116] || (val3[116] = createVNodeWrapper('<div class="progress-item" data-v-7ad470a9><div class="progress-bar progress-bar-success" data-v-7ad470a9><div class="progress-bar-inner" style="width:100%;" data-v-7ad470a9></div></div><span class="progress-text" data-v-7ad470a9>完成</span></div><div class="progress-item" data-v-7ad470a9><div class="progress-bar progress-bar-striped" data-v-7ad470a9><div class="progress-bar-inner" style="width:45%;" data-v-7ad470a9></div></div><span class="progress-text" data-v-7ad470a9>45%</span></div>', 2))]), createElementVNode("div", nt, [createElementVNode("button", {
        class: "btn btn-sm btn-outline",
        onClick: val3[21] || (val3[21] = val4 => refVal18.value = Math.max(0, refVal18.value - 10))
      }, "-10%"), createElementVNode("button", {
        class: "btn btn-sm btn-outline",
        onClick: val3[22] || (val3[22] = val4 => refVal18.value = Math.min(100, refVal18.value + 10))
      }, "+10%")])]), createElementVNode("div", it, [val3[120] || (val3[120] = createElementVNode("h3", {
        class: "card-title"
      }, "环形进度条", -1)), createElementVNode("div", vt, [createElementVNode("div", {
        class: "progress-circle",
        style: resolveRaw({
          "--progress": refVal18.value
        })
      }, [val3[118] || (val3[118] = createElementVNode("svg", {
        viewBox: "0 0 100 100"
      }, [createElementVNode("circle", {
        class: "progress-circle-bg",
        cx: "50",
        cy: "50",
        r: "45"
      }), createElementVNode("circle", {
        class: "progress-circle-bar",
        cx: "50",
        cy: "50",
        r: "45"
      })], -1)), createElementVNode("span", ct, toDisplayString(refVal18.value) + "%", 1)], 4), val3[119] || (val3[119] = createVNodeWrapper('<div class="progress-circle progress-circle-success" style="--progress:100;" data-v-7ad470a9><svg viewBox="0 0 100 100" data-v-7ad470a9><circle class="progress-circle-bg" cx="50" cy="50" r="45" data-v-7ad470a9></circle><circle class="progress-circle-bar" cx="50" cy="50" r="45" data-v-7ad470a9></circle></svg><span class="progress-circle-text" data-v-7ad470a9>✓</span></div>', 1))])])]), val3[160] || (val3[160] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>骨架屏 Skeleton</h2><div class="card" data-v-7ad470a9><div class="skeleton-demo" data-v-7ad470a9><div class="skeleton-avatar" data-v-7ad470a9></div><div class="skeleton-content" data-v-7ad470a9><div class="skeleton-title" data-v-7ad470a9></div><div class="skeleton-text" data-v-7ad470a9></div><div class="skeleton-text skeleton-text-short" data-v-7ad470a9></div></div></div><div class="skeleton-demo" data-v-7ad470a9><div class="skeleton-image" data-v-7ad470a9></div></div><div class="skeleton-demo" data-v-7ad470a9><div class="skeleton-paragraph" data-v-7ad470a9><div class="skeleton-line" data-v-7ad470a9></div><div class="skeleton-line" data-v-7ad470a9></div><div class="skeleton-line skeleton-line-short" data-v-7ad470a9></div></div></div></div></section>', 1)), createElementVNode("section", rt, [val3[125] || (val3[125] = createElementVNode("h2", {
        class: "section-title"
      }, "标签页 Tabs", -1)), createElementVNode("div", ut, [createElementVNode("div", bt, [createElementVNode("div", pt, [(openBlock(), createElementBlock(Fragment, null, renderList(list7, val4 => createElementVNode("button", {
        key: val4.key,
        class: normalizeClass(["tabs-nav-item", {
          active: refVal19.value === val4.key
        }]),
        onClick: val5 => refVal19.value = val4.key
      }, toDisplayString(val4.label), 11, mt)), 64))]), createElementVNode("div", gt, [refVal19.value === "tab1" ? (openBlock(), createElementBlock("div", kt, [...(val3[122] || (val3[122] = [createElementVNode("p", null, "这里显示全部活动的内容。包括进行中和已结束的所有活动列表。", -1)]))])) : createCommentVNode("", !0), refVal19.value === "tab2" ? (openBlock(), createElementBlock("div", ft, [...(val3[123] || (val3[123] = [createElementVNode("p", null, "这里显示正在进行中的活动，可以立即报名参与。", -1)]))])) : createCommentVNode("", !0), refVal19.value === "tab3" ? (openBlock(), createElementBlock("div", yt, [...(val3[124] || (val3[124] = [createElementVNode("p", null, "这里显示已经结束的活动，可以查看活动回顾。", -1)]))])) : createCommentVNode("", !0)])])])]), createElementVNode("section", wt, [val3[132] || (val3[132] = createElementVNode("h2", {
        class: "section-title"
      }, "折叠面板 Collapse", -1)), createElementVNode("div", ht, [createElementVNode("div", {
        class: normalizeClass(["collapse-item", {
          expanded: refVal20.value.includes("panel1")
        }])
      }, [createElementVNode("div", {
        class: "collapse-header",
        onClick: val3[23] || (val3[23] = val4 => zz9("panel1"))
      }, [...(val3[126] || (val3[126] = [createElementVNode("span", null, "什么是学生社区？", -1), createElementVNode("span", {
        class: "collapse-arrow"
      }, null, -1)]))]), val3[127] || (val3[127] = createElementVNode("div", {
        class: "collapse-content"
      }, [createElementVNode("div", {
        class: "collapse-body"
      }, " 学生社区是厦门一中为全校学生打造的综合性在线平台，提供社团管理、活动报名、信息发布等功能。 ")], -1))], 2), createElementVNode("div", {
        class: normalizeClass(["collapse-item", {
          expanded: refVal20.value.includes("panel2")
        }])
      }, [createElementVNode("div", {
        class: "collapse-header",
        onClick: val3[24] || (val3[24] = val4 => zz9("panel2"))
      }, [...(val3[128] || (val3[128] = [createElementVNode("span", null, "如何加入社团？", -1), createElementVNode("span", {
        class: "collapse-arrow"
      }, null, -1)]))]), val3[129] || (val3[129] = createElementVNode("div", {
        class: "collapse-content"
      }, [createElementVNode("div", {
        class: "collapse-body"
      }, ' 在社团列表页面找到感兴趣的社团，点击"申请加入"按钮，填写申请表后等待社团负责人审核即可。 ')], -1))], 2), createElementVNode("div", {
        class: normalizeClass(["collapse-item", {
          expanded: refVal20.value.includes("panel3")
        }])
      }, [createElementVNode("div", {
        class: "collapse-header",
        onClick: val3[25] || (val3[25] = val4 => zz9("panel3"))
      }, [...(val3[130] || (val3[130] = [createElementVNode("span", null, "如何发起活动？", -1), createElementVNode("span", {
        class: "collapse-arrow"
      }, null, -1)]))]), val3[131] || (val3[131] = createElementVNode("div", {
        class: "collapse-content"
      }, [createElementVNode("div", {
        class: "collapse-body"
      }, " 社团管理员可以在社团管理页面创建新活动，填写活动详情后提交审核，通过后即可发布。 ")], -1))], 2)])]), val3[161] || (val3[161] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>空状态 Empty</h2><div class="card" data-v-7ad470a9><div class="empty" data-v-7ad470a9><div class="empty-image" data-v-7ad470a9><svg viewBox="0 0 64 64" fill="none" data-v-7ad470a9><circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="2" opacity="0.2" data-v-7ad470a9></circle><path d="M20 28h24M20 36h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.4" data-v-7ad470a9></path></svg></div><p class="empty-text" data-v-7ad470a9>暂无数据</p><p class="empty-desc" data-v-7ad470a9>当前没有任何内容可显示</p><button class="btn btn-primary btn-sm" data-v-7ad470a9>立即创建</button></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>头像 Avatar</h2><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>头像尺寸</h3><div class="avatar-group" data-v-7ad470a9><div class="avatar avatar-xs" data-v-7ad470a9>小</div><div class="avatar avatar-sm" data-v-7ad470a9>中</div><div class="avatar" data-v-7ad470a9>默</div><div class="avatar avatar-lg" data-v-7ad470a9>大</div><div class="avatar avatar-xl" data-v-7ad470a9>特</div></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>头像形状</h3><div class="avatar-group" data-v-7ad470a9><div class="avatar" data-v-7ad470a9>圆</div><div class="avatar avatar-square" data-v-7ad470a9>方</div></div></div><div class="card" data-v-7ad470a9><h3 class="card-title" data-v-7ad470a9>头像组</h3><div class="avatar-stack" data-v-7ad470a9><div class="avatar" data-v-7ad470a9>A</div><div class="avatar" data-v-7ad470a9>B</div><div class="avatar" data-v-7ad470a9>C</div><div class="avatar avatar-more" data-v-7ad470a9>+5</div></div></div></section><section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>工具提示 Tooltip</h2><div class="card" data-v-7ad470a9><div class="tooltip-demos" data-v-7ad470a9><div class="tooltip-wrapper" data-v-7ad470a9><button class="btn btn-outline btn-touch" data-v-7ad470a9>上方提示</button><div class="tooltip tooltip-top" data-v-7ad470a9>这是提示内容</div></div><div class="tooltip-wrapper" data-v-7ad470a9><button class="btn btn-outline btn-touch" data-v-7ad470a9>下方提示</button><div class="tooltip tooltip-bottom" data-v-7ad470a9>这是提示内容</div></div></div></div></section>', 3)), createElementVNode("section", Ct, [val3[135] || (val3[135] = createElementVNode("h2", {
        class: "section-title"
      }, "气泡卡片 Popover", -1)), createElementVNode("div", xt, [createElementVNode("div", $t, [createElementVNode("button", {
        class: "btn btn-primary btn-touch",
        onClick: val3[26] || (val3[26] = val4 => refVal21.value = !refVal21.value)
      }, " 点击弹出 "), createVNode(withSlots, {
        name: "popover"
      }, {
        default: toDisplayValue(() => [refVal21.value ? (openBlock(), createElementBlock("div", Bt, [val3[133] || (val3[133] = createElementVNode("div", {
          class: "popover-title"
        }, "这是标题", -1)), val3[134] || (val3[134] = createElementVNode("div", {
          class: "popover-content"
        }, "这是气泡卡片的内容，可以包含任何元素。", -1)), createElementVNode("div", Mt, [createElementVNode("button", {
          class: "btn btn-sm btn-ghost",
          onClick: val3[27] || (val3[27] = val4 => refVal21.value = !1)
        }, "取消"), createElementVNode("button", {
          class: "btn btn-sm btn-primary",
          onClick: val3[28] || (val3[28] = val4 => refVal21.value = !1)
        }, "确定")])])) : createCommentVNode("", !0)]),
        _: 1
      })])])]), createElementVNode("section", Tt, [val3[138] || (val3[138] = createElementVNode("h2", {
        class: "section-title"
      }, "表格 Table", -1)), createElementVNode("div", Vt, [createElementVNode("div", Ft, [createElementVNode("table", St, [val3[137] || (val3[137] = createElementVNode("thead", null, [createElementVNode("tr", null, [createElementVNode("th", null, "姓名"), createElementVNode("th", null, "部门"), createElementVNode("th", null, "状态")])], -1)), createElementVNode("tbody", null, [(openBlock(), createElementBlock(Fragment, null, renderList(list9, val4 => createElementVNode("tr", {
        key: val4.id
      }, [createElementVNode("td", null, toDisplayString(val4.name), 1), createElementVNode("td", null, toDisplayString(val4.department), 1), createElementVNode("td", null, [createElementVNode("span", {
        class: normalizeClass(["status", {
          "status-online": val4.status === "在线",
          "status-busy": val4.status === "忙碌",
          "status-offline": val4.status === "离线"
        }])
      }, [val3[136] || (val3[136] = createElementVNode("span", {
        class: "status-dot"
      }, null, -1)), createTextVNode(" " + toDisplayString(val4.status), 1)], 2)])])), 64))])])])])]), val3[162] || (val3[162] = createVNodeWrapper('<section class="section" data-v-7ad470a9><h2 class="section-title" data-v-7ad470a9>面包屑 Breadcrumb</h2><div class="card" data-v-7ad470a9><nav class="breadcrumb" data-v-7ad470a9><a href="#" class="breadcrumb-item" data-v-7ad470a9>首页</a><span class="breadcrumb-separator" data-v-7ad470a9>/</span><a href="#" class="breadcrumb-item" data-v-7ad470a9>社团列表</a><span class="breadcrumb-separator" data-v-7ad470a9>/</span><span class="breadcrumb-item breadcrumb-current" data-v-7ad470a9>技术部</span></nav></div></section>', 1)), createElementVNode("section", Pt, [val3[142] || (val3[142] = createElementVNode("h2", {
        class: "section-title"
      }, "步骤条 Steps", -1)), createElementVNode("div", Dt, [createElementVNode("div", Et, [createElementVNode("div", {
        class: normalizeClass(["step", {
          active: refVal22.value >= 1,
          completed: refVal22.value > 1
        }])
      }, [createElementVNode("div", Lt, toDisplayString(refVal22.value > 1 ? "✓" : "1"), 1), val3[139] || (val3[139] = createElementVNode("div", {
        class: "step-content"
      }, [createElementVNode("div", {
        class: "step-title"
      }, "填写信息")], -1))], 2), createElementVNode("div", {
        class: normalizeClass(["step-line", {
          active: refVal22.value > 1
        }])
      }, null, 2), createElementVNode("div", {
        class: normalizeClass(["step", {
          active: refVal22.value >= 2,
          completed: refVal22.value > 2
        }])
      }, [createElementVNode("div", At, toDisplayString(refVal22.value > 2 ? "✓" : "2"), 1), val3[140] || (val3[140] = createElementVNode("div", {
        class: "step-content"
      }, [createElementVNode("div", {
        class: "step-title"
      }, "审核中")], -1))], 2), createElementVNode("div", {
        class: normalizeClass(["step-line", {
          active: refVal22.value > 2
        }])
      }, null, 2), createElementVNode("div", {
        class: normalizeClass(["step", {
          active: refVal22.value >= 3
        }])
      }, [...(val3[141] || (val3[141] = [createElementVNode("div", {
        class: "step-icon"
      }, "3", -1), createElementVNode("div", {
        class: "step-content"
      }, [createElementVNode("div", {
        class: "step-title"
      }, "完成")], -1)]))], 2)]), createElementVNode("div", Nt, [createElementVNode("button", {
        class: "btn btn-outline btn-sm",
        onClick: val3[29] || (val3[29] = val4 => refVal22.value = Math.max(1, refVal22.value - 1)),
        disabled: refVal22.value <= 1
      }, "上一步", 8, It), createElementVNode("button", {
        class: "btn btn-primary btn-sm",
        onClick: val3[30] || (val3[30] = val4 => refVal22.value = Math.min(3, refVal22.value + 1)),
        disabled: refVal22.value >= 3
      }, "下一步", 8, Ut)])])]), createElementVNode("section", zt, [val3[145] || (val3[145] = createElementVNode("h2", {
        class: "section-title"
      }, "下拉菜单 Dropdown", -1)), createElementVNode("div", Ht, [createElementVNode("div", {
        class: "dropdown",
        onClick: val3[36] || (val3[36] = withModifiers(() => {}, ["stop"]))
      }, [createElementVNode("button", {
        class: "btn btn-outline btn-touch",
        onClick: val3[31] || (val3[31] = val4 => refVal23.value = !refVal23.value)
      }, [val3[143] || (val3[143] = createTextVNode(" 更多操作 ", -1)), createElementVNode("span", {
        class: normalizeClass(["dropdown-arrow", {
          open: refVal23.value
        }])
      }, null, 2)]), createVNode(withSlots, {
        name: "dropdown"
      }, {
        default: toDisplayValue(() => [refVal23.value ? (openBlock(), createElementBlock("div", Ot, [createElementVNode("button", {
          class: "dropdown-item",
          onClick: val3[32] || (val3[32] = val4 => refVal23.value = !1)
        }, "编辑"), createElementVNode("button", {
          class: "dropdown-item",
          onClick: val3[33] || (val3[33] = val4 => refVal23.value = !1)
        }, "复制"), createElementVNode("button", {
          class: "dropdown-item",
          onClick: val3[34] || (val3[34] = val4 => refVal23.value = !1)
        }, "分享"), val3[144] || (val3[144] = createElementVNode("div", {
          class: "dropdown-divider"
        }, null, -1)), createElementVNode("button", {
          class: "dropdown-item dropdown-item-danger",
          onClick: val3[35] || (val3[35] = val4 => refVal23.value = !1)
        }, "删除")])) : createCommentVNode("", !0)]),
        _: 1
      })])])]), createElementVNode("section", Rt, [val3[149] || (val3[149] = createElementVNode("h2", {
        class: "section-title"
      }, "分页 Pagination", -1)), createElementVNode("div", Xt, [createElementVNode("div", qt, [createElementVNode("button", {
        class: "pagination-btn",
        disabled: refVal24.value <= 1,
        onClick: val3[37] || (val3[37] = val4 => zz10(refVal24.value - 1))
      }, [...(val3[146] || (val3[146] = [createElementVNode("span", {
        class: "pagination-arrow pagination-arrow-left"
      }, null, -1)]))], 8, Gt), (openBlock(), createElementBlock(Fragment, null, renderList(5, val4 => createElementVNode("button", {
        key: val4,
        class: normalizeClass(["pagination-btn", {
          active: refVal24.value === val4
        }]),
        onClick: val5 => zz10(val4)
      }, toDisplayString(val4), 11, Yt)), 64)), val3[148] || (val3[148] = createElementVNode("span", {
        class: "pagination-ellipsis"
      }, "...", -1)), createElementVNode("button", {
        class: normalizeClass(["pagination-btn", {
          active: refVal24.value === DesignSystemPageConst0
        }]),
        onClick: val3[38] || (val3[38] = val4 => zz10(DesignSystemPageConst0))
      }, toDisplayString(DesignSystemPageConst0), 2), createElementVNode("button", {
        class: "pagination-btn",
        disabled: refVal24.value >= DesignSystemPageConst0,
        onClick: val3[39] || (val3[39] = val4 => zz10(refVal24.value + 1))
      }, [...(val3[147] || (val3[147] = [createElementVNode("span", {
        class: "pagination-arrow pagination-arrow-right"
      }, null, -1)]))], 8, Zt)]), createElementVNode("p", Jt, "第 " + toDisplayString(refVal24.value) + " 页，共 " + toDisplayString(DesignSystemPageConst0) + " 页", 1)])]), createElementVNode("section", Kt, [val3[150] || (val3[150] = createElementVNode("h2", {
        class: "section-title"
      }, "滑块 Slider", -1)), createElementVNode("div", Wt, [createElementVNode("div", jt, [withDirectives(createElementVNode("input", {
        type: "range",
        class: "slider",
        "onUpdate:modelValue": val3[40] || (val3[40] = val4 => refVal25.value = val4),
        min: "0",
        max: "100"
      }, null, 512), [[vModelText, refVal25.value, void 0, {
        number: !0
      }]]), createElementVNode("span", Qt, toDisplayString(refVal25.value), 1)])])]), createElementVNode("section", _t, [val3[151] || (val3[151] = createElementVNode("h2", {
        class: "section-title"
      }, "评分 Rate", -1)), createElementVNode("div", al, [createElementVNode("div", sl, [(openBlock(), createElementBlock(Fragment, null, renderList(5, val4 => createElementVNode("button", {
        key: val4,
        class: normalizeClass(["rate-star", {
          active: val4 <= (refVal27.value || refVal26.value),
          hover: val4 <= refVal27.value
        }]),
        onClick: val5 => refVal26.value = val4,
        onMouseenter: val5 => refVal27.value = val4,
        onMouseleave: val3[41] || (val3[41] = val5 => refVal27.value = 0)
      }, "★", 42, tl)), 64))]), createElementVNode("p", ll, "当前评分: " + toDisplayString(refVal26.value) + " 分", 1)])]), createElementVNode("section", el, [val3[152] || (val3[152] = createElementVNode("h2", {
        class: "section-title"
      }, "轮播 Swiper", -1)), createElementVNode("div", dl, [createElementVNode("div", ol, [createElementVNode("div", {
        class: "swiper-track",
        style: resolveRaw({
          transform: `translateX(-${refVal30.value * 100}%)`
        })
      }, [(openBlock(), createElementBlock(Fragment, null, renderList(list8, (val4, val5) => createElementVNode("div", {
        key: val5,
        class: "swiper-slide"
      }, toDisplayString(val4), 1)), 64))], 4), createElementVNode("button", {
        class: "swiper-btn swiper-btn-prev",
        onClick: zz15
      }, "‹"), createElementVNode("button", {
        class: "swiper-btn swiper-btn-next",
        onClick: zz14
      }, "›"), createElementVNode("div", nl, [(openBlock(), createElementBlock(Fragment, null, renderList(list8, (val4, val5) => createElementVNode("button", {
        key: val5,
        class: normalizeClass(["swiper-dot", {
          active: refVal30.value === val5
        }]),
        onClick: val6 => refVal30.value = val5
      }, null, 10, il)), 64))])])])]), createElementVNode("section", vl, [val3[156] || (val3[156] = createElementVNode("h2", {
        class: "section-title"
      }, "图片预览 ImagePreview", -1)), createElementVNode("div", cl, [createElementVNode("div", rl, [createElementVNode("div", {
        class: "image-item",
        onClick: val3[42] || (val3[42] = val4 => refVal31.value = !0)
      }, [...(val3[153] || (val3[153] = [createElementVNode("div", {
        class: "image-placeholder"
      }, "点击预览", -1)]))]), val3[154] || (val3[154] = createElementVNode("div", {
        class: "image-item"
      }, [createElementVNode("div", {
        class: "image-placeholder"
      }, "图片 2")], -1)), val3[155] || (val3[155] = createElementVNode("div", {
        class: "image-item"
      }, [createElementVNode("div", {
        class: "image-placeholder"
      }, "图片 3")], -1))])])])]), val3[175] || (val3[175] = createElementVNode("footer", {
        class: "footer"
      }, [createElementVNode("p", null, "XMYZ Club Design System"), createElementVNode("p", {
        class: "footer-sub"
      }, "© 2024 厦门一中学生社区")], -1)), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createElementVNode("div", ul, [createVNode(TransitionGroup, {
        name: "toast"
      }, {
        default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal14.value, val4 => (openBlock(), createElementBlock("div", {
          key: val4.id,
          class: normalizeClass(["toast", "toast-" + val4.type])
        }, [createElementVNode("span", bl, toDisplayString(val4.type === "success" ? "✓" : val4.type === "error" ? "✕" : val4.type === "warning" ? "!" : "i"), 1), createElementVNode("span", pl, toDisplayString(val4.message), 1)], 2))), 128))]),
        _: 1
      })])])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createElementVNode("div", ml, [createVNode(TransitionGroup, {
        name: "notification"
      }, {
        default: toDisplayValue(() => [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal29.value, val4 => (openBlock(), createElementBlock("div", {
          key: val4.id,
          class: normalizeClass(["notification", "notification-" + val4.type])
        }, [createElementVNode("div", gl, toDisplayString(val4.type === "success" ? "✓" : val4.type === "error" ? "✕" : val4.type === "warning" ? "!" : "i"), 1), createElementVNode("div", kl, [createElementVNode("div", fl, toDisplayString(val4.title), 1), createElementVNode("div", yl, toDisplayString(val4.message), 1)]), createElementVNode("button", {
          class: "notification-close",
          onClick: val5 => zz13(val4.id)
        }, "×", 8, wl)], 2))), 128))]),
        _: 1
      })])])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "modal"
      }, {
        default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: val3[46] || (val3[46] = withModifiers(val4 => refVal12.value = !1, ["self"]))
        }, [createElementVNode("div", hl, [createElementVNode("div", Cl, [val3[163] || (val3[163] = createElementVNode("h3", {
          class: "modal-title"
        }, "模态框标题", -1)), createElementVNode("button", {
          class: "modal-close",
          onClick: val3[43] || (val3[43] = val4 => refVal12.value = !1)
        }, "×")]), val3[164] || (val3[164] = createElementVNode("div", {
          class: "modal-body"
        }, [createElementVNode("p", null, "这是一个基础的模态框组件，可以用于显示重要信息、表单或其他内容。"), createElementVNode("p", null, "点击遮罩层或关闭按钮可以关闭模态框。")], -1)), createElementVNode("div", xl, [createElementVNode("button", {
          class: "btn btn-ghost btn-touch",
          onClick: val3[44] || (val3[44] = val4 => refVal12.value = !1)
        }, "取消"), createElementVNode("button", {
          class: "btn btn-primary btn-touch",
          onClick: val3[45] || (val3[45] = val4 => refVal12.value = !1)
        }, "确定")])])])) : createCommentVNode("", !0)]),
        _: 1
      })])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "modal"
      }, {
        default: toDisplayValue(() => [refVal13.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: val3[49] || (val3[49] = withModifiers(val4 => refVal13.value = !1, ["self"]))
        }, [createElementVNode("div", $l, [val3[165] || (val3[165] = createElementVNode("div", {
          class: "modal-confirm-icon modal-confirm-warning"
        }, "!", -1)), val3[166] || (val3[166] = createElementVNode("h3", {
          class: "modal-confirm-title"
        }, "确认操作", -1)), val3[167] || (val3[167] = createElementVNode("p", {
          class: "modal-confirm-message"
        }, "您确定要执行此操作吗？此操作无法撤销。", -1)), createElementVNode("div", Bl, [createElementVNode("button", {
          class: "btn btn-ghost btn-touch btn-block",
          onClick: val3[47] || (val3[47] = val4 => refVal13.value = !1)
        }, "取消"), createElementVNode("button", {
          class: "btn btn-primary btn-touch btn-block",
          onClick: val3[48] || (val3[48] = val4 => {
            refVal13.value = !1, zz5("操作已确认", "success");
          })
        }, "确定")])])])) : createCommentVNode("", !0)]),
        _: 1
      })])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "drawer-overlay"
      }, {
        default: toDisplayValue(() => [refVal15.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "drawer-overlay",
          onClick: val3[50] || (val3[50] = val4 => refVal15.value = !1)
        })) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "drawer-" + refVal16.value
      }, {
        default: toDisplayValue(() => [refVal15.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["drawer", "drawer-" + refVal16.value])
        }, [createElementVNode("div", Ml, [createElementVNode("h3", Tl, toDisplayString(refVal16.value === "left" ? "左侧" : refVal16.value === "right" ? "右侧" : "底部") + "抽屉", 1), createElementVNode("button", {
          class: "drawer-close",
          onClick: val3[51] || (val3[51] = val4 => refVal15.value = !1)
        }, "×")]), val3[168] || (val3[168] = createElementVNode("div", {
          class: "drawer-body"
        }, [createElementVNode("p", null, "这是抽屉组件的内容区域。"), createElementVNode("p", null, "可以放置导航菜单、表单或其他内容。"), createElementVNode("div", {
          class: "drawer-menu"
        }, [createElementVNode("div", {
          class: "drawer-menu-item"
        }, "个人资料"), createElementVNode("div", {
          class: "drawer-menu-item"
        }, "我的社团"), createElementVNode("div", {
          class: "drawer-menu-item"
        }, "消息通知"), createElementVNode("div", {
          class: "drawer-menu-item"
        }, "设置")])], -1))], 2)) : createCommentVNode("", !0)]),
        _: 1
      }, 8, ["name"])])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "actionsheet-overlay"
      }, {
        default: toDisplayValue(() => [refVal28.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "actionsheet-overlay",
          onClick: val3[52] || (val3[52] = val4 => refVal28.value = !1)
        })) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "actionsheet"
      }, {
        default: toDisplayValue(() => [refVal28.value ? (openBlock(), createElementBlock("div", Vl, [createElementVNode("div", Fl, [createElementVNode("button", {
          class: "actionsheet-item",
          onClick: val3[53] || (val3[53] = val4 => {
            refVal28.value = !1, zz5("已保存到相册", "success");
          })
        }, "保存到相册"), createElementVNode("button", {
          class: "actionsheet-item",
          onClick: val3[54] || (val3[54] = val4 => refVal28.value = !1)
        }, "分享给朋友"), createElementVNode("button", {
          class: "actionsheet-item",
          onClick: val3[55] || (val3[55] = val4 => refVal28.value = !1)
        }, "复制链接"), createElementVNode("button", {
          class: "actionsheet-item actionsheet-item-danger",
          onClick: val3[56] || (val3[56] = val4 => refVal28.value = !1)
        }, "举报")]), createElementVNode("button", {
          class: "actionsheet-cancel",
          onClick: val3[57] || (val3[57] = val4 => refVal28.value = !1)
        }, "取消")])) : createCommentVNode("", !0)]),
        _: 1
      })])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "loading"
      }, {
        default: toDisplayValue(() => [refVal17.value ? (openBlock(), createElementBlock("div", Sl, [...(val3[169] || (val3[169] = [createElementVNode("div", {
          class: "loading-content"
        }, [createElementVNode("div", {
          class: "loading-spinner loading-spinner-lg"
        }), createElementVNode("p", {
          class: "loading-text"
        }, "加载中...")], -1)]))])) : createCommentVNode("", !0)]),
        _: 1
      })])), (openBlock(), createBlock(Teleport, {
        to: "body"
      }, [createVNode(withSlots, {
        name: "imagepreview"
      }, {
        default: toDisplayValue(() => [refVal31.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "imagepreview-overlay",
          onClick: val3[59] || (val3[59] = val4 => refVal31.value = !1)
        }, [val3[170] || (val3[170] = createElementVNode("div", {
          class: "imagepreview-content"
        }, [createElementVNode("div", {
          class: "imagepreview-placeholder"
        }, [createElementVNode("span", null, "图片预览区域"), createElementVNode("span", null, "点击任意位置关闭")])], -1)), createElementVNode("button", {
          class: "imagepreview-close",
          onClick: val3[58] || (val3[58] = val4 => refVal31.value = !1)
        }, "×")])) : createCommentVNode("", !0)]),
        _: 1
      })])), val3[176] || (val3[176] = createElementVNode("button", {
        class: "fab",
        "aria-label": "添加"
      }, [createElementVNode("span", null, "+")], -1)), createElementVNode("nav", Pl, [createElementVNode("button", {
        class: normalizeClass(["bottom-nav-item", {
          active: refVal2.value === "home"
        }]),
        onClick: val3[60] || (val3[60] = val4 => refVal2.value = "home")
      }, [...(val3[171] || (val3[171] = [createElementVNode("span", {
        class: "bottom-nav-icon"
      }, "⌂", -1), createElementVNode("span", {
        class: "bottom-nav-label"
      }, "首页", -1)]))], 2), createElementVNode("button", {
        class: normalizeClass(["bottom-nav-item", {
          active: refVal2.value === "activity"
        }]),
        onClick: val3[61] || (val3[61] = val4 => refVal2.value = "activity")
      }, [...(val3[172] || (val3[172] = [createElementVNode("span", {
        class: "bottom-nav-icon"
      }, "★", -1), createElementVNode("span", {
        class: "bottom-nav-label"
      }, "活动", -1)]))], 2), createElementVNode("button", {
        class: normalizeClass(["bottom-nav-item", {
          active: refVal2.value === "message"
        }]),
        onClick: val3[62] || (val3[62] = val4 => refVal2.value = "message")
      }, [...(val3[173] || (val3[173] = [createElementVNode("span", {
        class: "bottom-nav-icon"
      }, "✉", -1), createElementVNode("span", {
        class: "bottom-nav-label"
      }, "消息", -1)]))], 2), createElementVNode("button", {
        class: normalizeClass(["bottom-nav-item", {
          active: refVal2.value === "mine"
        }]),
        onClick: val3[63] || (val3[63] = val4 => refVal2.value = "mine")
      }, [...(val3[174] || (val3[174] = [createElementVNode("span", {
        class: "bottom-nav-icon"
      }, "☺", -1), createElementVNode("span", {
        class: "bottom-nav-label"
      }, "我的", -1)]))], 2)])]));
    }
  }),
  Al = withScopeId(Dl, [["__scopeId", "data-v-7ad470a9"]]);
/* index 运行时导出（已语义化） */
export { Al as default };