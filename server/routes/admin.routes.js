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
  // updateHotelStatus, // Uncomment if you have this function
} from "../controllers/admin.controller.js";
import { protect,superAdminOnly, adminOnly,superAadminOradmin,superAadminOruser } from "../middleware/auth.middleware.js";


const router = express.Router();

// User management routes
router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/users/:id", protect, superAdminOnly, getUserById);
router.delete("/users/:id", protect, superAadminOruser, deleteUserById);
router.put("/users/:id", protect, superAadminOruser, updateUserById);

// Restaurant management routes
router.get("/restaurants", protect, superAadminOruser, getAllRestaurants);
router.get("/restaurants/:id", protect, superAdminOnly, getRestaurantById);
router.put("/restaurants/:id", protect, superAdminOnly, updateRestaurantById);
router.delete("/restaurants/:id", protect, superAadminOradmin, deleteRestaurantById);
router.post("/restaurants", protect, superAadminOradmin, createRestaurant);
router.put("/restaurants/:id/status", protect,adminOnly, updateRestaurantStatus);
router.put("/restaurants/:id/role",protect, superAadminOradmin, changeRestaurantRole);







export default router;
