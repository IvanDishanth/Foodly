import React, { useState } from 'react';
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaEdit } from 'react-icons/fa';
import Footer from "../../components/Footer.jsx";
import  bguser from "../../assets/Images/bguser.jpg"

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ivan Dishanth',
    phone: '0771234567',
    email: 'ivan@example.com',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Optional: send to backend here
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
     

      <div className="relative px-8 py-6">
        {/* Background Image (Burger) */}
        <img
          src={bguser}
          alt="Burger Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        />

        {/* Profile Section */}
        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="bg-gray-900/70 p-6 rounded-2xl w-full md:w-1/3">
            <div className="flex flex-col items-center text-center">
              <FaUserCircle className="text-8xl text-yellow-400 mb-2" />
              <div className="flex items-center mt-2">
                <p className="text-lg font-semibold">{profile.name}</p>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-3 text-yellow-400 hover:text-yellow-300"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center border-b border-yellow-400 pb-2">
                <FaUserCircle className="text-yellow-400 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="bg-transparent text-white w-full outline-none"
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>

              <div className="flex items-center border-b border-yellow-400 pb-2">
                <FaPhoneAlt className="text-yellow-400 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="bg-transparent text-white w-full outline-none"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>

              <div className="flex items-center border-b border-yellow-400 pb-2">
                <FaEnvelope className="text-yellow-400 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="bg-transparent text-white w-full outline-none"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Right Side Optional Panel */}
          <div className="bg-gray-900/40 w-full md:w-2/3 rounded-2xl min-h-[300px]"></div>
        </div>
      </div>
       <Footer /> 
    </div>
    
  
  );

};


export default ProfilePage;
