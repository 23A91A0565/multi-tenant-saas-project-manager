import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// ❌ DO NOT add authenticate here
router.post("/login", login);

export default router;
