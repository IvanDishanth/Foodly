// routes/webhook.js
import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // secret key from Stripe dashboard

// Use raw bodyParser to read raw request
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ Payment completed:', session);

      // TODO: update MongoDB payment status or order here

      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      try {
        // Use require only (Node.js v22+ supports require for CJS modules)
        const Payment = require('../models/Payment.model.js');
        Payment.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          { status: 'completed' }
        ).then(() => {
          console.log('Payment status updated for PaymentIntent:', paymentIntent.id);
        }).catch(err => {
          console.error('Error updating payment status:', err);
        });
      } catch (err) {
        console.error('Error updating payment status:', err);
      }
      break;
    }
    // Add more event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Acknowledge receipt
  res.json({ received: true });
});

export default router;
