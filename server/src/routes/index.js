import { Router } from "express";
import userRoutes from "./user";

const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    code: 200,
    message: "Server is healthy",
    env: "LOCAL",
  });
});

router.use("/user", userRoutes);

export default router;
