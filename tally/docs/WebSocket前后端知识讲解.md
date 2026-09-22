# 用 tally 选票业务讲清 WebSocket：前端与后端

> 本文以本地复刻的「实时唱票」业务为素材（源站 `xmyzstudent.com` 同构），把 WebSocket 的知识点挂在真实代码上讲。
> 涉及代码：前端 `static/assets/useTallySocket-Bnuwbx53.js`、`static/assets/tally-DC36h0vE.js`、`static/assets/ScreenPage-D-8ErF3w.js`；
> 后端 `app.py` 的 `tally_socket` / `broadcast` / `build_snapshot`。

---

## 1. 为什么唱票大屏必须用 WebSocket

HTTP 是「请求-响应」半双工：客户端不问，服务端就不能说。而唱票大屏的诉求恰好相反——

- **服务端主动**：管理员在控制台点一下「+10」，几十台大屏要在 **1 秒内**看到柱子长高；
- **高频、低价值**：如果改用轮询，每秒一次 `GET`，90% 的响应都是「没变化」，浪费且延迟不可控；
- **公开免登录**：大屏链接直接投屏，不能要求观众先登录。

WebSocket 正是为此而生：一次握手后建立 **全双工、长连接、服务端可主动推送** 的通道。源站只在「数据变化时推全量快照」，既及时又省流量。

## 2. 升级握手：从 HTTP 到 WebSocket 的那一次请求

WebSocket 连接**以 HTTP 请求开始**。浏览器执行：

```js
new WebSocket("ws://127.0.0.1:18923/ws/tally/activity/4")
```

实际发出的请求（简化）：

```http
GET /ws/tally/activity/4 HTTP/1.1
Host: 127.0.0.1:18923
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==      # 客户端随机 16 字节，Base64
Sec-WebSocket-Version: 13
```

服务端（本地是 `flask-sock` 背后的 `wsproto`/`simple-websocket`，源站是其 Java/Python 等价物）若同意升级，返回：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlPUk7TFiGnGbKLZnKPs=  # 对 Key 拼魔法串做 SHA-1 后 Base64
```

**握手的三要素**：

| 请求头 | 作用 |
|---|---|
| `Upgrade: websocket` + `Connection: Upgrade` | 声明「这不是普通 HTTP 请求，请求改协议」 |
| `Sec-WebSocket-Key` | 随机值，防止缓存/代理把握手响应错发给别人 |
| `Sec-WebSocket-Version: 13` | 协议版本（RFC 6455） |

`Sec-WebSocket-Accept` 的计算方式是固定的：`Base64(SHA1(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))`。
客户端校验这个值，确认对面真的是懂 WebSocket 的服务端，而不是一个乱答的 HTTP 服务器。**握手成功后，这条 TCP 连接再也不走 HTTP 语义**，双方按 WebSocket 帧协议通信。

> 本地代码里，前端地址由 `tallyActivityWsUrl(activityId)` 拼接：协议跟随页面（http→ws、https→wss），
> 主机取 `location.host`，路径 `/ws/tally/activity/:id` 与源站逐字同构。wss 即 WebSocket over TLS，与 https 对应。

## 3. 帧：升级之后数据怎么打包

握手后的每条消息都是一个**帧（frame）**。最小结构：

```
 0               1               2               3
 +-------------------------------------------------------+
 | FIN(1) | RSV(3) | opcode(4)  |  MASK(1) | payload len |
 +-------------------------------------------------------+
 |  扩展长度（len=126/127 时）  |  Masking-key（客户端必掩码）|
 +-------------------------------------------------------+
 |                    Payload Data（应用数据）             |
 +-------------------------------------------------------+
```

对本业务重要的三点：

1. **opcode 区分消息类型**：`0x1` 文本帧、`0x2` 二进制帧、`0x8` 关闭帧、`0x9/0xA` ping/pong。tally 全程只用文本帧——JSON 字符串。
2. **客户端发送必须掩码（MASK=1）**：浏览器发的每个字节都要与 masking-key 异或，防止缓存投毒攻击；服务端推送**不掩码**。所以你在 DevTools 里看到的 payload 是明文，但抓包工具不对密钥是解不出的。
3. **FIN 与分片**：一条逻辑消息可拆成多个帧（FIN=0 表示「还没完」）。tally 的快照 JSON 通常一个帧装得下，源站与本地都不做应用层分片。

本业务的应用层协议极其简单——**只有一种上行方向（无）和一种下行消息（全量快照）**：

```jsonc
// 服务端 → 客户端（唯一的消息类型）
{
  "activityId": 4,
  "title": "2026年厦门一中思明校区主席竞选",
  "status": 1,
  "candidates": [
    { "id": 11, "number": "1", "name": "刘希瑞", "displayOrder": 1, "voteCount": 220 }
  ],
  "updatedAt": "2026-09-20 23:40:00.123456"
}
```

## 4. 广播模型：一笔录票如何送到每块大屏

本地 `app.py` 用一个「**按活动分组的连接注册表**」实现广播：

```python
_connections: dict[int, set] = {}          # activity_id -> {ws 连接}

@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_socket(ws, activity_id):
    _register(activity_id, ws)             # 连接进来：入组
    ws.send(build_snapshot(activity_id))   # 立即推一次全量快照
    while True:
        ws.receive()                       # 阻塞等关闭；客户端无需上行
    # finally: _unregister(...)

def broadcast(activity_id):
    payload = json.dumps(build_snapshot(activity_id))
    for ws in list(_connections.get(activity_id, ())):
        try:    ws.send(payload)           # 逐个推送
        except Exception: _unregister(activity_id, ws)   # 发失败=连接已死，清掉
```

**录票接口里的广播时机**：

```python
@api.post("/admin/tally/candidates/<int:candidate_id>/vote")
def vote_candidate(candidate_id):
    ...
    candidate["voteCount"] += delta        # 1. 改状态
    data["records"].append(record)         # 2. 记日志
    save_data(data)                        # 3. 落盘
    broadcast(activity["id"])              # 4. 通知该活动的所有连接
    return ok(candidate, "录票成功")
```

几个工程要点：

- **广播单元是「活动」**：同一活动的控制台与大屏在同一个组，录票后同时刷新——这正是控制台票数与与大屏一致的原因；
- **推全量而非增量**：前端 `snapshot.value = JSON.parse(msg.data)` 整体替换，不需要合并逻辑，也不会因为丢包而状态不一致（丢掉的快照会被下一条覆盖修正）；
- **先落盘再广播**：保证观众看到的数据一定是已持久化的；若落盘失败直接返回 500，不广播；
- **发送失败即清理**：对端断网时 `send` 抛异常，顺手把死连接移出注册表，防止注册表泄漏；
- **线程模型**：REST 与每个 WS 连接各由一个线程处理（Flask dev server `threaded=True`），
  广播发生在 REST 线程、接收在 WS 线程，因此注册表用锁保护，发送用 try/except 包裹。

对比源站可反推的行为：`useTallySocket` 只认「整体替换的快照」，说明源站同样是全量推送；连接建立后立即推一条，之后只在变更时推（实测 20 秒无数据变化时静默）。

## 5. 前端连接管理：快照、重连与卸载

`useTallySocket` 是一个 Vue 组合式函数，把连接生命周期封装成响应式状态：

```js
function createTallySocket(activityIdRef) {
  const snapshot = ref(null), connected = ref(false);
  let socket = null, retryDelayMs = 1000, reconnectTimer = null, manualClose = false;

  watch(activityIdRef, activityId => {           // 活动 ID 变化才重连
    activityId ? connectSocket(activityId) : closeSocket();
  }, { immediate: true });

  return { snapshot, connected };                // 页面只消费这两个 ref
}
```

三个关键设计：

**① 指数退避重连。** 断线不是失败，是常态（切网、休眠、服务重启）。源站策略：

```js
socket.onclose = () => {
  connected.value = false;
  if (!manualClose) scheduleReconnect(activityId);   // 主动关闭不重连
};
function scheduleReconnect(activityId) {
  reconnectTimer && clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => connectSocket(activityId), retryDelayMs);
  retryDelayMs = Math.min(retryDelayMs * 2, 30000);  // 1s→2s→4s…上限 30s
}
socket.onopen = () => { connected.value = true; retryDelayMs = 1000; };  // 成功后重置
```

退避的意义：服务端宕机时，避免成千上万个大屏同时疯狂重连把它彻底压垮。

**② 连接状态可见化。** `connected` 直接驱动 UI——控制台显示「已连接 / 断线重连中」，大屏角标同样。
观众能看到状态，现场技术人员就知道该不该检查网络。

**③ 组件卸载时主动关闭。** `onBeforeUnmount` 里置 `manualClose = true` 再 `close()`，
否则 `onclose` 会触发一次多余的重连，离开页面后连接偷偷复活。

> 注意 `onerror` 是空实现：WebSocket 的 error 之后必然紧跟 close，重连逻辑统一放在 close 里，避免双重调度。

## 6. 心跳：本业务为什么不需要

「长连接怎么保活」是高频问题，答案分两层：

- **协议层 ping/pong**：opcode `0x9/0xA`，由浏览器/服务器自动或半自动完成，用于中间设备（NAT、负载均衡）的会话保持，**与应用数据无关**；
- **应用层心跳**：业务自己定时发「我还在」，用于检测「对端还在不在」。

tally 业务两者都没用应用层实现，实测依据：

1. 源站 WS 连接后**除快照外 20 秒无任何消息**（本地抓包确认），没有应用层心跳；
2. 前端没有任何定时发送逻辑；
3. 业务上「静默」是正常态——没人在录票时大屏就不该动。

这样做的前提是**中间链路空闲超时足够长**（或部署了 TCP keepalive）。如果现场网络会在 60 秒空闲后掐断连接，表现是「偶尔重连一次」——由于前端有指数退避重连 + 全量快照，用户几乎无感。若要更稳健，最常见的加强是在服务端每 30s 发一个协议层 ping（flask-sock/wsproto 均支持），或在应用层加 `{"type":"ping"}` 消息并在前端忽略非快照消息。

## 7. 安全与运维要点（结合本业务）

| 话题 | 本业务的做法 / 建议 |
|---|---|
| 鉴权 | 源站大屏 WS **免认证**（公开投屏），管理 REST 校验 Bearer token。若快照含敏感信息，应在握手时校验 token（查询参数或子协议），鉴权失败直接返回 HTTP 401 而不是升级 |
| 授权粒度 | 连接按 `activity_id` 分组，只会收到本活动的广播——天然的隔离；恶意猜 ID 只能看到公开数据 |
|  Origin 校验 | 服务端可校验 `Origin` 头，拒绝跨站页面连你的 WS（防 CSWSH） |
| 消息大小 | 全量快照随候选人数增长；候选人上千时应改增量或分页 |
| 优雅退出 | 删活动时先广播「已删除」兜底快照再关闭连接，前端重连后拿到「不存在」快照而非无限重试 |
| 水平扩展 | 多实例部署时广播不能只在内存注册表里做，需要 Redis Pub/Sub 等把「某活动变更了」通知给持有连接的其他实例 |

## 8. 一分钟速查表

| 概念 | 一句话 | 本业务落点 |
|---|---|---|
| 升级握手 | HTTP 请求带 `Upgrade: websocket`，服务端回 `101` 后改用帧协议 | `/ws/tally/activity/:id` 握手即绑活动 |
| Sec-WebSocket-Key/Accept | 随机数防缓存投毒，Accept 是固定算法 derive | 由 flask-sock 自动处理 |
| 帧 | FIN/opcode/MASK/payload；客户端必须掩码 | JSON 文本帧（opcode 0x1） |
| 广播 | 服务端按「房间」向所有连接推送 | `_connections[activity_id]` |
| 全量快照 vs 增量 | 全量简单可靠，增量省流量 | 全量快照，前端整体替换 |
| 重连 | onclose + 指数退避（1s→30s 上限） | `scheduleReconnect` |
| 心跳 | 协议层 ping/pong 保活；应用层按需 | 未使用，靠重连兜底 |
| 连接状态 | 把 connected 暴露给 UI | 「已连接 / 断线重连中」 |
| 清理 | send 失败即注销；卸载时主动 close | `_unregister` + `manualClose` |

---

**延伸阅读**：RFC 6455（The WebSocket Protocol）、MDN WebSocket API 文档、`flask-sock` 与 `wsproto` 的服务端实现。
