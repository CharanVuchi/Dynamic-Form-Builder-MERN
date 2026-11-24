import { Router } from "express";

import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  createSubmission_controller,
  getSubmissions_controller,
  getSubmissionById_controller,
  deleteSubmission_controller,
} from "../controller/submission.js";

const router = Router();

router.use(authenticateToken, authorizeAdmin);

router.post("/", createSubmission_controller);
router.get("/", getSubmissions_controller);
router.get("/:id", getSubmissionById_controller);
router.delete("/:id", deleteSubmission_controller);

export default router;
