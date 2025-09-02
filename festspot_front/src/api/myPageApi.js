import api, { baseURL } from "./axios";

export const reqModifyUserProfileImg = async (file) =>
  await api.put(`/api/user/update/image`, file);

export const reqModifyUserInfo = async (data) =>
  await api.put(`/api/user/update/info`, data);
