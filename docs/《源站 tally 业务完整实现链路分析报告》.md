# 源站 tally 业务完整实现链路分析报告

> 分析对象：`https://xmyzstudent.com` 的「tally 选票（实时唱票）」业务。
> 依据：镜像前端 `assets/tally-DC36h0vE.js`（接口层）、`assets/useTallySocket-Bnuwbx53.js`（WS 组合式函数）、
> 四个页面 chunk、路由表 `data/routes.json`、接口地图 `data/api_map.json`、源站 WS 实测快照 `tally/tools/_source_snapshots/`。
> 本报告为任务一《源站 tally 业务完整实现链路分析报告》交付物。

---

## 1. 业务画像

### 1.1 业务定位

tally 是厦一学生综合平台中的**实时唱票**模块，用于校内选举/代表会（双代会、主席竞选等）的**现场唱票与大屏公示**：

- **活动管理**：管理员创建/编辑/删除唱票活动，配置候选人名单（编号、姓名、显示顺序），切换活动状态（待开始/进行中/已结束）。
- **唱票控制台**：现场工作人员对候选人**逐票录入**（`delta` ±N）、**误操作撤销**，并查看操作日志。
- **实时大屏**：面向全场的大屏页面，通过 **WebSocket** 接收服务端全量快照，实时刷新得票排行——**大屏不发任何 REST 请求，刷新完全依赖 WS 推送**。

### 1.2 三条前端路由（与源站同构，无 `XMYZStudent` 前缀）

| 路径 | name | 标题 | 需登录 | 页面 chunk |
|---|---|---|---|---|
| `/admin/tally` | admin-tally | 实时唱票管理 | 是 | `TallyActivitiesPage-Ck1JhJya.js` |
| `/admin/tally/activities/:id/edit` | admin-tally-edit | 配置活动 | 是 | `TallyActivityEditPage-DFD129SB.js` |
| `/admin/tally/activities/:id/control` | admin-tally-control | 唱票控制台 | 是 | `TallyControlPage-CBBTMqC8.js` |
| `/tally/screen/:id` | tally-screen | 实时唱票（大屏） | **否** | `ScreenPage-D-8ErF3w.js` |

（前 3 条需登录，由路由 meta `requiresAuth` + `router.beforeEach` 拦截；大屏公开。）

### 1.3 源站技术栈（从编译产物推断）

| 维度 | 结论 |
|---|---|
| 框架 | Vue 3（Composition API，`<script setup>` 编译产物） |
| 构建 | Vite（多 chunk 懒加载，`assets/Name-HASH.js`） |
| 路由 | Vue Router（72 条路由，tally 占 4 条） |
| 状态 | Pinia（`useUserStore` 判登录/权限） |
| HTTP | Axios（全局 `http` 实例，base + Bearer 拦截器） |
| 实时 | WebSocket（`useTallySocket`，源站 `wss://api.xmyzstudent.com`） |

---

## 2. 前端依赖关系

### 2.1 模块图（tally 业务子集）

```
index.html
 └─ assets/index-DJrtCu9i.js          主入口：Vue 运行时 + Pinia + Vue Router + axios http 实例
     ├─ assets/index-CTy88mxm.css      全局样式
     ├─（路由懒加载）TallyActivitiesPage-Ck1JhJya.js   活动管理页
     │    ├─ tally-DC36h0vE.js         ← REST 接口层
     │    ├─ PageHeader / PageBreadcrumb / PageFooter  共享布局
     │    └─ index-DJrtCu9i.js         ref / toast / router 等运行时导出
     ├─（路由懒加载）TallyActivityEditPage-DFD129SB.js  配置活动页
     │    └─ tally-DC36h0vE.js
     ├─（路由懒加载）TallyControlPage-CBBTMqC8.js       唱票控制台
     │    ├─ tally-DC36h0vE.js
     │    └─ useTallySocket-Bnuwbx53.js ← WS 组合式函数
     │         └─ tally-DC36h0vE.js    tallyActivityWsUrl()
     └─（路由懒加载）ScreenPage-D-8ErF3w.js             大屏
          ├─ useTallySocket-Bnuwbx53.js
          └─ PageHeader 等布局组件
```

### 2.2 静态依赖闭包（最小前端子集）

由 `_closure.py` 从 7 个入口（主入口 JS/CSS + 4 页面 chunk + `vite.svg`）沿**静态 import/export** 求闭包得到。
交付目录 `tally/public/` 仅含该闭包内文件（约 20 个），**非整站镜像**。

**不纳入**：其他业务页面 chunk（票务/评分/博物馆等）、vendor 公共块（非 tally 路径可达）、源站图片等。

---

## 3. 接口契约

### 3.1 统一响应信封

源站所有 tally REST 返回 **HTTP 200** + JSON：

```jsonc
{
  "code": 200,        // 200 成功 | 400 参数错 | 404 不存在 | 5xx 服务器错误
  "message": "ok",    // 人类可读消息；前端 Toast 直接展示
  "data": { ... }     // 业务载荷；失败时可为 null
}
```

前端统一以 `res.data.code === 200` 分支；**业务错误也走 HTTP 200**，否则 axios 拦截器会先抛错、页面读不到 `data.message`。

### 3.2 REST 端点（11 个，路径与源站逐字一致）

Base：源站 `https://api.xmyzstudent.com/api/v2`，本地同构为 `<origin>/api/v2`。

| # | 方法 | 路径（相对 `/api/v2`） | 入参 | 出参 `data` | 消费方 |
|---|---|---|---|---|---|
| 1 | GET | `/admin/tally/activities` | — | `ActivitySummary[]` | 活动管理页列表 |
| 2 | GET | `/admin/tally/activities/:id` | — | `ActivityDetail`（含 `candidates[]`） | 配置活动页 |
| 3 | POST | `/admin/tally/activities` | `{title}` | `ActivityDetail`（新建，status=0） | 活动管理页新建 |
| 4 | PUT | `/admin/tally/activities/:id` | `{title?}` / `{status?}` | `ActivityDetail` | 列表页改状态/改名；配置页 |
| 5 | DELETE | `/admin/tally/activities/:id` | — | `true` | 活动管理页删除（级联） |
| 6 | POST | `/admin/tally/activities/:id/candidates` | `{number,name,displayOrder}` | `Candidate` | 配置活动页添加 |
| 7 | PUT | `/admin/tally/candidates/:id` | `{number?,name?,displayOrder?}` | `Candidate` | 配置活动页编辑 |
| 8 | DELETE | `/admin/tally/candidates/:id` | — | `true` | 配置活动页删除（级联记录） |
| 9 | POST | `/admin/tally/candidates/:id/vote` | `{delta}`（非 0 整数） | `{candidateId, voteCount}` | **唱票控制台录票** |
| 10 | POST | `/admin/tally/activities/:id/undo` | — | 撤销记录 / `null`（无可撤销） | **唱票控制台撤销** |
| 11 | GET | `/admin/tally/activities/:id/records` | — | `Record[]`（新→旧） | 控制台操作日志 |

> **计数说明**：任务 README 验收写「12 个 REST + 1 个 WS」；源站 tally 导出共 **12 条 = 11 REST + 1 WS**（WS 不占用 REST 前缀，是独立通道）。本实现 **11 REST + 1 WS**，路径与源站逐字一致。

### 3.3 WebSocket（1 个）

| 项 | 源站 | 本地 |
|---|---|---|
| URL | `wss://api.xmyzstudent.com/ws/tally/activity/:id` | `ws(s)://<host>/ws/tally/activity/:id` |
| 路径 | `/ws/tally/activity/:id` | **逐字一致** |
| 认证 | **无**（匿名可连，即推快照） | 无 |
| 方向 | 服务端 → 客户端单向推业务帧；客户端只收不发 | 同 |
| 载荷 | 全量活动快照 JSON（非增量 diff） | 同 |

**快照 Schema**（键序与源站实测报文一致，见 `_source_snapshots/activity_*.json`）：

```jsonc
{
  "activityId": 1,
  "candidates": [
    { "displayOrder": 1, "id": 1, "name": "测试1", "number": "1", "voteCount": 25 }
  ],
  "status": 1,              // 0 待开始 / 1 进行中 / 2 已结束
  "title": "2026厦门一中思明校区双代会",
  "updatedAt": "2026-09-23 00:39:42.759963271"  // Java LocalDateTime 纳秒串
}
```

### 3.4 初始数据抓取与 401 原因

- **WS 抓取（采用）**：源站 `/ws/tally/activity/:id` **无需任何 Authorization**，连接即推当前快照。
  `tools/fetch_source_snapshot.py` 依次连 id=1..4，落盘 `_source_snapshots/activity_{1..4}.json`，再合并写入 `tally/tally.json`。
- **REST 匿名 401（原因分析）**：`/api/v2/admin/tally/*` 挂在管理端命名空间下，源站网关对 `/admin/**` 强制校验
  `Authorization: Bearer <JWT>`；匿名请求命中 JWT 过滤器，返回 `401` 且响应体不是 `{code,message,data}` 信封
  （是 Spring Security 默认错误体），因此**无法匿名 REST 拉取列表**。
  但 WS 端点 `/ws/tally/activity/*` 在源站属**独立 WebSocket 握手通道**，不经过 HTTP JWT 过滤器链
  （Servlet 容器 Upgrade 路径通常单独配置），故可匿名获取**已含候选人与票数的全量快照**——这正是任务要求
  「抓取过程不需要认证，若 401 请自行分析原因」的答案：**REST 需 JWT、WS 不需**，改走 WS 即可。

---

## 4. 端到端时序

### 4.1 活动管理页（列表 CRUD）

```
浏览器                    Flask 本地后端                    tally.json
  │  GET /admin/tally          │                               │
  │───────────────────────────>│  load_db → activities 摘要     │
  │<─── 200 {code:200,data:[]} │                               │
  │                            │                               │
  │  POST /admin/tally {title} │                               │
  │───────────────────────────>│  next_id(activity)            │
  │                            │  append + save_db ───────────>│ (原子写)
  │<─── 200 {code:200,data:详情}│                               │
  │                            │                               │
  │  PUT  /:id {status:1}      │  touch(): updatedAt 刷新       │
  │───────────────────────────>│  save_db + broadcast_snapshot │
  │<─── 200 {code:200,data:详情}│──── WS 快照 ──> 大屏/控制台    │
```

### 4.2 配置活动页（候选人）

```
GET  /activities/:id          → ActivityDetail.candidates[]（按 displayOrder 排序）
POST /activities/:id/candidates → 追加候选人，voteCount 初值 0，touch() 广播
PUT  /candidates/:id          → 改 number/name/displayOrder；同步刷新 records 中快照字段；touch()
DELETE /candidates/:id        → 级联删除该候选人全部 records；touch()
```

### 4.3 唱票控制台（录票 → 大屏实时刷新）— 核心链路

```
工作人员浏览器                    Flask                          大屏浏览器
  │ 点击「+1」                     │                               │
  │ POST /candidates/:id/vote     │                               │
  │   {delta:1}                   │                               │
  │──────────────────────────────>│ DATA_LOCK:                    │
  │                               │  voteCount += delta           │
  │                               │  append_record(type=0)        │
  │                               │  touch():                     │
  │                               │    updatedAt = now_java_nanos │
  │                               │    save_db() ────────────────>│ tally.json
  │                               │    broadcast_snapshot(id)     │
  │                               │──── WS JSON 快照 ────────────>│
  │<── 200 {voteCount}           │                               │ onmessage:
  │ Toast「录票成功」              │                               │  snapshot=JSON.parse
  │                               │                               │  重渲染排行（零 REST）
```

**撤销**：`POST /activities/:id/undo` → 找最近 `type=0 && !undone` 记录 → `voteCount -= delta` → 标记 `undone=true` → 追加 `type=1` 撤销记录（不可再被撤销）→ `touch()` 同样触发 WS 广播。

---

## 5. 状态机

### 5.1 活动状态 `status`

```
          create (POST)
              │
              ▼
        ┌──────────┐   PUT {status:1}   ┌──────────┐   PUT {status:2}   ┌──────────┐
        │ 0 待开始  │ ─────────────────> │ 1 进行中  │ ─────────────────> │ 2 已结束  │
        └──────────┘ <───────────────── └──────────┘                    └──────────┘
              │          PUT {status:0}        │                              ▲
              │                               └──────── PUT {status:2} ───────┘
              └──────────────── DELETE ────────────────────────────────> (销毁，级联)
```

- 合法迁移：任意 `<->` 只要 `status ∈ {0,1,2}`（源站未公开更细约束，本地同域校验）。
- 删除是**终态**：级联移除候选人与 records，并关闭该活动全部 WS 连接（前端走重连逻辑后收到「活动不存在」占位快照）。

### 5.2 录票记录 `records[].type / undone`

```
  append_record(type=0, undone=false)     ← 普通录票
        │
        ├─ 正常展示在日志
        │
        └─ undo 命中（最近一条 type=0 && !undone）
              │
              ├─ 原记录 undone=true          （不再可被再次 undo）
              ├─ 追加 type=1, undone=true    （撤销记录自身不可撤销）
              └─ voteCount 回退
```

**撤销栈语义**：等价于对 `type=0 && !undone` 的记录做「最近优先」弹栈；无此类记录时返回 `data:null`，前端 Toast「无可撤销操作」。

### 5.3 WS 连接状态（客户端）

```
  connect(id)
      │
      ▼
  CONNECTED ──onclose(非主动)──> RECONNECTING(指数退避 1s→2s→…→30s 封顶)
      │                                │
      │ onopen: delay 重置为 1s         │ 到点重试 connect
      │                                ▼
  teardown(卸载/切活动) ── closedByUser=true ──> 不再自动重连
```

---

## 6. 数据模型

### 6.1 实体关系（单文件 `tally.json`）

```
activities 1 ──── * candidates
    │                   │
    │                   │ candidateId（冗余引用）
    └────── 1 ──── * records
```

### 6.2 字段字典

**Activity**

| 字段 | 类型 | 说明 |
|---|---|---|
| id | int | 自增，`nextIds.activity` |
| title | string | 活动标题 |
| status | int | 0/1/2（见状态机） |
| createdAt | ISO-8601 | 本地创建时间 |
| updatedAt | Java 纳秒串 | 与 WS 快照 `updatedAt` 同源 |
| candidates | Candidate[] | 配置页按 `displayOrder` 排序返回 |
| records | Record[] | 追加序；API 反转为新→旧返回 |

**Candidate**

| 字段 | 类型 | 说明 |
|---|---|---|
| id | int | 自增，`nextIds.candidate` |
| activityId | int | 所属活动 |
| number | string | 候选人编号（展示用，允许 "01"） |
| name | string | 姓名 |
| displayOrder | int | 大屏/列表排序键 |
| voteCount | int | **当前累计票数**（快照 `voteCount` 来源） |

**Record**（操作日志）

| 字段 | 类型 | 说明 |
|---|---|---|
| id | int | 自增，`nextIds.record` |
| activityId / candidateId | int | 关联 |
| candidateNumber / candidateName | string | **候选人快照**（改名后历史日志同步刷新） |
| delta | int | 本次变化（可为负） |
| type | int | 0=录票，1=撤销 |
| createdAt | ISO-8601 | 操作时间 |
| undone | bool | 是否已被撤销（type=1 的记录恒为 true） |

### 6.3 WS 快照与数据模型的投影

`build_snapshot(activity)` = 只取大屏渲染所需最小字段集，并按源站键序序列化：

```
Activity + Candidate ──filter/sort──> {activityId, candidates[displayOrder,id,name,number,voteCount], status, title, updatedAt}
```

不包含 `records`（大屏不展示日志）、不包含 `createdAt`（大屏只关心 `updatedAt`）。

---

## 7. 实现映射（本任务交付）

| 源站要素 | 本地实现 | 文件 |
|---|---|---|
| 11 REST | Flask 路由，信封 `envelope()` | `tally/app.py` |
| 1 WS | `flask_sock.Sock` + `broadcast_snapshot` | `tally/app.py` |
| 单文件存储 | `tally.json` + 原子写 + `RLock` | `tally/app.py` / `tally/tally.json` |
| 前端子集 | 静态依赖闭包 20 文件 | `tally/public/` |
| 本地化 2 处 | axios baseURL + WS host | `tally-DC36h0vE.js` / `useTallySocket-Bnuwbx53.js` |
| 登录解锁 | 运行时注入 dev-auth | `tools/dev-auth.js` |
| 初始数据 | WS 抓取 id=1..4 | `tally/tools/_source_snapshots/` |

---

## 8. 验收对照

- [x] `tally/` 独立可启动，前端复用镜像文件、非自研
- [x] 11 REST + 1 WS 与源站逐字对应（README「12 REST」计数偏差已说明：12 = 11 REST + 1 WS）
- [x] 活动管理 / 唱票控制台 / 大屏三块功能完整
- [x] 大屏 WS 实时刷新，路径与源站同构
- [x] 静态文件仅为 tally 子集
- [x] `tally.json` 含源站 id=1/2/3/4 真实初始数据（WS 抓取，REST 401 原因已分析）
- [x] JS 已语义化、格式化、加注释
- [x] 链路分析报告 + WebSocket 教学文档齐备
