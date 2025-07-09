import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiMapPin } from 'react-icons/fi';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.profilePic} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-between p-4">
          <div className="flex justify-between">
            {restaurant.isOpen && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
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
                <span>{restaurant.district}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <FiStar className="text-yellow-400 mr-1" size={14} />
              <span className="text-white font-medium text-sm">{restaurant.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 text-sm">
          <FiClock className="mr-1" size={14} />
          <span>{restaurant.openingHours || '10:00 AM - 10:00 PM'}</span>
        </div>
        
        <div className="mt-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {restaurant.cuisine}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;