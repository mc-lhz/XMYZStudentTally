/*!
 * 页面模块：QQ 登录（QQCallbackPage-DWqt-H_w）
 * 路由：/auth/qq/callback   name=qq-callback   层级=2   需登录=否
 * 功能：公开的「QQ 登录」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/QQCallbackPage-DWqt-H_w.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, onMounted, useRouter, useToast, createElementBlock, createElementVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 模板属性配置：qq-callback */
const local_zb98 = {
    class: "qq-callback"
  },
  local_zb99 = defineComponent({
    __name: "QQCallbackPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast();
      return onMounted(async () => {
        const urlsearchparams = new URLSearchParams(window.location.search),
          val1 = urlsearchparams.get("code"),
          val2 = urlsearchparams.get("state"),
          val3 = urlsearchparams.get("error");
        if (val3) {
          alert("QQ授权失败: " + decodeURIComponent(val3)), useRouter1.push("/");
          return;
        }
        if (!val1 || !val2) {
          alert("授权参数缺失"), useRouter1.push("/");
          return;
        }
        try {
          const val4 = await useUserStore1.qqLogin(val1, val2);
          if (val4.code === 200) {
            "isNewUser" in val4.data && val4.data.isNewUser ? useToast1.success("欢迎！建议您前往设置页修改用户名") : useToast1.success("登录成功");
            const val5 = useUserStore1.consumeRedirectRoute();
            useRouter1.push(val5 || "/");
          } else if (val4.code === 40007 && "needBinding" in val4.data) {
            const val5 = val4.data;
            useRouter1.push({
              path: "/auth/qq/bindOrRegister",
              query: {
                openid: val5.openid,
                unionid: val5.unionid || "",
                nickname: val5.nickname || "",
                avatar: val5.avatar || ""
              }
            });
          } else alert(val4.message || "登录失败"), useRouter1.push("/");
        } catch (val4) {
          console.error("QQ登录失败", val4), alert("网络错误"), useRouter1.push("/");
        }
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", local_zb98, [...(val2[0] || (val2[0] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "正在处理 QQ 登录...", -1)]))]));
    }
  }),
  QQCallbackPageConst0 = withScopeId(local_zb99, [["__scopeId", "data-v-389457af"]]);
/* index 运行时导出（已语义化） */
export { QQCallbackPageConst0 as default };