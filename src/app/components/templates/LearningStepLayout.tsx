"use client";

import React from "react";
import Image from "next/image";
import Typography from "../atoms/Typography";
import NavigationButton from "../molecules/NavigationButton";

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

/**
 * A clean and simple template for learning step pages with video, content, and navigation
 */
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
    <div className={`${backgroundColor} min-h-screen w-full ${className}`}>
      <div className="container mx-auto px-4 pt-8 pb-16 flex flex-col items-center">
        {/* Header with Step Indicator */}
        <div className="relative w-full mb-8 text-center">
          <div className={`inline-block ${getColorClass("bg", 600)} w-12 h-12 rounded-full mb-4 text-white text-2xl font-bold flex items-center justify-center`}>
            {stepNumber}
          </div>
          
          <Typography 
            variant="h1" 
            color="primary" 
            className={`text-2xl sm:text-3xl ${getColorClass("text", 700)}`}
          >
            {title || `Step ${stepNumber}: ${stepName}`}
          </Typography>
          
          <div
            className="mx-auto mt-2 h-1 bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 rounded-full"
            style={{ width: "200px" }}
          />
        </div>

        {/* Step icon */}
        <div className="mb-6">
          <div className={`p-4 rounded-xl ${getColorClass("bg", 100)} border ${getColorClass("border", 300)} shadow-md`}>
            <Image
              src={iconSrc}
              alt={`Step ${stepNumber} icon`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Content container */}
        <div className="w-full max-w-3xl space-y-6">
          {/* Video (if provided) */}
          {videoSrc && (
            <div className={`${getColorClass("bg", 100)} border ${getColorClass("border", 300)} rounded-xl p-4 shadow-md`}>
              <div className="flex justify-between mb-2 px-1">
                {[1, 2, 3].map((n) => (
                  <div 
                    key={n} 
                    className={`w-3 h-3 rounded-full ${n === 1 ? 'bg-red-500' : n === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  />
                ))}
              </div>
              <div className="relative overflow-hidden pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded"
                  src={videoSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Learning video"
                ></iframe>
              </div>
            </div>
          )}

          {/* Content slides */}
          <div className={`${getColorClass("bg", 100)} border ${getColorClass("border", 300)} rounded-xl p-4 shadow-md`}>
            <div className="bg-white rounded p-4 min-h-[120px] flex items-center justify-center">
              <p className="text-center text-gray-700">{contentSlides[0]}</p>
              
              {/* Navigation dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {contentSlides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === 0 ? getColorClass("bg", 500) : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
            <div className="w-full flex justify-between mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default LearningStepLayout;