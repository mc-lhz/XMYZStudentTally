/*!
 * 模块：museum（museum-BRoy68F1.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/museum-BRoy68F1.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */

function zz0(val) {
  switch (val) {
    case 0:
      return {
        label: "草稿",
        class: "status-draft"
      };
    case 1:
      return {
        label: "已发布",
        class: "status-published"
      };
    case 2:
      return {
        label: "已下架",
        class: "status-unpublished"
      };
    default:
      return {
        label: "未知",
        class: "status-unknown"
      };
  }
}
function zz1(val) {
  return {
    text: "文字",
    gallery: "图片画廊",
    video: "视频",
    file: "文件附件",
    timeline: "时间线",
    link: "链接"
  }[val] || val;
}
function zz2(val) {
  switch (val) {
    case 0:
      return {
        label: "待审核",
        class: "status-pending"
      };
    case 1:
      return {
        label: "已发布",
        class: "status-published"
      };
    case 2:
      return {
        label: "已拒绝",
        class: "status-rejected"
      };
    case 3:
      return {
        label: "已下架",
        class: "status-takedown"
      };
    default:
      return {
        label: "未知",
        class: "status-unknown"
      };
  }
}
/* index 运行时导出（已语义化） */
export { zz0 as museumTypeLabel, zz1 as museumMediaTypeLabels, zz2 as museumStatusLabel };