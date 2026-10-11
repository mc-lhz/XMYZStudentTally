/*!
 * 页面模块：辩论赛投屏二维码（VoteScreenPage-B）
 * 路由：/vote/screen   name=debate-vote-screen   层级=1   需登录=否
 * 功能：公开的「辩论赛投屏二维码」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/VoteScreenPage-B-LWpR1x.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, applyDirectives, inject, ref, watch, onMounted, directiveBum, createElementBlock, createCommentVNode, createElementVNode, toDisplayString, Fragment, normalizeClass, unref, createTextVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 browser（站点内功能模块） */
import { mathHelper_zb5 } from "./browser-COI8Ulb7.js";
/* 导入：本地模块 debate（站点内功能模块） */
import { getDebateRound } from "./debate-B8dkqKam.js";
/* 导入：本地模块 useDebateSocket（站点内功能模块） */
import { createDebateSocket } from "./useDebateSocket-8JmRCem2.js";
/* 模板属性配置：screen-root */
/* 模板属性配置：placeholder */
/* 模板属性配置：head */
/* 模板属性配置：sides */
/* 模板属性配置：side */
/* 模板属性配置：side */
/* 模板属性配置：qr-stage */
/* 模板属性配置：countdown-wrap */
/* 模板属性配置：countdown-label */
/* 模板属性配置：countdown-label pending */
/* 模板属性配置：countdown-big pending */
const VoteScreenPageConfig = {
    class: "screen-root"
  },
  local_zbb0 = {
    key: 0,
    class: "placeholder"
  },
  local_zbb1 = {
    key: 1,
    class: "placeholder error"
  },
  local_zbb2 = {
    class: "head"
  },
  local_zbb3 = {
    class: "topic"
  },
  local_zbb4 = {
    class: "sides"
  },
  local_zbb5 = {
    class: "side"
  },
  local_zbb6 = {
    class: "side"
  },
  local_zbb7 = {
    key: 0,
    class: "qr-stage"
  },
  local_zbb8 = {
    class: "countdown-wrap"
  },
  local_zbb9 = {
    key: 0,
    class: "countdown-label"
  },
  VoteScreenPageConfig_2 = {
    key: 1,
    class: "countdown-label pending"
  },
  VoteScreenPageConfig_3 = {
    key: 3,
    class: "countdown-big pending"
  },
  ee = {
    key: 4,
    class: "vote-tally"
  },
  te = {
    class: "qr-area"
  },
  ae = ["src"],
  se = {
    key: 1,
    class: "ended-stage"
  },
  le = defineComponent({
    __name: "VoteScreenPage",
    setup(val) {
      const val2 = inject(),
        val3 = applyDirectives(() => Number(val2.query.round || 0)),
        refVal = ref(null),
        refVal2 = ref(!0),
        refVal3 = ref(""),
        refVal4 = ref(""),
        refVal5 = ref(null);
      let val4 = null,
        val5 = null;
      const val6 = applyDirectives(() => val3.value ? `${window.location.origin}/vote?round=${val3.value}` : ""),
        refVal6 = ref(null);
      watch(val3, val1 => refVal6.value = val1 || null, {
        immediate: !0
      });
      const {
          result: val7
        } = createDebateSocket(refVal6),
        val8 = applyDirectives(() => !refVal.value || !refVal.value.isActive && !refVal.value.startedAt ? "pending" : !refVal.value.isActive || refVal.value.locked ? "ended" : "live");
      async function zz0() {
        if (!val3.value) {
          refVal3.value = "URL 缺少 round 参数", refVal2.value = !1;
          return;
        }
        try {
          const debateRound = await getDebateRound(val3.value);
          debateRound.data.code === 200 && debateRound.data.data ? (refVal.value = debateRound.data.data, refVal5.value = refVal.value.secondsLeft, refVal.value.startedAt && refVal.value.isActive && !refVal.value.locked ? zz1() : val5 && clearInterval(val5)) : refVal3.value = debateRound.data.message || "场次不存在";
        } catch (val1) {
          refVal3.value = val1?.message || "加载失败";
        } finally {
          refVal2.value = !1;
        }
      }
      function zz1() {
        val5 && clearInterval(val5), val5 = setInterval(() => {
          refVal5.value !== null && (refVal5.value = Math.max(0, refVal5.value - 1), refVal5.value === 0 && refVal.value && (refVal.value.locked = !0, val5 && clearInterval(val5)));
        }, 1e3);
      }
      async function zz2() {
        if (val6.value) try {
          refVal4.value = await mathHelper_zb5.toDataURL(val6.value, {
            width: 900,
            margin: 1,
            errorCorrectionLevel: "M",
            color: {
              dark: "#111827",
              light: "#ffffff"
            }
          });
        } catch (val1) {
          console.error("QR generation failed", val1);
        }
      }
      function zz3(val1) {
        if (val1 === null) return "--:--";
        const val9 = Math.floor(val1 / 60),
          val10 = val1 % 60;
        return `${String(val9).padStart(2, "0")}:${String(val10).padStart(2, "0")}`;
      }
      function zz4() {
        document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.();
      }
      return onMounted(async () => {
        await zz0(), await zz2(), val4 = setInterval(zz0, 5e3);
      }), directiveBum(() => {
        val4 && clearInterval(val4), val5 && clearInterval(val5);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val9) => (openBlock(), createElementBlock("div", VoteScreenPageConfig, [refVal2.value ? (openBlock(), createElementBlock("div", local_zbb0, [...(val9[0] || (val9[0] = [createElementVNode("div", {
        class: "spinner"
      }, null, -1), createElementVNode("div", null, "加载中…", -1)]))])) : refVal3.value ? (openBlock(), createElementBlock("div", local_zbb1, toDisplayString(refVal3.value), 1)) : refVal.value ? (openBlock(), createElementBlock(Fragment, {
        key: 2
      }, [createElementVNode("header", local_zbb2, [createElementVNode("div", local_zbb3, toDisplayString(refVal.value.topic), 1), createElementVNode("div", local_zbb4, [createElementVNode("span", local_zbb5, toDisplayString(refVal.value.sideAName), 1), val9[1] || (val9[1] = createElementVNode("span", {
        class: "vs"
      }, "VS", -1)), createElementVNode("span", local_zbb6, toDisplayString(refVal.value.sideBName), 1)]), createElementVNode("button", {
        class: "fs-btn",
        onClick: zz4,
        title: "全屏"
      }, [...(val9[2] || (val9[2] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
      })], -1)]))])]), val8.value !== "ended" ? (openBlock(), createElementBlock("main", local_zbb7, [createElementVNode("div", local_zbb8, [val8.value === "live" ? (openBlock(), createElementBlock("div", local_zbb9, "距离投票结束还有")) : (openBlock(), createElementBlock("div", VoteScreenPageConfig_2, "等待主持人开启")), val8.value === "live" ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(["countdown-big", {
          urgent: (refVal5.value ?? 0) < 60
        }])
      }, toDisplayString(zz3(refVal5.value)), 3)) : (openBlock(), createElementBlock("div", VoteScreenPageConfig_3, "--:--")), unref(val7) && unref(val7).totalVotes > 0 ? (openBlock(), createElementBlock("div", ee, [val9[3] || (val9[3] = createTextVNode(" 已投 ", -1)), createElementVNode("b", null, toDisplayString(unref(val7).totalVotes), 1), val9[4] || (val9[4] = createTextVNode(" 票 ", -1))])) : createCommentVNode("", !0)]), createElementVNode("div", te, [refVal4.value ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: refVal4.value,
        alt: "投票二维码",
        class: "qr-img"
      }, null, 8, ae)) : createCommentVNode("", !0), val9[5] || (val9[5] = createElementVNode("div", {
        class: "scan-title"
      }, "微信扫一扫参与投票", -1))])])) : (openBlock(), createElementBlock("main", se, [...(val9[6] || (val9[6] = [createElementVNode("div", {
        class: "ended-title"
      }, "本场投票已结束", -1), createElementVNode("div", {
        class: "ended-sub"
      }, "感谢参与", -1)]))]))], 64)) : createCommentVNode("", !0)]));
    }
  }),
  de = withScopeId(le, [["__scopeId", "data-v-27dced3a"]]);
/* index 运行时导出（已语义化） */
export { de as default };