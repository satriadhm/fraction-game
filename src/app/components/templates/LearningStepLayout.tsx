"use client";

import React from "react";
import Image from "next/image";
import Typography from "../atoms/Typography";
import NavigationButton from "../molecules/NavigationButton";
import SwipableContent from "../organisms/SwipableContent";
import { motion } from "framer-motion";
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
    <div className={`${backgroundColor} min-h-screen w-full ${className}`}>
      <div className="container mx-auto px-4 pt-8 pb-16 flex flex-col items-center">
        {/* Judul dan Step */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl font-bold ${getColorClass(
                "bg",
                600
              )}`}
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
            <div className="mx-auto mt-2 h-1 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 rounded-full w-52" />
          </motion.div>
        </div>

        {/* Ikon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-4 rounded-xl ${getColorClass(
            "bg",
            100
          )} border ${getColorClass("border", 300)} shadow-md mb-6`}
        >
          <Image src={iconSrc} alt="Step Icon" width={80} height={80} />
        </motion.div>

        {/* Video */}
        {videoSrc && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${getColorClass("bg", 100)} border ${getColorClass(
              "border",
              300
            )} rounded-xl p-4 shadow-md w-full max-w-3xl mb-6`}
          >
            <div className="relative overflow-hidden pt-[56.25%]">
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

        {/* Swipable Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-3xl mb-6"
        >
          <SwipableContent
            contents={contentSlides}
            buttonColor={accentColor as ButtonColor}
            backgroundColor={`${getColorClass("bg", 100)}`}
            height={200}
            withDots={true}
            withPagination={true}
          />
        </motion.div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
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
        </div>

        {/* Navigasi Next/Prev */}
        {showNextPrevButtons && (
          <div className="w-full flex justify-between mt-6">
            {prevStepPath ? (
              <NavigationButton
                path={prevStepPath}
                label="Previous Step"
                icon="chevron-left"
                color="blue"
                size="small"
                hoverEffect="wobble"
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
              />
            )}
          </div>
        )}

        {/* Footer Rainbow */}
        <motion.div
          className="w-full max-w-md h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full mt-12"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default LearningStepLayout;
