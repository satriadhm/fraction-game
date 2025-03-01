"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Contoh Landing Page Minimalis ala Diner Dash
 * - Menggunakan palet warna yang diambil dari brand/icon (misal blue salmon & cokelat tua).
 * - Desain minimalis, layout rapi dengan white space, tipografi sans-serif.
 * - Elemen dekoratif kecil bernuansa restoran cepat saji.
 */

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen flex flex-col">
      {/* NAVIGATION BAR */}
      <nav className="w-full py-4 px-8 flex items-center justify-between bg-blue-600 text-white">
        <div className="flex items-center space-x-2">
          {/* Logo - ganti src sesuai file Anda */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <ul className="flex space-x-6 font-medium">
          <li>
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-blue-50 relative overflow-hidden">
        {/* Dekorasi ala restoran cepat saji */}
        <div className="hidden md:block absolute w-48 h-48 bg-yellow-300 rounded-full top-10 right-10 opacity-20 animate-pulse" />
        <div className="hidden md:block absolute w-32 h-32 bg-blue-300 rounded-lg bottom-10 left-10 opacity-20 rotate-12" />

        {/* Text Container */}
        <div className="flex-1 flex flex-col items-start space-y-4 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            The Amazing Fraction Era
          </h1>
          <p className="text-blue-700 text-sm md:text-lg max-w-md">
            <em>Innovative Numerical Training for Advancing Fraction</em>
            <br />
            Learn fractions in a fun and interactive way! Start your journey now
            and gain a deeper understanding of fractions.
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </button>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0 z-10">
          {/* Ganti src sesuai ilustrasi ala Diner Dash */}
          <Image
            src="/hero-illustration.png"
            alt="Diner Dash Style Illustration"
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-600 text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <span className="font-semibold">
          © 2025 INTAN. All rights reserved.
        </span>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </main>
  );
}
