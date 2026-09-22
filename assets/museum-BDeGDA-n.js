/*!
 * 模块：museum-BDeGDA-n（museum-BDeGDA-n.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/museum-BDeGDA-n.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
async function zz0(val) {
  return (await http.get("/admin/museum/tags", {
    params: val
  })).data.data;
}
async function zz1(val) {
  return (await http.post("/admin/museum/tags", val)).data.data;
}
async function zz2(val, val2) {
  return (await http.put(`/admin/museum/tags/${val}`, val2)).data.data;
}
async function zz3(val) {
  await http.delete(`/admin/museum/tags/${val}`);
}
async function zz4(val) {
  return (await http.post(`/admin/museum/tags/${val}/toggle-status`)).data.data;
}
async function zz5(val) {
  return (await http.get("/admin/museum/events", {
    params: val
  })).data.data;
}
async function zz6(val) {
  return (await http.get(`/admin/museum/events/${val}`)).data.data;
}
async function zz7(val) {
  return (await http.post("/admin/museum/events", val)).data.data;
}
async function zz8(val, val2) {
  return (await http.put(`/admin/museum/events/${val}`, val2)).data.data;
}
async function zz9(val) {
  await http.delete(`/admin/museum/events/${val}`);
}
async function zz10(val) {
  await http.post(`/admin/museum/events/${val}/publish`);
}
async function zz11(val) {
  await http.post(`/admin/museum/events/${val}/unpublish`);
}
async function zz12(val) {
  await http.post(`/admin/museum/events/${val}/feature`);
}
async function zz13(val) {
  await http.post(`/admin/museum/events/${val}/unfeature`);
}
async function zz14(val) {
  await http.post("/admin/museum/events/batch", val);
}
async function zz15(val) {
  return (await http.get(`/admin/museum/events/${val}/blocks`)).data.data;
}
async function zz16(val, val2) {
  return (await http.post(`/admin/museum/events/${val}/blocks`, val2)).data.data;
}
async function zz17(val, val2, val3) {
  return (await http.put(`/admin/museum/events/${val}/blocks/${val2}`, val3)).data.data;
}
async function zz18(val, val2) {
  await http.delete(`/admin/museum/events/${val}/blocks/${val2}`);
}
async function zz19(val, val2) {
  await http.post(`/admin/museum/events/${val}/blocks/sort`, {
    ids: val2
  });
}
async function zz20(val) {
  return (await http.get("/admin/museum/moments", {
    params: val
  })).data.data;
}
async function zz21(val) {
  await http.post(`/admin/museum/moments/${val}/approve`);
}
async function zz22(val, val2) {
  await http.post(`/admin/museum/moments/${val}/reject`, val2);
}
async function zz23(val, val2) {
  await http.post(`/admin/museum/moments/${val}/takedown`, val2);
}
async function zz24(val) {
  await http.delete(`/admin/museum/moments/${val}`);
}
async function zz25(val) {
  await http.post("/admin/museum/moments/batch", val);
}
/* index 运行时导出（已语义化） */
export { zz20 as getAdminMuseumMoments, zz21 as approveAdminMuseumMoments, zz22 as rejectAdminMuseumMoments, zz23 as takedownAdminMuseumMoments, zz24 as deleteAdminMuseumMoments, zz25 as batchAdminMuseumMoments, zz0 as getAdminMuseumTags, zz2 as updateAdminMuseumTags, zz1 as createAdminMuseumTags, zz3 as deleteAdminMuseumTags, zz4 as toggleStatusAdminMuseumTags, zz5 as getAdminMuseumEvents, zz9 as deleteAdminMuseumEvents, zz14 as batchAdminMuseumEvents, zz10 as publishAdminMuseumEvents, zz11 as unpublishAdminMuseumEvents, zz13 as unfeatureAdminMuseumEvents, zz12 as featureAdminMuseumEvents, zz6 as getAdminMuseumEventsById, zz8 as updateAdminMuseumEvents, zz7 as createAdminMuseumEvents, zz15 as getAdminMuseumEventsBlocks, zz17 as updateAdminMuseumEventsBlocks, zz16 as createAdminMuseumEventsBlocks, zz18 as deleteAdminMuseumEventsBlocks, zz19 as sortAdminMuseumEventsBlocks };