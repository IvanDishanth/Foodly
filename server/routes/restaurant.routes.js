import express from "express";
import {
  updateRestaurantStatus,
  getRestaurantByAdmin,
} from "../controllers/admin.controller.js";
import { toggleRestaurantStatus } from "../controllers/admin.controller.js";
import {
  protect,
  isRestaurant,
  isRestaurantOrAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, isRestaurant, getRestaurantByAdmin);
router.put(
  "/status",
  protect,
  isRestaurant,
  toggleRestaurantStatus
);

export default router;