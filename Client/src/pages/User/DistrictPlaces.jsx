// src/components/DistrictPlaces.jsx
import React from 'react';

function DistrictPlaces({ onDistrictSelect }) {
  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 
    'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {districts.map((district, index) => (
        <div 
          key={index} 
          className="bg-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-[#FAB504] hover:text-black transition-colors"
          onClick={() => onDistrictSelect && onDistrictSelect(district)}
        >
          <h3 className="font-bold">{district}</h3>
        </div>
      ))}
    </div>
  );
}

export default DistrictPlaces;