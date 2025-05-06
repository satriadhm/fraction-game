"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";
import ConfettiEffect from "../../components/organisms/ConfettiEffect";
import GameResults from "../../components/game/GameResult";
import PizzaSliceGame from "../../components/game/PizzaSliceGame";
import StripFractionGame, {
  StripFractionQuestion,
} from "../../components/game/StripFractionGame";
import ConditionalStripGame, {
  ConditionalStripQuestion,
} from "../../components/game/ConditionalStripGame";
import HexagonFractionGame, {
  HexagonFractionQuestion,
} from "../../components/game/HexagonFractionGame";
import CandyProgressBar from "../../components/game/CandyProgressBar";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useTwoStageGame } from "@/app/hooks";
import { usePageLoader } from "@/app/context/PageLoaderContext";
import { UserStorage } from "@/app/utils/userStorage";
import GameStats from "@/app/components/game/GameStats";

// Define types
interface PizzaQuestion {
  type?: "pizza"; // Optional since it's the default
  instruction: string;
  totalSlices: number;
  correctSlices: number;
}

// Union type for all first stage questions
type FirstStageQuestion =
  | PizzaQuestion
  | StripFractionQuestion
  | ConditionalStripQuestion
  | HexagonFractionQuestion;

const Game1 = () => {
  const router = useRouter();
  const { stopLoading, startLoading } = usePageLoader();

  // Stop loading when component mounts
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  // Define the questions with proper type annotations
  const pizzaQuestions: FirstStageQuestion[] = [
    {
      instruction: "Shade 3 out of 4 of the pizza",
      totalSlices: 4,
      correctSlices: 3,
    },
    {
      instruction: "Shade 2 out of 8 of the pizza",
      totalSlices: 8,
      correctSlices: 2,
    },
    // Question 3: Strip question
    {
      type: "strip",
      instruction: "Shade 3 out of 10 sections.",
      totalSections: 10,
      correctSections: 3,
      rows: 2, // Make it a 2x5 grid for better UI
    },
    {
      type: "conditional-strip",
      instruction: "Shade 5 out of 10",
      initialShadedSections: [3],
      additionalSections: 2,
      totalSections: 10,
      rows: 2,
      explanation:
        "1 was already shaded, plus 2 more would make 3 out of 10 shaded.",
    },
    {
      type: "hexagon-fraction",
      instruction: "What fraction of the shape is shaded?",
      totalHexagons: 7,
      shadedHexagons: 4,
      presetPattern: true,
      // Define the hexagon layout pattern as [row, column] coordinates
      hexagonLayout: [
        [0, 0], // Top hexagon
        [1, 0],
        [1, 1],
        [1, 2], // Second row
        [2, 0],
        [2, 1],
        [2, 2], // Third row
      ],
      // Indices of the hexagons that are shaded (0-based index from the hexagonLayout array)
      shadedIndices: [2, 3, 5, 6], // 4 out of 7 hexagons are shaded
    },
  ];

  // Define the multiple choice questions
  const multipleChoiceQuestions = [
    {
      question:
        "Ms. Intan bought a pizza and cut it into 4 equal parts. She ate 1 part of the pizza.\nWhat fraction of the pizza is left?",
      image: "/pizza-3-4.png",
      options: ["1/4", "2/4", "3/4", "1/2"],
      correctAnswer: "3/4",
    },
    {
      question:
        "You have 10 slices of pizza.\n You want to share them with four friends.\n How many slices would each of you get??",
      options: ["2", "5", "4", "3"],
      correctAnswer: "2",
    },
    {
      question:
        "If you color 3 slices of a pizza with 6 equal slices, what fraction of the pizza is colored?",
      options: ["1/2", "3/6", "2/6", "4/6"],
      correctAnswer: "1/2",
    },
    {
      question:
        "If a pizza has 8 slices and you shade 4, what fraction is shaded?",
      options: ["1/2", "4/8", "Both A and B", "None of the above"],
      correctAnswer: "Both A and B",
    },
    {
      question:
        "If 3/4 of a pizza is shaded, how many slices are shaded in a 12-slice pizza?",
      options: ["3", "4", "9", "12"],
      correctAnswer: "9",
    },
  ];

  // Use custom hook to manage two-stage game state
  const game = useTwoStageGame({
    firstStageQuestions: pizzaQuestions,
    secondStageQuestions: multipleChoiceQuestions,
  });

  // If game is complete, show results
  if (game.gameComplete) {
    UserStorage.updateStepProgress("step1", game.totalScore, true);
    return (
      <GameResults
        score={game.totalScore}
        totalQuestions={game.totalQuestions}
        onRestartGame={game.resetGame}
      />
    );
  }

  // Determine which game component to render based on the current question
  const renderGameComponent = () => {
    if (game.currentStage === "first") {
      const currentQuestion = pizzaQuestions[game.currentQuestion];

      // Handle different question types
      if (currentQuestion.type === "strip") {
        return (
          <StripFractionGame
            question={currentQuestion as StripFractionQuestion}
            onAnswer={game.currentGameState.handleAnswer}
            disabled={!!game.currentGameState.showFeedback}
          />
        );
      } else if (currentQuestion.type === "conditional-strip") {
        return (
          <ConditionalStripGame
            question={currentQuestion as ConditionalStripQuestion}
            onAnswer={game.currentGameState.handleAnswer}
            disabled={!!game.currentGameState.showFeedback}
          />
        );
      } else if (currentQuestion.type === "hexagon-fraction") {
        return (
          <HexagonFractionGame
            question={currentQuestion as HexagonFractionQuestion}
            onAnswer={game.currentGameState.handleAnswer}
            disabled={!!game.currentGameState.showFeedback}
          />
        );
      } else {
        // Regular pizza question
        return (
          <PizzaSliceGame
            question={currentQuestion as PizzaQuestion}
            onAnswer={game.currentGameState.handleAnswer}
            disabled={!!game.currentGameState.showFeedback}
          />
        );
      }
    } else {
      // Multiple choice questions for second stage
      return (
        <MultipleChoiceGame
          question={multipleChoiceQuestions[game.currentQuestion]}
          onAnswer={(selectedOption) => {
            // Create an adapter that converts string to boolean
            const isCorrect =
              selectedOption ===
              multipleChoiceQuestions[game.currentQuestion].correctAnswer;
            game.currentGameState.handleAnswer(isCorrect);
          }}
          disabled={!!game.currentGameState.showFeedback}
        />
      );
    }
  };

  // Get feedback message based on the current question
  const getFeedbackMessage = () => {
    if (game.currentStage === "first") {
      const currentQuestion = pizzaQuestions[game.currentQuestion];
      if (game.currentGameState.showFeedback === "success") {
        if (
          currentQuestion.type === "conditional-strip" &&
          (currentQuestion as ConditionalStripQuestion).explanation
        ) {
          return `Great job! ${
            (currentQuestion as ConditionalStripQuestion).explanation
          }`;
        } else if (currentQuestion.type === "hexagon-fraction") {
          return "Correct! There are 4 shaded hexagons out of 7 total hexagons, which is 4/7.";
        }
        return "Great job! Your answer is correct.";
      } else {
        if (
          currentQuestion.type === "conditional-strip" &&
          (currentQuestion as ConditionalStripQuestion).explanation
        ) {
          return `Not quite. ${
            (currentQuestion as ConditionalStripQuestion).explanation
          }`;
        } else if (currentQuestion.type === "hexagon-fraction") {
          return "Not quite. Count the total number of hexagons and how many are shaded yellow.";
        }
        return "Not quite. Try again!";
      }
    }
    return game.currentGameState.showFeedback === "success"
      ? "Great job! Your answer is correct."
      : "Not quite. Try again!";
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-5 md:p-8 overflow-hidden">
      {/* Cute background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-pink-100 via-transparent to-pink-100"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-yellow-100 opacity-50"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Confetti effect when answering correctly */}
      <ConfettiEffect show={game.currentGameState.showConfetti} />

      {/* Main game container */}
      <div className="max-w-3xl w-full">
        {/* Game header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 drop-shadow-sm mb-2">
            Fraction of Shape
          </h1>
          <p className="text-blue-700 font-medium">
            {game.currentStage === "first"
              ? "Let's learn fractions with various shapes!"
              : "Answer these multiple choice questions about fractions"}
          </p>
        </motion.div>
        <GameStats currentStep="step1" />

        {/* Game progress tracker */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>
              Question {game.currentQuestion + 1}/{game.currentQuestions.length}
              {game.currentStage === "second" && " (Multiple Choice)"}
            </span>
            <span>
              Score:{" "}
              {game.currentStage === "first"
                ? game.currentGameState.score
                : game.totalScore}
            </span>
          </div>
          <CandyProgressBar
            progress={game.currentQuestion + 1}
            total={game.currentQuestions.length}
          />
        </div>

        {/* Game content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 relative"
        >
          {/* Feedback popup */}
          {game.currentGameState.showFeedback && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl backdrop-blur-sm ${
                game.currentGameState.showFeedback === "success"
                  ? "bg-green-400/30"
                  : "bg-red-400/30"
              }`}
            >
              <div
                className={`p-6 rounded-xl ${
                  game.currentGameState.showFeedback === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                } max-w-xs text-center`}
              >
                <motion.div
                  animate={
                    game.currentGameState.showFeedback === "success"
                      ? { rotate: [0, 10, -10, 0] }
                      : { x: [0, -10, 10, -10, 10, 0] }
                  }
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  {game.currentGameState.showFeedback === "success" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </motion.div>
                <p className="text-white text-center mt-2 font-medium">
                  {getFeedbackMessage()}
                </p>
              </div>
            </motion.div>
          )}

          {/* Render the appropriate game component */}
          {renderGameComponent()}
        </motion.div>

        {/* Back button */}
        <div className="mt-6 text-center">
          <AnimatedButton
            onClick={() => {
              startLoading("Loading Menu...");
              router.push("/menu");
            }}
            color="blue"
            size="small"
            hoverEffect="wobble"
            icon={<Icon type="back" />}
            className="outline-none focus:outline-none"
          >
            Back to Menu
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Game1;
