// src/components/FoodCategories.jsx
import React from 'react';

function FoodCategories() {
  const categories = [
    { name: 'Indian', image: 'https://placehold.co/300x200/FF5733/FFFFFF?text=Indian' },
    { name: 'Sri Lankan', image: 'https://placehold.co/300x200/32CD32/FFFFFF?text=Sri+Lankan' },
    { name: 'Chinese', image: 'https://placehold.co/300x200/4169E1/FFFFFF?text=Chinese' },
    { name: 'Thai', image: 'https://placehold.co/300x200/FF6347/FFFFFF?text=Thai' },
    { name: 'Italian', image: 'https://placehold.co/300x200/9370DB/FFFFFF?text=Italian' },
    { name: 'Japanese', image: 'https://placehold.co/300x200/FF4500/FFFFFF?text=Japanese' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodCategories;