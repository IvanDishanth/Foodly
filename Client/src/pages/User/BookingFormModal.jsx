import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiX, FiCalendar, FiClock, FiUsers, FiEdit } from 'react-icons/fi';

function BookingFormModal({ restaurant, onClose, onSubmit }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          restaurantId: restaurant._id || "6862309ddcfabab293b2fa0b",
          restaurantName: restaurant.name,
          date,
          time,
          guests,
          specialRequests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      onSubmit(response.data);
      onClose();
    } catch (err) {
      alert('Booking failed: ' + (err?.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full"
        >
          <FiX size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Reserve at {restaurant.name}</h2>
          <p className="text-gray-400 mb-6">Secure your table in just a few clicks</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiCalendar />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiClock />
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FiUsers />
                </div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none text-gray-500">
                <FiEdit />
              </div>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests? (Allergies, celebrations, etc.)"
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                rows="3"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isSubmitting 
                    ? 'bg-yellow-700 cursor-not-allowed' 
                    : 'bg-yellow-600 hover:bg-yellow-500 shadow-lg hover:shadow-yellow-500/30'
                } text-white flex items-center justify-center min-w-32`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default BookingFormModal;