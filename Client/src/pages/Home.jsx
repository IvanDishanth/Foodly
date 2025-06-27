
import React from "react";
import foodImage from "../assets/Images/bg.jpg"; 
import logo from "../assets/Images/logo.png";
import plate from "../assets/Images/goldplate.png";
import food from "../assets/Images/plate2.png"; 
import About from "./About.jsx";
import Gateway from "./Gateway.jsx";
import Service from "./Service.jsx";
import Video from "./Video.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


const FoodyHero = () => {
  return (
    <>
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url(${foodImage})` ,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Optional: add overlay effect
        // filter: "brightness(0.7)"
      }}
    >
      {/* Top Section */}
      <div className="absolute top-10 flex flex-col items-center z-10">
        <h1 className="text-6xl font-bold mt-4">
          <img src={logo} alt="Food" className="object-cover w-64 h-30" />
        </h1>
        <p className="text-[#FAB503]  text-sm">Seamless dining starts with Fudly</p>
      </div>

      {/* Circle with food image */}
      <div className="relative z-20 mt-40 flex items-center justify-center" style={{ width: 500, height: 500 }}>
        <div
          className="absolute top-7 left-2.1 z-10"
          style={{
            width: 600,
            height: 390,
            overflow: "hidden",
            borderRadius: "50% / 50%",
            // boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={foodImage}
            alt="Food background"
            className="object-cover w-full h-full"
            style={{ filter: "brightness(2)" }}
          />
        </div>
        <img
          src={plate}
          alt="Plate"
          className="absolute top-1/2 left-1/2 w-[510px] h-[510px] object-cover z-20"
          style={{ transform: "translate(-50%, -55%)" }}
        />

        <img
          src={food}
          alt="Food"
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] object-cover z-30 cursor-pointer flex justify-center items-center"
          onClick={() => window.location.href = "/About.jsx"} // Navigate to About page on click
          style={{ transform: "translate(-48%, -54%)" }}
        />
      </div>
      {/* Bottom Yellow Background */}
      <div className="absolute bottom-0 w-full h-[45%] bg-[#FAB503] rounded-t-[0%]"></div>
    </div>
    <Navbar />
    <About />
    <Video />
    <Service />
    <Gateway />
    <Footer />
    </>
  );
};

export default FoodyHero;
