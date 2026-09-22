# 《WebSocket 前端与后端知识讲解 —— 以 tally 实时唱票为案例》

> 任务一交付物之三：借用本项目「tally 实时唱票」中真实存在的一条 `/ws/tally/activity/:id`
> WebSocket 链路，把 WebSocket 的核心知识（升级握手、帧、广播模型、前端重连、心跳）
> 逐一讲透。读者可对照仓库 `tally/` 代码边读边验。

---

## 0. 先看一条真实的链路

大屏页代码（`ScreenPage-D-8ErF3w.js`）：
```js
import { createTallySocket } from "./useTallySocket-Bnuwbx53.js";
const { snapshot, connected } = createTallySocket(activityId);
```
`useTallySocket-Bnuwbx53.js` 内部用**原生** `new WebSocket(url)` 连接：
```js
val2 = new WebSocket(tallyActivityWsUrl(val1));   // ws://localhost:5001/ws/tally/activity/3
val2.onmessage = e => refVal.value = JSON.parse(e.data);
```
后端（`app.py`）：
```python
@sock.route("/ws/tally/activity/<int:aid>")
def tally_ws(ws, aid):
    _register_ws(aid, ws)
    ws.send(json.dumps(_build_snapshot(_load_data(), aid)))  # 连接即推快照
    while True:
        if ws.receive() is None: break                       # 感知断开
```
一条链路横跨浏览器 → Flask → 广播给所有订阅者。下面逐个概念讲透。

---

## 1. 升级握手（HTTP Upgrade）

WebSocket 不是新的传输协议，它是建立在 **HTTP 之上的升级协议**：

1. 客户端先发一个普通 HTTP GET，带上两个关键头：
   ```
   GET /ws/tally/activity/3 HTTP/1.1
   Host: localhost:5001
   Upgrade: websocket          ← 声明要升级
   Connection: Upgrade         ← 声明连接要复用
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==   ← 客户端随机值（base64）
   Sec-WebSocket-Version: 13                     ← 固定版本
   ```
2. 服务端校验版本、计算 key 的 SHA-1 摘要并 base64 后返回：
   ```
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   ```
3. 状态码 **101** 表示切换成功。此后连接从 HTTP 语义切换为面向消息的 WebSocket 帧流。

> 本项目 Flask 端的升级握手由 `werkzeug` + `flask_sock` 完成——这就是为什么不能在
> waitress 等纯 WSGI 服务器上跑（纯 WSGI 不处理 Upgrade/101 流程）。

---

## 2. 帧（Frame）与消息

### 2.1 帧结构
WebSocket 传输的每个**帧**有一个最小头：
```
 0                   1                   2
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+---------------+
|F|R|R|R| opcode|M| Payload len |   扩展 payload...
|I|S|S|S|  (4)  |A|     (7)     |
|N|V|V|V|       |S|             |
+-+-+-+-+-------+-+-------------+---------------+
```
关键字段：
- **opcode**：`0x1` 文本帧、`0x2` 二进制帧、`0x8` 关闭、`0x9` Ping、`0xA` Pong；
- **FIN**：一帧是否结束；消息可以分多帧传输；
- **MASK**：客户端→服务器必须掩码（防止缓存投毒），服务端→客户端可不掩码。

### 2.2 消息（本项目视角）
本项目只使用**文本帧**。后端把快照对象 `JSON.stringify` 成字符串后作为一个文本消息发出：
```python
ws.send(json.dumps(snapshot, ensure_ascii=False))   # 服务端→客户端文本帧
```
前端 `JSON.parse(e.data)` 反向解析：
```js
val2.onmessage = e => refVal.value = JSON.parse(e.data);
```
“消息”对应用层是完整语义单位；多帧只在超大 payload 时涉及，本项目体量远达不到。

---

## 3. 广播模型（本项目核心）

WebSocket 是**点对点** TCP 连接，服务端要向 N 个大屏/控制台同时推数据，需要自己实现广播：

```python
_clients: dict[int, list[dict]] = {}   # activity_id -> [ {ws, send_lock}, ... ]
```
1. **登记**：连接建立时 `_register_ws(aid, ws)` 把当前连接塞进该活动的桶；
2. **推送**：任一 REST 变更后 `_broadcast_snapshot(aid)` 遍历桶内所有 ws 发送同一份快照：
   ```python
   snapshot = _build_snapshot(_load_data(), aid)
   payload = json.dumps(snapshot, ensure_ascii=False)
   for client in bucket:
       with client["send_lock"]:
           client["ws"].send(payload)
   ```
3. **清理**：连接关闭或发送异常时 `_unregister_ws(aid, ws)` 移出桶，桶空即删键。

> 为什么用 **`send_lock`（每连接一把线程锁）**？
> Flask threaded 模式下多个请求线程可能同时向同一连接写帧。WebSocket 帧是流式的，
> 两个线程交错写会破坏帧边界（把一个帧切成两半），锁保证一帧一帧原子写。

### 3.1 「连接即推快照」——新观众秒同步
大屏晚到的观众不会错过数据：
```python
ws.send(json.dumps(_build_snapshot(_load_data(), aid)))   # 一进频道先发全量
```
这样新连接立刻得到当前完整状态，之后增量靠广播补。这是聊天室/直播间最常见的
「进房即同步 + 变更广播」模式。

---

## 4. 前端重连（指数退避）

网络抖动、服务器重启都会造成断线。浏览器不会自动重连，业务层必须自己处理。
`useTallySocket-Bnuwbx53.js` 展示了教科书式的重连实现：

```js
let num = 1e3;                       // 重连基数：初始 1s
function zz1(v) {                    // 建连（失败/断开时进入 zz2）
  zz3(); val4 = !1;                  // 先清理旧连接与定时器
  val2 = new WebSocket(tallyActivityWsUrl(v));
  val2.onclose = () => { refVal2.value = !1; val4 || zz2(v); }; // 非主动关闭→重连
}
function zz2(v) {                    // 调度重连
  val3 = setTimeout(() => zz1(v), num);
  num = Math.min(num * 2, 3e4);      // 基数翻倍，封顶 30s
}
```
要点：
- **指数退避**：1s → 2s → 4s → 8s … 封顶 30s。断线刚发生时火速重试，若服务仍不可用
  则放慢节奏，避免所有客户端同时对服务器“雪崩式”轰炸；
- **成功后复位**：`onopen` 里 `num = 1e3`，让下次退避重新从最短开始；
- **主动关闭不重连**：组件卸载 / 活动切换时 `zz3` 先置 `val4 = !0` 再 `close()`，
  onclose 看到主动标记就不再启重连，防止页面已销毁还在后台反复连；
- **watch 驱动**：`watch(activityId, v => v ? zz1(v) : zz3(), {immediate:true})`，
  切换活动自动换频道，销毁自动收尾。

---

## 5. 心跳（Ping/Pong）

**为什么需要心跳？**
- TCP 连接可能被中间设备（NAT 网关、运营商、云负载均衡）“静默掐断”——对端既不发
  FIN 也不发 RST，本端完全无感知，连接变成“僵尸连接”；
- 生产级服务端会周期性发 Ping（opcode=0x9），客户端必须回 Pong（0xA）；
- 超过 N 秒没收到任何帧，则判定连接死亡，主动 close 并触发重连。

**本项目是否用了心跳？**
开发服务器规模下，后端用 `while True: ws.receive()` 阻塞感知收发，客户端断线时
TCP 层会给出错误（读返回 None / 抛异常），因此**没有心跳也能清理僵尸连接**。

但这正是一个教学迁移点——如果部署到生产（Nginx 反向代理 60s 空闲超时等场景），
就需要加上：

```python
# 生产建议：定时 Ping，超时未 Pong 则判定死连
import time
deadline = time.time() + 30
while True:
    ws.receive(timeout=10)                 # 阻塞等帧，带超时
    if time.time() > deadline or ws.connected is False:
        ws.close()                         # 触发 onclose → 前端重连
        break
```
前端天然支持：浏览器 `new WebSocket` 会自动回 Pong，无需业务代码。

---

## 6. 前端使用 WebSocket 的完整清单（对照本项目）

| 关注点 | 实现位置 | 做法 |
|--------|----------|------|
| 建连 | `useTallySocket.zz1` | 原生 `new WebSocket`，URL 来自 `zz11` |
| 收消息 | `onmessage` | `JSON.parse(e.data)` 写入 Vue ref |
| 连接状态 | `onopen/onclose` | 驱动 `connected` ref，页面显示「已连接/重连中」 |
| 重连 | `zz2` | 指数退避 1s→30s，成功复位基数 |
| 主动关闭 | `zz3` + `watch + directiveBum` | 活动切换/组件卸载收尾，不残留定时器 |
| 并发写保护 | 后端 `send_lock` | 多线程下帧原子写 |
| 心跳 | 本场景由 `receive()` 感知断开替代；生产需 Ping/Pong | 见 §5 |

---

## 7. 小结

- WebSocket = HTTP **升级握手（101）** + 之后**帧流**双向通信，弥补 HTTP 无法“服务端主动推”的短板；
- **广播**需要业务层维护订阅表（本项目：activity_id → 桶），配合**进房即推快照**保证新订阅者秒同步；
- 断线是常态，**前端要指数退避重连**，**后端要能感知死连并清理**（receive/心跳）；
- 多线程服务端推流要注意**帧原子性**（锁），否则会撕裂帧边界。

对照代码仓库即可看到上述每个点都有真实落地实现而非纸面概念。