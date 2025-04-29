"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  AnimatedButton,
  Icon,
  CuteStar,
  CuteHeart,
  ConfettiEffect,
  GameLayout,
} from "@/app/components";
import { useRouter } from "next/navigation";

const FractionMatchingGame = () => {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userConnections, setUserConnections] = useState({});
  const [selectedFraction, setSelectedFraction] = useState(null);
  const [lines, setLines] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const containerRef = useRef(null);
  const fractionRefs = useRef({});

  // Game levels with equivalent fractions to match
  const levels = [
    {
      id: 1,
      leftSide: [
        { id: "L1", fraction: "1/2", color: "bg-pink-400" },
        { id: "L2", fraction: "1/4", color: "bg-blue-700" },
        { id: "L3", fraction: "3/6", color: "bg-blue-500" },
      ],
      rightSide: [
        { id: "R1", fraction: "2/4", color: "bg-pink-400" },
        { id: "R2", fraction: "2/8", color: "bg-blue-700" },
        { id: "R3", fraction: "1/2", color: "bg-blue-500" },
      ],
      connections: { L1: "R1", L2: "R2", L3: "R3" },
    },
    {
      id: 2,
      leftSide: [
        { id: "L1", fraction: "1/3", color: "bg-pink-400" },
        { id: "L2", fraction: "2/6", color: "bg-pink-500" },
        { id: "L3", fraction: "4/8", color: "bg-blue-600" },
      ],
      rightSide: [
        { id: "R1", fraction: "2/6", color: "bg-pink-400" },
        { id: "R2", fraction: "1/3", color: "bg-pink-500" },
        { id: "R3", fraction: "1/2", color: "bg-blue-600" },
      ],
      connections: { L1: "R1", L2: "R2", L3: "R3" },
    },
    {
      id: 3,
      leftSide: [
        { id: "L1", fraction: "2/3", color: "bg-pink-400" },
        { id: "L2", fraction: "3/5", color: "bg-pink-500" },
        { id: "L3", fraction: "5/10", color: "bg-blue-500" },
      ],
      rightSide: [
        { id: "R1", fraction: "4/6", color: "bg-pink-400" },
        { id: "R2", fraction: "6/10", color: "bg-pink-500" },
        { id: "R3", fraction: "1/2", color: "bg-blue-500" },
      ],
      connections: { L1: "R1", L2: "R2", L3: "R3" },
    },
    {
      id: 4,
      leftSide: [
        { id: "L1", fraction: "1/2", color: "bg-pink-400" },
        { id: "L2", fraction: "3/4", color: "bg-pink-500" },
        { id: "L3", fraction: "2/5", color: "bg-blue-500" },
      ],
      rightSide: [
        { id: "R1", fraction: "3/6", color: "bg-pink-400" },
        { id: "R2", fraction: "6/8", color: "bg-pink-500" },
        { id: "R3", fraction: "4/10", color: "bg-blue-500" },
      ],
      connections: { L1: "R1", L2: "R2", L3: "R3" },
    },
    {
      id: 5,
      leftSide: [
        { id: "L1", fraction: "5/10", color: "bg-pink-400" },
        { id: "L2", fraction: "2/8", color: "bg-pink-500" },
        { id: "L3", fraction: "3/9", color: "bg-blue-500" },
      ],
      rightSide: [
        { id: "R1", fraction: "1/2", color: "bg-pink-400" },
        { id: "R2", fraction: "1/4", color: "bg-pink-500" },
        { id: "R3", fraction: "1/3", color: "bg-blue-500" },
      ],
      connections: { L1: "R1", L2: "R2", L3: "R3" },
    },
  ];

  // Initialize fraction refs
  useEffect(() => {
    fractionRefs.current = {};
  }, [currentLevel]);

  // Calculate center position of element
  const getElementCenter = (el) => {
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    };
  };

  // Handle fraction selection
  const handleFractionClick = (side, fractionId) => {
    // First selection or selecting from other side
    if (
      !selectedFraction ||
      (selectedFraction && selectedFraction.side !== side)
    ) {
      setSelectedFraction({ side, id: fractionId });

      // If this is the second selection (connecting)
      if (selectedFraction) {
        // Determine left and right IDs
        const leftId =
          selectedFraction.side === "left" ? selectedFraction.id : fractionId;
        const rightId =
          selectedFraction.side === "right" ? selectedFraction.id : fractionId;

        // Create new connection
        const connectionKey =
          side === "left" ? fractionId : selectedFraction.id;
        const connectionValue =
          side === "right" ? fractionId : selectedFraction.id;

        // Add the connection
        setUserConnections((prev) => ({
          ...prev,
          [connectionKey]: connectionValue,
        }));

        // Add the line
        const leftEl = fractionRefs.current[leftId];
        const rightEl = fractionRefs.current[rightId];

        if (leftEl && rightEl) {
          const leftCenter = getElementCenter(leftEl);
          const rightCenter = getElementCenter(rightEl);

          setLines((prev) => [
            ...prev,
            {
              id: `${leftId}-${rightId}`,
              x1: leftCenter.x,
              y1: leftCenter.y,
              x2: rightCenter.x,
              y2: rightCenter.y,
              leftId,
              rightId,
            },
          ]);
        }

        setSelectedFraction(null);
      }
    } else {
      // Deselect if clicking the same fraction
      setSelectedFraction(null);
    }
  };

  // Check answers
  const checkAnswers = () => {
    const currentLevelData = levels[currentLevel];
    const correctConnections = currentLevelData.connections;

    // Check if all connections are correct
    let allCorrect = true;

    // Check each connection
    Object.keys(correctConnections).forEach((leftId) => {
      const correctRightId = correctConnections[leftId];
      const userRightId = userConnections[leftId];

      if (userRightId !== correctRightId) {
        allCorrect = false;
      }
    });

    // Check if all required connections are made
    const correctConnectionsCount = Object.keys(correctConnections).length;
    const userConnectionsCount = Object.keys(userConnections).length;

    if (userConnectionsCount !== correctConnectionsCount) {
      allCorrect = false;
    }

    // Show feedback and update score
    setSuccess(allCorrect);
    setShowFeedback(allCorrect ? "success" : "error");
    setShowConfetti(allCorrect);

    if (allCorrect) {
      setScore((prev) => prev + 1);

      // Move to next level after delay
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prev) => prev + 1);
          resetLevel();
        } else {
          setGameComplete(true);
        }
        setShowFeedback(null);
        setShowConfetti(false);
      }, 2000);
    } else {
      // Hide feedback after delay
      setTimeout(() => {
        setShowFeedback(null);
      }, 2000);
    }
  };

  // Reset the current level
  const resetLevel = () => {
    setUserConnections({});
    setLines([]);
    setSelectedFraction(null);
    setSuccess(false);
    setShowFeedback(null);
  };

  // Restart game
  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameComplete(false);
    resetLevel();
  };

  // Render game content based on game state
  const renderGameContent = () => {
    if (gameComplete) {
      return (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-lg"
        >
          <div className="relative mb-8">
            <div className="absolute -top-12 -left-8">
              <CuteStar size={50} color="#FCD34D" />
            </div>
            <div className="absolute -top-12 -right-8">
              <CuteHeart size={50} color="#3B82F6" />
            </div>

            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Game Completed!
            </h2>
            <p className="text-lg mb-2">
              Your final score:{" "}
              <span className="font-bold text-blue-600">
                {score}/{levels.length}
              </span>
            </p>
            <p className="mb-6 text-gray-700">
              {score === levels.length
                ? "Perfect score! You're a fraction master!"
                : score >= Math.floor(levels.length * 0.7)
                ? "Great job! You understand equivalent fractions well!"
                : "Good effort! Keep practicing to master equivalent fractions."}
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <AnimatedButton
              onClick={restartGame}
              color="green"
              hoverEffect="bounce"
              icon={<Icon type="play" />}
            >
              Play Again
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push("/menu")}
              color="blue"
              hoverEffect="wobble"
              icon={<Icon type="home" />}
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>
      );
    }

    const currentLevelData = levels[currentLevel];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Typography
          variant="subtitle1"
          color="primary"
          className="text-center mb-4 text-lg"
        >
          Connect each fraction with its equivalent fraction
        </Typography>

        {/* Main game container */}
        <div
          ref={containerRef}
          className="relative w-full h-64 bg-blue-100 bg-opacity-50 rounded-lg shadow-inner mb-6 overflow-hidden"
        >
          {/* SVG for drawing connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {lines.map((line) => (
              <motion.line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </svg>

          {/* Left side fractions */}
          <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-around h-full">
            {currentLevelData.leftSide.map((fraction) => (
              <motion.div
                key={fraction.id}
                ref={(el) => (fractionRefs.current[fraction.id] = el)}
                className={`w-16 h-12 ${
                  fraction.color
                } rounded flex items-center justify-center cursor-pointer shadow-md 
                  ${
                    selectedFraction && selectedFraction.id === fraction.id
                      ? "ring-4 ring-yellow-400"
                      : ""
                  }`}
                onClick={() => handleFractionClick("left", fraction.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold">
                  {fraction.fraction}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Center circles */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex flex-col justify-around h-full">
            {currentLevelData.leftSide.map((_, index) => (
              <div key={index} className="w-6 h-6 bg-blue-900 rounded-full" />
            ))}
          </div>

          {/* Right side fractions */}
          <div className="absolute right-8 top-0 bottom-0 flex flex-col justify-around h-full">
            {currentLevelData.rightSide.map((fraction) => (
              <motion.div
                key={fraction.id}
                ref={(el) => (fractionRefs.current[fraction.id] = el)}
                className={`w-16 h-12 ${
                  fraction.color
                } rounded flex items-center justify-center cursor-pointer shadow-md
                  ${
                    selectedFraction && selectedFraction.id === fraction.id
                      ? "ring-4 ring-yellow-400"
                      : ""
                  }`}
                onClick={() => handleFractionClick("right", fraction.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold">
                  {fraction.fraction}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-4">
          <AnimatedButton
            onClick={checkAnswers}
            color="green"
            hoverEffect="bounce"
            icon={<Icon type="check" />}
            disabled={Object.keys(userConnections).length === 0}
          >
            Check Answer
          </AnimatedButton>
          <AnimatedButton
            onClick={resetLevel}
            color="red"
            hoverEffect="wobble"
            icon={<Icon type="refresh" />}
          >
            Reset
          </AnimatedButton>
        </div>

        {/* Level progress indicator */}
        <div className="mt-6 flex justify-between items-center">
          <Typography variant="body2" className="text-gray-600">
            Level {currentLevel + 1} of {levels.length}
          </Typography>
          <div className="flex space-x-1">
            {levels.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentLevel ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Typography variant="body2" className="text-gray-600">
            Score: {score}
          </Typography>
        </div>

        {/* Feedback message */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg text-white text-center ${
              showFeedback === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {showFeedback === "success"
              ? "Correct! Great job matching equivalent fractions."
              : "Not quite right. Try again!"}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <GameLayout title="Fraction Matching Game">
      {renderGameContent()}
      {showConfetti && <ConfettiEffect duration={2000} />}
    </GameLayout>
  );
};

export default FractionMatchingGame;
