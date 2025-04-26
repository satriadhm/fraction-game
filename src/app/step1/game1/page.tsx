// src/app/step1/game1/page.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";
import ConfettiEffect from "../../components/organisms/ConfettiEffect";
import GameResults from "../../components/game/GameResult";
import PizzaSliceGame from "../../components/game/PizzaSliceGame";
import CandyProgressBar from "../../components/game/CandyProgressBar";
import MultipleChoiceGame from "../../components/game/MultipleChoiceGame";
import { useTwoStageGame } from "@/app/hooks";

const Game1 = () => {
  const router = useRouter();

  // Define the pizza slice questions
  const pizzaQuestions = [
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
    {
      instruction: "Shade 1 out of 2 of the pizza",
      totalSlices: 2,
      correctSlices: 1,
    },
    {
      instruction: "Shade 5 out of 6 of the pizza",
      totalSlices: 6,
      correctSlices: 5,
    },
    {
      instruction: "Shade 4 out of 8 of the pizza",
      totalSlices: 8,
      correctSlices: 4,
    },
  ];

  // Define the multiple choice questions
  const multipleChoiceQuestions = [
    {
      question: "What fraction of the pizza is shaded?",
      image: "/pizza-3-4.png", // Use consistent 'image' property
      options: ["1/4", "2/4", "3/4", "1/2"],
      correctAnswer: "3/4",
    },
    {
      question: "If 2 slices out of 8 are eaten, what fraction remains?",
      options: ["2/8", "6/8", "3/4", "1/4"],
      correctAnswer: "6/8",
    },
    {
      question: "Which fraction is equivalent to 1/2?",
      options: ["2/4", "3/6", "4/8", "All of the above"],
      correctAnswer: "All of the above",
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
    return (
      <GameResults
        score={game.totalScore}
        totalQuestions={game.totalQuestions}
        onRestartGame={game.resetGame}
      />
    );
  }

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
            Let&apos;s learn fractions with pizza!
          </p>
        </motion.div>

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
                className={`p-6 rounded-full ${
                  game.currentGameState.showFeedback === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                <motion.div
                  animate={
                    game.currentGameState.showFeedback === "success"
                      ? { rotate: [0, 10, -10, 0] }
                      : { x: [0, -10, 10, -10, 10, 0] }
                  }
                  transition={{ duration: 0.5 }}
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
              </div>
            </motion.div>
          )}

          {/* Render appropriate game type based on current stage */}
          {game.currentStage === "first" ? (
            <PizzaSliceGame
              question={pizzaQuestions[game.currentQuestion]}
              onAnswer={game.currentGameState.handleAnswer}
              disabled={!!game.currentGameState.showFeedback}
            />
          ) : (
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
          )}
        </motion.div>

        {/* Back button */}
        <div className="mt-6 text-center">
          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="small"
            hoverEffect="wobble"
            icon={<Icon type="back" />}
          >
            Back to Menu
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Game1;
