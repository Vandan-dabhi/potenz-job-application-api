import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if JWT cookie exists
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Verify JWT using our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store logged-in user's ID for controllers
    req.user = decoded.userId;

    // Continue to the protected route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;