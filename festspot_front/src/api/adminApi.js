import api from "./axios";
import { reqPublicDetailApi } from "./publicDetailApi";

export const reqUploadPerformanceApi = (performanceApiId) => {
  return api.post("/admin/upload", reqPublicDetailApi(performanceApiId));
};
