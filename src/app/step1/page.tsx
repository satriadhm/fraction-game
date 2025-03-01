"use client";

import { useRouter } from 'next/navigation';
import SwipeableContent from '../components/SwipeableContent';

const Step1 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Step 1: Penjumlahan Pecahan</h1>
      <iframe className="mb-6 w-full max-w-2xl h-64 rounded-lg shadow-lg" src={process.env.NEXT_PUBLIC_YOUTUBE_STEP1} allowFullScreen></iframe>
      <SwipeableContent contents={["Penjumlahan pecahan harus memiliki penyebut yang sama.", "Jika penyebut berbeda, cari KPK dari penyebut."]} />
      <button onClick={() => router.push('/step1/game1')} className="mt-8 bg-blue-600 text-white p-4 rounded shadow-lg hover:bg-blue-700">Mainkan Game</button>
    </div>
  );
};

export default Step1;