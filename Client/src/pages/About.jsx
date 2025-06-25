import React from "react";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";

const About = () => {
  return (
    <div className="bg-[#FAB503] flex flex-col items-center justify-between w-full">
      <div className="flex h-[220px] items-center justify-center max-w-6xl gap-6">
        <img
        src={aboutImage}
        alt="About"
        className="w-[360px] h-[360px] object-contain drop-shadow-xl transform translate-x-[0%] translate-y-[10%]"
        />
      </div>
         <h2 className="text-4xl font-bold transform translate-x-[94%] translate-y-[-260%]">
            <span className="text-[#FAB503]">Ab</span>
            <span className="text-black">out</span>
          </h2>
        <div className="w-[520px] h-[3px] h-1 bg-black mt- rounded-full transform translate-x-[-75%] translate-y-[-4230%]" />
        <div className="w-[470px] h-[3px] h-1 bg-black mt- rounded-full transform translate-x-[86%] translate-y-[-4330%]" />


      <div
        className="bg-black h-[350px] w-full px-4 md:px-20 lg:px-60 py-10 md:py-20 text-[#FAB503] text-center text-item-center space-y-6 font-medium text-base md:text-lg relative"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.95,
        }}
      >
        
          <p className=" transform translate-x-[0%] translate-y-[50%]">
            Fudly is your smart dining companion, helping you discover, reserve,
            and enjoy the best restaurants near you.
         
          <p><br/>
            Our mission is to simplify your dining journey from finding the right
            spot to enjoying your favorite dish.
          </p>
           </p>
      
    </div>
  </div>
  );
};

export default About;
