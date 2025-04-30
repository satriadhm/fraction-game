"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

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

  // Render the pizza slices - improved to match PDF design with more circular shape
  const renderPizzaSlices = () => {
    const slices = [];
    const radius = 120; // Size of the pizza
    const centerX = radius;
    const centerY = radius;
    const strokeWidth = 2;
    
    // Pizza crust (outer circle)
    slices.push(
      <circle 
        key="crust" 
        cx={centerX} 
        cy={centerY} 
        r={radius-strokeWidth} 
        fill="#E3C097" 
        stroke="#8B4513" 
        strokeWidth={strokeWidth} 
      />
    );

    // Pizza slices (segments)
    for (let i = 0; i < question.totalSlices; i++) {
      const startAngle = (i * 360) / question.totalSlices;
      const endAngle = ((i + 1) * 360) / question.totalSlices;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + (radius-strokeWidth) * Math.cos(startRad);
      const y1 = centerY + (radius-strokeWidth) * Math.sin(startRad);
      const x2 = centerX + (radius-strokeWidth) * Math.cos(endRad);
      const y2 = centerY + (radius-strokeWidth) * Math.sin(endRad);

      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      // Draw the dividing lines for pizza slices
      slices.push(
        <line
          key={`line-${i}`}
          x1={centerX}
          y1={centerY}
          x2={x1}
          y2={y1}
          stroke="#8B4513"
          strokeWidth={strokeWidth}
        />
      );

      // For the click area, create a separate path for each slice
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius-strokeWidth} ${radius-strokeWidth} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      slices.push(
        <motion.path
          key={`slice-${i}`}
          d={pathData}
          fill={selectedSlices.includes(i) ? "#FFA500" : "transparent"}
          fillOpacity={selectedSlices.includes(i) ? 0.6 : 0}
          stroke="none"
          onClick={() => togglePizzaSlice(i)}
          className="pizza-slice cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
      );
    }

    return slices;
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

      <div className="flex justify-center mb-6">
        <motion.svg
          width="250"
          height="250"
          viewBox="0 0 240 240"
          className="drop-shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          {renderPizzaSlices()}
        </motion.svg>
      </div>

      <div className="text-center mb-4 p-3 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600">
          Selected slices: {selectedSlices.length} out of {question.totalSlices}
        </p>
        <p className="text-xl font-bold text-pink-600">
          Current fraction: {selectedSlices.length}/{question.totalSlices}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <AnimatedButton
          onClick={checkAnswer}
          color="orange"
          size="large"
          hoverEffect="bounce"
          icon={<Icon type="check" />}
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