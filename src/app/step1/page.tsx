"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SwipeableContent from "../components/SwipeableContent";

const Step1 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Step 1: Fraction of Shape
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl mb-6"
      >
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src={
            process.env.NEXT_PUBLIC_YOUTUBE_STEP1 ||
            "https://www.youtube.com/embed/placeholder"
          }
          allowFullScreen
        ></iframe>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-2xl mb-8"
      >
        <SwipeableContent
          contents={[
            "Fractions represent parts of a whole. The denominator (bottom number) tells how many equal parts the whole is divided into.",
            "The numerator (top number) tells how many parts we're talking about.",
            "We can represent fractions using shapes divided into equal parts.",
            "When we shade parts of a shape, we can express the shaded portion as a fraction.",
            "Addition of fractions must have the same denominator.",
          ]}
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/step1/game1")}
        className="bg-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-pink-700 transition-colors"
      >
        Play Game
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={() => router.push("/menu")}
        className="mt-4 text-gray-600 underline hover:text-gray-800"
      >
        Back to Menu
      </motion.button>
    </div>
  );
};

export default Step1;
