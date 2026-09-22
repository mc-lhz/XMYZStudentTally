# 源站 tally 业务完整实现链路分析报告

> 对象：`xmyzstudent.com` 的「tally 选票（实时唱票）」业务。
> 方法：静态分析镜像仓库 94 个 JS chunk（反混淆 + 语义化后）+ 直连源站公开 WS 通道实测抓包。
> 结论先行：该业务由 **3 个管理页 + 1 个公开大屏** 组成，前端通过 **12 个 REST 接口 + 1 个 WebSocket 地址** 与后端交互；
> 大屏的实时性完全由 WS 推送驱动，REST 只承担管理态读写。本地 `tally/` 已按同构契约完整复刻。

---

## 1. 业务画像

tally（实时唱票）是源站「活动/投票」功能域下的一个子业务，典型使用场景是线下选举/评选现场的唱票环节：

| 角色 | 页面 | 路由 | 需登录 | 职责 |
|---|---|---|---|---|
| 管理员 | 活动管理页 `TallyActivitiesPage` | `/admin/tally` | 是 | 活动增删改查、状态切换、跳转配置/控制台/大屏 |
| 管理员 | 候选人配置页 `TallyActivityEditPage` | `/admin/tally/activities/:id/edit` | 是 | 活动改名、状态切换、候选人增删改 |
| 管理员 | 唱票控制台 `TallyControlPage` | `/admin/tally/activities/:id/control` | 是 | 现场录票（+1/+5/+10/-1/自定义）、撤销、操作日志 |
| 观众/大屏 | 实时唱票大屏 `ScreenPage` | `/tally/screen/:id` | **否** | 柱状图实时展示各候选人票数，支持全屏 |

业务特点：

1. **读写分离**：管理操作走 REST（需 Bearer token），大屏展示走 WebSocket（**免认证**，公开链接可直接投屏）。
2. **全量快照推送**：WS 推送的不是增量，而是整个活动的完整快照，前端整体替换，逻辑极简。
3. **状态机驱动录票**：只有「进行中（status=1）」的活动允许录票，前后端双重校验。

## 2. 前端依赖关系

镜像仓库是 Vite 构建的 SPA（Vue 3 + Vue Router + Pinia + Axios）。tally 业务的 chunk 依赖图是**闭合**的：

```
index-DJrtCu9i.js                入口运行时（Vue 运行时辅助、useUserStore/useRouter/useToast、
  │                              axios 实例 http(baseURL)、72 条路由表、登录弹窗等）
  ├── PageHeader-BWL8GUHB.js     页面公共头部（back-to 属性）
  ├── PageFooter-BK6at51a.js     页面公共底部
  ├── PageBreadcrumb-BfFUydNi.js 面包屑
  ├── tally-DC36h0vE.js          ★ API 客户端：12 个 REST 封装 + WS 地址拼接
  ├── useTallySocket-Bnuwbx53.js ★ WS 组合式函数：连接/重连/快照管理
  ├── TallyActivitiesPage-Ck1JhJya.js    活动管理页
  ├── TallyActivityEditPage-DFD129SB.js  候选人配置页
  ├── TallyControlPage-CBBTMqC8.js       唱票控制台（同时用 REST + WS）
  └── ScreenPage-D-8ErF3w.js             大屏（仅用 WS）
```

要点：

- **页面 chunk 之间互不依赖**，只依赖入口运行时与 tally/useTallySocket 两个业务模块；
- 入口运行时通过 `import()` 懒加载页面 chunk，并按 `__vite__mapDeps` 在加载 chunk 时注入对应 CSS `<link>`——因此本地只需复制上表 10 个 JS + 8 个 CSS，未复制的其他 chunk 不影响 tally 路由（只在用户访问别的路由时才会 404）；
- **唱票控制台是唯一同时消费 REST 与 WS 的页面**：候选人卡片与票数渲染自 WS 快照，录票/撤销/日志走 REST；
- 大屏 `ScreenPage` 只 import `useTallySocket`，**不发任何 REST 请求**——这是它能免登录公开访问的原因。

## 3. 接口契约（反推自 JS，逐字对应）

REST 基址：源站 `https://api.xmyzstudent.com/api/v2`（入口运行时 `http` 实例的 baseURL）；
请求头自动带 `Authorization: Bearer <localStorage.token>`（401 时派发 `auth:token-expired` 事件弹登录框）。
响应统一信封：`{ code, message, data }`，前端只认 `code === 200`。

| # | 方法 | 路径（源站=本地，本地去掉域名部分） | 请求体 | 响应 data | 消费方 |
|---|---|---|---|---|---|
| 1 | GET | `/api/v2/admin/tally/activities` | — | 活动摘要数组 `[{id,title,status,createdAt,...}]` | 活动管理页 |
| 2 | POST | `/api/v2/admin/tally/activities` | `{title}` | 新活动（status=0） | 活动管理页 |
| 3 | GET | `/api/v2/admin/tally/activities/:id` | — | 活动详情 **含 candidates 数组** | 配置页 |
| 4 | PUT | `/api/v2/admin/tally/activities/:id` | `{title}` 或 `{status}` | 更新后的活动 | 两个管理页 |
| 5 | DELETE | `/api/v2/admin/tally/activities/:id` | — | — | 活动管理页 |
| 6 | POST | `/api/v2/admin/tally/activities/:id/candidates` | `{number,name,displayOrder}` | 新候选人（voteCount=0） | 配置页 |
| 7 | PUT | `/api/v2/admin/tally/candidates/:id` | `{number,name,displayOrder}` | 更新后的候选人 | 配置页 |
| 8 | DELETE | `/api/v2/admin/tally/candidates/:id` | — | — | 配置页 |
| 9 | POST | `/api/v2/admin/tally/candidates/:id/vote` | `{delta}`（非 0 整数，可负） | 更新后的候选人 | 唱票控制台 |
| 10 | POST | `/api/v2/admin/tally/activities/:id/undo` | — | 被撤销的记录；**无可撤销时为 null** | 唱票控制台 |
| 11 | GET | `/api/v2/admin/tally/activities/:id/records` | — | 操作记录数组（控制台取最新 20 条） | 唱票控制台 |
| 12 | WS | `/ws/tally/activity/:id`（源站 `wss://api.xmyzstudent.com/...`） | — | 连接即推全量快照，变更时广播 | 大屏 + 唱票控制台 |

**从代码反推的契约细节**（均有源码依据）：

- **快照结构**（`useTallySocket` 的 `JSON.parse(msg.data)` 直接喂给渲染层）：
  `{activityId, title, status, candidates:[{id, number, name, displayOrder, voteCount}], updatedAt}`
- **记录结构**（控制台日志渲染 `record.candidateNumber/candidateName/delta/type/createdAt`）：
  `{id, activityId, candidateId, candidateNumber, candidateName, delta, type, createdAt}`；
  `type === 1` 显示「撤销」，其余显示「普通」。
- **录票校验**：前端按钮在 `status !== 1` 时禁用、`delta === 0` 时 warning；本地后端同样校验（400）。
- **撤销语义**：前端按 `data` 真假分支 toast（「已撤销最近一次操作」/「无可撤销操作」），
  说明源站以「是否存在可撤销对象」作为返回，本地实现为栈式语义（见 §6）。
- **删除级联**：前端确认文案明示「候选人与唱票记录将一并删除」「其历史唱票记录将一并删除」。

**关于 401**：`/admin/tally/*` 全部需要 Bearer token（实测直连返回 `{"code":401,"message":"未授权"}`）。
任务提示「抓取不需要认证」的原因在于：**公开通道只有 WS**——大屏不调 REST，WS 也不校验 token
（实测 `wss://api.xmyzstudent.com/ws/tally/activity/{1,2,3,4}` 无认证直接返回快照）。
因此初始数据通过 WS 抓取，`createdAt` 与操作日志属于管理态字段，公开通道不可见（处理方式见 §7）。

## 4. 端到端时序

### 4.1 管理态：录票一笔（控制台 → 大屏）

```
管理员                唱票控制台(SPA)              Flask API                 tally.json        WS 广播        大屏(SPA)
  │ 点击「+10」           │                          │                          │                │              │
  │──────────────────────>│ voteAdminTallyCandidates │                          │                │              │
  │                       │  POST /api/v2/admin/     │                          │                │              │
  │                       │  tally/candidates/:id/vote│                          │                │              │
  │                       │─────────────────────────>│ 校验(存在/进行中/delta≠0) │                │              │
  │                       │                          │ voteCount += 10          │                │              │
  │                       |                          | append record(type=0)     │                │              │
  │                       │                          │────────────── persist ──>│                │              │
  │                       │                          │──────── broadcast ───────┼───────────────>│              │
  │                       │<──────── 200 {candidate}─│                          │                │              │
  │                       │ 刷新操作日志(REST #11)    │                          │                │              │
  │                       │                          │                          │   snapshot JSON.parse 后整体替换 │
  │                       │                          │                          │───────────────>│ 柱状图重绘 + 「+10」气泡 │
```

### 4.2 观众态：打开大屏

```
大屏 SPA ──GET /tally/screen/4──> Flask(静态回退 index.html)
        ──加载 ScreenPage chunk──> import useTallySocket
        ──new WebSocket(/ws/tally/activity/4)──> Flask WS 路由
        <── 立即推送全量快照 ── 渲染柱状图（纵轴按 max×1.2 取整档位）
        …… 之后每次录票/撤销/CRUD 都会收到新快照 ……
```

### 4.3 断线重连（源站逻辑，本地同构保留）

`useTallySocket`：`onclose` → 非主动关闭则 `setTimeout(connect, retryDelayMs)`，间隔 1s 起、每次 ×2、上限 30s；
`onopen` 后间隔重置为 1s。组件卸载时主动 close 并置 `manualClose` 防止重连。

## 5. 状态机

### 5.1 活动状态机

```
        create                select=1                select=2/0
 [不存在] ──────> 待开始(0) ──────────> 进行中(1) ──────────> 已结束(2)
                     │                     │                     │
                     │  select=2           │  select=0/2         │  select=0/1
                     └─────────────────────┴─────────────────────┘
```

- 三态均可由管理页/配置页的 `<select>` 直接切换（PUT #4 的 `{status}`），无额外转移约束；
- **录票仅允许 status=1**（前端禁用 + 后端 400 双重保证）；
- 删除为终止迁移：活动及其候选人、记录级联清除，WS 连接关闭。

### 5.2 录票/撤销栈式语义（本地实现，源站行为按前端分支反推）

```
records(按 id 升序) 视为操作栈：
  vote(delta)   -> push {delta, type=0}      voteCount += delta
  undo()        -> 看栈顶：
                     type=0  -> push {-delta, type=1}，voteCount -= delta
                     type=1  -> 无可撤销（data=null）
                     栈空   -> 无可撤销（data=null）
```

设计依据：前端对 `undo` 的响应按 `data` 真假给出两种 toast，且日志区把撤销也渲染为一条带 delta 的记录；
「撤销的撤销」等价于重做，源站无重做入口，故按栈顶判定，避免同一笔录票被二次冲销。

## 6. 数据模型（tally.json 单文件存储）

```jsonc
{
  "meta":        { "description", "source", "fetchedAt", "schema" },
  "activities": [                                   // 活动（候选人内嵌，符合配置页一次拉全部的用法）
    {
      "id": 1, "title": "2026厦门一中思明校区双代会",
      "status": 1,                                  // 0/1/2
      "createdAt": "2026-09-20 23:00:30",
      "updatedAt": "2026-09-20 23:00:30",           // WS 快照同名字段来源
      "candidates": [
        { "id": 1, "number": "1", "name": "测试1", "displayOrder": 1, "voteCount": 25 }
      ]
    }
  ],
  "records": [                                      // 操作日志（唱票/撤销都记）
    { "id": 1, "activityId": 1, "candidateId": 3,
      "candidateNumber": "03", "candidateName": "蔡善媛",
      "delta": 5, "type": 0, "createdAt": "..." }   // type: 0=普通 1=撤销
  ],
  "sequences": { "activity": 5, "candidate": 20, "record": 1 }   // 自增序列，衔接源站真实 ID
}
```

- 候选人 `id`、活动 `id` 沿用源站真实值并接着自增（源站已用到活动 1-4、候选人 1-19）；
- `voteCount` 为整数，可被负向录票压到负数（源站有「-1」按钮，未做下限校验，本地保持一致）；
- 所有写操作在进程内 `RLock` 保护下「读-改-写」整个文件，保证 12 接口并发安全。

## 7. 初始数据抓取与免责说明

- 抓取方式：`fetch_live.py` 直连 `wss://api.xmyzstudent.com/ws/tally/activity/{1,2,3,4}`，**无需认证**，各收 1 条全量快照，原始结果存于 `../live_snapshots.json`；
- `tally.json` 由 `tally/tools/build_tally_json.py` 从快照生成，**title/status/candidates(number,name,displayOrder,voteCount) 均为源站真实数据**（4 活动、17 候选人、合计 4964 票）；
- **`createdAt`**：仅管理接口可见（401），公开快照不含该字段，故以抓取时刻填充并在此声明；
- **操作日志**：同样仅管理接口可见，初始为空数组，本地录票后自然增长；
- WS 快照中的 `updatedAt` 是服务端**推送时刻**而非数据字段，未写入初始数据。

## 8. 本地复刻与源站的差异点（有意为之）

| 点 | 源站 | 本地 | 原因 |
|---|---|---|---|
| API 域名 | `api.xmyzstudent.com/api/v2` | 同源相对路径 `/api/v2` | 本地无该域名；路径结构与源站逐字同构 |
| WS 域名 | `wss://api.xmyzstudent.com/ws/...` | `ws(s)://<当前主机>/ws/...` | 路径 `/ws/tally/activity/:id` 与源站同构，仅主机随页面 |
| 登录态 | 短信/QQ OAuth 真实 token | 仓库自带 `dev-auth.js` 写入本地会话 | 本地无账号体系；49 条 admin 路由守卫需放行（README 要求用仓库内部脚本解锁） |
| 鉴权 | admin 接口校验 Bearer | 不校验（本地单用户） | 复刻重点是业务逻辑；登录仅影响前端守卫 |
| 活动不存在时 WS | 未观测 | 推送「活动不存在」兜底快照(status=2,空候选人) | 让大屏优雅渲染而非无限重连 |
| 并发存储 | 推断为数据库 | 单 `tally.json` + 进程锁 | 任务要求单文件存储 |

## 9. 前端治理说明（对复制 JS 的处理）

治理对象为 `static/assets/` 下 5 个业务 chunk（`tally` API 客户端为手工重写，入口运行时仅改 baseURL 一行）：

1. **语义化命名**：`zz0..zz13` 等本地函数、`refVal..refVal9` 等响应式引用、`tt/et/ue/ce` 等模板属性包常量、组件与默认导出常量，共 **225 处**全部按职责重命名（如 `zz3 → loadActivities`、`refVal2 → activities`、`at → loadingStateProps`）。重命名由 `tools/govern_js.py` 以词边界正则完成，脚本内置三重校验：旧名零残留、新名不与既有标识符冲突、**导入别名不得与本地声明重名**（防遮蔽导致递归）。
2. **详尽注释**：每个函数上方插入 JSDoc，说明业务含义与对应接口（如「录票：POST /admin/tally/candidates/:id/vote，请求体 { delta }」）；模块头补充本地化改造说明。
3. **格式化**：沿用仓库 babel 产出的统一缩进；渲染逻辑零改写。
4. **保留项**：Vue 渲染函数的参数（`val1/val8/val10`，各回调作用域不同，重命名有遮蔽风险）与 `val2[0]` 这类编译缓存槽位保持原样，已在文件头注释说明。

## 10. 验证记录

- **REST**：12 接口全部冒烟通过（列表/详情/增/改/删/候选人 CRUD/录票/撤销/日志/未命中 404 JSON）；
- **WS**：连接即推快照；录票/撤销/状态变更/候选人增删均正确广播；不存在的活动返回兜底快照；待开始活动录票被 400 拒绝；
- **浏览器 E2E**（真实加载治理后的 JS）：活动管理页 4 活动真实渲染；新建活动→列表出现→删除；控制台 WS「已连接」、+10 录票 800→810、自定义 +7→817、撤销回 810、日志出现「-7 撤销」；**大屏在另一标签页实时同步 810**（截图见 `docs/screenshots/`）；
- **数据还原**：测试后已用 `build_tally_json.py` 重新生成 `tally.json`，恢复源站真实初始值。
