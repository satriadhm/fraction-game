"use client";

import { useState, useCallback, useEffect, useRef } from "react";

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

  // Use refs to prevent stale closures in useEffect cleanup functions
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const confettiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset feedback and confetti effects after showing
  useEffect(() => {
    // Clear any existing timers
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }

    if (showFeedback) {
      feedbackTimerRef.current = setTimeout(() => {
        setShowFeedback(null);
        feedbackTimerRef.current = null;
      }, autoAdvanceDelay);
    }

    // Cleanup function to clear timers
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
      }
    };
  }, [showFeedback, autoAdvanceDelay]);

  // Handle confetti display separately
  useEffect(() => {
    // Clear any existing timers
    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current);
      confettiTimerRef.current = null;
    }

    if (showConfetti) {
      confettiTimerRef.current = setTimeout(() => {
        setShowConfetti(false);
        confettiTimerRef.current = null;
      }, 2000); // Duration for confetti display
    }

    // Cleanup function to clear timers
    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = null;
      }
    };
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

      // Clear any existing advance timers
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }

      // Auto-advance to next question after delay
      advanceTimerRef.current = setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setGameComplete(true);
        }
        advanceTimerRef.current = null;
      }, autoAdvanceDelay);
    },
    [currentQuestion, totalQuestions, autoAdvanceDelay]
  );

  const resetGame = useCallback(() => {
    // Clear all timers
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current);
      confettiTimerRef.current = null;
    }
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }

    // Reset state
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(null);
    setShowConfetti(false);
    setGameComplete(false);
  }, []);

  // Cleanup all timers when component unmounts
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const playCorrectSound = () => {
    try {
      new Audio("/correct.mp3").play().catch((error) => {
        // Silently handle the error - audio play may fail due to browser policies
        console.error("Error playing sound:", error);
      });
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
