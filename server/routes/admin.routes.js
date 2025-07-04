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
} from "../controllers/admin.controller.js";

import {
  protect,
  superAdminOnly,
  isRestaurant,
  superAdminOrAdmin,
  superAdminOrUser
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ────────────────────────────────────────────────
// 🔹 USER MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAdminOrUser, deleteUserById);
router.put("/users/:id", protect, superAdminOrUser, updateUserById);


// ────────────────────────────────────────────────
// 🔹 RESTAURANT MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/restaurants", protect, superAdminOrUser, getAllRestaurants);
router.get("/restaurants/:id", protect, superAdminOnly, getRestaurantById);
router.get("/restaurant", protect, isRestaurant, getRestaurantByAdmin);  // Restaurant's own dashboard
router.put("/restaurants/:id", protect, superAdminOnly, updateRestaurantById);
router.delete("/restaurants/:id", protect, superAdminOrAdmin, deleteRestaurantById);
router.post("/restaurants", protect, superAdminOrAdmin, createRestaurant);
router.put("/restaurants/:id/status", protect, isRestaurant, updateRestaurantStatus);
router.put("/restaurants/:id/role", protect, superAdminOrAdmin, changeRestaurantRole);


// ────────────────────────────────────────────────
// 🔹 BOOKING MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/bookings", protect, superAdminOrAdmin, getAllBookings);
router.put("/bookings/:id/status", protect, superAdminOrAdmin, updateBookingStatus);

router.get('/restaurant', protect, isRestaurant, getRestaurantByAdmin);


export default router;
