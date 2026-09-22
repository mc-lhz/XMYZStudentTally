/*!
 * 页面模块：唱票控制台（TallyControlPage）
 * 路由：/admin/tally/activities/:id/control   name=admin-tally-control   层级=3   需登录=是
 * 功能：登录后的「唱票控制台」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyControlPage-CBBTMqC8.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, ref, inject, applyDirectives, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayString, unref, normalizeClass, createTextVNode, toDisplayValue, resolveAsset, Fragment, renderList, useToast, withDirectives, vModelText, withKeys, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：本地模块 tally（站点内功能模块） */
import { getAdminTallyActivitiesRecords, undoAdminTallyActivities, voteAdminTallyCandidates as recordVote } from "./tally-DC36h0vE.js";
/* 导入：本地模块 useTallySocket（站点内功能模块） */
import { createTallySocket as createTallySocket } from "./useTallySocket-Bnuwbx53.js";
const pageContainerProps = {
    class: "page-container"
  },
  controlMainProps = {
    class: "control-main"
  },
  topbarProps = {
    class: "topbar"
  },
  topbarLeftProps = {
    class: "topbar-left"
  },
  controlTitleProps = {
    class: "control-title"
  },
  topbarMetaProps = {
    class: "topbar-meta"
  },
  topbarRightProps = {
    class: "topbar-right"
  },
  undoButtonProps = ["disabled"],
  warnBannerProps = {
    key: 0,
    class: "banner warn"
  },
  emptyBlockProps = {
    key: 1,
    class: "loading-block"
  },
  candidatesGridProps = {
    key: 2,
    class: "empty-block"
  },
  _e = {
    key: 3,
    class: "candidates-grid"
  },
  candHeadProps = {
    class: "cand-head"
  },
  candNumberProps = {
    class: "cand-number"
  },
  candNameProps = {
    class: "cand-name"
  },
  candVotesProps = {
    class: "cand-votes"
  },
  candActionsProps = {
    class: "cand-actions"
  },
  plus1ButtonProps = ["disabled", "onClick"],
  plus5ButtonProps = ["disabled", "onClick"],
  plus10ButtonProps = ["disabled", "onClick"],
  minus1ButtonProps = ["disabled", "onClick"],
  customWrapProps = {
    class: "custom-wrap"
  },
  customInputProps = ["onUpdate:modelValue", "disabled", "onKeydown"],
  applyButtonProps = ["disabled", "onClick"],
  logSectionProps = {
    class: "log-section"
  },
  logHeadProps = {
    class: "log-head"
  },
  refreshButtonProps = ["disabled"],
  logEmptyProps = {
    key: 0,
    class: "log-empty"
  },
  logListProps = {
    key: 1,
    class: "log-list"
  },
  logTimeProps = {
    class: "log-time"
  },
  logCandProps = {
    class: "log-cand"
  },
  TallyControlPageComponent = defineComponent({
    __name: "TallyControlPage",
    setup(props) {
      const route = inject(),
        toast = useToast(),
        activityId = ref(Number(route.params.id) || null),
        { snapshot, connected } = createTallySocket(activityId),
        records = ref([]),
        recordsLoading = ref(!1),
        undoing = ref(!1),
        customDeltas = ref({}),
        votingCandidateId = ref(null),
        sortedCandidates = applyDirectives(() => [...(snapshot.value?.candidates || [])].sort((val1, val8) => val1.displayOrder - val8.displayOrder)),
        isLive = applyDirectives(() => snapshot.value?.status === 1);
      /**
       * buildScreenUrl
       * 拼装大屏公开链接 {origin}/tally/screen/:id
       */
      function buildScreenUrl() {
        return activityId.value ? `${window.location.origin}/tally/screen/${activityId.value}` : null;
      }
      /**
       * copyScreenLink
       * 复制大屏链接到剪贴板
       */
      function copyScreenLink() {
        const val1 = buildScreenUrl();
        val1 && navigator.clipboard.writeText(val1).then(() => toast.success(`已复制大屏链接：${val1}`), () => toast.error(`复制失败：${val1}`));
      }
      /**
       * openScreen
       * 新窗口打开大屏
       */
      function openScreen() {
        const val1 = buildScreenUrl();
        val1 && window.open(val1, "_blank", "noopener,noreferrer");
      }
      const voteDisabled = applyDirectives(() => !isLive.value || !snapshot.value);
      /**
       * statusLabel
       * 状态码 → 中文标签（undefined 显示「加载中」）
       */
      function statusLabel(val1) {
        return val1 === void 0 ? "加载中" : val1 === 0 ? "待开始" : val1 === 1 ? "进行中" : "已结束";
      }
      /**
       * statusClass
       * 状态码 → 徽标 class 名
       */
      function statusClass(val1) {
        return val1 === void 0 || val1 === 0 ? "pending" : val1 === 1 ? "live" : "ended";
      }
      /**
       * formatLogTime
       * 日志时间戳 → HH:mm:ss
       */
      function formatLogTime(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          val8 = String(date.getHours()).padStart(2, "0"),
          val9 = String(date.getMinutes()).padStart(2, "0"),
          val10 = String(date.getSeconds()).padStart(2, "0");
        return `${val8}:${val9}:${val10}`;
      }
      /**
       * loadRecords
       * 拉取操作日志（最新 20 条）：GET /admin/tally/activities/:id/records
       */
      async function loadRecords() {
        if (activityId.value) {
          recordsLoading.value = !0;
          try {
            const val1 = await getAdminTallyActivitiesRecords(activityId.value);
            val1.data.code === 200 && (records.value = (val1.data.data || []).slice(0, 20));
          } catch {} finally {
            recordsLoading.value = !1;
          }
        }
      }
      /**
       * submitVote
       * 录票：POST /admin/tally/candidates/:id/vote，请求体 { delta }；
       * 录票成功后刷新日志，实时票数以 WS 快照为准
       */
      async function submitVote(val1, val8) {
        if (!voteDisabled.value) {
          if (!Number.isFinite(val8) || val8 === 0) {
            toast.warning("票数变化不能为 0");
            return;
          }
          if (votingCandidateId.value !== val1.id) {
            votingCandidateId.value = val1.id;
            try {
              const val9 = await recordVote(val1.id, val8);
              val9.data.code === 200 ? await loadRecords() : toast.error(val9.data.message || "录票失败");
            } catch (val9) {
              toast.error(val9?.message || "网络错误");
            } finally {
              votingCandidateId.value = null;
            }
          }
        }
      }
      /**
       * submitCustomVote
       * 自定义票数录票（取整后转交 submitVote，并清空输入框）
       */
      async function submitCustomVote(val1) {
        const val8 = customDeltas.value[val1.id],
          val9 = Number(val8);
        if (!val8 || !Number.isFinite(val9) || val9 === 0) {
          toast.warning("请输入非 0 的整数");
          return;
        }
        await submitVote(val1, Math.trunc(val9)), customDeltas.value[val1.id] = "";
      }
      /**
       * undoLastOperation
       * 撤销最近一次录票：POST /admin/tally/activities/:id/undo
       */
      async function undoLastOperation() {
        if (activityId.value && !undoing.value) {
          undoing.value = !0;
          try {
            const val1 = await undoAdminTallyActivities(activityId.value);
            val1.data.code === 200 ? val1.data.data ? (toast.success("已撤销最近一次操作"), await loadRecords()) : toast.info("无可撤销操作") : toast.error(val1.data.message || "撤销失败");
          } catch (val1) {
            toast.error(val1?.message || "网络错误");
          } finally {
            undoing.value = !1;
          }
        }
      }
      return onMounted(() => {
        loadRecords();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val8) => {
        const val9 = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", pageContainerProps, [createVNode(PageHeader, {
          "back-to": "/admin/tally"
        }), createElementVNode("main", controlMainProps, [createElementVNode("div", topbarProps, [createElementVNode("div", topbarLeftProps, [createElementVNode("h1", controlTitleProps, toDisplayString(unref(snapshot)?.title || "加载中..."), 1), createElementVNode("div", topbarMetaProps, [createElementVNode("span", {
          class: normalizeClass(["badge", statusClass(unref(snapshot)?.status)])
        }, toDisplayString(statusLabel(unref(snapshot)?.status)), 3), createElementVNode("span", {
          class: normalizeClass(["conn", {
            ok: unref(connected)
          }])
        }, [val8[0] || (val8[0] = createElementVNode("span", {
          class: "dot"
        }, null, -1)), createTextVNode(" " + toDisplayString(unref(connected) ? "已连接" : "断线重连中"), 1)], 2)])]), createElementVNode("div", topbarRightProps, [createVNode(val9, {
          to: "/admin/tally",
          class: "back-link"
        }, {
          default: toDisplayValue(() => [...(val8[1] || (val8[1] = [createTextVNode("← 返回", -1)]))]),
          _: 1
        }), createElementVNode("button", {
          class: "screen-btn",
          onClick: openScreen,
          title: "新窗口打开大屏"
        }, "打开大屏"), createElementVNode("button", {
          class: "screen-btn",
          onClick: copyScreenLink,
          title: "复制大屏链接"
        }, "复制链接"), createElementVNode("button", {
          class: "undo-btn",
          disabled: undoing.value || !unref(snapshot),
          onClick: undoLastOperation
        }, [val8[2] || (val8[2] = createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2.5"
        }, [createElementVNode("path", {
          d: "M3 7v6h6"
        }), createElementVNode("path", {
          d: "M21 17a9 9 0 0 0-15-6.7L3 13"
        })], -1)), createTextVNode(" " + toDisplayString(undoing.value ? "撤销中..." : "撤销上一步"), 1)], 8, undoButtonProps)])]), unref(snapshot) && !isLive.value ? (openBlock(), createElementBlock("div", warnBannerProps, " 活动当前状态为「" + toDisplayString(statusLabel(unref(snapshot).status)) + "」，无法录票。请在活动配置页或活动列表将状态改为「进行中」。 ", 1)) : createCommentVNode("", !0), unref(snapshot) ? sortedCandidates.value.length === 0 ? (openBlock(), createElementBlock("div", candidatesGridProps, [...(val8[4] || (val8[4] = [createElementVNode("p", null, "此活动暂无候选人，请先到「配置候选人」页添加。", -1)]))])) : (openBlock(), createElementBlock("div", _e, [(openBlock(!0), createElementBlock(Fragment, null, renderList(sortedCandidates.value, val10 => (openBlock(), createElementBlock("article", {
          key: val10.id,
          class: normalizeClass(["cand-card", {
            disabled: voteDisabled.value,
            busy: votingCandidateId.value === val10.id
          }])
        }, [createElementVNode("div", candHeadProps, [createElementVNode("div", candNumberProps, toDisplayString(val10.number), 1), createElementVNode("div", candNameProps, toDisplayString(val10.name), 1), createElementVNode("div", candVotesProps, toDisplayString(val10.voteCount), 1)]), createElementVNode("div", candActionsProps, [createElementVNode("button", {
          class: "big-btn plus",
          disabled: voteDisabled.value || votingCandidateId.value === val10.id,
          onClick: val11 => submitVote(val10, 1)
        }, "+1", 8, plus1ButtonProps), createElementVNode("button", {
          class: "big-btn plus",
          disabled: voteDisabled.value || votingCandidateId.value === val10.id,
          onClick: val11 => submitVote(val10, 5)
        }, "+5", 8, plus5ButtonProps), createElementVNode("button", {
          class: "big-btn plus",
          disabled: voteDisabled.value || votingCandidateId.value === val10.id,
          onClick: val11 => submitVote(val10, 10)
        }, "+10", 8, plus10ButtonProps), createElementVNode("button", {
          class: "big-btn minus",
          disabled: voteDisabled.value || votingCandidateId.value === val10.id,
          onClick: val11 => submitVote(val10, -1)
        }, "-1", 8, minus1ButtonProps), createElementVNode("div", customWrapProps, [withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": val11 => customDeltas.value[val10.id] = val11,
          type: "number",
          class: "custom-input",
          placeholder: "自定义",
          disabled: voteDisabled.value,
          onKeydown: withKeys(val11 => submitCustomVote(val10), ["enter"])
        }, null, 40, customInputProps), [[vModelText, customDeltas.value[val10.id]]]), createElementVNode("button", {
          class: "apply-btn",
          disabled: voteDisabled.value || votingCandidateId.value === val10.id,
          onClick: val11 => submitCustomVote(val10)
        }, " 应用 ", 8, applyButtonProps)])])], 2))), 128))])) : (openBlock(), createElementBlock("div", emptyBlockProps, [...(val8[3] || (val8[3] = [createElementVNode("div", {
          class: "loading-spinner"
        }, null, -1), createElementVNode("p", null, "正在连接实时唱票通道...", -1)]))])), createElementVNode("section", logSectionProps, [createElementVNode("div", logHeadProps, [val8[5] || (val8[5] = createElementVNode("h2", {
          class: "log-title"
        }, "操作日志", -1)), createElementVNode("button", {
          class: "log-refresh",
          disabled: recordsLoading.value,
          onClick: loadRecords
        }, toDisplayString(recordsLoading.value ? "刷新中..." : "刷新"), 9, refreshButtonProps)]), records.value.length === 0 ? (openBlock(), createElementBlock("div", logEmptyProps, "暂无操作记录")) : (openBlock(), createElementBlock("ul", logListProps, [(openBlock(!0), createElementBlock(Fragment, null, renderList(records.value, val10 => (openBlock(), createElementBlock("li", {
          key: val10.id,
          class: "log-item"
        }, [createElementVNode("span", logTimeProps, toDisplayString(formatLogTime(val10.createdAt)), 1), createElementVNode("span", logCandProps, toDisplayString(val10.candidateNumber) + " · " + toDisplayString(val10.candidateName), 1), createElementVNode("span", {
          class: normalizeClass(["log-delta", val10.delta >= 0 ? "up" : "down"])
        }, toDisplayString(val10.delta > 0 ? `+${val10.delta}` : val10.delta), 3), createElementVNode("span", {
          class: normalizeClass(["log-type", val10.type === 1 ? "undo" : "normal"])
        }, toDisplayString(val10.type === 1 ? "撤销" : "普通"), 3)]))), 128))]))])])]);
      };
    }
  }),
  TallyControlPageDefaultExport = withScopeId(TallyControlPageComponent, [["__scopeId", "data-v-cec9ba62"]]);
/* index 运行时导出（已语义化） */
export { TallyControlPageDefaultExport as default };