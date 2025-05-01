"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useGameState } from "./useStateGame";

interface UseTwoStageGameProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firstStageQuestions: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  secondStageQuestions: any[];
  autoAdvanceDelay?: number;
}

export function useTwoStageGame({
  firstStageQuestions,
  secondStageQuestions,
  autoAdvanceDelay = 1500,
}: UseTwoStageGameProps) {
  const [currentStage, setCurrentStage] = useState<"first" | "second">("first");
  const stageChangeRef = useRef(false);

  // First stage game state
  const firstStage = useGameState({
    totalQuestions: firstStageQuestions.length,
    autoAdvanceDelay,
  });

  // Second stage game state
  const secondStage = useGameState({
    totalQuestions: secondStageQuestions.length,
    autoAdvanceDelay,
  });

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
      setTimeout(() => {
        setCurrentStage("second");
        firstStage.resetGame(); // Reset first stage for potential replay
        stageChangeRef.current = false; // Reset flag
      }, 100);
    }
  }, [firstStage.gameComplete, currentStage, firstStage]);

  // Calculate total score across both stages
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
