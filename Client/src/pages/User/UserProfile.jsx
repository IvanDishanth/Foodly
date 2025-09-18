import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FALLBACK_AVATAR = 'https://placehold.co/150x150?text=No+Image';

function UserProfileEditModal({ user, onClose, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePic: user.profilePic
  });
  const [profilePicPreview, setProfilePicPreview] = useState(user.profilePic);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      profilePic: formData.profilePic
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-4">
              <img 
                src={profilePicPreview || FALLBACK_AVATAR} 
                alt="Profile Preview" 
                className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-yellow-500"
              />
              <label className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 cursor-pointer">
                Change Photo
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                disabled={isLoading}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function UserProfile({ user, setUser }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }

  const handleSave = async (updatedData) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Authentication token missing.");

      let payload;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      if (updatedData.profilePic instanceof File) {
        payload = new FormData();
        payload.append("name", updatedData.name?.trim() || '');
        payload.append("email", updatedData.email?.trim() || '');
        if (updatedData.phone?.trim()) {
          payload.append("phone", updatedData.phone.trim());
        }
        payload.append("profilePic", updatedData.profilePic);
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = {
          name: updatedData.name?.trim() || '',
          email: updatedData.email?.trim() || '',
        };
        if (updatedData.phone?.trim()) {
          payload.phone = updatedData.phone.trim();
        }
        if (
          updatedData.profilePic &&
          typeof updatedData.profilePic === "string" &&
          !updatedData.profilePic.includes("placeholder")
        ) {
          payload.profilePic = updatedData.profilePic;
        }
      }

      const response = await axios.put(
        'http://localhost:5000/api/user/profile',
        payload,
        config
      );
      setUser(response.data.user);
      toast.success("Profile updated successfully!");
      setShowEditModal(false);
      setError(null);
    } catch (error) {
      const message = error.response?.data?.message || "Profile update error";
      toast.error(message);
      setError(message);
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={user?.profilePic || FALLBACK_AVATAR}
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

        <h2 className="text-2xl font-bold text-gray-800">{user.name || 'No name provided'}</h2>
        <p className="text-gray-600">{user.email}</p>

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

          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

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
