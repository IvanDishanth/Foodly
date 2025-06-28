// src/pages/User/RestaurantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";
import { doc, getDoc } from 'firebase/firestore';
import TableDisplay from "./TableDisplay.jsx"; // User-view of tables
import FoodDisplay from "./FoodDisplay.jsx";   // User-view of food
import BookingFormModal from "./BookingFormModal.jsx"; // User booking modal

function RestaurantDetailsPage() {
  const { id } = useParams(); // Get restaurant ID from URL
  const navigate = useNavigate();
  const { currentUser, userId, db, auth } = useAuth(); // Access auth and Firestore

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Table'); // 'Table', 'Food', 'Booking'

  const [showBookingModal, setShowBookingModal] = useState(false);

  // Fetch restaurant details from Firestore
  useEffect(() => {
    if (!db || !id) return;

    const fetchRestaurant = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch from the public collection where restaurant data is stored by admin
        const restaurantDocRef = doc(db, 'artifacts', auth.currentUser?.uid || 'anonymous', 'public', 'restaurants', id);
        const docSnap = await getDoc(restaurantDocRef);

        if (docSnap.exists()) {
          setRestaurant({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Restaurant not found.');
        }
      } catch (e) {
        console.error("Error fetching restaurant details:", e);
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [db, id, auth.currentUser]);


  const handleBooking = (bookingData) => {
    if (!currentUser) {
      alert('Please log in to make a booking.'); // Use custom modal
      navigate('/login'); // Redirect to login page
      return;
    }

    // Process booking (send to Firestore)
    console.log("Booking request:", bookingData);
    // You would save this to a 'bookings' collection in Firestore.
    // The admin dashboard would listen to this collection for new notifications.
    try {
      // Example: Save booking to a 'bookings' collection
      // doc(db, 'artifacts', appId, 'bookings', booking.id) - this should be a shared collection
      // setDoc(doc(db, 'bookings', `booking_${Date.now()}`), {
      //   restaurantId: restaurant.id,
      //   restaurantName: restaurant.name,
      //   userId: userId,
      //   userName: currentUser.displayName || currentUser.email,
      //   ...bookingData,
      //   status: 'Pending', // Initial status
      //   timestamp: new Date().toISOString()
      // });
      alert('Booking submitted successfully! Awaiting restaurant confirmation.'); // Use custom modal
      setShowBookingModal(false);
    } catch (e) {
      console.error("Error submitting booking:", e);
      alert('Failed to submit booking. Please try again.'); // Use custom modal
    }
  };

  const renderContent = () => {
    if (!restaurant) return null; // Don't render content if restaurant data isn't loaded

    switch (activeTab) {
      case 'Table':
        return <TableDisplay restaurantId={restaurant.id} />; // Pass restaurant ID to fetch its tables
      case 'Food':
        return <FoodDisplay restaurantId={restaurant.id} />; // Pass restaurant ID to fetch its food
      case 'Booking':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[200px] flex items-center justify-center">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Book a Table Now
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading restaurant details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        <p>Restaurant data not available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Top Banner Section */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src={restaurant.bannerImage || 'https://placehold.co/1200x400/333333/FFFFFF?text=Restaurant+Banner'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x400/333333/FFFFFF?text=Restaurant+Banner'; }}
        />
        {/* Small circular profile picture on top of the banner */}
        <div className="absolute -bottom-10 left-4 sm:left-8 md:left-12 lg:left-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl">
          <img
            src={restaurant.profilePicture || 'https://placehold.co/128x128/555555/FFFFFF?text=Logo'}
            alt={restaurant.name + " Profile"}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/555555/FFFFFF?text=Logo'; }}
          />
        </div>
        {/* Restaurant Name on banner */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-yellow-500 text-center drop-shadow-lg font-display">
          {restaurant.name}
        </h1>
        {/* Open/Closed Tick/Cross */}
        {restaurant.isOpen ? (
          <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-md">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 20 20"><path d="M10 .5C4.761 0 0 4.761 0 10s4.761 10 10 10 10-4.761 10-10S15.239 0 10 .5zM9 15L4 10l1.41-1.41L9 12.17l5.59-5.59L16 8l-7 7z"/></svg>
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-red-500 rounded-full p-2 shadow-md">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
          </div>
        )}
      </div>

      {/* Main Content Wrapper */}
      <div className="container mx-auto px-4 py-8 mt-10">
        {/* Navigation Tabs (Table, Food, Booking) */}
        <div className="flex space-x-6 sm:space-x-8 md:space-x-12 justify-center mb-8">
          {['Table', 'Food', 'Booking'].map((tab) => (
            <button
              key={tab}
              className={`text-lg sm:text-xl font-medium pb-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Section based on activeTab */}
        <section className="mt-8">
          {renderContent()}
        </section>

        {/* Booking Form Modal */}
        {showBookingModal && (
          <BookingFormModal
            onClose={() => setShowBookingModal(false)}
            onBook={handleBooking}
            restaurantName={restaurant.name}
          />
        )}
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;
