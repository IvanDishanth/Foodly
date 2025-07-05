import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import userIcon from "../assets/Images/user-icon.png";
import restaurantIcon from "../assets/Images/restaurant-icon.png";
import pig from "../assets/Images/p1.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const UserZone = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const userCardRef = useRef(null);
  const restaurantCardRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    // Set initial styles to ensure visibility
    gsap.set([titleRef.current, userCardRef.current, restaurantCardRef.current], {
      opacity: 1,
      y: 0
    });

    // Title animation
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Card animations
    gsap.from([userCardRef.current, restaurantCardRef.current], {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Divider animation
    gsap.from(dividerRef.current, {
      scaleX: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Cleanup animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-[#FAB503] flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-repeat bg-center"></div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-black">Choose Your</span> <span className="text-yellow-400 bg-black px-4">Gateway</span>
        </h2>
        <p className="text-black max-w-md mx-auto">Select your role to continue your Foodly experience</p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-12 relative z-10">
        {/* User Card */}
        <a
          ref={userCardRef}
          href="/UserDashboard"
          className="relative rounded-3xl p-8 w-72 text-center shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-500 group overflow-hidden"
          style={{
            background: 'rgba(1, 0, 0, 1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgb(250, 40, 3)',
            textDecoration: "none"
          }}
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            style={{ backgroundImage: `url(${pig})` }}
          ></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent group-hover:left-[150%] transition-all duration-700"></div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <img
                src={userIcon}
                alt="User"
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-white text-2xl font-bold tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
              User
            </p>
            <p className="text-white/80 mt-2 text-sm group-hover:text-yellow-400/80 transition-colors duration-300">
              Discover & Book Restaurants
            </p>
          </div>
        </a>

        {/* Restaurant Card */}
        <a
          ref={restaurantCardRef}
          href="/RestaurantLoginForm"
          className="relative rounded-3xl p-8 w-72 text-center shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-500 group overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(250, 40, 3)',
            textDecoration: "none"
          }}
        >
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            style={{ backgroundImage: `url(${pig})` }}
          ></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent group-hover:left-[150%] transition-all duration-700"></div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <img
                src={restaurantIcon}
                alt="Restaurant"
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-white text-2xl font-bold tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
              Restaurant
            </p>
            <p className="text-white/80 mt-2 text-sm group-hover:text-yellow-400/80 transition-colors duration-300">
              Manage Your Business
            </p>
          </div>
        </a>
      </div>

      {/* Decorative Line */}
      <div 
        ref={dividerRef}
        className="absolute bottom-20 w-11/12 h-px bg-black bg-opacity-20"
      />
    </section>
  );
};

export default UserZone;