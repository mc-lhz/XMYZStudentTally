const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const SRC = path.join(__dirname, "assets");
const OUT = path.join(__dirname, "restored");
const DEOP = path.join(__dirname, "deob");
fs.mkdirSync(OUT, { recursive: true });

const DATE = "2026-07-21";
// meaningful short names we keep as-is
const KEEP = new Set(["id", "el", "fn", "ok", "to", "io", "pi", "me", "we", "us", "by", "do", "my"]);
const TYPE_RE = /^(ref|computed|reactive|shallowRef|toRef|toRefs|watch|watchEffect|defineProps|defineEmits|defineExpose|inject|unref|markRaw|toRaw|nextTick|onMounted|onUnmounted|provide|use[A-Z]\w*)$/;

function shouldRename(name) {
  if (name.length > 2) return false;
  if (KEEP.has(name)) return false;
  return true;
}

function inferPrefix(binding) {
  const p = binding.path;
  if (!p) return "v";
  if (p.isFunctionDeclaration()) return "fn";
  if (p.isVariableDeclarator()) {
    const init = p.node.init;
    if (init && init.type === "CallExpression") {
      const c = init.callee;
      const name = c.name || (c.property && c.property.name) || "";
      if (TYPE_RE.test(name)) return name;
      if (/^use[A-Z]/.test(name)) return name;
    }
    return "v";
  }
  return "v";
}

// Only decode "safe" visible Unicode (CJK / Kana / Hangul / CJK punct / fullwidth / emoji).
// Leave low-range control/format escapes (\uFEFF, \xA0, \xAC, ...) escaped so regex/syntax stays valid.
function isSafeCp(cp) {
  if (cp < 0x3000) return false;
  if (cp === 0xFEFF) return false;
  if (cp >= 0xFFF0 && cp <= 0xFFFB) return false;
  if (cp >= 0xE0000) return false;
  return true;
}
function decodeEscapes(s) {
  s = s.replace(/\\u\{([0-9a-fA-F]+)\}/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafeCp(cp) ? String.fromCodePoint(cp) : m;
  });
  s = s.replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafeCp(cp) ? String.fromCharCode(cp) : m;
  });
  s = s.replace(/\\x([0-9a-fA-F]{2})/g, (m, h) => {
    const cp = parseInt(h, 16);
    return isSafeCp(cp) ? String.fromCharCode(cp) : m;
  });
  return s;
}

function renamePlugin() {
  return {
    name: "smart-rename",
    visitor: {
      Program(programPath) {
        const scopes = new Set();
        programPath.traverse({
          "Program|FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|BlockStatement"(p) {
            if (p.scope) scopes.add(p.scope);
          },
        });

        let counter = 1000;
        for (const scope of scopes) {
          const owns = scope.getOwnBindings ? scope.getOwnBindings() : scope.bindings;
          for (const name of Object.keys(owns)) {
            const b = owns[name];
            if (!shouldRename(name)) continue;
            if (b.kind === "module") {
              // only rename local alias of imports, never exported names
              const pp = b.path;
              const ppath = pp && pp.parentPath;
              const ptype = ppath && ppath.node && ppath.node.type;
              const isImport =
                ptype === "ImportSpecifier" ||
                ptype === "ImportDefaultSpecifier" ||
                ptype === "ImportNamespaceSpecifier";
              if (!isImport) continue;
              const gppath = ppath && ppath.parentPath;
              if (gppath && gppath.node && gppath.node.type === "ExportNamedDeclaration") continue;
            }
            const prefix = b.kind === "module" ? "imp" : inferPrefix(b);
            let newName;
            do {
              newName = prefix + counter++;
            } while (scope.hasBinding(newName));
            try {
              scope.rename(name, newName);
            } catch (e) {}
          }
        }
      },
    },
  };
}

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".js")).sort();
  let ok = 0,
    fallback = 0,
    fail = 0;
  for (const f of files) {
    const code = fs.readFileSync(path.join(SRC, f), "utf8");
    const outName = f.replace(/\.js$/, "") + "-restored.js";
    const outPath = path.join(OUT, outName);
    try {
      const res = babel.transformSync(code, {
        plugins: [renamePlugin],
        generatorOpts: { jsescOption: { minimal: true } },
        sourceType: "module",
        compact: false,
        retainLines: false,
        comments: true,
        sourceFileName: f,
      });
      let out = res.code;
      out = decodeEscapes(out);
      const header = `/*!
 * Smart-restored (renamed + UTF-8 decoded) JS
 * Source : assets/${f}
 * Origin : https://xmyzstudent.com/
 * Date   : ${DATE}
 * Note   : Local/minified variables renamed by usage heuristic (ref/computed/fn/useX/v + uid).
 *          Import/export names preserved for cross-module consistency. \\uXXXX decoded to UTF-8.
 */
`;
      out = header + out;
      babel.parseSync(out, { sourceType: "module" });
      fs.writeFileSync(outPath, out);
      ok++;
    } catch (e) {
      const deob = path.join(DEOP, f.replace(/\.js$/, "") + "-deob.js");
      if (fs.existsSync(deob)) {
        fs.copyFileSync(deob, outPath);
        fallback++;
        console.log(`FALLBACK ${f}: ${e.message.split("\n")[0]}`);
      } else {
        fail++;
        console.log(`FAIL ${f}: ${e.message.split("\n")[0]}`);
      }
    }
  }
  console.log(`\n=== JS restore: ok=${ok} fallback=${fallback} fail=${fail} ===`);
})();
