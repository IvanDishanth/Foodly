// src/components/FoodDisplay.jsx
import React, { useState } from 'react';

function FoodDisplay({ foods }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 3;
  const totalPages = Math.ceil((foods?.length || 0) / foodsPerPage);

  // Get current page foods
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = foods?.slice(indexOfFirstFood, indexOfLastFood) || [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFoods.map(food => (
          <div key={food._id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded-full font-semibold transition-colors duration-150 ${
                currentPage === idx + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-yellow-600 hover:text-white'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodDisplay;