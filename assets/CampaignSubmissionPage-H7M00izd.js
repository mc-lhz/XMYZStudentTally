/*!
 * 页面模块：铃声投稿（CampaignSubmissionPage）
 * 路由：/ringtone/:id/submit   name=ringtone-submit   层级=2   需登录=是
 * 功能：登录后的「铃声投稿」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampaignSubmissionPage-H7M00izd.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, watch, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, createVNodeWrapper, toDisplayString, createTextVNode, renderList, toDisplayValue, withSlots, useRouter, useToast, normalizeClass, withModifiers, withDirectives, vModelText, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getCampaignsById as De, getSubmissionsCampaignsById as Ne, searchMusic as Le, getMusicDetail as Fe, createResourceSubmissions as Ee } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 MusicPlayer-D（站点内功能模块） */
import { mathHelper_zb1 as He } from "./MusicPlayer-D-g6rRZK.js";
const je = {
    class: "page-container"
  },
  Ae = {
    class: "page-content"
  },
  Oe = {
    class: "content-container"
  },
  Ke = {
    class: "breadcrumb-wrapper"
  },
  We = {
    key: 0,
    class: "loading-container"
  },
  Ge = {
    class: "campaign-card"
  },
  Je = {
    class: "campaign-header"
  },
  Xe = {
    class: "campaign-title-area"
  },
  Ye = {
    class: "campaign-title"
  },
  Ze = {
    class: "campaign-tags"
  },
  es = {
    class: "tag campus"
  },
  ss = {
    key: 0,
    class: "tag countdown"
  },
  ts = {
    class: "campaign-info-and-submit"
  },
  ls = {
    class: "campaign-left-info"
  },
  os = {
    class: "campaign-rules"
  },
  ns = {
    class: "rules-value"
  },
  is = {
    class: "submissions-card"
  },
  as = {
    class: "submissions-card-header"
  },
  rs = {
    class: "submissions-card-count"
  },
  us = {
    key: 0,
    class: "empty-submissions"
  },
  ds = {
    key: 1,
    class: "submissions-by-period"
  },
  cs = ["onClick"],
  vs = {
    class: "period-header-left"
  },
  ms = {
    class: "period-name"
  },
  fs = {
    class: "period-count"
  },
  ps = {
    key: 0,
    class: "period-content"
  },
  gs = {
    key: 0,
    class: "submissions-list"
  },
  hs = {
    class: "music-cover-wrapper"
  },
  bs = ["src", "alt"],
  _s = {
    class: "music-info"
  },
  ys = {
    class: "music-name"
  },
  ks = {
    class: "music-singer"
  },
  xs = {
    class: "submission-actions"
  },
  ws = ["href"],
  Cs = {
    class: "submit-time"
  },
  Ps = {
    key: 1,
    class: "period-empty"
  },
  Ss = {
    key: 0,
    class: "platform-selector"
  },
  Ms = {
    key: 1,
    class: "tab-content-wrapper"
  },
  Us = {
    key: "qq-music",
    class: "tab-content"
  },
  qs = {
    class: "search-box"
  },
  Bs = {
    class: "search-results"
  },
  Vs = {
    key: 0,
    class: "search-loading"
  },
  $s = {
    key: 1,
    class: "search-hint"
  },
  Is = {
    key: 2,
    class: "search-empty"
  },
  Ts = {
    key: 3,
    class: "results-list"
  },
  Ds = ["onClick"],
  Ns = {
    class: "music-details"
  },
  Ls = {
    class: "music-title"
  },
  Fs = {
    key: 0,
    class: "music-subtitle"
  },
  Es = {
    class: "music-artist"
  },
  zs = {
    key: "custom",
    class: "tab-content"
  },
  Qs = {
    class: "custom-music-form"
  },
  Rs = {
    class: "form-row"
  },
  Hs = {
    class: "form-field required"
  },
  js = {
    class: "form-field required"
  },
  As = {
    class: "form-row"
  },
  Os = {
    class: "form-field"
  },
  Ks = {
    class: "form-field"
  },
  Ws = {
    class: "form-field"
  },
  Gs = {
    class: "form-field"
  },
  Js = {
    key: 0,
    class: "user-info-section"
  },
  Xs = {
    class: "user-info-form"
  },
  Ys = ["for"],
  Zs = ["id", "onUpdate:modelValue", "placeholder"],
  et = {
    class: "period-selection"
  },
  st = {
    class: "selection-header"
  },
  tt = {
    class: "periods-grid"
  },
  lt = ["checked", "disabled", "onChange"],
  ot = {
    class: "period-content"
  },
  nt = {
    class: "period-label"
  },
  it = {
    class: "period-status"
  },
  at = {
    class: "modal-actions"
  },
  rt = ["disabled"],
  ut = {
    key: 0,
    class: "detail-loading"
  },
  dt = {
    key: 1,
    class: "music-detail-card"
  },
  ct = ["src", "alt"],
  vt = {
    class: "detail-info"
  },
  mt = {
    class: "detail-title"
  },
  ft = {
    class: "detail-singer"
  },
  pt = {
    class: "detail-meta"
  },
  gt = {
    key: 2,
    class: "user-info-section"
  },
  ht = {
    class: "user-info-form"
  },
  bt = ["for"],
  _t = ["id", "onUpdate:modelValue", "placeholder"],
  yt = {
    class: "period-selection"
  },
  kt = {
    class: "selection-header"
  },
  xt = {
    class: "periods-grid"
  },
  wt = ["checked", "disabled", "onChange"],
  Ct = {
    class: "period-content"
  },
  Pt = {
    class: "period-label"
  },
  St = {
    class: "period-status"
  },
  Mt = {
    class: "modal-actions"
  },
  Ut = ["disabled"],
  qt = defineComponent({
    __name: "CampaignSubmissionPage",
    setup(val) {
      const val2 = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(null),
        refVal3 = ref([]),
        refVal4 = ref(null),
        refVal5 = ref("qq_music"),
        refVal6 = ref(!1),
        refVal7 = ref(""),
        refVal8 = ref(!1),
        refVal9 = ref(!1),
        refVal10 = ref([]),
        refVal11 = ref(null),
        refVal12 = ref({
          song: "",
          singer: "",
          album: "",
          interval: "",
          cover: "",
          sourceUrl: ""
        }),
        refVal13 = ref(null),
        refVal14 = ref(null),
        refVal15 = ref(!1),
        refVal16 = ref([]),
        refVal17 = ref(new Set());
      function zz0(val1) {
        refVal17.value.has(val1) ? refVal17.value.delete(val1) : refVal17.value.add(val1), refVal17.value = new Set(refVal17.value);
      }
      function zz1(val1) {
        return refVal17.value.has(val1);
      }
      const refVal18 = ref({
          dormitory: "",
          bed: "",
          student_id: "",
          phone: ""
        }),
        refVal19 = ref(!1),
        refVal20 = ref(null),
        val4 = applyDirectives(() => refVal2.value?.currentStage ? refVal2.value.currentStage.config : null),
        val5 = applyDirectives(() => val4.value?.require_user_info === !0),
        val6 = applyDirectives(() => val4.value?.user_info_fields || []);
      function zz2(val1) {
        return {
          dormitory: "宿舍号",
          bed: "床位号",
          student_id: "学号",
          phone: "手机号"
        }[val1] || val1;
      }
      function zz3(val1) {
        return {
          dormitory: "例如：101",
          bed: "例如：1",
          student_id: "请输入学号",
          phone: "请输入手机号"
        }[val1] || `请输入${zz2(val1)}`;
      }
      function zz4() {
        if (!val5.value) return !0;
        for (const zz5 of val6.value) {
          const val1 = refVal18.value[zz5];
          if (!val1 || !val1.trim()) return useToast1.error(`请填写${zz2(zz5)}`), !1;
        }
        return !0;
      }
      function zz6() {
        return refVal12.value.song?.trim() ? refVal12.value.singer?.trim() ? !0 : (useToast1.error("请填写歌手"), !1) : (useToast1.error("请填写歌曲名"), !1);
      }
      const val7 = applyDirectives(() => refVal5.value === "custom"),
        val8 = applyDirectives(() => {
          const val1 = val4.value;
          if (!val1?.rules?.has_limit) return "不限投稿数量";
          const {
            limit_scope: val11,
            max_count: val12
          } = val1.rules;
          return val11 === "period" ? `每个时段最多投稿 ${val12} 首` : `整个活动最多投稿 ${val12} 首`;
        });
      function zz7(val1) {
        return refVal3.value.find(val11 => val11.timePeriod.id === val1)?.submissions?.length || 0;
      }
      function zz8(val1) {
        const val11 = val4.value;
        if (!val11?.rules?.has_limit) return !0;
        const {
          limit_scope: val12,
          max_count: val13
        } = val11.rules;
        return val13 ? val12 === "period" ? zz7(val1) < val13 : refVal3.value.reduce((val14, val15) => val14 + (val15.submissions?.length || 0), 0) < val13 : !0;
      }
      const val9 = applyDirectives(() => refVal2.value?.timePeriods ? refVal2.value.timePeriods.filter(val1 => zz8(val1.id)) : []),
        val10 = applyDirectives(() => refVal3.value.reduce((val1, val11) => val1 + (val11.submissions?.length || 0), 0));
      async function zz9() {
        try {
          const val1 = await De(val3.value);
          val1.data.code === 200 ? (refVal2.value = val1.data.data, refVal2.value.currentStage?.stageType !== "submission" && (useToast1.error("当前不在投稿阶段"), useRouter1.push("/ringtone"))) : (useToast1.error(val1.data.message || "获取活动详情失败"), useRouter1.push("/ringtone"));
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/ringtone");
        }
      }
      async function zz10() {
        try {
          const val1 = await Ne(val3.value);
          if (val1.data.code === 200) {
            const val11 = val1.data.data;
            "timePeriods" in val11 ? (refVal3.value = val11.timePeriods, refVal4.value = val11.lastUserInfo || null) : (refVal3.value = val11, refVal4.value = null);
          }
        } catch (val1) {
          console.error("获取用户投稿失败", val1);
        }
      }
      async function zz11() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal("请先登录以参与投稿"), useRouter1.push("/ringtone");
          return;
        }
        refVal.value = !0;
        try {
          await zz9(), await zz10();
        } finally {
          refVal.value = !1;
        }
      }
      function zz12() {
        refVal6.value = !0, refVal5.value = "qq_music", refVal7.value = "", refVal10.value = [], refVal9.value = !1, refVal13.value = null, refVal14.value = null, refVal16.value = [], refVal12.value = {
          song: "",
          singer: "",
          album: "",
          interval: "",
          cover: "",
          sourceUrl: ""
        }, val5.value && refVal4.value ? refVal18.value = {
          dormitory: refVal4.value.dormitory || "",
          bed: refVal4.value.bed || "",
          student_id: refVal4.value.student_id || "",
          phone: refVal4.value.phone || ""
        } : refVal18.value = {
          dormitory: "",
          bed: "",
          student_id: "",
          phone: ""
        };
      }
      function zz13() {
        refVal6.value = !1, refVal5.value = "qq_music", refVal7.value = "", refVal10.value = [], refVal13.value = null, refVal14.value = null, refVal16.value = [], refVal12.value = {
          song: "",
          singer: "",
          album: "",
          interval: "",
          cover: "",
          sourceUrl: ""
        };
      }
      function zz14() {
        if (refVal11.value && clearTimeout(refVal11.value), !refVal7.value.trim()) {
          refVal10.value = [], refVal9.value = !1;
          return;
        }
        refVal8.value = !0, refVal9.value = !0, refVal11.value = setTimeout(() => {
          zz15();
        }, 500);
      }
      async function zz15() {
        if (refVal7.value.trim()) {
          refVal8.value = !0;
          try {
            const val1 = await Le(refVal7.value.trim(), 1, 50);
            if (val1.data.code === 200) {
              const {
                data: val11
              } = val1.data.data;
              refVal10.value = val11;
            } else useToast1.error(val1.data.message || "搜索失败");
          } catch {
            useToast1.error("搜索失败");
          } finally {
            refVal8.value = !1;
          }
        }
      }
      async function zz16(val1) {
        refVal13.value = val1, refVal15.value = !0;
        try {
          const val11 = await Fe(val1.mid || val1.id);
          val11.data.code === 200 ? refVal14.value = val11.data.data : (useToast1.error("获取歌曲详情失败"), refVal13.value = null);
        } catch {
          useToast1.error("获取歌曲详情失败"), refVal13.value = null;
        } finally {
          refVal15.value = !1;
        }
      }
      function zz17() {
        refVal13.value = null, refVal14.value = null, refVal16.value = [];
      }
      function zz18(val1) {
        const val11 = refVal16.value.indexOf(val1);
        val11 === -1 ? refVal16.value.push(val1) : refVal16.value.splice(val11, 1);
      }
      function zz19() {
        refVal16.value.length === val9.value.length ? refVal16.value = [] : refVal16.value = val9.value.map(val1 => val1.id);
      }
      function zz20() {
        refVal14.value && (refVal20.value = refVal14.value);
      }
      function zz21() {
        refVal20.value = null;
      }
      async function zz22() {
        if (refVal16.value.length === 0) {
          useToast1.error("请选择投稿时段");
          return;
        }
        if (val7.value) {
          if (!zz6()) return;
        } else if (!refVal13.value) {
          useToast1.error("请选择歌曲");
          return;
        }
        if (zz4()) {
          refVal19.value = !0;
          try {
            const obj = {};
            if (val5.value) for (const zz23 of val6.value) {
              const val11 = refVal18.value[zz23];
              val11 && (obj[zz23] = val11.trim());
            }
            const obj2 = {
              campaignId: val3.value,
              timePeriodIds: refVal16.value,
              userInfo: Object.keys(obj).length > 0 ? obj : void 0
            };
            val7.value ? (obj2.platform = "custom", obj2.customMusic = {
              song: refVal12.value.song.trim(),
              singer: refVal12.value.singer.trim(),
              album: refVal12.value.album?.trim() || void 0,
              interval: refVal12.value.interval?.trim() || void 0,
              cover: refVal12.value.cover?.trim() || void 0,
              sourceUrl: refVal12.value.sourceUrl?.trim() || void 0
            }) : (obj2.platform = "qq_music", obj2.musicServiceId = refVal13.value.id);
            const val1 = await Ee(obj2);
            val1.data.code === 200 ? (useToast1.success("投稿成功"), zz13(), await zz10()) : useToast1.error(val1.data.message || "投稿失败");
          } catch {
            useToast1.error("投稿失败");
          } finally {
            refVal19.value = !1;
          }
        }
      }
      function zz24(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz25(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          date2 = new Date(),
          val11 = date.getTime() - date2.getTime();
        if (val11 < 0) return "已结束";
        const val12 = Math.floor(val11 / (1e3 * 60 * 60 * 24)),
          val13 = Math.floor(val11 % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        return val12 > 0 ? `剩余 ${val12}天${val13}小时` : val13 > 0 ? `剩余 ${val13}小时` : `剩余 ${Math.floor(val11 / 6e4)}分钟`;
      }
      return watch(() => useUserStore1.isLoggedIn, val1 => {
        val1 && zz11();
      }), onMounted(() => {
        zz11();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val11) => (openBlock(), createElementBlock("div", je, [createVNode(PageHeader, {
        "back-to": "/ringtone"
      }), createElementVNode("main", Ae, [createElementVNode("div", Oe, [createElementVNode("div", Ke, [createVNode(PageBreadcrumb)]), refVal.value ? (openBlock(), createElementBlock("div", We, [...(val11[11] || (val11[11] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : refVal2.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Ge, [createElementVNode("div", Je, [val11[13] || (val11[13] = createVNodeWrapper('<div class="campaign-badge" data-v-36d6b317><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-36d6b317><path d="M9 18V5l12-2v13" data-v-36d6b317></path><circle cx="6" cy="18" r="3" data-v-36d6b317></circle><circle cx="18" cy="16" r="3" data-v-36d6b317></circle></svg></div>', 1)), createElementVNode("div", Xe, [createElementVNode("h1", Ye, toDisplayString(refVal2.value.title), 1), createElementVNode("div", Ze, [createElementVNode("span", es, toDisplayString(refVal2.value.campus?.name), 1), refVal2.value.currentStage?.endTime ? (openBlock(), createElementBlock("span", ss, [val11[12] || (val11[12] = createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }), createElementVNode("polyline", {
        points: "12 6 12 12 16 14"
      })], -1)), createTextVNode(" " + toDisplayString(zz25(refVal2.value.currentStage.endTime)), 1)])) : createCommentVNode("", !0)])])]), createElementVNode("div", ts, [createElementVNode("div", ls, [createElementVNode("div", os, [val11[14] || (val11[14] = createElementVNode("span", {
        class: "rules-label"
      }, "投稿限制", -1)), val11[15] || (val11[15] = createElementVNode("span", {
        class: "rules-divider"
      }, "·", -1)), createElementVNode("span", ns, toDisplayString(val8.value), 1)]), val11[16] || (val11[16] = createElementVNode("p", {
        class: "new-feature-tip"
      }, [createElementVNode("span", {
        class: "new-badge"
      }, "NEW"), createElementVNode("span", null, "支持QQ音乐搜索及自定义投稿")], -1))]), createElementVNode("button", {
        class: "submit-btn-compact",
        onClick: zz12
      }, [...(val11[17] || (val11[17] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.5"
      }, [createElementVNode("line", {
        x1: "12",
        y1: "5",
        x2: "12",
        y2: "19"
      }), createElementVNode("line", {
        x1: "5",
        y1: "12",
        x2: "19",
        y2: "12"
      })], -1)]))])])]), createElementVNode("section", is, [createElementVNode("div", as, [val11[18] || (val11[18] = createElementVNode("h2", {
        class: "submissions-card-title"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      })]), createTextVNode(" 我的投稿 ")], -1)), createElementVNode("span", rs, toDisplayString(val10.value) + " 首", 1)]), val10.value === 0 ? (openBlock(), createElementBlock("div", us, [...(val11[19] || (val11[19] = [createVNodeWrapper('<div class="empty-icon" data-v-36d6b317><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-36d6b317><path d="M9 18V5l12-2v13" data-v-36d6b317></path><circle cx="6" cy="18" r="3" data-v-36d6b317></circle><circle cx="18" cy="16" r="3" data-v-36d6b317></circle></svg></div><p data-v-36d6b317>暂无投稿</p><span data-v-36d6b317>快去搜索喜欢的歌曲投稿吧</span>', 3)]))])) : (openBlock(), createElementBlock("div", ds, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val12 => (openBlock(), createElementBlock("div", {
        key: val12.timePeriod.id,
        class: normalizeClass(["period-group", {
          expanded: zz1(val12.timePeriod.id)
        }])
      }, [createElementVNode("button", {
        class: "period-header",
        onClick: val13 => zz0(val12.timePeriod.id)
      }, [createElementVNode("div", vs, [createElementVNode("span", ms, toDisplayString(val12.timePeriod.name), 1), createElementVNode("span", fs, toDisplayString(val12.submissions?.length || 0) + " 首", 1)]), val11[20] || (val11[20] = createElementVNode("svg", {
        class: "expand-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1))], 8, cs), createVNode(withSlots, {
        name: "expand"
      }, {
        default: toDisplayValue(() => [zz1(val12.timePeriod.id) ? (openBlock(), createElementBlock("div", ps, [val12.submissions?.length ? (openBlock(), createElementBlock("div", gs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val12.submissions, val13 => (openBlock(), createElementBlock("div", {
          key: val13.id,
          class: "submission-item"
        }, [createElementVNode("div", hs, [createElementVNode("img", {
          src: val13.music.cover || "/default-cover.png",
          alt: val13.music.song,
          class: "music-cover"
        }, null, 8, bs), val13.music.platformName ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["platform-tag", val13.music.platform])
        }, toDisplayString(val13.music.platformName), 3)) : createCommentVNode("", !0)]), createElementVNode("div", _s, [createElementVNode("h4", ys, toDisplayString(val13.music.song), 1), createElementVNode("p", ks, toDisplayString(val13.music.singer), 1)]), createElementVNode("div", xs, [val13.music.sourceUrl ? (openBlock(), createElementBlock("a", {
          key: 0,
          href: val13.music.sourceUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          class: "play-link-btn",
          onClick: val11[0] || (val11[0] = withModifiers(() => {}, ["stop"]))
        }, [...(val11[21] || (val11[21] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "currentColor"
        }, [createElementVNode("polygon", {
          points: "5 3 19 12 5 21 5 3"
        })], -1)]))], 8, ws)) : createCommentVNode("", !0), createElementVNode("span", Cs, toDisplayString(zz24(val13.createdAt)), 1)])]))), 128))])) : (openBlock(), createElementBlock("div", Ps, [...(val11[22] || (val11[22] = [createElementVNode("span", null, "暂无投稿", -1)]))]))])) : createCommentVNode("", !0)]),
        _: 2
      }, 1024)], 2))), 128))]))])], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter), createVNode(He, {
        music: refVal20.value,
        onClose: zz21
      }, null, 8, ["music"]), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz13, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-slide",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal6.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val11[10] || (val11[10] = withModifiers(() => {}, ["stop"]))
          }, [val11[47] || (val11[47] = createElementVNode("div", {
            class: "modal-handle"
          }, null, -1)), createElementVNode("div", {
            class: "modal-header"
          }, [val11[24] || (val11[24] = createElementVNode("h3", {
            class: "modal-title"
          }, "投稿歌曲", -1)), createElementVNode("button", {
            class: "modal-close",
            onClick: zz13
          }, [...(val11[23] || (val11[23] = [createElementVNode("svg", {
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
          })], -1)]))])]), refVal13.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Ss, [createElementVNode("div", {
            class: normalizeClass(["platform-indicator", {
              "at-custom": val7.value
            }])
          }, null, 2), createElementVNode("button", {
            class: normalizeClass(["platform-btn", {
              active: refVal5.value === "qq_music"
            }]),
            onClick: val11[1] || (val11[1] = val12 => refVal5.value = "qq_music")
          }, " QQ音乐搜索 ", 2), createElementVNode("button", {
            class: normalizeClass(["platform-btn", {
              active: refVal5.value === "custom"
            }]),
            onClick: val11[2] || (val11[2] = val12 => refVal5.value = "custom")
          }, " 自定义填写 ", 2)])), refVal13.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Ms, [createVNode(withSlots, {
            name: "tab-fade",
            mode: "out-in"
          }, {
            default: toDisplayValue(() => [val7.value ? (openBlock(), createElementBlock("div", zs, [createElementVNode("div", Qs, [createElementVNode("div", Rs, [createElementVNode("div", Hs, [val11[31] || (val11[31] = createElementVNode("label", {
              for: "custom-song"
            }, "歌曲名", -1)), withDirectives(createElementVNode("input", {
              id: "custom-song",
              "onUpdate:modelValue": val11[4] || (val11[4] = val12 => refVal12.value.song = val12),
              type: "text",
              placeholder: "请输入歌曲名（必填）"
            }, null, 512), [[vModelText, refVal12.value.song]])]), createElementVNode("div", js, [val11[32] || (val11[32] = createElementVNode("label", {
              for: "custom-singer"
            }, "歌手", -1)), withDirectives(createElementVNode("input", {
              id: "custom-singer",
              "onUpdate:modelValue": val11[5] || (val11[5] = val12 => refVal12.value.singer = val12),
              type: "text",
              placeholder: "请输入歌手（必填）"
            }, null, 512), [[vModelText, refVal12.value.singer]])])]), createElementVNode("div", As, [createElementVNode("div", Os, [val11[33] || (val11[33] = createElementVNode("label", {
              for: "custom-album"
            }, "专辑", -1)), withDirectives(createElementVNode("input", {
              id: "custom-album",
              "onUpdate:modelValue": val11[6] || (val11[6] = val12 => refVal12.value.album = val12),
              type: "text",
              placeholder: "可选"
            }, null, 512), [[vModelText, refVal12.value.album]])]), createElementVNode("div", Ks, [val11[34] || (val11[34] = createElementVNode("label", {
              for: "custom-interval"
            }, "时长（秒）", -1)), withDirectives(createElementVNode("input", {
              id: "custom-interval",
              "onUpdate:modelValue": val11[7] || (val11[7] = val12 => refVal12.value.interval = val12),
              type: "text",
              placeholder: "例如：180"
            }, null, 512), [[vModelText, refVal12.value.interval]])])]), createElementVNode("div", Ws, [val11[35] || (val11[35] = createElementVNode("label", {
              for: "custom-cover"
            }, "封面URL", -1)), withDirectives(createElementVNode("input", {
              id: "custom-cover",
              "onUpdate:modelValue": val11[8] || (val11[8] = val12 => refVal12.value.cover = val12),
              type: "text",
              placeholder: "可选，填写图片链接"
            }, null, 512), [[vModelText, refVal12.value.cover]])]), createElementVNode("div", Gs, [val11[36] || (val11[36] = createElementVNode("label", {
              for: "custom-source-url"
            }, "播放链接", -1)), withDirectives(createElementVNode("input", {
              id: "custom-source-url",
              "onUpdate:modelValue": val11[9] || (val11[9] = val12 => refVal12.value.sourceUrl = val12),
              type: "text",
              placeholder: "可选，填写音乐播放链接"
            }, null, 512), [[vModelText, refVal12.value.sourceUrl]])])]), val5.value && val6.value.length > 0 ? (openBlock(), createElementBlock("div", Js, [val11[37] || (val11[37] = createElementVNode("h4", {
              class: "section-label"
            }, "填写信息", -1)), createElementVNode("div", Xs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val6.value, val12 => (openBlock(), createElementBlock("div", {
              key: val12,
              class: "form-field"
            }, [createElementVNode("label", {
              for: `custom-field-${val12}`
            }, toDisplayString(zz2(val12)), 9, Ys), withDirectives(createElementVNode("input", {
              id: `custom-field-${val12}`,
              "onUpdate:modelValue": val13 => refVal18.value[val12] = val13,
              type: "text",
              placeholder: zz3(val12)
            }, null, 8, Zs), [[vModelText, refVal18.value[val12]]])]))), 128))])])) : createCommentVNode("", !0), createElementVNode("div", et, [createElementVNode("div", st, [val11[38] || (val11[38] = createElementVNode("h4", {
              class: "selection-title"
            }, "选择投稿时段", -1)), val9.value.length > 1 ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "select-all-btn",
              onClick: zz19
            }, toDisplayString(refVal16.value.length === val9.value.length ? "取消全选" : "全选"), 1)) : createCommentVNode("", !0)]), createElementVNode("div", tt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value?.timePeriods, val12 => (openBlock(), createElementBlock("label", {
              key: val12.id,
              class: normalizeClass(["period-item", {
                selected: refVal16.value.includes(val12.id),
                disabled: !zz8(val12.id)
              }])
            }, [createElementVNode("input", {
              type: "checkbox",
              checked: refVal16.value.includes(val12.id),
              disabled: !zz8(val12.id),
              onChange: val13 => zz18(val12.id)
            }, null, 40, lt), createElementVNode("div", ot, [createElementVNode("span", nt, toDisplayString(val12.name), 1), createElementVNode("span", it, [createTextVNode(toDisplayString(zz7(val12.id)) + " 首 ", 1), zz8(val12.id) ? createCommentVNode("", !0) : (openBlock(), createElementBlock(Fragment, {
              key: 0
            }, [createTextVNode("（已满）")], 64))])]), val11[39] || (val11[39] = createElementVNode("div", {
              class: "period-check"
            }, [createElementVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "3"
            }, [createElementVNode("polyline", {
              points: "20 6 9 17 4 12"
            })])], -1))], 2))), 128))])]), createElementVNode("div", at, [createElementVNode("button", {
              class: "action-btn cancel",
              onClick: zz13
            }, "取消"), createElementVNode("button", {
              class: "action-btn confirm",
              disabled: refVal16.value.length === 0 || refVal19.value,
              onClick: zz22
            }, toDisplayString(refVal19.value ? "提交中..." : `投稿到 ${refVal16.value.length} 个时段`), 9, rt)])])) : (openBlock(), createElementBlock("div", Us, [createElementVNode("div", qs, [val11[25] || (val11[25] = createElementVNode("svg", {
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
              "onUpdate:modelValue": val11[3] || (val11[3] = val12 => refVal7.value = val12),
              type: "text",
              placeholder: "搜索歌曲名或歌手",
              onInput: zz14
            }, null, 544), [[vModelText, refVal7.value]])]), createElementVNode("div", Bs, [refVal8.value ? (openBlock(), createElementBlock("div", Vs, [...(val11[26] || (val11[26] = [createElementVNode("div", {
              class: "loading-spinner-sm"
            }, null, -1), createElementVNode("span", null, "搜索中...", -1)]))])) : refVal7.value ? refVal9.value && refVal10.value.length === 0 ? (openBlock(), createElementBlock("div", Is, [...(val11[28] || (val11[28] = [createElementVNode("p", null, "未找到相关歌曲", -1), createElementVNode("span", null, "换个关键词试试", -1)]))])) : refVal10.value.length > 0 ? (openBlock(), createElementBlock("div", Ts, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal10.value, val12 => (openBlock(), createElementBlock("div", {
              key: val12.mid || val12.id,
              class: "music-item",
              onClick: val13 => zz16(val12)
            }, [val11[29] || (val11[29] = createElementVNode("div", {
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
            })])], -1)), createElementVNode("div", Ns, [createElementVNode("h4", Ls, [createTextVNode(toDisplayString(val12.title) + " ", 1), val12.subtitle ? (openBlock(), createElementBlock("span", Fs, toDisplayString(val12.subtitle), 1)) : createCommentVNode("", !0)]), createElementVNode("p", Es, toDisplayString(val12.singer) + " · " + toDisplayString(val12.album), 1)]), val11[30] || (val11[30] = createElementVNode("svg", {
              class: "select-arrow",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [createElementVNode("polyline", {
              points: "9 18 15 12 9 6"
            })], -1))], 8, Ds))), 128))])) : createCommentVNode("", !0) : (openBlock(), createElementBlock("div", $s, [...(val11[27] || (val11[27] = [createElementVNode("svg", {
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
            })], -1), createElementVNode("p", null, "输入歌曲名或歌手搜索", -1)]))]))])]))]),
            _: 1
          })])), refVal13.value && !val7.value ? (openBlock(), createElementBlock(Fragment, {
            key: 2
          }, [createElementVNode("button", {
            class: "back-btn",
            onClick: zz17
          }, [...(val11[40] || (val11[40] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("polyline", {
            points: "15 18 9 12 15 6"
          })], -1), createTextVNode(" 返回搜索 ", -1)]))]), refVal15.value ? (openBlock(), createElementBlock("div", ut, [...(val11[41] || (val11[41] = [createElementVNode("div", {
            class: "loading-spinner-sm"
          }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : refVal14.value ? (openBlock(), createElementBlock("div", dt, [createElementVNode("img", {
            src: refVal14.value.cover,
            alt: refVal14.value.title,
            class: "detail-cover"
          }, null, 8, ct), createElementVNode("div", vt, [createElementVNode("h3", mt, toDisplayString(refVal14.value.title), 1), createElementVNode("p", ft, toDisplayString(refVal14.value.singer), 1), createElementVNode("div", pt, [createElementVNode("span", null, toDisplayString(refVal14.value.album), 1), val11[42] || (val11[42] = createElementVNode("span", null, "·", -1)), createElementVNode("span", null, toDisplayString(refVal14.value.interval), 1)])]), createElementVNode("button", {
            class: "play-btn",
            onClick: zz20
          }, [...(val11[43] || (val11[43] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [createElementVNode("polygon", {
            points: "5 3 19 12 5 21 5 3"
          })], -1)]))])])) : createCommentVNode("", !0), val5.value && val6.value.length > 0 ? (openBlock(), createElementBlock("div", gt, [val11[44] || (val11[44] = createElementVNode("h4", {
            class: "section-label"
          }, "填写信息", -1)), createElementVNode("div", ht, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val6.value, val12 => (openBlock(), createElementBlock("div", {
            key: val12,
            class: "form-field"
          }, [createElementVNode("label", {
            for: `field-${val12}`
          }, toDisplayString(zz2(val12)), 9, bt), withDirectives(createElementVNode("input", {
            id: `field-${val12}`,
            "onUpdate:modelValue": val13 => refVal18.value[val12] = val13,
            type: "text",
            placeholder: zz3(val12)
          }, null, 8, _t), [[vModelText, refVal18.value[val12]]])]))), 128))])])) : createCommentVNode("", !0), createElementVNode("div", yt, [createElementVNode("div", kt, [val11[45] || (val11[45] = createElementVNode("h4", {
            class: "selection-title"
          }, "选择投稿时段", -1)), val9.value.length > 1 ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "select-all-btn",
            onClick: zz19
          }, toDisplayString(refVal16.value.length === val9.value.length ? "取消全选" : "全选"), 1)) : createCommentVNode("", !0)]), createElementVNode("div", xt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value?.timePeriods, val12 => (openBlock(), createElementBlock("label", {
            key: val12.id,
            class: normalizeClass(["period-item", {
              selected: refVal16.value.includes(val12.id),
              disabled: !zz8(val12.id)
            }])
          }, [createElementVNode("input", {
            type: "checkbox",
            checked: refVal16.value.includes(val12.id),
            disabled: !zz8(val12.id),
            onChange: val13 => zz18(val12.id)
          }, null, 40, wt), createElementVNode("div", Ct, [createElementVNode("span", Pt, toDisplayString(val12.name), 1), createElementVNode("span", St, [createTextVNode(toDisplayString(zz7(val12.id)) + " 首 ", 1), zz8(val12.id) ? createCommentVNode("", !0) : (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createTextVNode("（已满）")], 64))])]), val11[46] || (val11[46] = createElementVNode("div", {
            class: "period-check"
          }, [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "3"
          }, [createElementVNode("polyline", {
            points: "20 6 9 17 4 12"
          })])], -1))], 2))), 128))])]), createElementVNode("div", Mt, [createElementVNode("button", {
            class: "action-btn cancel",
            onClick: zz13
          }, "取消"), createElementVNode("button", {
            class: "action-btn confirm",
            disabled: refVal16.value.length === 0 || refVal19.value,
            onClick: zz22
          }, toDisplayString(refVal19.value ? "提交中..." : `投稿到 ${refVal16.value.length} 个时段`), 9, Ut)])], 64)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Lt = withScopeId(qt, [["__scopeId", "data-v-36d6b317"]]);
/* index 运行时导出（已语义化） */
export { Lt as default };