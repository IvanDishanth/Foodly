// src/components/UserProfile.jsx
import React, { useState } from 'react';
import UserProfileEditModal from "./UserProfileEditModal.jsx";
import axios from 'axios';

const handleSave = async (updatedUserData) => {
  try {
    const token = localStorage.getItem('token'); // or from context
    const response = await axios.put(
      'http://localhost:5000/api/user',
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(response.data); // update the UI
    setShowEditModal(false);
  } catch (err) {
    console.error('Failed to update user:', err);
    alert('Failed to update profile. Please try again.');
  }
};


function UserProfile({ user, setUser }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setShowEditModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <img 
            src={user.profilePic} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
          />
          <button 
            className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600"
            onClick={() => setShowEditModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        
        <div className="w-full mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-gray-800">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowEditModal(true)}
            className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showEditModal && (
        <UserProfileEditModal 
          user={user} 
          onClose={() => setShowEditModal(false)} 
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UserProfile;