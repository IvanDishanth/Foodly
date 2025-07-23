// routes/webhookRoutes.js
import express from 'express';
import bodyParser from 'body-parser';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Stripe requires the raw body to validate the signature
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
