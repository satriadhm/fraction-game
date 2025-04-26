"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";

interface PizzaSliceGameProps {
  question: {
    instruction: string;
    totalSlices: number;
    correctSlices: number;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const PizzaSliceGame: React.FC<PizzaSliceGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

  const togglePizzaSlice = (index: number) => {
    if (disabled) return;

    setSelectedSlices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((slice) => slice !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const checkAnswer = () => {
    const isCorrect = selectedSlices.length === question.correctSlices;
    onAnswer(isCorrect);
  };

  const resetSelection = () => {
    setSelectedSlices([]);
  };

  // Render the pizza slices
  const renderPizzaSlices = () => {
    const slices = [];
    const radius = 120; // Size of the pizza
    const centerX = radius;
    const centerY = radius;

    for (let i = 0; i < question.totalSlices; i++) {
      const startAngle = (i * 360) / question.totalSlices;
      const endAngle = ((i + 1) * 360) / question.totalSlices;

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
          fill={selectedSlices.includes(i) ? "#FFA500" : "#F5DEB3"}
          stroke="#8B4513"
          strokeWidth="2"
          onClick={() => togglePizzaSlice(i)}
          className="pizza-slice cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      );
    }

    return slices;
  };

  return (
    <div className="w-full">
      <div className="relative mb-6 px-4 py-2 bg-yellow-100 rounded-xl border-2 border-yellow-200">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-pink-700"
        >
          {question.instruction}
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
          <circle cx="120" cy="120" r="120" fill="#8B4513" opacity="0.2" />
          {/* Render pizza slices */}
          {renderPizzaSlices()}
        </motion.svg>
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-600">
          Selected slices: {selectedSlices.length} out of {question.totalSlices}
        </p>
        <p className="text-xl font-bold text-pink-600">
          Current fraction: {selectedSlices.length}/{question.totalSlices}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        <AnimatedButton
          onClick={checkAnswer}
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
          disabled={disabled}
        >
          Check Answer
        </AnimatedButton>
        <AnimatedButton
          onClick={resetSelection}
          color="blue"
          size="small"
          hoverEffect="wobble"
          disabled={disabled || selectedSlices.length === 0}
        >
          Reset
        </AnimatedButton>
      </div>
    </div>
  );
};

export default PizzaSliceGame;
