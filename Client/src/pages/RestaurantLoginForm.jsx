import React, { useState } from 'react';
import bg from '../assets/Images/bg3.jpeg'; 
import axios from "../api/axios.js";
import { useNavigate, Link } from 'react-router-dom';
// Mocking the background image for demonstration purposes.
// In a real application, ensure `bg` path points to a valid image.



const api = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate backend authentication logic for restaurants
        if (data.email === 'restaurant@example.com' && data.password === 'restaurant123') {
          resolve({
            data: {
              message: "Restaurant login successful",
              restaurant: {
                id: "rest_id_123",
                name: "Delicious Bites",
                email: "restaurant@example.com",
              },
              token: 'mock-restaurant-jwt-token-45678'
            }
          });
        } else {
          reject({ response: { data: { message: 'Invalid email or password' } } });
        }
      }, 1000); // Simulate network delay
    });
  }
};


// Simple Link and useNavigate mock for standalone demo
<Link to="/Restaurant-Dashboard" className="your-class">
  Go to Dashboard
</Link>


const RestaurantLoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to your backend restaurant login endpoint
      const res = await axios.post('/auth/login-restaurant', {
        email: form.email,
        password: form.password
      });

      // Save token and restaurant info (if needed) to local storage
      localStorage.setItem('restaurantToken', res.data.token);
      localStorage.setItem('restaurantInfo', JSON.stringify(res.data.restaurant)); // Save restaurant details
      setLoading(false);
      // Redirect to the restaurant dashboard after successful login
      navigate('/restaurant-dashboard');
    } catch (err) {
      // Handle different error structures from the backend
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <>
    
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center text-white font-inter"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex w-[850px] h-[520px] max-w-7xl mx-auto rounded-[32px] overflow-hidden shadow-lg bg-black bg-opacity-70">
          {/* Left panel for visual balance, potentially with restaurant-themed image/text */}
          <div className="hidden md:block md:w-1/2 p-8">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-5xl font-bold text-[#FAB503]">Manage Your Restaurant!</h1>
            </div>
          </div>
          {/* Restaurant Login Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center mb-8">
              <Link to="#" onClick={() => navigate(-1)} className="text-[#FAB503] text-4xl mr-4 hover:text-gray-300 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-800">
                &#8592; {/* Back arrow */}
              </Link>
              <h2 className="text-3xl font-bold text-[#FAB503] uppercase tracking-wider flex-grow text-center pr-10">
                Restaurant Log In
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Restaurant Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-[10px] bg-transparent p-3 text-white border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503] transition duration-300"
              />
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[10px] bg-transparent p-3 text-white border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503] transition duration-300"
                />
                <Link to="/restaurant-forgot-password" className="absolute right-0 top-1/2 -translate-y-1/4 text-sm text-[#FAB503] hover:underline px-3 py-1">
                  Forgot?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[30px] py-3 mt-6 bg-[#FAB503] text-black font-bold text-lg hover:bg-yellow-600 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
            </form>

            {error && <div className="text-red-400 mt-2 text-center text-sm">{error}</div>}

            <div className="flex items-center my-6">
              <hr className="flex-grow border-[#FAB503]" />
              <span className="mx-4 text-[#D9D9D9]">OR</span>
              <hr className="flex-grow border-[#FAB503]" />
            </div>

            <button
              className="w-full rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#FAB503] text-[#D9D9D9] font-semibold hover:bg-[#FAB503] hover:text-black transition duration-300 shadow-md hover:shadow-lg"
            >
              <span className="text-xl mr-2">G</span> Sign in with Google
            </button>

            {/* <p className="mt-8 text-center text-[#D9D9D9] text-sm">
              Don't have a restaurant account?{' '}
              <Link to="/restaurant-signup" className="text-[#FAB503] hover:underline">
                SIGN UP
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantLoginForm;
