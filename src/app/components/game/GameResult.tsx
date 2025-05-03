// src/app/components/game/GameResult.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "../molecules/AnimatedButton";
import { CuteStar } from "../atoms/CuteShapes";
import CuteDecorationEffect from "../organisms/CuteDecorationEffect";
import { UserStorage } from "@/app/utils/userStorage"; // Add this import
import { usePageLoader } from "@/app/context/PageLoaderContext";

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onRestartGame: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({
  score,
  totalQuestions,
  onRestartGame,
}) => {
  const router = useRouter();
  const { startLoading } = usePageLoader();

  const progress = UserStorage.getProgress();
  const profile = UserStorage.getProfile();

  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedbackMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a fraction master!";
    if (percentage >= 75)
      return "Great job! You're really getting the hang of this!";
    if (percentage >= 60) return "Good work! Keep practicing!";
    return "Nice try! Let's practice more!";
  };

  return (
    <CuteDecorationEffect
      numItems={10}
      theme="mixed"
      className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100"
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md relative border-4 border-pink-200"
        >
          {/* Stars decoration */}
          <div className="absolute -top-6 -left-6">
            <CuteStar size={50} color="#FCD34D" />
          </div>
          <div className="absolute -top-6 -right-6">
            <CuteStar size={50} color="#FCD34D" />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-pink-600">
            Amazing Job{profile?.name ? `, ${profile.name}` : ""}!
          </h1>

          {/* Score display with animation */}
          <div className="relative mb-8">
            <motion.div
              className="text-6xl font-bold text-center mb-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span className="text-pink-600">{score}</span>
              <span className="text-purple-600">/</span>
              <span className="text-blue-600">{totalQuestions}</span>
            </motion.div>

            <motion.div
              className="text-2xl font-bold text-purple-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {percentage}%
            </motion.div>
          </div>

          <motion.p
            className="text-gray-700 mb-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {getFeedbackMessage()}
          </motion.p>

          {/* Progress summary if available */}
          {progress && (
            <motion.div
              className="mb-6 p-4 bg-purple-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h3 className="font-semibold text-purple-700 mb-2">
                Your Progress
              </h3>
              <div className="text-sm text-gray-600">
                <p>Total score: {progress.totalScore} points</p>
                <p>
                  Completed steps:{" "}
                  {
                    [
                      progress.step1.completed,
                      progress.step2.completed,
                      progress.step3.completed,
                    ].filter(Boolean).length
                  }
                  /3
                </p>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              onClick={onRestartGame}
              color="green"
              hoverEffect="bounce"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              Play Again
            </AnimatedButton>

            <AnimatedButton
              onClick={() => {
                startLoading("Loading Menu...");
                router.push("/menu");
              }}
              color="pink"
              hoverEffect="wobble"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Achievement notification */}
        {progress && score === totalQuestions && (
          <motion.div
            className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            🏆 Perfect Score Achievement Unlocked! 🏆
          </motion.div>
        )}
      </div>
    </CuteDecorationEffect>
  );
};

export default GameResults;
