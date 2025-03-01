"use client";

import { useRouter } from 'next/router';

const Step3 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-3xl font-bold mb-8">Step 3</h1>
      <iframe
        src="https://www.coolmathgames.com/0-papas-freezeria"
        width="800"
        height="600"
        frameBorder="0"
      ></iframe>
      <button
        onClick={() => router.push('/menu')}
        className="mt-8 bg-blue-500 text-white p-2 rounded"
      >
        Kembali ke Menu
      </button>
    </div>
  );
};

export default Step3;