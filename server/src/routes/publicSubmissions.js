import { Router } from "express";

import { createPublicSubmission_controller } from "../controller/submission.js";

const router = Router();

router.post("/forms/:formId/submissions", createPublicSubmission_controller);

export default router;
