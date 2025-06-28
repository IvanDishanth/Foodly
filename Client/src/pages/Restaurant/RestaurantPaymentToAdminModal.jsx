// src/components/RestaurantPaymentToAdminModal.jsx
import React, { useState } from 'react';

function RestaurantPaymentToAdminModal({ onClose, onPaymentSubmit }) {
  const [amount, setAmount] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [bankName, setBankName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer'); // Default to Bank Transfer

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !transactionRef || !bankName || !paymentMethod) {
      alert('Please fill all required fields.'); // Use custom modal
      return;
    }
    onPaymentSubmit({
      amount: parseFloat(amount),
      transactionRef,
      bankName,
      paymentMethod,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Payment to Superadmin (LKR)</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-gray-300 text-sm font-medium mb-1">Amount (LKR)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000.00"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-gray-300 text-sm font-medium mb-1">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Sampath Bank">Sampath Bank</option>
              <option value="BOC">Bank of Ceylon (BOC)</option>
              <option value="Commercial Bank">Commercial Bank</option>
              <option value="NTB">Nations Trust Bank (NTB)</option>
              <option value="eZ Cash">eZ Cash</option>
              <option value="mCash">mCash</option>
              <option value="Other">Other Local Method</option>
            </select>
          </div>
          <div>
            <label htmlFor="transactionRef" className="block text-gray-300 text-sm font-medium mb-1">Transaction Reference / ID</label>
            <input
              type="text"
              id="transactionRef"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder="e.g., SL123456789"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="bankName" className="block text-gray-300 text-sm font-medium mb-1">Bank Name / Mobile Wallet (If applicable)</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g., Commercial Bank, Dialog eZ Cash"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">Cancel</button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantPaymentToAdminModal;
