"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "../molecules/AnimatedButton";

interface MultipleChoiceGameProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
    image?: string;
    imageUrl?: string; // Added to support both naming conventions
  };
  onAnswer: (selectedOption: string) => void;
  disabled?: boolean;
}

const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  // Define colors for variety
  const colors = ["pink", "purple", "blue", "green"] as const;

  // Use either image or imageUrl property, whichever is available
  const imageSource = question.image || question.imageUrl;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative mb-6 px-4 py-3 bg-purple-100 rounded-xl border-2 border-purple-200">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-center text-purple-700"
        >
          {question.question}
        </motion.p>
      </div>

      {imageSource && (
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-2 bg-white border-4 border-pink-200 rounded-lg shadow-md"
          >
            <Image
              src={imageSource}
              alt="Question illustration"
              width={160}
              height={160}
              className="object-contain rounded-lg"
            />
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className={`
              flex items-center text-left py-4 px-4
              bg-gradient-to-r ${getGradientColors(colors[index % colors.length])}
              text-white rounded-xl shadow-md
              hover:shadow-lg focus:outline-none transition-all duration-200
              border-2 border-transparent hover:border-white
              ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            disabled={disabled}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white text-pink-600 font-bold flex-shrink-0">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-medium">{option}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get gradient colors
function getGradientColors(color: string): string {
  switch (color) {
    case "pink":
      return "from-pink-500 to-pink-600";
    case "purple":
      return "from-purple-500 to-purple-600";
    case "blue":
      return "from-blue-500 to-blue-600";
    case "green":
      return "from-green-500 to-green-600";
    default:
      return "from-pink-500 to-pink-600";
  }
}

export default MultipleChoiceGame;
