import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);
router.delete("/delete", protect, deleteUser);
router.post("/logout", protect, logoutUser);

export default router;