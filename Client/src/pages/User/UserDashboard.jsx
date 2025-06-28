// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx"; // To access Firestore and auth state
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Firestore imports

import restaurantPlaceholderImage from "../../assets/Images/bg.jpg"; // Placeholder for restaurant cards

function UserDashboard() {
  const navigate = useNavigate();
   const authContext = useAuth();

   if (!authContext) {
    // Optionally show a loading or error state
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }
  // Destructure all relevant values from useAuth
  const { db, auth, loading: authLoading, firebaseInitialized, initError } = authContext;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeDiningTab, setActiveDiningTab] = useState('Foods'); // 'Foods' or 'Places'
  const [activeCategory, setActiveCategory] = useState(''); // Selected cuisine or district
  const [restaurants, setRestaurants] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); // Loading state specifically for restaurant data
  const [dataError, setDataError] = useState(''); // Error state specifically for restaurant data

  const cuisineCategories = ['Indian', 'Sri Lankan', 'Thai', 'Chinese', 'Italian', 'Mexican', 'Japanese', 'Other'];
  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle',
    'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya',
    'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee', 'Kurunegala',
    'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala',
    'Ratnapura', 'Kegalle'
  ];

  // Fetch restaurants from Firestore
  useEffect(() => {
    // Crucial check: Only proceed if Firebase is initialized and db is available
    if (!firebaseInitialized || !db) {
      setDataLoading(false); // Cannot load data if Firebase isn't ready
      // No need to set error here, AuthProvider shows global error if init fails
      return;
    }

    setDataLoading(true);
    setDataError('');
    let restaurantsCollectionRef = collection(db, 'artifacts', appId, 'public', 'restaurants'); // Public collection for restaurants
    let q = restaurantsCollectionRef;

    // Apply filtering based on categories
    if (activeCategory) {
      if (activeDiningTab === 'Foods') {
        q = query(q, where('cuisineType', '==', activeCategory));
      } else if (activeDiningTab === 'Places') {
        q = query(q, where('address.district', '==', activeCategory));
      }
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRestaurants = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Client-side search filtering (if needed, usually done with WHERE clauses for better performance)
      const filteredResults = fetchedRestaurants.filter(rest =>
        rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rest.cuisineType && rest.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (rest.address?.district && rest.address.district.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setRestaurants(filteredResults);
      setDataLoading(false);
    }, (err) => {
      console.error("Error fetching restaurants:", err);
      setDataError("Failed to load restaurants. Please try again later.");
      setDataLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [db, firebaseInitialized, searchTerm, activeDiningTab, activeCategory]); // Add firebaseInitialized to dependencies

  // Display loading/error states from AuthContext
  if (authLoading) {
    return null; // AuthProvider is showing its global loading spinner
  }

  // If Firebase initialization failed, AuthProvider will show an error.
  // This component doesn't need to duplicate that, but won't function without it.
  if (initError) {
    return null; // AuthProvider is showing its global error message
  }

  // Display loading/error for restaurant data
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading restaurants...</p>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        <p>{dataError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Search Bar */}
      <div className="p-4 bg-black">
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-xl mx-auto">
          <svg
            className="w-5 h-5 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="bg-transparent outline-none flex-grow text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Dining Out Tabs: Foods / Places */}
        <div className="flex space-x-8 mt-8">
          <button
            className={`text-lg font-medium pb-1 ${
              activeDiningTab === 'Foods' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => { setActiveDiningTab('Foods'); setActiveCategory(''); }}
          >
            Foods
          </button>
          <button
            className={`text-lg font-medium pb-1 ${
              activeDiningTab === 'Places' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => { setActiveDiningTab('Places'); setActiveCategory(''); }}
          >
            Places
          </button>
        </div>

        {/* Categories (Cuisine or Districts) */}
        <div className="flex flex-wrap gap-4 mt-8">
          {activeDiningTab === 'Foods' && cuisineCategories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category ? 'bg-yellow-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          {activeDiningTab === 'Places' && sriLankanDistricts.map((district) => (
            <button
              key={district}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === district ? 'bg-yellow-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              onClick={() => setActiveCategory(district)}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Restaurant Listings */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">
            {activeCategory ? activeCategory + ' Restaurants' : 'All Restaurants'}
          </h2>
          {restaurants.length === 0 && !dataLoading && !dataError && (
            <p className="text-center text-gray-400">No restaurants found matching your criteria.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer relative"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <img
                  src={restaurant.profilePicture || restaurantPlaceholderImage}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = restaurantPlaceholderImage; }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white truncate">{restaurant.name}</h3>
                  <p className="text-gray-400 text-sm">{restaurant.cuisineType || 'Restaurant'}</p>
                  {restaurant.isOpen ? (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 shadow-md">
                       <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20"><path d="M10 .5C4.761 0 0 4.761 0 10s4.761 10 10 10 10-4.761 10-10S15.239 0 10 .5zM9 15L4 10l1.41-1.41L9 12.17l5.59-5.59L16 8l-7 7z"/></svg>
                    </div>
                  ) : (
                     <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1 shadow-md">
                       <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
