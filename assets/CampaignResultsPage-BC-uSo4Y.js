/*!
 * 页面模块：投票结果（CampaignResultsPage-BC）
 * 路由：/admin/campaigns/:id/results   name=admin-campaigns-results   层级=3   需登录=是
 * 功能：登录后的「投票结果」页面，承载该业务模块的视图与交互逻辑。
 * 来源：assets/CampaignResultsPage-BC-uSo4Y.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { defineComponent, useUserStore, applyDirectives, inject, ref, onMounted, useToast, useRouter, createElementBlock, createVNode, createElementVNode, createCommentVNode, toDisplayString, createTextVNode, Fragment, renderList, normalizeClass, toDisplayValue, withSlots, openBlock, withScopeId } from "./index-DJrtCu9i.js";
/* 导入：本地模块 campaign（站点内功能模块） */
import { getCampaignsById as ee, getAdminVotingCampaignsResults as se } from "./campaign-BV1jJ5bx.js";
/* 导入：通用组件 —— 页面公共头部组件 */
import { PageHeader } from "./PageHeader-BWL8GUHB.js";
/* 导入：通用组件 —— 页面公共底部组件 */
import { PageFooter } from "./PageFooter-BK6at51a.js";
/* 导入：通用组件 —— 面包屑导航组件 */
import { PageBreadcrumb } from "./PageBreadcrumb-BfFUydNi.js";
const ie = {
    class: "page-container"
  },
  ae = {
    class: "page-content"
  },
  le = {
    class: "content-container"
  },
  de = {
    class: "breadcrumb-wrapper"
  },
  re = {
    class: "page-header-section"
  },
  ce = {
    class: "header-main"
  },
  ue = {
    class: "header-text"
  },
  ve = {
    key: 0,
    class: "page-subtitle"
  },
  me = ["disabled"],
  pe = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  _e = {
    key: 1,
    class: "export-spinner"
  },
  ge = {
    key: 0,
    class: "loading-container"
  },
  he = {
    class: "stats-grid"
  },
  fe = {
    class: "stat-card"
  },
  ke = {
    class: "stat-value"
  },
  ye = {
    class: "stat-card"
  },
  be = {
    class: "stat-value"
  },
  xe = {
    class: "stat-card"
  },
  Ce = {
    class: "stat-value"
  },
  we = ["disabled"],
  Pe = {
    key: 0,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  },
  Re = {
    key: 1,
    class: "export-spinner"
  },
  Be = {
    key: 0,
    class: "empty-container"
  },
  Ee = {
    key: 1,
    class: "period-groups"
  },
  Ve = ["onClick"],
  Le = {
    class: "period-info"
  },
  Se = {
    class: "period-name"
  },
  Ue = {
    class: "period-count"
  },
  $e = {
    key: 0,
    class: "buildings-list"
  },
  ze = ["onClick"],
  Me = {
    class: "building-info"
  },
  Ne = {
    class: "building-name"
  },
  Te = {
    class: "building-votes"
  },
  Ie = {
    key: 0,
    class: "options-list"
  },
  Fe = {
    key: 0,
    class: "no-options"
  },
  He = {
    key: 0,
    class: "rank-icon"
  },
  je = {
    key: 1,
    class: "rank-number"
  },
  Oe = {
    class: "option-music"
  },
  qe = {
    class: "music-cover"
  },
  Ae = ["src", "alt"],
  Ge = {
    key: 1,
    class: "cover-placeholder"
  },
  Ke = {
    class: "music-info"
  },
  Je = {
    class: "music-name"
  },
  Qe = {
    class: "music-artist"
  },
  We = {
    class: "music-meta"
  },
  Xe = {
    class: "meta-item"
  },
  Ye = {
    class: "meta-item"
  },
  Ze = {
    class: "option-votes"
  },
  De = {
    class: "vote-value"
  },
  es = defineComponent({
    __name: "CampaignResultsPage",
    setup(val) {
      const useRouter1 = useRouter(),
        val2 = inject(),
        useUserStore1 = useUserStore(),
        useToast1 = useToast(),
        val3 = applyDirectives(() => Number(val2.params.id)),
        refVal = ref(!0),
        refVal2 = ref(!1),
        refVal3 = ref(null),
        refVal4 = ref([]),
        refVal5 = ref(new Set()),
        refVal6 = ref(new Set());
      function zz0(val1) {
        return val1 === 1 ? "rank-gold" : val1 === 2 ? "rank-silver" : val1 === 3 ? "rank-bronze" : "";
      }
      function zz1(val1) {
        return val1 === 1 ? "🥇" : val1 === 2 ? "🥈" : val1 === 3 ? "🥉" : String(val1);
      }
      const val4 = applyDirectives(() => {
          let num = 0;
          return refVal4.value.forEach(val1 => {
            val1.buildingResults.forEach(val7 => {
              num += val7.totalVotes;
            });
          }), num;
        }),
        val5 = applyDirectives(() => {
          const set = new Set();
          return refVal4.value.forEach(val1 => {
            val1.buildingResults.forEach(val7 => {
              set.add(val7.buildingCode);
            });
          }), set.size;
        }),
        val6 = applyDirectives(() => {
          let num = 0;
          return refVal4.value.forEach(val1 => {
            val1.buildingResults.forEach(val7 => {
              num += val7.options.length;
            });
          }), num;
        });
      function zz2(val1) {
        refVal5.value.has(val1) ? refVal5.value.delete(val1) : refVal5.value.add(val1);
      }
      function zz3(val1) {
        return refVal5.value.has(val1);
      }
      function zz4(val1, val7) {
        return `${val1}-${val7}`;
      }
      function zz5(val1, val7) {
        const val8 = zz4(val1, val7);
        refVal6.value.has(val8) ? refVal6.value.delete(val8) : refVal6.value.add(val8);
      }
      function zz6(val1, val7) {
        return refVal6.value.has(zz4(val1, val7));
      }
      async function zz7() {
        refVal.value = !0;
        try {
          const [val1, val7] = await Promise.all([ee(val3.value), se(val3.value)]);
          if (val1.data.code === 200) refVal3.value = val1.data.data;else {
            useToast1.error(val1.data.message || "获取活动详情失败");
            return;
          }
          if (val7.data.code === 200) {
            refVal4.value = val7.data.data;
            const val8 = refVal4.value[0];
            if (val8) {
              refVal5.value.add(val8.timePeriod.id);
              const val9 = val8.buildingResults[0];
              val9 && refVal6.value.add(zz4(val8.timePeriod.id, val9.buildingCode));
            }
          } else useToast1.error(val7.data.message || "获取投票结果失败");
        } catch {
          useToast1.error("获取投票结果失败");
        } finally {
          refVal.value = !1;
        }
      }
      const text = "https://api.xmyzstudent.com/api/v2";
      async function zz8() {
        if (!refVal2.value) {
          refVal2.value = !0;
          try {
            const item = localStorage.getItem("token"),
              obj = {};
            item && (obj.Authorization = `Bearer ${item}`);
            const val7 = await fetch(`${text}/admin/voting/campaigns/${val3.value}/export`, {
              method: "GET",
              headers: obj
            });
            if (!val7.ok) throw new Error("导出失败");
            const val8 = val7.headers.get("Content-Disposition");
            let text1 = `voting-results-${val3.value}.xlsx`;
            if (val8) {
              const val12 = val8.match(/filename\*?=['"]?(?:UTF-8'')?([^;\r\n"']*)['"]?/i);
              val12 && val12[1] && (text1 = decodeURIComponent(val12[1]));
            }
            const val9 = await val7.blob(),
              objectURL = window.URL.createObjectURL(val9),
              element = document.createElement("a");
            element.href = objectURL, element.download = text1, document.body.appendChild(element), element.click(), document.body.removeChild(element), window.URL.revokeObjectURL(objectURL), useToast1.success("导出成功");
          } catch {
            useToast1.error("导出失败，请稍后重试");
          } finally {
            refVal2.value = !1;
          }
        }
      }
      return onMounted(() => {
        if (!useUserStore1.isLoggedIn || !useUserStore1.canManageCampaigns) {
          useToast1.error("无权访问此页面"), useRouter1.push("/");
          return;
        }
        zz7();
      }), /* 渲染函数：构建组件模板 DOM 结构 */(val1, val7) => (openBlock(), createElementBlock("div", ie, [createVNode(PageHeader, {
        "back-to": "/admin/campaigns"
      }), createElementVNode("main", ae, [createElementVNode("div", le, [createElementVNode("div", de, [createVNode(PageBreadcrumb)]), createElementVNode("div", re, [createElementVNode("div", ce, [createElementVNode("div", ue, [val7[0] || (val7[0] = createElementVNode("h1", {
        class: "page-title"
      }, "投票结果", -1)), refVal3.value ? (openBlock(), createElementBlock("p", ve, toDisplayString(refVal3.value.title), 1)) : createCommentVNode("", !0)]), createElementVNode("button", {
        class: "export-btn desktop-only",
        disabled: refVal2.value || refVal.value,
        onClick: zz8
      }, [refVal2.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("svg", pe, [...(val7[1] || (val7[1] = [createElementVNode("path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }, null, -1), createElementVNode("polyline", {
        points: "7 10 12 15 17 10"
      }, null, -1), createElementVNode("line", {
        x1: "12",
        y1: "15",
        x2: "12",
        y2: "3"
      }, null, -1)]))])), refVal2.value ? (openBlock(), createElementBlock("span", _e)) : createCommentVNode("", !0), createTextVNode(" " + toDisplayString(refVal2.value ? "导出中..." : "导出表格"), 1)], 8, me)])]), refVal.value ? (openBlock(), createElementBlock("div", ge, [...(val7[2] || (val7[2] = [createElementVNode("div", {
        class: "loading-spinner"
      }, null, -1), createElementVNode("p", null, "加载中...", -1)]))])) : (openBlock(), createElementBlock(Fragment, {
        key: 1
      }, [createElementVNode("div", he, [createElementVNode("div", fe, [createElementVNode("div", ke, toDisplayString(val4.value), 1), val7[3] || (val7[3] = createElementVNode("div", {
        class: "stat-label"
      }, "总投票数", -1))]), createElementVNode("div", ye, [createElementVNode("div", be, toDisplayString(val5.value), 1), val7[4] || (val7[4] = createElementVNode("div", {
        class: "stat-label"
      }, "宿舍楼数", -1))]), createElementVNode("div", xe, [createElementVNode("div", Ce, toDisplayString(val6.value), 1), val7[5] || (val7[5] = createElementVNode("div", {
        class: "stat-label"
      }, "候选音乐", -1))])]), createElementVNode("button", {
        class: "export-btn mobile-only",
        disabled: refVal2.value || refVal.value,
        onClick: zz8
      }, [refVal2.value ? createCommentVNode("", !0) : (openBlock(), createElementBlock("svg", Pe, [...(val7[6] || (val7[6] = [createElementVNode("path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }, null, -1), createElementVNode("polyline", {
        points: "7 10 12 15 17 10"
      }, null, -1), createElementVNode("line", {
        x1: "12",
        y1: "15",
        x2: "12",
        y2: "3"
      }, null, -1)]))])), refVal2.value ? (openBlock(), createElementBlock("span", Re)) : createCommentVNode("", !0), createTextVNode(" " + toDisplayString(refVal2.value ? "导出中..." : "导出表格"), 1)], 8, we), refVal4.value.length === 0 ? (openBlock(), createElementBlock("div", Be, [...(val7[7] || (val7[7] = [createElementVNode("div", {
        class: "empty-icon"
      }, [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5"
      }, [createElementVNode("path", {
        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      })])], -1), createElementVNode("h2", null, "暂无投票数据", -1), createElementVNode("p", null, "该活动还没有收到任何投票", -1)]))])) : (openBlock(), createElementBlock("div", Ee, [(openBlock(!0), createElementBlock(Fragment, null, renderList(refVal4.value, val8 => (openBlock(), createElementBlock("div", {
        key: val8.timePeriod.id,
        class: "period-group"
      }, [createElementVNode("div", {
        class: "period-header",
        onClick: val9 => zz2(val8.timePeriod.id)
      }, [createElementVNode("div", Le, [createElementVNode("h3", Se, toDisplayString(val8.timePeriod.name), 1), createElementVNode("span", Ue, toDisplayString(val8.buildingResults.length) + " 栋宿舍楼", 1)]), createElementVNode("div", {
        class: normalizeClass(["expand-icon", {
          expanded: zz3(val8.timePeriod.id)
        }])
      }, [...(val7[8] || (val7[8] = [createElementVNode("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [createElementVNode("polyline", {
        points: "6 9 12 15 18 9"
      })], -1)]))], 2)], 8, Ve), createVNode(withSlots, {
        name: "expand"
      }, {
        default: toDisplayValue(() => [zz3(val8.timePeriod.id) ? (openBlock(), createElementBlock("div", $e, [(openBlock(!0), createElementBlock(Fragment, null, renderList(val8.buildingResults, val9 => (openBlock(), createElementBlock("div", {
          key: val9.buildingCode,
          class: "building-group"
        }, [createElementVNode("div", {
          class: "building-header",
          onClick: val10 => zz5(val8.timePeriod.id, val9.buildingCode)
        }, [createElementVNode("div", Me, [createElementVNode("span", Ne, toDisplayString(val9.buildingName), 1), createElementVNode("span", Te, toDisplayString(val9.totalVotes) + " 票", 1)]), createElementVNode("div", {
          class: normalizeClass(["building-expand-icon", {
            expanded: zz6(val8.timePeriod.id, val9.buildingCode)
          }])
        }, [...(val7[9] || (val7[9] = [createElementVNode("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [createElementVNode("polyline", {
          points: "6 9 12 15 18 9"
        })], -1)]))], 2)], 8, ze), createVNode(withSlots, {
          name: "expand"
        }, {
          default: toDisplayValue(() => [zz6(val8.timePeriod.id, val9.buildingCode) ? (openBlock(), createElementBlock("div", Ie, [val9.options.length === 0 ? (openBlock(), createElementBlock("div", Fe, " 暂无投票数据 ")) : (openBlock(!0), createElementBlock(Fragment, {
            key: 1
          }, renderList(val9.options, (val10, val11) => (openBlock(), createElementBlock("div", {
            key: val10.id,
            class: normalizeClass(["option-card", zz0(val11 + 1)])
          }, [createElementVNode("div", {
            class: normalizeClass(["option-rank", zz0(val11 + 1)])
          }, [val11 < 3 ? (openBlock(), createElementBlock("span", He, toDisplayString(zz1(val11 + 1)), 1)) : (openBlock(), createElementBlock("span", je, toDisplayString(val11 + 1), 1))], 2), createElementVNode("div", Oe, [createElementVNode("div", qe, [val10.music.cover ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: val10.music.cover,
            alt: val10.music.song
          }, null, 8, Ae)) : (openBlock(), createElementBlock("div", Ge, [...(val7[10] || (val7[10] = [createElementVNode("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [createElementVNode("path", {
            d: "M9 18V5l12-2v13"
          }), createElementVNode("circle", {
            cx: "6",
            cy: "18",
            r: "3"
          }), createElementVNode("circle", {
            cx: "18",
            cy: "16",
            r: "3"
          })], -1)]))]))]), createElementVNode("div", Ke, [createElementVNode("h4", Je, toDisplayString(val10.music.song), 1), createElementVNode("p", Qe, toDisplayString(val10.music.singer), 1), createElementVNode("div", We, [createElementVNode("span", Xe, toDisplayString(val10.music.album), 1), val7[11] || (val7[11] = createElementVNode("span", {
            class: "meta-divider"
          }, "|", -1)), createElementVNode("span", Ye, toDisplayString(val10.music.interval), 1)])])]), createElementVNode("div", Ze, [createElementVNode("span", De, toDisplayString(val10.voteCount), 1), val7[12] || (val7[12] = createElementVNode("span", {
            class: "vote-label"
          }, "票", -1))])], 2))), 128))])) : createCommentVNode("", !0)]),
          _: 2
        }, 1024)]))), 128))])) : createCommentVNode("", !0)]),
        _: 2
      }, 1024)]))), 128))]))], 64))])]), createVNode(PageFooter)]));
    }
  }),
  ls = withScopeId(es, [["__scopeId", "data-v-55ed47f0"]]);
/* index 运行时导出（已语义化） */
export { ls as default };