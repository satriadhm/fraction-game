"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedButton from "../components/molecules/AnimatedButton";
import CuteDecorationWrapper from "../components/organisms/CuteDecorationEffect";
import {
  CuteHeart,
  CuteStar,
  CuteIceCream,
} from "../components/atoms/CuteShapes";
import { usePageLoader } from "../context/PageLoaderContext";

const Particles = () => {
  const [particles, setParticles] = useState<
    {
      key: number;
      top: number;
      left: number;
      duration: number;
      delay: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const colors = ["#F9A8D4", "#FCD34D", "#93C5FD", "#6EE7B7", "#FCA5A5"];
    const particlesArray = Array.from({ length: 30 }).map((_, index) => {
      return {
        key: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles(particlesArray);
  }, []);

  return (
    <>
      {particles.map(({ key, top, left, duration, delay, color }) => (
        <motion.div
          key={key}
          className="absolute rounded-full opacity-70 z-0"
          style={{
            width: Math.random() * 10 + 4,
            height: Math.random() * 10 + 4,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: color,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          whileHover={{
            scale: 1.5,
            y: [0, -10, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: delay,
          }}
        />
      ))}
    </>
  );
};

// Animated journey path for menu
const JourneyPath = () => {
  return (
    <svg
      className="absolute z-0 w-full h-40 top-1/2 -translate-y-1/2"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      {/* Main path */}
      <motion.path
        d="M20 100 L 380 100"
        stroke="#FBA4B4"
        strokeWidth="4"
        strokeDasharray="8 8"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Decorative elements along the path */}
      <motion.circle
        cx="20"
        cy="100"
        r="8"
        fill="#FBA4B4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <motion.circle
        cx="200"
        cy="100"
        r="8"
        fill="#FBA4B4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />

      <motion.circle
        cx="380"
        cy="100"
        r="8"
        fill="#FBA4B4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      />
    </svg>
  );
};

const Menu = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { startLoading, stopLoading } = usePageLoader();

  useEffect(() => {
    // Mark that the component has been mounted on the client side
    setMounted(true);

    // Stop any loading animation when the menu is fully loaded
    stopLoading();
    
    // Remove the authentication check that's causing redirection to /login
    // since there is no login page in the application
  }, [stopLoading]);

  const handleNavigation = (path: string, message: string) => {
    startLoading(message);
    setTimeout(() => {
      router.push(path);
    }, 1200);
  };

  return (
    <CuteDecorationWrapper
      numItems={12}
      className="min-h-screen overflow-hidden"
    >
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 flex flex-col items-center justify-center text-white overflow-hidden p-4">
        {/* Background sparkles */}
        {mounted && <Particles />}

        {/* Cute moving clouds */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-16 bg-white/10 rounded-full blur-xl"
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-20 bg-pink-500/10 rounded-full blur-xl"
          animate={{ x: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Animated journey path */}
        <JourneyPath />

        {/* Page title with animation */}
        <motion.div
          className="relative z-10 mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Our Journey
          </h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-pink-200 mt-4 max-w-md mx-auto">
            Explore these fun activities to master fractions!
          </p>
        </motion.div>

        {/* Step Container with improved cards */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-6">
          {/* Step 1 */}
          <div
            onClick={() =>
              handleNavigation("/step1", "Preparing Step 1 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-colors max-w-xs group"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-full"
            >
              <div className="relative mb-2">
                <Image
                  src="/pizza-store.png"
                  alt="Step 1"
                  width={100}
                  height={100}
                  className="drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CuteStar size={15} />
                </motion.div>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-3xl font-bold text-blue-500 group-hover:text-blue-600 transition-colors">
                  Step 1
                </h2>
                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                  Fraction of Shape
                </span>
              </div>

              <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() =>
              handleNavigation("/step2", "Preparing Step 2 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-pink-200 hover:border-pink-400 transition-colors max-w-xs group"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-full"
            >
              <div className="relative mb-2">
                <Image
                  src="/bakery.png"
                  alt="Step 2"
                  width={100}
                  height={100}
                  className="drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CuteHeart size={15} />
                </motion.div>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-3xl font-bold text-pink-500 group-hover:text-pink-600 transition-colors">
                  Step 2
                </h2>
                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold group-hover:bg-pink-200 transition-colors">
                  Equivalent Fraction
                </span>
              </div>

              <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-400 rounded-full"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() =>
              handleNavigation("/step3", "Preparing Step 3 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-4 rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-colors max-w-xs group"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full h-full"
            >
              <div className="relative mb-2">
                <Image
                  src="/stationery.png"
                  alt="Step 3"
                  width={100}
                  height={100}
                  className="drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CuteIceCream size={15} />
                </motion.div>
              </div>

              <div className="text-center mt-2">
                <h2 className="text-3xl font-bold text-blue-500 group-hover:text-blue-600 transition-colors">
                  Step 3
                </h2>
                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                  Fraction in Number Line
                </span>
              </div>

              <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>

        {/* Home button with animation */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <AnimatedButton
            onClick={() => handleNavigation("/", "Returning to home...")}
            color="pink"
            size="small"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          >
            Home
          </AnimatedButton>
        </motion.div>

        {/* Cute footer ribbon */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </CuteDecorationWrapper>
  );
};

export default Menu;
