/*!
 * 页面模块：歌曲下载（MusicDownloadPage）
 * 路由：/admin/music-download   name=admin-music-download   层级=2   需登录=是
 * 功能：登录后的「歌曲下载」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/MusicDownloadPage-BtuHNt6X.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, withDirectives, createCommentVNode, vModelText, toDisplayValue, withSlots, http, createTextVNode, toDisplayString, deepDirectiveOptions, Fragment, renderList, normalizeClass, directiveCreated, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { searchMusic as ie, getMusicDetail as re, getMusicUrl as ue } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 MusicPlayer-D（站点内功能模块） */
import { mathHelper_zb1 as pe } from "./MusicPlayer-D-g6rRZK.js";
const me = {
    class: "page"
  },
  fe = {
    class: "page-content"
  },
  ye = {
    class: "container"
  },
  ge = {
    class: "search-section"
  },
  we = {
    class: "search-box"
  },
  he = {
    key: "detail",
    class: "detail-section"
  },
  ke = {
    key: 0,
    class: "detail-loading"
  },
  _e = {
    key: 1,
    class: "selected-detail"
  },
  xe = {
    class: "music-detail-card"
  },
  be = ["src", "alt"],
  Ce = {
    class: "detail-info"
  },
  Me = {
    class: "detail-title"
  },
  Be = {
    class: "detail-singer"
  },
  Pe = {
    class: "detail-meta"
  },
  Se = {
    class: "quality-section"
  },
  Ue = {
    class: "quality-select-wrapper"
  },
  qe = ["value"],
  De = {
    class: "quality-grid"
  },
  Le = ["value"],
  Te = {
    class: "quality-content"
  },
  Ve = {
    class: "quality-name"
  },
  $e = {
    class: "quality-tag"
  },
  Re = ["disabled"],
  Ie = {
    key: 0,
    class: "download-overlay"
  },
  Ee = {
    class: "download-overlay-content"
  },
  Fe = {
    class: "download-status-text"
  },
  Ne = {
    key: "search",
    class: "search-results"
  },
  je = {
    key: 0,
    class: "search-loading"
  },
  Qe = {
    key: 1,
    class: "search-hint"
  },
  He = {
    key: 2,
    class: "search-empty"
  },
  ze = {
    key: 3,
    class: "results-list"
  },
  Oe = ["onClick"],
  Ke = {
    class: "music-details"
  },
  Ze = {
    class: "music-title"
  },
  Ae = {
    key: 0,
    class: "music-subtitle"
  },
  Ge = {
    class: "music-artist"
  },
  Je = defineComponent({
    __name: "MusicDownloadPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(""),
        refVal2 = ref(!1),
        refVal3 = ref(!1),
        refVal4 = ref([]),
        refVal5 = ref(null),
        refVal6 = ref(null),
        refVal7 = ref(null),
        refVal8 = ref(!1),
        refVal9 = ref(null),
        refVal10 = ref([]),
        refVal11 = ref(8),
        refVal12 = ref(!1),
        refVal13 = ref("");
      function zz0() {
        if (refVal5.value && clearTimeout(refVal5.value), !refVal.value.trim()) {
          refVal4.value = [], refVal3.value = !1;
          return;
        }
        refVal2.value = !0, refVal3.value = !0, refVal5.value = setTimeout(() => {
          zz1();
        }, 500);
      }
      async function zz1() {
        if (refVal.value.trim()) {
          refVal2.value = !0;
          try {
            const val1 = await ie(refVal.value.trim(), 1, 50);
            if (val1.data.code === 200) {
              const {
                data: val2
              } = val1.data.data;
              refVal4.value = val2;
            } else useToast1.error(val1.data.message || "搜索失败");
          } catch {
            useToast1.error("搜索失败");
          } finally {
            refVal2.value = !1;
          }
        }
      }
      async function zz2(val1) {
        refVal6.value = val1, refVal8.value = !0;
        try {
          const val2 = await re(val1.mid || val1.id);
          val2.data.code === 200 ? refVal7.value = val2.data.data : (useToast1.error("获取歌曲详情失败"), refVal6.value = null);
        } catch {
          useToast1.error("获取歌曲详情失败"), refVal6.value = null;
        } finally {
          refVal8.value = !1;
        }
      }
      function zz3() {
        refVal6.value = null, refVal7.value = null;
      }
      function zz4() {
        refVal7.value && (refVal9.value = refVal7.value);
      }
      function zz5() {
        refVal9.value = null;
      }
      async function zz6() {
        if (refVal7.value) {
          refVal12.value = !0, refVal13.value = "正在获取下载链接...";
          try {
            const val1 = await ue(refVal7.value.mid, refVal11.value);
            if (val1.data.code === 200 && val1.data.data.url) {
              const val2 = val1.data.data.url.replace(/^http:\/\//, "https://"),
                val3 = refVal10.value.find(val9 => val9.id === refVal11.value)?.name || "",
                text = `${refVal7.value.singer} - ${refVal7.value.title} (${val3})`;
              refVal13.value = "正在下载文件...";
              const val4 = await fetch(val2);
              if (!val4.ok) throw new Error("下载失败");
              const val5 = await val4.blob();
              refVal13.value = "正在保存...";
              const val6 = zz7(val2) || zz8(val5.type) || "mp3",
                objectURL = URL.createObjectURL(val5),
                element = document.createElement("a");
              element.href = objectURL, element.download = `${text}.${val6}`, document.body.appendChild(element), element.click(), document.body.removeChild(element), URL.revokeObjectURL(objectURL), useToast1.success("下载成功");
            } else useToast1.error(val1.data.message || "获取下载链接失败");
          } catch {
            useToast1.error("下载失败，请稍后重试");
          } finally {
            refVal12.value = !1, refVal13.value = "";
          }
        }
      }
      function zz7(val1) {
        const val2 = val1.match(/\.(\w+)(?:\?|$)/);
        if (val2 && val2[1]) {
          const val3 = val2[1].toLowerCase();
          if (["mp3", "flac", "m4a", "ogg", "ape", "mp4", "wav"].includes(val3)) return val3;
        }
        return null;
      }
      function zz8(val1) {
        return {
          "audio/mpeg": "mp3",
          "audio/mp3": "mp3",
          "audio/flac": "flac",
          "audio/ogg": "ogg",
          "audio/mp4": "m4a",
          "audio/x-m4a": "m4a",
          "audio/ape": "ape"
        }[val1] || null;
      }
      async function zz9() {
        try {
          const val1 = await http.get("/qqmusic/qualities");
          val1.data.code === 200 && (refVal10.value = val1.data.data);
        } catch {
          refVal10.value = [{
            id: 0,
            name: "试听",
            description: "音乐试听"
          }, {
            id: 7,
            name: "128mp3",
            description: "标准音质"
          }, {
            id: 8,
            name: "320mp3",
            description: "HQ高音质"
          }, {
            id: 10,
            name: "无损",
            description: "SQ无损音质"
          }];
        }
      }
      return onMounted(async () => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        await zz9();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", me, [createVNode(PageHeader), createVNode(PageBreadcrumb), createElementVNode("main", fe, [createElementVNode("div", ye, [val2[21] || (val2[21] = createElementVNode("h1", {
        class: "page-title"
      }, "歌曲下载", -1)), val2[22] || (val2[22] = createElementVNode("p", {
        class: "page-desc"
      }, "搜索并下载歌曲，支持多种音质选择", -1)), createElementVNode("div", ge, [createElementVNode("div", we, [val2[5] || (val2[5] = createElementVNode("svg", {
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
      })], -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val2[0] || (val2[0] = val3 => refVal.value = val3),
        type: "text",
        placeholder: "搜索歌曲名或歌手",
        onInput: zz0
      }, null, 544), [[vModelText, refVal.value]]), refVal.value ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "clear-btn",
        onClick: val2[1] || (val2[1] = val3 => {
          refVal.value = "", refVal4.value = [], refVal3.value = !1;
        })
      }, [...(val2[4] || (val2[4] = [createElementVNode("svg", {
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
      })], -1)]))])) : createCommentVNode("", !0)])]), createVNode(withSlots, {
        name: "fade",
        mode: "out-in"
      }, {
        default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", he, [createElementVNode("button", {
          class: "back-btn",
          onClick: zz3
        }, [...(val2[6] || (val2[6] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "15 18 9 12 15 6"
        })], -1), createTextVNode(" 返回搜索 ", -1)]))]), refVal8.value ? (openBlock(), createElementBlock("div", ke, [...(val2[7] || (val2[7] = [createElementVNode("div", {
          class: "loading-spinner-sm"
        }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : refVal7.value ? (openBlock(), createElementBlock("div", _e, [createElementVNode("div", xe, [createElementVNode("img", {
          src: refVal7.value.cover,
          alt: refVal7.value.title,
          class: "detail-cover"
        }, null, 8, be), createElementVNode("div", Ce, [createElementVNode("h3", Me, toDisplayString(refVal7.value.title), 1), createElementVNode("p", Be, toDisplayString(refVal7.value.singer), 1), createElementVNode("div", Pe, [createElementVNode("span", null, toDisplayString(refVal7.value.album), 1), val2[8] || (val2[8] = createElementVNode("span", null, "·", -1)), createElementVNode("span", null, toDisplayString(refVal7.value.interval), 1)])]), createElementVNode("button", {
          class: "play-btn",
          onClick: zz4,
          title: "播放试听"
        }, [...(val2[9] || (val2[9] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "currentColor"
        }, [createElementVNode("polygon", {
          points: "5 3 19 12 5 21 5 3"
        })], -1)]))])]), createElementVNode("div", Se, [val2[12] || (val2[12] = createElementVNode("h4", {
          class: "section-label"
        }, "选择音质", -1)), createElementVNode("div", Ue, [withDirectives(createElementVNode("select", {
          "onUpdate:modelValue": val2[2] || (val2[2] = val3 => refVal11.value = val3),
          class: "quality-select"
        }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal10.value, val3 => (openBlock(), createElementBlock("option", {
          key: val3.id,
          value: val3.id
        }, toDisplayString(val3.description) + " (" + toDisplayString(val3.name) + ") ", 9, qe))), 128))], 512), [[deepDirectiveOptions, refVal11.value]]), val2[10] || (val2[10] = createElementVNode("svg", {
          class: "quality-select-arrow",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "6 9 12 15 18 9"
        })], -1))]), createElementVNode("div", De, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal10.value, val3 => (openBlock(), createElementBlock("label", {
          key: val3.id,
          class: normalizeClass(["quality-item", {
            selected: refVal11.value === val3.id
          }])
        }, [withDirectives(createElementVNode("input", {
          type: "radio",
          value: val3.id,
          "onUpdate:modelValue": val2[3] || (val2[3] = val4 => refVal11.value = val4)
        }, null, 8, Le), [[directiveCreated, refVal11.value]]), createElementVNode("div", Te, [createElementVNode("span", Ve, toDisplayString(val3.description), 1), createElementVNode("span", $e, toDisplayString(val3.name), 1)]), val2[11] || (val2[11] = createElementVNode("div", {
          class: "quality-check"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "3"
        }, [createElementVNode("polyline", {
          points: "20 6 9 17 4 12"
        })])], -1))], 2))), 128))])]), createElementVNode("button", {
          class: "download-btn",
          disabled: refVal12.value,
          onClick: zz6
        }, [...(val2[13] || (val2[13] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("path", {
          d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        }), createElementVNode("polyline", {
          points: "7 10 12 15 17 10"
        }), createElementVNode("line", {
          x1: "12",
          y1: "15",
          x2: "12",
          y2: "3"
        })], -1), createTextVNode(" 下载歌曲 ", -1)]))], 8, Re), createVNode(withSlots, {
          name: "fade"
        }, {
          default: toDisplayValue(() => [refVal12.value ? (openBlock(), createElementBlock("div", Ie, [createElementVNode("div", Ee, [val2[14] || (val2[14] = createElementVNode("div", {
            class: "download-spinner"
          }, null, -1)), createElementVNode("p", Fe, toDisplayString(refVal13.value), 1), val2[15] || (val2[15] = createElementVNode("p", {
            class: "download-status-hint"
          }, "请勿离开页面", -1))])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)])) : (openBlock(), createElementBlock("div", Ne, [refVal2.value ? (openBlock(), createElementBlock("div", je, [...(val2[16] || (val2[16] = [createElementVNode("div", {
          class: "loading-spinner-sm"
        }, null, -1), createElementVNode("span", null, "搜索中...", -1)]))])) : refVal.value ? refVal3.value && refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", He, [...(val2[18] || (val2[18] = [createElementVNode("p", null, "未找到相关歌曲", -1), createElementVNode("span", null, "换个关键词试试", -1)]))])) : refVal4.value.length > 0 ? (openBlock(), createElementBlock("div", ze, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val3 => (openBlock(), createElementBlock("div", {
          key: val3.mid || val3.id,
          class: "music-item",
          onClick: val4 => zz2(val3)
        }, [val2[19] || (val2[19] = createElementVNode("div", {
          class: "music-icon"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [createElementVNode("path", {
          d: "M9 18V5l12-2v13"
        }), createElementVNode("circle", {
          cx: "6",
          cy: "18",
          r: "3"
        }), createElementVNode("circle", {
          cx: "18",
          cy: "16",
          r: "3"
        })])], -1)), createElementVNode("div", Ke, [createElementVNode("h4", Ze, [createTextVNode(toDisplayString(val3.title) + " ", 1), val3.subtitle ? (openBlock(), createElementBlock("span", Ae, toDisplayString(val3.subtitle), 1)) : createCommentVNode("", !0)]), createElementVNode("p", Ge, toDisplayString(val3.singer) + " · " + toDisplayString(val3.album), 1)]), val2[20] || (val2[20] = createElementVNode("svg", {
          class: "select-arrow",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "9 18 15 12 9 6"
        })], -1))], 8, Oe))), 128))])) : createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Qe, [...(val2[17] || (val2[17] = [createElementVNode("svg", {
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
        })], -1), createElementVNode("p", null, "输入歌曲名或歌手开始搜索", -1)]))]))]))]),
        _: 1
      })])]), createVNode(PageFooter), createVNode(pe, {
        music: refVal9.value,
        onClose: zz5
      }, null, 8, ["music"])]));
    }
  }),
  at = withScopeId(Je, [["__scopeId", "data-v-9562a6d5"]]);
/* index 运行时导出（已语义化） */
export { at as default };