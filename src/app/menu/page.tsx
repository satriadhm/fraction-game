"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Particles = () => {
  const [particles, setParticles] = useState<{ key: number; top: number; left: number; duration: number; delay: number; }[]>([]);

  useEffect(() => {
    const particlesArray = Array.from({ length: 20 }).map((_, index) => {
      return {
        key: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      };
    });
    setParticles(particlesArray);
  }, []);

  return (
    <>
      {particles.map(({ key, top, left, duration, delay }) => (
        <motion.div
          key={key}
          className="absolute rounded-full bg-cyan-400 opacity-70"
          style={{
            width: 8,
            height: 8,
            top: `${top}%`,
            left: `${left}%`,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
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

const Menu = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Tandai bahwa komponen telah dimount di sisi client
    setMounted(true);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Render Particles hanya setelah komponen dimount */}
      {mounted && <Particles />}

      {/* Garis Das S-Shaped */}
      <motion.svg
        className="absolute z-0 w-full h-40 top-1/2 -translate-y-1/2"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <path
          d="M20 100 C 80 0, 160 200, 240 100 S 320 0, 380 100"
          stroke="cyan"
          strokeWidth="2"
          strokeDasharray="5 5"
          fill="none"
        />
      </motion.svg>

      {/* Judul Halaman Menu */}
      <h1 className="relative z-10 text-4xl font-bold mb-8 drop-shadow-md">Our Journey</h1>

      {/* Container Langkah-Langkah */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-3xl">
        {/* Step 1 */}
        <motion.div
          onClick={() => router.push("/step1")}
          className="relative z-10 flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image src="/pizza-store.png" alt="Step 1" width={128} height={128} />
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-5xl font-bold text-blue-500">Step 1</h1>
            <span className="rounded-full bg-blue-300 text-white text-sm font-bold px-3 py-1 mt-2">
              Fraction of Shape
            </span>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          onClick={() => router.push("/step2")}
          className="relative z-10 flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-5xl font-bold text-pink-500">Step 2</h1>
            <span className="rounded-full bg-pink-300 text-white text-sm font-bold px-3 py-1 mt-2">
              Equivalent Fraction
            </span>
          </div>
          <Image src="/bakery.png" alt="Step 2" width={128} height={128} />
        </motion.div>

        {/* Step 3 */}
        <motion.div
          onClick={() => router.push("/step3")}
          className="relative z-10 flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image src="/stationery.png" alt="Step 3" width={128} height={128} />
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-5xl font-bold text-blue-500">Step 3</h1>
            <span className="rounded-full bg-blue-300 text-white text-sm font-bold px-3 py-1 mt-2">
              Fraction in Number Line
            </span>
          </div>
        </motion.div>
      </div>

      {/* Tombol Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("isAuthenticated");
          router.push("/login");
        }}
        className="relative z-10 absolute top-4 right-4 text-sm text-gray-300 border border-gray-500 px-3 py-1 rounded hover:text-white hover:border-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
