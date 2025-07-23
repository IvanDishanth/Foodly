// src/components/RestaurantPaymentToAdminModal.jsx
import React, { useState } from 'react';
import API from '../../api/axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripePaymentForm({ amount, restaurantId, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    // Defensive: ensure amount and restaurantId are valid before API call
    if (!amount || isNaN(amount) || !restaurantId) {
      setError('Amount and restaurant ID are required');
      setProcessing(false);
      return;
    }
    try {
      // 1. Create PaymentIntent on backend
      const res = await API.post('/payments/create-payment-intent', {
        amount: parseFloat(amount),
        restaurantId: restaurantId
      });
      const clientSecret = res.data.clientSecret;
      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleStripePayment} className="space-y-4">
      <CardElement className="p-2 bg-gray-700 text-white rounded" />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-end space-x-2 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-md" disabled={processing}>
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}

function RestaurantPaymentToAdminModal({ onClose, onPaymentSubmit, restaurantId }) {
  const [amount, setAmount] = useState('');
  const [showStripe, setShowStripe] = useState(true); // Always show Stripe

  // Only show checkout if amount is valid
  const isAmountValid = amount && !isNaN(amount) && parseFloat(amount) > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Payment to Superadmin (LKR)</h3>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Amount (LKR)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="e.g., 5000.00"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
              min="1"
            />
          </div>
        </form>
        {isAmountValid && (
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              amount={parseFloat(amount) || 0}
              restaurantId={restaurantId}
              onSuccess={() => {
                alert('✅ Card payment successful!');
                onPaymentSubmit();
                onClose();
              }}
              onCancel={onClose}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default RestaurantPaymentToAdminModal;
