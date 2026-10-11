/*!
 * 模块：tally —— 「实时唱票」业务的 API 封装层
 * ---------------------------------------------------------------------------
 * 来源：assets/tally-DC36h0vE.js（源站 https://xmyzstudent.com/ ，镜像日期 2026-07-21）
 * 角色：把 tally 业务全部 11 个 REST 调用 + 1 个 WebSocket 地址集中封装，
 *       供 4 个页面 chunk 复用。是本业务唯一的"接口契约声明处"。
 *
 * 【治理说明】本文件由压缩产物重写：变量/函数语义化、格式化、补注释，
 * 逻辑与请求形状**逐字未改**（路径、方法、请求体字段、响应信封均保持原样）。
 *
 * 【接口清单】baseURL 已在入口 chunk 改为同源 "/api/v2"，故下列路径均为相对路径。
 *
 *  #1  GET    /admin/tally/activities              活动列表           → [{id,title,status,createdAt}]
 *  #2  POST   /admin/tally/activities              新建活动 {title}   → 同 #1 的元素
 *  #3  GET    /admin/tally/activities/{id}         活动详情           → {id,title,status,createdAt,updatedAt,candidates[]}
 *  #4  PUT    /admin/tally/activities/{id}         改活动 {title?|status?} → #3 的对象
 *  #5  DELETE /admin/tally/activities/{id}         删活动（级联候选人与记录）
 *  #6  POST   /admin/tally/activities/{id}/candidates  新增候选人 {number,name,displayOrder} → #3
 *  #7  PUT    /admin/tally/candidates/{id}         改候选人 {number,name,displayOrder}     → #3
 *  #8  DELETE /admin/tally/candidates/{id}         删候选人（级联其记录）
 *  #9  POST   /admin/tally/candidates/{id}/vote    录票 {delta}       → {candidate,recordId}
 *  #10 POST   /admin/tally/activities/{id}/undo    撤销上一次录票      → data: true(已撤销) / false(无可撤销)
 *  #11 GET    /admin/tally/activities/{id}/records 操作日志（倒序）    → [{id,candidateNumber,candidateName,delta,type,createdAt}]
 *
 *  WS  wss://<host>/ws/tally/activity/{id}        大屏/控制台实时快照，见 tallyActivityWsUrl
 *
 * 【注意】所有响应都是信封 {code, data, message}；前端一律判断 `resp.data.code === 200`，
 *         HTTP 状态码与业务成败是两回事（401/403 除外，它们由 axios 拦截器单独处理）。
 */
import { http } from "./index-DJrtCu9i.js";

/**
 * 活动列表。GET /admin/tally/activities
 * @returns {Promise<{data:{code:number,data:Array,message:string}}>}
 *          data 为 [{ id, title, status, createdAt }]，status：0 待开始 / 1 进行中 / 2 已结束
 */
export function getAdminTallyActivities() {
  return http.get("/admin/tally/activities");
}

/**
 * 活动详情（含候选人）。GET /admin/tally/activities/{activityId}
 * @param {number|string} activityId 路由参数 :id，活动管理页点"配置候选人"时带过来
 * @returns {Promise} data 为 { id, title, status, createdAt, updatedAt, candidates }
 *          candidates 元素 { id, number, name, displayOrder, voteCount }
 */
export function getAdminTallyActivitiesById(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`);
}

/**
 * 新建活动。POST /admin/tally/activities
 * @param {string} title 活动标题。弹窗里只输入标题；状态固定初始为 0（待开始），
 *                       需要人工切到「进行中」才允许录票。
 */
export function createAdminTallyActivities(title) {
  return http.post("/admin/tally/activities", { title: title });
}

/**
 * 改活动。PUT /admin/tally/activities/{activityId}
 * @param {number|string} activityId
 * @param {{title?:string,status?:0|1|2}} patch 局部更新：
 *        · 活动管理页的状态下拉只传 { status }
 *        · 配置活动页的"改名"弹窗只传 { title }
 */
export function updateAdminTallyActivities(activityId, patch) {
  return http.put(`/admin/tally/activities/${activityId}`, patch);
}

/**
 * 删活动。DELETE /admin/tally/activities/{activityId}
 * 前端会先弹 confirm 二次确认，提示"候选人与唱票记录将一并删除，不可恢复"。
 */
export function deleteAdminTallyActivities(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`);
}

/**
 * 新增候选人。POST /admin/tally/activities/{activityId}/candidates
 * @param {number|string} activityId
 * @param {{number:string,name:string,displayOrder:number}} candidate
 *        number 为展示编号（字符串，如 "01"），displayOrder 决定大屏 x 轴顺序
 */
export function createAdminTallyActivitiesCandidates(activityId, candidate) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, candidate);
}

/**
 * 改候选人。PUT /admin/tally/candidates/{candidateId}
 * 注意这里是**候选人 id**，不是活动 id —— 与新增候选人的入参维度不同，容易踩坑。
 */
export function updateAdminTallyCandidates(candidateId, candidate) {
  return http.put(`/admin/tally/candidates/${candidateId}`, candidate);
}

/**
 * 删候选人。DELETE /admin/tally/candidates/{candidateId}
 * 前端 confirm 文案："其历史唱票记录将一并删除"。
 */
export function deleteAdminTallyCandidates(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`);
}

/**
 * 录票。POST /admin/tally/candidates/{candidateId}/vote
 * @param {number|string} candidateId 候选人 id
 * @param {number} delta 票数增量，**可正可负但不能为 0**。
 *        控制台的 +1/+5/+10/-1 大按钮与"自定义"输入框最终都收敛到这一个调用，
 *        自定义值会先 Math.trunc 截断成整数。
 * @returns {Promise} 成功返回 { candidate, recordId }；控制台成功后立刻
 *          重新拉一次 records 刷新操作日志（不走 WS 回包，避免双源打架）。
 */
export function voteAdminTallyCandidates(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, { delta: delta });
}

/**
 * 撤销上一次录票。POST /admin/tally/activities/{activityId}/undo
 * 撤销是**活动级**而非候选人级：一个活动同一时刻只有一条撤销栈。
 * @returns {Promise} data 为 true（已撤销）/ false（无可撤销操作）。
 *          前端靠这个布尔值区分 toast 文案（success）还是（info）。
 */
export function undoAdminTallyActivities(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`);
}

/**
 * 操作日志。GET /admin/tally/activities/{activityId}/records
 * 后端按 id 倒序返回；控制台自己 slice(0, 20) 只渲染最近 20 条。
 */
export function getAdminTallyActivitiesRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`);
}

/**
 * 大屏 / 控制台的 WebSocket 地址。与源站同构：路径形态保持
 * `/ws/tally/activity/{id}` 不变，只把 host 从 api.xmyzstudent.com 换成本地同源。
 *
 * scheme 随页面协议自动切换：https 页面用 wss，http（本地）页面用 ws。
 * 用同源而非写死 ws://127.0.0.1:port，是为了让手机/局域网真机也能直接连上。
 *
 * @param {number|string} activityId
 * @returns {string} 形如 ws://localhost:5000/ws/tally/activity/1
 */
export function tallyActivityWsUrl(activityId) {
  const scheme = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${scheme}//${window.location.host}/ws/tally/activity/${activityId}`;
}