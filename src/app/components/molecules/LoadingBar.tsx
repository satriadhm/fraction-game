"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CuteHeart, CuteStar } from '../atoms/CuteShapes';

interface LoadingScreenProps {
  message?: string;
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
  isLoading
}) => {
  if (!isLoading) return null;
  
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Spinning circle */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-transparent border-t-pink-500 border-r-pink-500"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        />
        
        {/* Centered content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <CuteHeart size={36} color="#EC4899" />
        </div>
      </div>
      
      {/* Floating decorations */}
      <div className="relative w-40 h-40">
        <motion.div
          className="absolute"
          style={{ top: '10%', left: '80%' }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <CuteStar size={20} color="#FCD34D" />
        </motion.div>
        
        <motion.div
          className="absolute"
          style={{ top: '70%', left: '20%' }}
          animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        >
          <CuteStar size={24} color="#FCD34D" />
        </motion.div>
      </div>
      
      {/* Loading text with animated dots */}
      <motion.p 
        className="mt-4 text-xl font-bold text-pink-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        >
          .
        </motion.span>
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;