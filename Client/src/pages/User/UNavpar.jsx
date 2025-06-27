import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '../../assets/Images/logo.png';

const UNavpar = ({ selectedFood, setSelectedFood, foodTags }) => {
return (
    <>
    
        
        <header className="flex items-center justify-between px-7 py-[0px] fixed top-[-18px] left-0 right-0 bg-black z-20">
            <div className="flex items-center gap-2 text-3xl font-bold text-yellow-500">
                <img src={logo} alt="Foodly Logo" className="h-[100px] w-[100px] object-contain" />
            </div>
            <div className="flex items-center bg-black border border-white rounded-full px-4 py-2 w-1/2">
                <FaSearch className="text-white mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-white w-full outline-none placeholder-white"
                />
                <FaMicrophone className="text-white ml-2" />
            </div>


            <nav className="flex justify-start items-center justify-center gap-10 px-6 py-1 text-[#FAB503] font-semibold fixed top-[64px] left-0 right-0 bg-black z-10">
            <Link to="#" className="border-b-2 border-black hover:border-[#FAB503]">Dining Out</Link>
            <Link to="/Uprofile" className="border-b-2 border-black hover:border-[#FAB503]">Profile</Link>
        </nav>



            <div className="space-x-4 text-[#FAB503] font-medium">
                 <Link to="/SignUp" className="hover:underline oneclick-hover">sign up</Link>
                <Link to="/login" className="hover:underline">log in</Link>
            </div>
        </header>
       
        
    </>
);
};

export default UNavpar;