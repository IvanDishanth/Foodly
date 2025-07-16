// src/pages/RestaurantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FoodDisplay from "./FoodDisplay.jsx";
import TableDisplay from "./TableDisplay.jsx";
import BookingFormModal from "./BookingFormModal.jsx";
import Footer from '../../components/Footer';
import api from '../../api/axios';

function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Details');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; // Prevent fetch if id is undefined
    const fetchRestaurantDetails = async () => {
      try {
        const res = await api.get(`/user/restaurants/${id}`);
        setRestaurant(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurant details.');
        setLoading(false);
      }
    };
    fetchRestaurantDetails();
  }, [id]);

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    alert('Booking request sent successfully! The restaurant will confirm your reservation shortly.');
    setShowBookingModal(false);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative h-64 w-full">
        <img 
          src={restaurant.bannerImage} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Restaurant Header */}
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <img 
                src={restaurant.profilePic} 
                alt={restaurant.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <div className="md:w-3/4 mt-4 md:mt-0 md:pl-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{restaurant.cuisine}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{restaurant.district}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="mt-4 md:mt-0 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md shadow-md transition-colors"
                >
                  Book Now
                </button>
              </div>
              <p className="mt-3 text-gray-600">{restaurant.description}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['Details', 'Food', 'Tables'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'Details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">About</h3>
                  <p className="text-gray-600 mb-6">{restaurant.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">ADDRESS</h4>
                      <p className="text-gray-800">{restaurant.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">PHONE</h4>
                      <p className="text-gray-800">{restaurant.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">OPENING HOURS</h4>
                      <p className="text-gray-800">{restaurant.openingHours}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${restaurant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {restaurant.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Location</h3>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map would be displayed here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Food' && <FoodDisplay foods={restaurant.foodItems || []} />}
            {activeTab === 'Tables' && <TableDisplay tables={restaurant.tables || []} />}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingFormModal 
          restaurant={restaurant} 
          onClose={() => setShowBookingModal(false)} 
          onSubmit={handleBookingSubmit}
        />
      )}

      <Footer />
    </div>
  );
}

export default RestaurantDetailsPage;