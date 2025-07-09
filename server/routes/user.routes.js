import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser,
  getAllRestaurantsForUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import multer from 'multer';



// In user.routes.js
import { authenticate, verifyToken } from "../middleware/auth.js";


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

// Remove duplicate routes and organize properly
router.route('/')
  .put(protect, upload.single('profilePic'), updateUserProfile)
  .delete(protect, deleteUser);

  

router.get('/user', authenticate, getUserProfile);

router.post("/logout", protect, logoutUser);

router.get("/restaurants", getAllRestaurantsForUser);


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