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
  const [shouldValidate, setShouldValidate] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Check if game is complete and show validation
  useEffect(() => {
    // Count how many equivalent pairs there are in total
    const equivalentPairCount = question.pairs.filter(p => p.isEquivalent).length;
    
    // Show "submit answer" button when all pairs are matched
    if (connections.length >= equivalentPairCount && connections.length > 0) {
      setGameComplete(true);
    }
    
    // Only validate when explicitly requested (via Submit Answer button)
    if (shouldValidate) {
      onAnswer(connections.length, equivalentPairCount);
      setShouldValidate(false);
    }
  }, [connections, question.pairs, onAnswer, shouldValidate]);
  
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
  const renderFraction = (colored: number, total: number) => {
    const blocks = [];
    
    // For simplicity, we'll render blocks in a row
    for (let i = 0; i < total; i++) {
      const isColored = i < colored;
      
      blocks.push(
        <div 
          key={i}
          className={`
            inline-block 
            ${isColored ? 'bg-pink-400' : 'bg-gray-200'} 
            border border-white
          `}
          style={{ 
            width: `${100/total}%`,
            height: '100%'
          }}
        />
      );
    }
    
    return (
      <div className="relative w-full h-12 border border-gray-300 rounded overflow-hidden flex">
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

  // Submit answer and validate
  const handleSubmitAnswer = () => {
    setShouldValidate(true);
  };

  useEffect(() => {
    // Force rerender connections on window resize
    const handleResize = () => {
      setConnections([...connections]);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [connections]);

  // Count connected pairs
  const connectedCount = connections.length;
  const totalPairsCount = question.pairs.filter(p => p.isEquivalent).length;

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

      <div 
        ref={containerRef}
        className="bg-blue-50 rounded-xl p-5 mb-6 w-full max-w-xl relative"
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {connections.map((conn, idx) => {
            // Find the DOM elements by their data attributes
            const leftElement = document.querySelector(`[data-left-id="${conn.left}"]`);
            const rightElement = document.querySelector(`[data-right-id="${conn.right}"]`);
            
            if (!leftElement || !rightElement || !containerRef.current) return null;
            
            // Get positions relative to the container
            const containerRect = containerRef.current.getBoundingClientRect();
            const leftRect = leftElement.getBoundingClientRect();
            const rightRect = rightElement.getBoundingClientRect();
            
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
              />
            );
          })}
        </svg>

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
                data-left-id={pair.id}
              >
                {renderFraction(pair.leftSide.colored, pair.leftSide.total)}
                <div className="text-center mt-1 font-bold text-blue-700">
                  {pair.leftSide.colored}/{pair.leftSide.total}
                </div>
                <div 
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"
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
                data-right-id={pair.id}
              >
                {renderFraction(pair.rightSide.colored, pair.rightSide.total)}
                <div className="text-center mt-1 font-bold text-pink-700">
                  {pair.rightSide.colored}/{pair.rightSide.total}
                </div>
                <div 
                  className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-500"
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
        
        {/* Progress status */}
        <div className="mt-4 text-center text-purple-700 font-medium">
          Connected: {connectedCount} of {totalPairsCount} pairs
        </div>
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
            onClick={handleSubmitAnswer}
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