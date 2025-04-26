"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "../molecules/AnimatedButton";
import { CuteStar } from "../atoms/CuteShapes";
import CuteDecorationEffect from "../organisms/CuteDecorationEffect";

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
          <div className="absolute -top-6 -left-6">
            <CuteStar size={50} color="#FCD34D" />
          </div>
          <div className="absolute -top-6 -right-6">
            <CuteStar size={50} color="#FCD34D" />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-pink-600">
            Amazing Job!
          </h1>
          <div className="relative mb-8">
            <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto">
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#22C55E"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M70 100 L90 120 L130 80"
                fill="none"
                stroke="#22C55E"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-2xl font-bold mb-2 text-purple-700">
              Your Score:
            </p>
            <p className="text-4xl font-extrabold mb-4 text-pink-600">
              {score} / {totalQuestions}
            </p>

            <p className="text-gray-700 mb-6">
              {score >= Math.floor(totalQuestions * 0.8)
                ? "Fantastic! You're a fraction master!"
                : score >= Math.floor(totalQuestions * 0.6)
                ? "Great job! Keep practicing!"
                : "Good try! Let's practice more!"}
            </p>
          </motion.div>

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
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0114 0V5a1 1 0 112 0v2.101a9.005 9.005 0 00-2.092 12.09A1 1 0 0118 20H2a1 1 0 01-.707-1.707A9 9 0 014 4.102V3a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Play Again
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push("/menu")}
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
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </CuteDecorationEffect>
  );
};

export default GameResults;
