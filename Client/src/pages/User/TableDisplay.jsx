// src/components/TableDisplay.jsx
import React from 'react';

function TableDisplay({ tables }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
      {tables && tables.map(table => (
        <div key={table._id} className="bg-gray-700 rounded-lg p-1 mt-1 shadow-md border border-gray-600">
          <img 
            src={`http://localhost:5173${table.image}`} 
            alt={table.name} 
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h3 className="text-xl font-bold text-white mb-1">{table.name}</h3>
          <p className="text-gray-300 mb-2">Capacity: {table.capacity} people</p>
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              table.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {table.isAvailable ? 'Available' : 'Booked'}
            </span>
            <button 
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm"
              disabled={!table.isAvailable}
            >
              {table.isAvailable ? 'Book Now' : 'Unavailable'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableDisplay;