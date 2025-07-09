// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from "./RestaurantCard.jsx";
import FoodCategories from "./FoodCategories.jsx";
import DistrictPlaces from "./DistrictPlaces.jsx";
import UserProfile from "./UserProfile.jsx";
import Footer from "../../components/Footer.jsx";
import BookingHistory from "./BookingHistory.jsx";
import axios from 'axios';
import API from '../../api.js';






function UserDashboard() {
  const [user, setUser] = useState(null); // changed from mock data
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Dining Out');
  const [activeDiningTab, setActiveDiningTab] = useState('Food');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [restaurants, setRestaurants] = useState([]);
 

  //  Add useEffect here
  useEffect(() => {
   const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setUserProfile(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if (error.response?.status === 404) {
      // Handle 404 specifically
      console.error('API endpoint not found. Please check backend routes.');
    }
  }
};


    const fetchRestaurants = async () => {
      try {
        const response = await API.get("/user/restaurants");
        setRestaurants(response.data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };


  fetchUserProfile();
  fetchRestaurants();
}, []);


  // Mock data for restaurants
  

  const [foodCategory, setFoodCategory] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
// ...existing code...

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

 

  // Filter restaurants based on search and filters
 const filteredRestaurants = restaurants.filter(restaurant => {
  const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesFoodCategory = !foodCategory || restaurant.cuisine === foodCategory;
  const matchesDistrict = !districtFilter || restaurant.district === districtFilter;
  
  return matchesSearch && matchesFoodCategory && matchesDistrict;
});

 

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-600">Fooly</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-yellow-600"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button 
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
           <img
              src={user?.profilePic || "/default-profile.png"} // ✅ Safe access
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 mx-2 rounded-t-lg ${activeTab === 'Dining Out' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('Dining Out')}
          >
            Dining Out
          </button>
          <button
            className={`px-6 py-2 mx-2 rounded-t-lg ${activeTab === 'Profile' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('Profile')}
          >
            Profile
          </button>
          <button
    className={`px-6 py-2 mx-2 rounded-t-lg ${activeTab === 'Booking History' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
    onClick={() => setActiveTab('Booking History')}
  >
    Booking History
  </button>

        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'Dining Out' ? (
            <>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for restaurants, cuisines or districts..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-3 top-3 text-gray-500 hover:text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Dining Out Sub-tabs */}
              <div className="flex justify-center mb-6">
                <button
                  className={`px-6 py-2 mx-2 rounded-lg ${activeDiningTab === 'Food' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setActiveDiningTab('Food')}
                >
                  Food
                </button>
                <button
                  className={`px-6 py-2 mx-2 rounded-lg ${activeDiningTab === 'Place' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setActiveDiningTab('Place')}
                >
                  Place
                </button>
              </div>

              {/* Content based on sub-tab */}
              {activeDiningTab === 'Food' ? (
                <FoodCategories onCategorySelect={(category) => {
                  setSearchQuery(category);
                  setActiveDiningTab('Place');
                }} />
              ) : (
                <DistrictPlaces />
              )}

              {/* Trending Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Trending Spots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.filter(r => r.trending).map(restaurant => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                      onClick={() => handleRestaurantClick(restaurant.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Newly Opened Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Newly Opened Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.filter(r => r.name.includes('Newly')).map(restaurant => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                      onClick={() => handleRestaurantClick(restaurant.id)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === 'Profile' ? (
            <UserProfile user={user} setUser={setUser} />
          ) : (
            <BookingHistory />
          )}
        </div>
      </main>

      <Footer />
      
    </div>
  );
}

export default UserDashboard;