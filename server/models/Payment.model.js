// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   restaurant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Restaurant',
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: 'usd',
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending',
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   stripePaymentIntentId: {
//     type: String,
//     required: true,
//   }
// }, { timestamps: true });

// export default mongoose.model('Payment', paymentSchema);



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
    default: 'lkr',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed', // for manual
  },
  stripePaymentIntentId: String,

  // Manual payment fields
  transactionRef: String,
  bankName: String,
  paymentMethod: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
