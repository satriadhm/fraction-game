// src/app/components/game/VisualFractionBuilder.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

interface VisualFractionBuilderProps {
  question: {
    instruction: string;
    targetFraction: string;
    targetNumerator: number;
    targetDenominator: number;
    maxSections: number;
    shapeType: "circle" | "rectangle" | "hexagon";
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const VisualFractionBuilder: React.FC<VisualFractionBuilderProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState(question.maxSections);
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Handle section count change
  const handleSectionChange = (newSections: number) => {
    if (disabled) return;
    setSections(newSections);
    // Reset selections when changing sections
    setSelectedSections([]);
  };

  // Toggle a section's selection
  const toggleSection = (sectionIndex: number) => {
    if (disabled) return;

    setSelectedSections((prev) => {
      if (prev.includes(sectionIndex)) {
        return prev.filter((i) => i !== sectionIndex);
      } else {
        return [...prev, sectionIndex];
      }
    });
  };

  // Check the answer
  const checkAnswer = () => {
    // Current fraction is selectedSections.length / sections
    // Target fraction is targetNumerator / targetDenominator

    // Check if fractions are equivalent
    const currentNumerator = selectedSections.length;
    const currentDenominator = sections;

    const isEq =
      currentNumerator * question.targetDenominator ===
      question.targetNumerator * currentDenominator;

    setIsCorrect(isEq);
    setShowFeedback(true);

    // Report after a delay to show feedback
    setTimeout(() => {
      onAnswer(isEq);
    }, 2000);
  };

  // Reset selections
  const resetSelection = () => {
    setSelectedSections([]);
  };

  // Render the appropriate shape visualization
  const renderShapeVisualization = () => {
    switch (question.shapeType) {
      case "circle":
        return renderCircleVisualization();
      case "rectangle":
        return renderRectangleVisualization();
      case "hexagon":
        return renderHexagonVisualization();
      default:
        return renderCircleVisualization();
    }
  };

  // Render circle visualization (pie chart)
  const renderCircleVisualization = () => {
    const radius = 120;
    const centerX = radius;
    const centerY = radius;
    const slices = [];

    for (let i = 0; i < sections; i++) {
      const startAngle = (i * 360) / sections;
      const endAngle = ((i + 1) * 360) / sections;

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
          fill={selectedSections.includes(i) ? "#EC4899" : "#F9FAFB"}
          stroke="#9CA3AF"
          strokeWidth="1"
          onClick={() => toggleSection(i)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
        />
      );
    }

    return (
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {slices}
      </svg>
    );
  };

  // Render rectangle visualization (grid)
  const renderRectangleVisualization = () => {
    const width = 240;
    const height = 160;

    // Determine grid layout
    const rows = Math.floor(Math.sqrt(sections));
    const cols = Math.ceil(sections / rows);

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const cells = [];

    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (index < sections) {
          const x = col * cellWidth;
          const y = row * cellHeight;

          cells.push(
            <motion.rect
              key={index}
              x={x}
              y={y}
              width={cellWidth}
              height={cellHeight}
              fill={selectedSections.includes(index) ? "#8B5CF6" : "#F9FAFB"}
              stroke="#9CA3AF"
              strokeWidth="1"
              onClick={() => toggleSection(index)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            />
          );

          index++;
        }
      }
    }

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {cells}
      </svg>
    );
  };

  // Render hexagon visualization (honeycomb)
  const renderHexagonVisualization = () => {
    const width = 260;
    const height = 240;
    const hexSize = 40;
    const hexagons = [];

    // Create a honeycomb pattern
    // Define possible positions for hexagons
    const positions = [
      { x: 60, y: 50 },
      { x: 140, y: 50 },
      { x: 220, y: 50 },
      { x: 30, y: 110 },
      { x: 110, y: 110 },
      { x: 190, y: 110 },
      { x: 60, y: 170 },
      { x: 140, y: 170 },
      { x: 220, y: 170 },
      // Add more positions as needed
    ];

    // Use as many positions as sections needed
    for (let i = 0; i < Math.min(sections, positions.length); i++) {
      const { x, y } = positions[i];

      // Create hexagon points
      const points = [];
      for (let j = 0; j < 6; j++) {
        const angle = ((30 + j * 60) * Math.PI) / 180;
        points.push(
          `${x + hexSize * Math.cos(angle)},${y + hexSize * Math.sin(angle)}`
        );
      }

      hexagons.push(
        <motion.polygon
          key={i}
          points={points.join(" ")}
          fill={selectedSections.includes(i) ? "#FBBF24" : "#F9FAFB"}
          stroke="#9CA3AF"
          strokeWidth="1"
          onClick={() => toggleSection(i)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
        />
      );
    }

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {hexagons}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      <div className="relative mb-6 px-4 py-3 bg-indigo-100 rounded-xl border-2 border-indigo-200 text-center w-full max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-indigo-700"
        >
          {question.instruction}
        </motion.p>
        <p className="text-indigo-600 mt-2">
          Target fraction:{" "}
          <span className="font-bold">{question.targetFraction}</span>
        </p>
      </div>

      <div className="flex flex-col items-center mb-6">
        {/* Visualization container */}
        <motion.div
          className="p-6 bg-white rounded-xl border-2 border-gray-200 shadow-md mb-4"
          whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        >
          {renderShapeVisualization()}
        </motion.div>

        {/* Section controls */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-700 font-medium">Total sections:</span>
          <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
            {[2, 3, 4, 6, 8, 9, 12].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 ${
                  sections === num
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleSectionChange(num)}
                disabled={disabled}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Current fraction display */}
        <div className="text-center bg-gray-50 p-3 rounded-lg shadow-sm">
          <p className="text-gray-600">
            Selected:{" "}
            <span className="font-medium">{selectedSections.length}</span> out
            of <span className="font-medium">{sections}</span> sections
          </p>
          <div className="text-3xl font-bold text-indigo-600 mt-1">
            {selectedSections.length}/{sections}
          </div>
        </div>
      </div>

      {/* Feedback area */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 rounded-lg w-full max-w-md text-center ${
            isCorrect
              ? "bg-green-100 border border-green-300 text-green-700"
              : "bg-red-100 border border-red-300 text-red-700"
          }`}
        >
          <p className="font-bold mb-1">
            {isCorrect ? "Correct! 🎉" : "Not quite right 🤔"}
          </p>
          <p>{question.explanation}</p>
        </motion.div>
      )}

      {/* Control buttons */}
      <div className="flex gap-3 justify-center">
        <AnimatedButton
          onClick={checkAnswer}
          color="indigo"
          size="large"
          hoverEffect="bounce"
          icon={<Icon type="check" />}
          disabled={disabled || selectedSections.length === 0}
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

export default VisualFractionBuilder;
