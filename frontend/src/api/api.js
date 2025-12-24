import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDashboardStats = () => {
  return api.get("/dashboard/stats");
};

// api.js
export const getProjects = () => {
  return api.get("/projects");
};

export const getProjectById = (projectId) => {
  return api.get(`/projects/${projectId}`);
};

export const getProjectTasks = (projectId) => {
  return api.get(`/projects/${projectId}/tasks`);
};

export const createTask = (projectId, payload) => {
  return api.post(`/projects/${projectId}/tasks`, payload);
};

export const updateTaskStatus = (taskId, status) => {
  return api.patch(`/tasks/${taskId}/status`, { status });
};

export const updateProject = (projectId, payload) => {
  return api.put(`/projects/${projectId}`, payload);
};

export const deleteProject = (projectId) => {
  return api.delete(`/projects/${projectId}`);
};

export const getUsers = (tenantId) => {
  return api.get(`/tenants/${tenantId}/users`);
};

export const createUser = (tenantId, payload) => {
  return api.post(`/tenants/${tenantId}/users`, payload);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};

export default api;
