
// src/app/components/game/StripFractionGame.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

export interface StripFractionQuestion {
  type: "strip";
  instruction: string;
  totalSections: number;
  correctSections: number;
  rows?: number;
}

interface StripFractionGameProps {
  question: StripFractionQuestion;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const StripFractionGame: React.FC<StripFractionGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const rows = question.rows || 1; // Default to 1 row if not specified

  const toggleSection = (index: number) => {
    if (disabled) return;

    setSelectedSections((prev) => {
      if (prev.includes(index)) {
        return prev.filter((section) => section !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const checkAnswer = () => {
    const isCorrect = selectedSections.length === question.correctSections;
    onAnswer(isCorrect);
  };

  const resetSelection = () => {
    setSelectedSections([]);
  };

  // Render the rectangular strip sections
  const renderSections = () => {
    const totalSections = question.totalSections;
    const sectionsPerRow = totalSections / rows;
    
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex w-full mb-1">
        {Array.from({ length: sectionsPerRow }).map((_, colIndex) => {
          const sectionIndex = rowIndex * sectionsPerRow + colIndex;
          const isSelected = selectedSections.includes(sectionIndex);
          
          return (
            <motion.div
              key={sectionIndex}
              className={`
                border border-gray-400 cursor-pointer
                ${isSelected ? 'bg-orange-400' : 'bg-white'}
                transition-colors duration-200
              `}
              style={{
                width: `${100 / sectionsPerRow}%`,
                height: '60px',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSection(sectionIndex)}
            />
          );
        })}
      </div>
    ));
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

      <div className="flex justify-center mb-6 w-full max-w-md">
        <motion.div
          className="w-full border-4 border-gray-500 rounded-md overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          {renderSections()}
        </motion.div>
      </div>

      <div className="text-center mb-4 p-3 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600">
          Selected sections: {selectedSections.length} out of {question.totalSections}
        </p>
        <p className="text-xl font-bold text-pink-600">
          Current fraction: {selectedSections.length}/{question.totalSections}
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
          disabled={disabled || selectedSections.length === 0}
        >
          Reset
        </AnimatedButton>
      </div>
    </div>
  );
};

export default StripFractionGame;