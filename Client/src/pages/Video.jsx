// src/pages/Video.jsx
import React from 'react';
import V1 from '../assets/Images/V2.mp4';

const Video = () => {
  return (
    <div className="bg-[#FAB503] flex flex-col h-[100vh] items-center justify-center w-full">
      <div className="relative w-[1160px] h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={V1}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-7xl text-[#FAB503] font-bold tracking-wide">
            <span>Inside</span>
            <span className="text-[#EB0F0F]">Foodly</span>
          </h1>
        </div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {/* You can add a play icon here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;