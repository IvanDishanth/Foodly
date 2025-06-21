import React from "react";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";

const About = () => {
  return (
    <div className="bg-[#D9D9D9] flex flex-col items-center justify-between w-full">
     <div className="flex items-center justify-center w-full max-w-6xl gap-6">
        {/* Left line */}
         <div className="w-full h-[1.5px] h-1 bg-[#FAB503] mt- rounded-full" />

        {/* Plate + Text */}
        <div className="flex items-center gap-3 relative">
          <img
            src={aboutImage}
            alt="About"
            className="w-[100px] h-[100px] object-contain drop-shadow-xl transform translate-x-[12%] translate-y-[3%]"
          />
          <h2 className="text-4xl font-bold transform translate-x-[-98%] translate-y-[-1%]">
            <span className="text-[#FAB503]">Ab</span>
            <span className="text-black">out</span>
          </h2>
        </div>

        {/* Right line */}
          <div className="w-full h-[1.5px] h-1 bg-yellow-500 mt- rounded-full" />
      </div>

      <div
        className="bg-black w-full px-4 md:px-20 lg:px-60 py-10 md:py-20 text-[#FAB503] text-center space-y-6 font-medium text-base md:text-lg relative"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.95,
        }}
        >
          <p>
            Fudly is your smart dining companion, helping you discover, reserve,
            and enjoy the best restaurants near you.
          </p>
          <p>
            Our mission is to simplify your dining journey from finding the right
            spot to enjoying your favorite dish.
          </p>
      
    </div>
  </div>
  );
};

export default About;
