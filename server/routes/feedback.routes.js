import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import { protect, isRestaurant, user, superAdminOnly } from "../middleware/auth.middleware.js";
const router = express.Router();

// Public or Authenticated
router.post("/", protect,user, createFeedback);

// Admin Routes
router.get("/", protect, superAdminOnly, isRestaurant,  getAllFeedbacks);
router.get("/:id", protect, superAdminOnly, getFeedbackById);
router.delete("/:id", protect, superAdminOnly, deleteFeedback);

export default router;