// // src/components/RestaurantPaymentToAdminModal.jsx (Confirmed No Firebase)
// // This component operates purely on local state and props,
// // with no direct Firebase integration.
// import React, { useState } from 'react';
// import axios from 'axios';
// import API from '../../api/axios';

// // function RestaurantPaymentToAdminModal({ onClose, onPaymentSubmit }) {
// //   const [amount, setAmount] = useState('');
// //   const [transactionRef, setTransactionRef] = useState('');
// //   const [bankName, setBankName] = useState('');
// //   const [paymentMethod, setPaymentMethod] = useState('Bank Transfer'); // Default to Bank Transfer

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!amount || !transactionRef || !bankName || !paymentMethod) {
// //       // In a real application, replace this with a custom, non-alert modal/message
// //       alert('Please fill all required fields.');
// //       return;
// //     }
// //     // Call the onPaymentSubmit prop with the collected data
// //     onPaymentSubmit({
// //       amount: parseFloat(amount),
// //       transactionRef,
// //       bankName,
// //       paymentMethod,
// //       timestamp: new Date().toISOString(),
// //     });
// //   };




//   function RestaurantPaymentToAdminModal({ onClose, onPaymentSubmit, restaurantId }) {
//   const [amount, setAmount] = useState('');
//   const [transactionRef, setTransactionRef] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!restaurantId || !amount || !transactionRef || !bankName || !paymentMethod) {
//     alert("❌ Please fill all required fields.");
//     return;
//   }

//   console.log("Submitting payment data:", {
//     restaurantId,
//     amount,
//     transactionRef,
//     bankName,
//     paymentMethod,
//   });

//   try {
//     const res = await API.post('/payments/manual', {
//       restaurantId,
//       amount: parseFloat(amount),
//       transactionRef,
//       bankName,
//       paymentMethod,
//     });

//     if (res.data.success) {
//       alert('✅ Payment submitted');
//       onPaymentSubmit(res.data.payment);
//       onClose();
//     } else {
//       alert('❌ Payment failed');
//     }
//   } catch (err) {
//     console.error("❌ Payment Error:", err.response?.data || err.message);
//     alert(err.response?.data?.error || 'Something went wrong.');
//   }
// };



//   return (
//     <>
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700 relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
//         <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Payment to Superadmin (LKR)</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="amount" className="block text-gray-300 text-sm mb-1">Amount (LKR)</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="e.g., 5000.00"
//               className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="paymentMethod" className="block text-gray-300 text-sm mb-1">Payment Method</label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
//               required
//             >
//               <option value="Bank Transfer">Bank Transfer</option>
//               <option value="Sampath Bank">Sampath Bank</option>
//               <option value="BOC">Bank of Ceylon (BOC)</option>
//               <option value="Commercial Bank">Commercial Bank</option>
//               <option value="NTB">Nations Trust Bank (NTB)</option>
//               <option value="eZ Cash">eZ Cash</option>
//               <option value="mCash">mCash</option>
//               <option value="Other">Other Local Method</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="transactionRef" className="block text-gray-300 text-sm mb-1">Transaction Reference / ID</label>
//             <input
//               type="text"
//               value={transactionRef}
//               onChange={(e) => setTransactionRef(e.target.value)}
//               placeholder="e.g., SL123456789"
//               className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="bankName" className="block text-gray-300 text-sm mb-1">Bank Name / Mobile Wallet</label>
//             <input
//               type="text"
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//               placeholder="e.g., Commercial Bank, Dialog eZ Cash"
//               className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2 mt-6">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-md">Submit Payment</button>
//           </div>
//         </form>
//       </div>
//     </div>



//     <RestaurantPaymentToAdminModal
//   restaurantId={restaurant._id} // ✅ MUST be defined
//   onClose={handleClose}
//   onPaymentSubmit={handlePaymentSubmit}
// />

//     </>
//   );
// }

// export default RestaurantPaymentToAdminModal;


// src/components/RestaurantPaymentToAdminModal.jsx
import React, { useState } from 'react';
import API from '../../api/axios';

function RestaurantPaymentToAdminModal({ onClose, onPaymentSubmit, restaurantId }) {
  const [amount, setAmount] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [bankName, setBankName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantId || !amount || !transactionRef || !bankName || !paymentMethod) {
      alert("❌ Please fill all required fields.");
      return;
    }

    console.log("Submitting payment data:", {
      restaurantId,
      amount,
      transactionRef,
      bankName,
      paymentMethod,
    });

    try {
      const res = await API.post('/payments/manual', {
        restaurantId,
        amount: parseFloat(amount),
        transactionRef,
        bankName,
        paymentMethod,
      });

      if (res.data.success) {
        alert('✅ Payment submitted');
        onPaymentSubmit(res.data.payment);
        onClose();
      } else {
        alert('❌ Payment failed');
      }
    } catch (err) {
      console.error("❌ Payment Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Payment to Superadmin (LKR)</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Amount (LKR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000.00"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
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
            <label className="block text-gray-300 text-sm mb-1">Transaction Reference / ID</label>
            <input
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder="e.g., SL123456789"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Bank Name / Mobile Wallet</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g., Commercial Bank, Dialog eZ Cash"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded-md">Submit Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantPaymentToAdminModal;
