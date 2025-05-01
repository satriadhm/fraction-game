// src/app/step3/game3/components/InstructionModal.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "@/app/components/molecules/AnimatedButton";

interface InstructionModalProps {
  touchMode: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  touchMode,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl max-w-md w-full mx-4 relative"
      >
        {/* Decorative ninja star in corner */}
        <div className="absolute -top-4 -right-4 w-8 h-8 transform rotate-45">
          <svg viewBox="0 0 24 24" fill="#4F46E5">
            <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Ninja Fraction Training
        </h2>

        <div className="mb-4">
          <h3 className="font-bold text-lg text-blue-500 mb-2">
            Your Mission:
          </h3>
          <p>
            Use your ninja sword to slice the line at the exact fraction shown!
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Be precise and swift to earn maximum points and honor your fraction
            dojo.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg text-blue-500 mb-2">Controls:</h3>
          {touchMode ? (
            <ul className="list-disc pl-5 space-y-2">
              <li>Slide your finger along the screen to move the ninja</li>
              <li>Lift your finger to slash the line at that position</li>
              <li>Tap and hold on a position to make precise adjustments</li>
            </ul>
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-bold">←</span> and{" "}
                <span className="font-bold">→</span> arrow keys to move the
                ninja
              </li>
              <li>
                <span className="font-bold">Spacebar</span> to slash the line
              </li>
              <li>
                Press <span className="font-bold">H</span> for a hint when you
                need help
              </li>
            </ul>
          )}
        </div>

        <div className="mb-4 bg-blue-50 p-3 rounded-lg">
          <h3 className="font-bold text-lg text-blue-500 mb-2">
            Advanced Tips:
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              The faster you cut correctly, the more bonus points you&apos;ll
              earn
            </li>
            <li>
              Some levels will have moving obstacles - time your cuts carefully
            </li>
            <li>
              Later levels may hide tick marks or even reverse the number line
            </li>
            <li>You can pause the game at any time if you need a break</li>
          </ul>
        </div>

        <div className="flex justify-center mt-6">
          <AnimatedButton onClick={onClose} color="blue" hoverEffect="bounce">
            Start Slicing!
          </AnimatedButton>
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionModal;
