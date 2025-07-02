// src/components/BookingManagement.jsx (No Firebase)
import React, { useState } from 'react';

// Bookings are now passed as props from parent (RestaurantAdminDashboard)
function BookingManagement({ bookings, setBookings }) {

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    console.log(`Booking ${id} status changed to ${newStatus} (Simulated).`);
    alert(`Booking ${id} status updated to ${newStatus}! (Simulated)`);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking? (Simulated)")) { // Use custom modal in real app
      setBookings(bookings.filter(booking => booking.id !== id));
      console.log(`Booking ${id} deleted (Simulated).`);
      alert(`Booking ${id} deleted! (Simulated)`);
    }
  };

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
                <h4 className="text-xl font-semibold text-white">{booking.userName} - {booking.table || 'N/A'}</h4>
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
              <p className="text-gray-300 text-sm">Restaurant: {booking.restaurantName || 'N/A'}</p> {/* Added for clarity */}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingManagement;
