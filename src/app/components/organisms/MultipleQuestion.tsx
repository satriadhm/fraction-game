import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Typography from '../atoms/Typography';
import AnimatedButton from '../molecules/AnimatedButton';
import { ButtonColor } from '../atoms/Button';
import { HoverEffect } from '../molecules/AnimatedButton';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  correctAnswer?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  onSelect: (option: string) => void;
  disabled?: boolean;
  colorVariation?: boolean;
  effectVariation?: boolean;
  questionColor?: 'default' | 'primary' | 'secondary';
  containerClassName?: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  correctAnswer,
  imageUrl,
  imageAlt = 'Question illustration',
  imageWidth = 160,
  imageHeight = 160,
  onSelect,
  disabled = false,
  colorVariation = true,
  effectVariation = true,
  questionColor = 'secondary',
  containerClassName = '',
}) => {
  // Predefined color options and hover effects for variety
  const colors: ButtonColor[] = ['pink', 'purple', 'blue', 'green'];
  const effects: HoverEffect[] = ['grow', 'wobble', 'bounce', 'shake'];

  return (
    <div className={`bg-white p-6 rounded-xl border-2 border-purple-200 ${containerClassName}`}>
      {/* Question */}
      <div className="relative mb-6 px-4 py-3 bg-purple-100 rounded-xl border-2 border-purple-200">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography 
            variant="subtitle1" 
            color={questionColor}
            align="center"
            className="text-xl font-bold"
          >
            {question}
          </Typography>
        </motion.div>
      </div>

      {/* Optional Image */}
      {imageUrl && (
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="object-contain rounded-lg border-4 border-pink-200 bg-white p-2"
            />
          </motion.div>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 mt-4">
        {options.map((option, index) => (
          <AnimatedButton
            key={index}
            onClick={() => onSelect(option)}
            color={colorVariation ? colors[index % colors.length] : 'blue'}
            hoverEffect={effectVariation ? effects[index % effects.length] : 'grow'}
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

export default MultipleChoiceQuestion;