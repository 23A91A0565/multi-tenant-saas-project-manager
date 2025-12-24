import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import {
  createTask,
  listTasks,
  updateTaskStatus,
  updateTask
} from "../controllers/taskController.js";

const router = express.Router();

// 🔒 Protected
router.use(requireAuth, tenantIsolation);

// project-based
router.post("/projects/:projectId/tasks", createTask);
router.get("/projects/:projectId/tasks", listTasks);

// task-based
router.patch("/tasks/:taskId/status", updateTaskStatus);
router.put("/tasks/:taskId", updateTask);

export default router;
