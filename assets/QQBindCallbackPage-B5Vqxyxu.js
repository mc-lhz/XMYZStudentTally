/*!
 * 页面模块：QQ 绑定（QQBindCallbackPage）
 * 路由：/user/bindqq/callback   name=user-bindqq-callback   层级=2   需登录=是
 * 功能：登录后的「QQ 绑定」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/QQBindCallbackPage-B5Vqxyxu.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, onMounted, useToast, useRouter, bindUserQq, createElementBlock, createElementVNode, openBlock, withScopeId } from "./index-DJrtCu9i.js";
const QQBindCallbackPageConfig = {
    class: "qq-bind-callback"
  },
  QQBindCallbackPageConst1 = defineComponent({
    __name: "QQBindCallbackPage",
    setup(val) {
      const useRouter1 = useRouter(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast();
      return onMounted(async () => {
        if (!useUserStore1.isLoggedIn) {
          useToast1.error("请先登录"), useRouter1.push("/");
          return;
        }
        const urlsearchparams = new URLSearchParams(window.location.search),
          val1 = urlsearchparams.get("code"),
          val2 = urlsearchparams.get("state"),
          val3 = urlsearchparams.get("error");
        if (val3) {
          useToast1.error("QQ授权失败: " + decodeURIComponent(val3)), useRouter1.push("/profile");
          return;
        }
        if (!val1 || !val2) {
          useToast1.error("授权参数缺失"), useRouter1.push("/profile");
          return;
        }
        try {
          const val4 = await bindUserQq({
            code: val1,
            state: val2
          });
          val4.data.code === 200 ? (useToast1.success("QQ 绑定成功"), useRouter1.push("/profile")) : (useToast1.error(val4.data.message || "绑定失败"), useRouter1.push("/profile"));
        } catch (val4) {
          console.error("QQ绑定失败", val4), useToast1.error("网络错误，请稍后重试"), useRouter1.push("/profile");
        }
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val2) => (openBlock(), createElementBlock("div", QQBindCallbackPageConfig, [...(val2[0] || (val2[0] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "正在处理 QQ 绑定...", -1)]))]));
    }
  }),
  QQBindCallbackPageConst2 = withScopeId(QQBindCallbackPageConst1, [["__scopeId", "data-v-52dd340f"]]);
/* index 运行时导出（已语义化） */
export { QQBindCallbackPageConst2 as default };