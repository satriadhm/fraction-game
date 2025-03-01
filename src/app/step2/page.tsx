"use client";

import { useRouter } from 'next/navigation';
import SwipeableContent from '../components/SwipeableContent';

const Step2 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Step 2: Perkalian dan Pembagian Pecahan</h1>
      <iframe className="mb-6 w-full max-w-2xl h-64 rounded-lg shadow-lg" src={process.env.NEXT_PUBLIC_YOUTUBE_STEP2} allowFullScreen></iframe>
      <SwipeableContent contents={["Multiplication of fractions is done by multiplying the numerator and denominator.", "Division of fractions is done by multiplying by the reciprocal."]} />
      <button onClick={() => router.push('/game2')} className="mt-8 bg-blue-600 text-white p-4 rounded shadow-lg hover:bg-blue-700">Mainkan Game</button>
    </div>
  );
};

export default Step2;