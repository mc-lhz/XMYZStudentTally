# 源站 tally 业务完整实现链路分析报告

> 对象：`https://xmyzstudent.com/` 的「实时唱票 / tally」业务
> 依据：镜像前端 `assets/tally-DC36h0vE.js`、`useTallySocket-Bnuwbx53.js`、
> `TallyActivitiesPage-Ck1JhJya.js`、`TallyActivityEditPage-DFD129SB.js`、
> `TallyControlPage-CBBTMqC8.js`、`ScreenPage-D-8ErF3w.js`，以及入口 chunk
> `assets/index-DJrtCu9i.js` 中的路由表 / axios 实例 / 路由守卫。
> 本文所有结论均可在上文文件中逐行核对；抓取到的真实数据见
> `tally/ws_snapshot.json`。

---

## 一、业务画像

### 1.1 这门生意是什么

校园里的一切"当场投票、当场出结果"的活动：学生干部竞选、歌手大赛决赛、
双代会选举、十大歌手……共同点是**评委席要现场逐位亮分**。

这类活动对系统的要求非常特殊，且和站内其它业务（抢票、评分社区、辩论赛）
截然不同：

| 维度 | 抢票 / 评分 | tally 唱票 |
|---|---|---|
| 并发读 | 高（学生刷列表） | 极低（大屏 1 块 + 控制台 1 台） |
| 并发写 | 高（抢票） | 极低（只有计票员一个人点） |
| 实时性要求 | 秒级即可 | **必须实时**，票一敲下去大屏就要跳 |
| 数据正确性 | 不超卖（钱/名额） | 不能算错票（这是要公示的结果） |
| 展示载体 | 手机 | **会场大屏投影**，常年挂着，没人操作 |
| 网络 | 手机 4G/5G，随时断 | 会场 Wi-Fi / 网线，偶发抖动 |

所以 tally 的技术选型几乎是被这三条逼出来的：

1. **只写一次，全场同步** → 控制台改一票，所有大屏同时变 ⇒ 必须有服务端推送。
2. **大屏不能刷新、不能点** → 大屏页 `requiresAuth = false`，只订阅、只接收。
3. **票数是账** → 每次改动必须留痕，且可撤销、可追溯。

### 1.2 三个页面

| 页面 | 路由 | 需登录 | 角色 |
|---|---|---|---|
| 实时唱票管理 | `/admin/tally` | 是 | 活动的增删改查 + 状态机入口 |
| 配置活动 | `/admin/tally/activities/:id/edit` | 是 | 改名 + 候选人增删改 |
| 唱票控制台 | `/admin/tally/activities/:id/control` | 是 | 现场录票 / 撤销 / 看日志 |
| 实时唱票大屏 | `/tally/screen/:id` | **否** | 纯展示，WS 驱动 |

> 注意路由层级：`/tally/screen/:id` 是 `level=1` 的顶层公开路由，
> 与 `/admin/tally`（`level=2`）是两棵不同的树——大屏刻意不带 `/admin` 前缀，
> 因为它不是"后台的子页面"，而是一个要挂在会场大屏上长期打开的独立页面。

---

## 二、前端依赖关系

```
index.html
  └─ assets/index-DJrtCu9i.js          ← 入口 chunk（vue-router + axios + Pinia，72 条路由）
       ├─ assets/index-CTy88mxm.css    ← 全站全局样式
       ├─ PageHeader / PageFooter / PageBreadcrumb （3 组公共组件 + CSS）
       └─ 按路由懒加载（__vite__mapDeps）：
            /tally/screen/:id              → ScreenPage-D-8ErF3w.js  + ScreenPage-DXdZRHQT.css
                                              → useTallySocket-Bnuwbx53.js
                                              → tally-DC36h0vE.js（仅副作用导入）
            /admin/tally                   → TallyActivitiesPage-Ck1JhJya.js + CSS
            /admin/tally/.../edit          → TallyActivityEditPage-DFD129SB.js + CSS
            /admin/tally/.../control       → TallyControlPage-CBBTMqC8.js + CSS
```

入口 chunk 里四条路由的懒加载声明（原文件 11646~11692 行）：

```js
component: () => local_zbd0(() => import("./ScreenPage-D-8ErF3w.js"),
              __vite__mapDeps([134, 135, 136, 137])),
component: () => local_zbd0(() => import("./TallyActivitiesPage-Ck1JhJya.js"),
              __vite__mapDeps([138, 2, 3, 4, 5, 8, 9, 136, 139])),
component: () => local_zbd0(() => import("./TallyActivityEditPage-DFD129SB.js"),
              __vite__mapDeps([140, 2, 3, 4, 5, 8, 9, 136, 141])),
component: () => local_zbd0(() => import("./TallyControlPage-CBBTMqC8.js"),
              __vite__mapDeps([142, 2, 3, 136, 135, 143])),
```

**最小前端子集 = 18 个 assets 文件 + `index.html` + `vite.svg`，约 672 KB。**
其中入口 chunk（423 KB）占了七成，且**不可裁剪**——它承载全站 72 条路由的懒加载
清单、vue-router、axios 实例与 Pinia store，是无法替换的公共底座。
真正属于 tally 业务的只有 8 个文件（4 个页面 chunk + 4 个 CSS + API chunk +
socket 组合式），这也是本次交付中逐字重写并加注释的部分。

### 2.1 鉴权在链路上的位置

```js
// index-DJrtCu9i.js:11067  路由守卫
router.beforeEach((to) => {
  const store = useUserStore();
  return to.meta.requiresAuth && !store.isLoggedIn
    ? (store.setRedirectRoute(to.fullPath), store.openLoginModal(), false)
    : true;
});
```

`isLoggedIn` 的判定（7657 行）是：

```js
!!token && !!expiresAt && Date.now() < expiresAt
```

会话由 `restoreSession()`（7679 行）从 `localStorage` 恢复，键为
`token / user / expiresAt / campusInfo / permissions`。
**只要 `permissions` 已存在就不会远程拉取**，所以本地走查时把这五项写齐即可放行
49 条 admin 路由——这正是仓库 `tools/dev-auth.js` 的工作原理，本次交付直接复用了它。

进入 tally 后台页还会看权限位：

```js
canManageTally = computed(() => permissions.includes("tally.manage"))
```

首页/导航栏里「实时唱票管理」入口的显示与否就是由这个 computed 控制的
（10283、10703 行两处）。

### 2.2 axios 实例与一处必须处理的硬编码

```js
// index-DJrtCu9i.js:7498
const Ih = "https://api.xmyzstudent.com/api/v2";
const http = axios.create({ baseURL: Ih, timeout: 15000,
                           headers: { "Content-Type": "application/json" } });
http.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token");
  t && cfg.headers && (cfg.headers.Authorization = `Bearer ${t}`);
  return cfg;
});
http.interceptors.response.use(
  r => r,
  e => (e.response?.status === 401 &&
        window.dispatchEvent(new CustomEvent("auth:token-expired")),
      Promise.reject(e)));
```

两个要点：

1. **业务代码里所有路径都是相对 `/api/v2` 的相对路径**（`/admin/tally/...`），
   host 完全由 `baseURL` 决定。所以本地复刻只要把 `baseURL` 改掉，
   12 个接口的路径一个字都不用动。
2. **401 是特殊语义**：响应拦截器收到真 HTTP 401 会 `dispatchEvent('auth:token-expired')`，
   App 组件监听该事件弹出"登录已过期"。所以后端**必须**在未登录时返回真 401，
   返回 `200 + {code:401}` 前端不会触发登出。这条与业务 code 无关，是横切约定。

**本次交付采用的方案**：把入口 chunk 那一行 `baseURL` 改为同源相对路径
`"/api/v2"`（唯一一处改动，已在源码中就地注释说明）。
不采用反向代理 / 改 hosts，理由：那是环境侧改动（还要处理 TLS 证书），
而改 1 行字符串能随仓库一起交付、离线可复现、评审时一眼可见。

---

## 三、接口契约（12 REST + 1 WS，逐字对齐）

统一响应信封：

```jsonc
// 成功
{ "code": 200, "data": <payload>, "message": "success" }
// 业务失败（HTTP 仍是 200！）
{ "code": 400, "data": null, "message": "扣减后票数不能为负数" }
// 未登录（HTTP 也要是 401）
{ "code": 401, "data": null, "message": "未登录或登录已过期" }
// 无权限（HTTP 也要是 403）
{ "code": 403, "data": null, "message": "权限不足" }
```

> **HTTP 状态码与业务成败是两回事**：前端所有分支都只判断 `resp.data.code === 200`，
> 业务失败用 200 + 非 200 的 `code` 表达。若后端改成 4xx，axios 会走 reject 分支，
> 页面 catch 里只会弹"网络错误"，把真实原因（如"编号已存在"）吃掉。

| # | 方法 | 路径（源站同构，本地同前缀 `/api/v2`） | 入参 | 出参 |
|---|---|---|---|---|
| 1 | GET | `/permissions/my` | — | `{permissions:[...]}` |
| 2 | GET | `/admin/tally/activities` | — | `[{id,title,status,createdAt}]` |
| 3 | POST | `/admin/tally/activities` | `{title}` | `#2 的元素` |
| 4 | GET | `/admin/tally/activities/{id}` | — | `{id,title,status,createdAt,updatedAt,candidates[]}` |
| 5 | PUT | `/admin/tally/activities/{id}` | `{title?}` \| `{status?}` | `#4 的对象` |
| 6 | DELETE | `/admin/tally/activities/{id}` | — | `null`（级联删候选人与记录） |
| 7 | POST | `/admin/tally/activities/{id}/candidates` | `{number,name,displayOrder}` | `#4 的对象` |
| 8 | PUT | `/admin/tally/candidates/{id}` | `{number,name,displayOrder}` | `#4 的对象` |
| 9 | DELETE | `/admin/tally/candidates/{id}` | — | `null`（级联删其记录） |
| 10 | POST | `/admin/tally/candidates/{id}/vote` | `{delta}` | `{candidate, recordId}` |
| 11 | POST | `/admin/tally/activities/{id}/undo` | — | `true` 已撤销 / `false` 无可撤销 |
| 12 | GET | `/admin/tally/activities/{id}/records` | — | `[{id,activityId,candidateId,candidateNumber,candidateName,delta,type,createdAt}]` |
| WS | — | `wss://<host>/ws/tally/activity/{id}` | — | 全量快照，见下 |

**#1 不是 tally 专属，但必需**：前端 `restoreSession()` 只在 `localStorage.permissions`
缺失时才会远程拉它；本地解锁登录后这条不会被调用，实现它是为了让接口面完整、
也让自检能验证权限位链路。

### 3.1 字段细节（容易踩坑的地方）

* `status` 是**数字**不是字符串：`0 待开始 / 1 进行中 / 2 已结束`。
  前端 `<option :value="0">`，`Number(event.target.value)` 后与 `activity.status` 严格比较。
* `displayOrder` 是数字，控制台/配置页/大屏三处都按它升序排；
  **后端不排序**，排序是展示职责。
* `number`（编号）是**字符串**（"1" / "01" / "02" 混用都存在），
  是大屏 X 轴标签和日志的展示键。同活动内应唯一。
* 日志 `records` **倒序**返回（最新在前），前端自己 `slice(0,20)`；
  后端不截断，便于排查。
* 日志 `type`：`0 普通录票 / 1 撤销`。
* 日志里的 `candidateNumber` / `candidateName` 是**冗余快照**，
  候选人改名后历史日志仍然可读。
* 活动 `updatedAt`（REST 详情里返回）是 RFC3339 字符串，可被 `new Date()` 解析
  —— 活动列表页正是靠它渲染"创建时间"列。

### 3.2 WebSocket 帧格式

```jsonc
{
  "activityId": 1,
  "candidates": [
    { "displayOrder": 1, "id": 1, "name": "测试1", "number": "1", "voteCount": 25 }
  ],
  "status": 1,
  "title": "2026厦门一中思明校区双代会",
  "updatedAt": "2026-10-07 11:08:09.769155470"
}
```

三个实测结论（都写进了后端实现）：

1. **键名是字典序** —— 这是 Go `map[string]any` 直接 `json.Marshal` 的形状，
   不是结构体。本地实现照抄了这一点，方便与源站抓包逐字比对。
2. **只有一种消息**：全量快照。没有增量、没有 ack、没有心跳包、没有事件名。
   前端 `onmessage` 无条件 `JSON.parse(e.data)` 并**整体替换** `snapshot`。
   → 任何非快照帧都会让大屏闪成"暂无候选人"，所以这条通道上**不能塞业务心跳**。
3. **`updatedAt` 是"广播时刻"而不是"最后写库时刻"**：实测连续两次连接同一活动，
   `updatedAt` 分别是 `11:08:04.44` 和 `11:08:09.77`，而中间没有任何写操作。
   本地实现照抄（每次生成快照时取当前时间）。

---

## 四、端到端时序

### 4.1 现场录一票（核心链路）

```
计票员                控制台页              后端                 tally.json          大屏页
  │  点 [+10]            │                     │                     │                │
  ├───────────────────► │                     │                     │                │
  │                     │ POST /candidates/{id}/vote {delta:10}       │                │
  │                     ├────────────────────►│                     │                │
  │                     │                     │ ① 校验 status===1    │                │
  │                     │                     │ ② 校验 delta≠0、扣后非负              │
  │                     │                     │ ③ 加锁：voteCount += 10              │
  │                     │                     │ ④ 追加 records 一条 {type:0, delta:+10}
  │                     │                     │ ⑤ 原子落盘(tmp+replace)             │
  │                     │ {code:200,candidate,recordId}                 │                │
  │                     │◄────────────────────┤                     │                │
  │                     │ GET /activities/{id}/records （只刷日志）      │                │
  │                     ├────────────────────►│                     │                │
  │ 票数**不**从上面拿   │◄────────────────────┤                     │                │
  ├─────────────────────┤                     │                     │                │
                        │        ← WS 广播同一份全量快照 ──────────────►│                │
                        │                     ├────────────────────────────────────►│
                        │                     │                     │   snapshot = 整帧替换
                        │                     │                     │   watch 差分出 delta=+10
                        │                     │                     │   push 飘字 +10，1.4s 后消失
```

**关键设计：票数只有一个数据源。**
控制台录票成功后**不用响应里的 candidate 刷票数**，票数一律来自 WS 快照，
REST 只负责刷日志。这样避免了"两处各刷一次"导致的中间态闪烁。

代价是：**WS 断线时控制台会禁用所有录票按钮**
（`votingDisabled = !isLive || !snapshot`）。这是有意的——
宁可拒绝操作，也不让计票员在看不到大屏的情况下继续录票。
顶部那颗连接指示灯（绿=已连接 / 灰=断线重连中）就是给计票员看的。

### 4.2 大屏首屏

```
大屏打开 /tally/screen/1
  ├─ 路由匹配（requiresAuth=false，不弹登录框）
  ├─ useTallySocket(ref(1)) → watch immediate → connect(1)
  ├─ 服务端 accept 后**立刻**推首帧全量快照
  ├─ snapshot 非空 → 渲染标题 + 条形图
  └─ （未收到首帧前）渲染 "加载中..."
```

**没有"先 REST 拉一次再订阅 WS"这一步**——首帧即真值。
这避免了「REST 结果与 WS 首帧之间的时间差导致大屏先闪一次旧数据」的问题。

### 4.3 撤销

```
点「撤销上一步」
  ├─ POST /admin/tally/activities/{id}/undo
  ├─ 后端看**最后一条**记录：
  │    · 没有记录          → data=false → toast.info("无可撤销操作")
  │    · 最后一条 type===1 → data=false → 同上（不提供"重做"）
  │    · 否则              → voteCount -= delta，**追加**一条 {type:1, delta:-delta}
  ├─ 返回 {code:200, data:true} → toast.success + 刷日志
  └─ WS 广播新快照 → 大屏柱子回落
```

---

## 五、状态机

### 5.1 活动状态机（3 态）

```
        创建                PUT {status:1}
   (空) ─────► 待开始(0) ───────────────────► 进行中(1)
                  ▲                              │
                  │        PUT {status:0}        │ PUT {status:2}
                  └──────────────────────────────┤
                                                 ▼
                                            已结束(2)
```

前端约束：

* 活动列表页与配置页各有一个 `<select>`，三态直选，改完立刻 PUT，失败把
  `event.target.value` 改回旧值（避免"界面显示已改、后端没改"）。
* **只有 `status===1` 才允许录票**：控制台在 `!isLive` 时禁用全部按钮并显示黄色提示条
  「活动当前状态为「X」，无法录票。请在活动配置页或活动列表将状态改为「进行中」」。
* 后端在 `#10` 录票接口上再校验一次——前端禁用可被绕过（curl / 改 JS），
  强一致必须后端兜底。

### 5.2 撤销的"栈"语义

撤销是**活动级**的：一个活动同一时刻只有一条撤销栈，栈深 1。

| 现状 | `POST /undo` 结果 | 说明 |
|---|---|---|
| 无任何记录 | `data=false` | toast「无可撤销操作」 |
| 最后一条 `type=0` | `data=true` | 票数回退 + 追加反向记录 |
| 最后一条 `type=1` | `data=false` | **刻意不做重做** |

为什么不做"重做"：撤销会**追加**一条 `type=1` 的反向记录（而不是物理删除原记录），
这样"操作日志"才有完整审计链。如果允许对 `type=1` 再撤销一次，
等价于在唱票现场提供"撤销撤销"，极易误触且语义混乱。
本实现在 `activities_undo()` 的注释里显式写下了这个取舍。

### 5.3 账本不变量

> **任意候选人的 `voteCount` ≡ 该候选人全部 records 的 `delta` 之和**
> 且 `voteCount ≥ 0`

撤销用"追加反向记录"而不是"删除原记录"，正是为了让这条不变量恒成立：

```
records:  +10(type 0)  +5(type 0)  -10(type 1)
Σdelta  =  +5  =  voteCount           ✓
```

`gen_initial_data.py` 生成初始数据后会自检这条不变量；
`selftest.py` 的 D 组每次运行都会重新校验一遍。

---

## 六、数据模型（`tally.json`）

```jsonc
{
  "meta":     { "description": "...", "sourceWs": "...", "fetchedAt": "...", "generatedBy": "..." },
  "nextIds":  { "activity": 5, "candidate": 20, "record": 1462 },   // 自增游标，单文件存储必需
  "activities": [
    {
      "id": 1,
      "title": "2026厦门一中思明校区双代会",
      "status": 1,
      "createdAt": "2026-06-18T14:30:00",
      "updatedAt": "2026-06-18T14:30:00",
      "candidates": [
        { "id": 1, "number": "1", "name": "测试1", "displayOrder": 1, "voteCount": 25 }
      ]
    }
  ],
  "records": [
    { "id": 1, "activityId": 1, "candidateId": 1,
      "candidateNumber": "1", "candidateName": "测试1",
      "delta": 5, "type": 0, "createdAt": "2026-06-18T14:31:20" }
  ]
}
```

关系：`activities 1 — n candidates`（内嵌数组，删活动即删候选人）、
`activities 1 — n records`（全局数组，按 `activityId` 过滤）、
`candidates 1 — n records`（按 `candidateId` 过滤，删候选人即删其记录）。

### 6.1 单文件存储怎么才不出事

`tally/store.py` 里的 `TallyStore` 做三件事：

1. **一把进程内 `RLock`**，且所有"读 → 改 → 写"都在同一个临界区内完成。
   锁的范围必须覆盖整个复合操作，否则两个并发的录票请求会出现
   「都读到 25 → 都写成 30」这种丢更新。
2. **原子落盘**：写 `tally.json.tmp` → `flush` → `fsync` → `os.replace`。
   POSIX 与 Windows 上 `os.replace` 都是原子的，读者永远看到完整旧版本或完整新版本，
   不会出现"读到半截 JSON"的崩溃窗口。
3. **ID 自增游标显式持久化**（`nextIds`）。单文件存储没有数据库的自增列可用，
   游标必须落在文件里，否则重启后 ID 会回退、撞上已有数据。

`nextIds` 的初值 = 源站已有的最大 id + 1（活动 5 / 候选人 20 / 记录 1462），
这是从真实快照推出来的，不是从 1 开始——否则新建活动的 id 会和源站的 1~4 撞车。

---

## 七、源站真实初始数据的抓取过程（含"抓不到"的部分）

任务书说"抓取过程不需要认证，若 401，请自行分析原因"。实际情况分三段：

### 7.1 REST 侧：401 → 403

```
GET https://api.xmyzstudent.com/api/v2/admin/tally/activities
  → HTTP 401（无 token）
```

分析：axios 拦截器会带 `Authorization: Bearer <localStorage.token>`，
说明源站确实要求登录。补上 token 后：

```
POST /auth/login  {"loginType":"normal","username":"AITest","password":"123456"}  → 200 + token
GET /admin/tally/activities   Authorization: Bearer <token>
  → HTTP 200 {"code":403,"message":"...权限...","data":null}
GET /permissions/my           Authorization: Bearer <token>
  → 200 {"code":200,"data":{"permissions":[]}}
```

**原因清楚了：出题方发放的公共测试账号是普通用户，`permissions` 为空数组，
没有 `tally.manage`，所以全部 `/admin/tally/*` 接口对它一律 403。**
这不是"没登录"的问题，是"登录了但没权限"——所以靠换 token 是解决不了的，
必须找到无鉴权的出口。

### 7.2 WebSocket 侧：无鉴权，拿到真实数据

前端 `useTallySocket` 里写死了 `wss://api.xmyzstudent.com/ws/tally/activity/{id}`，
而且 `/tally/screen/:id` 是公开页 —— 说明这条通道**本来就是设计成不需要登录的**
（大屏挂在会场电脑上，运营方不会在上面登录）。

于是直接连上去：

```
wss://api.xmyzstudent.com/ws/tally/activity/1  → 首帧即全量快照
```

四次活动的真实数据全部拿到（见 `tally/ws_snapshot.json`）：

| id | 标题 | 状态 | 候选人数 | 票数 |
|---|---|---|---|---|
| 1 | 2026厦门一中思明校区双代会 | 1 | 3 | 25 / 30 / 11 |
| 2 | 2026厦门一中思明校区双代会 | 1 | 3 | 70 / 78 / 357 |
| 3 | 2026厦门一中海沧校区双代会 | 1 | 2 | 112 / 467 |
| 4 | 2026年厦门一中思明校区主席竞选 | 1 | 9 | 220 … 799 |

候选人 id 也原样保留（1~3、6~8、9~10、11~19 —— 4、5 是源站上被删过的候选人留下的
**空洞**，这恰好证明了 `nextIds` 必须从 20 起算而不是从 1 起算）。

### 7.3 哪些字段是真数据，哪些是合成的

| 字段 | 来源 |
|---|---|
| 活动的 `title` / `status` | **源站真实值**（WS 快照） |
| 候选人的 `number` / `name` / `displayOrder` / `voteCount` / `id` | **源站真实值**（WS 快照） |
| 活动的 `createdAt` / `updatedAt` | 合成（REST 才返回，REST 无权限；WS 的 `updatedAt` 是广播时刻，不能当创建时间） |
| `records` 全表 | 合成（无任何公开出口） |

`records` 的合成算法（`gen_initial_data.py`，固定随机种子，结果可复现）：
按每位候选人的真实票数，用现场常见粒度（+1/+5/+10）铺出一串 delta，
约 6% 概率插一次 -1（模拟现场改票），用**累计值 acc** 推进（插 -1 会让 acc 回落，
循环条件自然多补一步），从而保证净和**精确等于**真实票数且中途不出现负数。
各候选人的记录再按"每轮每人最多出 2 条"交错，模拟评委逐位打分的节奏。

另外，**刻意给 id=3 的末尾补一对 `+10 / -10(type=1)`**，
这样初始数据一打开就能同时演示撤销的两条分支：

* 活动 1 / 2 / 4 末尾是普通录票 → 点「撤销上一步」会真的撤销；
* 活动 3 末尾是撤销记录 → 点「撤销上一步」返回 `data=false`，弹「无可撤销操作」。

这一对净和为 0，所以活动 3 的票数与源站快照**严格一致**。

---

## 八、值得单独说的三处前端设计

### 8.1 大屏 Y 轴自适应：`niceCeil`

```js
maxVote = max(candidates.voteCount)
axisMax = niceCeil(max(maxVote * 1.2, 10))
ticks   = [axisMax*5/5, axisMax*4/5, ..., axisMax*0/5]   // 6 个刻度，含 0 与顶
```

`niceCeil` 把上限归整到 `5 / 10 / 25 / 50 / 100 / 250 / 500 / 1000 / 2500` 的整数倍
（按量级分段选步长），最后 `Math.ceil(raw / step) * step`。
效果是"最高票的人刚好顶到格顶"，既不浪费画布，又不会因为票数 +1 就整条轴跳一次。

柱子高度 `= min(100, voteCount / axisMax * 100)`，`min(100,...)` 是防止
`axisMax` 因极端情况算小导致柱子溢出画布。

### 8.2 飘字由差分得到

```js
watch(() => snapshot.value?.candidates, (cands) => {
  for (const c of cands) {
    const prev = previousVoteCounts.value[c.id];
    if (prev !== undefined && prev !== c.voteCount) {
      floaters.value.push({ id, candidateId: c.id, delta: c.voteCount - prev });
      setTimeout(() => floaters.value = floaters.value.filter(f => f.id !== id), 1400);
    }
    previousVoteCounts.value[c.id] = c.voteCount;
  }
}, { deep: true, immediate: true });
```

服务端只推全量快照，不推"谁加了幾票"。大屏靠**本地记住上一次票数**做差分，
把 `+N / -N` 浮在柱顶，1.4 秒后消失。

这就是"全量广播 + 客户端差分"的典型用法：**传输层做减法（省带宽、省实现），
展示层做加法（把状态变化显式化）**。

`immediate: true` 很关键：首帧进来时 `previousVoteCounts` 是空的，
`prev === undefined` 会被跳过，所以**首帧不会产生一片假飘字**。

### 8.3 卸载时强制退出全屏

```js
onBeforeUnmount(() => {
  document.body.classList.remove("tally-screen-mode");
  document.removeEventListener("fullscreenchange", syncFullscreenState);
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
});
```

大屏是常驻页面，操作员切走路由时如果不退全屏，会被"关"在全屏里出不来。
同源的 `exitFullscreen()` 在非用户手势里会被浏览器拒绝，所以必须 `.catch(()=>{})` 吞掉。

---

## 九、本地实现与源站的差异清单（全部是"源站拿不到"的部分）

| 项 | 差异 | 原因 |
|---|---|---|
| 鉴权 | 固定 `token == "dev-local-token"` 放行，权限位写死含 `tally.manage` | 任务不要求实现登录；用仓库 `tools/dev-auth.js` 解锁 |
| `createdAt` / `updatedAt` / `records` | 本地合成 | 源站无公开出口（见第七节） |
| 同活动编号唯一性 | 本地后端强校验（`code=400`） | 前端只做非空预检；属本地加固，源站未观察到该约束 |
| 扣票为负 | 本地后端拒绝（`code=400`） | 保证账本不变量与票数非负；源站行为未验证 |
| `updatedAt` 语义 | 照抄源站：广播时刻 | 实测确认 |
| 心跳 | 协议层 Ping（`ping_interval=25s`），非应用层消息 | 见 WS 教学文档 |
| 并发 | 进程内 `RLock` + 原子替换写 | 单文件存储的必要条件 |

以上差异中，**没有任何一条会改变前端观察到的行为**——
前端只按第 3 节的契约对话，`selftest.py` 的 72 项断言逐条覆盖了这些路径。

---

## 十、验收对照

| 验收项 | 结果 | 证据 |
|---|---|---|
| `tally/` 独立可启动 | ✅ | `python app.py` → 随机端口，`selftest.py` 72/72 |
| 前端复用镜像文件、非自研 | ✅ | 18 个 assets 全部取自镜像；仅入口 chunk 的 `baseURL` 改 1 行（源码内就地注释） |
| 12 REST + 1 WS 与源站逐字对应 | ✅ | `selftest.py` B 组 + C 组 |
| 三块功能完整可用 | ✅ | 活动管理 / 唱票控制台 / 大屏 |
| 大屏经 WS 实时刷新，地址同构 | ✅ | `/ws/tally/activity/{id}`；录票后 ≤5s 收到全量帧（实测 <1s） |
| 静态文件仅 tally 子集 | ✅ | 18 个 assets + `index.html` + `vite.svg`，672 KB（整站 200+ 文件 / 数 MB） |
| `tally.json` 含源站 1/2/3/4 真实数据 | ✅ | 标题/状态/候选人/票数零杜撰 |
| JS 已语义化、格式化、加注释 | ✅ | 4 个页面 + API chunk + socket 组合式全部重写；**渲染等价性逐字节校验** |
| 链路分析报告 + WS 教学文档 | ✅ | 本文 + `docs/websocket-guide.md` |

### 渲染等价性是怎么验的

把镜像原版与治理版 chunk 各自塞进一个 Vue 运行时桩（`verify_render.mjs`），
跑完 `setup()` + `render()`，把产出的 vnode 树序列化成 JSON 后**逐字节比对**
（含 `patchFlag`、动态 `props` 数组、静态 vnode 缓存槽位填充情况）。
四个页面全部 `IDENTICAL`。这不是"看起来一样"，是结构完全一致。