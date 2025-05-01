// DecimalMatchingGame.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../../components/molecules/AnimatedButton";
import Icon from "../../components/atoms/Icon";

interface FractionGroup {
  decimal: string;
  fractions: string[];
}

interface DecimalMatchingGameProps {
  question: {
    question: string;
    groups: FractionGroup[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const DecimalMatchingGame: React.FC<DecimalMatchingGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  // Create an array of all fractions from all groups
  const allFractions = question.groups.flatMap((group) => group.fractions);

  // Create a map of correct decimal values for each fraction
  const correctDecimalMap: Record<string, string> = {};
  question.groups.forEach((group) => {
    group.fractions.forEach((fraction) => {
      correctDecimalMap[fraction] = group.decimal;
    });
  });

  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [selectedFraction, setSelectedFraction] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Extract all unique decimal values
  const allDecimals = question.groups.map((group) => group.decimal);

  const selectFraction = (fraction: string) => {
    if (disabled || userMatches[fraction]) return;

    // If there's already a selected fraction, deselect it
    if (selectedFraction === fraction) {
      setSelectedFraction(null);
    } else {
      setSelectedFraction(fraction);
    }
  };

  const matchWithDecimal = (decimal: string) => {
    if (disabled || !selectedFraction) return;

    // Add the match
    const newMatches = { ...userMatches, [selectedFraction]: decimal };
    setUserMatches(newMatches);
    setSelectedFraction(null);

    // Check if all fractions are matched
    if (Object.keys(newMatches).length === allFractions.length) {
      setTimeout(() => {
        checkAllMatches(newMatches);
      }, 500);
    }
  };

  const checkAllMatches = (matches: Record<string, string>) => {
    // Verify all matches are correct
    let allCorrect = true;

    for (const fraction of allFractions) {
      if (
        !matches[fraction] ||
        matches[fraction] !== correctDecimalMap[fraction]
      ) {
        allCorrect = false;
        break;
      }
    }

    setIsComplete(true);
    setIsCorrect(allCorrect);
    setShowExplanation(true);

    // Report result to parent after showing explanation
    setTimeout(() => {
      onAnswer(allCorrect);
    }, 3000);
  };

  const resetMatches = () => {
    setUserMatches({});
    setSelectedFraction(null);
    setIsComplete(false);
    setShowExplanation(false);
  };

  // Create a map to count how many fractions are already matched to each decimal
  // This helps with visual feedback on the decimal buttons
  const decimalMatchCount: Record<string, number> = {};

  Object.values(userMatches).forEach((decimal) => {
    decimalMatchCount[decimal] = (decimalMatchCount[decimal] || 0) + 1;
  });

  // Find the correct group for each decimal
  const getCorrectGroupSize = (decimal: string): number => {
    const group = question.groups.find((g) => g.decimal === decimal);
    return group ? group.fractions.length : 0;
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-purple-700 mb-3">
        {question.question}
      </h3>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">
          Match each fraction with its equivalent decimal value. Some decimal
          values may match with multiple fractions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Fractions column */}
        <div className="flex-1 bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-bold mb-3 text-indigo-800">Fractions</h4>
          <div className="grid grid-cols-2 gap-2">
            {allFractions.map((fraction) => (
              <motion.button
                key={fraction}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedFraction === fraction
                    ? "bg-indigo-500 text-white shadow-md"
                    : userMatches[fraction]
                    ? "bg-green-100 border border-green-400"
                    : "bg-white border border-indigo-300 hover:bg-indigo-100"
                }`}
                whileHover={
                  !userMatches[fraction] && !disabled ? { scale: 1.03 } : {}
                }
                whileTap={
                  !userMatches[fraction] && !disabled ? { scale: 0.98 } : {}
                }
                onClick={() => selectFraction(fraction)}
                disabled={disabled || isComplete}
              >
                <span className="font-bold text-lg">{fraction}</span>
                {userMatches[fraction] && (
                  <div className="mt-1 text-sm text-green-700">
                    = {userMatches[fraction]}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Decimals column */}
        <div className="flex-1 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold mb-3 text-blue-800">Decimals</h4>
          <div className="grid grid-cols-1 gap-3">
            {allDecimals.map((decimal) => {
              const matchCount = decimalMatchCount[decimal] || 0;
              const maxMatches = getCorrectGroupSize(decimal);

              return (
                <div key={decimal} className="flex flex-col">
                  <motion.button
                    className={`p-3 rounded-lg text-center transition-colors ${
                      matchCount >= maxMatches
                        ? "bg-green-100 border border-green-400"
                        : "bg-white border border-blue-300 hover:bg-blue-100"
                    }`}
                    whileHover={
                      matchCount < maxMatches && !disabled && !isComplete
                        ? { scale: 1.03 }
                        : {}
                    }
                    whileTap={
                      matchCount < maxMatches && !disabled && !isComplete
                        ? { scale: 0.98 }
                        : {}
                    }
                    onClick={() => matchWithDecimal(decimal)}
                    disabled={
                      disabled ||
                      isComplete ||
                      !selectedFraction ||
                      matchCount >= maxMatches
                    }
                  >
                    <span className="font-bold text-lg">{decimal}</span>
                  </motion.button>

                  {/* Progress indicator showing how many matches are made vs. expected */}
                  <div className="mt-1 text-xs text-blue-700 text-center">
                    Matched: {matchCount} / {maxMatches}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex justify-center gap-4">
        <AnimatedButton
          onClick={resetMatches}
          color="blue"
          size="small"
          hoverEffect="wobble"
          disabled={
            disabled || Object.keys(userMatches).length === 0 || isComplete
          }
          icon={<Icon type="back" />}
        >
          Reset
        </AnimatedButton>
      </div>

      {/* Results and explanation */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg ${
            isCorrect
              ? "bg-green-100 border border-green-400 text-green-800"
              : "bg-red-100 border border-red-400 text-red-800"
          }`}
        >
          <h4 className="font-bold mb-2">
            {isCorrect
              ? "Great job! All matches are correct! 🎉"
              : "Some matches aren't quite right. 🤔"}
          </h4>

          {showExplanation && <p>{question.explanation}</p>}
        </motion.div>
      )}
    </div>
  );
};

export default DecimalMatchingGame;
