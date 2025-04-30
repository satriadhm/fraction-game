/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import GameLayout from "../../components/templates/GameLayout";
import GameResults from "../../components/game/GameResult";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useGameState } from "@/app/hooks";
import EquivalentFractionsGame from "@/app/components/game/EquivalenceFractions";

const Game2 = () => {
  // Game state
  const game = useGameState({
    totalQuestions: 5,
    autoAdvanceDelay: 2000,
  });

  // Equivalent fractions game questions
  const equivalentFractionsQuestions = [
    {
      instruction:
        "Connect the equivalent fractions by clicking on the matching pairs",
      pairs: [
        {
          id: 1,
          leftSide: { colored: 1, total: 2 },
          rightSide: { colored: 2, total: 4 },
          isEquivalent: true,
        },
        {
          id: 2,
          leftSide: { colored: 1, total: 3 },
          rightSide: { colored: 2, total: 6 },
          isEquivalent: true,
        },
        {
          id: 3,
          leftSide: { colored: 2, total: 3 },
          rightSide: { colored: 4, total: 6 },
          isEquivalent: true,
        },
      ],
    },
  ];

  // Multiple choice questions
  const multipleChoiceQuestions = [
    {
      question: "Which fraction is equivalent to 1/2?",
      options: ["2/4", "3/6", "2/3", "1/3"],
      correctAnswer: "2/4",
    },
    {
      question: "Which is NOT an equivalent fraction of 2/3?",
      options: ["4/6", "6/9", "8/10", "10/15"],
      correctAnswer: "8/10",
    },
    {
      question: "To find an equivalent fraction, you...",
      options: [
        "Only multiply the numerator",
        "Only multiply the denominator",
        "Multiply both numerator and denominator by the same number",
        "Add the same number to both numerator and denominator",
      ],
      correctAnswer:
        "Multiply both numerator and denominator by the same number",
    },
    {
      question: "If 3/4 = ?/12, what is the missing number?",
      options: ["6", "9", "8", "12"],
      correctAnswer: "9",
    },
  ];

  // Track which type of game is currently active
  const [gameType, setGameType] = useState<"equivalent" | "multiple">(
    "equivalent"
  );

  // Show results when game is complete
  if (game.gameComplete) {
    return (
      <GameResults
        score={game.score}
        totalQuestions={5} // Total questions: 1 equivalent fraction game + 4 multiple choice
        onRestartGame={() => {
          game.resetGame();
          setGameType("equivalent");
        }}
      />
    );
  }

  // Handle answer for equivalent fractions game
  const handleEquivalentFractionsAnswer = (score: number, total: number) => {
    const isCorrect = score === total;
    game.handleAnswer(isCorrect);

    // Transition to multiple choice questions after the equivalent fractions game
    setTimeout(() => {
      setGameType("multiple");
    }, 2000);
  };

  // Handle multiple choice answer
  const handleMultipleChoiceAnswer = (selectedOption: string) => {
    const currentMultipleChoiceIndex = game.currentQuestion - 1;
    // Make sure we don't go out of bounds
    if (
      currentMultipleChoiceIndex >= 0 &&
      currentMultipleChoiceIndex < multipleChoiceQuestions.length
    ) {
      const currentQ = multipleChoiceQuestions[currentMultipleChoiceIndex];
      const isCorrect = selectedOption === currentQ.correctAnswer;
      game.handleAnswer(isCorrect);
    }
  };

  // Get current question content
  const getCurrentQuestion = () => {
    if (gameType === "equivalent") {
      return equivalentFractionsQuestions[0];
    } else {
      // Adjust index to account for the equivalent fractions game
      const multipleChoiceIndex = Math.min(
        game.currentQuestion - 1,
        multipleChoiceQuestions.length - 1
      );
      return multipleChoiceQuestions[
        multipleChoiceIndex >= 0 ? multipleChoiceIndex : 0
      ];
    }
  };

  return (
    <GameLayout
      title="Equivalent Fractions"
      subtitle={
        gameType === "equivalent"
          ? "Connect matching fractions"
          : "Find fractions with the same value"
      }
      currentQuestion={game.currentQuestion}
      totalQuestions={5} // 1 equivalent fraction game + 4 multiple choice
      score={game.score}
      showConfetti={game.showConfetti}
      showFeedback={game.showFeedback}
      feedbackMessage={
        game.showFeedback === "success"
          ? "Great job! Those fractions are equivalent."
          : game.showFeedback === "error"
          ? "Not quite. Try again!"
          : undefined
      }
      backgroundColor="bg-gradient-to-br from-purple-50 to-pink-100"
      accentColor="purple"
      backButtonPath="/step2"
    >
      {gameType === "equivalent" ? (
        // Equivalent fractions matching game
        <EquivalentFractionsGame
          question={getCurrentQuestion() as any}
          onAnswer={handleEquivalentFractionsAnswer}
          disabled={!!game.showFeedback}
        />
      ) : (
        // Multiple choice questions
        <MultipleChoiceGame
          question={getCurrentQuestion() as any}
          onAnswer={handleMultipleChoiceAnswer}
          disabled={!!game.showFeedback}
        />
      )}
    </GameLayout>
  );
};

export default Game2;
