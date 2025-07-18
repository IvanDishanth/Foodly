import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const dividerLeftRef = useRef(null);
  const dividerRightRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Set initial hidden states
    gsap.set([imageRef.current, textRef.current], { opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set([dividerLeftRef.current, dividerRightRef.current], { scaleX: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    // Create timeline for sequenced animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        markers: false
      }
    });

    // Animation sequence
    tl.fromTo(imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(textRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5" // overlap with previous animation
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out" }
    )
    .fromTo([dividerLeftRef.current, dividerRightRef.current],
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
    )
    .fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#FAB503] h-[440px] w-full flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border-2 border-black opacity-10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Image Section */}
        <div 
          ref={imageRef}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <img
            src={aboutImage}
            alt="About"
            className="w-full max-w-md object-contain drop-shadow-2xl transform transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute -z-10 w-64 h-64 bg-black rounded-full blur-xl opacity-20"></div>
        </div>

        {/* Text Section */}
        <div 
          ref={textRef}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="relative">
            <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400 bg-black px-4 py-2">Ab</span>
              <span className="text-black">out</span>
            </h2>
            <div 
              ref={dividerLeftRef}
              className="absolute -bottom-4 left-0 w-32 h-1 bg-black transform origin-left"
            />
            <div 
              ref={dividerRightRef}
              className="absolute -bottom-4 right-0 w-32 h-1 bg-black transform origin-right"
            />
          </div>

          <div 
            ref={contentRef}
            className="bg-black p-6 md:p-8 rounded-xl text-yellow-400 text-lg leading-relaxed shadow-xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(231, 18, 18, 0.9)), url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="mb-4">
              Foodly is your smart dining companion, helping you discover, reserve,
              and enjoy the best restaurants near you with just a few taps.
            </p>
            <p>
              Our mission is to revolutionize your dining experience - from finding the perfect
              spot to enjoying your favorite dish, all while earning rewards and discovering
              new culinary adventures.
            </p>
          </div>
        </div>
      </div>

      {/* Add floating animation to CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default About;