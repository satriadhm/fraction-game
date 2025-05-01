// src/app/step3/game3/components/StickmanNinja.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface StickmanNinjaProps {
  position: number;
  isCutting: boolean;
  isAnimated?: boolean;
}

const StickmanNinja: React.FC<StickmanNinjaProps> = ({
  position,
  isCutting,
  isAnimated = true,
}) => {
  // Different animations based on state
  const idleAnimation = isAnimated
    ? {
        y: [0, -3, 0],
        rotate: [0, 1, 0, -1, 0],
      }
    : {};

  const cuttingAnimation = {
    y: [0, -15, 0],
    scale: [1, 1.1, 1],
  };

  return (
    <motion.div
      className="absolute bottom-10"
      style={{
        left: `${position}%`,
        x: "-50%",
        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3))",
      }}
      animate={isCutting ? cuttingAnimation : idleAnimation}
      transition={{
        duration: isCutting ? 0.5 : 2,
        repeat: isCutting ? 0 : Infinity,
        repeatType: "reverse",
      }}
    >
      <div className="relative">
        {/* Ninja body - more detailed than stickman */}
        <svg
          width="40"
          height="60"
          viewBox="0 0 40 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ninja body */}
          <circle cx="20" cy="10" r="8" fill="#333" /> {/* Head */}
          <rect x="14" y="18" width="12" height="17" rx="2" fill="#333" />{" "}
          {/* Torso */}
          {/* Headband */}
          <rect x="12" y="9" width="16" height="3" rx="1" fill="#E53E3E" />
          <path d="M28 10 L34 7 L32 12 Z" fill="#E53E3E" />{" "}
          {/* Headband tail */}
          {/* Eyes */}
          <ellipse cx="17" cy="8" rx="2" ry="2.5" fill="white" />
          <ellipse cx="23" cy="8" rx="2" ry="2.5" fill="white" />
          {/* Arms */}
          <motion.path
            d="M14 22 C12 22, 8 21, 7 24"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={isCutting ? { d: "M14 22 C12 20, 9 18, 7 16" } : {}}
          />
          <motion.path
            d="M26 22 C28 22, 32 21, 33 24"
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={isCutting ? { d: "M26 22 C28 20, 31 16, 33 13" } : {}}
          />
          {/* Legs */}
          <path
            d="M14 35 L12 50"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M26 35 L28 50"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Feet */}
          <path
            d="M12 50 L8 50"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M28 50 L32 50"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Sword */}
        <motion.div
          className="absolute top-[15px] right-[-10px]"
          animate={
            isCutting
              ? {
                  rotateZ: [0, -60, -30],
                  y: [0, -10, -5],
                }
              : {
                  rotateZ: [-30, -40, -30],
                }
          }
          transition={{
            duration: isCutting ? 0.5 : 2,
            repeat: isCutting ? 0 : Infinity,
            repeatType: "reverse",
          }}
          style={{ transformOrigin: "center left" }}
        >
          {/* Sword handle */}
          <div className="w-4 h-2 bg-yellow-800 rounded-sm"></div>

          {/* Sword guard */}
          <div className="w-6 h-1 bg-yellow-600 rounded-full -mt-0.5 -ml-1"></div>

          {/* Sword blade with glow effect */}
          <div className="relative">
            <div className="w-16 h-1.5 bg-gray-300 rounded-r"></div>

            {/* Blade shine effect */}
            <div className="absolute top-0 left-0 w-16 h-1.5 bg-gradient-to-r from-white via-transparent to-transparent opacity-70"></div>

            {/* Glowing effect when cutting */}
            {isCutting && (
              <div className="absolute top-0 left-0 w-16 h-1.5 bg-blue-400 rounded-r animate-pulse blur-sm"></div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StickmanNinja;
