/**
 * rename_shared.js —— 语义化 index 中 42 个 shared_X 跨模块运行时辅助名。
 * 复用 rename_api.js 的 Program 访问器写法（无条件写回，保证落盘）。
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const FINAL = path.join(__dirname, "final");
const INDEX = "index-DJrtCu9i.js";

const MAP = {
  shared_D: "http",
  shared_L: "getUserProfile",
  shared_N: "getUserAvatar",
  shared_R: "getPrivacySettings",
  shared_S: "updatePrivacySettings",
  shared_U: "getCaptcha",
  shared_V: "getUserHasPassword",
  shared_W: "sendSmsCode",
  shared_X: "updateUserPassword",
  shared_Y: "bindUserQq",
  shared_a1: "getAdminBanners",
  shared_a2: "updateAdminBanner",
  shared_a3: "createAdminBanner",
  shared_a4: "deleteAdminBanner",
  shared_a5: "toggleAdminBannerStatus",
  shared_Q: "buildFormData",
  shared_K: "Teleport",
  shared_J: "TransitionGroup",
  shared_w: "watch",
  shared_q: "inject",
  shared_H: "createBlock",
  shared_I: "resolveAsset",
  shared_M: "withKeys",
  shared_x: "withModifiers",
  shared_T: "withSlots",
  shared_m: "applyDirectives",
  shared_a7: "axiosLib",
  shared_a6: "directiveBum",
  shared_s: "directiveUm",
  shared_h: "createVNodeWrapper",
  shared_v: "toDisplayValue",
  shared_p: "resolveRaw",
  shared_$: "withScope",
  shared_A: "directiveHooks",
  shared_C: "modalShowDef",
  shared_E: "appProvider",
  shared_O: "deepWatchOptions",
  shared_P: "directiveCreated",
  shared_Z: "deepDirectiveOptions",
  shared_a0: "resolveList",
  shared_B: "cloneIfRaw",
};

const allFiles = fs.readdirSync(FINAL).filter((x) => x.endsWith(".js")).sort();

let fail = 0, imp = 0, exp = 0, local = 0;
allFiles.forEach((f) => {
  const code = fs.readFileSync(path.join(FINAL, f), "utf8");
  const isIndex = f === INDEX;
  let out;
  try {
    out = babel.transformSync(code, {
      sourceType: "module", compact: false, comments: true,
      plugins: [() => ({
        visitor: {
          Program: {
            exit(p) {
              const pending = [];
              p.node.body.forEach((node) => {
                if (node.type === "ImportDeclaration") {
                  node.specifiers.forEach((s) => {
                    if (s.type === "ImportSpecifier" && MAP[s.imported.name]) {
                      const o = s.imported.name, n = MAP[o];
                      s.imported.name = n;                 // module export name -> new
                      pending.push([s.local.name, n]);     // rename local binding + usages (at exit, refs linked)
                      imp++;
                    }
                  });
                }
                if (node.type === "ExportNamedDeclaration") {
                  if (node.source) {
                    node.specifiers.forEach((s) => {
                      if (s.type === "ExportSpecifier" && MAP[s.local.name]) {
                        const n = MAP[s.local.name];
                        s.local.name = n;
                        s.exported.name = n;
                        exp++;
                      }
                    });
                    return;
                  }
                  if (node.declaration) return;
                  node.specifiers.forEach((s) => {
                    if (s.type === "ExportSpecifier" && MAP[s.local.name]) {
                      const o = s.local.name, n = MAP[o];
                      s.local.name = n;
                      if (s.exported.name === o) s.exported.name = n;
                      exp++;
                    }
                  });
                }
              });
              // rename import local bindings (+ their usages) so opaque local aliases disappear
              for (const [localName, n] of pending) {
                if (localName === n) continue;
                if (p.scope.hasBinding(localName)) {
                  try { p.scope.rename(localName, n); local++; } catch (e) {}
                }
              }
              if (isIndex) {
                for (const o of Object.keys(MAP)) {
                  if (p.scope.hasBinding(o)) {
                    try { p.scope.rename(o, MAP[o]); local++; } catch (e) {}
                  }
                }
              }
            },
          },
        },
      })],
    }).code;
  } catch (e) {
    console.error("TRANSFORM FAIL", f, (e.stack || e.message).split("\n").slice(0, 4).join("\n"));
    fail++; return;
  }
  try { babel.parseSync(out, { sourceType: "module" }); }
  catch (e) { console.error("PARSE FAIL(after)", f, e.message); fail++; return; }
  fs.writeFileSync(path.join(FINAL, f), out);
});

console.log("imports:", imp, " exports:", exp, " index-locals:", local, " fail:", fail);
