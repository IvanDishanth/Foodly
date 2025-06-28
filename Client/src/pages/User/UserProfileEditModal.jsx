import React, { useState, useEffect } from 'react';

function UserProfileEditModal({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(initialData.profilePicture);

  useEffect(() => {
    // If initialData.profilePicture is not set, use a placeholder
    if (!initialData.profilePicture) {
      setProfilePicturePreview("https://placehold.co/100x100/555555/FFFFFF?text=User");
    }
  }, [initialData.profilePicture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePictureFile(file);
      setProfilePicturePreview(URL.createObjectURL(file)); // Create URL for immediate preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, profilePictureFile }); // Pass the file object up
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 bg-opacity-90 rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl border border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Edit Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePicturePreview}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover mb-3 border-2 border-yellow-500 shadow-md"
          />
          <label
            htmlFor="userProfilePicture"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-full cursor-pointer transition-colors duration-200"
          >
            Change Photo
          </label>
          <input
            type="file"
            id="userProfilePicture"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pb-2 bg-transparent border-b border-gray-500 text-white focus:border-yellow-500 outline-none placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              // Email is usually not directly editable via profile forms if it's the primary auth method
              // onChange={handleChange} // Uncomment if you want to allow email changes
              className="w-full pb-2 bg-transparent border-b border-gray-500 text-gray-500 focus:border-yellow-500 outline-none placeholder-gray-500 cursor-not-allowed"
              disabled // Email often disabled for direct editing
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pb-2 bg-transparent border-b border-gray-500 text-white focus:border-yellow-500 outline-none placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-md transition-colors shadow-md mt-6"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileEditModal;
