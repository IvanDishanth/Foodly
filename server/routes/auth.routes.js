import express from "express";
import { register,registerRestaurant, loginUser , loginRestaurant } from '../controllers/auth.controller.js';
import { protect, isRestaurant, superAdminOnly } from "../middleware/auth.middleware.js";



const router = express.Router();

router.post("/register", register);
router.post("/register-restaurant", registerRestaurant);
router.post("/login-restaurant", loginRestaurant);
router.post("/login-user", loginUser);
router.get("/superadmin/secret", protect, superAdminOnly, (req, res) => {
  res.json({ message: "Welcome, Superadmin!" });
});

router.post('/restaurant/login', loginRestaurant); // your login endpoint

export default router;