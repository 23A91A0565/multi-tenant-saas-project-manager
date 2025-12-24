import express from "express";
import { login } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/authController.js";

const router = express.Router();

// ❌ DO NOT add authenticate here
router.post("/login", login);
router.get("/me", requireAuth, getMe);

export default router;
