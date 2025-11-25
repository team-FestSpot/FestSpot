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

export const reqGetApiPerformanceListApi = () => {
  return api.get("/admin/list/api");
};

export const reqGetCustomPerformanceListApi = () => {
  return api.get("/admin/list/custom");
};

export const reqModifyCustomPerformanceApi = (data) => {
  return api.put("/admin/update/custom", data);
};

export const reqDeletePerformanceApi = (id) => {
  return api.delete(`/admin/delete/performance/${id}`);
};

export const reqUserListApi = () => {
  return api.get("/admin/user/list");
};

export const reqUserInfoUpdateApi = (data) => {
  return api.put("/admin/update/user", data);
};

export const reqDeleteUserApi = (userId) => {
  return api.put(`/admin/delete/user/${userId}`);
};
