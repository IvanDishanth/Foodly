import express from 'express';
import {
  createBooking,
  getAllBookings,
  getRestaurantBookings,
  updateBookingStatus,
  getUserBookings,
  updateBooking,
  deleteBooking
} from '../controllers/booking.controller.js';
import { protect,superAdminOnly, } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes below require auth
router.use(protect);

router.post('/', protect, createBooking);
router.get('/', protect, superAdminOnly, getAllBookings); // ✅ Allows all logged-in users
router.get('/user', protect, getUserBookings);
router.get('/restaurant/:restaurantId', getRestaurantBookings); // ✅ make sure param name exists
router.patch('/:id/status', updateBookingStatus);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;