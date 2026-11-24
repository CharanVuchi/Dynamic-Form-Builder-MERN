import { Router } from "express";

import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import { getDashboard_controller } from "../controller/dashboard.js";

const router = Router();

router.use(authenticateToken, authorizeAdmin);

router.get("/", getDashboard_controller);

export default router;
