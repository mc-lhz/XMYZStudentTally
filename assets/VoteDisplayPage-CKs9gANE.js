/*!
 * 页面模块：辩论赛实时结果（VoteDisplayPage）
 * 路由：/vote/display   name=debate-vote-display   层级=1   需登录=否
 * 功能：公开的「辩论赛实时结果」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoteDisplayPage-CKs9gANE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, watch, onMounted, inject, directiveBum, createElementBlock, createCommentVNode, createElementVNode, Fragment, toDisplayString, normalizeClass, createTextVNode, resolveRaw, renderList, withModifiers, withDirectives, vModelText, withKeys, deepWatchOptions, useToast, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 useDebateSocket（站点内功能模块） */
import { createDebateSocket as we } from "./useDebateSocket-8JmRCem2.js";
/* 导入：本地模块 debate（站点内功能模块） */
import { getDebateActive as he, getDebateResults, helper_zb13, putDebateOperatorRoundsReset as ge, putDebateOperatorRoundsLock as Ce, putDebateOperatorRoundsActive as Ve, putDebateOperatorRounds as Ae } from "./debate-B8dkqKam.js";
const Se = {
    class: "display-root"
  },
  Be = {
    key: 0,
    class: "placeholder"
  },
  xe = {
    class: "head"
  },
  $e = {
    class: "topic-block"
  },
  Ne = {
    class: "topic"
  },
  De = {
    class: "sides"
  },
  Ue = {
    class: "side a"
  },
  Oe = {
    class: "side b"
  },
  Re = {
    class: "meta-block"
  },
  Ie = {
    class: "total"
  },
  Me = {
    class: "total-num"
  },
  Pe = {
    key: 0
  },
  Ee = {
    key: 1
  },
  Te = {
    class: "bars"
  },
  Le = {
    class: "bar-row"
  },
  ze = {
    class: "bar-label a"
  },
  He = {
    class: "bar-track"
  },
  Ke = {
    class: "bar-num"
  },
  qe = {
    class: "bar-row"
  },
  Fe = {
    class: "bar-label b"
  },
  We = {
    class: "bar-track"
  },
  Ye = {
    class: "bar-num"
  },
  je = {
    key: 0,
    class: "debaters-grid"
  },
  Ge = {
    class: "dcol"
  },
  Je = {
    class: "rank"
  },
  Qe = {
    class: "dname"
  },
  Xe = {
    class: "dvotes"
  },
  Ze = {
    class: "dcol"
  },
  es = {
    class: "rank"
  },
  ss = {
    class: "dname"
  },
  ts = {
    class: "dvotes"
  },
  as = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  ls = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  os = {
    key: 0,
    class: "op-menu"
  },
  ns = {
    class: "modal-card"
  },
  is = {
    key: 0,
    class: "modal-error"
  },
  us = {
    class: "modal-foot"
  },
  rs = ["disabled"],
  ds = {
    class: "modal-card editor"
  },
  cs = {
    class: "editor-body"
  },
  vs = {
    class: "field"
  },
  ps = {
    class: "field-row"
  },
  ms = {
    class: "field"
  },
  fs = {
    class: "field"
  },
  bs = {
    class: "field-row"
  },
  ys = {
    class: "field"
  },
  ks = {
    class: "field"
  },
  _s = {
    class: "field check"
  },
  ws = {
    class: "debater-editor"
  },
  hs = {
    class: "dec-col"
  },
  gs = {
    class: "dec-head"
  },
  Cs = ["onUpdate:modelValue"],
  Vs = ["onUpdate:modelValue"],
  As = ["onClick"],
  Ss = {
    class: "dec-col"
  },
  Bs = {
    class: "dec-head"
  },
  xs = ["onUpdate:modelValue"],
  $s = ["onUpdate:modelValue"],
  Ns = ["onClick"],
  Ds = {
    class: "modal-foot"
  },
  Us = ["disabled"],
  VoteDisplayPageConst0 = "debate_op_pwd",
  Os = defineComponent({
    __name: "VoteDisplayPage",
    setup(val) {
      const val2 = inject(),
        useToast1 = useToast(),
        refVal = ref(null),
        {
          result: val3
        } = we(refVal),
        refVal2 = ref(null),
        val4 = applyDirectives(() => val3.value || refVal2.value),
        refVal3 = ref(null);
      let val5 = null;
      function zz0() {
        val5 && clearInterval(val5), !(!val4.value || val4.value.locked) && (val5 = setInterval(() => {
          if (refVal3.value === null || refVal3.value <= 0) {
            val5 && clearInterval(val5);
            return;
          }
          refVal3.value -= 1;
        }, 1e3));
      }
      watch(() => val4.value?.secondsLeft, val1 => {
        val1 == null ? refVal3.value = null : refVal3.value = val1, zz0();
      }), watch(() => val4.value?.locked, val1 => {
        val1 && val5 && (clearInterval(val5), refVal3.value = 0);
      });
      const val6 = applyDirectives(() => (val4.value?.debaterVotes || []).filter(val1 => val1.side === "A").sort((val1, val9) => val9.votes - val1.votes)),
        val7 = applyDirectives(() => (val4.value?.debaterVotes || []).filter(val1 => val1.side === "B").sort((val1, val9) => val9.votes - val1.votes)),
        val8 = applyDirectives(() => val6.value.length <= 1 && val7.value.length <= 1);
      function zz1(val1) {
        if (!val4.value) return 0;
        const val9 = val4.value.supportA + val4.value.supportB;
        return val9 === 0 ? 0 : Math.round(val1 / val9 * 100);
      }
      function zz2(val1) {
        if (val1 == null) return "--:--";
        const val9 = Math.floor(val1 / 60),
          val10 = val1 % 60;
        return `${String(val9).padStart(2, "0")}:${String(val10).padStart(2, "0")}`;
      }
      const refVal4 = ref(!1),
        refVal5 = ref(""),
        refVal6 = ref(!1),
        refVal7 = ref(""),
        refVal8 = ref(!1),
        refVal9 = ref(null),
        refVal10 = ref(!1);
      function zz3() {
        return refVal.value && sessionStorage.getItem(`${VoteDisplayPageConst0}:${refVal.value}`) || "";
      }
      function zz4(val1) {
        refVal.value && sessionStorage.setItem(`${VoteDisplayPageConst0}:${refVal.value}`, val1);
      }
      function zz5() {
        refVal.value && sessionStorage.removeItem(`${VoteDisplayPageConst0}:${refVal.value}`);
      }
      async function zz6() {
        if (!refVal.value) return;
        const val1 = zz3();
        if (val1) try {
          const val9 = await helper_zb13(refVal.value, val1);
          val9.data.code === 200 && val9.data.data ? (refVal9.value = val9.data.data, refVal8.value = !0) : zz5();
        } catch {
          zz5();
        }
      }
      function zz7() {
        refVal7.value = "", refVal5.value = "", refVal4.value = !0;
      }
      async function zz8() {
        if (!refVal.value) return;
        const val1 = refVal5.value.trim();
        if (!val1) {
          refVal7.value = "请输入密码";
          return;
        }
        refVal6.value = !0, refVal7.value = "";
        try {
          const val9 = await helper_zb13(refVal.value, val1);
          val9.data.code === 200 && val9.data.data ? (zz4(val1), refVal9.value = val9.data.data, refVal8.value = !0, refVal4.value = !1, refVal10.value = !0, useToast1.success("已进入操作员模式")) : refVal7.value = val9.data.message || "密码错误";
        } catch (val9) {
          refVal7.value = val9?.message || "验证失败";
        } finally {
          refVal6.value = !1;
        }
      }
      function zz9() {
        zz5(), refVal8.value = !1, refVal9.value = null, refVal10.value = !1;
      }
      async function zz10() {
        if (refVal.value && confirm("确认重置倒计时？时钟会回到满时长重新开始，已投票数保留。")) try {
          const val1 = await ge(refVal.value, zz3());
          val1.data.code === 200 ? (useToast1.success("已重置倒计时"), await zz14()) : useToast1.error(val1.data.message || "操作失败");
        } catch (val1) {
          useToast1.error(val1?.message || "操作失败");
        }
      }
      async function zz11() {
        if (refVal.value && confirm("确认立即锁票？观众将无法再投票。")) try {
          const val1 = await Ce(refVal.value, zz3());
          val1.data.code === 200 ? (useToast1.success("已锁票"), await zz14()) : useToast1.error(val1.data.message || "操作失败");
        } catch (val1) {
          useToast1.error(val1?.message || "操作失败");
        }
      }
      async function zz12() {
        if (refVal.value && confirm(`确认激活此场并开始计时？
其他场次会被自动停用。`)) try {
          const val1 = await Ve(refVal.value, zz3());
          val1.data.code === 200 ? (useToast1.success("已激活"), await zz14()) : useToast1.error(val1.data.message || "操作失败");
        } catch (val1) {
          useToast1.error(val1?.message || "操作失败");
        }
      }
      function zz13() {
        if (!refVal.value) return;
        const text = `${window.location.origin}/vote/screen?round=${refVal.value}`;
        navigator.clipboard.writeText(text).then(() => useToast1.success("投屏二维码链接已复制"), () => useToast1.error("复制失败：" + text));
      }
      async function zz14() {
        if (refVal.value) try {
          const val1 = await helper_zb13(refVal.value, zz3());
          val1.data.code === 200 && val1.data.data && (refVal9.value = val1.data.data);
          const val9 = await getDebateResults(refVal.value);
          val9.data.code === 200 && (refVal2.value = val9.data.data);
        } catch {}
      }
      const refVal11 = ref(!1),
        refVal12 = ref({
          topic: "",
          sideAName: "",
          sideBName: "",
          voteDurationSeconds: 600,
          displayOrder: 0,
          publicDisplay: !1,
          debaters: []
        }),
        refVal13 = ref([]),
        refVal14 = ref([]),
        refVal15 = ref(!1);
      function zz15() {
        const refVal9Value = refVal9.value;
        refVal9Value && (refVal12.value = {
          topic: refVal9Value.topic,
          sideAName: refVal9Value.sideAName,
          sideBName: refVal9Value.sideBName,
          voteDurationSeconds: refVal9Value.voteDurationSeconds,
          displayOrder: refVal9Value.displayOrder,
          publicDisplay: refVal9Value.publicDisplay === 1,
          debaters: []
        }, refVal13.value = (refVal9Value.debaters || []).filter(val9 => val9.side === "A").map(val9 => ({
          name: val9.name,
          side: "A",
          position: val9.position,
          displayOrder: val9.displayOrder
        })), refVal14.value = (refVal9Value.debaters || []).filter(val9 => val9.side === "B").map(val9 => ({
          name: val9.name,
          side: "B",
          position: val9.position,
          displayOrder: val9.displayOrder
        })), refVal11.value = !0);
      }
      function zz16(val1) {
        const val9 = val1 === "A" ? refVal13 : refVal14;
        val9.value.push({
          name: "",
          side: val1,
          position: "",
          displayOrder: val9.value.length + 1
        });
      }
      function zz17(val1) {
        refVal13.value = refVal13.value.filter(val9 => val9 !== val1), refVal14.value = refVal14.value.filter(val9 => val9 !== val1);
      }
      async function zz18() {
        if (!refVal.value) return;
        const val1 = [...refVal13.value, ...refVal14.value].filter(val9 => val9.name.trim());
        if (!refVal12.value.topic.trim()) {
          useToast1.error("辩题不能为空");
          return;
        }
        if (val1.length === 0) {
          useToast1.error("至少需要一名辩手");
          return;
        }
        refVal12.value.debaters = val1, refVal15.value = !0;
        try {
          const val9 = await Ae(refVal.value, zz3(), refVal12.value);
          val9.data.code === 200 ? (refVal9.value = val9.data.data, useToast1.success("已保存"), refVal11.value = !1) : useToast1.error(val9.data.message || "保存失败");
        } catch (val9) {
          useToast1.error(val9?.message || "保存失败");
        } finally {
          refVal15.value = !1;
        }
      }
      return onMounted(async () => {
        const val1 = val2.query.round;
        if (val1) refVal.value = Number(val1);else try {
          const val9 = await he();
          val9.data.code === 200 && val9.data.data && (refVal.value = val9.data.data.id);
        } catch {}
        if (refVal.value) {
          try {
            const val9 = await getDebateResults(refVal.value);
            val9.data.code === 200 && (refVal2.value = val9.data.data);
          } catch {}
          await zz6();
        }
      }), directiveBum(() => {
        val5 && clearInterval(val5);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val9) => (openBlock(), createElementBlock("div", Se, [val4.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("header", xe, [createElementVNode("div", $e, [createElementVNode("h1", Ne, toDisplayString(val4.value.topic), 1), createElementVNode("div", De, [createElementVNode("span", Ue, toDisplayString(val4.value.sideAName), 1), val9[15] || (val9[15] = createElementVNode("span", {
        class: "vs"
      }, "VS", -1)), createElementVNode("span", Oe, toDisplayString(val4.value.sideBName), 1)])]), createElementVNode("div", Re, [createElementVNode("div", Ie, [createElementVNode("span", Me, toDisplayString(val4.value.totalVotes), 1), val9[16] || (val9[16] = createElementVNode("span", {
        class: "total-label"
      }, "总票数", -1))]), createElementVNode("div", {
        class: normalizeClass(["badge", val4.value.locked ? "locked" : "live"])
      }, [val4.value.locked ? (openBlock(), createElementBlock("span", Pe, "已锁票")) : (openBlock(), createElementBlock("span", Ee, [val9[17] || (val9[17] = createElementVNode("span", {
        class: "dot"
      }, null, -1)), createTextVNode(" 进行中 · " + toDisplayString(zz2(refVal3.value)), 1)]))], 2)])]), createElementVNode("section", Te, [createElementVNode("div", Le, [createElementVNode("div", ze, toDisplayString(val4.value.sideAName) + "（正方）", 1), createElementVNode("div", He, [createElementVNode("div", {
        class: "bar-fill a",
        style: resolveRaw({
          width: zz1(val4.value.supportA) + "%"
        })
      }, null, 4), createElementVNode("span", Ke, toDisplayString(val4.value.supportA), 1)])]), createElementVNode("div", qe, [createElementVNode("div", Fe, toDisplayString(val4.value.sideBName) + "（反方）", 1), createElementVNode("div", We, [createElementVNode("div", {
        class: "bar-fill b",
        style: resolveRaw({
          width: zz1(val4.value.supportB) + "%"
        })
      }, null, 4), createElementVNode("span", Ye, toDisplayString(val4.value.supportB), 1)])])]), val8.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("section", je, [createElementVNode("div", Ge, [createElementVNode("h3", null, toDisplayString(val4.value.sideAName) + " 佳辩排行", 1), createElementVNode("ol", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val6.value, val10 => (openBlock(), createElementBlock("li", {
        key: val10.id
      }, [createElementVNode("span", Je, toDisplayString(val10.position || ""), 1), createElementVNode("span", Qe, toDisplayString(val10.name), 1), createElementVNode("span", Xe, toDisplayString(val10.votes), 1)]))), 128))])]), createElementVNode("div", Ze, [createElementVNode("h3", null, toDisplayString(val4.value.sideBName) + " 佳辩排行", 1), createElementVNode("ol", null, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val7.value, val10 => (openBlock(), createElementBlock("li", {
        key: val10.id
      }, [createElementVNode("span", es, toDisplayString(val10.position || ""), 1), createElementVNode("span", ss, toDisplayString(val10.name), 1), createElementVNode("span", ts, toDisplayString(val10.votes), 1)]))), 128))])])]))], 64)) : (openBlock(), createElementBlock("div", Be, [...(val9[14] || (val9[14] = [createElementVNode("div", {
        class: "spinner"
      }, null, -1), createElementVNode("div", null, "加载中…", -1)]))])), refVal8.value ? (openBlock(), createElementBlock("div", {
        key: 3,
        class: normalizeClass(["op-toolbar", {
          open: refVal10.value
        }])
      }, [createElementVNode("button", {
        class: "op-toggle",
        onClick: val9[0] || (val9[0] = val10 => refVal10.value = !refVal10.value),
        title: "操作员面板"
      }, [refVal10.value ? (openBlock(), createElementBlock("svg", ls, [...(val9[20] || (val9[20] = [createElementVNode("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
      }, null, -1), createElementVNode("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
      }, null, -1)]))])) : (openBlock(), createElementBlock("svg", as, [...(val9[19] || (val9[19] = [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      }, null, -1), createElementVNode("path", {
        d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      }, null, -1)]))]))]), refVal10.value ? (openBlock(), createElementBlock("div", os, [createElementVNode("div", {
        class: "op-header"
      }, [val9[21] || (val9[21] = createElementVNode("span", {
        class: "op-title"
      }, "操作员", -1)), createElementVNode("button", {
        class: "op-logout",
        onClick: zz9
      }, "登出")]), createElementVNode("button", {
        class: "op-btn",
        onClick: zz15
      }, [...(val9[22] || (val9[22] = [createElementVNode("span", {
        class: "op-icon"
      }, "✏️", -1), createElementVNode("span", null, "编辑场次信息", -1)]))]), createElementVNode("button", {
        class: "op-btn",
        onClick: zz10
      }, [...(val9[23] || (val9[23] = [createElementVNode("span", {
        class: "op-icon"
      }, "🔄", -1), createElementVNode("span", null, "重置倒计时", -1)]))]), refVal9.value && refVal9.value.isActive !== 1 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "op-btn",
        onClick: zz12
      }, [...(val9[24] || (val9[24] = [createElementVNode("span", {
        class: "op-icon"
      }, "▶️", -1), createElementVNode("span", null, "激活并开始", -1)]))])) : createCommentVNode("", !0), refVal9.value && refVal9.value.isActive === 1 && refVal9.value.locked !== 1 ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "op-btn danger",
        onClick: zz11
      }, [...(val9[25] || (val9[25] = [createElementVNode("span", {
        class: "op-icon"
      }, "🔒", -1), createElementVNode("span", null, "立即锁票", -1)]))])) : createCommentVNode("", !0), createElementVNode("button", {
        class: "op-btn",
        onClick: zz13
      }, [...(val9[26] || (val9[26] = [createElementVNode("span", {
        class: "op-icon"
      }, "🔗", -1), createElementVNode("span", null, "复制二维码链接", -1)]))])])) : createCommentVNode("", !0)], 2)) : (openBlock(), createElementBlock("button", {
        key: 2,
        class: "op-trigger",
        onClick: zz7,
        title: "操作员登录"
      }, [...(val9[18] || (val9[18] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("rect", {
        x: "3",
        y: "11",
        width: "18",
        height: "11",
        rx: "2"
      }), createElementVNode("path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4"
      })], -1)]))])), refVal4.value ? (openBlock(), createElementBlock("div", {
        key: 4,
        class: "modal-mask",
        onClick: val9[3] || (val9[3] = withModifiers(val10 => refVal4.value = !1, ["self"]))
      }, [createElementVNode("div", ns, [val9[27] || (val9[27] = createElementVNode("h2", null, "操作员登录", -1)), val9[28] || (val9[28] = createElementVNode("p", {
        class: "modal-sub"
      }, "输入管理员提供的 6 位操作员密码", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[1] || (val9[1] = val10 => refVal5.value = val10),
        class: "pwd-input",
        type: "tel",
        inputmode: "numeric",
        maxlength: "6",
        placeholder: "••••••",
        autofocus: "",
        onKeyup: withKeys(zz8, ["enter"])
      }, null, 544), [[vModelText, refVal5.value]]), refVal7.value ? (openBlock(), createElementBlock("p", is, toDisplayString(refVal7.value), 1)) : createCommentVNode("", !0), createElementVNode("div", us, [createElementVNode("button", {
        class: "modal-btn ghost",
        onClick: val9[2] || (val9[2] = val10 => refVal4.value = !1)
      }, "取消"), createElementVNode("button", {
        class: "modal-btn primary",
        disabled: refVal6.value,
        onClick: zz8
      }, toDisplayString(refVal6.value ? "验证中…" : "进入"), 9, rs)])])])) : createCommentVNode("", !0), refVal11.value ? (openBlock(), createElementBlock("div", {
        key: 5,
        class: "modal-mask",
        onClick: val9[13] || (val9[13] = withModifiers(val10 => refVal11.value = !1, ["self"]))
      }, [createElementVNode("div", ds, [val9[37] || (val9[37] = createElementVNode("h2", null, "编辑场次", -1)), createElementVNode("div", cs, [createElementVNode("label", vs, [val9[29] || (val9[29] = createElementVNode("span", null, "辩题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[4] || (val9[4] = val10 => refVal12.value.topic = val10),
        class: "form-input",
        type: "text"
      }, null, 512), [[vModelText, refVal12.value.topic]])]), createElementVNode("div", ps, [createElementVNode("label", ms, [val9[30] || (val9[30] = createElementVNode("span", null, "正方名称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[5] || (val9[5] = val10 => refVal12.value.sideAName = val10),
        class: "form-input",
        type: "text"
      }, null, 512), [[vModelText, refVal12.value.sideAName]])]), createElementVNode("label", fs, [val9[31] || (val9[31] = createElementVNode("span", null, "反方名称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[6] || (val9[6] = val10 => refVal12.value.sideBName = val10),
        class: "form-input",
        type: "text"
      }, null, 512), [[vModelText, refVal12.value.sideBName]])])]), createElementVNode("div", bs, [createElementVNode("label", ys, [val9[32] || (val9[32] = createElementVNode("span", null, "时长（秒）", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[7] || (val9[7] = val10 => refVal12.value.voteDurationSeconds = val10),
        class: "form-input",
        type: "number"
      }, null, 512), [[vModelText, refVal12.value.voteDurationSeconds, void 0, {
        number: !0
      }]])]), createElementVNode("label", ks, [val9[33] || (val9[33] = createElementVNode("span", null, "顺序", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[8] || (val9[8] = val10 => refVal12.value.displayOrder = val10),
        class: "form-input",
        type: "number"
      }, null, 512), [[vModelText, refVal12.value.displayOrder, void 0, {
        number: !0
      }]])]), createElementVNode("label", _s, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val9[9] || (val9[9] = val10 => refVal12.value.publicDisplay = val10),
        type: "checkbox"
      }, null, 512), [[deepWatchOptions, refVal12.value.publicDisplay]]), val9[34] || (val9[34] = createTextVNode(" 大屏公开 ", -1))])]), createElementVNode("div", ws, [createElementVNode("div", hs, [createElementVNode("div", gs, [val9[35] || (val9[35] = createElementVNode("h4", null, "正方辩手", -1)), createElementVNode("button", {
        type: "button",
        class: "add-btn",
        onClick: val9[10] || (val9[10] = val10 => zz16("A"))
      }, "+ 添加")]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal13.value, (val10, val11) => (openBlock(), createElementBlock("div", {
        key: `a-${val11}`,
        class: "d-row"
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val12 => val10.position = val12,
        class: "d-input pos",
        placeholder: "一辩"
      }, null, 8, Cs), [[vModelText, val10.position]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val12 => val10.name = val12,
        class: "d-input name",
        placeholder: "姓名"
      }, null, 8, Vs), [[vModelText, val10.name]]), createElementVNode("button", {
        class: "d-remove",
        onClick: val12 => zz17(val10),
        type: "button"
      }, "×", 8, As)]))), 128))]), createElementVNode("div", Ss, [createElementVNode("div", Bs, [val9[36] || (val9[36] = createElementVNode("h4", null, "反方辩手", -1)), createElementVNode("button", {
        type: "button",
        class: "add-btn",
        onClick: val9[11] || (val9[11] = val10 => zz16("B"))
      }, "+ 添加")]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal14.value, (val10, val11) => (openBlock(), createElementBlock("div", {
        key: `b-${val11}`,
        class: "d-row"
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val12 => val10.position = val12,
        class: "d-input pos",
        placeholder: "一辩"
      }, null, 8, xs), [[vModelText, val10.position]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val12 => val10.name = val12,
        class: "d-input name",
        placeholder: "姓名"
      }, null, 8, $s), [[vModelText, val10.name]]), createElementVNode("button", {
        class: "d-remove",
        onClick: val12 => zz17(val10),
        type: "button"
      }, "×", 8, Ns)]))), 128))])])]), createElementVNode("div", Ds, [createElementVNode("button", {
        class: "modal-btn ghost",
        onClick: val9[12] || (val9[12] = val10 => refVal11.value = !1)
      }, "取消"), createElementVNode("button", {
        class: "modal-btn primary",
        disabled: refVal15.value,
        onClick: zz18
      }, toDisplayString(refVal15.value ? "保存中…" : "保存"), 9, Us)])])])) : createCommentVNode("", !0)]));
    }
  }),
  Es = withScopeId(Os, [["__scopeId", "data-v-931d8ad0"]]);
/* index 运行时导出（已语义化） */
export { Es as default };