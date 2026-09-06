# 源站「实时唱票」业务完整实现链路分析

> 本报告以镜像仓库 `mc-lhz/XMYZStudent` 中的「唱票（tally）」业务为案例，拆解它的完整
> 实现链路，并以此为切入点讲解 WebSocket 前后端知识。
> 配套可运行的本地复刻位于 `tally/` 目录。

---

## 一、源站 tally 业务画像

- **是什么**：校园活动（双代会、学生会主席竞选等）现场实时唱票系统。
- **谁用**：
  - **组织方** —— 在「管理」端建活动、配候选人、唱票、撤销、投屏；
  - **现场观众** —— 在大屏上看候选人柱状图和 ±N 票数气泡；
  - **不需要登录看大屏**，组织方操作需要后台账号。
- **三张管理页 + 一张大屏**：
  | 路由                                          | 用途                            | 鉴权 |
  | --------------------------------------------- | ------------------------------- | ---- |
  | `/admin/tally`                                | 活动管理页（列表 / 新建 / 改状态 / 删除 / 复制大屏链接） | 需登录 |
  | `/admin/tally/activities/:id/edit`            | 活动配置页（改名 / 改状态 / 候选人增删改）             | 需登录 |
  | `/admin/tally/activities/:id/control`         | 唱票控制台（录票 / 撤销 / 操作日志 / 入口）             | 需登录 |
  | `/tally/screen/:id`                           | 公开大屏（柱状图 + 实时气泡 + 全屏）                    | 公开   |

> 这条路由表是直接从 `assets/index-DJrtCu9i.js` 的 `routes:[…]` 数组里抠出来的，原文包含
> 一百多条无关业务路由，本地复刻时已按本表裁剪。

---

## 二、前端模块依赖图

```svg
<svg viewBox="0 0 680 360" width="100%" role="img">
  <title>前端模块依赖图</title>
  <desc>tally 业务的前端 chunk 拓扑，箭头表示 import 方向</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#5F5E5A"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <g class="node c-blue">
    <rect x="40" y="40" width="160" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="120" y="64" text-anchor="middle" dominant-baseline="central" fill="#0C447C">index-DJrtCu9i.js</text>
    <text class="ts" x="120" y="80" text-anchor="middle" dominant-baseline="central" fill="#185FA5">主入口 + axios + 路由</text>
  </g>
  <g class="node c-teal">
    <rect x="240" y="40" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="330" y="64" text-anchor="middle" dominant-baseline="central" fill="#085041">tally-DC36h0vE.js</text>
    <text class="ts" x="330" y="80" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">接口层（12 个 REST + WS URL）</text>
  </g>
  <g class="node c-amber">
    <rect x="460" y="40" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="550" y="64" text-anchor="middle" dominant-baseline="central" fill="#633806">useTallySocket-*.js</text>
    <text class="ts" x="550" y="80" text-anchor="middle" dominant-baseline="central" fill="#854F0B">WS 组合式函数</text>
  </g>

  <line x1="200" y1="64" x2="240" y2="64" class="arr" marker-end="url(#arrow)"/>
  <line x1="420" y1="64" x2="460" y2="64" class="arr" marker-end="url(#arrow)"/>

  <g class="node c-purple">
    <rect x="40"  y="160" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="130" y="184" text-anchor="middle" dominant-baseline="central" fill="#3C3489">TallyActivitiesPage</text>
    <text class="ts" x="130" y="200" text-anchor="middle" dominant-baseline="central" fill="#534AB7">活动管理页</text>
  </g>
  <g class="node c-purple">
    <rect x="250" y="160" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="340" y="184" text-anchor="middle" dominant-baseline="central" fill="#3C3489">TallyActivityEditPage</text>
    <text class="ts" x="340" y="200" text-anchor="middle" dominant-baseline="central" fill="#534AB7">活动配置页</text>
  </g>
  <g class="node c-purple">
    <rect x="460" y="160" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="550" y="184" text-anchor="middle" dominant-baseline="central" fill="#3C3489">TallyControlPage</text>
    <text class="ts" x="550" y="200" text-anchor="middle" dominant-baseline="central" fill="#854F0B">唱票控制台</text>
  </g>
  <g class="node c-coral">
    <rect x="240" y="260" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="330" y="284" text-anchor="middle" dominant-baseline="central" fill="#712B13">ScreenPage</text>
    <text class="ts" x="330" y="300" text-anchor="middle" dominant-baseline="central" fill="#993C1D">公开大屏</text>
  </g>

  <line x1="130" y1="160" x2="330" y2="88"  class="arr" marker-end="url(#arrow)"/>
  <line x1="340" y1="160" x2="330" y2="88"  class="arr" marker-end="url(#arrow)"/>
  <line x1="550" y1="160" x2="550" y2="88"  class="arr" marker-end="url(#arrow)"/>
  <line x1="330" y1="260" x2="550" y2="88"  class="arr" marker-end="url(#arrow)"/>
</svg>
```

要点：
- `index-DJrtCu9i.js` 是入口 chunk，承载 axios 实例、Vue 运行时、路由、状态。
  它的 `routes` 数组有 100+ 条无关业务路由，本地复刻时裁剪到只留 4 条 tally 路由。
- `tally-DC36h0vE.js` 是接口层，所有页面都从这里取 `http.get/post/put/delete` 与 WS 地址。
- `useTallySocket-*.js` 是 WS 组合式函数，被控制台与大屏共用。
- 三个紫色页面 + 一个红色大屏是业务入口；它们自身不再 import 其它业务 chunk，依赖闭包干净。

---

## 三、接口契约速览

> 全部由镜像里的 `tally.js` 反推得到，baseURL 在源站是
> `https://api.xmyzstudent.com/api/v2`，本地复刻改为同源 `/api/v2`。

### 3.1 REST

| 方法 | 路径                                       | 入参                              | 用途                              |
| ---- | ------------------------------------------ | --------------------------------- | --------------------------------- |
| GET    | `/admin/tally/activities`                                | —                                 | 活动列表 |
| GET    | `/admin/tally/activities/<id>`                           | —                                 | 活动详情（含候选人） |
| POST   | `/admin/tally/activities`                                | `{title}`                         | 新建活动，状态默认「待开始」 |
| PUT    | `/admin/tally/activities/<id>`                           | `{title?, status?}`               | 改标题 / 改状态（部分字段可选） |
| DELETE | `/admin/tally/activities/<id>`                           | —                                 | 删除活动（连同候选人 + 唱票记录） |
| POST   | `/admin/tally/activities/<id>/candidates`                | `{number, name, displayOrder}`    | 新增候选人 |
| PUT    | `/admin/tally/candidates/<id>`                           | `{number?, name?, displayOrder?}` | 改候选人（不动票数） |
| DELETE | `/admin/tally/candidates/<id>`                           | —                                 | 删候选人（连带其历史记录） |
| POST   | `/admin/tally/candidates/<id>/vote`                      | `{delta}`                         | 录票（仅当活动处于「进行中」） |
| POST   | `/admin/tally/activities/<id>/undo`                      | —                                 | 撤销最近一次录票 |
| GET    | `/admin/tally/activities/<id>/records`                   | —                                 | 操作日志（前端 slice(0, 20)） |

统一响应包装：

```json
{ "code": 200, "message": "ok", "data": <...> }
```

业务失败也返回 HTTP 200，靠 `code` 区分。前端 axios 拦截器只读 `data.code`，`code !== 200`
时一律 toast `data.message`，不抛「网络错误」。

### 3.2 WebSocket

| 地址                                       | 协议                    | 方向          | 消息类型            |
| ------------------------------------------ | ----------------------- | ------------- | ------------------- |
| `/ws/tally/activity/<id>`                 | `wss`（源站）/ `ws`（本地） | 单向（服务端 → 客户端） | 文本帧：全量快照 JSON |

快照结构（与源站逐字一致）：

```json
{
  "activityId": 1,
  "title": "2026厦门一中思明校区双代会",
  "status": 1,
  "updatedAt": "2026-09-06 09:55:01.071459048",
  "candidates": [
    { "id": 1, "number": "1", "name": "测试1", "displayOrder": 1, "voteCount": 25 }
  ]
}
```

特点：
- 服务端只在两种时机发消息：① 连接建立；② 数据变更。
- 每次消息都是**全量快照**，不做增量合并，客户端直接整体替换状态。
- 客户端**不向服务端发任何业务消息**，连接是单向的。

---

## 四、端到端数据流：一次录票的完整旅程

下面以「控制台点 +10」为例，画一张时序图：

```svg
<svg viewBox="0 0 680 360" width="100%" role="img">
  <title>录票一次端到端时序图</title>
  <desc>控制台点 +10 → Flask 处理 → 广播 → 大屏跳变 → 控制台回显</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#5F5E5A"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <line x1="80"  y1="40"  x2="80"  y2="340" stroke="#5F5E5A" stroke-width="0.5"/>
  <line x1="280" y1="40"  x2="280" y2="340" stroke="#5F5E5A" stroke-width="0.5"/>
  <line x1="480" y1="40"  x2="480" y2="340" stroke="#5F5E5A" stroke-width="0.5"/>
  <line x1="640" y1="40"  x2="640" y2="340" stroke="#5F5E5A" stroke-width="0.5"/>

  <text class="th" x="80"  y="24" text-anchor="middle" dominant-baseline="central" fill="#3C3489">控制台</text>
  <text class="th" x="280" y="24" text-anchor="middle" dominant-baseline="central" fill="#085041">Flask REST</text>
  <text class="th" x="480" y="24" text-anchor="middle" dominant-baseline="central" fill="#854F0B">tallyStore + Hub</text>
  <text class="th" x="640" y="24" text-anchor="middle" dominant-baseline="central" fill="#712B13">大屏 WS</text>

  <line x1="80" y1="60"  x2="640" y2="60"  class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="360" y="54" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">① 打开大屏 → ws.send(首帧 snapshot)</text>

  <line x1="80" y1="100" x2="280" y2="100" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="180" y="94" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">② 点 +10 → POST /vote {delta:10}</text>

  <line x1="280" y1="140" x2="480" y2="140" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="380" y="134" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">③ tallyStore.vote：锁内更新 voteCount + 落盘</text>

  <line x1="480" y1="180" x2="480" y2="180" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="480" y="174" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">④ hub.publish(id, buildSnapshot)</text>

  <line x1="480" y1="220" x2="640" y2="220" class="arr" marker-end="url(#arrow)"/>
  <line x1="280" y1="220" x2="640" y2="220" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="560" y="214" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">⑤ 大屏 + 控制台都收到 ws.send(snapshot)</text>

  <line x1="640" y1="260" x2="640" y2="260" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="640" y="254" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">⑥ 大屏：snapshot.candidates diff → +10 气泡</text>

  <line x1="280" y1="300" x2="80"  y2="300" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="180" y="294" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">⑦ 控制台 POST 拿到 200 + 操作日志刷新</text>
</svg>
```

关键观察：
- 步骤 ④⑤ 与步骤 ②③ 在同一个 Flask 线程里完成（store 内是 RLock 保护）。
- 控制台拿到 REST 200 之前，WS 广播可能已送达，所以控制台页面的「票数刷新」**先后被两
  个事件触发**：本地 REST 的 `loadRecords` 与 `snapshot` 推送。两条线互不冲突。
- 控制台页有个 `busyCandidateId` 单候选人粒度的防抖，避免同卡重复点击产生并发请求。

---

## 五、状态机

### 5.1 活动状态

```svg
<svg viewBox="0 0 680 160" width="100%" role="img">
  <title>活动状态机</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#5F5E5A"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <g class="node c-gray">
    <rect x="80"  y="60" width="140" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="150" y="84" text-anchor="middle" dominant-baseline="central" fill="#444441">待开始 status=0</text>
  </g>
  <g class="node c-teal">
    <rect x="270" y="60" width="140" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="340" y="84" text-anchor="middle" dominant-baseline="central" fill="#085041">进行中 status=1</text>
  </g>
  <g class="node c-coral">
    <rect x="460" y="60" width="140" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="530" y="84" text-anchor="middle" dominant-baseline="central" fill="#712B13">已结束 status=2</text>
  </g>

  <line x1="220" y1="78" x2="270" y2="78" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="245" y="68" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">切状态</text>

  <line x1="410" y1="78" x2="460" y2="78" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="435" y="68" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">切状态</text>

  <line x1="410" y1="100" x2="220" y2="100" class="arr" marker-end="url(#arrow)"/>
  <text class="ts" x="315" y="124" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">回退</text>
</svg>
```

- 只有 `status === 1` 允许录票；其他状态由后端直接拒（返回 `code !== 200` 的业务错误）。
- 状态机是「可任意切换」的——组织方可能先切到「已结束」，发现算错了又切回「进行中」。
  没有强行单向，这是为了贴合现场抢救场景。

### 5.2 候选人 vs 操作日志

- `candidates` 是「候选人静态档案」：编号、姓名、显示顺序、累计票数。
- `records` 是「操作流水」：每一条 vote 或 undo 都落一条，带 `undone` 标记。
- `voteCount` 是 `records` 的聚合视图（每次 vote/undo 同步更新一次）——简单实现，未做
  单独计数器表。
- 撤销的实现：从后往前找第一条 `type === 0 && !undone` 的记录，反向增减票数，标记为
  已撤销，追加一条 `type === 1` 的撤销记录。

---

## 六、数据模型（tally.json）

```
tally.json
├── meta                 计数器 + 抓取说明
│   ├── nextActivityId   新建活动时分配
│   ├── nextCandidateId  新建候选人时分配（已与源站最大 id 对齐到 20）
│   ├── nextRecordId     新增 vote/undo 记录时分配
│   └── note             抓取说明（哪些字段是源站真实快照，哪些是本地补齐）
└── activities[]
    ├── id, title, status, createdAt, updatedAt
    ├── capturedFromWs   仅作留档的源站抓取时刻快照
    ├── candidates[]     {id, number, name, displayOrder, voteCount}
    └── records[]        {id, candidateId, candidateNumber, candidateName, delta, type, undone, createdAt}
```

设计取舍：
- `records` 放在活动内而不是顶层 —— 单文件读 / 写、原子落盘成本最低。
- 不分多文件，不上 SQLite：本地演示场景下 `json.dump` 的 4 活动 33 候选人总耗时 < 5ms，
  远超单次 REST 请求的处理开销。
- `capturedFromWs` 是抓取时刻的快照留档，不参与运行时逻辑，可直接删。

---

## 七、WebSocket 前后端知识讲解

> 本节以唱票业务为案例，串讲 WebSocket 的核心概念。

### 7.1 为什么选 WebSocket

| 方案                  | 实时性 | 单向 / 双向 | 服务端复杂度 | 浏览器 API           |
| --------------------- | ------ | ----------- | ------------ | -------------------- |
| **轮询**（短间隔）     | 秒级   | 单向        | 低           | `setInterval` + XHR  |
| **长轮询**             | 亚秒级 | 单向        | 中           | `XMLHttpRequest`     |
| **SSE**（Server-Sent Events） | 亚秒级 | 单向        | 中           | `EventSource`        |
| **WebSocket**         | 毫秒级 | 全双工      | 中-高        | `WebSocket`          |

唱票要的是「控制台一点 +10，大屏柱顶立刻冒气泡」——毫秒级才不显得拖沓；并且服务端要主动
推，前端不需要回写业务消息但需要重连/重订阅。于是 **WebSocket + 单向使用模式** 是最简单
的选择。

SSE 也能做（一台大屏只有一个 EventSource），但浏览器原生 `EventSource` 的自动重连不能
控制退避，且国内老版本浏览器支持参差；WebSocket 更通用。

### 7.2 HTTP 升级握手

WebSocket 不是独立协议，而是 **HTTP 的一个 Upgrade**：

```
GET /ws/tally/activity/1 HTTP/1.1
Host: api.xmyzstudent.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

服务端收到后：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

—— `101` 表示「我知道你要升级，下面我们换协议说话」。之后这条 TCP 连接不再走 HTTP
而是按 WebSocket 帧协议收发。

> flask-sock 把这一切都封掉了，对应用层只暴露一个 `ws.send/recv/close`。

### 7.3 消息帧 vs HTTP chunk

HTTP/1.1 的 chunked transfer 是「同一个流里切多个 HTTP 响应」，浏览器要把每个 chunk
反序列化成 HTTP 头 + body 才能用；WebSocket 帧是 **二进制分帧**：

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

你不需要手算这个，浏览器和 flask-sock 会处理。**关键认识**：每条 WebSocket 帧都是独立
的，浏览器拿到一帧立刻触发 `onmessage`，而不是攒成一行 buffer——这就是实时性的来源。

### 7.4 双向 vs 单向的业务选择

WebSocket 协议是 **全双工** 的，但业务上可以是单向的。唱票这个场景：
- 服务端 → 客户端：每次状态变更推一帧全量快照；
- 客户端 → 服务端：不发任何业务消息。

为什么是「全量」而不是「增量 diff」？
- 增量需要服务端维护「上次发给这个连接的内容」并做差分，复杂度高；
- 全量让前端用最简单的 `ref.value = snapshot` 替换即可，对一个几十行的 candidates 数
  组来说，多几十字节完全无所谓；
- 客户端实现简单意味着**少 bug**，尤其是重连瞬间不需要回追增量。

### 7.5 后端广播模型（hub / room / queue）

```python
class tallyHub:
    def __init__(self):
        self.rooms = defaultdict(set)        # activityId -> {Queue}
        self.lock = threading.Lock()

    def subscribe(self, activityId):
        q = Queue()
        self.rooms[activityId].add(q)
        return q

    def publish(self, activityId, snapshot):
        payload = json.dumps(snapshot)
        for q in list(self.rooms.get(activityId, ())):
            q.put(payload)
```

**为什么每个连接要带一个 Queue？**
simple-websocket 的 `ws.send` 不是线程安全的——只能在持有该连接的线程里调用。Flask
的工作线程（处理 REST 请求）跑在另一个线程，所以它不能直接 `ws.send` 给你；它只能往
队列里塞字符串，由该连接线程自己 `q.get → ws.send`。

这就是经典的 **「发布者/订阅者 + 单生产者/单消费者」** 模式：

```svg
<svg viewBox="0 0 680 240" width="100%" role="img">
  <title>WS 广播拓扑</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
      markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#5F5E5A"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <g class="node c-amber">
    <rect x="40"  y="80" width="140" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="110" y="100" text-anchor="middle" dominant-baseline="central" fill="#633806">POST /vote</text>
    <text class="ts" x="110" y="120" text-anchor="middle" dominant-baseline="central" fill="#854F0B">Flask 工作线程</text>
  </g>

  <g class="node c-teal">
    <rect x="240" y="80" width="180" height="48" rx="8" stroke-width="0.5"/>
    <text class="th" x="330" y="100" text-anchor="middle" dominant-baseline="central" fill="#085041">hub.publish(id, snap)</text>
    <text class="ts" x="330" y="120" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">广播中心（持锁）</text>
  </g>

  <line x1="180" y1="104" x2="240" y2="104" class="arr" marker-end="url(#arrow)"/>

  <line x1="420" y1="80"  x2="500" y2="40"  class="arr" marker-end="url(#arrow)"/>
  <line x1="420" y1="104" x2="500" y2="104" class="arr" marker-end="url(#arrow)"/>
  <line x1="420" y1="128" x2="500" y2="168" class="arr" marker-end="url(#arrow)"/>

  <g class="node c-gray">
    <rect x="500" y="20"  width="140" height="40" rx="8" stroke-width="0.5"/>
    <text class="ts" x="570" y="40" text-anchor="middle" dominant-baseline="central" fill="#444441">队列1（大屏）</text>
  </g>
  <g class="node c-gray">
    <rect x="500" y="84"  width="140" height="40" rx="8" stroke-width="0.5"/>
    <text class="ts" x="570" y="104" text-anchor="middle" dominant-baseline="central" fill="#444441">队列2（控制台A）</text>
  </g>
  <g class="node c-gray">
    <rect x="500" y="148" width="140" height="40" rx="8" stroke-width="0.5"/>
    <text class="ts" x="570" y="168" text-anchor="middle" dominant-baseline="central" fill="#444441">队列3（控制台B）</text>
  </g>
</svg>
```

每个连接线程的循环逻辑：

```python
while True:
    payload = queue.get(timeout=1)        # 阻塞拿，没有消息 1s 超时
    if payload: ws.send(payload)          # 只在持线线程里调用 send
    if not ws.connected: break            # 对端断开就退出
    ws.receive(timeout=0)                 # 非阻塞探测，防漏掉 close 帧
```

`queue.get(timeout=1)` 的「1 秒空转」代价是无可避免的——你需要一个「醒来看看 ws 还活着没」
的机会，否则要等到对端真断开后 send 抛异常才能发现。生产场景可以换成 `select`/`epoll`
级别的就绪通知，但 WSGI 线程模型下就用最简单的轮询。

### 7.6 前端重连机制（指数退避）

浏览器侧写一个 `useTallySocket` composable：

```js
let socket = null;
let retryDelay = 1000;     // 初始 1s
let closedByUs = false;

function connect(id) {
  teardown();              // 先把旧的拆掉
  closedByUs = false;
  socket = new WebSocket(tallyActivityWsUrl(id));
  socket.onopen  = () => { connected.value = true; retryDelay = 1000; };
  socket.onclose = () => { connected.value = false; if (!closedByUs) scheduleReconnect(id); };
  socket.onerror = () => {};                              // 错误由 close 接管
  socket.onmessage = (ev) => { snapshot.value = JSON.parse(ev.data); };
}

function scheduleReconnect(id) {
  setTimeout(() => connect(id), retryDelay);
  retryDelay = Math.min(retryDelay * 2, 30000);          // 1→2→4→…→30s 上限
}
```

为什么是「1→2→4→…→30s」？
- 重连一定是**对端暂时不可用**或**网络抖动**。如果你立刻重连只会被对端再次拒绝，
  浪费资源；
- 指数退避是几乎所有长连接客户端的标配（浏览器、SDK、消息队列消费者…）；
- 30s 是经验值：太大会让用户以为彻底挂了，太小在长时间故障时还是会被对端 throttle。
- `closedByUs` 标记区分「我自己关闭」和「对端异常关闭」——前者不该再重连，否则路由跳转
  后会留下幽灵连接。

### 7.7 心跳：要不要发？

常被问到：「WebSocket 要不要心跳？」
- **应用层心跳**：定时往队列塞一帧 `{"type":"ping"}`，对端 `JSON.parse` 后丢弃。
  缺点：占用带宽、要在所有页面里过滤。
- **协议层 ping/pong**：浏览器和 wsproto 都支持，但浏览器 JS API **不暴露**发送 ping
  帧的方法——你只能发文本/二进制帧。这意味着浏览器侧的「应用层心跳」几乎是唯一选择。
- **本项目的心跳策略**：**不主动发**。理由是：
  1. Flask 的 `ws.connected` 在 1 秒轮询里已经能感知对端关闭；
  2. 公网代理（nginx、CDN）的空闲超时通常 60-300s，几分钟没数据不一定断；
  3. 唱票现场大屏常驻，连接稳定，空闲断线概率极低。
- 如果将来要部署到公网并需要穿透 Cloudflare/ALB，可以加一个「每 25s 发一帧
  `{"type":"ping"}`」并让 useTallySocket 识别并丢弃（不污染 snapshot）。

### 7.8 同源 vs 跨域

源站的 WS 地址是 `wss://api.xmyzstudent.com/ws/...`，跟前端页面的 host
`xmyzstudent.com` 是不同子域，靠浏览器的 WebSocket 同源策略放行（WebSocket 协议不受
同源策略限制——浏览器只对 WS 握手阶段的 HTTP 头做检查）。

本地复刻把 WS 改为同源 `ws://127.0.0.1:5055/ws/...`，免去跨域握手，成功率更高（部分
代理只透传 80/443 端口的 WS，同源直接走 5055 端口即可）。

### 7.9 与 HTTP 长连接的对比小结

| 维度            | WebSocket                   | HTTP 长轮询                 | SSE                     |
| --------------- | --------------------------- | --------------------------- | ----------------------- |
| 协议            | 自有帧协议                  | HTTP chunked                | HTTP chunked            |
| 实时性          | 毫秒                        | 秒级                        | 毫秒                    |
| 服务端多连接成本 | 一条 TCP/连接               | 一条 TCP/连接（开 - 关 - 开）| 一条 TCP/连接           |
| 客户端复杂度    | 中（要写重连）              | 低                          | 低（自动重连）          |
| 双向            | 是                          | 否（要发数据就再开 XHR）    | 否                      |
| 浏览器兼容      | 现代浏览器全支持            | 全部                        | 不支持 IE               |

结论：**当「服务端要主动推」且「实时性要求高」时，WebSocket 几乎总是最简单稳的选择。**

---

## 八、验证结果

| 测试                                      | 结果        |
| ----------------------------------------- | ----------- |
| `node _e2e.mjs` REST + WS 全流程冒烟     | 20/20 PASS  |
| Playwright 渲染：活动管理页 + 配置页 + 控制台 + 大屏 | 全部正常，无 console error |
| 控制台 +10 → 大屏柱顶 +10 气泡（实测）    | 220 → 230 → 撤销 → 220 |
| 多端同步：大屏 + 控制台同时连同一活动     | 都收到广播帧 |

附：`_e2e.mjs` 测了 REST 全流程 + 多端 WS 广播。Playwright 渲染验证在
`C:\Users\Administrator\AppData\Local\Temp\_verify_ui.py`，输出截图
`shot_screen_before.png` / `shot_screen_after.png` / `shot_admin_tally.png` 等。

---

## 九、移植改动清单

为了让你能复盘「动了什么、为什么动」，下面是所有改动的索引：

| 文件                                          | 改动                                                                 | 原因                              |
| --------------------------------------------- | -------------------------------------------------------------------- | --------------------------------- |
| `static/index.html`                           | `<base href>` `/XMYZStudent/` → `/`，移除子路径前缀                  | 路由需与源站一致且不带前缀        |
| `static/index.html`                           | `/XMYZStudent/assets/**` → `/assets/**`                              | 同上                              |
| `static/assets/index-DJrtCu9i.js`             | axios `baseURL` 由源站绝对地址改为 `/api/v2`（同源）                 | 让 axios 自动打到本地 Flask       |
| `static/assets/index-DJrtCu9i.js`             | `__vite__mapDeps` 依赖清单由 168 项裁剪为 16 项（仅 tally 业务闭包）| 避免静态文件缺失导致 preload 404  |
| `static/assets/index-DJrtCu9i.js`             | 路由表由 100+ 条裁剪为 6 条（4 条 tally + 根重定向 + 兜底）          | 不复刻无关业务，减小体积          |
| `static/assets/tally-DC36h0vE.js`             | WS URL 改为按当前页面 origin 推导                                    | 同源部署                          |
| `static/assets/useTallySocket-Bnuwbx53.js`    | 整体重写：变量名语义化 + 详尽注释                                    | 用户要求                          |
| 4 个页面 chunk                                | setup 体顶部注入变量映射注释 + render 函数前加职责注释                | 用户要求 + 不破坏 Vue 编译产物    |
| `app.py`                                      | 从零实现的 Flask 后端                                                | 后端不存在                        |
| `tally.json`                                  | 抓取源站 4 个活动真实快照 + 占位字段                                 | 提供初始数据                      |

---

## 附：跨浏览器打开链接的常见坑

- **某些办公网封 5055 端口** —— 改用 `--port 80/443/8080`，或在反向代理后面跑。
- **跨设备访问** —— `--host 0.0.0.0`，然后用 `http://本机IP:5055/` 访问。
- **本机 HTTPS 自签证书** —— 加 `--cert cert.pem --key key.pem`（flask-sock 也支持 HTTPS）。
- **同时跑前端 mock 与本地后端** —— `__dev-auth.js` 只 mock `api.xmyzstudent.com` 域名，
  不会影响 `127.0.0.1` 同源请求，可放心共存。