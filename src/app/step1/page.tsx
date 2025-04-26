"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  SwipeableContent,
  AnimatedButton,
  CuteDecorationEffect,
  CuteHeart,
  CuteStar,
  CuteStrawberry,
  Icon,
} from "../components";

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

          <SwipeableContent
            contents={[
              "Fractions represent parts of a whole. The denominator (bottom number) tells how many equal parts the whole is divided into.",
              "The numerator (top number) tells how many parts we're talking about.",
              "We can represent fractions using shapes divided into equal parts.",
              "When we shade parts of a shape, we can express the shaded portion as a fraction.",
              "Addition of fractions must have the same denominator.",
            ]}
            buttonColor="pink"
          />
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <AnimatedButton
            onClick={() => router.push("/step1/game1")}
            color="pink"
            size="large"
            hoverEffect="bounce"
            icon={<Icon type="play" />}
          >
            Play Game
          </AnimatedButton>

          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="blue"
            size="medium"
            hoverEffect="wobble"
            icon={<Icon type="back" />}
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
