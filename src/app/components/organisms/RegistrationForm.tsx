// src/app/components/organisms/RegistrationForm.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedButton from "../molecules/AnimatedButton";
import { UserStorage } from "@/app/utils/userStorage";
import { CuteStar, CuteHeart } from "../atoms/CuteShapes";
import { usePageLoader } from "@/app/context/PageLoaderContext";

interface RegistrationFormProps {
  onComplete?: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const router = useRouter();
  const { startLoading } = usePageLoader();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    grade: "3", // Default grade 3
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (
      formData.age &&
      (parseInt(formData.age) < 5 || parseInt(formData.age) > 18)
    ) {
      newErrors.age = "Age must be between 5 and 18";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userId = Date.now().toString();
    const userProfile = {
      id: userId,
      name: formData.name,
      email: formData.email || undefined,
      age: formData.age ? parseInt(formData.age) : undefined,
      grade: formData.grade,
      createdAt: new Date().toISOString(),
    };

    // Save profile and initialize progress
    UserStorage.saveProfile(userProfile);
    UserStorage.initializeProgress(userId);
    UserStorage.setCurrentUser(userId);

    if (onComplete) {
      onComplete();
    } else {
      startLoading("Loading menu...");
      router.push("/menu");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 opacity-20">
        <CuteStar size={120} color="#EC4899" />
      </div>
      <div className="absolute -bottom-6 -left-6 opacity-20">
        <CuteHeart size={100} color="#8B5CF6" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to INTAN!
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Let&apos;s create your learning profile to start your fraction journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What&apos;s your name? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                errors.name ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                errors.email ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                min="5"
                max="18"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  errors.age ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Your age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
              >
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
              </select>
            </div>
          </div>

          <AnimatedButton
            type="submit"
            color="pink"
            size="large"
            className="w-full mt-8"
            hoverEffect="grow"
            onClick={() => {}} // Empty function to prevent error
          >
            Start Learning
          </AnimatedButton>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your data is stored locally on your device
        </p>
      </div>
    </motion.div>
  );
};

export default RegistrationForm;
