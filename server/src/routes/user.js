import { Router } from "express";
import { login_controller } from "../controller/user";

const router = Router();

router.post("/login", userController.login_controller);

export default router;
