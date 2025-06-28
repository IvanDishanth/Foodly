// src/components/RestaurantProfileEditForm.jsx
import React, { useState, useEffect } from 'react';

// This form uses the same design principles as your SignUp form
// (dark background, central semi-transparent card, yellow accents)
// Assume a general background is applied via a parent component or global CSS,
// or you can import a background image here if this component is a standalone page.
// For a modal, the parent (RestaurantAdminDashboard) provides the main background.

function RestaurantProfileEditForm({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    ownerName: '',
    phoneNumber: '',      // Mobile
    landPhoneNumber: '',  // Landline
    registrationNumber: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(initialData.profilePicture || "https://placehold.co/100x100/555555/FFFFFF?text=Logo");

  // Populate form with initial data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        restaurantName: initialData.name || '',
        address: initialData.address || '',
        ownerName: initialData.ownerName || '',
        phoneNumber: initialData.phoneNumber || '',
        landPhoneNumber: initialData.landPhoneNumber || '',
        registrationNumber: initialData.registrationNumber || '',
      });
      // Ensure profile picture preview is set from initialData if available
      setProfilePicturePreview(initialData.profilePicture || "https://placehold.co/100x100/555555/FFFFFF?text=Logo");
    }
  }, [initialData]);

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
    // Pass back updated form data and potentially the new file
    onSave({
      ...formData,
      profilePictureFile, // Send the actual file object
      profilePicturePreview, // Send the preview URL for immediate UI update
    });
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      {/* Modal Content - Replicates SignUp form's central card design */}
      <div className="relative bg-gray-900 bg-opacity-90 rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl w-full max-w-md mx-4 sm:mx-auto border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header Section */}
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-[#FAB503] uppercase tracking-wider text-center flex-grow">
            Edit Restaurant Details
          </h2>
        </div>

        {/* Profile Picture Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePicturePreview}
            alt="Restaurant Profile"
            className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-yellow-500 shadow-md"
          />
          <label
            htmlFor="profilePicture"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-full cursor-pointer transition-colors duration-200"
          >
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            className="hidden" // Hide the default file input
            accept="image/*" // Accept all image types
            onChange={handleFileChange}
          />
        </div>

        {/* Form Fields - Styled like SignUpForm */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
            required
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (Mobile)"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />
          <input
            type="tel"
            name="landPhoneNumber"
            placeholder="Land Phone Number (Optional)"
            value={formData.landPhoneNumber}
            onChange={handleChange}
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />
          <input
            type="text"
            name="registrationNumber"
            placeholder="Hotel Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            className="bg-transparent w-full h-[32px] rounded-[10px] p-3 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
          />

          {/* Save Details Button */}
          <button
            type="submit"
            className="w-full h-[40px] rounded-[30px] py-0 mt-5 bg-[#FAB503] text-[#D9D9D9] font-bold text-lg hover:bg-[#FAB503] transition duration-300 hover:text-black hover:shadow-lg hover:scale-105 transform active:scale-95"
          >
            SAVE DETAILS
          </button>
        </form>

        {/* OR Separator and Add Photos button */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-[#D9D9D9]" />
          <span className="mx-4 text-[#D9D9D9]">OR</span>
          <hr className="flex-grow border-[#D9D9D9]" />
        </div>
        <button
          type="button"
          className="w-full h-[40px] rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#D9D9D9] text-gray-300 font-semibold hover:bg-[#FAB503] transition duration-300 hover:border-[#FAB503] hover:text-black"
          onClick={() => alert('Future feature: Open image upload gallery')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <span>Add More Restaurant Photos</span>
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-[#D9D9D9] text-sm">
          Return to dashboard?{' '}
          <button
            onClick={onClose}
            className="text-[#FAB503] hover:underline"
          >
            CANCEL
          </button>
        </p>
      </div>
    </div>
  );
}

export default RestaurantProfileEditForm;
