import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import {
  createTask,
  listTasks,
  updateTaskStatus,
  updateTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authenticate, tenantIsolation);

// project-based task routes
router.post("/projects/:projectId/tasks", createTask);
router.get("/projects/:projectId/tasks", listTasks);

// task-based routes
router.patch("/tasks/:taskId/status", updateTaskStatus);
router.put("/tasks/:taskId", updateTask);   // ✅ THIS WAS MISSING OR NOT LOADED

export default router;
