import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  updateRestaurantStatus,
  getAllBookings,
  // updateHotelStatus, // Uncomment if you have this function
} from "../controllers/admin.controller.js";
import { protect, adminOnly,superAdminOnly,superAadminOradmin,superAadminOruser } from "../middleware/auth.middleware.js";


const router = express.Router();

// User management routes
router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAadminOruser, deleteUserById);
router.put("/users/:id", protect, superAadminOruser, updateUserById);

// Restaurant management routes
router.get("/restaurants", protect, superAadminOruser, getAllRestaurants);
router.get("/restaurants/:id", protect, superAdminOnly, getRestaurantById);
router.put("/restaurants/:id/status", protect, superAadminOradmin, updateRestaurantStatus);
router.delete("/restaurants/:id", protect, superAadminOradmin, deleteRestaurantById);
router.post("/restaurants", protect, superAadminOradmin, createRestaurant);
router.get("/admin/bookings", protect, superAadminOradmin, getAllBookings);

export default router;