import React from "react";
import { motion } from "framer-motion";

interface FloatingItemProps {
  x?: string;
  y?: string;
  delay?: number;
  size?: number;
  color?: string;
  children?: React.ReactNode;
  duration?: number;
  className?: string;
  onClick?: () => void;
  amplitude?: number; // How far it moves
  interactive?: boolean; // Whether it responds to hover
}

/**
 * A component that floats its children with a gentle animation
 * Can be used for decorative elements or interactive floating items
 */
const FloatingItem: React.FC<FloatingItemProps> = ({
  x = "0%",
  y = "0%",
  delay = 0,
  size = 30,
  color = "#EC4899",
  children,
  duration = 3,
  className = "",
  onClick,
  amplitude = 10,
  interactive = true
}) => {
  // Base animation
  const floatAnimation = {
    y: [0, -amplitude, 0],
    x: [0, amplitude / 2, 0],
  };
  
  // More complex animation for interactive items
  const interactiveAnimation = interactive ? {
    scale: [1, 1.1, 1],
    rotate: [0, 5, 0],
  } : {};
  
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      initial={{ y: 0, x: 0 }}
      animate={{
        ...floatAnimation,
        ...interactiveAnimation
      }}
      whileHover={interactive ? { 
        scale: 1.2, 
        transition: { duration: 0.3 } 
      } : {}}
      whileTap={interactive && onClick ? { 
        scale: 0.9,
        transition: { duration: 0.1 } 
      } : {}}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
      }}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <div
          className="rounded-full"
          style={{ backgroundColor: color, width: "100%", height: "100%" }}
        />
      )}
    </motion.div>
  );
};

export default FloatingItem;