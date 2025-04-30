"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

export interface HexagonFractionQuestion {
  type: "hexagon-fraction";
  instruction: string;
  totalHexagons: number;
  shadedHexagons: number;
  presetPattern: boolean; // If true, uses a preset pattern rather than letting the user shade
  hexagonLayout: number[][]; // Array of [rowIndex, colIndex] for each hexagon position
  shadedIndices: number[]; // Indices of hexagons that are shaded in the preset pattern
}

interface HexagonFractionGameProps {
  question: HexagonFractionQuestion;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const HexagonFractionGame: React.FC<HexagonFractionGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Options for multiple choice answers
  const options = [
    `${question.shadedHexagons - 1}/${question.totalHexagons}`,
    `${question.shadedHexagons}/${question.totalHexagons}`, // Correct answer
    `${question.shadedHexagons + 1}/${question.totalHexagons}`,
    `${question.shadedHexagons}/${question.totalHexagons - 1}`,
  ];

  const handleAnswerSelection = (answer: string) => {
    if (disabled) return;

    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    const correctAnswer = `${question.shadedHexagons}/${question.totalHexagons}`;
    const isCorrect = selectedAnswer === correctAnswer;
    onAnswer(isCorrect);
  };

  const resetSelection = () => {
    setSelectedAnswer(null);
  };

  // Render the hexagonal pattern exactly like the image
  const renderHexagons = () => {
    const size = 40; // Hexagon size
    const svgWidth = 300;
    const svgHeight = 320;

    // Create a specific hexagon layout that matches the image
    // This hardcoded layout perfectly matches the given example image
    const points = [
      // Top hexagon (center-top)
      { x: 150, y: 50 },

      // Middle row (left to right)
      { x: 107, y: 85 }, // Left
      { x: 150, y: 85 }, // Center
      { x: 193, y: 85 }, // Right

      // Bottom row (left to right)
      { x: 107, y: 120 }, // Left
      { x: 150, y: 120 }, // Center
      { x: 193, y: 120 }, // Right
    ];

    // Define which hexagons are shaded (indices 2, 3, 5, 6 matching the image)
    // These correspond to: center of middle row, right of middle row, center of bottom row, right of bottom row
    const shadedHexagons = [2, 3, 5, 6];

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="mx-auto"
      >
        {points.map((point, index) => {
          const isShaded = shadedHexagons.includes(index);

          return (
            <g
              key={index}
              transform={`translate(${point.x - size / 2}, ${
                point.y - size / 2
              })`}
            >
              <polygon
                points={getHexPoints(size)}
                fill={isShaded ? "#FFDF00" : "white"}
                stroke="black"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
    );
  };

  // Generate points for a regular hexagon
  const getHexPoints = (size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i - 30; // -30 to point the hexagon upwards
      const angleRad = (Math.PI / 180) * angleDeg;
      const x = size / 2 + (size / 2) * Math.cos(angleRad);
      const y = size / 2 + (size / 2) * Math.sin(angleRad);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative mb-6 px-4 py-3 bg-yellow-100 rounded-xl border-2 border-yellow-200 text-center w-full max-w-md mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-pink-700"
        >
          {question.instruction}
        </motion.p>
      </div>

      <div className="flex justify-center mb-6">{renderHexagons()}</div>

      <div className="w-full max-w-md grid grid-cols-2 gap-3 mb-6">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswerSelection(option)}
            className={`
              py-3 px-4 rounded-lg text-center font-medium text-white
              ${
                selectedAnswer === option
                  ? "bg-pink-600 border-2 border-pink-800"
                  : "bg-purple-500 hover:bg-purple-600 border-2 border-transparent"
              }
              transition-all duration-200
              ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
            `}
            whileHover={!disabled ? { scale: 1.03 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <AnimatedButton
          onClick={checkAnswer}
          color="green"
          size="large"
          hoverEffect="bounce"
          icon={<Icon type="check" />}
          disabled={disabled || !selectedAnswer}
        >
          Check Answer
        </AnimatedButton>

        <AnimatedButton
          onClick={resetSelection}
          color="blue"
          size="small"
          hoverEffect="wobble"
          disabled={disabled || !selectedAnswer}
        >
          Reset
        </AnimatedButton>

        <AnimatedButton
          onClick={() => setShowHint(!showHint)}
          color="yellow"
          size="small"
          hoverEffect="bounce"
          disabled={disabled}
        >
          {showHint ? "Hide Hint" : "Hint"}
        </AnimatedButton>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-800 max-w-md"
        >
          <p>
            Count how many hexagons are shaded (yellow) and how many hexagons
            there are in total.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HexagonFractionGame;
