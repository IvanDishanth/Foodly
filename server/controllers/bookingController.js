import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

export const createBooking = async (req, res) => {
  const { restaurantId, restaurantName, date, time, guests, specialRequests } = req.body;

  if (!restaurantId || !restaurantName || !date || !time || !guests) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  

  try {
    const newBooking = new Booking({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      restaurantName,
      date,
      time,
      guests,
      specialRequests
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: savedBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};