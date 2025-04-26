import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";

type FeedbackType = "success" | "error" | "warning" | "info";

interface FeedbackPopupProps {
  type: FeedbackType;
  message?: string;
  show: boolean;
  onAnimationComplete?: () => void;
  duration?: number;
  position?: "center" | "top" | "bottom";
  backdrop?: boolean;
  size?: "small" | "medium" | "large";
}

/**
 * A popup component to show feedback to the user
 * Can be used for success/error messages, alerts, etc.
 */
const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  type,
  message,
  show,
  onAnimationComplete,
  duration = 0.5,
  position = "center",
  backdrop = true,
  size = "medium",
}) => {
  // Define configurations based on feedback type
  const config = {
    success: {
      bgColor: "bg-green-500",
      icon: "check",
      animation: { rotate: [0, 10, -10, 0] },
    },
    error: {
      bgColor: "bg-red-500",
      icon: "x-mark",
      animation: { x: [0, -10, 10, -10, 10, 0] },
    },
    warning: {
      bgColor: "bg-yellow-500",
      icon: "warning",
      animation: { y: [0, -10, 0] },
    },
    info: {
      bgColor: "bg-blue-500",
      icon: "info",
      animation: { scale: [1, 1.1, 1] },
    },
  };

  // Size configuration
  const sizeConfig = {
    small: {
      iconSize: 24,
      padding: "p-3",
      textSize: "text-sm",
    },
    medium: {
      iconSize: 40,
      padding: "p-6",
      textSize: "text-base",
    },
    large: {
      iconSize: 64,
      padding: "p-8",
      textSize: "text-lg",
    },
  };

  // Position classes
  const positionClasses = {
    center: "inset-0 flex items-center justify-center",
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration * 0.5 }}
            />
          )}

          {/* Popup */}
          <motion.div
            className={`fixed z-50 ${positionClasses[position]}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration,
            }}
            onAnimationComplete={onAnimationComplete}
          >
            <div
              className={`${config[type].bgColor} ${sizeConfig[size].padding} rounded-full shadow-lg`}
            >
              <motion.div
                animate={config[type].animation}
                transition={{ duration: 0.5 }}
              >
                <Icon
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  type={config[type].icon as any}
                  size={sizeConfig[size].iconSize}
                  color="white"
                />
              </motion.div>
            </div>

            {/* Message - if provided */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: duration * 0.5 }}
                className="mt-4 text-center"
              >
                <Typography
                  variant="body1"
                  color="default"
                  className={`${sizeConfig[size].textSize} font-medium`}
                >
                  {message}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackPopup;
