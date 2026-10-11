const fs = require("fs"), path = require("path");
const babel = require("C:/Users/Administrator/.workbuddy/binaries/node/workspace/node_modules/@babel/core");
const dir = "final";

// 46 个剩余 zb 名完整映射
//  type: "importAlias" -> 消费者 `import { RealName as zbXX }`，去掉别名改用 RealName
//  type: "exportAlias" -> 源模块 `export { real as zbXX }`，把别名改成语义名并同步消费者
const MAP = {
  // ---- 导入别名 (30) ----
  zb1n: { type: "importAlias", real: "getCampusesBuildingsById" },
  zb1q: { type: "importAlias", real: "uploadFiles" },
  zb1r: { type: "importAlias", real: "getGradeExams" },
  zb1u: { type: "importAlias", real: "getGradeExamsById" },
  zb1v: { type: "importAlias", real: "getGradeStatus" },
  zb2f: { type: "importAlias", real: "getAdminMuseumEventsById" },
  zb2g: { type: "importAlias", real: "updateAdminMuseumEvents" },
  zb2h: { type: "importAlias", real: "createAdminMuseumEvents" },
  zb2v: { type: "importAlias", real: "createMajorSectionsImage" },
  zb3a: { type: "importAlias", real: "getRatingItemsById" },
  zb3k: { type: "importAlias", real: "createRatingCommunityRatings" },
  zb3m: { type: "importAlias", real: "getRatingCommunityMajorSectionsMinorSectionsById" },
  zb3v: { type: "importAlias", real: "createRatingCommunityContributions" },
  zb3w: { type: "importAlias", real: "getRatingCommunityCollectionsById" },
  zb3x: { type: "importAlias", real: "getRatingCommunityContributionsMy" },
  zb3y: { type: "importAlias", real: "getStatisticsOverview" },
  zb3z: { type: "importAlias", real: "searchRatingCommunity" },
  zb4f: { type: "importAlias", real: "getAdminTallyActivities" },
  zb4h: { type: "importAlias", real: "createAdminTallyActivities" },
  zb4i: { type: "importAlias", real: "updateAdminTallyActivities" },
  zb4j: { type: "importAlias", real: "deleteAdminTallyActivities" },
  zb4o: { type: "importAlias", real: "getAdminTallyActivitiesRecords" },
  zb4p: { type: "importAlias", real: "undoAdminTallyActivities" },
  zb5h: { type: "importAlias", real: "takedownAdminVoicesQuestions" },
  zb5l: { type: "importAlias", real: "takedownAdminVoicesAnswers" },
  zb5n: { type: "importAlias", real: "handleAdminVoicesReports" },
  zbc:  { type: "importAlias", real: "getCampaigns" },
  zbf:  { type: "importAlias", real: "getMusicUrl" },
  zbk:  { type: "importAlias", real: "getAdminReviewCampaignsSubmissions" },
  zbl:  { type: "importAlias", real: "deleteAdminReviewSubmissions" },
  // ---- 导出别名 (16) ----
  zbq:  { type: "exportAlias", newName: "getAdminDebateRounds_2" },
  zbs:  { type: "exportAlias", newName: "getDebateResults" },
  zbt:  { type: "exportAlias", newName: "putDebateOperatorRoundsReset" },
  zbu:  { type: "exportAlias", newName: "putDebateOperatorRoundsLock" },
  zbv:  { type: "exportAlias", newName: "getDebateMe" },
  zbw:  { type: "exportAlias", newName: "putDebateOperatorRoundsActive" },
  zbx:  { type: "exportAlias", newName: "putDebateOperatorRounds" },
  zby:  { type: "exportAlias", newName: "debateRoundWsUrl" },
  zb2n: { type: "exportAlias", newName: "museumTypeLabel" },
  zb2o: { type: "exportAlias", newName: "museumMediaTypeLabels" },
  zb2p: { type: "exportAlias", newName: "museumStatusLabel" },
  zb4a: { type: "exportAlias", newName: "getRatingPathName" },
  zb4b: { type: "exportAlias", newName: "ratingTypeLabel" },
  zb4c: { type: "exportAlias", newName: "ratingTargetLabel" },
  zb4e: { type: "exportAlias", newName: "ratingStatusLabel" },
  zb4g: { type: "exportAlias", newName: "tallyActivityWsUrl" },
};

const plugin = ({ types: t }) => ({
  visitor: {
    Program: {
      exit(progPath) {
        const pending = []; // {path, name, newName}
        // 1) 导入语句处理
        progPath.traverse({
          ImportDeclaration(p) {
            p.get("specifiers").forEach(sp => {
              const node = sp.node;
              if (node.type !== "ImportSpecifier" || !node.imported) return;
              const local = node.local.name;
              const imported = node.imported.name;
              // 导入别名: local 是 zbXX, imported 是真实语义名
              if (MAP[local] && MAP[local].type === "importAlias") {
                const real = MAP[local].real;
                node.imported.name = real;       // 源名本就是 real, 保险起见再写一次
                pending.push({ path: sp, name: local, newName: real });
              }
              // 导出别名在消费者侧: imported 是 zbXX, local 可能是 zbXX 或别名
              else if (MAP[imported] && MAP[imported].type === "exportAlias") {
                const newName = MAP[imported].newName;
                node.imported.name = newName;
                if (node.local.name === imported) {
                  node.local.name = newName;
                  pending.push({ path: sp, name: imported, newName }); // 用法也要跟随
                }
                // 若 local 是别的别名(如 Ie), 仅改 imported 即可, 用法已用 Ie
              }
            });
          }
        });
        // 2) 导出语句处理 (导出别名: `real as zbXX`)
        progPath.traverse({
          ExportNamedDeclaration(p) {
            if (!p.node.specifiers) return;
            p.node.specifiers.forEach(spec => {
              if (spec.type === "ExportSpecifier" && spec.local && spec.exported) {
                const e = spec.exported.name;
                if (MAP[e] && MAP[e].type === "exportAlias") {
                  spec.exported.name = MAP[e].newName;
                  if (spec.local.name === e) spec.local.name = MAP[e].newName;
                }
              }
            });
          }
        });
        // 3) 在 Program-exit 统一执行 scope.rename, 连带所有用法
        for (const r of pending) {
          try { r.path.scope.rename(r.name, r.newName); } catch (e) {}
        }
      }
    }
  }
});

let changed = 0, failed = 0, renamedTotal = 0;
for (const f of fs.readdirSync(dir).filter(x => x.endsWith(".js")).sort()) {
  const file = path.join(dir, f);
  const code = fs.readFileSync(file, "utf8");
  try {
    const out = babel.transformSync(code, {
      sourceType: "unambiguous",
      babelrc: false, configFile: false,
      compact: false, comments: true,
      plugins: [plugin]
    });
    const finalCode = out.code;
    if (finalCode !== code) {
      fs.writeFileSync(file, finalCode);
      changed++;
    }
  } catch (e) {
    failed++;
    console.log("FAIL", f, e.message.slice(0, 80));
  }
}
console.log("剩余 zb 处理: 变更文件", changed, "失败", failed);
