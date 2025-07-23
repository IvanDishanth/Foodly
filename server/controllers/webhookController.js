// controllers/webhookController.js
import Stripe from 'stripe';
import Payment from '../models/Payment.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Secret key from Stripe dashboard

export const handleStripeWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ Payment completed:', session);
      // TODO: Store or update order/payment in DB here
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { status: 'completed' }
      )
        .then(() => {
          console.log('✅ Payment status updated for:', paymentIntent.id);
        })
        .catch((err) => {
          console.error('❌ Error updating payment status:', err);
        });
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
