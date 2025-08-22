import api from "./axios";

export const reqLogin = async (data) =>
  await api.post("/api/auth/signup", data);
