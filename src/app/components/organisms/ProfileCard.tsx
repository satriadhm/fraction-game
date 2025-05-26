// src/app/components/organisms/ProfileCard.tsx
"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { UserStorage } from "@/app/utils/userStorage";
import AnimatedButton from "../molecules/AnimatedButton";
import ProgressBar from "../molecules/ProgressBar";
import { CuteStar } from "../atoms/CuteShapes";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import { formatScore } from "@/app/utils/gameHelpers";

interface ProfileCardProps {
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onLogout }) => {
  const { startLoading } = usePageLoader();
  
  interface Profile {
    name: string;
    grade: string;
    age: number;
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  
  interface Progress {
    step1: { 
      completed: boolean; 
      bestScore: number; 
      attempts: number;
      averageScore?: number;
      perfectCuts?: number;
    };
    step2: { 
      completed: boolean; 
      bestScore: number; 
      attempts: number;
      averageScore?: number;
      perfectCuts?: number;
    };
    step3: { 
      completed: boolean; 
      bestScore: number; 
      attempts: number;
      averageScore?: number;
      perfectCuts?: number;
    };
    totalScore: number;
    achievements: string[];
    lastActive: string;
    highestSingleScore?: number;
    totalPerfectCuts?: number;
    totalPlayTime?: number;
  }

  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLogout = () => {
    startLoading("Logging out...");
    onLogout();
  };

  useEffect(() => {
    const userProfile = UserStorage.getProfile();
    const userProgress = UserStorage.getProgress();

    if (userProfile && userProfile.grade) {
      setProfile({
        name: userProfile.name,
        grade: userProfile.grade,
        age: userProfile.age ?? 0,
      });
    } else {
      setProfile(null);
    }

    setProgress(userProgress);
    setIsLoading(false);
  }, []);

  // Get step performance rating
  const getStepRating = (step: 'step1' | 'step2' | 'step3', stepData: Progress["step1"]) => {
    if (!stepData.completed) return { rating: "Not Started", color: "text-gray-500" };
    
    if (step === 'step3') {
      // Game 3 (Ninja) ratings based on best score
      if (stepData.bestScore >= 20000) return { rating: "LEGENDARY", color: "text-yellow-600" };
      if (stepData.bestScore >= 15000) return { rating: "MASTER", color: "text-purple-600" };
      if (stepData.bestScore >= 10000) return { rating: "EXPERT", color: "text-blue-600" };
      if (stepData.bestScore >= 7500) return { rating: "SKILLED", color: "text-green-600" };
      if (stepData.bestScore >= 5000) return { rating: "GOOD", color: "text-indigo-600" };
      return { rating: "APPRENTICE", color: "text-gray-600" };
    } else {
      // Game 1 & 2 ratings (likely out of smaller numbers)
      if (stepData.bestScore >= 12) return { rating: "PERFECT", color: "text-yellow-600" };
      if (stepData.bestScore >= 10) return { rating: "EXCELLENT", color: "text-green-600" };
      if (stepData.bestScore >= 8) return { rating: "GREAT", color: "text-blue-600" };
      if (stepData.bestScore >= 6) return { rating: "GOOD", color: "text-purple-600" };
      return { rating: "LEARNING", color: "text-gray-600" };
    }
  };

  // Get overall player level based on total score
  const getPlayerLevel = (totalScore: number) => {
    if (totalScore >= 50000) return { level: "GRAND MASTER", emoji: "👑", color: "text-yellow-600" };
    if (totalScore >= 30000) return { level: "MASTER", emoji: "🏆", color: "text-purple-600" };
    if (totalScore >= 20000) return { level: "EXPERT", emoji: "⭐", color: "text-blue-600" };
    if (totalScore >= 10000) return { level: "SKILLED", emoji: "🎯", color: "text-green-600" };
    if (totalScore >= 5000) return { level: "LEARNER", emoji: "📚", color: "text-indigo-600" };
    return { level: "BEGINNER", emoji: "🌱", color: "text-gray-600" };
  };

  const getAchievementIcon = (achievement: string) => {
    const iconMap: Record<string, JSX.Element> = {
      master_graduate: <span className="text-xl">🎓</span>,
      shape_master: <span className="text-xl">🍕</span>,
      equivalent_expert: <span className="text-xl">⚖️</span>,
      ninja_master: <span className="text-xl">🥷</span>,
      ninja_legend: <span className="text-xl">👑</span>,
      blade_master: <span className="text-xl">⚔️</span>,
      score_legend: <span className="text-xl">💎</span>,
      score_master: <span className="text-xl">🏆</span>,
      precision_legend: <span className="text-xl">🎯</span>,
      precision_master: <span className="text-xl">🏹</span>,
      consistent_champion: <span className="text-xl">📈</span>,
      dedicated_learner: <span className="text-xl">📚</span>,
    };

    return iconMap[achievement] || <CuteStar size={20} color="#FFD700" />;
  };

  // Show loading placeholder during SSR and initial load
  if (isLoading || !profile || !progress) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-pink-100">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="ml-4">
                <div className="h-8 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  const totalProgress = (
    ((progress.step1.completed ? 1 : 0) +
      (progress.step2.completed ? 1 : 0) +
      (progress.step3.completed ? 1 : 0)) / 3
  ) * 100;

  const playerLevel = getPlayerLevel(progress.totalScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-pink-100"
    >
      {/* Header with player info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            {/* Player level badge */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <span className="text-xl">{playerLevel.emoji}</span>
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">Grade {profile.grade} • {profile.age} years old</p>
            <p className={`text-sm font-semibold ${playerLevel.color}`}>
              {playerLevel.level}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-purple-600">
            {formatScore(progress.totalScore)}
          </div>
          <p className="text-sm text-gray-600">Total Points</p>
          {progress.highestSingleScore && (
            <p className="text-xs text-gray-500">
              Best: {formatScore(progress.highestSingleScore)}
            </p>
          )}
        </div>
      </div>

      {/* Overall Progress */}
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

      {/* Step Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Step 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-blue-700">Step 1</span>
            {progress.step1.completed && <span className="text-green-500 text-xl">✓</span>}
          </div>
          <p className="text-xs text-blue-600 mb-2">Fraction of Shape</p>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">
              {progress.step1.bestScore}
            </div>
            <div className="text-xs text-gray-600">
              {getStepRating('step1', progress.step1).rating}
            </div>
            <div className="text-xs text-gray-500">
              {progress.step1.attempts} attempts
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-pink-700">Step 2</span>
            {progress.step2.completed && <span className="text-green-500 text-xl">✓</span>}
          </div>
          <p className="text-xs text-pink-600 mb-2">Equivalent Fraction</p>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-800">
              {progress.step2.bestScore}
            </div>
            <div className="text-xs text-gray-600">
              {getStepRating('step2', progress.step2).rating}
            </div>
            <div className="text-xs text-gray-500">
              {progress.step2.attempts} attempts
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-indigo-700">Step 3</span>
            {progress.step3.completed && <span className="text-green-500 text-xl">✓</span>}
          </div>
          <p className="text-xs text-indigo-600 mb-2">Fraction Ninja</p>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-800">
              {formatScore(progress.step3.bestScore)}
            </div>
            <div className={`text-xs font-semibold ${getStepRating('step3', progress.step3).color}`}>
              {getStepRating('step3', progress.step3).rating}
            </div>
            <div className="text-xs text-gray-500">
              {progress.step3.attempts} attempts
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      {(progress.totalPerfectCuts || progress.totalPlayTime) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <h3 className="font-bold text-orange-700 mb-2">🏆 Special Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {progress.totalPerfectCuts && (
              <div>
                <div className="text-xl font-bold text-green-600">{progress.totalPerfectCuts}</div>
                <div className="text-gray-600">Perfect Cuts</div>
              </div>
            )}
            {progress.totalPlayTime && (
              <div>
                <div className="text-xl font-bold text-blue-600">{Math.round(progress.totalPlayTime / 60)}m</div>
                <div className="text-gray-600">Play Time</div>
              </div>
            )}
            <div>
              <div className="text-xl font-bold text-purple-600">
                {progress.step1.attempts + progress.step2.attempts + progress.step3.attempts}
              </div>
              <div className="text-gray-600">Total Games</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-600">
                {Math.round(totalProgress)}%
              </div>
              <div className="text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      {progress.achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">🏅</span>
            Achievements ({progress.achievements.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.achievements.slice(0, 6).map((achievement) => (
              <div
                key={achievement}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-2 rounded-full border-2 border-indigo-300 text-sm shadow-sm"
                title={achievement.replace(/_/g, ' ').toUpperCase()}
              >
                {getAchievementIcon(achievement)}
                <span className="font-bold text-indigo-800">
                  {achievement.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
            {progress.achievements.length > 6 && (
              <div className="flex items-center gap-1 bg-gray-200 px-3 py-2 rounded-full text-sm font-semibold text-gray-800 border border-gray-300">
                +{progress.achievements.length - 6} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Last active: {new Date(progress.lastActive).toLocaleDateString()}
        </p>
        <AnimatedButton
          onClick={handleLogout}
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