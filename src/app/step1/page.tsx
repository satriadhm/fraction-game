"use client";

import { useRouter } from 'next/router';

const Step1 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-8">Step 1</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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

export default Step1;