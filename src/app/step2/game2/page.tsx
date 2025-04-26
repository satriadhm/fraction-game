"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  CuteStar,
  CuteHeart,
  ConfettiEffect,
  Typography,
  AnimatedButton,
  Icon,
  FeedbackPopup,
} from "@/app/components";
import CandyProgressBar from "@/app/components/game/CandyProgressBar";

// Define the game questions with their fraction strips and solutions
const gameQuestions = [
  {
    id: 1,
    question:
      "Choose the correct fractions strip to show the equivalent fractions.",
    targetFraction: { numerator: 1, denominator: 2 },
    options: [
      { id: "a", pieces: 2, parts: 1, color: "pink" },
      { id: "b", pieces: 4, parts: 2, color: "pink" },
      { id: "c", pieces: 6, parts: 3, color: "pink" },
      { id: "d", pieces: 3, parts: 1, color: "blue" },
      { id: "e", pieces: 6, parts: 2, color: "blue" },
      { id: "f", pieces: 8, parts: 4, color: "blue" },
    ],
    correctAnswers: ["b", "c"], // IDs of the correct options
    explanation: "1/2 = 2/4 = 3/6 because they all represent the same value.",
  },
  {
    id: 2,
    question: "Match the equivalent fractions by dragging the strips.",
    targetFraction: { numerator: 1, denominator: 3 },
    options: [
      { id: "a", pieces: 3, parts: 1, color: "pink" },
      { id: "b", pieces: 6, parts: 2, color: "pink" },
      { id: "c", pieces: 9, parts: 3, color: "pink" },
      { id: "d", pieces: 4, parts: 1, color: "blue" },
      { id: "e", pieces: 8, parts: 2, color: "blue" },
      { id: "f", pieces: 12, parts: 4, color: "blue" },
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "1/3 = 2/6 = 3/9 are all equivalent fractions.",
  },
  {
    id: 3,
    question: "Drag the equivalent fraction strips to the target area.",
    targetFraction: { numerator: 2, denominator: 4 },
    options: [
      { id: "a", pieces: 2, parts: 1, color: "pink" },
      { id: "b", pieces: 4, parts: 2, color: "pink" },
      { id: "c", pieces: 8, parts: 4, color: "pink" },
      { id: "d", pieces: 3, parts: 1, color: "blue" },
      { id: "e", pieces: 6, parts: 3, color: "blue" },
      { id: "f", pieces: 10, parts: 5, color: "blue" },
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "2/4 = 1/2 = 4/8 because they all represent the same value.",
  },
  {
    id: 4,
    question: "Find all the fractions equivalent to the target.",
    targetFraction: { numerator: 3, denominator: 4 },
    options: [
      { id: "a", pieces: 4, parts: 3, color: "pink" },
      { id: "b", pieces: 8, parts: 6, color: "pink" },
      { id: "c", pieces: 12, parts: 9, color: "pink" },
      { id: "d", pieces: 5, parts: 4, color: "blue" },
      { id: "e", pieces: 7, parts: 5, color: "blue" },
      { id: "f", pieces: 10, parts: 7, color: "blue" },
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "3/4 = 6/8 = 9/12 are all equivalent fractions.",
  },
  {
    id: 5,
    question: "Select the strips that show equivalent fractions.",
    targetFraction: { numerator: 1, denominator: 4 },
    options: [
      { id: "a", pieces: 4, parts: 1, color: "pink" },
      { id: "b", pieces: 8, parts: 2, color: "pink" },
      { id: "c", pieces: 12, parts: 3, color: "pink" },
      { id: "d", pieces: 2, parts: 1, color: "blue" },
      { id: "e", pieces: 5, parts: 1, color: "blue" },
      { id: "f", pieces: 16, parts: 4, color: "blue" },
    ],
    correctAnswers: ["a", "b", "f"],
    explanation: "1/4 = 2/8 = 4/16 all represent the same value.",
  },
];

const EquivalentFractionsGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    { id: string; pieces?: number; parts?: number; color?: string }[]
  >([]);
  const [dropAreaRef, setDropAreaRef] = useState<HTMLDivElement | null>(null);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null); // 'success', 'error', or null
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    pieces?: number;
    parts?: number;
    color?: string;
  } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const dropRef = useRef(null);

  useEffect(() => {
    // Set the drop area ref when the component mounts or when the question changes
    if (dropRef.current) {
      setDropAreaRef(dropRef.current);
    }
  }, [currentQuestionIndex]);

  // Add event listeners to track when dragging over drop area
  useEffect(() => {
    if (!dropAreaRef) return;

    const handleDragOver = () => {
      if (draggedItem) {
        setIsDraggingOver(true);
      }
    };

    const handleDragLeave = () => {
      setIsDraggingOver(false);
    };

    // Add event listeners
    dropAreaRef.addEventListener("dragover", handleDragOver);
    dropAreaRef.addEventListener("dragleave", handleDragLeave);

    // Cleanup function
    return () => {
      dropAreaRef.removeEventListener("dragover", handleDragOver);
      dropAreaRef.removeEventListener("dragleave", handleDragLeave);
    };
  }, [dropAreaRef, draggedItem]);

  const currentQuestion = gameQuestions[currentQuestionIndex];

  // Handle when an item starts being dragged
  const handleDragStart = (option: {
    id: string;
    pieces?: number;
    parts?: number;
    color?: string;
  }) => {
    setDraggedItem(option);
  };

  // Check if item was dropped in the drop area using getBoundingClientRect
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    option: { id: string; pieces?: number; parts?: number; color?: string }
  ) => {
    if (!dropAreaRef) return;

    const dropRect = dropAreaRef.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("clientX" in event && "clientY" in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if ("touches" in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      return; // Exit if coordinates cannot be determined
    }

    // Check if drop position is within the drop area bounds
    if (
      clientX >= dropRect.left &&
      clientX <= dropRect.right &&
      clientY >= dropRect.top &&
      clientY <= dropRect.bottom
    ) {
      // Successfully dropped in the target area
      if (!selectedOptions.some((item) => item.id === option.id)) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }

    setDraggedItem(null);
    setIsDraggingOver(false);
  };

  // Remove an item from the selection
  const handleRemoveSelection = (optionId: string) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option.id !== optionId)
    );
  };

  // Check the answer when user submits
  const handleCheckAnswer = () => {
    const selectedIds = selectedOptions.map((option) => option.id);
    const correctIds = currentQuestion.correctAnswers;

    // Check if all selected options are correct and if all correct options are selected
    const allSelectedAreCorrect = selectedIds.every((id) =>
      correctIds.includes(id)
    );
    const allCorrectAreSelected = correctIds.every((id) =>
      selectedIds.includes(id)
    );

    const isCorrect = allSelectedAreCorrect && allCorrectAreSelected;

    if (isCorrect) {
      setFeedback("success");
      setShowConfetti(true);
      setScore((prev) => prev + 1);
    } else {
      setFeedback("error");
    }

    // Move to next question after delay
    setTimeout(() => {
      setFeedback(null);
      setShowConfetti(false);
      setSelectedOptions([]);

      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  // Reset the game
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setFeedback(null);
    setShowConfetti(false);
    setScore(0);
    setGameComplete(false);
  };

  // Render a fraction strip
  type FractionOption = {
    id: string;
    pieces?: number;
    parts?: number;
    color?: string;
  };

  const renderFractionStrip = (option: FractionOption, inDropZone = false) => {
    const { pieces, parts, color } = option;
    const stripWidth = inDropZone ? 120 : 100;
    const stripHeight = inDropZone ? 30 : 25;

    const cells = [];
    for (let i = 0; i < (pieces ?? 0); i++) {
      const isFilled = i < (parts ?? 0);
      cells.push(
        <div
          key={i}
          className={`border border-gray-800 ${
            isFilled
              ? color === "pink"
                ? "bg-pink-400"
                : "bg-blue-500"
              : "bg-white"
          }`}
          style={{
            width: `${stripWidth / (pieces ?? 1)}px`,
            height: stripHeight,
          }}
        />
      );
    }

    return <div className="flex">{cells}</div>;
  };

  // If the game is complete, show the results
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
        <div className="relative max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border-4 border-pink-200">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6">
            <CuteStar size={50} color="#FCD34D" />
          </div>
          <div className="absolute -top-6 -right-6">
            <CuteHeart size={50} color="#EC4899" />
          </div>

          <ConfettiEffect show={true} duration={4} />

          <Typography variant="h1" color="primary" className="text-center mb-6">
            Game Completed!
          </Typography>

          <div className="flex flex-col items-center mb-8">
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
                  transition={{ duration: 1 }}
                />
                <motion.path
                  d="M70 100 L90 120 L130 80"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </svg>
            </div>

            <Typography variant="h2" color="primary" className="mb-2">
              Your Score:
            </Typography>
            <Typography variant="h1" color="primary" className="text-4xl mb-4">
              {score} / {gameQuestions.length}
            </Typography>

            <Typography
              variant="body1"
              color="secondary"
              className="mb-8 text-center"
            >
              {score === gameQuestions.length
                ? "Amazing! You're a master of equivalent fractions!"
                : score >= Math.floor(gameQuestions.length * 0.7)
                ? "Great job! You understand equivalent fractions well!"
                : "Good effort! Keep practicing to master equivalent fractions."}
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              onClick={handleReset}
              color="green"
              hoverEffect="bounce"
              icon={<Icon type="play" />}
            >
              Play Again
            </AnimatedButton>

            <AnimatedButton
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/menu";
                }
              }}
              color="pink"
              hoverEffect="wobble"
              icon={<Icon type="home" />}
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-8">
      <ConfettiEffect show={showConfetti} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <Typography
            variant="h1"
            color="primary"
            className="text-2xl sm:text-3xl font-bold text-pink-600"
            gutterBottom
          >
            Equivalent Fractions Game
          </Typography>

          <Typography
            variant="subtitle1"
            color="secondary"
            className="text-sm sm:text-base"
          >
            Drag the matching fraction strips to the drop area
          </Typography>
        </motion.div>

        {/* Progress tracker */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>
              Question {currentQuestionIndex + 1}/{gameQuestions.length}
            </span>
            <span>Score: {score}</span>
          </div>
          <CandyProgressBar
            progress={currentQuestionIndex + 1}
            total={gameQuestions.length}
            color="pink"
          />
        </motion.div>

        {/* Question area */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 mb-6"
        >
          <Typography
            variant="subtitle1"
            color="primary"
            className="mb-4 text-lg font-bold text-center"
          >
            {currentQuestion.question}
          </Typography>

          {/* Target fraction display */}
          <div className="flex justify-center items-center mb-6">
            <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300 text-center">
              <Typography variant="body1" className="mb-2 font-bold">
                Target Fraction:
              </Typography>
              <div className="flex justify-center mb-2">
                <div className="text-center inline-block">
                  <div className="text-3xl font-bold text-pink-600">
                    {currentQuestion.targetFraction.numerator}
                  </div>
                  <div className="border-t-2 border-pink-600 w-full"></div>
                  <div className="text-3xl font-bold text-pink-600">
                    {currentQuestion.targetFraction.denominator}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drop zone with enhanced visual feedback */}
          <div className="mb-6">
            <Typography
              variant="body2"
              color="secondary"
              className="mb-2 font-semibold text-center"
            >
              Drop equivalent fractions here:
            </Typography>
            <div
              ref={dropRef}
              className={`min-h-24 border-2 border-dashed rounded-lg p-4 flex flex-wrap gap-3 justify-center items-center transition-all duration-300 ${
                isDraggingOver
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : "border-blue-400 bg-blue-50"
              }`}
            >
              {draggedItem && isDraggingOver && (
                <div className="absolute inset-0 bg-green-100 bg-opacity-60 rounded-lg flex items-center justify-center z-0">
                  <Typography
                    variant="body1"
                    color="primary"
                    className="text-green-600 font-bold"
                  >
                    Release to drop here
                  </Typography>
                </div>
              )}
              {selectedOptions.length === 0 ? (
                <Typography
                  variant="body2"
                  color="secondary"
                  className="text-gray-500 italic"
                >
                  Drag fraction strips here...
                </Typography>
              ) : (
                selectedOptions.map((option) => (
                  <div
                    key={option.id}
                    className="relative bg-white p-2 rounded-md shadow-md"
                    onClick={() => handleRemoveSelection(option.id)}
                  >
                    {renderFractionStrip(option, true)}
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs cursor-pointer">
                      ×
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Options area with visual feedback for dragging */}
          <div className="mb-6">
            <Typography
              variant="body2"
              color="secondary"
              className="mb-2 font-semibold text-center"
            >
              Available fraction strips:
            </Typography>
            <div className="flex flex-wrap gap-4 justify-center">
              {currentQuestion.options.map((option) => {
                // Skip rendering if already selected
                if (
                  selectedOptions.some((selected) => selected.id === option.id)
                ) {
                  return null;
                }

                const isBeingDragged = draggedItem?.id === option.id;

                return (
                  <motion.div
                    key={option.id}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={1}
                    onDragStart={() => handleDragStart(option)}
                    onDragEnd={(event, info) =>
                      handleDragEnd(event, info, option)
                    }
                    whileDrag={{ scale: 1.1, zIndex: 10 }}
                    className={`p-2 shadow-md rounded-md cursor-grab touch-none transition-all duration-300 ${
                      isBeingDragged
                        ? "bg-yellow-100 border-2 border-yellow-400"
                        : "bg-white"
                    }`}
                  >
                    {renderFractionStrip(option)}
                    {isBeingDragged && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <AnimatedButton
              onClick={handleCheckAnswer}
              color="green"
              hoverEffect="bounce"
              icon={<Icon type="check" />}
              disabled={selectedOptions.length === 0}
            >
              Check Answer
            </AnimatedButton>

            <AnimatedButton
              onClick={() => setSelectedOptions([])}
              color="blue"
              hoverEffect="wobble"
              disabled={selectedOptions.length === 0}
            >
              Reset Selection
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <FeedbackPopup
          type={feedback}
          message={
            feedback === "success"
              ? `Correct! ${currentQuestion.explanation}`
              : `Try again. Hint: ${currentQuestion.explanation}`
          }
          show={true}
          duration={1}
          position="center"
          backdrop={true}
        />
      )}
    </div>
  );
};

export default EquivalentFractionsGame;
