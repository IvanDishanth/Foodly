import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect middleware: verifies JWT from Authorization header
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(440).json({ message: "Session expired" });
  }
};

// isAdmin middleware: checks if user is admin
export const isAdmin = (req, res, next) => {
  console.log("isAdmin req.user:", req.user); // Debug log
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};