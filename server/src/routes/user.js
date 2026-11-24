import { Router } from "express";
import { login_controller, register_controller } from "../controller/user.js";

const router = Router();

router.post("/login", login_controller);
router.post("/register", register_controller);

export default router;
