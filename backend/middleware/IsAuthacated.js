
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    console.log("========== AUTH CHECK ==========");

    const token = req.cookies?.token;

    console.log("Token exists:", !!token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded token:", decoded);

    req.id = decoded.userId;
    req.role = decoded.role;

    console.log("Authenticated User ID:", req.id);
    console.log("Authenticated Role:", req.role);

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default authenticateToken;

