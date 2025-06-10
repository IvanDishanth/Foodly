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
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// User management routes
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/users/:id", protect, isAdmin, getUserById);
router.delete("/users/:id", protect, isAdmin, deleteUserById);
router.put("/users/:id", protect, isAdmin, updateUserById);

// Restaurant management routes (choose ONE authorization method, not both)

router.get("/restaurants", protect, isAdmin, getAllRestaurants);
router.get("/restaurants/:id", protect, isAdmin, getRestaurantById);
router.put("/restaurants/:id", protect, isAdmin, updateRestaurantById);
router.delete("/restaurants/:id", protect, isAdmin, deleteRestaurantById);
router.post("/restaurants", protect, isAdmin, createRestaurant);

export default router;