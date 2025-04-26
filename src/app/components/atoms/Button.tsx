import React from "react";
import { ButtonHTMLAttributes } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "pink" | "blue" | "orange" | "green" | "purple" | "yellow";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  color = "pink",
  className = "",
  fullWidth = false,
  ...props
}) => {
  // Base classes
  const baseClasses = "font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2";
  
  // Color styles
  const colorClasses = {
    pink: "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700",
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
    orange: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700",
    green: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700",
    yellow: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 hover:from-yellow-500 hover:to-yellow-600",
  };
  
  // Size styles
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-xl",
  };
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Disabled class
  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;