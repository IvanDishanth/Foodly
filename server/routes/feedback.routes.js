import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public or Authenticated
router.post("/", protect, createFeedback);

// Admin Routes
router.get("/", protect, adminOnly, getAllFeedbacks);
router.get("/:id", protect, adminOnly, getFeedbackById);
router.delete("/:id", protect, adminOnly, deleteFeedback);

export default router;