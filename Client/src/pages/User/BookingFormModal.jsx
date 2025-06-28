// src/components/BookingFormModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, addDoc } from 'firebase/firestore'; // For adding booking

function BookingFormModal({ onClose, onBook, restaurantName }) {
  const { currentUser, userId, db } = useAuth();
  const [bookingData, setBookingData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '', // User's phone number
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
  });

  // Pre-fill phone if available from user data in AuthContext or Firestore
  useEffect(() => {
    if (currentUser && !bookingData.phone) {
      // If phone number is stored in Firestore, fetch it
      const fetchUserPhone = async () => {
        if (userId && db) {
          const userDocRef = doc(db, 'artifacts', appId, 'users', userId, 'profile', 'data');
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists() && docSnap.data().phoneNumber) {
            setBookingData(prev => ({ ...prev, phone: docSnap.data().phoneNumber }));
          }
        }
      };
      fetchUserPhone();
    }
  }, [currentUser, userId, db, bookingData.phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db || !currentUser) {
      alert('You must be logged in to make a booking.');
      return;
    }
    // Basic validation
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date || !bookingData.time || !bookingData.guests) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      // Save booking to a shared 'bookings' collection
      // This collection needs specific Firestore Security Rules to allow writes by users
      // and reads by admins/restaurants.
      const bookingsCollectionRef = collection(db, 'artifacts', appId, 'public', 'bookings'); // Shared public bookings
      await addDoc(bookingsCollectionRef, {
        restaurantId: window.location.pathname.split('/').pop(), // Get restaurant ID from URL
        restaurantName: restaurantName,
        userId: userId,
        userName: bookingData.name,
        userEmail: bookingData.email,
        userPhone: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
        guests: parseInt(bookingData.guests),
        specialRequests: bookingData.specialRequests,
        status: 'Pending', // Initial status for admin
        timestamp: new Date().toISOString(),
      });
      onBook(bookingData); // Call the onBook callback in parent (RestaurantDetailsPage)
      onClose(); // Close the modal
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to make booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Book Table at {restaurantName}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={bookingData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-300 text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-300 text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={bookingData.time}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-gray-300 text-sm font-medium mb-1">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              value={bookingData.guests}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="specialRequests" className="block text-gray-300 text-sm font-medium mb-1">Special Requests (Optional)</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows="3"
              value={bookingData.specialRequests}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none resize-y"
              placeholder="e.g., High chair needed, wheelchair access"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingFormModal;
