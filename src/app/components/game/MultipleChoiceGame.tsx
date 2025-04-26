// src/app/components/game/MultipleChoiceGame.tsx
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
  // Define colors and effects for variety
  const colors = ["pink", "purple", "blue", "green"] as const;
  const effects = ["grow", "wobble", "bounce", "shake"] as const;

  // Use either image or imageUrl property, whichever is available
  const imageSource = question.image || question.imageUrl;

  return (
    <div className="w-full">
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={imageSource}
              alt="Question illustration"
              width={160}
              height={160}
              className="object-contain rounded-lg border-4 border-pink-200 bg-white p-2"
            />
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 mt-4">
        {question.options.map((option, index) => (
          <AnimatedButton
            key={index}
            onClick={() => onAnswer(option)}
            color={colors[index % colors.length]}
            hoverEffect={effects[index % effects.length]}
            className="text-left flex items-center py-4"
            disabled={disabled}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white text-pink-600 font-bold">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceGame;
