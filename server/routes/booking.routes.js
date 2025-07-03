import express from 'express';
import {
  createBooking,
  getUserBookings,
  getRestaurantBookings,
  updateBookingStatus,
  updateBooking,
  deleteBooking
} from '../controllers/booking.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// All routes below require auth
router.use(verifyToken);

router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/restaurant/:restaurantId', getRestaurantBookings); // ✅ make sure param name exists
router.patch('/:id/status', updateBookingStatus);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
