# tally —— 实时唱票业务本地实现

把线上 `xmyzstudent.com` 的 **tally（实时唱票）** 业务在本地完整复刻：
**复用源站镜像前端**，配一个**自建 Flask 后端**（12 个 REST 接口 + 1 个 WebSocket 地址），
全部数据落在**单个 `tally.json`** 里。

> 工作目录：`deepseek-r1-20260925-090951/`
> 分析报告：[`docs/链路分析报告.md`](docs/链路分析报告.md)
> WebSocket 教学：[`docs/WebSocket前后端知识讲解.md`](docs/WebSocket前后端知识讲解.md)
> JS 治理说明：[`docs/JS代码治理说明.md`](docs/JS代码治理说明.md)

---

## 1. 快速开始

```bat
cd tally
run.bat                 :: 默认先试 5000，被占用则自动换随机可用端口
run.bat 8080            :: 指定端口（占用时自动换成随机端口并打印实际端口）
run.bat 8080 strict     :: 指定端口必须可用，否则直接退出
```

或直接：

```bash
python tally/main.py --port 5000
python tally/main.py --check          # 只做端口可用性检测
```

**依赖**：本目录 `.pylibs/` 已内置全部运行依赖（Flask 3.1.3 / flask-sock 0.7.0 等），
`main.py` 启动时自动加载，**无需联网 pip**。
若想自行安装：`pip install -r requirements.txt`。

### 访问地址（端口以启动横幅打印的为准）

| 界面 | 地址 |
|---|---|
| 活动管理 | `http://127.0.0.1:<port>/admin/tally` |
| 活动配置 | `http://127.0.0.1:<port>/admin/tally/activities/1/edit` |
| 唱票控制台 | `http://127.0.0.1:<port>/admin/tally/activities/1/control` |
| 实时大屏 | `http://127.0.0.1:<port>/tally/screen/1` |
| WebSocket | `ws://127.0.0.1:<port>/ws/tally/activity/1` |

**登录解锁**：账号 `admin` / `admin`。
页面加载时会自动执行 `static/dev-auth.js` 换取 token 并写入本地登录态，
所以**直接打开 `/admin/tally` 不会跳登录页**。
需要手动解锁时用命令行工具：

```bash
python tally/tools/dev-login.py http://127.0.0.1:5000 --verify
```

它会打印 token 与待写入 `localStorage` 的四项登录态，并顺带校验管理接口可访问。
口令可用 `tally/auth.json` 覆盖（示例见 `auth.json.example`）。

---

## 2. 三块功能

### 活动管理（`/admin/tally`）
列表 / 新建 / **状态切换**（`0 待开始`、`1 进行中`、`2 已结束`）/ 删除（级联清候选人，弹确认）/
一键复制大屏链接 / 跳配置页与控制台。

### 唱票控制台（`/admin/tally/activities/:id/control`）
* 现场录票：每人四个快按钮 `+1` `+5` `+10` `-1`，另有「自定义」输入框（回车即应用）；
* 状态不是「进行中」时按钮置灰（与源站一致）；
* **撤销上一步**：回滚最近一次未被撤销的录票；
* 操作日志：时间 / 候选人 / 票数变化 / 类型（普通 · 撤销），默认最近 20 条，可手动刷新。

### 实时大屏（`/tally/screen/:id`）
柱状图按 `displayOrder` 排列，票数变化时柱高动画推进；右上角显示连接状态与全屏按钮。
**数据全部来自 WebSocket 推送**：连上即收到一份快照，此后每次票数变化由服务端主动广播。

---

## 3. 接口清单（与源站逐字对应）

响应信封统一为 `{"code":200,"message":"success","data":...}`。
管理接口需要 `Authorization: Bearer <token>`，鉴权失败按源站习惯返回 **HTTP 401 + 同一信封**。

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/api/v2/auth/login` | 换取 token（`{loginType:"normal",username,password}`） |
| GET | `/api/v2/admin/tally/activities` | 活动列表 |
| POST | `/api/v2/admin/tally/activities` | 新建活动 `{title}` |
| GET | `/api/v2/admin/tally/activities/{id}` | 活动详情（含候选人） |
| PUT | `/api/v2/admin/tally/activities/{id}` | 改名 / 切状态 `{title?,status?}` |
| DELETE | `/api/v2/admin/tally/activities/{id}` | 删除活动（级联） |
| POST | `/api/v2/admin/tally/activities/{id}/candidates` | 新增候选人 `{number,name,displayOrder}` |
| PUT | `/api/v2/admin/tally/candidates/{cid}` | 编辑候选人 |
| DELETE | `/api/v2/admin/tally/candidates/{cid}` | 删除候选人 |
| POST | `/api/v2/admin/tally/candidates/{cid}/vote` | 现场录票 `{delta}` |
| POST | `/api/v2/admin/tally/activities/{id}/undo` | 撤销上一步 |
| GET | `/api/v2/admin/tally/activities/{id}/records` | 操作日志（倒序） |
| GET | `/api/v2/tally/activities/{id}/snapshot` | **公开**只读快照 |
| WS | `/ws/tally/activity/{id}` | **实时推送**快照 |
| GET | `/api/v2/tally/health` | 健康检查（本地附加，便于运维） |

WS 路径与源站 `wss://api.xmyzstudent.com/ws/tally/activity/{id}` **逐字一致**，只把 origin 同源化。

---

## 4. 自测

```bash
python tally/tests/test_e2e.py http://127.0.0.1:5000     # 端到端 34 项
python tally/tests/dump_routes.py                        # 打印实际注册的路由表
```

`test_e2e.py` 覆盖：静态资源与 SPA 回退、鉴权（无 token / 错口令 / 正确口令）、
四场初始活动与公开快照、活动增改删与状态切换、候选人增改删、
`+1/+5/-1/0` 录票与校验、撤销与回滚、操作日志倒序、
**WS 连上即收快照**、**录票后收到广播**、健康检查。
测试结束会删除自己创建的活动，`tally.json` 恢复为初始状态。

---

## 5. 目录结构

```
tally/
├── main.py                 服务入口：Flask + WebSocket + 端口探测 + SPA 回退
├── api.py                  12 个 REST 接口 + 本地登录解锁接口
├── store.py                单文件存储层：原子写盘 / 载入失败锁写并另存
├── ws_hub.py               广播中心：按活动分房间、逐连接容错
├── tally.json              唯一数据文件（含源站 id=1/2/3/4 四场真实数据）
├── auth.json.example       口令覆盖示例
├── requirements.txt        依赖清单（.pylibs 已内置）
├── run.bat                 Windows 启动器
├── .pylibs/                随包离线依赖（启动时自动加载）
├── static/                 镜像前端子集（18 个文件，全部来自源站）
│   ├── index.html          外壳：只改了 CSS/JS 引用与 dev-auth 引入
│   ├── dev-auth.js         登录解锁脚本（对应任务书要求）
│   ├── vite.svg
│   └── assets/             入口 + 页头页脚 + 4 个 tally 页面 + WS Hook + 接口层 + 8 份 CSS
├── tools/
│   └── dev-login.py        命令行登录解锁 + 校验
├── tests/
│   ├── test_e2e.py         端到端自测（34 项）
│   └── dump_routes.py      路由表打印
└── docs/
    ├── 链路分析报告.md
    ├── WebSocket前后端知识讲解.md
    └── JS代码治理说明.md
```

---

## 6. 初始数据说明

`tally.json` 内的四场活动由**源站公开快照接口实测抓取**
（`GET /api/v2/tally/activities/{1,2,3,4}/snapshot`，无需认证，抓取脚本 `_src/seed_tally_json.py`）：

| id | 活动标题 | 候选人 | 总票数 |
|---|---|---|---|
| 1 | 2026厦门一中思明校区双代会 | 3 | 66 |
| 2 | 2026厦门一中思明校区双代会 | 3 | 505 |
| 3 | 2026厦门一中海沧校区双代会 | 2 | 579 |
| 4 | 2026年厦门一中思明校区主席竞选 | 9 | 3814 |

源站的**历史录票流水**不对外公开，因此每个候选人的初始票数被写成
**一条标记 `"seed": true` 的 `type=0` 记录**：
这样「操作日志」有据可依、票数可对账，同时清楚区分「抓取来的初始值」与「现场录的票」。
线上管理接口需要真实凭据（实测返回 401），无法抓取，相关字段一律不臆造。

---

## 7. 关键设计取舍

* **单文件存储 + 原子写**：写入走 `临时文件 + os.replace`，任何时刻磁盘上都是完整 JSON；
  **载入失败则锁写**并把坏文件另存为 `.corrupt-<时间戳>`，绝不用空数据覆盖（写操作直接返回 500）。
* **推送全量快照而非增量事件**：全量快照是幂等的，丢帧/重复帧都不会让大屏错位。
* **只读实时通道与可写控制通道分离**：大屏 WS 公开只读（与源站一致），
  所有写操作走需要 Bearer token 的 REST，缩小攻击面。
* **广播逐连接容错**：单个连接写失败只摘除该连接，不影响其余大屏。

---

## 8. 踩坑记录：`expiresAt` 秒 / 毫秒单位不一致导致登录态被清空

**现象**：服务起来后打开 `/admin/tally`，没有进入活动列表，而是被判为未登录
（侧栏回落成「游客 / 点击登录」），本地登录态被清空。

**根因**：入口 bundle 的 auth store 以**毫秒**比较过期时间（反混淆后）：

```js
const oo="token", io="user", ao="expiresAt", lo="campusInfo", $s="permissions"
function te(w){ /* 登录成功后 */ n.value = w.expiresAt * 1e3; /* 接口秒值 → 存毫秒 */ }
const isLoggedIn = computed(() => !token || !expiresAt ? false : Date.now() < expiresAt)
```

而 `static/dev-auth.js` 把后端 `POST /api/v2/auth/login` 返回的 `expiresAt`
（**秒**，实测 `1822055720`）原样写进了 localStorage。
守卫里 `Date.now()` 约 `1.79e12`（毫秒），恒大于秒级的过期时间 →
判定「已过期」→ 执行 `B()` 清空 `token/user/expiresAt/permissions`，登录态丢失。

**修复**（只改 `static/dev-auth.js`，后端契约不动）：
落库前把小于 `1e12` 的值按秒处理并乘以 1000，`whoami()` 的比较口径同步改为毫秒：

```js
var expiresAt = Number(payload.expiresAt)
if (expiresAt) { expiresAt = expiresAt < 1e12 ? expiresAt * 1000 : expiresAt }
else { expiresAt = Date.now() + 86400 * 365 * 1000 }
```

**验证**：`/admin/tally` 正常渲染活动列表；`localStorage.expiresAt = 1822055813000` > `Date.now()`；
控制台输出 `[tally] 已解锁管理后台登录态: admin`，无报错。

**教训**：跨端时间戳的秒 / 毫秒单位必须显式对齐。前端既已约定毫秒，
注入登录态的脚本就要按前端口径落库，而不是照抄接口原值。
