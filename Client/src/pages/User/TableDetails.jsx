// src/components/TableDetails.jsx
import React from 'react';

function TableDetails() {
  const tables = [
    {
      id: 1,
      image: '/images/table-details-1.jpg',
      alt: 'Cozy Corner Table',
      description: 'Perfect for intimate dinners, seats 2-4. Located near the window for a scenic view.',
      capacity: '2-4 guests',
      availability: 'Open',
    },
    {
      id: 2,
      image: '/images/table-details-2.jpg',
      alt: 'Large Family Table',
      description: 'Spacious table suitable for families or small groups. Comfortable seating for up to 8.',
      capacity: '6-8 guests',
      availability: 'Open',
    },
    {
      id: 3,
      image: '/images/table-details-3.jpg',
      alt: 'Outdoor Patio Seating',
      description: 'Enjoy the fresh air on our beautiful patio. Ideal for casual dining, seats 4.',
      capacity: '2-4 guests',
      availability: 'Closed', // Example of an unavailable table
    },
    {
      id: 4,
      image: '/images/table-details-4.jpg',
      alt: 'Bar Counter Seats',
      description: 'Quick seating at the bar, perfect for solo diners or a quick drink. First-come, first-served.',
      capacity: '1-2 guests',
      availability: 'Open',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tables.map((table) => (
        <div key={table.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border border-gray-700">
          <img
            src={table.image}
            alt={table.alt}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x200/444444/FFFFFF?text=Table+${table.id}`;
            }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{table.alt}</h3>
            <p className="text-gray-300 text-sm mb-2">{table.description}</p>
            <p className="text-gray-200 text-base mb-1">
              <span className="font-medium">Capacity:</span> {table.capacity}
            </p>
            <p className={`text-base font-medium ${table.availability === 'Open' ? 'text-green-400' : 'text-red-400'}`}>
              Availability: {table.availability}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableDetails;
