import express from 'express';
import {
  getTablesByRestaurant,
  addTable,
  updateTable,
  deleteTable
} from '../controllers/tableController.js';
import { protect, isRestaurantOrAdmin } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

const router = express.Router();

router.use(protect, isRestaurantOrAdmin);

router.get('/', getTablesByRestaurant);
router.post('/', upload.single('image'), addTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);

export default router;
