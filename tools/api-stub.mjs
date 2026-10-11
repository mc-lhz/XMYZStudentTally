export const http = {
  get: () => Promise.resolve({ data: { code: 200, data: [], message: "success" } }),
  post: () => Promise.resolve({ data: { code: 200, data: {}, message: "success" } }),
  put: () => Promise.resolve({ data: { code: 200, data: {}, message: "success" } }),
  delete: () => Promise.resolve({ data: { code: 200, data: null, message: "success" } }),
};
export function tallyActivityWsUrl(activityId) {
  return "ws://localhost:5000/ws/tally/activity/" + activityId;
}
export function getAdminTallyActivities() { return http.get("/admin/tally/activities"); }
export function getAdminTallyActivitiesById(id) { return http.get(`/admin/tally/activities/${id}`); }
export function createAdminTallyActivities(title) { return http.post("/admin/tally/activities", { title }); }
export function updateAdminTallyActivities(id, patch) { return http.put(`/admin/tally/activities/${id}`, patch); }
export function deleteAdminTallyActivities(id) { return http.delete(`/admin/tally/activities/${id}`); }
export function createAdminTallyActivitiesCandidates(id, c) { return http.post(`/admin/tally/activities/${id}/candidates`, c); }
export function updateAdminTallyCandidates(id, c) { return http.put(`/admin/tally/candidates/${id}`, c); }
export function deleteAdminTallyCandidates(id) { return http.delete(`/admin/tally/candidates/${id}`); }
export function voteAdminTallyCandidates(id, delta) { return http.post(`/admin/tally/candidates/${id}/vote`, { delta }); }
export function undoAdminTallyActivities(id) { return http.post(`/admin/tally/activities/${id}/undo`); }
export function getAdminTallyActivitiesRecords(id) { return http.get(`/admin/tally/activities/${id}/records`); }