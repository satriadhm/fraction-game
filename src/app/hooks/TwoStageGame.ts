"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useGameState } from "./useStateGame";

interface UseTwoStageGameProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firstStageQuestions: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  secondStageQuestions: any[];
  autoAdvanceDelay?: number;
  baseScore?: number; // Added baseScore parameter
}

export function useTwoStageGame({
  firstStageQuestions,
  secondStageQuestions,
  autoAdvanceDelay = 1500,
  baseScore = 10, // Default to 10 points per question
}: UseTwoStageGameProps) {
  const [currentStage, setCurrentStage] = useState<"first" | "second">("first");
  const stageChangeRef = useRef(false);
  const stageCompletionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // First stage game state - using the same baseScore for consistency
  const firstStage = useGameState({
    totalQuestions: firstStageQuestions.length,
    autoAdvanceDelay,
    baseScore, // Use the provided baseScore
  });

  // Second stage game state - using the same baseScore for consistency
  const secondStage = useGameState({
    totalQuestions: secondStageQuestions.length,
    autoAdvanceDelay,
    baseScore, // Use the provided baseScore
  });

  // Clean up stage completion timer on unmount
  useEffect(() => {
    return () => {
      if (stageCompletionTimerRef.current) {
        clearTimeout(stageCompletionTimerRef.current);
      }
    };
  }, []);

  // Handle stage change with useEffect to avoid infinite loops
  useEffect(() => {
    // Only change stage if first stage is complete and we're still in first stage
    if (
      firstStage.gameComplete &&
      currentStage === "first" &&
      !stageChangeRef.current
    ) {
      stageChangeRef.current = true; // Set flag to prevent multiple stage changes

      // Use setTimeout to delay the stage change slightly to avoid render conflicts
      stageCompletionTimerRef.current = setTimeout(() => {
        setCurrentStage("second");
        // We don't reset the first stage's score anymore, to preserve it for the total
        stageChangeRef.current = false; // Reset flag

        if (stageCompletionTimerRef.current) {
          clearTimeout(stageCompletionTimerRef.current);
          stageCompletionTimerRef.current = null;
        }
      }, 1000);
    }
  }, [firstStage.gameComplete, currentStage]);

  // Calculate total score across both stages - fixed to ensure proper calculation
  const totalScore = firstStage.score + secondStage.score;
  const totalQuestions =
    firstStageQuestions.length + secondStageQuestions.length;

  // Get current active game state based on stage
  const currentGame = currentStage === "first" ? firstStage : secondStage;

  // Get current questions based on stage
  const currentQuestions =
    currentStage === "first" ? firstStageQuestions : secondStageQuestions;

  // Reset both game stages
  const resetGame = useCallback(() => {
    // Clear any pending timers
    if (stageCompletionTimerRef.current) {
      clearTimeout(stageCompletionTimerRef.current);
      stageCompletionTimerRef.current = null;
    }

    firstStage.resetGame();
    secondStage.resetGame();
    setCurrentStage("first");
    stageChangeRef.current = false;
  }, [firstStage, secondStage]);

  return {
    currentStage,
    currentQuestion: currentGame.currentQuestion,
    currentQuestions,
    currentGameState: currentGame,
    totalScore,
    totalQuestions,
    gameComplete: secondStage.gameComplete,
    resetGame,
  };
}
