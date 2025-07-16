import express from 'express';
import {
  getAllFoods,
  addFood,
  updateFood,
  deleteFood
} from '../controllers/foodController.js';
import { protect, isRestaurant } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

const router = express.Router();

router.use(protect, isRestaurant);

router.get('/', getAllFoods);
router.post('/', upload.single('image'), addFood);
router.put('/:id', upload.single('image'), updateFood);
router.delete('/:id', deleteFood);

export default router;