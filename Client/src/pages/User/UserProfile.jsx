import React, { useState } from 'react';
import UserProfileEditModal from "./UserProfileEditModal.jsx";
import axios from 'axios';

const FALLBACK_AVATAR = 'https://placehold.co/150x150?text=No+Image';



// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
});

function UserProfile({ user, setUser }) {
  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }
 
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (updatedUserData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Authentication token missing.");

      const payload = {
        name: updatedUserData.name?.trim() || '',
        email: updatedUserData.email?.trim() || '',
      };

      if (updatedUserData.phone?.trim()) {
        payload.phone = updatedUserData.phone.trim();
      }

     if (
  updatedUserData.profilePic &&
  typeof updatedUserData.profilePic === "string" &&
  !updatedUserData.profilePic.includes("placeholder")
) {
  payload.profilePic = updatedUserData.profilePic;
}


      console.log("🚀 Payload being sent:", payload);

      // Local validation
      if (!payload.name || !payload.email) {
        throw new Error("Name and Email are required");
      }
      if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
        throw new Error("Please enter a valid email address");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const isFileUpload = payload.profilePic instanceof File;

      if (isFileUpload) {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("email", payload.email);
        if (payload.phone) formData.append("phone", payload.phone);
        formData.append("profilePic", payload.profilePic);

        config.headers["Content-Type"] = "multipart/form-data";

        const response = await api.put("/user", formData, config);
        handleSuccess(response.data);
      } else {
        if (payload.profilePic && typeof payload.profilePic !== 'string') {
          delete payload.profilePic;
        }

        const response = await api.put("/user", payload, config);
        handleSuccess(response.data);
      }
    } catch (error) {
      console.error("❌ Update error:", error.response?.data || error.message);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (updatedUser) => {
    setUser(updatedUser);
    setShowEditModal(false);
    alert("Profile updated successfully!"); // Replace with toast if needed
  };

  const handleError = (error) => {
    let message = 'Failed to update profile';

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.errors) {
      message = Object.values(error.response.data.errors)
        .map(err => err.message || err)
        .join('\n');
    } else if (error.message) {
      message = error.message;
    }

    setError(message);
    alert(message); // Replace with toast if desired
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <img
  src={user?.profilePic || "https://via.placeholder.com/150"}
  alt="Profile"
  className="w-32 h-32 rounded-full"
/>

          <button 
            className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600"
            onClick={() => setShowEditModal(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            )}
          </button>
        </div>

        {/* Basic Info */}
        <h2 className="text-2xl font-bold text-gray-800">{user.name || 'No name provided'}</h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Details */}
        <div className="w-full mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-gray-800">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Edit Profile'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <UserProfileEditModal 
          user={user}
          onClose={() => !isLoading && setShowEditModal(false)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default UserProfile;
