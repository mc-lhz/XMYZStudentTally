/*!
 * 模块：dorm（dorm-BlpLVPfV.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/dorm-BlpLVPfV.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0() {
  return http.get("/campuses");
}
function zz1(val) {
  return http.get(`/campuses/${val}/buildings`);
}
function zz2(val) {
  return http.get("/buildings", {
    params: void 0
  });
}
function zz3(val) {
  return http.get(`/buildings/${val}/time-periods`);
}
function zz4() {
  return http.get("/time-periods");
}
function zz5(val) {
  return http.post("/admin/campuses", val);
}
function zz6(val, val2) {
  return http.put(`/admin/campuses/${val}`, val2);
}
function zz7(val) {
  return http.delete(`/admin/campuses/${val}`);
}
function zz8(val) {
  return http.post("/admin/buildings", val);
}
function zz9(val, val2) {
  return http.put(`/admin/buildings/${val}`, val2);
}
function zz10(val) {
  return http.delete(`/admin/buildings/${val}`);
}
function zz11(val) {
  return http.post("/admin/buildings/time-periods", val);
}
function zz12(val) {
  return http.delete("/admin/buildings/time-periods", {
    data: val
  });
}
function zz13(val) {
  return http.post("/admin/time-periods", val);
}
function zz14(val, val2) {
  return http.put(`/admin/time-periods/${val}`, val2);
}
function zz15(val) {
  return http.delete(`/admin/time-periods/${val}`);
}
/* index 运行时导出（已语义化） */
export { zz2 as getBuildings, zz4 as getResourceTimePeriods, zz5 as createAdminCampuses, zz7 as deleteAdminCampuses, zz8 as createAdminBuildings, zz9 as updateAdminBuildings, zz0 as getCampuses, zz10 as deleteAdminBuildings, zz3 as getBuildingsTimePeriods, zz11 as createAdminBuildingsTimePeriods, zz13 as createAdminResourceTimePeriods, zz14 as updateAdminResourceTimePeriods, zz15 as deleteAdminResourceTimePeriods, zz1 as getCampusesBuildingsById, zz12 as deleteAdminBuildingsTimePeriods, zz6 as updateAdminCampuses };