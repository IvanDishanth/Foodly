import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Restaurant from "../models/restaurant.model.js";

/**
 * Middleware: Verifies JWT and attaches user info to req.user
 */
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED JWT:', decoded); // Log the token to see its structure
    req.user = decoded; // decoded should have .id and .role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware: Allows only restaurant users
 */
export const isRestaurant = async (req, res, next) => {
  // The 'protect' middleware has already run and attached the user to the request.
  // The decoded token for a restaurant user has the restaurant's ID, not a user's ID.
  if (req.user && req.user.role === 'restaurant') {
    req.user.restaurantId = req.user.id; // The ID from the token *is* the restaurant ID.
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Not a restaurant user.' });
  }
};

/**
 * Middleware: Allows only superadmin users
 */
export const superAdminOnly = (req, res, next) => {
  console.log("User role:", req.user?.role);
  if (req.user?.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied: Not a superadmin" });
  }
  next();
};

// user-only middleware
export const user = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    res.status(403).json({ message: "user access denied" });
  }
};
export const isRestaurantOrAdmin = async (req, res, next) => {
  console.log("Role in token:", req.user?.role);
  if (req.user && (req.user.role === 'restaurant' || req.user.role === 'admin' || req.user.role === 'superadmin')) {
    if (req.user.role === 'restaurant') {
      req.user.restaurantId = req.user.id;
    }
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Not a restaurant or admin user.' });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    console.log("Decoded JWT:", req.user); // See what is in the token
    const user = await User.findById(req.user.id);
    console.log("User from DB:", restaurants); // See what is in the DB
    if (user && user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};