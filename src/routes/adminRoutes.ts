import express from "express";
import { verifyCustomer } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Super Admin verifies a corporate Admin
router.patch(
  "/verify/:adminId",
  authenticateUser,
  authorizeRoles(["SUPER_ADMIN"]),
  verifyCustomer
);

export default router;
