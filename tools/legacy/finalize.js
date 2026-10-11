const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const REST = path.join(__dirname, "restored");
const OUT = path.join(__dirname, "final");
fs.mkdirSync(OUT, { recursive: true });

// High-confidence semantic map for the shared entry chunk's single-letter exports.
// Derived from Vue 3 compiled-SFC usage patterns (validated against entry definitions).
const knownMap = {
  a: "createVNode",
  b: "createElementVNode",
  c: "createElementBlock",
  f: "renderList",
  g: "createTextVNode",
  i: "useToast",
  j: "useRouter",
  k: "createCommentVNode",
  l: "openBlock",
  n: "normalizeClass",
  o: "onMounted",
  r: "ref",
  t: "toDisplayString",
  u: "useUserStore",
  y: "withDirectives",
  z: "vModelText",
  F: "Fragment",
  G: "nextTick",
  _: "withScopeId"
};

function decodeEscapes(s) {
  return s
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => {
      const cp = parseInt(h, 16);
      return cp >= 0x3000 && cp !== 0xfeff ? String.fromCharCode(cp) : m;
    })
    .replace(/\\x([0-9a-fA-F]{2})/g, (m, h) => {
      const cp = parseInt(h, 16);
      return cp >= 0x3000 ? String.fromCharCode(cp) : m;
    });
}

// Build entryExportToNew from the entry file's export statement (driven by PUBLIC export names).
const entryFile = path.join(REST, "index-DJrtCu9i-restored.js");
const entryAst = babel.parseSync(fs.readFileSync(entryFile, "utf8"), { sourceType: "module" });
const entryExportToNew = {};
entryAst.program.body.forEach((node) => {
  if (node.type === "ExportNamedDeclaration" && node.specifiers) {
    node.specifiers.forEach((s) => {
      if (s.type === "ExportSpecifier") {
        const exp = s.exported.name;
        entryExportToNew[exp] = knownMap[exp] || "shared_" + exp;
      }
    });
  }
});
console.log("entry exports mapped:", Object.keys(entryExportToNew).length);

function processFile(file) {
  let code = fs.readFileSync(file, "utf8");
  const isEntry = path.basename(file) === "index-DJrtCu9i-restored.js";
  const srcName = path.basename(file).replace(/-restored\.js$/, ".js");

  const plugin = () => ({
    visitor: {
      Program(p) {
        const progScope = p.scope;
        // entry: rename its exported single-letter bindings + export specifiers
        if (isEntry) {
          p.get("body").forEach((stmt) => {
            if (stmt.isExportNamedDeclaration()) {
              stmt.node.specifiers.forEach((spec) => {
                if (spec.type === "ExportSpecifier") {
                  const exp = spec.exported.name;
                  if (entryExportToNew[exp]) {
                    const nm = entryExportToNew[exp];
                    spec.exported.name = nm;
                    const b = progScope.getBinding(spec.local.name);
                    if (b) { try { b.scope.rename(spec.local.name, nm); } catch (e) {} }
                  }
                }
              });
            }
          });
        }
        // importers: resolve entry import aliases to semantic names
        p.get("body").forEach((stmt) => {
          if (stmt.isImportDeclaration()) {
            const src = stmt.node.source.value;
            if (src === "./index-DJrtCu9i.js" || src.endsWith("index-DJrtCu9i.js")) {
              stmt.node.specifiers.forEach((spec) => {
                if (spec.type === "ImportSpecifier" && entryExportToNew[spec.imported.name]) {
                  const nm = entryExportToNew[spec.imported.name];
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
    " *   beautified (esbuild) + UTF-8 decoded + local variables renamed\n" +
    " *   + cross-module import aliases resolved (entry d/z/g/k/... -> semantic names)\n" +
    " * Source : assets/" + srcName + "\n" +
    " * Origin : https://xmyzstudent.com/\n" +
    " * Date   : 2026-07-21\n" +
    " * Note   : Vue render helpers / router / store / toast / ref / onMounted resolved where\n" +
    " *          identifiable; remaining shared exports named shared_X for cross-file consistency.\n" +
    " */\n";
  return header + out;
}

let ok = 0;
for (const f of fs.readdirSync(REST).filter((x) => x.endsWith(".js")).sort()) {
  fs.writeFileSync(path.join(OUT, f), processFile(path.join(REST, f)));
  ok++;
}
// copy CSS as-is (already beautified + decoded + commented)
for (const f of fs.readdirSync(REST).filter((x) => x.endsWith(".css")).sort()) {
  fs.copyFileSync(path.join(REST, f), path.join(OUT, f));
}
console.log("final/ written: JS", ok, " CSS", fs.readdirSync(REST).filter((x) => x.endsWith(".css")).length);
