import { Router } from "express";

import { getPublicForm_controller } from "../controller/form.js";

const router = Router();

router.get("/:formId", getPublicForm_controller);

export default router;
