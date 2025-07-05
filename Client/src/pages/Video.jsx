// src/pages/Video.jsx
import React from 'react';
import { motion } from 'framer-motion';
import V1 from '../assets/Images/V2.mp4';

const Video = () => {
  return (
    <div className="bg-[#FAB503] flex flex-col h-[100vh] items-center justify-center w-full overflow-hidden">
      <motion.div 
        className="relative w-[1280px] h-[400px] rounded-[40px] overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-7xl text-[#FAB503] font-bold tracking-wide">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Inside
            </motion.span>{''}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-[#EB0F0F]"
            >
              Foodly
            </motion.span>
          </h1>
        </motion.div>
        
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={V1}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Animated play button overlay */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Video;