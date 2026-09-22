/*!
 * 页面模块：活动管理（CampaignManagePage）
 * 路由：/admin/campaigns   name=admin-campaigns   层级=2   需登录=是
 * 功能：登录后的「活动管理」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampaignManagePage-CIstESeP.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, ref, watch, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createTextVNode, Fragment, createVNodeWrapper, renderList, toDisplayValue, withSlots, toDisplayString, createCommentVNode, normalizeClass, withModifiers, withDirectives, vModelText, deepDirectiveOptions, deepWatchOptions, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getCampaigns as Be, getCampaignsById as Oe, createAdminCampaigns as Le, updateAdminCampaigns as qe, activateAdminCampaigns as Fe, closeAdminCampaigns as ze, stageOperationAdminCampaigns as He } from "./campaign-BV1jJ5bx.js";
/* 导入：本地模块 dorm（站点内功能模块） */
import { getCampuses as Ee, getResourceTimePeriods as Ae, getCampusesBuildingsById } from "./dorm-BlpLVPfV.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const Ge = {
    class: "page-container"
  },
  Je = {
    class: "page-content"
  },
  Ke = {
    class: "content-container"
  },
  Qe = {
    class: "breadcrumb-wrapper"
  },
  We = {
    key: 0,
    class: "loading-container"
  },
  Xe = {
    key: 0,
    class: "empty-container"
  },
  es = {
    key: 1,
    class: "campaigns-list"
  },
  ss = {
    class: "campaign-info"
  },
  ts = {
    class: "campaign-header"
  },
  os = {
    class: "campaign-name"
  },
  is = {
    class: "badges"
  },
  as = {
    class: "campaign-desc"
  },
  ls = {
    class: "campaign-meta"
  },
  ns = {
    class: "meta-item"
  },
  ds = {
    class: "meta-item"
  },
  us = {
    class: "campaign-actions"
  },
  rs = {
    class: "stage-operations"
  },
  cs = ["disabled", "onClick"],
  ms = {
    class: "manage-actions"
  },
  ps = ["disabled", "onClick"],
  vs = ["disabled", "onClick"],
  fs = ["disabled", "onClick"],
  gs = {
    class: "modal-title"
  },
  _s = {
    key: 0,
    class: "modal-loading"
  },
  bs = {
    class: "form-section"
  },
  ys = {
    class: "form-group"
  },
  hs = {
    class: "form-group"
  },
  ks = {
    class: "form-group"
  },
  Ts = ["value"],
  xs = {
    class: "form-section"
  },
  Cs = {
    class: "form-group"
  },
  Ss = {
    class: "selection-list"
  },
  ws = ["value"],
  Rs = {
    class: "selection-name"
  },
  Is = {
    class: "selection-code"
  },
  Vs = {
    key: 0,
    class: "selection-empty"
  },
  Us = {
    class: "form-group"
  },
  $s = {
    key: 0,
    class: "selection-loading"
  },
  Ms = {
    key: 1,
    class: "selection-list"
  },
  Ps = ["value"],
  Ns = {
    class: "selection-name"
  },
  Ds = {
    class: "selection-code"
  },
  Bs = {
    key: 0,
    class: "selection-empty"
  },
  Os = {
    key: 1,
    class: "selection-empty"
  },
  Ls = {
    key: 2,
    class: "selection-actions"
  },
  qs = {
    class: "form-section"
  },
  Fs = {
    class: "form-group"
  },
  zs = {
    class: "form-label checkbox-label disabled-checkbox"
  },
  Hs = {
    class: "stage-header"
  },
  Es = {
    class: "stage-label"
  },
  As = {
    class: "stage-number"
  },
  Ys = {
    class: "stage-type"
  },
  js = {
    class: "stage-times"
  },
  Zs = {
    class: "form-group"
  },
  Gs = ["onUpdate:modelValue"],
  Js = {
    class: "form-group"
  },
  Ks = ["onUpdate:modelValue"],
  Qs = {
    key: 0,
    class: "stage-extra-config"
  },
  Ws = {
    class: "config-row"
  },
  Xs = {
    class: "form-label checkbox-label"
  },
  et = ["onUpdate:modelValue"],
  st = {
    class: "config-details-inner"
  },
  tt = {
    class: "form-row"
  },
  ot = {
    class: "form-group half"
  },
  it = ["onUpdate:modelValue"],
  at = {
    class: "form-row"
  },
  lt = {
    class: "form-group half"
  },
  nt = ["onUpdate:modelValue"],
  dt = {
    class: "form-group half"
  },
  ut = ["onUpdate:modelValue"],
  rt = {
    class: "config-row"
  },
  ct = {
    class: "form-label checkbox-label"
  },
  mt = ["onUpdate:modelValue"],
  pt = {
    class: "config-details-inner"
  },
  vt = {
    class: "checkbox-group"
  },
  ft = ["value", "onUpdate:modelValue"],
  gt = {
    key: 1,
    class: "stage-extra-config"
  },
  _t = {
    class: "form-row"
  },
  bt = {
    class: "form-group half"
  },
  yt = ["onUpdate:modelValue"],
  ht = {
    class: "config-row"
  },
  kt = {
    class: "form-label checkbox-label"
  },
  Tt = ["onUpdate:modelValue"],
  xt = {
    class: "config-details-inner"
  },
  Ct = {
    class: "form-row"
  },
  St = {
    class: "form-group half"
  },
  wt = ["onUpdate:modelValue"],
  Rt = {
    class: "form-row"
  },
  It = {
    class: "form-group half"
  },
  Vt = ["onUpdate:modelValue"],
  Ut = {
    class: "form-group half"
  },
  $t = ["onUpdate:modelValue"],
  Mt = {
    class: "modal-actions"
  },
  Pt = ["disabled"],
  Nt = ["disabled"],
  Dt = {
    class: "modal-title"
  },
  Bt = {
    class: "modal-desc"
  },
  Ot = {
    class: "modal-actions"
  },
  Lt = ["disabled"],
  qt = ["disabled"],
  Ft = defineComponent({
    __name: "CampaignManagePage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        refVal = ref(!0),
        refVal2 = ref([]),
        refVal3 = ref([]),
        refVal4 = ref([]),
        refVal5 = ref([]),
        refVal6 = ref(!1),
        refVal7 = ref(!1),
        refVal8 = ref("create"),
        refVal9 = ref(null),
        refVal10 = ref(!1),
        refVal11 = ref(!1),
        list = [{
          value: "dormitory",
          label: "宿舍楼"
        }, {
          value: "bed",
          label: "床位号"
        }, {
          value: "student_id",
          label: "学号"
        }];
      function zz0() {
        return {
          has_limit: !0,
          limit_scope: "period",
          min_count: 1,
          max_count: 3
        };
      }
      const refVal12 = ref({
        title: "",
        description: "",
        campusId: null,
        timePeriodIds: [],
        buildingIds: [],
        globalConfig: {
          auto_stage_transition: !0
        },
        stages: [{
          stageType: "submission",
          stageName: "投稿阶段",
          startTime: "",
          endTime: "",
          description: "用户提交铃声歌曲",
          submissionRules: zz0(),
          require_user_info: !1,
          user_info_fields: []
        }, {
          stageType: "review",
          stageName: "审核阶段",
          startTime: "",
          endTime: "",
          description: "管理员审核投稿"
        }, {
          stageType: "voting",
          stageName: "投票阶段",
          startTime: "",
          endTime: "",
          description: "用户投票选择铃声",
          votingRules: {
            has_limit: !0,
            limit_scope: "period",
            min_count: 1,
            max_count: 1
          },
          voting_mode: "unified"
        }, {
          stageType: "result",
          stageName: "结果公示",
          startTime: "",
          endTime: "",
          description: "公示投票结果"
        }]
      });
      watch(() => refVal12.value.campusId, async val1 => {
        if (val1) {
          refVal6.value = !0;
          try {
            const val2 = await getCampusesBuildingsById(val1);
            val2.data.code === 200 && (refVal5.value = val2.data.data, refVal8.value === "create" && (refVal12.value.buildingIds = []));
          } catch (val2) {
            console.error("获取宿舍楼列表失败", val2);
          } finally {
            refVal6.value = !1;
          }
        } else refVal5.value = [], refVal12.value.buildingIds = [];
      });
      const refVal13 = ref(!1),
        refVal14 = ref(null),
        refVal15 = ref(!1),
        obj = {
          pending: "待开始",
          active: "进行中",
          completed: "已完成",
          draft: "草稿",
          cancelled: "已取消",
          closed: "已关闭",
          archived: "已归档"
        },
        obj2 = {
          pending: "status-pending",
          active: "status-active",
          completed: "status-completed",
          draft: "status-draft",
          cancelled: "status-cancelled",
          closed: "status-closed",
          archived: "status-archived"
        },
        obj3 = {
          pending: "stage-pending",
          active: "stage-active",
          completed: "stage-completed"
        };
      function zz1(val1) {
        return obj[val1] || val1;
      }
      function zz2(val1) {
        return obj2[val1] || "";
      }
      function zz3(val1) {
        return val1.currentStage ? {
          label: val1.currentStage.stageName,
          class: obj3[val1.currentStage.status] || "stage-pending"
        } : {
          label: "未开始",
          class: "stage-pending"
        };
      }
      function zz4(val1) {
        return new Date(val1).toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }
      function zz5(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          timezoneOffset = date.getTimezoneOffset(),
          val3 = Math.abs(Math.floor(timezoneOffset / 60)),
          val4 = Math.abs(timezoneOffset % 60),
          text = `${timezoneOffset <= 0 ? "+" : "-"}${String(val3).padStart(2, "0")}:${String(val4).padStart(2, "0")}`,
          fullYear = date.getFullYear(),
          val6 = String(date.getMonth() + 1).padStart(2, "0"),
          val7 = String(date.getDate()).padStart(2, "0"),
          val8 = String(date.getHours()).padStart(2, "0"),
          we = String(date.getMinutes()).padStart(2, "0"),
          val9 = String(date.getSeconds()).padStart(2, "0");
        return `${fullYear}-${val6}-${val7}T${val8}:${we}:${val9}${text}`;
      }
      function zz6(val1) {
        if (!val1) return "";
        const date = new Date(val1),
          fullYear = date.getFullYear(),
          val3 = String(date.getMonth() + 1).padStart(2, "0"),
          val4 = String(date.getDate()).padStart(2, "0"),
          val5 = String(date.getHours()).padStart(2, "0"),
          val6 = String(date.getMinutes()).padStart(2, "0");
        return `${fullYear}-${val3}-${val4}T${val5}:${val6}`;
      }
      async function zz7() {
        try {
          const val1 = await Ee();
          val1.data.code === 200 && (refVal3.value = val1.data.data);
        } catch (val1) {
          console.error("获取校区列表失败", val1);
        }
      }
      async function zz8() {
        try {
          const val1 = await Ae();
          val1.data.code === 200 && (refVal4.value = val1.data.data);
        } catch (val1) {
          console.error("获取时段列表失败", val1);
        }
      }
      async function zz9() {
        refVal.value = !0;
        try {
          const val1 = await Be();
          val1.data.code === 200 ? refVal2.value = val1.data.data : useToast1.error(val1.data.message || "获取活动列表失败");
        } catch {
          useToast1.error("获取活动列表失败");
        } finally {
          refVal.value = !1;
        }
      }
      function zz10() {
        refVal8.value = "create", refVal9.value = null, zz14(), refVal7.value = !0;
      }
      function zz11(val1) {
        const val2 = val1.config;
        if (val1.stageType === "submission") {
          const val3 = val2?.rules;
          return {
            submissionRules: val3 ? {
              has_limit: val3.has_limit,
              limit_scope: val3.limit_scope || "period",
              min_count: val3.min_count ?? null,
              max_count: val3.max_count ?? null
            } : zz0(),
            require_user_info: val2?.require_user_info || !1,
            user_info_fields: val2?.user_info_fields || []
          };
        }
        if (val1.stageType === "voting") {
          const val3 = val2?.rules;
          return {
            votingRules: val3 ? {
              has_limit: val3.has_limit,
              limit_scope: val3.limit_scope || "period",
              min_count: val3.min_count ?? null,
              max_count: val3.max_count ?? null
            } : {
              has_limit: !0,
              limit_scope: "period",
              min_count: 1,
              max_count: 1
            },
            voting_mode: val2?.voting_mode || "unified"
          };
        }
        return {};
      }
      async function zz12(val1) {
        refVal8.value = "edit", refVal9.value = val1, refVal11.value = !0, refVal7.value = !0;
        try {
          const val2 = await Oe(val1.id);
          if (val2.data.code !== 200) {
            useToast1.error(val2.data.message || "获取活动详情失败"), refVal7.value = !1;
            return;
          }
          const val3 = val2.data.data;
          if (val3.campus?.id) try {
            const val4 = await getCampusesBuildingsById(val3.campus.id);
            val4.data.code === 200 && (refVal5.value = val4.data.data);
          } catch (val4) {
            console.error("获取宿舍楼列表失败", val4);
          }
          refVal12.value = {
            title: val3.title,
            description: val3.description,
            campusId: val3.campus?.id || null,
            timePeriodIds: val3.timePeriods?.map(val4 => val4.id) || [],
            buildingIds: val3.buildings?.map(val4 => val4.id) || [],
            globalConfig: {
              auto_stage_transition: val3.globalConfig?.auto_stage_transition ?? !0
            },
            stages: val3.stages?.map(val4 => ({
              stageType: val4.stageType,
              stageName: val4.stageName,
              startTime: zz6(val4.startTime),
              endTime: val4.endTime ? zz6(val4.endTime) : "",
              description: val4.description || "",
              ...zz11(val4)
            })) || zz13()
          };
        } catch {
          useToast1.error("获取活动详情失败"), refVal7.value = !1;
        } finally {
          refVal11.value = !1;
        }
      }
      function zz13() {
        return [{
          stageType: "submission",
          stageName: "投稿阶段",
          startTime: "",
          endTime: "",
          description: "用户提交铃声歌曲",
          submissionRules: zz0(),
          require_user_info: !1,
          user_info_fields: []
        }, {
          stageType: "review",
          stageName: "审核阶段",
          startTime: "",
          endTime: "",
          description: "管理员审核投稿"
        }, {
          stageType: "voting",
          stageName: "投票阶段",
          startTime: "",
          endTime: "",
          description: "用户投票选择铃声",
          votingRules: {
            has_limit: !0,
            limit_scope: "period",
            min_count: 1,
            max_count: 1
          },
          voting_mode: "unified"
        }, {
          stageType: "result",
          stageName: "结果公示",
          startTime: "",
          endTime: "",
          description: "公示投票结果"
        }];
      }
      function zz14() {
        refVal12.value = {
          title: "",
          description: "",
          campusId: null,
          timePeriodIds: [],
          buildingIds: [],
          globalConfig: {
            auto_stage_transition: !1
          },
          stages: zz13()
        }, refVal5.value = [];
      }
      function zz15() {
        refVal7.value = !1, refVal9.value = null;
      }
      function zz16(val1) {
        if (val1.stageType === "submission") {
          const obj1 = {};
          if (val1.submissionRules) {
            const obj4 = {
              has_limit: val1.submissionRules.has_limit
            };
            val1.submissionRules.has_limit && (obj4.limit_scope = val1.submissionRules.limit_scope, val1.submissionRules.min_count !== null && (obj4.min_count = val1.submissionRules.min_count), val1.submissionRules.max_count !== null && (obj4.max_count = val1.submissionRules.max_count)), obj1.rules = obj4;
          }
          return val1.require_user_info && (obj1.require_user_info = !0, obj1.user_info_fields = val1.user_info_fields || []), obj1;
        }
        if (val1.stageType === "voting") {
          const obj1 = {};
          if (val1.votingRules) {
            const obj4 = {
              has_limit: val1.votingRules.has_limit
            };
            val1.votingRules.has_limit && (obj4.limit_scope = val1.votingRules.limit_scope, val1.votingRules.min_count !== null && (obj4.min_count = val1.votingRules.min_count), val1.votingRules.max_count !== null && (obj4.max_count = val1.votingRules.max_count)), obj1.rules = obj4;
          }
          return val1.voting_mode && (obj1.voting_mode = val1.voting_mode), obj1;
        }
        return {};
      }
      async function zz17() {
        if (!refVal12.value.title.trim()) {
          useToast1.error("请填写活动标题");
          return;
        }
        if (!refVal12.value.description.trim()) {
          useToast1.error("请填写活动描述");
          return;
        }
        if (!refVal12.value.campusId) {
          useToast1.error("请选择校区");
          return;
        }
        if (refVal12.value.timePeriodIds.length === 0) {
          useToast1.error("请选择至少一个铃声时段");
          return;
        }
        if (refVal12.value.buildingIds.length === 0) {
          useToast1.error("请选择至少一栋宿舍楼");
          return;
        }
        for (const zz18 of refVal12.value.stages) {
          if (!zz18.startTime || !zz18.endTime) {
            useToast1.error(`请填写${zz18.stageName}的时间`);
            return;
          }
          if (new Date(zz18.startTime) >= new Date(zz18.endTime)) {
            useToast1.error(`${zz18.stageName}的开始时间必须早于结束时间`);
            return;
          }
        }
        refVal10.value = !0;
        try {
          const val1 = refVal12.value.stages.map(val2 => ({
            stageType: val2.stageType,
            stageName: val2.stageName,
            startTime: zz5(val2.startTime),
            endTime: zz5(val2.endTime),
            description: val2.description,
            config: zz16(val2)
          }));
          if (refVal8.value === "create") {
            const obj1 = {
                title: refVal12.value.title,
                description: refVal12.value.description,
                campusId: refVal12.value.campusId,
                timePeriodIds: refVal12.value.timePeriodIds,
                buildingIds: refVal12.value.buildingIds,
                globalConfig: refVal12.value.globalConfig,
                stages: val1
              },
              val2 = await Le(obj1);
            val2.data.code === 200 ? (useToast1.success("活动创建成功"), zz15(), await zz9()) : useToast1.error(val2.data.message || "创建失败");
          } else if (refVal9.value) {
            const obj1 = {
                title: refVal12.value.title,
                description: refVal12.value.description,
                campusId: refVal12.value.campusId,
                timePeriodIds: refVal12.value.timePeriodIds,
                buildingIds: refVal12.value.buildingIds,
                globalConfig: refVal12.value.globalConfig,
                stages: val1
              },
              val2 = await qe(refVal9.value.id, obj1);
            val2.data.code === 200 ? (useToast1.success("活动更新成功"), zz15(), await zz9()) : useToast1.error(val2.data.message || "更新失败");
          }
        } catch {
          useToast1.error(refVal8.value === "create" ? "创建失败" : "更新失败");
        } finally {
          refVal10.value = !1;
        }
      }
      function zz19(val1, val2) {
        const val3 = {
          activate: {
            title: "开始活动",
            message: `确定要开始活动"${val1.title}"吗？活动将进入投稿阶段。`
          },
          close: {
            title: "关闭活动",
            message: `确定要关闭活动"${val1.title}"吗？关闭后活动将无法继续。`
          },
          next: {
            title: "进入下一阶段",
            message: `确定要将活动"${val1.title}"推进到下一阶段吗？`
          },
          previous: {
            title: "返回上一阶段",
            message: `确定要将活动"${val1.title}"返回到上一阶段吗？`
          }
        }[val2];
        refVal14.value = {
          campaign: val1,
          type: val2,
          title: val3.title,
          message: val3.message
        }, refVal13.value = !0;
      }
      async function zz20() {
        if (!refVal14.value) return;
        refVal15.value = !0;
        const {
          campaign: val1,
          type: val2
        } = refVal14.value;
        try {
          let val3;
          if (val2 === "activate" ? val3 = await Fe(val1.id) : val2 === "close" ? val3 = await ze(val1.id) : val3 = await He(val1.id, {
            operation: val2
          }), val3.data.code === 200) {
            const obj1 = {
              activate: "活动已开始",
              close: "活动已关闭",
              next: "已进入下一阶段",
              previous: "已返回上一阶段"
            };
            useToast1.success(obj1[val2]), refVal13.value = !1, refVal14.value = null, await zz9();
          } else useToast1.error(val3.data.message || "操作失败");
        } catch {
          useToast1.error("操作失败");
        } finally {
          refVal15.value = !1;
        }
      }
      function zz21() {
        refVal13.value = !1, refVal14.value = null;
      }
      function zz22(val1) {
        const list1 = [];
        if (val1.status === "closed" || val1.status === "completed" || val1.status === "cancelled" || val1.status === "archived") return list1;
        if (val1.status === "pending" || val1.status === "draft") return list1.push({
          label: "开始活动",
          operationType: "activate",
          btnType: "primary"
        }), list1;
        if (val1.status === "active" && val1.currentStage) {
          const val2 = val1.currentStage.stageType;
          val2 !== "submission" && list1.push({
            label: "上一阶段",
            operationType: "previous",
            btnType: "secondary"
          }), val2 !== "result" && list1.push({
            label: "下一阶段",
            operationType: "next",
            btnType: "info"
          }), list1.push({
            label: "关闭活动",
            operationType: "close",
            btnType: "danger"
          });
        }
        return list1;
      }
      function zz23(val1) {
        return val1.status === "pending" || val1.status === "draft";
      }
      function zz24(val1) {
        const val2 = val1.currentStage?.stageType;
        return val2 === "submission" || val2 === "review";
      }
      function zz25(val1) {
        return val1.currentStage?.stageType === "submission" ? "查看投稿结果" : "审核";
      }
      function zz26(val1) {
        const val2 = val1.currentStage?.stageType;
        return val2 === "voting" || val2 === "result";
      }
      function zz27(val1) {
        useRouter1.push(`/admin/campaigns/${val1.id}/review`);
      }
      function zz28(val1) {
        useRouter1.push(`/admin/campaigns/${val1.id}/results`);
      }
      return onMounted(async () => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        await Promise.all([zz9(), zz7(), zz8()]);
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", Ge, [createVNode(PageHeader, {
        "back-to": "/"
      }), createElementVNode("main", Je, [createElementVNode("div", Ke, [createElementVNode("div", Qe, [createVNode(PageBreadcrumb)]), createElementVNode("div", {
        class: "page-header-section"
      }, [createElementVNode("div", {
        class: "header-main"
      }, [val2[11] || (val2[11] = createElementVNode("div", {
        class: "header-text"
      }, [createElementVNode("h1", {
        class: "page-title"
      }, "活动管理"), createElementVNode("p", {
        class: "page-subtitle"
      }, "管理铃声征集投票活动")], -1)), createElementVNode("button", {
        class: "action-button primary desktop-only",
        onClick: zz10
      }, [...(val2[10] || (val2[10] = [createElementVNode("svg", {
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
      })], -1), createTextVNode(" 创建活动 ", -1)]))])])]), refVal.value ? (openBlock(), createElementBlock("div", We, [...(val2[12] || (val2[12] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [refVal2.value.length === 0 ? (openBlock(), createElementBlock("div", Xe, [val2[13] || (val2[13] = createVNodeWrapper('<div class="empty-icon" data-v-cf66f48d><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-cf66f48d><path d="M9 18V5l12-2v13" data-v-cf66f48d></path><circle cx="6" cy="18" r="3" data-v-cf66f48d></circle><circle cx="18" cy="16" r="3" data-v-cf66f48d></circle></svg></div><h2 data-v-cf66f48d>暂无活动</h2><p data-v-cf66f48d>还没有创建任何活动</p>', 3)), createElementVNode("button", {
        class: "empty-action-btn",
        onClick: zz10
      }, "创建第一个活动")])) : (openBlock(), createElementBlock("div", es, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal2.value, val3 => (openBlock(), createElementBlock("div", {
        key: val3.id,
        class: "campaign-card"
      }, [createElementVNode("div", ss, [createElementVNode("div", ts, [createElementVNode("h3", os, toDisplayString(val3.title), 1), createElementVNode("div", is, [val3.currentStage ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["stage-badge", zz3(val3).class])
      }, toDisplayString(zz3(val3).label), 3)) : createCommentVNode("", !0), createElementVNode("span", {
        class: normalizeClass(["status-badge", zz2(val3.status)])
      }, toDisplayString(zz1(val3.status)), 3)])]), createElementVNode("p", as, toDisplayString(val3.description), 1), createElementVNode("div", ls, [createElementVNode("span", ns, " 校区: " + toDisplayString(val3.campus?.name || "未设置"), 1), val2[14] || (val2[14] = createElementVNode("span", {
        class: "meta-divider"
      }, "|", -1)), createElementVNode("span", ds, toDisplayString(zz4(val3.createdAt)), 1)])]), createElementVNode("div", us, [createElementVNode("div", rs, [(openBlock(!0), createElementBlock(Fragment, null, renderList(zz22(val3), val4 => (openBlock(), createElementBlock("button", {
        key: val4.operationType,
        class: normalizeClass(["action-btn", val4.btnType]),
        disabled: refVal15.value,
        onClick: val5 => zz19(val3, val4.operationType)
      }, toDisplayString(val4.label), 11, cs))), 128))]), createElementVNode("div", ms, [zz24(val3) ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "action-btn review",
        disabled: refVal15.value,
        onClick: val4 => zz27(val3)
      }, toDisplayString(zz25(val3)), 9, ps)) : createCommentVNode("", !0), zz26(val3) ? (openBlock(), createElementBlock("button", {
        key: 1,
        class: "action-btn results",
        disabled: refVal15.value,
        onClick: val4 => zz28(val3)
      }, " 结果 ", 8, vs)) : createCommentVNode("", !0), zz23(val3) ? (openBlock(), createElementBlock("button", {
        key: 2,
        class: "action-btn edit",
        disabled: refVal15.value,
        onClick: val4 => zz12(val3)
      }, " 编辑 ", 8, fs)) : createCommentVNode("", !0)])])]))), 128))]))], 64))])]), createVNode(PageFooter), createElementVNode("button", {
        class: "floating-create-btn mobile-only",
        onClick: zz10
      }, [...(val2[15] || (val2[15] = [createElementVNode("svg", {
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
      })], -1), createElementVNode("span", null, "创建活动", -1)]))]), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal7.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz15, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal7.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content modal-lg",
            onClick: val2[8] || (val2[8] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", gs, toDisplayString(refVal8.value === "create" ? "创建活动" : "编辑活动"), 1), refVal11.value ? (openBlock(), createElementBlock("div", _s, [...(val2[16] || (val2[16] = [createElementVNode("div", {
            class: "loading-spinner"
          }, null, -1), createElementVNode("p", null, "加载活动详情...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", bs, [val2[21] || (val2[21] = createElementVNode("h4", {
            class: "form-section-title"
          }, "基本信息", -1)), createElementVNode("div", ys, [val2[17] || (val2[17] = createElementVNode("label", {
            class: "form-label"
          }, "活动标题 *", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[0] || (val2[0] = val3 => refVal12.value.title = val3),
            type: "text",
            class: "form-input",
            placeholder: "例如：2024秋季宿舍铃声征集",
            maxlength: "100"
          }, null, 512), [[vModelText, refVal12.value.title]])]), createElementVNode("div", hs, [val2[18] || (val2[18] = createElementVNode("label", {
            class: "form-label"
          }, "活动描述 *", -1)), withDirectives(createElementVNode("textarea", {
            "onUpdate:modelValue": val2[1] || (val2[1] = val3 => refVal12.value.description = val3),
            class: "form-textarea",
            placeholder: "描述活动内容和规则",
            maxlength: "500",
            rows: "3"
          }, null, 512), [[vModelText, refVal12.value.description]])]), createElementVNode("div", ks, [val2[20] || (val2[20] = createElementVNode("label", {
            class: "form-label"
          }, "所属校区 *", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val2[2] || (val2[2] = val3 => refVal12.value.campusId = val3),
            class: "form-select"
          }, [val2[19] || (val2[19] = createElementVNode("option", {
            value: null,
            disabled: ""
          }, "请选择校区", -1)), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal3.value, val3 => (openBlock(), createElementBlock("option", {
            key: val3.id,
            value: val3.id
          }, toDisplayString(val3.name), 9, Ts))), 128))], 512), [[deepDirectiveOptions, refVal12.value.campusId]])])]), createElementVNode("div", xs, [val2[27] || (val2[27] = createElementVNode("h4", {
            class: "form-section-title"
          }, "活动范围", -1)), createElementVNode("div", Cs, [val2[22] || (val2[22] = createElementVNode("label", {
            class: "form-label"
          }, "铃声时段 *", -1)), val2[23] || (val2[23] = createElementVNode("p", {
            class: "form-hint"
          }, "选择本次活动包含的铃声时段", -1)), createElementVNode("div", Ss, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val3 => (openBlock(), createElementBlock("label", {
            key: val3.id,
            class: normalizeClass(["selection-item", {
              selected: refVal12.value.timePeriodIds.includes(val3.id)
            }])
          }, [withDirectives(createElementVNode("input", {
            type: "checkbox",
            value: val3.id,
            "onUpdate:modelValue": val2[3] || (val2[3] = val4 => refVal12.value.timePeriodIds = val4),
            class: "selection-checkbox"
          }, null, 8, ws), [[deepWatchOptions, refVal12.value.timePeriodIds]]), createElementVNode("span", Rs, toDisplayString(val3.name), 1), createElementVNode("span", Is, toDisplayString(val3.code), 1)], 2))), 128)), refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Vs, " 暂无铃声时段，请先在宿舍管理中创建 ")) : createCommentVNode("", !0)])]), createElementVNode("div", Us, [val2[25] || (val2[25] = createElementVNode("label", {
            class: "form-label"
          }, "宿舍楼 *", -1)), val2[26] || (val2[26] = createElementVNode("p", {
            class: "form-hint"
          }, "选择本次活动覆盖的宿舍楼（请先选择校区）", -1)), refVal6.value ? (openBlock(), createElementBlock("div", $s, [...(val2[24] || (val2[24] = [createElementVNode("div", {
            class: "loading-spinner-sm"
          }, null, -1), createElementVNode("span", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock("div", Ms, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal5.value, val3 => (openBlock(), createElementBlock("label", {
            key: val3.id,
            class: normalizeClass(["selection-item", {
              selected: refVal12.value.buildingIds.includes(val3.id)
            }])
          }, [withDirectives(createElementVNode("input", {
            type: "checkbox",
            value: val3.id,
            "onUpdate:modelValue": val2[4] || (val2[4] = val4 => refVal12.value.buildingIds = val4),
            class: "selection-checkbox"
          }, null, 8, Ps), [[deepWatchOptions, refVal12.value.buildingIds]]), createElementVNode("span", Ns, toDisplayString(val3.name), 1), createElementVNode("span", Ds, toDisplayString(val3.code), 1)], 2))), 128)), refVal12.value.campusId ? refVal5.value.length === 0 ? (openBlock(), createElementBlock("div", Os, " 该校区暂无宿舍楼 ")) : createCommentVNode("", !0) : (openBlock(), createElementBlock("div", Bs, " 请先选择校区 "))])), refVal5.value.length > 0 ? (openBlock(), createElementBlock("div", Ls, [createElementVNode("button", {
            type: "button",
            class: "selection-action-btn",
            onClick: val2[5] || (val2[5] = val3 => refVal12.value.buildingIds = refVal5.value.map(val4 => val4.id))
          }, " 全选 "), createElementVNode("button", {
            type: "button",
            class: "selection-action-btn",
            onClick: val2[6] || (val2[6] = val3 => refVal12.value.buildingIds = [])
          }, " 取消全选 ")])) : createCommentVNode("", !0)])]), createElementVNode("div", qs, [val2[46] || (val2[46] = createElementVNode("h4", {
            class: "form-section-title"
          }, "阶段配置", -1)), createElementVNode("div", Fs, [createElementVNode("label", zs, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val2[7] || (val2[7] = val3 => refVal12.value.globalConfig.auto_stage_transition = val3),
            type: "checkbox",
            class: "form-checkbox",
            disabled: "",
            checked: ""
          }, null, 512), [[deepWatchOptions, refVal12.value.globalConfig.auto_stage_transition]]), val2[28] || (val2[28] = createTextVNode(" 启用阶段自动转换 ", -1))]), val2[29] || (val2[29] = createElementVNode("p", {
            class: "form-hint"
          }, "阶段将在到达设定时间时自动转换到下一阶段（默认开启）", -1))]), (openBlock(!0), createElementBlock(Fragment, null, renderList(refVal12.value.stages, (val3, val4) => (openBlock(), createElementBlock("div", {
            key: val3.stageType,
            class: "stage-config"
          }, [createElementVNode("div", Hs, [createElementVNode("div", Es, [createElementVNode("span", As, toDisplayString(val4 + 1), 1), createElementVNode("span", Ys, toDisplayString(val3.stageName), 1)]), createElementVNode("div", js, [createElementVNode("div", Zs, [val2[30] || (val2[30] = createElementVNode("label", {
            class: "form-label-sm"
          }, "开始时间", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.startTime = val5,
            type: "datetime-local",
            class: "form-input"
          }, null, 8, Gs), [[vModelText, val3.startTime]])]), createElementVNode("div", Js, [val2[31] || (val2[31] = createElementVNode("label", {
            class: "form-label-sm"
          }, "结束时间", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.endTime = val5,
            type: "datetime-local",
            class: "form-input"
          }, null, 8, Ks), [[vModelText, val3.endTime]])])])]), val3.stageType === "submission" && val3.submissionRules ? (openBlock(), createElementBlock("div", Qs, [createElementVNode("div", Ws, [createElementVNode("label", Xs, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.submissionRules.has_limit = val5,
            type: "checkbox",
            class: "form-checkbox"
          }, null, 8, et), [[deepWatchOptions, val3.submissionRules.has_limit]]), val2[32] || (val2[32] = createTextVNode(" 启用投稿数量限制 ", -1))])]), createElementVNode("div", {
            class: normalizeClass(["config-details", {
              expanded: val3.submissionRules.has_limit
            }])
          }, [createElementVNode("div", st, [createElementVNode("div", tt, [createElementVNode("div", ot, [val2[34] || (val2[34] = createElementVNode("label", {
            class: "form-label-sm"
          }, "限制范围", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val5 => val3.submissionRules.limit_scope = val5,
            class: "form-select"
          }, [...(val2[33] || (val2[33] = [createElementVNode("option", {
            value: "period"
          }, "每个时段分别限制", -1), createElementVNode("option", {
            value: "activity"
          }, "整个活动总限制", -1)]))], 8, it), [[deepDirectiveOptions, val3.submissionRules.limit_scope]])])]), createElementVNode("div", at, [createElementVNode("div", lt, [val2[35] || (val2[35] = createElementVNode("label", {
            class: "form-label-sm"
          }, "最少投稿数", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.submissionRules.min_count = val5,
            type: "number",
            class: "form-input",
            min: "0",
            placeholder: "不限"
          }, null, 8, nt), [[vModelText, val3.submissionRules.min_count, void 0, {
            number: !0
          }]])]), createElementVNode("div", dt, [val2[36] || (val2[36] = createElementVNode("label", {
            class: "form-label-sm"
          }, "最多投稿数", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.submissionRules.max_count = val5,
            type: "number",
            class: "form-input",
            min: "1",
            placeholder: "不限"
          }, null, 8, ut), [[vModelText, val3.submissionRules.max_count, void 0, {
            number: !0
          }]])])])])], 2), createElementVNode("div", rt, [createElementVNode("label", ct, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.require_user_info = val5,
            type: "checkbox",
            class: "form-checkbox"
          }, null, 8, mt), [[deepWatchOptions, val3.require_user_info]]), val2[37] || (val2[37] = createTextVNode(" 需要填写用户信息 ", -1))])]), createElementVNode("div", {
            class: normalizeClass(["config-details", {
              expanded: val3.require_user_info
            }])
          }, [createElementVNode("div", pt, [val2[38] || (val2[38] = createElementVNode("label", {
            class: "form-label-sm"
          }, "选择需要的信息字段", -1)), createElementVNode("div", vt, [(openBlock(), createElementBlock(Fragment, null, renderList(list, val5 => createElementVNode("label", {
            key: val5.value,
            class: "checkbox-item"
          }, [withDirectives(createElementVNode("input", {
            type: "checkbox",
            value: val5.value,
            "onUpdate:modelValue": val6 => val3.user_info_fields = val6,
            class: "form-checkbox"
          }, null, 8, ft), [[deepWatchOptions, val3.user_info_fields]]), createTextVNode(" " + toDisplayString(val5.label), 1)])), 64))])])], 2)])) : createCommentVNode("", !0), val3.stageType === "voting" && val3.votingRules ? (openBlock(), createElementBlock("div", gt, [createElementVNode("div", _t, [createElementVNode("div", bt, [val2[40] || (val2[40] = createElementVNode("label", {
            class: "form-label-sm"
          }, "投票模式", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val5 => val3.voting_mode = val5,
            class: "form-select"
          }, [...(val2[39] || (val2[39] = [createElementVNode("option", {
            value: "unified"
          }, "统一投票（海沧校区）", -1), createElementVNode("option", {
            value: "per_building"
          }, "分宿舍投票（思明校区）", -1)]))], 8, yt), [[deepDirectiveOptions, val3.voting_mode]])])]), createElementVNode("div", ht, [createElementVNode("label", kt, [withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.votingRules.has_limit = val5,
            type: "checkbox",
            class: "form-checkbox"
          }, null, 8, Tt), [[deepWatchOptions, val3.votingRules.has_limit]]), val2[41] || (val2[41] = createTextVNode(" 启用投票数量限制 ", -1))])]), createElementVNode("div", {
            class: normalizeClass(["config-details", {
              expanded: val3.votingRules.has_limit
            }])
          }, [createElementVNode("div", xt, [createElementVNode("div", Ct, [createElementVNode("div", St, [val2[43] || (val2[43] = createElementVNode("label", {
            class: "form-label-sm"
          }, "限制范围", -1)), withDirectives(createElementVNode("select", {
            "onUpdate:modelValue": val5 => val3.votingRules.limit_scope = val5,
            class: "form-select"
          }, [...(val2[42] || (val2[42] = [createElementVNode("option", {
            value: "period"
          }, "每个时段分别限制", -1), createElementVNode("option", {
            value: "activity"
          }, "整个活动总限制", -1)]))], 8, wt), [[deepDirectiveOptions, val3.votingRules.limit_scope]])])]), createElementVNode("div", Rt, [createElementVNode("div", It, [val2[44] || (val2[44] = createElementVNode("label", {
            class: "form-label-sm"
          }, "最少投票数", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.votingRules.min_count = val5,
            type: "number",
            class: "form-input",
            min: "0",
            placeholder: "不限"
          }, null, 8, Vt), [[vModelText, val3.votingRules.min_count, void 0, {
            number: !0
          }]])]), createElementVNode("div", Ut, [val2[45] || (val2[45] = createElementVNode("label", {
            class: "form-label-sm"
          }, "最多投票数", -1)), withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": val5 => val3.votingRules.max_count = val5,
            type: "number",
            class: "form-input",
            min: "1",
            placeholder: "不限"
          }, null, 8, $t), [[vModelText, val3.votingRules.max_count, void 0, {
            number: !0
          }]])])])])], 2)])) : createCommentVNode("", !0)]))), 128))]), createElementVNode("div", Mt, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz15,
            disabled: refVal10.value
          }, "取消", 8, Pt), createElementVNode("button", {
            class: "modal-btn confirm",
            onClick: zz17,
            disabled: refVal10.value
          }, toDisplayString(refVal10.value ? "保存中..." : "保存"), 9, Nt)])], 64))])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      }), createVNode(withSlots, {
        name: "modal-fade"
      }, {
        default: toDisplayValue(() => [refVal13.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: withModifiers(zz21, ["self"])
        }, [createVNode(withSlots, {
          name: "modal-scale",
          appear: ""
        }, {
          default: toDisplayValue(() => [refVal13.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-content",
            onClick: val2[9] || (val2[9] = withModifiers(() => {}, ["stop"]))
          }, [createElementVNode("h3", Dt, toDisplayString(refVal14.value?.title), 1), createElementVNode("p", Bt, toDisplayString(refVal14.value?.message), 1), createElementVNode("div", Ot, [createElementVNode("button", {
            class: "modal-btn cancel",
            onClick: zz21,
            disabled: refVal15.value
          }, "取消", 8, Lt), createElementVNode("button", {
            class: normalizeClass(["modal-btn confirm", {
              danger: refVal14.value?.type === "close"
            }]),
            onClick: zz20,
            disabled: refVal15.value
          }, toDisplayString(refVal15.value ? "处理中..." : "确认"), 11, qt)])])) : createCommentVNode("", !0)]),
          _: 1
        })])) : createCommentVNode("", !0)]),
        _: 1
      })]));
    }
  }),
  Gt = withScopeId(Ft, [["__scopeId", "data-v-cf66f48d"]]);
/* index 运行时导出（已语义化） */
export { Gt as default };