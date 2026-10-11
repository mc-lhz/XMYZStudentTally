# tally 选票业务 · 本地 Flask 服务器

把线上 `xmyzstudent.com` 的「tally 选票（实时唱票）」业务在本地完整复刻：
**复用仓库镜像前端（非自研）+ 自建 Flask 后端**，单文件 `tally.json` 存储，大屏走 WebSocket 实时推送。

## 快速启动

```bash
cd tally
python3 app.py [端口]        # 端口缺省时随机选取，占用自动切换
```

启动后按提示访问：

| 页面 | 地址 |
|---|---|
| 大屏（实时唱票） | `http://localhost:<port>/tally/screen/:id`（如 `/tally/screen/1`，无需登录） |
| 活动管理页 | `http://localhost:<port>/admin/tally` |
| 唱票控制台 | `http://localhost:<port>/admin/tally/activities/:id/control` |
| 配置活动页 | `http://localhost:<port>/admin/tally/activities/:id/edit` |

管理页登录态由服务端在返回 `index.html` 时**动态注入**仓库内部脚本
`tally/dev-auth.js`（写入 localStorage 的 token / permissions，含 `tally.manage`），
磁盘文件不改动；前端 axios 请求拦截器自动携带 `Authorization: Bearer dev-local-token`，
后端识别该本地会话并放行全部 tally 管理接口。

## 目录结构

```
tally/
├── app.py                 # Flask 后端：12 个 REST 接口 + 1 个 WS 地址（与源站逐字对应）
├── tally.json             # 单文件存储：活动 / 候选人 / 票数 / 操作记录（含源站 4 次活动真实初始数据）
├── dev-auth.js            # 仓库内部登录态解锁脚本（tools/dev-auth.js 的副本，供注入）
├── static/                # tally 业务最小前端子集（非整站，20 个文件）
│   ├── index.html
│   ├── vite.svg
│   └── assets/            # 入口 chunk + tally API + WS hook + 4 页面 + 3 公共组件（治理后）
└── docs/
    ├── 源站tally业务完整实现链路分析报告.md
    └── WebSocket教学文档.md
```

## 接口契约（与源站逐字对应）

REST 均位于 `/api/v2` 前缀下，响应信封统一 `{ code, data, message }`，前端只认 `code`：

| # | 方法 | 路径 | 请求体 | 说明 |
|---|---|---|---|---|
| 1 | GET | `/admin/tally/activities` | - | 活动列表 |
| 2 | GET | `/admin/tally/activities/:id` | - | 活动详情（含候选人） |
| 3 | POST | `/admin/tally/activities` | `{title}` | 新建活动 |
| 4 | PUT | `/admin/tally/activities/:id` | `{title}` 或 `{status}` | 改名 / 状态切换（0/1/2） |
| 5 | DELETE | `/admin/tally/activities/:id` | - | 删除活动（候选人、记录一并删除） |
| 6 | POST | `/admin/tally/activities/:id/candidates` | `{number,name,displayOrder}` | 添加候选人 |
| 7 | PUT | `/admin/tally/candidates/:id` | `{number,name,displayOrder}` | 更新候选人 |
| 8 | DELETE | `/admin/tally/candidates/:id` | - | 删除候选人（历史记录一并删除） |
| 9 | POST | `/admin/tally/candidates/:id/vote` | `{delta}` | 录票（仅「进行中」允许；广播大屏） |
| 10 | POST | `/admin/tally/activities/:id/undo` | - | 撤销最近一次普通录票（data=true/false） |
| 11 | GET | `/admin/tally/activities/:id/records` | - | 操作日志（最新在前） |
| 12 | WS | `/ws/tally/activity/:id` | - | 大屏实时快照（连接即推，变更即推） |

鉴权：token 缺失/为空 → **HTTP 401**；携带非空 Bearer token（如 dev-auth 注入的
`dev-local-token`）→ 已登录管理员。业务失败默认 HTTP 200 + `code!=200`。

## 数据

`tally.json` 含源站 **id=1/2/3/4 四次活动**的真实初始数据（标题、候选人、编号、票数），
通过源站公开的 WebSocket（`wss://api.xmyzstudent.com/ws/tally/activity/:id`）抓取——
该通道无需认证（REST 层需权限，401/403 属正常鉴权，见分析报告 §6）。`createdAt`
为抓取时刻（源站 REST 层返回的 createdAt 需 `tally.manage` 权限，抓取时不可得）。

## 静态文件说明

- 仅复制 tally 业务相关 20 个文件（入口 chunk + 全局 CSS、tally API、WS hook、
  4 个页面 chunk 及其 CSS、PageHeader/PageFooter/PageBreadcrumb 及其 CSS、index.html、vite.svg），非整站。
- 两处**必要功能改写**（不改渲染逻辑）：
  1. 入口 chunk 的 axios `baseURL`：`https://api.xmyzstudent.com/api/v2` → `/api/v2`（相对路径，本地同端口承接）；
  2. tally chunk 的 WS 地址：`wss://api.xmyzstudent.com/ws/tally/activity/:id` →
     按 `location` 动态拼接的同构地址（`ws(s)://<host>/ws/tally/activity/:id`）。
- 复制的 JS 已做治理：语义化命名、格式化、详尽注释（接口对应关系见各文件头注释与
  `tally-DC36h0vE.js` 的 JSDoc）。

## 测试结论

- 12 个 REST 接口全部通过（含鉴权 401、业务失败分支、并发 30 次录票不丢票）。
- WS 连接即推快照、录票/撤销/候选人变更即时广播，大屏与控制台实时刷新。
- 4 个前端页面经无头浏览器实测渲染正常（大屏柱状图、管理列表、控制台、配置页）。
