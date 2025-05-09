/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import GameLayout from "../../components/templates/GameLayout";
import GameResults from "../../components/game/GameResult";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useGameState } from "@/app/hooks";
import EquivalentFractionsGame from "@/app/components/game/EquivalenceFractions";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import SVGVisualSelectionGame from "@/app/components/game/SVGVisualSelectionGame";
import DecimalMatchingGame from "@/app/components/game/DecimalMatchingGame";
import { UserStorage } from "@/app/utils/userStorage";
import GameStats from "@/app/components/game/GameStats";
import VisualFractionBuilder from "@/app/components/game/VisualFractionBuilder";
import FractionDragDropGame, { CircleFraction, RectangleFraction, HexagonFraction, NumberLineFraction } from "@/app/components/game/FractionDragandDropGame";
import EquivalentFractionMultiplier from "@/app/components/game/EquivalentFractionMultiplier";

// Define different question types
type QuestionType =
  | "equivalent-matching"
  | "drag-drop"
  | "visual-selection"
  | "true-false"
  | "decimal-matching"
  | "visual-builder"
  | "fraction-multiplier";

interface Question {
  type: QuestionType;
  id: number;
  content: any; // Will vary based on question type
}

const Game2 = () => {
  // Access page loader
  const { stopLoading } = usePageLoader();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  // Control confetti locally to prevent render loops
  const [shouldShowConfetti, setShouldShowConfetti] = useState(false);

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // QUESTION DEFINITIONS
  // ===================

  // Equivalent fractions matching game questions
  const equivalentMatchingQuestions = useMemo(() => [
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
  ], []);

  // True/False questions
  const trueFalseQuestions = useMemo(() => [
    {
      question: "These images show equivalent fractions.",
      imageUrl: "/equivalent-fractions-1.png",
      options: ["TRUE", "FALSE"],
      correctAnswer: "TRUE",
      explanation: "Both images represent the same portion of the whole.",
    },
    {
      question: "These images show equivalent fractions.",
      imageUrl: "/equivalent-fractions-2.png",
      options: ["TRUE", "FALSE"],
      correctAnswer: "FALSE",
      explanation: "These fractions represent different portions of the whole.",
    },
    {
      question: "These images show equivalent fractions.",
      imageUrl: "/equivalent-fractions-3.png",
      options: ["TRUE", "FALSE"],
      correctAnswer: "TRUE",
      explanation: "Both shapes represent the same fraction value.",
    },
    {
      question: "These images show equivalent fractions.",
      imageUrl: "/equivalent-fractions-4.png",
      options: ["TRUE", "FALSE"],
      correctAnswer: "TRUE",
      explanation: "Both rectangles have the same fraction of area shaded.",
    },
  ], []);

  const svgVisualSelectionQuestions = useMemo(() => [
    {
      question: "Select the visual that shows a fraction equivalent to 2/6.",
      options: [
        { label: "1/3", numerator: 1, denominator: 3 },
        { label: "1/2", numerator: 1, denominator: 2 },
        { label: "1/4", numerator: 1, denominator: 4 },
        { label: "3/4", numerator: 3, denominator: 4 },
      ],
      correctAnswer: "1/3",
      explanation:
        "2/6 can be simplified to 1/3 by dividing both numbers by 2. The first visual correctly shows 1/3.",
    },
  ], []);

  const decimalMatchingQuestions = useMemo(() => [
    {
      question: "Match each fraction with its equivalent decimal value:",
      groups: [
        {
          decimal: "0.25",
          fractions: ["1/4", "2/8"],
        },
        {
          decimal: "0.5",
          fractions: ["1/2", "4/8"],
        },
        {
          decimal: "0.75",
          fractions: ["3/4", "6/8"],
        },
      ],
      explanation:
        "Equivalent fractions have the same decimal value. When converted to decimals: 1/4 = 2/8 = 0.25, 1/2 = 4/8 = 0.5, and 3/4 = 6/8 = 0.75.",
    },
  ], []);

  // New Drag and Drop questions
  const dragDropQuestions = useMemo(() => [
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
  ], []);

  // Visual builder questions
  const visualBuilderQuestions = useMemo(() => [
    {
      instruction:
        "Create a fraction equivalent to 1/2 by selecting sections of the shape",
      targetFraction: "1/2",
      targetNumerator: 1,
      targetDenominator: 2,
      maxSections: 8,
      shapeType: "circle",
      explanation:
        "You can create equivalent fractions by selecting the same proportion of sections. For example, 1/2 = 2/4 = 3/6 = 4/8.",
    },
    {
      instruction:
        "Create a fraction equivalent to 2/3 by selecting sections of the shape",
      targetFraction: "2/3",
      targetNumerator: 2,
      targetDenominator: 3,
      maxSections: 9,
      shapeType: "rectangle",
      explanation:
        "The fraction 2/3 is equivalent to 4/6, 6/9, and other fractions where the numerator is 2/3 of the denominator.",
    },
    {
      instruction:
        "Create a fraction equivalent to 3/4 by selecting sections of the shape",
      targetFraction: "3/4",
      targetNumerator: 3,
      targetDenominator: 4,
      maxSections: 8,
      shapeType: "hexagon",
      explanation:
        "The fraction 3/4 is equivalent to 6/8 and other fractions where the numerator is 3/4 of the denominator.",
    },
  ], []);

  // Fraction multiplier questions
  const fractionMultiplierQuestions = useMemo(() => [
    {
      instruction:
        "Transform the starting fraction to match the target fraction",
      startFraction: {
        numerator: 1,
        denominator: 3,
      },
      targetFraction: {
        numerator: 2,
        denominator: 6,
      },
      possibleMultipliers: [2, 3, 4, 5],
      explanation:
        "To transform 1/3 into 2/6, we multiply both numerator and denominator by 2: (1×2)/(3×2) = 2/6. This creates an equivalent fraction.",
    },
    {
      instruction:
        "Transform the starting fraction to match the target fraction",
      startFraction: {
        numerator: 2,
        denominator: 5,
      },
      targetFraction: {
        numerator: 4,
        denominator: 10,
      },
      possibleMultipliers: [2, 3, 4, 5],
      explanation:
        "To transform 2/5 into 4/10, we multiply both numerator and denominator by 2: (2×2)/(5×2) = 4/10. This creates an equivalent fraction.",
    },
    {
      instruction:
        "Transform the starting fraction to match the target fraction",
      startFraction: {
        numerator: 1,
        denominator: 4,
      },
      targetFraction: {
        numerator: 3,
        denominator: 12,
      },
      possibleMultipliers: [2, 3, 4, 5],
      explanation:
        "To transform 1/4 into 3/12, we multiply both numerator and denominator by 3: (1×3)/(4×3) = 3/12. This creates an equivalent fraction.",
    },
  ], []);

  // Create the sequence of questions
  const allQuestions: Question[] = useMemo(() => [
    {
      type: "equivalent-matching",
      id: 1,
      content: equivalentMatchingQuestions[0],
    },

    {
      type: "fraction-multiplier",
      id: 2,
      content: fractionMultiplierQuestions[0],
    },

    { type: "drag-drop", id: 3, content: dragDropQuestions[0] },

    { type: "visual-builder", id: 4, content: visualBuilderQuestions[0] },

    ...trueFalseQuestions.slice(0, 2).map((q, idx) => ({
      type: "true-false" as QuestionType,
      id: 5 + idx,
      content: q,
    })),

    {
      type: "fraction-multiplier",
      id: 7,
      content: fractionMultiplierQuestions[1],
    },

    { type: "drag-drop", id: 8, content: dragDropQuestions[1] },

    { type: "visual-builder", id: 9, content: visualBuilderQuestions[1] },

    ...trueFalseQuestions.slice(2).map((q, idx) => ({
      type: "true-false" as QuestionType,
      id: 10 + idx,
      content: q,
    })),

    {
      type: "visual-selection",
      id: 12,
      content: svgVisualSelectionQuestions[0],
    },

    {
      type: "fraction-multiplier",
      id: 13,
      content: fractionMultiplierQuestions[2],
    },

    { type: "drag-drop", id: 14, content: dragDropQuestions[2] },

    { type: "visual-builder", id: 15, content: visualBuilderQuestions[2] },

    { type: "decimal-matching", id: 16, content: decimalMatchingQuestions[0] },
  ], [
    equivalentMatchingQuestions,
    fractionMultiplierQuestions,
    dragDropQuestions,
    visualBuilderQuestions,
    trueFalseQuestions,
    svgVisualSelectionQuestions,
    decimalMatchingQuestions,
  ]);

  // GAME LOGIC
  // ==========

  // Game state
  const game = useGameState({
    totalQuestions: allQuestions.length,
    autoAdvanceDelay: 2000,
  });

  // Handle the confetti state properly
  useEffect(() => {
    setShouldShowConfetti(game.showConfetti);

    if (game.showConfetti) {
      const timer = setTimeout(() => {
        setShouldShowConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [game.showConfetti]);

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
      const correctAnswer =
        game.currentQuestion < allQuestions.length
          ? allQuestions[game.currentQuestion]?.content?.correctAnswer
          : "";
      const isCorrect = selectedOption === correctAnswer;
      setSelectedAnswer(selectedOption);

      setTimeout(() => {
        setShowExplanation(true);

        setTimeout(() => {
          game.handleAnswer(isCorrect);
          setSelectedAnswer(null);
          setShowExplanation(false);
        }, 2500);
      }, 500);
    },
    [game, allQuestions]
  );

  const handleVisualSelectionAnswer = useCallback(
    (selectedLabel: string) => {
      const correctAnswer =
        game.currentQuestion < allQuestions.length
          ? allQuestions[game.currentQuestion]?.content?.correctAnswer
          : "";
      const isCorrect = selectedLabel === correctAnswer;
      setSelectedAnswer(selectedLabel);

      setTimeout(() => {
        setShowExplanation(true);

        setTimeout(() => {
          game.handleAnswer(isCorrect);
          setSelectedAnswer(null);
          setShowExplanation(false);
        }, 2500);
      }, 500);
    },
    [game, allQuestions]
  );

  const handleVisualBuilderAnswer = useCallback(
    (isCorrect: boolean) => {
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  // Handle drag drop answer
  const handleDragDropAnswer = useCallback(
    (isCorrect: boolean) => {
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  // Handle fraction multiplier answer
  const handleFractionMultiplierAnswer = useCallback(
    (isCorrect: boolean) => {
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  // Handle decimal matching answer
  const handleDecimalMatchingAnswer = useCallback(
    (isCorrect: boolean) => {
      game.handleAnswer(isCorrect);
    },
    [game]
  );

  const resetGameHandler = useCallback(() => {
    game.resetGame();
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShouldShowConfetti(false);
  }, [game]);

  // RENDER FUNCTIONS
  // ===============

  // Render the current question component based on its type
  const renderQuestionComponent = () => {
    if (game.currentQuestion >= allQuestions.length) return null;

    const currentQuestion = allQuestions[game.currentQuestion];
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "equivalent-matching":
        return (
          <EquivalentFractionsGame
            question={currentQuestion.content}
            onAnswer={handleEquivalentFractionsAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "true-false":
        return (
          <div>
            <MultipleChoiceGame
              question={currentQuestion.content}
              onAnswer={handleChoiceAnswer}
              disabled={!!game.showFeedback || showExplanation}
            />
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800"
              >
                <p>{currentQuestion.content.explanation}</p>
              </motion.div>
            )}
          </div>
        );

      case "visual-selection":
        return (
          <SVGVisualSelectionGame
            question={currentQuestion.content}
            selectedAnswer={selectedAnswer}
            onSelect={handleVisualSelectionAnswer}
            showExplanation={showExplanation}
          />
        );

      case "decimal-matching":
        return (
          <DecimalMatchingGame
            question={currentQuestion.content}
            onAnswer={handleDecimalMatchingAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "drag-drop":
        return (
          <FractionDragDropGame
            question={currentQuestion.content}
            onAnswer={handleDragDropAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "visual-builder":
        return (
          <VisualFractionBuilder
            question={currentQuestion.content}
            onAnswer={handleVisualBuilderAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "fraction-multiplier":
        return (
          <EquivalentFractionMultiplier
            question={currentQuestion.content}
            onAnswer={handleFractionMultiplierAnswer}
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
      <GameStats currentStep="step2" />
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
