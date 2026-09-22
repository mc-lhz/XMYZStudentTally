/*!
 * 页面模块：辩论赛管理（DebateAdminPage）
 * 路由：/admin/debate   name=admin-debate   层级=2   需登录=是
 * 功能：登录后的「辩论赛管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/DebateAdminPage-BvQxa_lk.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, applyDirectives, watch, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, createTextVNode, Fragment, renderList, withModifiers, toDisplayString, withDirectives, vModelText, deepWatchOptions, useToast, normalizeClass, unref, resolveRaw, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
/* 导入：本地模块 debate（站点内功能模块） */
import { getAdminDebateRounds as ds, updateAdminDebateRounds as cs, createAdminDebateRounds as rs, updateAdminDebateRoundsActive as us, lockAdminDebateRounds as ps, regeneratePasswordAdminDebateRounds as vs, resetAdminDebateRounds as ms, unlockAdminDebateRounds as _s, deleteAdminDebateRounds as bs } from "./debate-B8dkqKam.js";
/* 导入：本地模块 useDebateSocket（站点内功能模块） */
import { createDebateSocket as fs } from "./useDebateSocket-8JmRCem2.js";
const ys = {
    class: "page-container"
  },
  ks = {
    class: "page-content"
  },
  hs = {
    class: "content-container"
  },
  gs = {
    class: "breadcrumb-wrapper"
  },
  ws = {
    class: "page-header-section"
  },
  Cs = {
    class: "header-main"
  },
  $s = {
    class: "header-actions"
  },
  As = {
    key: 0,
    class: "loading-container"
  },
  xs = {
    key: 0,
    class: "empty-container"
  },
  Bs = {
    key: 1,
    class: "rounds-list"
  },
  Ds = {
    class: "card-head"
  },
  Vs = {
    class: "badges"
  },
  Ns = {
    class: "badge order"
  },
  Us = {
    key: 0,
    class: "badge live"
  },
  Os = {
    key: 1,
    class: "badge locked"
  },
  Rs = {
    key: 2,
    class: "badge success"
  },
  Ss = {
    class: "card-topic"
  },
  Ps = {
    class: "card-sides"
  },
  Ls = {
    class: "side side-a"
  },
  Ms = {
    class: "side side-b"
  },
  Ts = {
    class: "debaters"
  },
  zs = {
    class: "dcol"
  },
  Is = {
    class: "dchips"
  },
  Es = {
    class: "dcol"
  },
  Fs = {
    class: "dchips"
  },
  Hs = {
    key: 0,
    class: "live-block"
  },
  qs = {
    class: "live-header"
  },
  js = {
    class: "live-total"
  },
  Gs = {
    class: "live-bars"
  },
  Js = {
    class: "lb-row"
  },
  Ks = {
    class: "lb-name"
  },
  Qs = {
    class: "lb-track"
  },
  Ws = {
    class: "lb-num"
  },
  Xs = {
    class: "lb-row"
  },
  Ys = {
    class: "lb-name"
  },
  Zs = {
    class: "lb-track"
  },
  se = {
    class: "lb-num"
  },
  ee = {
    class: "live-debaters"
  },
  te = {
    class: "ld-name"
  },
  oe = {
    class: "ld-votes"
  },
  ae = {
    class: "urls"
  },
  ne = {
    class: "url-row"
  },
  le = {
    class: "url-code"
  },
  ie = ["onClick"],
  de = {
    class: "url-row"
  },
  ce = {
    class: "url-code"
  },
  re = ["onClick"],
  ue = ["href"],
  pe = {
    class: "url-row"
  },
  ve = {
    class: "url-code"
  },
  me = ["onClick"],
  _e = ["href"],
  be = {
    class: "url-row password-row"
  },
  fe = {
    class: "url-code password"
  },
  ye = ["onClick"],
  ke = ["onClick"],
  he = {
    class: "card-actions"
  },
  ge = ["onClick"],
  we = ["onClick"],
  Ce = ["onClick"],
  $e = ["onClick"],
  Ae = ["onClick"],
  xe = ["onClick"],
  Be = {
    class: "modal"
  },
  De = {
    class: "modal-head"
  },
  Ve = {
    class: "modal-body"
  },
  Ne = {
    class: "form-group"
  },
  Ue = {
    class: "form-row"
  },
  Oe = {
    class: "form-group"
  },
  Re = {
    class: "form-group"
  },
  Se = {
    class: "form-row"
  },
  Pe = {
    class: "form-group"
  },
  Le = {
    class: "form-group"
  },
  Me = {
    class: "checkbox-row"
  },
  Te = {
    class: "debater-editor"
  },
  ze = {
    class: "dec-col"
  },
  Ie = {
    class: "dec-head"
  },
  Ee = {
    class: "d-row-list"
  },
  Fe = ["onUpdate:modelValue"],
  He = ["onUpdate:modelValue"],
  qe = ["onClick"],
  je = {
    class: "dec-col"
  },
  Ge = {
    class: "dec-head"
  },
  Je = {
    class: "d-row-list"
  },
  Ke = ["onUpdate:modelValue"],
  Qe = ["onUpdate:modelValue"],
  We = ["onClick"],
  Xe = {
    class: "modal-foot"
  },
  Ye = ["disabled"],
  Ze = defineComponent({
    __name: "DebateAdminPage",
    setup(val) {
      const useToast1 = useToast(),
        loading = ref(!0),
        rounds = ref([]),
        activeRoundId = applyDirectives(() => rounds.value.find(val1 => val1.isActive === 1)?.id ?? null),
        activeRound = ref(null);
      watch(activeRoundId, val1 => activeRound.value = val1, {
        immediate: !0
      });
      const {
        result: activeRoundData
      } = fs(activeRound);
      function zz0(val1, val4) {
        return (val1.debaters || []).filter(val5 => val5.side === val4);
      }
      function zz1(val1) {
        if (!activeRoundData.value) return 0;
        const val4 = activeRoundData.value.supportA + activeRoundData.value.supportB;
        return val4 === 0 ? 0 : Math.round(val1 / val4 * 100);
      }
      function zz2(val1) {
        if (val1 === null) return "--:--";
        const val4 = Math.floor(val1 / 60),
          val5 = val1 % 60;
        return `${String(val4).padStart(2, "0")}:${String(val5).padStart(2, "0")}`;
      }
      async function zz3() {
        loading.value = !0;
        try {
          const val1 = await ds();
          val1.data.code === 200 ? rounds.value = val1.data.data || [] : useToast1.error(val1.data.message || "加载失败");
        } catch (val1) {
          useToast1.error(val1?.message || "网络错误");
        } finally {
          loading.value = !1;
        }
      }
      async function zz4(val1) {
        if (confirm(`确认激活「${val1.topic}」？
激活后投票计时立即开始，其他场次会被自动停用。`)) try {
          await us(val1.id), useToast1.success("已激活"), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      async function zz5(val1) {
        if (confirm("确认立即锁票？锁后观众无法再投票。")) try {
          await ps(val1.id), useToast1.success("已锁票"), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      async function zz6(val1) {
        if (confirm(`确认为「${val1.topic}」重新生成操作员密码？
旧密码会立即失效，已在操作员界面登录的人会被踢出。`)) try {
          const val4 = await vs(val1.id);
          val4.data.code === 200 ? (useToast1.success("新密码：" + val4.data.data), await zz3()) : useToast1.error(val4.data.message || "重置失败");
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      async function zz7(val1) {
        if (confirm(`确认重置「${val1.topic}」的倒计时？
倒计时将回到满 ${val1.voteDurationSeconds} 秒重新开始。已投的票数会保留。`)) try {
          await ms(val1.id), useToast1.success("倒计时已重置"), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      async function zz8(val1) {
        try {
          await _s(val1.id, 300), useToast1.success("已解锁，再开 5 分钟"), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      async function zz9(val1) {
        if (confirm(`确认删除「${val1.topic}」？投票数据会保留但场次和辩手会删除。`)) try {
          await bs(val1.id), useToast1.success("已删除"), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "操作失败");
        }
      }
      const editDialogOpen = ref(!1),
        editingRound = ref(null),
        savingDebaters = ref(!1),
        roundForm = ref({
          topic: "",
          sideAName: "正方",
          sideBName: "反方",
          voteDurationSeconds: 600,
          displayOrder: 0,
          publicDisplay: !1,
          debaters: []
        }),
        sideADebaters = ref([]),
        sideBDebaters = ref([]);
      function zz10(val1) {
        editingRound.value = val1 || null, val1 ? (roundForm.value = {
          topic: val1.topic,
          sideAName: val1.sideAName,
          sideBName: val1.sideBName,
          voteDurationSeconds: val1.voteDurationSeconds,
          displayOrder: val1.displayOrder,
          publicDisplay: val1.publicDisplay === 1,
          debaters: []
        }, sideADebaters.value = (val1.debaters || []).filter(val4 => val4.side === "A").map(val4 => ({
          name: val4.name,
          side: "A",
          position: val4.position,
          displayOrder: val4.displayOrder
        })), sideBDebaters.value = (val1.debaters || []).filter(val4 => val4.side === "B").map(val4 => ({
          name: val4.name,
          side: "B",
          position: val4.position,
          displayOrder: val4.displayOrder
        }))) : (roundForm.value = {
          topic: "",
          sideAName: "正方",
          sideBName: "反方",
          voteDurationSeconds: 600,
          displayOrder: rounds.value.length + 1,
          publicDisplay: !1,
          debaters: []
        }, sideADebaters.value = [{
          name: "",
          side: "A",
          position: "一辩",
          displayOrder: 1
        }], sideBDebaters.value = [{
          name: "",
          side: "B",
          position: "一辩",
          displayOrder: 1
        }]), editDialogOpen.value = !0;
      }
      function zz11() {
        editDialogOpen.value = !1;
      }
      function zz12(val1) {
        const val4 = val1 === "A" ? sideADebaters : sideBDebaters;
        val4.value.push({
          name: "",
          side: val1,
          position: "",
          displayOrder: val4.value.length + 1
        });
      }
      function zz13(val1) {
        sideADebaters.value = sideADebaters.value.filter(val4 => val4 !== val1), sideBDebaters.value = sideBDebaters.value.filter(val4 => val4 !== val1);
      }
      async function zz14() {
        const val1 = [...sideADebaters.value, ...sideBDebaters.value].filter(val4 => val4.name.trim());
        if (!roundForm.value.topic.trim()) {
          useToast1.error("请填写辩题");
          return;
        }
        if (val1.length === 0) {
          useToast1.error("至少添加一名辩手");
          return;
        }
        roundForm.value.debaters = val1, savingDebaters.value = !0;
        try {
          editingRound.value?.id ? (await cs(editingRound.value.id, roundForm.value), useToast1.success("已保存")) : (await rs(roundForm.value), useToast1.success("已创建")), zz11(), await zz3();
        } catch (val4) {
          useToast1.error(val4?.message || "保存失败");
        } finally {
          savingDebaters.value = !1;
        }
      }
      function zz15(val1, val4) {
        navigator.clipboard.writeText(val1).then(() => useToast1.success(`已复制${val4}`), () => useToast1.error(`复制失败：${val1}`));
      }
      function zz16(val1) {
        return `${window.location.origin}/vote?round=${val1}`;
      }
      function zz17(val1) {
        return `${window.location.origin}/vote/screen?round=${val1}`;
      }
      function zz18(val1) {
        return `${window.location.origin}/vote/display?round=${val1}`;
      }
      return onMounted(zz3), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val4) => (openBlock(), createElementBlock("div", ys, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", ks, [createElementVNode("div", hs, [createElementVNode("div", gs, [createVNode(PageBreadcrumb)]), createElementVNode("div", ws, [createElementVNode("div", Cs, [val4[11] || (val4[11] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "辩论赛投票管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "录入场次与辩手、激活投票、实时查看结果")], -1)), createElementVNode("div", $s, [createElementVNode("button", {
        class: "action-button primary",
        onClick: val4[0] || (val4[0] = val5 => zz10())
      }, [...(val4[10] || (val4[10] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
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
      })], -1), createTextVNode(" 新建场次 ", -1)]))])])])]), loading.value ? (openBlock(), createElementBlock("div", As, [...(val4[12] || (val4[12] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [rounds.value.length === 0 ? (openBlock(), createElementBlock("div", xs, [val4[13] || (val4[13] = createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      })])], -1)), val4[14] || (val4[14] = createElementVNode("h2", null, "还没有任何辩论场次", -1)), val4[15] || (val4[15] = createElementVNode("p", null, "点击右上角「新建场次」开始录入", -1)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: val4[1] || (val4[1] = val5 => zz10())
      }, "新建第一场")])) : (openBlock(), createElementBlock("div", Bs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(rounds.value, val5 => (openBlock(), createElementBlock("article", {
        key: val5.id,
        class: normalizeClass(["round-card", {
          active: val5.isActive === 1,
          locked: val5.locked === 1
        }])
      }, [createElementVNode("header", Ds, [createElementVNode("div", Vs, [createElementVNode("span", Ns, "第 " + toDisplayString(val5.displayOrder) + " 场", 1), val5.isActive === 1 ? (openBlock(), createElementBlock("span", Us, "激活中")) : createCommentVNode("", !0), val5.locked === 1 ? (openBlock(), createElementBlock("span", Os, "已锁票")) : createCommentVNode("", !0), val5.publicDisplay === 1 ? (openBlock(), createElementBlock("span", Rs, "大屏公开")) : createCommentVNode("", !0)]), createElementVNode("h3", Ss, toDisplayString(val5.topic), 1), createElementVNode("div", Ps, [createElementVNode("span", Ls, toDisplayString(val5.sideAName), 1), val4[16] || (val4[16] = createElementVNode("span", {
        class: "vs"
      }, "vs", -1)), createElementVNode("span", Ms, toDisplayString(val5.sideBName), 1)])]), createElementVNode("div", Ts, [createElementVNode("div", zs, [val4[17] || (val4[17] = createElementVNode("h4", null, "正方", -1)), createElementVNode("div", Is, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz0(val5, "A"), val6 => (openBlock(), createElementBlock("span", {
        key: val6.id,
        class: "dchip"
      }, toDisplayString(val6.position || "辩手") + "·" + toDisplayString(val6.name), 1))), 128))])]), createElementVNode("div", Es, [val4[18] || (val4[18] = createElementVNode("h4", null, "反方", -1)), createElementVNode("div", Fs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz0(val5, "B"), val6 => (openBlock(), createElementBlock("span", {
        key: val6.id,
        class: "dchip"
      }, toDisplayString(val6.position || "辩手") + "·" + toDisplayString(val6.name), 1))), 128))])])]), val5.isActive === 1 && unref(activeRoundData) && unref(activeRoundData).roundId === val5.id ? (openBlock(), createElementBlock("div", Hs, [createElementVNode("div", qs, [createElementVNode("span", js, [val4[19] || (val4[19] = createTextVNode(" 实时 ", -1)), createElementVNode("b", null, toDisplayString(unref(activeRoundData).totalVotes), 1), val4[20] || (val4[20] = createTextVNode(" 票 ", -1))]), createElementVNode("span", {
        class: normalizeClass(["live-timer", {
          urgent: (unref(activeRoundData).secondsLeft ?? 0) < 60 && !unref(activeRoundData).locked
        }])
      }, toDisplayString(unref(activeRoundData).locked ? "已锁票" : `剩余 ${zz2(unref(activeRoundData).secondsLeft)}`), 3)]), createElementVNode("div", Gs, [createElementVNode("div", Js, [createElementVNode("span", Ks, toDisplayString(unref(activeRoundData).sideAName), 1), createElementVNode("div", Qs, [createElementVNode("div", {
        class: "lb-fill a",
        style: resolveRaw({
          width: zz1(unref(activeRoundData).supportA) + "%"
        })
      }, null, 4)]), createElementVNode("span", Ws, toDisplayString(unref(activeRoundData).supportA), 1)]), createElementVNode("div", Xs, [createElementVNode("span", Ys, toDisplayString(unref(activeRoundData).sideBName), 1), createElementVNode("div", Zs, [createElementVNode("div", {
        class: "lb-fill b",
        style: resolveRaw({
          width: zz1(unref(activeRoundData).supportB) + "%"
        })
      }, null, 4)]), createElementVNode("span", se, toDisplayString(unref(activeRoundData).supportB), 1)])]), createElementVNode("div", ee, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(activeRoundData).debaterVotes, val6 => (openBlock(), createElementBlock("div", {
        key: val6.id,
        class: normalizeClass(["ld-chip", val6.side === "A" ? "a" : "b"])
      }, [createElementVNode("span", te, toDisplayString(val6.name), 1), createElementVNode("span", oe, toDisplayString(val6.votes), 1)], 2))), 128))])])) : createCommentVNode("", !0), createElementVNode("div", ae, [createElementVNode("div", ne, [val4[21] || (val4[21] = createElementVNode("span", {
        class: "url-label"
      }, "观众投票", -1)), createElementVNode("code", le, toDisplayString(zz16(val5.id)), 1), createElementVNode("button", {
        class: "url-copy",
        onClick: val6 => zz15(zz16(val5.id), "观众投票链接")
      }, "复制", 8, ie)]), createElementVNode("div", de, [val4[22] || (val4[22] = createElementVNode("span", {
        class: "url-label"
      }, "投屏二维码", -1)), createElementVNode("code", ce, toDisplayString(zz17(val5.id)), 1), createElementVNode("button", {
        class: "url-copy",
        onClick: val6 => zz15(zz17(val5.id), "投屏二维码链接")
      }, "复制", 8, re), createElementVNode("a", {
        class: "url-open",
        href: zz17(val5.id),
        target: "_blank"
      }, "打开", 8, ue)]), createElementVNode("div", pe, [val4[23] || (val4[23] = createElementVNode("span", {
        class: "url-label"
      }, "实时结果", -1)), createElementVNode("code", ve, toDisplayString(zz18(val5.id)), 1), createElementVNode("button", {
        class: "url-copy",
        onClick: val6 => zz15(zz18(val5.id), "实时结果链接")
      }, "复制", 8, me), createElementVNode("a", {
        class: "url-open",
        href: zz18(val5.id),
        target: "_blank"
      }, "打开", 8, _e)]), createElementVNode("div", be, [val4[24] || (val4[24] = createElementVNode("span", {
        class: "url-label"
      }, "操作员密码", -1)), createElementVNode("code", fe, toDisplayString(val5.accessPassword || "—"), 1), createElementVNode("button", {
        class: "url-copy",
        onClick: val6 => zz15(val5.accessPassword || "", "操作员密码")
      }, "复制", 8, ye), createElementVNode("button", {
        class: "url-copy warn",
        onClick: val6 => zz6(val5)
      }, "重新生成", 8, ke)])]), createElementVNode("footer", he, [val5.isActive !== 1 ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "act-btn primary",
        onClick: val6 => zz4(val5)
      }, " 激活并开始 ", 8, ge)) : createCommentVNode("", !0), val5.isActive === 1 ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "act-btn",
        onClick: val6 => zz7(val5)
      }, " 重置倒计时 ", 8, we)) : createCommentVNode("", !0), val5.isActive === 1 && val5.locked !== 1 ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "act-btn warn",
        onClick: val6 => zz5(val5)
      }, " 立即锁票 ", 8, Ce)) : createCommentVNode("", !0), val5.locked === 1 ? (openBlock(), createElementBlock("button", {
        key: 3,
        class: "act-btn",
        onClick: val6 => zz8(val5)
      }, " 解锁再开 5 分钟 ", 8, $e)) : createCommentVNode("", !0), createElementVNode("button", {
        class: "act-btn",
        onClick: val6 => zz10(val5)
      }, "编辑", 8, Ae), createElementVNode("button", {
        class: "act-btn danger",
        onClick: val6 => zz9(val5)
      }, "删除", 8, xe)])], 2))), 128))]))], 64))])]), createVNode(PageFooter), editDialogOpen.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "modal-mask",
        onClick: withModifiers(zz11, ["self"])
      }, [createElementVNode("div", Be, [createElementVNode("header", De, [createElementVNode("h2", null, toDisplayString(editingRound.value?.id ? "编辑场次" : "新建场次"), 1), createElementVNode("button", {
        class: "modal-close",
        onClick: zz11
      }, [...(val4[25] || (val4[25] = [createElementVNode("svg", {
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
      })], -1)]))])]), createElementVNode("div", Ve, [createElementVNode("div", Ne, [val4[26] || (val4[26] = createElementVNode("label", {
        class: "form-label"
      }, "辩题", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[2] || (val4[2] = val5 => roundForm.value.topic = val5),
        type: "text",
        class: "form-input",
        placeholder: "例：高中生应不应该谈恋爱"
      }, null, 512), [[vModelText, roundForm.value.topic]])]), createElementVNode("div", Ue, [createElementVNode("div", Oe, [val4[27] || (val4[27] = createElementVNode("label", {
        class: "form-label"
      }, "正方名称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[3] || (val4[3] = val5 => roundForm.value.sideAName = val5),
        type: "text",
        class: "form-input"
      }, null, 512), [[vModelText, roundForm.value.sideAName]])]), createElementVNode("div", Re, [val4[28] || (val4[28] = createElementVNode("label", {
        class: "form-label"
      }, "反方名称", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[4] || (val4[4] = val5 => roundForm.value.sideBName = val5),
        type: "text",
        class: "form-input"
      }, null, 512), [[vModelText, roundForm.value.sideBName]])])]), createElementVNode("div", Se, [createElementVNode("div", Pe, [val4[29] || (val4[29] = createElementVNode("label", {
        class: "form-label"
      }, "顺序", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[5] || (val4[5] = val5 => roundForm.value.displayOrder = val5),
        type: "number",
        class: "form-input"
      }, null, 512), [[vModelText, roundForm.value.displayOrder, void 0, {
        number: !0
      }]])]), createElementVNode("div", Le, [val4[30] || (val4[30] = createElementVNode("label", {
        class: "form-label"
      }, "投票时长（秒）", -1)), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[6] || (val4[6] = val5 => roundForm.value.voteDurationSeconds = val5),
        type: "number",
        class: "form-input"
      }, null, 512), [[vModelText, roundForm.value.voteDurationSeconds, void 0, {
        number: !0
      }]])])]), createElementVNode("label", Me, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val4[7] || (val4[7] = val5 => roundForm.value.publicDisplay = val5),
        type: "checkbox"
      }, null, 512), [[deepWatchOptions, roundForm.value.publicDisplay]]), val4[31] || (val4[31] = createElementVNode("span", null, "允许大屏公开展示（观众可访问 /vote/display）", -1))]), createElementVNode("div", Te, [createElementVNode("div", ze, [createElementVNode("div", Ie, [val4[32] || (val4[32] = createElementVNode("h4", null, "正方辩手", -1)), createElementVNode("button", {
        type: "button",
        class: "add-btn",
        onClick: val4[8] || (val4[8] = val5 => zz12("A"))
      }, "+ 添加")]), createElementVNode("div", Ee, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sideADebaters.value, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: `a-${val6}`,
        class: "d-row"
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.position = val7,
        class: "d-input d-position",
        placeholder: "一辩"
      }, null, 8, Fe), [[vModelText, val5.position]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.name = val7,
        class: "d-input d-name",
        placeholder: "姓名"
      }, null, 8, He), [[vModelText, val5.name]]), createElementVNode("button", {
        class: "d-remove",
        onClick: val7 => zz13(val5),
        type: "button"
      }, "×", 8, qe)]))), 128))])]), createElementVNode("div", je, [createElementVNode("div", Ge, [val4[33] || (val4[33] = createElementVNode("h4", null, "反方辩手", -1)), createElementVNode("button", {
        type: "button",
        class: "add-btn",
        onClick: val4[9] || (val4[9] = val5 => zz12("B"))
      }, "+ 添加")]), createElementVNode("div", Je, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sideBDebaters.value, (val5, val6) => (openBlock(), createElementBlock("div", {
        key: `b-${val6}`,
        class: "d-row"
      }, [withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.position = val7,
        class: "d-input d-position",
        placeholder: "一辩"
      }, null, 8, Ke), [[vModelText, val5.position]]), withDirectives(createElementVNode("input", {
        "onUpdate:modelValue": val7 => val5.name = val7,
        class: "d-input d-name",
        placeholder: "姓名"
      }, null, 8, Qe), [[vModelText, val5.name]]), createElementVNode("button", {
        class: "d-remove",
        onClick: val7 => zz13(val5),
        type: "button"
      }, "×", 8, We)]))), 128))])])])]), createElementVNode("footer", Xe, [createElementVNode("button", {
        class: "modal-btn ghost",
        onClick: zz11
      }, "取消"), createElementVNode("button", {
        class: "modal-btn primary",
        disabled: savingDebaters.value,
        onClick: zz14
      }, toDisplayString(savingDebaters.value ? "保存中…" : "保存"), 9, Ye)])])])) : createCommentVNode("", !0)]));
    }
  }),
  it = withScopeId(Ze, [["__scopeId", "data-v-57edda93"]]);
/* index 运行时导出（已语义化） */
export { it as default };