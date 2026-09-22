# tally — 实时唱票业务本地完整复刻

把线上 `xmyzstudent.com` 的「tally 选票（实时唱票）」业务在本地跑起来：
**镜像前端子集 + 自建 Flask 后端 + tally.json 单文件存储**。

## 启动

```bash
pip install flask flask_sock        # 依赖见 requirements.txt
python app.py                        # 默认端口 5004，可用 PORT 环境变量覆盖
```

访问入口：

| 页面 | 地址 |
|---|---|
| 活动管理 | http://127.0.0.1:5004/admin/tally |
| 大屏（示例） | http://127.0.0.1:5004/tally/screen/4 |
| 唱票控制台 | http://127.0.0.1:5004/admin/tally/activities/4/control |
| WS 接口 | ws://127.0.0.1:5004/ws/tally/activity/<id> |

管理页需要登录态：首页 `index.html` 已内置 `tools/dev-auth.js` 的本地会话注入
（本地 token + `tally.manage` 权限），打开页面即可直接进入。

## 目录结构

```
tally/
├─ app.py                 Flask 后端：12 个 REST 接口 + 1 个 WS 接口（flask_sock）
├─ tally.json             初始数据：从线上抓取的 4 次活动（id=1..4）及票数
├─ static/                前端最小子集（全部来自仓库镜像，只复制 tally 相关文件）
│   ├─ index.html         SPA 入口（含本地登录态注入脚本）
│   ├─ dev-auth.js        本地登录态注入（= 仓库 tools/dev-auth.js）
│   └─ assets/            见下表
└─ docs/
    ├─ 链路分析报告.md      端到端实现链路
    └─ WebSocket教学.md    以本案例讲解 WS 前/后端
```

## 前端最小子集说明

仅复制本业务用到的 chunk（约 430 KB 运行时 + 5 个页面/组件 chunk）：

| 文件 | 作用 |
|---|---|
| `index-*.js/css` | Vue 运行时 + 路由表 + axios + Pinia（站上公共入口，必不可少） |
| `tally-*.js` | 11 个 REST 函数 + WS 地址构造函数 |
| `useTallySocket-*.js` | WS 连接/重连封装 |
| `ScreenPage-*.js/css` | 大屏 |
| `Tally*Page-*.js/css` | 管理/配置/控制台三个页面及样式 |
| `PageHeader/PageFooter/PageBreadcrumb-*.js/css` | 页面共用组件 |
| `NotFoundPage-*` | 404 页兜底（路由表引用） |
| `vite.svg` | 站点图标 |

### 相对镜像的唯一改动（2 处，均为「把线上地址改成本地」）

1. `index-DJrtCu9i.js`：axios `baseURL` 从
   `https://api.xmyzstudent.com/api/v2` → `location.origin + "/api/v2"`
2. `tally-DC36h0vE.js`：WS 地址从
   `wss://api.xmyzstudent.com/ws/tally/activity/${id}` →
   `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/tally/activity/${id}`

其余字节与镜像一致。

## 接口与数据

完整 12 个 REST 接口 + 1 个 WS 接口的契约与源站逐字对应，详见
`docs/链路分析报告.md`。
