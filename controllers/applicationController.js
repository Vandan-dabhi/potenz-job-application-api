import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { getImageKit } from "../utils/imagekit.js";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    // Logged-in user's ID comes from authMiddleware
    const userId = req.user;

    // Check user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get job ID from URL
    const { jobId } = req.params;

    // Check job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check duplicate application
    const alreadyApplied = await Application.findOne({
      jobId,
      userId,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        message: "You already applied for this job",
      });
    }

    // Resume is required
    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    // Only PDF allowed
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    // Upload resume to ImageKit
    const imagekit = getImageKit();

    const uploadResponse = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `${userId}-${Date.now()}-${req.file.originalname}`,
      folder: "/potenz-resumes",
    });

    // Cover letter is optional
    const coverLetter = req.body.coverLetter || "";

    // Create application
    const application = await Application.create({
      jobId,
      userId,
      resume: uploadResponse.url,
      coverLetter,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// Get logged-in user's applications
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user;

    const applications = await Application.find({
      userId,
    })
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};