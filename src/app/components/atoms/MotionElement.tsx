/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { JSX } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

// Define custom target types with more specific properties
type SafeVariant = {
  opacity?: number | number[];
  scale?: number | number[];
  rotate?: number | number[];
  x?: number | string | number[] | string[];
  y?: number | string | number[] | string[];
  [key: string]: any;
};

// Define more specific types for animations
interface AnimationVariants {
  initial: SafeVariant;
  animate: SafeVariant;
  exit: SafeVariant;
  transition?: {
    duration?: number;
    delay?: number;
    repeat?: number;
    repeatType?: "loop" | "reverse" | "mirror" | undefined;
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    ease?: string;
    [key: string]: any;
  };
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
    transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
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

  // Create a separate transition object that doesn't cause type conflicts
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

  // Handle different element types
  if (as === "h1") {
    return (
      <motion.h1
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.h1>
    );
  } else if (as === "h2") {
    return (
      <motion.h2
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.h2>
    );
  } else if (as === "h3") {
    return (
      <motion.h3
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.h3>
    );
  } else if (as === "p") {
    return (
      <motion.p
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.p>
    );
  } else if (as === "span") {
    return (
      <motion.span
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.span>
    );
  } else if (as === "button") {
    return (
      <motion.button
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  } else if (as === "li") {
    return (
      <motion.li
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.li>
    );
  } else if (as === "ul") {
    return (
      <motion.ul
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transitionConfig}
        onClick={onClick}
      >
        {children}
      </motion.ul>
    );
  }

  // Default to motion.div for any other element type
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
