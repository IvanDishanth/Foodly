import React, { useState } from 'react';
import BookingModal from './BookingModal'; // Booking modal component
import TableDetails from './TableDetails'; // Component to show table details
import FoodDetails from './FoodDetails';   // Component to show food details
import MenuDetails from './MenuDetails';   // Component to show menu details

function RestaurantDetails() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Table'); // 'Table', 'Food', 'Menu'

  // Dummy data for example images (replace with actual paths or data from an API)
  const mainRestaurantImage = '/images/main-restaurant-banner.jpg'; // Large banner image
  const restaurantThumbnail = '/images/restaurant-thumbnail.jpg'; // Small circular image
  const cardImages = [
    { src: '/images/table-setting-1.jpg', alt: 'Elegant table setting' },
    { src: '/images/table-setting-2.jpg', alt: 'Outdoor dining' },
    { src: '/images/table-setting-3.jpg', alt: 'Restaurant interior' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Table':
        return <TableDetails />;
      case 'Food':
        return <FoodDetails />;
      case 'Menu':
        return <MenuDetails />;
      default:
        return <TableDetails />; // Default to Table details
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background overlay (optional, for subtle effect) */}
      <div className="absolute inset-0 bg-gray-900 opacity-70 z-0"></div>

      {/* Main content wrapper with higher z-index */}
      <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Top Banner Section */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            src={mainRestaurantImage}
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/1200x400/333333/FFFFFF?text=Main+Restaurant+Image";
            }}
          />
          {/* Small circular image on top of the banner */}
          <div className="absolute -bottom-10 left-4 sm:left-8 md:left-12 lg:left-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl">
            <img
              src={restaurantThumbnail}
              alt="Restaurant Thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/128x128/555555/FFFFFF?text=Thumb";
              }}
            />
          </div>
        </div>

        {/* Navigation Tabs (Table, Food, Menu) and Booking Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 mb-8 space-y-4 sm:space-y-0 sm:space-x-8">
          {/* Tabs */}
          <div className="flex space-x-6 sm:space-x-8 md:space-x-12">
            {['Table', 'Food', 'Menu'].map((tab) => (
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

          {/* Booking Button */}
          <button
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowBookingModal(true)}
          >
            Booking
          </button>
        </div>

        {/* Dynamic Content Section based on activeTab */}
        <section className="mt-8">
          {renderContent()}
        </section>

        {/* Modals */}
        {showBookingModal && (
          <BookingModal onClose={() => setShowBookingModal(false)} />
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;
