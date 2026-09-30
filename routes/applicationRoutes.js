import express from "express";

import { applyJob, getMyApplications,} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/jobs/:jobId/apply",authMiddleware,upload.single("resume"),applyJob);
router.get( "/applications/my", authMiddleware, getMyApplications);

export default router;