// src/pages/RestaurantAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Import toastify
import 'react-toastify/dist/ReactToastify.css';
import RestaurantProfileEditForm from "./RestaurantProfileEditForm.jsx";
import TableManagement from "./TableManagement.jsx";
import FoodManagement from "./FoodManagement.jsx";
import BookingManagement from "./BookingManagement.jsx";
import RestaurantPaymentToAdminModal from "./RestaurantPaymentToAdminModal.jsx";
import Footer from "../../components/Footer.jsx";

function RestaurantAdminDashboard() {
  const navigate = useNavigate();

  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tables, setTables] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [activeDashboardTab, setActiveDashboardTab] = useState('Home');
  const [activeUpdateTab, setActiveUpdateTab] = useState('Table');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPaymentToAdminModal, setShowPaymentToAdminModal] = useState(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/admin/restaurant', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurantData(response.data);
        setTables(response.data.tables || []);
        setFoodItems(response.data.foodItems || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurant data.');
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [navigate]);

  const handleProfileUpdate = (updatedData) => {
    setRestaurantData(prevData => ({
      ...prevData,
      name: updatedData.restaurantName,
      address: updatedData.address,
      ownerName: updatedData.ownerName,
      phoneNumber: updatedData.phoneNumber,
      landPhoneNumber: updatedData.landPhoneNumber,
      registrationNumber: updatedData.registrationNumber,
      profilePicture: updatedData.profilePicturePreview || prevData.profilePicture,
    }));
    setShowEditProfileModal(false);
    toast.success("Profile updated successfully! (Simulated)");
  };

  const handleAdminPaymentSubmit = (paymentDetails) => {
    console.log("Restaurant paying Superadmin:", paymentDetails);
    toast.success("Payment to Superadmin recorded! (Simulated)");
    setShowPaymentToAdminModal(false);
  };

  const handleBookingUpdate = (updatedBookings) => {
    // Update bookings state if necessary
    console.log("Bookings updated by admin:", updatedBookings);
  };

  const handleToggleStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put('/restaurant/status', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurantData(res.data);
      toast.success(`Restaurant is now ${res.data.isOpen ? 'open' : 'closed'}`);
    } catch (err) {
      console.error("Error toggling restaurant status:", err);
      toast.error("Failed to update status.");
    }
  };

  const handleLogout = async () => {
    try {
<<<<<<< HEAD
      await api.post('/restaurant/logout'); // Corrected endpoint
=======
      await api.post('/restaurant/logout');
>>>>>>> 438ffe98c4d2de989247928cd61b9154eb2bc0bb
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    setTimeout(() => navigate('/RestaurantLoginForm'), 1500);
  };

  const renderDashboardContent = () => {
    switch (activeDashboardTab) {
      case 'Home':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px] flex flex-col items-center justify-center">
            <h3 className="text-xl text-gray-300 mb-4">Welcome to your dashboard, {restaurantData.name}!</h3>
            <p className="text-gray-400 mb-6 text-center">Here you can manage your restaurant's operations and finances.</p>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Payment to Superadmin
            </button>
            {showPaymentModal && restaurantData?._id && (
              <RestaurantPaymentToAdminModal
                restaurantId={restaurantData._id}
                onClose={() => setShowPaymentModal(false)}
                onPaymentSubmit={() => {
                  setShowPaymentModal(false);
                }}
              />
            )}
          </div>
        );
      case 'Update':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px]">
            <div className="flex space-x-6 mb-4 justify-center">
              {['Table', 'Food'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-1 rounded-full font-medium transition-colors duration-200 ${
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
            {activeUpdateTab === 'Table' && <TableManagement tables={tables} setTables={setTables} />}
            {activeUpdateTab === 'Food' && <FoodManagement foodItems={foodItems} setFoodItems={setFoodItems} />}
          </div>
        );
      case 'Booking':
        return <BookingManagement restaurantId={restaurantData?._id} />;
      case 'Profile':
        return (
          <div className="p-4 bg-gray-900 rounded-lg shadow-inner min-h-[300px]">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Restaurant Profile Overview</h3>
            <p className="text-gray-300">Name: <span className="font-semibold">{restaurantData.name}</span></p>
            <p className="text-gray-300">Address: <span className="font-semibold">{restaurantData.address?.street}, {restaurantData.address?.city}, {restaurantData.address?.district}</span></p>
            <p className="text-gray-300">Phone: <span className="font-semibold">{restaurantData.phoneNumber}</span></p>
            <p className="text-gray-300">Landline: <span className="font-semibold">{restaurantData.landPhoneNumber || 'N/A'}</span></p>
            <p className="text-gray-300">Registration No: <span className="font-semibold">{restaurantData.registrationNumber}</span></p>
            <p className="text-gray-300">Cuisine: <span className="font-semibold">{restaurantData.cuisineType}</span></p>
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

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      <ToastContainer /> {/* ✅ Toastify container */}

      {/* Header */}
      <header className="p-2 bg-black flex items-center justify-between border-b border-gray-800">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-6 py-8">
        <nav className="flex justify-center gap-40 bg-gray-900 rounded-lg p-2 mb-4 shadow-md">
          {['Home', 'Update', 'Booking', 'Profile'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-200
                ${activeDashboardTab === tab
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'text-gray-300 bg-gray-800 hover:bg-yellow-600 hover:text-white'}`}
              onClick={() => setActiveDashboardTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex justify-center space-x-4 mb-2">
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg ${restaurantData.isOpen ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-500'}`}
            onClick={handleToggleStatus}
          >
            Open
          </button>
          <button
            className={`px-8 py-3 rounded-full font-bold text-lg ${!restaurantData.isOpen ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-red-500'}`}
            onClick={handleToggleStatus}
          >
            Close
          </button>
        </div>

        <section className="bg-gray-800 rounded-lg p-6 shadow-xl">
          {renderDashboardContent()}
        </section>
      </div>

      {showEditProfileModal && (
        <RestaurantProfileEditForm
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleProfileUpdate}
          initialData={restaurantData}
        />
      )}

      {showPaymentToAdminModal && restaurantData?._id && (
        <RestaurantPaymentToAdminModal
          restaurantId={restaurantData._id}
          onClose={() => setShowPaymentToAdminModal(false)}
          onPaymentSubmit={handleAdminPaymentSubmit}
        />
      )}

      <Footer />
    </div>
  );
}

export default RestaurantAdminDashboard;
