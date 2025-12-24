import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import {
  createProject,
  listProjects
} from "../controllers/projectController.js";

const router = express.Router();

router.use(requireAuth, tenantIsolation);

router.post("/", createProject);
router.get("/", listProjects);

export default router;
