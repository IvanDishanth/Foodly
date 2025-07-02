import React from "react";
import userIcon from "../assets/Images/user-icon.png";
import restaurantIcon from "../assets/Images/restaurant-icon.png";
import bgImage from "../assets/Images/bg.jpg";
import bottomIcon from "../assets/Images/l1.png"; 
import k from "../assets/Images/k1.png"; 
import pig from "../assets/Images/p1.jpg";


const UserZone = () => {
    return (
      
    <div className="h-[600px] bg-[#FAB503] flex">
      {/* Left side - Black section */}
  

      {/* Right side - Yellow section */}
      <div className="w-[100%] bg-[plack] flex flex-col items-center justify-center space-y-10 relative">
      <a
      href="/UserDashboard"
      className="bg-black rounded-xl p-6 w-64 text-center shadow-md cursor-pointer hover:scale-105 transition"
      style={{
      backgroundImage: `url(${pig})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      textDecoration: "none"
      }}
      >
      <img
      src={userIcon}
      alt="User"
      className="w-20 h-20 mx-auto mb-2 mx-auto filter gold-filter"
      />
      <p className="text-yellow-400 text-xl font-medium">User</p>
      </a>

      <a
      href="/RestaurantLoginForm"
      className="bg-black rounded-xl p-6 w-64 text-center shadow-md cursor-pointer hover:scale-105 transition"
      style={{
      backgroundImage: `url(${pig})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      textDecoration: "none"
      }}
      >
      <img
      src={restaurantIcon}
      alt="Restaurant"
      className="w-20 h-20 rounded-full mx-auto mb-2 mx-auto filter gold-filter"
      />
      <p className="text-yellow-400 text-xl font-medium">Restaurant</p>
      </a>

      <div className="absolute bottom-14 border-[2px] border-black w-11/12"></div>
      </div>
    </div>
    );
};

export default UserZone;