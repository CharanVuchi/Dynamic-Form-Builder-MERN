import { Router } from "express";

import { createForm_controller, getForms_controller, getFormById_controller, updateForm_controller, deleteForm_controller } from "../controller/form.js";

import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticateToken, authorizeAdmin);

router.post("/", createForm_controller);

router.get("/", getForms_controller);

router.get("/:id", getFormById_controller);

router.put("/:id", updateForm_controller);

router.delete("/:id", deleteForm_controller);

export default router;
