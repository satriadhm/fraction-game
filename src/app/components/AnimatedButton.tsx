import { motion } from "framer-motion";
import { ReactNode } from "react";

// Define valid color and effect types to fix type errors
export type ButtonColor =
  | "pink"
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "yellow";
export type HoverEffect = "bounce" | "wobble" | "grow" | "glow" | "shake";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  color?: ButtonColor;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  hoverEffect?: HoverEffect;
}

const AnimatedButton = ({
  children,
  onClick,
  className = "",
  color = "pink",
  size = "medium",
  disabled = false,
  type = "button",
  icon,
  hoverEffect = "bounce",
}: AnimatedButtonProps) => {
  const baseClasses =
    "font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2";

  const colorClasses = {
    pink: "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700",
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
    orange:
      "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700",
    green:
      "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700",
    purple:
      "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700",
    yellow:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 hover:from-yellow-500 hover:to-yellow-600",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-xl",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

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
    <motion.button
      whileHover={!disabled ? hoverAnimations[hoverEffect] : {}}
      whileTap={!disabled ? tapAnimation : {}}
      onClick={!disabled ? onClick : undefined}
      className={buttonClasses}
      disabled={disabled}
      type={type}
      initial={{ scale: 1 }}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
