# 两个 Tally 项目差异对比

> 对比对象：
> - **A. Desktop 版** `C:\Users\Administrator\Desktop\httpsxmyzstudent.com\flask-tally`（下称「D 项目」）
> - **B. 本地版** `C:\Users\Administrator\AppData\Local\Temp\XMYZStudent\tally`（下称「L 项目」，本次任务产出）
>
> 对比时间：2026-09-06

---

## 0. 一句话结论

两个项目都把源站 xmyzstudent.com 的「实时唱票」业务搬到了本地独立 Flask，**前端都正确指向本地后端**（`baseURL=/api/v2`、WebSocket 用 `location.host` 动态拼），所以 tally 业务都能在本地跑通。

区别在于：
- **D 项目 = 整站镜像 + 只实现 tally 的后端**（3.9M / 170 个静态文件 / 91 条路由）。
- **L 项目 = 严格只裁剪 tally 的最小镜像 + 工程化更强的后端**（757K / 18 个静态文件 / 4 条路由 + 兜底），并附带 README、端到端测试、链路分析报告。

⚠️ **两者 `tally.json` 数据模型不兼容，文件不能互换。**

---

## 1. 前端镜像范围（差异最大）

| 维度 | D 项目 | L 项目 |
|---|---|---|
| 静态目录名 | `web/` | `static/` |
| 资产文件数 | **170** | **18** |
| 目录体积 | **3.9M** | **757K** |
| 主 bundle 路由数 | **91 条**（整站，未裁剪） | **4 条 tally + 1 根重定向 + 1 兜底** |
| 业务 chunk | 含全部页面（Rating/Voices/Museum/Ticket/Campaign/Dorm/Grade…） | 仅 4 个 tally 页面 + 公共组件 |
| index.html | 镜像原版（仅注入脚本） | 手写带注释版（说明 dev-auth / base href） |
| 主 bundle baseURL | 已改为 `/api/v2` | 已改为 `/api/v2` |

**影响**：
- D 项目导航到任意非 tally 页面（如 `/rating`）能渲染静态页，但调用其 API 时本地 Flask 没有对应实现 → 该页数据为空/报错。它相当于「整站镜像壳 + tally 后端」。
- L 项目任何未知路由都被兜底重定向到 `/admin/tally`，不会出现半成品页面，更干净，也严格满足任务第 4 条「仅复制相关业务文件」。

---

## 2. 后端 `app.py` 能力对比

### 2.1 共同点（都实现、且都与前端匹配）
- 12 个 REST 接口，路径与原始 `tally-DC36h0vE.js` 逐字一致：
  - `GET/POST /admin/tally/activities`
  - `GET/PUT/DELETE /admin/tally/activities/<id>`
  - `POST /admin/tally/activities/<id>/candidates`
  - `PUT/DELETE /admin/tally/candidates/<id>`
  - `POST /admin/tally/candidates/<id>/vote`
  - `POST /admin/tally/activities/<id>/undo`
  - `GET /admin/tally/activities/<id>/records`
- WebSocket：`/ws/tally/activity/<id>`（连接即推全量快照，变更后广播同房间）
- 统一响应包装 `{code, message, data}`，业务错误也回 HTTP 200（与源站口径一致）
- 录票状态门禁：`status != 1` 时拒绝录票
- 用 `flask-sock` 提供 WS

### 2.2 差异点

| 能力 | D 项目 | L 项目 |
|---|---|---|
| 默认端口 | **5000** | **5055** |
| 静态目录处理 | `static_folder=None` + 手动 `WEB_DIR`/`ASSETS_DIR` | 直接用 Flask 默认 `static/` |
| 鉴权 | **无**（任何人可调用写接口） | 有开关：`TALLY_AUTH_TOKEN` / `--token` 严格校验；默认本地放行 |
| 票数下限 | **无**（可减成负数） | `max(0, …)` 夹在 0（选票语义，不出现负票） |
| 操作日志返回量 | **全部** | 仅最新 20 条（与前端 slice 一致） |
| 撤销语义 | 原地改写原记录 `type=1`（历史被覆盖） | 追加新 `type=1` 记录 + 原记录标 `undone=True`（不可变审计） |
| ID 分配 | 每次 `max(所有 id)+1` 重算 | `meta.nextXxxId` 单调计数器 |
| 写锁 / 原子性 | `threading.RLock` 包裹读写 | `tallyStore` + `tallyHub` 分层，提交即落盘并广播 |
| 落盘安全 | 直接 `json.dump` | 先写 `.tmp` 再 `os.replace` 原子替换 |
| 调试接口 | 无 | `GET /api/v2/tally/_debug`（连接数/活动数） |
| `--debug` 启动参数 | 无 | 有 |
| 列表字段 | `id/title/status/createdAt`（createdAt 兜底写法有异味：`a.get('createdAt', a['createdAt'])`） | 额外给 `updatedAt/candidateCount/totalVotes` |

### 2.3 WebSocket 实现差异（关键工程点）
- **L 项目**：每个连接持有一个 `Queue`，录票线程只往队列 `put`，**持有该连接的线程**才 `send`——因为 simple-websocket 的收发状态机非线程安全。职责分离、天然线程安全；用 `queue.get(timeout=1)` 轮询 + `ws.connected` 检测及时感知断连。
- **D 项目**：`broadcast()` 里直接遍历 `_ws_clients` 集合对每个 `ws.send`。写法更直白，但发送方就是业务线程，依赖 `try/except` 清理死连接；并发下写线程直接碰连接对象，比 L 项目的队列模型更「粗暴」。

---

## 3. `tally.json` 数据模型（⚠️ 不兼容）

| 维度 | D 项目 | L 项目 |
|---|---|---|
| 顶层结构 | `{activities:[...], records:[...]}` | `{meta:{...}, activities:[...]}` |
| 操作日志位置 | **顶层扁平数组**，每条带 `activityId`/`candidateId` | **内嵌到每个活动** `activity.records[]` |
| 记录字段 | `id, activityId, candidateId, candidateNumber, candidateName, delta, type, createdAt` | 同上 + **`undone`** 标记 |
| ID 计数器 | 无（运行时 `max()+1`） | `meta.nextActivityId/nextCandidateId/nextRecordId` |
| 初始数据来源 | `seed.py` 读 `raw_ws_1..4.json`（**文件缺失，运行即报错**） | 直连源站 WS 抓真实快照写死在文件里 |
| 活动额外字段 | `id,title,status,createdAt,candidates` | 多了 `updatedAt`、`capturedFromWs`、每活动 `records` |

**后果**：把任一 `tally.json` 丢进另一个项目的 `app.py` 都会解析失败或行为错乱（一个读 `data['records']` 顶层，一个读 `activity['records']` 内嵌）。需要数据迁移脚本才能互转。

---

## 4. 其他交付物

| 交付物 | D 项目 | L 项目 |
|---|---|---|
| `seed.py` | 有（但依赖的 `raw_ws_1..4.json` 不存在 → 直接 `FileNotFoundError`） | 无（快照直接落入 `tally.json`） |
| `README.md` | 无 | 有（运行方式/路由表/移植清单/验证） |
| 端到端测试 | 无 | `_e2e.mjs`（20 项断言：REST 全流程 + 多端 WS 广播 + 状态机 + 撤销回滚） |
| 链路分析报告 | 无 | `docs/tally-链路分析报告.md`（含 WebSocket 教学） |
| JS 语义化 | 保留原始 minified | `tally-DC36h0vE.js` + `useTallySocket-Bnuwbx53.js` 重写为语义化变量名 + 详尽注释；4 个页面 chunk 加注释 |

---

## 5. 哪个更符合原任务要求？

原任务 6 条约束逐条核对：

| 要求 | D 项目 | L 项目 |
|---|---|---|
| 1. 前端复用镜像 html/css/js | ✅ | ✅ |
| 2. 反推接口写完整 flask 后端 + 单文件 tally.json | ✅ | ✅ |
| 3. 完整实现活动管理/控制台/大屏，大屏用源站同构 WS | ✅ | ✅ |
| 4. **仅复制相关业务文件** | ❌ 整站都复制了（170 文件） | ✅ 只 18 个 |
| 5. 路由规范同源站、无 XMYZStudent 前缀 | ✅ | ✅ |
| 6. 抓源站 4 次活动初始数据 | ⚠️ 有数据但 `seed.py` 无法复现 | ✅ 文件内即真实快照 |

**结论**：L 项目严格满足全部 6 条（尤其第 4 条「只复制相关业务文件」）；D 项目更像是「整站克隆 + 先把 tally 后端补上」，范围更大、工程化较弱、且 `seed.py` 当前不可用。

---

## 6. 互通建议

若要把 D 项目的 `tally.json` 迁到 L 项目（或反向），需要写一个小转换：
- D→L：把顶层 `records` 按 `activityId` 拆分回各 `activity.records`，补 `undone:false`、补 `meta` 计数器（取各项当前最大 id+1）、补 `updatedAt`/`createdAt`。
- L→D：把各 `activity.records` 拍平到顶层并加 `activityId`/`candidateId`，去掉 `meta` 与 `undone`。

> 直接文件互换会导致一方 `app.py` 读不到预期字段而 500。
