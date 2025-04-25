"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SwipeableContent from "../components/SwipeableContent";

const Step3 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-gray-800 mb-8"
      >
        Step 3: Fraction in Number Line
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl mb-6"
      >
        <iframe
          className="w-full max-w-2xl h-64 rounded-lg shadow-lg"
          src={
            process.env.NEXT_PUBLIC_YOUTUBE_STEP3 ||
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
            "Fractions can be represented on a number line, showing their relative position between whole numbers.",
            "A number line helps visualize the size and relationship between different fractions.",
            "To place a fraction on a number line, divide the space between whole numbers into equal parts.",
            "Mixed numbers (like 1½) are placed between the whole numbers they fall between.",
            "The number line helps us compare fractions and understand their values better.",
          ]}
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/game3")}
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

export default Step3;
