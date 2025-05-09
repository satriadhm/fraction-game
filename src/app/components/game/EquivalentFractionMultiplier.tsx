// src/app/components/game/EquivalentFractionMultiplier.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

interface EquivalentFractionMultiplierProps {
  question: {
    instruction: string;
    startFraction: {
      numerator: number;
      denominator: number;
    };
    targetFraction: {
      numerator: number;
      denominator: number;
    };
    possibleMultipliers: number[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const EquivalentFractionMultiplier: React.FC<
  EquivalentFractionMultiplierProps
> = ({ question, onAnswer, disabled = false }) => {
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(
    null
  );
  const [currentFraction, setCurrentFraction] = useState({
    numerator: question.startFraction.numerator,
    denominator: question.startFraction.denominator,
  });
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animated, setAnimated] = useState(false);

  // Reset state when the question changes
  useEffect(() => {
    setSelectedMultiplier(null);
    setCurrentFraction({
      numerator: question.startFraction.numerator,
      denominator: question.startFraction.denominator,
    });
    setShowResult(false);
    setShowExplanation(false);
    setIsCorrect(false);
    setAnimated(false);
  }, [question]);

  const handleMultiplierSelect = (multiplier: number) => {
    if (disabled) return;

    setSelectedMultiplier(multiplier);

    // Calculate the new fraction by multiplying
    const newNumerator = question.startFraction.numerator * multiplier;
    const newDenominator = question.startFraction.denominator * multiplier;

    // Start the animation
    setAnimated(true);

    // After animation, update the current fraction
    setTimeout(() => {
      setCurrentFraction({
        numerator: newNumerator,
        denominator: newDenominator,
      });
      setShowResult(true);

      // Check if the result matches the target fraction
      const isMatchingTarget =
        newNumerator === question.targetFraction.numerator &&
        newDenominator === question.targetFraction.denominator;

      setIsCorrect(isMatchingTarget);

      // Show explanation after a delay
      setTimeout(() => {
        setShowExplanation(true);

        // Report result to parent component after explanation is shown
        setTimeout(() => {
          onAnswer(isMatchingTarget);
        }, 2000);
      }, 1000);
    }, 1500); // Match this with the animation duration
  };

  const resetSelection = () => {
    setSelectedMultiplier(null);
    setCurrentFraction({
      numerator: question.startFraction.numerator,
      denominator: question.startFraction.denominator,
    });
    setShowResult(false);
    setShowExplanation(false);
    setAnimated(false);
  };

  // Render the visualization of multiplication
  const renderMultiplicationVisualization = () => {
    if (!selectedMultiplier) return null;

    return (
      <div className="flex items-center justify-center my-4">
        <div className="text-center p-3 bg-white rounded-lg shadow-md">
          <div className="text-2xl font-medium mb-2">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span>{question.startFraction.numerator}</span>
                <div className="w-12 h-0.5 bg-black"></div>
                <span>{question.startFraction.denominator}</span>
              </div>

              <span className="mx-4">×</span>

              <div className="flex flex-col items-center">
                <motion.span
                  initial={{ scale: 1 }}
                  animate={animated ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 1 }}
                >
                  {selectedMultiplier}
                </motion.span>
                <div className="w-8 h-0.5 bg-black"></div>
                <motion.span
                  initial={{ scale: 1 }}
                  animate={animated ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 1 }}
                >
                  {selectedMultiplier}
                </motion.span>
              </div>

              <span className="mx-4">=</span>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <span>{currentFraction.numerator}</span>
                    <div className="w-12 h-0.5 bg-black"></div>
                    <span>{currentFraction.denominator}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render visual representation of the equivalence
  const renderFractionVisual = (
    numerator: number,
    denominator: number,
    color: string = "bg-purple-400"
  ) => {
    const blocks = [];

    for (let i = 0; i < denominator; i++) {
      blocks.push(
        <div
          key={i}
          className={`h-8 border border-gray-300 ${
            i < numerator ? color : "bg-white"
          }`}
          style={{ width: `${100 / denominator}%` }}
        ></div>
      );
    }

    return <div className="flex w-full max-w-xs mx-auto">{blocks}</div>;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
        {question.instruction}
      </h3>

      <div className="mb-6">
        <div className="flex flex-col items-center mb-4">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Starting Fraction: {question.startFraction.numerator}/
            {question.startFraction.denominator}
          </h4>
          {renderFractionVisual(
            question.startFraction.numerator,
            question.startFraction.denominator,
            "bg-blue-400"
          )}
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Target Fraction: {question.targetFraction.numerator}/
            {question.targetFraction.denominator}
          </h4>
          {renderFractionVisual(
            question.targetFraction.numerator,
            question.targetFraction.denominator,
            "bg-pink-400"
          )}
        </div>
      </div>

      {/* Math operation visualization */}
      {renderMultiplicationVisualization()}

      {/* Multiplier selection */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2 text-center">
          Select a multiplier to transform the fraction:
        </h4>

        <div className="grid grid-cols-4 gap-2">
          {question.possibleMultipliers.map((multiplier) => (
            <motion.button
              key={multiplier}
              onClick={() => handleMultiplierSelect(multiplier)}
              className={`
                p-3 rounded-lg text-center text-xl font-bold
                ${
                  selectedMultiplier === multiplier
                    ? "bg-purple-600 text-white"
                    : "bg-white border-2 border-purple-300 text-purple-600"
                }
                ${
                  disabled ||
                  (selectedMultiplier !== null &&
                    selectedMultiplier !== multiplier)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-100"
                }
              `}
              whileHover={
                !disabled && selectedMultiplier === null ? { scale: 1.05 } : {}
              }
              whileTap={
                !disabled && selectedMultiplier === null ? { scale: 0.95 } : {}
              }
              disabled={disabled || selectedMultiplier !== null}
            >
              × {multiplier}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Result and explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              isCorrect
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="font-bold">
              {isCorrect ? "Correct! 🎉" : "Not quite right... 🤔"}
            </p>
            <p className="mt-1">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      <div className="flex justify-center">
        <AnimatedButton
          onClick={resetSelection}
          color="blue"
          size="medium"
          hoverEffect="wobble"
          disabled={disabled || selectedMultiplier === null}
          icon={<Icon type="back" />}
        >
          Try Again
        </AnimatedButton>
      </div>
    </div>
  );
};

export default EquivalentFractionMultiplier;
