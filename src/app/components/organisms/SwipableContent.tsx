"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";
import { ButtonColor } from "../atoms/Button";

// Define safer animation variant types
type SafeVariant = {
  x?: string | number;
  y?: string | number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

interface SwipableContentProps {
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
  textSize?: "base" | "lg" | "xl" | "2xl"; // Added text size option
  padding?: string; // Added padding option
}

/**
 * A component for displaying swipeable/carousel content with navigation
 */
const SwipableContent: React.FC<SwipableContentProps> = ({
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
  textSize = "lg",
  padding = "p-6",
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextContent = React.useCallback(() => {
    setDirection(1);
    const newIndex = (index + 1) % contents.length;
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  }, [index, contents.length, onIndexChange]);

  // Autoplay effect
  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        nextContent();
      }, autoPlayInterval);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, autoPlayInterval, index, nextContent]);

  const prevContent = () => {
    setDirection(-1);
    const newIndex = (index - 1 + contents.length) % contents.length;
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  // Animation variants for the slide transition
  const variants = {
    enter: (direction: number): SafeVariant => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number): SafeVariant => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Calculate button colors based on passed color
  const buttonBgColor = {
    pink: "bg-pink-500 hover:bg-pink-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    lime: "bg-lime-500 hover:bg-lime-600",
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    rose: "bg-rose-500 hover:bg-rose-600",
    fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-600",
    violet: "bg-violet-500 hover:bg-violet-600",
    sky: "bg-sky-500 hover:bg-sky-600",
    amber: "bg-amber-500 hover:bg-amber-600",
    cyan: "bg-cyan-500 hover:bg-cyan-600",
    zinc: "bg-zinc-500 hover:bg-zinc-600",
  }[buttonColor];

  // Button animations
  const buttonHoverAnimation = { scale: 1.1 };
  const buttonTapAnimation = { scale: 0.9 };

  // Text size classes
  const textSizeClass = {
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  }[textSize];

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
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={`absolute w-full h-full flex items-center justify-center ${padding} text-center ${textColor}`}
          >
            <Typography
              variant="body1"
              className={`${textSizeClass} font-medium leading-relaxed px-8 max-w-xl`}
            >
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

export default SwipableContent;
