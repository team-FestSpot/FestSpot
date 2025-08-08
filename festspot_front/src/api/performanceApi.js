import api, { baseURL } from "./axios";

export const reqPerformanceList = async () =>
  await api.get(`${baseURL}/api/performance`);
