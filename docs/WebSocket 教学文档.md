# WebSocket 教学文档 — 以 tally 实时唱票为例

> 本文以本仓库 `tally/` 业务（源站 `xmyzstudent.com` 实时唱票）为唯一案例，
> 向读者讲解 WebSocket 前端与后端的核心知识：升级握手、帧格式、广播模型、前端重连、心跳等。
> 所有代码片段均对应本仓库真实实现（`tally/app.py`、`tally/public/assets/useTallySocket-Bnuwbx53.js`）。

---

## 0. 为什么 tally 需要 WebSocket？

**场景**：选举现场，工作人员在「唱票控制台」逐票录入，全场大屏必须**毫秒级**刷新得票排行。

| 方案 | 做法 | 问题 |
|---|---|---|
| 短轮询 | 大屏每 500ms `GET /activities/:id` | 浪费：无投票时也空转；延迟受轮询间隔限制 |
| 长轮询 | 服务端挂起请求直到有变更 | 连接占用高，实现复杂 |
| **WebSocket** | 服务端**有变更就主动推** | 连接一次、双向、低延迟 ✅ |

源站选择：`wss://api.xmyzstudent.com/ws/tally/activity/:id`
本地同构：`ws://localhost:5005/ws/tally/activity/:id`（**路径逐字一致，仅主机不同**）

关键特征（源站实测）：
- **无认证**：匿名可连，握手成功即推快照。
- **单向业务帧**：服务端 → 客户端只发「全量快照」；客户端不发业务消息（`useTallySocket` 只注册 `onmessage`）。
- **全量非增量**：每次推送整份活动 JSON，前端直接 `snapshot.value = JSON.parse(event.data)` 整体替换。

---

## 1. 升级握手（HTTP → WebSocket）

WebSocket 不是「另一个协议栈」，而是**借 HTTP 完成一次升级协商**，之后切换为独立的双工通道。

### 1.1 客户端发起（浏览器自动完成）

```http
GET /ws/tally/activity/1 HTTP/1.1
Host: localhost:5005
Upgrade: websocket                ← 告诉服务器：我要升级
Connection: Upgrade               ← 连接语义切换
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==   ← 随机 16 字节 Base64
Sec-WebSocket-Version: 13         ← 固定 13
```

前端一行代码即触发上述握手：

```js
// useTallySocket-Bnuwbx53.js
socket = new WebSocket(tallyActivityWsUrl(targetActivityId));
// tallyActivityWsUrl → ws://localhost:5005/ws/tally/activity/1
```

### 1.2 服务端应答（101 Switching Protocols）

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=   ← SHA1(Key + GUID) 反算
```

`Sec-WebSocket-Accept` 的计算证明服务端**真的懂 WebSocket**（防误升级到普通 HTTP 服务）：

```
Accept = Base64( SHA1( Sec-WebSocket-Key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" ) )
```

**101 之后，这条 TCP 连接不再走 HTTP**，后续收发的是 WebSocket 帧。

### 1.3 本仓库服务端实现

`tally/app.py` 使用 `flask-sock`（底层 `simple-websocket`），只需声明路由：

```python
from flask_sock import Sock
sock = Sock(app)

@sock.route("/ws/tally/activity/<int:activity_id>")
def tally_websocket(ws, activity_id: int):
    # 1) 注册到广播表
    with WS_LOCK:
        WS_CLIENTS.setdefault(activity_id, set()).add(ws)

    # 2) 连接建立即推当前快照（与源站行为一致）
    with DATA_LOCK:
        activity = find_activity(activity_id)
        snapshot = build_snapshot(activity) if activity else {...占位...}
    ws.send(json.dumps(snapshot, ensure_ascii=False))

    # 3) 循环 receive() 感知对端关闭（客户端不发业务帧，None = 对端关闭）
    try:
        while True:
            message = ws.receive()
            if message is None:
                break
    except Exception:
        pass
    finally:
        with WS_LOCK:
            WS_CLIENTS.get(activity_id, set()).discard(ws)
```

握手细节（101、Sec-WebSocket-Accept 计算、帧编解码）由 `flask-sock` / `simple-websocket` 自动完成。

---

## 2. 帧（Frame）— WebSocket 的数据单元

升级成功后，双方收发的不是 HTTP 报文，而是**帧**。教学上最需要理解的字段：

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|M| Payload Len |    Extended Payload Length    | Masking  |
|I|S|S|A|     (7)     |         (64/16, 若需要)         | Key ...  |
|N|V|V|S|             |                               | (32)     |
| |1|2|K|             |                               |          |
+-+-+-+-+-------+-+-------------+-------------------------------+
|          Payload Data (用户数据，如 JSON 快照)                   |
+---------------------------------------------------------------+
```

| 字段 | 含义 | 本案例取值 |
|---|---|---|
| **FIN** | 是否最后一帧 | 大屏快照通常单帧发完，`FIN=1` |
| **Opcode** | 帧类型 | `0x1` 文本帧（JSON）；`0x8` 关闭；`0x9/0xA` Ping/Pong |
| **Payload Len** | 载荷长度 | 快照几十~几百字节，走 7 位长度 |
| **Masking Key** | 掩码密钥 | **浏览器→服务端必须掩码**；服务端→浏览器不掩码 |
| **Payload Data** | 用户数据 | `{"activityId":1,"candidates":[...],...}` |

要点：
1. **文本帧 vs 二进制帧**：tally 用文本帧传 JSON（`onmessage` 里 `JSON.parse(event.data)`）。
2. **掩码方向**：客户端发的帧必掩码（防代理缓存投毒），服务端推的大屏快照不掩码。
3. **分片**：大消息可拆多帧（FIN=0…FIN=1），`flask-sock` 对应用透明重组。
4. **控制帧**：关闭（0x8）、Ping（0x9）、Pong（0xA）由库处理，应用层一般不直接构造。

---

## 3. 广播模型 — 服务端如何「一人喊、全场听」

### 3.1 拓扑：星型 + 按活动分房间

```
                    ┌── 大屏 A (WS) ──┐
控制台 (REST 录票) ──┼── 大屏 B (WS) ──┼── Flask: broadcast_snapshot(activityId)
                    └── 控制台预览 WS ─┘
                              │
                        tally.json (落盘)
```

- 客户端集合按 `activity_id` 分房间（room）：`WS_CLIENTS = { activity_id: set(connection) }`。
- 某活动的数据变更**只**通知该房间，互不干扰（活动 1 唱票不惊动活动 2 的大屏）。

### 3.2 本仓库实现（写路径 → 广播）

```python
# tally/app.py — 录票成功后的统一收口
def touch(activity: dict) -> None:
    activity["updatedAt"] = now_java_nanos()   # Java 纳秒串，与源站同构
    save_db()                                  # 原子落盘
    broadcast_snapshot(activity["id"])         # 推给该活动所有订阅者

def broadcast_snapshot(activity_id: int) -> None:
    activity = find_activity(activity_id)
    payload = json.dumps(build_snapshot(activity), ensure_ascii=False)
    with WS_LOCK:
        clients = list(WS_CLIENTS.get(activity_id, ()))   # 快照副本，避免迭代中被改
    for conn in clients:
        try:
            conn.send(payload)
        except Exception:
            with WS_LOCK:
                WS_CLIENTS.get(activity_id, set()).discard(conn)  # 死连接剔除
```

**触发广播的写操作**（与 REST 一一对应）：

| 操作 | REST | 是否广播 |
|---|---|---|
| 录票 | `POST /candidates/:id/vote` | ✅ |
| 撤销 | `POST /activities/:id/undo` | ✅ |
| 改状态/改名 | `PUT /activities/:id` | ✅ |
| 增删改候选人 | candidates CRUD | ✅ |
| 删除活动 | `DELETE /activities/:id` | 关闭该房间全部连接 |

### 3.3 前端消费（全量替换，无 diff 合并）

```js
// useTallySocket-Bnuwbx53.js
socket.onmessage = (event) => {
  // 协议：服务端每次推一整份 JSON 快照（非增量），直接整体替换 snapshot
  try {
    snapshot.value = JSON.parse(event.data);
  } catch (error) {
    console.error("Tally WS message parse failed", error);
  }
};
```

Vue 页面只需：

```js
const { snapshot, connected } = useTallySocket(activityIdRef);
// 模板直接渲染 snapshot.candidates（按 voteCount 排序即为实时排行）
```

**大屏零 REST**：连接即收首帧，之后每次票数变化都是新帧——这就是「大屏必须使用 WebSocket」的实现闭环。

---

## 4. 前端重连 — 指数退避（Exponential Backoff）

网络闪断、服务重启都会导致 `onclose`。本案例采用业界标准的指数退避：

```js
// useTallySocket-Bnuwbx53.js
let reconnectDelayMs = 1000;   // 起始 1s
let closedByUser = false;      // 主动关闭标记

socket.onopen = () => {
  connected.value = true;
  reconnectDelayMs = 1000;     // 连接成功 → 重置基数
};

socket.onclose = () => {
  connected.value = false;
  if (!closedByUser) scheduleReconnect(targetActivityId);  // 非主动关闭才重连
};

function scheduleReconnect(targetActivityId) {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => connect(targetActivityId), reconnectDelayMs);
  reconnectDelayMs = Math.min(reconnectDelayMs * 2, 30000);  // 指数翻倍，封顶 30s
}

// 组件卸载 / 切换活动 → 主动关闭，抑制自动重连
function teardownSocket() {
  ...
  closedByUser = true;
  socket.close();
  ...
}
```

| 第 n 次失败 | 等待时长 |
|---|---|
| 1 | 1s |
| 2 | 2s |
| 3 | 4s |
| … | ×2 … |
| ≥5 | **30s 封顶** |

设计要点：
1. **成功后重置**：`onopen` 把 `delay` 拉回 1s，避免「高峰 30s → 短暂成功 → 仍等 30s」。
2. **封顶**：防止长时间宕机后重连风暴。
3. **主动关闭标记** `closedByUser`：卸载组件、切换 `activityId` 时置 true，避免「关了又自动连回来」。
4. **`onerror` 不重连**：错误几乎总伴随 `onclose`，统一在 `onclose` 收口，避免双重重连。
5. **`watch(activityId, {immediate:true})`**：首次赋值即连接；ID 变化自动 teardown + 重连到新活动。

---

## 5. 心跳（Heartbeat）与死连接检测

### 5.1 为什么需要心跳

TCP 半开连接（peer 已死但本端不知）会让 `WS_CLIENTS` 里堆积**死连接**：
- 服务端 `send()` 长时间无报错；
- 大屏实际已断，观众看到旧数据。

### 5.2 机制：Ping / Pong 控制帧

```
服务端 ── Ping (0x9) ──> 客户端
客户端 ── Pong (0xA) ──> 服务端   （自动，浏览器内建）
```

- **浏览器限制**：JS 无法主动发 Ping，**心跳通常由服务端发起**；浏览器内核收到 Ping 自动回 Pong。
- 本源站：握手后长期无业务帧（无唱票时），心跳由**协议层/代理**保活；`flask-sock` 可配置 app-level 心跳。
- 本仓库策略：
  1. 每次 `broadcast` 对 `send()` 失败的连接**立即剔除**（最常见死连接来源）；
  2. 依赖操作系统 TCP keepalive 与反向代理空闲超时；
  3. 可扩展：服务端定时 `ws.send(ping_payload)` 或利用 `simple-websocket` 的 `ping_interval`。

### 5.3 应用层业务心跳（可选模式）

若需区分「链路通但服务僵死」，可约定业务心跳：

```js
// 客户端每 25s 发 {type:"ping"}；服务端回 {type:"pong", ts}
// 连续 2 次无回应 → 主动 close() 走退避重连
```

tally 案例因**服务端只推全量快照**、无请求-响应语义，未引入业务心跳，属合理简化。

---

## 6. 完整生命周期对照表（tally 案例）

| 阶段 | 客户端 | 服务端 | 本仓库代码位置 |
|---|---|---|---|
| 1. 构造 | `new WebSocket(url)` | 监听 Upgrade | `useTallySocket` `connect()` |
| 2. 握手 | 发 101 请求 | 回 101 + Accept | `flask-sock` 自动 |
| 3. 注册 | 等 `onopen` | 加入 `WS_CLIENTS[activityId]` | `tally_websocket` 开头 |
| 4. 首帧 | `onmessage` → snapshot | 主动 `ws.send(快照)` | 连接后立即 send |
| 5. 维持 | 渲染；（可选收 Ping） | 广播时遍历 send | `broadcast_snapshot` |
| 6. 写触 | 控制台 REST 录票 | `touch()` → 落盘 + 广播 | `vote_candidate` / `undo_activity` |
| 7. 异常断 | `onclose` → 指数退避 | `send` 失败剔除 | `scheduleReconnect` |
| 8. 主动关 | `closedByUser=true` + `close()` | `receive()` → None → 清理 | `teardownSocket` / `finally` |
| 9. 活动删除 | 收到 close，重连后得占位快照 | `close()` 房间内全部连接 | `delete_activity` |

---

## 7. 常见坑与本案例的对策

| 坑 | 现象 | 对策（本实现） |
|---|---|---|
| 增量协议难合并 | 多客户端状态漂移 | **全量快照**，前端无脑替换 |
| 广播中修改集合 | `RuntimeError: Set changed size` | 先 `list(...)` 拷贝再遍历 |
| 死连接不清理 | 越推越慢 | `send` 异常即 `discard` |
| 半开连接 | 大屏僵死不刷新 | TCP keepalive / 可扩展 Ping-Pong |
| 重连风暴 | 服务重启瞬间被打满 | 指数退避 + 30s 封顶 |
| 卸载后仍重连 | 组件泄漏 | `closedByUser` + `teardownSocket` |
| 忘记重置退避 | 偶发成功仍慢重连 | `onopen` 里 `delay=1000` |
| 路径与源站不一致 | 大屏连错后端 | 路径**逐字** `/ws/tally/activity/:id` |
| HTTPS 页面连 ws:// | 浏览器混合内容拦截 | `protocol` 随页面自动选 `ws:`/`wss:` |
| JSON 半包/坏帧 | `JSON.parse` 抛错 | try/catch，库层已保证帧完整 |

---

## 8. 动手实验（基于本仓库）

```bash
# 终端 1：启动服务
python tally/app.py --port 5005

# 终端 2：用 websocat / wscat 连大屏通道，模拟一块大屏
# pip install websockets && python -c "
import asyncio, websockets
async def main():
    async with websockets.connect('ws://localhost:5005/ws/tally/activity/1') as ws:
        print('首帧:', await ws.recv())
        async for msg in ws:
            print('广播:', msg)
asyncio.run(main())
"

# 终端 3：录一票，观察终端 2 立刻收到新快照
curl -X POST http://localhost:5005/api/v2/admin/tally/candidates/1/vote \
  -H "Content-Type: application/json" -d "{\"delta\":1}"
```

预期：终端 2 在 `curl` 返回后**立刻**打印 `voteCount` +1 的新快照——完成一次端到端 WebSocket 广播验证。

---

## 9. 小结

| 概念 | 一句话（对照 tally） |
|---|---|
| 升级握手 | 先借 HTTP 说「我要换协议」，101 后这条 TCP 只讲 WebSocket |
| 帧 | 握手后的数据单元；tally 用文本帧传 JSON 全量快照 |
| 广播模型 | 按 `activityId` 分房间，录票 `touch()` 一推，全场大屏同刷 |
| 重连 | 指数退避 1s→30s 封顶，成功重置，主动关闭不重连 |
| 心跳 | Ping/Pong + 发送失败即剔除，防死连接；tally 属合理简化 |
| 与 REST 分工 | **写与查询走 REST，实时推送走 WS** —— 大屏零 REST 刷新 |

进一步阅读：
- 本仓库实现：`tally/app.py`（服务端）、`tally/public/assets/useTallySocket-Bnuwbx53.js`（客户端）
- 业务链路：[《源站 tally 业务完整实现链路分析报告》](《源站%20tally%20业务完整实现链路分析报告》.md)
- RFC 6455：The WebSocket Protocol（握手与帧的权威定义）
