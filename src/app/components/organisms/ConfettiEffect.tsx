import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ConfettiShape = "circle" | "square" | "triangle" | "star" | "heart";
type ConfettiSize = "tiny" | "small" | "medium" | "large";
type ConfettiOrigin = "top" | "center" | "bottom" | "left" | "right" | "random";

interface ConfettiPiece {
  id: number;
  shape: ConfettiShape;
  size: ConfettiSize;
  color: string;
  position: { x: string | number; y: string | number };
  rotation: number;
  duration: number;
  delay: number;
}

interface ConfettiEffectProps {
  show: boolean;
  duration?: number;
  pieces?: number;
  colors?: string[];
  shapes?: ConfettiShape[];
  sizes?: ConfettiSize[];
  origin?: ConfettiOrigin;
  gravity?: "light" | "medium" | "heavy";
  wind?: "none" | "light" | "medium" | "strong";
  spread?: number;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  show,
  duration = 3,
  pieces = 50,
  colors = ["#FF5E5B", "#D8D8D8", "#FFED66", "#00CECB", "#FFAAFF"],
  shapes = ["circle", "square", "triangle"],
  sizes = ["tiny", "small", "medium"],
  origin = "top",
  gravity = "medium",
  wind = "light",
  onComplete,
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Generate random confetti pieces
  const generateConfetti = React.useCallback((): ConfettiPiece[] => {
    return Array.from({ length: pieces }).map((_, index) => {
      // Random starting position based on origin
      const position = getStartPosition(origin);

      // Random shape, size, and color
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Random rotation and animation timing
      const rotation = Math.random() * 360;
      const animDuration = duration * 0.7 + Math.random() * duration * 0.6; // Variation in duration
      const delay = Math.random() * 0.5; // Staggered start

      return {
        id: index,
        shape,
        size,
        color,
        position,
        rotation,
        duration: animDuration,
        delay,
      };
    });
  }, [pieces, origin, shapes, sizes, colors, duration]);

  // Generate confetti pieces when 'show' changes to true
  useEffect(() => {
    if (show && !isComplete) {
      const newConfetti = generateConfetti();
      setConfetti(newConfetti);
      setIsComplete(false);

      // Set timer to clean up confetti after animation completes
      const timer = setTimeout(() => {
        setConfetti([]);
        setIsComplete(true);
        if (onComplete) onComplete();
      }, duration * 1000 + 500); // Extra time to ensure all animations complete

      return () => clearTimeout(timer);
    } else if (!show && confetti.length > 0) {
      // Add this condition to clear confetti when show becomes false
      setConfetti([]);
      setIsComplete(false);
    }
  }, [
    show,
    duration,
    onComplete,
    generateConfetti,
    isComplete,
    confetti.length,
  ]);

  // Calculate starting position based on origin
  const getStartPosition = (origin: ConfettiOrigin) => {
    let x: string | number;
    let y: string | number;

    switch (origin) {
      case "top":
        x = `${Math.random() * 100}%`;
        y = -20;
        break;
      case "bottom":
        x = `${Math.random() * 100}%`;
        y = "100%";
        break;
      case "left":
        x = -20;
        y = `${Math.random() * 100}%`;
        break;
      case "right":
        x = "100%";
        y = `${Math.random() * 100}%`;
        break;
      case "center":
        x = "50%";
        y = "50%";
        break;
      case "random":
      default:
        x = `${Math.random() * 100}%`;
        y = `${Math.random() * 20}%`;
        break;
    }

    return { x, y };
  };

  // Get animation properties based on gravity and wind settings
  const getAnimationProperties = (piece: ConfettiPiece) => {
    // Calculate fall distance based on gravity
    let fallDistance = "100vh";
    if (gravity === "light") fallDistance = "70vh";
    if (gravity === "heavy") fallDistance = "130vh";

    // Calculate horizontal movement based on wind
    let windForce = 0;
    if (wind === "light") windForce = 50;
    if (wind === "medium") windForce = 100;
    if (wind === "strong") windForce = 200;

    const horizontalMovement = (Math.random() * 2 - 1) * windForce;

    return {
      y: [0, fallDistance],
      x: [0, horizontalMovement],
      rotate: [piece.rotation, piece.rotation + (Math.random() * 4 - 2) * 360],
      opacity: [1, 0],
      transition: {
        duration: piece.duration,
        delay: piece.delay,
        ease: "easeOut",
      },
    };
  };

  // Get size in pixels based on size name
  const getSizePixels = (size: ConfettiSize): number => {
    switch (size) {
      case "tiny":
        return 5;
      case "small":
        return 8;
      case "medium":
        return 12;
      case "large":
        return 16;
      default:
        return 8;
    }
  };

  // Render different shapes
  const renderShape = (piece: ConfettiPiece) => {
    const sizeInPx = getSizePixels(piece.size);

    switch (piece.shape) {
      case "square":
        return (
          <div
            style={{
              width: sizeInPx,
              height: sizeInPx,
              backgroundColor: piece.color,
            }}
          />
        );

      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${sizeInPx / 2}px solid transparent`,
              borderRight: `${sizeInPx / 2}px solid transparent`,
              borderBottom: `${sizeInPx}px solid ${piece.color}`,
            }}
          />
        );

      case "star":
        return (
          <svg width={sizeInPx} height={sizeInPx} viewBox="0 0 24 24">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
              fill={piece.color}
            />
          </svg>
        );

      case "heart":
        return (
          <svg width={sizeInPx} height={sizeInPx} viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={piece.color}
            />
          </svg>
        );

      case "circle":
      default:
        return (
          <div
            style={{
              width: sizeInPx,
              height: sizeInPx,
              borderRadius: "50%",
              backgroundColor: piece.color,
            }}
          />
        );
    }
  };

  // If not showing or no confetti pieces, don't render anything
  if (!show || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.position.x,
            top: piece.position.y,
            position: "absolute",
          }}
          animate={getAnimationProperties(piece)}
        >
          {renderShape(piece)}
        </motion.div>
      ))}
    </div>
  );
};

export default ConfettiEffect;
