import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { tenantIsolation } from "../middleware/tenantMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { addUser, listUsers } from "../controllers/userController.js";

const router = express.Router();

router.use(authenticate, tenantIsolation);

router.post(
  "/",
  allowRoles("tenant_admin"),
  addUser
);

router.get(
  "/",
  allowRoles("tenant_admin"),
  listUsers
);

export default router;
