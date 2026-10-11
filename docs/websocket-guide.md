# WebSocket 实战教学：从前端一行 `new WebSocket()` 到后端一帧广播

> 素材来源：`tally`（实时唱票）业务。
> 这是一个**教科书级的 WebSocket 案例**：协议极简（只有一种消息、全量广播、
> 纯订阅不上行）、场景极端（大屏常年挂着不能刷新）、数据小（一帧几百字节），
> 但把"握手 → 分帧 → 心跳 → 重连 → 广播"每一个环节都踩了个遍。
>
> 对应代码：
> - 前端：`tally/static/assets/tally-DC36h0vE.js`（地址）、`useTallySocket-Bnuwbx53.js`（连接与重连）
> - 后端：`tally/app.py`（`TallyHub` / `tally_ws` / `PING_INTERVAL`）
> - 验证：`tally/selftest.py` C 组

---

## 目录

1. [为什么是 WebSocket，而不是轮询 / SSE / 长轮询](#一为什么是-websocket)
2. [从 URL 到连接：一次完整的升级握手](#二从-url-到连接一次完整的升级握手)
3. [帧：你以为在传字符串，其实在传字节](#三帧你以为在传字符串其实在传字节)
4. [广播模型：一个活动一条通道](#四广播模型一个活动一条通道)
5. [心跳：为什么不能往这条通道发业务心跳](#五心跳为什么不能往这条通道发业务心跳)
6. [重连：前端唯一需要认真写的状态机](#六重连前端唯一需要认真写的状态机)
7. [安全：这条通道故意不要鉴权](#七安全这条通道故意不要鉴权)
8. [工程清单：把这套东西搬到自己项目时要检查什么](#八工程清单)

---

## 一、为什么是 WebSocket

tally 的实时需求是："计票员按 +10，所有大屏**立刻**变"。

| 方案 | 延迟 | 服务端连接数 | 适用性 |
|---|---|---|---|
| 轮询 `GET` 每秒一次 | 平均 0.5s | = 大屏数（还要每次查库） | 延迟抖动；票数变化那一瞬间抓不到，柱子会"卡一下再跳" |
| 轮询每 200ms | ~0.1s | 5× 大屏数 | 数据库压力随大屏数线性放大 |
| SSE（`text/event-stream`） | ~即时 | = 大屏数，单向 | 能用，但浏览器 `EventSource` **不支持自定义请求头**（大屏要带鉴权就带不了），且 HTTP/1.1 下有并发连接上限 |
| **WebSocket** | ~即时 | = 大屏数，双向 | ✅ 标准解法 |

选 WebSocket 的决定性因素其实不是延迟，而是**连接数与写放大**：
tally 的写入是"一个人点一下写一次"，但读取是"所有大屏都在读"。
轮询模型把「N 个大屏 × 每秒 K 次」变成数据库压力；
WebSocket 模型把压力变成「服务端每次写 → 序列化一次 → 往 N 个 socket 写 N 帧」，
序列化只做一次，数据量几百字节，走的是已建立的长连接。

### 前端一行代码

```js
// tally-DC36h0vE.js
export function tallyActivityWsUrl(activityId) {
  const scheme = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${scheme}//${window.location.host}/ws/tally/activity/${activityId}`;
}

// useTallySocket-Bnuwbx53.js
socket = new WebSocket(tallyActivityWsUrl(activityId));
socket.onopen    = () => { connected.value = true;  reconnectDelay = 1000; };
socket.onmessage = (e) => { try { snapshot.value = JSON.parse(e.data); } catch (err) { ... } };
socket.onclose   = () => { connected.value = false; if (!manualClose) scheduleReconnect(activityId); };
socket.onerror   = () => {};        // 什么都不做！
```

> ⚠️ **路径与源站同构**：`/ws/tally/activity/{id}` 与源站一字不差，
> 只有 host 从 `api.xmyzstudent.com` 换成本地同源。
> scheme 随页面协议自动切 `ws:`/`wss:` —— 用同源而不是写死 `ws://127.0.0.1:port`，
> 是为了让**手机 / 局域网里的另一台大屏电脑**也能直接连上（同一份静态资源，零配置）。

---

## 二、从 URL 到连接：一次完整的升级握手

浏览器执行 `new WebSocket(url)` 之后，底层发生的是**一次 HTTP 请求 + 一次协议切换**：

```
浏览器                                          服务端
  │  GET /ws/tally/activity/1 HTTP/1.1             │
  │  Host: localhost:51750                         │
  │  Upgrade: websocket                            │
  │  Connection: Upgrade                           │
  │  Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==   │
  │  Sec-WebSocket-Version: 13                     │
  ├───────────────────────────────────────────────►│
  │                                                │ 1. 校验 Upgrade/Connection
  │  HTTP/1.1 101 Switching Protocols              │ 2. 校验 Version==13
  │  Upgrade: websocket                            │ 3. 取 Sec-WebSocket-Key
  │  Connection: Upgrade                           │    = base64(16 字节随机数)
  │  Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  4. 拼 magic 串
  │                                                │    "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
  │                                                │    SHA1 → base64 → 回包
  │◄───────────────────────────────────────────────┤
  │                                                │
  │  从这一行开始，TCP 流里的内容不再是 HTTP        │ 5. 之后所有数据都是 WS 帧
  │                                                │
  │◄════════ 帧 ════════════════════════════════════┤  服务端立刻推首帧快照
```

### `Sec-WebSocket-Accept` 是怎么算的

```python
import base64, hashlib
GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
accept = base64.b64encode(hashlib.sha1((client_key + GUID).encode()).digest()).decode()
```

这一步**不是为了安全**（没有任何机密，纯粹是协议规定的握手仪式），
它的作用是：证明服务端确实理解 WebSocket 协议，而不是一个只会返回 200 的普通 HTTP 端点。
换句话说，它是"缓存投毒攻击（cache poisoning）"的护栏 —— 防止某个中间代理
把 WebSocket 升级请求的响应缓存下来，污染后续普通请求。

在 Flask 生态里，这段握手 `flask_sock` + `simple_websocket` 已经封装好了，
我们只要写路由函数：

```python
from flask_sock import Sock
sock = Sock(app)

@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id):
    conn = _Conn(ws)
    hub.add(activity_id, conn)
    try:
        conn.send(json.dumps(first_snapshot))     # 首帧
        while True:
            try:
                ws.receive(timeout=1)             # 只是为了感知关闭
            except TimeoutError:
                continue
    except ConnectionClosed:
        pass
    finally:
        hub.remove(activity_id, conn)
```

> **`while True: ws.receive()` 这一段千万别省。**
> 很多 WS 库把读循环放在库内部的线程里，你的回调函数写完就返回也没问题；
> 但如果你的实现是"注册连接 → 等广播"这种模型，**你必须主动读**，
> 否则底层读线程没有机会从 socket 里取数据，也就永远感知不到对端的 FIN，
> 断开的连接会一直留在你的订阅表里，每次广播都往一个死 socket 写，
> 泄漏线程、泄漏 fd、广播越来越慢。

### `ws.receive(timeout=1)` 与 `try/finally`

```python
finally:
    hub.remove(activity_id, conn)
```

无论正常退出还是抛异常，**一定要把连接从订阅表里摘掉**。
tally 的场景很致命：大屏电脑休眠/拔网线时 TCP 不会立刻断，
如果服务端还留着这条连接，`hub.broadcast()` 每次都会往它写一次并失败。
时间一长，订阅表里堆满僵尸连接，广播耗时线性上升。

---

## 三、帧：你以为在传字符串，其实在传字节

WebSocket 不是"传字符串的 HTTP"，它是**给 TCP 加了一层消息分帧**。

### 帧结构（RFC 6455）

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

tally 用到的三种 opcode：

| opcode | 名称 | 方向 | 用途 |
|---|---|---|---|
| `0x1` | Text | 双向 | 业务消息。**必须 UTF-8**，所以中文可以直接 `JSON.stringify` 后 `send()` |
| `0x8` | Close | 双向 | 关闭。带 2 字节状态码 + 原因 |
| `0x9` | Ping | S→C | 心跳。浏览器**自动回 Pong**，JS 完全无感 |

### 客户端必须掩码，服务端不能掩码

这是 WebSocket 里最容易踩的规范细节：**客户端发出的每一帧，第 4 个字节的 MASK 位必须是 1，
且后跟 4 字节掩码密钥；服务端发出的帧 MASK 位必须是 0。**

写手写帧解析时忘了处理掩码，就会出现"我发的消息服务端收不到/收到乱码"。

好消息：浏览器和 `flask_sock`/`simple_websocket` 都帮你做完了。
这也是为什么前面那段"帧结构"只需要理解、不需要实现。

### 本业务的帧有多小

```json
{"activityId":1,"candidates":[{"displayOrder":1,"id":1,"name":"测试1","number":"1","voteCount":25}],"status":1,"title":"2026厦门一中思明校区双代会","updatedAt":"2026-10-07 11:08:09.769155470"}
```

**约 200 字节。** 一次录票 → 广播 200 字节 × N 个大屏。
就算 10 块大屏、每分钟 100 次录票，也就 200 KB/min，
小到可以完全不考虑带宽优化 —— 这正是本案例敢用"全量广播"的底气。

### 为什么是全量而不是增量

```js
// 前端：收到即整体替换
socket.onmessage = (e) => { snapshot.value = JSON.parse(e.data); };
```

全量广播换来三个实实在在的好处：

1. **客户端零状态合并** —— 不用维护序列号、不用做 diff、不用处理乱序/重复。
2. **重连自愈** —— 重连后的首帧就是最新真值，不需要"补差"接口。
3. **状态不可能错位** —— 增量模式下"漏收一帧"会造成票数永久偏差；
   全量模式下任何一帧都是自洽的。

代价是带宽和数据量随候选人数线性增长。tally 的候选人是**十几位量级**（几百字节），
这个交换是极其划算的。而如果是"社交消息流"这种每次只多一条的场景，
就必须换增量 + 序号 + 补拉。

**通用判据**：
> 若单个实体的完整状态 < 数 KB，且客户端关心的是"当前全貌"而非"变化事件"，
> 就用全量；否则用增量。

---

## 四、广播模型：一个活动一条通道

### 路由设计

```python
/ws/tally/activity/{activityId}
```

一个活动一条通道，**不是**一条全局通道 + 消息里带 activityId。
后者的好处是连接数恒定 1，坏处是每条消息都要做路由、每个客户端都要过滤无关消息。
tally 的活动数很少（源站 4 个），但每个活动的大屏可以开好几块
（主舞台 + 侧屏），所以按活动分道能让广播变成"拿到这个 list 直接 for 一遍"。

### 订阅表

```python
class TallyHub:
    def __init__(self):
        self.lock = threading.RLock()
        self.subscribers: dict[int, set] = {}    # activity_id -> {conn}
    def add(self, activity_id, conn):    ...
    def remove(self, activity_id, conn): ...
    def broadcast(self, activity_id, payload):
        text = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        with self.lock:
            targets = list(self.subscribers.get(activity_id, ()))
        sent = 0
        for conn in targets:
            if conn.send(text):
                sent += 1
        return sent
```

### 三个必须注意的实现细节

**① 序列化只做一次。** `json.dumps` 在循环外，循环里只 `send`。
很多人写成 `for c in clients: c.send(json.dumps(payload))`，
N 个客户端就序列化 N 次 —— 在"小对象 + 多客户端"时是纯浪费。

**② 每个连接一把写锁。** 广播发生在**处理 REST 请求的线程**里，
而心跳、其它广播可能同时在写同一个 socket。两个线程交错写帧，
帧头和 payload 会串位，客户端解析出垃圾数据。

```python
class _Conn:
    __slots__ = ("ws", "wlock")
    def send(self, text):
        with self.wlock:                 # ← 没有这把锁，并发广播就会写坏帧
            try:
                self.ws.send(text)
                return True
            except Exception:
                return False            # ← 失败的连接下次 remove，不中断整轮广播
```

**③ 广播在 store 锁之外调用。**
`hub.broadcast_activity(id)` 内部自己取 `store.lock` 读快照，
而 REST 处理函数是"先释放 store 锁、再广播"：

```python
with store.lock:
    ...改数据、落盘...
    payload = store.activity_detail(act)     # 视图在锁内算好
hub.broadcast_activity(activity_id)           # ← 锁外
return ok(detail)
```

如果把广播写在 `with store.lock:` 里面，就会出现
"持锁期间网络 IO 阻塞 → 所有其他 REST 请求排队"，
并发一高整个服务就僵住了。**永远不要在持有数据锁时做网络 IO。**

### 广播的触发点（不止录票）

```python
hub.broadcast_activity(activity_id)   # 录票 / 撤销
hub.broadcast_activity(activity_id)   # 新增/修改/删除候选人
hub.broadcast_activity(activity_id)   # 活动改名 / 改状态
hub.broadcast_activity(activity_id)   # 删除活动（推一帧空快照让大屏优雅退化）
```

最后一条值得强调：**删除活动时不是"什么都不做"，而是推一帧空快照**
（`candidates: []`）。大屏收到后会渲染"暂无候选人"，
而不是永远停在最后一张旧图上让人以为活动还在进行。

---

## 五、心跳：为什么不能往这条通道发业务心跳

### 两种"心跳"，别搞混

| | 协议层 Ping/Pong | 应用层心跳消息 |
|---|---|---|
| 帧类型 | `0x9` / `0xA`（控制帧） | `0x1` Text，业务消息 |
| 浏览器 JS 可见 | **不可见**（`onmessage` 不触发） | 可见，会进你的 `onmessage` |
| 谁发 | 服务端定时发 Ping，浏览器自动回 Pong | 双方都可能发 |
| 用途 | 探测死连接（NAT/代理超时、拔网线） | 应用层保活/同步 |

### 本案例的致命约束

前端是这样的：

```js
socket.onmessage = (e) => {
  try {
    snapshot.value = JSON.parse(e.data);   // ← 无条件整体替换
  } catch (err) { console.error(...); }
};
```

它**没有消息类型分发**。所以服务端一旦往这条通道塞一条
`{"type":"ping"}`，大屏的 `snapshot` 就会被覆盖成 `{"type":"ping"}`，
于是 `snapshot.candidates` 变成 `undefined` ——
标题消失、图表塌成"暂无候选人"、连接指示灯还在那儿亮着绿。

**这就是为什么本实现的心跳走协议层，不走应用层：**

```python
# flask_sock 把 SOCK_SERVER_OPTIONS 透传给 simple_websocket.Server
app.config["SOCK_SERVER_OPTIONS"] = {"ping_interval": 25}
```

`simple_websocket` 会在后台线程里每 25 秒发一个 Ping 控制帧，
浏览器**自动**回 Pong（JS 侧完全无感），同时它还会在
`pong_received` 迟迟不来时主动断开这条连接。
前端零改动、零心智负担。

> **设计守则**：
> 业务通道上的消息空间，必须由协议文档明确枚举。
> 如果前端不做类型分发（"收到即全量替换"），服务端就**只能**发这一种消息。
> 心跳、事件通知、控制指令一律不能混进来。

### 心跳真正解决的是什么

大屏电脑常年开着，可能发生：

* 会场 Wi-Fi 路由器把空闲连接在 NAT 表里清掉（典型的 5 分钟 idle timeout）；
* 笔记本休眠/合盖，TCP 半开，客户端与服务端都以为连接还在；
* 交换机/防火墙的会话表老化。

没有心跳时，这些情况下 socket 看起来还是"打开的"，数据发出去进了黑洞，
大屏会静默地停在旧数据上 —— **这是比崩溃更糟的失败**，因为没有人会发现。
有协议层 Ping 时，服务端至少能发现"这个订阅者已经死了"并把它清出订阅表。

---

## 六、重连：前端唯一需要认真写的状态机

tally 的重连逻辑只有 20 行，但它是整个 WS 客户端里唯一"必须自己写对"的部分
（连接建立、收消息都是浏览器自动的）。

```js
const RECONNECT_DELAY_INIT = 1000;     // 首次重连延迟 1s
const RECONNECT_DELAY_MAX  = 30000;    // 上限 30s

let socket = null;
let reconnectDelay = RECONNECT_DELAY_INIT;
let reconnectTimer = null;
let manualClose = false;               // 主动关闭标记

function connect(activityId) {
  disconnect();                        // ① 先清旧连接，保证同一时刻只有一条
  manualClose = false;

  try {
    socket = new WebSocket(tallyActivityWsUrl(activityId));
  } catch (error) {                   // ② URL 非法等同步异常，也要走重连
    console.error("Tally WS connect failed", error);
    scheduleReconnect(activityId);
    return;
  }

  socket.onopen = () => {
    connected.value = true;
    reconnectDelay = RECONNECT_DELAY_INIT;   // ③ 连上就重置退避
  };
  socket.onmessage = (event) => {
    try { snapshot.value = JSON.parse(event.data); }
    catch (error) { console.error("Tally WS message parse failed", error); }
  };
  socket.onclose = () => {
    connected.value = false;
    if (!manualClose) scheduleReconnect(activityId);   // ④ 只在非主动关闭时重连
  };
  socket.onerror = () => {};            // ⑤ 什么都不做，见下
}

function scheduleReconnect(activityId) {
  if (reconnectTimer) clearTimeout(reconnectTimer);   // ⑥ 排他
  reconnectTimer = setTimeout(() => connect(activityId), reconnectDelay);
  reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_DELAY_MAX);
}

function disconnect() {
  if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
  if (socket) {
    manualClose = true;                // ⑦ 先置标记，再 close
    try { socket.close(); } catch {}
    socket = null;
  }
}

watch(activityIdRef, (nextId) => {
  if (nextId) connect(nextId); else disconnect();
}, { immediate: true });

onBeforeUnmount(() => { manualClose = true; disconnect(); });   // ⑧ 卸载必断
```

### 逐条讲清楚为什么

**① `connect()` 开头先 `disconnect()`。**
活动 id 变化时如果直接 `new WebSocket`，旧连接可能还活着，
两条连接同时订阅同一活动 → 同一帧消息被处理两次
（大屏飘字出现两个 +10）。这是很容易漏掉的重连 bug。

**② `try/catch` 包住 `new WebSocket`。**
它并非总是异步失败：`new WebSocket("ws://非法地址")` 会**同步**抛 `SyntaxError`。
不接住的话整个 setup 就炸了，连不上这个活动。

**③ 连上就重置退避。**
不重置的话，一次抖动（哪怕中途成功连上了几次）也会让延迟一路涨到 30s，
之后每次小抖动都要等半分钟才恢复。

**④ `manualClose` 标志。**
`onclose` 无法区分"对端/网络关闭"和"我主动 close()"。
不区分的话，`disconnect()` 会立刻触发一次重连，
然后新的连接又被下一次 `disconnect()` 关掉 —— 无限循环。
注意顺序：**先置 `manualClose = true`，再 `close()`**。

**⑤ `onerror` 什么都不做。**
这是反直觉但正确的选择：规范上 `error` 事件**之后必然**跟一个 `close` 事件，
且决定性信息在 `close` 里。在 `onerror` 里也做重连会导致**双重重连**。

**⑥ 定时器排他。**
`onclose` 可能被触发多次（不同浏览器的行为差异），
不清掉旧定时器就会堆积出一串重连。

**⑦ 退避是必需的，不是锦上添花。**
会场 Wi-Fi 一抖，如果固定 1 秒重连，几百个客户端同时冲上来会把刚恢复的服务端再打垮
（惊群效应）。指数退避 + 上限是业界标准做法。

**⑧ `onBeforeUnmount` 里必须断。**
否则组件已经没了、连接还活着 → 泄漏一条长连接 + 服务端一个线程。
Vue 里对应 `onBeforeUnmount`（镜像工具把它重命名成了 `directiveBum`）。

### 重连之后的"自愈"

因为服务端是**首帧即全量快照**，重连后不需要任何补差动作：
`connect()` → 服务端立刻推当前真值 → 大屏瞬间追平。

本案例里控制台还把重连状态做成了 UI：

```js
<span :class="['conn', { ok: connected }]">
  <span class="dot" /> {{ connected ? "已连接" : "断线重连中" }}
</span>
```

并且 `votingDisabled = !isLive || !snapshot` ——
**WS 断线时直接禁用所有录票按钮**。
这是刻意的产品决策：票数是唯一的数据源，断线时继续录票会让计票员
"点了没反应却以为记上了"。宁可拒绝操作，也不要让人误判。

---

## 七、安全：这条通道故意不要鉴权

```js
// routes.json
{ "path": "/tally/screen/:id", "requiresAuth": false }
```

后端也不校验：

```python
@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_ws(ws, activity_id):
    """连接建立 → 立刻推全量快照；随后阻塞在 receive 上直到对端关闭。
    注意这里**没有**鉴权：源站 /tally/screen/:id 是 requiresAuth=false 的公开页，
    大屏常常挂在会场的大屏电脑上，运营方不会在上面登录。
    安全边界落在"只有 admin 路由才能改数据"，读快照本身是公开的。
    """
```

### 为什么这样是合理的

* **读是公开的，写是受控的。** 票数是要公示的结果，公开反而符合业务。
  所有写操作都在 `/admin/tally/*` 上，受 `Bearer` token + `tally.manage` 双重保护。
* **大屏的现实约束。** 会场大屏常常是一台从来不登录的机器/浏览器 kiosk。
  要鉴权就意味着要在 kiosk 上登录、还要处理 token 过期后谁来点登录框 —— 现场事故率极高。

### 但必须知道的三个坑

1. **浏览器 WS API 不能自定义请求头。**
   `new WebSocket(url)` 没有 `headers` 选项。
   想在 WS 上鉴权，只能：
   * 把 token 放 URL query（会进 access log / Referer，泄露面大）；
   * 或用 `Sec-WebSocket-Protocol` 携带凭证（可行但要配合服务端选择子协议）；
   * 或先发一条鉴权消息（等于把协议变成"有状态握手"，前端要多写一段）。
   —— 这也是 tally 干脆不鉴权的原因之一。

2. **Origin 校验。** 至少要限制 `Origin`，避免任意站点从用户浏览器发 WS
   （"跨站 WebSocket 劫持"，配合已登录的 cookie 就是数据泄露）。

3. **资源消耗是公开的。** 任何人都能对 `/ws/tally/activity/1` 开一万条连接，
   在开发服务器的线程模型下（一连接一线程）会直接打满。
   生产环境要做连接数上限 + 同 IP 限流。

---

## 八、工程清单

把这套东西搬到自己项目时，逐条对照：

### 前端

- [ ] `new WebSocket` 外包 `try/catch`（同步异常）
- [ ] 指数退避重连，且**连接成功后重置退避**
- [ ] `manualClose` 标志区分主动/被动关闭，**先置位再 close**
- [ ] `onerror` 不做重连（交给 `onclose`）
- [ ] 重连定时器**排他**（先 `clearTimeout`）
- [ ] 切换目标（路由参数变化）时先断开旧连接
- [ ] 组件卸载时断开
- [ ] 用 `watch(..., { immediate: true })` 驱动，而不是在 `onMounted` 里手动调
- [ ] `onmessage` 里 `JSON.parse` 包 `try/catch`
- [ ] 把连接状态暴露成 UI（指示灯 / 禁用按钮），让用户知道系统状态

### 后端

- [ ] 路由**不要**和 REST 的鉴权逻辑混在一起评估，先想清楚"这条通道对外的语义是什么"
- [ ] 连接建立后**立刻**推一帧全量（或最新）状态
- [ ] 必须有读循环（`receive`），否则感知不到对端关闭
- [ ] `finally` 里把连接从订阅表摘掉
- [ ] 每个连接一把写锁（并发广播会写坏帧）
- [ ] 序列化在循环外只做一次
- [ ] 心跳走**协议层 Ping**，不要往业务通道塞心跳消息
- [ ] **不要在持有数据锁时做网络 IO**
- [ ] 广播失败要能跳过坏连接，而不是中断整轮广播
- [ ] 心跳能顺带做"清理僵尸订阅者"
- [ ] 想清楚跨域的 `Origin` 策略
- [ ] 生产环境：连接数上限、同 IP 限流、`ping_interval` 别设太长

### 本案例对应实现位置

| 检查项 | 实现位置 |
|---|---|
| 退避重连 / manualClose / 排他定时器 | `useTallySocket-Bnuwbx53.js` |
| 立即断开旧连接 | 同上 `connect()` 首行 `disconnect()` |
| 卸载即断开 | 同上 `directiveBum(...)`（= `onBeforeUnmount`） |
| 首帧即全量 | `app.py` `tally_ws()` 里的 `conn.send(...)` |
| 读循环 + finally 摘连接 | `app.py` `tally_ws()` |
| 序列化只做一次 / 写锁 / 跳过坏连接 | `app.py` `TallyHub.broadcast()` + `_Conn.send()` |
| 锁外广播 | `app.py` 各 REST 处理函数的 `hub.broadcast_activity(...)` |
| 协议层心跳 | `app.py` `SOCK_SERVER_OPTIONS = {"ping_interval": 25}` |
| 连接状态可视化 | `TallyControlPage-CBBTMqC8.js` 顶部指示灯 + `votingDisabled` |
| 断线时大屏优雅退化 | `app.py` 删除活动时推空快照 |

---

## 附：一次真实的帧序列（来自 `selftest.py` C 组）

```
[connect]  ws://127.0.0.1:51829/ws/tally/activity/1
   ← {"activityId":1,"candidates":[...],"status":1,"title":"2026厦门一中思明校区双代会","updatedAt":"..."}   # 首帧
[REST]     POST /api/v2/admin/tally/candidates/1/vote {"delta":5}
   ← 200 {"code":200,"data":{"candidate":{...,"voteCount":30},"recordId":1463},"message":"success"}
   ← {"activityId":1,"candidates":[...,{"voteCount":30},...],"status":1,...,"updatedAt":"..."}   # 广播（全量）
[REST]     POST /api/v2/admin/tally/activities/1/undo
   ← 200 {"code":200,"data":true,"message":"success"}
   ← {"activityId":1,"candidates":[...,{"voteCount":25},...],"status":1,...,"updatedAt":"..."}   # 广播（全量）
[connect]  第二条连接
   ← 首帧（与第一条连接**完全相同**的一帧）
[REST]     POST .../vote {"delta":2}
   ← 两条连接各收到一帧，内容逐字相同     ← 这就是"广播模型"
```

验证脚本（可直接跑）：

```bash
python tally/selftest.py <端口>
# 看 C 组输出：首帧、录票广播、撤销广播、双订阅者一致性
```