"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StickmanNinja from "./StickmanNinja";
import InstructionModal from "./InstructionModal";
import { GameLevel } from "@/app/types/gameTypes";

interface FractionCutterGameProps {
  level: GameLevel;
  onSuccess: (accuracyPercentage: number, timeBonus: number) => void;
  onFailure: (reason: string) => void;
  isPaused: boolean;
  timeLeft: number;
}

const FractionCutterGame: React.FC<FractionCutterGameProps> = ({
  level,
  onSuccess,
  onFailure,
  isPaused,
  timeLeft,
}) => {
  // State
  const [stickmanPosition, setStickmanPosition] = useState(0);
  const [isCutting, setIsCutting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [playSound, setPlaySound] = useState(false);

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Constants
  const STICKMAN_MOVE_STEP = level.moveSpeed || 2;
  const ACCURACY_THRESHOLD = level.accuracyThreshold || 5;
  const TARGET_POSITION = (level.numerator / level.denominator) * 100;

  // Mix things up for more challenge in later levels
  const reversedLine = level.reversed || false;
  const fractionLineWidth = level.lineWidth || 90;

  // Setup once on mount and when level changes
  useEffect(() => {
    // Detect if we're on a touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setTouchMode(isTouchDevice);

    // Reset position for new level
    setStickmanPosition(0);
    setIsCutting(false);
    setAttempts(0);
    setShowHint(false);

    // Create visible sections (some sections might be hidden in advanced levels)
    const allSections = Array.from(
      { length: level.denominator + 1 },
      (_, i) => i
    );

    if (level.hiddenSections && level.hiddenSections.length > 0) {
      const filteredSections = allSections.filter(
        (section) => !level.hiddenSections?.includes(section)
      );
      setVisibleSections(filteredSections);
    } else {
      setVisibleSections(allSections);
    }
  }, [level]);

  // Perform cutting action
  const performCut = useCallback(() => {
    if (isCutting || isPaused) return;

    setIsCutting(true);
    setPlaySound(true);

    // Increment attempts counter
    setAttempts((prev) => prev + 1);

    // After animation (500ms), check result
    setTimeout(() => {
      // Calculate position based on reversed line if needed
      const actualPosition = reversedLine
        ? 100 - stickmanPosition
        : stickmanPosition;

      // Calculate the exact target position as a fraction
      const targetPosition = (level.numerator / level.denominator) * 100;

      // Check if cut is close enough to the correct position
      const positionDifference = Math.abs(actualPosition - targetPosition);
      const isWithinThreshold = positionDifference <= ACCURACY_THRESHOLD;

      // Calculate accuracy percentage (100% at perfect, 0% at threshold)
      let accuracyPercentage = 0;
      if (positionDifference === 0) {
        accuracyPercentage = 100;
      } else if (positionDifference <= ACCURACY_THRESHOLD) {
        // Linear scale from 100% to 60% based on distance from target
        accuracyPercentage =
          100 - (positionDifference / ACCURACY_THRESHOLD) * 40;
      } else {
        // Outside threshold, scale down based on how far off
        accuracyPercentage = Math.max(
          0,
          60 - (positionDifference - ACCURACY_THRESHOLD) * 2
        );
      }

      // Calculate time bonus based on remaining time
      const timeBonus = Math.floor(timeLeft * (level.timeBonusMultiplier || 1));

      if (isWithinThreshold) {
        onSuccess(accuracyPercentage, timeBonus);
      } else {
        onFailure(
          `Cut was off by ${positionDifference.toFixed(
            1
          )}%. Target was ${targetPosition.toFixed(1)}%`
        );
      }

      // Reset cutting animation
      setTimeout(() => {
        setIsCutting(false);
        setPlaySound(false);
      }, 500);
    }, 500);
  }, [
    isCutting,
    isPaused,
    reversedLine,
    stickmanPosition,
    level.numerator,
    level.denominator,
    level.timeBonusMultiplier,
    ACCURACY_THRESHOLD,
    timeLeft,
    onSuccess,
    onFailure,
  ]);

  // Handle keyboard controls
  useEffect(() => {
    if (isPaused || isCutting || showInstructions) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          setStickmanPosition((prev) => Math.max(0, prev - STICKMAN_MOVE_STEP));
          break;
        case "ArrowRight":
          setStickmanPosition((prev) =>
            Math.min(100, prev + STICKMAN_MOVE_STEP)
          );
          break;
        case " ": // Spacebar
          e.preventDefault(); // Prevent page scrolling
          performCut();
          break;
        case "h": // Hint key
          setShowHint(true);
          // Auto-hide hint after 2 seconds
          setTimeout(() => setShowHint(false), 2000);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused, isCutting, showInstructions, STICKMAN_MOVE_STEP, performCut]);

  // Handle touch screen movement
  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameAreaRef.current && !isCutting && !isPaused && !showInstructions) {
      const touch = e.touches[0];
      const gameRect = gameAreaRef.current.getBoundingClientRect();
      const relativeX = touch.clientX - gameRect.left;
      const percentage = (relativeX / gameRect.width) * 100;
      setStickmanPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  // Handle touch to cut
  const handleTouchEnd = () => {
    if (!isCutting && !isPaused && !showInstructions) {
      performCut();
    }
  };

  // Render tick marks for the current fraction
  const renderTickMarks = () => {
    const { denominator } = level;
    const ticks = [];

    // Create all tick marks that should be visible
    for (let i = 0; i <= denominator; i++) {
      if (!visibleSections.includes(i)) continue;

      const position = (i / denominator) * 100;

      // Apply reverse positioning if needed
      const actualPosition = reversedLine ? 100 - position : position;

      ticks.push(
        <div
          key={i}
          className={`absolute w-1 h-6 ${
            i === level.numerator ? "bg-blue-600" : "bg-blue-800"
          }`}
          style={{
            left: `${actualPosition}%`,
            top: -12,
            transform: "translateX(-50%)",
          }}
        >
          {/* Tick label - only show if not in stealth mode */}
          {!level.stealthMode && (
            <div
              className={`absolute top-8 text-xs font-bold ${
                i === level.numerator ? "text-blue-600" : "text-blue-800"
              }`}
              style={{ transform: "translateX(-50%)" }}
            >
              {i}/{denominator}
            </div>
          )}
        </div>
      );
    }

    return ticks;
  };

  // Sound effect component
  const SoundEffect = () => {
    useEffect(() => {
      try {
        if (typeof window !== "undefined") {
          const audio = new Audio("/sword-cut.mp3");
          audio.volume = 0.5;
          audio
            .play()
            .catch((err) => console.error("Error playing sound:", err));
        }
      } catch (error) {
        console.error("Error with audio:", error);
      }
    }, []);

    return null;
  };

  // Create obstacles for advanced levels
  const renderObstacles = () => {
    if (!level.obstacles || level.obstacles.length === 0) return null;

    return level.obstacles.map((obstacle, index) => (
      <motion.div
        key={index}
        className="absolute"
        style={{
          left: `${obstacle.position}%`,
          bottom: 40 + obstacle.height / 2,
          width: `${obstacle.width}%`,
          height: obstacle.height,
          background: obstacle.color || "rgba(255, 0, 0, 0.5)",
          borderRadius: "4px",
          transform: "translateX(-50%)",
        }}
        animate={
          obstacle.moving
            ? {
                left: [
                  `${obstacle.position}%`,
                  `${obstacle.position + (obstacle.movementRange || 0)}%`,
                  `${obstacle.position}%`,
                ],
              }
            : undefined
        }
        transition={{
          duration: obstacle.movementSpeed || 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    ));
  };

  return (
    <>
      {playSound && <SoundEffect />}
      {showInstructions && (
        <InstructionModal
          touchMode={touchMode}
          onClose={() => setShowInstructions(false)}
        />
      )}

      {/* Challenge Display */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl border-2 border-blue-200 shadow-md mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Cut the line at exactly:
        </h2>
        <div className="text-4xl font-bold text-blue-800">{level.fraction}</div>

        {level.hint && (
          <div className="mt-2 text-blue-600 italic text-sm">
            {showHint ? level.hint : "Press 'h' for a hint"}
          </div>
        )}

        {level.challenge && (
          <div className="mt-1 bg-purple-100 p-2 rounded-md text-purple-700 font-medium">
            Challenge: {level.challenge}
          </div>
        )}
      </div>

      {/* Game Arena */}
      <div
        ref={gameAreaRef}
        className={`relative border-2 border-blue-300 rounded-xl h-60 mb-6 overflow-hidden ${
          level.background || "bg-gradient-to-r from-amber-50 to-blue-50"
        }`}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ground/Floor */}
        <div className="absolute bottom-0 w-full h-10 bg-green-200"></div>

        {/* Obstacles (advanced levels) */}
        {renderObstacles()}

        {/* Cutting Line */}
        <div
          ref={lineRef}
          className={`absolute h-2 rounded ${
            level.lineGradient || "bg-gradient-to-r from-red-500 to-blue-500"
          }`}
          style={{
            width: `${fractionLineWidth}%`,
            bottom: 40,
            left: `${(100 - fractionLineWidth) / 2}%`,
          }}
        >
          {/* Tick marks */}
          {renderTickMarks()}

          {/* Target cut position indicator (for hint) */}
          {showHint && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              className="absolute w-1 bg-yellow-400"
              style={{
                left: `${
                  reversedLine ? 100 - TARGET_POSITION : TARGET_POSITION
                }%`,
                bottom: 0,
                boxShadow: "0 0 8px 2px rgba(250, 204, 21, 0.7)",
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs px-1 py-0.5 rounded text-yellow-800">
                Cut here
              </div>
            </motion.div>
          )}

          {/* Cut effect animation */}
          {isCutting && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 120, opacity: 1 }}
              className="absolute w-0.5 bg-white"
              style={{
                left: `${stickmanPosition}%`,
                bottom: 0,
                boxShadow: "0 0 10px 3px rgba(255, 255, 255, 0.9)",
              }}
            />
          )}
        </div>

        {/* Stickman Character */}
        <AnimatePresence>
          {!isPaused && (
            <StickmanNinja
              position={stickmanPosition}
              isCutting={isCutting}
              isAnimated={level.animatedCharacter}
            />
          )}
        </AnimatePresence>

        {/* Level paused overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-2">PAUSED</h3>
              <p>Resume the game to continue</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Reminder */}
      <div className="bg-white p-3 rounded-lg shadow-md text-center mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-blue-700 text-sm">Controls:</h3>
            {touchMode ? (
              <p className="text-sm">Slide to move • Lift to cut</p>
            ) : (
              <p className="text-sm">←→ to move • Space to cut • H for hint</p>
            )}
          </div>

          <div className="text-right">
            <div className="text-blue-800 text-sm font-medium">
              Attempts: {attempts}
            </div>
            <div className="text-xs text-gray-500">
              Accuracy: ±{ACCURACY_THRESHOLD}%
            </div>
          </div>
        </div>
      </div>

      {/* Helper Button for Instructions */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Instructions
        </button>
      </div>
    </>
  );
};

export default FractionCutterGame;
