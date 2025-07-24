// src/components/TableDisplay.jsx
import React, { useState } from 'react';

function TableDisplay({ tables }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tablesPerPage = 3;
  const totalPages = Math.ceil((tables?.length || 0) / tablesPerPage);

  // Get current page tables
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = tables?.slice(indexOfFirstTable, indexOfLastTable) || [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTables.map(table => (
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

export default TableDisplay;