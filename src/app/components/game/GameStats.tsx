// src/app/components/organisms/GameStats.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserStorage } from '@/app/utils/userStorage';

interface GameStatsProps {
  currentStep: 'step1' | 'step2' | 'step3';
}

const GameStats: React.FC<GameStatsProps> = ({ currentStep }) => {
  const progress = UserStorage.getProgress();
  if (!progress) return null;

  const stepData = progress[currentStep];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-90 rounded-xl p-4 mb-4 shadow-md"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-purple-700">Your Stats</h3>
          <p className="text-sm text-gray-600">
            Best Score: <span className="font-bold">{stepData.bestScore}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Attempts: <span className="font-bold">{stepData.attempts}</span>
          </p>
          {stepData.completed && (
            <span className="text-green-600 font-bold">✓ Completed</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GameStats;