// src/app/components/game/InteractiveFractionSVG.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

type FractionType = "circle" | "rectangle" | "hexagon";

interface FractionSegment {
  id: number;
  selected: boolean;
}

interface InteractiveFractionSVGProps {
  type: FractionType;
  segments: number;
  targetFraction: string;
  correctSegments: number;
  onAnswer: (isCorrect: boolean) => void;
  question: string;
  disabled?: boolean;
}

const InteractiveFractionSVG: React.FC<InteractiveFractionSVGProps> = ({
  type,
  segments,
  targetFraction,
  correctSegments,
  onAnswer,
  question,
  disabled = false,
}) => {
  // Initialize segments array with the specified number of segments
  const [fractionSegments, setFractionSegments] = useState<FractionSegment[]>(
    Array.from({ length: segments }, (_, i) => ({ id: i, selected: false }))
  );

  // Count the number of selected segments
  const selectedCount = fractionSegments.filter((seg) => seg.selected).length;

  // Handle segment selection
  const toggleSegment = (segmentId: number) => {
    if (disabled) return;

    setFractionSegments((prev) =>
      prev.map((segment) =>
        segment.id === segmentId
          ? { ...segment, selected: !segment.selected }
          : segment
      )
    );
  };

  // Check answer when user submits
  const checkAnswer = () => {
    if (disabled) return;
    const isCorrect = selectedCount === correctSegments;
    onAnswer(isCorrect);
  };

  // Reset selections
  const resetSelection = () => {
    if (disabled) return;
    setFractionSegments((prev) =>
      prev.map((segment) => ({ ...segment, selected: false }))
    );
  };

  // Render different SVG shapes based on the type
  const renderShapeFraction = () => {
    switch (type) {
      case "circle":
        return renderCircleFraction();
      case "rectangle":
        return renderRectangleFraction();
      case "hexagon":
        return renderHexagonFraction();
      default:
        return renderCircleFraction();
    }
  };

  // Render a circle divided into segments (like a pie chart)
  const renderCircleFraction = () => {
    const radius = 100;
    const centerX = radius;
    const centerY = radius;

    return (
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {fractionSegments.map((segment) => {
          const angle = (360 / segments) * segment.id;
          const nextAngle = (360 / segments) * (segment.id + 1);
          const startAngle = (angle * Math.PI) / 180;
          const endAngle = (nextAngle * Math.PI) / 180;

          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          const largeArcFlag = nextAngle - angle <= 180 ? 0 : 1;

          // Create path for pie slice
          const pathData = `
            M ${centerX} ${centerY}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `;

          return (
            <motion.path
              key={segment.id}
              d={pathData}
              fill={segment.selected ? "#EC4899" : "#FFFFFF"}
              stroke="#333333"
              strokeWidth="2"
              onClick={() => toggleSegment(segment.id)}
              whileHover={{
                scale: 1.05,
                fill: segment.selected ? "#DB2777" : "#FDF2F8",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ cursor: disabled ? "default" : "pointer" }}
            />
          );
        })}
      </svg>
    );
  };

  // Render a rectangle divided into segments
  const renderRectangleFraction = () => {
    const width = 200;
    const height = 100;
    const segmentWidth = width / segments;

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {fractionSegments.map((segment) => {
          const x = segment.id * segmentWidth;

          return (
            <motion.rect
              key={segment.id}
              x={x}
              y={0}
              width={segmentWidth}
              height={height}
              fill={segment.selected ? "#8B5CF6" : "#FFFFFF"}
              stroke="#333333"
              strokeWidth="2"
              onClick={() => toggleSegment(segment.id)}
              whileHover={{
                scale: 1.05,
                y: -5,
                fill: segment.selected ? "#7C3AED" : "#EDE9FE",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ cursor: disabled ? "default" : "pointer" }}
            />
          );
        })}
      </svg>
    );
  };

  // Render hexagon pattern (honeycomb-like)
  const renderHexagonFraction = () => {
    const hexSize = 40;
    const width = 250;
    const height = 220;

    // Function to create hexagon path
    const createHexagonPath = (centerX: number, centerY: number) => {
      let path = "";
      for (let i = 0; i < 6; i++) {
        const angle = (60 * i - 30) * (Math.PI / 180);
        const x = centerX + hexSize * Math.cos(angle);
        const y = centerY + hexSize * Math.sin(angle);
        path += i === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
      }
      return path + "Z";
    };

    // Create honeycomb arrangement
    const hexPositions = [
      // Top row
      { x: 65, y: 50 },
      { x: 145, y: 50 },
      // Middle row
      { x: 25, y: 110 },
      { x: 105, y: 110 },
      { x: 185, y: 110 },
      // Bottom row
      { x: 65, y: 170 },
      { x: 145, y: 170 },
    ];

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {fractionSegments.map((segment, idx) => {
          const position = hexPositions[idx % hexPositions.length];
          const hexPath = createHexagonPath(position.x, position.y);

          return (
            <motion.path
              key={segment.id}
              d={hexPath}
              fill={segment.selected ? "#FBBF24" : "#FFFFFF"}
              stroke="#333333"
              strokeWidth="2"
              onClick={() => toggleSegment(segment.id)}
              whileHover={{
                scale: 1.08,
                fill: segment.selected ? "#F59E0B" : "#FEF3C7",
                rotate: [0, 5, 0, -5, 0],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{ cursor: disabled ? "default" : "pointer" }}
            />
          );
        })}
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
          {question}
        </motion.p>
      </div>

      <motion.div
        className="p-4 bg-white rounded-xl border-2 border-gray-200 shadow-md"
        whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      >
        {renderShapeFraction()}
      </motion.div>

      <div className="text-center mb-4 p-3 bg-white rounded-lg shadow-sm mt-6">
        <p className="text-gray-600">
          Selected segments: {selectedCount} out of {segments}
        </p>
        <p className="text-xl font-bold text-pink-600">
          Current fraction: {selectedCount}/{segments}
        </p>
        <p className="text-gray-600">Target fraction: {targetFraction}</p>
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
          disabled={disabled || selectedCount === 0}
        >
          Reset
        </AnimatedButton>
      </div>
    </div>
  );
};

export default InteractiveFractionSVG;
