import React from "react";
import userIcon from "../assets/Images/user-icon.png";
import restaurantIcon from "../assets/Images/restaurant-icon.png";
import bgImage from "../assets/Images/b3.jpeg";
import bottomIcon from "../assets/Images/l1.png"; 
import k from "../assets/Images/k1.png"; 
import Navbar from "../components/Navbar.jsx";
import pig from "../assets/Images/p1.jpg";


const UserZone = () => {
    return (
        
    <div className="min-h-screen flex">
      {/* Left side - Black section */}
    <div
        className="w-[40%] flex flex-col items-center justify-between p-10"
        style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >

        <div className="text-7xl font-bold text-[#FAB503] italic transform translate-x-[0%] translate-y-[320%]">
          User <span className="not-italic">Zone</span>
        </div>
        <div className="border-[2px] border-[#FAB503] w-3/4 mt-2 transform translate-x-[-20%] translate-y-[11700%]"></div>
        <div className="mt-auto">
          <img
            src={k}
            alt="Cutlery"
            className="w-72 mx-auto filter gold-filter rotate-305 transform translate-x-[20%] translate-y-[28%]"
          />
        </div>
        
        <div className="mt-auto">
          <img
            src={bottomIcon}
            alt="Cutlery"
            className="w-52 transform translate-x-[104%] translate-y-[20%]"
          />
        </div>
      </div>

      {/* Right side - Yellow section */}
      <div className="w-[60%] bg-[#FAB503] flex flex-col items-center justify-center space-y-10 relative">
        <div
          className="bg-black rounded-xl p-6 w-64 text-center shadow-md cursor-pointer hover:scale-105 transition"
          style={{
            backgroundImage: `url(${pig})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={userIcon}
            alt="User"
            className="w-20 h-20 mx-auto mb-2 mx-auto filter gold-filter"
          />
          <p className="text-yellow-400 text-xl font-medium">User</p>
        </div>

        <div
          className="bg-black rounded-xl p-6 w-64 text-center shadow-md cursor-pointer hover:scale-105 transition"
          style={{
            backgroundImage: `url(${pig})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={restaurantIcon}
            alt="Restaurant"
            className="w-16 h-16 mx-auto mb-2 mx-auto filter gold-filter"
          />
          <p className="text-yellow-400 text-xl font-medium">Restaurant</p>
        </div>

        <div className="absolute bottom-14 border-[2px] border-black w-11/12"></div>
      </div>
    </div>
    );
};

export default UserZone;