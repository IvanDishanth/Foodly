import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  restaurantName: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Cancelled', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);