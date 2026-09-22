"""tally 前端 JS 治理脚本：语义化重命名 + 详尽注释注入。

治理对象：static/assets/ 下与 tally 业务相关的 5 个 JS chunk（页面 ×4 + WS composable ×1；
API 客户端 tally-DC36h0vE.js 已手工治理，入口运行时 index-DJrtCu9i.js 仅改 baseURL 一行）。

方法：
1. 词边界精确重命名 —— 只替换独立标识符（lookaround 排除 $，避免 refVal/refVal2、zz1/zz10 前缀误伤），
   不做任何逻辑改写；重命名后旧名残留数必须为 0。
2. 注释注入 —— 在每个语义化后的函数声明上方插入 JSDoc，说明业务含义与对应接口。
3. Vue 编译产物的渲染函数参数（val1/val8/val10 等）与 prop 短名按仓库既有约定处理：
   渲染参数逐个函数作用域不同、盲目重命名有遮蔽风险，保留原名并以文件头注释说明；
   prop 属性包（tt/et/ue...）重命名为语义名（已在预检中确认无英文词/关键字冲突）。

用法：python tools/govern_js.py   （幂等：重复运行前会从干净副本恢复）
"""
import re
import shutil
from pathlib import Path

ASSETS = Path(__file__).resolve().parent.parent / "static" / "assets"
PRISTINE = Path(__file__).resolve().parent / "pristine"  # 未治理原件备份

# ---------------------------------------------------------------------------
# 重命名表：(旧名, 新名, 注释)。注释会插到 `function 新名(` 声明上方。
# ---------------------------------------------------------------------------

USE_TALLY_SOCKET = [
    ("zz0", "createTallySocket", "创建实时唱票 WebSocket 组合式函数：\n     * 入参 activityIdRef 为活动 ID 的 ref，内部 watch 它建立/断开连接；\n     * 返回 { snapshot, connected }：snapshot 为服务端推送的全量快照，connected 为连接状态。"),
    ("zz1", "connectSocket", "建立（或重连）WebSocket 连接：\n     * onopen   —— 标记 connected=true 并把重连间隔重置为 1s；\n     * onmessage—— JSON.parse 后整体替换 snapshot（源站推的是全量快照，非增量）；\n     * onclose  —— 非主动关闭时按指数退避重连；onerror 静默（close 会随后触发）。"),
    ("zz2", "scheduleReconnect", "指数退避重连调度：1s → 2s → 4s … 上限 30s。"),
    ("zz3", "closeSocket", "主动断开并清理重连定时器；置 manualClose 避免 onclose 触发自动重连。"),
    ("refVal", "snapshot", "服务端推送的当前活动全量快照（{activityId,title,status,candidates[],updatedAt}）"),
    ("refVal2", "connected", "WebSocket 是否处于已连接状态"),
    ("val2", "socket", "WebSocket 实例"),
    ("num", "retryDelayMs", "当前重连间隔（毫秒），每次失败翻倍、上限 30s"),
    ("val3", "reconnectTimer", "重连定时器句柄"),
    ("val4", "manualClose", "是否为主动关闭（主动关闭不触发自动重连）"),
    ("val", "activityIdRef", "活动 ID 的 ref（watch 源）"),
    ("val1", "activityId", "活动 ID"),
]

TALLY_ACTIVITIES_PAGE = [
    ("zz0", "statusLabel", "状态码 → 中文标签：0 待开始 / 1 进行中 / 2 已结束"),
    ("zz1", "statusClass", "状态码 → 徽标 class 名：pending / live / ended"),
    ("zz2", "formatDateTime", "时间戳 → 本地化字符串（空值显示 —）"),
    ("zz3", "loadActivities", "拉取活动列表：GET /admin/tally/activities"),
    ("zz4", "openCreateModal", "打开「新建活动」弹窗"),
    ("zz5", "closeCreateModal", "关闭「新建活动」弹窗（提交中时禁用）"),
    ("zz6", "submitCreate", "提交新建活动：POST /admin/tally/activities，请求体 { title }"),
    ("zz7", "changeStatus", "行内切换活动状态：PUT /admin/tally/activities/:id，请求体 { status }"),
    ("zz8", "deleteActivity", "删除活动（级联候选人与记录）：DELETE /admin/tally/activities/:id"),
    ("zz9", "goEditCandidates", "跳转候选人配置页 /admin/tally/activities/:id/edit"),
    ("zz10", "goControlConsole", "跳转唱票控制台 /admin/tally/activities/:id/control"),
    ("zz11", "buildScreenUrl", "拼装大屏公开链接 {origin}/tally/screen/:id"),
    ("zz12", "copyScreenLink", "复制大屏链接到剪贴板"),
    ("zz13", "openScreen", "新窗口打开大屏"),
    ("refVal", "loading", "列表加载中标志"),
    ("refVal2", "activities", "活动列表数据"),
    ("refVal3", "showCreateModal", "新建活动弹窗可见性"),
    ("refVal4", "newTitle", "新建活动标题输入值"),
    ("refVal5", "creating", "新建活动提交中标志"),
    ("useRouter1", "router", "Vue Router 实例"),
    ("useToast1", "toast", "全局 Toast 实例"),
    ("local_zba2", "pageContainerProps", "模板属性包：最外层 .page-container"),
    ("tt", "pageContentProps", "模板属性包：.page-content"),
    ("et", "contentContainerProps", "模板属性包：.content-container"),
    ("st", "breadcrumbWrapperProps", "模板属性包：.breadcrumb-wrapper"),
    ("at", "loadingStateProps", "模板属性包：加载中 .loading-container"),
    ("ot", "emptyStateProps", "模板属性包：空状态 .empty-container"),
    ("nt", "tableWrapperProps", "模板属性包：表格容器 .table-wrapper"),
    ("lt", "dataTableProps", "模板属性包：.data-table"),
    ("it", "cellTitleProps", "模板属性包：标题单元格 .cell-title"),
    ("rt", "cellTimeProps", "模板属性包：时间单元格 .cell-time"),
    ("ct", "rowActionsProps", "模板属性包：行操作区 .row-actions"),
    ("dt", "editButtonProps", "模板属性包：「配置候选人」按钮"),
    ("ut", "controlButtonProps", "模板属性包：「唱票控制台」按钮"),
    ("vt", "openScreenButtonProps", "模板属性包：「打开大屏」按钮"),
    ("mt", "copyLinkButtonProps", "模板属性包：「复制大屏链接」按钮"),
    ("ft", "statusSelectProps", "模板属性包：状态选择器（value/onChange）"),
    ("pt", "deleteButtonProps", "模板属性包：「删除」按钮"),
    ("gt", "modalProps", "模板属性包：新建弹窗 .modal"),
    ("yt", "modalBodyProps", "模板属性包：.modal-body"),
    ("bt", "formGroupProps", "模板属性包：.form-group"),
    ("ht", "modalFootProps", "模板属性包：.modal-foot"),
    ("_t", "cancelButtonProps", "模板属性包：取消按钮"),
    ("kt", "confirmButtonProps", "模板属性包：确认创建按钮"),
    ("Ct", "TallyActivitiesPageComponent", "页面组件定义（defineComponent 产物）"),
    ("Bt", "TallyActivitiesPageDefaultExport", "默认导出（withScopeId 产物）"),
]

TALLY_ACTIVITY_EDIT_PAGE = [
    ("zz0", "statusLabel", "状态码 → 中文标签：0 待开始 / 1 进行中 / 2 已结束"),
    ("zz1", "statusClass", "状态码 → 徽标 class 名：pending / live / ended"),
    ("zz2", "loadActivity", "拉取活动详情（含候选人）：GET /admin/tally/activities/:id"),
    ("zz3", "openRenameModal", "打开「修改活动标题」弹窗"),
    ("zz4", "closeRenameModal", "关闭改名弹窗（保存中时禁用）"),
    ("zz5", "submitRename", "提交改名：PUT /admin/tally/activities/:id，请求体 { title }"),
    ("zz6", "changeStatus", "切换活动状态：PUT /admin/tally/activities/:id，请求体 { status }"),
    ("zz7", "openAddCandidate", "打开「添加候选人」弹窗（显示顺序默认取当前最大值 +1）"),
    ("zz8", "openEditCandidate", "打开「编辑候选人」弹窗并回填表单"),
    ("zz9", "closeCandidateModal", "关闭候选人弹窗（保存中时禁用）"),
    ("zz10", "submitCandidate", "提交候选人：新增走 POST /admin/tally/activities/:id/candidates，\n     * 编辑走 PUT /admin/tally/candidates/:id，请求体均为 { number, name, displayOrder }"),
    ("zz11", "deleteCandidate", "删除候选人（级联其唱票记录）：DELETE /admin/tally/candidates/:id"),
    ("zz12", "goControlConsole", "跳转唱票控制台 /admin/tally/activities/:id/control"),
    ("refVal", "loading", "详情加载中标志"),
    ("refVal2", "activity", "活动详情（含 candidates 数组）"),
    ("refVal3", "showRenameModal", "改名弹窗可见性"),
    ("refVal4", "renameTitle", "改名输入值"),
    ("refVal5", "renaming", "改名提交中标志"),
    ("refVal6", "showCandidateModal", "候选人弹窗可见性"),
    ("refVal7", "editingCandidateId", "正在编辑的候选人 ID（null 表示新增）"),
    ("refVal8", "candidateForm", "候选人表单 { number, name, displayOrder }"),
    ("refVal9", "savingCandidate", "候选人保存中标志"),
    ("val2", "route", "Vue Router 当前路由（取 params.id）"),
    ("val3", "activityId", "当前活动 ID（由路由参数计算）"),
    ("val4", "sortedCandidates", "按 displayOrder 升序排好的候选人列表"),
    ("val", "props", "组件 props（未使用）"),
    ("useRouter1", "router", "Vue Router 实例"),
    ("useToast1", "toast", "全局 Toast 实例"),
    ("ne", "getActivityById", "API：GET /admin/tally/activities/:id"),
    ("ie", "addCandidate", "API：POST /admin/tally/activities/:id/candidates"),
    ("de", "updateCandidate", "API：PUT /admin/tally/candidates/:id"),
    ("re", "deleteCandidateApi", "API：DELETE /admin/tally/candidates/:id"),
    ("ue", "pageContainerProps", "模板属性包：最外层 .page-container"),
    ("ce", "pageContentProps", "模板属性包：.page-content"),
    ("me", "contentContainerProps", "模板属性包：.content-container"),
    ("ve", "breadcrumbWrapperProps", "模板属性包：.breadcrumb-wrapper"),
    ("pe", "loadingStateProps", "模板属性包：加载中 .loading-container"),
    ("fe", "pageHeaderSectionProps", "模板属性包：.page-header-section"),
    ("ye", "headerMainProps", "模板属性包：.header-main"),
    ("be", "headerTextProps", "模板属性包：.header-text"),
    ("_e", "titleRowProps", "模板属性包：.title-row"),
    ("ge", "pageTitleProps", "模板属性包：.page-title"),
    ("he", "headerActionsProps", "模板属性包：.header-actions"),
    ("ke", "statusSelectProps", "模板属性包：状态选择器（value）"),
    ("Ce", "candidatesSectionProps", "模板属性包：.candidates-section"),
    ("we", "emptyMiniProps", "模板属性包：无候选人空状态 .empty-mini"),
    ("xe", "tableWrapperProps", "模板属性包：表格容器 .table-wrapper"),
    ("Oe", "dataTableProps", "模板属性包：.data-table"),
    ("Ne", "cellNumProps", "模板属性包：编号单元格 .cell-num"),
    ("Ve", "cellNameProps", "模板属性包：姓名单元格 .cell-name"),
    ("Pe", "cellVotesProps", "模板属性包：票数单元格 .cell-votes"),
    ("Be", "rowActionsProps", "模板属性包：行操作区 .row-actions"),
    ("Me", "editButtonProps", "模板属性包：「编辑」按钮"),
    ("Ae", "deleteButtonProps", "模板属性包：「删除」按钮"),
    ("Se", "backLinkWrapProps", "模板属性包：返回链接区 .back-link-wrap"),
    ("Ue", "renameModalProps", "模板属性包：改名弹窗 .modal"),
    ("De", "modalBodyProps", "模板属性包：.modal-body"),
    ("Ee", "formGroupProps", "模板属性包：.form-group"),
    ("Ie", "modalFootProps", "模板属性包：.modal-foot"),
    ("Re", "cancelButtonProps", "模板属性包：取消按钮"),
    ("Te", "confirmButtonProps", "模板属性包：保存按钮"),
    ("$e", "candidateModalProps", "模板属性包：候选人弹窗 .modal"),
    ("Fe", "modalHeadProps", "模板属性包：候选人弹窗 .modal-head"),
    ("Ke", "candidateModalBodyProps", "模板属性包：候选人弹窗 .modal-body"),
    ("Le", "formRowProps", "模板属性包：.form-row"),
    ("ze", "numberFormGroupProps", "模板属性包：编号表单项 .form-group"),
    ("je", "orderFormGroupProps", "模板属性包：显示顺序表单项 .form-group"),
    ("qe", "nameFormGroupProps", "模板属性包：姓名表单项 .form-group"),
    ("Ge", "candidateModalFootProps", "模板属性包：候选人弹窗 .modal-foot"),
    ("He", "candidateCancelButtonProps", "模板属性包：候选人弹窗取消按钮"),
    ("Je", "candidateConfirmButtonProps", "模板属性包：候选人弹窗保存按钮"),
    ("Qe", "TallyActivityEditPageComponent", "页面组件定义（defineComponent 产物）"),
    ("at", "TallyActivityEditPageDefaultExport", "默认导出（withScopeId 产物）"),
]

TALLY_CONTROL_PAGE = [
    ("zz0", "buildScreenUrl", "拼装大屏公开链接 {origin}/tally/screen/:id"),
    ("zz1", "copyScreenLink", "复制大屏链接到剪贴板"),
    ("zz2", "openScreen", "新窗口打开大屏"),
    ("zz3", "statusLabel", "状态码 → 中文标签（undefined 显示「加载中」）"),
    ("zz4", "statusClass", "状态码 → 徽标 class 名"),
    ("zz5", "formatLogTime", "日志时间戳 → HH:mm:ss"),
    ("zz6", "loadRecords", "拉取操作日志（最新 20 条）：GET /admin/tally/activities/:id/records"),
    ("zz7", "submitVote", "录票：POST /admin/tally/candidates/:id/vote，请求体 { delta }；\n     * 录票成功后刷新日志，实时票数以 WS 快照为准"),
    ("zz8", "submitCustomVote", "自定义票数录票（取整后转交 submitVote，并清空输入框）"),
    ("zz9", "undoLastOperation", "撤销最近一次录票：POST /admin/tally/activities/:id/undo"),
    ("refVal", "activityId", "当前活动 ID（来自路由参数）"),
    ("refVal2", "records", "操作日志列表"),
    ("refVal3", "recordsLoading", "日志加载中标志"),
    ("refVal4", "undoing", "撤销提交中标志"),
    ("refVal5", "customDeltas", "各候选人自定义票数输入值（按候选人 ID 索引）"),
    ("refVal6", "votingCandidateId", "正在录票的候选人 ID（防重复提交）"),
    ("val2", "route", "Vue Router 当前路由（取 params.id）"),
    ("val3", "snapshot", "WS 推送的活动全量快照"),
    ("val4", "connected", "WebSocket 连接状态"),
    ("val5", "sortedCandidates", "按 displayOrder 升序排好的候选人列表"),
    ("val6", "isLive", "活动是否「进行中」（status===1，录票前置条件）"),
    ("val7", "voteDisabled", "录票按钮统一禁用条件：非进行中 / 快照未就绪 / 该卡片正在录票"),
    ("val", "props", "组件 props（未使用）"),
    ("useToast1", "toast", "全局 Toast 实例"),
    ("ee", "recordVote", "API：POST /admin/tally/candidates/:id/vote"),
    ("te", "createTallySocket", "WS 组合式函数：建立 /ws/tally/activity/:id 连接并返回快照"),
    ("se", "pageContainerProps", "模板属性包：最外层 .page-container"),
    ("ae", "controlMainProps", "模板属性包：.control-main"),
    ("ne", "topbarProps", "模板属性包：.topbar"),
    ("oe", "topbarLeftProps", "模板属性包：.topbar-left"),
    ("le", "controlTitleProps", "模板属性包：.control-title"),
    ("ie", "topbarMetaProps", "模板属性包：.topbar-meta"),
    ("de", "topbarRightProps", "模板属性包：.topbar-right"),
    ("re", "undoButtonProps", "模板属性包：撤销按钮（disabled）"),
    ("ce", "warnBannerProps", "模板属性包：非进行中警示条 .banner.warn"),
    ("ue", "emptyBlockProps", "模板属性包：无候选人空状态 .empty-block"),
    ("ve", "candidatesGridProps", "模板属性包：候选人卡片网格 .candidates-grid"),
    ("pe", "candHeadProps", "模板属性包：.cand-head"),
    ("be", "candNumberProps", "模板属性包：.cand-number"),
    ("me", "candNameProps", "模板属性包：.cand-name"),
    ("fe", "candVotesProps", "模板属性包：.cand-votes"),
    ("ge", "candActionsProps", "模板属性包：.cand-actions"),
    ("he", "plus1ButtonProps", "模板属性包：「+1」按钮"),
    ("ye", "plus5ButtonProps", "模板属性包：「+5」按钮"),
    ("ke", "plus10ButtonProps", "模板属性包：「+10」按钮"),
    ("Ce", "minus1ButtonProps", "模板属性包：「-1」按钮"),
    ("we", "customWrapProps", "模板属性包：自定义录票区 .custom-wrap"),
    ("$e", "customInputProps", "模板属性包：自定义票数输入框"),
    ("Se", "applyButtonProps", "模板属性包：「应用」按钮"),
    ("Ne", "logSectionProps", "模板属性包：日志区 .log-section"),
    ("xe", "logHeadProps", "模板属性包：.log-head"),
    ("Te", "refreshButtonProps", "模板属性包：日志「刷新」按钮"),
    ("Ve", "logEmptyProps", "模板属性包：日志空状态 .log-empty"),
    ("Me", "logListProps", "模板属性包：.log-list"),
    ("Le", "logTimeProps", "模板属性包：.log-time"),
    ("Ue", "logCandProps", "模板属性包：.log-cand"),
    ("Be", "TallyControlPageComponent", "页面组件定义（defineComponent 产物）"),
    ("Re", "TallyControlPageDefaultExport", "默认导出（withScopeId 产物）"),
]

SCREEN_PAGE = [
    ("zz0", "syncFullscreenState", "同步全屏状态标志（fullscreenchange 事件回调）"),
    ("zz1", "toggleFullscreen", "切换浏览器全屏"),
    ("zz2", "niceCeiling", "把纵轴上限取整到「好看」的刻度（5/10/25/50/100/250/500/1000/2500 档位）"),
    ("zz3", "candidate", "watch 回调中的候选人遍历变量"),
    ("zz4", "popupsFor", "取某候选人当前展示中的浮动票数气泡"),
    ("zz5", "formatDelta", "票数增量格式化：正数带 + 号"),
    ("zz6", "barHeightPercent", "按图表上限计算柱子高度百分比"),
    ("refVal", "activityId", "当前活动 ID（来自路由参数）"),
    ("refVal2", "isFullscreen", "是否处于全屏状态"),
    ("refVal3", "popups", "浮动票数气泡列表（1.4s 后自动移除）"),
    ("refVal4", "lastVoteCounts", "上一次快照中各候选人的票数（用于计算增量）"),
    ("val2", "route", "Vue Router 当前路由（取 params.id）"),
    ("val3", "snapshot", "WS 推送的活动全量快照"),
    ("val4", "connected", "WebSocket 连接状态"),
    ("val5", "sortedCandidates", "按 displayOrder 升序排好的候选人列表"),
    ("val6", "chartMax", "纵轴上限（最大票数 ×1.2 后取整档位）"),
    ("val7", "yTicks", "纵轴刻度（6 等分）"),
    ("val", "props", "组件 props（未使用）"),
    ("ScreenPageConfig", "screenRootProps", "模板属性包：.screen-root"),
    ("ScreenPageConfig_2", "screenHeaderProps", "模板属性包：.screen-header"),
    ("ScreenPageConfig_3", "screenTitleProps", "模板属性包：.title"),
    ("ScreenPageConfig_4", "chartWrapperProps", "模板属性包：.chart-wrapper"),
    ("ScreenPageConfig_5", "emptyStateProps", "模板属性包：无候选人空状态 .empty"),
    ("ScreenPageConfig_6", "chartProps", "模板属性包：.chart"),
    ("ScreenPageConfig_7", "yTicksProps", "模板属性包：.y-ticks"),
    ("ScreenPageConfig_8", "yLabelProps", "模板属性包：.y-label"),
    ("ScreenPageConfig_9", "barsAreaProps", "模板属性包：.bars-area"),
    ("ScreenPageConfig_10", "xLabelsProps", "模板属性包：.x-labels"),
    ("ScreenPageConfig_11", "candNameProps", "模板属性包：.cand-name"),
    ("local_zba0", "loadingStateProps", "模板属性包：加载中 .loading"),
    ("local_zba1", "bodyScreenModeClass", "body 类名：tally-screen-mode（大屏模式全局样式开关）"),
    ("ee", "fullscreenButtonProps", "模板属性包：全屏按钮（title）"),
    ("te", "expandIconProps", "模板属性包：进入全屏图标 svg 属性"),
    ("se", "collapseIconProps", "模板属性包：退出全屏图标 svg 属性"),
    ("ne", "connTextProps", "模板属性包：.conn-text"),
    ("le", "ScreenPageComponent", "页面组件定义（defineComponent 产物）"),
    ("re", "ScreenPageDefaultExport", "默认导出（withScopeId 产物）"),
]

FILES = {
    "useTallySocket-Bnuwbx53.js": USE_TALLY_SOCKET,
    "TallyActivitiesPage-Ck1JhJya.js": TALLY_ACTIVITIES_PAGE,
    "TallyActivityEditPage-DFD129SB.js": TALLY_ACTIVITY_EDIT_PAGE,
    "TallyControlPage-CBBTMqC8.js": TALLY_CONTROL_PAGE,
    "ScreenPage-D-8ErF3w.js": SCREEN_PAGE,
}

BOUNDARY = r"(?<![A-Za-z0-9_$]){}(?![A-Za-z0-9_$])"


def rename(text: str, mapping):
    for old, new, _comment in mapping:
        pattern = re.compile(BOUNDARY.format(re.escape(old)))
        text, n = pattern.subn(new, text)
        if n == 0:
            raise SystemExit(f"重命名未命中：{old!r} -> {new!r}（该标识符在文件中不存在？）")
    return text


def inject_comments(text: str, mapping):
    """在 `function 新名(` 声明上方插入 JSDoc 注释（保持原有缩进）。"""
    for _old, new, comment in mapping:
        pattern = re.compile(r"^(?P<indent>[ \t]*)(?:async[ \t]+)?function " + re.escape(new) + r"\(", re.M)
        match = pattern.search(text)
        if not match:
            continue  # 非函数绑定（变量/常量）不插注释
        # 若声明上方已是注释块结尾（同一绑定被多张表覆盖），跳过避免重复
        prefix = text[: match.start()].rstrip()
        if prefix.endswith("*/"):
            continue
        indent = match.group("indent")
        lines = []
        for raw in comment.split("\n"):
            line = raw.strip()
            if line.startswith("* "):
                line = line[2:].strip()
            elif line == "*":
                line = ""
            lines.append(f"{indent} * {line}" if line else f"{indent} *")
        doc = "\n".join(lines)
        block = f"{indent}/**\n{indent} * {new}\n{doc}\n{indent} */\n"
        text = text[: match.start()] + block + text[match.start() :]
    return text


def strip_export_clauses(text: str) -> str:
    """去掉 export { ... } 导出子句与对象属性键（`name:`），用于「新名是否已存在」的安全断言
    （导出别名如 export { zz0 as createTallySocket }、属性键如 { snapshot: refVal } 不算冲突）。"""
    text = re.sub(r"export\s*\{[^}]*\};?", "", text)
    text = re.sub(r"(?<![A-Za-z0-9_$])\w+\s*:(?!:)", "", text)
    return text


def collapse_self_aliased_exports(text: str) -> str:
    """export { X as X } → export { X }；{ X: X } / { X: X, Y: Y } 简写（含换行）"""
    text = re.sub(r"export\s*\{\s*(\w+)\s+as\s+\1\s*\};", r"export { \1 };", text)
    text = re.sub(
        r"\{\s*(\w+)\s*:\s*\1\s*,\s*(\w+)\s*:\s*\2\s*\}",
        r"{ \1, \2 }",
        text,
        flags=re.S,
    )
    text = re.sub(r"\{\s*(\w+)\s*:\s*\1\s*\}", r"{ \1 }", text)
    return text


def main():
    PRISTINE.mkdir(exist_ok=True)
    for name, mapping in FILES.items():
        src = PRISTINE / name
        if not src.exists():  # 首次运行：备份未治理原件
            shutil.copy2(ASSETS / name, src)
        text = src.read_text(encoding="utf-8")
        code_only = strip_export_clauses(text)
        for old, new, _comment in mapping:
            hits = [m.start() for m in re.finditer(BOUNDARY.format(re.escape(new)), code_only)]
            if hits:
                # 新名在字符串字面量（如 CSS 类名 "loading-container"）中出现无害；
                # 仅当作为独立标识符出现时才可能冲突——打印上下文人工复核。
                print(f"  [warn] {name}: 新名 {new} 在源文件中已出现 {len(hits)} 处：")
                for pos in hits[:3]:
                    line = text.count("\n", 0, pos) + 1
                    print(f"          line {line}: ...{text[max(0,pos-40):pos+40].strip()}...")
        text = rename(text, mapping)
        # 校验：旧名必须全部消失
        for old, _new, _c in mapping:
            leftover = re.findall(BOUNDARY.format(re.escape(old)), text)
            assert not leftover, f"{name}: 旧名 {old} 仍有 {len(leftover)} 处残留"
        text = collapse_self_aliased_exports(text)
        # 安全校验：导入别名不得与本地函数/常量声明重名（否则本地声明遮蔽导入 → 递归/未定义）
        imported = set(re.findall(r"import\s*\{([^}]*)\}\s*from", text))
        aliases = set()
        for clause in imported:
            for part in clause.split(","):
                part = part.strip()
                if not part:
                    continue
                aliases.add(part.split(" as ")[-1].strip())
        declared = set(re.findall(r"(?:function|const|let|var)\s+(\w+)", text))
        clash = aliases & declared
        assert not clash, f"{name}: 导入别名与本地声明重名 {clash}（会遮蔽导入）"
        text = inject_comments(text, mapping)
        (ASSETS / name).write_text(text, encoding="utf-8")
        print(f"governed {name}: {len(mapping)} renames + comments")


if __name__ == "__main__":
    main()
