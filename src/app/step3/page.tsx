"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedButton from "../components/molecules/AnimatedButton";
import CuteDecorationEffect from "../components/organisms/CuteDecorationEffect";
import {
  CuteHeart,
  CuteStar,
} from "../components/atoms/CuteShapes";
import SwipeableContent from "../components/molecules/SwipeableContent";
import Icon from "../components/atoms/Icon";
import Image from "next/image";

const Step3 = () => {
  const router = useRouter();

  return (
    <CuteDecorationEffect numItems={8} className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
        {/* Cute background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-50"
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
            className="text-3xl font-bold text-center text-blue-700"
          >
            Step 3: Fraction in Number Line
          </motion.h1>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-400 rounded-full"
            initial={{ width: 0, x: "50%" }}
            animate={{ width: "100%", x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Cute stationery icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Image
            src="/stationery.png"
            alt="Stationery icon"
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl -m-2 z-0"></div>
          <div className="absolute inset-0 bg-white rounded-lg m-1 z-10"></div>
          <iframe
            className="w-full h-64 rounded-lg shadow-lg relative z-20"
            src={
              process.env.NEXT_PUBLIC_YOUTUBE_STEP3 ||
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
              "Fractions can be represented on a number line, showing their relative position between whole numbers.",
              "A number line helps visualize the size and relationship between different fractions.",
              "To place a fraction on a number line, divide the space between whole numbers into equal parts.",
              "Mixed numbers (like 1½) are placed between the whole numbers they fall between.",
              "The number line helps us compare fractions and understand their values better.",
            ]}
            buttonColor="blue"
          />
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <AnimatedButton
            onClick={() => router.push("/step3/game3")}
            color="blue"
            size="large"
            hoverEffect="bounce"
            icon={<Icon type="play" />}
          >
            Play Game
          </AnimatedButton>

          <AnimatedButton
            onClick={() => router.push("/menu")}
            color="pink"
            size="medium"
            hoverEffect="wobble"
            icon={<Icon type="back" />}
          >
            Back to Menu
          </AnimatedButton>
        </div>

        {/* Cute footer element */}
        <motion.div
          className="w-full max-w-md h-4 bg-gradient-to-r from-blue-400 via-transparent to-blue-400 rounded-full mt-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </CuteDecorationEffect>
  );
};

export default Step3;
