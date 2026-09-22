/*!
 * 模块：tally（tally-DC36h0vE.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/tally-DC36h0vE.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 *
 * ── 业务说明 ─────────────────────────────────────────────────────────────
 * 本文件是「tally 选票（实时唱票）」业务的前端 API 封装层。
 * 线下（in-person）唱票时，现场主持人一边念选票一边在「唱票控制台」录票，
 * 大屏实时同步展示各候选人票数。所有增删改查都走 REST，实时刷新走 WebSocket。
 *
 * ── 与后端的接口契约（本地 Flask 后端已逐字复刻）───────────────────────────
 * 前端通过全局 axios 实例 `http`（定义于 index-DJrtCu9i.js）发请求，
 * 其 baseURL 已被本地部署改为同源相对路径 "/api/v2"，故请求形态为：
 *     GET/POST/PUT/DELETE  http://<host>:5001/api/v2/admin/tally/...
 * 后端统一返回 {code, message, data}，code=200 表示成功。
 *
 *  ┌──────┬────────────────────────────────────────────────────────┬──────────┐
 *  │ 函数 │ REST 接口                                            │ 调用场景  │
 *  ├──────┼────────────────────────────────────────────────────────┼──────────┤
 *  │ zz0  │ GET  /admin/tally/activities                          │ 活动列表  │
 *  │ zz1  │ GET  /admin/tally/activities/:id                      │ 活动详情  │
 *  │ zz2  │ POST /admin/tally/activities        body:{title}      │ 新建活动  │
 *  │ zz3  │ PUT  /admin/tally/activities/:id    body:{title|status}│ 改名/状态 │
 *  │ zz4  │ DELETE /admin/tally/activities/:id                   │ 删除活动  │
 *  │ zz5  │ POST /admin/tally/activities/:id/candidates           │ 加候选人  │
 *  │ zz6  │ PUT  /admin/tally/candidates/:id                      │ 改候选人  │
 *  │ zz7  │ DELETE /admin/tally/candidates/:id                    │ 删候选人  │
 *  │ zz8  │ POST /admin/tally/candidates/:id/vote  body:{delta}    │ 现场录票  │
 *  │ zz9  │ POST /admin/tally/activities/:id/undo                 │ 撤销上一步│
 *  │ zz10 │ GET  /admin/tally/activities/:id/records              │ 操作日志  │
 *  │ zz11 │ WS  /ws/tally/activity/:id   （推送大屏/控制台快照）   │ 实时刷新  │
 *  └──────┴────────────────────────────────────────────────────────┴──────────┘
 *
 * ── 本地化适配（与源站唯一差异）─────────────────────────────────────────────
 * zz11 原实现返回 wss://api.xmyzstudent.com/ws/tally/activity/:id（指向线上生产）。
 * 本地复刻改为基于当前页面 host 动态拼接，浏览器访问 http://localhost:5001 时即
 * 得到 ws://localhost:5001/ws/tally/activity/:id，与源站路径同构。
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";

/** zz0 —— 获取活动列表（活动管理页 /admin/tally 打开时调用） */
function zz0() {
  return http.get("/admin/tally/activities");
}

/** zz1 —— 获取单个活动详情（含候选人数组）（配置页 /admin/tally/activities/:id/edit 调用） */
function zz1(val) {
  return http.get(`/admin/tally/activities/${val}`);
}

/** zz2 —— 新建活动，仅需标题，后端默认 status=0（待开始） */
function zz2(val) {
  return http.post("/admin/tally/activities", {
    title: val
  });
}

/**
 * zz3 —— 更新活动。
 * 支持两个字段（可只传其一）：
 *   { title }  改名（配置页「改名」弹窗）
 *   { status } 状态切换（0=待开始 1=进行中 2=已结束，列表页下拉/配置页选择器）
 */
function zz3(val, val2) {
  return http.put(`/admin/tally/activities/${val}`, val2);
}

/** zz4 —— 删除活动（后端级联清理该活动的候选人、操作日志；列表页「删除」按钮） */
function zz4(val) {
  return http.delete(`/admin/tally/activities/${val}`);
}

/** zz5 —— 给活动添加候选人，body:{number, name, displayOrder}（配置页「添加候选人」弹窗） */
function zz5(val, val2) {
  return http.post(`/admin/tally/activities/${val}/candidates`, val2);
}

/** zz6 —— 更新候选人（配置页「编辑候选人」弹窗） */
function zz6(val, val2) {
  return http.put(`/admin/tally/candidates/${val}`, val2);
}

/** zz7 —— 删除候选人（级联清理其历史录票记录；配置页表格「删除」按钮） */
function zz7(val) {
  return http.delete(`/admin/tally/candidates/${val}`);
}

/**
 * zz8 —— 现场录票。
 * body:{ delta } 可为正（+票）或负（−票）：控制台快捷键 +1/+5/+10/−1 与自定义输入都走这里。
 * 每笔录票后端都会写一条操作日志（type=0），供「撤销上一步」回滚。
 */
function zz8(val, val2) {
  return http.post(`/admin/tally/candidates/${val}/vote`, {
    delta: val2
  });
}

/** zz9 —— 撤销最近一次录票（后端把该记录标记为已撤销，并追加负向补偿记录） */
function zz9(val) {
  return http.post(`/admin/tally/activities/${val}/undo`);
}

/** zz10 —— 获取操作日志，createdAt 倒序（控制台「操作日志」区，最多展示 20 条取前段） */
function zz10(val) {
  return http.get(`/admin/tally/activities/${val}/records`);
}

/**
 * zz11 —— 构造实时唱票 WebSocket 地址（useTallySocket 用原生 new WebSocket(此URL) 连接）。
 * 原源站实现固定返回 wss://api.xmyzstudent.com/ws/tally/activity/:id。
 * 本地复刻改为与当前页面同 host，保证浏览器访问 localhost:5001 时连接本地后端。
 */
function zz11(val) {
  const wsScheme = location.protocol === "https:" ? "wss" : "ws";
  return `${wsScheme}://${location.host}/ws/tally/activity/${val}`;
}
/* index 运行时导出（已语义化） */
export { zz0 as getAdminTallyActivities, zz11 as tallyActivityWsUrl, zz2 as createAdminTallyActivities, zz3 as updateAdminTallyActivities, zz4 as deleteAdminTallyActivities, zz1 as getAdminTallyActivitiesById, zz5 as createAdminTallyActivitiesCandidates, zz6 as updateAdminTallyCandidates, zz7 as deleteAdminTallyCandidates, zz10 as getAdminTallyActivitiesRecords, zz9 as undoAdminTallyActivities, zz8 as voteAdminTallyCandidates };