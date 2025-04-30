// Enhanced AnimatedButton component for landing page
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  className = "",
  size = "medium",
}) => {
  // Size variants
  const sizeClasses = {
    small: "px-6 py-3 text-base",
    medium: "px-8 py-5 text-lg",
    large: "px-10 py-6 text-xl"
  };

  // Create a more interesting shadow that changes on hover
  const baseClasses = `
    relative overflow-hidden
    rounded-full font-bold transition-all
    bg-gradient-to-r from-pink-500 to-purple-600 text-white
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <div className="relative group">
      {/* Animated shadow/glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-70 group-hover:opacity-100"
        animate={{ scale: [0.85, 0.9, 0.85] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* The actual button */}
      <motion.button
        onClick={onClick}
        className={baseClasses}
        whileHover={{ 
          scale: 1.05,
          transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 10 
          } 
        }}
        whileTap={{ 
          scale: 0.95,
          rotate: [-1, 1, 0],
          transition: { duration: 0.2 }
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        {/* Content wrapper */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut",
            repeatDelay: 0.5
          }}
        />
      </motion.button>
    </div>
  );
};

export default EnhancedButton;