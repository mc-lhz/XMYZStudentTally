# 从 tally 业务看 WebSocket 前端与后端

以本案例（实时唱票大屏）为素材讲解 WebSocket 的关键知识点。

## 1. 为什么用 WebSocket

大屏要「管理员一加票，全场屏幕立刻更新」。HTTP 的方案是轮询（每秒 GET 一次），
浪费请求且有延迟。WebSocket 在**一次 HTTP 握手之后**把连接升级成持久双向通道，
服务器可以**随时主动推送**，正适合「低频写、多人读、即时可见」的唱票场景。

## 2. 升级握手

浏览器发的是普通 HTTP/1.1 请求，带升级头：

```
GET /ws/tally/activity/4 HTTP/1.1
Host: api.xmyzstudent.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: https://xmyzstudent.com
```

服务器同意后回 `101 Switching Protocols`，之后这条 TCP 连接就不再是 HTTP，
双方按 WebSocket 帧协议互发数据。注意两点：

- **Origin 校验**：源站 nginx 对非站点来源直接 403。本地后端放宽了这项限制。
- **wss 与 ws**：`wss://` 是 TLS 上的 WebSocket，类似 https；本地开发用 `ws://` 即可。
  前端用 `location.protocol === "https:" ? "wss" : "ws"` 自动选择。

## 3. 帧与消息

握手后的数据单位是**帧**（frame），每条文本/二进制消息由若干帧组成。
业务上我们只用「文本帧」：服务器把 JSON 快照整体发一帧：

```
{"activityId":4,"candidates":[{...}],"status":1,"title":"...","updatedAt":"..."}
```

前端 `event.data` 收到的就是这一整段字符串，`JSON.parse` 后即得快照对象。

## 4. 广播模型（后端）

后端不需要理解业务页面，只需要维护一张订阅表（见 `TallyServer.subscribe/unsubscribe/broadcast`）：

```
{ activityId → {ws1, ws2, ...} }
连接建立 → 发一帧当前快照 → 登记到订阅表
任何 REST 写操作完成  → 重新生成快照 → 遍历订阅表 send()，失败的连接顺手移除
连接关闭/错误        → 从订阅表移除
```

这是典型的「发布-订阅」里最简单的形态：每个活动一个主题，消息只有全量快照一种。
用「全量快照」而不是「增量 delta」的好处：新连接的补帧逻辑与日常广播是**同一段代码**，
断线重连后也能立即得到完整状态，不需要差量合并。

## 5. 前端重连与幂等（useTallySocket）

网络会断、切换页面要释放，源站的 `useTallySocket.js` 是教科书式的实现：

```js
// 指数退避重连：1s → 2s → 4s ... 封顶 30s
function reconnect() {
  timer = setTimeout(connect, delay);
  delay = Math.min(delay * 2, 30000);
}
ws.onopen  = () => { delay = 1000; connected.value = true };
ws.onclose = () => { connected.value = false; reconnect(); };
```

页面卸载时调用 `close()` 并**不再自动重连**。
由于服务器发的总是全量快照，重连成功即恢复最新状态，无需任何 diff/补偿，
这就是「幂等快照」设计最大的红利。

页面另有心跳义务吗？源站没做应用层 ping/pong——依赖 TCP 与 ws 库自带超时。
若浏览器休眠导致长时间无流量，连接可能被中间设备静默断开，
此时靠 `onclose`/`onerror` 进入上面的重连循环即可自愈。

## 6. 小结（checklist）

- 握手 = HTTP Upgrade；认证/Origin 校验发生在握手阶段
- 文本帧 + JSON 就能跑通大多数「状态推送」业务
- 服务器持有「活动 → 连接集合」，写操作之后广播全量快照
- 前端必须处理：重连（指数退避）、幂等快照渲染、卸载清理
