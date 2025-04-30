"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CuteHeart,
  CuteStar,
  CuteStrawberry,
  CuteIceCream,
} from "./components/atoms/CuteShapes";
import EnhancedButton from "./components/molecules/EnhancedButton";
import LoadingScreen from "./components/molecules/LoadingBar";

// Floating decoration component
const FloatingDecoration = ({
  children,
  x,
  y,
  delay = 0,
  duration = 3,
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
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

// Animated title component
const AnimatedTitle = ({ children }: { children: string }) => {
  const letters = Array.from(children);

  return (
    <motion.h1
      className="text-4xl md:text-6xl font-extrabold text-pink-600 leading-tight my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            type: "spring",
            stiffness: 120,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Background bubble component
const Bubble = ({
  size,
  delay,
  duration,
  x,
  y,
  color,
}: {
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
  color: string;
}) => (
  <motion.div
    className={`absolute rounded-full bg-opacity-40 blur-md`}
    style={{
      width: size,
      height: size,
      top: y,
      left: x,
      backgroundColor: color,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartLearning = () => {
    setIsLoading(true);

    // Simulating loading delay before navigation
    setTimeout(() => {
      router.push("/menu");
    }, 1500);
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden">
      {/* Loading Screen */}
      <LoadingScreen
        isLoading={isLoading}
        message="Preparing your learning journey"
      />

      {/* Background bubbles */}
      {mounted && (
        <>
          <Bubble
            size={200}
            delay={0}
            duration={15}
            x="5%"
            y="10%"
            color="#fbcfe8"
          />
          <Bubble
            size={300}
            delay={3}
            duration={20}
            x="70%"
            y="60%"
            color="#e9d5ff"
          />
          <Bubble
            size={150}
            delay={1}
            duration={12}
            x="30%"
            y="80%"
            color="#dbeafe"
          />
          <Bubble
            size={250}
            delay={2}
            duration={18}
            x="60%"
            y="20%"
            color="#fbcfe8"
          />
        </>
      )}

      {/* Floating decorations */}
      {mounted && (
        <>
          <FloatingDecoration x="5%" y="15%" delay={0.5} duration={3.5}>
            <CuteStar size={40} color="#FCD34D" />
          </FloatingDecoration>

          <FloatingDecoration x="85%" y="25%" delay={1.2} duration={4}>
            <CuteHeart size={35} color="#EC4899" />
          </FloatingDecoration>

          <FloatingDecoration x="10%" y="70%" delay={2} duration={5}>
            <CuteStrawberry size={38} />
          </FloatingDecoration>

          <FloatingDecoration x="80%" y="75%" delay={0.8} duration={4.2}>
            <CuteIceCream size={42} />
          </FloatingDecoration>
        </>
      )}

      {/* NAVIGATION BAR */}
      <motion.nav
        className="w-full py-4 px-4 sm:px-8 flex items-center justify-between bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain drop-shadow-md w-12 h-12 sm:w-16 sm:h-16"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">INTAN</h2>
            <p className="text-xs md:text-sm text-pink-200">
              Fun Fraction Learning
            </p>
          </motion.div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-8 md:py-16 flex-grow">
        {/* Text Container */}
        <motion.div
          className="flex-1 flex flex-col items-start space-y-4 z-20 max-w-xl mx-auto md:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-sm text-pink-600 font-semibold"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Making Math Learning Fun!
          </motion.div>

          <AnimatedTitle>The Amazing Fraction Era</AnimatedTitle>

          <motion.p
            className="text-pink-700 text-sm md:text-lg max-w-md bg-white bg-opacity-70 p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-semibold italic">
              Innovative Numerical Training for Advancing Fraction
            </span>
            <br />
            <br />
            Learn fractions in a fun and interactive way! Start your journey now
            and gain a deeper understanding of fractions through engaging
            activities.
          </motion.p>

          <div className="w-full sm:w-auto">
            <EnhancedButton onClick={handleStartLearning} size="large">
              Start Learning
            </EnhancedButton>
          </div>
        </motion.div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -1, 2, -2, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Image
              src="/hero-illustration.png"
              alt="Fraction Learning Illustration"
              width={600}
              height={600}
              className="object-contain drop-shadow-xl max-w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <motion.section
        className="px-4 sm:px-8 md:px-16 py-12 bg-white bg-opacity-80 shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-6 sm:mb-12">
          Learning Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <motion.div
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md border-2 border-pink-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-pink-200 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Image
                src="/pizza-store.png"
                alt="Feature 1"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-xl font-bold text-pink-700 text-center mb-2">
              Fraction of Shape
            </h3>
            <p className="text-gray-600 text-center">
              Learn to visualize fractions with engaging shapes and interactive
              models
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border-2 border-purple-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Image src="/bakery.png" alt="Feature 2" width={40} height={40} />
            </div>
            <h3 className="text-xl font-bold text-purple-700 text-center mb-2">
              Equivalent Fractions
            </h3>
            <p className="text-gray-600 text-center">
              Understand equivalent fractions through fun interactive activities
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border-2 border-blue-200 sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Image
                src="/stationery.png"
                alt="Feature 3"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-xl font-bold text-blue-700 text-center mb-2">
              Number Line
            </h3>
            <p className="text-gray-600 text-center">
              Place fractions on a number line and compare their values
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-6 sm:py-8 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between shadow-inner"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="font-semibold text-sm sm:text-base">
            © 2025 INTAN. All rights reserved.
          </span>
        </div>
        <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="#"
            className="hover:underline transition-all hover:text-pink-200 text-sm sm:text-base"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline transition-all hover:text-pink-200 text-sm sm:text-base"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:underline transition-all hover:text-pink-200 text-sm sm:text-base"
          >
            Contact Us
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
