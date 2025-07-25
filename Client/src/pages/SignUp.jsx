import React, { useState, useEffect } from 'react';
import bg from '../assets/Images/bg3.jpeg';
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', form);
      localStorage.setItem('token', response.data.token);
      toast.success('Signup successful! Redirecting...');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Signup failed. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex w-[850px] h-[520px] max-w-7xl mx-auto rounded-[32px] overflow-hidden shadow-lg bg-black bg-opacity-70 hover:shadow-lg">
          <div className="hidden md:block md:w-1/2 p-8">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-5xl font-bold text-[#FAB503]">Join Foodly!</h1>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center mb-8">
              <button
                className="text-[#FAB503] text-4xl mr-4 hover:text-[#D9D9D9] transform translate-x-[-10%] translate-y-[18%]"
                onClick={() => navigate(-1)}
                type="button"
              >
                &#8592;
              </button>
              <h2 className="text-3xl translate-y-[18%] font-bold text-[#FAB503] uppercase tracking-wider flex-grow text-center pr-10">
                Sign Up
              </h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[40px] rounded-[30px] py-0 mt-5 bg-[#FAB503] text-[#D9D9D9] font-bold text-lg hover:text-black hover:shadow-lg hover:scale-105 transform active:scale-95 transition duration-300"
              >
                {loading ? 'Signing Up...' : 'SIGN UP'}
              </button>
            </form>

            <div className="flex items-center my-6">
              <hr className="w-full flex-grow border-[#D9D9D9]" />
              <span className="mx-4 text-[#D9D9D9]">OR</span>
              <hr className="w-full flex-grow border-[#D9D9D9]" />
            </div>

<<<<<<< HEAD
            <button className="w-full h-[40px] rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#D9D9D9] text-gray-300 font-semibold hover:bg-[#FAB503] hover:border-[#FAB503] hover:text-black transition duration-300">
              <span className="text-xl mr-2">G</span> Sign in with Google
            </button>
=======
            {/* <button className="w-full h-[40px] rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#D9D9D9] text-gray-300 font-semibold hover:bg-[#FAB503] hover:border-[#FAB503] hover:text-black transition duration-300">
              <span className="text-xl mr-2">G</span> Sign in with Google
            </button> */}
>>>>>>> 438ffe98c4d2de989247928cd61b9154eb2bc0bb

            <p className="mt-8 text-center text-[#D9D9D9] text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-[#FAB503] hover:underline">
                LOG IN
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
