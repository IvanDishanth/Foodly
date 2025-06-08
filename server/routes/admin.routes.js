import express from "express";
import { getAllUsers, getUserById, deleteUserById, updateUserById } from "../controllers/admin.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/users/:id", protect, isAdmin, getUserById);
router.delete("/users/:id", protect, isAdmin, deleteUserById);
router.put("/users/:id", protect, isAdmin, updateUserById);

export default router;