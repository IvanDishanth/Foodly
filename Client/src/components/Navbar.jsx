import React from "react";
import logo from "../assets/Images/logo.png";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-5 py-1 bg-black text-yellow-400 fixed top-0 left-0 right-0 z-50">
            <img src={logo} alt="Foodly Logo" className="h-8" />
            <div className="space-x-6 text-sm">
                <a href="#" className="hover:underline">sign in</a>
                <a href="#" className="hover:underline">log in</a>
            </div>
        </nav>
    );
};

export default Navbar;