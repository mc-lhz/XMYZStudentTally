# WebSocket 前端与后端知识讲解

> 以本项目的「实时唱票大屏」为案例，把 WebSocket 从握手到重连的整条链路讲一遍。
> 每一节都对照本仓库的真实代码，不放空理论。

---

## 0. 为什么这个业务必须用 WebSocket

先看没有 WebSocket 会怎样。大屏可以每 1 秒轮询一次票数：

| 方案 | 一场 3 小时的活动（10 块大屏） | 问题 |
|---|---|---|
| HTTP 轮询（1s） | 10 × 10800 = **10.8 万次请求** | 99.9% 的请求返回的是「和上次一样的数据」 |
| WebSocket | 10 次握手 + **实际变化的几十次推送** | 没变化就不发 |

唱票现场的特点是「长时间静默、关键时刻连续变化」：
静默时轮询纯属浪费，变化时又希望越快越好。这正是**服务端主动推送**的典型场景。

WebSocket 相比其它几种「推送」方案的位置：

* **短轮询**：一问一答，最简单，但延迟和流量都随频率线性增长；
* **长轮询（long polling）**：服务端把请求挂住直到有数据，延迟好一些，但仍是一次性连接、每次要重新带 Cookie/头；
* **SSE（Server-Sent Events）**：单向、纯文本、基于 HTTP，非常适合「只推不收」，但不支持二进制、且浏览器对同域连接数有限制；
* **WebSocket**：**一条 TCP 连接，双向、全双工、帧化**，握手时借用 HTTP，握手完成后就是一个完全独立的协议；
* **WebTransport/QUIC**：更新，能避免队头阻塞，但兼容性与部署成本更高。

本项目是「大屏只收（快照）、控制台只发（HTTP 写票）」，严格说 SSE 也能做；
但源站选型是 WebSocket，且控制台也要收快照，于是本项目照抄这条链路。

---

## 1. 升级握手：HTTP 是怎么「变成」WebSocket 的

WebSocket 连接的第一帧仍然是普通的 HTTP/1.1 请求，只是带了几个特殊头：

```http
GET /ws/tally/activity/1 HTTP/1.1
Host: 127.0.0.1:5000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

服务端如果同意升级，**不返回 200，而是返回 101 Switching Protocols**：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

几个必须理解的点：

1. **`Sec-WebSocket-Key` 是防误连，不是鉴权。**
   它是客户端随机的 16 字节 Base64。服务端把它拼上固定字符串
   `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`，取 SHA-1 再 Base64，回填到
   `Sec-WebSocket-Accept`。客户端校验一致才继续 —— 作用是确认对端**真的懂 WebSocket**，
   而不是某个把 `Upgrade` 头当普通头忽略掉的中间层。
   **它不提供任何身份保证**，鉴权必须自己做（见第 7 节）。
2. **101 之后，这条 TCP 连接就不再属于 HTTP 了。**
   之后所有的字节都由 WebSocket 帧协议解释，不能再发 HTTP 请求；
   反向代理（Nginx 等）必须显式配置升级转发，否则会把它当普通 HTTP 处理而断开。
3. **握手不能自定义方法或改路径语义。**
   所以 WS 地址和 REST 地址通常长得很不一样：本项目 REST 是 `/api/v2/tally/...`，
   WS 是 `/ws/tally/activity/{id}` —— 源站就是这么分的，本地实现保持同构。
4. **`ws://` 与 `wss://`** 分别对应明文与 TLS。
   HTTPS 页面里**只能**连 `wss://`（混合内容会被浏览器直接拦掉），
   所以前端代码里必须按当前协议选择：

   ```js
   // tally/static/assets/tally-BvCEJ8Iv.js
   const wsOrigin = window.__TALLY_WS_ORIGIN__ ||
     (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host
   return `${wsOrigin}/ws/tally/activity/${activityId}`
   ```

   这也解释了本地实现为什么要改 origin 而保留路径：
   线上是 `wss://api.xmyzstudent.com/ws/tally/activity/1`，
   本地是 `ws://127.0.0.1:5000/ws/tally/activity/1`，**路径逐字一致**。

---

## 2. 帧：连接建立之后数据长什么样

握手之后，双方用**帧（frame）**通信。一个帧的头部最少 2 字节：

```
 0               1               2               3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |    (16/64, 按 len 决定)        |
|N|V|V|V|       |S|             |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|   Masking-key（客户端→服务端必有，4 字节）                      |
+---------------------------------------------------------------+
|                     Payload Data                              |
+---------------------------------------------------------------+
```

要记住的只有几条：

* **`opcode`**：`0x1` 文本、`0x2` 二进制、`0x8` 关闭、`0x9` ping、`0xA` pong。
* **`MASK` 位**：**客户端发给服务端的帧必须掩码**（4 字节 masking key，
  载荷逐字节异或），服务端发给客户端的帧**必须不掩码**。
  这是协议硬性要求，违反会被对端直接断开（防代理缓存投毒）。
* **`FIN`**：分片标志。一条大消息可以拆成多个帧（第一帧 FIN=0，最后一帧 FIN=1，
  中间帧 opcode=0 表示延续）。本项目快照只有几百字节，永远单帧。
* **长度字段**：7 位能表示 0–125；126 表示后面还有 2 字节长度（≤64KB）；
  127 表示后面还有 8 字节长度。
* **ping/pong 是协议层的控制帧**，可以由任一端发起，用来探测连接是否还活着。

在浏览器里你**看不到也发不出裸帧**，`WebSocket` 对象把帧的收发封成了三个事件：

```js
const ws = new WebSocket(url)
ws.onopen    = () => { /* 握手完成，可以发数据了 */ }
ws.onmessage = (event) => { /* event.data 是字符串或 Blob/ArrayBuffer */ }
ws.onclose   = (event) => { /* event.code / event.reason / event.wasClean */ }
ws.onerror   = () => { /* 细节很少，主要用于日志 */ }
```

值得注意的是：**浏览器不允许你手动发 ping 帧**
（`ws.ping()` 不存在）。所以如果你想让服务端知道「我还在」，
要么依赖 TCP/协议层的 pong 自动回复，要么在**应用层**自己约定文本心跳
（本项目服务端就兼容了应用层 `ping` → 回 `pong`）。

服务端这边，本项目用的是 `flask-sock`，它把帧层封成了阻塞式收发：

```python
@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id):
    ws.send(json.dumps(snapshot, ensure_ascii=False))   # 发一帧文本
    while True:
        data = ws.receive(timeout=None)                 # 阻塞读一帧
        if data is None:                                # 对端关闭
            break
```

`ws.receive()` 在连接关闭时返回 `None`，这就是服务端发现「大屏被关掉/网络断了」的信号。

---

## 3. 广播模型：一个变化的票数如何到达 N 块大屏

这是本项目服务端的核心结构，只有三十来行：

```python
class TallySocketHub:
    def __init__(self):
        self._rooms = {}          # {activity_id: {ws1, ws2, ...}}
        self._meta  = {}          # {ws: {activityId, remote, connectedAt, sent}}

    def register(self, activity_id, ws, remote): ...
    def unregister(self, ws): ...

    def broadcast(self, activity_id, snapshot):
        for ws in list(self._rooms.get(activity_id, ())):
            if not self.send(ws, snapshot):     # 单个连接失败不能影响别人
                dead.append(ws)
        for ws in dead:
            self.unregister(ws)
```

几个设计要点，值得单独说清楚：

1. **房间（room）维度是活动 id**，不是「全体连接」。
   同一台服务器可能同时服务多场唱票，把快照推给不相干的连接既是浪费也是数据泄漏。
2. **广播要遍历拷贝**：`list(...)` 是为了避免「遍历时有人退出」导致
   `RuntimeError: Set changed size during iteration`。
3. **逐连接容错**：某个大屏的网络烂掉了，`ws.send` 会抛异常；
   必须捕获、把这条连接移出房间，**而不是让整个广播失败**。
   这是广播模型最容易踩的坑 —— 一个坏客户端拖垮所有客户端。
4. **推送的是「全量快照」而不是「增量事件」**。
   增量事件（如 `{type:'vote', candidateId:7, delta:5}`）看起来更省流量，
   但它要求客户端自己维护状态机：一旦丢一帧，客户端就永久错位。
   而全量快照是**幂等**的 —— 丢掉一帧、多收一帧，最终状态都正确。
   票数数据只有几百字节，用幂等换可靠性非常划算。
5. **并发写串行化**：本项目是「单进程 Flask + 存储层一把可重入锁」。
   如果要横向扩容到多进程/多机，房间表和一个进程内的锁就不够了，
   必须引入外部广播通道（Redis Pub/Sub、NATS、或数据库 LISTEN/NOTIFY）。
   这是本项目**有意留出的边界**，也是本地实现与线上规模的真实差距。

---

## 4. 前端重连：为什么必须做，怎么做才对

这一段对应 `tally/static/assets/useTallySocket-BrS_O9ye.js`，逻辑很短但每行都有原因：

```js
let socket = null
let retryDelay = 1000          // 首次重连间隔 1 秒
let retryTimer = null
let manualClose = false        // 区分「我方主动关」和「被动断开」

function connect(id) {
  teardown()
  manualClose = false
  try {
    socket = new WebSocket(tallySocketUrl(id))
  } catch (e) {
    scheduleReconnect(id)      // 连 URL 都构造失败也要退避重试
    return
  }
  socket.onopen = () => { connected.value = true; retryDelay = 1000 }  // 成功后重置退避
  socket.onmessage = (ev) => { snapshot.value = JSON.parse(ev.data) }
  socket.onclose = () => {
    connected.value = false
    if (!manualClose) scheduleReconnect(id)   // 被动断开才重连
  }
  socket.onerror = () => {}                   // 错误细节很少，交给 onclose 处理
}

function scheduleReconnect(id) {
  if (retryTimer) clearTimeout(retryTimer)
  retryTimer = setTimeout(() => connect(id), retryDelay)
  retryDelay = Math.min(retryDelay * 2, 30000)   // 指数退避，封顶 30 秒
}
```

逐条解释「为什么」：

* **为什么要指数退避？**
  如果服务端宕机，所有大屏都在 1 秒一次地重连，就会形成重连风暴（thundering herd），
  服务端刚恢复就再次被打挂。退避到 30 秒封顶，既保证恢复得快（前期间隔短），
  又不至于把服务端打死。
* **为什么成功后要重置 `retryDelay`？**
  不重置的话，一次长时间断网会把间隔永久推到 30 秒，
  此后即使只是瞬断也要等 30 秒才恢复 —— 大屏会「莫名慢半拍」。
* **为什么要 `manualClose` 标志？**
  组件卸载时我们要主动 `close()`，如果不加区分，
  `onclose` 会把它当成意外断开又去重连 —— 于是产生一个永远关不掉的定时器，
  页面切走之后还在后台连服务端（内存泄漏 + 幽灵连接）。
* **为什么 `onclose` 才是主战场？**
  浏览器对 `onerror` 的信息给得极少（出于安全考虑），
  真正的断开信号是 `onclose`，所以重连逻辑挂在它上面。
* **为什么连接建立后服务端要立刻推一份快照？**
  断线重连期间票数可能已经变了。客户端重连成功后**不应该依赖自己缓存的数据**，
  服务端**主动补一份全量快照**是最简单的自愈方式 ——
  这也是「广播全量快照」这个设计带来的第二个好处。

---

## 5. 心跳：怎么判断「连接还活着」

TCP 连接「看起来是开着的」不等于「对面还在」。
如果大屏所在机器被拔了网线、或中间 NAT 表项过期，
服务端这一侧可能长时间收不到任何信号，连接会一直挂在房间表里，
此后每次广播都会去写一个死连接（浪费、且拖慢广播）。

业界两种常见做法：

| 做法 | 谁发起 | 说明 |
|---|---|---|
| **协议层 ping/pong** | 任一端 | 服务端发 ping 帧，对端协议栈自动回 pong；**不需要应用代码参与**，但浏览器不允许 JS 手动发起 |
| **应用层心跳** | 应用约定 | 例如前端每 25 秒发一个文本 `"ping"`，服务端回 `{"type":"pong"}`；可穿透那些会缓存/改写帧的中间件 |

本项目的处理：

* 服务端在 `receive()` 循环里同时承担了**探活**职责 ——
  一旦 `receive()` 返回 `None`（对端关闭或 TCP 断开），立刻 `unregister` 出房间；
* 兼容应用层心跳：收到 `ping` 或 `{"type":"ping"}` 就回 `{"type":"pong"}`；
* 广播时若某个连接写失败，也立即摘除。

另外两个容易被忽略的细节：

* **服务端也要能主动踢掉僵尸连接**。生产环境通常再加一层
  「超过 N 秒没收到任何上行帧 → 主动发 ping/pong 探测，两次无响应则关闭」。
  本项目连接数是个位数，靠 `receive()` 的断开信号就足够，**没有额外加定时器**（避免过度设计）。
* **中间设备会主动断长连接**。公司代理、云负载均衡常见 60 秒空闲超时，
  所以心跳间隔要小于这个数（一般 25–30 秒）。
  本项目在演示场景下是「静默期长、但一旦断开前端 1 秒内就会重连」，
  因此没有强制心跳；这是**有意取舍**，上生产应补。

---

## 6. 消息格式与幂等性

本项目所有推送都是同一种消息：一个全量快照对象。

```json
{
  "activityId": 4,
  "title": "2026年厦门一中思明校区主席竞选",
  "status": 1,
  "candidates": [
    {"id": 9,  "number": "1", "name": "刘希瑞", "displayOrder": 1, "voteCount": 220},
    {"id": 17, "number": "9", "name": "肖以晨", "displayOrder": 9, "voteCount": 799}
  ],
  "updatedAt": "2026-09-25T09:12:03.361378025"
}
```

好处：

* **客户端逻辑极简**：`snapshot.value = JSON.parse(ev.data)`，然后由框架重渲染；
* **天然幂等**：重复帧、乱序帧、丢失帧都不会让画面错位；
* **前后端解耦**：服务端不需要知道有几个大屏、也不需要给每个大屏维护序号。

代价：

* 每次推送都带全量数据（本项目几十个候选人、几百字节，可忽略）；
* 候选人多、推送频率高的场景要改成「版本号 + 增量补齐」，
  此时**必须**给消息带单调递增的版本号，客户端发现版本跳跃就主动请求一次全量。

如果要用二进制提升效率，浏览器侧是：

```js
const ws = new WebSocket(url)
ws.binaryType = 'arraybuffer'      // 默认是 'blob'
ws.onmessage = (ev) => {
  const view = new DataView(ev.data)
  // 按约定的二进制布局解析
}
```

本项目用 JSON 文本帧 —— 可读性、可调试性（浏览器 Network → WS 面板能直接看到消息体）
在这个规模下比省那几个字节重要得多。

---

## 7. 鉴权与安全

WebSocket 有几个容易踩的安全坑：

1. **握手不校验身份的话，任何人都能连。**
   浏览器的 `WebSocket` 构造函数**不能自定义请求头**，
   所以你没法像 axios 那样塞 `Authorization: Bearer ...`。
   常见三种解法：
   * **URL 查询参数带临时票据**：`wss://host/ws/...?ticket=xxx`，票据一次性、短时效；
   * **Cookie**：浏览器会自动带上同域 Cookie，服务端在握手时校验（要防 CSRF，检查 `Origin`）；
   * **子协议头**：`new WebSocket(url, ['bearer', token])`，服务端读 `Sec-WebSocket-Protocol`。
   本项目的大屏是**公开只读**的（源站同样如此：公开快照接口无需认证），
   因此 WS 通道不做鉴权，只读快照；**写操作全部走需要 Bearer token 的 REST 接口** ——
   把「只读的实时通道」和「可写的控制通道」分开，是比给 WS 加鉴权更简单也更安全的架构。
2. **必须校验 `Origin`**：WebSocket 不受同源策略保护，
   恶意页面可以带着用户 Cookie 连你的服务端。
   所以凡是基于 Cookie 鉴权的 WS，服务端都要校验 `Origin` 头。
3. **`wss://` 不可省**：明文 `ws://` 在公网等于把整条消息广播给中间人。
   HTTPS 站点里浏览器也会直接禁止连 `ws://`。
4. **消息不能当可信输入**：本项目服务端对客户端上行帧只做「识别 ping / 要求重发快照」两种处理，
   **不解析任何写指令**，写指令一律走带鉴权的 HTTP。收窄 WS 的职责面，就是收窄攻击面。

---

## 8. 运维排查清单

出现「大屏不刷新」时，按这个顺序查（本项目全部适用）：

1. **浏览器 Network → WS**：连接是不是 101？
   * 连不上 → 看服务端是否在跑、路径是否写错、反代有没有配 `Upgrade`；
   * 101 之后立刻断开 → 多半是服务端在握手后立刻抛异常（看服务端日志）。
2. **Messages 标签页**：有没有收到快照？
   * 一条都没有 → 服务端没推（检查是否在 `register` 之前就 `return` 了，如活动不存在）；
   * 只有第一条 → 广播没触发（检查写操作后是否调用了 `broadcast`）。
3. **服务端连接数**：`GET /api/v2/tally/health` 返回 `wsClients`，
   对比实际打开的大屏数量。数量偏大说明有僵尸连接没摘除。
4. **票数对不上**：以服务端快照为准（`GET /api/v2/tally/activities/{id}/snapshot`），
   再看 `GET /admin/tally/activities/{id}/records` 的流水是否能累加出该票数。
5. **只看一条错误信息就开始改代码**：先确认「是没收到，还是收到了但渲染错」，
   这两类的修复方向完全相反。

---

## 9. 一句话总结

* 握手用 HTTP，之后是独立协议；`101` 是关键状态码，`Sec-WebSocket-Key` 只防误连不防伪造。
* 帧有掩码与分片规则，浏览器帮你处理，但服务端要知道「客户端来的帧必须带掩码」。
* 广播要分房间、要逐连接容错、**优先推幂等全量快照**。
* 重连必须指数退避 + 成功后重置 + 区分主动关闭，否则不是重连风暴就是幽灵连接。
* 心跳是保命机制；浏览器不能手动 ping，所以要么用协议 pong，要么应用层约定。
* 实时通道与可写控制通道分开，是比给 WebSocket 硬加鉴权更干净的架构。
