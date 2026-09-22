/*!
 * 模块：campaign（campaign-BV1jJ5bx.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/campaign-BV1jJ5bx.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0() {
  return http.get("/campaigns");
}
function zz1(val) {
  return http.get(`/campaigns/${val}`);
}
function zz2(val) {
  return http.post("/admin/campaigns", val);
}
function zz3(val, val2) {
  return http.put(`/admin/campaigns/${val}`, val2);
}
function zz4(val) {
  return http.post(`/admin/campaigns/${val}/activate`);
}
function zz5(val) {
  return http.post(`/admin/campaigns/${val}/close`);
}
function zz6(val, val2) {
  return http.post(`/admin/campaigns/${val}/stage-operation`, val2);
}
function zz7(val) {
  return http.get(`/admin/review/campaigns/${val}/submissions`);
}
function zz8(val) {
  return http.delete("/admin/review/submissions", {
    data: val
  });
}
function zz9(val) {
  return http.get(`/admin/voting/campaigns/${val}/results`);
}
function zz10(val, zz11 = 1, zz12 = 20) {
  return http.get("/music/search", {
    params: {
      keyword: val,
      page: zz11,
      pageSize: zz12
    }
  });
}
function zz13(val) {
  return http.get("/music/detail", {
    params: {
      musicId: val
    }
  });
}
function zz14(val, zz15 = 8) {
  return http.get("/music/url", {
    params: {
      musicId: val,
      quality: zz15
    }
  });
}
function zz16(val) {
  return http.get(`/submissions/campaigns/${val}`);
}
function zz17(val) {
  return http.post("/submissions", val);
}
function zz18(val) {
  return http.get(`/voting/campaigns/${val}/config`);
}
function zz19(val, val2) {
  return http.get(`/voting/campaigns/${val}/options`, {
    params: val2 ? {
      buildingCode: val2
    } : void 0
  });
}
function zz20(val) {
  return http.post("/voting/vote", val);
}
function zz21(val) {
  return http.get(`/voting/campaigns/${val}/my-votes`);
}
/* index 运行时导出（已语义化） */
export { zz1 as getCampaignsById, zz16 as getSubmissionsCampaignsById, zz13 as getMusicDetail, zz17 as createResourceSubmissions, zz20 as voteVoting, zz18 as getVotingCampaignsConfig, zz0 as getCampaigns, zz21 as getVotingCampaignsMyVotes, zz19 as getVotingCampaignsOptions, zz14 as getMusicUrl, zz2 as createAdminCampaigns, zz4 as activateAdminCampaigns, zz5 as closeAdminCampaigns, zz6 as stageOperationAdminCampaigns, zz7 as getAdminReviewCampaignsSubmissions, zz8 as deleteAdminReviewSubmissions, zz9 as getAdminVotingCampaignsResults, zz10 as searchMusic, zz3 as updateAdminCampaigns };