/*!
 * 模块：usePageScrollLock（usePageScrollLock-C1lt3cX0.js）
 * 角色：站点内的页面模块，参与前端业务组装。
 * 来源：assets/usePageScrollLock-C1lt3cX0.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { onMounted, directiveUm } from "./index-DJrtCu9i.js";
let usePageScrollLockConst0 = 0;
function zz0() {
  const val = usePageScrollLockConst0 > 0 ? "hidden" : "";
  document.documentElement.style.overflow = val, document.body.style.overflow = val;
}
/* 组件挂载后生命周期钩子 */
function zz1() {
  onMounted(() => {
    usePageScrollLockConst0++, zz0();
  }), directiveUm(() => {
    usePageScrollLockConst0 = Math.max(0, usePageScrollLockConst0 - 1), zz0();
  });
}
/* index 运行时导出（已语义化） */
export { zz1 as usePageScrollLock };