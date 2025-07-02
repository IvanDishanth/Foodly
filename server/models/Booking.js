import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.Mixed,  // <-- Accepts ObjectId, string, or number
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Booking', bookingSchema);
