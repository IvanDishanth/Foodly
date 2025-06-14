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

// adminOnly middleware: checks if user is admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};

// Superadmin-only middleware
export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Superadmin access denied" });
  }
};

// user-only middleware
export const user = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({ message: "user access denied" });
  }
};

export const superAadminOradmin = (req, res, next) => {
  if (req.user && (req.user.role === "superadmin" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

export const superAadminOruser = (req, res, next) => {
  if (req.user && (req.user.role === "superadmin" || req.user.role === "user")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};