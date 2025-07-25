// routes/tableRoutes.js
import express from 'express';
import {
  createTable,
  getTables,
  updateTable,
  deleteTable,
} from '../controllers/tableController.js';

import { protect, isRestaurant } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Middleware to protect and allow only restaurant users
router.use(protect, isRestaurant);

// @route   GET /api/tables/
// @desc    Get all tables for logged-in restaurant
router.get('/', getTables);

// @route   POST /api/tables/
// @desc    Create a new table with optional image
router.post('/', upload.single('image'), createTable);

// @route   PUT /api/tables/:id
// @desc    Update a table by ID with optional image
router.put('/:id', upload.single('image'), updateTable);

// @route   DELETE /api/tables/:id
// @desc    Delete a table by ID
router.delete('/:id', deleteTable);

export default router;
