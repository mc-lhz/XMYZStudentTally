/**
 * 渲染等价性校验用的 Vue 运行时桩。
 * 只实现"够跑通一次 render 函数并记录 vnode 树"所需的最小语义。
 */
export const Fragment = { __type: "Fragment" };

export function openBlock() {
  return { __type: "block-open" };
}
export function createBlock(type, props, children, patchFlag, dynamicProps) {
  return { kind: "createBlock", type, props, children, patchFlag, dynamicProps };
}
export function createElementBlock(type, props, children, patchFlag, dynamicProps) {
  return { kind: "createElementBlock", type, props, children, patchFlag, dynamicProps };
}
export function createElementVNode(type, props, children, patchFlag, dynamicProps) {
  return { kind: "createElementVNode", type, props, children, patchFlag, dynamicProps };
}
export function createVNode(type, props, children, patchFlag, dynamicProps) {
  return { kind: "createVNode", type, props, children, patchFlag, dynamicProps };
}
export function createTextVNode(text, flag) {
  return { kind: "text", text, flag };
}
export function createCommentVNode(text, asBlock) {
  return { kind: "comment", text, asBlock };
}
export function createVNodeWrapper(html, n) {
  return { kind: "raw-html", html };
}
export function renderList(list, fn) {
  return { kind: "renderList", items: (list || []).map(fn) };
}
export function toDisplayString(value) {
  if (value == null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
export function normalizeClass(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((v) => (v && typeof v === "object" ? (v.__cls || "") : v))
      .filter(Boolean)
      .join(" ");
  }
  return value == null ? "" : String(value);
}
export function withModifiers(fn, mods) {
  return { kind: "withModifiers", mods };
}
export function withKeys(fn, keys) {
  return { kind: "withKeys", keys };
}
export function withDirectives(vnode, dirs) {
  return { kind: "withDirectives", vnode, dirCount: (dirs[0] || []).length };
}
export const vModelText = { __type: "vModelText" };
export function toDisplayValue(fn) {
  return fn();
}
export function resolveAsset(name) {
  return "resolved:" + name;
}
export function resolveRaw(obj) {
  return { __raw: obj };
}
export function unref(value) {
  return value && typeof value === "object" && "value" in value ? value.value : value;
}
export function ref(value) {
  return { value };
}
export function applyDirectives(fn) {
  return { get value() { return fn(); } };
}
export function resolveList(name) {
  return [];
}
export function inject() {
  return {
    params: { id: "1" },
    name: "admin-tally",
    meta: { title: "实时唱票管理", requiresAuth: true, level: 2 },
  };
}
export function useToast() {
  const noop = () => {};
  return { error: noop, success: noop, warning: noop, info: noop };
}
export function useRouter() {
  return { push: () => {}, back: () => {} };
}
export function watch(source, cb, options) {
  if (options && options.immediate) cb(source && source.value);
  return () => {};
}
export function onMounted(fn) {
  globalThis.__mounted = (globalThis.__mounted || []).concat(fn);
}
export function directiveBum(fn) {
  globalThis.__beforeUnmount = (globalThis.__beforeUnmount || []).concat(fn);
}
export function directiveUm(fn) {
  globalThis.__unmounted = (globalThis.__unmounted || []).concat(fn);
}
export function defineComponent(options) {
  return options;
}
export function withScopeId(component, id) {
  return component;
}
export function withScope(slots, name) {
  return slots && slots[name] ? slots[name]() : null;
}
export function nextTick() {
  return Promise.resolve();
}

/** axios 实例桩：不会真的发请求 */
export const http = {
  get: (url) => Promise.resolve({ data: { code: 200, data: [], message: "success" } }),
  post: (url, body) => Promise.resolve({ data: { code: 200, data: {}, message: "success" } }),
  put: (url, body) => Promise.resolve({ data: { code: 200, data: {}, message: "success" } }),
  delete: (url) => Promise.resolve({ data: { code: 200, data: null, message: "success" } }),
};