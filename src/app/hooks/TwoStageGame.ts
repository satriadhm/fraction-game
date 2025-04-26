"use client";

import { useState, useCallback } from "react";
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

  // When first stage is complete, move to second stage
  if (firstStage.gameComplete && currentStage === "first") {
    setCurrentStage("second");
    firstStage.resetGame(); // Reset first stage for potential replay
  }

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
