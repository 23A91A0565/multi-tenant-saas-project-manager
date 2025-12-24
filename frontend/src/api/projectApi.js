import api from "./api";

export const getProjects = () => {
  return api.get("/projects");
};
