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

  // Calculate position for each hexagon (using offset coordinates for hexagonal grid)
  const getHexagonPosition = (
    rowIndex: number,
    colIndex: number,
    size: number
  ) => {
    // For a pointy-top hexagon grid
    // Offset every other row to create a hexagonal pattern
    const xOffset = colIndex * size * 1.5;
    const yOffset = rowIndex * size * Math.sqrt(3);

    // Offset every other row
    const offset = rowIndex % 2 === 0 ? 0 : size * 0.75;

    return {
      x: xOffset + offset,
      y: yOffset,
    };
  };

  // Create the SVG path for a hexagon
  const createHexagonPath = (
    centerX: number,
    centerY: number,
    size: number
  ) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i - 30; // -30 to point the hexagon upwards
      const angleRad = (Math.PI / 180) * angleDeg;
      const x = centerX + size * Math.cos(angleRad);
      const y = centerY + size * Math.sin(angleRad);
      points.push(`${x},${y}`);
    }
    return `M${points.join(" L")}Z`;
  };

  // Render the hexagonal pattern
  const renderHexagons = () => {
    const size = 40; // Hexagon size
    const svgWidth = 350;
    const svgHeight = 350;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="mx-auto"
      >
        <g transform={`translate(${centerX - 125}, ${centerY - 120})`}>
          {question.hexagonLayout.map((position, index) => {
            const [rowIndex, colIndex] = position;
            const { x, y } = getHexagonPosition(rowIndex, colIndex, size);
            const isShaded = question.shadedIndices.includes(index);

            return (
              <path
                key={index}
                d={createHexagonPath(x, y, size)}
                fill={isShaded ? "#FFDF00" : "white"}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </g>
      </svg>
    );
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
