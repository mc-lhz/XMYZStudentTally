const fs = require("fs");
const code = fs.readFileSync("index-DJrtCu9i.js", "utf8");
const names = ["shared_A","shared_B","shared_C","shared_D","shared_E","shared_H","shared_I","shared_J","shared_K","shared_L","shared_M","shared_N","shared_O","shared_P","shared_Q","shared_R","shared_S","shared_T","shared_U","shared_V","shared_W","shared_X","shared_Y","shared_Z","shared_a0","shared_a1","shared_a2","shared_a3","shared_a4","shared_a5","shared_a6","shared_a7","shared_d","shared_e","shared_h","shared_m","shared_p","shared_q","shared_s","shared_v","shared_w","shared_x","shared_$"];

// find "function NAME" or "const NAME =" or "NAME ="
function findDecl(nm) {
  const pats = ["function " + nm + "(", "const " + nm + " =", "let " + nm + " =", "var " + nm + " =", nm + " = "];
  let best = -1;
  for (const p of pats) {
    const i = code.indexOf(p);
    if (i >= 0 && (best < 0 || i < best)) best = i;
  }
  return best;
}
for (const nm of names) {
  const idx = findDecl(nm);
  if (idx < 0) { console.log(nm + " => NOT FOUND"); continue; }
  const line = code.slice(0, idx).split("\n").length;
  const snippet = code.slice(idx, idx + 200).split("\n").slice(0, 2).join("  |  ");
  console.log("=== " + nm + " [L" + line + "] ===");
  console.log("    " + snippet);
}
