import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Common animation presets
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  bounce: {
    animate: { 
      scale: [1, 1.1, 0.9, 1.05, 1],
      transition: { duration: 0.5 }
    }
  },
  wobble: {
    animate: { 
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  },
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  },
  float: {
    animate: { 
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
    }
  }
};

type AnimationType = keyof typeof animations;

// Types for props
interface MotionElementProps {
  children: React.ReactNode;
  type?: AnimationType | 'custom';
  customAnimation?: {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  };
  delay?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
  show?: boolean; // For conditional rendering with AnimatePresence
}

const MotionElement: React.FC<MotionElementProps> = ({
  children