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
import logo from "../../assets/Images/logo.png";
import bg from "../../assets/Images/bg1.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dining Out');
  const [activeDiningTab, setActiveDiningTab] = useState('Food');
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [foodCategory, setFoodCategory] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error("Failed to fetch user. Please log in again.");
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/user/restaurants");
        setRestaurants(response.data);
      } catch (err) {
        setError("Failed to fetch restaurants");
        toast.error("Failed to load restaurants!");
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);
  
  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleLogout = async () => {
    try {
      await API.post("/user/logout");
      setUser(null);
      localStorage.removeItem('token');
      toast.success("Logged out successfully!");
      navigate('/login');
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch =
      restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter
      ? (restaurant.district && restaurant.district.toLowerCase() === districtFilter.toLowerCase())
      : true;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <header className="bg-black shadow-md p-1 fixed top-0 left-0 right-0 h-12 z-50">
        <div className="container mx-auto flex justify-between items-center h-full">
          <Link to="/">
            <img src={logo} alt="Foodly Logo" className="h-8" />
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <img
                  src={user?.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-yellow-600"
                />
              </>
            ) : (
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
    
      {/* Main Content */}
      <main className="pt-16 container mx-auto bg-gray-900">
        {/* Tabs */}
        <div className="sticky top-10 z-40 bg-gray-900 h-16 pt-4">
          <div className="flex justify-center mb-10">
            {['Dining Out', 'Profile', 'Booking History'].map(tab => (
              <button
                key={tab}
                className={`px-6 py-2 mx-2 rounded-t-lg ${
                  activeTab === tab ? 'bg-[#FAB506] text-black' : 'bg-gray-200 hover:bg-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-900 rounded-lg p-4">
          {activeTab === 'Dining Out' ? (
            <>
              {/* Search Section */}
              <div className="mb-6">
                <div className="relative">
                  <div
                    className="bg-black p-6 md:p-8 h-[300px] rounded-xl text-yellow-400 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search for restaurants, cuisines or districts..."
                      className="w-[800px] p-1 bg-gray-700 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-56 top-30 text-gray-500 hover:text-yellow-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex justify-center mb-6">
                {['Food', 'Place'].map(tab => (
                  <button
                    key={tab}
                    className={`px-6 py-2 mx-2 rounded-lg ${
                      activeDiningTab === tab ? 'bg-[#FAB506] text-black' : 'bg-gray-200 hover:bg-gray-500'
                    }`}
                    onClick={() => setActiveDiningTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Section */}
              {activeDiningTab === 'Food' ? (
                <FoodCategories onCategorySelect={(category) => {
                  setSearchQuery(category);
                  setActiveDiningTab('Place');
                }} />
              ) : (
                <DistrictPlaces
                  onDistrictSelect={district => {
                    setDistrictFilter(district);
                  }}
                />
              )}

              {/* Restaurant Grid */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">All Restaurants</h2>
                {loading ? (
                  <div className="text-[#FAB503]">Loading...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map(restaurant => (
                      <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                        onClick={() => handleRestaurantClick(restaurant._id)}
                      />
                    ))}
                  </div>
                )}
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
