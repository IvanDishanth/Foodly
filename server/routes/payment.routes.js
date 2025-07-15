import express from 'express';
import { createPaymentIntent, getAllPayments , confirmManualPayment} from "../controllers/payment.controller.js";
import { protect, superAdminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create payment intent
// router.post('/create-payment-intent', protect, createPaymentIntent);

// // ✅ Add this route for SuperAdmin to fetch all payments
// router.get('/', protect, superAdminOnly, getAllPayments);

router.post('/manual', confirmManualPayment);
router.post('/create-payment-intent', createPaymentIntent);
router.get('/', getAllPayments);
 

export default router;
