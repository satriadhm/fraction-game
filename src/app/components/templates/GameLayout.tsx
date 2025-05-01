import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Typography from "../atoms/Typography";
import AnimatedButton from "../molecules/AnimatedButton";
import GameProgressTracker from "../organisms/GameProgressTracker";
import ConfettiEffect from "../organisms/ConfettiEffect";
import CuteDecorationWrapper from "../organisms/CuteDecorationEffect";
import FeedbackPopup from "../molecules/FeedbackPopup";
import Icon from "../atoms/Icon";

// Types for the game layout
interface GameLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore?: number;
  showConfetti?: boolean;
  showFeedback?: "success" | "error" | "warning" | "info" | null;
  feedbackMessage?: string;
  onFeedbackComplete?: () => void;
  showBackButton?: boolean;
  backButtonPath?: string;
  timeRemaining?: number;
  maxTime?: number;
  showTimer?: boolean;
  decorationTheme?: "random" | "hearts" | "stars" | "food" | "mixed";
  decorationCount?: number;
  backgroundColor?: string;
  accentColor?: "pink" | "blue" | "green" | "purple" | "yellow" | "orange";
  className?: string;
}

/**
 * A layout template for game screens with progress tracking, feedback,
 * confetti effects, and decoration elements
 */
const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  subtitle,
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  showConfetti = false,
  showFeedback = null,
  feedbackMessage,
  onFeedbackComplete,
  showBackButton = true,
  backButtonPath = "/menu",
  timeRemaining,
  maxTime,
  showTimer = false,
  decorationTheme = "mixed",
  decorationCount = 6,
  backgroundColor = "bg-gradient-to-br from-blue-50 to-blue-100",
  accentColor = "pink",
  className = "",
}) => {
  const router = useRouter();

  // Local state to control confetti rendering
  const [displayConfetti, setDisplayConfetti] = useState(false);

  // Control confetti display with proper useEffect dependencies
  useEffect(() => {
    setDisplayConfetti(showConfetti);
  }, [showConfetti]);

  // Map feedback type to FeedbackPopup type
  const feedbackTypeMap = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  } as const;

  return (
    <CuteDecorationWrapper
      numItems={decorationCount}
      theme={decorationTheme}
      className="min-h-screen overflow-hidden"
    >
      <div
        className={`relative min-h-screen ${backgroundColor} p-4 sm:p-8 ${className}`}
      >
        {/* Show confetti effect when triggered */}
        <ConfettiEffect
          show={displayConfetti}
          duration={3}
          pieces={50}
          origin="top"
        />

        {/* Game header with title and subtitle */}
        <div className="max-w-4xl mx-auto mb-6">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <Typography
              variant="h1"
              color="primary"
              className={`text-2xl sm:text-3xl font-bold text-${accentColor}-600`}
              gutterBottom
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="subtitle1"
                color="secondary"
                className="text-sm sm:text-base"
              >
                {subtitle}
              </Typography>
            )}
          </motion.div>

          {/* Game progress tracker */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GameProgressTracker
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              score={score}
              maxScore={maxScore}
              timeRemaining={timeRemaining}
              maxTime={maxTime}
              showTimer={showTimer}
              progressVariant="candy"
              progressColor={accentColor}
            />
          </motion.div>
        </div>

        {/* Main content area */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto relative"
        >
          {children}
        </motion.div>

        {/* Feedback popup */}
        {showFeedback && (
          <FeedbackPopup
            type={feedbackTypeMap[showFeedback]}
            message={feedbackMessage}
            show={!!showFeedback}
            onAnimationComplete={onFeedbackComplete}
            position="center"
            backdrop={true}
          />
        )}

        {/* Back button */}
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <AnimatedButton
              onClick={() => router.push(backButtonPath)}
              color="blue"
              size="small"
              hoverEffect="wobble"
              icon={<Icon type="back" />}
              className="mx-auto"
            >
              Back
            </AnimatedButton>
          </motion.div>
        )}

        {/* Decorative footer element */}
        <motion.div
          className={`w-full max-w-md h-2 bg-gradient-to-r from-transparent via-${accentColor}-400 to-transparent rounded-full mt-8 mx-auto`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </CuteDecorationWrapper>
  );
};

export default GameLayout;
