// src/pages/RestaurantAdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantProfileEditForm from "./RestaurantProfileEditForm.jsx";
import TableManagement from "./TableManagement.jsx";
import FoodManagement from "./FoodManagement.jsx";
import BookingManagement from "./BookingManagement.jsx";
import RestaurantPaymentToAdminModal from "./RestaurantPaymentToAdminModal.jsx"; // New Payment Modal

function RestaurantAdminDashboard() {
  const navigate = useNavigate();

  // Dummy Restaurant Data (will be fetched from API in real app)
  const [restaurantData, setRestaurantData] = useState({
    name: 'Spicy Briyani Hub',
    bannerImage: '/images/restaurant-banner-admin.jpg',
    profilePicture: '/images/restaurant-profile.jpg',
    isOpen: true,
    isVerified: true, // Assuming admin verification for yellow tick demo
  });

  const [activeDashboardTab, setActiveDashboardTab] = useState('Home');
  const [activeUpdateTab, setActiveUpdateTab] = useState('Table'); // Removed 'Menu' from options

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPaymentToAdminModal, setShowPaymentToAdminModal] = useState(false); // State for new payment modal

  // Handle updates from the edit form (simulated)
  const handleProfileUpdate = (updatedData) => {
    setRestaurantData(prevData => ({
      ...prevData,
      name: updatedData.restaurantName,
      // Update other fields here based on your form data
      // For profile picture, update if a new file was provided
      profilePicture: updatedData.profilePicturePreview || prevData.profilePicture,
    }));
    setShowEditProfileModal(false);
    console.log("Profile updated:", updatedData);
  };

  const handleAdminPaymentSubmit = (paymentDetails) => {
    console.log("Restaurant paying Superadmin:", paymentDetails);
    alert('Payment to Superadmin recorded successfully! (Simulated)'); // Use custom modal in real app
    setShowPaymentToAdminModal(false);
    // In a real app, send paymentDetails to your backend for recording/verification
  };

  // Render content based on active dashboard tab
  const renderDashboardContent = () => {
    switch (activeDashboardTab) {
      case 'Home':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px] flex flex-col items-center justify-center">
            <h3 className="text-xl text-gray-300 mb-4">Welcome to your dashboard, {restaurantData.name}!</h3>
            <p className="text-gray-400 mb-6 text-center">Here you can manage your restaurant's operations and finances.</p>
            {/* New Payment Button for restaurant to pay superadmin */}
            <button
              onClick={() => setShowPaymentToAdminModal(true)}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Make Payment to Superadmin
            </button>
          </div>
        );
      case 'Update':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px]">
            {/* Update Sub-Navigation Tabs: Table, Food */}
            <div className="flex space-x-6 mb-6 justify-center">
              {['Table', 'Food'].map((tab) => ( // 'Menu' removed
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    activeUpdateTab === tab
                      ? 'bg-yellow-600 text-white shadow-md'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveUpdateTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Render management components based on activeUpdateTab */}
            {activeUpdateTab === 'Table' && <TableManagement />}
            {activeUpdateTab === 'Food' && <FoodManagement />}
          </div>
        );
      case 'Booking':
        return <BookingManagement />;
      case 'Profile':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px]">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Restaurant Profile Overview</h3>
            <p className="text-gray-300">Name: <span className="font-semibold">{restaurantData.name}</span></p>
            <p className="text-gray-300">Address: <span className="font-semibold">{restaurantData.address || 'Not provided'}</span></p>
            <p className="text-gray-300">Phone: <span className="font-semibold">{restaurantData.phoneNumber || 'Not provided'}</span></p>
            <p className="text-gray-300">Status: <span className={`font-semibold ${restaurantData.isOpen ? 'text-green-400' : 'text-red-400'}`}>{restaurantData.isOpen ? 'Open' : 'Closed'}</span></p>
            {restaurantData.isVerified && (
              <p className="text-green-400 mt-2 flex items-center">
                <svg className="w-5 h-5 mr-1 fill-current" viewBox="0 0 20 20"><path d="M10 .5C4.761 0 0 4.761 0 10s4.761 10 10 10 10-4.761 10-10S15.239 0 10 .5zM9 15L4 10l1.41-1.41L9 12.17l5.59-5.59L16 8l-7 7z"/></svg>
                Verified by Admin
              </p>
            )}
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="mt-6 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              Edit Profile
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      {/* Top Section - Foodly Logo, Restaurant Name, Profile/Edit Buttons */}
      <header className="p-4 bg-black flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <div className="text-yellow-500 text-3xl font-bold font-serif mr-4">Foodly</div>
          <h1 className="text-3xl font-semibold text-white">{restaurantData.name}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
            <img
              src={restaurantData.profilePicture}
              alt="Restaurant Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/555555/FFFFFF?text=P"; }}
            />
          </div>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Edit Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <nav className="flex justify-around bg-gray-800 rounded-lg p-3 mb-8 shadow-md">
          {['Home', 'Update', 'Booking', 'Profile'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                activeDashboardTab === tab
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveDashboardTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Open / Close Status Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg
              ${restaurantData.isOpen ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-500'}`}
            onClick={() => setRestaurantData(prev => ({ ...prev, isOpen: true }))}
          >
            Open
          </button>
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg
              ${!restaurantData.isOpen ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-red-500'}`}
            onClick={() => setRestaurantData(prev => ({ ...prev, isOpen: false }))}
          >
            Close
          </button>
        </div>

        {/* Dynamic Content Display Area */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-xl">
          {renderDashboardContent()}
        </section>
      </div>

      {/* Restaurant Profile Edit Form Modal */}
      {showEditProfileModal && (
        <RestaurantProfileEditForm
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleProfileUpdate}
          initialData={restaurantData}
        />
      )}

      {/* Restaurant Payment to Admin Modal */}
      {showPaymentToAdminModal && (
        <RestaurantPaymentToAdminModal
          onClose={() => setShowPaymentToAdminModal(false)}
          onPaymentSubmit={handleAdminPaymentSubmit}
        />
      )}
    </div>
  );
}

export default RestaurantAdminDashboard;
