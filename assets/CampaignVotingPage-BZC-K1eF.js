/*!
 * 页面模块：铃声投票（CampaignVotingPage-BZC-K1eF）
 * 路由：/ringtone/:id/vote   name=ringtone-vote   层级=2   需登录=是
 * 功能：登录后的「铃声投票」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampaignVotingPage-BZC-K1eF.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, cloneIfRaw, watch, onMounted, createElementBlock, createVNode, createElementVNode, createCommentVNode, Fragment, toDisplayString, renderList, createTextVNode, normalizeClass, createVNodeWrapper, useRouter, useToast, withDirectives, vModelText, toDisplayValue, modalShowDef, withModifiers, withSlots, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { voteVoting as ze, getCampaignsById as Fe, getVotingCampaignsConfig as Re, getVotingCampaignsMyVotes as He, getVotingCampaignsOptions as Ie } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const je = {
    class: "page-container"
  },
  Ke = {
    class: "page-content"
  },
  We = {
    class: "content-container"
  },
  Ge = {
    class: "breadcrumb-wrapper"
  },
  Je = {
    key: 0,
    class: "loading-container"
  },
  Xe = {
    class: "campaign-card"
  },
  Ye = {
    class: "campaign-info"
  },
  Ze = {
    class: "campaign-title"
  },
  De = {
    key: 0,
    class: "campaign-desc"
  },
  et = {
    class: "campaign-meta"
  },
  tt = {
    class: "meta-item"
  },
  st = {
    class: "meta-item"
  },
  it = {
    class: "meta-item countdown"
  },
  ot = {
    key: 0,
    class: "step-section"
  },
  nt = {
    class: "buildings-grid"
  },
  at = ["onClick"],
  rt = {
    class: "building-name"
  },
  lt = {
    key: 1,
    class: "step-section"
  },
  ut = {
    key: 1,
    class: "user-info-form"
  },
  ct = {
    class: "form-fields"
  },
  dt = ["for"],
  vt = ["id", "onUpdate:modelValue", "placeholder"],
  mt = {
    class: "voting-periods"
  },
  gt = ["onClick"],
  ft = {
    class: "period-left"
  },
  pt = {
    class: "period-name"
  },
  _t = {
    class: "period-count"
  },
  ht = {
    class: "period-right"
  },
  yt = {
    class: "period-content"
  },
  Ct = {
    class: "period-search"
  },
  kt = ["onUpdate:modelValue"],
  wt = ["onClick"],
  bt = {
    key: 0,
    class: "period-empty"
  },
  xt = {
    key: 0
  },
  Mt = {
    key: 1
  },
  Pt = {
    key: 1,
    class: "options-grid"
  },
  St = ["onClick"],
  Vt = {
    class: "card-cover-wrapper"
  },
  $t = ["src", "alt"],
  Bt = {
    key: 0,
    class: "card-votes"
  },
  Lt = {
    class: "card-info"
  },
  Ot = {
    class: "card-title"
  },
  Tt = {
    class: "card-artist"
  },
  Nt = ["onClick"],
  Et = {
    class: "submit-bar"
  },
  Ut = {
    class: "submit-info"
  },
  zt = {
    class: "submit-progress"
  },
  Ft = ["disabled"],
  Rt = {
    key: 2,
    class: "step-section"
  },
  Ht = {
    class: "result-header"
  },
  It = {
    key: 0,
    class: "result-time"
  },
  qt = {
    key: 1,
    class: "result-building"
  },
  At = {
    class: "result-votes"
  },
  Qt = {
    class: "votes-list"
  },
  jt = {
    class: "vote-period"
  },
  Kt = {
    class: "vote-music"
  },
  Wt = ["src", "alt"],
  Gt = {
    key: 1,
    class: "vote-cover-placeholder"
  },
  Jt = {
    class: "vote-info"
  },
  Xt = {
    class: "vote-name"
  },
  Yt = {
    class: "vote-artist"
  },
  CampaignVotingPageConst0 = 12,
  Zt = 12,
  Dt = defineComponent({
    __name: "CampaignVotingPage",
    setup(val) {
      const route = inject(),
        useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        campaignId = applyDirectives(() => Number(route.params.id)),
        loading = ref(!0),
        campaign = ref(null),
        votingConfig = ref(null),
        timePeriods = ref([]),
        myVotes = ref(null),
        viewState = ref("building"),
        selectedItem = ref(null),
        selections = ref(new Map()),
        submitting = ref(!1),
        expandedState = cloneIfRaw({}),
        val5 = cloneIfRaw({}),
        periodKeys = cloneIfRaw({}),
        userInfoForm = cloneIfRaw({
          dormitory: "",
          bed: "",
          student_id: ""
        }),
        stageConfig = applyDirectives(() => campaign.value?.currentStage ? campaign.value.currentStage.config : null),
        votingMode = applyDirectives(() => {
          const val1 = stageConfig.value?.voting_mode;
          return val1 || votingConfig.value?.votingMode || "unified";
        }),
        isByBuilding = applyDirectives(() => votingMode.value === "per_building" || votingMode.value === "by_building"),
        buildings = applyDirectives(() => votingConfig.value?.buildings || []),
        voteLimit = applyDirectives(() => {
          const val1 = stageConfig.value;
          return val1?.rules?.has_limit ? {
            hasLimit: !0,
            limitScope: val1.rules.limit_scope || "period",
            minCount: val1.rules.min_count || 1,
            maxCount: val1.rules.max_count || 1
          } : {
            hasLimit: !1,
            limitScope: "period",
            minCount: 1,
            maxCount: 1
          };
        }),
        requireUserInfo = applyDirectives(() => stageConfig.value?.rules?.require_user_info || !1),
        userInfoFields = applyDirectives(() => stageConfig.value?.rules?.user_info_fields || []),
        fieldLabels = {
          dormitory: "宿舍号",
          bed: "床位号",
          student_id: "学号"
        },
        userInfoComplete = applyDirectives(() => requireUserInfo.value ? userInfoFields.value.every(val1 => userInfoForm[val1]?.trim()) : !0),
        limitHint = applyDirectives(() => {
          const {
            hasLimit: val1,
            limitScope: val21,
            minCount: val22,
            maxCount: val23
          } = voteLimit.value;
          return val1 ? val21 === "period" ? val22 === val23 ? `每个时段选择 ${val23} 首` : `每个时段选择 ${val22}-${val23} 首` : val22 === val23 ? `总共选择 ${val23} 首` : `总共选择 ${val22}-${val23} 首` : "每个时段选择一首歌曲";
        });
      function zz0(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          date2 = new Date(),
          val21 = date.getTime() - date2.getTime();
        if (val21 < 0) return "已结束";
        const val22 = Math.floor(val21 / (1e3 * 60 * 60 * 24)),
          val23 = Math.floor(val21 % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        return val22 > 0 ? `剩余 ${val22}天${val23}小时` : val23 > 0 ? `剩余 ${val23}小时` : `剩余 ${Math.floor(val21 / 6e4)}分钟`;
      }
      async function zz1() {
        try {
          const val1 = await Fe(campaignId.value);
          val1.data.code === 200 ? (campaign.value = val1.data.data, campaign.value.currentStage?.stageType !== "voting" && (useToast1.warning("当前不在投票阶段"), useRouter1.push("/ringtone"))) : (useToast1.error(val1.data.message || "获取活动详情失败"), useRouter1.push("/ringtone"));
        } catch {
          useToast1.error("获取活动详情失败"), useRouter1.push("/ringtone");
        }
      }
      async function zz2() {
        try {
          const val1 = await Re(campaignId.value);
          val1.data.code === 200 ? votingConfig.value = val1.data.data : useToast1.error(val1.data.message || "获取投票配置失败");
        } catch {
          useToast1.error("获取投票配置失败");
        }
      }
      async function zz3() {
        try {
          const val1 = await He(campaignId.value);
          val1.data.code === 200 && (myVotes.value = val1.data.data);
        } catch (val1) {
          console.error("获取我的投票失败", val1);
        }
      }
      async function zz4(val1) {
        try {
          const val21 = await Ie(campaignId.value, val1);
          val21.data.code === 200 ? (timePeriods.value = val21.data.data, timePeriods.value.forEach((val22, val23) => {
            expandedState[val22.timePeriod.id] = val23 === 0, val5[val22.timePeriod.id] = CampaignVotingPageConst0;
          })) : useToast1.error(val21.data.message || "获取投票选项失败");
        } catch {
          useToast1.error("获取投票选项失败");
        }
      }
      async function zz5() {
        if (!useUserStore1.isLoggedIn) {
          useUserStore1.openLoginModal("请先登录以参与投票"), useRouter1.push("/ringtone");
          return;
        }
        loading.value = !0;
        try {
          await zz1(), await zz2(), await zz3(), myVotes.value ? (viewState.value = "result", isByBuilding.value && myVotes.value.buildingChoice ? await zz4(myVotes.value.buildingChoice) : isByBuilding.value || (await zz4())) : isByBuilding.value || (await zz4(), viewState.value = "voting");
        } finally {
          loading.value = !1;
        }
      }
      async function zz6(val1) {
        selectedItem.value = val1, loading.value = !0;
        try {
          await zz4(val1), viewState.value = "voting";
        } finally {
          loading.value = !1;
        }
      }
      function zz7() {
        viewState.value = "building", selectedItem.value = null, selections.value.clear(), timePeriods.value = [];
      }
      function zz8(val1) {
        expandedState[val1] = !expandedState[val1];
      }
      function zz9(val1) {
        val5[val1] = (val5[val1] || CampaignVotingPageConst0) + Zt;
      }
      function zz10(val1) {
        const val21 = periodKeys[val1.timePeriod.id]?.trim().toLowerCase();
        return val21 ? val1.options.filter(val22 => {
          const val23 = val22.music.song?.toLowerCase() || "",
            val24 = val22.music.singer?.toLowerCase() || "",
            val25 = val22.music.album?.toLowerCase() || "";
          return val23.includes(val21) || val24.includes(val21) || val25.includes(val21);
        }) : val1.options;
      }
      function zz11(val1) {
        const val21 = zz10(val1),
          val22 = val5[val1.timePeriod.id] || CampaignVotingPageConst0;
        return val21.slice(0, val22);
      }
      function zz12(val1) {
        const val21 = zz10(val1),
          val22 = val5[val1.timePeriod.id] || CampaignVotingPageConst0;
        return val21.length > val22;
      }
      function zz13(val1) {
        const val21 = zz10(val1),
          val22 = val5[val1.timePeriod.id] || CampaignVotingPageConst0;
        return val21.length - val22;
      }
      function zz14(val1) {
        return zz10(val1).length;
      }
      function zz15(val1) {
        return selections.value.get(val1)?.size || 0;
      }
      const val17 = applyDirectives(() => {
        let num = 0;
        return selections.value.forEach(val1 => {
          num += val1.size;
        }), num;
      });
      function zz16(val1) {
        const {
          hasLimit: val21,
          limitScope: val22,
          maxCount: val23
        } = voteLimit.value;
        return val21 ? val22 === "period" ? zz15(val1) < val23 : val17.value < val23 : zz15(val1) < 1;
      }
      function zz17(val1) {
        const {
          hasLimit: val21,
          limitScope: val22,
          minCount: val23
        } = voteLimit.value;
        return val21 ? val22 === "period" ? zz15(val1) >= val23 : !0 : zz15(val1) >= 1;
      }
      function zz18(val1, val21) {
        let val22 = selections.value.get(val1);
        if (val22 || (val22 = new Set(), selections.value.set(val1, val22)), val22.has(val21)) val22.delete(val21), val22.size === 0 && selections.value.delete(val1);else if (zz16(val1)) val22.add(val21);else if (voteLimit.value.limitScope === "period" && voteLimit.value.maxCount === 1) val22.clear(), val22.add(val21);else {
          useToast1.warning(voteLimit.value.limitScope === "period" ? `该时段最多选择 ${voteLimit.value.maxCount} 首` : `总共最多选择 ${voteLimit.value.maxCount} 首`);
          return;
        }
        selections.value = new Map(selections.value);
      }
      function zz19(val1, val21) {
        return selections.value.get(val1)?.has(val21) || !1;
      }
      const val18 = applyDirectives(() => {
          let num = 0;
          return timePeriods.value.forEach(val1 => {
            zz17(val1.timePeriod.id) && num++;
          }), num;
        }),
        val19 = applyDirectives(() => timePeriods.value.length),
        val20 = applyDirectives(() => {
          if (!userInfoComplete.value) return !1;
          const {
            limitScope: val1,
            minCount: val21
          } = voteLimit.value;
          return val1 === "activity" ? val17.value >= val21 : val18.value === val19.value;
        });
      async function zz20() {
        if (!userInfoComplete.value) {
          useToast1.error("请填写完整的用户信息");
          return;
        }
        if (!val20.value) {
          const {
            limitScope: val1,
            minCount: val21
          } = voteLimit.value;
          val1 === "activity" ? useToast1.error(`请至少选择 ${val21} 首歌曲`) : useToast1.error("请完成所有时段的投票");
          return;
        }
        submitting.value = !0;
        try {
          const list = [];
          selections.value.forEach((val22, val23) => {
            val22.forEach(val24 => {
              list.push({
                timePeriodId: val23,
                votingOptionId: val24
              });
            });
          });
          const val1 = requireUserInfo.value ? {
              ...userInfoForm
            } : void 0,
            val21 = await ze({
              campaignId: campaignId.value,
              buildingChoice: isByBuilding.value && selectedItem.value || void 0,
              votes: list,
              userInfo: val1
            });
          val21.data.code === 200 ? (useToast1.success("投票成功"), await zz3(), viewState.value = "result") : useToast1.error(val21.data.message || "投票失败");
        } catch (val1) {
          const val21 = val1;
          useToast1.error(val21.response?.data?.message || "投票失败");
        } finally {
          submitting.value = !1;
        }
      }
      function zz21(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      function zz22(val1) {
        return buildings.value.find(val21 => val21.code === val1)?.name || val1;
      }
      function zz23(val1) {
        if (!myVotes.value) return null;
        const val21 = myVotes.value.votes.find(val23 => val23.timePeriod.id === val1);
        if (!val21) return null;
        const val22 = timePeriods.value.find(val23 => val23.timePeriod.id === val1);
        return val22 && val22.options.find(val23 => val23.music.id === val21.music.id) || null;
      }
      return watch(() => useUserStore1.isLoggedIn, val1 => {
        val1 && zz5();
      }), onMounted(() => {
        zz5();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val21) => (openBlock(), createElementBlock("div", je, [createVNode(PageHeader, {
        "back-to": "/ringtone"
      }), createElementVNode("main", Ke, [createElementVNode("div", We, [createElementVNode("div", Ge, [createVNode(PageBreadcrumb)]), loading.value ? (openBlock(), createElementBlock("div", Je, [...(val21[0] || (val21[0] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : campaign.value ? (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", Xe, [createElementVNode("div", Ye, [createElementVNode("h1", Ze, toDisplayString(campaign.value.title), 1), campaign.value.description ? (openBlock(), createElementBlock("p", De, toDisplayString(campaign.value.description), 1)) : createCommentVNode("", !0), createElementVNode("div", et, [createElementVNode("span", tt, toDisplayString(campaign.value.campus?.name), 1), val21[2] || (val21[2] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", st, toDisplayString(limitHint.value), 1), campaign.value.currentStage?.endTime ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [val21[1] || (val21[1] = createElementVNode("span", {
        class: "meta-divider"
      }, "·", -1)), createElementVNode("span", it, toDisplayString(zz0(campaign.value.currentStage.endTime)), 1)], 64)) : createCommentVNode("", !0)])])]), val21[15] || (val21[15] = createElementVNode("div", {
        class: "vote-reminder",
        role: "note",
        "aria-label": "投票账号绑定提醒"
      }, [createElementVNode("div", {
        class: "vote-reminder-icon",
        "aria-hidden": "true"
      }, "!"), createElementVNode("div", {
        class: "vote-reminder-content"
      }, [createElementVNode("p", {
        class: "vote-reminder-title"
      }, "投票前请先确认账号绑定状态"), createElementVNode("p", {
        class: "vote-reminder-text"
      }, "根据最新规定，为防止刷票，投票账号必须至少绑定校园网或QQ账号其中之一才可进行投票")])], -1)), viewState.value === "building" && isByBuilding.value ? (openBlock(), createElementBlock("section", ot, [createElementVNode("div", nt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(buildings.value, val22 => (openBlock(), createElementBlock("button", {
        key: val22.id,
        class: "building-item",
        onClick: val23 => zz6(val22.code)
      }, [val21[3] || (val21[3] = createElementVNode("div", {
        class: "building-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M3 21h18M5 21V7l8-4v18M13 21V3l6 3v15M9 9v.01M9 12v.01M9 15v.01M9 18v.01M17 9v.01M17 12v.01M17 15v.01M17 18v.01"
      })])], -1)), createElementVNode("span", rt, toDisplayString(val22.name), 1), val21[4] || (val21[4] = createElementVNode("svg", {
        class: "building-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "9 18 15 12 9 6"
      })], -1))], 8, at))), 128))])])) : createCommentVNode("", !0), viewState.value === "voting" ? (openBlock(), createElementBlock("section", lt, [isByBuilding.value ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "back-link",
        onClick: zz7
      }, [...(val21[5] || (val21[5] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "15 18 9 12 15 6"
      })], -1), createTextVNode(" 更换宿舍楼 ", -1)]))])) : createCommentVNode("", !0), requireUserInfo.value ? (openBlock(), createElementBlock("div", ut, [val21[6] || (val21[6] = createElementVNode("h3", {
        class: "form-title"
      }, "填写信息", -1)), createElementVNode("div", ct, [(openBlock(!0), createElementBlock(Fragment, null, renderList(userInfoFields.value, val22 => (openBlock(), createElementBlock("div", {
        key: val22,
        class: "form-field"
      }, [createElementVNode("label", {
        for: `user-${val22}`,
        class: "field-label"
      }, toDisplayString(fieldLabels[val22] || val22), 9, dt), withDirectives(createElementVNode("input", {
        id: `user-${val22}`,
        "onUpdate:modelValue": val23 => userInfoForm[val22] = val23,
        type: "text",
        class: "field-input",
        placeholder: `请输入${fieldLabels[val22] || val22}`
      }, null, 8, vt), [[vModelText, userInfoForm[val22]]])]))), 128))])])) : createCommentVNode("", !0), createElementVNode("div", mt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(timePeriods.value, val22 => (openBlock(), createElementBlock("div", {
        key: val22.timePeriod.id,
        class: normalizeClass(["period-group", {
          collapsed: !expandedState[val22.timePeriod.id]
        }])
      }, [createElementVNode("button", {
        class: "period-header",
        onClick: val23 => zz8(val22.timePeriod.id)
      }, [createElementVNode("div", ft, [createElementVNode("span", pt, toDisplayString(val22.timePeriod.name), 1), createElementVNode("span", _t, toDisplayString(val22.options.length) + "首可选", 1)]), createElementVNode("div", ht, [createElementVNode("span", {
        class: normalizeClass(["period-status", {
          completed: zz17(val22.timePeriod.id),
          partial: zz15(val22.timePeriod.id) > 0 && !zz17(val22.timePeriod.id)
        }])
      }, toDisplayString(zz15(val22.timePeriod.id)) + "/" + toDisplayString(voteLimit.value.maxCount), 3), val21[7] || (val21[7] = createElementVNode("svg", {
        class: "period-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1))])], 8, gt), createVNode(withSlots, {
        name: "period-slide"
      }, {
        default: toDisplayValue(() => [withDirectives(createElementVNode("div", yt, [createElementVNode("div", Ct, [val21[9] || (val21[9] = createElementVNode("svg", {
          class: "search-icon",
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
          "onUpdate:modelValue": val23 => periodKeys[val22.timePeriod.id] = val23,
          type: "text",
          class: "search-input",
          placeholder: "搜索歌曲、歌手..."
        }, null, 8, kt), [[vModelText, periodKeys[val22.timePeriod.id]]]), periodKeys[val22.timePeriod.id] ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "search-clear",
          onClick: val23 => periodKeys[val22.timePeriod.id] = ""
        }, [...(val21[8] || (val21[8] = [createElementVNode("svg", {
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
        })], -1)]))], 8, wt)) : createCommentVNode("", !0)]), zz14(val22) === 0 ? (openBlock(), createElementBlock("div", bt, [periodKeys[val22.timePeriod.id] ? (openBlock(), createElementBlock("span", xt, "没有找到匹配的歌曲")) : (openBlock(), createElementBlock("span", Mt, "暂无投票选项"))])) : (openBlock(), createElementBlock("div", Pt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz11(val22), val23 => (openBlock(), createElementBlock("div", {
          key: val23.id,
          class: normalizeClass(["music-card", {
            selected: zz19(val22.timePeriod.id, val23.id)
          }]),
          onClick: val24 => zz18(val22.timePeriod.id, val23.id)
        }, [createElementVNode("div", Vt, [createElementVNode("img", {
          src: val23.music.cover,
          alt: val23.music.song,
          class: "card-cover",
          loading: "lazy"
        }, null, 8, $t), val21[11] || (val21[11] = createElementVNode("div", {
          class: "card-check"
        }, [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "3"
        }, [createElementVNode("polyline", {
          points: "20 6 9 17 4 12"
        })])], -1)), val23.voteCount ? (openBlock(), createElementBlock("div", Bt, [val21[10] || (val21[10] = createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "currentColor"
        }, [createElementVNode("path", {
          d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
        })], -1)), createElementVNode("span", null, toDisplayString(val23.voteCount), 1)])) : createCommentVNode("", !0)]), createElementVNode("div", Lt, [createElementVNode("h4", Ot, toDisplayString(val23.music.song), 1), createElementVNode("p", Tt, toDisplayString(val23.music.singer), 1)])], 10, St))), 128))])), zz12(val22) ? (openBlock(), createElementBlock("button", {
          key: 2,
          class: "load-more-btn",
          onClick: withModifiers(val23 => zz9(val22.timePeriod.id), ["stop"])
        }, " 加载更多 (" + toDisplayString(zz13(val22)) + "首) ", 9, Nt)) : createCommentVNode("", !0)], 512), [[modalShowDef, expandedState[val22.timePeriod.id]]])]),
        _: 2
      }, 1024)], 2))), 128))]), createElementVNode("div", Et, [createElementVNode("div", Ut, [createElementVNode("span", zt, toDisplayString(voteLimit.value.limitScope === "activity" ? `已选 ${val17.value} 首` : `${val18.value}/${val19.value} 时段`), 1)]), createElementVNode("button", {
        class: normalizeClass(["submit-btn", {
          ready: val20.value
        }]),
        disabled: !val20.value || submitting.value,
        onClick: zz20
      }, toDisplayString(submitting.value ? "提交中..." : "确认投票"), 11, Ft)])])) : createCommentVNode("", !0), viewState.value === "result" ? (openBlock(), createElementBlock("section", Rt, [createElementVNode("div", Ht, [val21[12] || (val21[12] = createVNodeWrapper('<div class="result-icon" data-v-dcca17ea><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-dcca17ea><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-v-dcca17ea></path><polyline points="22 4 12 14.01 9 11.01" data-v-dcca17ea></polyline></svg></div><h2 class="result-title" data-v-dcca17ea>投票成功</h2>', 2)), myVotes.value ? (openBlock(), createElementBlock("p", It, "投票时间：" + toDisplayString(zz21(myVotes.value.votedAt)), 1)) : createCommentVNode("", !0), isByBuilding.value && myVotes.value?.buildingChoice ? (openBlock(), createElementBlock("p", qt, " 投票宿舍楼：" + toDisplayString(zz22(myVotes.value.buildingChoice)), 1)) : createCommentVNode("", !0)]), createElementVNode("div", At, [val21[14] || (val21[14] = createElementVNode("h3", {
        class: "votes-title"
      }, "您的投票记录", -1)), createElementVNode("div", Qt, [(openBlock(!0), createElementBlock(Fragment, null, renderList(myVotes.value?.votes, val22 => (openBlock(), createElementBlock("div", {
        key: val22.timePeriod.id,
        class: "vote-item"
      }, [createElementVNode("div", jt, toDisplayString(val22.timePeriod.name), 1), createElementVNode("div", Kt, [zz23(val22.timePeriod.id) ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: zz23(val22.timePeriod.id)?.music.cover,
        alt: val22.music.song,
        class: "vote-cover"
      }, null, 8, Wt)) : (openBlock(), createElementBlock("div", Gt, [...(val21[13] || (val21[13] = [createElementVNode("svg", {
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
      })], -1)]))])), createElementVNode("div", Jt, [createElementVNode("h4", Xt, toDisplayString(val22.music.song), 1), createElementVNode("p", Yt, toDisplayString(val22.music.singer), 1)])])]))), 128))])])])) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0)])]), createVNode(PageFooter)]));
    }
  }),
  rs = withScopeId(Dt, [["__scopeId", "data-v-dcca17ea"]]);
/* index 运行时导出（已语义化） */
export { rs as default };