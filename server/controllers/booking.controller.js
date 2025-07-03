import Booking from '../models/Booking.model.js';

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { restaurantId, restaurantName, date, time, guests, specialRequests } = req.body;

    if (!restaurantId || !restaurantName || !date || !time || !guests) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const newBooking = new Booking({
      restaurantId,
      restaurantName,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      date,
      time,
      guests,
      specialRequests: specialRequests || '',
      status: 'Pending'
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, data: savedBooking });

  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// Get bookings for logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ date: 1, time: 1 })
      .populate('restaurantId', 'name address');

    res.json({ success: true, count: bookings.length, data: bookings });

  } catch (err) {
    console.error('Get user bookings error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// Get bookings for a specific restaurant
export const getRestaurantBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ restaurantId: req.params.restaurantId })
      .sort({ date: 1, time: 1 })
      .populate('userId', 'name email');

    res.json({ success: true, count: bookings.length, data: bookings });

  } catch (err) {
    console.error('Get restaurant bookings error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// Update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Accepted', 'Cancelled', 'Completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only restaurant owners/admin should update status — add check if needed

    booking.status = status;
    const updatedBooking = await booking.save();

    res.json({ success: true, message: 'Booking status updated', data: updatedBooking });

  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// Update booking details (user only)
export const updateBooking = async (req, res) => {
  try {
    const { date, time, guests, specialRequests } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this booking' });
    }

    if (date) booking.date = date;
    if (time) booking.time = time;
    if (guests) booking.guests = guests;
    if (specialRequests !== undefined) booking.specialRequests = specialRequests;

    // Reset status if key fields changed
    if (date || time || guests) {
      booking.status = 'Pending';
    }

    const updatedBooking = await booking.save();
    res.json({ success: true, message: 'Booking updated', data: updatedBooking });

  } catch (err) {
    console.error('Update booking error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// Delete booking (user only)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this booking' });
    }

    await booking.deleteOne();

    res.json({ success: true, message: 'Booking removed', data: booking });

  } catch (err) {
    console.error('Delete booking error:', err);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
