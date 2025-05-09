"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import GameLayout from "../../components/templates/GameLayout";
import GameResults from "../../components/game/GameResult";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useGameState } from "@/app/hooks";
import EquivalentFractionsGame from "@/app/components/game/EquivalenceFractions";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import { UserStorage } from "@/app/utils/userStorage";
import FractionDragDropGame, {
  CircleFraction,
  RectangleFraction,
  HexagonFraction,
  NumberLineFraction,
} from "@/app/components/game/FractionDragandDropGame";

// Component to render stats with a delay to avoid hydration issues
const DelayedGameStats = () => {
  const [mounted, setMounted] = useState(false);

  // Only show component after client-side hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white bg-opacity-90 rounded-xl p-4 mb-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-purple-700">Your Stats</h3>
          <p className="text-sm text-gray-600">
            Best Score: <span className="font-bold">0</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Attempts: <span className="font-bold">0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Game2 = () => {
  // Access page loader
  const { stopLoading } = usePageLoader();
  const [showExplanation, setShowExplanation] = useState(false);
  const [shouldShowConfetti, setShouldShowConfetti] = useState(false);

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // QUESTION DEFINITIONS
  // ===================

  // Equivalent fractions matching game questions
  const equivalentMatchingQuestions = useMemo(
    () => [
      {
        instruction:
          "Connect the equivalent fractions by clicking on matching pairs, then click Submit Answer when done",
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
      {
        instruction: "Match these fractions with their equivalents",
        pairs: [
          {
            id: 1,
            leftSide: { colored: 2, total: 4 },
            rightSide: { colored: 3, total: 6 },
            isEquivalent: true,
          },
          {
            id: 2,
            leftSide: { colored: 3, total: 4 },
            rightSide: { colored: 6, total: 8 },
            isEquivalent: true,
          },
          {
            id: 3,
            leftSide: { colored: 1, total: 5 },
            rightSide: { colored: 2, total: 10 },
            isEquivalent: true,
          },
        ],
      },
      {
        instruction: "Find the equivalent fractions and connect them",
        pairs: [
          {
            id: 1,
            leftSide: { colored: 3, total: 6 },
            rightSide: { colored: 1, total: 2 },
            isEquivalent: true,
          },
          {
            id: 2,
            leftSide: { colored: 2, total: 8 },
            rightSide: { colored: 1, total: 4 },
            isEquivalent: true,
          },
          {
            id: 3,
            leftSide: { colored: 4, total: 12 },
            rightSide: { colored: 1, total: 3 },
            isEquivalent: true,
          },
        ],
      },
      {
        instruction: "Match each fraction with its equivalent",
        pairs: [
          {
            id: 1,
            leftSide: { colored: 4, total: 6 },
            rightSide: { colored: 2, total: 3 },
            isEquivalent: true,
          },
          {
            id: 2,
            leftSide: { colored: 5, total: 10 },
            rightSide: { colored: 1, total: 2 },
            isEquivalent: true,
          },
          {
            id: 3,
            leftSide: { colored: 3, total: 9 },
            rightSide: { colored: 1, total: 3 },
            isEquivalent: true,
          },
        ],
      },
    ],
    []
  );

  // True/False questions
  const trueFalseQuestions = useMemo(
    () => [
      {
        question: "These images show equivalent fractions.",
        imageUrl: "/equivalent-fractions-1.png",
        options: ["TRUE", "FALSE"],
        correctAnswer: "TRUE",
      },
      {
        question: "These images show equivalent fractions.",
        imageUrl: "/equivalent-fractions-2.png",
        options: ["TRUE", "FALSE"],
        correctAnswer: "FALSE",
      },
      {
        question: "These images show equivalent fractions.",
        imageUrl: "/equivalent-fractions-3.png",
        options: ["TRUE", "FALSE"],
        correctAnswer: "TRUE",
      },
      {
        question: "These images show equivalent fractions.",
        imageUrl: "/equivalent-fractions-4.png",
        options: ["TRUE", "FALSE"],
        correctAnswer: "TRUE",
      },
    ],
    []
  );

  // Explanations for True/False questions (stored separately for type compatibility)
  const trueFalseExplanations = useMemo(
    () => [
      "Both images represent the same portion of the whole.",
      "These fractions represent different portions of the whole.",
      "Both shapes represent the same fraction value.",
      "Both rectangles have the same fraction of area shaded.",
    ],
    []
  );

  // Drag and Drop questions
  const dragDropQuestions = useMemo(
    () => [
      {
        instruction:
          "Drag the fraction visualizations to their equivalent fraction values",
        pieces: [
          {
            id: "piece1",
            value: "1/2",
            image: <CircleFraction numerator={1} denominator={2} />,
          },
          {
            id: "piece2",
            value: "2/4",
            image: <RectangleFraction numerator={2} denominator={4} />,
          },
          {
            id: "piece3",
            value: "3/6",
            image: <HexagonFraction numerator={3} denominator={6} />,
          },
          {
            id: "piece4",
            value: "4/8",
            image: <NumberLineFraction numerator={4} denominator={8} />,
          },
        ],
        dropZones: [
          {
            id: "zone1",
            label: "Drop 1/2 here",
            accepts: "1/2",
          },
          {
            id: "zone2",
            label: "Drop 2/4 here",
            accepts: "2/4",
          },
          {
            id: "zone3",
            label: "Drop 3/6 here",
            accepts: "3/6",
          },
        ],
        explanation:
          "All these fractions are equivalent to 1/2 when simplified. 1/2 = 2/4 = 3/6 = 4/8.",
      },
      {
        instruction:
          "Match the circle fractions with their equivalent rectangle fractions",
        pieces: [
          {
            id: "piece1",
            value: "1/3",
            image: <CircleFraction numerator={1} denominator={3} />,
          },
          {
            id: "piece2",
            value: "2/3",
            image: <CircleFraction numerator={2} denominator={3} />,
          },
          {
            id: "piece3",
            value: "2/6",
            image: <RectangleFraction numerator={2} denominator={6} />,
          },
          {
            id: "piece4",
            value: "4/6",
            image: <RectangleFraction numerator={4} denominator={6} />,
          },
        ],
        dropZones: [
          {
            id: "zone1",
            label: "Equivalent to 1/3",
            accepts: "2/6",
          },
          {
            id: "zone2",
            label: "Equivalent to 2/3",
            accepts: "4/6",
          },
        ],
        explanation:
          "2/6 is equivalent to 1/3 (both equal 1÷3). 4/6 is equivalent to 2/3 (both equal 2÷3).",
      },
      {
        instruction: "Find the missing pieces to create equivalent fractions",
        pieces: [
          {
            id: "piece1",
            value: "3/9",
            image: <CircleFraction numerator={3} denominator={9} />,
          },
          {
            id: "piece2",
            value: "1/3",
            image: <CircleFraction numerator={1} denominator={3} />,
          },
          {
            id: "piece3",
            value: "1/2",
            image: <RectangleFraction numerator={1} denominator={2} />,
          },
          {
            id: "piece4",
            value: "3/6",
            image: <RectangleFraction numerator={3} denominator={6} />,
          },
        ],
        dropZones: [
          {
            id: "zone1",
            label: "Equivalent to 3/9",
            accepts: "1/3",
          },
          {
            id: "zone2",
            label: "Equivalent to 3/6",
            accepts: "1/2",
          },
        ],
        explanation:
          "1/3 is equivalent to 3/9 when simplified. Similarly, 3/6 simplifies to 1/2.",
      },
      {
        instruction: "Drag the fraction pieces to match equivalent fractions",
        pieces: [
          {
            id: "piece1",
            value: "4/12",
            image: <CircleFraction numerator={4} denominator={12} />,
          },
          {
            id: "piece2",
            value: "1/3",
            image: <CircleFraction numerator={1} denominator={3} />,
          },
          {
            id: "piece3",
            value: "2/5",
            image: <RectangleFraction numerator={2} denominator={5} />,
          },
          {
            id: "piece4",
            value: "4/10",
            image: <RectangleFraction numerator={4} denominator={10} />,
          },
        ],
        dropZones: [
          {
            id: "zone1",
            label: "Equivalent to 4/12",
            accepts: "1/3",
          },
          {
            id: "zone2",
            label: "Equivalent to 4/10",
            accepts: "2/5",
          },
        ],
        explanation:
          "4/12 simplifies to 1/3, and 4/10 simplifies to 2/5. These are equivalent fractions.",
      },
    ],
    []
  );

  // Define question types
  type QuestionType = "equivalent-matching" | "drag-drop" | "true-false";

  // Create a structure for all questions
  interface QuestionItem {
    type: QuestionType;
    id: number;
  }

  // Create the sequence of questions - exactly 12 questions
  const allQuestions: QuestionItem[] = useMemo(
    () => [
      // 4 Equivalent Matching Questions
      ...equivalentMatchingQuestions.map((_, idx) => ({
        type: "equivalent-matching" as const,
        id: idx + 1,
      })),

      // 4 True/False Questions
      ...trueFalseQuestions.map((_, idx) => ({
        type: "true-false" as const,
        id: idx + 5,
      })),

      // 4 Drag-and-Drop Questions
      ...dragDropQuestions.map((_, idx) => ({
        type: "drag-drop" as const,
        id: idx + 9,
      })),
    ],
    [equivalentMatchingQuestions, trueFalseQuestions, dragDropQuestions]
  );

  // GAME LOGIC
  // ==========

  // Game state
  const game = useGameState({
    totalQuestions: allQuestions.length,
    autoAdvanceDelay: 2000,
  });

  // Handle the confetti state properly
  useEffect(() => {
    // Only update state if there's an actual change to prevent infinite loops
    if (shouldShowConfetti !== game.showConfetti) {
      setShouldShowConfetti(game.showConfetti);
    }

    if (game.showConfetti) {
      const timer = setTimeout(() => {
        setShouldShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [game.showConfetti, shouldShowConfetti]);

  // ANSWER HANDLERS
  // ==============

  const handleEquivalentFractionsAnswer = useCallback(
    (score: number, total: number) => {
      const isCorrect = score === total;
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  const handleChoiceAnswer = useCallback(
    (selectedOption: string) => {
      if (game.currentQuestion >= allQuestions.length) return;

      const questionIndex = game.currentQuestion % 4;
      const currentQuestion = trueFalseQuestions[questionIndex];
      const correctAnswer = currentQuestion.correctAnswer || "";
      const isCorrect = selectedOption === correctAnswer;

      // Set a one-time flag for state updates
      if (!showExplanation) {
        setShowExplanation(true);

        // Use a timeout to ensure we don't trigger state updates too quickly
        const timer = setTimeout(() => {
          game.handleAnswer(isCorrect);
          setShowExplanation(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    },
    [game, trueFalseQuestions, showExplanation, allQuestions.length]
  );

  // Handle drag drop answer
  const handleDragDropAnswer = useCallback(
    (isCorrect: boolean) => {
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  const resetGameHandler = useCallback(() => {
    game.resetGame();
    setShowExplanation(false);
    setShouldShowConfetti(false);
  }, [game]);

  // RENDER FUNCTIONS
  // ===============

  // Render the current question component based on its type
  const renderQuestionComponent = () => {
    if (game.currentQuestion >= allQuestions.length) return null;

    const currentItem = allQuestions[game.currentQuestion];
    if (!currentItem) return null;

    // Calculate the index within its category (0-3)
    const categoryIndex = game.currentQuestion % 4;

    switch (currentItem.type) {
      case "equivalent-matching":
        return (
          <EquivalentFractionsGame
            question={equivalentMatchingQuestions[categoryIndex]}
            onAnswer={handleEquivalentFractionsAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "true-false":
        return (
          <div>
            <MultipleChoiceGame
              question={trueFalseQuestions[categoryIndex]}
              onAnswer={handleChoiceAnswer}
              disabled={!!game.showFeedback || showExplanation}
            />
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800"
              >
                <p>{trueFalseExplanations[categoryIndex]}</p>
              </motion.div>
            )}
          </div>
        );

      case "drag-drop":
        return (
          <FractionDragDropGame
            question={dragDropQuestions[categoryIndex]}
            onAnswer={handleDragDropAnswer}
            disabled={!!game.showFeedback}
          />
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  // Show game results when complete
  if (game.gameComplete) {
    UserStorage.updateStepProgress("step2", game.score, true);
    return (
      <GameResults
        score={game.score}
        totalQuestions={allQuestions.length}
        onRestartGame={resetGameHandler}
      />
    );
  }

  // Main game layout
  return (
    <GameLayout
      title="Equivalent Fractions"
      subtitle="Explore fractions that look different but have the same value"
      currentQuestion={game.currentQuestion}
      totalQuestions={allQuestions.length}
      score={game.score}
      showConfetti={shouldShowConfetti}
      showFeedback={game.showFeedback}
      feedbackMessage={
        game.showFeedback === "success"
          ? "Great job! You understand equivalent fractions."
          : game.showFeedback === "error"
          ? "Not quite right. Let's try another one!"
          : undefined
      }
      backgroundColor="bg-gradient-to-br from-purple-50 to-pink-100"
      accentColor="purple"
      backButtonPath="/step2"
    >
      <DelayedGameStats />

      <motion.div
        key={
          game.currentQuestion < allQuestions.length
            ? allQuestions[game.currentQuestion]?.id
            : "unknown"
        }
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-2xl w-full"
      >
        {renderQuestionComponent()}
      </motion.div>
    </GameLayout>
  );
};

export default Game2;
