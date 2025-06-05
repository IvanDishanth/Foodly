import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-black text-yellow-400">
            <div className="text-2xl font-bold">
                <span className="text-white">F</span>
                <span className="text-yellow-500">oo</span>
                <span className="text-red-500">dly</span>
            </div>
            <div className="space-x-6 text-sm">
                <a href="#" className="hover:underline">sign in</a>
                <a href="#" className="hover:underline">log in</a>
            </div>
        </nav>
    );
};

export default Navbar;