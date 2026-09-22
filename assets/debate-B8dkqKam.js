/*!
 * 模块：debate（debate-B8dkqKam.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/debate-B8dkqKam.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { axiosLib, http } from "./index-DJrtCu9i.js";
const local_zb19 = "https://api.xmyzstudent.com/api/v2",
  local_zb13 = axiosLib.create({
    baseURL: local_zb19,
    timeout: 15e3,
    withCredentials: !0,
    headers: {
      "Content-Type": "application/json"
    }
  });
function zz0() {
  return local_zb13.get("/debate/active");
}
function zz1(val) {
  return local_zb13.get(`/debate/round/${val}`);
}
function zz2() {
  return local_zb13.get("/debate/me");
}
function zz3(val) {
  return local_zb13.post("/debate/vote", val);
}
function zz4(val) {
  return local_zb13.get(`/debate/results/${val}`);
}
function zz5(zz6 = "/vote") {
  return `${local_zb19}/debate/wechat/login?return=${encodeURIComponent(zz6)}`;
}
function zz7() {
  return http.get("/admin/debate/rounds");
}
function zz8(val) {
  return http.post("/admin/debate/rounds", val);
}
function zz9(val, val2) {
  return http.put(`/admin/debate/rounds/${val}`, val2);
}
function zz10(val) {
  return http.delete(`/admin/debate/rounds/${val}`);
}
function zz11(val) {
  return http.put(`/admin/debate/rounds/${val}/active`);
}
function zz12(val) {
  return http.put(`/admin/debate/rounds/${val}/lock`);
}
function zz13(val) {
  return http.put(`/admin/debate/rounds/${val}/reset`);
}
function zz14(val, val2) {
  const text = `?extendSeconds=${val2}`;
  return http.put(`/admin/debate/rounds/${val}/unlock${text}`);
}
function zz15(val) {
  return http.put(`/admin/debate/rounds/${val}/regenerate-password`);
}
const DebateHttpClient = axiosLib.create({
  baseURL: local_zb19,
  timeout: 15e3,
  headers: {
    "Content-Type": "application/json"
  }
});
function zz16(val, val2) {
  return DebateHttpClient.post("/debate/operator/verify", {
    roundId: val,
    password: val2
  });
}
function zz17(val, val2, val3) {
  return DebateHttpClient.put(`/debate/operator/rounds/${val}`, val3, {
    headers: {
      "X-Round-Password": val2
    }
  });
}
function zz18(val, val2) {
  return DebateHttpClient.put(`/debate/operator/rounds/${val}/reset`, null, {
    headers: {
      "X-Round-Password": val2
    }
  });
}
function zz19(val, val2) {
  return DebateHttpClient.put(`/debate/operator/rounds/${val}/lock`, null, {
    headers: {
      "X-Round-Password": val2
    }
  });
}
function zz20(val, val2) {
  return DebateHttpClient.put(`/debate/operator/rounds/${val}/active`, null, {
    headers: {
      "X-Round-Password": val2
    }
  });
}
function zz21(val) {
  return `wss://api.xmyzstudent.com/ws/debate/round/${val}`;
}
/* index 运行时导出（已语义化） */
export { zz1 as getDebateRound, zz5 as getAdminDebateRounds_2, zz0 as getDebateActive, zz4 as getDebateResults, zz18 as putDebateOperatorRoundsReset, zz19 as putDebateOperatorRoundsLock, zz2 as getDebateMe, zz20 as putDebateOperatorRoundsActive, zz17 as putDebateOperatorRounds, zz21 as debateRoundWsUrl, zz7 as getAdminDebateRounds, zz9 as updateAdminDebateRounds, zz8 as createAdminDebateRounds, zz11 as updateAdminDebateRoundsActive, zz16 as helper_zb13, zz12 as lockAdminDebateRounds, zz15 as regeneratePasswordAdminDebateRounds, zz13 as resetAdminDebateRounds, zz3 as helper_zb17, zz14 as unlockAdminDebateRounds, zz10 as deleteAdminDebateRounds };