"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variant, Transition } from "framer-motion";
import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";
import { ButtonColor } from "../atoms/Button";

// Define proper animation variant types
interface AnimationVariants {
  enter: (direction: number) => Variant;
  center: Variant;
  exit: (direction: number) => Variant;
}

interface SwipeableContentProps {
  contents: string[];
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: ButtonColor;
  height?: number;
  className?: string;
  withDots?: boolean;
  withPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * A component for displaying swipeable/carousel content with navigation
 */
const SwipeableContent: React.FC<SwipeableContentProps> = ({
  contents,
  backgroundColor = "bg-yellow-100",
  textColor = "text-gray-800",
  buttonColor = "pink",
  height = 256,
  className = "",
  withDots = true,
  withPagination = false,
  autoPlay = false,
  autoPlayInterval = 5000,
  onIndexChange,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Autoplay effect
  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        nextContent();
      }, autoPlayInterval);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, autoPlayInterval, index]);

  const nextContent = () => {
    setDirection(1);
    const newIndex = (index + 1) % contents.length;
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  const prevContent = () => {
    setDirection(-1);
    const newIndex = (index - 1 + contents.length) % contents.length;
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  // Animation variants for the slide transition
  const variants: AnimationVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Transition configuration
  const slideTransition: Transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  // Calculate button colors based on passed color
  const buttonBgColor = {
    pink: "bg-pink-500 hover:bg-pink-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  }[buttonColor];

  // Button hover animation
  const buttonHoverAnimation = { scale: 1.1 };
  const buttonTapAnimation = { scale: 0.9 };

  return (
    <div
      className={`relative w-full max-w-2xl overflow-hidden rounded-lg shadow-lg ${backgroundColor} ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Main content area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className={`absolute w-full h-full flex items-center justify-center p-6 text-center ${textColor}`}
          >
            <Typography variant="body1" className="text-xl font-bold">
              {contents[index]}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left navigation button */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <motion.button
          onClick={prevContent}
          className={`${buttonBgColor} text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none mx-2`}
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
          aria-label="Previous"
        >
          <Icon type="chevron-left" size={24} />
        </motion.button>
      </div>

      {/* Right navigation button */}
      <div className="absolute inset-y-0 right-0 flex items-center">
        <motion.button
          onClick={nextContent}
          className={`${buttonBgColor} text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none mx-2`}
          whileHover={buttonHoverAnimation}
          whileTap={buttonTapAnimation}
          aria-label="Next"
        >
          <Icon type="chevron-right" size={24} />
        </motion.button>
      </div>

      {/* Navigation dots */}
      {withDots && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {contents.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? `bg-${buttonColor}-600` : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                if (onIndexChange) onIndexChange(i);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      )}

      {/* Pagination indicator */}
      {withPagination && (
        <div className="absolute bottom-2 right-2 bg-black/20 text-white text-xs px-2 py-1 rounded-full">
          {index + 1} / {contents.length}
        </div>
      )}
    </div>
  );
};

export default SwipeableContent;
