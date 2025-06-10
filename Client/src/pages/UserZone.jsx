import React from "react";
import userIcon from "../assets/Images/user-icon.png";
import restaurantIcon from "../assets/Images/restaurant-icon.png";
import bgImage from "../assets/Images/b1.jpeg";
import bottomIcon from "../assets/Images/logo.png"; 
import k from "../assets/Images/k.png"; 
import Navbar from "../components/Navbar.jsx";


const UserZone = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="flex">
                {/* Left Side */}
                <div className="w-2/4 p-10 h-screen flex flex-col justify-center bg-cover bg-center flex flex-col justify-between items-center text-yellow-400"
                    style={{ backgroundImage: `url(${bgImage})` }}>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h1 className="text-5xl font-serif italic font-semibold">User <span className="not-italic">Zone</span></h1>
                            <img src={k} alt="Knife Icon"className="mt-4 w-28"/>
                        </div>

                        <div className="w-full px-6 pb-4 flex justify-between items-end">
                            <div className="w-52 h-0.5 bg-yellow-400" />
                            <img src={bottomIcon} alt="Cutlery Icon" className="w-14 h-14" />
                            
                        </div>
                        </div>
            

                {/* Right Side */}
                <div className="w-3/4 bg-yellow-400 flex flex-col justify-center items-center space-y-12 p-10">
                 
                
                    {/* User button */}
                    <div className="bg-black p-6 rounded-2xl text-center w-2/3 hover:scale-105 transition-transform cursor-pointer">
                        <img src={userIcon} alt="User" className="mx-auto w-12 h-12 mb-2" />
                        <h2 className="text-yellow-400 font-semibold text-lg">User</h2>
                    </div>

                    {/* Restaurant button */}
                    <div className="bg-black p-6 rounded-2xl text-center w-2/3 hover:scale-105 transition-transform cursor-pointer">
                        <img src={restaurantIcon} alt="Restaurant" className="mx-auto w-12 h-12 mb-2" />
                        <h2 className="text-yellow-400 font-semibold text-lg">Restaurant</h2>
                    </div>
                    <div className="w-full h-1 bg-black mt- rounded-full" />
                
                </div>
            </div>
        </div>
    );
};

export default UserZone;