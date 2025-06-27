// src/components/BookingModal.jsx
import React from 'react';

function BookingModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl border border-yellow-600 relative">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Book a Table</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-300 text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-300 text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              id="time"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-gray-300 text-sm font-medium mb-1">Number of Guests</label>
            <input
              type="number"
              id="guests"
              min="1"
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="e.g., 4"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
        {/* Close button for the modal */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default BookingModal;
