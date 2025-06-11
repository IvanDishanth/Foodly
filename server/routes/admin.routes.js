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
  deleteRestaurantById
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// User management routes
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getUserById);
router.delete("/users/:id", protect, adminOnly, deleteUserById);
router.put("/users/:id", protect, adminOnly, updateUserById);

// Restaurant management routes
router.get("/restaurants", protect, adminOnly, getAllRestaurants);
router.get("/restaurants/:id", protect, adminOnly, getRestaurantById);
router.put("/restaurants/:id", protect, adminOnly, updateRestaurantById);
router.delete("/restaurants/:id", protect, adminOnly, deleteRestaurantById);
router.post("/restaurants", protect, adminOnly, createRestaurant);

export default router;