/*!
 * 模块：tally（assets/tally-DC36h0vE.js）
 * 角色：唱票业务的「接口层」。页面不直接发请求，全部经由本模块封装。
 *
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 * 整理：变量名 val/zzN -> 语义名，逐函数补注释（逻辑零改动）。
 *
 * 传输层由入口 bundle 注入的 axios 实例 `http` 承担：
 *   baseURL = /api/v2            （源站为 https://api.xmyzstudent.com/api/v2）
 *   请求拦截器：把 localStorage.token 塞进 Authorization: Bearer <token>
 *   超时 15s、Content-Type: application/json
 * 因此下面所有路径都是「相对于 /api/v2」的短路径。
 */

/* 导入：应用入口模块 —— axios 实例 http / Vue 运行时 / 路由 / Toast 等 */
import { http } from "./index-DJrtCu9i.js";

/* 活动状态枚举：与页面上 <select> 的 0/1/2 一一对应 */
export const STATUS_PENDING = 0; // 待开始
export const STATUS_LIVE = 1;    // 进行中 —— 只有该状态允许录票
export const STATUS_ENDED = 2;   // 已结束

/* ---------------------------------------------------------------------------
 * 活动（Activity）
 * ------------------------------------------------------------------------- */

/** 活动列表：GET /admin/tally/activities */
export function getAdminTallyActivities() {
  return http.get("/admin/tally/activities");
}

/** 活动详情（含候选人）：GET /admin/tally/activities/<activityId> */
export function getAdminTallyActivitiesById(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`);
}

/** 新建活动：POST /admin/tally/activities，只传标题，状态由后端置为「待开始」 */
export function createAdminTallyActivities(title) {
  return http.post("/admin/tally/activities", {
    title
  });
}

/** 修改活动：PUT /admin/tally/activities/<activityId>
 *  payload 支持部分字段——活动列表页只传 {status}，配置页只传 {title}
 */
export function updateAdminTallyActivities(activityId, payload) {
  return http.put(`/admin/tally/activities/${activityId}`, payload);
}

/** 删除活动：DELETE /admin/tally/activities/<activityId>（连带候选人与唱票记录） */
export function deleteAdminTallyActivities(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`);
}

/* ---------------------------------------------------------------------------
 * 候选人（Candidate）
 * ------------------------------------------------------------------------- */

/** 新增候选人：POST /admin/tally/activities/<activityId>/candidates
 *  payload: { number, name, displayOrder }
 */
export function createAdminTallyActivitiesCandidates(activityId, payload) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, payload);
}

/** 修改候选人：PUT /admin/tally/candidates/<candidateId>
 *  注意：候选人接口挂在 /candidates/<id> 下，不再带 activityId
 */
export function updateAdminTallyCandidates(candidateId, payload) {
  return http.put(`/admin/tally/candidates/${candidateId}`, payload);
}

/** 删除候选人：DELETE /admin/tally/candidates/<candidateId>（连带其历史唱票记录） */
export function deleteAdminTallyCandidates(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`);
}

/* ---------------------------------------------------------------------------
 * 唱票（Vote）/ 撤销（Undo）/ 操作日志（Records）
 * ------------------------------------------------------------------------- */

/** 录票：POST /admin/tally/candidates/<candidateId>/vote
 *  delta 可正可负，但不能为 0；+1 / +5 / +10 / -1 / 自定义数值都走这一个接口
 */
export function voteAdminTallyCandidates(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, {
    delta
  });
}

/** 撤销最近一次录票：POST /admin/tally/activities/<activityId>/undo
 *  后端返回 data 为 true/false，false 时前端提示「无可撤销操作」
 */
export function undoAdminTallyActivities(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`);
}

/** 操作日志：GET /admin/tally/activities/<activityId>/records
 *  后端倒序返回，前端只展示前 20 条
 */
export function getAdminTallyActivitiesRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`);
}

/* ---------------------------------------------------------------------------
 * 实时通道
 * ------------------------------------------------------------------------- */

/** 唱票 WebSocket 地址：/ws/tally/activity/<activityId>
 *
 *  移植改动（唯一的一处）：
 *    源站原文 —— `wss://api.xmyzstudent.com/ws/tally/activity/${val}`
 *    本地服务 —— 由 Flask 在同源提供，因此按当前页面的协议与主机推导，
 *                路径 /ws/tally/activity/<id> 与源站保持逐字一致。
 *  另留一个 window.__tallyWsBase 覆盖开关，便于把静态页指向另一台后端调试。
 */
export function tallyActivityWsUrl(activityId) {
  if (typeof window !== "undefined" && window.__tallyWsBase) {
    return `${window.__tallyWsBase}/ws/tally/activity/${activityId}`;
  }
  const scheme = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${scheme}//${window.location.host}/ws/tally/activity/${activityId}`;
}
