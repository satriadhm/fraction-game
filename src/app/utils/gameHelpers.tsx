// src/app/utils/gameHelpers.tsx

/**
 * Calculate accuracy score based on position difference
 * @param positionDifference Absolute difference between target and actual positions
 * @param threshold Maximum allowed difference
 * @returns Accuracy score from 0 to 1 (will be converted to percentage)
 */
export const calculateAccuracyScore = (
  positionDifference: number,
  threshold: number
): number => {
  // If position difference is 0, accuracy is perfect
  if (positionDifference === 0) return 1;

  // If within threshold, scale from 1 to 0.6 based on distance
  if (positionDifference <= threshold) {
    // Linear interpolation from 1 (at 0 difference) to 0.6 (at threshold)
    return 1 - (positionDifference / threshold) * 0.4;
  }

  // If outside threshold, continue degrading but more slowly
  // From 0.6 at threshold to 0 at 2*threshold
  const beyondThreshold = positionDifference - threshold;
  const degradationRange = threshold; // Same range as within threshold

  if (beyondThreshold < degradationRange) {
    return 0.6 - (beyondThreshold / degradationRange) * 0.6;
  }

  // If very far off (more than 2x threshold), return 0
  return 0;
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
 * Calculate the score based on accuracy and time remaining
 * @param accuracy Accuracy from 0-1
 * @param timeRemaining Time left in seconds
 * @param baseScore Base score value
 * @param timeWeight Weight for time component (0-1)
 * @param accuracyWeight Weight for accuracy component (0-1)
 * @returns Calculated score components and total
 */
export const calculateScore = (
  accuracy: number,
  timeRemaining: number,
  baseScore: number = 100,
  timeWeight: number = 0.4,
  accuracyWeight: number = 0.6
): { total: number; accuracyComponent: number; timeComponent: number } => {
  // Ensure accuracy is between 0 and 1
  const clampedAccuracy = Math.max(0, Math.min(1, accuracy));

  // Ensure non-negative time remaining
  const safeTimeRemaining = Math.max(0, timeRemaining);

  // Ensure weights sum to 1
  const totalWeight = timeWeight + accuracyWeight;
  const normalizedTimeWeight = timeWeight / totalWeight;
  const normalizedAccuracyWeight = accuracyWeight / totalWeight;

  // Calculate accuracy component - more weight on accuracy
  const accuracyComponent =
    clampedAccuracy * baseScore * normalizedAccuracyWeight;

  // Calculate time component (normalized to 0-1 based on max time of 30 seconds)
  const maxTime = 30; // Maximum expected time in seconds
  const normalizedTime = Math.min(safeTimeRemaining / maxTime, 1);
  const timeComponent = normalizedTime * baseScore * normalizedTimeWeight;

  // Round all values to avoid floating point issues
  const total = Math.round(accuracyComponent + timeComponent);
  const roundedAccuracyComponent = Math.round(accuracyComponent);
  const roundedTimeComponent = Math.round(timeComponent);

  return {
    total,
    accuracyComponent: roundedAccuracyComponent,
    timeComponent: roundedTimeComponent,
  };
};

/**
 * Calculate difficulty multiplier based on level
 * @param level Current level (0-based)
 * @param maxLevel Maximum level
 * @returns Difficulty multiplier
 */
export const getDifficultyMultiplier = (
  level: number,
  maxLevel: number = 10
): number => {
  // Difficulty increases from 1.0 to 2.0 as levels progress
  // Ensure level is within bounds
  const safeLevel = Math.max(0, Math.min(level, maxLevel));
  return 1 + safeLevel / maxLevel;
};

/**
 * Calculate time limit for a level
 * @param baseTime Base time in seconds
 * @param level Current level (0-based)
 * @param minTime Minimum time allowed
 * @returns Time limit in seconds
 */
export const calculateTimeLimit = (
  baseTime: number = 30,
  level: number = 0,
  minTime: number = 15
): number => {
  // Reduce time by 2 seconds per level, but not below minTime
  const calculatedTime = Math.max(minTime, baseTime - level * 2);
  return Math.round(calculatedTime); // Return whole seconds
};
