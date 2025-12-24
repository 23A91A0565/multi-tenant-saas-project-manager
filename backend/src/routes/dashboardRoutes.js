import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.use(requireAuth, tenantIsolation);

router.get("/stats", getDashboardStats);

export default router;
