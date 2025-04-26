import React from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "./AnimatedButton";
import Icon, { IconType } from "../atoms/Icon";
import { ButtonColor, ButtonSize } from "../atoms/Button";
import { HoverEffect } from "./AnimatedButton";

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
}

/**
 * A specialized button for navigation within the app
 * Combines the AnimatedButton with routing capabilities
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
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    router.push(path);
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
