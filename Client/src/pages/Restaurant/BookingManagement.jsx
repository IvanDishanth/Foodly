import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingManagement = ({ restaurantId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  const totalPages = Math.ceil((bookings?.length || 0) / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found – Please log in.");

      if (!restaurantId) return;
      const response = await axios.get(`http://localhost:5000/api/bookings/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setBookings(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [restaurantId]);

  if (loading) return <div className="text-center mt-10">Loading your bookings...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {currentBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-black">{booking.restaurantId?.name || booking.restaurantName}</h3>
                  <p className="text-gray-600 text-sm">{booking.restaurantId?.address || 'Address not available'}</p>
                  <p className="text-sm text-black">
                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()} <br />
                    <strong>Time:</strong> {booking.time}
                  </p>
                  <p className="text-sm text-black"><strong>Guests:</strong> {booking.guests}</p>
                  {booking.specialRequests && (
                    <p className="text-sm text-black"><strong>Note:</strong> {booking.specialRequests}</p>
                  )}
                </div>

                <div className="mt-4 md:mt-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : booking.status === 'Accepted'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors duration-150 ${
                    currentPage === idx + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-yellow-600 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingManagement;
