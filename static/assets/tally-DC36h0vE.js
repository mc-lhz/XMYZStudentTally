/*!
 * 模块：tally（tally-DC36h0vE.js）
 * 角色：实时唱票业务的接口层 —— 11 个 REST 端点封装 + 1 个 WS 地址构造器。
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * ── 治理说明（任务一「前端代码治理」）─────────────────────────────
 *   1. 语义化：函数名 / 参数名已按「HTTP 方法 + 资源 + 动作」重命名，统一 2 空格缩进；
 *   2. 注释：每个函数标注请求路径、方法、入参、消费方页面；
 *   3. 本地化适配（仅下面两处，请求路径与源站逐字一致，不改任何渲染逻辑）：
 *        REST：源站 base = https://api.xmyzstudent.com/api/v2（index chunk 中 Ih 常量）
 *              → 本地通过 axios「per-request baseURL」覆盖为 <当前源>/api/v2，
 *                这样不污染全局 http 实例（其他业务模块仍保持源站配置）。
 *        WS：  源站 wss://api.xmyzstudent.com/ws/tally/activity/:id
 *              → 本地 ws(s)://<当前host>/ws/tally/activity/:id（路径逐字同构，主机随本地服务）。
 *
 * ── 接口契约（响应信封 {code, message, data}；页面统一以 code === 200 分支）──
 *   GET    /admin/tally/activities                      活动列表          ← TallyActivitiesPage
 *   POST   /admin/tally/activities        {title}       新建活动          ← TallyActivitiesPage
 *   GET    /admin/tally/activities/:id                  活动详情(含候选人) ← TallyActivityEditPage
 *   PUT    /admin/tally/activities/:id    {title?,status?} 改名/切状态     ← 列表页 + 配置页
 *   DELETE /admin/tally/activities/:id                  删除活动(级联)    ← TallyActivitiesPage
 *   POST   /admin/tally/activities/:id/candidates
 *            {number,name,displayOrder}                 添加候选人        ← TallyActivityEditPage
 *   PUT    /admin/tally/candidates/:id    {number,name,displayOrder}       编辑候选人 ← TallyActivityEditPage
 *   DELETE /admin/tally/candidates/:id                  删除候选人(级联)  ← TallyActivityEditPage
 *   GET    /admin/tally/activities/:id/records          操作日志(新→旧)   ← TallyControlPage
 *   POST   /admin/tally/activities/:id/undo             撤销最近一次录票  ← TallyControlPage
 *   POST   /admin/tally/candidates/:id/vote {delta}     现场录票(±N)      ← TallyControlPage
 *   WS     /ws/tally/activity/:id                       实时快照推送      ← ScreenPage / 控制台
 */
/* 导入：应用入口模块 —— 全局 axios 实例 http（源站 base + Bearer 拦截器） */
import { http } from "./index-DJrtCu9i.js";

/** 本地 REST 前缀：与源站 https://api.xmyzstudent.com/api/v2 逐字同构（主机换成本地服务）。 */
const TALLY_API_BASE = `${window.location.origin}/api/v2`;

/** 每次请求携带的 axios 配置：仅覆盖 baseURL，其余（超时/Authorization 头）沿用全局 http。 */
function localApiConfig() {
  return { baseURL: TALLY_API_BASE };
}

/** GET /admin/tally/activities —— 活动列表（TallyActivitiesPage 表格：id/title/status/createdAt）。 */
function getAdminTallyActivities() {
  return http.get("/admin/tally/activities", localApiConfig());
}

/** GET /admin/tally/activities/:id —— 活动详情，data.candidates 按 displayOrder 排序后渲染。 */
function getAdminTallyActivitiesById(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`, localApiConfig());
}

/** POST /admin/tally/activities —— 新建活动，body 仅 {title}，新活动初始 status=0(待开始)。 */
function createAdminTallyActivities(title) {
  return http.post("/admin/tally/activities", { title }, localApiConfig());
}

/** PUT /admin/tally/activities/:id —— 更新活动；body 为 {title} 改名 或 {status} 切状态(0/1/2)。 */
function updateAdminTallyActivities(activityId, patch) {
  return http.put(`/admin/tally/activities/${activityId}`, patch, localApiConfig());
}

/** DELETE /admin/tally/activities/:id —— 删除活动，候选人与唱票记录一并删除。 */
function deleteAdminTallyActivities(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`, localApiConfig());
}

/** POST /admin/tally/activities/:id/candidates —— 添加候选人 {number, name, displayOrder}。 */
function createAdminTallyActivitiesCandidates(activityId, candidate) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, candidate, localApiConfig());
}

/** PUT /admin/tally/candidates/:id —— 编辑候选人 {number, name, displayOrder}。 */
function updateAdminTallyCandidates(candidateId, patch) {
  return http.put(`/admin/tally/candidates/${candidateId}`, patch, localApiConfig());
}

/** DELETE /admin/tally/candidates/:id —— 删除候选人，其历史唱票记录一并删除。 */
function deleteAdminTallyCandidates(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`, localApiConfig());
}

/** POST /admin/tally/candidates/:id/vote —— 现场录票，body {delta}，delta 为非 0 整数（可为负）。 */
function voteAdminTallyCandidates(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, { delta }, localApiConfig());
}

/** POST /admin/tally/activities/:id/undo —— 撤销最近一次有效录票；data 为空表示无可撤销。 */
function undoAdminTallyActivities(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`, undefined, localApiConfig());
}

/** GET /admin/tally/activities/:id/records —— 操作日志（新→旧），控制台取前 20 条展示。 */
function getAdminTallyActivitiesRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`, localApiConfig());
}

/**
 * WS 地址构造器 —— 与源站同构。
 * 源站：wss://api.xmyzstudent.com/ws/tally/activity/:id
 * 本地：ws(s)://<当前host>/ws/tally/activity/:id（路径逐字一致；页面经 Flask SPA 回退加载，
 *       所以主机即本地 tally 服务，大屏与控制台连的是本地后端）。
 */
function tallyActivityWsUrl(activityId) {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws/tally/activity/${activityId}`;
}

/* 导出名与源站构建产物保持一致（各页面 chunk 的 import 依赖这些名字）。 */
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
  voteAdminTallyCandidates,
};
