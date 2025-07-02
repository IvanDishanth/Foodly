// src/components/FoodDisplay.jsx
import React from 'react';

function FoodDisplay({ foods }) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Menu</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-800">{food.name}</h4>
                <span className="text-yellow-600 font-bold">${food.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mt-2">{food.description}</p>
              <span className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${food.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {food.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;