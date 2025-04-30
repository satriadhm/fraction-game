"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "./AnimatedButton";
import { HoverEffect } from "./AnimatedButton";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import { ButtonColor, ButtonSize } from "../atoms/Button";
import Icon, { IconType } from "../atoms/Icon";

interface NavigationButtonProps {
  path: string;
  label: string;
  icon?: IconType;
  color?: ButtonColor;
  size?: ButtonSize;
  hoverEffect?: HoverEffect;
  className?: string;
  placement?: "start" | "end";
  onClick?: () => void; // Additional callback if needed
  loadingMessage?: string;
}

/**
 * A specialized button for navigation within the app
 * Combines the AnimatedButton with routing capabilities and loading state
 */
const NavigationButton: React.FC<NavigationButtonProps> = ({
  path,
  label,
  icon,
  color = "pink",
  size = "medium",
  hoverEffect = "bounce",
  className = "",
  placement = "start",
  onClick,
  loadingMessage = "Loading...",
}) => {
  const router = useRouter();
  const { startLoading } = usePageLoader();

  const handleClick = () => {
    if (onClick) onClick();

    // Show loading indicator
    startLoading(loadingMessage);

    // Navigate with a small delay for better user experience
    setTimeout(() => {
      router.push(path);
    }, 800);
  };

  return (
    <AnimatedButton
      onClick={handleClick}
      color={color}
      size={size}
      hoverEffect={hoverEffect}
      className={className}
      icon={icon && placement === "start" ? <Icon type={icon} /> : undefined}
    >
      {label}
      {icon && placement === "end" && <Icon type={icon} className="ml-2" />}
    </AnimatedButton>
  );
};

export default NavigationButton;
