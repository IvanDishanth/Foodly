// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Global variables provided by Canvas runtime
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfigRaw = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state for auth context
  const [userId, setUserId] = useState(null);

  // States for Firebase service instances
  const [authInstance, setAuthInstance] = useState(null);
  const [dbInstance, setDbInstance] = useState(null);

  const [firebaseInitialized, setFirebaseInitialized] = useState(false); // Tracks if Firebase App is initialized
  const [initError, setInitError] = useState(null); // Stores any Firebase initialization errors

  // Use a ref to ensure Firebase App is initialized only once
  const isFirebaseAppInitialized = useRef(false);

  // --- Firebase App and Service Initialization ---
  useEffect(() => {
    // Prevent re-initialization if already done or if there's a pending error
    if (isFirebaseAppInitialized.current || initError) {
      setLoading(false); // Stop loading if already attempted or errored
      return;
    }

    let config;
    try {
      config = JSON.parse(firebaseConfigRaw);
      if (!config || !config.apiKey) {
        throw new Error("Firebase config or API key is missing/invalid. Please check __firebase_config.");
      }
    } catch (e) {
      console.error("Failed to parse Firebase config:", e);
      setInitError(e.message || "Invalid Firebase configuration format.");
      setLoading(false);
      return; // Stop here if config is invalid
    }

    try {
      const app = initializeApp(config);
      const auth = getAuth(app);
      const db = getFirestore(app);

      setAuthInstance(auth);
      setDbInstance(db);
      setFirebaseInitialized(true);
      setInitError(null); // Clear any previous errors
      isFirebaseAppInitialized.current = true; // Mark as successfully initialized
      console.log("Firebase App and services initialized successfully!");

      // --- Firebase Authentication State Listener ---
      // This listener handles user changes AFTER the Firebase app is ready
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          setUserId(user.uid);
          // Special handling for initial custom token sign-in (Canvas environment)
          if (!user.isAnonymous && user.uid === auth.currentUser.uid && typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            // Check if user is truly signed in with custom token or if it's redundant
            // Avoid calling signInWithCustomToken repeatedly if already authenticated
            // This is a simplified check, a real app might verify token freshness
            if (!localStorage.getItem('customTokenApplied')) { // Use localStorage flag
              try {
                await signInWithCustomToken(auth, __initial_auth_token);
                localStorage.setItem('customTokenApplied', 'true'); // Set flag
                console.log("Signed in with custom token.");
              } catch (error) {
                console.warn("Error signing in with custom token (might be already signed in or token expired/invalid):", error);
              }
            }
          }
        } else {
          setCurrentUser(null);
          setUserId(null);
          // If no user, ensure anonymous sign-in for Firestore access
          try {
            if (!auth.currentUser || auth.currentUser.isAnonymous) {
              await signInAnonymously(auth);
              console.log("Ensured anonymous sign-in.");
            }
          } catch (anonError) {
            console.error("Error during anonymous sign-in fallback:", anonError);
          }
        }
        setLoading(false); // Authentication state determined, stop global loading
      });

      return () => {
        unsubscribeAuth(); // Cleanup auth listener on unmount
        // Optionally, clear Firebase app if this component is unmounted and no other parts use it
        // if (app.name && deleteApp) { // deleteApp might not be universally available or desired
        //   deleteApp(app);
        //   console.log("Firebase app deleted on unmount.");
        // }
      };

    } catch (e) {
      console.error("Firebase App or Service initialization failed:", e);
      setInitError(e.message || "Failed to initialize Firebase services.");
      setFirebaseInitialized(false);
      setAuthInstance(null);
      setDbInstance(null);
      setLoading(false);
      isFirebaseAppInitialized.current = false; // Allow re-attempt
    }
  }, [firebaseConfigRaw]); // Dependency ensures effect re-runs if config changes

  // --- Firestore Data Operations (using dbInstance) ---
  const getUserData = async (uid) => {
    if (!dbInstance) {
      console.error("Firestore not initialized for getUserData.");
      throw new Error("Firestore not ready."); // Propagate error
    }
    const userDocRef = doc(dbInstance, 'artifacts', appId, 'users', uid, 'profile', 'data');
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such user document!");
        return null;
      }
    } catch (e) {
      console.error("Error getting user document:", e);
      throw e;
    }
  };

  const saveUserData = async (uid, data) => {
    if (!dbInstance) {
      console.error("Firestore not initialized for saveUserData.");
      throw new Error("Firestore not ready.");
    }
    const userDocRef = doc(dbInstance, 'artifacts', appId, 'users', uid, 'profile', 'data');
    try {
      await setDoc(userDocRef, data, { merge: true });
      console.log("User data saved successfully!");
    } catch (e) {
      console.error("Error saving user data:", e);
      throw e;
    }
  };

  // --- Auth Operations (using authInstance) ---
  const signup = (email, password) => {
    if (!authInstance) throw new Error("Authentication service not initialized.");
    return createUserWithEmailAndPassword(authInstance, email, password);
  };

  const login = (email, password) => {
    if (!authInstance) throw new Error("Authentication service not initialized.");
    return signInWithEmailAndPassword(authInstance, email, password);
  };

  const logout = () => {
    if (!authInstance) throw new Error("Authentication service not initialized.");
    localStorage.removeItem('customTokenApplied'); // Clear flag on logout
    return signOut(authInstance);
  };

  const updateUserProfile = (user, profile) => {
    if (!authInstance) throw new Error("Authentication service not initialized.");
    return updateProfile(user, profile);
  };

  // The value provided by the context
  const value = {
    currentUser,
    userId,
    loading, // True if still determining auth state or initializing Firebase
    firebaseInitialized, // True only if Firebase App and its services are successfully initialized
    initError,           // Error message if Firebase initialization failed
    db: firebaseInitialized ? dbInstance : undefined, // Only provide db if initialized
    auth: firebaseInitialized ? authInstance : undefined, // Only provide auth if initialized
    getUserData,
    saveUserData,
    signup,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Display a global loading state while Firebase initializes/authenticates */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 text-white text-lg">
          <p>Loading application data...</p>
        </div>
      )}
      {/* Display a prominent error if Firebase initialization failed */}
      {initError && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-red-400 z-50 p-4 text-center">
          <p className="text-xl mb-4">Error: Failed to initialize Firebase.</p>
          <p className="text-sm">Details: {initError}</p>
          <p className="text-sm mt-2">Please ensure your Firebase project is correctly linked to the Canvas environment and the API key is valid.</p>
        </div>
      )}
      {/* Render children only when not loading and no initialization error */}
      {!loading && !initError && children}
    </AuthContext.Provider>
  );
};
