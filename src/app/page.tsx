"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import EnhancedButton from "./components/molecules/EnhancedButton";
import LoadingScreen from "./components/molecules/LoadingBar";
import RegistrationForm from "./components/organisms/RegistrationForm";
import { UserStorage } from "./utils/userStorage";
import { usePageLoader } from "./context/PageLoaderContext";

export default function LandingPage() {
  const router = useRouter();
  const [, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const { startLoading, stopLoading } = usePageLoader();

  useEffect(() => {
    setMounted(true);
    stopLoading();
    // Check if user is already logged in
    if (UserStorage.isLoggedIn()) {
      router.push("/menu");
    }
  }, [router, stopLoading]);

  const handleStartLearning = () => {
    setShowRegistration(true);
  };

  const handleRegistrationComplete = () => {
    setIsLoading(true);
    startLoading("Setting up your learning space...");
    setTimeout(() => {
      router.push("/menu");
    }, 1500);
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Loading Screen */}
      <LoadingScreen
        isLoading={isLoading}
        message="Setting up your learning space..."
      />

      {/* Registration Modal */}
      {showRegistration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <RegistrationForm onComplete={handleRegistrationComplete} />
        </motion.div>
      )}

      {/* Background elements (keep existing) */}
      {/* ... */}

      {/* HERO SECTION - Updated Design */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 flex-grow">
        <motion.div
          className="flex-1 flex flex-col items-start space-y-6 z-20 max-w-xl mx-auto md:mx-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-pink-600 font-bold text-lg">
              🎓 Interactive Math Learning Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-pink-600">Master</span>
            <span className="text-purple-600"> Fractions</span>
            <br />
            <span className="text-blue-600">The Fun Way!</span>
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Join <span className="font-bold text-pink-600">INTAN</span> -
            <span className="italic">
              {" "}
              Innovative Numerical Training for Advancing Fraction{" "}
            </span>
            where learning math becomes an exciting adventure with interactive
            games, visual aids, and step-by-step guidance.
          </motion.p>

          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <EnhancedButton onClick={handleStartLearning} size="large">
              Start Learning Now
            </EnhancedButton>
            <a
              href="#features"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Learn More →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-pink-600">100%</h3>
              <p className="text-gray-600">Interactive</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-600">3</h3>
              <p className="text-gray-600">Learning Steps</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600">Fun</h3>
              <p className="text-gray-600">Guaranteed</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image - Enhanced */}
        <motion.div
          className="flex-1 flex justify-center mt-12 md:mt-0 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-30 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <Image
              src="/hero-illustration.png"
              alt="Fraction Learning Illustration"
              width={600}
              height={600}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION - Enhanced */}
      <section
        id="features"
        className="px-6 md:px-16 py-20 bg-white bg-opacity-95 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent" />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Learning Features
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Discover our carefully designed learning modules that make
              fractions easy and fun to understand
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature Cards - Enhanced */}
            {[
              {
                title: "Fraction of Shape",
                description:
                  "Learn to visualize fractions with engaging shapes and interactive models",
                icon: "/pizza-store.png",
                color: "from-pink-500 to-red-500",
                borderColor: "border-pink-200",
                delay: 0.2,
              },
              {
                title: "Equivalent Fractions",
                description:
                  "Understand equivalent fractions through fun interactive activities",
                icon: "/bakery.png",
                color: "from-purple-500 to-pink-500",
                borderColor: "border-purple-200",
                delay: 0.4,
              },
              {
                title: "Number Line",
                description:
                  "Place fractions on a number line and compare their values",
                icon: "/stationery.png",
                color: "from-blue-500 to-cyan-500",
                borderColor: "border-blue-200",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-xl border-2 ${feature.borderColor} hover:shadow-2xl transition-all`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -10 }}
              >
                <div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

   {/* 
   This code updates the footer section of your landing page (src/app/page.tsx)
   to include the Universitas Kristen Satya Wacana logo.
*/}

{/* 
   This code updates the footer section of your landing page (src/app/page.tsx)
   to include the three requested logos in a row.
*/}

{/* FOOTER - Enhanced with Three Logos */}
<footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        <p className="text-pink-100">
          Making fraction learning fun and interactive for everyone.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
        <ul className="space-y-2 text-pink-100">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
        <p className="text-pink-100">
          Email: intansilvia531@gmail.com
          <br />
          Phone: (+62)82241389340
        </p>
      </div>
    </div>
    
    <div className="border-t border-pink-400 mt-12 pt-8 text-center">
      {/* Three logos row */}
      <div className="flex justify-center items-center gap-8 mb-6">
        {/* Logo 1 - UKSW */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full p-2">
          <Image 
            src="/uksw-logo-1.png" 
            alt="Universitas Kristen Satya Wacana"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        
        {/* Logo 2 - FKIP UKSW */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full p-2">
          <Image 
            src="/uksw-logo-2.png" 
            alt="FKIP UKSW"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        
        {/* Logo 3 - PGSD FKIP UKSW */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full p-2">
          <Image 
            src="/uksw-logo-3.png" 
            alt="PGSD FKIP UKSW"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>
      
      <p className="text-pink-100">© 2025 INTAN. All rights reserved.</p>
    </div>
  </div>
</footer>
</main>
  );
}
