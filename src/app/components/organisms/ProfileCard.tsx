// src/app/components/organisms/ProfileCard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserStorage } from '@/app/utils/userStorage';
import AnimatedButton from '../molecules/AnimatedButton';
import ProgressBar from '../molecules/ProgressBar';
import { CuteStar, CuteHeart } from '../atoms/CuteShapes';

interface ProfileCardProps {
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onLogout }) => {
  const profile = UserStorage.getProfile();
  const progress = UserStorage.getProgress();

  if (!profile || !progress) return null;

  const totalProgress = (
    (progress.step1.completed ? 1 : 0) +
    (progress.step2.completed ? 1 : 0) +
    (progress.step3.completed ? 1 : 0)
  ) / 3 * 100;

  const getAchievementIcon = (achievement: string) => {
    switch (achievement) {
      case 'perfect_master':
        return <CuteStar size={24} color="#FFD700" />;
      case 'all_complete':
        return <CuteHeart size={24} color="#EC4899" />;
      case 'first_step':
        return <CuteStar size={24} color="#8B5CF6" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-pink-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Grade {profile.grade} • {profile.age} years old</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-purple-600">{progress.totalScore}</p>
          <p className="text-sm text-gray-600">Total Points</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-purple-600">{Math.round(totalProgress)}%</span>
        </div>
        <ProgressBar
          value={totalProgress}
          max={100}
          variant="gradient"
          color="purple"
          height={12}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-lg font-bold ${progress.step1.completed ? 'text-green-600' : 'text-gray-400'}`}>
            Step 1
          </div>
          <div className="text-sm text-gray-600">{progress.step1.bestScore} pts</div>
          {progress.step1.completed && <span className="text-green-500">✓</span>}
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${progress.step2.completed ? 'text-green-600' : 'text-gray-400'}`}>
            Step 2
          </div>
          <div className="text-sm text-gray-600">{progress.step2.bestScore} pts</div>
          {progress.step2.completed && <span className="text-green-500">✓</span>}
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${progress.step3.completed ? 'text-green-600' : 'text-gray-400'}`}>
            Step 3
          </div>
          <div className="text-sm text-gray-600">{progress.step3.bestScore} pts</div>
          {progress.step3.completed && <span className="text-green-500">✓</span>}
        </div>
      </div>

      {progress.achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Achievements</h3>
          <div className="flex gap-2">
            {progress.achievements.map((achievement) => (
              <div key={achievement} className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full">
                {getAchievementIcon(achievement)}
                <span className="text-sm capitalize">{achievement.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Last active: {new Date(progress.lastActive).toLocaleDateString()}
        </p>
        <AnimatedButton
          onClick={onLogout}
          color="blue"
          size="small"
          hoverEffect="wobble"
        >
          Logout
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default ProfileCard;