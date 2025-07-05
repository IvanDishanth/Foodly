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

  useEffect(() => {
    // Set initial styles to ensure visibility
    gsap.set([imageRef.current, textRef.current, titleRef.current], {
      opacity: 1,
      x: 0,
      y: 0
    });

    // Image animation - slides in from left
    const imageAnim = gsap.from(imageRef.current, {
      x: -200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        markers: false // Set to true for debugging if needed
      },
      immediateRender: false // This is crucial
    });

    // Text container animation - slides in from right
    const textAnim = gsap.from(textRef.current, {
      x: 200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      },
      immediateRender: false
    });

    // Title animation - fade in
    const titleAnim = gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      immediateRender: false
    });

    // Divider animations - grow from center
    const dividerAnim = gsap.from([dividerLeftRef.current, dividerRightRef.current], {
      scaleX: 0,
      transformOrigin: "center",
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      immediateRender: false
    });

    // Cleanup function
    return () => {
      [imageAnim, textAnim, titleAnim, dividerAnim].forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#FAB503] min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-black border-[2.px] opacity-15"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Image Section */}
        <div 
          ref={imageRef}
          className="relative w-full lg:w-1/2 flex justify-center"
          style={{ opacity: 1 }} // Ensure initial visibility
        >
          <img
            src={aboutImage}
            alt="About"
            className="w-full max-w-md object-contain drop-shadow-2xl"
          />
          <div className="absolute -z-10 w-64 h-64 bg-black rounded-full blur-xl opacity-20"></div>
        </div>

        {/* Text Section */}
        <div 
          ref={textRef}
          className="w-full lg:w-1/2 space-y-8"
          style={{ opacity: 1 }} // Ensure initial visibility
        >
          <div className="relative">
            <h2 ref={titleRef} className="text-6xl font-bold mb-6" style={{ opacity: 1 }}>
              <span className="text-yellow-400 bg-black px-4 py-2">Ab</span>
              <span className="text-black">out</span>
            </h2>
            <div 
              ref={dividerLeftRef}
              className="absolute -bottom-4 left-0 w-32 h-1 bg-black transform origin-left"
            ></div>
            <div 
              ref={dividerRightRef}
              className="absolute -bottom-4 right-0 w-32 h-1 bg-black transform origin-right"
            ></div>
          </div>

          <div 
            className="bg-black p-8 rounded-xl text-yellow-400 text-lg leading-relaxed shadow-xl"
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
    </section>
  );
};

export default About;