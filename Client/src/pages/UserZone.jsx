import React from "react";
import userIcon from "../assets/Images/user-icon.png";
import restaurantIcon from "../assets/Images/restaurant-icon.png";
import Navbar from "../components/Navbar.jsx";

const UserZone = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="flex">
                {/* Left Side */}
                <div className="w-1/2 p-10 flex flex-col justify-center bg-black">
                    <h1 className="text-5xl font-semibold text-yellow-400 mb-8">User Zone</h1>
                    <div className="text-yellow-400 text-8xl">🍴</div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 bg-yellow-400 flex flex-col justify-center items-center space-y-12 p-10">
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
                </div>
            </div>
        </div>
    );
};

export default UserZone;