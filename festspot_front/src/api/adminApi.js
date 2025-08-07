import api from "./axios";

export const reqUploadPerformanceApi = (detail) => {
  return api.post("/admin/upload", detail);
};
