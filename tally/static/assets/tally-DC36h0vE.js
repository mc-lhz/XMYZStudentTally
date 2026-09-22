/*!
 * 模块：tally（tally-DC36h0vE.js）—— 「实时唱票」业务 API 客户端
 * 角色：封装 tally 业务全部后端调用（REST + WebSocket 地址拼接），供三个页面消费：
 *       TallyActivitiesPage（活动管理）/ TallyActivityEditPage（候选人配置）/ TallyControlPage（唱票控制台）/ ScreenPage（大屏）。
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * 【本地化改造说明（唯一改动）】
 *   源站 WS 地址写死于 api.xmyzstudent.com；本地 Flask 复刻后，改为按当前页面地址动态拼接，
 *   路径部分 /ws/tally/activity/:id 与源站保持同构（isomorphic），仅主机名指向本地服务。
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) / axios 实例 http 等 */
import { http } from "./index-DJrtCu9i.js";

/* ===== REST 接口契约（与源站逐字对应，本地由 Flask 以 /api/v2 为前缀实现） ===== */

/** GET /admin/tally/activities —— 活动列表（管理页表格数据源） */
function getAdminTallyActivities() {
  return http.get("/admin/tally/activities");
}

/** GET /admin/tally/activities/:id —— 活动详情（含候选人数组，配置页数据源） */
function getAdminTallyActivitiesById(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`);
}

/** POST /admin/tally/activities —— 新建活动，请求体 { title }，状态默认为 0（待开始） */
function createAdminTallyActivities(title) {
  return http.post("/admin/tally/activities", {
    title: title
  });
}

/** PUT /admin/tally/activities/:id —— 更新活动，请求体支持 { title } 与 { status } 的部分字段 */
function updateAdminTallyActivities(activityId, payload) {
  return http.put(`/admin/tally/activities/${activityId}`, payload);
}

/** DELETE /admin/tally/activities/:id —— 删除活动（候选人与唱票记录级联删除） */
function deleteAdminTallyActivities(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`);
}

/** POST /admin/tally/activities/:id/candidates —— 新增候选人，请求体 { number, name, displayOrder } */
function createAdminTallyActivitiesCandidates(activityId, candidate) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, candidate);
}

/** PUT /admin/tally/candidates/:id —— 更新候选人，请求体 { number, name, displayOrder } */
function updateAdminTallyCandidates(candidateId, candidate) {
  return http.put(`/admin/tally/candidates/${candidateId}`, candidate);
}

/** DELETE /admin/tally/candidates/:id —— 删除候选人（其唱票记录级联删除） */
function deleteAdminTallyCandidates(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`);
}

/** POST /admin/tally/candidates/:id/vote —— 录票，请求体 { delta }（非 0 整数，可负） */
function voteAdminTallyCandidates(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, {
    delta: delta
  });
}

/** POST /admin/tally/activities/:id/undo —— 撤销最近一次录票，响应 data 为被撤销记录（无可撤销时为 null） */
function undoAdminTallyActivities(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`);
}

/** GET /admin/tally/activities/:id/records —— 操作日志（控制台取最新 20 条展示） */
function getAdminTallyActivitiesRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`);
}

/**
 * 拼接某个活动的实时唱票 WebSocket 地址（大屏 / 唱票控制台共用）。
 * 源站原文：wss://api.xmyzstudent.com/ws/tally/activity/${id}
 * 本地复刻：协议跟随页面（http→ws、https→wss），主机取 location.host，
 *          路径 /ws/tally/activity/:id 与源站逐字同构。
 */
function tallyActivityWsUrl(activityId) {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${location.host}/ws/tally/activity/${activityId}`;
}

/* index 运行时导出（已语义化） */
export {
  getAdminTallyActivities,
  tallyActivityWsUrl,
  createAdminTallyActivities,
  updateAdminTallyActivities,
  deleteAdminTallyActivities,
  getAdminTallyActivitiesById,
  createAdminTallyActivitiesCandidates,
  updateAdminTallyCandidates,
  deleteAdminTallyCandidates,
  getAdminTallyActivitiesRecords,
  undoAdminTallyActivities,
  voteAdminTallyCandidates
};
