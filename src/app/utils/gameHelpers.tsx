// src/app/step3/game3/utils/gameHelpers.ts

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

  // If position difference is exactly at the threshold, score is 0.6 (60%)
  // If position difference is 0, score is 1 (100%)
  // Linear scale between these values
  const accuracyScore = Math.max(0, 1 - (positionDifference / threshold) * 0.4);

  return accuracyScore;
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
