# 唱票（Tally）本地服务

把源站 [xmyzstudent.com](https://xmyzstudent.com) 的「实时唱票」业务完整搬到本地跑。

- **前端**：直接复用镜像里的 html / css / js（未重写任何页面代码，只改了 baseURL 与路由裁剪）
- **后端**：依据镜像 JS 反推接口契约，用 Flask 完整实现
- **存储**：单个 `tally.json`
- **实时**：WebSocket，路径与源站一致 `/ws/tally/activity/<id>`

## 目录结构

```
tally/
├── app.py                 # Flask 服务（REST + WebSocket + SPA 静态托管）
├── tally.json             # 唯一数据源（活动 1-4 的初始快照 + 元数据）
├── requirements.txt       # 依赖：flask、flask-sock
├── README.md              # 本文件
├── static/                # 前端资源（直接复用镜像产物）
│   ├── index.html         # SPA 入口（base href 改为 /，与源站路由一致）
│   ├── vite.svg
│   ├── __dev-auth.js      # 镜像原生的本地登录态注入脚本
│   └── assets/
│       ├── index-DJrtCu9i.js             # 主 bundle（axios / Vue / 路由 / 状态）
│       ├── index-CTy88mxm.css            # 全局样式
│       ├── tally-DC36h0vE.js             # 接口层（已完整重写 + 详尽注释）
│       ├── useTallySocket-Bnuwbx53.js    # WS 组合式函数（已完整重写 + 详尽注释）
│       ├── TallyActivitiesPage-*.js/.css # 活动管理页（已注入映射注释）
│       ├── TallyActivityEditPage-*.js/.css # 活动配置页（已注入映射注释）
│       ├── TallyControlPage-*.js/.css    # 唱票控制台（已注入映射注释）
│       ├── ScreenPage-*.js/.css          # 大屏（已注入映射注释）
│       └── PageHeader/Footer/Breadcrumb  # 公共 UI 组件（直接复用镜像）
└── docs/
    └── tally-链路分析报告.md   # 源站业务链路 + WebSocket 前后端知识讲解
```

## 启动

```bash
pip install flask flask-sock
python app.py                          # 默认 127.0.0.1:5055
python app.py --port 8080 --host 0.0.0.0
python app.py --token my-secret        # 开启严格 Bearer token 鉴权
```

打开浏览器访问：

| URL                                          | 说明                          |
| -------------------------------------------- | ----------------------------- |
| `http://127.0.0.1:5055/admin/tally`          | 活动管理页（需登录态）        |
| `http://127.0.0.1:5055/admin/tally/activities/1/edit`   | 活动 1 的配置页 |
| `http://127.0.0.1:5055/admin/tally/activities/1/control` | 活动 1 的唱票控制台 |
| `http://127.0.0.1:5055/tally/screen/1`       | 活动 1 的公开大屏（免登录）   |

> **登录态**：镜像原生的 `__dev-auth.js` 会自动往 `localStorage` 写入一份假会话，让
> 管理页的 `requiresAuth` 路由通过。控制台执行 `__devAuth.off()` 可关闭，或访问 `?devauth=0`。

## 数据

`tally.json` 包含从源站 WebSocket 抓到的活动 1-4 真实快照（候选人、票数、状态）。
源站 REST 需登录返回 401，不可达；而公开大屏用的 WebSocket 没有鉴权，可直连抓快照。

详见 `tally.json` 顶部的 `meta.note`。

## 验证

启动服务后，可用 curl 快速确认接口与静态资源正常：

```bash
python app.py --port 5055 &

# 健康检查（返回 4 个活动的汇总）
curl http://127.0.0.1:5055/api/v2/tally/_debug

# 大屏 / 管理页 / 控制台静态入口
curl -o /dev/null -w "%{http_code}" http://127.0.0.1:5055/tally/screen/1      # 大屏(免登录)
curl -o /dev/null -w "%{http_code}" http://127.0.0.1:5055/admin/tally          # 管理页
curl -o /dev/null -w "%{http_code}" http://127.0.0.1:5055/admin/tally/activities/1/control  # 控制台
```

大屏的实时推送走 WebSocket `ws://<host>/ws/tally/activity/<id>`，可在浏览器打开大屏页后于控制台投票验证刷新。