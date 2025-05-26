// src/app/components/game/GameResult.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "../molecules/AnimatedButton";
import { CuteStar } from "../atoms/CuteShapes";
import CuteDecorationEffect from "../organisms/CuteDecorationEffect";
import { UserStorage } from "@/app/utils/userStorage";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import { formatScore } from "@/app/utils/gameHelpers";

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onRestartGame: () => void;
  gameType?: 'step1' | 'step2' | 'step3';
  additionalStats?: {
    perfectCuts?: number;
    averageAccuracy?: number;
    totalTime?: number;
    bestSingleLevel?: number;
  };
}

const GameResults: React.FC<GameResultsProps> = ({
  score,
  totalQuestions,
  onRestartGame,
  gameType = 'step3',
  additionalStats,
}) => {
  const router = useRouter();
  const { startLoading } = usePageLoader();

  const progress = UserStorage.getProgress();
  const profile = UserStorage.getProfile();

  // Calculate performance rating based on game type and score
  const getPerformanceRating = () => {
    if (gameType === 'step3') {
      // Game 3 (Ninja) scoring thresholds
      if (score >= 20000) return { rating: "LEGENDARY", emoji: "👑", color: "text-yellow-500", bgColor: "bg-yellow-50" };
      if (score >= 15000) return { rating: "MASTER", emoji: "🥷", color: "text-purple-500", bgColor: "bg-purple-50" };
      if (score >= 10000) return { rating: "EXPERT", emoji: "⚔️", color: "text-blue-500", bgColor: "bg-blue-50" };
      if (score >= 7500) return { rating: "SKILLED", emoji: "🗡️", color: "text-green-500", bgColor: "bg-green-50" };
      if (score >= 5000) return { rating: "GOOD", emoji: "⭐", color: "text-indigo-500", bgColor: "bg-indigo-50" };
      return { rating: "APPRENTICE", emoji: "🎯", color: "text-gray-500", bgColor: "bg-gray-50" };
    } else {
      // Game 1 & 2 scoring (out of total questions)
      const percentage = (score / totalQuestions) * 100;
      if (percentage >= 90) return { rating: "PERFECT", emoji: "🏆", color: "text-yellow-500", bgColor: "bg-yellow-50" };
      if (percentage >= 80) return { rating: "EXCELLENT", emoji: "⭐", color: "text-purple-500", bgColor: "bg-purple-50" };
      if (percentage >= 70) return { rating: "GREAT", emoji: "👍", color: "text-blue-500", bgColor: "bg-blue-50" };
      if (percentage >= 60) return { rating: "GOOD", emoji: "👌", color: "text-green-500", bgColor: "bg-green-50" };
      return { rating: "KEEP TRYING", emoji: "💪", color: "text-gray-500", bgColor: "bg-gray-50" };
    }
  };

  const performanceRating = getPerformanceRating();

  // Get motivational message
  const getMotivationalMessage = () => {
    const messages = {
      step1: {
        high: "You've mastered fraction shapes! Pizza slices bow to your expertise! 🍕",
        medium: "Great work with shapes! You're becoming a fraction artist! 🎨",
        low: "Keep practicing with shapes - every expert started here! 📚"
      },
      step2: {
        high: "Equivalent fraction master! You see the connections everywhere! ⚖️",
        medium: "Excellent equivalent fraction skills! You're connecting the dots! 🔗",
        low: "Equivalent fractions take practice - you're on the right path! 🌟"
      },
      step3: {
        high: "🥷 NINJA LEGEND! Your fraction-cutting skills are unmatched! The dojo honors you!",
        medium: "🗡️ Impressive ninja skills! You're mastering the art of precision!",
        low: "🎯 Every ninja started as an apprentice. Keep training your precision!"
      }
    };

    const gameMessages = messages[gameType];
    if (gameType === 'step3') {
      if (score >= 15000) return gameMessages.high;
      if (score >= 7500) return gameMessages.medium;
      return gameMessages.low;
    } else {
      const percentage = (score / totalQuestions) * 100;
      if (percentage >= 80) return gameMessages.high;
      if (percentage >= 60) return gameMessages.medium;
      return gameMessages.low;
    }
  };

  // Check if this is a new personal best
  const isNewRecord = progress && gameType && progress[gameType].bestScore < score;

  return (
    <CuteDecorationEffect
      numItems={15}
      theme="mixed"
      className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-2xl relative border-4 border-pink-200"
        >
          {/* New Record Banner */}
          {isNewRecord && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg"
            >
              🎉 NEW PERSONAL BEST! 🎉
            </motion.div>
          )}

          {/* Stars decoration */}
          <div className="absolute -top-8 -left-8">
            <CuteStar size={60} color="#FCD34D" />
          </div>
          <div className="absolute -top-8 -right-8">
            <CuteStar size={60} color="#FCD34D" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-2 text-pink-600">
              🎉 Congratulations{profile?.name ? `, ${profile.name}` : ""}! 🎉
            </h1>
            
            {/* Performance Rating */}
            <div className={`inline-block px-6 py-3 rounded-full mb-6 ${performanceRating.bgColor} border-2 border-opacity-20`}>
              <span className={`text-2xl font-bold ${performanceRating.color}`}>
                {performanceRating.emoji} {performanceRating.rating}
              </span>
            </div>
          </motion.div>

          {/* Score Display */}
          <div className="mb-8">
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              {gameType === 'step3' ? (
                // Game 3 - Show total score prominently
                <div>
                  <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-2">
                    {formatScore(score)}
                  </div>
                  <div className="text-2xl text-gray-600">
                    Total Points
                  </div>
                </div>
              ) : (
                // Game 1 & 2 - Show traditional score/total format
                <div>
                  <div className="text-6xl font-bold text-center mb-2">
                    <span className="text-pink-600">{score}</span>
                    <span className="text-purple-600">/</span>
                    <span className="text-blue-600">{totalQuestions}</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-700">
                    {Math.round((score / totalQuestions) * 100)}%
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Additional Stats for Game 3 */}
          {gameType === 'step3' && additionalStats && (
            <motion.div
              className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-bold text-blue-700 mb-3">🥷 Ninja Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {additionalStats.perfectCuts !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{additionalStats.perfectCuts}</div>
                    <div className="text-gray-600">Perfect Cuts</div>
                  </div>
                )}
                {additionalStats.averageAccuracy !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(additionalStats.averageAccuracy)}%</div>
                    <div className="text-gray-600">Avg Accuracy</div>
                  </div>
                )}
                {additionalStats.totalTime !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(additionalStats.totalTime)}s</div>
                    <div className="text-gray-600">Total Time</div>
                  </div>
                )}
                {additionalStats.bestSingleLevel !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{formatScore(additionalStats.bestSingleLevel)}</div>
                    <div className="text-gray-600">Best Level</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Motivational Message */}
          <motion.p
            className="text-lg text-gray-700 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {getMotivationalMessage()}
          </motion.p>

          {/* Progress summary if available */}
          {progress && (
            <motion.div
              className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="font-semibold text-purple-700 mb-3">📊 Your Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatScore(progress.totalScore)}
                  </div>
                  <div className="text-gray-600">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {[progress.step1.completed, progress.step2.completed, progress.step3.completed].filter(Boolean).length}/3
                  </div>
                  <div className="text-gray-600">Steps Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {progress.achievements.length}
                  </div>
                  <div className="text-gray-600">Achievements</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              onClick={onRestartGame}
              color="green"
              size="large"
              hoverEffect="bounce"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              {gameType === 'step3' ? '🥷 Train Again' : '🎮 Play Again'}
            </AnimatedButton>

            <AnimatedButton
              onClick={() => {
                startLoading("Loading Menu...");
                router.push("/menu");
              }}
              color="pink"
              size="large"
              hoverEffect="wobble"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              🏠 Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Achievement notification for exceptional scores */}
        {(gameType === 'step3' && score >= 20000) || (gameType !== 'step3' && score === totalQuestions) ? (
          <motion.div
            className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl text-xl"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.8, type: "spring" }}
          >
            {gameType === 'step3' ? 
              "🏆 LEGENDARY NINJA ACHIEVEMENT UNLOCKED! 🏆" : 
              "🏆 PERFECT SCORE ACHIEVEMENT UNLOCKED! 🏆"
            }
          </motion.div>
        ) : null}
      </div>
    </CuteDecorationEffect>
  );
};

export default GameResults;