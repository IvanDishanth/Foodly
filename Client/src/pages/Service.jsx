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
        <div className="w-full bg-black text-white ">
            <Navbar />
            <div className="flex">
                {/* Left Side */}
                <div className="w-[40%] p-10 h-screen flex flex-col justify-center bg-cover bg-center flex flex-col justify-between items-center text-[#FAB503] font-bold text-center "
                    style={{ backgroundImage: `url(${bgImage})` }}>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h1 className="text-5xl font-serif italic font-semibold transform translate-x-[1%] translate-y-[250%]">User <span className="not-italic">Zone</span></h1>
                            <img src={k} alt="Knife Icon"className="mt-10 h-full w-60 rotate-270 transform translate-x-[110%] translate-y-[50%]"/>
                        </div>
                        <img src={bottomIcon} alt="Cutlery Icon" className="w-[200px] h-[200px] transform translate-x-[110%] translate-y-[20%]" />
                        <div className=" w-[400px] h-0.5  bg-[#FAB503]  rounded-full transform translate-x-[-15%] translate-y-[-180%]" />
                </div>

                {/* Right Side */}
                <div className="w-[60%] bg-[#FAB503] flex flex-col justify-center items-center space-y-12 p-10">

                    {/* User button */}
                    <div
                        className="bg-black p-6 rounded-2xl text-center w-2/3 hover:scale-105 transition-transform cursor-pointer"
                        style={{ backgroundImage: `url(${pig})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <img src={userIcon} alt="User" className="mx-auto w-12 h-12 mb-2" />
                        <h2 className="text-yellow-400 font-semibold text-lg">User</h2>
                    </div>


                    {/* Restaurant button */}
                    <div
                        className="bg-black p-6 rounded-2xl text-center w-2/3 transition-transform cursor-pointer hover:scale-105 transform active:scale-95"
                        style={{ backgroundImage: `url(${pig})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <img src={restaurantIcon} alt="Restaurant" className="mx-auto w-12 h-12 mb-2" />
                        <h2 className="text-yellow-400 font-semibold text-lg">Restaurant</h2>
                    </div>
                    {/* Horizontal line */}
                    <div className="w-full h-0.5  bg-black  rounded-full transform translate-x-[-1%] translate-y-[4570%]" />
                </div>
            </div>
        </div>
    );
};

export default UserZone;