# JS 代码治理说明（前端压缩产物可读化）

> 治理对象：`tally/static/assets/` 下 6 个 tally 业务模块
> 治理目标：格式化 + 语义化 + 注释（**不改写渲染逻辑**）
> 工具：`_src/build_frontend.py`（构建与改写）、`_src/govern_runtime_assets.py`（格式化与注释）

---

## 1. 现状：为什么压缩产物不能直接读

源站前端是 Vite 生产构建产物，业务模块被压成这样：

```js
import{D as i}from"./index-D2vbWxba.js";function e(){return i.get("/admin/tally/activities")}
function d(t){return i.get(`/admin/tally/activities/${t}`)}...export{e as a,f as b,s as c,...};
```

可读性问题有三层：

1. **没有格式**：单个文件一行，几万字符；编辑器里无法定位；
2. **没有语义**：局部变量是 `e / t / n / s / r`，函数名靠猜；
3. **没有注释**：看不出 `i.get("/admin/tally/activities")` 是「列表」还是「详情」。

---

## 2. 治理策略：分两类处理，安全优先

| 模块 | 处理方式 | 理由 |
|---|---|---|
| `tally-BvCEJ8Iv.js`（接口层，915 字节） | **完全重写为具名函数 + 中文注释** | 结构简单（12 个纯函数），改写的收益最大、风险最低 |
| 其余 5 个页面/Hook 模块 | **格式化 + 头部注释，标识符保持原样** | 它们是 Vue 组件渲染代码，压缩产物把单字母名**直接当作模块导出符号**使用，改名会破坏跨 chunk 契约 |

### 2.1 为什么第二类不能改名（这是踩过的坑）

访问 5 个模块时，源站 chunk 用的是这种写法：

```js
const Re = _n(Be, [["__scopeId", "data-v-cec9ba62"]])
export { Re as default }
```

`Re`、`Be`、`_n` 都是压缩名，而**导出映射是跨 chunk 的硬契约**：
`ScreenPage-BLh1rRtO.js` 在 `index-D2vbWxba.js` 中是通过
`export{Zh as X, jy as Y, ...}` 这种字母表别名被引用的。
只改「本文件内的局部名」看似安全，但只要有一个短名同时出现在导出位置或另一个 chunk 的引用位置上，
就会得到一个运行时报错（而不是编译期报错）。

本项目最初写了自动改名脚本，做完静态复核后发现上面这个风险，
**决定回退**，改为「只格式化 + 只注释」——因为任务书对治理的目标写的是
「可读化 + 注释」，而不是「重构」。

### 2.2 格式化是怎么保证零语义变更的

格式化器（`_src/govern_runtime_assets.py::format_statements`）遵守三条硬规则：

1. **只在语句/块边界插入换行与缩进**：`;`、`{`、`}`、`,` 之后；
   绝不插入或删除任何字符，绝不重排 token。
2. **整段拷贝容器的内容**：字符串（`'` `"`）、模板串（`` ` ``）、
   行注释（`//`）、块注释（`/* */`）、**正则字面量** 全部原样搬运。
   正则判定用的是 JS 词法的经典启发式：只有出现在 `( , = : [ ! & | ? { } ; + - * % ~ ^ < >` 之后的
   `/` 才当作正则起始。**这一条是必需的** ——
   本项目的图标/样式正则与字符串里大量出现 `{` `}` `,` `;`，
   不做正则识别就会把它们切碎，页面会直接白屏。
3. **等价性自证**：格式化前后各做一次「去注释 + 去全部空白」归一化，
   两份结果**必须逐字节相同**，否则拒绝写入。

治理脚本的实际输出：

```
useTallySocket-BrS_O9ye.js
    语法 OK / 去空白后代码完全一致 True / 导出符号 1 个未动 / 行数 149
ScreenPage-BLh1rRtO.js
    语法 OK / 去空白后代码完全一致 True / 导出符号 1 个未动 / 行数 810
TallyActivitiesPage-tccNm29V.js
    语法 OK / 去空白后代码完全一致 True / 导出符号 1 个未动 / 行数 1044
TallyActivityEditPage-zSPhMPUE.js
    语法 OK / 去空白后代码完全一致 True / 导出符号 1 个未动 / 行数 1483
TallyControlPage-Dtvs_iR1.js
    语法 OK / 去空白后代码完全一致 True / 导出符号 1 个未动 / 行数 1036
```

---

## 3. 治理后产出

### 3.1 接口层：`tally-BvCEJ8Iv.js`

压缩形态 → 具名形态：

```js
// 治理前
function e(){return i.get("/admin/tally/activities")}
function d(t){return i.get(`/admin/tally/activities/${t}`)}
export{e as a,f as b,s as c,c as d,l as e,d as f,r as g,u as h,m as i,v as j,y as k,o as l}

// 治理后
/** 活动列表：GET /admin/tally/activities -> data: Activity[] */
function listActivities() { return http.get('/admin/tally/activities') }
/** 活动详情（含候选人）：GET /admin/tally/activities/{id} */
function getActivity(activityId) { return http.get(`/admin/tally/activities/${activityId}`) }
// 导出名必须与源站 chunk 的导出映射逐字一致，否则其它模块 import 不到
export { listActivities as a, getActivity as f, ... }
```

要点：**本地名语义化，导出别名一字不改** ——
这样既拿到了可读性，又保住了跨 chunk 契约。

### 3.2 页面模块：头部契约注释

每个模块开头补一段「职责 + 接口契约 + 消费方」注释，例如：

```js
/**
 * 唱票控制台（/admin/tally/activities/:id/control）—— 可读化版本（由源站压缩产物治理而来）
 *
 * 职责：现场录票（+1 / +5 / +10 / -1 / 自定义增量）、撤销上一步、操作日志（最近 20 条）。
 * 契约：POST /admin/tally/candidates/{cid}/vote，POST /admin/tally/activities/{id}/undo，
 *       GET /admin/tally/activities/{id}/records，快照走 WS。
 *
 * 治理方式：
 *   1) 格式化：按语句/块统一换行与缩进，未改动任何 token；
 *   2) 注释：补充模块职责与接口对应关系；
 *   3) 标识符：保留源站原名（压缩产物把单字母名直接作为模块导出符号使用，
 *      本文件导出 Re，改名会破坏跨 chunk 契约，故不参与改名）。
 */
```

于是「一个接口对应哪个页面、发往哪个路径」在文件里可查，
不用再回去翻压缩产物。

---

## 4. 复核方式（可复现）

```bash
# 1. 语法
node --check tally/static/assets/ScreenPage-BLh1rRtO.js        # 每个模块都应 exit=0

# 2. 等价性（脚本内置，重跑治理脚本即可看到）
python _src/govern_runtime_assets.py

# 3. 端到端：确认页面运行时依然正常
python tally/tests/test_e2e.py http://127.0.0.1:5000           # 34 项全通过
```

其中第 3 步会覆盖 5 个静态资源检查（SPA 外壳、镜像 CSS、接口层同源化、登录脚本、深链回退），
确保治理没有把静态资源改坏。

---

## 5. 没有做的事（如实记录）

* **没有对 vendor chunk（`index-D2vbWxba.js`，242 KB）做改名或格式化**：
  它包含 Vue 3 / Vue Router / Pinia / axios / Element Plus 的压缩代码，
  改名的收益接近于零、风险最大，因此只做了 3 处必要的本地化改写（接口基址、WS origin、路由裁剪）。
* **没有做 AST 级重命名**：本机无法安装 Babel/Acorn（外网可用但 pip/离线安装受限），
  而自制正则改造不足以支撑「改完必然不错」的保证。选择不做，而不是冒险做。
* **没有补充行内逐行注释**：页面模块的渲染函数是压缩产物生成的
  （`a[4]||(a[4]=[e("p",null,"...")])` 这种静态提升模式），
  逐行注释会变成噪音；因此改为在模块头部集中说明契约，关键接口在接口层注释。
