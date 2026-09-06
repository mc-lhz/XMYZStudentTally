/*!
 * 页面模块：唱票控制台（TallyControlPage）
 * 路由：/admin/tally/activities/:id/control    name=admin-tally-control    level=3    需登录=是
 * 功能：实时唱票的「录票台」。每个候选人卡 +1/+5/+10/-1/自定义按钮；右侧操作日志；顶部撤销。
 * 实时性：页面挂载时通过 useTallySocket 订阅活动 WS，后端每次状态变更推送全量快照，前端整体替换。
 *
 * 来源：assets/TallyControlPage-CBBTMqC8.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：编译产物（变量名 val / zz0..zzN）。为不破坏随后的渲染树，本文件保留全部标识符原貌，
 *       仅通过以下映射注释告诉你每个名字的业务含义。
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, inject, applyDirectives, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayString, unref, normalizeClass, createTextVNode, toDisplayValue, resolveAsset, Fragment, renderList, useToast, withDirectives, vModelText, withKeys, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivitiesRecords, undoAdminTallyActivities, voteAdminTallyCandidates as ee } from "./tally-DC36h0vE.js";
/* 导入：本地模块 useTallySocket（站点内功能模块） */
import { createTallySocket as te } from "./useTallySocket-Bnuwbx53.js";
const se = {
    class: "page-container"
  },
  ae = {
    class: "control-main"
  },
  ne = {
    class: "topbar"
  },
  oe = {
    class: "topbar-left"
  },
  le = {
    class: "control-title"
  },
  ie = {
    class: "topbar-meta"
  },
  de = {
    class: "topbar-right"
  },
  re = ["disabled"],
  ce = {
    key: 0,
    class: "banner warn"
  },
  ue = {
    key: 1,
    class: "loading-block"
  },
  ve = {
    key: 2,
    class: "empty-block"
  },
  _e = {
    key: 3,
    class: "candidates-grid"
  },
  pe = {
    class: "cand-head"
  },
  be = {
    class: "cand-number"
  },
  me = {
    class: "cand-name"
  },
  fe = {
    class: "cand-votes"
  },
  ge = {
    class: "cand-actions"
  },
  he = ["disabled", "onClick"],
  ye = ["disabled", "onClick"],
  ke = ["disabled", "onClick"],
  Ce = ["disabled", "onClick"],
  we = {
    class: "custom-wrap"
  },
  $e = ["onUpdate:modelValue", "disabled", "onKeydown"],
  Se = ["disabled", "onClick"],
  Ne = {
    class: "log-section"
  },
  xe = {
    class: "log-head"
  },
  Te = ["disabled"],
  Ve = {
    key: 0,
    class: "log-empty"
  },
  Me = {
    key: 1,
    class: "log-list"
  },
  Le = {
    class: "log-time"
  },
  Ue = {
    class: "log-cand"
  },
  Be = defineComponent({
    __name: "TallyControlPage",
    setup(val) {
      /* ---- 局部命名 → 业务语义映射 ----
        * inject()             = route
        * refVal  = activityId      来自 URL 的活动 ID
        * val3    = snapshot        WS 收到的最新全量快照
        * val4    = connected       WS 连接是否在线（控制顶部「已连接/重连中」徽章）
        * refVal2 = recentRecords   最近 20 条操作日志
        * refVal3 = isLoadingRecords
        * refVal4 = isUndoing
        * refVal5 = customInputMap  候选人 id -> 自定义数值（受控输入）
        * refVal6 = busyCandidateId 正在录票中的候选人（按钮级防抖）
        * computed = sortedCandidates / isLive / isLocked
        *
        * zz0 = buildScreenUrl
        * zz1 = copyScreenLink
        * zz2 = openScreenInTab
        * zz3 = statusText
        * zz4 = statusBadgeClass
        * zz5 = formatLogTime      HH:mm:ss
        * zz6 = loadRecords        拉最近 20 条操作日志
        * zz7 = voteCandidate      通用录票（+1/+5/+10/-1 按钮都走这里）
        * zz8 = submitCustomVote   自定义数字（受 refVal5 输入控制）
        * zz9 = undoLastRecord     撤销最近一次普通录票（带防抖）
        **/

      const val2 = inject(),
        useToast1 = useToast(),
        refVal = ref(Number(val2.params.id) || null),
        {
          snapshot: val3,
          connected: val4
        } = te(refVal),
        refVal2 = ref([]),
        refVal3 = ref(!1),
        refVal4 = ref(!1),
        refVal5 = ref({}),
        refVal6 = ref(null),
        val5 = applyDirectives(() => [...(val3.value?.candidates || [])].sort((val1, val8) => val1.displayOrder - val8.displayOrder)),
        val6 = applyDirectives(() => val3.value?.status === 1);
      function zz0() {
        return refVal.value ? `${window.location.origin}/tally/screen/${refVal.value}` : null;
      }
      function zz1() {
        const val1 = zz0();
        val1 && navigator.clipboard.writeText(val1).then(() => useToast1.success(`已复制大屏链接：${val1}`), () => useToast1.error(`复制失败：${val1}`));
      }
      function zz2() {
        const val1 = zz0();
        val1 && window.open(val1, "_blank", "noopener,noreferrer");
      }
      const val7 = applyDirectives(() => !val6.value || !val3.value);
      function zz3(val1) {
        return val1 === void 0 ? "加载中" : val1 === 0 ? "待开始" : val1 === 1 ? "进行中" : "已结束";
      }
      function zz4(val1) {
        return val1 === void 0 || val1 === 0 ? "pending" : val1 === 1 ? "live" : "ended";
      }
      function zz5(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          val8 = String(date.getHours()).padStart(2, "0"),
          val9 = String(date.getMinutes()).padStart(2, "0"),
          val10 = String(date.getSeconds()).padStart(2, "0");
        return `${val8}:${val9}:${val10}`;
      }
      async function zz6() {
        if (refVal.value) {
          refVal3.value = !0;
          try {
            const val1 = await getAdminTallyActivitiesRecords(refVal.value);
            val1.data.code === 200 && (refVal2.value = (val1.data.data || []).slice(0, 20));
          } catch {} finally {
            refVal3.value = !1;
          }
        }
      }
      async function zz7(val1, val8) {
        if (!val7.value) {
          if (!Number.isFinite(val8) || val8 === 0) {
            useToast1.warning("票数变化不能为 0");
            return;
          }
          if (refVal6.value !== val1.id) {
            refVal6.value = val1.id;
            try {
              const val9 = await ee(val1.id, val8);
              val9.data.code === 200 ? await zz6() : useToast1.error(val9.data.message || "录票失败");
            } catch (val9) {
              useToast1.error(val9?.message || "网络错误");
            } finally {
              refVal6.value = null;
            }
          }
        }
      }
      async function zz8(val1) {
        const val8 = refVal5.value[val1.id],
          val9 = Number(val8);
        if (!val8 || !Number.isFinite(val9) || val9 === 0) {
          useToast1.warning("请输入非 0 的整数");
          return;
        }
        await zz7(val1, Math.trunc(val9)), refVal5.value[val1.id] = "";
      }
      async function zz9() {
        if (refVal.value && !refVal4.value) {
          refVal4.value = !0;
          try {
            const val1 = await undoAdminTallyActivities(refVal.value);
            val1.data.code === 200 ? val1.data.data ? (useToast1.success("已撤销最近一次操作"), await zz6()) : useToast1.info("无可撤销操作") : useToast1.error(val1.data.message || "撤销失败");
          } catch (val1) {
            useToast1.error(val1?.message || "网络错误");
          } finally {
            refVal4.value = !1;
          }
        }
      }
      /* ---- 渲染函数 ----
       *   Vue 编译产物；以 createElementBlock 树描述 DOM，由 withScopeId 注入 scoped CSS 哈希。
       *   顶部 topbar 展示活动标题 / 状态 / 连接指示 / 撤销；主体按候选人卡片网格渲染；底部是操作日志列表。
       *   isLocked = !isLive || !snapshot —— 任何一边不满足，整卡禁用，阻止「活动未进行中」的录票请求。
       *   busyCandidateId 控制单候选人粒度的「录票中」指示，避免同卡重复点击产生并发请求。
       */
      return onMounted(() => {
        zz6();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val8) => {
        const val9 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", se, [createVNode(PageHeader, {
          "back-to": "/admin/tally"
        }), createElementVNode("main", ae, [createElementVNode("div", ne, [createElementVNode("div", oe, [createElementVNode("h1", le, toDisplayString(unref(val3)?.title || "加载中..."), 1), createElementVNode("div", ie, [createElementVNode("span", {
          class: normalizeClass(["badge", zz4(unref(val3)?.status)])
        }, toDisplayString(zz3(unref(val3)?.status)), 3), createElementVNode("span", {
          class: normalizeClass(["conn", {
            ok: unref(val4)
          }])
        }, [val8[0] || (val8[0] = createElementVNode("span", {
          class: "dot"
        }, null, -1)), createTextVNode(" " + toDisplayString(unref(val4) ? "已连接" : "断线重连中"), 1)], 2)])]), createElementVNode("div", de, [createVNode(val9, {
          to: "/admin/tally",
          class: "back-link"
        }, {
          default: toDisplayValue(() => [...(val8[1] || (val8[1] = [createTextVNode("← 返回", -1)]))]),
          _: 1
        }), createElementVNode("button", {
          class: "screen-btn",
          onClick: zz2,
          title: "新窗口打开大屏"
        }, "打开大屏"), createElementVNode("button", {
          class: "screen-btn",
          onClick: zz1,
          title: "复制大屏链接"
        }, "复制链接"), createElementVNode("button", {
          class: "undo-btn",
          disabled: refVal4.value || !unref(val3),
          onClick: zz9
        }, [val8[2] || (val8[2] = createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2.5"
        }, [createElementVNode("path", {
          d: "M3 7v6h6"
        }), createElementVNode("path", {
          d: "M21 17a9 9 0 0 0-15-6.7L3 13"
        })], -1)), createTextVNode(" " + toDisplayString(refVal4.value ? "撤销中..." : "撤销上一步"), 1)], 8, re)])]), unref(val3) && !val6.value ? (openBlock(), createElementBlock("div", ce, " 活动当前状态为「" + toDisplayString(zz3(unref(val3).status)) + "」，无法录票。请在活动配置页或活动列表将状态改为「进行中」。 ", 1)) : createCommentVNode("", !0), unref(val3) ? val5.value.length === 0 ? (openBlock(), createElementBlock("div", ve, [...(val8[4] || (val8[4] = [createElementVNode("p", null, "此活动暂无候选人，请先到「配置候选人」页添加。", -1)]))])) : (openBlock(), createElementBlock("div", _e, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val5.value, val10 => (openBlock(), createElementBlock("article", {
          key: val10.id,
          class: normalizeClass(["cand-card", {
            disabled: val7.value,
            busy: refVal6.value === val10.id
          }])
        }, [createElementVNode("div", pe, [createElementVNode("div", be, toDisplayString(val10.number), 1), createElementVNode("div", me, toDisplayString(val10.name), 1), createElementVNode("div", fe, toDisplayString(val10.voteCount), 1)]), createElementVNode("div", ge, [createElementVNode("button", {
          class: "big-btn plus",
          disabled: val7.value || refVal6.value === val10.id,
          onClick: val11 => zz7(val10, 1)
        }, "+1", 8, he), createElementVNode("button", {
          class: "big-btn plus",
          disabled: val7.value || refVal6.value === val10.id,
          onClick: val11 => zz7(val10, 5)
        }, "+5", 8, ye), createElementVNode("button", {
          class: "big-btn plus",
          disabled: val7.value || refVal6.value === val10.id,
          onClick: val11 => zz7(val10, 10)
        }, "+10", 8, ke), createElementVNode("button", {
          class: "big-btn minus",
          disabled: val7.value || refVal6.value === val10.id,
          onClick: val11 => zz7(val10, -1)
        }, "-1", 8, Ce), createElementVNode("div", we, [withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val11 => refVal5.value[val10.id] = val11,
          type: "number",
          class: "custom-input",
          placeholder: "自定义",
          disabled: val7.value,
          onKeydown: withKeys(val11 => zz8(val10), ["enter"])
        }, null, 40, $e), [[vModelText, refVal5.value[val10.id]]]), createElementVNode("button", {
          class: "apply-btn",
          disabled: val7.value || refVal6.value === val10.id,
          onClick: val11 => zz8(val10)
        }, " 应用 ", 8, Se)])])], 2))), 128))])) : (openBlock(), createElementBlock("div", ue, [...(val8[3] || (val8[3] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "正在连接实时唱票通道...", -1)]))])), createElementVNode("section", Ne, [createElementVNode("div", xe, [val8[5] || (val8[5] = createElementVNode("h2", {
          class: "log-title"
        }, "操作日志", -1)), createElementVNode("button", {
          class: "log-refresh",
          disabled: refVal3.value,
          onClick: zz6
        }, toDisplayString(refVal3.value ? "刷新中..." : "刷新"), 9, Te)]), refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Ve, "暂无操作记录")) : (openBlock(), createElementBlock("ul", Me, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val10 => (openBlock(), createElementBlock("li", {
          key: val10.id,
          class: "log-item"
        }, [createElementVNode("span", Le, toDisplayString(zz5(val10.createdAt)), 1), createElementVNode("span", Ue, toDisplayString(val10.candidateNumber) + " · " + toDisplayString(val10.candidateName), 1), createElementVNode("span", {
          class: normalizeClass(["log-delta", val10.delta >= 0 ? "up" : "down"])
        }, toDisplayString(val10.delta > 0 ? `+${val10.delta}` : val10.delta), 3), createElementVNode("span", {
          class: normalizeClass(["log-type", val10.type === 1 ? "undo" : "normal"])
        }, toDisplayString(val10.type === 1 ? "撤销" : "普通"), 3)]))), 128))]))])])]);
      };
    }
  }),
  Re = withScopeId(Be, [["__scopeId", "data-v-cec9ba62"]]);
/* index 运行时导出（已语义化） */
export { Re as default };