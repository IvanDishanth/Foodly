import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/Images/plate2.png";
import bg from "../assets/Images/bg.jpg";
import k3 from "../assets/Images/k4.png";

const services = [
  {
    title: "Quick Reservations",
    description: "Book your table in seconds with our intuitive interface",
    icon: "⏱️",
    color: "from-red-600 to-amber-600"
  },
  {
    title: "Exclusive Deals",
    description: "Get access to special offers and discounts",
    icon: "💎",
    color: "from-black to-gray-800"
  },
  {
    title: "Personalized Recommendations",
    description: "Discover restaurants tailored to your taste",
    icon: "✨",
    color: "from-red-600 to-amber-600"
  }
];

const Service = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgb(243, 198, 0)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-b from-[#FAB503] to-[#FAB503] w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
      initial="hidden  bg-[#FAB503]"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Animated decorative elements */}
      <motion.img
        src={k3}
        alt="Decoration"
        className="absolute top-20 right-20 w-40 opacity-10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.img
        src={k3}
        alt="Decoration"
        className="absolute bottom-20 left-20 w-40 opacity-10"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8">
        <motion.div 
          className="backdrop-blur-md bg-black rounded-3xl p-8 sm:p-16 shadow-2xl border border-yellow-400/20"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-[#FAB503]"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
              Our Services
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 flex flex-col items-center text-center text-white border border-white/10 hover:border-[3px] hover:border-[#FAB503] transition-all`}
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="text-4xl mb-4 drop-shadow-md">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 drop-shadow-md">{service.title}</h3>
                <p className="text-lg opacity-90">{service.description}</p>
                
                {/* Hover effect */}
                <div className="mt-6 w-16 h-1 bg-white rounded-full group-hover:w-24 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Service;