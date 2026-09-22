/*!
 * 模块：tally（tally-DC36h0vE.js）—— 实时唱票业务的 API 客户端封装
 * 角色：纯客户端 chunk，供 4 个页面引用；本身不含任何 UI。
 * 来源：仓库镜像 assets/tally-DC36h0vE.js，对应站点 https://xmyzstudent.com/
 *
 * 本地复刻的治理说明（本文件相对镜像的唯一改动）：
 *  1) 变量/函数从混淆名（zz0、val...）改为语义化命名；
 *  2) 统一缩进与排版，补齐 JSDoc，注明每个函数对应的 HTTP 方法与路径；
 *  3) WS 地址从硬编码的线上域名改为按当前页面源推导（保持路径与源站同构）。
 *
 * 重要约定：
 *  - http 实例的 baseURL 已在 index chunk 中配置为 {origin}/api/v2，
 *    因此下面所有路径只写 "/admin/tally/..."。
 *  - 所有 REST 响应均为 {code, message, data} 信封，页面里统一判 code===200。
 */
import { http } from "./index-DJrtCu9i.js";

/** GET  /admin/tally/activities — 活动列表（管理页表格数据源） */
function listActivities() {
  return http.get("/admin/tally/activities");
}

/** GET  /admin/tally/activities/:id — 活动详情（含候选人），配置页/控制台用 */
function getActivity(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`);
}

/** POST /admin/tally/activities — 新建活动，body: {title} */
function createActivity(title) {
  return http.post("/admin/tally/activities", { title });
}

/** PUT  /admin/tally/activities/:id — 更新活动标题或状态，body: {title?|status?} */
function updateActivity(activityId, patch) {
  return http.put(`/admin/tally/activities/${activityId}`, patch);
}

/** DELETE /admin/tally/activities/:id — 删除活动（级联删候选人与记录） */
function deleteActivity(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`);
}

/** POST /admin/tally/activities/:id/candidates — 新增候选人，body: {number, name, displayOrder} */
function createCandidate(activityId, candidate) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, candidate);
}

/** PUT  /admin/tally/candidates/:id — 更新候选人，body: {number?, name?, displayOrder?} */
function updateCandidate(candidateId, patch) {
  return http.put(`/admin/tally/candidates/${candidateId}`, patch);
}

/** DELETE /admin/tally/candidates/:id — 删除候选人（级联删其记录） */
function deleteCandidate(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`);
}

/** GET  /admin/tally/activities/:id/records — 操作日志（最新在前，控制台取前 20 条） */
function listRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`);
}

/** POST /admin/tally/activities/:id/undo — 撤销最近一次普通录票；无可撤销时 data=null */
function undoActivity(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`);
}

/** POST /admin/tally/candidates/:id/vote — 录票，body: {delta}（正加负减，不能为 0） */
function voteCandidate(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, { delta });
}

/**
 * 大屏/控制台 Inbox 的 WebSocket 地址构造函数。
 * 源站：wss://api.xmyzstudent.com/ws/tally/activity/:id
 * 本地：与当前页面同源，http→ws、https→wss，路径与源站逐字一致。
 */
function tallyActivityWsUrl(activityId) {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${location.host}/ws/tally/activity/${activityId}`;
}

/* index 运行时导出（已语义化）——导出别名与镜像保持一致，页面端零改动 */
export {
  listActivities as getAdminTallyActivities,
  tallyActivityWsUrl,
  createActivity as createAdminTallyActivities,
  updateActivity as updateAdminTallyActivities,
  deleteActivity as deleteAdminTallyActivities,
  getActivity as getAdminTallyActivitiesById,
  createCandidate as createAdminTallyActivitiesCandidates,
  updateCandidate as updateAdminTallyCandidates,
  deleteCandidate as deleteAdminTallyCandidates,
  listRecords as getAdminTallyActivitiesRecords,
  undoActivity as undoAdminTallyActivities,
  voteCandidate as voteAdminTallyCandidates,
};
