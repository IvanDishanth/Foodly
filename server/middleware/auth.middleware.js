import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect middleware: verifies JWT from Authorization header
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// adminOnly middleware: checks if user is admin
export const isRestaurant = (req, res, next) => {
  if (req.user && (req.user.role === "restaurant" || req.user.role === "partner")) {
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

export const superAdminOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "superadmin" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

export const superAdminOrUser = (req, res, next) => {
  if (req.user && (req.user.role === "superadmin" || req.user.role === "user")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
