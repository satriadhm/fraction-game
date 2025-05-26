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
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // NEW SIMPLIFIED SCORING SYSTEM
  const SCORING = {
    PERFECT: { threshold: 95, points: 1500, emoji: "🎯", title: "PERFECT CUT!" },
    EXCELLENT: { threshold: 85, points: 1200, emoji: "🎖️", title: "EXCELLENT!" },
    GREAT: { threshold: 70, points: 1000, emoji: "⭐", title: "GREAT CUT!" },
    GOOD: { threshold: 55, points: 800, emoji: "👍", title: "GOOD CUT!" },
    OK: { threshold: 40, points: 600, emoji: "👌", title: "NICE TRY!" },
    MINIMUM: { threshold: 0, points: 400, emoji: "✅", title: "COMPLETED!" }
  };

  const TIME_BONUS_RATE = 25; // 25 points per second remaining
  const MAX_TIME_BONUS = 750; // Maximum time bonus
  const LEVEL_BONUS_BASE = 200; // Base bonus per level
  const LEVELS_TOTAL = GAME_LEVELS.length;

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // Reset timer for current level
  const resetLevelTimer = useCallback(() => {
    // Progressive difficulty: less time as levels increase
    const baseTime = 35;
    const timePerLevel = Math.max(20, baseTime - currentLevel * 1.5);
    setTimeLeft(Math.round(timePerLevel));
  }, [currentLevel]);

  // Handle when timer expires
  const handleTimerExpired = useCallback(() => {
    setLives((prev) => prev - 1);

    if (lives <= 1) {
      // Game over
      setGameComplete(true);
      setFeedbackMessage("⏰ Time's up! Game Over!");
    } else {
      // Retry level
      setShowFeedback("error");
      setFeedbackMessage("⏰ Time's up! Try again!");
      setTimeout(() => {
        setShowFeedback(null);
        resetLevelTimer();
      }, 2000);
    }
  }, [lives, resetLevelTimer]);

  // Timer logic
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

  // NEW SIMPLIFIED SCORE CALCULATION
  const calculateScore = useCallback(
    (accuracyPercentage: number, timeRemaining: number) => {
      // Determine accuracy tier
      let accuracyTier = SCORING.MINIMUM;
      
      for (const [, tier] of Object.entries(SCORING)) {
        if (accuracyPercentage >= tier.threshold) {
          accuracyTier = tier;
          break;
        }
      }

      // Calculate components
      const baseScore = accuracyTier.points;
      const timeBonus = Math.min(timeRemaining * TIME_BONUS_RATE, MAX_TIME_BONUS);
      const levelBonus = (currentLevel + 1) * LEVEL_BONUS_BASE;
      const totalScore = baseScore + timeBonus + levelBonus;

      return {
        tier: accuracyTier,
        baseScore,
        timeBonus: Math.round(timeBonus),
        levelBonus,
        totalScore: Math.round(totalScore),
        accuracy: Math.round(accuracyPercentage)
      };
    },
    [currentLevel]
  );

  // Handle successful level completion
  const handleLevelComplete = useCallback(
    (accuracyPercentage: number) => {
      const scores = calculateScore(accuracyPercentage, timeLeft);

      // Update total score
      setTotalScore((prev) => prev + scores.totalScore);

      // Simple success feedback - just green checkmark
      setShowFeedback("success");
      setShowConfetti(true);
      setFeedbackMessage(""); // No text message, just visual feedback

      // Move to next level after showing feedback
      setTimeout(() => {
        setShowFeedback(null);
        setShowConfetti(false);

        if (currentLevel < LEVELS_TOTAL - 1) {
          setCurrentLevel((prev) => prev + 1);
          resetLevelTimer();
        } else {
          setGameComplete(true);
        }
      }, 1500); // Shorter delay since we only show checkmark
    },
    [currentLevel, calculateScore, resetLevelTimer, LEVELS_TOTAL, timeLeft]
  );

  // Handle level failure
  const handleLevelFailed = useCallback(
    (reason: string) => {
      setLives((prev) => prev - 1);

      if (lives <= 1) {
        setGameComplete(true);
        setFeedbackMessage(`💥 Game Over!\n\nFinal Score: ${totalScore.toLocaleString()} points`);
      } else {
        setShowFeedback("error");
        setFeedbackMessage(`❌ ${reason}\n\n💝 Lives remaining: ${lives - 1}\nTry again!`);

        setTimeout(() => {
          setShowFeedback(null);
          resetLevelTimer();
        }, 2500);
      }
    },
    [lives, resetLevelTimer, totalScore]
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

  // Calculate potential max score for progress display
  const getMaxPossibleScore = () => {
    let maxScore = 0;
    for (let i = 0; i < LEVELS_TOTAL; i++) {
      maxScore += SCORING.PERFECT.points + MAX_TIME_BONUS + ((i + 1) * LEVEL_BONUS_BASE);
    }
    return maxScore;
  };

  // If game is complete, show results
  if (gameComplete) {
    // Update user progress with new scoring system
    UserStorage.updateStepProgress("step3", totalScore, currentLevel >= LEVELS_TOTAL - 1);

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
        title="🥷 Fraction Ninja"
        subtitle="Master the art of precise fraction cutting!"
        currentQuestion={0}
        totalQuestions={LEVELS_TOTAL}
        score={0}
        maxScore={getMaxPossibleScore()}
        backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
        accentColor="blue"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              🥷 Welcome, Fraction Ninja! 
            </h2>
            
            <div className="relative w-48 h-48 mx-auto mb-6">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {/* Enhanced Ninja Character */}
                <svg
                  width="192"
                  height="192"
                  viewBox="0 0 192 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Ninja Body */}
                  <circle cx="96" cy="70" r="35" fill="#2D3748" />
                  <rect x="60" y="70" width="72" height="70" rx="8" fill="#2D3748" />
                  
                  {/* Headband */}
                  <rect x="61" y="65" width="70" height="12" rx="6" fill="#E53E3E" />
                  <path d="M131 71 L145 60 L140 76 Z" fill="#E53E3E" />
                  
                  {/* Eyes */}
                  <ellipse cx="80" cy="60" rx="8" ry="12" fill="white" />
                  <ellipse cx="112" cy="60" rx="8" ry="12" fill="white" />
                  <circle cx="80" cy="62" r="4" fill="#2D3748" />
                  <circle cx="112" cy="62" r="4" fill="#2D3748" />
                  
                  {/* Sword */}
                  <rect x="140" y="90" width="50" height="10" rx="3" fill="#C0C0C0" />
                  <rect x="135" y="88" width="15" height="14" rx="3" fill="#8B4513" />
                  <path d="M185 90 L200 75 L190 95 Z" fill="#4285F4" />
                  
                  {/* Arms */}
                  <rect x="35" y="85" width="30" height="12" rx="6" fill="#2D3748" />
                  <rect x="127" y="85" width="30" height="12" rx="6" fill="#2D3748" />
                  
                  {/* Legs */}
                  <rect x="70" y="135" width="15" height="40" rx="7" fill="#2D3748" />
                  <rect x="107" y="135" width="15" height="40" rx="7" fill="#2D3748" />
                  
                  {/* Feet */}
                  <ellipse cx="77" cy="178" rx="12" ry="6" fill="#1A202C" />
                  <ellipse cx="114" cy="178" rx="12" ry="6" fill="#1A202C" />
                </svg>
              </motion.div>
            </div>
          </div>

          <div className="mb-8 space-y-6">
            {/* How to Play */}
            <div className="bg-blue-50 p-6 rounded-xl text-left">
              <h3 className="font-bold text-blue-700 mb-4 text-xl">🎮 How to Play:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-none space-y-2 text-blue-800">
                  <li>🕹️ Move ninja: ← → Arrow keys or touch</li>
                  <li>⚔️ Cut line: Spacebar or tap</li>
                  <li>🎯 Be precise for maximum points</li>
                </ul>
                <ul className="list-none space-y-2 text-blue-800">
                  <li>⚡ Cut quickly for time bonus</li>
                  <li>💝 You have 3 lives</li>
                  <li>🏆 Complete all {LEVELS_TOTAL} levels!</li>
                </ul>
              </div>
            </div>

            {/* Scoring System */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
              <h3 className="font-bold text-orange-700 mb-4 text-xl">💰 Scoring System:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{SCORING.PERFECT.emoji} Perfect (95%+)</span>
                    <span className="font-bold text-green-600">{SCORING.PERFECT.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{SCORING.EXCELLENT.emoji} Excellent (85%+)</span>
                    <span className="font-bold text-blue-600">{SCORING.EXCELLENT.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{SCORING.GREAT.emoji} Great (70%+)</span>
                    <span className="font-bold text-purple-600">{SCORING.GREAT.points.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>⚡ Time Bonus</span>
                    <span className="font-bold text-yellow-600">Up to {MAX_TIME_BONUS.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🏆 Level Bonus</span>
                    <span className="font-bold text-indigo-600">{LEVEL_BONUS_BASE} × Level</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-bold">💎 Max Per Level</span>
                    <span className="font-bold text-2xl text-green-600">~2,500+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Preview */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-bold text-purple-700 mb-3 text-xl">⚔️ Challenges Ahead:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold">Precision Tests</div>
                  <div className="text-gray-600">Hit exact fractions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🚧</div>
                  <div className="font-semibold">Moving Obstacles</div>
                  <div className="text-gray-600">Time your cuts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🕵️</div>
                  <div className="font-semibold">Stealth Mode</div>
                  <div className="text-gray-600">No visual guides</div>
                </div>
              </div>
            </div>
          </div>

          <AnimatedButton
            onClick={startGame}
            color="blue"
            size="large"
            hoverEffect="bounce"
            icon={<Icon type="play" />}
            className="text-xl px-12 py-4"
          >
            🥷 Begin Ninja Training!
          </AnimatedButton>
        </motion.div>
      </GameLayout>
    );
  }

  // Main game view
  return (
    <GameLayout
      title="🥷 Fraction Ninja"
      subtitle={`Level ${currentLevel + 1}: ${GAME_LEVELS[currentLevel]?.name}`}
      currentQuestion={currentLevel}
      totalQuestions={LEVELS_TOTAL}
      score={totalScore}
      showConfetti={showConfetti}
      backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
      accentColor="blue"
    >
      <div className="max-w-4xl mx-auto">
        <GameStats currentStep="step3" />

        {/* Enhanced Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Lives */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">Lives</div>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: i < lives ? 1 : 0.7,
                    opacity: i < lives ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className={`w-8 h-8 ${
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
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">Time Left</div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                className={`w-6 h-6 ${
                  timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-blue-500"
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
                className={`font-bold text-2xl ${
                  timeLeft <= 10 ? "text-red-500" : "text-blue-600"
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Score</div>
            <div className="font-bold text-2xl text-purple-700">
              {totalScore.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Main Game Component */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative">
          {/* Success Feedback Overlay - Simple green checkmark */}
          {showFeedback === "success" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-green-400/20"
            >
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="bg-green-500 rounded-full p-8 shadow-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* Error Feedback Overlay */}
          {showFeedback === "error" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-red-400/20"
            >
              <div className="bg-red-500 p-6 rounded-xl max-w-sm text-center">
                <motion.div
                  animate={{ x: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
                <p className="text-white text-center font-medium whitespace-pre-line">
                  {feedbackMessage}
                </p>
              </div>
            </motion.div>
          )}
          
          <FractionCutterGame
            level={GAME_LEVELS[currentLevel]}
            onSuccess={handleLevelComplete}
            onFailure={handleLevelFailed}
            isPaused={isPaused || !!showFeedback}
            timeLeft={timeLeft}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <AnimatedButton
            onClick={() => setIsPaused(!isPaused)}
            color="purple"
            size="medium"
            hoverEffect="wobble"
            icon={<Icon type={isPaused ? "play" : "pause"} />}
          >
            {isPaused ? "Resume" : "Pause"}
          </AnimatedButton>

          <div className="text-center">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="font-bold text-lg text-blue-600">
              Level {currentLevel + 1} of {LEVELS_TOTAL}
            </div>
          </div>

          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="medium"
            hoverEffect="wobble"
            icon={<Icon type="home" />}
          >
            Exit Game
          </AnimatedButton>
        </div>
      </div>
    </GameLayout>
  );
};

export default Game3Page;