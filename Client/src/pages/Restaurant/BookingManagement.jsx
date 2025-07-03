import React, { useEffect, useState } from 'react';
import axios from 'axios';

  const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async (restaurantId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/bookings/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };


  // Fetch bookings for this restaurant
 useEffect(() => {
  const restaurantId = localStorage.getItem("restaurantId"); // or props / context / auth
  if (restaurantId) {
    fetchBookings(restaurantId);
  } else {
    console.error("restaurantId is missing!");
  }
}, []);







  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBooking = res.data.data;
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updatedBooking : b))
      );
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      alert('Failed to update booking');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert('Booking deleted');
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  if (loading) return <p className="text-white text-center">Loading bookings...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manage Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-white">
                  Guests: {booking.guests} - Table: {booking.table || 'N/A'}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'Pending'
                      ? 'bg-yellow-500 text-black'
                      : booking.status === 'Accepted'
                      ? 'bg-green-500 text-white'
                      : booking.status === 'Cancelled'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Date: {booking.date} at {booking.time}</p>
              <p className="text-gray-300 text-sm">Special Requests: {booking.specialRequests || 'None'}</p>

              <div className="flex space-x-2 mt-3">
                {booking.status === 'Pending' && (
                  <button
                    onClick={() => updateStatus(booking._id, 'Accepted')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                  >
                    Accept
                  </button>
                )}
                {booking.status !== 'Cancelled' && (
                  <button
                    onClick={() => updateStatus(booking._id, 'Cancelled')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm"
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
};

export default BookingManagement;