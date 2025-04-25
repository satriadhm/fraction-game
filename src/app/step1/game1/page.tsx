"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Game1 = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedPizzaSlices, setSelectedPizzaSlices] = useState<number[]>([]);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);

  // First set of questions - pizza slice coloring
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

  // Second set of questions - multiple choice
  const multipleChoiceQuestions = [
    {
      question: "What fraction of the pizza is shaded?",
      image: "/pizza-3-4.png", // 3/4 pizza shaded
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

  const togglePizzaSlice = (index: number) => {
    if (selectedPizzaSlices.includes(index)) {
      setSelectedPizzaSlices(
        selectedPizzaSlices.filter((slice) => slice !== index)
      );
    } else {
      setSelectedPizzaSlices([...selectedPizzaSlices, index]);
    }
  };

  const checkPizzaAnswer = () => {
    const currentPizzaQuestion = pizzaQuestions[currentQuestion];

    if (selectedPizzaSlices.length === currentPizzaQuestion.correctSlices) {
      setScore(score + 1);
      playCorrectSound();
    }

    moveToNextQuestion();
  };

  const checkMultipleChoiceAnswer = (selectedAnswer: string) => {
    const currentMCQuestion = multipleChoiceQuestions[currentQuestion];

    if (selectedAnswer === currentMCQuestion.correctAnswer) {
      setScore(score + 1);
      playCorrectSound();
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (!showMultipleChoice && nextQuestion >= pizzaQuestions.length) {
      // Switch to multiple choice questions
      setCurrentQuestion(0);
      setShowMultipleChoice(true);
      setSelectedPizzaSlices([]);
    } else if (
      showMultipleChoice &&
      nextQuestion >= multipleChoiceQuestions.length
    ) {
      // Show results
      setShowResults(true);
    } else {
      // Move to next question
      setCurrentQuestion(nextQuestion);
      setSelectedPizzaSlices([]);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setShowMultipleChoice(false);
    setSelectedPizzaSlices([]);
  };

  const playCorrectSound = () => {
    try {
      new Audio("/correct.mp3").play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const renderPizzaSlices = (totalSlices: number) => {
    const slices = [];
    const radius = 120; // Size of the pizza
    const centerX = radius;
    const centerY = radius;

    for (let i = 0; i < totalSlices; i++) {
      const startAngle = (i * 360) / totalSlices;
      const endAngle = ((i + 1) * 360) / totalSlices;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      slices.push(
        <path
          key={i}
          d={pathData}
          fill={selectedPizzaSlices.includes(i) ? "#FFA500" : "#F5DEB3"}
          stroke="#8B4513"
          strokeWidth="2"
          onClick={() => togglePizzaSlice(i)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
      );
    }

    return slices;
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Game Completed!</h1>
          <p className="text-xl mb-4">
            Your Score: {score} out of{" "}
            {pizzaQuestions.length + multipleChoiceQuestions.length}
          </p>

          <div className="flex space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartGame}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              Play Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/menu")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              Return to Menu
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Game: Fraction of Shape</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-bold">
            Question {currentQuestion + 1}/
            {showMultipleChoice
              ? multipleChoiceQuestions.length
              : pizzaQuestions.length}
          </span>
          <span className="text-lg">Score: {score}</span>
        </div>

        {!showMultipleChoice ? (
          <>
            <p className="text-xl font-bold mb-6 text-center">
              {pizzaQuestions[currentQuestion].instruction}
            </p>

            <div className="flex justify-center mb-6">
              <svg width="240" height="240" viewBox="0 0 240 240">
                {renderPizzaSlices(pizzaQuestions[currentQuestion].totalSlices)}
              </svg>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkPizzaAnswer}
                className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                Check Answer
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl font-bold mb-6 text-center">
              {multipleChoiceQuestions[currentQuestion].question}
            </p>

            {multipleChoiceQuestions[currentQuestion].image && (
              <div className="flex justify-center mb-6">
                <Image
                  src={multipleChoiceQuestions[currentQuestion].image}
                  alt="Question illustration"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 mt-4">
              {multipleChoiceQuestions[currentQuestion].options.map(
                (option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => checkMultipleChoiceAnswer(option)}
                    className="bg-blue-500 text-white p-3 rounded-lg text-left hover:bg-blue-600 transition-colors"
                  >
                    {option}
                  </motion.button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game1;
