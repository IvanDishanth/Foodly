// src/components/RestaurantCard.jsx
import React from 'react';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={restaurant.profilePic} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
        />
        {restaurant.isOpen && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            OPEN
          </div>
        )}
        {restaurant.trending && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            TRENDING
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-gray-700">{restaurant.rating}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-600">{restaurant.cuisine}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-600">{restaurant.district}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;