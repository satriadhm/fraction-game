// src/app/page.tsx
"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 to-orange-400 p-8">
      <motion.img
        src="/icon.png"
        alt="Logo INTAN"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-64 h-auto mb-6"
      />
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-white text-center drop-shadow-md"
      >
        Innovative Numerical Training for Advancing Fraction
      </motion.h1>
      <p className="text-lg text-white mt-4 text-center max-w-2xl">
        Belajar pecahan dengan cara yang menyenangkan dan interaktif! Mulai perjalananmu sekarang.
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push('/menu')}
        className="mt-8 bg-yellow-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-600 transition-colors"
      >
        Mulai Belajar
      </motion.button>
    </div>
  );
};

export default LandingPage;
