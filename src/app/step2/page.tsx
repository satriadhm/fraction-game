"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  AnimatedButton,
  CuteDecorationEffect,
  CuteHeart,
  CuteStar,
  CuteIceCream,
  Icon,
  SwipableContent,
} from "../components";

// Floating decoration component
const FloatingDecoration: React.FC<{ 
  children: React.ReactNode; 
  x: string; 
  y: string; 
  delay?: number; 
  duration?: number; 
}> = ({ 
  children, 
  x, 
  y, 
  delay = 0, 
  duration = 3 
}) => (
  <motion.div
    className="absolute z-10"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -15, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const Step2 = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CuteDecorationEffect numItems={8} className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-4 sm:p-8">
        {/* Cute background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 rounded-blob opacity-50"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ borderRadius: "50% 50% 30% 70% / 50% 50% 70% 30%" }}
        />

        {/* Floating decorations */}
        {mounted && (
          <>
            <FloatingDecoration x="7%" y="20%" delay={0.7} duration={4}>
              <CuteStar size={35} color="#FCD34D" />
            </FloatingDecoration>
            
            <FloatingDecoration x="88%" y="35%" delay={1.4} duration={3.8}>
              <CuteHeart size={30} color="#EC4899" />
            </FloatingDecoration>
            
            <FloatingDecoration x="75%" y="85%" delay={0.3} duration={4.5}>
              <CuteIceCream size={32} />
            </FloatingDecoration>
          </>
        )}

        {/* Floating step number bubble */}
        <motion.div
          className="absolute top-8 right-8 z-20"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-white text-3xl font-bold">2</div>
          </div>
        </motion.div>

        {/* Page heading with animated rainbow underline */}
        <div className="relative mb-8 mt-16 sm:mt-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-purple-700"
          >
            <span className="relative">
              Step 2: Equivalent Fraction
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
                initial={{ width: 0, x: "50%" }}
                animate={{ width: "100%", x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </motion.h1>
        </div>

        {/* Cute bakery icon with bounce animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="mb-8 relative"
        >
          <div className="p-4 rounded-2xl bg-purple-100 border-2 border-purple-300 shadow-xl">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, -3, 0, 3, 0] 
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Image
                src="/bakery.png"
                alt="Bakery icon"
                width={100}
                height={100}
                className="drop-shadow-md"
              />
            </motion.div>
          </div>
          
          {/* Cute decorations around the icon */}
          <motion.div
            className="absolute -top-3 -right-3 z-10"
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <CuteHeart size={24} color="#EC4899" />
          </motion.div>
          <motion.div
            className="absolute -bottom-3 -left-3 z-10"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            <CuteStar size={24} color="#FCD34D" />
          </motion.div>
        </motion.div>

        {/* Video with fancy rainbow frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl mb-10 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-xl blur-[2px] opacity-80 z-0"></div>
          <div className="absolute inset-0 bg-purple-200 rounded-xl p-4 z-10">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((n) => (
                <div 
                  key={n} 
                  className={`w-4 h-4 rounded-full ${n === 1 ? 'bg-red-500' : n === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}
                />
              ))}
            </div>
            <iframe
              className="w-full h-48 md:h-64 rounded-lg shadow-lg relative z-20"
              src={
                process.env.NEXT_PUBLIC_YOUTUBE_STEP2 ||
                "https://www.youtube.com/embed/placeholder"
              }
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Swipeable content with bubble speech design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mb-10 relative"
          style={{ filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.1))" }}
        >
          <div className="relative">
            {/* Bubble tail */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-100 transform rotate-45 border-l-2 border-t-2 border-purple-200 z-0"></div>
  
            {/* Content with fancy border */}
            <div className="relative border-2 border-purple-200 bg-purple-100 rounded-3xl z-10 p-1">
              <SwipableContent
                contents={[
                  "Equivalent fractions are fractions that represent the same value, even though they may look different.",
                  "To find equivalent fractions, multiply or divide both the numerator and denominator by the same number.",
                  "For example, 1/2 = 2/4 = 3/6 = 4/8, they all represent the same value.",
                  "Multiplication of fractions is done by multiplying the numerator and denominator.",
                  "Division of fractions is done by multiplying by the reciprocal.",
                ]}
                buttonColor="purple"
                backgroundColor="bg-purple-50"
                height={200}
                withDots={true}
                withPagination={true}
              />
            </div>
          </div>
        </motion.div>

        {/* Action buttons with wiggle animations */}
        <div className="flex flex-col sm:flex-row gap-6 items-center z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AnimatedButton
              onClick={() => router.push("/step2/game2")}
              color="purple"
              size="large"
              hoverEffect="bounce"
              icon={<Icon type="play" />}
              className="relative shadow-lg transform transition-all duration-300"
            >
              Play Game
            </AnimatedButton>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedButton
              onClick={() => router.push("/menu")}
              color="pink"
              size="medium"
              hoverEffect="wobble"
              icon={<Icon type="back" />}
            >
              Back to Menu
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Rainbow footer element */}
        <motion.div
          className="w-full max-w-md h-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full mt-8"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Add to globals.css or style block */}
      <style jsx global>{`
        .rounded-blob {
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
        }
      `}</style>
    </CuteDecorationEffect>
  );
};

export default Step2;