import { ref, watch, directiveBum } from "./runtime-stub.mjs";
import { tallyActivityWsUrl } from "./api-stub.mjs";

/** 与镜像 useTallySocket-Bnuwbx53.js 行为一致的桩（用于渲染比对，不跑真网络） */
export function createTallySocket(activityIdRef) {
  const snapshot = ref(null);
  const connected = ref(false);
  const unsubscribe = watch(
    activityIdRef,
    (nextId) => {
      if (nextId) {
        // 首帧：模拟服务端"连上即推全量快照"
        snapshot.value = globalThis.__tallySnapshot || null;
        connected.value = true;
      }
    },
    { immediate: true }
  );
  directiveBum(() => {});
  return { snapshot, connected };
}