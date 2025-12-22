import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import { createProject, listProjects } from "../controllers/projectController.js";

const router = express.Router();

router.use(authenticate, tenantIsolation);

router.post("/", createProject);
router.get("/", listProjects);

export default router;
