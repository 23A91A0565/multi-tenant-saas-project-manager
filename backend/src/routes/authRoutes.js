import express from "express";
import { registerTenant, login } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register-tenant", registerTenant);
router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

router.post("/logout", authenticate, (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
