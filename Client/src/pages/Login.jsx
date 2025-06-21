import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import  bg from '../assets/Images/bg3.jpeg';

const LoginForm = () => {
  // Replace with your actual background image URL or path
  const backgroundImage = 'your_image_url_here.jpg';

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex w-[500px] h-[520px]  max-w-7xl mx-auto rounded-[32px] overflow-hidden shadow-lg bg-black bg-opacity-70">
        {/* Left Section: Image (Hidden on smaller screens, shown on md and larger) */}
        <div className="hidden md:block md:w-1/2 p-8">
          {/* The image itself is the background of the parent div */}
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center mb-8">
            <Link to="/" className="text-[#FAB503] text-4xl mr-4 hover:text-gray-300">
              &#8592; {/* Left Arrow */}
            </Link>
            <h2 className="text-3xl font-bold text-[#FAB503] uppercase tracking-wider flex-grow text-center pr-10">
              Log In
            </h2>
          </div>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-[10px] bg-opacity-0 p-3 bg-gray-800 text-white border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503]"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-[10px] bg-opacity-0 p-3 bg-gray-800 text-white border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <Link to="/forgot-password" className="absolute right-0 top-1/2 -translate-y-1/4 text-sm text-[#FAB503] hover:underline px-3 py-1">
                Forgot Password?
              </Link>
            </div>


            <button
              type="submit"
              className="w-full rounded-[30px] py-3 mt-6 bg-[#FAB503] hover:text-[#D9D9D9] text-black font-bold text-lg rounded-md hover:bg-yellow-600 transition duration-300"
            >
              LOG IN
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-[#FAB503]" />
            <span className="mx-4 text-[#D9D9D9]">OR</span>
            <hr className="flex-grow border-[#FAB503]" />
          </div>

          <button
            className="w-full rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#FAB503] text-[#D9D9D9] font-semibold rounded-md hover:bg-[#FAB503] hover:text-black transition duration-300"
          >
            {/* For Google icon, use react-icons if needed. For now, a simple 'G' */}
            <span className="text-xl mr-2">G</span> Sign in with Google
          </button>

          <p className="mt-8 text-center text-[#D9D9D9] text-sm">
            Already have an account?{' '}
            <Link to="/signup" className="text-[#FAB503] hover:underline">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;