/*!
 * 通用组件：rating
 * 角色：评分控件组件（星级/评分），被多个页面复用（通过 X as P 导出）。
 * 来源：assets/rating-DOU6YvDA.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */

function zz0(val) {
  if ("ancestors" in val && "current" in val) {
    const val1 = val.ancestors;
    return val1.length > 0 ? val1[val1.length - 1].name : val.current.name;
  }
  return val.minorSection.name;
}
function zz1(val) {
  switch (val) {
    case 1:
      return {
        label: "启用",
        class: "status-enabled"
      };
    case 0:
      return {
        label: "禁用",
        class: "status-disabled"
      };
    case 2:
      return {
        label: "待审核",
        class: "status-pending"
      };
    case 3:
      return {
        label: "审核拒绝",
        class: "status-rejected"
      };
    default:
      return {
        label: "未知",
        class: "status-unknown"
      };
  }
}
function zz2(val) {
  return "ancestors" in val && "current" in val;
}
function zz3(val) {
  if (zz2(val)) {
    const list = [val.school.name];
    return val.ancestors.forEach(val1 => list.push(val1.name)), list.push(val.current.name), list.join(" / ");
  }
  return `${val.school.name} / ${val.majorSection.name} / ${val.minorSection.name}`;
}
function zz4(val) {
  if (zz2(val)) {
    const val1 = val.ancestors.map(val2 => val2.name);
    return val1.push(val.current.name), {
      school: val.school.name,
      parts: val1
    };
  }
  return {
    school: val.school.name,
    parts: [val.majorSection.name, val.minorSection.name]
  };
}
function zz5(val) {
  if (zz2(val)) {
    const list = [];
    return val.ancestors.forEach(val1 => {
      list.push({
        id: val1.id,
        name: val1.name,
        path: `/admin/rating/categories/${val1.id}`,
        isCurrent: !1
      });
    }), list.push({
      id: val.current.id,
      name: val.current.name,
      path: `/admin/rating/categories/${val.current.id}`,
      isCurrent: !0
    }), {
      school: {
        id: val.school.id,
        name: val.school.name,
        path: `/admin/rating/categories?schoolId=${val.school.id}`
      },
      categories: list
    };
  }
  return {
    school: {
      id: val.school.id,
      name: val.school.name,
      path: `/admin/rating/schools/${val.school.id}`
    },
    categories: [{
      id: val.majorSection.id,
      name: val.majorSection.name,
      path: `/admin/rating/major-sections/${val.majorSection.id}`,
      isCurrent: !1
    }, {
      id: val.minorSection.id,
      name: val.minorSection.name,
      path: `/admin/rating/minor-sections/${val.minorSection.id}`,
      isCurrent: !0
    }]
  };
}
function zz6(val) {
  switch (val) {
    case 0:
      return {
        label: "待审核",
        class: "status-pending"
      };
    case 1:
      return {
        label: "已通过",
        class: "status-approved"
      };
    case 2:
      return {
        label: "已拒绝",
        class: "status-rejected"
      };
    default:
      return {
        label: "未知",
        class: "status-unknown"
      };
  }
}
function zz7(val) {
  switch (val) {
    case 1:
      return {
        label: "修改现有",
        class: "type-modify"
      };
    case 2:
      return {
        label: "新增内容",
        class: "type-create"
      };
    default:
      return {
        label: "未知",
        class: "type-unknown"
      };
  }
}
function zz8(val) {
  switch (val) {
    case 1:
      return {
        label: "分类",
        class: "target-category"
      };
    case 2:
      return {
        label: "评分项目",
        class: "target-item"
      };
    case 3:
      return {
        label: "合集",
        class: "target-collection"
      };
    default:
      return {
        label: "未知",
        class: "target-unknown"
      };
  }
}
/* index 运行时导出（已语义化） */
export { zz1 as statusLabel_zb47, zz5 as statusLabel_zb48, zz4 as statusLabel_zb49, zz3 as getRatingPathName, zz7 as ratingTypeLabel, zz8 as ratingTargetLabel, zz0 as getRatingSectionName, zz6 as ratingStatusLabel };