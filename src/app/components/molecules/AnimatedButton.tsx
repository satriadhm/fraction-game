import React from "react";
import { motion } from "framer-motion";
import Button, { ButtonColor, ButtonSize } from "../atoms/Button";

export type HoverEffect = "bounce" | "wobble" | "grow" | "glow" | "shake";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  hoverEffect?: HoverEffect;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  color = "pink",
  size = "medium",
  disabled = false,
  type = "button",
  icon,
  hoverEffect = "bounce",
}) => {
  // Define different hover animations
  const hoverAnimations = {
    bounce: {
      scale: [1, 1.1, 0.9, 1.05, 1],
      transition: { duration: 0.5 },
    },
    wobble: {
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 },
    },
    grow: {
      scale: 1.1,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    glow: {
      boxShadow: [
        "0 0 0 0 rgba(236, 72, 153, 0)",
        "0 0 0 10px rgba(236, 72, 153, 0.2)",
        "0 0 0 20px rgba(236, 72, 153, 0)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    },
  };

  const tapAnimation = {
    scale: 0.9,
    rotate: 0,
  };

  return (
    <motion.div
      whileHover={!disabled ? hoverAnimations[hoverEffect] : {}}
      whileTap={!disabled ? tapAnimation : {}}
      initial={{ scale: 1 }}
    >
      <Button
        onClick={onClick}
        color={color}
        size={size}
        disabled={disabled}
        type={type}
        className={className}
      >
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
