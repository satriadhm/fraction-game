import React, { JSX } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption";

type TypographyColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  gutterBottom?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "default",
  children,
  className = "",
  align = "left",
  gutterBottom = false,
}) => {
  // Map variants to appropriate HTML elements and styles
  const variantMap: Record<
    TypographyVariant,
    { element: keyof JSX.IntrinsicElements; className: string }
  > = {
    h1: { element: "h1", className: "text-3xl sm:text-4xl font-bold" },
    h2: { element: "h2", className: "text-2xl sm:text-3xl font-bold" },
    h3: { element: "h3", className: "text-xl sm:text-2xl font-bold" },
    h4: { element: "h4", className: "text-lg sm:text-xl font-semibold" },
    subtitle1: { element: "h6", className: "text-lg font-medium" },
    subtitle2: { element: "h6", className: "text-base font-medium" },
    body1: { element: "p", className: "text-base" },
    body2: { element: "p", className: "text-sm" },
    caption: { element: "span", className: "text-xs" },
  };

  // Map color variants to Tailwind text color classes
  const colorMap: Record<TypographyColor, string> = {
    default: "text-gray-800",
    primary: "text-pink-600",
    secondary: "text-purple-600",
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
  };

  // Map alignment to Tailwind text alignment classes
  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Add bottom margin if gutterBottom is true
  const gutterBottomClass = gutterBottom ? "mb-4" : "";

  // Get the appropriate element type and classes based on the variant
  const { element: Element, className: variantClassName } = variantMap[variant];
  const colorClassName = colorMap[color];
  const alignClassName = alignMap[align];

  // Combine all classes
  const combinedClassName = `${variantClassName} ${colorClassName} ${alignClassName} ${gutterBottomClass} ${className}`;

  return React.createElement(Element, { className: combinedClassName }, children);
};

export default Typography;
