import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
  getAllRestaurantsForUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);
router.delete("/delete", protect, deleteUser);
router.post("/logout", protect, logoutUser);
router.get("/restaurants", getAllRestaurantsForUser);

export default router;