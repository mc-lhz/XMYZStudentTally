# tally 选票（实时唱票）业务本地复刻

把线上 `xmyzstudent.com` 的「实时唱票」业务，用**镜像前端（最小子集）+ 自建 Flask 后端**在本地完整复刻。

## 快速开始

```bash
# 依赖：Python 3.10+，flask、flask-sock（pip install flask flask-sock）
python app.py                # 未指定端口时自动挑选随机可用端口（占用会自动重试）
python app.py --port 8080    # 也可显式指定
```

启动后访问：

| 页面 | 地址 | 说明 |
|---|---|---|
| 活动管理 | `/admin/tally` | 活动增删改查、状态切换 |
| 候选人配置 | `/admin/tally/activities/1/edit` | 候选人增删改、活动改名 |
| 唱票控制台 | `/admin/tally/activities/1/control` | 录票（+1/+5/+10/-1/自定义）、撤销、日志 |
| 实时大屏 | `/tally/screen/1` | 柱状图实时刷新（**另开一个标签页**，在控制台录票即可看到实时联动） |

登录态：服务端会在页面里注入仓库自带的 `dev-auth.js`（原样复制自 `tools/dev-auth.js`），
写入本地会话以放行源站 49 条 admin 路由的登录守卫；访问时加 `?devauth=0` 可关闭注入、查看未登录态。

## 目录结构

```
tally/
├── app.py                     # Flask 服务：12 个 REST + 1 个 WS + 静态托管 + SPA 回退
├── tally.json                 # 单文件存储：活动/候选人/票数/操作记录（初始数据=源站 id=1..4 真实数据）
├── static/                    # 前端最小子集（仅 tally 相关，22 个文件 660KB）
│   ├── index.html             # SPA 外壳（镜像原样，登录脚本由服务端注入）
│   ├── dev-auth.js            # 仓库内部登录解锁脚本（原样复制）
│   └── assets/                # 10 个 JS + 8 个 CSS（入口运行时、3 布局组件、tally/useTallySocket、4 页面）
├── docs/
│   ├── 源站tally业务完整实现链路分析报告.md   # 业务画像/依赖/契约/时序/状态机/数据模型
│   ├── WebSocket前后端知识讲解.md             # 握手/帧/广播/重连/心跳（以本业务为例）
│   └── screenshots/           # 三页面浏览器实测截图
└── tools/
    ├── fetch_live.py          # 直连源站 WS 抓取 id=1..4 初始数据（无需认证）
    ├── build_tally_json.py    # 由抓取快照生成 tally.json（可随时还原初始数据）
    ├── govern_js.py           # 前端 JS 治理：语义化重命名 + 注释注入（幂等，带三重校验）
    ├── pristine/              # 治理前的原始 chunk 备份
    └── test_e2e.py            # 后端 E2E：WS 广播 / 录票 / 撤销 / 级联删除 / 兜底快照
```

## 与源站的同构关系

- **REST**：12 个接口路径/方法/出入参逐字对应，本地以 `/api/v2` 为前缀（源站 baseURL 去掉域名）；
- **WS**：`/ws/tally/activity/:id` 与源站同构，连接即推全量快照，变更时广播；
- **页面路由**：`/admin/tally`、`/admin/tally/activities/:id/edit`、`/admin/tally/activities/:id/control`、`/tally/screen/:id` 与源站一致；
- **两处本地化改造**（均已在代码注释标明）：入口运行时的 API baseURL 改为同源 `/api/v2`；WS 地址改为按当前页面主机拼接（路径不变）。

## 验证

```bash
python tools/test_e2e.py       # 后端 E2E（需服务已在默认 18923 端口运行，或改脚本里的 BASE）
```

已验证：12 个 REST 冒烟通过；WS 广播/撤销/兜底/级联删除正确；
浏览器实测三页面渲染、新建/删除活动、录票 800→810、撤销回 810、**大屏跨标签页实时同步**。

## 数据还原

测试会改动 `tally.json`。还原源站真实初始数据：

```bash
python tools/build_tally_json.py
```
