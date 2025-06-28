import React from 'react';
import { FaThumbsUp, FaTwitter, FaDribbble } from 'react-icons/fa';
import V1 from '../assets/Images/V2.mp4'; 

const video = () => {
  return (
    <>
    <div className="bg-[#FAB503] flex flex-col h-[100vh] items-center justify-center w-full">
    <div className="relative w-[1280px] h-[400px] rounded-[10px] hover:scale-105 transition-transform duration-822  overflow-hidden parallax-bg ">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-7xl text-yellow-400 font-bold">Inside Foodly</h1>
      </div>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={V1}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
    
    </div>

    </>
  );
};

export default video;
