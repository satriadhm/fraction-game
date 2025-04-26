"use client";

import React from "react";
import { motion, AnimatePresence, Transition, Variant } from "framer-motion";

// Define more specific types for animations
interface AnimationVariants {
  initial: Variant;
  animate: Variant;
  exit: Variant;
  transition?: Transition;
}

// Common animation presets with proper typing
export const animations: Record<string, AnimationVariants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  bounce: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 0.9, 1.05, 1],
    },
    exit: { scale: 1 },
    transition: { duration: 0.5 },
  },
  wobble: {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -5, 5, -5, 0],
    },
    exit: { rotate: 0 },
    transition: { duration: 0.5 },
  },
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
    },
    exit: { scale: 1 },
    transition: { duration: 2, repeat: Infinity },
  },
  float: {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
    },
    exit: { y: 0 },
    transition: { duration: 3, repeat: Infinity, repeatType: "mirror" },
  },
};

type AnimationType = keyof typeof animations;

// Types for props
interface MotionElementProps {
  children: React.ReactNode;
  type?: AnimationType | "custom";
  customAnimation?: AnimationVariants;
  delay?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
  show?: boolean; // For conditional rendering with AnimatePresence
}

const MotionElement: React.FC<MotionElementProps> = ({
  children,
  type = "fadeIn",
  customAnimation,
  delay = 0,
  duration = 0.5,
  className = "",
  onClick,
  as = "div",
  show = true,
}) => {
  // Get animation preset or use custom animation
  const animation =
    type === "custom" && customAnimation
      ? customAnimation
      : animations[type as AnimationType];

  const transitionConfig: Transition = {
    ...(animation.transition || {}),
    delay,
    // Only use duration if not already defined in the animation preset
    ...(animation.transition?.duration === undefined ? { duration } : {}),
  };

  // For animations that need to be conditionally shown/hidden
  if (show !== undefined && show !== true) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            className={className}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={transitionConfig}
            onClick={onClick}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Use the motion component that matches the 'as' prop
  const Component = motion[as as keyof typeof motion];

  // If the Component exists, use it. Otherwise, fall back to motion.div
  if (Component) {
    return (
      <Component
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }

  // Default to motion.div
  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={transitionConfig}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MotionElement;
