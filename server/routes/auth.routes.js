import express from "express";
import { register, login } from '../controllers/auth.controller.js';
import { protect, adminOnly, superAdminOnly } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/superadmin/secret", protect, superAdminOnly, (req, res) => {
  res.json({ message: "Welcome, Superadmin!" });
});


export default router;
