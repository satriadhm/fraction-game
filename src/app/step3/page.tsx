"use client";

import { useRouter } from 'next/navigation';
import SwipeableContent from '../components/SwipeableContent';

const Step3 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Step 3: Pecahan Gabungan</h1>
      <iframe className="mb-6 w-full max-w-2xl h-64 rounded-lg shadow-lg" src={process.env.NEXT_PUBLIC_YOUTUBE_STEP3} allowFullScreen></iframe>
      <SwipeableContent contents={["Pecahan campuran terdiri dari bilangan bulat dan pecahan.", "Konversi pecahan campuran ke pecahan biasa dengan mengalikan bilangan bulat dengan penyebut."]} />
      <button onClick={() => router.push('/game3')} className="mt-8 bg-blue-600 text-white p-4 rounded shadow-lg hover:bg-blue-700">Mainkan Game</button>
    </div>
  );
};

export default Step3;
