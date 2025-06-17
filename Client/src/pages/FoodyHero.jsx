import React from "react";
import foodImage from "../assets/Images/bg.jpg"; 

const FoodyHero = () => {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url(${foodImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Optional: add overlay effect
        // filter: "brightness(0.7)"
      }}
    >
      {/* Top Section */}
      <div className="absolute top-10 flex flex-col items-center z-10">
        <h1 className="text-6xl font-bold">
          <span className="text-yellow-400">F</span>
          <span className="text-red-500">oo</span>
          <span className="text-yellow-400">d</span>
          <span className="text-red-500">y</span>
        </h1>
        <p className="text-yellow-300 mt-2 text-sm">Seamless dining starts with Fudly</p>
      </div>

      {/* Circle with food image */}
      <div className="relative z-10">
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 flex items-center justify-center">
          <div className="w-[220px] h-[220px] rounded-full overflow-hidden">
            <img src={foodImage} alt="Food" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      {/* Bottom Yellow Background */}
      <div className="absolute bottom-0 w-full h-[45%] bg-yellow-500 rounded-t-[0%]"></div>
    </div>
  );
};

export default FoodyHero;
