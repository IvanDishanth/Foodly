import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const aboutSectionRef = useRef(null);
  const heroRef = useRef(null);
  const plateRef = useRef(null);
  const foodRef = useRef(null);
 

   useEffect(() => {
    // Initial hero section fade-in
    gsap.from(heroRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    });

    // Plate rotation animation (GSAP is good for continuous loops)
    gsap.to(plateRef.current, {
      rotation: 360,
      duration: 60, // Slower rotation for elegance
      repeat: -1,
      ease: "none",
    });

    

    // Animate the scroll indicator
   
  }, []);

  const handleFoodImageClick = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: aboutSectionRef.current,
      ease: "power2.inOut"
    });
    
    // Click feedback animation
    gsap.to(foodRef.current, {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <>
      <div
        ref={heroRef}
        className="w-full h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), url(${foodImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 opacity-70"></div>

       

        {/* Top Section with Glassmorphism effect */}
        <div className="absolute top-10 flex flex-col items-center z-10 backdrop-blur-sm bg-black/30 rounded-2xl px-8 py-4 border border-[#FAB503]">
          <h1 className="text-6xl font-bold main-logo transition-transform duration-300">
            <img 
              src={logo} 
              alt="Foodly" 
              className="object-cover w-64 h-30 hover:scale-105 transition-transform drop-shadow-lg" 
            />
          </h1>
          <p className="text-[#FAB503] text-sm mt-2 font-medium tracking-wider">
            SEAMLESS DINING STARTS WITH FUDLY
          </p>
        </div>

        {/* Animated food display with 3D perspective */}
        <div className="relative z-20 mt-40 flex items-center justify-center perspective-1000" style={{ width: 500, height: 500 }}>
          <div
            className="absolute top-7 left-2.1 z-10 animate-rotate-slow"
            style={{
              width: 600,
              height: 390,
              overflow: "hidden",
              borderRadius: "50% / 50%",
              transformStyle: "preserve-3d"
            }}
          >
            <img
              src={foodImage}
              alt="Food background"
              className="object-cover w-full h-full"
              style={{ filter: "brightness(1.2) contrast(1.1)" }}
            />
          </div>
          
          <img
            ref={plateRef}
            src={plate}
            alt="Plate"
            className="absolute top-1/2 left-1/2 w-[510px] h-[510px] object-cover z-20 transform-gpu"
            style={{ 
              transform: "translate3d(-50%, -55%, 0)",
            
            }}
          />

          <img
            ref={foodRef}
            src={food}
            alt="Food"
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] object-cover z-30 cursor-pointer hover:scale-110 transition-transform duration-500 transform-gpu"
            onClick={handleFoodImageClick}
            style={{ 
              transform: "translate3d(-48%, -54%, 50px)",
              filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.5))"
            }}
          />
        </div>

        {/* Bottom section with wave animation */}
        <div className="absolute bottom-0 w-full h-[45%] bg-[#FAB503] rounded-t-[100%] overflow-hidden transform-gpu">

          
          {/* Gradient edge */}
          <div className="absolute -top-1 left-0 w-full h-10 bg-gradient-to-b from-transparent to-[#FAB503]"></div>
        </div>

     
      </div>

      <div ref={aboutSectionRef}>
        <About />
      </div>
      
      <Navbar />
      <Video />
      <Service />
      <Gateway />
      <Footer />
    </>
  );
};

export default Home;