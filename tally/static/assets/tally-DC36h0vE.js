/*!
 * 模块：tally（tally-DC36h0vE.js）
 * 角色：站点内的功能模块，参与前端业务组装 —— tally 选票业务的 API 客户端。
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * —— 本地镜像治理说明 ——
 * 本 chunk 封装「实时唱票」业务对后端 REST + WebSocket 的全部调用，
 * 共 11 个 REST 端点函数 + 1 个 WS 地址生成器（即任务规格中的
 * 「12 个 REST 接口 + 1 个 WS 地址」的前端调用侧）。
 * 所有请求经由入口 chunk 导出的 axios 实例 http 发出：
 *   - baseURL = /api/v2（本地镜像已改写，原为线上 https://api.xmyzstudent.com/api/v2）；
 *   - 请求拦截器自动附加 Authorization: Bearer <localStorage.token>；
 *   - 响应为统一信封 { code, data, message }，调用方只判断 code===200。
 * 治理动作：为每个端点函数补充 JSDoc 接口契约，不改写函数体。
 */
/* 导入：应用入口模块 —— axios 实例 http（baseURL /api/v2，自动带 Bearer 鉴权） */
import { http } from "./index-DJrtCu9i.js";

/**
 * getAdminTallyActivities —— 获取唱票活动列表。
 * GET /api/v2/admin/tally/activities
 * 响应 data：活动摘要数组 [{ id, title, status, createdAt }]
 * 消费方：TallyActivitiesPage（活动管理列表页）
 */
function zz0() {
  return http.get("/admin/tally/activities");
}

/**
 * getAdminTallyActivitiesById —— 获取单个唱票活动详情。
 * GET /api/v2/admin/tally/activities/:activityId
 * @param {number|string} activityId 活动 id
 * 响应 data：{ id, title, status, createdAt, candidates: [{id,number,name,displayOrder,voteCount}] }
 * 消费方：TallyActivityEditPage（配置候选人页）
 */
function zz1(val) {
  return http.get(`/admin/tally/activities/${val}`);
}

/**
 * createAdminTallyActivities —— 新建唱票活动。
 * POST /api/v2/admin/tally/activities
 * @param {string} title 活动标题
 * 请求体：{ title }
 * 消费方：TallyActivitiesPage 的「新建活动」弹窗
 */
function zz2(val) {
  return http.post("/admin/tally/activities", {
    title: val
  });
}

/**
 * updateAdminTallyActivities —— 更新唱票活动（改名 / 切换状态）。
 * PUT /api/v2/admin/tally/activities/:activityId
 * @param {number|string} activityId 活动 id
 * @param {object} payload 更新字段，可为 { title } 或 { status: 0|1|2 }
 *   status 状态机：0=待开始(pending)、1=进行中(live)、2=已结束(ended)
 * 消费方：活动列表页状态下拉 / 配置页改名与状态下拉
 */
function zz3(val, val2) {
  return http.put(`/admin/tally/activities/${val}`, val2);
}

/**
 * deleteAdminTallyActivities —— 删除唱票活动（候选人、唱票记录一并删除）。
 * DELETE /api/v2/admin/tally/activities/:activityId
 * 消费方：TallyActivitiesPage 的「删除」按钮（带 confirm 二次确认）
 */
function zz4(val) {
  return http.delete(`/admin/tally/activities/${val}`);
}

/**
 * createAdminTallyActivitiesCandidates —— 向活动添加候选人。
 * POST /api/v2/admin/tally/activities/:activityId/candidates
 * @param {number|string} activityId 活动 id
 * @param {object} payload { number, name, displayOrder }
 * 消费方：TallyActivityEditPage 的「添加候选人」弹窗
 */
function zz5(val, val2) {
  return http.post(`/admin/tally/activities/${val}/candidates`, val2);
}

/**
 * updateAdminTallyCandidates —— 更新候选人（编号/姓名/显示顺序）。
 * PUT /api/v2/admin/tally/candidates/:candidateId
 * @param {number|string} candidateId 候选人 id
 * @param {object} payload { number, name, displayOrder }
 * 消费方：TallyActivityEditPage 的「编辑候选人」弹窗
 */
function zz6(val, val2) {
  return http.put(`/admin/tally/candidates/${val}`, val2);
}

/**
 * deleteAdminTallyCandidates —— 删除候选人（其历史唱票记录一并删除）。
 * DELETE /api/v2/admin/tally/candidates/:candidateId
 * 消费方：TallyActivityEditPage 的「删除」按钮（带 confirm 二次确认）
 */
function zz7(val) {
  return http.delete(`/admin/tally/candidates/${val}`);
}

/**
 * voteAdminTallyCandidates —— 现场录票（加票/减票）。
 * POST /api/v2/admin/tally/candidates/:candidateId/vote
 * @param {number|string} candidateId 候选人 id
 * @param {number} delta 票数变化量，非 0 整数（+N 加票 / -N 减票）
 * 请求体：{ delta }
 * 后端仅在活动状态为「进行中(1)」时放行，成功后写入操作日志并广播大屏。
 * 消费方：TallyControlPage（唱票控制台）的 +1/+5/+10/-1/自定义按钮
 */
function zz8(val, val2) {
  return http.post(`/admin/tally/candidates/${val}/vote`, {
    delta: val2
  });
}

/**
 * undoAdminTallyActivities —— 撤销该活动最近一次普通录票。
 * POST /api/v2/admin/tally/activities/:activityId/undo
 * 响应 data：true=已撤销；false=无可撤销操作（前端据此提示）
 * 消费方：TallyControlPage 的「撤销上一步」按钮
 */
function zz9(val) {
  return http.post(`/admin/tally/activities/${val}/undo`);
}

/**
 * getAdminTallyActivitiesRecords —— 获取唱票操作日志。
 * GET /api/v2/admin/tally/activities/:activityId/records
 * 响应 data：记录数组（最新在前）[{ id, createdAt, candidateNumber, candidateName, delta, type }]
 *   type：0=普通录票、1=撤销
 * 消费方：TallyControlPage 的操作日志区（前端取前 20 条展示）
 */
function zz10(val) {
  return http.get(`/admin/tally/activities/${val}/records`);
}

/**
 * tallyActivityWsUrl —— 生成「实时唱票大屏」的 WebSocket 地址（与源站同构）。
 * 源站路径：/ws/tally/activity/:activityId（线上为 wss://api.xmyzstudent.com/...）。
 * 【本地镜像必要改写】改为与当前页面同源同构的地址：
 *   - 协议按 location.protocol 推导（http → ws，https → wss），保证本地 http 服务可用；
 *   - host 取自 location.host，确保任何端口/域名下都指向本地 Flask 的 WS 端点；
 *   - 路径 /ws/tally/activity/:id 与源站逐字保持一致。
 * 消费方：useTallySocket（大屏 / 唱票控制台共用的连接封装）
 */
function zz11(val) {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${location.host}/ws/tally/activity/${val}`;
}
/* index 运行时导出（已语义化） */
export { zz0 as getAdminTallyActivities, zz11 as tallyActivityWsUrl, zz2 as createAdminTallyActivities, zz3 as updateAdminTallyActivities, zz4 as deleteAdminTallyActivities, zz1 as getAdminTallyActivitiesById, zz5 as createAdminTallyActivitiesCandidates, zz6 as updateAdminTallyCandidates, zz7 as deleteAdminTallyCandidates, zz10 as getAdminTallyActivitiesRecords, zz9 as undoAdminTallyActivities, zz8 as voteAdminTallyCandidates };
