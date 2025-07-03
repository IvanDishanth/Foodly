import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurantById,
  updateRestaurantById,
  updateRestaurantStatus,
  changeRestaurantRole,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/admin.controller.js";
import { protect,superAdminOnly, adminOnly,superAdminOrAdmin,superAdminOrUser } from "../middleware/auth.middleware.js";


const router = express.Router();

// User management routes
router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAdminOrUser, deleteUserById);
router.put("/users/:id", protect, superAdminOrUser, updateUserById);

// Restaurant management routes
router.get("/restaurants", protect, superAdminOrUser, getAllRestaurants);
router.get("/restaurants/:id", protect, superAdminOnly, getRestaurantById);
router.put("/restaurants/:id", protect, superAdminOnly, updateRestaurantById);
router.delete("/restaurants/:id", protect, superAdminOrAdmin, deleteRestaurantById);
router.post("/restaurants", protect, superAdminOrAdmin, createRestaurant);
router.put("/restaurants/:id/status", protect,adminOnly, updateRestaurantStatus);
router.put("/restaurants/:id/role",protect, superAdminOrAdmin, changeRestaurantRole);







// Booking management routes
router.get("/bookings", protect, adminOnly, getAllBookings);
router.put("/bookings/:id/status", protect, adminOnly, updateBookingStatus);




export default router;
