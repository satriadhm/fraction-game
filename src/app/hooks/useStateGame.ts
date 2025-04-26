"use client";

import { useState, useCallback, useEffect } from "react";

interface UseGameStateProps {
  totalQuestions: number;
  autoAdvanceDelay?: number;
}

export function useGameState({
  totalQuestions,
  autoAdvanceDelay = 1500,
}: UseGameStateProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"success" | "error" | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Reset feedback and confetti effects after showing
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(null), autoAdvanceDelay);
      return () => clearTimeout(timer);
    }
  }, [showFeedback, autoAdvanceDelay]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) {
        setScore((prev) => prev + 1);
        setShowFeedback("success");
        setShowConfetti(true);
        playCorrectSound();
      } else {
        setShowFeedback("error");
      }

      // Auto-advance to next question after delay
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setGameComplete(true);
        }
      }, autoAdvanceDelay);
    },
    [currentQuestion, totalQuestions, autoAdvanceDelay]
  );

  const resetGame = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(null);
    setShowConfetti(false);
    setGameComplete(false);
  }, []);

  const playCorrectSound = () => {
    try {
      new Audio("/correct.mp3").play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return {
    currentQuestion,
    score,
    showFeedback,
    showConfetti,
    gameComplete,
    handleAnswer,
    resetGame,
  };
}
