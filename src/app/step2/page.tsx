"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SwipeableContent from "../components/organisms/SwipableContent";
import AnimatedButton from "../components/molecules/AnimatedButton";
import CuteDecorationEffect from "../components/organisms/CuteDecorationEffect";
import {
  CuteHeart,
  CuteStar,
} from "../components/atoms/CuteShapes";
import Icon from "../components/atoms/Icon";
import Image from "next/image";

const Step2 = () => {
  const router = useRouter();

  return (
    <CuteDecorationEffect numItems={8} className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-8">
        {/* Cute background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 rounded-full opacity-50"
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
            Step 2: Equivalent Fraction
          </motion.h1>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-pink-400 rounded-full"
            initial={{ width: 0, x: "50%" }}
            animate={{ width: "100%", x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Cute bakery icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Image
            src="/bakery.png"
            alt="Bakery icon"
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
              process.env.NEXT_PUBLIC_YOUTUBE_STEP2 ||
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
          <CuteStar size={20} className="absolute -top-2 -right-2 z-10" />
          <CuteStar size={20} className="absolute -bottom-2 -left-2 z-10" />
          <CuteHeart size={20} className="absolute -bottom-2 -right-2 z-10" />

          <SwipeableContent
            contents={[
              "Equivalent fractions are fractions that represent the same value, even though they may look different.",
              "To find equivalent fractions, multiply or divide both the numerator and denominator by the same number.",
              "For example, 1/2 = 2/4 = 3/6 = 4/8, they all represent the same value.",
              "Multiplication of fractions is done by multiplying the numerator and denominator.",
              "Division of fractions is done by multiplying by the reciprocal.",
            ]}
            buttonColor="pink"
          />
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <AnimatedButton
            onClick={() => router.push("/step2/game2")}
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

export default Step2;
