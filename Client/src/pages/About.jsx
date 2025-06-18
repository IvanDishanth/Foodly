import React from "react";
import aboutImage from "../assets/Images/plate2.png";

const About = () => {
  return (
    <div className=" flex flex-col items-center justify-between">
      {/* Top section - light gray background */}
      <div className=" bg-gray-200 pt-10 pb-52 flex flex-col items-center w-full "> 
        {/* Plate with text */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="flex items-center gap-4">
            <div className="h-[100px] w-[100px]">
              <img src={aboutImage} alt="About Plate" className="object-contain w-[400px] h-[400px]" />
            </div>
            <h2 className="text-4xl font-semibold text-black">About</h2>
          </div>

          {/* Horizontal lines */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-10">
            <span className="h-[2px] bg-yellow-500 w-1/3"></span>
            <span className="h-[2px] bg-yellow-500 w-1/3"></span>
          </div>
        </div>
      </div>

      {/* Bottom section - black textured background */}
      <div className=" bg-black px-60 py-28 text-yellow-400 text-center space-y-6 font-medium text-lg">
        <p>
          Fudly is your smart dining companion, helping you discover, reserve, and enjoy the best
          restaurants near you.
        </p>
        <p>
          Our mission is to simplify your dining journey from finding the right spot to enjoying
          your favorite dish.
        </p>
      </div>
    </div>
  );
};

export default About;
