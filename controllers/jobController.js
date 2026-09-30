import Job from "../models/Job.js";

// Get all available jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};