"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import GameLayout from "../../components/templates/GameLayout";
import MultipleQuestion from "../../components/organisms/MultipleQuestion";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";
import Image from "next/image";

const Game3 = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<
    "success" | "error" | "warning" | "info" | null
  >(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Game questions about fractions on a number line
  const questions = [
    {
      question: "Which fraction is located at point A on the number line?",
      imageUrl: "/number-line-1.png", // This would be a number line with point A at 1/4
      options: ["1/4", "1/2", "3/4", "1"],
      correctAnswer: "1/4",
      explanation:
        "Point A is located at 1/4 of the way between 0 and 1 on the number line.",
    },
    {
      question: "Which point on the number line represents the fraction 2/3?",
      options: ["Point A", "Point B", "Point C", "Point D"],
      correctAnswer: "Point C",
      explanation:
        "Point C is located at 2/3 of the way between 0 and 1 on the number line.",
    },
    {
      question:
        "If a fraction is greater than 1, where is it located on the number line?",
      options: [
        "To the left of 0",
        "Between 0 and 1",
        "At exactly 1",
        "To the right of 1",
      ],
      correctAnswer: "To the right of 1",
      explanation:
        "Fractions greater than 1 (like 5/4 or 3/2) are located to the right of 1 on the number line.",
    },
    {
      question: "Which fraction is halfway between 0 and 1 on the number line?",
      options: ["1/4", "1/3", "1/2", "2/3"],
      correctAnswer: "1/2",
      explanation:
        "1/2 is located exactly halfway between 0 and 1 on the number line.",
    },
    {
      question:
        "Which of these fractions would be placed furthest to the right on a number line?",
      options: ["3/4", "5/8", "7/10", "2/3"],
      correctAnswer: "3/4",
      explanation:
        "3/4 = 0.75, which is greater than 5/8 (0.625), 7/10 (0.7), and 2/3 (0.667).",
    },
  ];

  const checkAnswer = (selectedOption: string) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback("success");
      setShowConfetti(true);
    } else {
      setShowFeedback("error");
    }

    // Move to next question after feedback
    setTimeout(() => {
      setShowFeedback(null);
      setShowConfetti(false);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  // Number line visualization component
  const NumberLine = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center mb-6">
        <div className="relative w-full max-w-md h-16">
          {/* Main line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-blue-600"></div>

          {/* Tick marks */}
          <div className="absolute top-4 left-0 w-1 h-8 bg-blue-600"></div>
          <div className="absolute top-4 left-1/4 w-1 h-8 bg-blue-600"></div>
          <div className="absolute top-4 left-1/2 w-1 h-8 bg-blue-600"></div>
          <div className="absolute top-4 left-3/4 w-1 h-8 bg-blue-600"></div>
          <div className="absolute top-4 right-0 w-1 h-8 bg-blue-600"></div>

          {/* Labels */}
          <div className="absolute top-14 left-0 text-sm font-bold -translate-x-1">
            0
          </div>
          <div className="absolute top-14 left-1/4 text-sm font-bold -translate-x-1">
            1/4
          </div>
          <div className="absolute top-14 left-1/2 text-sm font-bold -translate-x-1">
            1/2
          </div>
          <div className="absolute top-14 left-3/4 text-sm font-bold -translate-x-1">
            3/4
          </div>
          <div className="absolute top-14 right-0 text-sm font-bold -translate-x-1">
            1
          </div>

          {/* Point markers - these would change based on the question */}
          <motion.div
            className="absolute top-1 left-1/4 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center -translate-x-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            A
          </motion.div>
          <motion.div
            className="absolute top-1 left-2/4 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center -translate-x-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            B
          </motion.div>
          <motion.div
            className="absolute top-1 left-[67%] w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center -translate-x-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          >
            C
          </motion.div>
          <motion.div
            className="absolute top-1 left-[88%] w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center -translate-x-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          >
            D
          </motion.div>
        </div>
      </div>
    );
  };

  if (gameComplete) {
    return (
      <GameLayout
        title="Fractions on Number Line"
        subtitle="Great job completing all the questions!"
        currentQuestion={questions.length}
        totalQuestions={questions.length}
        score={score}
        maxScore={questions.length}
        showConfetti={true}
        backgroundColor="bg-gradient-to-br from-blue-50 to-blue-100"
        accentColor="blue"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Game Completed!
          </h2>
          <p className="text-lg mb-2">
            Your final score:{" "}
            <span className="font-bold text-blue-600">
              {score}/{questions.length}
            </span>
          </p>
          <p className="mb-6">
            {score === questions.length
              ? "Perfect score! You're a fraction master!"
              : `You got ${score} out of ${questions.length} questions correct.`}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <AnimatedButton
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setGameComplete(false);
              }}
              color="green"
              hoverEffect="bounce"
              icon={<Icon type="play" />}
            >
              Play Again
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push("/menu")}
              color="blue"
              hoverEffect="wobble"
              icon={<Icon type="home" />}
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      title="Fractions on Number Line"
      subtitle="Identify fractions on the number line"
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      score={score}
      maxScore={questions.length}
      showConfetti={showConfetti}
      showFeedback={showFeedback}
      feedbackMessage={
        showFeedback === "success"
          ? "Correct! " + questions[currentQuestion].explanation
          : showFeedback === "error"
          ? "Not quite. " + questions[currentQuestion].explanation
          : undefined
      }
      onFeedbackComplete={() => setShowFeedback(null)}
      backgroundColor="bg-gradient-to-br from-blue-50 to-blue-100"
      accentColor="blue"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Display the number line visualization */}
          {currentQuestion === 1 && <NumberLine />}

          {/* If there's an image for the question, display it */}
          {questions[currentQuestion].imageUrl && (
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={questions[currentQuestion].imageUrl}
                  alt="Number line illustration"
                  width={400}
                  height={100}
                  className="object-contain rounded-lg border-4 border-blue-200 bg-white p-2"
                />
              </motion.div>
            </div>
          )}

          {/* If question #0, 2, 3, 4 (which don't have the interactive visualization) */}
          {(currentQuestion === 0 || currentQuestion >= 2) &&
            !questions[currentQuestion].imageUrl && <NumberLine />}

          <MultipleQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            correctAnswer={questions[currentQuestion].correctAnswer}
            onSelect={checkAnswer}
            questionColor="secondary"
            colorVariation={true}
            containerClassName="max-w-2xl mx-auto"
          />
        </motion.div>
      </AnimatePresence>
    </GameLayout>
  );
};

export default Game3;
