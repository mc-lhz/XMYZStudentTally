/*!
 * 票务后端接口封装模块（ticket-SMxxVFG1.js）
 * 角色：基于 axios 的票务 API 集合——活动查询/抢票/核销/验票/管理审核等 21 个接口
 * 使用：页面组件 import 对应语义函数（如 verifyTicket / useTicket / grabTicket）后调用
 * 来源：assets/ticket-SMxxVFG1.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0(zz1 = 1, zz2 = 10, val3) {
  return http.get("/ticket-activities", {
    params: {
      page: zz1,
      pageSize: zz2,
      status: val3
    }
  });
}
function zz3(val) {
  return http.get(`/ticket-activities/${val}`);
}
function zz4(val) {
  return http.post("/tickets/grab", val);
}
function zz5() {
  return http.get("/tickets/my");
}
function zz6(val) {
  return http.get(`/tickets/my/activity/${val}`);
}
function zz7(zz8 = 1, zz9 = 10, val3) {
  return http.get("/admin/ticket/activities", {
    params: {
      page: zz8,
      pageSize: zz9,
      status: val3
    }
  });
}
function zz10(val) {
  return http.get(`/admin/ticket/activities/${val}`);
}
function zz11(val) {
  return http.post("/admin/ticket/activities", val);
}
/* 格式化函数（日期/时间） */
function zz12(val, val2) {
  return http.put(`/admin/ticket/activities/${val}`, val2);
}
function zz13(val) {
  return http.delete(`/admin/ticket/activities/${val}`);
}
function zz14(val, val2) {
  return http.post(`/admin/ticket/activities/${val}/status`, {
    status: val2
  });
}
function zz15(val) {
  return http.get(`/admin/ticket/activities/${val}/stats`);
}
function zz16(val, val2) {
  return http.post(`/admin/ticket/activities/${val}/sessions`, val2);
}
/* 格式化函数（日期/时间） */
function zz17(val, val2) {
  return http.put(`/admin/ticket/sessions/${val}`, val2);
}
function zz18(val) {
  return http.delete(`/admin/ticket/sessions/${val}`);
}
function zz19(val, zz20 = 1, zz21 = 10, val4, val5) {
  return http.get(`/admin/ticket/activities/${val}/review`, {
    params: {
      page: zz20,
      pageSize: zz21,
      status: val4,
      sessionId: val5
    }
  });
}
function zz22(val, val2) {
  return http.post(`/admin/ticket/tickets/${val}/review`, val2);
}
function zz23(val) {
  return http.post("/admin/ticket/tickets/batch-review", val);
}
function zz24(val) {
  return http.get("/admin/ticket/verify", {
    params: {
      code: val
    }
  });
}
function zz25(val) {
  return http.post("/admin/ticket/verify/use", {
    ticketCode: val
  });
}
const ticketConst0 = "https://api.xmyzstudent.com/api/v2";
async function zz26(val, val2, val3) {
  try {
    const item = localStorage.getItem("token"),
      obj = {};
    item && (obj.Authorization = `Bearer ${item}`);
    const urlsearchparams = new URLSearchParams();
    val2 && val2 !== "all" && urlsearchparams.append("status", val2), val3 && urlsearchparams.append("sessionId", val3.toString());
    const val4 = urlsearchparams.toString(),
      text = `${ticketConst0}/admin/ticket/activities/${val}/export${val4 ? `?${val4}` : ""}`,
      val5 = await fetch(text, {
        method: "GET",
        headers: obj
      });
    if (!val5.ok) throw new Error("导出失败");
    const val6 = val5.headers.get("Content-Disposition");
    let text2 = `tickets-${val}.xlsx`;
    if (val6) {
      const val10 = val6.match(/filename\*?=['"]?(?:UTF-8'')?([^;\r\n"']*)['"]?/i);
      val10 && val10[1] && (text2 = decodeURIComponent(val10[1]));
    }
    const val7 = await val5.blob(),
      objectURL = window.URL.createObjectURL(val7),
      element = document.createElement("a");
    return element.href = objectURL, element.download = text2, document.body.appendChild(element), element.click(), document.body.removeChild(element), window.URL.revokeObjectURL(objectURL), {
      success: !0,
      filename: text2
    };
  } catch (val1) {
    return {
      success: !1,
      error: val1 instanceof Error ? val1.message : "导出失败"
    };
  }
}
/* index 运行时导出（已语义化） */
export { zz5 as getTicketsMy, zz3 as getTicketActivitiesById, zz6 as getTicketsMyActivityById, zz4 as grabTickets, zz7 as getAdminTicketActivities, zz13 as deleteAdminTicketActivities, zz0 as getTicketActivities, zz10 as getAdminTicketActivitiesById, zz15 as getAdminTicketActivitiesStats, zz11 as createAdminTicketActivities, zz14 as createAdminTicketActivitiesStatus, zz17 as updateAdminTicketSessions, zz16 as createAdminTicketActivitiesSessions, zz18 as deleteAdminTicketSessions, zz26 as exportAdminTicketActivity, zz25 as useAdminTicketVerify, zz19 as reviewAdminTicketActivities, zz22 as reviewAdminTicketTickets, zz23 as batchReviewAdminTicketTickets, zz12 as updateAdminTicketActivities, zz24 as verifyAdminTicket };