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

interface HexagonPosition {
  row: number;
  col: number;
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

  // Create a honeycomb-like hexagon pattern
  const renderHoneycomb = () => {
    const size = 35; // Hexagon size
    const spacing = size * 1.75; // Spacing between hexagon centers
    const verticalSpacing = size * 1.5; // Vertical spacing between rows

    // Create a honeycomb layout
    // This structure defines a perfect honeycomb grid
    const honeycombLayout: HexagonPosition[][] = [
      // Row 1 (top)
      [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
      // Row 2 (middle)
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
      // Row 3 (bottom)
      [
        { row: 2, col: 1 },
        { row: 2, col: 2 },
      ],
    ];

    // Flatten the layout to get all hexagons
    const allHexagons = honeycombLayout.flat();

    // Define the shaded hexagons (4 out of 7)
    // For this example, we'll shade 4 specific hexagons to create an interesting pattern
    const shadedIndices = [2, 3, 5, 6]; // Indices in the flattened array

    // SVG dimensions
    const svgWidth = 300;
    const svgHeight = 280;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="mx-auto"
      >
        <g
          transform={`translate(${svgWidth / 2 - spacing}, ${
            svgHeight / 2 - verticalSpacing
          })`}
        >
          {allHexagons.map((hex, index) => {
            // Calculate position with offset for even/odd rows (honeycomb structure)
            const xOffset = hex.row % 2 === 0 ? 0 : spacing / 2;
            const x = hex.col * spacing + xOffset;
            const y = hex.row * verticalSpacing;

            const isShaded = shadedIndices.includes(index);

            return (
              <g key={index} transform={`translate(${x}, ${y})`}>
                <motion.path
                  d={createHexagonPath(size)}
                  fill={isShaded ? "#FFDF00" : "white"}
                  stroke="#8B4513"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  whileHover={{ scale: 1.05 }}
                />

                {/* Honeycomb internal texture - subtle lines to create honey cell look */}
                {isShaded && (
                  <motion.path
                    d={createHexagonPath(size * 0.8)}
                    fill="none"
                    stroke="#D4A017"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.6,
                      transition: { delay: index * 0.1 + 0.2 },
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Add a cute bee decoration */}
        <motion.g
          transform="translate(230, 60) scale(0.6)"
          initial={{ x: -30, y: 0 }}
          animate={{
            x: 0,
            y: [0, -5, 0, -3, 0],
            transition: {
              x: { duration: 2 },
              y: { repeat: Infinity, duration: 1 },
            },
          }}
        >
          <ellipse cx="25" cy="20" rx="15" ry="10" fill="#FFC125" />
          <ellipse cx="15" cy="20" rx="15" ry="10" fill="#FFC125" />
          <path
            d="M15,15 L15,25 M25,15 L25,25"
            stroke="black"
            strokeWidth="2"
          />
          <circle cx="8" cy="16" r="1.5" fill="black" /> {/* Eye */}
          <path
            d="M4,20 Q6,22 8,20"
            stroke="black"
            strokeWidth="1"
            fill="none"
          />{" "}
          {/* Smile */}
          <path d="M35,18 L30,15" stroke="black" strokeWidth="1" />{" "}
          {/* Antenna */}
          <circle cx="30" cy="15" r="1" fill="black" />
        </motion.g>
      </svg>
    );
  };

  // Create SVG path for a hexagon
  const createHexagonPath = (size: number): string => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i;
      const angleRad = (Math.PI / 180) * angleDeg;
      const x = size * Math.cos(angleRad);
      const y = size * Math.sin(angleRad);
      points.push(i === 0 ? `M ${x},${y}` : `L ${x},${y}`);
    }
    return points.join(" ") + " Z"; // Close the path
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

      <div className="flex justify-center mb-6">{renderHoneycomb()}</div>

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
            Count how many hexagons are shaded yellow (like honey cells) and how
            many hexagons there are in total.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HexagonFractionGame;
