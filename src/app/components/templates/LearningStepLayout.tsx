"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Typography from "../atoms/Typography";
import NavigationButton from "../molecules/NavigationButton";
import SwipableContent from "../organisms/SwipableContent";
import CuteDecorationEffect from "../organisms/CuteDecorationEffect";
import { ButtonColor } from "../atoms/Button";

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
  className?: string;
}

const LearningStepLayout: React.FC<LearningStepLayoutProps> = ({
  title,
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
  className = "",
}) => {
  const getColorClass = (
    element: "bg" | "text" | "border",
    intensity: number = 500
  ) => `${element}-${accentColor}-${intensity}`;

  return (
    <CuteDecorationEffect theme="mixed" numItems={10}>
      <div className={`${backgroundColor} min-h-screen w-full ${className}`}>
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          {/* Title & Step */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-2xl font-bold ${getColorClass(
                "bg",
                600
              )} mb-3 shadow-md`}
            >
              {stepNumber}
            </div>
            <Typography
              variant="h1"
              color="primary"
              className={`text-2xl sm:text-3xl mt-2 ${getColorClass(
                "text",
                700
              )}`}
            >
              {title || `Step ${stepNumber}: ${stepName}`}
            </Typography>
            <div className="mx-auto mt-3 h-1.5 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 rounded-full w-52 shadow-sm" />
          </motion.div>

          {/* Main content area with icon and swipable content */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Icon in circular container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center md:col-span-1"
            >
              <div className={`p-4 w-36 h-36 rounded-full ${getColorClass("bg", 100)} border-2 ${getColorClass("border", 300)} shadow-md flex items-center justify-center`}>
                <Image 
                  src={iconSrc} 
                  alt="Step Icon" 
                  width={80} 
                  height={80} 
                  className="drop-shadow-md"
                />
              </div>
            </motion.div>

            {/* Swipable content - widened for better readability */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:col-span-2"
            >
              <SwipableContent
                contents={contentSlides}
                buttonColor={accentColor as ButtonColor}
                backgroundColor={`${getColorClass("bg", 100)}`}
                height={200}
                withDots={true}
                withPagination={true}
                className="border-2 border-opacity-50 shadow-md"
                autoPlay={true}
                autoPlayInterval={8000}
                // Removed textSize prop as it is not defined in SwipableContentProps
                padding="p-8" // Increased padding for better layout
              />
            </motion.div>
          </div>

          {/* Video */}
          {videoSrc && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${getColorClass("bg", 100)} border-2 ${getColorClass(
                "border",
                300
              )} rounded-xl p-4 shadow-md w-full max-w-3xl mb-8`}
            >
              <div className="relative overflow-hidden pt-[56.25%] rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded"
                  src={videoSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Learning Video"
                ></iframe>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-8"
          >
            <NavigationButton
              path={gamePath}
              label="Play Game"
              icon="play"
              color={accentColor as ButtonColor}
              size="large"
              hoverEffect="bounce"
            />
            <NavigationButton
              path={menuPath}
              label="Back to Menu"
              icon="back"
              color="blue"
              size="medium"
              hoverEffect="wobble"
            />
          </motion.div>

          {/* Step Navigation */}
          {showNextPrevButtons && (
            <div className="w-full max-w-3xl flex justify-between mt-6">
              {prevStepPath ? (
                <NavigationButton
                  path={prevStepPath}
                  label="Previous Step"
                  icon="chevron-left"
                  color="blue"
                  size="small"
                  hoverEffect="wobble"
                  placement="start"
                />
              ) : (
                <div />
              )}
              {nextStepPath && (
                <NavigationButton
                  path={nextStepPath}
                  label="Next Step"
                  icon="chevron-right"
                  color="green"
                  size="small"
                  hoverEffect="wobble"
                  placement="end"
                />
              )}
            </div>
          )}

          {/* Footer */}
          <motion.div
            className="w-full max-w-md h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full mt-8"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </CuteDecorationEffect>
  );
};

export default LearningStepLayout;