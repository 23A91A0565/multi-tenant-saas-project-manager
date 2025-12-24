import api from "./api";

export const getMe = () => {
  return api.get("/auth/me");
};
