import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByAdmin,
  deleteRestaurantById,
  updateRestaurantById,
  updateRestaurantStatus,
  changeRestaurantRole,
  updateBookingStatus,
  getAllBookings,
  toggleRestaurantStatus,
} from "../controllers/admin.controller.js";

import {
  protect,
  superAdminOnly,
  isRestaurant,
  user,
  isRestaurantOrAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ────────────────────────────────────────────────
// 🔹 USER MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get('/users', protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAdminOnly, deleteUserById);
router.put("/users/:id", protect, superAdminOnly, updateUserById);


// ────────────────────────────────────────────────
// 🔹 RESTAURANT MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/restaurants", protect, superAdminOnly, getAllRestaurants);
// router.get("/restaurants/:id", getRestaurantById);
router.get("/restaurant", protect, getRestaurantByAdmin);  // Restaurant's own dashboard
router.put("/restaurants/:id", protect, superAdminOnly, updateRestaurantById);
// router.put("/restaurants/status", protect, isRestaurant, toggleRestaurantStatus);
router.delete("/restaurants/:id", protect, superAdminOnly, deleteRestaurantById);
router.post("/restaurants", protect, superAdminOnly, createRestaurant);


// ────────────────────────────────────────────────
// 🔹 BOOKING MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/bookings", protect, superAdminOnly, getAllBookings);


router.get('/restaurant', protect, isRestaurant, getRestaurantByAdmin);

export default router;