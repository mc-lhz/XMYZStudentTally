/*!
 * 模块：MusicPlayer-D（MusicPlayer-D-g6rRZK.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/MusicPlayer-D-g6rRZK.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, watch, directiveUm, createElementBlock, Fragment, createCommentVNode, createVNode, withSlots, toDisplayValue, normalizeClass, createElementVNode, withModifiers, toDisplayString, resolveRaw, openBlock, nextTick, useToast, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getMusicUrl } from "./campaign-BV1jJ5bx.js";
/* 模板属性配置：disc-wrapper */
const local_zb76 = ["src"],
  local_zb77 = {
    class: "disc-wrapper"
  },
  local_zb78 = ["src", "alt"],
  ee = {
    key: 0,
    class: "loading-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  se = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "currentColor"
  },
  le = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "currentColor"
  },
  te = {
    key: 0,
    class: "player-modal"
  },
  ae = {
    class: "album-disc-container"
  },
  oe = ["src", "alt"],
  ie = {
    class: "song-info"
  },
  ne = {
    class: "song-title"
  },
  ue = {
    class: "song-artist"
  },
  re = {
    class: "song-album"
  },
  ce = {
    class: "progress-section"
  },
  de = {
    class: "time-display"
  },
  ve = {
    class: "control-section"
  },
  fe = ["disabled"],
  me = {
    key: 0,
    class: "loading-spinner"
  },
  ye = {
    key: 1,
    viewBox: "0 0 24 24",
    fill: "currentColor"
  },
  ge = {
    key: 2,
    viewBox: "0 0 24 24",
    fill: "currentColor"
  },
  pe = defineComponent({
    __name: "MusicPlayer",
    props: {
      music: {}
    },
    emits: ["close"],
    setup(val, {
      emit: zz0
    }) {
      const val3 = val,
        val4 = zz0,
        useToast1 = useToast(),
        refVal = ref(!1),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref(""),
        refVal5 = ref(0),
        refVal6 = ref(0),
        refVal7 = ref(null),
        val5 = applyDirectives(() => refVal6.value === 0 ? 0 : refVal5.value / refVal6.value * 100);
      function zz1(val1) {
        const val6 = Math.floor(val1 / 60),
          val7 = Math.floor(val1 % 60);
        return `${val6}:${val7.toString().padStart(2, "0")}`;
      }
      async function zz2() {
        if (val3.music) {
          refVal3.value = !0;
          try {
            const val1 = await getMusicUrl(val3.music.mid);
            val1.data.code === 200 && val1.data.data.url ? (refVal4.value = val1.data.data.url.replace(/^http:\/\//, "https://"), await nextTick(), refVal7.value && refVal7.value.play().catch(() => {})) : useToast1.error("获取播放链接失败");
          } catch {
            useToast1.error("获取播放链接失败");
          } finally {
            refVal3.value = !1;
          }
        }
      }
      function zz3() {
        refVal7.value && (refVal2.value ? refVal7.value.pause() : refVal7.value.play());
      }
      function zz4() {
        refVal2.value = !0;
      }
      function zz5() {
        refVal2.value = !1;
      }
      function zz6() {
        refVal7.value && (refVal5.value = refVal7.value.currentTime);
      }
      function zz7() {
        refVal7.value && (refVal6.value = refVal7.value.duration);
      }
      function zz8() {
        refVal2.value = !1, refVal5.value = 0;
      }
      function zz9() {
        refVal7.value && !refVal2.value && refVal7.value.play().catch(() => {});
      }
      function zz10(val1) {
        if (!refVal7.value || refVal6.value === 0) return;
        const boundingClientRect = val1.currentTarget.getBoundingClientRect(),
          val7 = (val1.clientX - boundingClientRect.left) / boundingClientRect.width;
        refVal7.value.currentTime = val7 * refVal6.value;
      }
      function zz11() {
        refVal7.value && refVal7.value.pause(), refVal.value = !1, val4("close");
      }
      function zz12() {
        refVal.value = !0;
      }
      function zz13() {
        refVal.value = !1;
      }
      return watch(() => val3.music, val1 => {
        val1 && (refVal5.value = 0, refVal6.value = 0, refVal2.value = !1, refVal4.value = "", zz2());
      }, {
        immediate: !0
      }), directiveUm(() => {
        refVal7.value && refVal7.value.pause();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val6) => (openBlock(), createElementBlock(Fragment, null, [val.music ? (openBlock(), createElementBlock("audio", {
        key: 0,
        ref_key: "audioRef",
        ref: refVal7,
        src: refVal4.value,
        onPlay: zz4,
        onPause: zz5,
        onTimeupdate: zz6,
        onLoadedmetadata: zz7,
        onEnded: zz8,
        onCanplay: zz9
      }, null, 40, local_zb76)) : createCommentVNode("", !0), createVNode(withSlots, {
        name: "disc-pop"
      }, {
        default: toDisplayValue(() => [val.music ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["floating-disc", {
            playing: refVal2.value
          }]),
          onClick: zz12
        }, [createElementVNode("div", local_zb77, [createElementVNode("img", {
          src: val.music.cover,
          alt: val.music.title,
          class: "disc-cover"
        }, null, 8, local_zb78), val6[0] || (val6[0] = createElementVNode("div", {
          class: "disc-center"
        }, null, -1))]), createElementVNode("button", {
          class: "disc-control",
          onClick: withModifiers(zz3, ["stop"])
        }, [refVal3.value ? (openBlock(), createElementBlock("svg", ee, [...(val6[1] || (val6[1] = [createElementVNode("circle", {
          cx: "12",
          cy: "12",
          r: "10",
          "stroke-dasharray": "60",
          "stroke-linecap": "round"
        }, null, -1)]))])) : refVal2.value ? (openBlock(), createElementBlock("svg", se, [...(val6[2] || (val6[2] = [createElementVNode("rect", {
          x: "6",
          y: "4",
          width: "4",
          height: "16",
          rx: "1"
        }, null, -1), createElementVNode("rect", {
          x: "14",
          y: "4",
          width: "4",
          height: "16",
          rx: "1"
        }, null, -1)]))])) : (openBlock(), createElementBlock("svg", le, [...(val6[3] || (val6[3] = [createElementVNode("polygon", {
          points: "5 3 19 12 5 21 5 3"
        }, null, -1)]))]))])], 2)) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [val.music && refVal.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "player-modal-overlay",
          onClick: withModifiers(zz13, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-slide",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal.value ? (openBlock(), createElementBlock("div", te, [val6[10] || (val6[10] = createElementVNode("div", {
            class: "modal-handle"
          }, null, -1)), createElementVNode("div", {
            class: "modal-header"
          }, [val6[5] || (val6[5] = createElementVNode("span", {
            class: "modal-title"
          }, "正在播放", -1)), createElementVNode("button", {
            class: "close-btn",
            onClick: zz11
          }, [...(val6[4] || (val6[4] = [createElementVNode("svg", {
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
          })], -1)]))])]), createElementVNode("div", ae, [createElementVNode("div", {
            class: normalizeClass(["album-disc", {
              playing: refVal2.value
            }])
          }, [createElementVNode("img", {
            src: val.music.cover,
            alt: val.music.title,
            class: "album-cover"
          }, null, 8, oe), val6[6] || (val6[6] = createElementVNode("div", {
            class: "album-center"
          }, null, -1))], 2)]), createElementVNode("div", ie, [createElementVNode("h2", ne, toDisplayString(val.music.title), 1), createElementVNode("p", ue, toDisplayString(val.music.singer), 1), createElementVNode("p", re, toDisplayString(val.music.album), 1)]), createElementVNode("div", ce, [createElementVNode("div", {
            class: "progress-bar",
            onClick: zz10
          }, [val6[7] || (val6[7] = createElementVNode("div", {
            class: "progress-bg"
          }, null, -1)), createElementVNode("div", {
            class: "progress-fill",
            style: resolveRaw({
              width: `${val5.value}%`
            })
          }, null, 4), createElementVNode("div", {
            class: "progress-thumb",
            style: resolveRaw({
              left: `${val5.value}%`
            })
          }, null, 4)]), createElementVNode("div", de, [createElementVNode("span", null, toDisplayString(zz1(refVal5.value)), 1), createElementVNode("span", null, toDisplayString(zz1(refVal6.value)), 1)])]), createElementVNode("div", ve, [createElementVNode("button", {
            class: normalizeClass(["main-play-btn", {
              loading: refVal3.value
            }]),
            disabled: refVal3.value || !refVal4.value,
            onClick: zz3
          }, [refVal3.value ? (openBlock(), createElementBlock("div", me)) : refVal2.value ? (openBlock(), createElementBlock("svg", ye, [...(val6[8] || (val6[8] = [createElementVNode("rect", {
            x: "6",
            y: "4",
            width: "4",
            height: "16",
            rx: "1"
          }, null, -1), createElementVNode("rect", {
            x: "14",
            y: "4",
            width: "4",
            height: "16",
            rx: "1"
          }, null, -1)]))])) : (openBlock(), createElementBlock("svg", ge, [...(val6[9] || (val6[9] = [createElementVNode("polygon", {
            points: "5 3 19 12 5 21 5 3"
          }, null, -1)]))]))], 10, fe)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })], 64));
    }
  }),
  mathHelper_zb1 = withScopeId(pe, [["__scopeId", "data-v-7172e2b6"]]);
/* index 运行时导出（已语义化） */
export { mathHelper_zb1 };