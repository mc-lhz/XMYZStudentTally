/*!
 * 模块：grade（grade-BOUREyqU.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/grade-BOUREyqU.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0() {
  return http.get("/grade/status");
}
function zz1(val) {
  return http.post("/grade/bind", val);
}
function zz2() {
  return http.delete("/grade/unbind");
}
function zz3(zz4 = 1, zz5 = 10) {
  return http.get("/grade/exams", {
    params: {
      page: zz4,
      pageSize: zz5
    }
  });
}
function zz6(val) {
  return http.get(`/grade/exams/${val}`);
}
const gradeLabels = {
  3: "月考",
  5: "会考"
};
function zz7(val) {
  return gradeLabels[val] || "其他";
}
/* index 运行时导出（已语义化） */
export { zz3 as getGradeExams, zz7 as getGradeTypeName, zz1 as bindGrade, zz6 as getGradeExamsById, zz0 as getGradeStatus, zz2 as unbindGrade };