import express from "express";
import { createSubUser } from "../controllers/subUserController";
import { authenticateUser } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Only Admins can create sub-users
router.post("/", authenticateUser, authorizeRoles(["ADMIN"]), createSubUser);

export default router;
