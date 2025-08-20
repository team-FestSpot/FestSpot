import api from "./axios";

export const reqLogin = async (data) => await api.post("/api/auth/login", data);

export const reqSignUp = async (data) => await api.post("/api/auth/signup", data);