import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Typography from "../atoms/Typography";
import NavigationButton from "../molecules/NavigationButton";
import { CuteHeart, CuteStar } from "../atoms/CuteShapes";
import CuteDecorationWrapper from "../organisms/CuteDecorationEffect";
import SwipableContent from "../organisms/SwipableContent";

interface LearningStepLayoutProps {
  title: string;
  stepNumber: number;
  stepName: string;
  iconSrc: string;
  videoSrc?: string;
  contentSlides: string[];
  gamePath: string;
  menuPath?: string;
  backgroundColor?: string;
  accentColor?: string;
  nextStepPath?: string;
  prevStepPath?: string;
  showNextPrevButtons?: boolean;
  decorationTheme?: "random" | "hearts" | "stars" | "food" | "mixed";
  decorationCount?: number;
  className?: string;
}

/**
 * A template for learning step pages with video, swipeable content, and navigation
 */
const LearningStepLayout: React.FC<LearningStepLayoutProps> = ({
  stepNumber,
  stepName,
  iconSrc,
  videoSrc,
  contentSlides,
  gamePath,
  menuPath = "/menu",
  backgroundColor = "bg-gradient-to-b from-green-50 to-green-100",
  accentColor = "pink",
  nextStepPath,
  prevStepPath,
  showNextPrevButtons = false,
  decorationTheme = "random",
  decorationCount = 8,
  className = "",
}) => {
  // Get accent color for different elements
  const getColorClass = (
    element: "bg" | "text" | "border" | "from" | "to",
    intensity: number = 500
  ) => {
    return `${element}-${accentColor}-${intensity}`;
  };

  // Button colors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primaryButtonColor = accentColor as any;
  const secondaryButtonColor = accentColor === "pink" ? "blue" : "pink";

  return (
    <CuteDecorationWrapper
      numItems={decorationCount}
      theme={decorationTheme}
      className="relative overflow-hidden"
    >
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${backgroundColor} p-8 ${className}`}
      >
        {/* Decorative background shapes */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-green-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Page heading with animated underline */}
        <div className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Typography variant="h1" color="primary" className="text-center">
              Step {stepNumber}: {stepName}
            </Typography>
          </motion.div>
          <motion.div
            className={`absolute -bottom-2 left-0 right-0 h-1 ${getColorClass(
              "bg"
            )} rounded-full`}
            initial={{ width: 0, x: "50%" }}
            animate={{ width: "100%", x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Step icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Image
            src={iconSrc}
            alt={`Step ${stepNumber} icon`}
            width={80}
            height={80}
            className="drop-shadow-md"
          />
        </motion.div>

        {/* Video with fancy frame (if provided) */}
        {videoSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl mb-6 relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getColorClass(
                "from"
              )}-400 ${getColorClass("to")}-600 rounded-xl -m-2 z-0`}
            ></div>
            <div className="absolute inset-0 bg-white rounded-lg m-1 z-10"></div>
            <iframe
              className="w-full h-64 rounded-lg shadow-lg relative z-20"
              src={videoSrc}
              allowFullScreen
            ></iframe>
          </motion.div>
        )}

        {/* Swipeable content with decorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mb-8 relative"
        >
          {/* Decorative elements on corners */}
          <div className="absolute -top-2 -left-2 z-10">
            <CuteHeart size={20} />
          </div>
          <div className="absolute -top-2 -right-2 z-10">
            <CuteStar size={20} />
          </div>
          <div className="absolute -bottom-2 -left-2 z-10">
            <CuteStar size={20} />
          </div>
          <div className="absolute -bottom-2 -right-2 z-10">
            <CuteHeart size={20} />
          </div>

          <SwipableContent
            contents={contentSlides}
            buttonColor={primaryButtonColor}
            withDots={true}
            withPagination={true}
          />
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <NavigationButton
            path={gamePath}
            label="Play Game"
            icon="play"
            color={primaryButtonColor}
            size="large"
            hoverEffect="bounce"
            placement="start"
          />

          <NavigationButton
            path={menuPath}
            label="Back to Menu"
            icon="back"
            color={secondaryButtonColor}
            size="medium"
            hoverEffect="wobble"
            placement="start"
          />
        </div>

        {/* Next/Previous step navigation (if enabled) */}
        {showNextPrevButtons && (
          <div className="w-full max-w-2xl flex justify-between mt-8">
            {prevStepPath ? (
              <NavigationButton
                path={prevStepPath}
                label="Previous Step"
                icon="chevron-left"
                color="blue"
                size="small"
                placement="start"
                hoverEffect="wobble"
              />
            ) : (
              <div></div> // Empty div for spacing
            )}

            {nextStepPath && (
              <NavigationButton
                path={nextStepPath}
                label="Next Step"
                icon="chevron-right"
                color="green"
                size="small"
                placement="end"
                hoverEffect="wobble"
              />
            )}
          </div>
        )}

        {/* Cute footer element */}
        <motion.div
          className={`w-full max-w-md h-4 bg-gradient-to-r from-${accentColor}-400 via-transparent to-${accentColor}-400 rounded-full mt-8`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </CuteDecorationWrapper>
  );
};

export default LearningStepLayout;
