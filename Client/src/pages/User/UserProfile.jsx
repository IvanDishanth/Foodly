// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import UserProfileEditModal from "./UserProfileEditModal.jsx";
import userPlaceholder from '../../assets/Images/k3.png'; // Placeholder for user profile pic

function UserProfile() {
  const { currentUser, userId, getUserData, saveUserData, updateUserProfile } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        setLoading(true);
        setError('');
        try {
          const data = await getUserData(userId);
          setUserData(data);
        } catch (e) {
          setError('Failed to load user profile.');
          console.error("Error fetching user profile:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Not logged in or userId not available
        setError('Please log in to view your profile.');
      }
    };

    fetchProfile();
    // In a real app, you might listen to real-time updates for user profile if frequent changes are expected
    // const unsubscribe = onSnapshot(doc(db, 'artifacts', appId, 'users', userId, 'profile', 'data'), (docSnap) => { ... });
  }, [userId, getUserData]); // Re-run when userId or getUserData changes


  const handleProfileUpdate = async (updatedFields) => {
    setLoading(true);
    setError('');
    try {
      // Update Firebase Auth profile (for name/photoURL)
      if (currentUser) {
        const profileUpdates = {};
        if (updatedFields.name && updatedFields.name !== currentUser.displayName) {
          profileUpdates.displayName = updatedFields.name;
        }
        if (updatedFields.profilePictureFile) {
          // In a real app: Upload file to storage (e.g., Firebase Storage)
          // Get the download URL, then set photoURL
          const dummyPhotoURL = URL.createObjectURL(updatedFields.profilePictureFile); // For demo
          profileUpdates.photoURL = dummyPhotoURL;
          alert('Profile picture uploaded (simulated)!'); // Replace with actual upload and URL
        }

        if (Object.keys(profileUpdates).length > 0) {
          await updateUserProfile(currentUser, profileUpdates);
          // Refresh currentUser after update
          console.log("Firebase Auth Profile Updated.");
        }
      }

      // Update Firestore document for other fields (phone, etc.)
      await saveUserData(userId, {
        name: updatedFields.name,
        email: updatedFields.email, // Email might not be directly editable in Firestore if tied to auth
        phoneNumber: updatedFields.phoneNumber,
        // photoURL will be updated through updateProfile, so might not need to save here
      });

      // After successful save, refresh local state or re-fetch
      const updatedData = await getUserData(userId);
      setUserData(updatedData);
      setShowEditModal(false);
      alert('Profile updated successfully!'); // Use custom modal
    } catch (e) {
      setError('Failed to update profile.');
      console.error("Error updating user profile:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  // Fallback if no user data after loading
  if (!userData && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        <p>User profile not found. Please log in or sign up.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Your Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={currentUser?.photoURL || userData?.photoURL || userPlaceholder}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-yellow-500 shadow-md"
          />
          <h3 className="text-2xl font-semibold text-white mb-2">{currentUser?.displayName || userData?.name || 'Guest User'}</h3>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <p>Email: {currentUser?.email || userData?.email || 'N/A'}</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>
            <p>Phone: {userData?.phoneNumber || 'N/A'}</p>
          </div>
          {/* Add more user details if available */}
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-md transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z"/></svg>
          <span>Edit Profile</span>
        </button>
      </div>

      {showEditModal && (
        <UserProfileEditModal
          onClose={() => setShowEditModal(false)}
          onSave={handleProfileUpdate}
          initialData={{
            name: currentUser?.displayName || userData?.name || '',
            email: currentUser?.email || userData?.email || '',
            phoneNumber: userData?.phoneNumber || '',
            profilePicture: currentUser?.photoURL || userData?.photoURL || userPlaceholder,
          }}
        />
      )}
    </div>
  );
}

export default UserProfile;
