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
            <a href="#features" className="hover:underline">
              Fitur
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              Tentang
            </a>
          </li>
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
            Belajar pecahan dengan cara yang menyenangkan dan interaktif!
            Mulai perjalananmu sekarang dan raih pemahaman mendalam
            tentang pecahan.
          </p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Mulai Belajar
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

      {/* FITUR SECTION */}
      <section
        id="features"
        className="px-8 md:px-16 py-12 bg-white flex flex-col items-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
          Fitur INTAN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card Fitur 1 */}
          <div className="p-6 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Image
              src="/feature1.png"
              alt="Fitur 1"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Belajar Interaktif
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Materi pecahan disampaikan dengan animasi dan penjelasan
              interaktif, seperti game di Diner Dash!
            </p>
          </div>

          {/* Card Fitur 2 */}
          <div className="p-6 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Image
              src="/feature2.png"
              alt="Fitur 2"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Video Pendek
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Setiap konsep disertai video singkat yang memudahkan kamu
              memahami materi secara visual.
            </p>
          </div>

          {/* Card Fitur 3 */}
          <div className="p-6 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Image
              src="/feature3.png"
              alt="Fitur 3"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">
              Game Pecahan
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Uji pemahamanmu lewat game sederhana yang menyenangkan
              dan mengasah logika pecahan.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT / TENTANG SECTION */}
      <section
        id="about"
        className="px-8 md:px-16 py-12 bg-blue-50 flex flex-col items-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
          Tentang INTAN
        </h2>
        <div className="max-w-4xl text-center text-gray-700 space-y-4">
          <p>
            INTAN merupakan singkatan dari{" "}
            <em>Innovative Numerical Training for Advancing Fraction</em>.
            Melalui platform ini, kamu akan mendapatkan pengalaman belajar
            pecahan yang interaktif, disertai contoh-contoh dan latihan menarik.
            Tiap langkah (step) dilengkapi dengan video penjelasan singkat, dan
            kamu juga dapat bermain game sederhana untuk menguji pemahamanmu.
          </p>
          <p>
            Metode yang digunakan di INTAN difokuskan pada konsep “Learning by
            Doing” dan “Gamification”. Dengan konsep tersebut, kamu tidak hanya
            akan mendapatkan teori, namun juga merasakan langsung implementasi
            konsep pecahan dalam berbagai skenario kehidupan nyata. Selamat
            menikmati perjalanan belajarmu!
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-600 text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <span className="font-semibold">© 2025 INTAN. All rights reserved.</span>
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
