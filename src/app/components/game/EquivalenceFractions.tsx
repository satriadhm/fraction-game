"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../molecules/AnimatedButton";
import Icon from "../atoms/Icon";

interface FractionPair {
  id: number;
  leftSide: {
    colored: number;
    total: number;
  };
  rightSide: {
    colored: number;
    total: number;
  };
  isEquivalent: boolean;
}

interface EquivalentFractionsGameProps {
  question: {
    instruction: string;
    pairs: FractionPair[];
  };
  onAnswer: (score: number, totalPairs: number) => void;
  disabled?: boolean;
}

const EquivalentFractionsGame: React.FC<EquivalentFractionsGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [connections, setConnections] = useState<{left: number, right: number}[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Reset any temporary selection when making a new connection attempt
  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      // Find the pair for the selected left item
      const leftPair = question.pairs.find(p => p.id === selectedLeft);
      // Find the pair for the selected right item
      const rightPair = question.pairs.find(p => p.id === selectedRight);
      
      if (leftPair && rightPair) {
        // Calculate the fractions
        const leftFraction = leftPair.leftSide.colored / leftPair.leftSide.total;
        const rightFraction = rightPair.rightSide.colored / rightPair.rightSide.total;
        
        const isMatch = Math.abs(leftFraction - rightFraction) < 0.001; // Account for floating point errors
        
        // Check if either point is already connected
        const leftAlreadyConnected = connections.some(c => c.left === selectedLeft);
        const rightAlreadyConnected = connections.some(c => c.right === selectedRight);
        
        if (isMatch && !leftAlreadyConnected && !rightAlreadyConnected) {
          // Make connection
          setConnections([...connections, {left: selectedLeft, right: selectedRight}]);
          setMessage("Good match!");
        } else {
          setMessage("Not a match. Try again!");
        }
      }
      
      // Reset selections after a short delay
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setMessage(null);
      }, 1500);
    }
  }, [selectedLeft, selectedRight, connections, question.pairs]);
  
  // Check if game is complete
  useEffect(() => {
    // Count how many equivalent pairs there are
    const equivalentPairCount = question.pairs.filter(p => {
      const leftFraction = p.leftSide.colored / p.leftSide.total;
      const rightFraction = p.rightSide.colored / p.rightSide.total;
      return Math.abs(leftFraction - rightFraction) < 0.001;
    }).length;
    
    if (connections.length === equivalentPairCount && connections.length > 0) {
      setGameComplete(true);
      onAnswer(connections.length, equivalentPairCount);
    }
  }, [connections, question.pairs, onAnswer]);
  
  // Handle click on left side fraction
  const handleLeftClick = (id: number) => {
    if (disabled) return;
    
    // Check if this point is already connected
    if (connections.some(c => c.left === id)) return;
    
    setSelectedLeft(id);
  };
  
  // Handle click on right side fraction
  const handleRightClick = (id: number) => {
    if (disabled) return;
    
    // Check if this point is already connected
    if (connections.some(c => c.right === id)) return;
    
    setSelectedRight(id);
  };
  
  // Render a fraction visualization
  const renderFraction = (colored: number, total: number, size = 200, isRow = true) => {
    const blocks = [];
    
    // For simplicity, we'll render blocks in a row or column
    for (let i = 0; i < total; i++) {
      const isColored = i < colored;
      
      blocks.push(
        <div 
          key={i}
          className={`
            ${isRow ? 'inline-block' : 'block'} 
            ${isColored ? 'bg-pink-400' : 'bg-blue-400'} 
            border border-white
            ${isRow ? 'w-full h-full' : 'w-full h-full'}
          `}
          style={{ 
            width: isRow ? `${100/total}%` : '100%',
            height: isRow ? '100%' : `${100/total}%`
          }}
        />
      );
    }
    
    return (
      <div 
        className={`relative ${isRow ? 'flex' : 'block'} w-full h-12 border border-gray-300 rounded overflow-hidden`}
      >
        {blocks}
      </div>
    );
  };
  
  // Reset the game
  const resetGame = () => {
    setConnections([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMessage(null);
    setGameComplete(false);
  };

  // Helper function to get connection lines
  const getConnections = () => {
    // Create an SVG overlay for the connections
    return (
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {connections.map((conn, idx) => {
          // Find the DOM elements for this connection
          const leftElement = document.querySelector(`[data-id="left-${conn.left}"]`);
          const rightElement = document.querySelector(`[data-id="right-${conn.right}"]`);
          
          if (!leftElement || !rightElement) return null;
          
          // Get the positions
          const leftRect = leftElement.getBoundingClientRect();
          const rightRect = rightElement.getBoundingClientRect();
          
          // Calculate positions relative to the container
          const containerRect = document.querySelector('.connection-container')?.getBoundingClientRect() || { top: 0, left: 0 };
          
          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height/2 - containerRect.top;
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height/2 - containerRect.top;
          
          return (
            <line 
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#6366F1"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="connection-line"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative mb-6 px-4 py-3 bg-indigo-100 rounded-xl border-2 border-indigo-200 text-center w-full max-w-md mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-purple-700"
        >
          {question.instruction || "Connect the equivalent fractions"}
        </motion.p>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 mb-6 w-full max-w-xl relative connection-container">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {/* Left side fractions */}
          <div className="flex flex-col space-y-4">
            {question.pairs.map((pair) => (
              <div 
                key={`left-${pair.id}`}
                className={`
                  relative p-2 rounded-lg 
                  ${selectedLeft === pair.id ? 'bg-blue-200' : 'bg-white'} 
                  ${connections.some(c => c.left === pair.id) ? 'border-2 border-green-400' : 'border border-blue-300'}
                  cursor-pointer transition-colors
                `}
                onClick={() => handleLeftClick(pair.id)}
                data-id={`left-${pair.id}`}
              >
                {renderFraction(pair.leftSide.colored, pair.leftSide.total)}
                <div className="text-center mt-1 font-bold text-blue-700">
                  {pair.leftSide.colored}/{pair.leftSide.total}
                </div>
                <div 
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"
                  data-id={`left-point-${pair.id}`}
                ></div>
              </div>
            ))}
          </div>

          {/* Right side fractions */}
          <div className="flex flex-col space-y-4">
            {question.pairs.map((pair) => (
              <div 
                key={`right-${pair.id}`}
                className={`
                  relative p-2 rounded-lg 
                  ${selectedRight === pair.id ? 'bg-pink-200' : 'bg-white'} 
                  ${connections.some(c => c.right === pair.id) ? 'border-2 border-green-400' : 'border border-pink-300'}
                  cursor-pointer transition-colors
                `}
                onClick={() => handleRightClick(pair.id)}
                data-id={`right-${pair.id}`}
              >
                {renderFraction(pair.rightSide.colored, pair.rightSide.total)}
                <div className="text-center mt-1 font-bold text-pink-700">
                  {pair.rightSide.colored}/{pair.rightSide.total}
                </div>
                <div 
                  className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-500"
                  data-id={`right-point-${pair.id}`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Status message */}
        {message && (
          <div className={`
            mt-4 py-2 text-center rounded-lg font-medium
            ${message.includes("Good") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
          `}>
            {message}
          </div>
        )}
      </div>

      {/* Game controls */}
      <div className="flex gap-4 justify-center">
        <AnimatedButton
          onClick={resetGame}
          color="blue"
          size="medium"
          hoverEffect="shake"
          disabled={disabled || connections.length === 0}
          icon={<Icon type="back" />}
        >
          Reset Game
        </AnimatedButton>
        
        {gameComplete && (
          <AnimatedButton
            onClick={() => onAnswer(connections.length, question.pairs.filter(p => p.isEquivalent).length)}
            color="green"
            size="medium"
            hoverEffect="bounce"
            icon={<Icon type="check" />}
          >
            Submit Answer
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default EquivalentFractionsGame;