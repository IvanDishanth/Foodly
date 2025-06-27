import React from 'react';
import bgImage from '../assets/Images/f2.jpg'; // Your image path

const Footer = () => {
  return (
    <footer
      className="text-white py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-white">Discover</span>{' '}
          <span className="text-[#FAB503]">Delicious Moments</span>
        </h2>
        <p className="text-white max-w-xl mx-auto text-lg mb-6">
          Experience fine dining like never before. Your next
          <span className="text-[#FAB503] font-semibold"> favorite restaurant </span>
          is just a click away.
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-[#FAB503] transition">
            Home
          </a>
          <a href="#" className="hover:text-[#FAB503] transition">
            About
          </a>
          <a href="#" className="hover:text-[#FAB503] transition">
            Restaurants
          </a>
          <a href="#" className="hover:text-[#FAB503] transition">
            Contact
          </a>
        </div>

        <p className="text-sm mt-8 text-white/80">
          &copy; {new Date().getFullYear()} <span className="text-[#FAB503]">Fudly</span> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
