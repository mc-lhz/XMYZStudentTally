# 唱票（Tally）业务本地实现 · space-bunny-free

把源站 [xmyzstudent.com](https://xmyzstudent.com) 的「实时唱票 / tally」业务，
用**镜像前端 + 自建 Flask 后端**在本地完整复刻一遍。

- **前端**：直接复用镜像里的 html / css / js，未自研任何页面代码；
  仅入口 chunk 的 `baseURL` 改 1 行为同源相对路径（源码内就地注释说明理由）
- **后端**：依据镜像 JS 反推接口契约，用 Flask 完整实现 **12 个 REST + 1 个 WebSocket**
- **存储**：单个 `tally.json`，进程内 `RLock` + `tmpfile → os.replace` 原子落盘
- **实时**：WebSocket，路径与源站同构 `/ws/tally/activity/<id>`，全量广播

## 一分钟跑起来

```bash
pip install -r requirements.txt
python app.py                    # 自动挑一个随机可用端口并打印所有入口
```

指定端口：`python app.py 8080`（被占用会自动顺延到下一个可用端口并提示）。

浏览器打开终端里打印的 `http://localhost:<端口>/admin/tally` 即可。

| URL | 说明 |
| --- | --- |
| `/admin/tally` | 活动管理页（新建/改名/切状态/删除） |
| `/admin/tally/activities/1/edit` | 配置活动（候选人增删改、改名） |
| `/admin/tally/activities/1/control` | 唱票控制台（+1/+5/+10/-1/自定义、撤销、操作日志） |
| `/tally/screen/1` | 大屏（**免登录**，WS 驱动实时刷新） |

> **登录态**：服务默认注入仓库原生 `static/dev-auth.js`（取自 `tools/dev-auth.js`）
> 往 `localStorage` 写一份含 `tally.manage` 权限位的会话，路由守卫即可放行。
> 该脚本的**接口 mock 默认已关闭**，所有 `/api/v2` 请求都真实打到本地后端。
> 需要临时 mock 可访问 `?mock=1`，或控制台 `__devAuth.mock(true)`。

## 目录结构

```
.
├── app.py                    # Flask 服务：12 REST + 1 WS + 静态托管 + SPA 回落
├── tally.json                # 唯一数据源（源站活动 1-4 真实快照 + 合成记录）
├── ws_snapshot.json          # 抓取到的源站 WebSocket 快照原始存档（可复现）
├── gen_initial_data.py       # 由快照生成 tally.json（含账本自检）
├── selftest.py               # 端到端自检（72 项断言）
├── requirements.txt
├── static/                   # 前端子集（18 个 assets，取自镜像）
│   ├── index.html
│   ├── vite.svg
│   ├── dev-auth.js           # 登录态注入（仓库原生，仅关闭 mock）
│   └── assets/               # 4 个页面 chunk + CSS、API chunk、socket 组合式、公共组件
├── docs/
│   ├── tally-链路分析报告.md # 《源站 tally 业务完整实现链路分析报告》
│   └── websocket-guide.md   # 《WebSocket 实战教学》
└── tools/                    # 前端治理验收工具
    ├── verify_frontend.py
    ├── verify_imports.py
    ├── verify_render.mjs
    └── runtime-stub.mjs / components-stub.mjs / api-stub.mjs / socket-stub.mjs
```

静态目录合计 672 KB（其中入口 chunk 424 KB 不可裁剪：它承载全站 72 条路由的懒加载
清单 + vue-router + axios + Pinia store）。整站镜像为 200+ 文件。

## 验证

```bash
# ① 后端 + WebSocket + 静态资源端到端（服务启动后）
python selftest.py <端口>
#    → 通过 72 项，失败 0 项

# ② 前端治理等价性（需 Node）
python tools/verify_frontend.py <镜像仓库根目录> static/assets
#    → 导入校验：通过
#    → TallyActivitiesPage / TallyActivityEditPage / TallyControlPage / ScreenPage
#      四个页面的 vnode 树与镜像原版逐字节 IDENTICAL
```

`selftest.py` 覆盖：鉴权语义（无 token / 错 token → 真 HTTP 401；有效 → 200 + `tally.manage`）、
12 个 REST 接口的正常与错误分支（空标题 / 重复编号 / 非法状态 / delta=0 / 扣成负数 /
非进行中录票 / 不存在资源）、WebSocket（首帧即全量快照、录票与撤销后 ≤5s 收到广播、
双订阅者收到同一帧、断开后广播不报错）、账本不变量、源站真实数据逐字比对、
SPA 深路由回落与静态资源加载。

## 关键设计决策

| 决策 | 选择 | 为什么 |
| --- | --- | --- |
| `baseURL` 硬编码 | 入口 chunk 改 1 行为同源 `/api/v2` | 反代 / 改 hosts 属环境侧改动（还要处理 TLS）；改 1 行可随仓库离线复现 |
| WS 地址 | 保留 `/ws/tally/activity/{id}` 路径形态，host 换同源 | 与源站同构；同源才能让局域网大屏免配置直连 |
| 消息模型 | **全量广播**，单一消息类型，无心跳消息 | 一帧仅 ~200 字节；客户端零合并、重连自愈 |
| 心跳 | 协议层 Ping（`ping_interval=25s`） | 前端 `onmessage` 无条件 `JSON.parse` 并整体替换，任何非快照帧都会让大屏塌成「暂无候选人」 |
| 撤销 | 追加一条 `type=1, delta 取反` 的记录，不物理删除 | 保住「票数 == Σdelta」账本不变量与完整审计链；不做「撤销撤销」，避免现场误触 |
| 存储 | 单文件 + 进程内锁 + 原子替换 | 复合操作整体加锁防丢更新；原子替换消除半截文件窗口 |
| ID | `nextIds` 游标持久化，初值 = 源站最大 id + 1 | 源站候选人 id 有空洞（4、5 已被删），从 1 起会撞车 |
| 401 / 403 | 返回**真 HTTP 状态码** + `{code,message}` | axios 拦截器只认 401 触发 `auth:token-expired`；403 对齐源站「权限不足」 |
| 业务失败 | HTTP 200 + 非 200 的 `code` | 前端只判 `code`，用 4xx 会走 reject 分支把真实原因吃掉 |

## 数据来源

源站 REST 侧 `/admin/tally/*` 需要 `tally.manage` 权限位，而公共测试账号
`AITest` 的 `/permissions/my` 返回 `{"permissions":[]}`，因此全部返回 HTTP 403
（无 token 时是 401）。真正的无鉴权出口是**大屏用的 WebSocket 通道**
（`/tally/screen/:id` 本就是公开页），四次活动的标题 / 状态 / 候选人 / 票数
**零杜撰**地由此抓取，原文存档在 `ws_snapshot.json`。

合成部分（源站无公开出口）：`activities[].createdAt` / `updatedAt`、
以及 `records` 全表（按现场常见粒度铺出，净和精确等于真实票数，
并保证「票数 == Σdelta」账本不变量）。

详见 `docs/tally-链路分析报告.md` 第七节。

## 前端代码治理

4 个页面 chunk + API chunk + socket 组合式全部重写为语义化命名 + 统一格式化 +
详尽注释（业务含义与接口对应关系），**不改写渲染逻辑**。
等价性由 `tools/verify_frontend.py` 逐字节校验：把镜像原版与治理版各自放进
Vue 运行时桩跑一遍 `setup()` + `render()`，把 vnode 树（含 `patchFlag`、
动态 `props`、静态 vnode 缓存槽位）序列化后比对，四个页面全部 `IDENTICAL`。