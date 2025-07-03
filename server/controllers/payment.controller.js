import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.error("❌ STRIPE_SECRET_KEY is not defined in your .env file");
}

export const createPaymentIntent = async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ success: false, error: "Stripe has not been initialized." });
  }

  try {
    const { amount, currency = "inr" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
