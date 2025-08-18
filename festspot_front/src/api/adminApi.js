import api from "./axios";

export const reqUploadPerformanceApi = (detail) => {
  return api.post("/admin/upload", detail);
};

export const reqUploadManyPerformanceApi = (details) => {
  return api.post("/admin/uploads", details);
};

export const reqUploadCustomPerformanceApi = (data) => {
  return api.post("/admin/upload/custom", data);
};
