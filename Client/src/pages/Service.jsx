import React from "react";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";
import k3 from "../assets/Images/k4.png";
import V1 from '../assets/Images/V2.mp4'; 
import b1 from '../assets/Images/b1.jpg';

const About = () => {
  return (
    <>
      <div className="bg-[#FAB503] flex flex-col h-screen items-center justify-center w-full">
        <div
          className="bg-black w-[1180px] h-[500px] rounded-[10px] px-4 md:px-20 lg:px-60 py-10 md:py-20 text-[#FAB503]  space-y-6 font-medium text-base md:text-lg relative"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.95,
          }}
        >
          <div className="flex flex-row space-x-24  mb-6 transform translate-x-[0%] translate-y-[35%]">
            <div className="bg-[#FAB503] rounded-[10px] flex flex-col h-[200px] shadow-[0_3px_40px_rgba(250,181,3,0.1)] items-center justify-between w-[200px]"></div>
            <div className="bg-[#FAB503] rounded-[10px] flex flex-col h-[200px] shadow-[0_3px_40px_rgba(250,181,3,0.1)] items-center justify-between w-[200px]"></div>
            <div className="bg-[#FAB503] rounded-[10px] flex flex-col h-[200px] shadow-[0_3px_40px_rgba(250,181,3,0.1)] items-center justify-between w-[200px]"></div>
          </div>
          <div className="w-[950px] h-[2px] h-1 bg-[#FAB503] mt- rounded-full transform translate-x-[-20%] translate-y-[7300%]" />
          <img
            src={k3}
            alt="Plate"
            className="absolute top-1/2 left-1/2 h-[50px] w-[200px] object-cover z-20 transform translate-x-[200%] translate-y-[300%]"
          />
        </div>
      </div>
    </>
  );
};

export default About;
