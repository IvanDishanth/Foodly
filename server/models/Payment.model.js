import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'usd',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
