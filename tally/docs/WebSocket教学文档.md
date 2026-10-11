# WebSocket 前端与后端知识讲解

> 以本仓库「tally 实时唱票」为案例素材，讲解 WebSocket 从升级握手到断线重连的完整知识链。
> 配套代码：`tally/static/assets/useTallySocket-Bnuwbx53.js`（前端）与 `tally/app.py`（后端）。

---

## 0. 为什么这里需要 WebSocket？

tally 大屏的业务场景是**服务端状态（票数）被多个客户端同时关注，且随时可能变化**：

- 后台控制台录票 → 大屏必须**立即**看到票数跳动；
- 如果大屏用 HTTP 轮询（比如每 2 秒 GET 一次），会有两类问题：
  1. **延迟**：轮询间隔决定了最坏延迟（2s 轮询最坏 2s 才看到变化）；
  2. **浪费**：90% 的轮询没有新数据，白白消耗带宽与服务器资源。

WebSocket 提供的是**服务端主动推送**（Server Push）能力：连接建立后，服务端可以在
任意时刻把新状态推给客户端，延迟达到毫秒级，且空闲时不产生任何流量。

| 对比项 | HTTP 轮询 | WebSocket |
|---|---|---|
| 方向 | 只能客户端先请求 | 双向，服务端可主动推送 |
| 实时性 | 受轮询间隔限制 | 事件触发即达 |
| 空闲开销 | 每个轮询周期都有 HTTP 头开销 | 空闲零流量 |
| 复用 | 每个请求独立，无连接状态 | 单一长连接，天然带会话 |

---

## 1. 升级握手（HTTP Upgrade Handshake）

WebSocket 并不是凭空出现的协议，它的连接是**借道 HTTP**建立的。流程如下：

```
客户端                                服务端
  │  ① HTTP GET 请求                    │
  │  GET /ws/tally/activity/1 HTTP/1.1  │
  │  Host: localhost:20344              │
  │  Upgrade: websocket                 │
  │  Connection: Upgrade                │
  │  Sec-WebSocket-Key: dGhlIHNhbXBsZ...│   ← 客户端随机生成的 16 字节 base64
  │  Sec-WebSocket-Version: 13          │
  │────────────────────────────────────▶│
  │                                     │
  │  ② HTTP 101 Switching Protocols     │
  │  HTTP/1.1 101 Switching Protocols   │
  │  Upgrade: websocket                 │
  │  Connection: Upgrade                │
  │  Sec-WebSocket-Accept: s3pPLMBiTxa...│  ← 服务端对 Key 做 SHA-1+base64 后的应答
  │◀────────────────────────────────────│
  │  ③ 协议切换完成，进入 WebSocket 帧流  │
```

要点：

1. **`Sec-WebSocket-Key` → `Sec-WebSocket-Accept`**：客户端发一个随机 Key，
   服务端拼上固定 GUID `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` 后做
   `SHA1(key + GUID)` 再 base64，返回给客户端。客户端校验一致才认为握手成功——
   这保证服务端**真的支持** WebSocket，而不是某个恰好返回 101 的中间件。
2. **`Sec-WebSocket-Version: 13`**：目前唯一的正式版本号（RFC 6455）。
3. 握手完成后，**同一个 TCP 连接**升级为 WebSocket 帧流，不再有 HTTP 语义。
4. 本案例中，浏览器 `new WebSocket("ws://localhost:20344/ws/tally/activity/1")`
   自动完成上述握手；服务端 `flask_sock` 的 `@sock.route("/ws/tally/activity/<int:activity_id>")`
   负责接收 Upgrade 请求、校验并返回 101。

---

## 2. 帧（Frame）与消息

握手之后，双方传输的不再是"请求/响应"，而是**帧**。WebSocket 帧的最小格式：

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
```

关键字段：

| 字段 | 含义 | 案例中的值 |
|---|---|---|
| FIN | 本帧是否消息最后一帧（分片标志） | 1（JSON 小消息不分片） |
| opcode | 帧类型：0x1 文本、0x2 二进制、0x8 关闭、0x9 ping、0xA pong | 0x1（文本 JSON） |
| MASK | 客户端→服务端**必须**置 1（掩码）；服务端→客户端置 0 | 上行为 1，下行为 0 |
| Payload len | 载荷长度，7 位不够时用 16/64 位扩展 | 快照 JSON 约 300B，7 位可容 125B，超了走扩展 |

**协议强制要求**：客户端发往服务端的帧必须带掩码（防缓存投毒），服务端发往客户端
必须不带掩码。浏览器与 Flask 库都自动处理，开发者无需手写帧——但理解它有助于排查
抓包时"为什么字节对不上"。

**本案例的实际载荷**：一条文本帧就是一个 JSON 快照字符串：

```json
{"activityId":1,"title":"2026厦门一中思明校区双代会","status":1,
 "updatedAt":"2026-10-07 11:34:39.123456","candidates":[
   {"id":1,"number":"1","name":"测试1","displayOrder":1,"voteCount":25}]}
```

前端 `useTallySocket` 中 `JSON.parse(event.data)` 即是对该文本帧载荷的解析。

---

## 3. 广播模型（Broadcast）

服务端收到一次录票（HTTP POST vote）后，需要把新快照发给**当前正在关注该活动的
所有客户端**——这就是广播。本案例的实现（`tally/app.py`）：

```python
_ws_clients = {}          # { activity_id: set(WebSocket) }  订阅者表
_ws_lock = threading.Lock()  # 保护订阅者表的锁

# WS 端点：连接建立时注册，断开时注销
@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id):
    with _ws_lock:
        _ws_clients.setdefault(activity_id, set()).add(ws)   # 注册
    try:
        ws.send(首帧快照)                                     # 连接即推
        while True:
            ws.receive()                                     # 维持连接
    finally:
        with _ws_lock:
            _ws_clients[activity_id].discard(ws)             # 注销

# 写操作完成后广播
def _broadcast(activity_id):
    payload = 构造最新快照()
    with _ws_lock:
        clients = list(_ws_clients.get(activity_id, set()))
    for ws in clients:
        ws.send(payload)     # 逐个推送（失败则剔除）
```

设计要点：

1. **按活动维度分桶**（`activity_id → 订阅者集合`）：只有关注同一活动的客户端收到更新，
   避免跨活动误推（大屏 /1 不该收到活动 /2 的票数）；
2. **订阅者集合用 set 去重**，同一浏览器多开标签页各自是独立连接；
3. **广播放在数据锁之外**：构造快照时持数据锁，发送时只持订阅锁——网络发送可能阻塞，
   绝不能长时间占着数据锁（这也是本任务实现中踩过并修复的锁顺序问题）；
4. **发送失败即剔除**：客户端断开后残留的连接会在 `send` 抛异常时被移除，防止僵尸连接累积。

**推送时机（与源站行为一致）**：连接建立的首帧 + 每次"写"（录票、撤销、候选人增删改、
改名、状态切换、删除活动）后。

---

## 4. 前端重连（指数退避）

网络抖动、服务端重启、空闲超时都会导致连接断开。大屏这类"长期挂着的页面"必须能自动恢复。
本案例前端（`useTallySocket-Bnuwbx53.js`）实现了**指数退避重连**：

```
连接断开（onclose，非主动关闭）
   └─▶ 等待 reconnectDelayMs（初始 1000ms）
   └─▶ 重连；失败 → 间隔 ×2（1000 → 2000 → 4000 → … 封顶 30000ms）
   └─▶ 成功（onopen）→ 间隔重置为 1000ms，重新开始
```

```javascript
socket.onopen = () => { connected.value = true; reconnectDelayMs = 1000; };
socket.onclose = () => {
  connected.value = false;
  if (!manuallyClosed) scheduleReconnect(activityId);   // 非主动关闭才重连
};
function scheduleReconnect(activityId) {
  clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => connect(activityId), reconnectDelayMs);
  reconnectDelayMs = Math.min(reconnectDelayMs * 2, 30000);
}
```

几个工程细节：

1. **主动关闭 vs 被动断开**：组件卸载或路由切换时，前端先置 `manuallyClosed=true` 再
   `socket.close()`，`onclose` 看到标记就不再重连——避免离开页面后还在后台无限重连；
2. **封顶**：退避上限 30s，避免服务不可用时以高频率打爆服务器；
3. **重置**：一旦连接成功，间隔立刻回到 1s，保证下次短暂抖动能快速恢复；
4. **快照天然幂等**：每次重连后服务端推送完整快照（而非增量），前端整体替换即可，
   不必担心重连期间丢消息——这正是"全量快照 + 广播"设计的好处。

---

## 5. 心跳（Heartbeat / Ping-Pong）

WebSocket 本身**没有应用层心跳**——TCP 层断线往往要很久才能被发现（尤其经过
NAT/负载均衡时，空闲连接可能被中间设备静默回收）。业界两种心跳方案：

### 方案 A：协议层 Ping/Pong（推荐，本案例服务端采用）

RFC 6455 定义了 **Ping（0x9）/ Pong（0xA）** 控制帧：

```
服务端                                   客户端
  │── Ping 帧(0x9, 带随机载荷) ─────────▶│
  │◀── Pong 帧(0xA, 原样回载荷) ─────────│   ← 浏览器自动应答，无需业务代码
```

- 服务端周期性（如每 30s）发 Ping；若一段时间（如 60s）收不到 Pong，判定连接已死，主动关闭；
- 浏览器**自动**对 Ping 回 Pong，开发者无需处理；
- 本案例 Flask 侧由 `ping_interval` 控制（当前用 `ping_interval=None` 表示协议层不主动
  ping——本地演示场景），生产环境应开启并按需调参。

### 方案 B：应用层业务心跳

如果网关/代理不支持透传 Ping 帧，可在业务层定期互发"心跳消息"：
客户端每 N 秒发 `{"type":"ping"}`，服务端回 `{"type":"pong"}` 或记录最后活跃时间，
超时未活跃的连接由服务端回收。缺点是需要业务协议字段，并增加消息量。

### 前端视角

- `onclose` 与 `onerror` 是前端唯一感知断线的手段；心跳的作用是**让断线尽快暴露**，
  从而触发 §4 的重连逻辑；
- 连接状态指示：本案例大屏右上角 `connected` ref 驱动"已连接 / 重连中…"指示器，
  用户能直观看到连接健康度。

---

## 6. 把知识串起来：一次完整的大屏刷新

```
1. 页面加载：new WebSocket(url)  →  HTTP Upgrade 握手（§1）→ 101
2. 服务端立即推送首帧文本消息（§3 首帧）
3. 浏览器 onmessage → JSON.parse → snapshot ref → 渲染柱状图（§2 帧解析）
4. 后台控制台录票：POST vote → 后端落盘 → _broadcast（§3 广播）
5. 大屏收到新快照：对比新旧票数 → 生成 "+5" 弹幕动画
6. 期间若网络抖动断开：onclose → 指数退避重连（§4）→ 恢复后收到完整新快照
7. 若连接被中间设备静默回收：心跳 Ping/Pong 超时 → 服务端关闭 → 同样走重连（§5）
```

---

## 7. 本案例可借鉴的工程清单

| 工程点 | 实现 | 文件位置 |
|---|---|---|
| WS 服务端路由 | `@sock.route('/ws/tally/activity/<int:id>')` | `tally/app.py` |
| 连接即推首帧 | 注册后立即 `ws.send(快照)` | `tally/app.py` |
| 按活动分桶广播 | `{activity_id: set(ws)}` | `tally/app.py` |
| 广播不占数据锁 | 构造快照持数据锁，发送持订阅锁 | `tally/app.py` |
| 失败连接剔除 | `send` 异常 → `discard` | `tally/app.py` |
| 前端指数退避重连 | 1s→30s 封顶，成功即重置 | `useTallySocket-Bnuwbx53.js` |
| 主动关闭不重连 | `manuallyClosed` 标记 | `useTallySocket-Bnuwbx53.js` |
| 全量快照幂等 | 每次推送完整 JSON，前端整体替换 | 两端约定 |
| 连接状态 UI | `connected` ref → 指示器 | `ScreenPage` / `TallyControlPage` |
| 心跳 | 生产应开启 Ping/Pong 并定时清理僵尸连接 | 部署建议 |
