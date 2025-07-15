// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// // controllers/payment.controller.js
// import Payment from '../models/Payment.model.js';

// dotenv.config();

// let stripe;
// if (process.env.STRIPE_SECRET_KEY) {
//   stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// } else {
//   console.error("❌ STRIPE_SECRET_KEY is not defined in your .env file");
// }

// export const createPaymentIntent = async (req, res) => {
//   if (!stripe) {
//     return res.status(500).json({ success: false, error: "Stripe has not been initialized." });
//   }

//   try {
//     const { amount, currency = "inr" } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ success: false, error: "Invalid amount" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method_types: ['card'],
//     });

//     res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };




// export const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().populate('restaurant');
//     res.status(200).json(payments);
//   } catch (err) {
//     console.error('Error fetching payments:', err);
//     res.status(500).json({ message: 'Failed to fetch payments' });
//   }
// };




// controllers/payment.controller.js
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Payment from '../models/Payment.model.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE Stripe PaymentIntent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'lkr', restaurantId } = req.body;

    if (!amount || !restaurantId) {
      return res.status(400).json({ success: false, error: 'Amount and restaurant ID required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: ['card'],
    });

    // Save payment with status "pending"
    const payment = new Payment({
      restaurant: restaurantId,
      amount,
      currency,
      status: 'pending',
      stripePaymentIntentId: paymentIntent.id,
    });

    await payment.save();

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CONFIRM & STORE Manual (non-Stripe) payment
export const confirmManualPayment = async (req, res) => {
  try {
    const { amount, restaurantId, transactionRef, bankName, paymentMethod } = req.body;

    // ✅ Add debug logging here to trace the issue
    if (!amount || !restaurantId || !transactionRef || !bankName || !paymentMethod) {
      console.log("❌ Missing fields:", {
        amount,
        restaurantId,
        transactionRef,
        bankName,
        paymentMethod,
      });
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const payment = new Payment({
      restaurant: restaurantId,
      amount,
      currency: 'lkr',
      transactionRef,
      bankName,
      paymentMethod,
      status: 'completed',
      timestamp: new Date(),
    });

    await payment.save();

    res.status(201).json({ success: true, message: 'Manual payment recorded', payment });
  } catch (err) {
    console.error("❌ Server error in confirmManualPayment:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};



// GET All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('restaurant');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};
