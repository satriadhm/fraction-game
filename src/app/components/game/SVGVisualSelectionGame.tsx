// SVGVisualSelectionGame.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface FractionOption {
  label: string;
  numerator: number;
  denominator: number;
}

interface SVGVisualSelectionGameProps {
  question: {
    question: string;
    options: FractionOption[];
    correctAnswer: string;
    explanation: string;
  };
  selectedAnswer: string | null;
  onSelect: (label: string) => void;
  showExplanation: boolean;
}

const SVGVisualSelectionGame: React.FC<SVGVisualSelectionGameProps> = ({
  question,
  selectedAnswer,
  onSelect,
  showExplanation,
}) => {
  // Function to generate SVG fraction visualization
  const renderFractionSVG = (numerator: number, denominator: number) => {
    const svgSize = 100;
    const elements = [];

    // Determine the type of visualization based on denominator
    if (
      denominator === 2 ||
      denominator === 3 ||
      denominator === 4 ||
      denominator === 6 ||
      denominator === 8
    ) {
      // Use circle slices for these common fractions
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const radius = svgSize * 0.4;

      // Draw the circle outline
      elements.push(
        <circle
          key="outline"
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#6B7280"
          strokeWidth="2"
        />
      );

      // Draw the segments
      for (let i = 0; i < denominator; i++) {
        const startAngle = (i * 360) / denominator;
        const endAngle = ((i + 1) * 360) / denominator;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);

        // Draw lines from center to edge to create segments
        elements.push(
          <line
            key={`line-${i}`}
            x1={centerX}
            y1={centerY}
            x2={x1}
            y2={y1}
            stroke="#6B7280"
            strokeWidth="1.5"
          />
        );

        // Fill in the colored segments for the numerator
        if (i < numerator) {
          const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
          const x2 = centerX + radius * Math.cos(endRad);
          const y2 = centerY + radius * Math.sin(endRad);

          const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          elements.push(
            <path
              key={`slice-${i}`}
              d={pathData}
              fill="#8B5CF6"
              opacity="0.7"
            />
          );
        }
      }
    } else {
      // Use a rectangular grid for other fractions
      const numRows = Math.ceil(Math.sqrt(denominator));
      const numCols = Math.ceil(denominator / numRows);
      const cellSize = (svgSize - 10) / Math.max(numRows, numCols);

      let count = 0;
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          if (count < denominator) {
            const x = 5 + col * cellSize;
            const y = 5 + row * cellSize;

            // Draw rectangle for each part
            elements.push(
              <rect
                key={`rect-${count}`}
                x={x}
                y={y}
                width={cellSize - 2}
                height={cellSize - 2}
                stroke="#6B7280"
                strokeWidth="1"
                fill={count < numerator ? "#8B5CF6" : "none"}
                opacity={count < numerator ? "0.7" : "1"}
              />
            );

            count++;
          }
        }
      }
    }

    return (
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
      >
        {elements}
      </svg>
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-purple-700 mb-4">
        {question.question}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <div
            key={option.label}
            className={`cursor-pointer p-3 rounded-lg border-2 ${
              selectedAnswer === option.label
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            } transition-colors`}
            onClick={() => onSelect(option.label)}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                {renderFractionSVG(option.numerator, option.denominator)}
              </div>
              <span className="font-bold text-lg">{option.label}</span>
            </div>
          </div>
        ))}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-800"
        >
          <p>{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SVGVisualSelectionGame;
