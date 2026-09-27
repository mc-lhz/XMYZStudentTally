/**
 * tally 接口封装 —— 可读化版本（由源站压缩产物治理而来）
 *
 * 职责：集中定义 tally（实时唱票）业务全部后端接口，供活动管理页 / 配置页 / 控制台 / 大屏调用。
 * 来源：源站 https://xmyzstudent.com/assets/tally-BvCEJ8Iv.js
 *
 * 接口契约（与源站逐字对应）：
 *   1. listActivities()                        GET    /admin/tally/activities
 *   2. getActivity(id)                         GET    /admin/tally/activities/{id}
 *   3. createActivity(title)                   POST   /admin/tally/activities
 *   4. updateActivity(id, patch)               PUT    /admin/tally/activities/{id}
 *   5. deleteActivity(id)                      DELETE /admin/tally/activities/{id}
 *   6. addCandidate(id, candidate)             POST   /admin/tally/activities/{id}/candidates
 *   7. updateCandidate(candidateId, patch)     PUT    /admin/tally/candidates/{candidateId}
 *   8. deleteCandidate(candidateId)            DELETE /admin/tally/candidates/{candidateId}
 *   9. vote(candidateId, delta)                POST   /admin/tally/candidates/{candidateId}/vote
 *  10. undo(activityId)                        POST   /admin/tally/activities/{id}/undo
 *  11. listRecords(activityId)                 GET    /admin/tally/activities/{id}/records
 *  12. snapshotUrl 之外，公开只读快照走        GET    /tally/activities/{id}/snapshot
 *  13. WS 地址构造 tallySocketUrl(id)          WS     /ws/tally/activity/{id}
 *
 * 本地化改写（仅 1 处，不涉及业务语义）：
 *   源站 WS 地址硬编码 wss://api.xmyzstudent.com，这里改为同源 ws(s)://<当前 host>，
 *   路径部分 /ws/tally/activity/{id} 与源站逐字一致（验收项「WS 地址与源站同构」）。
 *
 * 响应信封：{code, message, data}；请求头 Authorization: Bearer <token>
 * （token 由入口 bundle 的 axios 拦截器从 localStorage.token 自动注入）。
 */

// http 即入口 bundle 中配置好 baseURL 与鉴权拦截器的 axios 实例（源站导出名 D）
import { D as http } from './index-D2vbWxba.js'

/** 活动列表：GET /admin/tally/activities -> data: Activity[] */
function listActivities() {
  return http.get('/admin/tally/activities')
}

/** 活动详情（含候选人）：GET /admin/tally/activities/{id} */
function getActivity(activityId) {
  return http.get(`/admin/tally/activities/${activityId}`)
}

/** 新建活动：POST /admin/tally/activities，请求体 {title} */
function createActivity(title) {
  return http.post('/admin/tally/activities', { title: title })
}

/** 更新活动（改名 / 切状态）：PUT /admin/tally/activities/{id}，请求体 {title?, status?} */
function updateActivity(activityId, patch) {
  return http.put(`/admin/tally/activities/${activityId}`, patch)
}

/** 删除活动（级联删除候选人与唱票记录）：DELETE /admin/tally/activities/{id} */
function deleteActivity(activityId) {
  return http.delete(`/admin/tally/activities/${activityId}`)
}

/** 新增候选人：POST /admin/tally/activities/{id}/candidates，请求体 {number, name, displayOrder} */
function addCandidate(activityId, candidate) {
  return http.post(`/admin/tally/activities/${activityId}/candidates`, candidate)
}

/** 编辑候选人：PUT /admin/tally/candidates/{candidateId}，请求体 {number?, name?, displayOrder?} */
function updateCandidate(candidateId, patch) {
  return http.put(`/admin/tally/candidates/${candidateId}`, patch)
}

/** 删除候选人：DELETE /admin/tally/candidates/{candidateId} */
function deleteCandidate(candidateId) {
  return http.delete(`/admin/tally/candidates/${candidateId}`)
}

/** 现场录票：POST /admin/tally/candidates/{candidateId}/vote，请求体 {delta}（增量，可为负） */
function voteCandidate(candidateId, delta) {
  return http.post(`/admin/tally/candidates/${candidateId}/vote`, { delta: delta })
}

/** 撤销最近一次录票：POST /admin/tally/activities/{id}/undo；data 为空表示无可撤销操作 */
function undoLastVote(activityId) {
  return http.post(`/admin/tally/activities/${activityId}/undo`)
}

/** 操作日志（倒序，前端只展示最近 20 条）：GET /admin/tally/activities/{id}/records */
function listRecords(activityId) {
  return http.get(`/admin/tally/activities/${activityId}/records`)
}

/**
 * 大屏实时通道地址：ws(s)://<当前站点>/ws/tally/activity/{id}
 * 源站为 wss://api.xmyzstudent.com/ws/tally/activity/{id}，
 * 本地实现只把 origin 同源化，路径与源站同构。
 */
function tallySocketUrl(activityId) {
  const wsOrigin =
    window.__TALLY_WS_ORIGIN__ ||
    (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host
  return `${wsOrigin}/ws/tally/activity/${activityId}`
}

// 导出名必须与源站 chunk 的导出映射逐字一致，否则其它模块 import 不到
export {
  listActivities as a,
  tallySocketUrl as b,
  createActivity as c,
  updateActivity as d,
  deleteActivity as e,
  getActivity as f,
  addCandidate as g,
  updateCandidate as h,
  deleteCandidate as i,
  listRecords as j,
  undoLastVote as k,
  voteCandidate as l,
}
