/*!
 * 模块：tally（tally-DC36h0vE.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0() {
  return http.get("/admin/tally/activities");
}
function zz1(val) {
  return http.get(`/admin/tally/activities/${val}`);
}
function zz2(val) {
  return http.post("/admin/tally/activities", {
    title: val
  });
}
function zz3(val, val2) {
  return http.put(`/admin/tally/activities/${val}`, val2);
}
function zz4(val) {
  return http.delete(`/admin/tally/activities/${val}`);
}
function zz5(val, val2) {
  return http.post(`/admin/tally/activities/${val}/candidates`, val2);
}
function zz6(val, val2) {
  return http.put(`/admin/tally/candidates/${val}`, val2);
}
function zz7(val) {
  return http.delete(`/admin/tally/candidates/${val}`);
}
function zz8(val, val2) {
  return http.post(`/admin/tally/candidates/${val}/vote`, {
    delta: val2
  });
}
function zz9(val) {
  return http.post(`/admin/tally/activities/${val}/undo`);
}
function zz10(val) {
  return http.get(`/admin/tally/activities/${val}/records`);
}
function zz11(val) {
  return `wss://api.xmyzstudent.com/ws/tally/activity/${val}`;
}
/* index 运行时导出（已语义化） */
export { zz0 as getAdminTallyActivities, zz11 as tallyActivityWsUrl, zz2 as createAdminTallyActivities, zz3 as updateAdminTallyActivities, zz4 as deleteAdminTallyActivities, zz1 as getAdminTallyActivitiesById, zz5 as createAdminTallyActivitiesCandidates, zz6 as updateAdminTallyCandidates, zz7 as deleteAdminTallyCandidates, zz10 as getAdminTallyActivitiesRecords, zz9 as undoAdminTallyActivities, zz8 as voteAdminTallyCandidates };