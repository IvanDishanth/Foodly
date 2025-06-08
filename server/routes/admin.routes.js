import express from "express";
import { getAllUsers, getUserById, deleteUserById, updateUserById } from "../controllers/admin.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById
} from "../controllers/admin.controller.js";



const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/users/:id", protect, isAdmin, getUserById);
router.delete("/users/:id", protect, isAdmin, deleteUserById);
router.put("/users/:id", protect, isAdmin, updateUserById);


router.get("/restaurants", protect, isAdmin, getAllRestaurants);
router.get("/restaurants/:id", protect, isAdmin, getRestaurantById);
router.put("/restaurants/:id", protect, isAdmin, updateRestaurantById);
router.delete("/restaurants/:id", protect, isAdmin, deleteRestaurantById);



export default router;