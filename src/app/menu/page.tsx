// src/app/menu/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CuteDecorationWrapper from "../components/organisms/CuteDecorationEffect";
import ProfileCard from "../components/organisms/ProfileCard";
import { UserStorage } from "../utils/userStorage";
import { usePageLoader } from "../context/PageLoaderContext";
import {
  CuteStar,
  CuteHeart,
  CuteIceCream,
} from "../components/atoms/CuteShapes";

const Menu = () => {
  const router = useRouter();
  const [, setMounted] = useState(false);
  const { startLoading, stopLoading } = usePageLoader();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setMounted(true);
    stopLoading();

    // Check if user is logged in
    if (!UserStorage.isLoggedIn()) {
      router.push("/");
    }
  }, [stopLoading, router]);

  const handleNavigation = (path: string, message: string) => {
    startLoading(message);
    setTimeout(() => {
      router.push(path);
    }, 1200);
  };

  const handleLogout = () => {
    UserStorage.logout();
    router.push("/");
  };

  // Refresh data when returning to menu
  useEffect(() => {
    const handleFocus = () => {
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const progress = UserStorage.getProgress();

  // Get progress for each step
  const getStepStatus = (step: "step1" | "step2" | "step3") => {
    if (!progress) return { completed: false, score: 0, attempts: 0 };
    return progress[step];
  };

  const step1Status = getStepStatus("step1");
  const step2Status = getStepStatus("step2");
  const step3Status = getStepStatus("step3");

  return (
    <CuteDecorationWrapper
      numItems={12}
      className="min-h-screen overflow-hidden"
    >
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 flex flex-col items-center justify-center text-white overflow-hidden p-4">
        {/* Profile Card at the top */}
        <div className="w-full max-w-5xl mb-8">
          <ProfileCard key={refreshKey} onLogout={handleLogout} />
        </div>

        {/* Page title with animation */}
        <motion.div
          className="relative z-10 mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Your Learning Journey
          </h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-pink-200 mt-4 max-w-md mx-auto">
            Continue your fraction adventure. Click on any step to practice!
          </p>
        </motion.div>

        {/* Step Cards with Progress */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-6">
          {/* Step 1 */}
          <div
            onClick={() =>
              handleNavigation("/step1", "Preparing Step 1 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-colors max-w-xs group w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-full"
            >
              {/* Progress indicator */}
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {step1Status.attempts > 0
                  ? step1Status.completed
                    ? "✓"
                    : `${step1Status.attempts}`
                  : "1"}
              </div>

              <div className="relative mb-4">
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

              {/* Progress info */}
              {step1Status.attempts > 0 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Best Score:{" "}
                    <span className="font-bold text-blue-600">
                      {step1Status.score}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Attempts: {step1Status.attempts}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() =>
              handleNavigation("/step2", "Preparing Step 2 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-6 rounded-2xl shadow-xl border-2 border-pink-200 hover:border-pink-400 transition-colors max-w-xs group w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full h-full"
            >
              {/* Progress indicator */}
              <div className="absolute -top-3 -right-3 bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {step2Status.attempts > 0
                  ? step2Status.completed
                    ? "✓"
                    : `${step2Status.attempts}`
                  : "2"}
              </div>

              <div className="relative mb-4">
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

              {/* Progress info */}
              {step2Status.attempts > 0 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Best Score:{" "}
                    <span className="font-bold text-pink-600">
                      {step2Status.score}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Attempts: {step2Status.attempts}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() =>
              handleNavigation("/step3", "Preparing Step 3 content...")
            }
            className="relative z-10 flex flex-col items-center cursor-pointer bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-colors max-w-xs group w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full h-full"
            >
              {/* Progress indicator */}
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {step3Status.attempts > 0
                  ? step3Status.completed
                    ? "✓"
                    : `${step3Status.attempts}`
                  : "3"}
              </div>

              <div className="relative mb-4">
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

              {/* Progress info */}
              {step3Status.attempts > 0 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Best Score:{" "}
                    <span className="font-bold text-blue-600">
                      {step3Status.score}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Attempts: {step3Status.attempts}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Achievement section */}
        {progress && progress.achievements.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Your Achievements
            </h3>
            <div className="flex gap-4 justify-center">
              {progress.achievements.map((achievement) => (
                <motion.div
                  key={achievement}
                  className="bg-white bg-opacity-20 px-6 py-3 rounded-full text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  {achievement.replace("_", " ").toUpperCase()}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </CuteDecorationWrapper>
  );
};

export default Menu;
