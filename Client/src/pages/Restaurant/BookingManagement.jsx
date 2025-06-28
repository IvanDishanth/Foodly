// src/components/BookingManagement.jsx
import React, { useState } from 'react';
// import PaymentModal from './PaymentModal'; // Removed import as payment is moved

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 1, userName: 'John Doe', date: '2025-07-01', time: '19:00', guests: 4, status: 'Pending', table: 'Table 2 (Booth)' },
    { id: 2, userName: 'Jane Smith', date: '2025-07-02', time: '12:30', guests: 2, status: 'Accepted', table: 'Table 1 (Window)' },
    { id: 3, userName: 'Alice Brown', date: '2025-07-03', time: '20:00', guests: 5, status: 'Pending', table: 'Patio Table 1' },
  ]);

  // const [showPaymentModal, setShowPaymentModal] = useState(false); // Removed state
  // const [selectedBookingForPayment, setSelectedBookingForPayment] = useState(null); // Removed state

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    // Send update to backend
    console.log(`Booking ${id} status changed to ${newStatus}`);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) { // Use custom modal in real app
      setBookings(bookings.filter(booking => booking.id !== id));
      console.log(`Booking ${id} deleted`);
      // Delete from backend
    }
  };

  // const handleProcessPayment = (bookingId) => { // Removed function
  //   const booking = bookings.find(b => b.id === bookingId);
  //   if (booking) {
  //     setSelectedBookingForPayment(booking);
  //     setShowPaymentModal(true);
  //   }
  // };

  // const handlePaymentSuccess = (paymentDetails) => { // Removed function
  //   console.log("Payment processed for booking:", selectedBookingForPayment.id, paymentDetails);
  //   handleUpdateBookingStatus(selectedBookingForPayment.id, 'Paid');
  //   setShowPaymentModal(false);
  //   setSelectedBookingForPayment(null);
  //   alert('Payment successful!');
  // };


  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manage Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center">No bookings currently.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-white">{booking.userName} - {booking.table}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Pending' ? 'bg-yellow-500 text-black' :
                  booking.status === 'Accepted' ? 'bg-green-500 text-white' :
                  booking.status === 'Cancelled' ? 'bg-red-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Date: {booking.date} at {booking.time}</p>
              <p className="text-gray-300 text-sm">Guests: {booking.guests}</p>
              <div className="flex space-x-2 mt-3">
                {booking.status === 'Pending' && (
                  <button
                    onClick={() => handleUpdateBookingStatus(booking.id, 'Accepted')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
                  >
                    Accept
                  </button>
                )}
                {booking.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleUpdateBookingStatus(booking.id, 'Cancelled')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
                >
                  Delete
                </button>
                {/* Removed Payment button from here as per requirement */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal (now handled by Admin Dashboard Home section) */}
      {/* {showPaymentModal && selectedBookingForPayment && (
        <PaymentModal
          booking={selectedBookingForPayment}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )} */}
    </div>
  );
}

export default BookingManagement;
