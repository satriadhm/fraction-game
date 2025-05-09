// src/app/components/game/FractionDragDropGame.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

interface FractionPiece {
  id: string;
  value: string;
  image: React.ReactNode;
}

interface DropZone {
  id: string;
  label: string;
  accepts: string;
}

interface FractionDragDropGameProps {
  question: {
    instruction: string;
    pieces: FractionPiece[];
    dropZones: DropZone[];
    explanation: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const FractionDragDropGame: React.FC<FractionDragDropGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reset the game when a new question is received
  useEffect(() => {
    setPlacements({});
    setShowFeedback(false);
  }, [question]);

  const handleDragStart = (id: string) => {
    if (disabled) return;
    setDraggedItem(id);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (zoneId: string) => {
    if (disabled || !draggedItem) return;
    
    // If this item is already placed somewhere, remove it
    const existingPlacement = Object.entries(placements).find(
      ([value]) => value === draggedItem
    );
    
    if (existingPlacement) {
      const updatedPlacements = { ...placements };
      delete updatedPlacements[existingPlacement[0]];
      setPlacements(updatedPlacements);
    }
    
    // Place the item in the new zone
    setPlacements({
      ...placements,
      [zoneId]: draggedItem,
    });
    
    setDraggedItem(null);
  };

  const isPieceInDropZone = (pieceId: string) => {
    return Object.values(placements).includes(pieceId);
  };

  const getDropZoneContent = (zoneId: string) => {
    const pieceId = placements[zoneId];
    if (!pieceId) return null;
    
    const piece = question.pieces.find((p) => p.id === pieceId);
    return piece ? piece.image : null;
  };

  const checkAnswer = () => {
    // Check if all zones have correct placements
    const allCorrect = question.dropZones.every((zone) => {
      const placedPieceId = placements[zone.id];
      if (!placedPieceId) return false;
      
      const placedPiece = question.pieces.find((p) => p.id === placedPieceId);
      return placedPiece && placedPiece.value === zone.accepts;
    });
    
    setIsCorrect(allCorrect);
    setShowFeedback(true);
    
    // Delay reporting to parent to show feedback first
    setTimeout(() => {
      onAnswer(allCorrect);
    }, 2000);
  };

  const resetPlacements = () => {
    setPlacements({});
  };

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      <div className="relative mb-6 px-4 py-3 bg-purple-100 rounded-xl border-2 border-purple-200 text-center w-full max-w-md mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-purple-700"
        >
          {question.instruction}
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full max-w-2xl">
        {/* Available pieces */}
        <div className="md:w-1/2 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-700 mb-3">Fraction Pieces</h3>
          <div className="grid grid-cols-2 gap-4">
            {question.pieces.map((piece) => (
              <motion.div
                key={piece.id}
                drag={!isPieceInDropZone(piece.id) && !disabled}
                dragConstraints={containerRef}
                onDragStart={() => handleDragStart(piece.id)}
                onDragEnd={handleDragEnd}
                className={`
                  p-3 bg-white rounded-lg shadow-md cursor-grab border-2 
                  ${draggedItem === piece.id ? "border-blue-500" : "border-gray-200"}
                  ${isPieceInDropZone(piece.id) ? "opacity-50 cursor-not-allowed" : ""}
                `}
                whileHover={{ scale: isPieceInDropZone(piece.id) || disabled ? 1 : 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-16 flex items-center justify-center">
                    {piece.image}
                  </div>
                  <span className="mt-2 text-center font-medium text-gray-700">
                    {piece.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Drop zones */}
        <div className="md:w-1/2 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
          <h3 className="text-lg font-bold text-purple-700 mb-3">Drop Zones</h3>
          <div className="space-y-4">
            {question.dropZones.map((zone) => (
              <div
                key={zone.id}
                className="relative"
              >
                <motion.div
                  className={`
                    p-4 h-24 bg-white rounded-lg border-2 border-dashed
                    flex items-center justify-center
                    ${draggedItem ? "border-green-400" : "border-gray-300"}
                  `}
                  whileHover={{ borderColor: draggedItem ? "#10B981" : "#9CA3AF" }}
                  onHoverStart={() => draggedItem && handleDrop(zone.id)}
                >
                  {getDropZoneContent(zone.id) || (
                    <p className="text-gray-400">{zone.label}</p>
                  )}
                </motion.div>
              </div>
            ))}
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
          color="purple"
          size="large"
          hoverEffect="bounce"
          icon={<Icon type="check" />}
          disabled={disabled || Object.keys(placements).length < question.dropZones.length}
        >
          Check Answer
        </AnimatedButton>

        <AnimatedButton
          onClick={resetPlacements}
          color="blue"
          size="small"
          hoverEffect="wobble"
          disabled={disabled || Object.keys(placements).length === 0}
        >
          Reset
        </AnimatedButton>
      </div>
    </div>
  );
};

// SVG fraction visualizations
export const CircleFraction = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  const size = 60;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  const elements = [];
  
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
    
    // Draw lines from center to edge
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
    
    // Fill in colored segments for the numerator
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
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {elements}
    </svg>
  );
};

// Rectangle fraction visualization
export const RectangleFraction = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  const width = 70;
  const height = 50;
  const elements = [];
  
  // Draw the rectangle outline
  elements.push(
    <rect
      key="outline"
      width={width}
      height={height}
      stroke="#6B7280"
      strokeWidth="2"
      fill="none"
    />
  );
  
  // Draw the segments
  const segmentWidth = width / denominator;
  for (let i = 0; i < denominator; i++) {
    // Vertical dividing lines
    if (i > 0) {
      elements.push(
        <line
          key={`divider-${i}`}
          x1={i * segmentWidth}
          y1={0}
          x2={i * segmentWidth}
          y2={height}
          stroke="#6B7280"
          strokeWidth="1.5"
        />
      );
    }
    
    // Colored segments for numerator
    if (i < numerator) {
      elements.push(
        <rect
          key={`segment-${i}`}
          x={i * segmentWidth}
          y={0}
          width={segmentWidth}
          height={height}
          fill="#EC4899"
          opacity="0.7"
        />
      );
    }
  }
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {elements}
    </svg>
  );
};

// Hexagon pattern visualization
export const HexagonFraction = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  const size = 70;
  const elements = [];
  const hexSize = 15;
  // Define hexagon positions
  const positions = [
    { x: 20, y: 20 },
    { x: 50, y: 20 },
    { x: 20, y: 45 },
    { x: 50, y: 45 },
    { x: 35, y: 32.5 },
    { x: 35, y: 57.5 },
    { x: 65, y: 32.5 },
  ];
  
  // Create hexagons up to denominator count
  for (let i = 0; i < Math.min(positions.length, denominator); i++) {
    const { x, y } = positions[i];
    
    // Create hexagon path
    const points = [];
    for (let j = 0; j < 6; j++) {
      const angle = (j * 60) * Math.PI / 180;
      points.push(`${x + hexSize * Math.cos(angle)},${y + hexSize * Math.sin(angle)}`);
    }
    
    elements.push(
      <polygon
        key={`hex-${i}`}
        points={points.join(' ')}
        fill={i < numerator ? "#FBBF24" : "white"}
        stroke="#6B7280"
        strokeWidth="1.5"
      />
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 90 75">
      {elements}
    </svg>
  );
};

// Number line visualization
export const NumberLineFraction = ({ numerator, denominator }: { numerator: number; denominator: number }) => {
  const width = 100;
  const height = 40;
  const lineY = height / 2;
  const lineLength = width - 20;
  const startX = 10;
  const endX = startX + lineLength;
  const elements = [];
  
  // Draw the line
  elements.push(
    <line
      key="line"
      x1={startX}
      y1={lineY}
      x2={endX}
      y2={lineY}
      stroke="#000"
      strokeWidth="2"
    />
  );
  
  // Draw ticks and labels
  for (let i = 0; i <= denominator; i++) {
    const x = startX + (lineLength * i / denominator);
    
    // Tick
    elements.push(
      <line
        key={`tick-${i}`}
        x1={x}
        y1={lineY - 5}
        x2={x}
        y2={lineY + 5}
        stroke="#000"
        strokeWidth="1.5"
      />
    );
    
    // Label
    elements.push(
      <text
        key={`label-${i}`}
        x={x}
        y={lineY + 15}
        textAnchor="middle"
        fontSize="10"
        fill="#000"
      >
        {i}/{denominator}
      </text>
    );
  }
  
  // Highlight the fraction point
  const fractionX = startX + (lineLength * numerator / denominator);
  elements.push(
    <circle
      key="fraction-point"
      cx={fractionX}
      cy={lineY}
      r="4"
      fill="#EC4899"
    />
  );
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {elements}
    </svg>
  );
};

export default FractionDragDropGame;