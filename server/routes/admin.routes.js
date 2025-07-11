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
  user,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// ────────────────────────────────────────────────
// 🔹 USER MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAdminOnly, deleteUserById);
router.put("/users/:id", protect, superAdminOnly, updateUserById);


// ────────────────────────────────────────────────
// 🔹 RESTAURANT MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/restaurants", protect, superAdminOnly, user, getAllRestaurants);
router.get("/restaurants/:id", protect, superAdminOnly, getRestaurantById);
router.get("/restaurant", protect, isRestaurant, getRestaurantByAdmin);  // Restaurant's own dashboard
router.put("/restaurants/:id", protect, superAdminOnly, updateRestaurantById);
router.delete("/restaurants/:id", protect, superAdminOnly, isRestaurant, deleteRestaurantById);
router.post("/restaurants", protect, superAdminOnly, isRestaurant, createRestaurant);
router.put("/restaurants/:id/status", protect, isRestaurant, updateRestaurantStatus);
router.put("/restaurants/:id/role", protect, superAdminOnly, isRestaurant, changeRestaurantRole);


// ────────────────────────────────────────────────
// 🔹 BOOKING MANAGEMENT ROUTES
// ────────────────────────────────────────────────
router.get("/bookings", protect, superAdminOnly, isRestaurant, getAllBookings);
router.put("/bookings/:id/status", protect, superAdminOnly, isRestaurant, updateBookingStatus);

router.get('/restaurant', protect, isRestaurant, getRestaurantByAdmin);


export default router;