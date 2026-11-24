import { Router } from "express";
import userRoutes from "./user.js";
import formRoutes from "./form.js";
import publicFormRoutes from "./publicForm.js";
import submissionsRoutes from "./submissions.js";
import publicSubmissionsRoutes from "./publicSubmissions.js";

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

// Admin Form APIs
router.use("/forms", formRoutes);

// Public Form APIs
router.use("/public/forms", publicFormRoutes);

// Admin Submissions APIs
router.use("/submissions", submissionsRoutes);

// Public Submissions APIs
router.use("/public/submissions", publicSubmissionsRoutes);

export default router;
