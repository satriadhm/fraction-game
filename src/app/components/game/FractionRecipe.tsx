// FractionRecipeGame.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";

interface Step {
  instruction: string;
  options: string[];
  correctAnswer: string;
}

interface FractionRecipeGameProps {
  question: {
    initialFraction: string;
    targetFraction: string;
    steps: Step[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const FractionRecipeGame: React.FC<FractionRecipeGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Select answer for current step
  const selectAnswer = (option: string) => {
    if (disabled) return;

    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep < question.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Check if all answers are correct
      const allCorrect = question.steps.every(
        (step, index) => answers[index] === step.correctAnswer
      );

      setIsCorrect(allCorrect);
      setIsComplete(true);
      setShowExplanation(true);

      // Delay reporting to parent component to show explanation
      setTimeout(() => {
        onAnswer(allCorrect);
      }, 3000);
    }
  };

  // Show the current fraction state after each step
  const getCurrentFraction = () => {
    if (currentStep === 0) {
      return question.initialFraction;
    }

    // This is a simplified calculation - a real implementation would
    // actually compute the resulting fraction based on selected operations
    const stepsCompleted = Math.min(currentStep, answers.length);

    if (stepsCompleted === question.steps.length && isCorrect) {
      return question.targetFraction;
    }

    // Show intermediate steps - this is illustrative only
    // In a real implementation, you would calculate the actual resulting fraction
    const fractionParts = question.initialFraction.split("/");
    const targetParts = question.targetFraction.split("/");

    const progressRatio = stepsCompleted / question.steps.length;

    // Very simplified transition rendering - would be calculated based on actual math in real impl
    const numerator = Math.round(
      parseInt(fractionParts[0]) +
        progressRatio * (parseInt(targetParts[0]) - parseInt(fractionParts[0]))
    );

    const denominator = Math.round(
      parseInt(fractionParts[1]) +
        progressRatio * (parseInt(targetParts[1]) - parseInt(fractionParts[1]))
    );

    return `${numerator}/${denominator}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-purple-700 mb-2">
          Fraction Recipe Challenge
        </h2>
        <p className="text-purple-600">
          Turn{" "}
          <span className="font-bold text-lg">{question.initialFraction}</span>{" "}
          into{" "}
          <span className="font-bold text-lg">{question.targetFraction}</span>{" "}
          by following the recipe steps!
        </p>
      </div>

      {/* Recipe book visualization */}
      <div className="relative mb-8">
        {/* Recipe book */}
        <div className="bg-yellow-100 p-6 rounded-xl border-2 border-yellow-300 shadow-lg mx-auto max-w-md">
          {/* Current fraction display */}
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <p className="text-sm text-gray-600">Current Fraction:</p>
            <motion.div
              key={getCurrentFraction()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-pink-600"
            >
              {getCurrentFraction()}
            </motion.div>
          </div>

          {!isComplete ? (
            <>
              {/* Current step */}
              <div className="mb-4">
                <p className="font-bold text-purple-800 mb-2">
                  Step {currentStep + 1}:{" "}
                  {question.steps[currentStep].instruction}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {question.steps[currentStep].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => selectAnswer(option)}
                      className={`p-2 rounded-lg text-center transition-colors ${
                        answers[currentStep] === option
                          ? "bg-purple-500 text-white"
                          : "bg-white border border-purple-300 hover:bg-purple-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={disabled}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-end mt-4">
                <AnimatedButton
                  onClick={goToNextStep}
                  color="purple"
                  size="medium"
                  hoverEffect="bounce"
                  disabled={disabled || answers[currentStep] === undefined}
                  icon={<Icon type="next" />}
                >
                  {currentStep < question.steps.length - 1
                    ? "Next Step"
                    : "Finish Recipe"}
                </AnimatedButton>
              </div>
            </>
          ) : (
            /* Result screen */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">
                  {isCorrect
                    ? "Recipe Complete! 🎉"
                    : "Recipe Needs Adjustment 🧪"}
                </h3>
                <p>
                  {isCorrect
                    ? `You successfully turned ${question.initialFraction} into ${question.targetFraction}!`
                    : `Your steps didn't quite transform ${question.initialFraction} into ${question.targetFraction}.`}
                </p>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-800"
                >
                  <p>{question.explanation}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          📝
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{
            width: `${
              ((isComplete ? question.steps.length : currentStep) /
                question.steps.length) *
              100
            }%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center text-xs text-gray-500 mt-1">
        Step {currentStep + 1} of {question.steps.length}
      </div>
    </div>
  );
};

export default FractionRecipeGame;
