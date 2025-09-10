import api from "./axios";

export const reqLogin = async (data) => await api.post("/api/auth/login", data);

export const reqSignup = async (data) =>
  await api.post("/api/auth/signup", data);

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqWithdraw = async (password) =>
  await api.put("/api/auth/withdraw", password);
