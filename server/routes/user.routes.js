import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
  getAllRestaurantsForUser,
  getRestaurantDetailsForUser,
  getAllFoodsForUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import multer from 'multer';
import { getRestaurantById } from "../controllers/admin.controller.js";


// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only allow single file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const router = express.Router();

// Get user profile
router.get("/", protect, getUserProfile);

// Update user profile
router.put("/profile", protect, upload.single('profilePic'), updateUserProfile);

// Delete user profile
router.delete("/profile", protect, deleteUser);

// Logout
router.post("/logout", logoutUser);

// Get all restaurants for user
router.get("/restaurants", getAllRestaurantsForUser);
router.get("/restaurants/:id", getRestaurantDetailsForUser);

// Get all food items for user
router.get("/foods", getAllFoodsForUser);


// Add test route for debugging
router.put("/test", protect, upload.single('profilePic'), (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('File:', req.file ? req.file.originalname : 'No file uploaded');
  res.json({
    success: true,
    received: {
      body: req.body,
      file: req.file ? req.file.originalname : null
    }
  });
});

export default router;