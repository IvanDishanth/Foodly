import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import ti from '../../assets/Images/bg3.jpeg';
import Footer from '../../components/Footer';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState('Open');

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-3xl font-bold text-yellow-400">
          <span className="text-red-600">F</span>oodly
        </div>
        <div className="space-x-4 text-yellow-400 font-medium">
          <button onClick={() => setShowProfile(true)}>Profile</button>
          <button onClick={() => setShowEdit(true)} className="inline-flex items-center gap-1">
            Edit <FaEdit />
          </button>
        </div>
      </header>

      {/* Restaurant Banner */}
      <div className="relative px-6">
        <img
          src={ti}
          alt="banner"
          className="w-full h-40 object-cover rounded-xl"
        />
        <h1 className="absolute bottom-2 left-6 text-3xl text-yellow-400 font-bold">
          Spicy Briyani Hub
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 px-6 py-4 text-yellow-400 text-lg font-medium border-b border-gray-700">
        {['home', 'update', 'booking'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'border-b-2 border-yellow-400' : ''
            } capitalize`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Toggle Buttons */}
      <div className="flex gap-4 px-6 py-4">
        <button
          onClick={() => setStatus('Open')}
          className={`px-4 py-2 rounded ${
            status === 'Open' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-yellow-300'
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setStatus('Closed')}
          className={`px-4 py-2 rounded ${
            status === 'Closed' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-yellow-300'
          }`}
        >
          Close
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 px-6">
        <button className="bg-gray-800 px-4 py-2 rounded text-yellow-400">Table</button>
        <button className="bg-gray-800 px-4 py-2 rounded text-yellow-400">Food</button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 px-6 py-6">
        {[1, 2, 3].map((_, i) => (
          <img
            key={i}
            src={ti}
            alt="Table"
            className="w-1/4 rounded-xl shadow-lg"
          />
        ))}
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[400px] text-white relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-yellow-400 text-xl"
            >
              ✕
            </button>
            <h2 className="text-yellow-400 text-xl mb-4">User Profile</h2>
            <p>Name: Ivan Dishanth</p>
            <p>Phone: 0771234567</p>
            <p>Email: ivan@example.com</p>
            <p>
              Status: <span className={`font-bold ${
                status === 'Open' ? 'text-green-400' : 'text-red-400'
              }`}>{status}</span>
            </p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[400px] text-white relative">
            <button
              onClick={() => setShowEdit(false)}
              className="absolute top-2 right-2 text-yellow-400 text-xl"
            >
              ✕
            </button>
            <h2 className="text-yellow-400 text-xl mb-4">Edit Restaurant</h2>
            <input
              className="w-full p-2 rounded bg-black border border-yellow-400 mb-4"
              placeholder="Restaurant Name"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded">Save</button>
          </div>
        </div>
      )}
    <Footer />
    </div>
  );
};

export default RestaurantDashboard;
