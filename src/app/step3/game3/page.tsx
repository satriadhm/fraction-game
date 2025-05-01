// src/app/step3/game3/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameLayout from "../../components/templates/GameLayout";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";
import GameResults from "../../components/game/GameResult";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import FractionCutterGame from "@/app/components/game/FractionCutterGame";
import { GAME_LEVELS } from "@/app/data/gameLevel";

const Game3Page = () => {
  const router = useRouter();
  const { stopLoading } = usePageLoader();

  // Game state
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showFeedback, setShowFeedback] = useState<
    "success" | "error" | "warning" | "info" | null
  >(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // seconds per level
  const [isPaused, setIsPaused] = useState(false);
  const [timeBonusEarned, setTimeBonusEarned] = useState(0);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  // Removed unused totalScore state

  // Handle level failure function - define first
  const handleLevelFailed = () => {
    setLives((prev) => prev - 1);
    setShowFeedback("error");

    setTimeout(() => {
      setShowFeedback(null);

      // Game over if no lives left
      if (lives <= 1) {
        setGameComplete(true);
      } else {
        // Retry level
        setTimeLeft(Math.max(15, 20 - currentLevel));
      }
    }, 2000);
  };

  // Timer logic - fixed dependency array
  useEffect(() => {
    if (!gameStarted || gameComplete || isPaused || showFeedback) return;

    // Set timer
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        // Time's up!
        handleLevelFailed();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    timeLeft,
    gameStarted,
    gameComplete,
    isPaused,
    showFeedback,
    lives,
    currentLevel,
  ]);

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // Handle level completion
  const handleLevelComplete = (
    accuracyPercentage: number,
    timeBonus: number
  ) => {
    // Calculate score based on accuracy and time
    const levelScore = Math.floor(50 + accuracyPercentage * 50 + timeBonus);

    setTimeBonusEarned(timeBonus);
    setScore((prev) => prev + levelScore);
    setScoreAnimation(true);
    setShowFeedback("success");
    setShowConfetti(true);

    // Short pause to show feedback
    setTimeout(() => {
      setShowFeedback(null);
      setShowConfetti(false);
      setScoreAnimation(false);

      // Move to next level or complete game
      if (currentLevel < GAME_LEVELS.length - 1) {
        setCurrentLevel((prev) => prev + 1);
        // Reset timer for next level
        setTimeLeft(Math.max(15, 20 - currentLevel)); // Gradually decrease time limits
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  // Start game with animation sequence
  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(20);
  };

  // If game is complete, show results
  if (gameComplete) {
    return (
      <GameResults
        score={score}
        totalQuestions={GAME_LEVELS.length}
        onRestartGame={() => {
          setCurrentLevel(0);
          setScore(0);
          setLives(3);
          setGameComplete(false);
          setGameStarted(false);
          setTimeLeft(20);
        }}
      />
    );
  }

  // Show intro screen if game not started
  if (!gameStarted) {
    return (
      <GameLayout
        title="Fraction Ninja"
        subtitle="Cut the line at the exact fraction position!"
        currentQuestion={0}
        totalQuestions={GAME_LEVELS.length}
        score={0}
        maxScore={GAME_LEVELS.length}
        backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
        accentColor="blue"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Welcome to Fraction Ninja!
          </h2>

          <div className="mb-8">
            <div className="relative w-40 h-40 mx-auto mb-4">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {/* Ninja Character */}
                <div className="relative">
                  <svg
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Ninja body with sword */}
                    <circle cx="80" cy="60" r="30" fill="#333" />
                    <rect
                      x="50"
                      y="60"
                      width="60"
                      height="60"
                      rx="5"
                      fill="#333"
                    />
                    <path d="M80 50 L90 35 L95 40 Z" fill="white" />
                    <ellipse cx="70" cy="50" rx="5" ry="8" fill="white" />
                    <ellipse cx="90" cy="50" rx="5" ry="8" fill="white" />
                    <circle cx="70" cy="50" r="3" fill="#333" />
                    <circle cx="90" cy="50" r="3" fill="#333" />

                    {/* Sword */}
                    <rect
                      x="110"
                      y="80"
                      width="40"
                      height="8"
                      rx="2"
                      fill="#888"
                    />
                    <rect
                      x="110"
                      y="80"
                      width="10"
                      height="8"
                      rx="2"
                      fill="#654321"
                    />
                    <path d="M145 80 L160 65 L150 80 Z" fill="#4285F4" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <p className="text-lg mb-4">
              Test your fraction skills by cutting lines at the exact positions!
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-bold text-blue-700 mb-2">How to Play:</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-800">
                <li>
                  Move the ninja with{" "}
                  <span className="font-bold">arrow keys</span> or by{" "}
                  <span className="font-bold">touch</span>
                </li>
                <li>
                  Cut the line with <span className="font-bold">spacebar</span>{" "}
                  or by <span className="font-bold">tapping</span>
                </li>
                <li>Be as precise as possible to earn maximum points</li>
                <li>Complete cuts faster to earn time bonuses</li>
                <li>You have 3 lives - use them wisely!</li>
              </ul>
            </div>
          </div>

          <AnimatedButton
            onClick={startGame}
            color="blue"
            size="large"
            hoverEffect="bounce"
            icon={<Icon type="play" />}
          >
            Start Game
          </AnimatedButton>
        </motion.div>
      </GameLayout>
    );
  }

  // Main game view
  return (
    <GameLayout
      title="Fraction Ninja"
      subtitle={`Level ${currentLevel + 1}: ${
        GAME_LEVELS[currentLevel]?.name || "Challenge"
      }`}
      currentQuestion={currentLevel}
      totalQuestions={GAME_LEVELS.length}
      score={score}
      showConfetti={showConfetti}
      showFeedback={showFeedback}
      feedbackMessage={
        showFeedback === "success"
          ? `Perfect cut! ${
              timeBonusEarned > 0
                ? `Time bonus: +${timeBonusEarned} points!`
                : ""
            }`
          : showFeedback === "error"
          ? `Oops! Not quite at ${
              GAME_LEVELS[currentLevel]?.fraction || "the target"
            }.`
          : undefined
      }
      onFeedbackComplete={() => setShowFeedback(null)}
      backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
      accentColor="blue"
    >
      <div className="max-w-xl mx-auto">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-md">
          <div className="flex space-x-2">
            {/* Lives */}
            <div className="flex items-center">
              {Array.from({ length: lives }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <svg
                    className="w-6 h-6 text-red-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div
                className={`font-bold text-lg ${
                  timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-blue-600"
                }`}
              >
                {timeLeft}s
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / 20) * 100}%` }}
                transition={{ type: "tween" }}
              />
            </div>
          </div>

          {/* Score with animation */}
          <div className="relative">
            <div className="font-bold text-lg text-purple-700">{score} pts</div>
            {scoreAnimation && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                exit={{ opacity: 0 }}
                className="absolute -top-8 right-0 text-green-500 font-bold whitespace-nowrap"
              >
                +{timeBonusEarned + 50} pts
              </motion.div>
            )}
          </div>
        </div>

        {/* Main Game Component */}
        {GAME_LEVELS[currentLevel] && (
          <FractionCutterGame
            level={GAME_LEVELS[currentLevel]}
            onSuccess={handleLevelComplete}
            onFailure={handleLevelFailed}
            isPaused={isPaused || !!showFeedback}
            timeLeft={timeLeft}
          />
        )}

        {/* Controls and Options */}
        <div className="flex justify-between mt-4">
          <AnimatedButton
            onClick={() => setIsPaused(!isPaused)}
            color="purple"
            size="small"
            hoverEffect="wobble"
            icon={<Icon type={isPaused ? "play" : "pause"} />}
          >
            {isPaused ? "Resume" : "Pause"}
          </AnimatedButton>

          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="small"
            hoverEffect="wobble"
            icon={<Icon type="home" />}
          >
            Menu
          </AnimatedButton>
        </div>
      </div>
    </GameLayout>
  );
};

export default Game3Page;
