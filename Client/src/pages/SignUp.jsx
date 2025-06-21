import React from 'react';
import bg from '../assets/Images/bg3.jpeg'; 
import food from '../assets/Images/Food.png';



const SignUpForm = () => {
  const backgroundImage = 'your_image_url_here.jpg'; // Replace with your actual image URL or path

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex w-[500px] h-[520px] max-w-7xl mx-auto rounded-[32px] overflow-hidden shadow-lg bg-black bg-opacity-70  hover:shadow-lg">
        {/* Left Section: Image (Hidden on smaller screens, shown on md and larger) */}
       

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center mb-8">
              <button
                className="text-[#FAB503] text-4xl mr-4 hover:text-[#D9D9D9] transform translate-x-[-10%] translate-y-[18%] "
                onClick={() => window.location.href = '/'}
                type="button"
              >
                &#8592; {/* Left Arrow */}
              </button>
              <h2 className="text-3xl translate-y-[18%] font-bold text-[#FAB503] uppercase tracking-wider flex-grow text-center pr-10 ">
                Sign Up
              </h2>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-opacity-0 w-full h-[32px] rounded-[10px] p-3 bg-gray-800 text-[#D9D9D9] border-b border-[#D9D9D9] focus:outline-none focus:border-[#FAB503] placeholder-[#D9D9D9] hover:border-[#FAB503]"
              />

              <button
                type="submit"
                className="w-full h-[40px] rounded-[30px] py-0 mt-5 bg-[#FAB503] text-[#D9D9D9] font-bold text-lg rounded-md hover:bg-[#FAB503] transition duration-300 hover:text-black hover:shadow-lg hover:scale-105 transform active:scale-95"
              >
                SIGN UP
              </button>
            </form>

            <div className="flex items-center my-6">
              <hr className=" w-full flex-grow border-[#D9D9D9]" />
              <span className="mx-4 text-[#D9D9D9]">OR</span>
              <hr className=" w-full flex-grow border-[#D9D9D9]" />
            </div>

            <button
              className="w-full h-[40px] rounded-[30px] py-3 flex items-center justify-center bg-transparent border border-[#D9D9D9] text-gray-300 font-semibold rounded-md hover:bg-[#FAB503] transition duration-300 hover:border-[#FAB503] hover:text-black"
            >
              {/* You'd typically use a library like 'react-icons' for the Google icon */}
            <span className="text-xl mr-2 ">G</span> Sign in with Google
          </button>

          <p className="mt-8 text-center text-[#D9D9D9] text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#FAB503] hover:underline">
              LOG IN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;