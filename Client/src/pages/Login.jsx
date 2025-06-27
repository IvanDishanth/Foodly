import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/Images/bg3.jpeg';
import api from '../api/axios'; // Make sure this is your axios instance

const LoginForm = () => {
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
    const res = await api.post('/auth/login-user', {
      email: form.email,
      password: form.password
    });

    localStorage.setItem('token', res.data.token); // Save token
    setLoading(false);
    navigate('/'); // Redirect after successful login
  } catch (err) {
    setError(
      err?.response?.data?.message ||
      err?.message ||
      'Login failed. Please try again.'
    );
    setLoading(false);
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex w-[850px] h-[520px] max-w-7xl mx-auto rounded-[32px] overflow-hidden shadow-lg bg-black bg-opacity-70">
        <div className="hidden md:block md:w-1/2 p-8"></div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center mb-8">
            <Link to="#" onClick={() => navigate(-1)} className="text-[#FAB503] text-4xl mr-4 hover:text-gray-300">
              &#8592;
            </Link>
            <h2 className="text-3xl font-bold text-[#FAB503] uppercase tracking-wider flex-grow text-center pr-10">
              Log In
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-[10px] bg-opacity-0 p-3 bg-gray-800 text-blue border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503]"
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-[10px] bg-opacity-0 p-3 bg-gray-800 text-white border-b border-[#D9D9D9] focus:outline-none focus:border-yellow-500 placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <Link to="/forgot-password" className="absolute right-0 top-1/2 -translate-y-1/4 text-sm text-[#FAB503] hover:underline px-3 py-1">
                
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[30px] py-3 mt-6 bg-[#FAB503] hover:text-[#D9D9D9] text-black font-bold text-lg rounded-md hover:bg-yellow-600 transition duration-300"
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          {error && <div className="text-red-400 mt-2">{error}</div>}

          <div className="flex items-center my-6">
            <hr className="flex-grow border-[#FAB503]" />
            <span className="mx-4 text-[#D9D9D9]">OR</span>
            <hr className="flex-grow border-[#FAB503]" />
          </div>

          <button
            className="w-full rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#FAB503] text-[#D9D9D9] font-semibold rounded-md hover:bg-[#FAB503] hover:text-black transition duration-300"
          >
            <span className="text-xl mr-2">G</span> Sign in with Google
          </button>

          <p className="mt-8 text-center text-[#D9D9D9] text-sm">
            Don't have an account?{' '}
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