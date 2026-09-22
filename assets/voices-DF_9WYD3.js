/*!
 * 模块：voices（voices-DF_9WYD3.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/voices-DF_9WYD3.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0() {
  return http.get("/voices/status");
}
function zz1(val) {
  return http.post("/voices/identity", {
    identity: val
  });
}
function zz2(val, val2) {
  return http.post("/voices/questions", {
    content: val,
    targetIdentities: val2
  });
}
function zz3(val) {
  return http.get("/voices/questions", {
    params: {
      scope: val.scope || "mine",
      sort: val.sort || "latest",
      targets: val.targets?.length ? val.targets.join(",") : void 0,
      page: val.page || 1,
      size: val.size || 12
    }
  });
}
function zz4(val) {
  return http.get(`/voices/questions/${val}`);
}
function zz5(val, val2) {
  return http.post(`/voices/questions/${val}/answers`, {
    content: val2
  });
}
function zz6(val) {
  return http.post(`/voices/answers/${val}/like`);
}
function zz7(val, val2, val3) {
  return http.post("/voices/report", {
    targetType: val,
    targetId: val2,
    reason: val3 || void 0
  });
}
function zz8(val) {
  return http.post(`/voices/questions/${val}/favorite`);
}
function zz9(zz10 = 1, zz11 = 10) {
  return http.get("/voices/mine/favorites", {
    params: {
      page: zz10,
      size: zz11
    }
  });
}
function zz12(zz13 = 1, zz14 = 10) {
  return http.get("/voices/mine/questions", {
    params: {
      page: zz13,
      size: zz14
    }
  });
}
function zz15(zz16 = 1, zz17 = 10) {
  return http.get("/voices/mine/answers", {
    params: {
      page: zz16,
      size: zz17
    }
  });
}
function zz18(val) {
  return http.get("/admin/voices/questions", {
    params: val
  });
}
function zz19(val) {
  return http.get("/admin/voices/answers", {
    params: val
  });
}
function zz20(val) {
  return http.put(`/admin/voices/questions/${val}/takedown`);
}
function zz21(val) {
  return http.put(`/admin/voices/questions/${val}/restore`);
}
function zz22(val) {
  return http.put(`/admin/voices/answers/${val}/takedown`);
}
function zz23(val) {
  return http.put(`/admin/voices/answers/${val}/restore`);
}
function zz24() {
  return http.get("/admin/voices/stats");
}
function zz25(val) {
  return http.get("/admin/voices/reports", {
    params: val
  });
}
function zz26(val) {
  return http.put(`/admin/voices/reports/${val}/handle`);
}
const helper_zb50 = [1, 2, 3, 4],
  voiceIdentityTypeLabels = {
    1: "初中生",
    2: "高中生",
    3: "大学生",
    4: "社会人"
  },
  voicesLabels = {
    1: "大",
    2: "中",
    3: "小",
    4: "老"
  };
function zz27(val) {
  return val ? voiceIdentityTypeLabels[val] ?? "未知" : "未知";
}
function zz28(val) {
  const val2 = val;
  return `${voiceIdentityTypeLabels[val2] ?? "匿名"}的${voicesLabels[val2] ?? ""}问题`;
}
/* index 运行时导出（已语义化） */
export { voiceIdentityTypeLabels, helper_zb50, zz3 as getVoicesQuestions, zz1 as createVoicesIdentity, zz2 as createVoicesQuestions, zz12 as getVoicesMineQuestions, zz28 as helper_zb55, zz15 as getVoicesMineAnswers, zz0 as getVoicesStatus, zz9 as getVoicesMineFavorites, zz27 as helper_zb59, zz4 as getVoicesQuestions2, zz5 as createVoicesQuestionsAnswers, zz6 as likeVoicesAnswers, zz24 as getAdminVoicesStats, zz18 as getAdminVoicesQuestions, zz19 as getAdminVoicesAnswers, zz25 as getAdminVoicesReports, zz20 as takedownAdminVoicesQuestions, zz7 as reportVoices, zz21 as restoreAdminVoicesQuestions, zz8 as favoriteVoicesQuestions, zz22 as takedownAdminVoicesAnswers, zz23 as restoreAdminVoicesAnswers, zz26 as handleAdminVoicesReports };