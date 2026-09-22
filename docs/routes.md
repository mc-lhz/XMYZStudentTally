# xmyzstudent.com 路由表（提取自 index-DJrtCu9i.js）

共 72 条路由

| 路径 path | 名称 name | 标题 title | 层级 | 需登录 | 父级 | 懒加载分块 |
|---|---|---|---|---|---|---|
| / | home | 首页 | 1 | 否 |  |  |
| /ticket | ticket | 活动抢票 | 1 | 否 |  | TicketPage-Cyk7I6Py.js |
| /ticket/my | my-tickets | 我的票据 | 2 | 是 | ticket | MyTicketsPage-DRUwk3BB.js |
| /ticket/:id | ticket-detail | 活动详情 | 2 | 否 | ticket | TicketDetailPage-CT_rzMiP.js |
| /ringtone | ringtone | 宿舍铃声 | 1 | 否 |  | RingtonePage-DMJmC_vj.js |
| /ringtone/:id/submit | ringtone-submit | 铃声投稿 | 2 | 是 | ringtone | CampaignSubmissionPage-H7M00izd.js |
| /ringtone/:id/vote | ringtone-vote | 铃声投票 | 2 | 是 | ringtone | CampaignVotingPage-BZC-K1eF.js |
| /grade | grade | 分数查询 | 1 | 是 |  | GradePage-BbPP7xQB.js |
| /grade/:examId | grade-exam-detail | 考试详情 | 2 | 是 | grade | GradeExamDetailPage-DHgL2_mY.js |
| /community | community | 评分社区 | 1 | 否 |  | CommunityPage-AcOc2hqy.js |
| /community/search | community-search | 搜索 | 2 | 否 | community | CommunitySearchPage-Bt5X32By.js |
| /wall | wall | 厦一万能墙 | 1 | 否 |  | WallPage-CKvPPzSX.js |
| /community/category/:categoryId | community-category | 分类详情 | 2 | 否 | community | CategoryPage-BU35xpIp.js |
| /community/major/:majorId | community-major | 选择小分区 | 2 | 否 | community | MinorSectionPage-CaGZwHME.js |
| /community/minor/:minorId | community-minor | 评分列表 | 3 | 否 | community-major | RatingItemsPage-wQzbgvsI.js |
| /community/item/:itemId | community-item | 评分详情 | 4 | 否 | community-minor | RatingDetailPage-zkU8rz6t.js |
| /community/collection/:collectionId | community-collection | 合集详情 | 2 | 否 | community | CollectionDetailPage-B1MhHCDA.js |
| /community/contributions | community-contributions | 我的反馈 | 2 | 是 | community | MyContributionsPage-DzgGggsY.js |
| /design-system | design-system | 设计系统 | 1 | 否 |  | DesignSystemPage-CaPC67ZG.js |
| /profile | profile | 个人中心 | 2 | 是 | home | ProfilePage-zNPfiNzc.js |
| /messages | messages | 我的消息 | 2 | 是 | profile | MessagesPage-BIpOxa43.js |
| /auth/qq/callback | qq-callback | QQ 登录 | 2 | 否 | home | QQCallbackPage-DWqt-H_w.js |
| /auth/qq/bindOrRegister | qq-bindOrRegister | QQ 绑定 | 2 | 否 | home | QQBindPage-CsLJxUxf.js |
| /user/bindqq/callback | user-bindqq-callback | QQ 绑定 | 2 | 是 | profile | QQBindCallbackPage-B5Vqxyxu.js |
| /admin/tickets | admin-tickets | 票务管理 | 2 | 是 | home | TicketManagePage-BzkRIMii.js |
| /admin/tickets/new | admin-tickets-new | 创建活动 | 3 | 是 | admin-tickets | AdminActivityDetailPage-BCWS0ItI.js |
| /admin/tickets/verify | admin-tickets-verify | 验票核销 | 3 | 是 | admin-tickets | AdminVerifyPage-BoopLU4m.js |
| /admin/tickets/:id | admin-tickets-detail | 编辑活动 | 3 | 是 | admin-tickets | AdminActivityDetailPage-BCWS0ItI.js |
| /admin/tickets/:id/review | admin-tickets-review | 审票管理 | 4 | 是 | admin-tickets-detail | AdminTicketReviewPage-BtJ0fmnA.js |
| /admin/dorm | admin-dorm | 宿舍管理 | 2 | 是 | home | DormManagePage-C3ncVEQm.js |
| /admin/music-download | admin-music-download | 歌曲下载 | 2 | 是 | home | MusicDownloadPage-BtuHNt6X.js |
| /admin/campaigns | admin-campaigns | 活动管理 | 2 | 是 | home | CampaignManagePage-CIstESeP.js |
| /admin/campaigns/:id/review | admin-campaigns-review | 审核投稿 | 3 | 是 | admin-campaigns | CampaignReviewPage-DIC-1GaW.js |
| /admin/campaigns/:id/results | admin-campaigns-results | 投票结果 | 3 | 是 | admin-campaigns | CampaignResultsPage-BC-uSo4Y.js |
| /admin/rating | admin-rating | 评分社区管理 | 2 | 是 | home | RatingSchoolsPage-F_7no0Qr.js |
| /admin/rating/schools/:schoolId | admin-rating-major-sections | 大分区管理 | 3 | 是 | admin-rating | RatingMajorSectionsPage-DDqz7HId.js |
| /admin/rating/major-sections/:majorSectionId | admin-rating-minor-sections | 小分区管理 | 4 | 是 | admin-rating-major-sections | RatingMinorSectionsPage-DoADp270.js |
| /admin/rating/minor-sections/:minorSectionId | admin-rating-items-legacy | 评分项目管理 | 5 | 是 | admin-rating-minor-sections | RatingItemsListPage-C7Nh9hRX.js |
| /admin/rating/categories | admin-rating-categories | 分类管理 | 3 | 是 | admin-rating | RatingCategoriesPage-DiurIUh_.js |
| /admin/rating/categories/:categoryId | admin-rating-category | 子分类管理 | 4 | 是 | admin-rating-categories | RatingCategoriesPage-DiurIUh_.js |
| /admin/rating/categories/:categoryId/items | admin-rating-category-items | 评分项目管理 | 5 | 是 | admin-rating-category | RatingItemsListPage-C7Nh9hRX.js |
| /admin/rating/items/:itemId | admin-rating-item-detail | 评分项目详情 | 6 | 是 | admin-rating-items | RatingItemDetailPage-DgA5eFAm.js |
| /admin/rating/collections | admin-rating-collections | 合集管理 | 3 | 是 | admin-rating | RatingCollectionsPage-DyQup4BG.js |
| /admin/rating/collections/:collectionId | admin-rating-collection-detail | 合集详情 | 4 | 是 | admin-rating-collections | RatingCollectionDetailPage-Cp3atiBr.js |
| /admin/rating/contributions | admin-rating-contributions | 审核反馈 | 3 | 是 | admin-rating | RatingContributionsPage-B2jOecRJ.js |
| /admin/rating/statistics | admin-rating-statistics | 数据统计 | 3 | 是 | admin-rating | RatingStatisticsPage-CwAlkmsJ.js |
| /admin/messages | admin-messages | 消息管理 | 2 | 是 | home | MessageManagePage-CzHBToWV.js |
| /admin/qqmusic | admin-qqmusic | QQ音乐管理 | 2 | 是 | home | QQMusicManagePage-BvEVvNXb.js |
| /admin/campus | admin-campus | 校园网管理 | 2 | 是 | home | CampusManagePage-CCFD6xvZ.js |
| /admin/banners | admin-banners | 轮播图管理 | 2 | 是 | home | BannerManagePage-ClGRy9K2.js |
| /admin/museum | admin-museum | 时间线管理 | 2 | 是 | home | MuseumIndexPage-WGdLk3Gq.js |
| /admin/museum/moments | admin-museum-moments | 瞬间管理 | 3 | 是 | admin-museum | MomentManagePage-ijWH0SJq.js |
| /admin/museum/tags | admin-museum-tags | 标签管理 | 3 | 是 | admin-museum | MuseumTagsPage-aLAnppzC.js |
| /admin/museum/events | admin-museum-events | 活动管理 | 3 | 是 | admin-museum | MuseumEventsPage-Czhbu_BO.js |
| /admin/museum/events/create | admin-museum-event-create | 创建活动 | 4 | 是 | admin-museum-events | MuseumEventEditPage-CFVVmsbA.js |
| /admin/museum/events/:id/edit | admin-museum-event-edit | 编辑活动 | 4 | 是 | admin-museum-events | MuseumEventEditPage-CFVVmsbA.js |
| /admin/museum/events/:id/content | admin-museum-event-content | 内容管理 | 4 | 是 | admin-museum-events | MuseumEventContentPage-zrdd4BKv.js |
| /vote | debate-vote | 辩论赛投票 | 1 | 否 |  | VotePage-CPzz36Ky.js |
| /vote/display | debate-vote-display | 辩论赛实时结果 | 1 | 否 |  | VoteDisplayPage-CKs9gANE.js |
| /vote/screen | debate-vote-screen | 辩论赛投屏二维码 | 1 | 否 |  | VoteScreenPage-B-LWpR1x.js |
| /admin/debate | admin-debate | 辩论赛管理 | 2 | 是 | home | DebateAdminPage-BvQxa_lk.js |
| /tally/screen/:id | tally-screen | 实时唱票 | 1 | 否 |  | ScreenPage-D-8ErF3w.js |
| /admin/tally | admin-tally | 实时唱票管理 | 2 | 是 | home | TallyActivitiesPage-Ck1JhJya.js |
| /admin/tally/activities/:id/edit | admin-tally-edit | 配置活动 | 3 | 是 | admin-tally | TallyActivityEditPage-DFD129SB.js |
| /admin/tally/activities/:id/control | admin-tally-control | 唱票控制台 | 3 | 是 | admin-tally | TallyControlPage-CBBTMqC8.js |
| /voices | voices | 跨代留声 | 1 | 否 |  | VoicesHomePage-DHCOephc.js |
| /voices/ask | voices-ask | 我要出卷 | 2 | 是 | voices | VoicesAskPage-B00XFXVK.js |
| /voices/mine | voices-mine | 我的档案袋 | 2 | 是 | voices | VoicesMinePage-_C7Ryi_D.js |
| /voices/answer | voices-answer | 答题大厅 | 2 | 否 | voices | VoicesAnswerPage-Ddl_yrdt.js |
| /voices/question/:id | voices-question-detail | 试题详情 | 3 | 否 | voices-answer | VoicesQuestionDetailPage-Dl5Lc0xe.js |
| /admin/voices | admin-voices | 跨代留声管理 | 2 | 是 | home | VoicesManagePage-BtE1k-VN.js |
| /:pathMatch(.*)* | not-found | 页面未找到 | 1 | 否 |  | NotFoundPage-CmMFNuM7.js |
