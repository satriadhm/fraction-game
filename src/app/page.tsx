"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import InteractiveFood from './components/InteractiveFood';
import AnimatedButton from './components/AnimatedButton';

const LandingPage = () => {
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center justify-center">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold text-orange-900 mb-8"
      >
        Selamat Datang di Dunia Makanan!
      </motion.h1>

      {/* Interactive Food Section */}
      <div className="flex space-x-8 mb-12">
        {['Burger', 'Pizza', 'Sushi'].map((food, index) => (
          <motion.div
            key={food}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            onHoverStart={() => setHoveredFood(food)}
            onHoverEnd={() => setHoveredFood(null)}
            className="relative cursor-pointer"
          >
            <img
              src={`/images/${food.toLowerCase()}.png`}
              alt={food}
              className="w-32 h-32 hover:scale-110 transition-transform"
            />
            {hoveredFood === food && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-800 text-white px-4 py-2 rounded-full text-sm"
              >
                {food}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 3D Food Animation */}
      <div className="w-full h-96 mb-12">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InteractiveFood />
        </Canvas>
      </div>

      {/* Animated Button to Login */}
      <AnimatedButton onClick={() => window.location.href = '/login'}>
        Masuk ke Restoran
      </AnimatedButton>
    </div>
  );
};

export default LandingPage;