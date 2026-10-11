/*!
 * 模块：file（file-CSaAaIBf.js）
 * 角色：站点内的功能模块，参与前端业务组装。
 * 来源：assets/file-CSaAaIBf.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0(val, val2, val3) {
  const formdata = new FormData();
  return formdata.append("file", val), val2 && formdata.append("business_type", val2), http.post("/files/upload", formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
/* index 运行时导出（已语义化） */
export { zz0 as uploadFiles };