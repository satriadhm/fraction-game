"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Menu = () => {
  const router = useRouter();

  // Cek autentikasi (sesuai kode lama)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Judul Halaman Menu */}
      <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Menu</h1>

      {/* Container Langkah-Langkah */}
      <div className="relative flex items-center justify-between w-full max-w-3xl">
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
          <div className="flex flex-col items-center">
  {/* Teks Utama "Step 1" dengan outline pink */}
  <h1 className="text-5xl font-bold text-blue-500 text-outline-pink">
    Step 1
  </h1>

  {/* Label "Fraction of Shape" di bawah "Step 1" */}
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
          <Image src="/bakery.png" alt="Step 2" width={128} height={128} />
          <h3 className="mt-4 text-xl font-semibold">Step 2</h3>
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
          <h3 className="mt-4 text-xl font-semibold">Step 3</h3>
        </motion.div>

        {/* Garis putus-putus penghubung (di belakang ikon-ikon) */}
        <div
          className="absolute top-1/2 left-16 right-16 -translate-y-1/2 
                     border-t-2 border-dashed border-cyan-400 
                     shadow-[0_0_8px_rgba(34,211,238,0.7)]"
        ></div>
      </div>

      {/* Tombol Logout di pojok (opsional, melanjutkan fungsionalitas lama) */}
      <button
        onClick={() => {
          localStorage.removeItem("isAuthenticated");
          router.push("/login");
        }}
        className="absolute top-4 right-4 text-sm text-gray-300 border border-gray-500 
                   px-3 py-1 rounded hover:text-white hover:border-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
