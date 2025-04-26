"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SwipableContent from "../components/organisms/SwipableContent";
import AnimatedButton from "../components/molecules/AnimatedButton";
import CuteDecorationEffect from "../components/organisms/CuteDecorationEffect";
import {
  CuteHeart,
  CuteStar,
  CuteStrawberry,
} from "../components/atoms/CuteShapes";

const Step1 = () => {
  const router = useRouter();

  return (
    <CuteDecorationEffect numItems={8} className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
        {/* Cute background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-green-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Page heading with animated underline */}
        <div className="relative mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-pink-700"
          >
            Step 1: Fraction of Shape
          </motion.h1>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-pink-400 rounded-full"
            initial={{ width: 0, x: "50%" }}
            animate={{ width: "100%", x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Cute pizza icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Image
            src="/pizza-store.png"
            alt="Pizza icon"
            width={80}
            height={80}
            className="drop-shadow-md"
          />
        </motion.div>

        {/* Video with fancy frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl mb-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl -m-2 z-0"></div>
          <div className="absolute inset-0 bg-white rounded-lg m-1 z-10"></div>
          <iframe
            className="w-full h-64 rounded-lg shadow-lg relative z-20"
            src={
              process.env.NEXT_PUBLIC_YOUTUBE_STEP1 ||
              "https://www.youtube.com/embed/placeholder"
            }
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Swipeable content with decorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mb-8 relative"
        >
          <CuteHeart size={20} className="absolute -top-2 -left-2 z-10" />
          <CuteStrawberry size={20} className="absolute -top-2 -right-2 z-10" />
          <CuteStar size={20} className="absolute -bottom-2 -left-2 z-10" />
          <CuteHeart size={20} className="absolute -bottom-2 -right-2 z-10" />

          <SwipableContent
            contents={[
              "Fractions represent parts of a whole. The denominator (bottom number) tells how many equal parts the whole is divided into.",
              "The numerator (top number) tells how many parts we're talking about.",
              "We can represent fractions using shapes divided into equal parts.",
              "When we shade parts of a shape, we can express the shaded portion as a fraction.",
              "Addition of fractions must have the same denominator.",
            ]}
          />
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <AnimatedButton
            onClick={() => router.push("/step1/game1")}
            color="pink"
            size="large"
            hoverEffect="bounce"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          >
            Play Game
          </AnimatedButton>

          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="medium"
            hoverEffect="wobble"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            }
          >
            Back to Menu
          </AnimatedButton>
        </div>

        {/* Cute footer element */}
        <motion.div
          className="w-full max-w-md h-4 bg-gradient-to-r from-pink-400 via-transparent to-pink-400 rounded-full mt-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </CuteDecorationEffect>
  );
};

export default Step1;
