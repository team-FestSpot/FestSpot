import api, { baseURL } from "./axios";

export const reqPerformanceList = async () =>
  await api.get(`${baseURL}/api/performance`);

export const reqPerformanceDetail = async (performanceId) =>
  await api.get(`/api/performance/${performanceId}`);

export const reqPerformanceApiIdList = async () =>
  await api.get("/api/performance/apiId");

export const reqPerformanceCommentRegister = async (data) =>
  await api.post(`/api/performance/comment`, data);

export const reqPerformanceCommentList = async (performanceId) =>
  await api.get(`/api/performance/comment/${performanceId}`);

export const reqPerformanceCommentDelete = async (performanceCommentId) => {
  await api.put(`/api/performance/comment/delete/${performanceCommentId}`);
};
