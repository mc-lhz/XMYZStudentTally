# tally 选票（实时唱票）本地 Flask 服务 — 任务一交付物

独立可运行的 Flask 后端 + 镜像前端最小静态子集，本地复刻 `xmyzstudent.com` 的 tally（实时唱票）业务。
**前端非自研**，直接复制源站镜像中与 tally 业务相关的 HTML/CSS/JS。

## 快速开始

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 启动服务（默认端口 5005，被占用时自动顺延，亦可 --port 指定）
python app.py --port 5005

# 3. 访问
#    活动管理页：http://localhost:5005/admin/tally
#    大屏示例：  http://localhost:5005/tally/screen/1
#    REST base： http://localhost:5005/api/v2
#    WS 地址：   ws://localhost:5005/ws/tally/activity/<id>
```

> 端口默认 `5005`（任务 README 要求从 5001 起自选可用端口，已实测 5005 空闲）。
> `app.py --port` 会在指定端口被占用时自动顺延查找可用端口，避免与其他实例冲突。

## 目录结构

```
.
├── app.py              # Flask 后端主程序（11 REST + 1 WS + 静态服务）
├── requirements.txt    # 运行时依赖
├── tally.json          # 单文件存储：初始数据（源站 id=1/2/3/4 真实活动）
├── static/             # 最小前端静态子集（镜像复制，非自研）
│   ├── index.html      # SPA 入口
│   ├── vite.svg
│   ├── dev-auth.js     # 登录态注入脚本（运行时注入 index.html）
│   └── assets/         # 仅 tally 相关 chunk + 主入口 + 公共组件
└── docs/               # 交付文档
    ├── 《源站 tally 业务完整实现链路分析报告》.md
    └── WebSocket 教学文档.md
```

## REST 接口（11 个，与源站逐字对应）

Base：`/api/v2`（与源站 `https://api.xmyzstudent.com/api/v2` 同构，仅 origin 不同）。

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/v2/admin/tally/activities` | 活动列表 |
| GET | `/api/v2/admin/tally/activities/<id>` | 活动详情（含候选人） |
| POST | `/api/v2/admin/tally/activities` | 新建活动 `{title}` |
| PUT | `/api/v2/admin/tally/activities/<id>` | 更新活动 `{title?, status?}` |
| DELETE | `/api/v2/admin/tally/activities/<id>` | 删除活动（级联候选人与记录） |
| POST | `/api/v2/admin/tally/activities/<id>/candidates` | 添加候选人 `{number,name,displayOrder}` |
| PUT | `/api/v2/admin/tally/candidates/<id>` | 更新候选人 |
| DELETE | `/api/v2/admin/tally/candidates/<id>` | 删除候选人（级联记录） |
| POST | `/api/v2/admin/tally/candidates/<id>/vote` | 录票 `{delta}` |
| POST | `/api/v2/admin/tally/activities/<id>/undo` | 撤销最近一次有效录票 |
| GET | `/api/v2/admin/tally/activities/<id>/records` | 操作日志（新→旧） |

**响应信封**：HTTP 200 + `{"code":200|4xx|5xx, "message":"...", "data":...}`。
前端统一以 `res.data.code === 200` 分支，错误经 `res.data.message` 弹 Toast。

> 任务 README 验收标准写「12 个 REST + 1 个 WS」，实测源站 tally 导出共 12 条 = **11 REST + 1 WS**（WS 不走 REST 前缀）。
> 本实现为 **11 REST + 1 WS**，报告中说明计数偏差，接口路径与源站逐字一致。

## WebSocket（1 个，路径与源站逐字一致）

```
ws://<host>/ws/tally/activity/<id>
# 源站：wss://api.xmyzstudent.com/ws/tally/activity/<id>
```

- 连接建立即推送当前活动快照；此后任一数据变更（录票、改状态、改候选人等）由 `broadcast_snapshot` 向该活动所有订阅者广播新快照。
- 快照键序与源站实测报文一致：
  `{activityId, candidates[{displayOrder,id,name,number,voteCount}], status, title, updatedAt}`
- `updatedAt` 为 Java `LocalDateTime` 纳秒串（如 `2026-09-23 00:32:12.424017873`），`now_java_nanos()` 生成。
- 客户端只收不发业务帧（`useTallySocket` 仅注册 `onmessage`）；服务端循环 `receive()` 用于感知对端关闭。

## 数据模型（单文件 `tally.json`）

```jsonc
{
  "meta": { "source": "...", "sourceWs": "...", "capturedAt": "...", "note": "..." },
  "nextIds": { "activity": 5, "candidate": 20, "record": 1 },  // 自增 ID
  "activities": [
    {
      "id": 1,
      "title": "...",
      "status": 0,            // 0 待开始 / 1 进行中 / 2 已结束
      "createdAt": "ISO-8601",
      "updatedAt": "Java 纳秒串",
      "candidates": [
        { "id": 1, "number": "1", "name": "...", "displayOrder": 1, "voteCount": 0 }
      ],
      "records": [
        {
          "id": 1, "activityId": 1, "candidateId": 1,
          "candidateNumber": "1", "candidateName": "...",
          "delta": 1,          // 本次票数变化（可为负）
          "type": 0,           // 0=普通录票 1=撤销
          "createdAt": "ISO-8601",
          "undone": false      // 是否已被撤销
        }
      ]
    }
  ]
}
```

- **初始数据**：源站 id=1/2/3/4 四次活动，通过源站 WS 快照抓取（原始报文见镜像仓库 `tally/tools/_source_snapshots/`）（**无需认证**，WS 无鉴权即推快照）。
- **REST 匿名 401**：源站 `/admin/tally/*` REST 需 JWT，匿名访问返回 401；抓取改走 WS 通道，原因写入《链路分析报告》。
- **原子落盘**：写临时文件再 `os.replace`，避免中途崩溃损坏；`threading.RLock` 保护读-改-写。

## 前端本地化（仅两处，导出名不变）

1. `assets/tally-DC36h0vE.js`（接口层）：`baseURL` 由源站 API origin 改为 `` `${location.origin}/api/v2` ``。
2. `assets/useTallySocket-Bnuwbx53.js`（WS 组合式函数）：WS 地址改为 `` `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws/tally/activity/${id}` ``，**路径逐字与源站一致**。

其余 chunk 仅做语义化改名 + 格式化 + 注释，**不改渲染逻辑**。
主 chunk `index-DJrtCu9i.js`（框架级混淆名）**不改动**。

## 登录态（本地解锁）

`app.py` 运行时在返回 `index.html` 时**注入** `static/dev-auth.js`，
磁盘上的 `static/index.html` / `assets/*.js` **保持原样**。
该脚本写入本地会话（token / user / expiresAt / permissions 含 `tally.manage`），使 49 条需登录路由放行。

URL 开关：`?devauth=0` 本次不注入，`?mock=0` 关闭接口 mock（tally 业务走本地后端，无需 mock）。

## 前端代码治理

对复制过来的 tally 相关 JS chunk 完成：

1. **语义化**：
   4 页面 chunk + 3 共享组件（`PageHeader` / `PageBreadcrumb` / `PageFooter`）变量与函数重命名。
2. **格式化**：`js-beautify`（`wrap_line_length=110`），统一缩进与换行。
3. **注释**：模块头（路由/角色说明）、import/export 分组、函数级业务注释、模板属性注释。

校验：`node --check` 全部 7 个治理 chunk 通过；`useTallySocket` 语法单独校验通过。

## 自测清单

- [x] 11 个 REST 接口 curl 验证（信封 `code`、数据结构、错误分支）
- [x] WS 连接即收快照；录票后 `broadcast_snapshot` 实时推送
- [x] 四个页面（`/admin/tally`、`.../edit`、`.../control`、`/tally/screen/:id`）加载，dev-auth 注入生效
- [x] 关键静态资源无 404（`index.html` / 主 CSS / 主 JS / 页面 chunk / CSS）
- [x] `tally.json` 含源站 id=1/2/3/4 真实初始数据

## 相关文档

- [docs/《源站 tally 业务完整实现链路分析报告》.md](docs/《源站%20tally%20业务完整实现链路分析报告》.md) — 业务画像、前端依赖、接口契约、时序、状态机、数据模型
- [docs/WebSocket 教学文档.md](docs/WebSocket%20教学文档.md) — 升级握手、帧、广播模型、重连、心跳（以本案例为素材）

## 依赖

- Python ≥ 3.10（开发环境 3.11.7）
- Flask ≥ 3.0、flask-cors ≥ 4.0、flask-sock ≥ 0.7、simple-websocket ≥ 1.0
- （仅抓取脚本）websockets ≥ 12.0
