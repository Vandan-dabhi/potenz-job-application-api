import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", applicationRoutes);

// Basic API health check
app.get("/", (req, res) => {
  res.json({
    message: "Potenz Job Application API is running",
  });
});

// Handle Multer upload errors
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Resume file size must be 2 MB or less",
      });
    }

    return res.status(400).json({
      message: "File upload error",
    });
  }

  next(err);
});

export default app;