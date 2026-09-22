const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const REST = path.join(__dirname, "restored");
const OUT = path.join(__dirname, "final");
fs.mkdirSync(OUT, { recursive: true });

const knownEntry = {
  a: "createVNode", b: "createElementVNode", c: "createElementBlock", f: "renderList",
  g: "createTextVNode", i: "useToast", j: "useRouter", k: "createCommentVNode",
  l: "openBlock", n: "normalizeClass", o: "onMounted", r: "ref", t: "toDisplayString",
  u: "useUserStore", y: "withDirectives", z: "vModelText", F: "Fragment", G: "nextTick", _: "withScopeId"
};

// Manual, path-verified map for the ticket API chunk.
// Built from each function's local name -> axios endpoint (read from restored source), then
// mapped to exported letter via the export statement. Collision-free.
// Verified against AdminVerifyPage usage: v=verifyTicket (query), p=useTicket (核销).
const ticketMap = {
  a: "getMyTickets", b: "getTicketActivity", c: "getMyActivityTickets", d: "grabTicket",
  e: "getAdminTicketActivities", f: "deleteAdminTicketActivity", g: "getTicketActivities",
  h: "getAdminTicketActivity", i: "getAdminTicketActivityStats", j: "createAdminTicketActivity",
  k: "setAdminTicketActivityStatus", l: "updateAdminTicketSession", m: "createAdminTicketSession",
  n: "deleteAdminTicketSession", o: "exportAdminTicketActivity", p: "useTicket",
  q: "getAdminTicketActivityReviews", r: "reviewTicket", s: "batchReviewTicket",
  u: "updateAdminTicketActivity", v: "verifyTicket"
};

function decodeEscapes(s) {
  return s
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => { const cp = parseInt(h, 16); return cp >= 0x3000 && cp !== 0xfeff ? String.fromCharCode(cp) : m; })
    .replace(/\\x([0-9a-fA-F]{2})/g, (m, h) => { const cp = parseInt(h, 16); return cp >= 0x3000 ? String.fromCharCode(cp) : m; });
}

function baseOf(f) { return f.replace(/-restored\.js$/, ".js"); }
function chunkName(f) {
  // PageHeader-BWL8GUHB -> PageHeader ; CommunityPage-AcOc2hqy -> CommunityPage
  const n = f.replace(/-restored\.js$/, "");
  const parts = n.split("-");
  if (parts.length > 1 && /^[A-Za-z0-9_]{5,}$/.test(parts[parts.length - 1])) parts.pop();
  return parts.join("-");
}

// ---- Build global sourceMap: sourceFile -> { exportedName -> newName } ----
const sourceMap = {};
sourceMap["index-DJrtCu9i.js"] = (() => {
  const code = fs.readFileSync(path.join(REST, "index-DJrtCu9i-restored.js"), "utf8");
  const ast = babel.parseSync(code, { sourceType: "module" });
  const m = {};
  ast.program.body.forEach((nd) => {
    if (nd.type === "ExportNamedDeclaration" && nd.specifiers) {
      nd.specifiers.forEach((s) => {
        if (s.type === "ExportSpecifier") m[s.exported.name] = knownEntry[s.exported.name] || "shared_" + s.exported.name;
      });
    }
  });
  return m;
})();
sourceMap["ticket-SMxxVFG1.js"] = ticketMap;

// component chunks: those exporting `X as P` -> rename P to filename-derived component name
for (const f of fs.readdirSync(REST).filter((x) => x.endsWith("-restored.js")).sort()) {
  if (f === "index-DJrtCu9i-restored.js") continue;
  const code = fs.readFileSync(path.join(REST, f), "utf8");
  const ast = babel.parseSync(code, { sourceType: "module" });
  let hasP = false;
  ast.program.body.forEach((nd) => {
    if (nd.type === "ExportNamedDeclaration" && nd.specifiers) {
      nd.specifiers.forEach((s) => { if (s.type === "ExportSpecifier" && s.exported.name === "P") hasP = true; });
    }
  });
  if (hasP) sourceMap[baseOf(f)] = { P: chunkName(f) };
}
console.log("sourceMap keys:", Object.keys(sourceMap).length, Object.keys(sourceMap).join(", "));

function processFile(file) {
  let code = fs.readFileSync(file, "utf8");
  const base = baseOf(path.basename(file));
  const ownMap = sourceMap[base];
  const srcName = path.basename(file).replace(/-restored\.js$/, ".js");

  const plugin = () => ({
    visitor: {
      Program(p) {
        const progScope = p.scope;
        // 1) rename this file's own exports (entry / ticket / component chunks)
        if (ownMap) {
          p.get("body").forEach((stmt) => {
            if (stmt.isExportNamedDeclaration()) {
              stmt.node.specifiers.forEach((spec) => {
                if (spec.type === "ExportSpecifier" && ownMap[spec.exported.name]) {
                  const nm = ownMap[spec.exported.name];
                  spec.exported.name = nm;
                  const b = progScope.getBinding(spec.local.name);
                  if (b) { try { b.scope.rename(spec.local.name, nm); } catch (e) {} }
                }
              });
            }
          });
        }
        // 2) rename imports coming from any mapped source
        p.get("body").forEach((stmt) => {
          if (stmt.isImportDeclaration()) {
            let src = stmt.node.source.value.replace(/^\.\//, "");
            if (sourceMap[src]) {
              const sm = sourceMap[src];
              stmt.node.specifiers.forEach((spec) => {
                if (spec.type === "ImportSpecifier" && sm[spec.imported.name]) {
                  const nm = sm[spec.imported.name];
                  spec.imported.name = nm;
                  const b = progScope.getBinding(spec.local.name);
                  if (b) { try { b.scope.rename(spec.local.name, nm); } catch (e) { spec.local.name = nm; } }
                  else spec.local.name = nm;
                }
              });
            }
          }
        });
      },
    },
  });

  const res = babel.transformSync(code, { plugins: [plugin], sourceType: "module", compact: false });
  let out = decodeEscapes(res.code);
  out = out.replace(/^\s*\/\*![\s\S]*?\*\/\s*/, "");
  const header =
    "/*!\n" +
    " * Deobfuscated & integrated JS\n" +
    " *   beautified + UTF-8 decoded + local vars renamed\n" +
    " *   + cross-module aliases resolved (entry d/z/... , ticket APIs, layout components)\n" +
    " * Source : assets/" + srcName + "\n" +
    " * Origin : https://xmyzstudent.com/\n" +
    " * Date   : 2026-07-21\n" +
    " */\n";
  return header + out;
}

let ok = 0;
for (const f of fs.readdirSync(REST).filter((x) => x.endsWith(".js")).sort()) {
  fs.writeFileSync(path.join(OUT, f), processFile(path.join(REST, f)));
  ok++;
}
for (const f of fs.readdirSync(REST).filter((x) => x.endsWith(".css")).sort()) {
  fs.copyFileSync(path.join(REST, f), path.join(OUT, f));
}
console.log("final/ written: JS", ok, " CSS", fs.readdirSync(REST).filter((x) => x.endsWith(".css")).length);
