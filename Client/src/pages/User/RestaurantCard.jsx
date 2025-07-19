import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';

// Default restaurant image
const defaultRestaurantImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const RestaurantCard = ({ restaurant, onClick }) => {
  // Use the restaurant's image or fallback to default
  const imageUrl = restaurant.profilePic || defaultRestaurantImage;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = defaultRestaurantImage; // Fallback if image fails to load
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-between p-4">
          <div className="flex justify-between">
            {restaurant.isOpen && (
              <span className="bg-[#FAB503] text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                OPEN
              </span>
            )}
            {restaurant.trending && (
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                TRENDING
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
              <div className="flex items-center text-white/90 text-sm mt-1">
                <FiMapPin className="mr-1" size={12} />
                <span>{restaurant.district || 'City Center'}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <FiStar className="text-yellow-400 mr-1" size={14} />
              <span className="text-white font-medium text-sm">
                {restaurant.rating || '4.5'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-100 text-sm">
          <FiClock className="mr-1" size={14} />
          <span>{restaurant.openingHours || '10:00 AM - 10:00 PM'}</span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-block bg-gray-700 text-[#FAB503] text-xs px-2 py-1 rounded">
            {restaurant.cuisine || 'International'}
          </span>
          {restaurant.features?.map((feature, index) => (
            <span key={index} className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;