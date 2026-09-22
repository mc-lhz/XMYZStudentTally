/*!
 * 通用组件：rating
 * 角色：评分控件组件（星级/评分），被多个页面复用（通过 X as P 导出）。
 * 来源：assets/rating-CCUJ0_Xu.js    站点：https://xmyzstudent.com/    日期：2026-07-21
 */
/* 导入：应用入口模块 —— Vue 运行时渲染辅助 / 全局状态(useUserStore) / 路由(useRouter) / Toast(useToast) 等 */
import { http } from "./index-DJrtCu9i.js";
function zz0(val) {
  return http.get(`/rating-community/major-sections/${val}/minor-sections`);
}
function zz1(val) {
  return http.get(`/rating-community/minor-sections/${val}/rating-items`);
}
function zz2(val) {
  return http.get(`/rating-community/schools/${val}/categories`);
}
function zz3(val) {
  return http.get(`/rating-community/categories/${val}`);
}
function zz4(val) {
  return http.get(`/rating-community/rating-items/${val}`);
}
function zz5(val) {
  return http.post("/rating-community/ratings", val);
}
function zz6(val) {
  const formdata = new FormData();
  return formdata.append("file", val), formdata.append("businessType", "comment_image"), http.post("/files/upload", formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz7(val) {
  return http.post("/rating-community/comments", val);
}
function zz8(val) {
  return http.delete(`/rating-community/comments/${val}`);
}
function zz9(val) {
  return http.post("/rating-community/likes", {
    commentId: val
  });
}
function zz10(val, zz11 = 10) {
  return http.get("/rating-community/random-items", {
    params: {
      schoolId: val,
      count: zz11
    }
  });
}
function zz12(zz13 = 10) {
  return http.get("/rating-community/hot-items", {
    params: {
      count: zz13
    }
  });
}
function zz14(val) {
  return http.get("/rating-community/search", {
    params: {
      keyword: val
    }
  });
}
const ratingConst0 = "/admin/rating-community";
function zz15() {
  return http.get(`${ratingConst0}/statistics/overview`);
}
function zz16(val) {
  return http.get(`${ratingConst0}/statistics/daily-ratings`, {
    params: val
  });
}
function zz17(val) {
  return http.get(`${ratingConst0}/schools`, {
    params: val
  });
}
function zz18(val) {
  return http.get(`${ratingConst0}/schools/${val}`);
}
function zz19(val) {
  return http.post(`${ratingConst0}/schools`, val);
}
function zz20(val, val2) {
  return http.put(`${ratingConst0}/schools/${val}`, val2);
}
function zz21(val) {
  return http.delete(`${ratingConst0}/schools/${val}`);
}
function zz22(val, val2) {
  return http.put(`${ratingConst0}/schools/${val}/status`, val2);
}
function zz23(val) {
  return http.get(`${ratingConst0}/major-sections`, {
    params: val
  });
}
function zz24(val) {
  return http.get(`${ratingConst0}/major-sections/${val}`);
}
function zz25(val) {
  return http.post(`${ratingConst0}/major-sections`, val);
}
function zz26(val, val2) {
  return http.put(`${ratingConst0}/major-sections/${val}`, val2);
}
function zz27(val) {
  return http.delete(`${ratingConst0}/major-sections/${val}`);
}
function zz28(val, val2) {
  return http.put(`${ratingConst0}/major-sections/${val}/status`, val2);
}
function zz29(val, val2) {
  const formdata = new FormData();
  return formdata.append("file", val2), http.post(`${ratingConst0}/major-sections/${val}/image`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz30(val) {
  return http.delete(`${ratingConst0}/major-sections/${val}/image`);
}
function zz31(val) {
  return http.get(`${ratingConst0}/minor-sections`, {
    params: val
  });
}
function zz32(val) {
  return http.post(`${ratingConst0}/minor-sections`, val);
}
function zz33(val, val2) {
  return http.put(`${ratingConst0}/minor-sections/${val}`, val2);
}
function zz34(val) {
  return http.delete(`${ratingConst0}/minor-sections/${val}`);
}
function zz35(val, val2) {
  return http.put(`${ratingConst0}/minor-sections/${val}/status`, val2);
}
function zz36(val, val2) {
  const formdata = new FormData();
  return formdata.append("file", val2), http.post(`${ratingConst0}/minor-sections/${val}/image`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz37(val) {
  return http.delete(`${ratingConst0}/minor-sections/${val}/image`);
}
function zz38(val) {
  return http.get(`${ratingConst0}/categories`, {
    params: val
  });
}
function zz39(val) {
  return http.get(`${ratingConst0}/categories/${val}`);
}
function zz40(val) {
  return http.post(`${ratingConst0}/categories`, val);
}
function zz41(val, val2) {
  return http.put(`${ratingConst0}/categories/${val}`, val2);
}
function zz42(val) {
  return http.delete(`${ratingConst0}/categories/${val}`);
}
function zz43(val, val2) {
  return http.put(`${ratingConst0}/categories/${val}/status`, val2);
}
function zz44(val, val2) {
  const formdata = new FormData();
  return formdata.append("file", val2), http.post(`${ratingConst0}/categories/${val}/image`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz45(val) {
  return http.delete(`${ratingConst0}/categories/${val}/image`);
}
function zz46(val) {
  return http.get(`${ratingConst0}/rating-items`, {
    params: val
  });
}
function zz47(val) {
  return http.get(`${ratingConst0}/rating-items/${val}`);
}
function zz48(val) {
  return http.post(`${ratingConst0}/rating-items`, val);
}
function zz49(val, val2) {
  return http.put(`${ratingConst0}/rating-items/${val}`, val2);
}
function zz50(val) {
  return http.delete(`${ratingConst0}/rating-items/${val}`);
}
function zz51(val, val2) {
  return http.put(`${ratingConst0}/rating-items/${val}/status`, val2);
}
function zz52(val, val2) {
  const formdata = new FormData();
  return formdata.append("file", val2), http.post(`${ratingConst0}/rating-items/${val}/image`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz53(val) {
  return http.delete(`${ratingConst0}/rating-items/${val}/image`);
}
function zz54(val) {
  return http.get(`${ratingConst0}/comments`, {
    params: val
  });
}
function zz55(val) {
  return http.delete(`${ratingConst0}/comments/${val}`);
}
function zz56(val) {
  return http.delete(`${ratingConst0}/comments/batch`, {
    data: val
  });
}
function zz57(val) {
  return http.get(`${ratingConst0}/ratings`, {
    params: val
  });
}
function zz58(val) {
  return http.delete(`${ratingConst0}/ratings/${val}`);
}
function zz59(val) {
  return http.delete(`${ratingConst0}/ratings/batch`, {
    data: val
  });
}
function zz60() {
  return http.get("/rating-community/collections");
}
function zz61(val) {
  return http.get(`/rating-community/collections/${val}`);
}
function zz62(val) {
  return http.get(`${ratingConst0}/collections`, {
    params: val
  });
}
function zz63(val) {
  return http.get(`${ratingConst0}/collections/${val}`);
}
function zz64(val) {
  return http.post(`${ratingConst0}/collections`, val);
}
function zz65(val, val2) {
  return http.put(`${ratingConst0}/collections/${val}`, val2);
}
function zz66(val) {
  return http.delete(`${ratingConst0}/collections/${val}`);
}
function zz67(val, val2) {
  return http.put(`${ratingConst0}/collections/${val}/status`, val2);
}
function zz68(val, val2) {
  const formdata = new FormData();
  return formdata.append("file", val2), http.post(`${ratingConst0}/collections/${val}/image`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz69(val) {
  return http.delete(`${ratingConst0}/collections/${val}/image`);
}
function zz70(val, val2) {
  return http.get(`${ratingConst0}/collections/${val}/items`, {
    params: val2
  });
}
function zz71(val, val2) {
  return http.post(`${ratingConst0}/collections/${val}/items`, val2);
}
function zz72(val, val2) {
  return http.delete(`${ratingConst0}/collections/${val}/items/${val2}`);
}
function zz73(val, val2, val3) {
  return http.put(`${ratingConst0}/collections/${val}/items/${val2}/sort`, val3);
}
function zz74(val) {
  return http.post("/rating-community/contributions", val);
}
function zz75(val) {
  return http.post("/rating-community/contributions/batch-rating-items", val);
}
function zz76(val) {
  const formdata = new FormData();
  return formdata.append("file", val), http.post("/rating-community/contributions/upload-image", formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
function zz77(val) {
  return http.get("/rating-community/contributions/my", {
    params: val
  });
}
function zz78(val, val2) {
  return http.get("/rating-community/contributions/history", {
    params: {
      targetType: val,
      targetId: val2
    }
  });
}
function zz79(val) {
  return http.get(`${ratingConst0}/contributions`, {
    params: val
  });
}
function zz80() {
  return http.get(`${ratingConst0}/contributions/pending-count`);
}
function zz81(val, val2) {
  return http.post(`${ratingConst0}/contributions/${val}/review`, val2);
}
/* index 运行时导出（已语义化） */
export { zz44 as createCategoriesImage, zz21 as deleteSchools, zz18 as getSchoolsById, zz23 as getMajorSectionsById, zz25 as createMajorSections, zz29 as createMajorSectionsImage, zz26 as updateMajorSections, zz30 as deleteMajorSectionsImage, zz28 as updateMajorSectionsStatus, zz27 as deleteMajorSections, zz24 as getMajorSectionsById2, zz31 as getMinorSectionsById, zz32 as createMinorSections, zz36 as createMinorSectionsImage, zz33 as updateMinorSections, zz37 as deleteMinorSectionsImage, zz35 as updateMinorSectionsStatus, zz34 as deleteMinorSections, zz46 as getRatingItemsById, zz39 as getCategoriesById, zz48 as createRatingItems, zz52 as createRatingItemsImage, zz49 as updateRatingItems, zz53 as deleteRatingItemsImage, zz51 as updateRatingItemsStatus, zz50 as deleteRatingItems, zz38 as getCategoriesById2, zz40 as createCategories, zz12 as getRatingCommunityHotItems, zz41 as updateCategories, zz45 as deleteCategoriesImage, zz43 as updateCategoriesStatus, zz42 as deleteCategories, zz47 as getRatingItemsById2, zz54 as getCommentsById, zz57 as getRatingsById, zz55 as deleteComments, zz56 as batchComments, zz58 as deleteRatings, zz59 as batchRatings, zz62 as getCollectionsById, zz64 as createCollections, zz68 as createCollectionsImage, zz65 as updateCollections, zz69 as deleteCollectionsImage, zz67 as updateCollectionsStatus, zz66 as deleteCollections, zz63 as getCollectionsById2, zz70 as getCollectionsItemsById, zz71 as createCollectionsItems, zz73 as sortCollectionsItems, zz72 as deleteCollectionsItems, zz79 as getContributionsById, zz81 as reviewContributions, zz16 as getStatisticsDailyRatings, zz10 as getRatingCommunityRandomItems, zz60 as getRatingCommunityCollections, zz5 as createRatingCommunityRatings, zz3 as getRatingCommunityCategoriesById, zz0 as getRatingCommunityMajorSectionsMinorSectionsById, zz2 as getRatingCommunitySchoolsCategoriesById, zz1 as getRatingCommunityMinorSectionsRatingItemsById, zz78 as getRatingCommunityContributionsHistory, zz7 as createRatingCommunityComments, zz4 as getRatingCommunityRatingItemsById, zz8 as deleteRatingCommunityComments, zz75 as batchRatingItemsRatingCommunityContributions, zz74 as createRatingCommunityContributions, zz76 as uploadImageRatingCommunityContributions, zz61 as getRatingCommunityCollectionsById, zz77 as getRatingCommunityContributionsMy, zz15 as getStatisticsOverview, zz14 as searchRatingCommunity, zz9 as createRatingCommunityLikes, zz6 as uploadFiles, zz80 as getContributionsPendingCount, zz17 as getSchoolsById2, zz19 as createSchools, zz20 as updateSchools, zz22 as updateSchoolsStatus };