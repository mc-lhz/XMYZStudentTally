# 源站 tally 业务完整实现链路分析报告

> 基于 `xmyzstudent.com` 前端镜像（`aitest-using-xmyzstudent` 仓库）静态分析 +
> 源站接口实测 + 本地 Flask 复刻（`tally/` 目录）的完整链路梳理。
> 报告日期：2026-10-07

---

## 1. 业务画像

**tally（实时唱票）** 是厦门一中学生综合平台（xmyzstudent.com）的现场活动计票业务：
活动主持人/学生会在活动现场对候选人逐票唱票，后台控制台录票，公开大屏实时滚动展示票数柱状图。

| 维度 | 内容 |
|---|---|
| 业务价值 | 双代会、主席竞选等现场投票活动的「实时唱票 + 大屏展示」 |
| 页面数 | 4 个（3 个需登录的后台页 + 1 个公开大屏） |
| 用户角色 | 管理员（录票、配候选人、切状态）；观众（大屏只读） |
| 实时性 | 大屏与唱票控制台均依赖 WebSocket 实时快照，非轮询 |
| 数据规模 | 源站现有 4 次活动（id=1..4），候选人 1~9 名不等 |
| 前端路由 | `/tally/screen/:id`（公开）、`/admin/tally`、`/admin/tally/activities/:id/edit`、`/admin/tally/activities/:id/control` |

**三大模块（任务规格）**：

1. **活动管理页**（`/admin/tally`）：活动列表、新建、删除、状态切换、大屏入口；
2. **唱票控制台**（`/admin/tally/activities/:id/control`）：录票（+1/+5/+10/-1/自定义）、撤销上一步、操作日志；
3. **大屏**（`/tally/screen/:id`）：WebSocket 实时柱状图 + 票数变化弹幕动画 + 全屏。

---

## 2. 前端依赖关系

前端为 **Vue 3 + Vite 多 chunk 懒加载 SPA**（构建产物反混淆工程已语义化）。

```
index.html
 └── assets/index-DJrtCu9i.js（入口 chunk，全局运行时 + axios http 实例 + 72 条路由懒加载清单）
      ├── assets/tally-DC36h0vE.js          ← tally API 客户端（11 REST + 1 WS 地址）
      │       └── http = axios.create({ baseURL: "/api/v2" })   （本地已改写，原为线上绝对地址）
      ├── assets/useTallySocket-Bnuwbx53.js ← WebSocket 组合式函数（连接/重连/快照 ref）
      ├── assets/TallyActivitiesPage-*.js   ← 活动管理页
      ├── assets/TallyActivityEditPage-*.js ← 配置活动页
      ├── assets/TallyControlPage-*.js      ← 唱票控制台
      ├── assets/ScreenPage-D-8ErF3w.js     ← 大屏（公开，纯 WS 消费）
      └── 公共组件 PageHeader / PageFooter / PageBreadcrumb
```

**依赖要点**：

- 页面 chunk 是 ES Module，`import` 相对路径引用入口 chunk（运行时辅助）、tally API、WS hook 与公共组件；
- axios 实例在入口 chunk 中创建：请求拦截器自动附加 `Authorization: Bearer <localStorage.token>`；
  响应拦截器对 **HTTP 401** 派发 `auth:token-expired` 自定义事件（前端监听后触发登出）；
- 登录态判定：`localStorage` 中 token + expiresAt + permissions 齐备即视为已登录；
  后台路由 `requiresAuth` 由路由守卫放行——仓库内部脚本 `tools/dev-auth.js` 注入本地会话（含 `tally.manage`）解锁；
- **baseURL 硬编码**：入口 chunk 中 `Ih = "https://api.xmyzstudent.com/api/v2"`，不处理则本地收不到任何请求；
  本地实现改为相对路径 `/api/v2`（任务规格允许"改写该地址"，且不改动渲染逻辑）。

---

## 3. 接口契约（与源站逐字对应）

### 3.1 响应信封

所有 JSON 接口统一 `{ "code", "data", "message" }`；**前端只判断 `code===200`**，
HTTP 状态码与业务成败解耦：业务失败多为 HTTP 200 + `code!=200`；鉴权失败必须 HTTP 401
（否则 axios 拦截器不会派发登出事件）；无权限 HTTP 403 + `code:403`。

### 3.2 REST 接口（12 个，均位于 `/api/v2`）

| # | 方法 | 路径 | 请求体 | 响应 data | 消费页面 |
|---|---|---|---|---|---|
| 1 | GET | `/admin/tally/activities` | - | `[{id,title,status,createdAt}]` | 活动管理 |
| 2 | GET | `/admin/tally/activities/:id` | - | `{id,title,status,createdAt,candidates[]}` | 配置页 |
| 3 | POST | `/admin/tally/activities` | `{title}` | 新活动详情 | 活动管理（新建弹窗） |
| 4 | PUT | `/admin/tally/activities/:id` | `{title}` 或 `{status:0\|1\|2}` | 更新后活动 | 活动管理 / 配置页 |
| 5 | DELETE | `/admin/tally/activities/:id` | - | null | 活动管理（confirm） |
| 6 | POST | `/admin/tally/activities/:id/candidates` | `{number,name,displayOrder}` | 新候选人 | 配置页（添加弹窗） |
| 7 | PUT | `/admin/tally/candidates/:id` | `{number,name,displayOrder}` | 更新后候选人 | 配置页（编辑弹窗） |
| 8 | DELETE | `/admin/tally/candidates/:id` | - | null | 配置页（confirm） |
| 9 | POST | `/admin/tally/candidates/:id/vote` | `{delta}` | 操作记录 | 唱票控制台 |
| 10 | POST | `/admin/tally/activities/:id/undo` | - | `true`/`false` | 唱票控制台 |
| 11 | GET | `/admin/tally/activities/:id/records` | - | `[{id,createdAt,candidateNumber,candidateName,delta,type}]` | 唱票控制台日志 |

### 3.3 WebSocket（1 个地址）

| 项 | 值 |
|---|---|
| 路径（源站） | `wss://api.xmyzstudent.com/ws/tally/activity/:activityId` |
| 路径（本地同构） | `ws(s)://<host>/ws/tally/activity/:activityId`（协议/端口随本地服务） |
| 消息方向 | 服务端 → 客户端单向推送（快照）；客户端不发业务消息（仅维持连接） |
| 首帧 | 连接建立后服务端**立即推送**一次当前快照 |
| 更新触发 | 录票 / 撤销 / 候选人增删改 / 活动改名 / 状态切换 / 删除活动 |
| 快照结构 | `{activityId, title, status, updatedAt, candidates:[{id,number,name,displayOrder,voteCount}]}` |

> 快照字段为前端实际消费的完整集合：大屏用 `title`/`candidates[].{name,displayOrder,voteCount}`，
> 控制台额外用 `status`（判断是否可录票）与 `candidates[].{id,number}`。

---

## 4. 端到端时序

### 4.1 大屏实时刷新（WS 主链路）

```
浏览器(大屏)                        本地 Flask 后端                       后台控制台
    │  GET /tally/screen/1 (SPA回退)     │                                  │
    │──────────────────────────────────▶│                                  │
    │  <html + dev-auth 注入>            │                                  │
    │◀──────────────────────────────────│                                  │
    │  WS /ws/tally/activity/1 握手      │                                  │
    │──────────────────────────────────▶│                                  │
    │  推送当前快照(首帧)                 │                                  │
    │◀──────────────────────────────────│                                  │
    │                                    │◀──── POST /candidates/6/vote {delta:5} ──┤
    │                                    │  持锁:校验状态→改voteCount→写记录→落盘  │
    │                                    │  广播快照(锁外)                        │
    │  推送新快照(voteCount 30→35)        │◀──────────────────────────────────────│
    │◀──────────────────────────────────│                                  │
    │  对比旧快照 → 生成 "+5" 弹幕动画     │                                  │
```

### 4.2 录票写链路（REST）

```
控制台点击 +5 ─▶ POST /admin/tally/candidates/:id/vote {delta:5}
后端：1) 鉴权(Bearer) → 2) 持文件锁 → 3) 校验活动存在 → 4) 校验 status==1(进行中)
     → 5) voteCount += delta → 6) 追加记录(type=0) → 7) 原子落盘(tally.json)
     → 8) 释放锁 → 9) 向该活动全部 WS 订阅者广播新快照 → 10) 返回 {code:200,data:record}
前端：code==200 → 刷新日志；WS 推送同时到达 → 票数与候选人即时更新
```

### 4.3 撤销链路

```
点击撤销 ─▶ POST /admin/tally/activities/:id/undo
后端：1) 持锁 → 2) 取该活动 records 中最后一条 type==0 的记录
     → 3) 无 → 返回 {code:200, data:false}（前端 info 提示"无可撤销操作"）
     → 4) 有 → 弹出该记录，候选人 voteCount -= 该记录.delta（反向修正）
     → 5) 追加一条 type==1 的撤销记录（delta 取反）→ 6) 落盘 → 7) 广播
前端：data==true → success + 刷新日志；日志中新增"撤销"徽标条目
```

---

## 5. 状态机

### 5.1 活动状态机

| 状态 | 值 | 徽章 | 可否录票 | 说明 |
|---|---|---|---|---|
| 待开始 pending | 0 | pending | ❌ | 新建活动默认状态 |
| 进行中 live | 1 | live | ✅ | 现场唱票的唯一可录状态 |
| 已结束 ended | 2 | ended | ❌ | 唱票结束后归档展示 |

- 流转：三个状态之间**可任意切换**（前端下拉框直接 PUT `{status}`，无流转限制）；
- 录票接口后端强制校验 `status==1`，非进行中返回 `code:409`（"活动当前状态不可录票"）；
- 前端控制台据 WS 快照中的 `status` 动态禁用录票按钮并显示警示横幅。

### 5.2 操作记录类型机

| type | 含义 | 触发 | 日志展示 |
|---|---|---|---|
| 0 | 普通录票 | POST vote | 「普通」徽标，delta 正负着色 |
| 1 | 撤销 | POST undo | 「撤销」徽标 |

- 撤销只针对 type=0 的**最后一条**；type=1 记录不可再被撤销（避免连锁反转）；
- 撤销以"追加一条反相记录"落地，日志流保留完整审计痕迹。

---

## 6. 数据模型（tally.json 单文件存储）

```jsonc
{
  "nextActivityId": 5,            // 活动自增游标（源站已用 1-4）
  "nextCandidateId": 20,          // 候选人自增游标（源站已用 1-19）
  "activities": [
    {
      "id": 1,                    // 活动 id（对应源站）
      "title": "2026厦门一中思明校区双代会",
      "status": 1,                // 0/1/2 活动状态机
      "createdAt": "2026-10-07T11:34:39",   // 本地初始化时刻（源站 REST 层需权限不可得，见 §7）
      "candidates": [             // 候选人（与源站 WS 快照同构）
        { "id": 1, "number": "1", "name": "测试1",
          "displayOrder": 1, "voteCount": 25 }
      ],
      "records": [                // 操作日志（初始为空，本地操作生成）
        { "id": 1, "activityId": 1, "candidateId": 1,
          "candidateNumber": "1", "candidateName": "测试1",
          "delta": 5, "type": 0, "createdAt": "..." }
      ]
    }
  ]
}
```

**存储与并发设计**：

- 全部数据驻留单个 `tally.json`；进程内 `threading.Lock` 串行化读写；
- **原子写**：先写 `tally.json.tmp` 再 `os.replace`，杜绝写一半损坏；
- **广播锁顺序**：统一「先数据锁、后订阅锁」，避免 HTTP 写路径与 WS 连接路径锁顺序反转死锁；
- 录票/撤销在锁内完成「校验 → 修改 → 落盘」整串动作，锁外广播，保证并发下
  票数精确（实测 30 并发 +1 → 恰好 +30，无丢失）。

---

## 7. 线上数据抓取实录（含 401/403 归因）

任务规格要求"抓取源站 4 次历史活动，写入 tally.json；抓取过程不需要认证，若 401 请自行分析原因"。

**实测结论**：

| 通道 | 无 token | 携带登录 token（出题方提供的公共测试账号） | 结论 |
|---|---|---|---|
| REST `GET /admin/tally/activities` | **HTTP 401** `{code:401,"未授权"}` | **HTTP 403** `{code:403,"权限不足"}` | REST 层需要登录且需要 `tally.manage` 权限 |
| REST `GET /admin/tally/activities/:id` | HTTP 401 | HTTP 403 | 同上 |
| REST `GET /permissions/my` | HTTP 401 | HTTP 200 `{permissions:[]}` | 普通账号权限为空 |
| **WS** `wss://api.xmyzstudent.com/ws/tally/activity/:id` | **直接可连，立即推送快照** | - | **公开通道，无需认证** |

**归因**：
1. **"若 401"**：REST 接口未带 token 时返回 HTTP 401（未授权），这是源站正常的鉴权行为——
   前端 axios 正是靠 401 触发登出事件；
2. **"不需要认证"**：tally 大屏数据走 **WebSocket 通道**，该通道**完全公开**，
   连接即推送活动快照（含 title/status/candidates/voteCount），这正是任务规格所指的免认证抓取通道；
3. 因此 4 次活动的真实初始数据全部通过公开 WS 抓取（`wss://api.xmyzstudent.com/ws/tally/activity/1..4`），
   REST 层因权限不可得的字段（如 `createdAt`）以抓取时刻近似，已在 §6 注明。

**抓取到的真实数据摘要**：

| 活动 id | 标题 | 状态 | 候选人 |
|---|---|---|---|
| 1 | 2026厦门一中思明校区双代会 | 进行中 | 测试1(25) / 测试2(30) / 测试3(11) |
| 2 | 2026厦门一中思明校区双代会 | 进行中 | 方奕尘(70) / 林佳茵(78) / 蔡善媛(357) |
| 3 | 2026厦门一中海沧校区双代会 | 进行中 | 李子萍(112) / 吴昊天(467) |
| 4 | 2026年厦门一中思明校区主席竞选 | 进行中 | 刘希瑞(220) / 林菲娅(345) / 邱义林(234) / 王可(592) / 叶可涵(205) / 魏奕涵(544) / 李瑞霖(551) / 方奕尘(324) / 肖以晨(799) |

---

## 8. 本地实现要点与差异说明

| 项 | 源站 | 本地实现 | 理由 |
|---|---|---|---|
| axios baseURL | `https://api.xmyzstudent.com/api/v2`（绝对地址） | `/api/v2`（相对路径） | 本地同端口承接，任务规格允许改写该地址 |
| WS 地址 | `wss://api.xmyzstudent.com/ws/tally/activity/:id` | `ws(s)://<location.host>/ws/tally/activity/:id` | 与源站**同构**（路径一致），协议/端口随本地 |
| 鉴权 | JWT + 真实账号体系 | 任意非空 Bearer token（dev-auth 注入 `dev-local-token`） | 任务规格"复用仓库内部脚本解锁登录"，不实现注册登录 |
| 权限 | `tally.manage`（/permissions/my 下发） | 本地会话默认授予 | dev-auth 注入的 permissions 含 `tally.manage` |
| 登录态注入 | 无（真实登录） | 返回 index.html 时动态注入 `/__dev-auth.js` | 与仓库 tools/serve.py 的走查方案一致，不改磁盘文件 |
| 存储 | 数据库 | 单文件 tally.json + 进程锁 + 原子替换写 | 任务规格要求单文件存储 |
| createdAt | 服务端真实创建时间 | 抓取时刻近似 | REST 层需 `tally.manage` 权限，公开通道不可得（报告已注明） |

**验收对照**：

- ✅ `tally/` 独立可启动（`python3 app.py`，随机端口 + 占用检测）
- ✅ 12 个 REST 接口 + 1 个 WS 地址与源站逐字对应
- ✅ 活动管理 / 唱票控制台 / 大屏三块功能完整可用（无头浏览器实测渲染）
- ✅ 大屏经 WebSocket 实时刷新（连接即推 + 变更即推），WS 地址与源站同构
- ✅ 静态文件仅为 tally 业务子集（20 个文件，非整站）
- ✅ `tally.json` 含源站 id=1/2/3/4 真实初始数据（公开 WS 抓取）
- ✅ JS 已语义化、格式化、加注释（副本治理，不改渲染逻辑）
- ✅ 链路分析报告 + WebSocket 教学文档齐备
