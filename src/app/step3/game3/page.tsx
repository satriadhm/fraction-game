// src/app/step3/game3/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GameLayout from "../../components/templates/GameLayout";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";
import GameResults from "../../components/game/GameResult";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import FractionCutterGame from "@/app/components/game/FractionCutterGame";
import { GAME_LEVELS } from "@/app/data/gameLevel";
import { UserStorage } from "@/app/utils/userStorage";
import GameStats from "@/app/components/game/GameStats";

const Game3Page = () => {
  const router = useRouter();
  const { stopLoading } = usePageLoader();

  // Game state with clearer structure
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showFeedback, setShowFeedback] = useState<
    "success" | "error" | "warning" | "info" | null
  >(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per level initially
  const [isPaused, setIsPaused] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Constants for scoring
  const BASE_SCORE = 100;
  const TIME_PENALTY_PER_SECOND = 1;
  const ACCURACY_WEIGHT = 0.6;
  const TIME_WEIGHT = 0.4;
  const LEVELS_TOTAL = GAME_LEVELS.length;

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // Reset timer for current level
  const resetLevelTimer = useCallback(() => {
    // Progressive difficulty: less time as levels increase
    const baseTime = 30;
    const timePerLevel = Math.max(15, baseTime - currentLevel * 2);
    setTimeLeft(timePerLevel);
  }, [currentLevel]);

  // Handle when timer expires
  const handleTimerExpired = useCallback(() => {
    setLives((prev) => prev - 1);

    if (lives <= 1) {
      // Game over
      setGameComplete(true);
      setFeedbackMessage("Time's up! Game Over!");
    } else {
      // Retry level
      setShowFeedback("error");
      setFeedbackMessage("Time's up! Try again!");
      setTimeout(() => {
        setShowFeedback(null);
        resetLevelTimer();
      }, 2000);
    }
  }, [lives, resetLevelTimer]);

  // Timer logic - fixed dependency array
  useEffect(() => {
    if (!gameStarted || gameComplete || isPaused || showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimerExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameComplete, isPaused, showFeedback, handleTimerExpired]);

  // Calculate score based on accuracy and time
  const calculateScore = useCallback(
    (accuracyPercentage: number, timeRemaining: number) => {
      // Convert accuracy from 0-100 to 0-1
      const accuracy = accuracyPercentage / 100;

      // Time bonus: more time left = more bonus
      const timeBonus = Math.max(0, timeRemaining * TIME_PENALTY_PER_SECOND);

      // Base score + accuracy component + time component
      const accuracyScore = accuracy * BASE_SCORE * ACCURACY_WEIGHT;
      const timeScore = (timeBonus / 30) * BASE_SCORE * TIME_WEIGHT; // Normalize time bonus

      const totalScore = Math.round(accuracyScore + timeScore);

      return {
        accuracyScore: Math.round(accuracyScore),
        timeScore: Math.round(timeScore),
        totalScore,
      };
    },
    []
  );

  // Handle successful level completion
  const handleLevelComplete = useCallback(
    (accuracyPercentage: number) => {
      // Calculate level score
      const scores = calculateScore(accuracyPercentage, timeLeft);

      setTotalScore((prev) => prev + scores.totalScore);

      setShowFeedback("success");
      setShowConfetti(true);
      setFeedbackMessage(
        `Perfect cut! Accuracy: ${Math.round(accuracyPercentage)}%\n` +
          `Accuracy Score: ${scores.accuracyScore} + Time Bonus: ${scores.timeScore}`
      );

      // Move to next level after showing feedback
      setTimeout(() => {
        setShowFeedback(null);
        setShowConfetti(false);

        if (currentLevel < LEVELS_TOTAL - 1) {
          // Next level
          setCurrentLevel((prev) => prev + 1);
          resetLevelTimer();
        } else {
          // Game complete
          setGameComplete(true);
        }
      }, 2500);
    },
    [currentLevel, timeLeft, calculateScore, resetLevelTimer, LEVELS_TOTAL]
  );

  // Handle level failure
  const handleLevelFailed = useCallback(
    (reason: string) => {
      setLives((prev) => prev - 1);

      if (lives <= 1) {
        // Game over
        setGameComplete(true);
        setFeedbackMessage(`Game Over! ${reason}`);
      } else {
        // Try again
        setShowFeedback("error");
        setFeedbackMessage(`${reason} Try again!`);

        setTimeout(() => {
          setShowFeedback(null);
          resetLevelTimer();
        }, 2000);
      }
    },
    [lives, resetLevelTimer]
  );

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(0);
    setTotalScore(0);
    setLives(3);
    setGameComplete(false);
    resetLevelTimer();
  };

  // Reset game
  const resetGame = () => {
    setCurrentLevel(0);
    setTotalScore(0);
    setLives(3);
    setGameComplete(false);
    setGameStarted(false);
    setShowFeedback(null);
    setShowConfetti(false);
    resetLevelTimer();
  };

  // If game is complete, show results
  if (gameComplete) {
    // Update user progress
    UserStorage.updateStepProgress("step3", totalScore, true);

    return (
      <GameResults
        score={totalScore}
        totalQuestions={LEVELS_TOTAL}
        onRestartGame={resetGame}
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
        totalQuestions={LEVELS_TOTAL}
        score={0}
        maxScore={LEVELS_TOTAL * BASE_SCORE}
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
                {/* Ninja Character SVG */}
                <svg
                  width="160"
                  height="160"
                  viewBox="0 0 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              </motion.div>
            </div>

            <p className="text-lg mb-4">
              Test your fraction skills by cutting lines at the exact positions!
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-bold text-blue-700 mb-2">How to Play:</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-800">
                <li>Move the ninja with arrow keys or touch</li>
                <li>Cut the line with spacebar or tap</li>
                <li>Be as precise as possible for maximum points</li>
                <li>Complete cuts faster for time bonuses</li>
                <li>You have 3 lives - use them wisely!</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-indigo-700 mb-2">Scoring:</h3>
              <p className="text-indigo-800">
                Base Score: {BASE_SCORE} points
                <br />
                Accuracy Bonus: Up to {Math.round(
                  BASE_SCORE * ACCURACY_WEIGHT
                )}{" "}
                points
                <br />
                Time Bonus: Up to {Math.round(BASE_SCORE * TIME_WEIGHT)} points
              </p>
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
      subtitle={`Level ${currentLevel + 1}: ${GAME_LEVELS[currentLevel]?.name}`}
      currentQuestion={currentLevel}
      totalQuestions={LEVELS_TOTAL}
      score={totalScore}
      showConfetti={showConfetti}
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      onFeedbackComplete={() => setShowFeedback(null)}
      backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
      accentColor="blue"
    >
      <div className="max-w-xl mx-auto">
        <GameStats currentStep="step3" />

        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-md">
          {/* Lives */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Lives:</span>
            <div className="flex space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: i < lives ? 1 : 0.8,
                    opacity: i < lives ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className={`w-6 h-6 ${
                      i < lives ? "text-red-500" : "text-gray-300"
                    } fill-current`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Time:</span>
            <div className="flex items-center">
              <svg
                className={`w-5 h-5 ${
                  timeLeft <= 10 ? "text-red-500" : "text-blue-500"
                }`}
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
              <span
                className={`font-bold text-lg ml-1 ${
                  timeLeft <= 10
                    ? "text-red-500 animate-pulse"
                    : "text-blue-600"
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Score:</span>
            <span className="font-bold text-lg text-purple-700">
              {totalScore}
            </span>
          </div>
        </div>

        {/* Main Game Component */}
        <FractionCutterGame
          level={GAME_LEVELS[currentLevel]}
          onSuccess={handleLevelComplete}
          onFailure={handleLevelFailed}
          isPaused={isPaused || !!showFeedback}
          timeLeft={timeLeft}
        />

        {/* Controls */}
        <div className="flex justify-between mt-6">
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
            Back to Menu
          </AnimatedButton>
        </div>
      </div>
    </GameLayout>
  );
};

export default Game3Page;
