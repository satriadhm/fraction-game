import React from "react";
import { ButtonHTMLAttributes } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "pink" | "blue" | "orange" | "green" | "purple" | "yellow" | "red" | "gray" | "indigo" | "teal" | "lime" | "emerald" | "rose" | "fuchsia" | "violet" | "sky" | "amber" | "cyan" | "zinc";

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
    red: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
    gray: "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700",
    indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700",
    teal: "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700",
    lime: "bg-gradient-to-r from-lime-500 to-lime-600 text-white hover:from-lime-600 hover:to-lime-700",
    emerald: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700",
    rose: "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700",
    fuchsia: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white hover:from-fuchsia-600 hover:to-fuchsia-700",
    violet: "bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700",
    sky: "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700",
    amber: "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-800 hover:from-amber-500 hover:to-amber-600",
    cyan: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700",
    zinc: "bg-gradient-to-r from-zinc-500 to-zinc-600 text-white hover:from-zinc-600 hover:to-zinc-700",
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