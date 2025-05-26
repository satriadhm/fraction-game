// src/app/utils/gameHelpers.tsx

/**
 * Enhanced scoring system for Game 3 (Fraction Ninja)
 */

// Scoring tiers configuration
export const SCORING_TIERS = {
  PERFECT: { threshold: 95, points: 1500, emoji: "🎯", title: "PERFECT CUT!", color: "#10B981" },
  EXCELLENT: { threshold: 85, points: 1200, emoji: "🎖️", title: "EXCELLENT!", color: "#3B82F6" },
  GREAT: { threshold: 70, points: 1000, emoji: "⭐", title: "GREAT CUT!", color: "#8B5CF6" },
  GOOD: { threshold: 55, points: 800, emoji: "👍", title: "GOOD CUT!", color: "#F59E0B" },
  OK: { threshold: 40, points: 600, emoji: "👌", title: "NICE TRY!", color: "#EF4444" },
  MINIMUM: { threshold: 0, points: 400, emoji: "✅", title: "COMPLETED!", color: "#6B7280" }
} as const;

export type ScoringTier = keyof typeof SCORING_TIERS;

/**
 * Calculate accuracy score based on position difference
 * @param positionDifference Absolute difference between target and actual positions
 * @param threshold Maximum allowed difference for "good" accuracy
 * @returns Accuracy percentage from 0 to 100
 */
export const calculateAccuracyPercentage = (
  positionDifference: number,
  threshold: number = 5
): number => {
  // Perfect accuracy
  if (positionDifference === 0) return 100;
  
  // Excellent accuracy - very close
  if (positionDifference <= threshold * 0.3) return 95 + (5 * (1 - positionDifference / (threshold * 0.3)));
  
  // Great accuracy - within half threshold
  if (positionDifference <= threshold * 0.6) {
    const ratio = positionDifference / (threshold * 0.6);
    return 85 + (10 * (1 - ratio));
  }
  
  // Good accuracy - within threshold
  if (positionDifference <= threshold) {
    const ratio = positionDifference / threshold;
    return 70 + (15 * (1 - ratio));
  }
  
  // OK accuracy - within 1.5x threshold
  if (positionDifference <= threshold * 1.5) {
    const ratio = (positionDifference - threshold) / (threshold * 0.5);
    return 55 + (15 * (1 - ratio));
  }
  
  // Poor accuracy - within 2x threshold
  if (positionDifference <= threshold * 2) {
    const ratio = (positionDifference - threshold * 1.5) / (threshold * 0.5);
    return 40 + (15 * (1 - ratio));
  }
  
  // Very poor accuracy - beyond 2x threshold
  const maxDifference = threshold * 4; // Maximum difference we consider
  if (positionDifference >= maxDifference) return 0;
  
  const ratio = (positionDifference - threshold * 2) / (threshold * 2);
  return Math.max(0, 40 * (1 - ratio));
};

/**
 * Get scoring tier based on accuracy percentage
 * @param accuracyPercentage Accuracy from 0-100
 * @returns Scoring tier information
 */
export const getScoringTier = (accuracyPercentage: number) => {
  for (const [key, tier] of Object.entries(SCORING_TIERS)) {
    if (accuracyPercentage >= tier.threshold) {
      return { key: key as ScoringTier, ...tier };
    }
  }
  return { key: 'MINIMUM' as ScoringTier, ...SCORING_TIERS.MINIMUM };
};

/**
 * Calculate comprehensive score for Game 3
 * @param accuracyPercentage Accuracy from 0-100
 * @param timeRemaining Time left in seconds
 * @param currentLevel Current level (0-based)
 * @param maxTimeBonus Maximum possible time bonus
 * @returns Detailed score breakdown
 */
export const calculateNinjaScore = (
  accuracyPercentage: number,
  timeRemaining: number,
  currentLevel: number,
  maxTimeBonus: number = 750
) => {
  // Get accuracy tier
  const tier = getScoringTier(accuracyPercentage);
  
  // Base score from accuracy tier
  const baseScore = Math.round(tier.points);
  
  // Time bonus calculation (25 points per second, capped at maxTimeBonus)
  const timeBonus = Math.round(Math.min(timeRemaining * 25, maxTimeBonus));
  
  // Level bonus (200 points per level)
  const levelBonus = Math.round((currentLevel + 1) * 200);
  
  // Perfect cut bonus (additional bonus for perfect accuracy)
  const perfectBonus = Math.round(accuracyPercentage >= 99 ? 300 : accuracyPercentage >= 97 ? 150 : 0);
  
  // Combo bonus for consecutive perfect cuts (would need to be tracked externally)
  // This is a placeholder for future enhancement
  const comboBonus = 0;
  
  // Total score - all rounded
  const totalScore = Math.round(baseScore + timeBonus + levelBonus + perfectBonus + comboBonus);
  
  return {
    tier,
    baseScore,
    timeBonus,
    levelBonus,
    perfectBonus,
    comboBonus,
    totalScore: Math.round(totalScore),
    accuracy: Math.round(accuracyPercentage * 10) / 10, // Round to 1 decimal
    isPerfect: accuracyPercentage >= 95,
    isExcellent: accuracyPercentage >= 85,
  };
};

/**
 * Format time as MM:SS
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

/**
 * Format score with appropriate suffix (K, M)
 * @param score Numeric score
 * @returns Formatted score string
 */
export const formatScore = (score: number): string => {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`;
  } else if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`;
  }
  return score.toLocaleString();
};

/**
 * Calculate difficulty multiplier based on level
 * @param level Current level (0-based)
 * @param maxLevel Maximum level
 * @returns Difficulty multiplier for scoring
 */
export const getDifficultyMultiplier = (
  level: number,
  maxLevel: number = 10
): number => {
  // Difficulty increases from 1.0 to 1.5 as levels progress
  const safeLevel = Math.max(0, Math.min(level, maxLevel));
  return 1 + (safeLevel / maxLevel) * 0.5;
};

/**
 * Calculate time limit for a level with progressive difficulty
 * @param baseTime Base time in seconds
 * @param level Current level (0-based)
 * @param minTime Minimum time allowed
 * @returns Time limit in seconds
 */
export const calculateTimeLimit = (
  baseTime: number = 35,
  level: number = 0,
  minTime: number = 20
): number => {
  // Reduce time by 1.5 seconds per level, but not below minTime
  const calculatedTime = Math.max(minTime, baseTime - level * 1.5);
  return Math.round(calculatedTime);
};

/**
 * Generate encouragement message based on performance
 * @param tier Scoring tier achieved
 * @param isImprovement Whether this was an improvement
 * @returns Encouragement message
 */
export const getEncouragementMessage = (
  tier: ReturnType<typeof getScoringTier>,
  isImprovement: boolean = false
): string => {
  const messages = {
    PERFECT: [
      "Incredible precision! You're a true ninja master!",
      "Flawless execution! Your blade is sharp!",
      "Perfect cut! The fraction dojo bows to you!",
    ],
    EXCELLENT: [
      "Outstanding work! You're mastering the art!",
      "Excellent precision! Keep up the great work!",
      "Superb cutting technique! Almost perfect!",
    ],
    GREAT: [
      "Great job! Your skills are improving!",
      "Nice cut! You're getting the hang of this!",
      "Well done! Keep practicing those precise cuts!",
    ],
    GOOD: [
      "Good effort! You're on the right track!",
      "Nice try! Focus on precision for higher scores!",
      "Keep practicing! You're improving!",
    ],
    OK: [
      "Don't give up! Every ninja started somewhere!",
      "Keep trying! Precision comes with practice!",
      "Good attempt! Try to be more precise next time!",
    ],
    MINIMUM: [
      "Completed! Keep practicing to improve your accuracy!",
      "Nice persistence! Focus on hitting the exact fraction!",
      "Don't worry, even master ninjas had to practice!",
    ],
  };

  const tierMessages = messages[tier.key];
  let message = tierMessages[Math.floor(Math.random() * tierMessages.length)];
  
  if (isImprovement) {
    message += " That's your new personal best!";
  }
  
  return message;
};

/**
 * Calculate expected score range for a level
 * @param level Current level (0-based)
 * @returns Object with min and max expected scores
 */
export const getExpectedScoreRange = (level: number) => {
  const levelBonus = (level + 1) * 200;
  
  return {
    minimum: SCORING_TIERS.MINIMUM.points + levelBonus,
    good: SCORING_TIERS.GOOD.points + 200 + levelBonus, // with some time bonus
    excellent: SCORING_TIERS.EXCELLENT.points + 400 + levelBonus, // with good time bonus
    perfect: SCORING_TIERS.PERFECT.points + 750 + levelBonus + 300, // max time + perfect bonus
  };
};

/**
 * Determine if a score qualifies for a new achievement
 * @param score Current score
 * @param bestScore Previous best score
 * @param gameType Type of game (for future expansion)
 * @returns Achievement information or null
 */
export const checkScoreAchievement = (
  score: number,
  bestScore: number,
  gameType: 'step1' | 'step2' | 'step3' = 'step3'
) => {
  // Only check if this is a new personal best
  if (score <= bestScore) return null;
  
  const thresholds = {
    step3: [
      { score: 25000, title: "Ninja Legend", emoji: "👑", description: "Scored 25,000+ points!" },
      { score: 20000, title: "Blade Master", emoji: "⚔️", description: "Scored 20,000+ points!" },
      { score: 15000, title: "Ninja Master", emoji: "🥷", description: "Scored 15,000+ points!" },
      { score: 10000, title: "Skilled Ninja", emoji: "🗡️", description: "Scored 10,000+ points!" },
      { score: 5000, title: "Ninja Apprentice", emoji: "⭐", description: "Scored 5,000+ points!" },
    ],
    step1: [
      { score: 15, title: "Shape Master", emoji: "🍕", description: "Perfect score in shapes!" },
      { score: 12, title: "Shape Expert", emoji: "⭐", description: "Excellent shape skills!" },
    ],
    step2: [
      { score: 15, title: "Equivalent Master", emoji: "⚖️", description: "Perfect equivalent fractions!" },
      { score: 12, title: "Equivalent Expert", emoji: "📊", description: "Great equivalent skills!" },
    ],
  };
  
  const gameThresholds = thresholds[gameType];
  
  for (const threshold of gameThresholds) {
    if (score >= threshold.score && bestScore < threshold.score) {
      return threshold;
    }
  }
  
  return null;
};