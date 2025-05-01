/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GameLayout from "../../components/templates/GameLayout";
import GameResults from "../../components/game/GameResult";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useGameState } from "@/app/hooks";
import EquivalentFractionsGame from "@/app/components/game/EquivalenceFractions";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import SVGVisualSelectionGame from "@/app/components/game/SVGVisualSelectionGame";
import FractionRecipeGame from "@/app/components/game/FractionRecipe";
import DecimalMatchingGame from "@/app/components/game/DecimalMatchingGame";

// Define different question types
type QuestionType =
  | "equivalent-matching"
  | "multiple-choice"
  | "visual-selection"
  | "true-false"
  | "fraction-recipe"
  | "decimal-matching";

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

  // Game state
  const game = useGameState({
    totalQuestions: 10,
    autoAdvanceDelay: 2000,
  });

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // Equivalent fractions matching game questions
  const equivalentMatchingQuestions = [
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
  ];

  // Multiple choice questions
  const multipleChoiceQuestions = [
    {
      question: "Which fraction is equivalent to 1/2?",
      options: ["2/4", "3/5", "2/3", "1/3"],
      correctAnswer: "2/4",
      explanation:
        "1/2 = 2/4 because 1×2 = 2 and 2×2 = 4. When you multiply both the numerator and denominator by the same number, you get an equivalent fraction.",
    },
    {
      question: "Which is NOT an equivalent fraction of 2/3?",
      options: ["4/6", "6/9", "8/10", "10/15"],
      correctAnswer: "8/10",
      explanation:
        "8/10 = 4/5 when simplified, which is not equal to 2/3. All other options simplify to 2/3.",
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
      explanation:
        "To create equivalent fractions, you must multiply (or divide) both the numerator and denominator by the same non-zero number.",
    },
  ];

  // True/False questions
  const trueFalseQuestions = [
    {
      question: "True or False: The fractions 4/8 and 1/2 are equivalent.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "4/8 can be simplified to 1/2 by dividing both numerator and denominator by 4. Therefore, they are equivalent.",
    },
    {
      question:
        "True or False: If you add 1 to both the numerator and denominator of a fraction, you get an equivalent fraction.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Adding the same number to both the numerator and denominator does not create an equivalent fraction. For example, 1/2 and 2/3 are not equivalent.",
    },
  ];

  // Visual selection questions - now using SVG
  const svgVisualSelectionQuestions = [
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
  ];

  // Improved decimal matching questions
  const decimalMatchingQuestions = [
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
  ];

  // Fraction Recipe questions
  const fractionRecipeQuestions = [
    {
      initialFraction: "1/3",
      targetFraction: "2/6",
      steps: [
        {
          instruction: "What number should you multiply the numerator by?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "2",
        },
        {
          instruction: "What number should you multiply the denominator by?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "2",
        },
      ],
      explanation:
        "To transform 1/3 into 2/6, we multiply both the numerator and denominator by 2: (1×2)/(3×2) = 2/6. This creates an equivalent fraction.",
    },
    {
      initialFraction: "2/5",
      targetFraction: "4/10",
      steps: [
        {
          instruction: "What number should you multiply the numerator by?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "2",
        },
        {
          instruction: "What number should you multiply the denominator by?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "2",
        },
      ],
      explanation:
        "To transform 2/5 into 4/10, we multiply both the numerator and denominator by 2: (2×2)/(5×2) = 4/10. This creates an equivalent fraction.",
    },
  ];

  // Combine all questions into a single array with exactly 10 questions
  const allQuestions: Question[] = [
    // First matching game (1)
    {
      type: "equivalent-matching",
      id: 1,
      content: equivalentMatchingQuestions[0],
    },

    // First recipe game (2)
    { type: "fraction-recipe", id: 2, content: fractionRecipeQuestions[0] },

    // Three multiple choice questions (3-5)
    ...multipleChoiceQuestions.map((q, idx) => ({
      type: "multiple-choice" as QuestionType,
      id: 3 + idx,
      content: q,
    })),

    // Second recipe game (6)
    { type: "fraction-recipe", id: 6, content: fractionRecipeQuestions[1] },

    // Two true/false questions (7-8)
    ...trueFalseQuestions.map((q, idx) => ({
      type: "true-false" as QuestionType,
      id: 7 + idx,
      content: q,
    })),

    // One SVG visual selection question (9)
    {
      type: "visual-selection",
      id: 9,
      content: svgVisualSelectionQuestions[0],
    },

    // One decimal matching question (10)
    { type: "decimal-matching", id: 10, content: decimalMatchingQuestions[0] },
  ];

  // Show results when game is complete
  if (game.gameComplete) {
    return (
      <GameResults
        score={game.score}
        totalQuestions={allQuestions.length}
        onRestartGame={() => {
          game.resetGame();
          setSelectedAnswer(null);
          setShowExplanation(false);
        }}
      />
    );
  }

  // Get current question
  const currentQuestion = allQuestions[game.currentQuestion];

  // Handle answer for equivalent fractions matching game
  const handleEquivalentFractionsAnswer = (score: number, total: number) => {
    const isCorrect = score === total;
    game.handleAnswer(isCorrect);
  };

  // Handle multiple choice or true/false answer
  const handleChoiceAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === currentQuestion.content.correctAnswer;
    setSelectedAnswer(selectedOption);

    // Short delay to show the explanation
    setTimeout(() => {
      setShowExplanation(true);

      // Auto advance after showing explanation
      setTimeout(() => {
        game.handleAnswer(isCorrect);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }, 2500);
    }, 500);
  };

  // Handle visual selection answer
  const handleVisualSelectionAnswer = (selectedLabel: string) => {
    const isCorrect = selectedLabel === currentQuestion.content.correctAnswer;
    setSelectedAnswer(selectedLabel);

    setTimeout(() => {
      setShowExplanation(true);

      setTimeout(() => {
        game.handleAnswer(isCorrect);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }, 2500);
    }, 500);
  };

  // Handle fraction recipe answer
  const handleFractionRecipeAnswer = (isCorrect: boolean) => {
    game.handleAnswer(isCorrect);
  };

  // Handle decimal matching answer
  const handleDecimalMatchingAnswer = (isCorrect: boolean) => {
    game.handleAnswer(isCorrect);
  };

  // Render the appropriate game component based on question type
  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case "equivalent-matching":
        return (
          <EquivalentFractionsGame
            question={currentQuestion.content}
            onAnswer={handleEquivalentFractionsAnswer}
            disabled={!!game.showFeedback}
          />
        );

      case "multiple-choice":
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

      case "fraction-recipe":
        return (
          <FractionRecipeGame
            question={currentQuestion.content}
            onAnswer={handleFractionRecipeAnswer}
            disabled={!!game.showFeedback}
          />
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <GameLayout
      title="Equivalent Fractions"
      subtitle="Explore fractions that look different but have the same value"
      currentQuestion={game.currentQuestion}
      totalQuestions={allQuestions.length}
      score={game.score}
      showConfetti={game.showConfetti}
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
      <motion.div
        key={currentQuestion.id}
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
