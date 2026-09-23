/*!
 * 页面模块：唱票控制台（TallyControlPage）
 * 路由：/admin/tally/activities/:id/control   name=admin-tally-control   层级=3   需登录=是
 * 功能：登录后的「唱票控制台」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/TallyControlPage-CBBTMqC8.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import {
  defineComponent,
  ref,
  inject,
  applyDirectives,
  onMounted,
  createElementBlock,
  createVNode,
  createElementVNode,
  createCommentVNode,
  toDisplayString,
  unref,
  normalizeClass,
  createTextVNode,
  toDisplayValue,
  resolveAsset,
  Fragment,
  renderList,
  useToast,
  withDirectives,
  vModelText,
  withKeys,
  openBlock,
  withScopeId
} from "./index-DJrtCu9i.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import {
  PageHeader
} from "./PageHeader-BWL8GUHB.js";
/* 导入：本地模块 tally（站点内功能模块） */
import {
  getAdminTallyActivitiesRecords,
  undoAdminTallyActivities,
  voteAdminTallyCandidates as castVote
} from "./tally-DC36h0vE.js";
/* 导入：本地模块 useTallySocket（站点内功能模块） */
import {
  createTallySocket as useTallySocket
} from "./useTallySocket-Bnuwbx53.js";
const pageContainerAttrs = {
    class: "page-container"
  },
  controlMainAttrs = {
    class: "control-main"
  },
  topbarAttrs = {
    class: "topbar"
  },
  topbarLeftAttrs = {
    class: "topbar-left"
  },
  controlTitleAttrs = {
    class: "control-title"
  },
  topbarMetaAttrs = {
    class: "topbar-meta"
  },
  topbarRightAttrs = {
    class: "topbar-right"
  },
  undoBtnPatchFlags = ["disabled"],
  statusWarnAttrs = {
    key: 0,
    class: "banner warn"
  },
  loadingBlockAttrs = {
    key: 1,
    class: "loading-block"
  },
  emptyBlockAttrs = {
    key: 2,
    class: "empty-block"
  },
  candidatesGridAttrs = {
    key: 3,
    class: "candidates-grid"
  },
  candHeadAttrs = {
    class: "cand-head"
  },
  candNumberAttrs = {
    class: "cand-number"
  },
  candNameAttrs = {
    class: "cand-name"
  },
  candVotesAttrs = {
    class: "cand-votes"
  },
  candActionsAttrs = {
    class: "cand-actions"
  },
  plus1PatchFlags = ["disabled", "onClick"],
  plus5PatchFlags = ["disabled", "onClick"],
  plus10PatchFlags = ["disabled", "onClick"],
  minus1PatchFlags = ["disabled", "onClick"],
  customWrapAttrs = {
    class: "custom-wrap"
  },
  customInputBindings = ["onUpdate:modelValue", "disabled", "onKeydown"],
  applyBtnPatchFlags = ["disabled", "onClick"],
  logSectionAttrs = {
    class: "log-section"
  },
  logHeadAttrs = {
    class: "log-head"
  },
  logRefreshPatchFlags = ["disabled"],
  logEmptyAttrs = {
    key: 0,
    class: "log-empty"
  },
  logListAttrs = {
    key: 1,
    class: "log-list"
  },
  logTimeAttrs = {
    class: "log-time"
  },
  logCandAttrs = {
    class: "log-cand"
  },
  TallyControlPageComponent = defineComponent({
    __name: "TallyControlPage",
    setup(props) {
      const route = inject(),
        toast = useToast(),
        activityId = ref(Number(route.params.id) || null),
        {
          snapshot: snapshot,
          connected: connected
        } = useTallySocket(activityId),
        records = ref([]),
        recordsLoading = ref(!1),
        undoing = ref(!1),
        customInputs = ref({}),
        busyCandidateId = ref(null),
        sortedCandidates = applyDirectives(() => [...(snapshot.value?.candidates || [])].sort((a, b) => a
          .displayOrder - b.displayOrder)),
        isLive = applyDirectives(() => snapshot.value?.status === 1);

      function screenUrl() {
        return activityId.value ? `${window.location.origin}/tally/screen/${activityId.value}` : null;
      }

      function copyScreenLink() {
        const url = screenUrl();
        url && navigator.clipboard.writeText(url).then(() => toast.success(`已复制大屏链接：${url}`), () => toast
          .error(`复制失败：${url}`));
      }

      function openScreenWindow() {
        const url = screenUrl();
        url && window.open(url, "_blank", "noopener,noreferrer");
      }
      const voteDisabled = applyDirectives(() => !isLive.value || !snapshot.value);

      function statusText(status) {
        return status === void 0 ? "加载中" : status === 0 ? "待开始" : status === 1 ? "进行中" : "已结束";
      }

      function statusClass(status) {
        return status === void 0 || status === 0 ? "pending" : status === 1 ? "live" : "ended";
      }

      function formatClock(isoTime) {
        if (!isoTime) return "";
        const date = new Date(isoTime),
          hours = String(date.getHours()).padStart(2, "0"),
          minutes = String(date.getMinutes()).padStart(2, "0"),
          seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      }
      async function loadRecords() {
        if (activityId.value) {
          recordsLoading.value = !0;
          try {
            const resp = await getAdminTallyActivitiesRecords(activityId.value);
            resp.data.code === 200 && (records.value = (resp.data.data || []).slice(0, 20));
          } catch {} finally {
            recordsLoading.value = !1;
          }
        }
      }
      async function submitVote(candidate, delta) {
        if (!voteDisabled.value) {
          if (!Number.isFinite(delta) || delta === 0) {
            toast.warning("票数变化不能为 0");
            return;
          }
          if (busyCandidateId.value !== candidate.id) {
            busyCandidateId.value = candidate.id;
            try {
              const resp = await castVote(candidate.id, delta);
              resp.data.code === 200 ? await loadRecords() : toast.error(resp.data.message || "录票失败");
            } catch (error) {
              toast.error(error?.message || "网络错误");
            } finally {
              busyCandidateId.value = null;
            }
          }
        }
      }
      async function applyCustomVote(candidate) {
        const rawInput = customInputs.value[candidate.id],
          value = Number(rawInput);
        if (!rawInput || !Number.isFinite(value) || value === 0) {
          toast.warning("请输入非 0 的整数");
          return;
        }
        await submitVote(candidate, Math.trunc(value)), customInputs.value[candidate.id] = "";
      }
      async function undoLast() {
        if (activityId.value && !undoing.value) {
          undoing.value = !0;
          try {
            const resp = await undoAdminTallyActivities(activityId.value);
            resp.data.code === 200 ? resp.data.data ? (toast.success("已撤销最近一次操作"), await loadRecords()) :
              toast.info("无可撤销操作") : toast.error(resp.data.message || "撤销失败");
          } catch (error) {
            toast.error(error?.message || "网络错误");
          } finally {
            undoing.value = !1;
          }
        }
      }
      return onMounted(() => {
        loadRecords();
      }), /* 渲染函数：构建组件模板 DOM 结构 */ (props, cache) => {
        const RouterLink = resolveAsset("router-link");
        return openBlock(), createElementBlock("div", pageContainerAttrs, [createVNode(PageHeader, {
          "back-to": "/admin/tally"
        }), createElementVNode("main", controlMainAttrs, [createElementVNode("div", topbarAttrs, [
            createElementVNode("div", topbarLeftAttrs, [createElementVNode("h1",
                controlTitleAttrs, toDisplayString(unref(snapshot)?.title || "加载中..."), 1),
              createElementVNode("div", topbarMetaAttrs, [createElementVNode("span", {
                  class: normalizeClass(["badge", statusClass(unref(snapshot)?.status)])
                }, toDisplayString(statusText(unref(snapshot)?.status)), 3),
                createElementVNode("span", {
                  class: normalizeClass(["conn", {
                    ok: unref(connected)
                  }])
                }, [cache[0] || (cache[0] = createElementVNode("span", {
                  class: "dot"
                }, null, -1)), createTextVNode(" " + toDisplayString(unref(connected) ?
                  "已连接" : "断线重连中"), 1)], 2)
              ])
            ]), createElementVNode("div", topbarRightAttrs, [createVNode(RouterLink, {
              to: "/admin/tally",
              class: "back-link"
            }, {
              default: toDisplayValue(() => [...(cache[1] || (cache[1] = [createTextVNode(
                "← 返回", -1)]))]),
              _: 1
            }), createElementVNode("button", {
              class: "screen-btn",
              onClick: openScreenWindow,
              title: "新窗口打开大屏"
            }, "打开大屏"), createElementVNode("button", {
              class: "screen-btn",
              onClick: copyScreenLink,
              title: "复制大屏链接"
            }, "复制链接"), createElementVNode("button", {
              class: "undo-btn",
              disabled: undoing.value || !unref(snapshot),
              onClick: undoLast
            }, [cache[2] || (cache[2] = createElementVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5"
            }, [createElementVNode("path", {
              d: "M3 7v6h6"
            }), createElementVNode("path", {
              d: "M21 17a9 9 0 0 0-15-6.7L3 13"
            })], -1)), createTextVNode(" " + toDisplayString(undoing.value ? "撤销中..." :
              "撤销上一步"), 1)], 8, undoBtnPatchFlags)])
          ]), unref(snapshot) && !isLive.value ? (openBlock(), createElementBlock("div",
            statusWarnAttrs, " 活动当前状态为「" + toDisplayString(statusText(unref(snapshot).status)) +
            "」，无法录票。请在活动配置页或活动列表将状态改为「进行中」。 ", 1)) : createCommentVNode("", !0), unref(snapshot) ?
          sortedCandidates.value.length === 0 ? (openBlock(), createElementBlock("div",
            emptyBlockAttrs, [...(cache[4] || (cache[4] = [createElementVNode("p", null,
              "此活动暂无候选人，请先到「配置候选人」页添加。", -1)]))])) : (openBlock(), createElementBlock("div",
            candidatesGridAttrs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(
              sortedCandidates.value, candidate => (openBlock(), createElementBlock(
                "article", {
                  key: candidate.id,
                  class: normalizeClass(["cand-card", {
                    disabled: voteDisabled.value,
                    busy: busyCandidateId.value === candidate.id
                  }])
                }, [createElementVNode("div", candHeadAttrs, [createElementVNode("div",
                    candNumberAttrs, toDisplayString(candidate.number), 1),
                  createElementVNode("div", candNameAttrs, toDisplayString(candidate
                    .name), 1), createElementVNode("div", candVotesAttrs,
                    toDisplayString(candidate.voteCount), 1)
                ]), createElementVNode("div", candActionsAttrs, [createElementVNode(
                  "button", {
                    class: "big-btn plus",
                    disabled: voteDisabled.value || busyCandidateId.value ===
                      candidate.id,
                    onClick: event => submitVote(candidate, 1)
                  }, "+1", 8, plus1PatchFlags), createElementVNode("button", {
                  class: "big-btn plus",
                  disabled: voteDisabled.value || busyCandidateId.value ===
                    candidate.id,
                  onClick: event => submitVote(candidate, 5)
                }, "+5", 8, plus5PatchFlags), createElementVNode("button", {
                  class: "big-btn plus",
                  disabled: voteDisabled.value || busyCandidateId.value ===
                    candidate.id,
                  onClick: event => submitVote(candidate, 10)
                }, "+10", 8, plus10PatchFlags), createElementVNode("button", {
                  class: "big-btn minus",
                  disabled: voteDisabled.value || busyCandidateId.value ===
                    candidate.id,
                  onClick: event => submitVote(candidate, -1)
                }, "-1", 8, minus1PatchFlags), createElementVNode("div",
                  customWrapAttrs, [withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": event => customInputs.value[
                      candidate.id] = event,
                    type: "number",
                    class: "custom-input",
                    placeholder: "自定义",
                    disabled: voteDisabled.value,
                    onKeydown: withKeys(event => applyCustomVote(candidate),
                      ["enter"])
                  }, null, 40, customInputBindings), [
                    [vModelText, customInputs.value[candidate.id]]
                  ]), createElementVNode("button", {
                    class: "apply-btn",
                    disabled: voteDisabled.value || busyCandidateId.value ===
                      candidate.id,
                    onClick: event => applyCustomVote(candidate)
                  }, " 应用 ", 8, applyBtnPatchFlags)])])], 2))), 128))])) : (openBlock(),
            createElementBlock("div", loadingBlockAttrs, [...(cache[3] || (cache[3] = [
              createElementVNode("div", {
                class: "loading-spinner"
              }, null, -1), createElementVNode("p", null, "正在连接实时唱票通道...", -1)
            ]))])), createElementVNode("section", logSectionAttrs, [createElementVNode("div",
            logHeadAttrs, [cache[5] || (cache[5] = createElementVNode("h2", {
              class: "log-title"
            }, "操作日志", -1)), createElementVNode("button", {
                class: "log-refresh",
                disabled: recordsLoading.value,
                onClick: loadRecords
              }, toDisplayString(recordsLoading.value ? "刷新中..." : "刷新"), 9,
              logRefreshPatchFlags)]), records.value.length === 0 ? (openBlock(),
            createElementBlock("div", logEmptyAttrs, "暂无操作记录")) : (openBlock(),
            createElementBlock("ul", logListAttrs, [(openBlock(!0), createElementBlock(
              Fragment, null, renderList(records.value, record => (openBlock(),
                createElementBlock("li", {
                  key: record.id,
                  class: "log-item"
                }, [createElementVNode("span", logTimeAttrs, toDisplayString(
                  formatClock(record.createdAt)), 1), createElementVNode("span",
                  logCandAttrs, toDisplayString(record.candidateNumber) + " · " +
                  toDisplayString(record.candidateName), 1), createElementVNode(
                  "span", {
                    class: normalizeClass(["log-delta", record.delta >= 0 ? "up" :
                      "down"
                    ])
                  }, toDisplayString(record.delta > 0 ? `+${record.delta}` :
                    record.delta), 3), createElementVNode("span", {
                  class: normalizeClass(["log-type", record.type === 1 ?
                    "undo" : "normal"
                  ])
                }, toDisplayString(record.type === 1 ? "撤销" : "普通"), 3)]))), 128))]))])
        ])]);
      };
    }
  }),
  ScopedTallyControlPage = withScopeId(TallyControlPageComponent, [
    ["__scopeId", "data-v-cec9ba62"]
  ]);
/* index 运行时导出（已语义化） */
export {
  ScopedTallyControlPage as
  default
};