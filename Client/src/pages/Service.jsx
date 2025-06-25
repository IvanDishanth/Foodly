import React from "react";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";
import k3 from "../assets/Images/k4.png";
import V1 from '../assets/Images/V2.mp4'; 
import b1 from '../assets/Images/b1.jpg';

const About = () => {
  return (
    <>
    
      <div className="bg-black w-full h-[500px] px-4 md:px-20 lg:px-60 py-10 md:py-20 text-[#FAB503] text-center space-y-6 font-medium text-base md:text-lg relative"
      

        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.95,
        }}
        >
            <div className="flex justify-center items-center space-x-8 mb-8">
        <img src={b1} alt="About 1" className="h-52 w-52 shadow-[0_3px_40px_rgba(250,181,3,0.5)] rounded-[10px] transform translate-x-[-50%] translate-y-[0%]" />
        <img src={b1} alt="About 2" className="h-52 w-52 shadow-[0_3px_40px_rgba(250,181,3,0.5)] rounded-[10px] transform translate-x-[0%] translate-y-[0%]" />
        <img src={b1} alt="About 3" className="h-52 w-52 shadow-[0_3px_40px_rgba(250,181,3,0.5)] rounded-[10px] transform translate-x-[50%] translate-y-[0%]" />
      </div>
        
          <div className="w-[1000px] h-[1.5px] h-1 bg-yellow-500 mt- rounded-full transform translate-x-[-20%] translate-y-[9700%]" />
            <img
                    src={k3}
                    alt="Plate"
                    className="absolute top-1/2 left-1/2 h-[110px] w-[310px] object-cover z-20 ransform translate-x-[59%] translate-y-[60%]"
                  />
           
      </div>
    </>
  
  );
};

export default About;
