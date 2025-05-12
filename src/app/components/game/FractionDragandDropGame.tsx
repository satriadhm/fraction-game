// src/app/components/game/FractionDragDropGame.tsx
"use client";

import React, { useState, useRef } from "react";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

// Modified interface where each dropZone has exactly one accepted piece
interface FractionPiece {
  id: string;
  value: string;
  image: React.ReactNode;
}

interface DropZone {
  id: string;
  label: string;
  equivalentValue: string; // The equivalent fraction value this zone accepts
  acceptsId: string; // Direct reference to the piece ID
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
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("pieceId", id);
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("pieceId");

    // Update placements
    setPlacements((prev) => ({
      ...prev,
      [zoneId]: pieceId,
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const isPieceInAnyZone = (pieceId: string) => {
    return Object.values(placements).includes(pieceId);
  };

  const getZoneContent = (zoneId: string) => {
    const pieceId = placements[zoneId];
    if (!pieceId) return null;

    const piece = question.pieces.find((p) => p.id === pieceId);
    return piece ? piece.image : null;
  };

  const checkAnswer = () => {
    // Check if all zones have correct placements
    const allCorrect = question.dropZones.every((zone) => {
      const placedPieceId = placements[zone.id];
      return placedPieceId === zone.acceptsId;
    });

    // Check all zones are filled
    const allZonesFilled = question.dropZones.every((zone) =>
      Object.keys(placements).includes(zone.id)
    );

    onAnswer(allCorrect && allZonesFilled);
  };

  const resetPlacements = () => {
    setPlacements({});
  };

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      {/* Instruction */}
      <div className="relative mb-6 px-4 py-3 bg-purple-100 rounded-xl border-2 border-purple-200 text-center w-full max-w-md mx-auto">
        <p className="text-xl font-bold text-center text-purple-700">
          {question.instruction}
        </p>
        <p className="text-sm text-purple-600 mt-2">
          Match each fraction shape with its equivalent fraction value
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-2xl">
        {/* Fraction Pieces Section */}
        <div className="md:w-1/2 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-700 mb-3">
            Fraction Shapes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.pieces.map((piece) => (
              <div
                key={piece.id}
                draggable={!isPieceInAnyZone(piece.id) && !disabled}
                onDragStart={(e) => handleDragStart(e, piece.id)}
                className={`
                  p-4 bg-white rounded-lg shadow-md border border-gray-200
                  ${isPieceInAnyZone(piece.id) ? "opacity-50" : "cursor-grab"}
                  transition-all duration-200
                `}
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="h-20 w-full flex items-center justify-center">
                    {piece.image}
                  </div>
                  <div className="mt-2 text-center font-semibold text-gray-800">
                    {piece.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zones Section */}
        <div className="md:w-1/2 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
          <h3 className="text-lg font-bold text-purple-700 mb-3">
            Equivalent Values
          </h3>
          <div className="flex flex-col space-y-4">
            {question.dropZones.map((zone) => {
              const hasContent = !!placements[zone.id];

              return (
                <div
                  key={zone.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, zone.id)}
                  className={`
                    p-4 rounded-lg border-2 border-dashed 
                    flex items-center justify-center
                    ${
                      hasContent
                        ? "border-solid border-purple-500 bg-white"
                        : "border-gray-300 bg-white"
                    }
                    transition-all duration-200
                  `}
                >
                  {hasContent ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-20 w-full flex items-center justify-center">
                        {getZoneContent(zone.id)}
                      </div>
                    </div>
                  ) : (
                    // This is where the updated dropZone content goes
                    <div className="flex flex-col items-center justify-center h-20">
                      <div className="p-4">
                        <div className="w-12 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-gray-400"
                          >
                            <path
                              d="M12 5v14m-7-7h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-800 font-medium">{zone.label}</p>
                      {zone.equivalentValue && (
                        <p className="text-xs text-gray-500">Drop shape here</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <AnimatedButton
          onClick={checkAnswer}
          color="purple"
          size="large"
          hoverEffect="bounce"
          icon={<Icon type="check" />}
          disabled={
            disabled ||
            Object.keys(placements).length < question.dropZones.length
          }
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
export const CircleFraction = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => {
  const size = 70;
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
        <path key={`slice-${i}`} d={pathData} fill="#9F7AEA" opacity="0.7" />
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
export const RectangleFraction = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => {
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
export const HexagonFraction = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => {
  const size = 80;
  const elements = [];
  const hexSize = 15;
  // Define hexagon positions for a honeycomb pattern
  const positions = [
    { x: 20, y: 20 },
    { x: 50, y: 20 },
    { x: 35, y: 35 },
    { x: 20, y: 50 },
    { x: 50, y: 50 },
    { x: 65, y: 35 },
  ];

  // Create hexagons up to denominator count (up to the positions available)
  for (let i = 0; i < Math.min(positions.length, denominator); i++) {
    const { x, y } = positions[i];

    // Create hexagon path
    const points = [];
    for (let j = 0; j < 6; j++) {
      const angle = (j * 60 * Math.PI) / 180;
      points.push(
        `${x + hexSize * Math.cos(angle)},${y + hexSize * Math.sin(angle)}`
      );
    }

    elements.push(
      <polygon
        key={`hex-${i}`}
        points={points.join(" ")}
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
export const NumberLineFraction = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}) => {
  const width = 120;
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
    const x = startX + (lineLength * i) / denominator;

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
        y={lineY - 10}
        textAnchor="middle"
        fontSize="9"
        fill="#000"
      >
        {i}
      </text>
    );
  }

  // Highlight the fraction point
  const fractionX = startX + (lineLength * numerator) / denominator;
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
