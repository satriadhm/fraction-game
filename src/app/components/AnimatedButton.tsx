import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  color?: "pink" | "blue" | "orange" | "green";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({
  children,
  onClick,
  className = "",
  color = "pink",
  size = "medium",
  disabled = false,
  type = "button",
}: AnimatedButtonProps) => {
  const baseClasses = "font-bold rounded-full shadow-lg transition-colors";

  const colorClasses = {
    pink: "bg-pink-600 text-white hover:bg-pink-700",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    orange: "bg-orange-600 text-white hover:bg-orange-700",
    green: "bg-green-600 text-white hover:bg-green-700",
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

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      onClick={!disabled ? onClick : undefined}
      className={buttonClasses}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
