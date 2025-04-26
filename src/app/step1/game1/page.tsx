"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import CuteDecorationEffect from "../../components/organisms/CuteDecorationEffect";
import { CuteStar } from "../../components/atoms/CuteShapes";
import ProgressBar from "../../components/molecules/ProgressBar";

// Custom candy-style progress bar component using ProgressBar
const CandyProgressBar = ({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) => {
  return (
    <ProgressBar
      value={progress}
      max={total}
      variant="candy"
      color="pink"
      height={10}
    />
  );
};

const Game1 = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedPizzaSlices, setSelectedPizzaSlices] = useState<number[]>([]);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);
  const [showFeedback, setShowFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [confetti, setConfetti] = useState(false);

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

  // Show confetti effect when answering correctly
  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  // Reset feedback after showing
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

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
    const isCorrect =
      selectedPizzaSlices.length === currentPizzaQuestion.correctSlices;

    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback("correct");
      setConfetti(true);
      playCorrectSound();
    } else {
      setShowFeedback("incorrect");
    }

    // Wait for feedback animation to complete before moving to next question
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  const checkMultipleChoiceAnswer = (selectedAnswer: string) => {
    const currentMCQuestion = multipleChoiceQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentMCQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback("correct");
      setConfetti(true);
      playCorrectSound();
    } else {
      setShowFeedback("incorrect");
    }

    // Wait for feedback animation to complete before moving to next question
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
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
    setShowFeedback(null);
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
        <motion.path
          key={i}
          d={pathData}
          fill={selectedPizzaSlices.includes(i) ? "#FFA500" : "#F5DEB3"}
          stroke="#8B4513"
          strokeWidth="2"
          onClick={() => togglePizzaSlice(i)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        />
      );
    }

    return slices;
  };

  // Confetti effect component
  const Confetti = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: [
                "#FF5E5B", // red
                "#D8D8D8", // silver
                "#FFED66", // yellow
                "#00CECB", // teal
                "#FFAAFF", // pink
              ][Math.floor(Math.random() * 5)],
              top: `${Math.random() * 20 - 10}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0vh", "100vh"],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    );
  };

  if (showResults) {
    return (
      <CuteDecorationEffect
        numItems={10}
        theme="mixed"
        className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-100"
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md relative border-4 border-pink-200"
          >
            <div className="absolute -top-6 -left-6">
              <CuteStar size={50} color="#FCD34D" />
            </div>
            <div className="absolute -top-6 -right-6">
              <CuteStar size={50} color="#FCD34D" />
            </div>

            <h1 className="text-3xl font-bold mb-4 text-pink-600">
              Amazing Job!
            </h1>
            <div className="relative mb-8">
              <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto">
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                  d="M70 100 L90 120 L130 80"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-2xl font-bold mb-2 text-purple-700">
                Your Score:
              </p>
              <p className="text-4xl font-extrabold mb-4 text-pink-600">
                {score} /{" "}
                {pizzaQuestions.length + multipleChoiceQuestions.length}
              </p>

              <p className="text-gray-700 mb-6">
                {score >= 7
                  ? "Fantastic! You're a fraction master!"
                  : score >= 5
                  ? "Great job! Keep practicing!"
                  : "Good try! Let's practice more!"}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                onClick={restartGame}
                color="green"
                hoverEffect="bounce"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0114 0V5a1 1 0 112 0v2.101a9.005 9.005 0 00-2.092 12.09A1 1 0 0118 20H2a1 1 0 01-.707-1.707A9 9 0 014 4.102V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Play Again
              </AnimatedButton>

              <AnimatedButton
                onClick={() => router.push("/menu")}
                color="pink"
                hoverEffect="wobble"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Return to Menu
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </CuteDecorationEffect>
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
      {confetti && <Confetti />}

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
              Question {currentQuestion + 1}/
              {showMultipleChoice
                ? multipleChoiceQuestions.length
                : pizzaQuestions.length}
            </span>
            <span>Score: {score}</span>
          </div>
          <CandyProgressBar
            progress={currentQuestion + 1}
            total={
              showMultipleChoice
                ? multipleChoiceQuestions.length
                : pizzaQuestions.length
            }
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
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl backdrop-blur-sm ${
                  showFeedback === "correct"
                    ? "bg-green-400/30"
                    : "bg-red-400/30"
                }`}
              >
                <div
                  className={`p-6 rounded-full ${
                    showFeedback === "correct" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <motion.div
                    animate={
                      showFeedback === "correct"
                        ? { rotate: [0, 10, -10, 0] }
                        : { x: [0, -10, 10, -10, 10, 0] }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {showFeedback === "correct" ? (
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
          </AnimatePresence>

          {/* Pizza slice questions */}
          {!showMultipleChoice ? (
            <>
              <div className="relative mb-6 px-4 py-2 bg-yellow-100 rounded-xl border-2 border-yellow-200">
                <motion.p
                  key={currentQuestion}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold text-center text-pink-700"
                >
                  {pizzaQuestions[currentQuestion].instruction}
                </motion.p>
              </div>

              <div className="flex justify-center mb-6">
                <motion.svg
                  width="240"
                  height="240"
                  viewBox="0 0 240 240"
                  className="drop-shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Pizza base circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="120"
                    fill="#8B4513"
                    opacity="0.2"
                  />
                  {/* Render pizza slices */}
                  {renderPizzaSlices(
                    pizzaQuestions[currentQuestion].totalSlices
                  )}
                </motion.svg>
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-600">
                  Selected slices: {selectedPizzaSlices.length} out of{" "}
                  {pizzaQuestions[currentQuestion].totalSlices}
                </p>
                <p className="text-xl font-bold text-pink-600">
                  Current fraction: {selectedPizzaSlices.length}/
                  {pizzaQuestions[currentQuestion].totalSlices}
                </p>
              </div>

              <div className="flex justify-center">
                <AnimatedButton
                  onClick={checkPizzaAnswer}
                  color="orange"
                  size="large"
                  hoverEffect="bounce"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                >
                  Check Answer
                </AnimatedButton>
              </div>
            </>
          ) : (
            <>
              {/* Multiple choice questions */}
              <div className="relative mb-6 px-4 py-3 bg-purple-100 rounded-xl border-2 border-purple-200">
                <motion.p
                  key={`mc-${currentQuestion}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold text-center text-purple-700"
                >
                  {multipleChoiceQuestions[currentQuestion].question}
                </motion.p>
              </div>

              {multipleChoiceQuestions[currentQuestion].image && (
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={multipleChoiceQuestions[currentQuestion].image}
                      alt="Question illustration"
                      width={160}
                      height={160}
                      className="object-contain rounded-lg border-4 border-pink-200 bg-white p-2"
                    />
                  </motion.div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 mt-4">
                {multipleChoiceQuestions[currentQuestion].options.map(
                  (option, index) => (
                    <AnimatedButton
                      key={index}
                      onClick={() => checkMultipleChoiceAnswer(option)}
                      color={
                        ["pink", "purple", "blue", "green"][index % 4] as
                          | "pink"
                          | "purple"
                          | "blue"
                          | "green"
                      }
                      hoverEffect={
                        ["grow", "wobble", "bounce", "shake"][index % 4] as
                          | "grow"
                          | "wobble"
                          | "bounce"
                          | "shake"
                      }
                      className="text-left flex items-center py-4"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white text-pink-600 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </AnimatedButton>
                  )
                )}
              </div>
            </>
          )}
        </motion.div>

        {/* Back button */}
        <div className="mt-6 text-center">
          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="small"
            hoverEffect="wobble"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Back to Menu
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Game1;
