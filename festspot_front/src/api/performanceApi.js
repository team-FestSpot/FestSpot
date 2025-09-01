import api, { baseURL } from "./axios";

export const reqPerformanceList = async () =>
  await api.get(`${baseURL}/api/performance`);

export const reqPerformanceDetail = async (performanceId) =>
  await api.get(`/api/performance/${performanceId}`);

export const reqPerformanceCommentRegister = async (data) =>
  await api.post(`/api/performance/comment`, data);

export const reqPerformanceCommentList = async (performanceId) =>
  await api.get(`${baseURL}/api/performance/comment/${performanceId}`);
