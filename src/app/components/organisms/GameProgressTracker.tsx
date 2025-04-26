import React from 'react';
import Typography from '../atoms/Typography';
import ProgressBar from '../molecules/ProgressBar';

interface GameProgressTrackerProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore?: number;
  timeRemaining?: number;
  maxTime?: number;
  showTimer?: boolean;
  progressVariant?: 'standard' | 'gradient' | 'candy' | 'segments';
  progressColor?: 'pink' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow';
  className?: string;
  isCompact?: boolean;
}

/**
 * A component to track and display game progress, including current question, score, and optional timer
 */
const GameProgressTracker: React.FC<GameProgressTrackerProps> = ({
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  timeRemaining,
  maxTime,
  showTimer = false,
  progressVariant = 'candy',
  progressColor = 'pink',
  className = '',
  isCompact = false
}) => {
  // Format time remaining in MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate score percentage if maxScore is provided
  const scorePercentage = maxScore ? (score / maxScore) * 100 : null;

  return (
    <div className={`${className} w-full`}>
      {isCompact ? (
        // Compact view - everything in one line
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <Typography variant="body2" className="text-sm font-medium text-gray-600">
              Q{currentQuestion + 1}/{totalQuestions}
            </Typography>
            
            <Typography variant="body2" className="text-sm font-medium text-gray-600">
              Score: {score}{maxScore ? `/${maxScore}` : ''}
            </Typography>
            
            {showTimer && timeRemaining !== undefined && (
              <Typography 
                variant="body2" 
                className={`text-sm font-medium ${timeRemaining < 10 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`}
              >
                Time: {formatTime(timeRemaining)}
              </Typography>
            )}
          </div>
          
          <div className="w-1/2">
            <ProgressBar 
              value={currentQuestion + 1} 
              max={totalQuestions}
              variant={progressVariant}
              color={progressColor}
              height={8}
            />
          </div>
        </div>
      ) : (
        // Expanded view - more detailed
        <>
          <div className="flex justify-between items-center mb-1">
            <Typography variant="body2" className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1}/{totalQuestions}
            </Typography>
            
            <Typography variant="body2" className="text-sm font-medium text-gray-600">
              Score: {score}{maxScore ? `/${maxScore}` : ''}
              {scorePercentage !== null && ` (${Math.round(scorePercentage)}%)`}
            </Typography>
          </div>
          
          <ProgressBar 
            value={currentQuestion + 1} 
            max={totalQuestions}
            variant={progressVariant}
            color={progressColor}
            height={8}
            className="mb-2"
          />
          
          {showTimer && timeRemaining !== undefined && maxTime && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <Typography 
                  variant="caption" 
                  className={`text-xs font-medium ${timeRemaining < 10 ? 'text-red-600' : 'text-gray-600'}`}
                >
                  Time Remaining: {formatTime(timeRemaining)}
                </Typography>
              </div>
              
              <ProgressBar 
                value={timeRemaining} 
                max={maxTime}
                variant="standard"
                color={timeRemaining < maxTime * 0.2 ? 'red' : 'green'}
                height={4}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameProgressTracker;