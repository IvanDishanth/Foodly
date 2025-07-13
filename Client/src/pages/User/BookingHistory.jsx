import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view bookings.');
          setLoading(false);
          return;
        }
        const res = await axios.get('http://localhost:5000/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data); // <-- FIXED: use res.data, not res.data.data
      } catch (err) {
        console.error('Error fetching booking history:', err);
        setError('Failed to fetch bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookingHistory();
  }, []);

  if (loading) return <p className="text-white text-center">Loading your bookings...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (bookings.length === 0) return <p className="text-white text-center">No bookings found.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-2">{booking.restaurantName}</h3>
          <p>Date: {booking.date} at {booking.time}</p>
          <p>Guests: {booking.guests}</p>
          <p>Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                booking.status === 'Accepted'
                  ? 'bg-green-500 text-white'
                  : booking.status === 'Cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-yellow-500 text-black'
              }`}
            >
              {booking.status}
            </span>
          </p>
          <p>Special Requests: {booking.specialRequests || 'None'}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;