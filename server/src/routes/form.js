import { Router } from "express";
import {
  create_form_controller,
  delete_form_controller,
  get_form_controller,
  get_forms_controller,
  update_form_controller,
} from "../controller/form.js";

const router = Router();

router.post("/", create_form_controller);
router.get("/", get_forms_controller);
router.get("/:formId", get_form_controller);
router.put("/:formId", update_form_controller);
router.delete("/:formId", delete_form_controller);

export default router;
