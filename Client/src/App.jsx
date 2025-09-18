import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gateway from "./pages/Gateway.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/Login.jsx";
import Service from "./pages/Service.jsx";
import Video from "./pages/Video.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import Footer from "./components/Footer.jsx";
import RDashboard from "./pages/Restaurant/RestaurantAdminDashboard.jsx";
import RestaurantDetailsPage from "./pages/User/RestaurantDetailsPage.jsx"; 
import UserProfile from "./pages/User/UserProfile.jsx";
import api from "./api/axios.js"; // use your custom axios instance
import RestaurantLoginForm from "./pages/RestaurantLoginForm.jsx";
import SuperAdminDashboard from "./pages/SuperAdminDashboard.jsx";

const role = localStorage.getItem('role');

function App() {
  useEffect(() => {
    api
      .get("/", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        toast.success("Backend Connected!");
      })
      .catch((err) => {
        if (err.response?.status !== 401) {
          console.error(err);
          toast.error("Backend Error");
        }
      });
  }, []);

  return (
    <>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Gateway" element={<Gateway />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Restaurant-Dashboard" element={<RDashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
        <Route path="/RestaurantLoginForm" element={<RestaurantLoginForm />} />
        <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />

        {/* Role Protected Routes */}
        <Route
          path="/UserDashboard"
          element={role === 'user' ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/SuperAdminDashboard"
          element={role === 'superadmin' ? <SuperAdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>


      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
