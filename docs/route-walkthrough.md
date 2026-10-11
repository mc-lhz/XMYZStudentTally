# 路由可用性走查报告

> 生成时间基准：扫描 mock = `devauth`

## 总览

- 扫描路由总数：**72**
- 渲染通过（OK）：**72**
- 失败：**0**
- 动态路由（含 `:param`）：**27**
- 发生重定向（登录/绑定回调）：**5**
- 完整性三连：`pc_all` 94/94 可解析 · `verify_links` 断链 0 · `detect_dead_bindings` A/B/C/D/F 全 0（E 级 5 处已确认为误报）

判定标准：在 jsdom 无头环境加载后，匹配到 Vue 路由且渲染出非空 DOM（`matched===1` 且 `status==="OK"` 且无控制台错误）。业务数据请求指向线上后端，未登录下多为空列表属正常。

## 首页（1）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/` | home | 否 | 15066 | 否 | OK |

## 404 兜底（1）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/:pathMatch(.*)*` | not-found | 是 | 237 | 否 | OK |

## 账号绑定回调（重定向）（3）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/auth/qq/bindOrRegister` | home | 否 | 15066 | 是 → / | OK |
| `/auth/qq/callback` | home | 否 | 15066 | 是 → / | OK |
| `/user/bindqq/callback` | profile | 否 | 10183 | 是 → /profile | OK |

## 公共社区（8）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/community` | community | 否 | 5201 | 否 | OK |
| `/community/category/:categoryId` | community-category | 是 | 5027 | 否 | OK |
| `/community/collection/:collectionId` | community-collection | 是 | 2852 | 否 | OK |
| `/community/contributions` | community-contributions | 否 | 2793 | 否 | OK |
| `/community/item/:itemId` | community-item | 是 | 14234 | 否 | OK |
| `/community/major/:majorId` | community-major | 是 | 3071 | 否 | OK |
| `/community/minor/:minorId` | community-minor | 是 | 2450 | 否 | OK |
| `/community/search` | community-search | 否 | 2561 | 否 | OK |

## 跨代留声（5）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/voices` | voices | 否 | 3129 | 否 | OK |
| `/voices/answer` | voices-answer | 否 | 2478 | 否 | OK |
| `/voices/ask` | voices-ask | 否 | 2341 | 否 | OK |
| `/voices/mine` | voices-mine | 否 | 1042 | 否 | OK |
| `/voices/question/:id` | voices-question-detail | 是 | 3252 | 否 | OK |

## 个人中心与成绩（8）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/grade` | grade | 否 | 3781 | 否 | OK |
| `/grade/:examId` | grade-exam-detail | 是 | 5186 | 否 | OK |
| `/messages` | messages | 否 | 3392 | 否 | OK |
| `/profile` | profile | 否 | 10183 | 否 | OK |
| `/ringtone` | ringtone | 否 | 2667 | 否 | OK |
| `/ringtone/:id/submit` | ringtone | 是 | 2667 | 是 → /ringtone | OK |
| `/ringtone/:id/vote` | ringtone | 是 | 2667 | 是 → /ringtone | OK |
| `/wall` | wall | 否 | 2234 | 否 | OK |

## 活动抢票（3）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/ticket` | ticket | 否 | 3418 | 否 | OK |
| `/ticket/:id` | ticket-detail | 是 | 4513 | 否 | OK |
| `/ticket/my` | my-tickets | 否 | 3352 | 否 | OK |

## 辩论投票（3）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/vote` | debate-vote | 否 | 202 | 否 | OK |
| `/vote/display` | debate-vote-display | 否 | 1527 | 否 | OK |
| `/vote/screen` | debate-vote-screen | 否 | 121 | 否 | OK |

## 实时唱票大屏（1）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/tally/screen/:id` | tally-screen | 是 | 926 | 否 | OK |

## 管理后台（38）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/admin/banners` | admin-banners | 否 | 3904 | 否 | OK |
| `/admin/campaigns` | admin-campaigns | 否 | 3860 | 否 | OK |
| `/admin/campaigns/:id/results` | admin-campaigns-results | 是 | 4597 | 否 | OK |
| `/admin/campaigns/:id/review` | admin-campaigns-review | 是 | 3662 | 否 | OK |
| `/admin/campus` | admin-campus | 否 | 3946 | 否 | OK |
| `/admin/debate` | admin-debate | 否 | 3506 | 否 | OK |
| `/admin/dorm` | admin-dorm | 否 | 3900 | 否 | OK |
| `/admin/messages` | admin-messages | 否 | 3409 | 否 | OK |
| `/admin/museum` | admin-museum | 否 | 5056 | 否 | OK |
| `/admin/museum/events` | admin-museum-events | 否 | 4731 | 否 | OK |
| `/admin/museum/events/:id/content` | admin-museum-event-content | 是 | 6777 | 否 | OK |
| `/admin/museum/events/:id/edit` | admin-museum-event-edit | 是 | 5131 | 否 | OK |
| `/admin/museum/events/create` | admin-museum-event-create | 否 | 5267 | 否 | OK |
| `/admin/museum/moments` | admin-museum-moments | 否 | 4149 | 否 | OK |
| `/admin/museum/tags` | admin-museum-tags | 否 | 3998 | 否 | OK |
| `/admin/music-download` | admin-music-download | 否 | 3246 | 否 | OK |
| `/admin/qqmusic` | admin-qqmusic | 否 | 5321 | 否 | OK |
| `/admin/rating` | admin-rating | 否 | 6145 | 否 | OK |
| `/admin/rating/categories` | admin-rating-categories | 否 | 4188 | 否 | OK |
| `/admin/rating/categories/:categoryId` | admin-rating-category | 是 | 5067 | 否 | OK |
| `/admin/rating/categories/:categoryId/items` | admin-rating-category-items | 是 | 5037 | 否 | OK |
| `/admin/rating/collections` | admin-rating-collections | 否 | 4321 | 否 | OK |
| `/admin/rating/collections/:collectionId` | admin-rating-collection-detail | 是 | 4370 | 否 | OK |
| `/admin/rating/contributions` | admin-rating-contributions | 否 | 4446 | 否 | OK |
| `/admin/rating/items/:itemId` | admin-rating-item-detail | 是 | 4267 | 否 | OK |
| `/admin/rating/major-sections/:majorSectionId` | admin-rating-minor-sections | 是 | 4699 | 否 | OK |
| `/admin/rating/minor-sections/:minorSectionId` | admin-rating-items-legacy | 是 | 5053 | 否 | OK |
| `/admin/rating/schools/:schoolId` | admin-rating-major-sections | 是 | 4320 | 否 | OK |
| `/admin/rating/statistics` | admin-rating-statistics | 否 | 4336 | 否 | OK |
| `/admin/tally` | admin-tally | 否 | 3499 | 否 | OK |
| `/admin/tally/activities/:id/control` | admin-tally-control | 是 | 2810 | 否 | OK |
| `/admin/tally/activities/:id/edit` | admin-tally-edit | 是 | 4029 | 否 | OK |
| `/admin/tickets` | admin-tickets | 否 | 4372 | 否 | OK |
| `/admin/tickets/:id` | admin-tickets-detail | 是 | 7867 | 否 | OK |
| `/admin/tickets/:id/review` | admin-tickets-review | 是 | 4038 | 否 | OK |
| `/admin/tickets/new` | admin-tickets-new | 否 | 5743 | 否 | OK |
| `/admin/tickets/verify` | admin-tickets-verify | 否 | 3047 | 否 | OK |
| `/admin/voices` | admin-voices | 否 | 3849 | 否 | OK |

## 其他（1）

| 路由 pattern | name | 动态 | 渲染字符数 | 重定向 | 状态 |
|---|---|---|---|---|---|
| `/design-system` | design-system | 否 | 41014 | 否 | OK |

## 重定向明细

以下路由在无登录态下会重定向到落地页（登录/绑定回调类），属预期行为：

- `/auth/qq/bindOrRegister` → 落地 `/`
- `/auth/qq/callback` → 落地 `/`
- `/ringtone/:id/submit` → 落地 `/ringtone`
- `/ringtone/:id/vote` → 落地 `/ringtone`
- `/user/bindqq/callback` → 落地 `/profile`

## 结论

全部 72 条路由均能在无头环境成功匹配并渲染，无白屏、无脚本错误、无微任务饿死/死循环。QR 码库此前发现的 13 处变量塌陷已修复并经 `verify_qrcode.cjs` 三层回读/渲染验证（160/160 + 5/5 + 5/5）确认可被正确扫描。
